/* Notas de Naturalmente Media: botón "Guardar" y registro de hasta dónde se leyó. Queda solo en el navegador de cada
   persona (sin cuenta, nada viaja a ningún lado) y lo usa el inicio de Media (módulo 35) para "Seguí donde quedaste"
   y "Tus notas guardadas". localStorage: dnNG (guardadas, máx. 30) y dnNL (leídas, máx. 12, con el % leído). */
!function(){var d=document,W=window;if(W.__dnLector)return;W.__dnLector=1;
var LSg=function(k){try{return JSON.parse(localStorage.getItem(k))||[]}catch(x){return[]}},LSs=function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(x){}};
var IC=function(on){return'<svg viewBox="0 0 24 24" width="15" height="15" fill="'+(on?'currentColor':'none')+'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12v18l-6-4-6 4z"/></svg>'};
function go(){var A=d.querySelector('.dn-media.dm-nota article.nt');if(!A)return false;var bd=A.querySelector('.nt-bd'),ac=A.querySelector('.nt-ac');if(!bd||!ac)return false;if(ac.querySelector('.sv'))return true;
var T=function(s){var e=A.querySelector(s);return e?e.textContent.replace(/\s+/g,' ').trim():''};
var u=location.pathname+(/[?&]nota=/.test(location.search)?location.search:''),t=T('h1'),im=(A.querySelector('.nt-cv img')||{}).src||'',c=T('.nt-k span')||'';if(!t)return true;
var st=d.createElement('style');st.textContent='.nt-ac{flex-wrap:wrap}.nt-ac .sv.on{background:#fff!important;border-color:#fff!important;color:#10281a!important}';d.head.appendChild(st);
/* guardar */
var b=d.createElement('button');b.type='button';b.className='sv';var on=function(){return LSg('dnNG').some(function(x){return x&&x.u===u})};
var paint=function(){var o=on();b.classList.toggle('on',o);b.setAttribute('aria-pressed',o?'true':'false');b.innerHTML=IC(o)+'<span>'+(o?'Guardada':'Guardar')+'</span>'};
b.addEventListener('click',function(){var G=LSg('dnNG').filter(function(x){return x&&x.u!==u});if(!on())G.unshift({u:u,t:t,i:im,c:c,ts:Date.now()});LSs('dnNG',G.slice(0,30));paint()});paint();ac.appendChild(b);
/* hasta dónde se leyó: qué parte del texto ya pasó por la mitad de la pantalla */
var mx=0,last=0,dirty=0;
var rd=function(){var r=bd.getBoundingClientRect(),p=Math.max(0,Math.min(100,(innerHeight*.5-r.top)/(r.height||1)*100));if(p>mx){mx=p;dirty=1}};
var save=function(){if(!dirty||mx<3)return;dirty=0;var L=LSg('dnNL').filter(function(x){return x&&x.u!==u});L.unshift({u:u,t:t,i:im,c:c,p:Math.round(mx),ts:Date.now()});LSs('dnNL',L.slice(0,12))};
W.addEventListener('scroll',function(){rd();var n=Date.now();if(n-last>2000){last=n;save()}},{passive:true});
W.addEventListener('pagehide',save);d.addEventListener('visibilitychange',function(){if(d.visibilityState==='hidden')save()});rd();
return true}
if(!go()){var k=0,iv=setInterval(function(){if(go()||++k>40)clearInterval(iv)},250)}
}();
