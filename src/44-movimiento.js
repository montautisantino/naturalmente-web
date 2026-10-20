/* Movimiento de la web: todo responde a algo del usuario (bajar, tocar, acertar, abrir) o avisa algo real
   (hay algo nuevo, se está cargando). Nada se mueve en bucle salvo la franja de Novedad y los "Nuevo".
   Feed y Media: completo. Tienda y categorías: liviano. Producto: solo respuesta al tocar.
   Respeta "reducir movimiento" del celular. Solo opacidad y posición (no carga el celular). */
!function(){var d=document,W=window,B=d.body;if(W.__dnMov)return;W.__dnMov=1;
var RM=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
var HOME=B.classList.contains('template-home'),MEDIA=!!d.querySelector('.dn-media'),PROD=B.classList.contains('template-product'),
LIST=B.classList.contains('template-category')||B.classList.contains('template-search')||/^\/(productos|tienda)\/?$/.test(location.pathname);
var E='cubic-bezier(.2,.8,.2,1)';
var css=
/* respuesta al tocar (toda la web) */
'html body :is(.nxh,.nx,.nx2,.ot,.go,.bt button,.op button,#dn-sub a,#hb-idx a,.dn-band .js-item-product .item,#dn-tcat .tr a,.dmx-n,.nvk,.dm-ep,.dmx-c,.nxs,.nxc,.js-addtocart,.dn-cta,#dn-buy){transition:transform .14s '+E+',opacity .2s,background-color .2s,border-color .2s}'+
'html body :is(.nxh,.nx,.nx2,.ot,.go,.bt button:not(:disabled),.op button:not(:disabled),#dn-sub a,#hb-idx a,#dn-tcat .tr a,.nxs,.nxc,.js-addtocart,.dn-cta,#dn-buy):active{transform:scale(.97)}'+
'html body :is(.dn-band .js-item-product .item,.dmx-n,.nvk,.dm-ep,.dmx-c,#hb-feed a.fc):active{transform:scale(.985)}'+
/* entradas al bajar */
'.dn-rv0{opacity:0;transform:translateY(16px)}.dn-rv1{opacity:1;transform:none;transition:opacity .45s '+E+',transform .45s '+E+'}'+
/* juegos: acierto y error */
'@keyframes dnPop{0%{transform:scale(1)}35%{transform:scale(1.06)}100%{transform:scale(1)}}@keyframes dnNo{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(5px)}60%{transform:translateX(-3px)}80%{transform:translateX(2px)}}'+
'@keyframes dnUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}@keyframes dnTick{0%{transform:scale(0) rotate(-20deg)}70%{transform:scale(1.2)}100%{transform:scale(1)}}'+
'.dn-okp{animation:dnPop .38s '+E+'}.dn-nop{animation:dnNo .4s ease}.dn-tk{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;margin-left:8px;border-radius:50%;background:#3f7d3a;color:#fff;font:900 12px/1 Archivo,Arial,sans-serif;vertical-align:middle;animation:dnTick .35s '+E+'}'+
'.dn-bump{animation:dnPop .4s '+E+'}#hb-mito .rs,#hb-yuyo .rs,#hb-feed .an,#hb-feed .nxw,.rlw{animation:dnUp .3s '+E+' both}'+
/* notas que se despliegan: abren suave */
'.nxo .nxb{animation:dnUp .3s '+E+' both}.nxk i{display:inline-block;transition:transform .25s '+E+'}'+
/* "Nuevo" (notas y videos de los últimos 7 días) */
'.dn-new{display:inline-flex;align-items:center;gap:5px;margin:0 6px 0 0;padding:3px 8px;border-radius:6px;background:#b3261e;color:#fff!important;font:900 11px/1.2 Archivo,Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;vertical-align:2px;white-space:nowrap}'+
'.dn-new:before{content:"";width:6px;height:6px;border-radius:50%;background:#fff;animation:dnLv 1.6s ease-out infinite}@keyframes dnLv{0%{box-shadow:0 0 0 0 rgba(255,255,255,.75)}100%{box-shadow:0 0 0 6px rgba(255,255,255,0)}}'+
'@media (prefers-reduced-motion:reduce){.dn-rv0{opacity:1!important;transform:none!important}html body *{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}';
if(HOME)css+=
/* Novedad: se mueve sola (pedido explícito): entra al cargar, punto en vivo y un reflejo cada tanto */
'@keyframes dnNvIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}@keyframes dnNvSh{0%,78%{transform:translateX(-120%) skewX(-18deg)}100%{transform:translateX(320%) skewX(-18deg)}}'+
'html body #hb-nov{position:relative;overflow:hidden;animation:dnNvIn .5s '+E+' .15s both}html body #hb-nov:after{content:"";position:absolute;top:0;bottom:0;left:0;width:35%;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.55),rgba(255,255,255,0));transform:translateX(-120%);animation:dnNvSh 6.5s ease-in-out 1.2s infinite;pointer-events:none}'+
'html body #hb-nov .bd i{animation:dnNv 1.5s ease-out infinite!important}@keyframes dnNv{0%{box-shadow:0 0 0 0 rgba(179,38,30,.6)}100%{box-shadow:0 0 0 8px rgba(179,38,30,0)}}html body #hb-nov .go{transition:transform .2s '+E+'}'+
/* progreso del recorrido: barrita en el índice fijo */
'#hb-idx .dn-pg{position:absolute;left:0;bottom:-1px;height:3px;width:100%;background:#3f7d3a;transform-origin:0 50%;transform:scaleX(0);transition:transform .15s linear;border-radius:0 3px 3px 0}'+
/* diseño editorial variado en el feed */
'html body #hb-feed .fc{animation:none!important}'+
'html body #hb-feed .t-nota.cmp .nxh{display:flex!important;gap:12px;align-items:stretch;padding:12px}html body #hb-feed .t-nota.cmp .im{flex:0 0 104px;width:104px;aspect-ratio:auto;min-height:96px;border-radius:12px;overflow:hidden}html body #hb-feed .t-nota.cmp .bd{padding:2px 0 0;flex:1;min-width:0}html body #hb-feed .t-nota.cmp .bd b{font-size:15.5px}'+
'html body #hb-feed .t-mito>p{font-size:21px!important;line-height:1.3!important;letter-spacing:-.01em}'+
'html body #hb-feed .t-guia ol{list-style:none;padding:0!important;counter-reset:g}html body #hb-feed .t-guia li{position:relative;padding-left:40px;min-height:28px;counter-increment:g}html body #hb-feed .t-guia li:before{content:counter(g);position:absolute;left:0;top:-2px;width:28px;height:28px;border-radius:50%;background:#f0c04f;color:#16261b;font:900 14px/28px Archivo,Arial,sans-serif;text-align:center}'+
'html body #hb-feed .t-glos h3{font-size:30px!important;letter-spacing:-.02em!important;margin:4px 0 8px!important}'+
'html body #hb-feed .t-glos p{font:500 16px/1.55 Figtree,Arial,sans-serif!important;color:#2b3a28!important}'+
/* carga elegante: siluetas en vez de puntitos */
'html body #hb-feed .fs{display:block!important;padding:0!important}html body #hb-feed .fs span{display:none!important}html body #hb-feed .fs:before,html body #hb-feed .fs:after{content:"";display:block;height:120px;margin:0 0 12px;border-radius:18px;background:linear-gradient(90deg,#efe9dc 0%,#f7f3ea 50%,#efe9dc 100%);background-size:200% 100%;animation:dnSk 1.3s linear infinite}html body #hb-feed .fs:after{height:84px}@keyframes dnSk{to{background-position:-200% 0}}html body #hb-feed.end .fs{display:none!important}'+
/* contador de lectura */
'#dn-lei{display:inline-flex;align-items:center;gap:6px;margin:8px 0 0;padding:5px 10px;border-radius:999px;background:#eef3e6;color:#1d4a2a;font:800 12.5px/1 Figtree,Arial,sans-serif}';
var st=d.createElement('style');st.id='dn-mov-css';st.textContent=css;d.head.appendChild(st);

/* ---------- entradas al bajar ---------- */
var pend=[],seq=0,tk=0;
function vis(e){var r=e.getBoundingClientRect();return r.top<innerHeight*.94&&r.bottom>0}
function show(e,i){e.style.transitionDelay=Math.min(i,4)*60+'ms';e.classList.add('dn-rv1');e.classList.remove('dn-rv0');setTimeout(function(){e.style.transitionDelay=''},800)}
function check(){tk=0;var n=0;pend=pend.filter(function(e){if(!e.isConnected)return false;if(vis(e)){show(e,n++);return false}return true})}
function kick(){if(!tk)tk=requestAnimationFrame(check)}
function add(e){if(RM||e.__dnRv||e.classList.contains('hb-rv'))return;e.__dnRv=1;if(vis(e)||e.getBoundingClientRect().top<0)return;e.classList.add('dn-rv0');pend.push(e)}
function scan(sel,root){[].forEach.call((root||d).querySelectorAll(sel),add);kick()}
addEventListener('scroll',kick,{passive:true});addEventListener('resize',kick);
/* nunca dejar algo invisible: si por algo no se dispara, a los 2,5 s se revisa igual y al salir de la página todo queda visible */
setInterval(function(){if(pend.length)kick()},2500);

var SEL=HOME?'.js-home-sections-container > .hb:not(#hb-sub):not(#hb-idx):not(#hb-nov),#hb-feed .fc,#dn-not .nr,.section-featured-home .js-item-product':
MEDIA?'.nvk,.dmx-n,.dmx-c,.dm-ep,.dm-prog-head,.dmx-hd,.dn-mvb,.dn-kit':
LIST?'.dn-band,#dn-tcat,#dn-tsucw,#dn-tlib,.js-product-table > .js-item-product':'';
if(SEL&&!PROD){var go=function(){scan(SEL)};setTimeout(go,60);setTimeout(go,1200);setTimeout(go,3500);
if(W.MutationObserver){var mt=0;new MutationObserver(function(){clearTimeout(mt);mt=setTimeout(go,80)}).observe(d.querySelector('.js-home-sections-container')||d.querySelector('.dn-media')||B,{childList:true,subtree:true})}}

/* ---------- juegos: acierto y error ---------- */
d.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#hb-mito .bt button,#hb-yuyo .op button,#hb-feed .bt button,#hb-feed .op button');if(!b)return;
setTimeout(function(){var ok=null,host=b.closest('#hb-mito,#hb-yuyo,.fc');if(!host)return;
if(host.id==='hb-mito'){var v=host.querySelector('.v');ok=v&&v.classList.contains('ok')}
else if(host.id==='hb-yuyo'){ok=b.classList.contains('ok')}
else if(host.classList.contains('t-yuyo')){ok=b.classList.contains('y')}
else if(host.classList.contains('t-mito')){var t=host.querySelector('.an b');ok=t&&/^¡Bien/.test(t.textContent)}
if(ok===null)return;b.classList.remove('dn-okp','dn-nop');void b.offsetWidth;b.classList.add(ok?'dn-okp':'dn-nop');
if(ok&&!b.querySelector('.dn-tk')){var k=d.createElement('span');k.className='dn-tk';k.textContent='✓';b.appendChild(k)}
var sc=host.querySelector('.sc');if(sc){sc.classList.remove('dn-bump');void sc.offsetWidth;sc.classList.add('dn-bump')}},0)},true);

