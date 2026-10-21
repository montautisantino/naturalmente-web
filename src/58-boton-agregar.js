/* Tarjetas de producto: el botón dice "Agregar al carrito" (es lo que hace: suma al carrito, no compra).
   En una sola línea; si en alguna tarjeta muy angosta no entra, dice "Agregar".
   El tema le vuelve a poner "Comprar" después de agregar, así que se corrige cada vez. */
!function(){var d=document,W=window;if(W.__dnAgr)return;W.__dnAgr=1;
var TX='Agregar al carrito',SH='Agregar',SEL='.js-item-product .js-addtocart:not(.js-addtocart-placeholder)';
var st=d.createElement('style');st.textContent=SEL+'{white-space:nowrap!important;padding-left:4px!important;padding-right:4px!important}@media(max-width:767px){'+SEL+'{font-size:11px!important;letter-spacing:0!important}}';d.head.appendChild(st);
function set(b,t){if(b.tagName==='INPUT'){b.value=t;b.setAttribute('alt',t)}else b.textContent=t}
function fix(){[].forEach.call(d.querySelectorAll(SEL),function(b){var v=b.tagName==='INPUT'?b.value:(b.children.length?'':b.textContent);if(!/^\s*comprar\s*$/i.test(v))return;set(b,TX);if(b.offsetParent&&b.scrollWidth>b.clientWidth+1)set(b,SH)})}
fix();var q=0;function soon(){if(q)return;q=setTimeout(function(){q=0;fix()},120)}
if(W.MutationObserver)new MutationObserver(soon).observe(d.body,{childList:true,subtree:true});
d.addEventListener('click',function(e){if(e.target.closest&&e.target.closest(SEL))[800,1600,3000,5000].forEach(function(t){setTimeout(fix,t)})},true);
addEventListener('load',fix);
}();
