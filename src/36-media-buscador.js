/* Buscador del encabezado dentro de Naturalmente Media: primero muestra notas y videos que coinciden y abajo los
   productos (el desplegable lo arma el módulo 09; acá se le da el contenido). Enter con notas que coinciden lleva a
   "Escritos" con la búsqueda aplicada; si no hay notas, sigue al buscador normal de productos. */
!function(){var d=document,W=window;if(W.dnMdSx||!d.querySelector('.dn-media'))return;
var K='dnMdIx',PH='Buscá notas, videos o productos',BASE='/naturalmente-media/';
var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var nz=function(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')};
var CM={'bienestar y descanso':'Descanso','sueno':'Descanso','descanso y bienestar':'Descanso'};function cn(c){return CM[nz(c)]||c||''}
/* lo que está en la portada de Media se guarda para poder buscarlo también desde una nota o un video */
var S0=[];if(W.dnMediaVids||W.dnMediaNotes){(W.dnMediaVids||[]).forEach(function(v){S0.push({k:'v',t:v.t,u:v.h,c:v.p,i:v.i,x:''})});(W.dnMediaNotes||[]).forEach(function(n){S0.push({k:'n',t:n.t,u:n.u,c:cn(n.c),i:n.i,x:n.d})});try{localStorage.setItem(K,JSON.stringify(S0))}catch(e){}}
else{try{S0=JSON.parse(localStorage.getItem(K))||[]}catch(e){S0=[]}}
function ix(){var L=[],by={};function add(o){if(!o.u||!o.t)return;var e=by[o.u];if(e){if(o.x)e.x=(e.x?e.x+' ':'')+o.x;if(!e.i&&o.i)e.i=o.i;return}by[o.u]=o;L.push(o)}
S0.forEach(function(o){var c={};for(var k in o)c[k]=o[k];add(c)});
(W.dnMediaEP||[]).forEach(function(v){if(v.s&&v.t)add({k:'v',t:v.t,u:BASE+'?ep='+v.s,c:v.p,i:v.yt?'https://i.ytimg.com/vi/'+v.yt+'/hqdefault.jpg':'',x:[].concat(v.tp||[],v.k||[]).join(' ')})});
var D=W.dnSheet&&W.dnSheet.data;if(D){(D.video||[]).forEach(function(v){add({k:'v',t:v.t,u:BASE+'?ep='+v.s,c:v.p,i:'https://i.ytimg.com/vi/'+v.yt+'/hqdefault.jpg',x:(v.tp||[]).join(' ')})});(D.nota||[]).forEach(function(n){add({k:'n',t:n.t,u:BASE+'?nota='+n.s,c:cn(n.c),i:n.i,x:n.b})})}
return L}
function words(q){return nz(q).split(/[^a-z0-9ñ]+/).filter(function(w){return w.length>1})}
function find(q){var ws=words(q);if(!ws.length)return[];return ix().map(function(o){var t=nz(o.t),c=nz(o.c),x=nz(o.x),sc=0;for(var i=0;i<ws.length;i++){var w=ws[i],h=0;
if(t.indexOf(w)>=0)h=(new RegExp('(^|[^a-z0-9])'+w).test(t)?6:4);else if(c.indexOf(w)>=0)h=3;else if(x.indexOf(w)>=0)h=1;if(!h)return null;sc+=h}return{o:o,s:sc+(o.k==='n'?.5:0)}}).filter(Boolean).sort(function(a,b){return b.s-a.s}).map(function(r){return r.o})}
var st=d.createElement('style');st.textContent='.dn-sx .mh{display:flex;align-items:center;justify-content:space-between;margin:2px 4px 6px 6px}.dn-sx .mh p{margin:0}.dn-sx .dn-sx-x{width:30px;height:30px;border:0;border-radius:50%;background:#eef3e8;color:#1d4a2a;font:700 18px/30px Arial,sans-serif;text-align:center;padding:0;cursor:pointer}'+
'.dn-sx .r.m .th{position:relative;flex:0 0 72px;width:72px;height:48px;border-radius:9px;overflow:hidden;background:#e9efe3}.dn-sx .r.m .th img{width:100%!important;height:100%!important;flex:none;border-radius:0;object-fit:cover}.dn-sx .r.m .th.yt img{transform:scale(1.35)}'+
'.dn-sx .r.m .th s{position:absolute;inset:0;margin:auto;width:22px;height:22px;border-radius:50%;background:rgba(16,40,26,.72);display:flex;align-items:center;justify-content:center;text-decoration:none}.dn-sx .r.m .th s:before{content:"";border-left:7px solid #f4c95d;border-top:4.5px solid transparent;border-bottom:4.5px solid transparent;margin-left:2px}'+
'.dn-sx .r.m em{display:block;font-style:normal;font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#b07c10;margin-bottom:3px}.dn-sx .r.m b{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}'+
'.dn-sx .ma{display:block;margin:4px 6px 10px;padding:10px 12px;border-radius:12px;border:1px solid #e3cf95;background:#fdf6e3;color:#7a5608!important;font-weight:800;font-size:13.5px;text-decoration:none!important;text-align:center}.dn-sx .mc a{background:#fdf1d2!important;color:#7a5608!important}';d.head.appendChild(st);
function row(o){var yt=/ytimg\.com/.test(o.i||'');return'<a class="r m" href="'+esc(o.u)+'"><span class="th'+(yt?' yt':'')+'">'+(o.i?'<img src="'+esc(o.i)+'" alt="" loading="lazy">':'')+(o.k==='v'?'<s></s>':'')+'</span><span style="flex:1;min-width:0;margin:0"><em>'+(o.k==='v'?'Video':'Nota')+(o.c?' · '+esc(o.c):'')+'</em><b>'+esc(o.t)+'</b></span></a>'}
W.dnMdSx=function(q){var R=find(q);if(!R.length)return'';var nN=R.filter(function(o){return o.k==='n'}).length,nV=R.length-nN;
return'<div class="mh"><p>EN NATURALMENTE MEDIA</p><button type="button" class="dn-sx-x" aria-label="Cerrar búsqueda">×</button></div>'+R.slice(0,5).map(row).join('')+
(nN>1||R.length>5?'<a class="ma" href="'+BASE+'?escritos&q='+encodeURIComponent(q)+'">Ver '+(nN===1?'la nota':'las '+nN+' notas')+' sobre “'+esc(q)+'”'+(nV?' ('+nV+(nV===1?' video':' videos')+' arriba)':'')+' →</a>':'')};
var TOP=['Dormir','Mate','Digestión','Infusiones','Recetas','Cúrcuma','Fermentos','Despensa'];
W.dnMdPop=function(){return'<div class="mh"><p>TEMAS EN MEDIA</p><button type="button" class="dn-sx-x" aria-label="Cerrar búsqueda">×</button></div><div class="c mc">'+TOP.map(function(x){return'<a href="'+BASE+'?escritos&q='+encodeURIComponent(x)+'">'+esc(x)+'</a>'}).join('')+'</div>'};
/* texto del buscador */
function ph(){[].forEach.call(d.querySelectorAll('input.js-search-input[name=q]'),function(i){i.setAttribute('placeholder',PH);i.setAttribute('aria-label','Buscar notas, videos o productos');var s=i.parentNode&&i.parentNode.querySelector('.dnf-ph');if(s)s.textContent=PH})}
ph();setTimeout(ph,1500);
/* Enter: si hay notas que coinciden, a Escritos con la búsqueda; si no, productos */
d.addEventListener('submit',function(e){var f=e.target,i=f&&f.querySelector&&f.querySelector('input[name=q]');if(!i||!/\/search\/?$/.test(f.getAttribute('action')||''))return;var q=i.value.trim();if(!q)return;
if(find(q).some(function(o){return o.k==='n'})){e.preventDefault();e.stopImmediatePropagation();location.href=BASE+'?escritos&q='+encodeURIComponent(q)}},true);
}();
