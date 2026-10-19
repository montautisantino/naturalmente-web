/* Respaldo de carruseles de productos: algunos navegadores internos (por ejemplo el de WhatsApp) a veces no
   arrancan los carruseles de Tiendanube y cada producto ocupa la pantalla entera. Primero se les pide que se
   recalculen; si siguen sin arrancar, se muestran como fila deslizable de ~2 productos. */
!function(){var d=document,W=window;if(W.__dnSwFb)return;W.__dnSwFb=1;
var st=d.createElement('style');st.textContent='.dn-nosw{overflow-x:auto!important;overflow-y:hidden!important;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;scrollbar-width:none}.dn-nosw::-webkit-scrollbar{display:none}'+
'.dn-nosw>.swiper-wrapper{display:flex!important;gap:12px;transform:none!important;width:auto!important}.dn-nosw>.swiper-wrapper>.swiper-slide{flex:0 0 44%!important;width:44%!important;max-width:44%!important;margin:0!important;scroll-snap-align:start}'+
'@media(min-width:768px){.dn-nosw>.swiper-wrapper>.swiper-slide{flex-basis:23%!important;width:23%!important;max-width:23%!important}}';d.head.appendChild(st);
function ok(c){return c.swiper||/swiper(-container)?-initialized/.test(c.className)}
function chk(fix){[].forEach.call(d.querySelectorAll('.swiper-container,.swiper'),function(c){if(!c.querySelector(':scope>.swiper-wrapper>.swiper-slide'))return;if(ok(c)){c.classList.remove('dn-nosw');try{c.swiper&&c.swiper.update()}catch(e){}return}if(fix){c.classList.add('dn-nosw');var p=c.parentNode;p&&[].forEach.call(p.querySelectorAll('[class*="swiper-button"],[class*="-prev"],[class*="-next"]'),function(b){if(!c.contains(b))b.style.display='none'})}})}
function go(){try{W.dispatchEvent(new Event('resize'))}catch(e){}setTimeout(function(){chk(0)},300);setTimeout(function(){chk(1)},2500);setTimeout(function(){chk(1)},6000)}
if(d.readyState==='complete')go();else W.addEventListener('load',go);
}();
