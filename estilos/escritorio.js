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

/* ===== Inicio (Feed): una sola columna centrada, igual que en el celular ===== */
/* El feed del celular se arma con las reglas para pantallas chicas (max-width:767px); las de pantallas
   medianas (min-width:768px) lo convertían en el "collage" de la compu. Acá, solo para lo que está
   DENTRO del feed: las de pantalla mediana se apagan y las de pantalla chica se copian en el mismo lugar
   de su hoja (así ganan y pierden contra las mismas reglas que en el celular). Encabezado, pie, menú y
   ventanas (test, favoritos, compartir) no se tocan. Si la ventana se achica a menos de 1024 px, todo
   vuelve a como estaba. */
if(d.body&&d.body.classList.contains('template-home'))(function(){
var C=d.querySelector('.js-home-sections-container'),R=d.documentElement;if(!C)return;
/* marcas de las secciones del feed (para reglas de secciones que todavía no se armaron) */
var MK=/#hb-|#dn-(not|sub|lep|qzc|prg|loc|ig|rv)\b|\.dn-lib\b|-home\b|\.hb-/;
var OFF=[],SW=[],on=0;
function strip(s){return s.replace(/::?(after|before|first-letter|first-line|placeholder|marker|selection|backdrop|-webkit-[a-z-]+|-moz-[a-z-]+)(\([^)]*\))?/g,'').replace(/:(hover|focus|active|focus-visible|focus-within|visited)\b/g,'')}
function split(s){var o=[],k=0,c='';for(var i=0;i<s.length;i++){var h=s.charAt(i);if(h=='('||h=='[')k++;else if(h==')'||h==']')k--;if(h==','&&!k){o.push(c);c=''}else c+=h}o.push(c);return o.map(function(x){return x.trim()}).filter(Boolean)}
/* ¿la regla toca solo cosas del feed? (o cosas del feed que todavía no aparecieron) */
function feed(s){var i=0,o=0;try{[].forEach.call(d.querySelectorAll(strip(s)||'#dk-x'),function(e){if(C.contains(e))i++;else o++})}catch(e){return 0}return!o&&(i||MK.test(s))}
function scan(){var ch=0;
[].forEach.call(d.styleSheets,function(ss){var rs;if(ss.href)return;try{rs=ss.cssRules}catch(e){return}
for(var j=rs.length-1;j>=0;j--){var r=rs[j];if(r.type!==4||r.__dk)continue;var mt=r.media.mediaText.replace(/\s+/g,'');
if(mt=='(min-width:768px)')[].forEach.call(r.cssRules,function(c){if(c.type!==1||c.__dk||!feed(c.selectorText))return;c.__dk=1;
var x=[c,c.selectorText,split(c.selectorText).map(function(p){return'html:not(.dk-feed) '+p}).join(',')];OFF.push(x);if(on)c.selectorText=x[2];ch=1});
else if(mt=='(max-width:767px)'){var t='';[].forEach.call(r.cssRules,function(c){if(c.type!==1||c.__dk||!feed(c.selectorText))return;c.__dk=1;t+=c.cssText});
if(t)try{ss.cssRules[ss.insertRule('@media (min-width:1024px){'+t+'}',j+1)].__dk=1;ch=1}catch(e){}}}});
return ch}
/* carruseles de productos de la plantilla (Swiper): en la compu ponían 5 tarjetas apretadas; vuelven a
   la configuración del celular (2 y un cuarto) */
function bp(s,b){try{s.params.breakpoints=b;s.originalParams.breakpoints=b;s.currentBreakpoint=null;s.setBreakpoint();s.update()}catch(e){}}
function swp(){[].forEach.call(C.querySelectorAll('.swiper-container'),function(el){var s=el.swiper;if(!s||!s.params||!s.originalParams||s.__dk)return;
var b=s.params.breakpoints,k=b?Object.keys(b):[];if(!k.length)return;s.__dk=1;var x=[s,b,{99999:b[k[k.length-1]]}];SW.push(x);if(on)bp(s,x[2])})}
/* filas que se deslizan con el dedo y no tienen flechas propias (videos): en la compu, con el mouse,
   se agregan flechas en la línea de "Deslizá para ver más" */
function nav(){[].forEach.call(C.querySelectorAll('.hb .er'),function(r){var s=r.closest('.hb'),h=s&&s.querySelector('.hn');if(!h||h.querySelector('.dk-nv')||s.querySelector('.pv,.nx'))return;
var w=d.createElement('span');w.className='dk-nv';w.innerHTML='<button type="button" class="dk-pv" aria-label="Anterior">‹</button><button type="button" class="dk-nx" aria-label="Siguiente">›</button>';h.appendChild(w);
function go(n){var c=r.querySelector('a,div');r.scrollBy({left:n*((c?c.getBoundingClientRect().width:240)+12),behavior:'smooth'})}
function st(){var e=r.scrollWidth-r.clientWidth;w.firstChild.disabled=r.scrollLeft<4;w.lastChild.disabled=r.scrollLeft>e-4}
w.firstChild.addEventListener('click',function(){go(-1)});w.lastChild.addEventListener('click',function(){go(1)});
r.addEventListener('scroll',function(){(W.requestAnimationFrame||setTimeout)(st)},{passive:true});W.addEventListener('resize',st,{passive:true});st()})}
function ok(){if(!on)return;var ch=scan();swp();nav();if(ch)W.dispatchEvent(new Event('resize'))}
function set(v){on=v;R.classList.toggle('dk-feed',!!v);OFF.forEach(function(x){try{x[0].selectorText=v?x[2]:x[1]}catch(e){}});SW.forEach(function(x){bp(x[0],v?x[2]:x[1])});if(v)ok();W.dispatchEvent(new Event('resize'))}
set(1);
/* las secciones del feed se arman de a poco (y "Un rato más" sigue cargando al bajar) */
[400,1500,4000,8000,15000].forEach(function(t){setTimeout(ok,t)});
if(W.MutationObserver){var tm=0,mo=new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(ok,200)});mo.observe(C,{childList:true,subtree:true});setTimeout(function(){mo.disconnect()},60000)}
try{q.addEventListener('change',function(){set(q.matches?1:0)})}catch(e){try{q.addListener(function(){set(q.matches?1:0)})}catch(e2){}}
})();
