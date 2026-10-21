/* Ficha de producto, datos que ayudan a elegir (contenido/fichas.json, armado con datos reales de la tienda):
   - Etiquetas: Sin TACC / Orgánico / Sin azúcar solo si el NOMBRE lo dice; Vegano si el nombre lo dice o está en la
     categoría Vegano de la tienda.
   - "El más vendido en <categoría>": el producto con más pedidos pagados de esa categoría.
   (El selector de otros tamaños ya lo hace src/19-tamanos.js.) */
!function(){var d=document,W=window,B=d.body;if(W.__dnFI||!B.classList.contains('template-product'))return;var SP=d.getElementById('single-product');if(!SP)return;W.__dnFI=1;
var hd=(location.pathname.match(/\/productos\/([^\/]+)/)||[])[1];if(!hd)return;
var nm=((SP.querySelector('h1')||{}).textContent||'').trim(),nz=nm.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
var sc=d.querySelector('script[src*="/dist/dn-producto.min.js"]'),BASE=sc?sc.src.replace(/dist\/dn-producto\.min\.js.*$/,''):'';
var num=function(t){return parseFloat(String(t||'').replace(/[^\d,]/g,'').replace(',','.'))||0},$=function(n){return'$'+Math.round(n).toLocaleString('es-AR')};
var st=d.createElement('style');st.textContent=
'#dn-tags{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}#dn-tags span{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:999px;background:#edf3e6;color:#1d4a2a;font-size:12px;font-weight:800;line-height:1.2}#dn-tags span.top{background:#15301f;color:#f0c04f}#dn-tags svg{flex:0 0 auto}'+
'';
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
}).catch(function(){});
}();
