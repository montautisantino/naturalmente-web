/* Carrito lateral: lo que ayuda a terminar la compra.
   - "Sumá para el envío gratis": si falta plata para el envío gratis, básicos baratos de los más vendidos (una sola
     variante, con stock, que no estén en el carrito) para agregar con un toque.
   - Aviso de despacho real (lunes a viernes de 12 a 14 h) y WhatsApp para el que duda antes de pagar. */
!function(){var d=document,W=window,B=d.body;if(W.__dnCartX)return;W.__dnCartX=1;
var WA='5491141816107';
var num=function(t){return parseFloat(String(t||'').replace(/[^\d,]/g,'').replace(',','.'))||0},$=function(n){return'$'+Math.round(n).toLocaleString('es-AR')};
var FREE=(function(){var m=(B.textContent.match(/env[ií]o gratis (?:desde|superando los) \$\s*([\d.]+)/i)||[])[1];return m?num(m):65000})();W.__dnFree=FREE;
/* "se compra junto con": pares reales de los pedidos pagos (23/7 al 21/10/2026, 4.168 pedidos). producto -> los que más
   se llevaron en el mismo pedido, de mayor a menor. Solo productos publicados. */
W.__dnPares={'239903836':['237347691','368076828','244605526'],'237347691':['239903836','277130570','237352133'],'277130570':['237352133','237347691','239903836'],'237352133':['277130570','237347691','239903836'],'368076828':['239903836','237347691','244605526'],'244605526':['239903836','237347691','277130570'],'237343675':['237347691','239903836','237352133'],'237256445':['239903836','237347691','277130570'],'237341869':['237347691','239903836'],'237252201':['237347691','239903836'],'244136837':['239903836','244634297','237347691'],'244634297':['244136837','237347691','239903836'],'238853243':['244136837','244634297'],'319886558':['244136837','239903836','237347691'],'266906827':['244605526','237347691'],'276191551':['239903836','368076828'],'273588436':['239903836','237347691'],'283469069':['237347691','237352133'],'318309976':['239903836','244605526'],'278995869':['244605526','239903836'],'357983017':['244605526'],'237349313':['239903836'],'237341171':['239903836'],'243882220':['239903836'],'243848610':['239903836'],'243847428':['239903836','244136837'],'238743601':['244136837','244634297'],'244956790':['237347691']};
/* catálogo liviano (nombre, precio, foto, stock) sacado del listado de más vendidos; si falta algo, también de combos */
var CK='dnCat2',CAT=null,CATP=null,CATC=null;
function parseCat(h,o){var doc=new DOMParser().parseFromString(h,'text/html');[].forEach.call(doc.querySelectorAll('.js-item-product[data-product-id]'),function(x){var id=x.getAttribute('data-product-id');if(o[id])return;var v;try{v=JSON.parse(x.querySelector('[data-variants]').getAttribute('data-variants'))}catch(e){return}if(!v||!v.length)return;
var nm=((x.querySelector('.js-item-name')||{}).textContent||'').trim();var im=x.querySelector('img'),src=im&&(im.getAttribute('data-srcset')||im.getAttribute('srcset')||im.getAttribute('data-src')||im.getAttribute('src'))||'';src=(src.split(',').map(function(s){return s.trim().split(' ')[0]}).filter(function(s){return/\/\//.test(s)})[0]||'').replace(/^(https?:)?\/\//,'https://');
var a=x.querySelector('a[href*="/productos/"]');o[id]={id:id,n:nm,p:v[0].price_number,ok:v.length===1&&v[0].available!==false,nv:v.length,i:src,h:a?a.getAttribute('href').replace(/^https?:\/\/[^\/]+/,''):''}});return o}
function save(){try{sessionStorage.setItem(CK,JSON.stringify({t:Date.now(),c:CAT,k:!!CATC}))}catch(e){}}
function catGet(u){return fetch(u,{credentials:'same-origin'}).then(function(r){return r.text()})}
W.__dnCat=function(need){if(!CAT){try{var c=JSON.parse(sessionStorage.getItem(CK)||'null');if(c&&Date.now()-c.t<36e5){CAT=c.c;if(c.k)CATC=Promise.resolve(CAT)}}catch(e){}}
var base=CAT?Promise.resolve(CAT):(CATP||(CATP=catGet('/productos/?sort_by=best-selling').then(function(h){CAT=parseCat(h,CAT||{});save();return CAT})));
return base.then(function(C){var miss=(need||[]).some(function(id){return!C[id]});if(!miss||CATC===false)return C;return CATC||(CATC=catGet('/combos/?sort_by=best-selling').then(function(h){parseCat(h,CAT);save();return CAT}))})};
/* agregar un producto de una sola variante (mismo camino que el tema; si falla, el respaldo de compra lo manda al carrito) */
W.__dnAddId=function(id,ok,ko){var f=d.createElement('form');f.method='post';f.action='/comprar/';f.style.display='none';f.innerHTML='<input type="hidden" name="add_to_cart" value="'+String(id).replace(/\D/g,'')+'"><input type="hidden" name="quantity" value="1">';B.appendChild(f);var rm=function(){if(f.parentNode)f.parentNode.removeChild(f)};
try{LS.addToCartEnhanced(jQueryNuvem(f),'Agregar','Agregando...','No hay más stock de este producto.',!1,function(){rm();ok&&ok()},function(){rm();ko&&ko()})}catch(e){f.submit()}};
var M=d.getElementById('modal-cart');if(!M)return;
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
/* qué sugerir: si falta mucho para el envío gratis, lo que más se lleva junto con lo que ya está en el carrito
   (casi siempre otro combo); si falta poco, básicos baratos de los más vendidos */
function pick(C,f){var ic=inCart(),sc={},ord=[];Object.keys(ic).forEach(function(id){(W.__dnPares[id]||[]).forEach(function(b,k){if(ic[b])return;if(!(b in sc))ord.push(b);sc[b]=(sc[b]||0)+(3-k)})});
var J=ord.sort(function(a,b){return sc[b]-sc[a]}).map(function(id){return C[id]}).filter(function(x){return x&&x.ok&&x.p}).slice(0,3);
if(f>10000&&J.length)return{j:1,L:J};
var L=Object.keys(C).map(function(k){return C[k]}).filter(function(x){return x.ok&&x.p&&x.p<=6000&&!ic[x.id]&&!/^\s*combo/i.test(x.n)}).slice(0,8);return{j:0,L:L.length>=2?L:J}}
function add(it,btn){if(btn.disabled||btn.classList.contains('ok'))return;btn.disabled=true;btn.textContent='Agregando…';
W.__dnAddId(it.id,function(){btn.disabled=false;btn.classList.add('ok');btn.textContent='✓ Agregado';setTimeout(draw,600)},function(){btn.disabled=false;btn.textContent='+ Agregar'})}
var box=null;
function need(){var n=[];Object.keys(inCart()).forEach(function(id){n=n.concat(W.__dnPares[id]||[])});return n}
function draw(){var t=total(),f=FREE-t;var de=d.getElementById('dn-cdesp');if(de)de.style.display=t>0?'':'none';if(!(t>0)||f<=0){if(box)box.style.display='none';return}
W.__dnCat(need()).then(function(C){var R=pick(C,f),S=R.L;if(!S.length){if(box)box.style.display='none';return}
if(!box){box=d.createElement('div');box.id='dn-cx';box.className='js-visible-on-cart-filled';var fr=M.querySelector('.js-ship-free-rest'),ref=fr&&fr.closest('.js-visible-on-cart-filled')||M.querySelector('.js-ajax-cart-list');if(!ref)return;ref.parentNode.insertBefore(box,ref.nextSibling);
box.addEventListener('click',function(e){var b=e.target.closest('button[data-i]');if(!b)return;e.preventDefault();e.stopPropagation();var it=S2[b.getAttribute('data-i')];if(it)add(it,b)},true)}
S2=S;box.style.display='';box.innerHTML='<p>Te faltan <b>'+$(f)+'</b> para el envío gratis. '+(R.j?'Lo que más se lleva junto con lo tuyo:':'Sumá algo de todos los días:')+'</p><div class="r">'+S.map(function(x,k){return'<div class="i">'+(x.i?'<a href="'+esc(x.h)+'"><img loading="lazy" alt="" src="'+esc(x.i)+'"></a>':'')+'<b>'+esc(x.n)+'</b><em>'+$(x.p)+'</em><button type="button" data-i="'+k+'">+ Agregar</button></div>'}).join('')+'</div>'}).catch(function(){})}
var S2=[];
var te=M.querySelector('.js-ajax-cart-total'),tm=0,tm2=0,later=function(){clearTimeout(tm);clearTimeout(tm2);tm=setTimeout(draw,250);tm2=setTimeout(draw,1500)};
if(te&&W.MutationObserver)new MutationObserver(later).observe(te,{childList:true,characterData:true,subtree:true});
var cl=M.querySelector('.js-ajax-cart-list');if(cl&&W.MutationObserver)new MutationObserver(later).observe(cl,{childList:true});
draw();
}();
