/* Ficha de producto, datos que ayudan a elegir (contenido/fichas.json, armado con datos reales de la tienda):
   - Etiquetas: Sin TACC / Orgánico / Sin azúcar solo si el NOMBRE lo dice; Vegano si el nombre lo dice o está en la
     categoría Vegano de la tienda.
   - "El más vendido en <categoría>": el producto con más pedidos pagados de esa categoría.
   - "Otras presentaciones": el mismo producto en otros tamaños (son productos distintos en la tienda), con el precio
     de cada uno leído en el momento de su propia ficha y el precio por kilo o por litro. */
!function(){var d=document,W=window,B=d.body;if(W.__dnFI||!B.classList.contains('template-product'))return;var SP=d.getElementById('single-product');if(!SP)return;W.__dnFI=1;
var hd=(location.pathname.match(/\/productos\/([^\/]+)/)||[])[1];if(!hd)return;
var nm=((SP.querySelector('h1')||{}).textContent||'').trim(),nz=nm.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
var sc=d.querySelector('script[src*="/dist/dn-producto.min.js"]'),BASE=sc?sc.src.replace(/dist\/dn-producto\.min\.js.*$/,''):'';
var num=function(t){return parseFloat(String(t||'').replace(/[^\d,]/g,'').replace(',','.'))||0},$=function(n){return'$'+Math.round(n).toLocaleString('es-AR')};
var st=d.createElement('style');st.textContent=
'#dn-tags{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}#dn-tags span{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:999px;background:#edf3e6;color:#1d4a2a;font-size:12px;font-weight:800;line-height:1.2}#dn-tags span.top{background:#15301f;color:#f0c04f}#dn-tags svg{flex:0 0 auto}'+
'#dn-pres{margin:4px 0 16px}#dn-pres p{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#3f7d3a;margin:0 0 8px}#dn-pres .g{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px}'+
'#dn-pres a{position:relative;display:flex;flex-direction:column;gap:2px;padding:10px 10px 9px;border:2px solid #dbe3d4;border-radius:12px;background:#fff;color:#16261b!important;text-decoration:none!important;transition:border-color .2s,transform .15s}#dn-pres a:active{transform:scale(.97)}#dn-pres a.on{border-color:#3f7d3a;background:#f3f8ef}#dn-pres a.off{opacity:.55}'+
'#dn-pres b{font:900 16px/1.1 Archivo,Arial,sans-serif;color:#15301f}#dn-pres span{font-size:13.5px;font-weight:800;color:#1d4a2a}#dn-pres small{font-size:11.5px;color:#53624f}#dn-pres i{position:absolute;top:-9px;left:8px;font-style:normal;white-space:nowrap;background:#f0c04f;color:#15301f;font-size:10px;font-weight:900;letter-spacing:.04em;border-radius:999px;padding:2px 7px}';
d.head.appendChild(st);
var IC={leaf:'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z"/><path d="M5 19l7-7"/></svg>',
star:'<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"/></svg>'};
var pc=d.getElementById('price_display'),pcon=pc&&pc.closest('.price-container'),at=pcon||(pc&&pc.closest('.js-price-container'));
fetch(BASE+'contenido/fichas.json').then(function(r){return r.json()}).then(function(J){
/* etiquetas */
var T=[];if(J.top&&J.top[hd])T.push('<span class="top">'+IC.star+'El más vendido en '+J.top[hd]+'</span>');
if(/sin tacc|libre de gluten/.test(nz))T.push('<span>'+IC.leaf+'Sin TACC</span>');if(/organic/.test(nz))T.push('<span>'+IC.leaf+'Orgánico</span>');
if(/vegan/.test(nz)||(J.veg||[]).indexOf(hd)>=0)T.push('<span>'+IC.leaf+'Vegano</span>');if(/sin azucar/.test(nz))T.push('<span>'+IC.leaf+'Sin azúcar</span>');
if(T.length&&at&&!d.getElementById('dn-tags')){var t=d.createElement('div');t.id='dn-tags';t.innerHTML=T.join('');at.parentNode.insertBefore(t,at)}
/* otras presentaciones */
var F=(J.fam||[]).filter(function(f){return f.some(function(x){return x[0]===hd})})[0];if(!F||d.getElementById('dn-pres'))return;
var lab=function(v,u){return u==='g'?(v>=1000?(v/1000).toLocaleString('es-AR')+' kg':v+' g'):(v>=1000?(v/1000).toLocaleString('es-AR')+' L':v+' ml')};
var w=d.createElement('div');w.id='dn-pres';var form=SP.querySelector('form.js-product-form');var ref=d.getElementById('dn-gr')||d.getElementById('dn-sel')||form;if(!ref)return;ref.parentNode.insertBefore(w,ref);
var R=F.map(function(x){return{h:x[0],v:x[1],u:x[2],p:x[0]===hd?num(pc&&pc.textContent):0,ok:true,me:x[0]===hd}});
function draw(){var ppu=R.filter(function(r){return r.p&&r.ok}).map(function(r){return r.p/r.v}),best=ppu.length>1?Math.min.apply(0,ppu):0;
w.innerHTML='<p>Otras presentaciones</p><div class="g">'+R.map(function(r){var u=r.p?r.p/r.v*1000:0,isb=best&&r.p&&r.ok&&Math.abs(r.p/r.v-best)<1e-9;
return'<a href="/productos/'+r.h+'/"'+(r.me?' class="on" aria-current="true"':r.ok?'':' class="off"')+'>'+(isb?'<i>MÁS CONVENIENTE</i>':'')+'<b>'+lab(r.v,r.u)+'</b><span>'+(r.p?$(r.p):'…')+'</span><small>'+(r.me?'Estás viendo este':!r.ok?'Sin stock':r.p?$(u)+(r.u==='g'?'/kg':'/litro'):'')+'</small>'+(r.me&&r.p?'<small>'+$(u)+(r.u==='g'?'/kg':'/litro')+'</small>':'')+'</a>'}).join('')+'</div>'}
draw();
R.forEach(function(r){if(r.me)return;fetch('/productos/'+r.h+'/').then(function(x){return x.text()}).then(function(h){var m=/id="price_display"[^>]*data-product-price="(\d+)"/.exec(h)||/data-product-price="(\d+)"[^>]*id="price_display"/.exec(h);r.p=m?+m[1]/100:0;
var v=/data-variants="([^"]*)"/.exec(h);if(v){try{var a=JSON.parse(v[1].replace(/&quot;/g,'"').replace(/&amp;/g,'&'));r.ok=a.some(function(y){return y.available!==false&&(y.stock==null||y.stock>0)})}catch(e){}}draw()}).catch(function(){r.ok=false;draw()})});
if(pc)new MutationObserver(function(){R.forEach(function(r){if(r.me)r.p=num(pc.textContent)});draw()}).observe(pc,{childList:true,characterData:true,subtree:true});
}).catch(function(){});
}();
