/* Landing del Botiquín Herbal (libro digital de Diego Montauti, PDF de 146 páginas), pedida por Santi el 21/11/2026.
   Va en su ficha, arriba de la descripción original. La descripción original se oculta (decía "lo descargás al instante"
   y "promo lanzamiento", que no son así): queda guardada igual en Tiendanube, no se cambió nada del producto.
   - Datos del libro (contados en el PDF): 44 molestias + 6 capítulos de plantas, más de 90 plantas, más de 230 fichas
     con uso y precaución, 5 formas de preparación, glosario y bibliografía.
   - Más de 6.000 personas: 2.100 por la web y el resto por mensaje y en sucursales (dato de Santi).
   - Entrega: el PDF lo mandan ellos después de la compra (no es descarga automática).
   - Fotos: páginas reales del libro en img/botiquin/ (se piden al mismo commit que este código).
   - Botones de compra: usan el COMPRAR AHORA de la ficha (#dn-buy). El precio se lee de la ficha y el del pack de
     5 libros, de /educativo/ (nada escrito a mano).
   - Sin promesas de salud: el libro informa y no reemplaza la consulta médica (lo dice el mismo libro).
   - También: en la franja de confianza, "Envíos a todo el país" pasa a "Libro digital en PDF", y se oculta el aviso
     de despacho (no se despacha nada). Sin degradés (preferencia de Santi). */
