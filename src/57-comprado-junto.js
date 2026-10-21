/* Ficha: "Los que compran este producto también llevan". Sale de los pedidos reales (mapa de pares en 54) y muestra
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
'@media(min-width:768px){#dn-junto .r{overflow:visible}#dn-junto .i{flex:1 1 0;max-width:190px}}';
d.head.appendChild(st);
var bx=d.createElement('div');bx.id='dn-junto';
bx.innerHTML='<h3>Los que compran este producto también llevan</h3><p>Según los pedidos de nuestra tienda.</p><div class="r">'+L.map(function(x,k){var fr=me&&me<FREE&&me+x.p>=FREE;return'<div class="i"><a href="'+esc(x.h)+'">'+(x.i?'<img loading="lazy" alt="" src="'+esc(x.i)+'">':'')+'</a><a class="n" href="'+esc(x.h)+'">'+esc(x.n)+'</a><em>'+$(x.p)+'</em>'+(fr?'<small>Con los dos, envío gratis</small>':'')+'<button type="button" data-k="'+k+'">+ Agregar</button></div>'}).join('')+'</div>';
f.parentNode.insertBefore(bx,f.nextSibling);
bx.addEventListener('click',function(e){var b=e.target.closest('button[data-k]');if(!b)return;e.preventDefault();e.stopPropagation();var it=L[b.getAttribute('data-k')];if(!it||b.disabled||b.classList.contains('ok'))return;b.disabled=true;b.textContent='Agregando…';
W.__dnAddId(it.id,function(){b.disabled=false;b.classList.add('ok');b.textContent='✓ Agregado';setTimeout(function(){var t=d.querySelector('.js-head-main [data-toggle="#modal-cart"]')||d.querySelector('[data-toggle="#modal-cart"]');var m=d.getElementById('modal-cart');if(t&&m&&!m.classList.contains('modal-show'))t.click()},350)},function(){b.disabled=false;b.textContent='+ Agregar'})})}).catch(function(){})}
/* se arma cuando el cliente se acerca a esa parte (no suma carga al abrir la ficha) */
function arm(){var f=d.querySelector('#single-product form.js-product-form');if(!f||!W.__dnCat){return setTimeout(arm,400)}
if(!W.IntersectionObserver)return go();var io=new IntersectionObserver(function(es){if(es.some(function(x){return x.isIntersecting})){io.disconnect();go()}},{rootMargin:'600px 0px'});io.observe(f)}
var n=0;(function w(){if(W.__dnCat&&d.querySelector('#single-product form.js-product-form'))arm();else if(++n<40)setTimeout(w,250)})();
}();
