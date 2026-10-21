/* Productos que se venden "por 10 g", "por 50 g" o "por 100 g": selector de cantidad en gramos (1, 2, 3, 5 y 10 unidades,
   por ej. 100 g, 200 g, 300 g, 500 g y 1 kg). Cada opción pone la cantidad del formulario (1 unidad = la medida del producto) y muestra el precio total; la cantidad libre del
   tema sigue estando para quien quiera otro número. Respeta el stock de la variante. */
!function(){var d=document,W=window,B=d.body;if(W.__dnGr||!B.classList.contains('template-product'))return;
var SP=d.getElementById('single-product');if(!SP)return;var h1=SP.querySelector('h1'),nm=(h1&&h1.textContent||'').trim();
var GM=/(?:^|[\s\-(])(?:por|x)?\s*(10|50|100)\s*(?:g|gr|grs|gm|gms|gramos)\b/i.exec(nm);if(!GM||/^combo/i.test(nm))return;var U=+GM[1];
var F=SP.querySelector('form.js-product-form'),q=F&&F.querySelector('input[name=quantity]'),PD=d.getElementById('price_display');if(!F||!q||!PD||d.getElementById('dn-gr'))return;W.__dnGr=1;
var gl=function(g){return g>=1000?(g/1000).toLocaleString('es-AR')+' kg':g+' g'};var OP=[1,2,3,5,10].map(function(k){return[k,gl(k*U)]});
var num=function(t){return parseFloat(String(t||'').replace(/[^\d,]/g,'').replace(',','.'))||0},$=function(n){return'$'+Math.round(n).toLocaleString('es-AR')};
var FREE=(function(){var m=(B.textContent.match(/env[ií]o gratis (?:desde|superando los) \$\s*([\d.]+)/i)||[])[1];return m?num(m):65000})();
function stock(){try{var v=JSON.parse((F.querySelector('[data-variants]')||d.querySelector('[data-variants]')).getAttribute('data-variants'));return v.length===1&&v[0].stock!=null?+v[0].stock:null}catch(e){return null}}
var st=d.createElement('style');st.textContent=
'#dn-gr{margin:2px 0 14px}#dn-gr p{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#3f7d3a;margin:0 0 10px}'+
'#dn-gr .g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}#dn-gr button{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-height:62px;padding:8px 4px;border:2px solid #dbe3d4;border-radius:12px;background:#fff;color:#16261b;font:inherit;cursor:pointer;transition:border-color .2s,background .2s,transform .15s}'+
'#dn-gr button:active{transform:scale(.97)}#dn-gr button.on{border-color:#3f7d3a;background:#f3f8ef}#dn-gr button b{font:900 16px/1.1 Archivo,Arial,sans-serif;color:#15301f}#dn-gr button span{font-size:13px;font-weight:700;color:#1d4a2a}#dn-gr button[disabled]{opacity:.4;cursor:default}'+
'#dn-gr button i{position:absolute;top:-9px;left:50%;transform:translateX(-50%);white-space:nowrap;font-style:normal;background:#f0c04f;color:#15301f;font-size:10.5px;font-weight:900;letter-spacing:.04em;border-radius:999px;padding:2px 7px}'+
'#dn-gr small{display:block;margin-top:8px;font-size:12.5px;color:#53624f}@media(min-width:768px){#dn-gr .g{grid-template-columns:repeat(5,1fr)}}';
d.head.appendChild(st);
var w=d.createElement('div');w.id='dn-gr';w.setAttribute('role','radiogroup');w.setAttribute('aria-label','Elegí cuánto llevar');
var row=q.closest('.row')||q.parentNode;row.parentNode.insertBefore(w,row);
function draw(){var p=num(PD.textContent),s=stock(),n=+q.value||1;
var h='<p>Elegí cuánto llevar</p><div class="g">'+OP.map(function(o){var t=p*o[0],off=s!=null&&s<o[0];return'<button type="button" data-q="'+o[0]+'"'+(o[0]===n?' class="on" aria-checked="true"':' aria-checked="false"')+(off?' disabled':'')+'>'+(t>=FREE&&p*1<FREE&&!off?'<i>ENVÍO GRATIS</i>':'')+'<b>'+o[1]+'</b><span>'+(p?$(t):'')+'</span></button>'}).join('')+'</div>'+
'<small>'+(OP.some(function(o){return o[0]===n})?'Se vende por '+U+' g.':'Llevás '+gl(n*U)+'.')+' Si querés otra cantidad, usá el selector de abajo (1 = '+U+' g).</small>';
if(w.innerHTML!==h)w.innerHTML=h}
w.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||b.disabled)return;q.value=b.getAttribute('data-q');['input','change'].forEach(function(t){q.dispatchEvent(new Event(t,{bubbles:true}))});draw()});
F.addEventListener('click',function(e){if(e.target.closest('.js-quantity-up,.js-quantity-down'))setTimeout(draw,60)});q.addEventListener('input',draw);q.addEventListener('change',draw);
new MutationObserver(draw).observe(PD,{childList:true,characterData:true,subtree:true});draw();
/* el título "Cantidad" del tema aclara la unidad */
var lb=[].filter.call(row.querySelectorAll('label, .form-label, span'),function(x){return/^\s*cantidad\s*$/i.test(x.textContent)})[0];if(lb)lb.textContent='Cantidad (x '+U+' g)';
}();
