/* ===========================================================================
   DISEÑO PARA COMPUTADORA · comportamientos  ·  estilos/escritorio.js
   Este código va envuelto (estilos/compilar.js) dentro de un chequeo de ancho:
   solo corre si la pantalla mide 1024 px o más. En el celular no existe.
   Variables disponibles: d (document), W (window), q (matchMedia de 1024 px).
   =========================================================================== */

/* el ancho del contenido cambió (grilla de 1116): los carruseles (Swiper de la plantilla y los propios)
   se vuelven a medir con un evento de cambio de tamaño */
setTimeout(function(){try{W.dispatchEvent(new Event('resize'))}catch(e){}},60);
setTimeout(function(){try{W.dispatchEvent(new Event('resize'))}catch(e){}},1200);

/* espera a que aparezca un elemento (las páginas de Media se arman después de cargar) */
function wait(sel,fn,n){var e=d.querySelector(sel);if(e)return fn(e);if((n||0)>80)return;setTimeout(function(){wait(sel,fn,(n||0)+1)},250)}

/* ===== Nota (blog): columna lateral con el índice y los productos ===== */
if(d.querySelector('.dm-nota'))wait('.dm-nota article.nt .nt-bd',function(bd){
var A=bd.closest('article.nt');if(!A||A.querySelector('.dk-sd'))return;
var hs=[].filter.call(bd.querySelectorAll('h3[id]'),function(h){return h.textContent.trim()});
var sd=d.createElement('aside');sd.className='dk-sd';sd.hidden=true;sd.setAttribute('aria-label','En esta nota');
var toc=null;
if(hs.length>=2){toc=d.createElement('nav');toc.className='dk-toc';toc.innerHTML='<p class="dk-tt">En esta nota</p><ol></ol>';var ol=toc.querySelector('ol');
hs.forEach(function(h){var li=d.createElement('li'),a=d.createElement('a');a.href='#'+h.id;a.textContent=h.textContent.trim();li.appendChild(a);ol.appendChild(li)});sd.appendChild(toc)}
var hd=A.querySelector('.nt-hd');A.insertBefore(sd,hd?hd.nextSibling:A.firstChild);
/* productos: la sección de productos de la nota pasa a la columna (y vuelve a su lugar si la ventana se achica) */
var moved=[];
function on(){A.classList.add('dk-2c');if(toc)A.classList.add('dk-on')}
function grab(sec){if(!sec||sec.parentNode===sd)return;var mk=d.createComment('dk');sec.parentNode.insertBefore(mk,sec);moved.push([sec,mk]);if(q.matches)sd.appendChild(sec);on()}
function back(){moved.forEach(function(x){if(x[1].parentNode&&x[0].parentNode===sd)x[1].parentNode.insertBefore(x[0],x[1])})}
function put(){moved.forEach(function(x){if(x[0].parentNode!==sd)sd.appendChild(x[0])})}
if(toc)on();
grab(A.querySelector('.nt-pr'));
/* notas sin lista propia: los productos sugeridos llegan unos segundos después */
if(!moved.length&&W.MutationObserver){var mo=new MutationObserver(function(){var s=A.querySelector('.dn-mvb');if(s&&s.parentNode!==sd){grab(s);mo.disconnect()}});mo.observe(A,{childList:true,subtree:true});setTimeout(function(){mo.disconnect()},30000)}
/* la columna acompaña al bajar, justo debajo del encabezado fijo */
function top(){var H=d.querySelector('.js-head-main');A.style.setProperty('--dk-top',Math.round((H?H.getBoundingClientRect().height:150)+20)+'px')}
top();setTimeout(top,1500);W.addEventListener('resize',top,{passive:true});
/* índice: resalta la sección que se está leyendo */
if(toc){var L=[].slice.call(toc.querySelectorAll('a')),cur=-1,tk=0;
function spy(){tk=0;if(!q.matches)return;var lim=(parseFloat(A.style.getPropertyValue('--dk-top'))||170)+innerHeight*.22,k=-1;for(var i=0;i<hs.length;i++){if(hs[i].getBoundingClientRect().top<=lim)k=i;else break}
if(k!==cur){if(cur>=0&&L[cur])L[cur].classList.remove('on');if(k>=0&&L[k])L[k].classList.add('on');cur=k}}
W.addEventListener('scroll',function(){if(!tk){tk=1;(W.requestAnimationFrame||setTimeout)(spy)}},{passive:true});spy()}
function chg(){if(q.matches)put();else back()}
try{q.addEventListener('change',chg)}catch(e){try{q.addListener(chg)}catch(e2){}}
});
