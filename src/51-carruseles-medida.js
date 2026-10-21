/* Carruseles (fotos de la ficha, combos, productos del inicio, relacionados) en celulares.
   En el navegador que se abre desde un link (Instagram, WhatsApp, etc.) en iPhone, al bajar y volver a subir la pantalla
   cambia de tamaño y el carrusel se vuelve a calcular con medidas de pantalla grande: la foto de la ficha queda a un tercio
   del ancho y las tarjetas de productos quedan en blanco. Acá, en celulares, cada carrusel se queda con la configuración
   con la que se abrió (que se ve bien) y se vuelve a medir si quedó con un ancho viejo. */
!function(){var W=window,d=document;if(W.__dnSwFix)return;W.__dnSwFix=1;
var MOB=Math.min(screen.width||9999,screen.height||9999)<768;
/* nada puede ensanchar la página hacia los costados (eso hace que el navegador crea que la pantalla es más ancha) */
var st=d.createElement('style');st.textContent='html,body{overflow-x:clip}'+(MOB?'#single-product .js-swiper-product,#single-product .js-swiper-product>.swiper-wrapper{width:100%!important;max-width:100%!important}#single-product .js-swiper-product .js-product-slide{width:100%!important;max-width:100%!important;flex-shrink:0!important}#single-product .js-product-slide-link{display:block!important;width:100%!important}':'');d.head.appendChild(st);
/* foto del producto en celular: tamaño fijo, cuadrada y a todo el ancho, pase lo que pase con la pantalla */
if(MOB){var gs=d.createElement('style');gs.textContent='.dn-galp{width:100%!important;max-width:100%!important;flex:0 0 100%!important;min-width:0}'+
'#single-product .js-swiper-product{width:100%!important;max-width:100%!important;overflow:hidden!important}'+
'#single-product .js-swiper-product .js-product-slide-link{display:block!important;position:relative!important;width:100%!important;height:0!important;padding-bottom:100%!important}'+
'#single-product .js-swiper-product .js-product-slide-img,#single-product .js-swiper-product .product-slider-image{position:absolute!important;top:0!important;left:0!important;right:auto!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:contain!important;transform:none!important}';d.head.appendChild(gs);
var tag=function(){var g=d.querySelector('#single-product .js-swiper-product');if(!g)return;for(var e=g.parentElement;e&&e.id!=='single-product';e=e.parentElement){if(/(^|\s)col(-|\s|$)/.test(e.className))e.classList.add('dn-galp')}};tag();setTimeout(tag,800);setTimeout(tag,3000);
/* y además directo sobre cada elemento (gana a cualquier estilo que le pongan después); si alguien lo cambia, se vuelve a poner */
var P=function(e,o){for(var k in o)if(e.style.getPropertyValue(k)!==o[k]||e.style.getPropertyPriority(k)!=='important')e.style.setProperty(k,o[k],'important')};
var pin=function(){var g=d.querySelector('#single-product .js-swiper-product');if(!g)return;W.__dnPin=(W.__dnPin||0)+1;
P(g,{width:'100%','max-width':'100%'});
[].forEach.call(g.querySelectorAll('.swiper-slide'),function(sl){P(sl,{width:'100%','max-width':'100%','min-width':'100%','flex-shrink':'0'})});
[].forEach.call(g.querySelectorAll('.js-product-slide-link'),function(a){P(a,{display:'block',position:'relative',width:'100%',height:'0','padding-bottom':'100%'})});
[].forEach.call(g.querySelectorAll('.js-product-slide-img,.product-slider-image'),function(im){P(im,{position:'absolute',top:'0',left:'0',width:'100%',height:'100%','max-width':'none','max-height':'none','object-fit':'contain',transform:'none'})})};
var pq=0,pinSoon=function(){if(pq)return;pq=requestAnimationFrame(function(){pq=0;pin()})};
pin();[300,1000,2500,5000].forEach(function(t){setTimeout(pin,t)});
var gw=function(){var g=d.querySelector('#single-product .js-swiper-product');if(!g){setTimeout(gw,400);return}new MutationObserver(pinSoon).observe(g,{attributes:true,attributeFilter:['style','class'],subtree:true,childList:true})};gw();
W.addEventListener('resize',pinSoon);W.addEventListener('scroll',pinSoon,{passive:true})}
function each(f){[].forEach.call(d.querySelectorAll('.swiper-container,.swiper'),function(el){var s=el.swiper;if(s&&!s.destroyed)f(el,s)})}
function lock(){if(!MOB)return;each(function(el,s){if(s.__dnLk)return;s.__dnLk={v:s.params.slidesPerView,g:s.params.slidesPerGroup,b:s.params.spaceBetween};s.params.breakpoints=null;s.originalParams&&(s.originalParams.breakpoints=null)})}
function fix(){lock();each(function(el,s){if(!el.offsetParent)return;var k=s.__dnLk,ch=0;
if(k&&(s.params.slidesPerView!==k.v||s.params.spaceBetween!==k.b)){s.params.slidesPerView=k.v;s.params.slidesPerGroup=k.g;s.params.spaceBetween=k.b;ch=1}
var w=el.clientWidth;if(ch||(w&&Math.abs((s.width||0)-w)>2)){try{s.update();if(s.params.loop&&s.loopDestroy&&s.loopCreate&&ch){s.loopDestroy();s.loopCreate()}s.slideTo(s.params.loop?s.activeIndex:s.activeIndex,0,false)}catch(e){}}})}
var t=0;function soon(){fix();clearTimeout(t);t=setTimeout(fix,300)}
W.addEventListener('resize',soon);W.addEventListener('orientationchange',soon);W.addEventListener('pageshow',soon);W.addEventListener('load',soon);
if(W.visualViewport)W.visualViewport.addEventListener('resize',soon);
var sc=0;W.addEventListener('scroll',function(){clearTimeout(sc);sc=setTimeout(fix,150)},{passive:true});
d.addEventListener('visibilitychange',function(){if(!d.hidden)soon()});
/* los carruseles se arman en distintos momentos: se fijan apenas aparecen */
var n=0,iv=setInterval(function(){lock();if(++n>40)clearInterval(iv)},250);
}();
