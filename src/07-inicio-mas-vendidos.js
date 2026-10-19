!function(){var d=document;if(!d.body.classList.contains('template-home'))return;
var s=d.querySelector('[data-store="home-products-sale"]');if(!s)return;var sw=s.querySelector('.swiper-container,.swiper'),h=s.querySelector('.js-products-sale-title'),ref=s.querySelector('.js-item-product');if(!sw||!ref)return;
function ok(e){var n=((e.querySelector('.js-item-name,.item-name')||{}).textContent||'');return n&&!/combo/i.test(n)}
function grab(p){return fetch('/productos/?sort_by=best-selling'+(p>1?'&page='+p:'')).then(function(r){return r.text()}).then(function(t){return[].slice.call(new DOMParser().parseFromString(t,'text/html').querySelectorAll('.js-item-product[data-product-id]')).filter(ok)})}
grab(1).then(function(a){return a.length>=10?a:grab(2).then(function(b){return a.concat(b)})}).then(function(it){
var seen={};it=it.filter(function(e){var k=e.getAttribute('data-product-id');if(seen[k])return!1;seen[k]=1;return!0}).slice(0,10);if(it.length<4)return;
var cls=ref.className,html=it.map(function(e){e.className=cls;return'<div class="swiper-slide">'+e.outerHTML+'</div>'}),w=sw.swiper;
if(w){if(w.params.loop&&w.loopDestroy)w.loopDestroy();w.removeAllSlides();w.appendSlide(html);if(w.params.loop&&w.loopCreate)w.loopCreate();w.update();w.slideTo&&w.slideTo(w.params.loop?w.loopedSlides||0:0,0)}
else{var wr=sw.querySelector('.swiper-wrapper');if(!wr)return;wr.innerHTML=html.join('')}
if(h)h.textContent='Productos destacados';s.classList.add('dn-mv')}).catch(function(){})}();
