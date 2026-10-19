!function(){var d=document,m=d.getElementById('related-products-notification');if(!m)return;
function add(){if(m.querySelector('#dn-fin'))return;var vc=[].find.call(m.querySelectorAll('a'),function(a){return/ver carrito/i.test(a.textContent)});if(!vc)return;
var b=d.createElement('button');b.type='button';b.id='dn-fin';b.textContent='FINALIZAR COMPRA →';
b.style.cssText='display:block;width:100%;min-height:56px;border:0;border-radius:14px;background:linear-gradient(135deg,#f4c95d 0%,#e0a326 55%,#c98a35 100%);color:#10281a;font-size:17px;font-weight:900;letter-spacing:.06em;box-shadow:0 10px 22px rgba(201,138,53,.35);margin:0 0 12px;cursor:pointer';
b.onclick=function(){if(b.disabled)return;b.disabled=!0;b.textContent='PROCESANDO…';var g=d.querySelector('#ajax-cart-submit-div [name=go_to_checkout]');g?g.click():location.href='/comprar/'};
vc.parentNode.insertBefore(b,vc)}
add();new MutationObserver(add).observe(m,{childList:!0,subtree:!0,attributes:!0,attributeFilter:['class']})}();
