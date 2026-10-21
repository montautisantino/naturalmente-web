/* Respaldo para comprar siempre, también dentro de los navegadores de WhatsApp/Instagram (ahí el código del tema
   a veces no termina de arrancar y "Agregar al carrito" / "Comprar ahora" fallaban).
   - Agregar: si la función del tema falla, se agrega directo en Tiendanube (la misma tienda, sin pasar por el tema)
     y se lleva a la página del carrito.
   - Carrito del encabezado: si el panel no se abre, se va a la página del carrito. */
!function(){var W=window,d=document;if(W.__dnBuyBk)return;W.__dnBuyBk=1;
function el(f){if(!f)return null;if(f.nodeType===1)return f;if(f[0]&&f[0].nodeType===1)return f[0];try{if(f.get)return f.get(0)}catch(e){}return null}
function direct(form,fail){var f=el(form);if(!f){fail&&fail();return}var body;try{body=new URLSearchParams(new FormData(f)).toString()}catch(e){fail&&fail();return}
if(!/add_to_cart=/.test(body)){fail&&fail();return}
fetch('/comprar/',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-Requested-With':'XMLHttpRequest','Accept':'application/json'},body:body}).then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(t){var j=null;try{j=JSON.parse(t)}catch(e){}if(j&&j.success===false)throw 0;location.href='/comprar/'}).catch(function(){fail&&fail()})}
function wrap(){var L=W.LS;if(!L||typeof L.addToCartEnhanced!=='function'||L.addToCartEnhanced.__dn)return!!(L&&L.addToCartEnhanced&&L.addToCartEnhanced.__dn);
var orig=L.addToCartEnhanced;var w=function(form,a,b,c,e,ok,err){var done=0,args=[].slice.call(arguments);
var fb=function(){if(done)return;done=1;direct(form,function(){typeof err==='function'&&err.apply(this,arguments)})};
args[5]=function(){done=1;return typeof ok==='function'?ok.apply(this,arguments):undefined};
args[6]=function(){fb()};
try{return orig.apply(this,args)}catch(x){fb()}};w.__dn=1;L.addToCartEnhanced=w;return true}
if(!wrap()){var n=0,iv=setInterval(function(){if(wrap()||++n>60)clearInterval(iv)},250)}
/* carrito del encabezado */
d.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-toggle="#modal-cart"]');if(!b)return;setTimeout(function(){var m=d.getElementById('modal-cart');if(!m||!m.classList.contains('modal-show'))location.href='/comprar/'},1000)},true);
}();