!function(){var d=document,W=window,B=d.body;if(W.__dnBQ||!B.classList.contains('template-product'))return;
var hd=(location.pathname.match(/\/productos\/([^\/?#]+)/)||[])[1];if(hd!=='botiquin-herbal-libro-digital')return;
var SP=d.getElementById('single-product');if(!SP)return;
var sc=d.querySelector('script[src*="/dist/dn-producto.min.js"]'),BASE=W.__dnBQBase||(sc?sc.src.replace(/dist\/dn-producto\.min\.js.*$/,''):'');if(!BASE)return;
var pd=d.getElementById('dn-pd'),uc=SP.querySelector('.user-content'),h5=uc&&uc.previousElementSibling,at=pd||(uc?(h5&&/^H5$/.test(h5.tagName)?h5:uc):null);if(!at||!at.parentNode)return;W.__dnBQ=1;
var I=BASE+'img/botiquin/',WA='https://wa.me/5491141816107?text='+encodeURIComponent('Hola! Tengo una consulta sobre el Botiquín Herbal (libro digital) '+location.origin+location.pathname);
var SV=function(p,w){return'<svg viewBox="0 0 24 24" width="'+(w||20)+'" height="'+(w||20)+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'};
var IC={ok:SV('<path d="M5 12.5l4.5 4.5L19 7.5"/>',16),hoja:SV('<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z"/><path d="M5 19l7-7"/>'),taza:SV('<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3"/>'),
lista:SV('<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.2"/><circle cx="4.5" cy="12" r="1.2"/><circle cx="4.5" cy="18" r="1.2"/>'),ficha:SV('<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h7"/>'),
estrella:SV('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'),libro:SV('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>'),
pdf:SV('<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="M9.5 13.5l2.5 2.5 2.5-2.5M12 10v6"/>'),lupa:SV('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',15),flecha:SV('<path d="M5 12h14M13 6l6 6-6 6"/>',18)};
var E=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(x){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[x]})};
var num=function(s){return parseFloat(String(s||'').replace(/\./g,'').replace(',','.').replace(/[^\d.]/g,''))||0};
var $=function(n){return'$'+Math.round(n).toLocaleString('es-AR')};
var pr=function(){var p=d.getElementById('price_display');return p?num(p.textContent):0};
var st=d.createElement('style');st.id='dn-bq-css';st.textContent=
/* la ficha: el libro no se despacha */
'#single-product .dn-ship,#dn-pd{display:none!important}'+
'.dn-bq{margin:8px 0 26px;color:#16261b;font-size:16px;line-height:1.55;text-transform:none}.dn-bq *{box-sizing:border-box}'+
'.dn-bq h2{font:900 26px/1.12 Archivo,"Arial Black",Arial,sans-serif!important;letter-spacing:-.015em!important;color:#1d4a2a;margin:0 0 10px!important;text-transform:none!important;text-align:left!important}.dn-bq h2:before,.dn-bq h2:after{display:none!important}'+
'.dn-bq h3{font:800 17px/1.25 Archivo,Arial,sans-serif!important;color:#1d4a2a;margin:0 0 3px!important;text-transform:none!important;text-align:left!important}.dn-bq p{margin:0 0 10px}'+
'.dn-bq .sec{background:#fff;border:1px solid #e4e1d7;border-radius:18px;padding:22px 18px;margin:0 0 16px}'+
'.dn-lp.dn-bq .kk{display:block;font:800 12px/1.2 Archivo,Arial,sans-serif!important;letter-spacing:.12em;text-transform:uppercase;color:#a8641a;margin:0 0 7px}'+
/* portada */
'.dn-bq .hero{background:#1d4a2a;color:#fff;border-radius:22px;padding:24px 18px 22px;margin:0 0 16px}.dn-lp.dn-bq .hero .kk{color:#f0c04f}.dn-bq .hero h2{color:#fff;font-size:30px!important;line-height:1.08!important}.dn-bq .hero h2 b{color:#f0c04f;font-weight:900}'+
'.dn-bq .hero p{color:#d5e4cc;font-size:16.5px}.dn-bq .ph{width:176px;margin:18px auto 18px;padding:7px;border-radius:28px;background:#0f2417;border:1px solid rgba(255,255,255,.18);box-shadow:0 18px 36px rgba(0,0,0,.35)}.dn-bq .ph img{display:block;width:100%;height:auto;border-radius:21px}'+
'.dn-bq .sts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin:4px 0 18px}.dn-bq .sts>b{display:block;padding:10px 2px 9px;border-radius:12px;background:#24563a;border:1px solid rgba(255,255,255,.16);text-align:center;font:900 19px/1 Archivo,Arial,sans-serif;color:#fff}'+
'.dn-bq .sts small{display:block;margin-top:5px;font:700 11px/1.2 Figtree,Arial,sans-serif;color:#cfe0c6}.dn-bq .so{display:flex;align-items:center;justify-content:center;gap:7px;margin:12px 0 0;font-size:14px;font-weight:700;color:#d5e4cc;text-align:center}.dn-bq .so i{color:#f0c04f;display:inline-flex}'+
/* botón de compra (igual que COMPRAR AHORA de la ficha, sin degradé) */
'.dn-bq .cta{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;min-height:56px;margin:0;padding:0 16px;border:0;border-radius:12px;background:#f0c04f;color:#10281a!important;font:900 16px/1 Figtree,Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;text-decoration:none!important;cursor:pointer;transition:transform .15s,background-color .2s}'+
'.dn-bq .cta:active{transform:scale(.985)}.dn-bq .cta i{display:inline-flex}.dn-bq .cta.wk{opacity:.75;pointer-events:none}.dn-bq .sec .cta{margin-top:16px}'+
/* para quién */
'.dn-bq .ck{list-style:none;margin:6px 0 0;padding:0}.dn-bq .ck li{position:relative;padding:9px 0 9px 36px;border-top:1px solid #edf0e8;font-size:15.5px;line-height:1.45}.dn-bq .ck li:first-child{border-top:0}.dn-bq .ck li>i{position:absolute;left:0;top:9px;width:24px;height:24px;border-radius:50%;background:#1d4a2a;color:#fff;display:flex;align-items:center;justify-content:center}'+
/* qué trae */
'.dn-bq .it{display:flex;gap:12px;align-items:flex-start;background:#edf3e6;border-radius:16px;padding:14px;margin:10px 0 0}.dn-bq .it>i{flex:0 0 42px;width:42px;height:42px;border-radius:50%;background:#1d4a2a;color:#fff;display:flex;align-items:center;justify-content:center}.dn-bq .it p{margin:0;font-size:15px;color:#2b3a2e}'+
/* páginas reales */
'.dn-bq .pg{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;margin:4px -18px 0;padding:4px 18px 8px;scroll-padding:0 18px;scrollbar-width:none}.dn-bq .pg::-webkit-scrollbar{display:none}'+
'.dn-bq .pg button{flex:0 0 64%;max-width:240px;scroll-snap-align:start;margin:0;padding:0;border:0;background:none;text-align:left;cursor:zoom-in;color:inherit}.dn-bq .pg em{position:relative;display:block;border-radius:12px;overflow:hidden;border:1px solid #e4e1d7;background:#fbf8f1;aspect-ratio:560/786;font-style:normal}'+
'.dn-bq .pg img{display:block;width:100%;height:100%;object-fit:cover}.dn-bq .pg em>i{position:absolute;right:8px;bottom:8px;width:30px;height:30px;border-radius:50%;background:rgba(16,40,26,.82);color:#fff;display:flex;align-items:center;justify-content:center}.dn-bq .pg b{display:block;margin-top:8px;font-size:14px;line-height:1.3;color:#1d4a2a}'+
/* índice */
'.dn-bq details{border-top:1px solid #edf0e8}.dn-bq details:first-of-type{border-top:0}.dn-bq summary{list-style:none;cursor:pointer;position:relative;padding:14px 38px 14px 0;font-weight:800;font-size:16px;color:#16261b}.dn-bq summary::-webkit-details-marker{display:none}'+
'.dn-bq summary:after{content:"+";position:absolute;right:0;top:11px;width:26px;height:26px;border-radius:50%;background:#edf3e6;color:#3f7d3a;font:900 18px/26px Archivo,Arial,sans-serif;text-align:center}.dn-bq details[open] summary:after{content:"–";background:#1d4a2a;color:#fff}.dn-bq summary small{margin-left:6px;font-size:13px;font-weight:700;color:#8a978a}'+
'.dn-bq .tg{display:flex;flex-wrap:wrap;gap:6px;padding:0 0 14px}.dn-bq .tg>b{padding:7px 11px;border-radius:999px;background:#edf3e6;color:#1d4a2a;font-size:13.5px;font-weight:700;line-height:1.2}.dn-bq .x6{margin:12px 0 0;padding:12px 14px;border-radius:12px;background:#fbf8f1;border:1px solid #e4e1d7;font-size:14.5px;color:#2b3a2e}'+
'.dn-bq details p{margin:0;padding:0 0 14px;font-size:15px;color:#2b3a2e}.dn-bq details p a{color:#1d4a2a!important;font-weight:800}'+
/* Diego */
'.dn-bq .au{display:flex;gap:14px;align-items:center;margin:4px 0 14px}.dn-bq .au img{flex:0 0 88px;width:88px;height:88px;border-radius:50%;object-fit:cover;object-position:50% 22%;border:3px solid #edf3e6}.dn-bq .au b{display:block;font:900 20px/1.15 Archivo,Arial,sans-serif;color:#1d4a2a}.dn-bq .au small{display:block;margin-top:3px;font-size:13.5px;color:#53624f;font-weight:700}'+
'.dn-lp.dn-bq .qt{margin:14px 0 0;padding:14px 16px;border-radius:14px;background:#fbf8f1;border:1px solid #e4e1d7;font:700 25px/1.15 Caveat,"Segoe Script",cursive!important;color:#1d4a2a}.dn-bq .qt small{display:block;margin-top:6px;font:700 13px/1.3 Figtree,Arial,sans-serif;color:#8a978a}'+
/* cuántos lo tienen */
'.dn-bq .sp{margin:0 0 16px;padding:22px 18px;border-radius:18px;background:#fbf0d4;text-align:center}.dn-bq .sp>b{display:block;font:900 44px/1 Archivo,Arial,sans-serif;color:#1d4a2a;letter-spacing:-.02em}.dn-lp.dn-bq .sp>strong{display:block;margin:6px 0 4px;font:800 18px/1.2 Archivo,Arial,sans-serif!important;color:#10281a}.dn-bq .sp p{margin:0;color:#4a3d18;font-size:14.5px}'+
/* oferta */
'.dn-bq .of{display:grid;gap:12px;margin-top:6px}.dn-bq .oc{position:relative;border:1.5px solid #e4e1d7;border-radius:16px;padding:18px 16px 16px;background:#fff}.dn-bq .oc.on{border:2px solid #1d4a2a}'+
'.dn-lp.dn-bq .oc .bd{display:inline-block;margin:0 0 10px;padding:5px 10px;border-radius:999px;background:#1d4a2a;color:#fff;font:800 11.5px/1 Archivo,Arial,sans-serif!important;letter-spacing:.06em;text-transform:uppercase}.dn-bq .oc .bd.g{background:#f0c04f;color:#10281a}'+
'.dn-bq .oc p{margin:0;font-size:14.5px;color:#53624f}.dn-lp.dn-bq .oc .pr{margin:10px 0 2px;font:900 30px/1 Archivo,Arial,sans-serif!important;color:#1d4a2a}.dn-bq .oc .pr s{margin-left:8px;font-size:16px;font-weight:700;color:#8a978a}.dn-bq .oc .ah{margin:6px 0 12px;font-size:14.5px;font-weight:800;color:#a8641a}'+
'.dn-bq .go2{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:52px;margin-top:14px;border-radius:12px;border:2px solid #1d4a2a;background:#fff;color:#1d4a2a!important;font:900 15px/1 Figtree,Arial,sans-serif;letter-spacing:.05em;text-transform:uppercase;text-decoration:none!important}'+
'.dn-bq .pso{display:grid;gap:9px;margin:16px 0 0;padding:14px 16px;border-radius:14px;background:#fbf8f1;border:1px solid #e4e1d7}.dn-bq .pso>b{font:800 15px/1.2 Archivo,Arial,sans-serif;color:#1d4a2a}.dn-bq .pso>p{display:flex;gap:10px;align-items:center;margin:0;font-size:14.5px;line-height:1.35;color:#2b3a2e}'+
'.dn-bq .pso>p>i{flex:0 0 26px;width:26px;height:26px;border-radius:50%;background:#1d4a2a;color:#fff;font:900 13px/26px Archivo,Arial,sans-serif;text-align:center;font-style:normal}'+
'.dn-bq .fin a.wa{display:inline-block;margin:14px 0 0;color:#fff!important;font-weight:800;font-size:14.5px;text-decoration:underline!important;text-underline-offset:3px}'+
/* cierre */
'.dn-bq .fin{background:#1d4a2a;color:#fff;border-radius:22px;padding:24px 18px;margin:0 0 6px;text-align:center}.dn-bq .fin h2{color:#fff;text-align:center!important}.dn-bq .fin p{color:#d5e4cc}.dn-bq .fin .lg{margin:12px 0 0;font-size:13px;color:#b8cbb0}'+
/* ampliar página */
'.bq-lb{position:fixed;left:0;top:0;right:0;bottom:0;z-index:100000;background:rgba(10,20,14,.92);display:flex;align-items:center;justify-content:center;padding:58px 12px 20px}.bq-lb img{max-width:100%;max-height:100%;border-radius:8px;background:#fff;box-shadow:0 20px 50px rgba(0,0,0,.5)}'+
'.bq-lb button{position:absolute;width:44px;height:44px;border-radius:50%;border:0;background:rgba(255,255,255,.92);color:#10281a;font:900 20px/44px Arial,sans-serif;text-align:center;cursor:pointer;padding:0}.bq-lb .x{right:14px;top:10px;background:#fff}.bq-lb .pv{left:8px;top:50%;margin-top:-22px}.bq-lb .nx{right:8px;top:50%;margin-top:-22px}'+
'.bq-lb .ct{position:absolute;left:60px;right:60px;top:22px;color:#fff;font:700 13.5px/1.3 Figtree,Arial,sans-serif;text-align:center}'+
'@media(min-width:768px){.dn-bq .sec{padding:28px 30px}.dn-bq .hero,.dn-bq .fin{padding:32px 30px}.dn-bq .hero .gr{display:grid;grid-template-columns:minmax(0,1fr) 200px;gap:28px;align-items:center}.dn-bq .ph{width:200px;margin:0}.dn-bq .hero h2{font-size:36px!important}'+
'.dn-bq .two{display:grid;grid-template-columns:1fr 1fr;gap:0 12px}.dn-bq .pg{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));overflow:visible;margin:4px 0 0;padding:4px 0 8px}.dn-bq .pg button{max-width:none}.dn-bq .of{grid-template-columns:1fr 1fr}.dn-bq .cta.w{max-width:380px;margin-left:auto;margin-right:auto}.dn-bq .pg button:hover em{border-color:#3f7d3a}}';
d.head.appendChild(st);
/* franja de confianza: el envío pasa a ser "libro digital en PDF" */
var pt=d.getElementById('dn-pt');if(pt)[].some.call(pt.children,function(r){var b=r.querySelector('b');if(!b||!/env[ií]os/i.test(b.textContent))return false;var i=r.querySelector('i');if(i)i.innerHTML=IC.pdf;b.textContent='Libro digital en PDF';var s=r.querySelector('small');if(s)s.textContent='Te lo enviamos nosotros después de la compra.';return true});
var P=pr(),PS=P?$(P):'';var CT=function(w,np){return'<button type="button" class="cta'+(w?' w':'')+'" data-bq="buy"><span>Comprar ahora'+(PS&&!np?' · '+PS:'')+'</span><i>'+IC.flecha+'</i></button>'};
var IX=[['Digestión',['Acidez estomacal','Gastritis','Úlceras digestivas','Indigestión','Flatulencias','Colon irritable','SIBO','Divertículos','Estreñimiento','Hígado graso','Cálculos en la vesícula','Parásitos intestinales','Hemorroides']],
['Ánimo, descanso y mente',['Angustia','Ansiedad','Memoria y concentración','Dolores de cabeza','Apoyo para dejar de fumar']],
['Mujer',['Menopausia','Cólicos menstruales','Vaginitis','Candidiasis','Cistitis']],['Hombre',['Salud prostática','Disfunción eréctil']],
['Huesos, músculos y articulaciones',['Artritis','Dolores musculares y contracturas','Fibromialgia','Osteoporosis','Ácido úrico y gota','Inflamación']],
['Corazón, circulación y metabolismo',['Colesterol y aterosclerosis','Presión alta','Problemas circulatorios','Retención de líquidos','Diabetes','Anemia','Hipotiroidismo','Cálculos renales']],
['Piel',['Psoriasis','Hongos en la piel']],['Otras',['Gripe y resfrío','Dolor de muelas','Tinnitus']]];
var PG=[['indice','El índice completo'],['preparacion','Las formas de preparación'],['capitulo','Cada molestia, explicada'],['plantas','Cada planta, con uso y precaución']];
var FQ=[['¿Cómo lo recibo?','Es un libro digital en PDF. Después de la compra te lo enviamos nosotros. Si tenés alguna duda, <a href="'+E(WA)+'" target="_blank" rel="noopener">escribinos por WhatsApp</a>.'],
['¿Dónde lo puedo leer?','En el celular, la compu o la tablet: es un PDF de 146 páginas.'],
['¿Es un libro impreso?','No, es digital: te lo mandamos en PDF y no llega nada por correo.'],
['¿Necesito saber de plantas?','No. La primera parte explica desde cero qué es la fitoterapia y cómo preparar cada hierba.'],
['¿Trae recetas?','Sí. Para cada molestia, las plantas que se usan con su preparación (infusión, decocción, compresas o tinturas), cantidad y frecuencia, y cuándo no conviene usarlas.'],
['¿Reemplaza la consulta médica?','No, y el libro lo dice desde el principio: es un complemento para cuidarte con herramientas naturales. Si estás embarazada o en lactancia, tomás medicación o un síntoma sigue, consultá con tu médico.'],
['¿Dónde consigo las hierbas?','Muchas las tenés en nuestras sucursales y en la sección Herboristería de la tienda online. <a href="/herboristeria/">Ver herboristería →</a>'],
['¿Cómo pago?','Con los medios de pago de la tienda: los ves al finalizar la compra.']];
var h=
/* 1. portada */
'<div class="hero"><div class="gr"><div><span class="kk">Libro digital · Diego Montauti</span><h2>Qué planta usar, cómo prepararla <b>y cuándo no</b></h2>'+
'<p>La guía de consulta de fitoterapia de Diego Montauti, fundador de Dietéticas Naturalmente: todo lo que aprendió en años respondiendo consultas en nuestras sucursales y en las redes. Para tenerla siempre a mano en el celular.</p></div>'+
'<div class="ph"><img src="'+I+'tapa.webp" alt="Tapa del libro Botiquín Herbal, de Diego S. Montauti" width="720" height="1011" loading="lazy"></div></div>'+
'<div class="sts"><b>146<small>páginas</small></b><b>44<small>molestias</small></b><b>+90<small>plantas</small></b><b>PDF<small>en tu celular</small></b></div>'+CT(1)+
'<p class="so"><i>'+IC.hoja+'</i>Más de 6.000 personas ya lo tienen</p></div>'+
/* 2. para quién */
'<div class="sec"><span class="kk">Para quién es</span><h2>Para los que eligen lo natural</h2><p>Si te interesan las hierbas y la fitoterapia, este libro te ordena todo en un solo lugar.</p><ul class="ck">'+
['Querés armar tu propio botiquín de hierbas en casa.','Querés saber qué planta se usa para cada molestia, sin adivinar.','Te gusta preparar tus infusiones y querés hacerlo bien: temperatura, tiempo y cantidad.','Buscás una fuente ordenada y confiable, no información suelta y contradictoria de internet.','Querés conocer las precauciones de cada planta antes de usarla.'].map(function(t){return'<li><i>'+IC.ok+'</i>'+E(t)+'</li>'}).join('')+'</ul></div>'+
/* 3. qué trae */
'<div class="sec"><span class="kk">Qué trae</span><h2>Todo lo que vas a encontrar</h2><p>146 páginas a color, con fotos y explicado en simple.</p><div class="two">'+
[[IC.taza,'Herboristería simple','Qué es la fitoterapia, cómo actúan las plantas y 5 formas de prepararlas (infusión, decocción, maceración, compresas y tinturas), con temperaturas y tiempos.'],
[IC.lista,'44 molestias frecuentes','De cada una: qué es, causas y síntomas, las plantas que se usan y los hábitos que la acompañan.'],
[IC.ficha,'Más de 230 fichas de plantas','Cada planta con su nombre científico, cómo se usa, cuántas veces al día y cuándo no conviene usarla.'],
[IC.estrella,'6 plantas estrella','Ashwagandha, maca peruana, hibisco, psyllium, hongos adaptógenos y pétalos de rosa, en capítulos propios.'],
[IC.libro,'Glosario y bibliografía','Los términos herbales explicados y las fuentes consultadas.']].map(function(x){return'<div class="it"><i>'+x[0]+'</i><div><h3>'+E(x[1])+'</h3><p>'+E(x[2])+'</p></div></div>'}).join('')+'</div></div>'+
/* 4. páginas reales */
'<div class="sec"><span class="kk">Páginas reales</span><h2>Mirá cómo es por dentro</h2><p>Así está armado. Tocá una página para verla en grande.</p><div class="pg">'+
PG.map(function(x){return'<button type="button" data-bq="pg" data-f="'+x[0]+'"><em><img src="'+I+x[0]+'-s.webp" alt="Página del libro: '+E(x[1])+'" width="560" height="786" loading="lazy"><i>'+IC.lupa+'</i></em><b>'+E(x[1])+'</b></button>'}).join('')+'</div>'+CT(1)+'</div>'+
/* 5. índice */
'<div class="sec"><span class="kk">Índice</span><h2>Las 44 molestias que trae</h2><p>Ordenadas por tema. Tocá cada grupo para verlas.</p>'+
IX.map(function(g){return'<details><summary>'+E(g[0])+'<small>'+g[1].length+'</small></summary><div class="tg">'+g[1].map(function(t){return'<b>'+E(t)+'</b>'}).join('')+'</div></details>'}).join('')+
'<p class="x6">Y 6 capítulos de plantas estrella: ashwagandha, maca peruana, hibisco, psyllium, hongos adaptógenos y pétalos de rosa.</p></div>'+
/* 6. Diego */
'<div class="sec"><span class="kk">Quién lo escribió</span><div class="au"><img src="'+I+'diego.webp" alt="Diego Montauti" width="400" height="486" loading="lazy"><div><b>Diego Montauti</b><small>Fundador de Dietéticas Naturalmente · Los Yuyos de Diego</small></div></div>'+
'<p>Diego fundó Dietéticas Naturalmente, que hoy tiene varias sucursales, hace miles de envíos a todo el país por mes y reúne una comunidad de más de un millón de seguidores. Su pasión por las plantas empezó de chico, con su abuela, y siguió con libros, talleres y el saber popular.</p>'+
'<p>El libro junta las preguntas que más le hacen en las sucursales, por redes y por teléfono. Lo ves en «Los Yuyos de Diego», en Naturalmente Media, y lo invitaron a ¡Qué Mañana! en Canal 9.</p>'+
'<div class="qt">«No pretendemos dar recetas mágicas, sino abrir caminos.»<small>Del epílogo del libro</small></div></div>'+
/* 7. cuántos lo tienen */
'<div class="sp"><b>+6.000</b><strong>personas ya lo tienen</strong><p>Entre la web, nuestras sucursales y WhatsApp.</p></div>'+
/* 8. oferta */
'<div class="sec" id="dn-bq-of"><span class="kk">Elegí</span><h2>Llevátelo hoy</h2><div class="of">'+
'<div class="oc on"><span class="bd">El más vendido</span><h3>Botiquín Herbal</h3><p>Libro digital en PDF · 146 páginas</p>'+(PS?'<div class="pr">'+PS+'</div>':'')+CT(0,1)+'</div>'+
'<div class="oc pk"><span class="bd g">Pack</span><h3>Los 5 libros digitales</h3><p>Botiquín Herbal, Fitoterapia Estacional, Adaptógenos, Fermentos Caseros y Mini guía keto + hierbas.</p><div class="pr"></div><div class="ah"></div>'+
'<a class="go2" href="/productos/pack-5-libros-digitales-15ow9/">Ver el pack<i>'+IC.flecha+'</i></a></div></div>'+
'<div class="pso"><b>Así de simple</b><p><i>1</i>Comprás acá, con los medios de pago de la tienda.</p><p><i>2</i>Te enviamos el libro en PDF.</p><p><i>3</i>Lo leés en el celular, la compu o la tablet.</p></div></div>'+
/* 9. preguntas */
'<div class="sec"><span class="kk">Antes de comprar</span><h2>Preguntas frecuentes</h2>'+FQ.map(function(q){return'<details><summary>'+E(q[0])+'</summary><p>'+q[1]+'</p></details>'}).join('')+'</div>'+
/* 10. cierre */
'<div class="fin"><h2>Tu guía de hierbas, siempre a mano</h2><p>146 páginas · 44 molestias · más de 90 plantas</p>'+CT(1)+'<a class="wa" href="'+E(WA)+'" target="_blank" rel="noopener">¿Tenés dudas? Escribinos por WhatsApp</a><p class="lg">Libro informativo: no reemplaza la consulta médica.</p></div>';
var lp=d.createElement('div');lp.className='dn-lp dn-bq';lp.id='dn-bq';lp.innerHTML=h;at.parentNode.insertBefore(lp,at);
/* comprar: el mismo COMPRAR AHORA de la ficha (si no está, agregar al carrito) */
var busy=null,BB=d.getElementById('dn-buy');
if(BB&&W.MutationObserver)new MutationObserver(function(){if(busy&&!BB.disabled){busy.classList.remove('wk');busy.firstChild.textContent=busy.getAttribute('data-t');busy=null}}).observe(BB,{attributes:true,attributeFilter:['disabled']});
/* ampliar una página del libro: con flechas (y deslizando) para pasar a la siguiente */
var LB=null,CUR=0,shut=function(){if(!LB)return;LB.style.display='none';d.documentElement.style.overflow=''};
var show=function(i){CUR=(i+PG.length)%PG.length;var im=LB.querySelector('img');im.src=I+PG[CUR][0]+'.webp';im.alt='Página del libro: '+PG[CUR][1];LB.querySelector('.ct').textContent=(CUR+1)+' de '+PG.length+' · '+PG[CUR][1]};
var open=function(i){if(!LB){LB=d.createElement('div');LB.className='bq-lb';LB.setAttribute('role','dialog');LB.setAttribute('aria-modal','true');
LB.innerHTML='<span class="ct"></span><button type="button" class="x" aria-label="Cerrar">✕</button><button type="button" class="pv" aria-label="Página anterior">‹</button><img alt=""><button type="button" class="nx" aria-label="Página siguiente">›</button>';
LB.addEventListener('click',function(e){var b=e.target.closest('button');if(b&&b.classList.contains('pv'))return show(CUR-1);if(b&&b.classList.contains('nx'))return show(CUR+1);if(e.target===LB||b)shut()});
d.addEventListener('keydown',function(e){if(!LB||LB.style.display==='none')return;if(e.key==='Escape')shut();else if(e.key==='ArrowLeft')show(CUR-1);else if(e.key==='ArrowRight')show(CUR+1)});
var x0=null;LB.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});LB.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>45)show(CUR+(dx<0?1:-1))},{passive:true});d.body.appendChild(LB)}
show(i);LB.style.display='flex';d.documentElement.style.overflow='hidden';LB.querySelector('.x').focus()};
lp.addEventListener('click',function(e){var b=e.target.closest('[data-bq]');if(!b)return;var k=b.getAttribute('data-bq');
if(k==='pg'){var f=b.getAttribute('data-f'),n=0;PG.forEach(function(x,j){if(x[0]===f)n=j});open(n);return}
if(k==='buy'){e.preventDefault();if(busy)return;var s=b.firstChild;if(!b.getAttribute('data-t'))b.setAttribute('data-t',s.textContent);
if(BB&&!BB.disabled){busy=b;b.classList.add('wk');s.textContent='Procesando…';BB.click();setTimeout(function(){if(busy===b&&!BB.disabled){b.classList.remove('wk');s.textContent=b.getAttribute('data-t');busy=null}},8000);return}
var a=SP.querySelector('.js-addtocart:not(.js-addtocart-placeholder)');if(a)a.click()}});
/* las páginas de muestra se piden apenas la fila aparece (las tapadas a la derecha no se verían al deslizar) */
var row=lp.querySelector('.pg');if(row&&W.IntersectionObserver){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){[].forEach.call(row.querySelectorAll('img'),function(i){i.loading='eager'});io.disconnect()}},{rootMargin:'400px 0px'});io.observe(row)}
/* pack de 5 libros: precio de la categoría Libros (el mismo dato que usa el módulo 32), cuando el navegador está libre */
var fill=function(o){var c=lp.querySelector('.oc.pk');if(!c||!o||!o.p)return;c.querySelector('.pr').innerHTML=E(o.p)+(o.c?'<s>'+E(o.c)+'</s>':'');var dif=num(o.p)-pr();if(dif>0&&pr())c.querySelector('.ah').textContent='Por '+$(dif)+' más te llevás los otros 4 libros.'};
var pack=function(){var K='pack-5-libros-digitales-15ow9';try{var C=JSON.parse(sessionStorage.getItem('dnLibP'))||{};if(C[K]&&C[K].p)return fill(C[K])}catch(x){}
(W.__dnGet?W.__dnGet('/educativo/'):fetch('/educativo/').then(function(r){return r.text()})).then(function(t){var o=null;[].some.call(new DOMParser().parseFromString(t,'text/html').querySelectorAll('[data-variants]'),function(e){try{var a=JSON.parse(e.getAttribute('data-variants'))[0];if(a&&a.product_id==375706291&&a.price_short){o={p:String(a.price_short).replace(/,00$/,''),c:a.compare_at_price_number>a.price_number?String(a.compare_at_price_short).replace(/,00$/,''):''};return true}}catch(x){}return false});fill(o)}).catch(function(){})};
(W.__dnIdle||function(f){setTimeout(f,1500)})(pack);
}();
