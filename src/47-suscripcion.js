/* Suscripción (Tiendanube "Compra por suscripción") con diseño propio.
   A. Ficha de producto: la opción "Suscripción mensual" entra en nuestro selector de plan (#dn-sel) y reemplaza
      visualmente al selector del tema (que sigue en la página, oculto, y es el que hace la compra).
      "COMPRAR AHORA" en modo suscripción usa el botón del tema, que es el que sabe crear la suscripción.
   B. Si el cliente (con sesión iniciada) ya compró varias veces un combo que tiene suscripción, una ventana
      se lo recomienda. Lee sus propios pedidos desde "Mi cuenta" y lo guarda un día en su navegador. */
!function(){var d=document,W=window,B=d.body;if(W.__dnSub)return;W.__dnSub=1;
var WA='5491141816107',DAYS=14,NEED=2;
/* combos con suscripción (para la recomendación por historial de compras) */
var CB=[{k:/c[aá]ndida/i,n:'Combo Cándida',u:'/productos/combo-parasitos-candida-elimina-la-candida/'},{k:/pr[oó]stata/i,n:'Combo Próstata',u:'/productos/combo-prostata/'},
{k:/reductor/i,n:'Combo Metabólico Reductor',u:'/productos/combo-metabolico-reductor-2gptb/'},{k:/potencia/i,n:'Combo Potencia',u:'/productos/combo-potencia-mayor-potencia-sexual/'},
{k:/h[ií]gado graso/i,n:'Combo Hígado Graso',u:'/productos/combo-hepatoprotector-higado-graso-acidez-y-reflujo/'}];
var $=function(n){return'$'+Math.round(n).toLocaleString('es-AR')};
var get=function(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},put=function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
var st=d.createElement('style');st.textContent=
/* selector del tema: queda funcionando pero oculto cuando está el nuestro */
'body.dn-subon #single-product .js-purchase-options-container-private{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;overflow:hidden!important}'+
'#dn-sel button.sb{border-style:dashed}#dn-sel button.sb.on{border-style:solid;background:#fbf0d4;border-color:#c98a1a}#dn-sel button.sb .r{border-color:#d9b25c}#dn-sel button.sb.on .r{border-color:#c98a1a}#dn-sel button.sb .r:after{background:#c98a1a}'+
'#dn-sel button.sb .pr small{display:inline;font-size:12px;font-weight:700;color:#53624f;margin:0}#dn-sel button.sb s{display:block;font-size:12px;font-weight:600;color:#8a9686;text-align:right}'+
'#dn-subi{margin:-4px 0 14px;padding:12px 14px;border-radius:12px;background:#fbf8f1;border:1px solid #efe3c4;font-size:13px;line-height:1.45;color:#16261b}#dn-subi ul{margin:0;padding:0;list-style:none}#dn-subi li{position:relative;padding-left:20px;margin:0 0 4px}#dn-subi li:before{content:"✓";position:absolute;left:0;top:0;color:#1d4a2a;font-weight:900}#dn-subi a{color:#1d4a2a;font-weight:800;text-decoration:underline}'+
/* ventana de recomendación */
'#dn-subp{position:fixed;inset:0;z-index:100005;background:rgba(16,40,26,.55);display:flex;align-items:flex-end;justify-content:center;opacity:0;transition:opacity .25s}#dn-subp.in{opacity:1}'+
'#dn-subp .bx{position:relative;width:100%;max-width:420px;background:#fbf8f1;border-radius:18px 18px 0 0;padding:22px 18px calc(18px + env(safe-area-inset-bottom));transform:translateY(24px);transition:transform .3s cubic-bezier(.2,.8,.2,1);color:#16261b}#dn-subp.in .bx{transform:none}'+
'#dn-subp .x{position:absolute;top:10px;right:10px;width:36px;height:36px;border:0;border-radius:50%;background:#f5efe1;color:#16261b;font-size:20px;line-height:1;cursor:pointer}'+
'#dn-subp .tg{display:inline-block;padding:4px 10px;border-radius:999px;background:#f0c04f;color:#15301f;font:900 12px/1 Archivo,Arial,sans-serif;letter-spacing:.06em}'+
'#dn-subp h3{margin:10px 0 6px;font:900 21px/1.2 Archivo,Arial,sans-serif;color:#15301f}#dn-subp p{margin:0 0 12px;font-size:14.5px;line-height:1.45;color:#3d4b3f}'+
'#dn-subp ul{margin:0 0 16px;padding:12px 14px;list-style:none;background:#fff;border:1px solid rgba(22,38,27,.08);border-radius:12px}#dn-subp li{position:relative;padding-left:22px;margin:4px 0;font-size:14px}#dn-subp li:before{content:"✓";position:absolute;left:0;color:#1d4a2a;font-weight:900}'+
'#dn-subp .go{display:flex;align-items:center;justify-content:center;width:100%;min-height:52px;border:0;border-radius:12px;background:#1d4a2a;color:#fff!important;font:800 16px/1 Archivo,Arial,sans-serif;text-decoration:none!important;cursor:pointer}'+
'#dn-subp .no{display:block;width:100%;margin-top:8px;padding:12px;border:0;background:none;color:#53624f;font-weight:700;font-size:14px;cursor:pointer}'+
'@media(min-width:768px){#dn-subp{align-items:center}#dn-subp .bx{border-radius:18px}}@media(prefers-reduced-motion:reduce){#dn-subp,#dn-subp .bx{transition:none}}';
d.head.appendChild(st);

/* ---------------- A. ficha de producto ---------------- */
var F=d.querySelector('#single-product form.js-product-form'),PO=F&&F.querySelector('.js-purchase-options-container-private'),R1=PO&&PO.querySelector('#purchase-option-one-time'),RS=PO&&PO.querySelector('#purchase-option-subscription');
if(B.classList.contains('template-product')&&PO&&R1&&RS)(function(){
var freq=+PO.getAttribute('data-subscription-default-frequency')||30,dsc=+RS.getAttribute('data-subscription-discount')||+PO.getAttribute('data-subscription-default-discount')||0,q=F.querySelector('.js-quantity-input');
var nm=((d.querySelector('#single-product h1')||{}).textContent||'').split(' - ')[0].trim();
var on=function(){return RS.checked},base=function(){return(+R1.getAttribute('data-product-price')||0)/100},sp=function(){return(+RS.getAttribute('data-product-price')||0)/100};
function pick(sub){var r=sub?RS:R1;if(!r.checked)r.click();if(sub&&q&&+q.value!==1){q.value=1;['input','change'].forEach(function(t){q.dispatchEvent(new Event(t,{bubbles:true}))})}}
function info(){var i=d.getElementById('dn-subi');if(!on()){if(i)i.remove();return}var w=d.getElementById('dn-sel')||d.getElementById('dn-subw');if(!w)return;if(!i){i=d.createElement('div');i.id='dn-subi'}
i.innerHTML='<ul><li>Te lo enviamos solo cada '+freq+' días, con '+dsc+'% OFF en cada envío.</li><li>Se paga con tarjeta de crédito, y el cobro se hace solo antes de cada envío.</li><li>¿La querés dar de baja? <a href="https://wa.me/'+WA+'?text='+encodeURIComponent('Hola! Quiero dar de baja mi suscripción de '+nm)+'" target="_blank" rel="noopener">Escribinos por WhatsApp</a> y la cancelamos.</li></ul>';
if(i.previousElementSibling!==w)w.parentNode.insertBefore(i,w.nextSibling)}
function btn(){var b=d.getElementById('dn-buy');if(!b||b.disabled)return;var s=b.querySelector('span');if(s&&!s.classList.contains('dn-sp'))s.textContent=on()?'SUSCRIBIRME':'COMPRAR AHORA'}
var busy=0;function ensure(){if(busy)return;busy=1;try{var w=d.getElementById('dn-sel');
if(!w){/* producto sin nuestro selector: armamos uno de dos opciones con el mismo diseño */w=d.getElementById('dn-subw');if(!w){w=d.createElement('div');w.id='dn-subw';PO.parentNode.insertBefore(w,PO)}
if(!w.querySelector('button[data-q]')){w.innerHTML='<div id="dn-sel" style="margin:0"><p>Elegí cómo comprarlo</p><button type="button" data-q="1"><span class="r"></span><span class="tx"><b>Compra única</b><small>Un solo envío</small></span><span class="pr"></span></button></div>'}w=d.getElementById('dn-sel')}
var b1=w.querySelector('button[data-q="1"]'),b2=w.querySelector('button[data-q="2"]');
if(b1&&b1.querySelector('.pr'))b1.querySelector('.pr').textContent=$(base());if(b2&&b2.querySelector('.pr'))b2.querySelector('.pr').textContent=$(2*base());
var sb=w.querySelector('button.sb');if(!sb){sb=d.createElement('button');sb.type='button';sb.className='sb';w.appendChild(sb)}
var html='<i>AHORRÁ '+dsc+'%</i><span class="r"></span><span class="tx"><b>Suscripción mensual</b><small>Te llega solo cada '+freq+' días · <em>'+dsc+'% OFF siempre</em></small></span><span class="pr">'+$(sp())+'<small> /envío</small><s>'+$(base())+'</s></span>';if(sb.innerHTML!==html)sb.innerHTML=html;
var s=on();[].forEach.call(w.querySelectorAll('button'),function(x){if(x!==sb&&s&&x.classList.contains('on'))x.classList.remove('on');if(x===sb)x.classList.toggle('on',s);x.setAttribute('aria-checked',x.classList.contains('on'))});
if(w.closest('#dn-subw')&&b1&&!s){b1.classList.add('on')}
B.classList.add('dn-subon');info();btn()}finally{busy=0}}
d.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#dn-sel button');if(!b)return;if(b.classList.contains('sb')){e.stopPropagation();pick(1)}else pick(0);setTimeout(ensure,30);setTimeout(ensure,300)},true);
/* COMPRAR AHORA en modo suscripción: lo resuelve el botón del tema (crea la suscripción) */
d.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#dn-buy');if(!b||!on())return;e.preventDefault();e.stopImmediatePropagation();
var n=[].filter.call(F.querySelectorAll('.js-addtocart.js-prod-submit-form:not(.js-addtocart-placeholder)'),function(x){return x.offsetParent})[0]||F.querySelector('.js-addtocart:not(.js-addtocart-placeholder)');if(n)n.click()},true);
var t=0,mo=new MutationObserver(function(){clearTimeout(t);t=setTimeout(ensure,40)});
var tries=0;(function go(){ensure();var w=d.getElementById('dn-sel');if(w)mo.observe(w,{childList:true,subtree:true,characterData:true});else if(++tries<20)setTimeout(go,250)})();
var bb=d.getElementById('dn-buy');if(bb)new MutationObserver(function(){btn()}).observe(bb,{childList:true,attributes:true,attributeFilter:['disabled']});
/* llegó desde la recomendación: dejar la suscripción elegida */
if(/[?&]suscribir=1/.test(location.search)){pick(1);setTimeout(function(){ensure();var w=d.getElementById('dn-sel');if(w)w.scrollIntoView({behavior:'smooth',block:'center'})},400)}
})();

