/* Categorías de la tienda: bloque "Para leer" con 4 notas de Naturalmente Media relacionadas con la categoría.
   Las elige herramientas/notas-categorias.py (según los productos que mencionan y el tema del título) y build.sh las
   deja en window.dnNC (parte listado). Va dentro de la grilla, después de las primeras filas completas (unos 12
   productos): lo que trae el scroll infinito aparece después, así no se "escapa" al final de la lista.
   No va en la Tienda (/productos/), en búsquedas ni en categorías sin notas (combos, libros, etc.). */
!function(){var d=document,W=window,B=d.body;if(!B.classList.contains('template-category')||W.__dnNcat)return;W.__dnNcat=1;
var path=location.pathname.replace(/\/page\/\d+\/?$/,'/'),slug=(path.match(/^\/([^\/]+)\/?$/)||[])[1]||'',L=(W.dnNC||{})[slug];if(!L||L.length<2)return;
var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var img=function(u){return String(u||'').replace(/([?&])w=\d+/,'$1w=480').replace(/([?&])h=\d+/,'$1h=270')};
var st=d.createElement('style');st.id='dn-ncat-css';st.textContent=
'#dn-ncat{margin:6px 0 22px;padding:16px 0 14px;border-radius:18px;background:#f6f3ea;border:1px solid #e7dfc8}'+
'#dn-ncat .hd{padding:0 16px 12px}#dn-ncat .hd i{display:block;font-style:normal;font:900 11.5px/1 Archivo,Arial,sans-serif;letter-spacing:.1em;color:#3f7d3a;margin:0 0 6px}#dn-ncat .hd b{display:block;font:900 18px/1.2 Archivo,Arial,sans-serif;color:#16261b}#dn-ncat .hd small{display:block;margin-top:4px;font-size:13px;line-height:1.35;color:#5b6b5e}'+
'#dn-ncat .r{display:flex;gap:10px;overflow-x:auto;padding:0 16px 4px;scroll-snap-type:x mandatory;scroll-padding:0 16px;scrollbar-width:none}#dn-ncat .r::-webkit-scrollbar{display:none}'+
'#dn-ncat .c{flex:0 0 220px;scroll-snap-align:start;display:flex;flex-direction:column;background:#fff;border:1px solid #ece4cd;border-radius:14px;overflow:hidden;text-decoration:none!important;color:#16261b!important;transition:transform .15s}#dn-ncat .c:active{transform:scale(.98)}'+
'#dn-ncat .im{display:block;aspect-ratio:16/9;background:#e9e3d2;overflow:hidden}#dn-ncat .im img{display:block;width:100%;height:100%;object-fit:cover}'+
'#dn-ncat .tx{display:flex;flex-direction:column;flex:1;padding:10px 12px 12px}#dn-ncat .tx em{font-style:normal;font:800 11px/1 Archivo,Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#3f7d3a;margin:0 0 6px}'+
'#dn-ncat .tx strong{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;font:800 14.5px/1.28 Archivo,Arial,sans-serif;color:#16261b}#dn-ncat .tx u{margin-top:auto;padding-top:8px;text-decoration:none;font-size:12px;font-weight:700;color:#6b7a67}'+
'#dn-ncat .all{display:inline-flex;align-items:center;gap:6px;margin:12px 16px 0;padding:9px 14px;border-radius:999px;border:1.5px solid #cfdcc5;background:#fff;color:#1d4a2a!important;font:800 13px/1 Archivo,Arial,sans-serif;text-decoration:none!important}'+
'@media(min-width:768px){#dn-ncat{padding:20px 0 18px}#dn-ncat .hd{padding:0 20px 14px}#dn-ncat .r{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;overflow:visible;padding:0 20px}#dn-ncat .c{flex:none}#dn-ncat .all{margin-left:20px}}';
d.head.appendChild(st);
var html='<div class="hd"><i>NATURALMENTE MEDIA</i><b>Para leer y sacarles provecho</b><small>Notas de nuestro equipo con productos de esta categoría.</small></div><div class="r">'+
L.slice(0,4).map(function(n){return'<a class="c" href="'+esc(n.u)+'"><span class="im">'+(n.i?'<img loading="lazy" alt="" src="'+esc(img(n.i))+'">':'')+'</span><span class="tx">'+(n.c?'<em>'+esc(n.c)+'</em>':'')+'<strong>'+esc(n.t)+'</strong>'+(n.m?'<u>'+esc(n.m)+' min de lectura</u>':'')+'</span></a>'}).join('')+
'</div><a class="all" href="/naturalmente-media/?escritos">Ver todas las notas →</a>';
/* después de las primeras filas completas (12 productos en el celular, 10 con 5 por fila, etc.) */
function put(){if(d.getElementById('dn-ncat'))return true;var tb=d.querySelector('.js-product-table');if(!tb)return false;
var it=[].filter.call(tb.children,function(x){return x.classList.contains('js-item-product')});if(!it.length)return false;
var cols=1,top=it[0].offsetTop;for(var i=1;i<it.length&&it[i].offsetTop===top;i++)cols++;var n=Math.max(cols,Math.floor(12/cols)*cols),after=it[Math.min(n,it.length)-1];
var b=d.createElement('div');b.id='dn-ncat';b.className='col-12';b.innerHTML=html;after.parentNode.insertBefore(b,after.nextSibling);return true}
if(!put()){var k=0,iv=setInterval(function(){if(put()||++k>20)clearInterval(iv)},300)}
}();
