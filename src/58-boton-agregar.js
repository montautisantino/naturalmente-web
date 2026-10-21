/* Tarjetas de producto: el botón dice "Agregar al carrito" (es lo que hace: suma al carrito, no compra).
   En una sola línea; en tarjetas angostas se achica la letra y, si igual no entra, dice "Agregar".
   El tema le vuelve a poner "Comprar" después de agregar, así que se corrige cada vez.
   Al agregar desde una tarjeta no se abre el carrito: aparece el aviso de agregado y se sigue comprando. */
!function(){var d=document,W=window;if(W.__dnAgr)return;W.__dnAgr=1;
var TX='Agregar al carrito',SH='Agregar',SEL='.js-item-product .js-addtocart:not(.js-addtocart-placeholder)';
var st=d.createElement('style');st.textContent=SEL+'{white-space:nowrap!important;padding-left:4px!important;padding-right:4px!important}@media(max-width:767px){'+SEL+'{font-size:11px!important;letter-spacing:0!important}}';d.head.appendChild(st);
function set(b,t){if(b.tagName==='INPUT'){b.value=t;b.setAttribute('alt',t)}else b.textContent=t}
function fix(){[].forEach.call(d.querySelectorAll(SEL),function(b){var v=b.tagName==='INPUT'?b.value:(b.children.length?'':b.textContent);if(!/^\s*comprar\s*$/i.test(v))return;set(b,TX);if(b.offsetParent&&b.scrollWidth>b.clientWidth+1){b.style.setProperty('font-size','10px','important');b.style.setProperty('padding-left','2px','important');b.style.setProperty('padding-right','2px','important');if(b.scrollWidth>b.clientWidth+1){b.style.removeProperty('font-size');set(b,SH)}}})}
fix();var q=0;function soon(){if(q)return;q=setTimeout(function(){q=0;fix()},120)}
if(W.MutationObserver)new MutationObserver(soon).observe(d.body,{childList:true,subtree:true});
/* desde una tarjeta se sigue comprando: en vez de abrir el carrito, el tema muestra su aviso de "agregado" (con acceso al carrito).
   El botón de la ficha de producto sigue abriendo el carrito. */
var MC=d.getElementById('modal-cart'),OT=MC&&MC.getAttribute('data-cart-open-type'),rt=0;
d.addEventListener('click',function(e){if(!(e.target.closest&&e.target.closest(SEL)))return;[800,1600,3000,5000].forEach(function(t){setTimeout(fix,t)});
if(MC&&OT){MC.setAttribute('data-cart-open-type','notification');clearTimeout(rt);rt=setTimeout(function(){MC.setAttribute('data-cart-open-type',OT)},8000)}},true);
addEventListener('load',fix);
/* Ventana "¡Agregado al carrito!" con "Sumá a tu compra":
   - botón "Seguir viendo" que cierra la ventana;
   - cada recomendado con su botón para agregar (si tiene una sola variante y stock) o "Ver producto". */
var RN=d.getElementById('related-products-notification');
if(RN){var cs=d.createElement('style');cs.textContent=
'#related-products-notification .dn-seg{display:block;width:100%;margin-top:10px;min-height:46px;border:0;border-radius:999px;background:#eef3e8;color:#1d4a2a;font:800 14px/1 Archivo,Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;cursor:pointer}'+
'#related-products-notification .swiper-slide{height:auto!important;display:flex}#related-products-notification .swiper-slide>.js-item-product,#related-products-notification .js-item-product{display:flex;flex-direction:column}#related-products-notification .js-item-product .js-item-container{display:flex;flex-direction:column;flex:1}#related-products-notification .js-item-product .item-description{min-height:0!important}'+
'#related-products-notification .dn-rpa{display:flex;align-items:center;justify-content:center;width:100%;margin-top:auto;height:38px;border:0;border-radius:999px;background:#1d4a2a;color:#fff!important;font:800 12px/1 Archivo,Arial,sans-serif;letter-spacing:.02em;text-transform:uppercase;text-decoration:none!important;cursor:pointer;white-space:nowrap}#related-products-notification .dn-rpa.v{background:#fff;color:#1d4a2a!important;border:1.5px solid #1d4a2a}#related-products-notification .dn-rpa.ok{background:#3f7d3a}#related-products-notification .dn-rpa[disabled]{opacity:.7}'+
'#related-products-notification .dn-rpw{padding:8px 10px 10px;margin-top:auto}';d.head.appendChild(cs);
var deco=function(){if(!RN.classList.contains('modal-show'))return;
var vc=[].filter.call(RN.querySelectorAll('a,button'),function(a){return/ver carrito/i.test(a.textContent)})[0];
if(vc&&!RN.querySelector('.dn-seg')){var sb=d.createElement('button');sb.type='button';sb.className='dn-seg';sb.textContent='Seguir viendo';vc.parentNode.insertBefore(sb,vc.nextSibling);sb.addEventListener('click',function(e){e.preventDefault();var x=RN.querySelector('.js-modal-close.modal-close')||RN.querySelector('.js-modal-close');if(x)x.click();else{RN.classList.remove('modal-show');var o=d.querySelector('.js-modal-overlay[data-modal-id="#related-products-notification"]');if(o)o.style.display='none';d.body.classList.remove('overflow-none')}})}
var its=[].slice.call(RN.querySelectorAll('.js-item-product[data-product-id]')).filter(function(x){return!x.querySelector('.dn-rpw')});if(!its.length)return;
var ids=its.map(function(x){return x.getAttribute('data-product-id')});
var put=function(C){its.forEach(function(x){if(x.querySelector('.dn-rpw'))return;var id=x.getAttribute('data-product-id'),c=C&&C[id],a=x.querySelector('a[href*="/productos/"]'),w=d.createElement('div');w.className='dn-rpw';
var hr=a?a.getAttribute('href'):'#';if(!c||c.ok){w.innerHTML='<button type="button" class="dn-rpa" data-id="'+id+'"'+(c?'':' data-chk="'+hr.replace(/"/g,'')+'"')+'>Agregar</button>'}else{w.innerHTML='<a class="dn-rpa v" href="'+hr+'">Ver producto</a>'}
(x.querySelector('.js-item-container')||x).appendChild(w)})};
if(W.__dnCat)W.__dnCat(ids).then(put).catch(function(){put(null)});else put(null)};
RN.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('button.dn-rpa[data-id]');if(!b)return;e.preventDefault();e.stopPropagation();if(b.disabled||b.classList.contains('ok'))return;b.disabled=true;b.textContent='Agregando…';
var id=b.getAttribute('data-id'),chk=b.getAttribute('data-chk');
var go=function(){W.__dnAddId(id,function(){[].forEach.call(RN.querySelectorAll('button.dn-rpa[data-id="'+id+'"]'),function(o){o.disabled=false;o.classList.add('ok');o.textContent='✓ Agregado'})},function(){b.disabled=false;b.textContent='Agregar'})};
/* si no se sabe si tiene variantes, se mira la ficha: con una sola variante y stock se agrega; si no, se va a la ficha a elegir */
if(!chk)return go();fetch(chk,{credentials:'same-origin'}).then(function(r){return r.text()}).then(function(h){var v=null;try{var e=new DOMParser().parseFromString(h,'text/html').querySelector('#single-product[data-variants],#single-product [data-variants]');v=JSON.parse(e.getAttribute('data-variants'))}catch(x){}
if(v&&v.length===1&&v[0].available!==false)go();else location.href=chk}).catch(function(){location.href=chk})},true);
var dq=0;new MutationObserver(function(){clearTimeout(dq);dq=setTimeout(deco,150)}).observe(RN,{attributes:true,attributeFilter:['class'],childList:true,subtree:true})}
}();
