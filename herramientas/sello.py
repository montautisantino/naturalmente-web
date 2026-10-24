#!/usr/bin/env python3
"""Arma el código del sello de Tiendanube (lo que va en Diseño > Editar diseño actual > textarea
#text-custom_seal_code) para cualquier versión publicada, a partir de la copia completa sello/completo.html.

El sello es público (sale en el HTML de todas las páginas), así que guardarlo acá no expone nada:
tiene el cargador del código (commit + huella SRI del núcleo), COMPRAR AHORA, carrito, pie, encabezado, etc.
Es el respaldo para volver a una versión si el campo de Tiendanube se pisa o se pierde.

Uso (desde la carpeta del repositorio):
  python3 herramientas/sello.py <commit>  > sello.html     # ej.: 7d49ea7 (versión 213)
El commit sale de la lista de versiones del README. La huella SRI se calcula del dist/dn.min.js de ese
commit. En stderr imprime la huella SHA-256 del sello, para comparar con lo que hay en el admin.

Si alguna vez se cambia otra parte del sello (no solo el commit y la huella), hay que actualizar
sello/completo.html con el valor nuevo (con {{SHA}} y {{SRI}} en lugar del commit y la huella).
"""
import base64, hashlib, os, subprocess, sys

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
if len(sys.argv) != 2:
    sys.exit(__doc__)
git = lambda *a: subprocess.check_output(['git', '-C', RAIZ] + list(a))
sha = git('rev-parse', sys.argv[1] + '^{commit}').decode().strip()
nucleo = git('show', sha + ':dist/dn.min.js')
sri = 'sha384-' + base64.b64encode(hashlib.sha384(nucleo).digest()).decode()
plantilla = open(os.path.join(RAIZ, 'sello', 'completo.html'), encoding='utf-8', newline='').read()
s = plantilla.replace('{{SHA}}', sha).replace('{{SRI}}', sri)
sys.stdout.write(s)
sys.stderr.write('commit %s · núcleo %s\nsello: %d caracteres · sha256 %s\n' % (sha, sri, len(s), hashlib.sha256(s.encode('utf-8')).hexdigest()))
