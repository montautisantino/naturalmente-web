/* Respaldo para comprar siempre, también dentro de los navegadores de WhatsApp/Instagram (ahí el código del tema
   a veces no termina de arrancar y "Agregar al carrito" / "Comprar ahora" fallaban).
   - Agregar: si la función del tema falla, se agrega directo en Tiendanube (la misma tienda, sin pasar por el tema)
     y se lleva a la página del carrito.
   - Carrito del encabezado: si el panel no se abre, se va a la página del carrito. */
!function(){var W=window,d=document;if(W.__dnBuyBk)return;W.__dnBuyBk=1;
function el(f){if(!f)return null;if(f.nodeType===1)return f;if(f[0]&&f[0].nodeType===1)return f[0];try{if(f.get)return f.get(0)}catch(e){}return null}
function direct(form,fail){var body='';
/* el tema pasa su propio objeto (jQueryNuvem): sus datos salen con serialize(); si no, el formulario real */
try{var s=form&&typeof form.serialize==='function'&&form.serialize();if(s&&typeof s!=='string'&&s.append)body=new URLSearchParams(s).toString();else if(typeof s==='string')body=s}catch(e){}
if(!/add_to_cart=/.test(body)){var f=el(form);if(!f||f.tagName!=='FORM')f=d.querySelector('#single-product form.js-product-form');try{body=f?new URLSearchParams(new FormData(f)).toString():''}catch(e){body=''}}
if(!/add_to_cart=/.test(body)){fail&&fail();return}
/* envío como formulario común (navegación), no por fetch: así el navegador de la app guarda bien el carrito */
var fm=d.createElement('form');fm.method='post';fm.action='/comprar/';fm.style.display='none';new URLSearchParams(body).forEach(function(v,k){var i=d.createElement('input');i.type='hidden';i.name=k;i.value=v;fm.appendChild(i)});d.body.appendChild(fm);try{HTMLFormElement.prototype.submit.call(fm)}catch(e){fail&&fail()}}
function wrap(){var L=W.LS;if(!L||typeof L.addToCartEnhanced!=='function'||L.addToCartEnhanced.__dn)return!!(L&&L.addToCartEnhanced&&L.addToCartEnhanced.__dn);
var orig=L.addToCartEnhanced;var w=function(form,a,b,c,e,ok,err){var done=0,args=[].slice.call(arguments);
var fb=function(){if(done)return;done=1;var E=function(){typeof err==='function'&&err.apply(this,arguments)};
/* si el problema es el stock, no se fuerza: el tema avisa que no hay más */
try{var pf=d.querySelector('#single-product form.js-product-form'),vs=JSON.parse((d.querySelector('#single-product [data-variants]')||{}).getAttribute('data-variants')||'[]'),q=+((pf&&pf.querySelector('[name=quantity]'))||{}).value||1;if(vs.length===1&&(vs[0].available===false||(typeof vs[0].stock==='number'&&vs[0].stock<q)))return E()}catch(x){}
direct(form,E)};
args[5]=function(){done=1;return typeof ok==='function'?ok.apply(this,arguments):undefined};
args[6]=function(){fb()};
try{return orig.apply(this,args)}catch(x){fb()}};w.__dn=1;L.addToCartEnhanced=w;return true}
if(!wrap()){var n=0,iv=setInterval(function(){if(wrap()||++n>60)clearInterval(iv)},250)}
/* carrito del encabezado */
d.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-toggle="#modal-cart"]');if(!b)return;setTimeout(function(){var m=d.getElementById('modal-cart');if(!m||!m.classList.contains('modal-show'))location.href='/comprar/'},1000)},true);
}();
