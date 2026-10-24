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
CORE="NB 60 01 16 02 EPL 34 05 09 10 11 13 17 18 20 23 28 29 30 32 38 41 43 44 51 53 54 55 58"
CUENTA="15 24 37"
PEDIDO="22"
HOME_P="45 06 07 33 25 36 42"
MEDIA="45 03 31 04 27 35 36 39 40"
LISTADO="00 12 21 26"
PRODUCTO="00 LA 59 14 19 48 49 50 52 56 57"
# lista corta de episodios de Media (sale de src/31-episodios.js) para la tarjeta aleatoria del inicio
node estilos/compilar.js
# notas publicadas en el blog de Tiendanube (sale de contenido/notas-blog.json): slug -> id corto
node -e "var m=JSON.parse(require('fs').readFileSync('contenido/notas-blog.json','utf8')),o={};Object.keys(m).forEach(function(s){var x=m[s].slice(('/blog/posts/'+s+'-').length);if(/^[0-9a-f]{12}$/.test(x))o[s]=x});require('fs').writeFileSync('build/nblist.js','/* lista generada por build.sh */\\nwindow.dnNB='+JSON.stringify(o)+';')"
# lista de productos con landing automática (sale de contenido/lp/*.json; "tipo": c = combo, s = suplemento)
node -e "var fs=require('fs'),m={};fs.readdirSync('contenido/lp').filter(function(f){return/\\.json$/.test(f)}).forEach(function(f){var j=JSON.parse(fs.readFileSync('contenido/lp/'+f,'utf8'));m[f.slice(0,-5)]=j.tipo==='c'?'c':'s'});fs.writeFileSync('build/lalist.js','/* lista generada por build.sh */\\nwindow.dnLA='+JSON.stringify(m)+';')"
node -e "var s=require('fs').readFileSync('src/31-episodios.js','utf8'),a=s.indexOf('var EP=['),b=s.indexOf('\\n];',a);var EP=eval(s.slice(a+7,b+2));require('fs').writeFileSync('build/eplist.js','/* lista generada por build.sh */\\nwindow.dnEPL='+JSON.stringify(EP.map(function(x){return{h:'/naturalmente-media/?ep='+x.s,t:x.t,n:x.src.split(' · ')[0]+' · '+x.meta[1].replace(/^\\u23f1\\s*/,''),y:x.yt}}))+';')"
cat_mods() { for n in $1; do if [ "$n" = EPL ]; then f=build/eplist.js; elif [ "$n" = LA ]; then f=build/lalist.js; elif [ "$n" = NB ]; then f=build/nblist.js; else f=$(ls src/$n-*.js); fi; echo "/* $f */"; echo "try{"; cat "$f"; echo; echo "}catch(e){}"; done; }
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
