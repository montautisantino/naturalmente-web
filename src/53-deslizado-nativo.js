/* Carruseles con deslizado nativo en celulares (igual en Safari/Chrome y en los navegadores de Instagram, WhatsApp, etc.).
   El carrusel del tema (Swiper) a veces no arranca dentro de esas apps: la galería no deja ver las otras fotos y las filas
   de productos quedan quietas o en blanco. Acá, en celular, la galería de la ficha y las filas de productos del tema
   (inicio, relacionados, complementarios) se pasan a deslizado nativo del navegador, con puntitos propios en la galería.
   Si el tema llegó a armar su carrusel, se desarma antes; si lo arma después, se vuelve a desarmar. */
!function(){var W=window,d=document;if(W.__dnNat)return;W.__dnNat=1;
if(Math.min(screen.width||9999,screen.height||9999)>=768)return;
var st=d.createElement('style');st.textContent=
'.dn-nat{overflow:visible!important}.dn-nat>.swiper-wrapper{display:flex!important;transform:none!important;overflow-x:auto!important;overflow-y:hidden!important;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;overscroll-behavior-x:contain}.dn-nat>.swiper-wrapper::-webkit-scrollbar{display:none}'+
'.dn-nat .swiper-slide-duplicate{display:none!important}.dn-nat .swiper-slide{scroll-snap-align:start;transform:none!important;opacity:1!important;visibility:visible!important}'+
'.dn-nat.dn-natp>.swiper-wrapper{gap:10px;padding:4px 14px 12px;scroll-padding:0 14px}.dn-nat.dn-natp .swiper-slide{flex:0 0 46%!important;width:46%!important;max-width:46%!important;margin:0!important}'+
'.dn-nat.dn-natg>.swiper-wrapper{gap:0}.dn-nat.dn-natg .swiper-slide{flex:0 0 100%!important;width:100%!important}'+
'.dn-nat~.swiper-button-prev,.dn-nat~.swiper-button-next,.dn-nat .swiper-button-prev,.dn-nat .swiper-button-next,.dn-nat~.js-swiper-product-pagination,.dn-nat .swiper-pagination{display:none!important}'+
'.dn-ndots{display:flex;justify-content:center;gap:6px;padding:10px 0 2px}.dn-ndots i{width:7px;height:7px;border-radius:99px;background:#c9d6c0;transition:width .25s,background .25s}.dn-ndots i.on{width:20px;background:#1d4a2a}';
d.head.appendChild(st);
/* imágenes que esperaban al carrusel del tema para cargarse */
function wake(c){[].forEach.call(c.querySelectorAll('img[data-src],img[data-srcset],source[data-srcset]'),function(i){var r=i.getBoundingClientRect();if(r.left>innerWidth*2.2||r.right<-innerWidth)return;if(i.classList.contains('lazyloaded')&&i.getAttribute('src')&&!/^data:/.test(i.getAttribute('src')))return;if(i.getAttribute('data-srcset'))i.setAttribute('srcset',i.getAttribute('data-srcset'));if(i.getAttribute('data-src'))i.setAttribute('src',i.getAttribute('data-src'));i.classList.remove('swiper-lazy');i.classList.add('lazyloaded')})}
function conv(el,kind){var sw=el.swiper;if(sw&&!sw.destroyed&&!sw.__dnOff){sw.__dnOff=1;
/* se desarma sin borrar el objeto: el tema lo sigue usando (por ejemplo, al elegir otra variante mueve la galería);
   esos movimientos se pasan al deslizado nativo en vez de romper */
try{sw.destroy(false,true)}catch(e){}
var wr0=el.querySelector(':scope>.swiper-wrapper');var nat=function(i){try{if(wr0)wr0.scrollTo({left:Math.max(0,+i||0)*wr0.clientWidth,behavior:'smooth'})}catch(e){}return true};
['slideTo','slideToLoop'].forEach(function(k){sw[k]=nat});['slideNext','slidePrev','update','updateSize','updateSlides','updateProgress','updateSlidesClasses','loopFix','setTranslate','setTransition'].forEach(function(k){sw[k]=function(){return true}});sw.destroyed=false}
el.classList.remove('swiper-container-initialized','swiper-container-horizontal');
var wr=el.querySelector(':scope>.swiper-wrapper');if(!wr)return;wr.removeAttribute('style');
[].forEach.call(wr.querySelectorAll(':scope>.swiper-slide'),function(s){s.style.removeProperty('transform');s.style.removeProperty('margin-right');if(kind==='p'){s.style.removeProperty('width')}});
if(el.classList.contains('dn-nat'))return;el.classList.add('dn-nat',kind==='g'?'dn-natg':'dn-natp');
var t=0;wr.addEventListener('scroll',function(){if(t)return;t=requestAnimationFrame(function(){t=0;wake(wr);if(kind==='g')dots(el,wr)})},{passive:true});wake(wr);
if(kind==='g'){var n=wr.querySelectorAll(':scope>.swiper-slide:not(.swiper-slide-duplicate)').length;if(n>1){var dt=d.createElement('div');dt.className='dn-ndots';dt.setAttribute('aria-hidden','true');for(var k=0;k<n;k++)dt.appendChild(d.createElement('i'));el.parentNode.insertBefore(dt,el.nextSibling);dots(el,wr)}}}
function dots(el,wr){var dt=el.nextElementSibling;if(!dt||!dt.classList.contains('dn-ndots'))return;var k=Math.round(wr.scrollLeft/Math.max(1,wr.clientWidth));[].forEach.call(dt.children,function(x,j){x.classList.toggle('on',j===k)})}
function scan(){var g=d.querySelector('#single-product .js-swiper-product');if(g)conv(g,'g');
[].forEach.call(d.querySelectorAll('.swiper-container,.swiper'),function(el){if(el===g||el.closest('.dn-band,#dn-tcar,.modal'))return;var w=el.querySelector(':scope>.swiper-wrapper');if(!w||!w.querySelector(':scope>.swiper-slide .js-item-product,:scope>.swiper-slide.js-item-product'))return;conv(el,'p')})}
scan();var n=0,iv=setInterval(function(){scan();if(++n>30)clearInterval(iv)},300);
addEventListener('load',function(){scan();setTimeout(scan,1500)});
if(W.MutationObserver){var mo=new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var x=ms[i].target;if(x.classList&&x.classList.contains('dn-nat')&&x.classList.contains('swiper-container-initialized')){scan();return}}});mo.observe(d.body,{attributes:true,attributeFilter:['class'],subtree:true})}
}();
