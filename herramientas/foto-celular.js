/* ===========================================================================
   FOTO DEL CELULAR · herramientas/foto-celular.js
   Huella de estilos de una página para comprobar que una publicación no cambió
   nada en el celular. Se pega en la página (con el navegador en modo celular,
   375 px) ANTES y DESPUÉS de publicar, y se comparan:
     dnFoto('antes')            -> guarda la huella de esta página
     dnFoto('despues')          -> idem, después de publicar
     dnComparar('antes','despues')
   La huella: para cada tipo de elemento (etiqueta + clases + padre) guarda los
   estilos calculados (márgenes, rellenos, tipografía, colores, display, etc.).
   No mira textos ni medidas que dependen del contenido (cambian solas: productos
   al azar, novedades), así que si algo sale "distinto" es un cambio de estilos.
   Además informa: ancho, si hay desborde horizontal y si se cargó algo del diseño
   de computadora (en el celular tiene que dar siempre "dk: false").
   =========================================================================== */
window.dnFoto=function(tag){
var P=['display','position','float','box-sizing','margin-top','margin-right','margin-bottom','margin-left','padding-top','padding-right','padding-bottom','padding-left','border-top-width','border-bottom-width','border-left-width','border-right-width','border-top-left-radius','font-family','font-size','font-weight','line-height','letter-spacing','text-transform','text-align','color','background-color','background-image','flex-direction','flex-wrap','justify-content','align-items','gap','grid-template-columns','overflow-x','overflow-y','z-index','visibility','white-space','object-fit','max-width','min-width','top','left','right','bottom'];
function h(s){var x=2166136261;for(var i=0;i<s.length;i++){x^=s.charCodeAt(i);x=Math.imul(x,16777619)}return(x>>>0).toString(16)}
var sig={},n=0,ST=/^(dn-rv\d|in|on|sc|ok|open|show|active|selected|visible|hidden|loaded|lazyloaded|fade.*|swiper-slide-.*|js-.*)$/;
[].forEach.call(document.querySelectorAll('body *'),function(e){
if(/^(SCRIPT|STYLE|LINK|META|NOSCRIPT|TEMPLATE|BR|path|circle|rect|line|polyline|polygon|g|use|defs)$/i.test(e.tagName))return;
if(e.hasAttribute('style'))return;
var cl=typeof e.className==='string'?e.className.trim().split(/\s+/).filter(function(c){return c&&!ST.test(c)}).sort().join('.'):'';
var pe=e.parentElement,k=e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(cl?'.'+cl:'')+'<'+(pe?pe.tagName.toLowerCase()+(pe.id?'#'+pe.id:''):'');
var cs=getComputedStyle(e),v=P.map(function(p){return cs.getPropertyValue(p)}).join('|');
(sig[k]=sig[k]||{})[h(v)]=1;n++});
var de=document.documentElement,o={t:tag,p:location.pathname+location.search,w:innerWidth,H:de.scrollHeight,ov:de.scrollWidth>innerWidth+1,
dk:!!(document.getElementById('dn-dk-css')||de.classList.contains('dn-dk')||window.__dnDk||window.__dn_escritorio||document.querySelector('script[src*="dn-escritorio"]')||(performance.getEntriesByType('resource')||[]).some(function(r){return/dn-escritorio/.test(r.name)})),
n:n,sig:{}};Object.keys(sig).forEach(function(k){o.sig[k]=Object.keys(sig[k]).sort().join(',')});o.k=Object.keys(o.sig).length;
try{localStorage.setItem('dnFoto:'+tag+':'+o.p,JSON.stringify(o))}catch(e){o.err=1}
return{t:o.t,p:o.p,w:o.w,H:o.H,ov:o.ov,dk:o.dk,n:o.n,k:o.k,guardada:!o.err}};
window.dnComparar=function(a,b){var p=location.pathname+location.search,A=JSON.parse(localStorage.getItem('dnFoto:'+a+':'+p)||'null'),B=JSON.parse(localStorage.getItem('dnFoto:'+b+':'+p)||'null');if(!A||!B)return'falta una foto de '+p;
var d=[],oa=0,ob=0;Object.keys(A.sig).forEach(function(k){if(!(k in B.sig)){oa++;return}if(A.sig[k]!==B.sig[k])d.push(k)});Object.keys(B.sig).forEach(function(k){if(!(k in A.sig))ob++});
return{p:p,dk:[A.dk,B.dk],ov:[A.ov,B.ov],ancho:[A.w,B.w],comunes:Object.keys(A.sig).length-oa,distintos:d.length,ejemplos:d.slice(0,15),soloAntes:oa,soloDespues:ob}};
window.dnFotoBorrar=function(){Object.keys(localStorage).filter(function(k){return/^dnFoto/.test(k)}).forEach(function(k){localStorage.removeItem(k)});return'ok'};
