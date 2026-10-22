/* Landings automáticas para los combos que no tenían landing propia y para los suplementos.
   No toca nada del producto en Tiendanube (ni nombre, ni descripción): la landing se dibuja acá, arriba de la
   descripción original, que queda igual debajo. El contenido de cada producto está en contenido/lp/<handle>.json
   (armado con la descripción de la tienda o, si no tenía, con la info del fabricante; ver "fuente" en cada archivo).
   La lista de productos (LA) la genera build.sh a partir de esa carpeta. */
!function(){var d=document,W=window,B=d.body;if(W.__dnLA||!B.classList.contains('template-product'))return;var SP=d.getElementById('single-product');if(!SP)return;
if(SP.querySelector('.dn-lp'))return;/* ya tiene su landing hecha a mano */
var hd=(location.pathname.match(/\/productos\/([^\/?#]+)/)||[])[1];if(!hd)return;try{hd=decodeURIComponent(hd)}catch(e){}
var LA=W.dnLA||{};var tp=LA[hd];if(!tp)return;W.__dnLA=1;
var sc=d.querySelector('script[src*="/dist/dn-producto.min.js"]'),BASE=sc?sc.src.replace(/dist\/dn-producto\.min\.js.*$/,''):'';if(!BASE)return;
var h1=SP.querySelector('.js-product-name')||SP.querySelector('h1'),nm=h1?h1.textContent.trim():'';
var uc=SP.querySelector('.user-content'),h5=uc&&uc.previousElementSibling,ds=SP.querySelector('[data-store="product-description"]');
var at=uc?(h5&&/^H5$/.test(h5.tagName)?h5:uc):(ds||SP.querySelector('[data-nubesdk-slot="after_product_description"]'));/* sin descripción: donde iría la descripción */if(!at||!at.parentNode)return;
var E=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(x){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[x]})};
var $=function(n){return'$'+Math.round(n).toLocaleString('es-AR')};
var SV=function(p,w){return'<svg viewBox="0 0 24 24" width="'+(w||20)+'" height="'+(w||20)+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>'};
var IC={hoja:SV('<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z"/><path d="M5 19l7-7"/>'),tienda:SV('<path d="M4 10v10h16V10"/><path d="M3 10l2-6h14l2 6z"/><path d="M10 20v-5h4v5"/>'),
caja:SV('<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>'),chat:SV('<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/>'),camion:SV('<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>'),
reloj:SV('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>')};
var WA='5491141816107',wa=function(t){return'https://wa.me/'+WA+'?text='+encodeURIComponent(t+' '+location.origin+location.pathname)};
var st=d.createElement('style');st.id='dn-la-css';st.textContent=
'.dn-lpa{margin:6px 0 22px;color:#16261b;font-family:Figtree,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;font-size:16px;line-height:1.55;text-transform:none}'+
'.dn-lpa h2{font:900 26px/1.12 Archivo,"Arial Black",Arial,sans-serif!important;letter-spacing:-.015em;color:#1d4a2a;margin:0 0 10px!important;text-transform:none!important}.dn-lpa h3{font:800 17px/1.25 Archivo,Arial,sans-serif!important;color:#1d4a2a;margin:0 0 4px!important;text-transform:none!important}'+
'.dn-lpa p{margin:0 0 10px}.dn-lpa>div{margin:0 0 18px;border-radius:22px}.dn-lpa .dn-sec{background:#fff;border:1px solid #e4e1d7;padding:22px 18px;border-radius:18px;box-shadow:0 1px 2px rgba(16,40,26,.05),0 8px 20px -10px rgba(16,40,26,.18)}'+
'.dn-lpa .dn-kk{display:block;font:800 12px/1.2 Archivo,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#a8641a;margin:0 0 6px}'+
'.dn-lpa .dn-hero{background:#15301f;background:radial-gradient(130% 90% at 100% 0%,#1d4a2a 0%,#15301f 60%);padding:26px 20px 22px;color:#fff}.dn-lpa .dn-hero h2{color:#fff}.dn-lpa .dn-hero h2 span{color:#f4c95d}'+
'.dn-lpa .dn-hero .ln{display:block;width:56px;height:4px;border-radius:4px;background:#f0c04f;margin:0 0 14px}.dn-lpa .dn-hero p{color:#d5e4cc;font-size:16.5px}'+
'.dn-lpa .dn-ch{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px}.dn-lpa .dn-ch span{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:8px 10px;font-size:13px;font-weight:700;line-height:1.25;color:#fff}'+
'.dn-lpa .dn-ch span:last-child:nth-child(odd){grid-column:span 2}.dn-lpa .dn-ch b{flex:0 0 18px;width:18px;height:18px;border-radius:50%;background:#f0c04f;color:#10281a;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:900}'+
'.dn-lpa .dn-it{display:flex;gap:12px;align-items:flex-start;background:#edf3e6;border-radius:16px;padding:14px;margin:10px 0 0}.dn-lpa .dn-it i{flex:0 0 42px;width:42px;height:42px;border-radius:50%;background:#1d4a2a;color:#fff;display:flex;align-items:center;justify-content:center}'+
'.dn-lpa .dn-it p{margin:0;font-size:15px;color:#2b3a2e}.dn-lpa .dn-pres{display:inline-block;margin:4px 0 2px;padding:6px 12px;border-radius:999px;background:#fbf0d4;color:#10281a;font-size:13.5px;font-weight:700}'+
'.dn-lpa .dn-st{counter-reset:s;margin:6px 0 0;padding:0;list-style:none}.dn-lpa .dn-st li{counter-increment:s;position:relative;padding:10px 0 10px 44px;border-top:1px solid #edf0e8;font-size:15.5px}.dn-lpa .dn-st li:first-child{border-top:0}'+
'.dn-lpa .dn-st li:before{content:counter(s);position:absolute;left:0;top:8px;width:30px;height:30px;border-radius:50%;background:#edf3e6;color:#1d4a2a;font:900 14px/30px Archivo,Arial,sans-serif;text-align:center}'+
'.dn-lpa .dn-nt{margin:12px 0 0;padding:12px 14px;border-radius:12px;background:#fbf8f1;border:1px solid #e4e1d7;font-size:14px;color:#53624f}'+
'.dn-lpa .dn-tr{display:grid;gap:10px}.dn-lpa .dn-tr>div{display:flex;gap:12px;align-items:flex-start}.dn-lpa .dn-tr i{flex:0 0 40px;width:40px;height:40px;border-radius:50%;background:#fff;border:1.5px solid #3f7d3a;color:#1d4a2a;display:flex;align-items:center;justify-content:center}.dn-lpa .dn-tr p{margin:0;font-size:14.5px;color:#53624f}'+
'.dn-lpa .dn-env{background:#fbf0d4;padding:20px 18px;text-align:center}.dn-lpa .dn-env h2{font-size:22px!important;color:#10281a}.dn-lpa .dn-env p{margin:0;color:#4a3d18;font-size:15px}'+
'.dn-lpa details{border-top:1px solid #edf0e8}.dn-lpa details:first-of-type{border-top:0}.dn-lpa summary{list-style:none;cursor:pointer;padding:13px 30px 13px 0;position:relative;font-weight:700;font-size:15.5px;color:#16261b}.dn-lpa summary::-webkit-details-marker{display:none}'+
'.dn-lpa summary:after{content:"+";position:absolute;right:4px;top:9px;font:900 20px/1 Archivo,Arial,sans-serif;color:#3f7d3a}.dn-lpa details[open] summary:after{content:"–"}.dn-lpa details p{font-size:15px;color:#2b3a2e;padding:0 0 12px;margin:0}'+
'.dn-lpa a.dn-wa{display:flex;align-items:center;justify-content:center;gap:8px;margin:14px 0 0;padding:13px;border-radius:12px;background:#25d366;color:#fff!important;font:900 14px/1 Archivo,Arial,sans-serif;letter-spacing:.04em;text-transform:uppercase;text-decoration:none!important}'+
'.dn-lpa-mi{font:800 17px/1.25 Archivo,Arial,sans-serif;color:#1d4a2a;margin:4px 0 8px}';
d.head.appendChild(st);
/* esqueleto inmediato (así el resto de la ficha ya sabe que hay landing); el contenido llega enseguida */
var lp=d.createElement('div');lp.className='dn-lp dn-lpa dn-wait';
lp.innerHTML='<div class="dn-hero"><h2>'+E(nm)+'</h2><i class="ln"></i></div>';
at.parentNode.insertBefore(lp,at);
var hasDesc=uc&&uc.textContent.replace(/\s+/g,'').length>20;
if(hasDesc&&!(h5&&/^H5$/.test(h5.tagName))){var mi=d.createElement('div');mi.className='dn-lpa-mi';mi.textContent='Más información del producto';at.parentNode.insertBefore(mi,at)}
var price=function(){var pd=d.getElementById('price_display');if(!pd)return 0;return parseInt(pd.getAttribute('data-product-price'),10)/100||parseFloat(pd.textContent.replace(/[^\d,]/g,'').replace(',','.'))||0};
var done=function(){lp.classList.remove('dn-wait')};
fetch(BASE+'contenido/lp/'+encodeURIComponent(hd)+'.json').then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(J){
var combo=tp==='c',h='';
/* 1. presentación */
h+='<div class="dn-hero"><span class="dn-kk" style="color:#f4c95d">'+(combo?'Combo Naturalmente':'Suplementos')+'</span><h2>'+E(J.t1)+(J.t2?' <span>'+E(J.t2)+'</span>':'')+'</h2><i class="ln"></i><p>'+E(J.intro)+'</p>';
if(J.chips&&J.chips.length)h+='<div class="dn-ch">'+J.chips.slice(0,4).map(function(c){return'<span><b>✓</b>'+E(c)+'</span>'}).join('')+'</div>';
h+='</div>';
/* 2. qué trae */
if((J.trae&&J.trae.length)||J.pres){h+='<div class="dn-sec"><span class="dn-kk">'+(combo?'Lo que trae':'Qué contiene')+'</span><h2>'+E(J.trae_titulo||(combo?'Qué trae el combo':'Qué contiene'))+'</h2>';
if(J.momento)h+='<p style="color:#53624f;font-size:15px">'+E(J.momento)+'</p>';
if(J.pres)h+='<span class="dn-pres">Presentación: '+E(J.pres)+'</span>';
(J.trae||[]).slice(0,4).forEach(function(t){h+='<div class="dn-it"><i>'+IC.hoja+'</i><div><h3>'+E(t.n)+'</h3><p>'+E(t.d)+'</p></div></div>'});h+='</div>'}
/* 3. cómo se usa */
h+='<div class="dn-sec"><span class="dn-kk">Modo de uso</span><h2>Cómo se usa</h2>';
if(J.uso&&J.uso.length)h+='<ol class="dn-st">'+J.uso.slice(0,4).map(function(u){return'<li>'+E(u)+'</li>'}).join('')+'</ol>';
else h+='<p>Seguí las indicaciones del envase de '+(combo?'cada producto del combo':'este producto')+'. Si tenés dudas sobre cómo sumarlo a tu rutina, escribinos y te asesoramos.</p>';
h+='<p class="dn-nt">Es un complemento: no reemplaza una alimentación variada ni las indicaciones de tu médico. Si estás embarazada, en período de lactancia o tomás medicación, consultalo antes de empezar.</p></div>';
/* 4. confianza */
h+='<div class="dn-sec"><span class="dn-kk">Por qué en Naturalmente</span><h2>Una dietética de verdad, con atención de verdad</h2><div class="dn-tr">'+
'<div><i>'+IC.tienda+'</i><div><h3>Sucursales físicas</h3><p>Tenemos 3 sucursales en Ezeiza: detrás de la tienda online hay una dietética de barrio.</p></div></div>'+
'<div><i>'+IC.reloj+'</i><div><h3>Sale rápido</h3><p>Despachamos de lunes a viernes. Lo que entra antes de las 12 sale en el día.</p></div></div>'+
'<div><i>'+IC.caja+'</i><div><h3>Llega bien cerrado</h3><p>Lo preparamos y embalamos con cuidado, y enviamos a todo el país.</p></div></div>'+
'<div><i>'+IC.chat+'</i><div><h3>Te asesoramos antes y después</h3><p>Escribinos por WhatsApp y te respondemos personas del equipo.</p></div></div></div></div>';
/* 5. envío gratis (desde $65.000) */
var p=price(),MIN=65000;if(p){var tx='';if(p>=MIN)tx='<h2>Este producto tiene envío gratis</h2><p>Compras desde '+$(MIN)+' no pagan envío.</p>';
else{var n=Math.ceil(MIN/p);tx=n<=2?'<h2>Llevá '+n+' y el envío te sale gratis</h2><p>'+n+' unidades: '+$(p*n)+'. Envío gratis en compras desde '+$(MIN)+'.</p>':'<h2>Envío gratis desde '+$(MIN)+'</h2><p>Sumalo con otros productos y no pagás envío.</p>'}
h+='<div class="dn-env">'+tx+'</div>'}
/* 6. preguntas */
var Q=[['¿Cuándo me llega?','Despachamos de lunes a viernes: lo que entra antes de las 12 sale en el día. Enviamos a todo el país.'],
['¿Cómo se usa?',J.uso&&J.uso.length?'Tenés el paso a paso más arriba. Igual, seguí siempre lo que indica el envase.':'Siguiendo las indicaciones del envase. Si querés, te lo explicamos por WhatsApp.'],
['¿Reemplaza a un tratamiento médico?','No. Es un complemento para sumar a tu rutina y no reemplaza las indicaciones de tu médico.'],
['¿Puedo consultar antes de comprar?','Sí. Escribinos por WhatsApp desde el botón de abajo y te asesoramos.']];
h+='<div class="dn-sec"><span class="dn-kk">Antes de comprar</span><h2>Preguntas frecuentes</h2>'+Q.map(function(q){return'<details><summary>'+E(q[0])+'</summary><p>'+E(q[1])+'</p></details>'}).join('')+
'</div>';
/* se reemplaza el esqueleto: el primer bloque (presentación) se actualiza en su lugar para no mover lo que otros módulos ya ubicaron debajo */
var tmp=d.createElement('div');tmp.innerHTML=h;var first=lp.firstElementChild,nh=tmp.firstElementChild;lp.replaceChild(nh,first);
var after=nh.nextSibling;while(after&&!after.classList.contains('dn-sec')&&!after.classList.contains('dn-env'))after=after.nextSibling;/* lo que otros módulos pusieron debajo de la presentación queda ahí */
while(tmp.firstElementChild)lp.appendChild(tmp.firstElementChild);
done()}).catch(function(){/* sin contenido: no se muestra la landing */lp.parentNode&&lp.parentNode.removeChild(lp);var m=d.querySelector('.dn-lpa-mi');m&&m.parentNode.removeChild(m)});
}();
