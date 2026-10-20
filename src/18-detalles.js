!function(){var d=document;if(window.__dnDet)return;window.__dnDet=1;
var st=d.createElement('style');st.id='dn-det-css';st.textContent=
/* migas de pan */
'.breadcrumbs{display:flex!important;align-items:center;gap:2px;flex-wrap:nowrap;overflow-x:auto;white-space:nowrap;scrollbar-width:none;font-size:12.5px!important;margin:0 0 10px!important;padding:2px 0}.breadcrumbs::-webkit-scrollbar{display:none}'+
'.breadcrumbs .crumb{display:inline-flex;align-items:center;gap:5px;padding:5px 11px;border-radius:999px;background:#eef3e8;color:#2f6a35!important;font-weight:700;text-decoration:none!important;transition:background .15s}.breadcrumbs a.crumb:hover{background:#dfeacf}'+
'.breadcrumbs .crumb.active{background:none;color:#1d4a2a!important;font-weight:800;padding-left:4px;max-width:230px;overflow:hidden;text-overflow:ellipsis;display:inline-block}'+
'.breadcrumbs .separator{font-size:0!important;width:14px;height:14px;flex:0 0 14px;margin:0 1px;background:no-repeat center/12px url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Cpath d=%27M9 6l6 6-6 6%27 fill=%27none%27 stroke=%27%239aa596%27 stroke-width=%272.6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E")}'+
'.breadcrumbs .dn-hm{width:13px;height:13px}'+
/* botón comprar con respuesta */
'.js-item-product input.js-addtocart.dn-ok,.js-item-product .btn.dn-ok{background:#1e9a4c!important;color:#fff!important;transform:scale(1.03)}.js-item-product input.js-addtocart{transition:background .25s,transform .2s}'+
/* fondo mientras cargan las imágenes */
'.js-item-image-padding,.product-item-image-container,.js-product-slide,.product-detail-slider .swiper-slide{background-color:#f4f1e4}';
d.head.appendChild(st);
/* migas: inicio con ícono y nombres con mayúscula/tilde */
var FX={'suplementos':'Suplementos','Herboristeria':'Herboristería','Diabetico':'Diabético','Dieteticos':'Dietéticos','Celiaco':'Celíaco','Te en saquitos':'Té en saquitos','Cosmetica natural':'Cosmética natural'};
[].forEach.call(d.querySelectorAll('.breadcrumbs .crumb'),function(c,i){var t=c.textContent.trim();if(FX[t])c.textContent=FX[t];if(i===0&&c.tagName==='A'&&!c.querySelector('svg'))c.innerHTML='<svg class="dn-hm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg>'+c.textContent});
/* comprar → ✓ Agregado (solo cuando el carrito realmente sumó) */
var badge=function(){var b=d.querySelector('.js-cart-widget-amount');return b?parseInt(b.textContent,10)||0:null},last=null,t0=0,before=null;
d.addEventListener('click',function(e){var b=e.target.closest('.js-item-product input.js-addtocart');if(!b||b.classList.contains('js-quickshop-modal-open'))return;last=b;t0=Date.now();before=badge()},true);
var bw=d.querySelector('.js-cart-widget-amount');if(bw&&window.MutationObserver)new MutationObserver(function(){var n=badge();if(!last||Date.now()-t0>6000||before===null||n===null||n<=before)return;var b=last;last=null;if(!b.getAttribute('data-dn-v'))b.setAttribute('data-dn-v',b.value);b.value='✓ Agregado';b.classList.add('dn-ok');setTimeout(function(){b.value=b.getAttribute('data-dn-v');b.classList.remove('dn-ok')},2200)}).observe(bw,{childList:true,characterData:true,subtree:true});
/* precarga de la ficha al tocar o pasar el mouse */
var c=navigator.connection;if(!(c&&(c.saveData||/2g/.test(c.effectiveType||'')))){var seen={},n=0;var pf=function(e){var a=e.target.closest&&e.target.closest('a[href*="/productos/"]');if(!a||n>=20)return;var u=a.href.split('#')[0];if(seen[u]||a.origin!==location.origin)return;seen[u]=1;n++;var l=d.createElement('link');l.rel='prefetch';l.href=u;d.head.appendChild(l)};d.addEventListener('touchstart',pf,{passive:true});d.addEventListener('mouseover',pf)}
}();