/* ---------- "Nuevo": notas y videos de los últimos 7 días ---------- */
function nuevos(){var S=W.dnSheet&&W.dnSheet.data;if(!S)return;var lim=Date.now()-7*864e5,R={};(S.nota||[]).forEach(function(n){if(n.ts>lim&&n.s)R['nota='+n.s]=1});(S.video||[]).forEach(function(v){if(v.ts>lim&&v.s)R['ep='+v.s]=1});
if(!Object.keys(R).length)return;[].forEach.call(d.querySelectorAll('a[href*="?nota="],a[href*="?ep="],#dn-not .nr,#hb-feed .t-nota'),function(a){if(a.__dnNw||a.closest('#hb-nov'))return;var h=a.getAttribute('href')||((a.querySelector('.nxs')||{}).getAttribute&&a.querySelector('.nxs').getAttribute('href'))||'',m=/[?&](nota|ep)=([^&#]+)/.exec(h);if(!m||!R[m[1]+'='+decodeURIComponent(m[2])])return;
var t=a.querySelector('b,strong,h3');if(!t||t.querySelector('.dn-new'))return;a.__dnNw=1;var s=d.createElement('span');s.className='dn-new';s.textContent='Nuevo';t.insertBefore(s,t.firstChild)})}
if(HOME||MEDIA){var nw=function(){nuevos()};if(W.dnSheet&&W.dnSheet.ready)W.dnSheet.ready(function(){setTimeout(nw,300)});setTimeout(nw,2000);setTimeout(nw,5000);
if(W.MutationObserver){var nt=0;new MutationObserver(function(){clearTimeout(nt);nt=setTimeout(nw,250)}).observe(B,{childList:true,subtree:true})}}

/* ---------- Feed: progreso, notas compactas alternadas y contador de lectura ---------- */
if(HOME){
var pg=function(){var ix=d.getElementById('hb-idx'),box=d.querySelector('.js-home-sections-container');if(!ix||!box)return;var b=ix.querySelector('.dn-pg');if(!b){b=d.createElement('i');b.className='dn-pg';ix.appendChild(b)}
var r=box.getBoundingClientRect(),tot=r.height-innerHeight,p=tot>0?Math.min(1,Math.max(0,-r.top/tot)):0;b.style.transform='scaleX('+p.toFixed(3)+')'};
var pr=0;addEventListener('scroll',function(){if(!pr)pr=requestAnimationFrame(function(){pr=0;pg()})},{passive:true});setTimeout(pg,800);
var cmp=function(){var i=0;[].forEach.call(d.querySelectorAll('#hb-feed .fc.t-nota'),function(c){if(i++%3!==0)c.classList.add('cmp')})};setInterval(cmp,1200);setTimeout(cmp,300);
/* cuántas notas abriste hoy (se guarda solo en tu navegador) */
var DK='dnLei:'+new Date().toDateString();var lei=function(){var n=0;try{n=+localStorage.getItem(DK)||0}catch(e){}return n};
var pinta=function(){var n=lei(),h=d.querySelector('#hb-not .hd>div')||d.querySelector('#hb-not h2');if(!h||!n)return;var p=d.getElementById('dn-lei');if(!p){p=d.createElement('span');p.id='dn-lei';h.appendChild(p)}p.textContent='Hoy abriste '+n+(n===1?' nota':' notas');p.classList.remove('dn-bump');void p.offsetWidth;p.classList.add('dn-bump')};
d.addEventListener('click',function(e){var h=e.target.closest&&e.target.closest('.nxh');if(!h)return;setTimeout(function(){var w=h.parentNode;if(!w||!w.classList.contains('nxo')||w.__dnLei)return;w.__dnLei=1;try{localStorage.setItem(DK,lei()+1)}catch(x){}pinta()},0)});setTimeout(pinta,1500)}
}();
