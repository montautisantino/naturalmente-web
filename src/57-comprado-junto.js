/* Ficha: "Los que compran este producto también llevan", debajo de la presentación de la landing. Sale de los pedidos reales (mapa de pares en 54) y muestra
   precio, foto y stock del momento. Si con los dos se llega al envío gratis, se avisa (es la cuenta real con el precio). */
!function(){var d=document,W=window;if(W.__dnJunto)return;W.__dnJunto=1;
var esc=function(s){return String(s).replace(/[&<>"]/g,function(x){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[x]})},$=function(n){return'$'+Math.round(n).toLocaleString('es-AR')};
function go(){var f=d.querySelector('#single-product form.js-product-form');if(!f||d.getElementById('dn-junto'))return;
var id=((f.querySelector('[name=add_to_cart]')||{}).value||'').replace(/\D/g,'');var P=(W.__dnPares||{})[id];if(!P||!P.length)return;
var me=0;try{var v=JSON.parse((d.querySelector('#single-product[data-variants]')||d.querySelector('#single-product [data-variants]')).getAttribute('data-variants'));me=v[0].price_number||0}catch(e){}
var FREE=W.__dnFree||65000;
W.__dnCat(P).then(function(C){var L=P.map(function(x){return C[x]}).filter(function(x){return x&&x.ok&&x.p}).slice(0,3);if(!L.length||d.getElementById('dn-junto'))return;
var st=d.createElement('style');st.textContent=
'#dn-junto{margin:6px 0 18px;padding:14px 0 12px;border-radius:16px;background:#f6f3ea;border:1px solid #e7dfc8}#dn-junto h3{margin:0 14px 2px;font:900 15px/1.25 Archivo,Arial,sans-serif;color:#16261b}#dn-junto>p{margin:0 14px 10px;font-size:12px;color:#5b6b5e}'+
'#dn-junto .r{display:flex;gap:10px;overflow-x:auto;padding:0 14px 2px;scroll-snap-type:x mandatory;scrollbar-width:none}#dn-junto .r::-webkit-scrollbar{display:none}'+
'#dn-junto .i{flex:0 0 150px;scroll-snap-align:start;display:flex;flex-direction:column;padding:8px;border-radius:13px;background:#fff;border:1px solid #ece4cd}#dn-junto .i img{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:10px;background:#f4f1e4}'+
'#dn-junto .i a.n{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin:6px 0 3px;font:700 12.5px/1.25 Figtree,Arial,sans-serif;color:#16261b!important;text-decoration:none!important;min-height:31px}'+
'#dn-junto .i em{display:block;font-style:normal;font:900 14px/1 Archivo,Arial,sans-serif;color:#1d4a2a;margin:0 0 6px}#dn-junto .i small{display:block;margin:0 0 7px;padding:3px 6px;border-radius:6px;background:#e6efdc;color:#1d4a2a;font:800 10.5px/1.2 Figtree,Arial,sans-serif}'+
'#dn-junto .i button{margin-top:auto;width:100%;height:34px;border:0;border-radius:10px;background:#1d4a2a;color:#fff;font:800 12.5px/1 Archivo,Arial,sans-serif;cursor:pointer}#dn-junto .i button.ok{background:#3f7d3a}#dn-junto .i button[disabled]{opacity:.7}'+
'#dn-junto.dn-jd{margin:14px 0 18px}'+'@media(min-width:768px){#dn-junto .r{overflow:visible}#dn-junto .i{flex:1 1 0;max-width:190px}}';
d.head.appendChild(st);
var bx=d.createElement('div');bx.id='dn-junto';
bx.innerHTML='<h3>Los que compran este producto también llevan</h3><p>Según los pedidos de nuestra tienda.</p><div class="r">'+L.map(function(x,k){var fr=me&&me<FREE&&me+x.p>=FREE;return'<div class="i"><a href="'+esc(x.h)+'">'+(x.i?'<img loading="lazy" alt="" src="'+esc(x.i)+'">':'')+'</a><a class="n" href="'+esc(x.h)+'">'+esc(x.n)+'</a><em>'+$(x.p)+'</em>'+(fr?'<small>Con los dos, envío gratis</small>':'')+'<button type="button" data-k="'+k+'">+ Agregar</button></div>'}).join('')+'</div>';
/* debajo del primer bloque de la landing (la presentación del producto); si no hay landing, al final de la descripción; si no, debajo del botón */var lp=d.querySelector('#single-product .dn-lp>div');if(lp){bx.classList.add('dn-jd');lp.parentNode.insertBefore(bx,lp.nextSibling)}else{var ds=d.querySelector('#single-product [data-store^="product-description"] .user-content')||d.querySelector('#single-product [data-store^="product-description"]');if(ds){bx.classList.add('dn-jd');ds.parentNode.insertBefore(bx,ds.nextSibling)}else f.parentNode.insertBefore(bx,f.nextSibling)}
/* al tocar "Agregar": pregunta si lo lleva junto con el producto de esta ficha (y si con los dos llega al envío gratis) */
var meName=(((d.querySelector('#single-product h1')||{}).textContent||'este producto').trim().split(/\s[-–]\s/)[0].replace(/\s*\(.*?\)\s*/g,' ').trim());
var openCart=function(){setTimeout(function(){var t=d.querySelector('.js-head-main [data-toggle="#modal-cart"]')||d.querySelector('[data-toggle="#modal-cart"]');var m=d.getElementById('modal-cart');if(t&&m&&!m.classList.contains('modal-show'))t.click()},350)};
var inCart=function(pid){try{return(LS.cart.items||[]).some(function(x){return String(x.product_id||(x.product&&x.product.id))===String(pid)})}catch(e){return false}};
var cartTot=function(){var si=d.querySelector('#modal-cart .js-cart-subtotal');return si?(+si.getAttribute('data-priceraw')||0)/100:0};
var short=function(n){return String(n).split(/\s[-–]\s/)[0].replace(/\s*\(.*?\)\s*/g,' ').trim()};
function addMe(ok){var F=d.querySelector('#single-product form.js-product-form');try{LS.addToCartEnhanced(jQueryNuvem(F),'Agregar','Agregando...','No hay más stock de este producto.',!1,function(){ok()},function(){ok()})}catch(e){ok()}}
function addIt(it,b){b.disabled=true;b.textContent='Agregando…';W.__dnAddId(it.id,function(){b.disabled=false;b.classList.add('ok');b.textContent='✓ Agregado';openCart()},function(){b.disabled=false;b.textContent='+ Agregar'})}
function ask(it,b){var F=d.querySelector('#single-product form.js-product-form'),qi=F&&F.querySelector('.js-quantity-input,[name=quantity]'),q=qi?Math.max(1,parseInt(qi.value,10)||1):1,mine=me*q,both=cartTot()+mine+it.p,fr=both>=FREE;
var t=d.createElement('div');t.style.cssText='position:fixed;inset:0;z-index:100000;background:rgba(22,38,27,.55);display:flex;align-items:center;justify-content:center;padding:20px;';
t.innerHTML='<div role="dialog" aria-modal="true" style="background:#fff;border-radius:22px;max-width:370px;width:100%;padding:22px 20px 18px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.3);font-family:inherit;">'+
(it.i?'<img alt="" src="'+esc(it.i)+'" style="display:block;width:96px;height:96px;object-fit:cover;border-radius:14px;margin:0 auto 12px;background:#f4f1e4">':'')+
'<p style="margin:0 0 8px;font-family:Archivo,Arial,sans-serif;font-weight:900;font-size:19px;line-height:1.22;color:#1d4a2a;">¿Querés llevar '+esc(short(it.n))+' junto con el '+esc(meName)+'?</p>'+
'<p style="margin:0 0 14px;font-size:14px;line-height:1.45;color:#53624f;">'+esc(meName)+(q>1?' x'+q:'')+' '+$(mine)+' + '+esc(short(it.n))+' '+$(it.p)+' = <b>'+$(mine+it.p)+'</b></p>'+
(fr?'<div style="margin:0 0 16px;padding:10px 12px;border-radius:12px;background:#e6efdc;color:#1d4a2a;font-weight:800;font-size:14.5px;line-height:1.35;">🚚 Llevando los dos tenés <u>envío gratis</u> (superás los '+$(FREE)+').</div>':'<div style="margin:0 0 16px;padding:10px 12px;border-radius:12px;background:#fdf6e3;color:#3d2a07;font-weight:700;font-size:14px;line-height:1.35;">Con los dos te faltan '+$(FREE-both)+' para el envío gratis (desde '+$(FREE)+').</div>')+
'<button type="button" data-a="y" style="display:block;width:100%;min-height:52px;border:0;border-radius:14px;background:linear-gradient(135deg,#3f7d3a 0%,#1d4a2a 100%);color:#fff;font-size:16px;font-weight:800;cursor:pointer;margin-bottom:10px;">Sí, agregar los dos'+(fr?' con envío gratis':'')+'</button>'+
'<button type="button" data-a="n" style="display:block;width:100%;min-height:46px;border:1px solid #cfe3c4;border-radius:14px;background:#eef3e8;color:#1d4a2a;font-size:14.5px;font-weight:700;cursor:pointer;">Solo '+esc(short(it.n))+'</button>'+
'<button type="button" data-a="x" style="display:block;margin:10px auto 0;border:0;background:none;color:#7a8a7c;font-size:13px;text-decoration:underline;cursor:pointer;">Cancelar</button></div>';
d.body.appendChild(t);t.addEventListener('click',function(e){var x=e.target.closest('button');if(e.target===t){t.remove();return}if(!x)return;var a=x.getAttribute('data-a');t.remove();if(a==='x')return;
if(a==='y'){b.disabled=true;b.textContent='Agregando…';addMe(function(){addIt(it,b)})}else addIt(it,b)})}
bx.addEventListener('click',function(e){var b=e.target.closest('button[data-k]');if(!b)return;e.preventDefault();e.stopPropagation();var it=L[b.getAttribute('data-k')];if(!it||b.disabled||b.classList.contains('ok'))return;
if(inCart(id)||!me)addIt(it,b);else ask(it,b)})}).catch(function(){})}
/* se arma cuando el cliente se acerca a esa parte, o a los 3 s si el navegador no avisa */
function arm(){var f=d.querySelector('#single-product form.js-product-form');if(!f||!W.__dnCat){return setTimeout(arm,400)}
var gi=function(){(W.__dnIdle||function(x){x()})(go)};var t=setTimeout(gi,3000);if(!W.IntersectionObserver)return;var io=new IntersectionObserver(function(es){if(es.some(function(x){return x.isIntersecting})){io.disconnect();clearTimeout(t);gi()}},{rootMargin:'600px 0px'});io.observe(f)}
var n=0;(function w(){if(W.__dnCat&&d.querySelector('#single-product form.js-product-form'))arm();else if(++n<40)setTimeout(w,250)})();
}();
