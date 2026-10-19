/* Ventana para no perder la compra: en Tienda, categorías, búsqueda y productos, si tocan algo que los saca
   de la ruta de compra (cuenta, contacto, sucursales, redes, otros sitios) se pregunta antes de salir.
   No aplica a: inicio, Media y notas, otros productos o categorías, carrito/checkout, WhatsApp, anclas,
   links que abren en otra pestaña ni a los botones del header y la barra fija. */
!function(){var d=document,B=d.body;if(window.__dnExit)return;window.__dnExit=1;
var prod=/\btemplate-product\b/.test(B.className),shop=prod||/\btemplate-(category|search)\b/.test(B.className)||/^\/productos\/?/.test(location.pathname);if(!shop)return;
var OUT=/^\/(account|contacto|quienes-somos|nuestras-sucursales|donde-esta-mi-pedido)(\/|$)/;
function leaves(a){var h=a.getAttribute('href');if(!h||/^(#|javascript:|tel:|mailto:)/i.test(h))return false;if(a.target&&a.target!=='_self')return false;if(a.hasAttribute('download'))return false;
var u;try{u=new URL(h,location.href)}catch(e){return false}if(!/^https?:$/.test(u.protocol))return false;
var host=u.hostname.replace(/^www\./,''),me=location.hostname.replace(/^www\./,'');
if(host!==me)return !/(^|\.)(wa\.me|whatsapp\.com|mercadopago\.com(\.ar)?|mitiendanube\.com|tiendanube\.com)$/.test(host)||/^(www\.)?tiendanube\.com$/.test(u.hostname);
return OUT.test(u.pathname)}
var st=d.createElement('style');st.id='dn-exit-css';st.textContent='#dn-ex2{position:fixed;inset:0;z-index:100005;background:rgba(10,20,14,.72);display:flex;align-items:flex-end;justify-content:center;animation:dnX2f .2s ease}'+
'#dn-ex2 .bx{width:100%;max-width:460px;background:#fbfaf5;border-radius:24px 24px 0 0;padding:22px 18px calc(18px + env(safe-area-inset-bottom));box-shadow:0 -10px 40px rgba(0,0,0,.35);text-align:center;animation:dnX2u .32s cubic-bezier(.2,.8,.2,1)}'+
'#dn-ex2 .ic{width:56px;height:56px;margin:0 auto 12px;border-radius:50%;background:#eef6ea;color:#1d4a2a;display:flex;align-items:center;justify-content:center}#dn-ex2 h3{margin:0 0 6px;font:900 21px/1.2 Archivo,Arial,sans-serif;color:#1d4a2a}#dn-ex2 p{margin:0 0 16px;color:#53624f;font-size:14.5px;line-height:1.4}'+
'#dn-ex2 .st{display:block;width:100%;height:50px;border:0;border-radius:14px;background:#1d4a2a;color:#fff;font:800 16px/1 Archivo,Arial,sans-serif;cursor:pointer}#dn-ex2 .go{display:block;margin:12px auto 0;padding:8px;border:0;background:none;color:#53624f;font-size:14px;font-weight:700;text-decoration:underline;cursor:pointer}'+
'@keyframes dnX2f{from{opacity:0}}@keyframes dnX2u{from{transform:translateY(40px);opacity:0}}@media(min-width:768px){#dn-ex2{align-items:center}#dn-ex2 .bx{border-radius:24px}}';d.head.appendChild(st);
function ask(url){if(d.getElementById('dn-ex2'))return;var n=0,w=d.querySelector('.js-cart-widget-amount');if(w)n=parseInt(w.textContent,10)||0;
var t=prod?'¿Seguro que querés salir?':'¿Seguro que querés abandonar la tienda?',x=n?'Tenés '+n+(n>1?' productos':' producto')+' en el carrito. Te los guardamos por si volvés.':(prod?'Estás a un paso: este producto te espera en el carrito cuando quieras.':'Todavía estás a tiempo de encontrar lo que buscás.');
var o=d.createElement('div');o.id='dn-ex2';o.setAttribute('role','dialog');o.innerHTML='<div class="bx"><div class="ic"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg></div><h3></h3><p></p><button type="button" class="st">Seguir comprando</button><button type="button" class="go">Salir igual</button></div>';
o.querySelector('h3').textContent=t;o.querySelector('p').textContent=x;d.body.appendChild(o);var ov=d.body.style.overflow;d.body.style.overflow='hidden';
var cl=function(){o.remove();d.body.style.overflow=ov};o.addEventListener('click',function(e){if(e.target===o||e.target.closest('.st'))cl();else if(e.target.closest('.go')){cl();location.href=url}})}
d.addEventListener('click',function(e){if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;var a=e.target.closest&&e.target.closest('a[href]');if(!a||a.closest('#dnh .ic,#dnh .mb,#dn-sbar,#dn-ex2'))return;if(!leaves(a))return;e.preventDefault();e.stopPropagation();ask(a.href)},true);
}();
