/* Ficha de producto: más confianza y compra más fácil.
   - Cuotas sin interés y "Pago seguro" debajo del precio. Las cuotas salen de lo que la tienda tiene configurado
     de verdad (installments_info de la página): si hoy no hay cuotas sin interés, solo se muestra "Pago seguro".
   - Contador de ventas reales del producto (pedidos pagados desde que existe; datos en contenido/ventas.json).
   - Barra de compra fija abajo cuando el botón de compra queda fuera de la pantalla.
   - Bloque "Hablá con un asesor" por WhatsApp con el producto ya escrito. */
!function(){var d=document,W=window,B=d.body;if(W.__dnFC||!B.classList.contains('template-product'))return;var SP=d.getElementById('single-product');if(!SP)return;W.__dnFC=1;
var WA='5491141816107';
/* máximo de cuotas SIN interés que ofrece realmente algún medio de pago (0 si no hay) */
var CU=(function(){var t=d.documentElement.innerHTML,i=t.indexOf('installments_info":');if(i<0)return 0;var s=t.slice(i+19),k=0,j=0;for(;j<s.length;j++){if(s[j]==='{')k++;else if(s[j]==='}'){k--;if(!k)break}}
try{var o=JSON.parse(s.slice(0,j+1)),m=0;Object.keys(o).forEach(function(p){Object.keys(o[p]||{}).forEach(function(n){if(o[p][n]&&o[p][n].without_interests&&+n>m)m=+n})});return m>1?m:0}catch(e){return 0}})();
var F=SP.querySelector('form.js-product-form'),PD=d.getElementById('price_display');
var name=((SP.querySelector('h1')||{}).textContent||'').split(' - ')[0].trim();
var num=function(t){return parseFloat(String(t||'').replace(/[^\d,]/g,'').replace(',','.'))||0},$=function(n){return'$'+Math.round(n).toLocaleString('es-AR')};
var IC={card:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/></svg>',
lock:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>',
fire:'<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12.6 2.4c.4 2.6-.6 4.3-2 5.9-1.3 1.5-2.9 3-2.9 5.6a4.3 4.3 0 0 0 8.6.3c0-1.4-.6-2.4-1.2-3.4 1.8.6 3.4 2.4 3.4 5.1A6.5 6.5 0 0 1 12 22a6.5 6.5 0 0 1-6.5-6.5c0-3.9 2.4-6.2 4.2-8 1.4-1.4 2.6-2.8 2.9-5.1z"/></svg>',
wa:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.5c.1.2 1.6 2.5 4 3.5 1.5.6 2.1.7 2.8.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.2z"/></svg>'};
var st=d.createElement('style');st.textContent=
'#dn-cuo{display:flex;flex-wrap:wrap;align-items:center;gap:6px 14px;margin:-6px 0 12px;font-size:13.5px;line-height:1.3;color:#16261b}#dn-cuo span{display:inline-flex;align-items:center;gap:6px}#dn-cuo svg{color:#1d4a2a;flex:0 0 auto}#dn-cuo b{font-weight:800}#dn-cuo .ps{color:#53624f}'+
'#dn-vtas{display:inline-flex;align-items:center;gap:6px;margin:0 0 10px;padding:5px 11px;border-radius:999px;background:#fbf0d4;color:#15301f;font-size:13px;font-weight:800;line-height:1.2}#dn-vtas svg{color:#c98a1a}'+
'#dn-fbar{position:fixed;left:0;right:0;bottom:0;z-index:9990;background:#fbf8f1;border-top:1px solid rgba(22,38,27,.1);box-shadow:0 -6px 18px -8px rgba(16,40,26,.25);padding:10px 16px calc(10px + env(safe-area-inset-bottom));transform:translateY(110%);transition:transform .28s cubic-bezier(.2,.8,.2,1)}#dn-fbar.on{transform:none}'+
'#dn-fbar .in{display:flex;align-items:center;gap:12px;max-width:1116px;margin:0 auto}#dn-fbar img{flex:0 0 44px;width:44px;height:44px;border-radius:12px;object-fit:cover;background:#fff}#dn-fbar .tx{flex:1;min-width:0}#dn-fbar .n{display:block;font-size:12.5px;font-weight:700;color:#53624f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#dn-fbar .p{display:block;font:900 18px/1.15 Archivo,Arial,sans-serif;color:#15301f}#dn-fbar .c{display:block;font-size:12px;color:#1d4a2a;font-weight:700}'+
'#dn-fbar button{flex:0 0 auto;min-height:48px;padding:0 20px;border:0;border-radius:12px;background:#f0c04f;color:#15301f;font:900 15px/1 Archivo,Arial,sans-serif;letter-spacing:.06em;cursor:pointer;transition:transform .15s}#dn-fbar button:active{transform:scale(.97)}'+
'body.dn-fbon .grecaptcha-badge{bottom:96px!important}'+
'#dn-ase{margin:24px auto;max-width:1116px;padding:22px 18px;border-radius:18px;background:#15301f;color:#fff;display:flex;flex-direction:column;gap:14px}#dn-ase i{display:block;font-style:normal;font-size:12px;font-weight:900;letter-spacing:.08em;color:#f0c04f;margin-bottom:6px}#dn-ase h3{margin:0 0 6px;font:900 22px/1.2 Archivo,Arial,sans-serif;color:#fff}#dn-ase p{margin:0;font-size:14.5px;line-height:1.45;color:#d6e3d2}'+
'#dn-ase a{align-self:flex-start;display:inline-flex;align-items:center;gap:8px;min-height:50px;padding:0 20px;border-radius:12px;background:#25d366;color:#0b2414!important;font:800 15px/1 Archivo,Arial,sans-serif;text-decoration:none!important}'+
'@media(min-width:768px){#dn-ase{flex-direction:row;align-items:center;justify-content:space-between;padding:26px 30px}#dn-ase a{align-self:center}#dn-fbar .p{font-size:20px}}'+
'@media(prefers-reduced-motion:reduce){#dn-fbar{transition:none}}';
d.head.appendChild(st);
var price=function(){return num(PD&&PD.textContent)};

/* --- cuotas y pago seguro --- */
var pc=PD&&PD.closest('.js-price-container');
function cuo(){if(!pc)return;var p=price(),e=d.getElementById('dn-cuo');if(!p){if(e)e.remove();return}if(!e){e=d.createElement('div');e.id='dn-cuo';pc.parentNode.insertBefore(e,pc.nextSibling)}
var h=(CU?'<span>'+IC.card+'<b>'+CU+' cuotas sin interés</b> de '+$(p/CU)+'</span>':'')+'<span class="ps">'+IC.lock+'Pago seguro</span>';if(e.innerHTML!==h)e.innerHTML=h}
if(PD){cuo();new MutationObserver(function(){cuo();bar()}).observe(PD,{childList:true,characterData:true,subtree:true})}

/* --- contador de ventas --- */
var sc=d.querySelector('script[src*="/dist/dn-producto.min.js"]'),BASE=sc?sc.src.replace(/dist\/dn-producto\.min\.js.*$/,''):'';
var hd=(location.pathname.match(/\/productos\/([^\/]+)/)||[])[1];
function shown(n){return n>=1000?Math.floor(n/100)*100:n>=100?Math.floor(n/10)*10:n>=20?Math.floor(n/5)*5:n}
if(BASE&&hd)fetch(BASE+'contenido/ventas.json').then(function(r){return r.json()}).then(function(V){var n=+(V.v||V)[hd]||0;if(n<10||d.getElementById('dn-vtas'))return;
var e=d.createElement('div');e.id='dn-vtas';e.innerHTML=IC.fire+'<span>+'+shown(n).toLocaleString('es-AR')+' vendidos</span>';var h1=SP.querySelector('h1');var at=pc||(h1&&h1.parentNode);if(at)at.parentNode.insertBefore(e,at)}).catch(function(){});

/* --- barra de compra fija --- */
var BUY=function(){return d.getElementById('dn-buy')||[].filter.call(F?F.querySelectorAll('.js-addtocart:not(.js-addtocart-placeholder)'):[],function(x){return x.offsetParent})[0]};
var img=(SP.querySelector('.js-product-slide-img, .product-slider-image, img')||{}).currentSrc||(SP.querySelector('img')||{}).src||'';
var fb=d.createElement('div');fb.id='dn-fbar';fb.setAttribute('aria-hidden','true');
fb.innerHTML='<div class="in">'+(img?'<img alt="" src="'+img+'">':'')+'<span class="tx"><span class="n"></span><span class="p"></span><span class="c"></span></span><button type="button">COMPRAR</button></div>';
fb.querySelector('.n').textContent=name;d.body.appendChild(fb);
function bar(){var p=price();fb.querySelector('.p').textContent=p?$(p):'';fb.querySelector('.c').textContent=p?(CU?CU+' cuotas sin interés de '+$(p/CU):'Pago seguro'):''}bar();
fb.querySelector('button').addEventListener('click',function(){var b=BUY();if(!b||b.disabled||/sin stock|no disponible/i.test(b.textContent||b.value||'')){var t=d.getElementById('dn-sel')||F;if(t)t.scrollIntoView({behavior:'smooth',block:'center'});return}
/* si hay variantes para elegir, mejor que las vea antes de comprar */
if(F&&F.querySelector('.js-product-variants select, .js-product-variants .btn-variant')&&!d.getElementById('dn-sel')){F.scrollIntoView({behavior:'smooth',block:'center'});return}b.click()});
var vis=1,ok=function(){var b=BUY();return!!(b&&!b.disabled&&!/sin stock|no disponible/i.test(b.textContent||b.value||''))};
function upd(){var b=BUY();if(!b){fb.classList.remove('on');B.classList.remove('dn-fbon');return}var r=b.getBoundingClientRect(),past=r.bottom<0,ft=d.querySelector('footer'),fr=ft&&ft.getBoundingClientRect(),atEnd=fr&&fr.top<innerHeight-40;
var on=past&&!atEnd&&ok()&&!d.querySelector('#dn-shs,#dn-subp,.modal.show,[role=dialog][aria-modal=true]');fb.classList.toggle('on',on);fb.setAttribute('aria-hidden',on?'false':'true');B.classList.toggle('dn-fbon',on)}
var tk=0;addEventListener('scroll',function(){if(!tk){tk=1;requestAnimationFrame(function(){tk=0;upd()})}},{passive:true,capture:true});addEventListener('resize',upd);setInterval(upd,1500);upd();

/* --- hablá con un asesor --- */
var as=d.createElement('section');as.id='dn-ase';
as.innerHTML='<div><i>ASESORAMIENTO</i><h3>¿Tenés dudas? Hablá con un asesor</h3><p>Te ayudamos a elegir y te explicamos cómo se usa. Escribinos por WhatsApp.</p></div><a href="https://wa.me/'+WA+'?text='+encodeURIComponent('Hola! Quiero hacer una consulta sobre '+name+' '+location.origin+location.pathname)+'" target="_blank" rel="noopener">'+IC.wa+'Hablar con un asesor</a>';
var lp=SP.querySelector('.dn-lp')||d.querySelector('.dn-lp'),ds=SP.querySelector('[data-store="product-description"], .user-content, .product-description');
var ref=lp||ds;if(ref&&ref.parentNode){ref.parentNode.insertBefore(as,ref.nextSibling)}else{var c=SP.querySelector('.container');if(c)c.appendChild(as)}
}();
