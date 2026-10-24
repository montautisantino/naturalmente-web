#!/usr/bin/env python3
"""Índice de todas las notas dentro de la página de Naturalmente Media (para Google).

Por qué: en Media → Escritos la lista de notas (con sus categorías, el buscador y "Ver más") la arma nuestro código
en el navegador. En el HTML que entrega Tiendanube (lo primero que lee Google) solo están las 5 notas viejas de
#dm-leer. Este índice agrega, dentro de la misma página, un link a cada nota agrupado por categoría.
El lector no lo ve: nuestro código lo oculta (src/03-media-ajustes.js) y muestra Escritos igual que siempre;
sin JavaScript (o para un buscador) es una lista simple de links. No es una página aparte.

El bloque va al final de .dn-media, justo antes de <div class="dm-wa2"> (el aviso de WhatsApp), y siempre con
la misma forma: <div class="dm-idx" id="dm-indice"> ... </div> (sin otros div adentro), así se puede reemplazar.

Uso (desde la carpeta del repositorio):
  python3 herramientas/indice-media.py --token-file F            -> build/media-pagina.html (vista previa, no toca nada)
  python3 herramientas/indice-media.py --token-file F --publicar -> guarda el contenido anterior en build/ y actualiza
                                                                    la página en Tiendanube (solo el contenido)
Cuando se publican notas nuevas en el blog (notas-paginas.py blog + mapa-blog), correr esto con --publicar.
"""
import html, json, os, re, sys, time, urllib.request, urllib.error

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
API = 'https://api.tiendanube.com/2025-03/3435959/'
UA = 'Naturalmente Media'
PAGINA = 3831425  # /naturalmente-media/
ORDEN = ['Cocina', 'Alimentación', 'Fitoterapia', 'Fermentos', 'Huerta', 'Hábitos', 'Bienestar y descanso', 'Descanso',
         'Movimiento', 'Cultura']
ANCLA = '<div class="dm-wa2">'
RX_BLOQUE = re.compile(r'<div class="dm-idx" id="dm-indice">.*?</div>\n?', re.S)


def req(tok, metodo, ruta, cuerpo=None):
    data = json.dumps(cuerpo).encode() if cuerpo is not None else None
    r = urllib.request.Request(API + ruta, data=data, method=metodo, headers={
        'Authentication': 'bearer ' + tok, 'User-Agent': UA, 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(r, timeout=120) as x:
            return json.loads(x.read().decode() or 'null')
    except urllib.error.HTTPError as e:
        return {'_error': e.code, '_body': e.read().decode('utf-8', 'ignore')[:500]}


def notas_equipo():
    s = open(os.path.join(RAIZ, 'src', '45-notas-equipo.js'), encoding='utf-8').read()
    i = s.index('window.dnNotasEquipo=') + len('window.dnNotasEquipo=')
    return json.loads(s[i:s.index('];', i) + 1])


def originales(contenido):
    """Las 5 notas viejas (páginas /escritos-.../) que están como tarjetas en #dm-leer."""
    out = []
    for m in re.finditer(r'<div class="dm-art">(.*?)</div>', contenido, re.S):
        a = m.group(1)
        t = re.search(r'<p class="dm-art-t"><a href="([^"]+)">(.*?)</a>', a, re.S)
        c = re.search(r'<p class="dm-art-cat">(.*?)</p>', a, re.S)
        if t:
            out.append((html.unescape(re.sub('<[^>]+>', '', t.group(2))).strip(), t.group(1),
                        html.unescape(c.group(1)).strip() if c else 'Otras'))
    return out


def bloque(contenido):
    nb = json.load(open(os.path.join(RAIZ, 'contenido', 'notas-blog.json'), encoding='utf-8'))
    grupos, sin = {}, []
    for n in notas_equipo():
        u = nb.get(n['s'])
        if not u:
            sin.append(n['s'])
            continue
        grupos.setdefault(n.get('c') or 'Otras', []).append((n['t'], u))
    for t, u, c in originales(contenido):
        grupos.setdefault(c, []).append((t, u))
    total = sum(len(v) for v in grupos.values())
    cats = sorted(grupos, key=lambda c: (ORDEN.index(c) if c in ORDEN else 99, c))
    h = ['<div class="dm-idx" id="dm-indice">',
         '<h2>Todas las notas de Naturalmente Media</h2>',
         '<p>%d notas de nuestro equipo sobre hierbas, cocina, despensa y hábitos, ordenadas por tema.</p>' % total]
    for c in cats:
        h.append('<h3>%s</h3>' % html.escape(c))
        h.append('<ul>')
        for t, u in sorted(grupos[c], key=lambda x: x[0].lower()):
            h.append('<li><a href="%s">%s</a></li>' % (html.escape(u, quote=True), html.escape(t, quote=False)))
        h.append('</ul>')
    h.append('</div>')
    return '\n'.join(h) + '\n', total, len(cats), sin


def armar(contenido):
    b, total, ncat, sin = bloque(RX_BLOQUE.sub('', contenido))
    limpio = RX_BLOQUE.sub('', contenido)
    if limpio.count(ANCLA) != 1:
        raise SystemExit('No encuentro una sola vez %r en la página: revisar a mano.' % ANCLA)
    return limpio.replace(ANCLA, b + ANCLA), total, ncat, sin


if __name__ == '__main__':
    a = sys.argv[1:]
    tok = open(a[a.index('--token-file') + 1]).read().strip()
    p = req(tok, 'GET', 'pages/%d' % PAGINA)
    if not isinstance(p, dict) or p.get('_error') or (p.get('handle') or {}).get('es') != 'naturalmente-media':
        raise SystemExit('No pude leer la página de Media: %s' % str(p)[:300])
    actual = (p.get('content') or {}).get('es') or ''
    nuevo, total, ncat, sin = armar(actual)
    os.makedirs(os.path.join(RAIZ, 'build'), exist_ok=True)
    open(os.path.join(RAIZ, 'build', 'media-pagina.html'), 'w', encoding='utf-8').write(nuevo)
    print('notas en el índice: %d en %d categorías · sin link de blog: %d · página: %d -> %d caracteres'
          % (total, ncat, len(sin), len(actual), len(nuevo)))
    if nuevo == actual:
        print('la página ya tiene este índice: no hay nada para publicar')
        sys.exit(0)
    if '--publicar' not in a:
        print('vista previa en build/media-pagina.html (no se publicó nada)')
        sys.exit(0)
    open(os.path.join(RAIZ, 'build', 'media-pagina-antes-%d.html' % int(time.time())), 'w', encoding='utf-8').write(actual)
    # Se manda la página entera como la devuelve la API (mismos campos), cambiando solo el contenido.
    cuerpo = {k: p[k] for k in ('name', 'handle', 'seo_title', 'seo_description', 'published') if k in p}
    cuerpo['content'] = dict(p.get('content') or {}, es=nuevo)
    r = req(tok, 'PUT', 'pages/%d' % PAGINA, cuerpo)
    if isinstance(r, dict) and r.get('_error'):
        raise SystemExit('La API respondió error (no se cambió nada o hay que revisar): %s' % r)
    time.sleep(2)
    v = req(tok, 'GET', 'pages/%d' % PAGINA)
    ok = (v.get('content') or {}).get('es') == nuevo and all(v.get(k) == p.get(k) for k in ('name', 'handle', 'seo_title', 'seo_description', 'published'))
    print('publicado y verificado' if ok else 'OJO: la página quedó distinta a lo esperado; revisar (el contenido anterior está en build/)')
