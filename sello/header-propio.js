/* Header propio de Dietéticas Naturalmente.
   Va en el sello de Tiendanube (es crítico para vender: carrito, menú, buscador).
   No crea controles nuevos: reubica los del header de Tiendanube dentro de un diseño propio,
   así el carrito, el menú y el buscador siguen funcionando igual. Si este código falla,
   el header original queda intacto (todo el CSS depende de la clase .dnh). */
(function(){var d=document;function go(){try{
var H=d.querySelector('header.js-head-main');if(!H||H.classList.contains('dnh'))return;
var ham=H.querySelector('a[data-toggle="#nav-hamburger"]'),logo=H.querySelector('#logo'),cart=H.querySelector('#ajax-cart'),
SF=function(){var f=d.createElement('form');f.className='dnf';f.action='/search/';f.method='get';f.setAttribute('role','search');f.innerHTML='<span class="dnf-l">'+SV(I.srch,18)+'</span><input class="dnf-i js-search-input" type="search" name="q" autocomplete="off" enterkeyhint="search" placeholder="¿Qué estás buscando?" aria-label="Buscar productos"><button class="dnf-b" type="submit" aria-label="Buscar">'+SV(I.srch,18)+'</button>';return f};
if(!ham||!logo||!cart)return;
var B=d.body,c=B.className,P=location.pathname,
home=/\btemplate-home\b/.test(c),media=!!d.querySelector('.dn-media'),shop=/\btemplate-(category|search|product)\b/.test(c),tienda=/^\/productos\/?(page\/\d+\/?)?$/.test(P),
mob=matchMedia('(max-width:767px)').matches;
var SV=function(p,s){return'<svg viewBox="0 0 24 24" width="'+(s||20)+'" height="'+(s||20)+'" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>'};
var I={menu:'<path d="M4 7h16M4 12h11M4 17h16"/>',play:'<circle cx="12" cy="12" r="9.5"/><path d="M10 8.5l5.5 3.5-5.5 3.5z" fill="currentColor"/>',bag:'<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',home:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',cart:'<path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2"/><circle cx="9.5" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/>',srch:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'};
var css='header.dnh{background:rgba(255,255,255,.97)!important;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-bottom:1px solid rgba(29,74,42,.08);box-shadow:none;transition:box-shadow .25s}header.dnh.sc{box-shadow:0 8px 24px rgba(16,40,26,.12)}'+
'header.dnh>.head-logo-row,header.dnh>.js-big-search-mobile{display:none!important}header.dnh #dn-hmed,header.dnh #dn-hvid,header.dnh #dn-htie,header.dnh #dn-hback{display:none!important}'+
'header.dnh{display:block!important}#dnh{box-sizing:border-box;width:100%;flex:1 1 100%;padding:10px 12px 0;max-width:1240px;margin:0 auto}#dnh .r1{display:flex;align-items:center;gap:6px;height:46px}'+
'#dnh .mb{flex:0 0 44px;height:44px;border-radius:13px;background:#1d4a2a;color:#fff;display:flex;align-items:center;justify-content:center;border:0;cursor:pointer;box-shadow:0 6px 14px rgba(29,74,42,.25);transition:transform .15s}#dnh .mb:active{transform:scale(.94)}#dnh .mb svg{color:#f4c95d}'+
'#dnh #logo{flex:0 0 auto;width:auto!important;margin:0 0 0 2px!important;padding:0!important}#dnh #logo img{height:36px!important;width:auto!important;max-height:36px}#dnh #logo a{display:block}'+
'#dnh .sp{flex:1}#dnh .pl{display:inline-flex;align-items:center;gap:5px;height:44px;padding:0 11px;border-radius:13px;font:800 12.5px/1 Archivo,Arial,sans-serif;letter-spacing:.03em;text-decoration:none!important;white-space:nowrap;transition:transform .15s}#dnh .pl:active{transform:scale(.95)}'+
'#dnh .pl.md{background:#1d4a2a;color:#fff!important}#dnh .pl.md svg{color:#f4c95d}#dnh .pl.sh{background:linear-gradient(135deg,#fbe3a0,#f4c95d 45%,#e0a326);color:#10281a!important;box-shadow:0 4px 10px rgba(224,163,38,.28)}#dnh .pl.hm{background:#fff;border:1.5px solid #e0a326;color:#1d4a2a!important}'+
'#dnh .ic{flex:0 0 44px;height:44px;border-radius:13px;background:#fff;border:1px solid #dbe3d4;color:#1d4a2a!important;display:flex;align-items:center;justify-content:center;text-decoration:none!important}'+
'#dnh #ajax-cart{flex:0 0 44px;position:relative}#dnh #ajax-cart>a{width:44px;height:44px;padding:0!important;border-radius:13px;background:#1d4a2a!important;color:#fff!important;display:flex!important;align-items:center;justify-content:center}#dnh #ajax-cart>a svg{width:20px;height:20px;fill:currentColor}#dnh #ajax-cart .js-cart-widget-amount{position:absolute!important;top:-5px!important;right:-5px!important;left:auto!important;min-width:20px;height:20px;line-height:20px!important;padding:0 5px!important;border-radius:10px!important;background:#e0a326!important;color:#10281a!important;font:900 11px/20px Arial,sans-serif!important;border:2px solid #fbf8f1;transition:transform .3s}#dnh #ajax-cart .bump{animation:dnhBump .5s ease}@keyframes dnhBump{40%{transform:scale(1.45)}}'+
'#dnh .r2{overflow:visible;max-height:70px;padding:8px 0 10px;transition:max-height .3s ease,padding .3s ease,opacity .25s}header.dnh.hd #dnh .r2{max-height:0;padding:0;opacity:0;overflow:hidden}'+
'#dnh .dnf{position:relative;display:block;width:100%;margin:0;padding:0}#dnh .dnf-i{-webkit-appearance:none;appearance:none;box-sizing:border-box;display:block;width:100%;height:46px;margin:0;border-radius:13px;border:1.5px solid #dbe3d4;background:#fff;padding:0 52px 0 44px;font:500 16px/46px Archivo,Arial,sans-serif;color:#16261b;outline:0;box-shadow:0 4px 14px rgba(29,74,42,.06)}#dnh .dnf-i::-webkit-search-decoration,#dnh .dnf-i::-webkit-search-cancel-button{-webkit-appearance:none;display:none}#dnh .dnf-i::placeholder{color:#7a8a76;opacity:1}#dnh .dnf-i:focus{border-color:#3f7d3a;box-shadow:0 0 0 4px rgba(63,125,58,.12)}#dnh .dnf-l{position:absolute;left:15px;top:50%;transform:translateY(-50%);color:#7a8a76;pointer-events:none;display:flex}#dnh .dnf-b{position:absolute;right:5px;top:5px;width:36px;height:36px;margin:0;padding:0;border:0;border-radius:10px;background:#1d4a2a;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer}'+
'#dnh .r1.two .pl svg{display:none}#dnh .r1.two .pl{padding:0 12px}'+
'@media(max-width:360px){#dnh .pl{padding:0 9px;font-size:11.5px}#dnh .pl span{display:none}}'+
'@media(min-width:768px){#dnh{padding:12px 24px}#dnh .r1{height:56px;gap:12px}#dnh #logo img{height:48px!important;max-height:48px}#dnh .r2{display:none}#dnh .dsk{flex:1;max-width:560px;margin:0 8px}#dnh .dsk form{width:100%}#dnh .pl{height:40px;padding:0 15px;font-size:13.5px}#dnh .ic,#dnh #ajax-cart,#dnh #ajax-cart>a{width:46px!important;height:46px!important;flex-basis:46px}}'+
'@media(min-width:768px){header.dnh .js-menu-and-banners-row{border-top:1px solid rgba(29,74,42,.07)}}';
var st=d.createElement('style');st.id='dnh-css';st.textContent=css;d.head.appendChild(st);
/* armado */
var W=d.createElement('div');W.id='dnh';W.innerHTML='<div class="r1"></div><div class="r2"></div>';var r1=W.firstChild,r2=W.lastChild;
var mb=d.createElement('button');mb.type='button';mb.className='mb';mb.setAttribute('aria-label','Abrir menú');mb.innerHTML=SV(I.menu,22);mb.addEventListener('click',function(e){e.preventDefault();ham.click()});r1.appendChild(mb);
r1.appendChild(logo);
var dk=d.createElement('div');dk.className='dsk';if(!mob)dk.appendChild(SF());r1.appendChild(dk);
var sp=d.createElement('span');sp.className='sp';r1.appendChild(sp);
function pill(cls,h,ic,t,on){var a=d.createElement('a');a.className='pl '+cls+(on?' on':'');a.href=h;a.innerHTML=SV(I[ic],15)+'<span>'+t+'</span>';r1.appendChild(a)}
if(media)pill('hm','/','home','Inicio');
else if(!home){pill('md','/naturalmente-media/','play','Media');pill('sh','/productos/','bag','Tienda',tienda);r1.classList.add('two')}
var lg=window.LS&&LS.customer;var ac=d.createElement('a');ac.className='ic ac';ac.href=lg?'/account/':'/account/login/';ac.setAttribute('aria-label','Mi cuenta');ac.innerHTML=SV(I.user,20);if(!mob||home)r1.appendChild(ac);
r1.appendChild(cart);
if(mob&&!media)r2.appendChild(SF());else r2.remove();
H.insertBefore(W,H.firstChild);H.classList.add('dnh');
/* contador con animación */
var ct=cart.querySelector('.js-cart-widget-amount');if(ct&&window.MutationObserver){var last=ct.textContent;new MutationObserver(function(){if(ct.textContent!==last){last=ct.textContent;ct.classList.remove('bump');void ct.offsetWidth;ct.classList.add('bump')}}).observe(ct,{childList:true,characterData:true,subtree:true})}
/* sombra al bajar y buscador que se esconde al bajar y vuelve al subir (celular) */
var y0=scrollY,lt=0;window.addEventListener('scroll',function(){var n=Date.now();if(n-lt<50)return;lt=n;var y=scrollY;H.classList.toggle('sc',y>8);if(mob&&!home){if(y>160&&y>y0+6)H.classList.add('hd');else if(y<y0-6||y<160)H.classList.remove('hd')}y0=y},{passive:true});
}catch(e){}}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',go);else go();})();
