/* Carrito lateral: lo que ayuda a terminar la compra.
   - "Sumá para el envío gratis": si falta plata para el envío gratis, básicos baratos de los más vendidos (una sola
     variante, con stock, que no estén en el carrito) para agregar con un toque.
   - Aviso de despacho real (lunes a viernes de 12 a 14 h) y WhatsApp para el que duda antes de pagar. */
!function(){var d=document,W=window,B=d.body;if(W.__dnCartX)return;W.__dnCartX=1;
var M=d.getElementById('modal-cart');if(!M)return;var WA='5491141816107';
var num=function(t){return parseFloat(String(t||'').replace(/[^\d,]/g,'').replace(',','.'))||0},$=function(n){return'$'+Math.round(n).toLocaleString('es-AR')};
var FREE=(function(){var m=(B.textContent.match(/env[ií]o gratis (?:desde|superando los) \$\s*([\d.]+)/i)||[])[1];return m?num(m):65000})();
var esc=function(s){return String(s).replace(/[&<>"]/g,function(x){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[x]})};
var st=d.createElement('style');st.textContent=
'#dn-cx{margin:6px 12px 14px;padding:12px 0 10px;border-radius:14px;background:#fdf6e3;border:1px solid #f0dca6}#dn-cx p{margin:0 12px 8px;font:800 13px/1.3 Figtree,Arial,sans-serif;color:#3d2a07}#dn-cx p b{color:#1d4a2a}'+
'#dn-cx .r{display:flex;gap:8px;overflow-x:auto;padding:0 12px 2px;scroll-snap-type:x mandatory;scrollbar-width:none}#dn-cx .r::-webkit-scrollbar{display:none}'+
'#dn-cx .i{flex:0 0 118px;scroll-snap-align:start;padding:7px;border-radius:12px;background:#fff;border:1px solid #efe3c2}#dn-cx .i img{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:9px;background:#f4f1e4}#dn-cx .i b{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin:5px 0 2px;font-size:11.5px;line-height:1.2;color:#16261b;min-height:28px}#dn-cx .i em{display:block;font-style:normal;font:900 13px/1 Archivo,Arial,sans-serif;color:#1d4a2a;margin:0 0 6px}'+
'#dn-cx .i button{width:100%;height:30px;border:0;border-radius:9px;background:#1d4a2a;color:#fff;font:800 12px/1 Archivo,Arial,sans-serif;cursor:pointer}#dn-cx .i button.ok{background:#3f7d3a}#dn-cx .i button[disabled]{opacity:.7}'+
'#dn-cdesp{display:flex;gap:10px;align-items:flex-start;margin:0 12px 12px;padding:10px 12px;border-radius:12px;background:#eef3e6;color:#1d4a2a;font-size:12.5px;line-height:1.35}#dn-cdesp svg{flex:0 0 18px;margin-top:1px}#dn-cdesp a{color:#1d4a2a!important;font-weight:800;text-decoration:underline!important}';
d.head.appendChild(st);
/* aviso de despacho + WhatsApp, arriba del botón de pagar */
var sub=d.getElementById('ajax-cart-submit-div');
if(sub&&!d.getElementById('dn-cdesp')){var ds=d.createElement('div');ds.id='dn-cdesp';ds.className='js-visible-on-cart-filled';ds.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/></svg><span>Despachamos de lunes a viernes de 12 a 14 h: si comprás antes de las 12, sale hoy. ¿Dudas antes de pagar? <a href="https://wa.me/'+WA+'?text='+encodeURIComponent('Hola! Tengo una consulta antes de terminar mi compra')+'" target="_blank" rel="noopener">Escribinos por WhatsApp</a></span>';sub.parentNode.insertBefore(ds,sub)}
/* sumá para el envío gratis */
function total(){var e=M.querySelector('.js-ajax-cart-total');var t=e?num(e.textContent):0;if(!t&&W.LS&&LS.cart&&LS.cart.subtotal)t=LS.cart.subtotal/100;return t}
function inCart(){var s={};try{(LS.cart.items||[]).forEach(function(x){s[String(x.product_id||(x.product&&x.product.id)||'')]=1})}catch(e){}return s}
var LIST=null,K='dnCartSug';
function load(){if(LIST)return Promise.resolve(LIST);try{var c=JSON.parse(sessionStorage.getItem(K)||'null');if(c&&Date.now()-c.t<36e5){LIST=c.l;return Promise.resolve(LIST)}}catch(e){}
return fetch('/productos/',{credentials:'same-origin'}).then(function(r){return r.text()}).then(function(h){var doc=new DOMParser().parseFromString(h,'text/html'),L=[];
[].forEach.call(doc.querySelectorAll('.js-product-table .js-item-product[data-product-id]'),function(x){var v;try{v=JSON.parse(x.querySelector('[data-variants]').getAttribute('data-variants'))}catch(e){return}if(!v||v.length!==1||v[0].available===false||!v[0].price_number||v[0].price_number>6000)return;var nm=((x.querySelector('.js-item-name')||{}).textContent||'').trim();if(/^\s*combo/i.test(nm))return;
var im=x.querySelector('img'),src=im&&(im.getAttribute('data-srcset')||im.getAttribute('srcset')||im.getAttribute('data-src')||im.getAttribute('src'))||'';src=(src.split(',').map(function(s){return s.trim().split(' ')[0]}).filter(function(s){return/\/\//.test(s)})[0]||'').replace(/^\/\//,'https://');
var a=x.querySelector('a[href*="/productos/"]');L.push({id:x.getAttribute('data-product-id'),n:nm,p:v[0].price_number,i:src,h:a?a.getAttribute('href'):''})});
LIST=L.slice(0,16);try{sessionStorage.setItem(K,JSON.stringify({t:Date.now(),l:LIST}))}catch(e){}return LIST})}
function add(it,btn){if(btn.disabled||btn.classList.contains('ok'))return;btn.disabled=true;btn.textContent='Agregando…';var f=d.createElement('form');f.method='post';f.action='/comprar/';f.style.display='none';f.innerHTML='<input type="hidden" name="add_to_cart" value="'+esc(it.id)+'"><input type="hidden" name="quantity" value="1">';B.appendChild(f);
function done(ok){if(f.parentNode)f.parentNode.removeChild(f);btn.disabled=false;if(ok){btn.classList.add('ok');btn.textContent='✓ Agregado';setTimeout(draw,600)}else btn.textContent='+ Agregar'}
try{LS.addToCartEnhanced(jQueryNuvem(f),'Agregar','Agregando...','No hay más stock de este producto.',!1,function(){done(1)},function(){done(0)})}catch(e){f.submit()}}
var box=null;
function draw(){var t=total(),f=FREE-t;var de=d.getElementById('dn-cdesp');if(de)de.style.display=t>0?'':'none';if(!(t>0)||f<=0){if(box)box.style.display='none';return}
load().then(function(L){var ic=inCart(),S=L.filter(function(x){return!ic[x.id]}).slice(0,8);if(S.length<2){if(box)box.style.display='none';return}
if(!box){box=d.createElement('div');box.id='dn-cx';box.className='js-visible-on-cart-filled';var fr=M.querySelector('.js-ship-free-rest'),ref=fr&&fr.closest('.js-visible-on-cart-filled')||M.querySelector('.js-ajax-cart-list');if(!ref)return;ref.parentNode.insertBefore(box,ref.nextSibling);
box.addEventListener('click',function(e){var b=e.target.closest('button[data-i]');if(!b)return;e.preventDefault();e.stopPropagation();var it=S2[b.getAttribute('data-i')];if(it)add(it,b)},true)}
S2=S;box.style.display='';box.innerHTML='<p>Te faltan <b>'+$(f)+'</b> para el envío gratis. Sumá algo de todos los días:</p><div class="r">'+S.map(function(x,k){return'<div class="i">'+(x.i?'<a href="'+esc(x.h)+'"><img loading="lazy" alt="" src="'+esc(x.i)+'"></a>':'')+'<b>'+esc(x.n)+'</b><em>'+$(x.p)+'</em><button type="button" data-i="'+k+'">+ Agregar</button></div>'}).join('')+'</div>'}).catch(function(){})}
var S2=[];
var te=M.querySelector('.js-ajax-cart-total'),tm=0,later=function(){clearTimeout(tm);tm=setTimeout(draw,250)};
if(te&&W.MutationObserver)new MutationObserver(later).observe(te,{childList:true,characterData:true,subtree:true});
var cl=M.querySelector('.js-ajax-cart-list');if(cl&&W.MutationObserver)new MutationObserver(later).observe(cl,{childList:true});
draw();
}();
