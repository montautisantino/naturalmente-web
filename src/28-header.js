!function(){var d=document,B=d.body,c=B.className;
var shop=/\btemplate-(category|search|product)\b/.test(c),home=/\btemplate-home\b/.test(c);
var BAG='<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';
/* botón Volver a la Tienda (productos; en categorías y búsqueda lo pone el listado) */
var bs=d.createElement('style');bs.textContent='a#dn-bkt{display:inline-flex;align-items:center;gap:6px;height:38px;margin:12px 12px 0;padding:0 14px 0 10px;border-radius:12px;background:linear-gradient(135deg,#fbe3a0,#f4c95d 45%,#e0a326);color:#10281a!important;font:800 13.5px/1 Archivo,Arial,sans-serif;text-decoration:none!important;box-shadow:0 4px 12px rgba(224,163,38,.25)}@media(min-width:768px){a#dn-bkt{margin:14px 0 0 calc(50% - 558px)}}';d.head.appendChild(bs);
if(/\btemplate-product\b/.test(c)&&!d.getElementById('dn-bkt')){var sp=d.getElementById('single-product');if(sp){var bt=d.createElement('a');bt.id='dn-bkt';bt.href='/productos/';bt.innerHTML='<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>Volver a la Tienda';sp.parentNode.insertBefore(bt,sp)}}
var n=0;(function run(){
/* Media: "Volver a la tienda" pasa a "Volver al inicio" */
var bk=d.getElementById('dn-hback');if(bk&&!bk.getAttribute('data-dnh')){bk.setAttribute('data-dnh','1');bk.setAttribute('aria-label','Volver al inicio');bk.href='/';var sp=bk.querySelectorAll('span');if(sp.length)sp[sp.length-1].textContent='Volver al inicio'}
/* Tienda, categorías, búsqueda y productos: el botón Videos se reemplaza por Tienda */
var v=d.getElementById('dn-hvid');
if((shop||home)&&v&&!d.getElementById('dn-htie')){v.style.setProperty('display','none','important');var a=d.createElement('a');a.id='dn-htie';a.href='/productos/';a.setAttribute('aria-label','Ir a la tienda');a.innerHTML=BAG+'Tienda';
a.style.cssText='position:absolute;top:50%;transform:translateY(-50%);right:4px;display:inline-flex;align-items:center;justify-content:center;gap:5px;height:32px;padding:0 12px;border-radius:999px;font-weight:800;font-size:13px;text-decoration:none;white-space:nowrap;color:#10281a;background:linear-gradient(135deg,#fbe3a0,#f4c95d 45%,#e0a326);box-shadow:0 4px 10px rgba(224,163,38,.3)';v.parentNode.insertBefore(a,v)}
if((!v&&(shop||home))||(!bk&&d.querySelector('.dn-media'))){if(++n<40)setTimeout(run,150)}})();
}();
