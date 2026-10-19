/* Dieteticas Naturalmente - parte: producto */
!function(){if(window.__dn_producto)return;window.__dn_producto=1;
/* src/00-tarjetas.js */
try{
!function(){var d=document;window.dnCards=function(e){e&&e.setAttribute('data-dncards','1')};if(d.getElementById('dn-cards-css'))return;var st=d.createElement('style');st.id='dn-cards-css';st.textContent='[data-dncards] .item{background:#fff;border-radius:20px!important;border:1px solid #e6ede0;box-shadow:0 6px 18px rgba(29,74,42,.07);padding:8px 8px 10px!important;height:100%;display:flex;flex-direction:column}'+'[data-dncards] .js-item-product{margin-bottom:12px}[data-dncards] .item-image{border-radius:15px;overflow:hidden;background:#f4f1e4}'+'[data-dncards] .item-description{padding:8px 4px 0!important;display:flex;flex-direction:column;flex:1}[data-dncards] .item-link{display:flex;flex-direction:column;flex:1;text-decoration:none}'+'[data-dncards] .item-name{font-size:13.5px!important;line-height:1.3!important;font-weight:700!important;color:#16261b!important;margin:2px 0 6px!important;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:35px}'+'[data-dncards] .item-price{font:900 18px/1.1 Archivo,Arial,sans-serif!important;color:#1d4a2a!important}[data-dncards] .price-compare{font-size:12.5px!important;color:#9aa596!important}'+'[data-dncards] .item-actions{margin-top:auto}[data-dncards] .js-quickshop-or-stock-container{margin-top:8px!important}'+'[data-dncards] input.js-addtocart,[data-dncards] .item-actions .btn{border-radius:999px!important;background:linear-gradient(135deg,#3f7d3a,#1d4a2a) no-repeat!important;border:0!important;color:#fff!important;font-weight:800!important;letter-spacing:.06em;box-shadow:0 6px 14px rgba(29,74,42,.25);transition:transform .15s,box-shadow .15s}[data-dncards] input.js-addtocart:active{transform:scale(.96)}'+'[data-dncards] [data-dnt="1"] .item{border:2px solid #e0a326;box-shadow:0 10px 26px rgba(224,163,38,.28)}[data-dncards] [data-dnt="2"] .item,[data-dncards] [data-dnt="3"] .item{border-color:#bcd3ae}'+'[data-dncards] .item{transition:transform .2s ease,box-shadow .2s ease}@media(hover:hover){[data-dncards] .item:hover{transform:translateY(-4px);box-shadow:0 14px 28px rgba(29,74,42,.13)}}[data-dncards] .item:active{transform:scale(.98)}';d.head.appendChild(st)}();

}catch(e){}
/* src/14-producto.js */
try{
!function(){var d=document,B=d.body;if(!B.classList.contains('template-product'))return;[].forEach.call(d.querySelectorAll('#related-products,#complementary-products'),function(s){window.dnCards&&window.dnCards(s)});if(d.querySelector('.dn-lp')||d.getElementById('dn-pt'))return;
var h1=d.querySelector('.js-product-name'),nm=h1?h1.textContent.trim():'';if(!h1||/^combo/i.test(nm))return;
function fmt(n){return'$'+Math.round(n).toLocaleString('es-AR')}
function esc(s){return String(s).replace(/[&<>"]/g,function(x){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[x]})}
var SV=function(p){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>'};
var st=d.createElement('style');st.id='dn-prod-css';st.textContent=
'#dn-pt{margin:16px 0 6px;border-radius:18px;background:#f6f9f3;border:1px solid #e1eadb;overflow:hidden}#dn-pt>*{display:flex;align-items:center;gap:12px;padding:12px 14px;text-decoration:none!important;color:#16261b!important}#dn-pt>*+*{border-top:1px solid #e6ede0}'+
'#dn-pt i{flex:0 0 36px;width:36px;height:36px;border-radius:50%;background:#fff;border:1px solid #dbe6d2;display:flex;align-items:center;justify-content:center;color:#2f6a35}#dn-pt i svg{width:18px;height:18px}#dn-pt b{display:block;font-size:14px;line-height:1.2}#dn-pt small{display:block;font-size:12.5px;color:#5d6d59;line-height:1.3;margin-top:2px}#dn-pt a em{margin-left:auto;font-style:normal;font-weight:900;color:#25a956;font-size:13px;white-space:nowrap}'+
'.dn-p100{margin:-6px 0 12px;font-size:13px;color:#5d6d59}.dn-p100 b{color:#1d4a2a}'+
'.dn-prk{display:inline-flex;align-items:center;gap:6px;margin:0 0 8px;padding:6px 12px;border-radius:999px;background:linear-gradient(135deg,#f4c95d,#e0a326 55%,#c98a35);color:#10281a;font:900 12.5px/1 Archivo,Arial,sans-serif;box-shadow:0 4px 12px rgba(224,163,38,.3);position:relative;overflow:hidden}.dn-prk:after{content:"";position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.65),transparent);transform:skewX(-20deg);animation:dnSweep 3.2s ease-in-out infinite}.dn-prk.g{background:#1d4a2a;color:#fff;box-shadow:0 4px 12px rgba(29,74,42,.25)}.dn-prk svg{width:14px;height:14px}'+
'#dn-pd{position:relative;background:#fff;border:1px solid #e6ede0;border-radius:20px;padding:18px 16px 16px;box-shadow:0 6px 18px rgba(29,74,42,.06);margin:0 0 18px}#dn-pd h5{margin:0 0 10px!important;font:900 19px/1.2 Archivo,Arial,sans-serif!important;color:#1d4a2a}#dn-pd .user-content{margin:0!important;font-size:14.5px!important;line-height:1.6;color:#2b3a2e}'+
'#dn-pd.cl .user-content{max-height:340px;overflow:hidden;-webkit-mask-image:linear-gradient(#000 65%,transparent);mask-image:linear-gradient(#000 65%,transparent)}#dn-pd .mo{display:block;width:100%;margin:10px 0 0;padding:11px;border-radius:999px;border:1.5px solid #cfdcc5;background:#f6f9f3;color:#1d4a2a;font-weight:800;font-size:14px;cursor:pointer}'+
'.template-product .products-section-title{font:900 21px/1.2 Archivo,Arial,sans-serif!important;color:#1d4a2a!important;text-transform:none!important;letter-spacing:0!important}';
d.head.appendChild(st);
/* franja de confianza */
var min=(B.textContent.match(/env[ií]o gratis (?:desde|superando los) \$\s*([\d.]+)/i)||[])[1];min=min?'$'+min.replace(/,00$/,''):'';
var pt=d.createElement('div');pt.id='dn-pt';pt.innerHTML='<div><i>'+SV('<path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>')+'</i><div><b>Compra segura</b><small>Pagos protegidos y tus datos siempre resguardados.</small></div></div>'+
'<div><i>'+SV('<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>')+'</i><div><b>Envíos a todo el país</b><small>'+(min?'Gratis superando los '+esc(min)+'.':'Te lo llevamos a cualquier punto de Argentina.')+'</small></div></div>'+
'<a href="https://wa.me/5491141816107?text='+encodeURIComponent('Hola! Tengo una consulta sobre: '+nm+' '+location.href.split('?')[0])+'" target="_blank" rel="noopener"><i>'+SV('<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/>')+'</i><div><b>¿Tenés dudas?</b><small>Te asesoramos por WhatsApp.</small></div><em>Escribinos →</em></a>';
var anchor=d.getElementById('dn-buy')||d.getElementById('product_form');if(anchor)anchor.parentNode.insertBefore(pt,anchor.nextSibling);
/* precio por 100 g */
function grams(n){n=n.toLowerCase();var m=n.match(/(?:x|por|de)\s*(\d+(?:[.,]\d+)?)\s*(kg|kilo|kilos|grs?|g)\b/)||n.match(/(\d+(?:[.,]\d+)?)\s*(kg|grs?|g)\b/);if(!m)return/de kilo|x kilo|por kilo/.test(n)?1000:0;var v=parseFloat(m[1].replace(',','.'));return/k/.test(m[2])?v*1000:v}
var g=grams(nm),pd=d.getElementById('price_display'),pc=d.querySelector('.js-price-container');
if(g>100&&g<=5000&&pd&&pc){var p1=d.createElement('div');p1.className='dn-p100';pc.parentNode.insertBefore(p1,pc.nextSibling);var up=function(){var v=parseInt(pd.getAttribute('data-product-price'),10)/100||parseFloat(pd.textContent.replace(/[^\d,]/g,'').replace(',','.'));p1.innerHTML=v?'Equivale a <b>'+fmt(v/g*100)+'</b> cada 100 g':''};up();if(window.MutationObserver)new MutationObserver(up).observe(pd,{attributes:true,childList:true,characterData:true,subtree:true})}
/* ranking en su categoría */
var bc=[].slice.call(d.querySelectorAll('.breadcrumbs a')).filter(function(a){return!/^https?:\/\/[^\/]+\/?$/.test(a.href)}).pop(),pid=(d.querySelector('#product_form [name="add_to_cart"]')||{}).value;
if(bc&&pid){var ch=bc.getAttribute('href').replace(/^https?:\/\/[^\/]+/,''),cn=bc.textContent.trim(),FX={suplementos:'Suplementos',Herboristeria:'Herboristería',Diabetico:'Diabético',Dieteticos:'Dietéticos',Celiaco:'Celíaco','Te en saquitos':'Té en saquitos','Cosmetica natural':'Cosmética natural'};cn=FX[cn]||cn;
var show=function(ids){var i=ids.indexOf(String(pid));if(i<0||i>2||d.querySelector('.dn-prk'))return;var b=d.createElement('div');b.className='dn-prk'+(i?' g':'');b.innerHTML=SV('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>')+(i?'#'+(i+1)+' en ventas en '+esc(cn):'#1 más vendido en '+esc(cn));h1.parentNode.insertBefore(b,h1)};
var K='dnRk:'+ch,c;try{c=JSON.parse(sessionStorage.getItem(K))}catch(e){}
if(c)show(c);else fetch(ch).then(function(r){return r.text()}).then(function(h){var ids=[].slice.call(new DOMParser().parseFromString(h,'text/html').querySelectorAll('.js-product-table .js-item-product[data-product-id]')).map(function(x){return x.getAttribute('data-product-id')}).filter(Boolean).slice(0,3);try{sessionStorage.setItem(K,JSON.stringify(ids))}catch(e){}show(ids)}).catch(function(){})}
/* descripción en tarjeta, plegable si es larga */
var uc=d.querySelector('.template-product .user-content'),h5=uc&&uc.previousElementSibling;
if(uc){var w=d.createElement('div');w.id='dn-pd';uc.parentNode.insertBefore(w,h5&&/^H5$/.test(h5.tagName)?h5:uc);if(h5&&/^H5$/.test(h5.tagName))w.appendChild(h5);w.appendChild(uc);
setTimeout(function(){if(uc.scrollHeight>520){w.classList.add('cl');var b=d.createElement('button');b.type='button';b.className='mo';b.textContent='Ver descripción completa ↓';b.onclick=function(){var o=w.classList.toggle('cl');b.textContent=o?'Ver descripción completa ↓':'Ver menos ↑';if(o)w.scrollIntoView({block:'start',behavior:'smooth'})};w.appendChild(b)}},300)}
/* tarjetas nuevas en sugeridos */
[].forEach.call(d.querySelectorAll('#related-products,#complementary-products'),function(s){window.dnCards&&window.dnCards(s)});
}();

}catch(e){}
/* src/19-tamanos.js */
try{
!function(){var d=document,B=d.body;if(!B.classList.contains('template-product')||d.getElementById('dn-pa'))return;
var h1=d.querySelector('.js-product-name');if(!h1)return;var nm=h1.textContent.trim(),pid=(d.querySelector('#product_form [name="add_to_cart"]')||{}).value;
function esc(s){return String(s).replace(/[&<>"]/g,function(x){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[x]})}
function fmt(n){return'$'+Math.round(n).toLocaleString('es-AR')}
var SV=function(p,w){return'<svg viewBox="0 0 24 24" width="'+(w||17)+'" height="'+(w||17)+'" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>'};
var st=d.createElement('style');st.id='dn-sz-css';st.textContent=
'#dn-pa{display:flex;gap:8px;margin:-4px 0 12px}#dn-pa button,#dn-pa a{display:inline-flex;align-items:center;gap:6px;padding:8px 13px;border-radius:999px;border:1.5px solid #dbe3d4;background:#fff;color:#1d4a2a!important;font-weight:800;font-size:13px;text-decoration:none!important;cursor:pointer;line-height:1}#dn-pa .on{color:#e0485f!important;border-color:#f3c3cb;background:#fff5f6}#dn-pa .on svg{fill:currentColor}#dn-pa a svg{color:#25a956}'+
'#dn-sz{margin:0 0 14px}#dn-sz p{margin:0 0 8px;font-size:12px;letter-spacing:.12em;font-weight:900;color:#3f7d3a;text-transform:uppercase}#dn-sz .o{display:grid;grid-template-columns:repeat(auto-fit,minmax(96px,1fr));gap:8px}'+
'#dn-sz .s{position:relative;display:block;padding:11px 8px 9px;border-radius:14px;border:2px solid #dbe3d4;background:#fff;text-align:center;text-decoration:none!important;color:#16261b!important;transition:border-color .15s}#dn-sz a.s:hover{border-color:#3f7d3a}#dn-sz .s.on{border-color:#1d4a2a;background:#f3f8ef;box-shadow:0 0 0 3px rgba(63,125,58,.12)}'+
'#dn-sz .s strong{display:block;font:900 16px/1.1 Archivo,Arial,sans-serif;color:#1d4a2a}#dn-sz .s b{display:block;font-size:14px;margin:4px 0 2px}#dn-sz .s small{display:block;font-size:11.5px;color:#6b7a67}#dn-sz .s em{position:absolute;top:-9px;left:50%;transform:translateX(-50%);white-space:nowrap;font-style:normal;font-size:10px;font-weight:900;letter-spacing:.04em;background:linear-gradient(135deg,#f4c95d,#e0a326);color:#10281a;border-radius:999px;padding:3px 8px}'+
'#dn-sz .sv{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:10px 0 0;padding:11px 14px;border-radius:14px;background:#fdf6e3;border:1px solid #f0dca6;color:#5a3d0c!important;font-size:13.5px;font-weight:700;text-decoration:none!important}#dn-sz .sv b{color:#1d4a2a}#dn-sz .sv span:last-child{font-weight:900;color:#1d4a2a;white-space:nowrap}';
d.head.appendChild(st);
/* acciones: favorito + compartir por WhatsApp */
var pa=d.createElement('div');pa.id='dn-pa';var HT='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"/></svg>';
var url=location.href.split(/[?#]/)[0];
pa.innerHTML=(pid&&window.dnFav?'<button type="button" data-dn-fav="'+esc(pid)+'">'+HT+'<span>Guardar</span></button>':'')+'<a href="https://wa.me/?text='+encodeURIComponent(nm+' '+url)+'" target="_blank" rel="noopener">'+SV('<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/>')+'Compartir</a>';
h1.parentNode.insertBefore(pa,h1.nextSibling);
var fb=pa.querySelector('[data-dn-fav]');if(fb){var upd=function(){var on=window.dnFav.has(pid);fb.classList.toggle('on',on);fb.querySelector('span').textContent=on?'Guardado':'Guardar'};upd();fb.onclick=function(){var pd=d.getElementById('price_display'),im=d.querySelector('meta[property="og:image"]');window.dnFav.toggle({id:pid,n:nm,u:url.replace(/^https?:\/\/[^\/]+/,''),p:(parseInt(pd&&pd.getAttribute('data-product-price'),10)/100)||0,i:im?im.content:''});upd()}}
/* selector y comparador de tamaños */
if(d.querySelector('.dn-lp')||/^\s*combo/i.test(nm))return;
function nz(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')}
var RX=/(?:\b(?:x|por|de)\s*)?(\d+(?:[.,]\d+)?)\s*(kg|kilos?|grs?|gramos|g|ml|cc|lts?|l)\b/;
function parse(n){var s=nz(n),m=s.match(RX),q,u;if(m){var v=parseFloat(m[1].replace(',','.')),k=m[2];if(/^k/.test(k)){q=v*1000;u='g'}else if(/^g/.test(k)){q=v;u='g'}else if(/^(ml|cc)$/.test(k)){q=v;u='ml'}else{q=v*1000;u='ml'}s=s.replace(m[0],' ')}else if(/\b(de|x|por) kilo\b/.test(s)){q=1000;u='g';s=s.replace(/\b(de|x|por) kilo\b/,' ')}else return null;
return{q:q,u:u,b:s.replace(/[^a-z0-9ñ ]/g,' ').replace(/\s+/g,' ').trim()}}
var me=parse(nm);if(!me||!me.b)return;
function lab(x){return x.u==='g'?(x.q>=1000?(x.q/1000).toString().replace('.',',')+' kg':x.q+' g'):(x.q>=1000?(x.q/1000).toString().replace('.',',')+' L':x.q+' ml')}
function draw(L){var opts=L.filter(function(x){var p=parse(x.n);return p&&p.b===me.b&&p.u===me.u&&x.av}).map(function(x){var p=parse(x.n);return{q:p.q,u:p.u,u2:x.u,p:x.p,id:x.id}});
var seen={};opts=opts.filter(function(o){if(seen[o.q])return!1;return seen[o.q]=1}).sort(function(a,b){return a.q-b.q});if(opts.length<2)return;
var cur=opts.filter(function(o){return o.id==pid})[0]||opts.filter(function(o){return o.q===me.q})[0];if(!cur)return;
opts.forEach(function(o){o.k=o.p/o.q*100});var best=opts.slice().sort(function(a,b){return a.k-b.k})[0];
var h='<p>Elegí el tamaño</p><div class="o">'+opts.map(function(o){var on=o===cur,tag=on?'div':'a';return'<'+tag+' class="s'+(on?' on':'')+'"'+(on?'':' href="'+esc(o.u2)+'"')+'>'+(o===best?'<em>MEJOR PRECIO</em>':'')+'<strong>'+lab(o)+'</strong><b>'+fmt(o.p)+'</b><small>'+fmt(o.k)+' c/100 '+(o.u==='g'?'g':'ml')+'</small></'+tag+'>'}).join('')+'</div>';
if(best!==cur&&cur.k>0){var pc=Math.round((1-best.k/cur.k)*100);if(pc>=5)h+='<a class="sv" href="'+esc(best.u2)+'"><span>Llevando <b>'+lab(best)+'</b> ahorrás <b>'+pc+'%</b> cada 100 '+(best.u==='g'?'g':'ml')+'</span><span>Ver →</span></a>'}
var box=d.createElement('div');box.id='dn-sz';box.innerHTML=h;var anchor=d.querySelector('.dn-p100')||d.querySelector('.js-price-container');if(!anchor)return;anchor.parentNode.insertBefore(box,anchor.nextSibling)}
var K='dnSz:'+me.b,c;try{c=JSON.parse(sessionStorage.getItem(K))}catch(e){}if(c)return draw(c);
fetch('/search/?q='+encodeURIComponent(me.b.split(' ').slice(0,5).join(' '))).then(function(r){return r.text()}).then(function(h){var L=[].slice.call(new DOMParser().parseFromString(h,'text/html').querySelectorAll('.js-item-product[data-product-id]')).filter(function(x){return x.getAttribute('data-product-id')}).map(function(x){var v={};try{v=JSON.parse(x.querySelector('[data-variants]').getAttribute('data-variants'))[0]||{}}catch(e){}var a=x.querySelector('a[href*="/productos/"]');return{id:x.getAttribute('data-product-id'),n:((x.querySelector('.js-item-name')||{}).textContent||'').trim(),u:a?a.getAttribute('href').split('?')[0].replace(/^https?:\/\/[^\/]+/,''):'',p:v.price_number||0,av:v.available!==false&&(v.stock==null||v.stock>0)}});try{sessionStorage.setItem(K,JSON.stringify(L))}catch(e){}draw(L)}).catch(function(){})
}();

}catch(e){}
}();