/* ---------------- B. recomendación por compras repetidas ---------------- */
var LSO=W.LS,cid=LSO&&LSO.customer;
if(!cid||!(B.classList.contains('template-home')||B.classList.contains('template-product')))return;
var K='dnSubH:'+cid;
function counts(cb){var c=get(K);if(c&&Date.now()-c.t<864e5)return cb(c.c);
fetch('/account/',{credentials:'same-origin'}).then(function(r){return r.text()}).then(function(t){var ids=[],m,re=/\/account\/orders\/(\d+)/g;while((m=re.exec(t))&&ids.length<10)if(ids.indexOf(m[1])<0)ids.push(m[1]);
var res={},i=0;(function next(){if(i>=ids.length){put(K,{t:Date.now(),c:res});return cb(res)}
fetch('/account/orders/'+ids[i++],{credentials:'same-origin'}).then(function(r){return r.text()}).then(function(h){var x=new DOMParser().parseFromString(h,'text/html');[].forEach.call(x.querySelectorAll('script,style,header,footer,nav'),function(e){e.remove()});
var s=(x.body&&x.body.textContent||'').replace(/\s+/g,' '),es=(/Estado: (\S+)/.exec(s)||[])[1]||'',pg=(/Pago: (\S+)/.exec(s)||[])[1]||'';
var a=s.indexOf('Producto Precio Cantidad Total'),z=s.indexOf('Costo de envío'),items=a>=0?s.slice(a,z>a?z:a+2000):'';
if(/^pagad/i.test(pg)&&!/^cancelad/i.test(es))CB.forEach(function(c,j){if(c.k.test(items))res[j]=(res[j]||0)+1})}).catch(function(){}).then(next)})()}).catch(function(){})}
function show(j,n){var c=CB[j],here=location.pathname.indexOf(c.u)===0,o=d.createElement('div');o.id='dn-subp';
o.innerHTML='<div class="bx" role="dialog" aria-modal="true" aria-labelledby="dn-subp-t"><button type="button" class="x" aria-label="Cerrar">×</button><span class="tg">PARA VOS</span><h3 id="dn-subp-t">Ya pediste el '+c.n+' '+n+' veces</h3><p>Suscribite y recibilo solo, sin tener que acordarte de pedirlo.</p><ul><li>Te llega cada 30 días</li><li>10% OFF en cada envío</li><li>Lo das de baja cuando quieras, escribiéndonos</li></ul>'+
(here?'<button type="button" class="go">Quiero suscribirme</button>':'<a class="go" href="'+c.u+'?suscribir=1">Ver la suscripción</a>')+'<button type="button" class="no">Ahora no</button></div>';
d.body.appendChild(o);requestAnimationFrame(function(){o.classList.add('in')});put('dnSubP:'+j,Date.now());
var close=function(){o.classList.remove('in');setTimeout(function(){o.remove()},260)};
o.addEventListener('click',function(e){if(e.target===o||e.target.closest('.x,.no'))return close();var g=e.target.closest('button.go');if(g){close();var r=d.getElementById('purchase-option-subscription');if(r&&!r.checked)r.click();var sb=d.querySelector('#dn-sel button.sb');if(sb){sb.click();sb.scrollIntoView({behavior:'smooth',block:'center'})}}});
d.addEventListener('keydown',function k(e){if(e.key==='Escape'){close();d.removeEventListener('keydown',k)}})}
setTimeout(function(){counts(function(r){var best=-1,bn=0;Object.keys(r||{}).forEach(function(j){var last=+get('dnSubP:'+j)||0;if(r[j]>=NEED&&Date.now()-last>DAYS*864e5&&r[j]>bn){best=+j;bn=r[j]}});
if(best<0||d.getElementById('dn-subp')||d.querySelector('#dn-shs,[role=dialog][aria-modal=true]'))return;var rs=d.getElementById('purchase-option-subscription');if(rs&&rs.checked)return;show(best,bn)})},2500);
}();
