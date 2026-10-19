/* Respaldo de carruseles de productos: algunos navegadores internos (por ejemplo el de WhatsApp) a veces no
   arrancan los carruseles de Tiendanube y cada producto ocupa la pantalla entera. Primero se les pide que se
   recalculen; si siguen sin arrancar, se muestran como fila deslizable de ~2 productos. */
!function(){var d=document,W=window;if(W.__dnSwFb)return;W.__dnSwFb=1;
var st=d.createElement('style');st.textContent='.dn-nosw{overflow-x:auto!important;overflow-y:hidden!important;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;scrollbar-width:none}.dn-nosw::-webkit-scrollbar{display:none}'+
'.dn-nosw>.swiper-wrapper{display:flex!important;gap:12px;transform:none!important;width:auto!important}.dn-nosw>.swiper-wrapper>.swiper-slide{flex:0 0 44%!important;width:44%!important;max-width:44%!important;margin:0!important;scroll-snap-align:start}'+
'@media(min-width:768px){.dn-nosw>.swiper-wrapper>.swiper-slide{flex-basis:23%!important;width:23%!important;max-width:23%!important}}';d.head.appendChild(st);
function ok(c){return c.swiper||/swiper(-container)?-initialized/.test(c.className)}
function chk(fix){[].forEach.call(d.querySelectorAll('.swiper-container,.swiper'),function(c){if(!c.querySelector(':scope>.swiper-wrapper>.swiper-slide'))return;if(ok(c)){c.classList.remove('dn-nosw');try{c.swiper&&c.swiper.update()}catch(e){}return}if(fix){c.classList.add('dn-nosw');var p=c.parentNode;p&&[].forEach.call(p.querySelectorAll('[class*="swiper-button"],[class*="-prev"],[class*="-next"]'),function(b){if(!c.contains(b))b.style.display='none'})}})}
/* carrusel que arrancó mal (se midió cuando estaba oculto): cada producto ocupa todo el ancho aunque debería verse más de uno */
function bad(c){var sw=c.swiper,sl=c.querySelector(':scope>.swiper-wrapper>.swiper-slide'),cw=c.clientWidth;if(!sw||!sl||!cw)return 0;var v=sw.params&&sw.params.slidesPerView;if(sw.currentBreakpoint&&sw.params.breakpoints&&sw.params.breakpoints[sw.currentBreakpoint])v=sw.params.breakpoints[sw.currentBreakpoint].slidesPerView||v;return typeof v==='number'&&v>=1.5&&sl.getBoundingClientRect().width>cw*.72}
function heal(c){if(!bad(c))return;try{c.swiper.update()}catch(e){}setTimeout(function(){if(!bad(c))return;try{c.swiper.destroy(true,true)}catch(e){}[].forEach.call(c.querySelectorAll('.swiper-slide-duplicate'),function(x){x.remove()});c.classList.add('dn-nosw');var p=c.parentNode;p&&[].forEach.call(p.querySelectorAll('[class*="swiper-button"],[class*="-prev"],[class*="-next"]'),function(b){if(!c.contains(b))b.style.display='none'})},250)}
function all(){[].forEach.call(d.querySelectorAll('.swiper-container,.swiper'),function(c){if(c.swiper)heal(c)})}
if(W.IntersectionObserver){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&e.target.swiper)heal(e.target)})},{rootMargin:'200px 0px'});var obs=function(){[].forEach.call(d.querySelectorAll('.swiper-container,.swiper'),function(c){if(!c.__dnIo){c.__dnIo=1;io.observe(c)}})};obs();setTimeout(obs,1500);setTimeout(obs,5000)}
addEventListener('pageshow',function(){setTimeout(all,300)});
function go(){setTimeout(all,600);setTimeout(all,2000);try{W.dispatchEvent(new Event('resize'))}catch(e){}setTimeout(function(){chk(0)},300);setTimeout(function(){chk(1)},2500);setTimeout(function(){chk(1)},6000)}
if(d.readyState==='complete')go();else W.addEventListener('load',go);
}();
