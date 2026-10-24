#!/usr/bin/env python3
"""Arma el índice de todas las notas de Naturalmente Media (HTML para una página de Tiendanube).

Por qué: el mapa del sitio del blog que genera Tiendanube (sitemap_blog.xml) solo lista /blog/ y la
página /blog/ muestra una sola nota, así que Google no tiene un camino de links (sin JavaScript) hacia
las notas. Una página de contenido de Tiendanube con un link a cada nota sí la lee cualquier buscador.

Uso: python3 herramientas/indice-notas.py > build/indice-notas.html
Lee contenido/notas-equipo.json (títulos y categorías) y contenido/notas-blog.json (link de cada nota).
"""
import json, os, re, sys, unicodedata, html

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
eq = json.load(open(os.path.join(RAIZ, 'contenido', 'notas-equipo.json'), encoding='utf-8'))
nb = json.load(open(os.path.join(RAIZ, 'contenido', 'notas-blog.json'), encoding='utf-8'))

def slug(t):
    s = unicodedata.normalize('NFD', str(t or '').lower())
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s[:70].strip('-')

ORDEN = ['Fitoterapia', 'Alimentación', 'Cocina', 'Fermentos', 'Huerta', 'Hábitos', 'Bienestar y descanso', 'Cultura']
grupos, sin = {}, []
for n in eq:
    u = nb.get(slug(n['t']))
    if not u:
        sin.append(n['t']); continue
    grupos.setdefault(n.get('c') or 'Otras', []).append((n['t'], u))
if sin:
    sys.stderr.write('sin link de blog (%d): %s\n' % (len(sin), '; '.join(sin[:5])))

partes = ['<p>Todas las notas de Naturalmente Media, ordenadas por tema. Escritas por el equipo de Dietéticas Naturalmente.</p>']
for c in ORDEN + sorted(k for k in grupos if k not in ORDEN):
    if c not in grupos: continue
    items = sorted(grupos[c], key=lambda x: x[0].lower())
    partes.append('<h2>%s</h2>' % html.escape(c))
    partes.append('<ul>' + ''.join('<li><a href="%s">%s</a></li>' % (html.escape(u), html.escape(t)) for t, u in items) + '</ul>')
sys.stdout.write('\n'.join(partes) + '\n')
sys.stderr.write('notas con link: %d de %d\n' % (sum(len(v) for v in grupos.values()), len(eq)))
