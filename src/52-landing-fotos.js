/* Landings de producto (.dn-lp): las fotos extra que se suben al producto (de la 2ª en adelante) se reparten dentro
   de la landing, cada una en la sección que le corresponde: "qué trae" (fórmula / componentes), "cómo se usa"
   (plan diario / modo de uso), y después el resto. La 1ª foto queda arriba, en la galería. */
!function(){var d=document,W=window,B=d.body;if(W.__dnLF||!B.classList.contains('template-product'))return;
function go(){var lp=d.querySelector('.dn-lp');if(!lp||W.__dnLF)return;W.__dnLF=1;
var h=d.documentElement.innerHTML,i=h.indexOf('"images":['),L=[];if(i<0)return;
(h.slice(i,i+6000).match(/"image":"[^"]+"/g)||[]).forEach(function(m){var f=m.slice(9,-1);if(L.indexOf(f)<0)L.push(f)});
if(L.length<2)return;
var g=d.querySelector('#single-product .js-swiper-product img, #single-product img[src*="/products/"]'),base='';
[].some.call(d.querySelectorAll('#single-product img'),function(im){var s=im.getAttribute('data-srcset')||im.getAttribute('srcset')||im.getAttribute('src')||'';var m=s.match(/(https?:)?\/\/[^ ,]+\/products\//);if(m){base=m[0];return true}});
if(!base)return;if(/^\/\//.test(base))base='https:'+base;
var X=L.slice(1).map(function(f){var n=f.replace(/\.(png|jpe?g|webp|gif)$/i,'');return{s:base+n+'-640-0.webp',l:base+n+'-1024-1024.webp'}});
var st=d.createElement('style');st.textContent='.dn-lpf{display:block;margin:16px auto 18px;max-width:520px;border-radius:18px;overflow:hidden;background:#f4f1e4;box-shadow:0 1px 2px rgba(16,40,26,.06),0 10px 24px -12px rgba(16,40,26,.35)}.dn-lpf img{display:block;width:100%;height:auto}';d.head.appendChild(st);
var S=[].slice.call(lp.children).filter(function(c){return c.querySelector&&c.querySelector('h2')});
var R=[/aliados|qu[eé] trae|qu[eé] incluye|f[oó]rmula|componente|contenido del/i,/plan diario|c[oó]mo se usa|modo de uso|momentos|c[oó]mo tomar/i,/combat|beneficio|por qu[eé]|para qui[eé]n/i,/cuentan|opini|rese[ñn]a/i,/aliment|dieta|h[aá]bito/i];
var used=[];function pick(rx){for(var k=0;k<S.length;k++){if(used.indexOf(S[k])<0&&rx.test(S[k].querySelector('h2').textContent)){used.push(S[k]);return S[k]}}return null}
var T=R.map(pick).filter(Boolean);S.forEach(function(s){if(used.indexOf(s)<0)T.push(s)});
X.forEach(function(x,k){var s=T[k];if(!s)return;var f=d.createElement('figure');f.className='dn-lpf';f.innerHTML='<img loading="lazy" decoding="async" alt="" src="'+x.s+'" srcset="'+x.s+' 640w, '+x.l+' 1024w" sizes="(min-width:768px) 520px, 92vw">';
var h2=s.querySelector('h2'),ref=h2,n=h2.nextElementSibling;
/* después de la línea decorativa y del párrafo de introducción, si los hay */
if(n&&n.tagName==='DIV'&&!n.textContent.trim()){ref=n;n=n.nextElementSibling}if(n&&n.tagName==='P'){ref=n}
ref.parentNode.insertBefore(f,ref.nextSibling)})}
go();if(!W.__dnLF){var t=0,iv=setInterval(function(){go();if(W.__dnLF||++t>20)clearInterval(iv)},400)}
}();
