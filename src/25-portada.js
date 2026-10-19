!function(){var d=document,B=d.body;if(!B.classList.contains('template-home'))return;
var box=d.querySelector('.js-home-sections-container');if(!box||d.getElementById('dn-sub'))return;
B.classList.add('dn-portal');
function esc(s){return String(s).replace(/[&<>"]/g,function(x){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[x]})}
function SV(p,s){return'<svg viewBox="0 0 24 24" width="'+(s||18)+'" height="'+(s||18)+'" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>'}
var I={play:'<circle cx="12" cy="12" r="9.5"/><path d="M10 8.5l5.5 3.5-5.5 3.5z" fill="currentColor"/>',bag:'<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'};
var css='body.dn-portal #dn-hmed,body.dn-portal [data-store="home-categories-featured"],body.dn-portal [data-store="home-products-featured"],body.dn-portal [data-store="home-products-sale"],body.dn-portal [data-store="banner-services"]{display:none!important}'+
'#dn-sub{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 12px 14px}'+
'#dn-sub a{display:flex;align-items:center;justify-content:center;gap:8px;height:50px;border-radius:14px;font:900 16px/1 Archivo,Arial,sans-serif;letter-spacing:.08em;text-decoration:none!important;transition:transform .15s}#dn-sub a:active{transform:scale(.97)}'+
'#dn-sub .md{background:#1d4a2a;color:#fff!important;box-shadow:0 6px 16px rgba(16,40,26,.22)}#dn-sub .md svg{color:#f4c95d}'+
'#dn-sub .sh{background:linear-gradient(135deg,#fbe3a0,#f4c95d 45%,#e0a326);color:#10281a!important;box-shadow:0 6px 16px rgba(224,163,38,.25)}'+
'#dn-prg{margin:4px 0 26px;padding:0 12px}#dn-prg .hd{display:flex;align-items:flex-end;justify-content:space-between;gap:10px;margin:0 0 12px}#dn-prg .hd i{display:block;font-style:normal;font-size:11px;font-weight:800;letter-spacing:.16em;color:#a8641a;margin:0 0 3px}#dn-prg h2{margin:0;font:900 22px/1.15 Archivo,Arial,sans-serif;color:#1d4a2a;text-transform:none}#dn-prg h2:before,#dn-prg h2:after{display:none!important}#dn-prg .hd a{flex:0 0 auto;font-size:13px;font-weight:800;color:#3f7d3a!important;text-decoration:none!important}'+
'#dn-prg .g{display:grid;grid-template-columns:1fr 1fr;gap:8px}'+
'#dn-prg .g a{display:flex;flex-direction:column;gap:4px;padding:13px 12px;border-radius:16px;background:#fff;border:1px solid #e6ede0;box-shadow:0 4px 12px rgba(29,74,42,.06);text-decoration:none!important;color:#16261b!important}#dn-prg .g .e{font-size:24px;line-height:1}#dn-prg .g b{font:800 14.5px/1.2 Archivo,Arial,sans-serif;color:#1d4a2a}#dn-prg .g small{font-size:12px;line-height:1.3;color:#53624f;flex:1}'+
'#dn-prg .g u{align-self:flex-start;margin-top:4px;text-decoration:none;font-size:10.5px;font-weight:800;letter-spacing:.06em;border-radius:999px;padding:3px 8px;background:#f3efe6;color:#8a7a62}#dn-prg .g u.on{background:#e1306c;color:#fff}'+
'#dn-not{margin:4px 0 26px;padding:0 12px}#dn-not .hd{display:flex;align-items:flex-end;justify-content:space-between;gap:10px;margin:0 0 12px}#dn-not .hd i{display:block;font-style:normal;font-size:11px;font-weight:800;letter-spacing:.16em;color:#a8641a;margin:0 0 3px}#dn-not h2{margin:0;font:900 22px/1.15 Archivo,Arial,sans-serif;color:#1d4a2a;text-transform:none}#dn-not h2:before,#dn-not h2:after{display:none!important}#dn-not .hd a{font-size:13px;font-weight:800;color:#3f7d3a!important;text-decoration:none!important}'+
'#dn-not a{text-decoration:none!important;color:#16261b!important}#dn-not em{display:block;font-style:normal;font-size:10.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#a8641a;margin:0 0 3px}'+
'#dn-not .f{display:block;background:#fff;border:1px solid #e6ede0;border-radius:18px;overflow:hidden;box-shadow:0 6px 16px rgba(29,74,42,.07)}#dn-not .f img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;background:#f3efe6}#dn-not .f span{display:block;padding:12px 14px 14px}#dn-not .f b{display:block;font:900 19px/1.2 Archivo,Arial,sans-serif;color:#1d4a2a}#dn-not .f small{display:block;margin-top:5px;font-size:13.5px;line-height:1.4;color:#53624f}'+
'#dn-not .ls{display:grid;gap:0;margin-top:6px}#dn-not .ls a{display:flex;gap:12px;align-items:center;padding:11px 2px;border-bottom:1px solid #e6ede0}#dn-not .ls img{flex:0 0 76px;width:76px;height:58px;border-radius:10px;object-fit:cover;background:#f3efe6}#dn-not .ls b{display:block;font:800 14.5px/1.25 Archivo,Arial,sans-serif;color:#1d4a2a}'+
'@media(min-width:768px){#dn-not{max-width:1116px;margin:6px auto 34px}#dn-not .f{display:grid;grid-template-columns:1.3fr 1fr}#dn-not .f img{height:100%}#dn-not .f span{padding:22px}#dn-not .f b{font-size:26px}#dn-not .ls{grid-template-columns:repeat(2,1fr);column-gap:24px}}'+
'@media(min-width:768px){#dn-sub{max-width:1116px;margin:16px auto 22px;gap:14px}#dn-sub a{height:60px;font-size:19px}#dn-prg{max-width:1116px;margin:6px auto 34px}#dn-prg .g{grid-template-columns:repeat(3,1fr);gap:12px}}';
var st=d.createElement('style');st.id='dn-sub-css';st.textContent=css;d.head.appendChild(st);
/* 1. submenú */
var sb=d.createElement('nav');sb.id='dn-sub';sb.setAttribute('aria-label','Secciones');
sb.innerHTML='<a class="md" href="/naturalmente-media/">'+SV(I.play,20)+'MEDIA</a><a class="sh" href="/productos/">'+SV(I.bag,20)+'TIENDA</a>';
box.insertBefore(sb,box.firstChild);
/* 2. programas de Naturalmente Media (se arman solos desde la página de Media) */
function drawP(L){if(!L||!L.length||d.getElementById('dn-prg'))return;var s=d.createElement('section');s.id='dn-prg';
s.innerHTML='<div class="hd"><div><i>NATURALMENTE MEDIA</i><h2>Programas</h2></div><a href="/naturalmente-media/">Ver todo →</a></div><div class="g">'+
L.map(function(x){return'<a href="/naturalmente-media/#dm-programas"><span class="e">'+esc(x.e)+'</span><b>'+esc(x.t)+'</b><small>'+esc(x.d)+'</small><u'+(x.n?' class="on">'+x.n+(x.n>1?' episodios':' episodio'):'>PRÓXIMAMENTE')+'</u></a>'}).join('')+'</div>';
box.appendChild(s);order()}
function drawN(L){if(!L||!L.length||d.getElementById('dn-not'))return;var s=d.createElement('section');s.id='dn-not';var f=L[0];
s.innerHTML='<div class="hd"><div><i>NATURALMENTE MEDIA</i><h2>Últimas notas</h2></div><a href="/naturalmente-media/#dm-leer">Ver todas →</a></div>'+
'<a class="f" href="'+esc(f.u)+'">'+(f.i?'<img alt="" loading="lazy" src="'+esc(f.i)+'">':'')+'<span>'+(f.c?'<em>'+esc(f.c)+'</em>':'')+'<b>'+esc(f.t)+'</b>'+(f.x?'<small>'+esc(f.x)+'</small>':'')+'</span></a>'+
(L.length>1?'<div class="ls">'+L.slice(1,6).map(function(x){return'<a href="'+esc(x.u)+'">'+(x.i?'<img alt="" loading="lazy" src="'+esc(x.i)+'">':'')+'<span>'+(x.c?'<em>'+esc(x.c)+'</em>':'')+'<b>'+esc(x.t)+'</b></span></a>'}).join('')+'</div>':'');
box.appendChild(s);order()}
var K='dnPrg2',P;try{P=JSON.parse(sessionStorage.getItem(K))}catch(e){}
var NN;try{NN=JSON.parse(sessionStorage.getItem(K+'n'))}catch(e){}
if(P){drawN(NN)}else fetch('/naturalmente-media/').then(function(r){return r.text()}).then(function(h){var p=new DOMParser().parseFromString(h,'text/html');
P=[].slice.call(p.querySelectorAll('.dm-prog')).filter(function(g){return g.id!=='dm-leer'&&!g.closest('#dm-leer')}).map(function(g){var t=(g.querySelector('.dm-prog-t')||{}).textContent||'',row=g.querySelector('.dm-row'),n=row?[].filter.call(row.children,function(c){return!/pr[oó]ximamente|muy pronto/i.test(c.textContent)}).length:0;
return{e:((g.querySelector('.dm-prog-ico')||{}).textContent||'').trim(),t:t.trim(),d:((g.querySelector('.dm-prog-d')||{}).textContent||'').trim(),n:n}}).filter(function(x){return x.t});
var N=[].slice.call(p.querySelectorAll('#dm-leer .dm-art')).map(function(a){var l=a.matches('a[href]')?a:a.querySelector('a[href]'),im=a.querySelector('img'),t=((a.querySelector('.dm-art-t')||{}).textContent||'').trim();return{u:l?l.getAttribute('href'):'',t:t,c:((a.querySelector('.dm-art-cat')||{}).textContent||'').trim(),x:((a.querySelector('.dm-art-d')||{}).textContent||'').trim(),i:im?im.getAttribute('src'):''}}).filter(function(x){return x.u&&x.t&&!/pr[oó]ximamente/i.test(x.t)});
try{sessionStorage.setItem(K,JSON.stringify(P));sessionStorage.setItem(K+'n',JSON.stringify(N))}catch(e){}drawN(N)}).catch(function(){});
/* 3. orden del portal: solo contenido */
var O=['#dn-sub','#dn-lep','#dn-not','#dn-qzc','[data-store="home-institutional-message"]','#dn-ig','[data-store="home-newsletter"]'];
var busy=0;function order(){if(busy)return;busy=1;try{var prev=null;O.forEach(function(q){var e=box.querySelector(':scope > '+q);if(!e)return;if(prev){if(prev.nextElementSibling!==e)box.insertBefore(e,prev.nextElementSibling)}else if(box.firstElementChild!==e)box.insertBefore(e,box.firstElementChild);prev=e})}catch(e){}busy=0}
order();if(window.MutationObserver){var mo=new MutationObserver(function(){order()});mo.observe(box,{childList:true});setTimeout(function(){mo.disconnect()},15000)}
}();
