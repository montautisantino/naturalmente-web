#!/bin/sh
# Arma el archivo dividido por tipo de página:
#   dist/dn.min.js            -> núcleo (todas las páginas) + cargador de la parte que corresponde
#   dist/dn-<parte>.min.js    -> home, listado (categorías y búsqueda), producto, media
# Cada parte se carga con su huella SRI, que va escrita dentro del núcleo (el núcleo a su vez
# se verifica con la huella que está en el sello de Tiendanube).
set -e
mkdir -p "$(dirname "$0")/build"
cd "$(dirname "$0")"
T="npx -y terser@5.31.0"
CORE="01 16 02 05 09 10 11 13 17 18 20 23"
CUENTA="15 24"
PEDIDO="22"
HOME_P="06 25"
MEDIA="03 04 27"
LISTADO="00 12 21 26"
PRODUCTO="00 14 19"
cat_mods() { for n in $1; do f=$(ls src/$n-*.js); echo "/* $f */"; echo "try{"; cat "$f"; echo; echo "}catch(e){}"; done; }
sri() { echo "sha384-$(openssl dgst -sha384 -binary "$1" | openssl base64 -A)"; }
MAP=""
for p in home media listado producto cuenta pedido; do
  case $p in home) L=$HOME_P;; media) L=$MEDIA;; listado) L=$LISTADO;; producto) L=$PRODUCTO;; cuenta) L=$CUENTA;; pedido) L=$PEDIDO;; esac
  { echo "/* Dieteticas Naturalmente - parte: $p */"; echo "!function(){if(window.__dn_$p)return;window.__dn_$p=1;"; cat_mods "$L"; echo "}();"; } > build/dn-$p.js
  $T build/dn-$p.js -c passes=2 -m -o dist/dn-$p.min.js
  MAP="$MAP$p:'$(sri dist/dn-$p.min.js)',"
done
{
  echo "/* Dieteticas Naturalmente - nucleo (todas las paginas). Se carga desde Tiendanube. */"
  echo "!function(){if(window.__dnExt)return;window.__dnExt=1;var CS=document.currentScript;"
  cat_mods "$CORE"
  cat <<JS
/* cargador de la parte de cada página */
try{!function(){var d=document,B=d.body,M={${MAP%,}},src=CS&&CS.src;if(!src)return;var m=src.match(/^(https:\/\/[^\/]+)(.*\/)dn\.min\.js/);if(!m)return;
var k=B.classList.contains('template-home')?'home':(B.classList.contains('template-category')||B.classList.contains('template-search'))?'listado':B.classList.contains('template-product')?'producto':/\btemplate-account/.test(B.className)?'cuenta':/^\/donde-esta-mi-pedido\/?$/.test(location.pathname)?'pedido':d.querySelector('.dn-media')?'media':'';if(!k)return;
var H=[m[1]].concat(['https://cdn.jsdelivr.net','https://fastly.jsdelivr.net','https://gcore.jsdelivr.net'].filter(function(h){return h!==m[1]})),i=0;
function L(){if(window['__dn_'+k]||i>=H.length)return;var e=d.createElement('script');e.src=H[i++]+m[2]+'dn-'+k+'.min.js';e.integrity=M[k];e.crossOrigin='anonymous';e.onerror=L;d.head.appendChild(e)}L()}()}catch(e){}
JS
  echo "}();"
} > build/dn.js
$T build/dn.js -c passes=2 -m -o dist/dn.min.js
wc -c dist/*.min.js
echo "SRI nucleo: $(sri dist/dn.min.js)"
