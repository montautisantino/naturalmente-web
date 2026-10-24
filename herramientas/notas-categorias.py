#!/usr/bin/env python3
"""Notas relacionadas para cada categoría de la tienda (bloque "Para leer" dentro de la categoría).

Cada nota del equipo tiene la lista de productos que menciona (campo p de src/45-notas-equipo.js). Con la API de
Tiendanube (solo lectura: productos y categorías) se ve en qué categorías está cada producto, y para cada categoría
se eligen las 4 notas que mencionan más productos de esa categoría (si empatan, la más nueva).
Resultado: contenido/notas-categorias.json  {"herboristeria": ["slug-nota", ...], ...}
build.sh lo convierte en window.dnNC (parte listado) y src/63-notas-en-categorias.js arma el bloque.

Uso: python3 herramientas/notas-categorias.py --token-file F
Volver a correrlo cuando se publiquen notas nuevas o cambien mucho las categorías de los productos.
"""
import json, os, sys, time, urllib.request, urllib.error

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
API = 'https://api.tiendanube.com/2025-03/3435959/'
UA = 'Naturalmente Media'
POR_CATEGORIA = 4
MINIMO = 2           # si una categoría tiene menos notas relacionadas, no se muestra el bloque
SIN_BLOQUE = {'combos', 'educativo'}   # combos: ya tienen el test y sus landings; Libros: ya son contenido
# Tema de cada categoría en el título de la nota (las categorías de los productos mezclan cosas: por ejemplo, vinagre
# de manzana está en Suplementos y yerba en Dietéticos). Una nota entra si su título es del tema de la categoría o si
# menciona 3 o más productos de esa categoría; primero las del tema, después las que más productos mencionan.
TEMA = {
    'herboristeria': r'hierba|infusi|\bt[eé]\b|tisana|flor|yuyo|planta|hoja',
    'condimentos': r'especia|condiment|\bsal\b|pimient|curry|chimichurri|or[eé]gano|comino|canela|c[uú]rcuma|piment[oó]n|sabor',
    'frutos-secos': r'fruto|nuez|nueces|almendra|casta[nñ]a|man[ií]\b|pistacho|deshidrat|pasas|d[aá]til|picada',
    'semillas': r'semilla|ch[ií]a|lino|s[eé]samo|girasol|zapallo|quinoa|germin|brote',
    'harinas': r'harina|cereal|legumbre|avena|arroz|lenteja|garbanzo|poroto|\bpan\b|masa|pasta|integral',
    'aceites-y-mas': r'aceite|oliva|ghee|vinagre|manteca',
    'galletitas': r'galletit|snack|granola|merienda|desayuno|barrita',
    'chocolates-barritas-snacks-y-varios': r'chocolate|cacao|snack|golosina|barrita|alfajor',
    'teteras-infusores-molinillos': r'infusor|tetera|filtro|molinillo|\bmates?\b|bombilla|cafetera|frasco|herramienta',
    'celiaco': r'sin tacc|sin gluten|cel[ií]ac|premezcla|mandioca|psyllium',
    'premezclas-sin-tacc': r'premezcla|sin tacc|sin gluten',
    'suplementos': r'suplement|levadura nutricional|levadura de cerveza|col[aá]geno|magnesio|\bmaca\b|spirulina|prote[ií]na|ashwagandha|adapt[oó]geno|melena',
    'diabetico': r'az[uú]car|stevia|endulz|diabet',
    'vegano': r'vegetal|vegan|\bsoja\b|tofu|seit[aá]n|legumbre',
    'yerbas': r'\bmates?\b|yerba',
}


def get(tok, ruta):
    r = urllib.request.Request(API + ruta, headers={'Authentication': 'bearer ' + tok, 'User-Agent': UA})
    for i in range(6):
        try:
            with urllib.request.urlopen(r, timeout=60) as x:
                return json.loads(x.read().decode() or 'null')
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return []
            if e.code == 429 or e.code >= 500:
                time.sleep(2 + 2 * i)
                continue
            raise SystemExit('Error %s en %s' % (e.code, ruta))
    raise SystemExit('Sin respuesta: ' + ruta)


def notas():
    s = open(os.path.join(RAIZ, 'src', '45-notas-equipo.js'), encoding='utf-8').read()
    i = s.index('window.dnNotasEquipo=') + len('window.dnNotasEquipo=')
    return json.loads(s[i:s.index('];', i) + 1])


if __name__ == '__main__':
    a = sys.argv[1:]
    tok = open(a[a.index('--token-file') + 1]).read().strip()
    cats = {c['id']: (c.get('handle') or {}).get('es') for c in get(tok, 'categories?per_page=200')}
    prod, pg = {}, 1
    while True:
        L = get(tok, 'products?fields=id,handle,categories&per_page=200&page=%d' % pg)
        for p in L or []:
            prod[(p.get('handle') or {}).get('es')] = [cats.get(c['id']) or (c.get('handle') or {}).get('es')
                                                        for c in p.get('categories') or []]
        if not L or len(L) < 200:
            break
        pg += 1
        time.sleep(0.5)
    import re, unicodedata
    def nz(t):
        return ''.join(ch for ch in unicodedata.normalize('NFD', t.lower()) if not unicodedata.combining(ch))
    puntaje = {}
    for n in notas():
        cuenta = {}
        for h in n.get('p') or []:
            for c in set(prod.get(h) or []):
                cuenta[c] = cuenta.get(c, 0) + 1
        for c in set(cuenta) | set(TEMA):
            k = cuenta.get(c, 0)
            tema = bool(TEMA.get(c)) and bool(re.search(TEMA[c], n['t'].lower()) or re.search(nz(TEMA[c]), nz(n['t'])))
            if (tema and k >= 1) or k >= 3:
                puntaje.setdefault(c, []).append((1 if tema else 0, k, n.get('ts') or 0, n['s']))
    out = {}
    for c in sorted(puntaje):
        if not c or c in SIN_BLOQUE:
            continue
        L = sorted(puntaje[c], key=lambda x: (-x[0], -x[1], -x[2]))[:POR_CATEGORIA]
        if len(L) >= MINIMO:
            out[c] = [x[3] for x in L]
    json.dump(out, open(os.path.join(RAIZ, 'contenido', 'notas-categorias.json'), 'w', encoding='utf-8'),
              ensure_ascii=False, indent=0)
    print('productos leídos: %d · categorías con notas: %d' % (len(prod), len(out)))
    for c, L in out.items():
        print(' ', c, len(L))
