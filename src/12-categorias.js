!function(){var d=document,B=d.body;if(!B.classList.contains('template-category')||d.getElementById('dn-ch'))return;
var path=location.pathname.replace(/\/page\/\d+\/?$/,'/').replace(/\/+$/,'/'),slug=(path.match(/^\/([^\/]+)\/$/)||[])[1]||'';
var D={
'herboristeria':['Hierbas, flores y hojas secas para tus infusiones de todos los días.','Manzanilla|Hibiscus|Menta|Moringa|Tilo|Té verde=te verde'],
'frutos-secos':['Frutos secos, mixes y deshidratados para picar, cocinar o sumar al desayuno.','Almendras|Nueces=nuez|Castañas=casta|Mix|Dátiles=datiles|Arándanos=arandanos'],
'suplementos':['Magnesio, colágeno, ashwagandha y otros suplementos para tu rutina.','Magnesio|Colágeno=colageno|Ashwagandha|Melena de león=melena|Moringa'],
'educativo':['Libros y guías digitales para aprender sobre hierbas y alimentación natural.',''],
'semillas':['Chía, lino, zapallo, girasol y más, para sumar a tus comidas.','Chía=chia|Lino|Zapallo|Girasol|Sésamo=sesamo|Quinoa'],
'condimentos':['Especias y condimentos para darle sabor a tu cocina.','Cúrcuma=curcuma|Canela|Jengibre|Pimentón=pimenton|Orégano=oregano'],
'chocolates-barritas-snacks-y-varios':['Chocolates, snacks y opciones para darte un gusto.','Chocolate|Sin azúcar=sin azucar|Coco|Galletitas'],
'harinas':['Harinas, avenas, cereales y legumbres para tu despensa.','Avena|Harinas=harina|Arroz|Garbanzos|Fécula=fecula'],
'aceites-y-mas':['Aceites de coco, oliva y lino, vinagres, miel y más.','Aceite de coco|Oliva|Miel|Vinagre|Kefir'],
'diabetico':['Opciones sin azúcar agregada: galletitas, endulzantes, dulces y más.','Stevia|Sin azúcar=sin azucar|Galletitas|Chocolate'],
'galletitas':['Galletitas, endulzantes, sales y básicos para tu alimentación diaria.','Stevia|Sal del Himalaya=himalaya|Pasta de maní=pasta de mani|Galletitas'],
'celiaco':['Productos sin TACC: premezclas, harinas, fideos, galletitas y más.','Premezclas=premezcla|Sin TACC=sin tacc|Fideos|Harinas=harina'],
'tinturas-madres':['Tinturas madre en gotas de Piper Pol, Hierbas del Oasis y otras marcas.','Piper Pol=piper pol|Oasis|Pasionaria|Cardo mariano=cardo'],
'premezclas-sin-tacc':['Premezclas y harinas sin TACC para pan, pizza, bizcochuelo y más.','Para pan=premezcla para pan|Para pizza=premezcla para pizza|Bizcochuelo|Harinas=harina'],
'vegano':['Opciones de origen vegetal: bebidas, texturizados, barritas y más.','Proteicas=proteica|Texturizado|Leches vegetales=leche de|Alfajores=alfajor'],
'fideos':['Fideos de verduras, integrales, de arroz y sin TACC.','Integrales=integral|Espinaca|De arroz=fideos de arroz|Sin TACC=libre de gluten'],
'te-en-saquitos':['Tés e infusiones en saquitos, prácticos para todos los días.','Té verde=te verde|Boldo|Manzanilla'],
'alfajores':['Alfajores keto, sin azúcar, veganos y sin TACC.','Keto|Sin azúcar=sin azucar|Veganos=vegano|Sin TACC=sin tacc'],
'barritas':['Barritas de cereal, frutas y proteicas para llevar a todos lados.','Proteicas=proteica|Vitalgy|Sin azúcar=sin azucar'],
'teteras-infusores-molinillos':['Teteras, infusores y accesorios para preparar tus hierbas.','Infusores=infusor|Teteras=tetera'],
'cosmetica-natural':['Shampoo sólido, bálsamos, aceites y cosmética de origen natural.','Shampoo sólido=shampoo|Bálsamo labial=balsamo|Aceites=aceite|Sentida Botánica=sentida'],
'yerbas':['Yerbas tradicionales, orgánicas y compuestas con hierbas.','Cachamate|Kraus|Orgánicas=organica|Con hierbas=hierbas'],
'combos':['Programas de hierbas + tintura madre para 30 o 60 días.','']};
var c=D[slug];
var st=d.createElement('style');st.id='dn-cat-css';st.textContent=
'.dn-cat .page-header{text-transform:none}.dn-cat .page-header h1{display:flex;align-items:center;gap:10px;text-transform:uppercase}'+
'.dn-chi{flex:0 0 40px;width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#3f7d3a,#1d4a2a);color:#f4c95d;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 6px 14px rgba(29,74,42,.25);animation:dnChi .6s ease both}.dn-chi svg{width:21px;height:21px}@keyframes dnChi{from{transform:scale(.6) rotate(-20deg);opacity:0}to{transform:none;opacity:1}}'+
'#dn-ch{margin:2px 0 4px}#dn-ch p{margin:0 0 10px;color:#53624f;font-size:14.5px;line-height:1.4;font-weight:500;text-transform:none;letter-spacing:0}'+
'#dn-ch .cc{display:flex;gap:8px;overflow-x:auto;padding:2px 0 6px;scrollbar-width:none;-webkit-overflow-scrolling:touch}#dn-ch .cc::-webkit-scrollbar{display:none}'+
'#dn-ch .cc a{flex:0 0 auto;padding:7px 13px;border-radius:999px;background:#fff;border:1.5px solid #dbe3d4;color:#1d4a2a!important;font-size:13px;font-weight:700;text-decoration:none!important;text-transform:none;letter-spacing:0;white-space:nowrap;animation:dnChip .45s ease both;transition:background .15s,border-color .15s}#dn-ch .cc a:hover,#dn-ch .cc a:active{background:#eef3e8;border-color:#3f7d3a}@keyframes dnChip{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:none}}'+
'.dn-rk{position:absolute;left:8px;bottom:8px;z-index:3;display:inline-flex;align-items:baseline;gap:4px;padding:5px 9px;border-radius:999px;background:#1d4a2a;color:#fff;font:900 13px/1 Archivo,Arial,sans-serif;box-shadow:0 4px 12px rgba(16,40,26,.3);pointer-events:none;overflow:hidden}.dn-rk small{font:700 10.5px/1 Figtree,Arial,sans-serif;letter-spacing:.02em;opacity:.9}'+
'.dn-rk.r1{background:linear-gradient(135deg,#f4c95d,#e0a326 55%,#c98a35);color:#10281a}.dn-rk.r1:after{content:"";position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.65),transparent);transform:skewX(-20deg);animation:dnSweep 3.2s ease-in-out infinite}'+
'.dn-ppk{display:block;margin-top:3px;font-size:12px;color:#6b7a67;font-weight:600}'+
'.template-category .js-product-table .item{transition:transform .2s ease,box-shadow .2s ease}@media(hover:hover){.template-category .js-product-table .item:hover{transform:translateY(-4px)}}.template-category .js-product-table .item:active{transform:scale(.98)}'+
'#dn-cb{margin:6px 0 22px}#dn-cb>a,#dn-cb>div{display:block;padding:16px;border-radius:22px;background:radial-gradient(120% 90% at 100% 0%,#4b8f45 0%,#1d4a2a 45%,#10281a 100%);color:#fff!important;text-decoration:none!important;box-shadow:0 14px 30px rgba(16,40,26,.25);cursor:pointer}'+
'#dn-cb i{display:block;font-style:normal;font-size:11px;font-weight:800;letter-spacing:.14em;color:#e0a326;margin:0 0 6px}#dn-cb b{display:block;font:900 19px/1.2 Archivo,Arial,sans-serif;margin:0 0 4px}#dn-cb small{display:block;color:#bfe0a8;font-size:13.5px;line-height:1.35;margin:0 0 12px}'+
'#dn-cb .th{display:flex;gap:8px;margin:0 0 12px}#dn-cb .th span{flex:1 1 0;min-width:0;background:rgba(255,255,255,.08);border-radius:14px;padding:6px;text-align:center}#dn-cb .th img{display:block;width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px;background:#fff;margin:0 0 5px}#dn-cb .th em{display:block;font-style:normal;font-size:11.5px;font-weight:700;line-height:1.2;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#dn-cb .th u{display:block;text-decoration:none;font-size:12px;font-weight:900;color:#f4c95d}'+
'#dn-cb .one{display:flex;gap:12px;align-items:center;margin:0 0 12px}#dn-cb .one img{flex:0 0 92px;width:92px;height:92px;border-radius:14px;object-fit:cover;background:#fff}'+
'#dn-cb .go{display:inline-block;background:linear-gradient(135deg,#f4c95d,#e0a326 55%,#c98a35);color:#10281a;font-weight:900;font-size:14px;border-radius:999px;padding:11px 18px}'+
'@media(min-width:768px){#dn-cb .th{max-width:560px}#dn-cb>a,#dn-cb>div{display:flex;align-items:center;gap:24px}#dn-cb .tx{flex:1}}';
d.head.appendChild(st);B.classList.add('dn-cat');
function esc(s){return String(s).replace(/[&<>"]/g,function(x){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[x]})}
function fmt(n){return'$'+Math.round(n).toLocaleString('es-AR')}
/* 1. encabezado */
var ph=d.querySelector('.category-banner .page-header')||d.querySelector('.page-header');
if(ph&&c){var h1=ph.querySelector('h1');if(h1&&window.dnIco&&!h1.querySelector('.dn-chi')){var ic=d.createElement('span');ic.className='dn-chi';ic.innerHTML=window.dnIco(path);h1.insertBefore(ic,h1.firstChild)}
var w=d.createElement('div');w.id='dn-ch';var h='<p>'+esc(c[0])+'</p>';if(c[1]){h+='<div class="cc">'+c[1].split('|').map(function(t,i){var p=t.split('='),q=p[1]||p[0];return'<a style="animation-delay:'+(i*.06)+'s" href="/search/?q='+encodeURIComponent(q.toLowerCase())+'">'+esc(p[0])+'</a>'}).join('')+'</div>'}w.innerHTML=h;ph.appendChild(w)}
/* 2. ranking + precio por 100 g */
var tb=d.querySelector('.js-product-table');if(!tb)return;
var qs=location.search,ranked=!/sort_by=(?!best-selling)/.test(qs)&&!/[?&](min_price|max_price|variant|filter)/i.test(qs)&&!/\/page\/\d/.test(location.pathname);
function grams(n){var m=n.toLowerCase().match(/(?:x|por|de)\s*(\d+(?:[.,]\d+)?)\s*(kg|kilo|kilos|grs?|g)\b/)||n.toLowerCase().match(/(\d+(?:[.,]\d+)?)\s*(kg|grs?|g)\b/);if(!m){return/de kilo|x kilo|por kilo/.test(n.toLowerCase())?1000:0}var v=parseFloat(m[1].replace(',','.'));return/k/.test(m[2])?v*1000:v}
function proc(){var it=[].slice.call(tb.querySelectorAll('.js-item-product[data-product-id]')).filter(function(x){return x.getAttribute('data-product-id')});
it.forEach(function(x,i){if(x.getAttribute('data-dn'))return;x.setAttribute('data-dn','1');
if(ranked&&i<3){var im=x.querySelector('.js-item-image-padding');if(im){var r=d.createElement('span');r.className='dn-rk r'+(i+1);r.innerHTML='#'+(i+1)+' <small>'+(i?'en ventas':'más vendido')+'</small>';im.appendChild(r)}}
var nm=(x.querySelector('.js-item-name')||{}).textContent||'',g=grams(nm),pc=x.querySelector('.item-price-container');if(g>100&&g<=5000&&pc){var v={};try{v=JSON.parse(x.querySelector('[data-variants]').getAttribute('data-variants'))[0]||{}}catch(e){}if(v.price_number){var s=d.createElement('span');s.className='dn-ppk';s.textContent=fmt(v.price_number/g*100)+' c/100 g';pc.appendChild(s)}}})
return it}
var items=proc();if(window.MutationObserver)new MutationObserver(function(){proc()}).observe(tb,{childList:true});
/* 3. tarjeta de combos intercalada */
if(items.length<3)return;
var after=items[Math.min(items.length,matchMedia('(min-width:768px)').matches?5:4)-1];
var cb=d.createElement('div');cb.id='dn-cb';cb.className='col-12';
if(slug==='combos'){cb.innerHTML='<div data-dn-test="1" role="button"><div class="tx"><i>¿NO SABÉS CUÁL ELEGIR?</i><b>¿Qué combo es para vos?</b><small>Respondé 3 preguntas y te recomendamos el programa que mejor se adapta a lo que buscás.</small></div><span class="go">Hacer el test →</span></div>';after.parentNode.insertBefore(cb,after.nextSibling);return}
function draw(L){if(!L||!L.length||d.getElementById('dn-cb'))return;var dia=slug==='diabetico'&&L.filter(function(x){return/diabet/.test(x.u)})[0];
if(dia){cb.innerHTML='<a href="'+dia.u+'"><div class="tx"><i>PROGRAMA DE 30 DÍAS</i><div class="one"><img alt="" loading="lazy" src="'+dia.i+'"><div><b>Combo Diabetes</b><small>Hierbas + tintura madre para acompañar el cuidado de tu glucemia, junto con el tratamiento de tu médico.</small></div></div></div><span class="go">Ver el combo · '+fmt(dia.p)+' →</span></a>'}
else{cb.innerHTML='<a href="/combos/"><div class="tx"><i>LOS MÁS ELEGIDOS</i><b>Programas de 30 días</b><small>Hierbas + tintura madre: todo lo que necesitás en un solo pedido.</small><div class="th">'+L.slice(0,3).map(function(x){return'<span><img alt="" loading="lazy" src="'+x.i+'"><em>'+esc(x.n)+'</em><u>'+fmt(x.p)+'</u></span>'}).join('')+'</div></div><span class="go">Ver todos los combos →</span></a>'}
after.parentNode.insertBefore(cb,after.nextSibling)}
var K='dnCmb1',L;try{L=JSON.parse(sessionStorage.getItem(K))}catch(e){}
if(L)return draw(L);
fetch('/combos/').then(function(r){return r.text()}).then(function(h){var p=new DOMParser().parseFromString(h,'text/html');L=[].slice.call(p.querySelectorAll('.js-item-product[data-product-id]')).filter(function(x){return x.getAttribute('data-product-id')}).map(function(x){var v={};try{v=JSON.parse(x.querySelector('[data-variants]').getAttribute('data-variants'))[0]||{}}catch(e){}var a=x.querySelector('a[href*="/productos/"]'),n=((x.querySelector('.js-item-name')||{}).textContent||'').trim().split(/\s[-–(]|\(/)[0].trim();return{n:n.length>26?n.slice(0,25)+'…':n,u:a?a.getAttribute('href').split('?')[0]:'/combos/',p:v.price_number||0,i:(v.image_url||'').replace(/-1024-1024(\.\w+)$/,'-240-0$1')}}).filter(function(x){return x.p&&x.i}).slice(0,12);try{sessionStorage.setItem(K,JSON.stringify(L))}catch(e){}draw(L)}).catch(function(){})
}();
