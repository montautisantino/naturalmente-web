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

