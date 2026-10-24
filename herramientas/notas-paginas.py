#!/usr/bin/env python3
"""Notas de Naturalmente Media como páginas reales de Tiendanube (para Google y las vistas previas al compartir).

Cada nota del equipo (src/45-notas-equipo.js + contenido/notas/<slug>.txt) se publica como una página de contenido
de Tiendanube en /escritos-<slug>/, con el mismo formato "dm-nota" que ya usan las páginas de escritos: el texto
viene en el HTML (lo ve cualquiera, aunque no tenga JavaScript) y el código de Media le pone el diseño.

Uso:
  python3 herramientas/notas-paginas.py armar                 -> notas/paginas-equipo.json (no toca la tienda)
  python3 herramientas/notas-paginas.py crear --token-file F [--solo slug1,slug2] [--max N]
        crea en Tiendanube las páginas que todavía no existen (nunca modifica ni borra las que ya están)
  python3 herramientas/notas-paginas.py mapa --token-file F   -> contenido/notas-paginas.json (slug -> página)
"""
import html, json, os, re, sys, time, urllib.request, urllib.error

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
STORE = '3435959'
API = 'https://api.tiendanube.com/2025-03/%s/' % STORE
UA = 'Naturalmente Web (santinomontauti02@gmail.com)'
PREF = 'escritos-'


def notas():
    s = open(os.path.join(RAIZ, 'src', '45-notas-equipo.js'), encoding='utf-8').read()
    linea = [l for l in s.split('\n') if l.startswith('window.dnNotasEquipo=')][0]
    return json.loads(linea[len('window.dnNotasEquipo='):].rstrip().rstrip(';'))


def productos():
    """handle -> nombre, desde la caché de productos si está (solo para el texto del link)."""
    p = os.path.join(RAIZ, 'build', 'productos-nombres.json')
    return json.load(open(p, encoding='utf-8')) if os.path.exists(p) else {}


E = lambda x: html.escape(str(x or ''), quote=True)


def cuerpo(txt):
    out = []
    for b in re.split(r'\r?\n\s*\r?\n', txt.strip()):
        b = b.strip()
        if not b:
            continue
        lines = [l.strip() for l in b.split('\n') if l.strip()]
        if b.startswith('#'):
            out.append('<h3>%s</h3>' % E(re.sub(r'^#+\s*', '', b)))
        elif len(lines) > 1 and all(re.match(r'^\d+[.)]\s+', l) for l in lines):
            out.append('<ol>' + ''.join('<li>%s</li>' % E(re.sub(r'^\d+[.)]\s+', '', l)) for l in lines) + '</ol>')
        elif len(lines) > 1 and all(re.match(r'^[-•*]\s+', l) for l in lines):
            out.append('<ul>' + ''.join('<li>%s</li>' % E(re.sub(r'^[-•*]\s+', '', l)) for l in lines) + '</ul>')
        elif len(lines) == 1 and len(b) <= 90 and not re.search(r'[.:;!?)…]$', b):
            out.append('<h3>%s</h3>' % E(b))
        else:
            out.append('<p>%s</p>' % '<br />'.join(E(l) for l in lines))
    return '\n'.join(out)


def minutos(n, txt):
    return n.get('m') or max(1, round(len(txt.split()) / 200))


def corta(t, n):
    t = re.sub(r'\s+', ' ', t).strip()
    return t if len(t) <= n else t[:n - 1].rsplit(' ', 1)[0].rstrip(',;:') + '…'


def pagina(n, PN):
    txt = open(os.path.join(RAIZ, 'contenido', 'notas', n['s'] + '.txt'), encoding='utf-8').read()
    prods = ''.join('<p class="dm-n-prod">%s|%s</p>\n' % (E(h), E(PN.get(h, ''))) for h in (n.get('p') or []))
    c = ('<div class="dn-media dm-nota">\n'
         '<p class="dm-back"><a href="/naturalmente-media/">&larr; Naturalmente Media</a></p>\n'
         '<p class="dm-n-aut">Equipo de Dietéticas Naturalmente</p>\n'
         '<p class="dm-n-sec">Escritos</p>\n'
         '<p class="dm-n-cat">%s</p>\n<p class="dm-n-tema">%s</p>\n<p class="dm-n-fecha">%s</p>\n<p class="dm-n-min">%s</p>\n'
         '<p class="dm-n-cv"><img src="%s" alt="%s" /></p>\n'
         '<h2 class="dm-n-t">%s</h2>\n<p class="dm-n-baj">%s</p>\n'
         '<div class="dm-n-body">\n%s\n</div>\n%s</div>') % (
        E(n.get('c') or 'Naturalmente Media'), E(n.get('c') or ''), E(n.get('f') or ''), minutos(n, txt),
        E(n.get('i') or ''), E(n['t']), E(n['t']), E(n.get('b') or ''), cuerpo(txt), prods)
    return {
        'slug': n['s'],
        'handle': PREF + n['s'],
        'name': n['t'],
        'seo_title': corta(n['t'], 52) + ' | Naturalmente Media',
        'seo_description': corta(n.get('b') or txt, 158),
        'content': c,
    }


