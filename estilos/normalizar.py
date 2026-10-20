#!/usr/bin/env python3
"""Normaliza el sistema visual en todos los módulos (src/*.js), a nivel de código fuente:
   - radios a la escala 6 / 12 / 18 px (pills y círculos sin tocar)
   - sombras de tarjeta/botón a un único nivel suave (sin brillos de color); modales y paneles se mantienen
   - degradados: se quitan las "manchas de luz" radiales y los degradados opacos pasan a color plano
   - textos de 9-11 px suben a 11.5-12 px; espaciado de letras máximo .08em
   - animaciones decorativas en bucle (brillos, auroras, hojas flotando, pulsos) se apagan
Uso: python3 estilos/normalizar.py   (idempotente)
"""
import re, glob, sys

CARD = '0 1px 2px rgba(16,40,26,.06),0 6px 16px -8px rgba(16,40,26,.22)'
DECO_ANIM = 'hbSweep dnShine hbAur hbDrift hbTw dnGcSh hbBl hbDb hbDp dnPulse dnTcR hbPulse dnLp dnTcP dnNv'.split()

def rad(v):
    v = float(v)
    if v <= 4: return None
    if v <= 9: return 6
    if v <= 15: return 12
    if v <= 28: return 18
    return None

def fix_radius(m):
    def one(n):
        r = rad(n.group(1))
        return (str(r) + 'px') if r is not None else n.group(0)
    return 'border-radius:' + re.sub(r'(\d+(?:\.\d+)?)px', one, m.group(1))

def hexrgb(h):
    h = h.lstrip('#')
    if len(h) == 3: h = ''.join(c * 2 for c in h)
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))

GOLD = {'fbe3a0', 'f4c95d', 'e0a326', 'f6d27a', 'c98a35'}
GREEN = {'3f7d3a', '4b8f45', '2a5a37'}
DARK = {'13361f', '0d2416', '16301f', '0f2016', '13251a', '10281a', '0f2416', '163522', '1b3324'}

def solid(m):
    body = m.group(0)
    cols = [c.lower() for c in re.findall(r'#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b', body)]
    if not cols: return body
    s = set(cols)
    if 'e1306c' in s: return body                      # degradado de marca Instagram
    if s & GOLD and not (s & DARK): return '#f0c04f'
    if s & DARK or (s & GREEN and '10281a' in s): return '#15301f'
    if s & GREEN: return '#1d4a2a'
    rgb = [hexrgb(c) for c in cols]
    avg = tuple(round(sum(x[i] for x in rgb) / len(rgb)) for i in range(3))
    return '#%02x%02x%02x' % avg

# capa radial "mancha de luz" apilada: radial-gradient(... rgba(..) ... ,transparent NN%),
GLOW = re.compile(r'radial-gradient\((?:[^()]|\([^()]*\))*?rgba\([^()]*\)(?:[^()]|\([^()]*\))*?,transparent \d+%\),\s*')
# degradado opaco (solo colores hex con porcentajes opcionales)
OPAQUE = re.compile(r'(?<!repeating-)(?:linear|radial)-gradient\((?:(?:\d+deg|to [a-z ]+|[\d.]+% [\d.]+% at [\d.]+% [\d.]+%|circle|ellipse)[^,()]*,)?\s*#[0-9a-fA-F]{3,6}(?: \d+%)?(?:,\s*#[0-9a-fA-F]{3,6}(?: \d+%)?)+\)')
SHADOW = re.compile(r'box-shadow:0 (\d+)px (\d+)px rgba\((\d+),(\d+),(\d+),(\.\d+|0)\)')

def fix_shadow(m):
    y, b = int(m.group(1)), int(m.group(2))
    r, g, bl = int(m.group(3)), int(m.group(4)), int(m.group(5))
    colored = not ((r < 100 and g < 100 and bl < 100))   # brillo dorado, verde WhatsApp, rosa, etc.
    if 2 <= y <= 14 and b <= 30: return 'box-shadow:' + CARD
    if colored and y <= 22: return 'box-shadow:' + CARD
    return m.group(0)

def small_font(px):
    v = float(px)
    if 9 <= v <= 10.5: return '11.5'
    if v == 11: return '12'
    return px

def run(src):
    s = src
    s = re.sub(r'border-radius:((?:\d+(?:\.\d+)?px ?){1,4})', fix_radius, s)
    for _ in range(3): s = GLOW.sub('', s)
    s = OPAQUE.sub(solid, s)
    s = SHADOW.sub(fix_shadow, s)
    s = re.sub(r'font-size:(\d+(?:\.\d+)?)px', lambda m: 'font-size:' + small_font(m.group(1)) + 'px', s)
    s = re.sub(r'(font:(?:\d{3}|bold|normal|italic \d{3}) )(\d+(?:\.\d+)?)px', lambda m: m.group(1) + small_font(m.group(2)) + 'px', s)
    s = re.sub(r'letter-spacing:\.(1[2-9]|[2-9]\d?)em', 'letter-spacing:.08em', s)
    s = re.sub(r'animation:(' + '|'.join(DECO_ANIM) + r')\b[^;}"\']*', 'animation:none', s)
    return s

if __name__ == '__main__':
    files = [f for f in sorted(glob.glob('src/*.js')) if not f.endswith('42-feed-pulido.js')]
    for f in files:
        a = open(f, encoding='utf8').read()
        b = run(a)
        if a != b:
            open(f, 'w', encoding='utf8').write(b)
            print('normalizado', f)
