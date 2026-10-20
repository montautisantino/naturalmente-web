#!/usr/bin/env python3
"""Notas del equipo que viajan con el código de la web.
Lee contenido/notas-equipo.json (lista completa, con el texto en "x") y genera:
  - contenido/notas/<slug>.txt   el texto de cada nota (se baja solo cuando alguien la abre)
  - src/45-notas-equipo.js       la lista liviana (título, bajada, imagen, productos...) que usa la web
Uso: python3 herramientas/notas-equipo.py
"""
import json, os, re, unicodedata, datetime

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

def slug(t):
    t = unicodedata.normalize('NFD', str(t or '').lower())
    t = ''.join(c for c in t if not unicodedata.combining(c))
    t = re.sub(r'[^a-z0-9]+', '-', t).strip('-')
    return t[:70].strip('-')

src = json.load(open(os.path.join(R, 'contenido', 'notas-equipo.json'), encoding='utf8'))
os.makedirs(os.path.join(R, 'contenido', 'notas'), exist_ok=True)
out = []
for n in src:
    s = n.get('s') or slug(n['t'])
    d = datetime.datetime.fromisoformat(n['fecha'])
    ts = int(d.timestamp() * 1000)
    open(os.path.join(R, 'contenido', 'notas', s + '.txt'), 'w', encoding='utf8').write(n['x'].strip() + '\n')
    out.append({'s': s, 't': n['t'], 'c': n['c'], 'b': n['b'], 'i': n['i'], 'f': '%d de %s de %d' % (d.day, MES[d.month - 1], d.year),
                'm': int(n.get('m') or max(1, round(len(n['x'].split()) / 200))), 'x': '', 'lz': 1, 'ts': ts, 'p': n.get('p', [])})
js = ('/* Notas del equipo (generado por herramientas/notas-equipo.py desde contenido/notas-equipo.json; no editar a mano).\n'
      '   Va en las partes de inicio y Media (no en el núcleo). La lista es liviana: el texto de cada nota está en contenido/notas/<slug>.txt y se baja al abrirla. */\n'
      'window.dnNotasEquipo=' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n'
      'if(window.dnSheet&&window.dnSheet.eqAdd)window.dnSheet.eqAdd(window.dnNotasEquipo);\n')
open(os.path.join(R, 'src', '45-notas-equipo.js'), 'w', encoding='utf8').write(js)
print(len(out), 'notas;', len(js), 'bytes de lista')

# ---------- páginas para compartir: cada nota con su foto, título y bajada (vista previa de WhatsApp/Facebook) ----------
# Las redes no ejecutan JavaScript: leen las etiquetas og: del HTML. La página de Media es una sola para todas las
# notas, así que cada nota tiene una página chiquita en n/<slug>.html (GitHub Pages) con sus etiquetas y que
# lleva enseguida a la nota en la tienda. Incluye las notas de la planilla (contenido/notas-planilla.json).
import html
SHARE = 'https://montautisantino.github.io/naturalmente-web/n/'
STORE = 'https://dieteticasnaturalmente.com.ar/naturalmente-media/?nota='
os.makedirs(os.path.join(R, 'n'), exist_ok=True)
open(os.path.join(R, '.nojekyll'), 'w').close()
def img(u):
    if u.startswith('U:'): u = 'https://images.unsplash.com/photo-' + u[2:] + '?auto=format&fit=crop&w=1200&h=675&q=70'
    return u.replace('&h=675', '&h=630')
todas = [(x['s'], x['t'], x['b'], x['i']) for x in out]
pl = json.load(open(os.path.join(R, 'contenido', 'notas-planilla.json'), encoding='utf8'))
vistos = set(s for s, *_ in todas)
todas += [tuple(x) for x in pl if x[0] not in vistos]
for s, t, b, i in todas:
    e = lambda v: html.escape(v, quote=True)
    u, im, me = STORE + s, img(i), SHARE + s + '.html'
    open(os.path.join(R, 'n', s + '.html'), 'w', encoding='utf8').write(
        '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        '<title>%s | Naturalmente Media</title><meta name="description" content="%s"><link rel="canonical" href="%s">'
        '<meta property="og:type" content="article"><meta property="og:site_name" content="Naturalmente Media · Dietéticas Naturalmente">'
        '<meta property="og:title" content="%s"><meta property="og:description" content="%s"><meta property="og:url" content="%s">'
        '<meta property="og:image" content="%s"><meta property="og:image:secure_url" content="%s"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">'
        '<meta property="og:locale" content="es_AR"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="%s">'
        '<meta name="robots" content="noindex"><script>location.replace(%s)</script><noscript><meta http-equiv="refresh" content="0;url=%s"></noscript>'
        '<style>body{margin:0;font:16px/1.5 Arial,sans-serif;background:#15301f;color:#fff;display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center;padding:24px}a{color:#f0c04f}</style></head>'
        '<body><p>Abriendo la nota…<br><a href="%s">%s</a></p></body></html>\n'
        % (e(t), e(b), e(u), e(t), e(b), e(me), e(im), e(im), e(im), json.dumps(u), e(u), e(u), e(t)))
sl = [x[0] for x in pl if x[0] not in vistos]
with open(os.path.join(R, 'src', '45-notas-equipo.js'), 'a', encoding='utf8') as f:
    f.write('/* notas que tienen página para compartir con foto (las del equipo + estas de la planilla) */\n'
            'window.dnCompartir={b:' + json.dumps(SHARE) + ',on:1,s:' + json.dumps(sl) + '};\n')
print(len(todas), 'páginas para compartir')