def armar():
    PN = productos()
    P = [pagina(n, PN) for n in notas()]
    json.dump(P, open(os.path.join(RAIZ, 'notas', 'paginas-equipo.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('armadas', len(P))
    return P


def req(tok, metodo, ruta, cuerpo_=None):
    data = json.dumps(cuerpo_).encode() if cuerpo_ is not None else None
    r = urllib.request.Request(API + ruta, data=data, method=metodo, headers={
        'Authentication': 'bearer ' + tok, 'User-Agent': UA, 'Content-Type': 'application/json'})
    if metodo != 'GET':  # nunca se reintenta una escritura: si falla, se revisa si igual se creó
        try:
            with urllib.request.urlopen(r, timeout=120) as x:
                return json.loads(x.read().decode() or 'null')
        except urllib.error.HTTPError as e:
            return {'_error': e.code, '_body': e.read().decode('utf-8', 'ignore')[:300]}
        except Exception as e:
            return {'_error': 'red', '_body': str(e)[:300]}
    for i in range(6):
        try:
            with urllib.request.urlopen(r, timeout=60) as x:
                return json.loads(x.read().decode() or 'null')
        except urllib.error.HTTPError as e:
            b = e.read().decode('utf-8', 'ignore')
            if e.code == 429 or e.code >= 500:
                time.sleep(2 + 2 * i)
                continue
            raise SystemExit('Error %s en %s %s: %s' % (e.code, metodo, ruta, b[:400]))
    raise SystemExit('Sin respuesta: ' + ruta)


def existentes(tok):
    out, pg = {}, 1
    while True:
        b = req(tok, 'GET', 'pages?per_page=10&page=%d' % pg)
        L = (b.get('pages') or {}).get('results') or []
        for p in L:
            out[(p.get('handle') or {}).get('es')] = p
        if len(L) < 10:
            return out
        pg += 1


def crear(tok, solo=None, maxn=None):
    P = armar()
    if solo:
        P = [p for p in P if p['slug'] in solo]
    ya = existentes(tok)
    hechos = 0
    for p in P:
        if p['handle'] in ya:
            continue
        if maxn is not None and hechos >= maxn:
            break
        r = req(tok, 'POST', 'pages', {'page': {
            'publish': True, 'i18n': {'es_AR': {'title': p['name'], 'content': p['content'], 'seo_handle': p['handle'],
                                             'seo_title': p['seo_title'], 'seo_description': p['seo_description']}}}})
        hechos += 1
        if isinstance(r, dict) and r.get('_error'):
            time.sleep(5)
            ok = p['handle'] in existentes(tok)
            print('ERROR al crear' if not ok else 'creada (respondió error pero existe)', p['handle'], r)
            if not ok:
                raise SystemExit('Se frena: revisar antes de seguir.')
        else:
            print('creada', p['handle'], (r or {}).get('id'))
        time.sleep(0.6)
    print('nuevas', hechos)


def mapa(tok):
    ya = existentes(tok)
    m = {n['s']: '/' + PREF + n['s'] + '/' for n in notas() if (PREF + n['s']) in ya}
    json.dump(m, open(os.path.join(RAIZ, 'contenido', 'notas-paginas.json'), 'w', encoding='utf-8'), ensure_ascii=False)
    print('en el mapa', len(m))


if __name__ == '__main__':
    a = sys.argv[1:]
    cmd = a[0] if a else 'armar'
    tokf = a[a.index('--token-file') + 1] if '--token-file' in a else None
    tok = open(tokf).read().strip() if tokf else None
    if cmd == 'armar':
        armar()
    elif cmd == 'crear':
        solo = set(a[a.index('--solo') + 1].split(',')) if '--solo' in a else None
        maxn = int(a[a.index('--max') + 1]) if '--max' in a else None
        crear(tok, solo, maxn)
    elif cmd == 'mapa':
        mapa(tok)
