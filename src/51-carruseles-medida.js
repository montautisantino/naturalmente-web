/* Carruseles (fotos de la ficha, combos y productos del inicio): en los navegadores que abren Instagram/WhatsApp en iPhone
   la pantalla cambia de tamaño al bajar y subir (aparece y se esconde la barra de la app). Si el carrusel se mide en ese
   momento queda con un ancho viejo: la foto de la ficha se ve chica o las tarjetas quedan en blanco. Acá se vuelve a medir
   cada carrusel cuando su ancho guardado no coincide con el real. */
!function(){var W=window,d=document;if(W.__dnSwFix)return;W.__dnSwFix=1;
function fix(){[].forEach.call(d.querySelectorAll('.swiper-container,.swiper'),function(el){var s=el.swiper;if(!s||s.destroyed||!el.offsetParent)return;var w=el.clientWidth;if(w&&Math.abs((s.width||0)-w)>2){try{s.update();if(s.params&&s.params.loop&&s.loopFix)s.loopFix();s.slideTo(s.activeIndex,0,false)}catch(e){}}})}
var t=0;function later(){clearTimeout(t);t=setTimeout(fix,250)}
W.addEventListener('resize',later);W.addEventListener('orientationchange',later);W.addEventListener('pageshow',later);W.addEventListener('load',later);
if(W.visualViewport)W.visualViewport.addEventListener('resize',later);
var st=0;W.addEventListener('scroll',function(){clearTimeout(st);st=setTimeout(fix,200)},{passive:true});
d.addEventListener('visibilitychange',function(){if(!d.hidden)later()});
setTimeout(fix,1500);setTimeout(fix,4000);
}();
