/* Contenido cargado por formulario (Google Forms → planilla "Dietéticas Naturalmente · Contenido de la web").
   Lee las pestañas "Base" (lo que ya había) y "Respuestas" (lo que se carga por el formulario), solo filas con
   Publicar = Sí. Guarda una copia en el navegador (se renueva cada 5 minutos) para que la página no espere.
   Si la planilla falla, la web sigue con el contenido que trae el código. Solo trabaja en el inicio y en Media. */
!function(){var W=window,d=document;if(W.dnSheet)return;
var ID='1qrT32OXed3bPESBFqYxXbhhtxI_wInRjb3N2D_5IHAg',K='dnSh3',TTL=5*60e3;
/* lo cargado por formulario solo se publica si viene de las dos cuentas autorizadas (el formulario pide iniciar
   sesión). Las cuentas no se escriben acá (este código es público): se compara una huella del mail (cyrb53).
   Para autorizar otra cuenta: node -e "<función hh de abajo>; console.log(hh('mail@dominio'))" y sumar el resultado. */
function hh(s){var h1=0xdeadbeef,h2=0x41c6ce57;for(var i=0,ch;i<s.length;i++){ch=s.charCodeAt(i);h1=Math.imul(h1^ch,2654435761);h2=Math.imul(h2^ch,1597334677)}h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);return(4294967296*(2097151&h2)+(h1>>>0)).toString(36)}
var OK=['1yowmpbmwy','anrfuaxa5p'];
var need=d.body.classList.contains('template-home')||!!d.querySelector('.dn-media');
var c=null;try{c=JSON.parse(localStorage.getItem(K))}catch(e){}
/* notas del equipo que viajan con el código de la web (lista liviana; el texto se baja al abrir la nota) */
var EQ=W.dnNotasEquipo||[],BASE=(function(){var m=CS&&CS.src&&/^(https:\/\/.+\/)dist\/dn\.min\.js/.exec(CS.src);return m?m[1]:''})(),EQS={};EQ.forEach(function(n){EQS[n.s]=1});
function eq(D){if(!EQ.length)return D;D=D||{dato:[],mito:[],yuyo:[],ficha:[],tip:[],video:[],nota:[]};D.nota=D.nota||[];var h={};D.nota.forEach(function(n){h[n.s]=1});EQ.forEach(function(n){if(!h[n.s])D.nota.push(n)});D.nota.sort(function(a,b){return(+b.ts||0)-(+a.ts||0)});return D}
var S={data:eq(c&&c.d||null),done:0,cbs:[],ready:function(f){if(S.done)f(S.data);else S.cbs.push(f)}};W.dnSheet=S;
/* la lista de notas del equipo viene en la parte de inicio y de Media (no en el núcleo): se suma cuando llega */
S.eqAdd=function(L){if(!L||!L.length)return;EQ=L;EQS={};EQ.forEach(function(n){EQS[n.s]=1});S.data=eq(S.data)};
var CV='https://cdn.jsdelivr.net/gh/montautisantino/naturalmente-web@f573e17d4855fc1df454703d150736732f82c70e/covers/';
var MES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
function slug(t){return String(t||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,70)}
/* fotos libres de Unsplash (licencia Unsplash: uso comercial gratis, sin atribución obligatoria) */
var UP=function(id){return'https://images.unsplash.com/photo-'+id+'?auto=format&fit=crop&w=1200&h=675&q=70'};
var PH={adaptogenos:UP('1611073761742-bce90ccd60ae'),manzanilla:UP('1719004322362-d230dc138bee'),dormir:UP('1688382575775-9aaa5025524e'),fibra:UP('1621956838481-f8f616950454'),caminar:UP('1560741282-a3ff4a507b4f'),
fito:UP('1563822249548-9a72b6353cd1'),alim:UP('1512621776951-a57141f2eefd'),desc:UP('1757796859729-270d1e3ad4d5'),mov:UP('1631363482867-ed7a52df2847')};
function cover(cat){var k=slug(cat);return/descans|sueno|dormir/.test(k)?PH.desc:/movim|ejerc|camin|deporte/.test(k)?PH.mov:/aliment|nutri|cocina|receta/.test(k)?PH.alim:PH.fito}
/* imágenes que no se pueden usar (miniaturas de Google) → se reemplazan por una foto libre */
function okImg(u){return/^https:\/\//.test(u)&&!/gstatic\.com|encrypted-tbn/.test(u)}
/* las portadas ilustradas viejas de las notas se cambian por fotos */
function swap(img){var m=/\/covers\/([a-z]+)\.svg/.exec(img.getAttribute('src')||'');if(m&&PH[m[1]])img.setAttribute('src',PH[m[1]])}
S.photo=PH;
function date(v){var m=/Date\((\d+),(\d+),(\d+)(?:,(\d+),(\d+),(\d+))?\)/.exec(v||'');return m?new Date(+m[1],+m[2],+m[3],+(m[4]||0),+(m[5]||0)):null}
function yt(u){var m=/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/.exec(u||'');return m?m[1]:''}
function lines(t){return String(t||'').split(/\r?\n/).map(function(x){return x.trim()}).filter(Boolean)}
function pretty(s){s=s.replace(/-[a-z0-9]{4,6}$/,'').replace(/-/g,' ');return s.charAt(0).toUpperCase()+s.slice(1)}
function parse(tabs){var D={dato:[],mito:[],yuyo:[],ficha:[],tip:[],video:[],nota:[]};
tabs.forEach(function(j,ti){if(!j||!j.table)return;var L=j.table.cols.map(function(c){return(c.label||'').trim()}),EM=L.filter(function(l){return/mail|correo/i.test(l)})[0];
j.table.rows.forEach(function(r){var o={};L.forEach(function(l,i){var c=r.c[i];o[l]=c?(c.f&&l==='Timestamp'?c.v:(c.v==null?'':c.v)):''});
var g=function(k){return String(o[k]==null?'':o[k]).replace(/[\u2060\uFFFC\u200B]/g,'').replace(/[ \t]+\)/g,')').trim()};if(!/^s/i.test(g('Publicar')))return;if(ti===1&&(!EM||OK.indexOf(hh(g(EM).toLowerCase()))<0))return;var t=g('Tipo').toLowerCase(),ts=date(o.Timestamp||o['Marca temporal']);
if(/^dato/.test(t)){if(g('Dato: texto'))D.dato.push(g('Dato: texto'))}
else if(/^mito/.test(t)){if(g('Mito: frase'))D.mito.push([g('Mito: frase'),/^real/i.test(g('Mito: respuesta'))?1:0,g('Mito: explicación')])}
else if(/^adivin/.test(t)){if(g('Yuyo: pista')&&g('Yuyo: respuesta correcta'))D.yuyo.push([g('Yuyo: pista'),g('Yuyo: respuesta correcta'),[g('Yuyo: opción incorrecta 1'),g('Yuyo: opción incorrecta 2')].filter(Boolean)])}
else if(/^ficha/.test(t)){if(g('Ficha: planta'))D.ficha.push([g('Ficha: planta'),g('Ficha: nombre científico'),g('Ficha: qué se usa'),g('Ficha: cómo se prepara'),g('Ficha: aroma'),g('Ficha: curiosidad')])}
else if(/^tip/.test(t)){if(g('Tip: título')&&g('Tip: texto'))D.tip.push([g('Tip: título'),g('Tip: texto')])}
else if(/^video/.test(t)){var y=yt(g('Video: link de YouTube')),ti=g('Video: título');if(!y||!ti)return;var p=g('Video: programa')||'Varios',du=g('Video: duración');
D.video.push({s:slug(ti),p:p,k:g('Video: tipo')||'Video',yt:y,t:ti,src:p+(ts?' · '+MES[ts.getMonth()].replace(/^./,function(x){return x.toUpperCase()})+' '+ts.getFullYear():''),meta:['🌿 '+(g('Video: tipo')||'Video'),'⏱ '+(du||'Video')],
d:g('Video: descripción').split(/\n\s*\n|\r?\n/).map(function(x){return x.trim()}).filter(Boolean),tp:g('Video: temas').split(',').map(function(x){return x.trim()}).filter(Boolean),ch:lines(g('Video: momentos')),
pr:lines(g('Video: productos')).map(function(u){var m=/\/productos\/([^\/?#]+)/.exec(u);return m?pretty(m[1])+'|||'+m[1]:''}).filter(Boolean),ts:ts?+ts:0})}
else if(/^nota/.test(t)){var nt=g('Nota: título');if(!nt||!g('Nota: texto'))return;D.nota.push({s:slug(nt),t:nt,c:g('Nota: categoría'),b:g('Nota: bajada'),x:g('Nota: texto'),i:okImg(g('Nota: link de imagen'))?g('Nota: link de imagen'):cover(g('Nota: categoría')),f:ts?ts.getDate()+' de '+MES[ts.getMonth()]+' de '+ts.getFullYear():'',ts:ts?+ts:0})}})});
D.video.sort(function(a,b){return b.ts-a.ts});D.nota.sort(function(a,b){return b.ts-a.ts});return D}
/* pestaña "Notas": notas largas. La lista viaja sin el texto (liviana); el texto se baja solo al abrir la nota */
function notas(j,D){if(!j||!j.table)return;j.table.rows.forEach(function(r){var v=function(i){var c=r.c[i];return c&&c.v!=null?String(c.v).trim():''};if(!/^s/i.test(v(0))||!v(1)||!v(6))return;
D.nota.push({s:v(6),t:v(1),c:v(2),b:v(3),i:okImg(v(4))?v(4):cover(v(2)),f:v(5),m:+v(7)||0,x:'',lz:1,ts:0})})}
S.texto=function(s,cb){var k='dnNt:'+s,c=null;try{c=sessionStorage.getItem(k)}catch(e){}if(c)return cb(c);
if(EQS[s]&&BASE){/* si un servidor de jsDelivr falla, prueba los otros dos (igual que el código de la web) */var HS=[BASE].concat(['cdn','fastly','gcore'].map(function(h){return BASE.replace(/^https:\/\/[^\/]+/,'https://'+h+'.jsdelivr.net')}).filter(function(u){return u!==BASE}));
(function go(i){if(i>=HS.length)return cb('');fetch(HS[i]+'contenido/notas/'+s+'.txt').then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(t){try{sessionStorage.setItem(k,t)}catch(e){}cb(t)}).catch(function(){go(i+1)})})(0);return}
get('Notas',"select I where G = '"+String(s).replace(/'/g,'')+"'").then(function(j){var t=j&&j.table.rows[0]&&j.table.rows[0].c[0]&&j.table.rows[0].c[0].v||'';t=String(t).replace(/[⁠￼​]/g,'');try{sessionStorage.setItem(k,t)}catch(e){}cb(t)}).catch(function(){cb('')})};
/* videos nuevos también en la lista corta que usa el inicio */
function apply(){var V=S.data&&S.data.video;if(!V||!V.length||!W.dnEPL)return;var have={};W.dnEPL.forEach(function(x){have[x.y]=1});
W.dnEPL=V.filter(function(v){return!have[v.yt]}).map(function(v){return{h:'/naturalmente-media/?ep='+v.s,t:v.t,n:v.p+' · '+String(v.meta[1]).replace(/^⏱\s*/,''),y:v.yt}}).concat(W.dnEPL)}
S.slug=slug;if(S.data)apply();
if(need){[].forEach.call(d.querySelectorAll('img[src*="/covers/"]'),swap);if(W.MutationObserver)new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,function(n){if(n.nodeType!==1)return;if(n.tagName==='IMG')swap(n);else if(n.querySelectorAll)[].forEach.call(n.querySelectorAll('img[src*="/covers/"]'),swap)})})}).observe(d.documentElement,{childList:true,subtree:true})}
function fin(){S.done=1;var f=S.cbs;S.cbs=[];f.forEach(function(x){try{x(S.data)}catch(e){}})}
if(!need||(c&&Date.now()-c.t<TTL)){fin();return}
function get(sh,q){return fetch('https://docs.google.com/spreadsheets/d/'+ID+'/gviz/tq?tqx=out:json&headers=1&sheet='+encodeURIComponent(sh)+(q?'&tq='+encodeURIComponent(q):'')).then(function(r){return r.text()}).then(function(t){return JSON.parse(t.slice(t.indexOf('{'),t.lastIndexOf('}')+1))})}
Promise.all([get('Base'),get('Respuestas').catch(function(){return null}),get('Notas','select A,B,C,D,E,F,G,H').catch(function(){return null})]).then(function(T){var D=parse(T.slice(0,2));notas(T[2],D);D=eq(D);var n=0;for(var k in D)n+=D[k].length;if(n){S.data=D;try{localStorage.setItem(K,JSON.stringify({t:Date.now(),d:D}))}catch(e){}apply()}fin()}).catch(fin);
}();
