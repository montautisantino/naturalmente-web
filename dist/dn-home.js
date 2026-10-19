/* Dieteticas Naturalmente - parte: home */
!function(){if(window.__dn_home)return;window.__dn_home=1;
/* src/06-inicio-sucursales.js */
try{
!function(){var d=document;if(!d.body.classList.contains('template-home'))return;
var sec=d.querySelector('.section-institutional-home'),box=sec&&sec.querySelector('.container'),row=box&&box.querySelector('.row');if(!row||d.getElementById('dn-loc'))return;
var h2=row.querySelector('h2'),p=row.querySelector('p'),lk=row.querySelector('a');
var PIN='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>';
var IC={store:'<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/>',chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',bag:'<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'};
function ic(k){return'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+IC[k]+'</svg>'}
var css='#dn-loc{position:relative;text-align:left;padding-top:24px}.dn-loc-box{position:relative;overflow:hidden;border-top:5px solid #5a3510!important}.dn-loc-box:before{height:30px!important;top:0!important;background:repeating-linear-gradient(90deg,#fff4e0 0 22px,#2d6a3c 22px 44px)!important;box-shadow:none!important}.dn-loc-box:after{display:block!important;content:""!important;position:absolute!important;left:0!important;right:0!important;top:30px!important;bottom:auto!important;width:auto!important;height:11px!important;margin:0!important;transform:none!important;animation:none!important;font-size:0!important;background:radial-gradient(circle at 11px 0,#fff4e0 10.5px,transparent 11px) 0 0/44px 11px repeat-x,radial-gradient(circle at 33px 0,#2d6a3c 10.5px,transparent 11px) 0 0/44px 11px repeat-x!important;filter:drop-shadow(0 4px 3px rgba(0,0,0,.28));z-index:1;pointer-events:none}'+
'#dn-loc .dl-map{position:absolute;inset:-24px -16px;pointer-events:none;opacity:.5;background:linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px) 0 0/26px 26px,linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px) 0 0/26px 26px}'+
'#dn-loc .dl-map:after{content:"";position:absolute;right:-60px;top:-40px;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(255,214,140,.35),transparent 65%)}'+
'#dn-loc>*{position:relative}#dn-loc .dl-eb{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);color:#fde9c6;border-radius:999px;padding:6px 12px;font-size:11px;font-weight:800;letter-spacing:.16em}#dn-loc .dl-eb i{width:7px;height:7px;border-radius:50%;background:#7fd1a0;box-shadow:0 0 0 0 rgba(127,209,160,.7);animation:dlLive 1.8s ease-out infinite}'+
'#dn-loc h2:before,#dn-loc h2:after{display:none!important;content:none!important}#dn-loc h2{margin:2px 0 6px;color:#fff;font:900 22px/1.15 Archivo,Arial,sans-serif;letter-spacing:-.01em}#dn-loc h2 em{font-style:normal;color:#ffd48a}#dn-loc .dl-p{margin:0 0 12px;color:#f6e3c6;font-size:13.5px;line-height:1.45}'+
'#dn-loc .dl-ch{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px}#dn-loc .dl-ch span{display:inline-flex;align-items:center;gap:6px;background:rgba(0,0,0,.18);border:1px solid rgba(255,255,255,.18);color:#fff;border-radius:999px;padding:7px 11px;font-size:12.5px;font-weight:700}#dn-loc .dl-ch svg{color:#ffd48a}'+
'#dn-loc .dl-cs{display:grid;gap:8px;margin:0}#dn-loc .dl-c{display:flex;align-items:center;gap:10px;background:#fffaf2;border-radius:14px;padding:9px 12px;text-decoration:none!important;color:#16261b;box-shadow:0 8px 18px rgba(60,30,5,.25);transition:transform .2s}#dn-loc .dl-c:active{transform:scale(.98)}'+
'#dn-loc .dl-pin{flex:0 0 36px;height:36px;border-radius:11px;background:linear-gradient(135deg,#3f7d3a,#1d4a2a);color:#ffd48a;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 14px rgba(29,74,42,.35)}#dn-loc .dl-pin svg{animation:dlPin 2.4s ease-in-out infinite}'+
'#dn-loc .dl-c:nth-child(2) .dl-pin svg{animation-delay:.3s}#dn-loc .dl-c:nth-child(3) .dl-pin svg{animation-delay:.6s}#dn-loc .dl-tx{flex:1;min-width:0}#dn-loc .dl-tx small{display:block;font-size:10.5px;font-weight:800;letter-spacing:.14em;color:#a8641a}#dn-loc .dl-tx b{display:block;font:800 15px/1.2 Archivo,Arial,sans-serif;color:#1d4a2a;margin:0 0 1px}#dn-loc .dl-tx span{display:block;font-size:12.5px;line-height:1.3;color:#53624f}'+
'#dn-loc .dl-go{display:inline-block;margin-top:2px;font-style:normal;font-size:12px;font-weight:800;color:#3f7d3a}'+
'#dn-loc .dl-ft{display:flex;flex-wrap:wrap;gap:10px}#dn-loc .dl-ft a{flex:1 1 150px;display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;border-radius:999px;font-weight:800;font-size:14.5px;text-decoration:none!important;padding:0 16px}#dn-loc .dl-b1{background:#fff;color:#7c4610!important}#dn-loc .dl-b2{background:#25d366;color:#0f1c13!important;box-shadow:0 8px 18px rgba(37,211,102,.35)}'+
'.dn-in #dn-loc .dl-c{animation:dlIn .6s ease both}.dn-in #dn-loc .dl-c:nth-child(2){animation-delay:.12s}.dn-in #dn-loc .dl-c:nth-child(3){animation-delay:.24s}'+
'@keyframes dlIn{from{opacity:0;transform:translateX(-18px)}to{opacity:1;transform:none}}@keyframes dlPin{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}@keyframes dlLive{0%{box-shadow:0 0 0 0 rgba(127,209,160,.7)}100%{box-shadow:0 0 0 9px rgba(127,209,160,0)}}'+
'@media(min-width:768px){#dn-loc .dl-cs{grid-template-columns:repeat(3,1fr)}#dn-loc .dl-ft a{flex:0 0 auto}}@media(prefers-reduced-motion:reduce){#dn-loc *{animation:none!important}}';
fetch('/nuestras-sucursales/').then(function(r){return r.text()}).then(function(h){
var doc=new DOMParser().parseFromString(h,'text/html'),cs=[].filter.call(doc.querySelectorAll('.dn-suc-card'),function(c){var b=c.querySelector('.dn-suc-badge');return b&&/^sucursal$/i.test(b.textContent.trim())});if(!cs.length)return;
var st=d.createElement('style');st.textContent=css;d.head.appendChild(st);
var cards=cs.map(function(c){var n=(c.querySelector('h3')||{}).textContent||'',a=((c.querySelector('p')||{}).textContent||'').replace(/^[^A-Za-z0-9ÁÉÍÓÚáéíóúÑñ]+/,'').trim(),m=(c.querySelector('a')||{}).href||'#';return'<a class="dl-c" href="'+m+'" target="_blank" rel="noopener"><span class="dl-pin">'+PIN+'</span><span class="dl-tx"><b>'+n.trim()+'</b><span>'+a+'</span><i class="dl-go">Cómo llegar →</i></span></a>'}).join('');
var t=(h2?h2.textContent:'Visitanos en nuestras sucursales').trim().replace(/(sucursales)$/i,'<em>$1</em>');
var tx=p?p.textContent.trim():'';var i=tx.indexOf('. ');if(i>0&&tx.slice(0,i).indexOf('·')>0)tx=tx.slice(i+2);
var w=d.createElement('div');w.id='dn-loc';w.innerHTML='<div class="dl-map"></div><h2>'+t+'</h2>'+(tx?'<p class="dl-p">'+tx+'</p>':'')+
'<div class="dl-cs">'+cards+'</div>';
box.classList.add('dn-loc-box');row.style.display='none';row.parentNode.insertBefore(w,row.nextSibling)}).catch(function(){})}();

}catch(e){}
/* src/07-inicio-mas-vendidos.js */
try{
!function(){var d=document;if(!d.body.classList.contains('template-home'))return;
var s=d.querySelector('[data-store="home-products-sale"]');if(!s)return;var sw=s.querySelector('.swiper-container,.swiper'),h=s.querySelector('.js-products-sale-title'),ref=s.querySelector('.js-item-product');if(!sw||!ref)return;
function ok(e){var n=((e.querySelector('.js-item-name,.item-name')||{}).textContent||'');return n&&!/combo/i.test(n)}
function grab(p){return fetch('/productos/?sort_by=best-selling'+(p>1?'&page='+p:'')).then(function(r){return r.text()}).then(function(t){return[].slice.call(new DOMParser().parseFromString(t,'text/html').querySelectorAll('.js-item-product[data-product-id]')).filter(ok)})}
grab(1).then(function(a){return a.length>=10?a:grab(2).then(function(b){return a.concat(b)})}).then(function(it){
var seen={};it=it.filter(function(e){var k=e.getAttribute('data-product-id');if(seen[k])return!1;seen[k]=1;return!0}).slice(0,10);if(it.length<4)return;
var cls=ref.className,html=it.map(function(e){e.className=cls;return'<div class="swiper-slide">'+e.outerHTML+'</div>'}),w=sw.swiper;
if(w){if(w.params.loop&&w.loopDestroy)w.loopDestroy();w.removeAllSlides();w.appendSlide(html);if(w.params.loop&&w.loopCreate)w.loopCreate();w.update();w.slideTo&&w.slideTo(w.params.loop?w.loopedSlides||0:0,0)}
else{var wr=sw.querySelector('.swiper-wrapper');if(!wr)return;wr.innerHTML=html.join('')}
if(h)h.textContent='Más vendidos';s.classList.add('dn-mv')}).catch(function(){})}();

}catch(e){}
/* src/08-inicio-categorias.js */
try{
!function(){var d=document;if(!d.body.classList.contains('template-home'))return;
var s=d.querySelector('[data-store="home-categories-featured"]'),sw=s&&s.querySelector('.swiper-container,.swiper');if(!sw)return;
var ORD=['combos','herboristeria','frutos-secos','suplementos','educativo','semillas','condimentos','chocolates-barritas-snacks-y-varios','harinas','aceites-y-mas','diabetico','galletitas','celiaco','tinturas-madres','premezclas-sin-tacc','vegano','fideos','te-en-saquitos','alfajores','barritas','teteras-infusores-molinillos','cosmetica-natural','yerbas'];
function key(el){var a=el.querySelector('a[href]');var h=a?a.getAttribute('href').replace(/^https?:\/\/[^/]+\//,'').replace(/\/.*$/,''):'';var i=ORD.indexOf(h);return i<0?99:i}
var w=sw.swiper,sl=[].filter.call(sw.querySelectorAll('.swiper-slide'),function(e){return!e.classList.contains('swiper-slide-duplicate')});if(sl.length<2)return;
var sorted=sl.slice().sort(function(a,b){return key(a)-key(b)});if(sorted.every(function(e,i){return e===sl[i]}))return;
var html=sorted.map(function(e){var c=e.cloneNode(!0);c.className='swiper-slide';c.removeAttribute('style');c.removeAttribute('data-swiper-slide-index');[].forEach.call(c.querySelectorAll('img[data-src],img[data-srcset]'),function(i){if(i.getAttribute('data-src'))i.src=i.getAttribute('data-src');if(i.getAttribute('data-srcset'))i.srcset=i.getAttribute('data-srcset');i.removeAttribute('data-src');i.removeAttribute('data-srcset');i.classList.add('swiper-lazy-loaded')});[].forEach.call(c.querySelectorAll('.swiper-lazy-preloader'),function(x){x.remove()});return c.outerHTML});
if(w){if(w.params.loop&&w.loopDestroy)w.loopDestroy();w.removeAllSlides();w.appendSlide(html);if(w.params.loop&&w.loopCreate)w.loopCreate();w.update();w.slideTo&&w.slideTo(w.params.loop?w.loopedSlides||0:0,0)}
else{var wr=sw.querySelector('.swiper-wrapper');wr&&(wr.innerHTML=html.join(''))}}();

}catch(e){}
}();
