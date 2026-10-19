#!/bin/sh
# Arma dist/dn.js (cada bloque aislado con try/catch, y protegido contra doble carga) y dist/dn.min.js
set -e
cd "$(dirname "$0")"
{
  echo "/* Dieteticas Naturalmente - funciones no criticas (Media, videos, inicio, 404, buscador, menu, test). Se carga desde Tiendanube. */"
  echo "!function(){if(window.__dnExt)return;window.__dnExt=1;"
  for f in src/*.js; do echo "/* $f */"; echo "try{"; cat "$f"; echo; echo "}catch(e){}"; done
  echo "}();"
} > dist/dn.js
npx -y terser@5.31.0 dist/dn.js -c passes=2 -m -o dist/dn.min.js
wc -c dist/dn.min.js
echo "SRI: sha384-$(openssl dgst -sha384 -binary dist/dn.min.js | openssl base64 -A)"
