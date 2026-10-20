// Compila estilos/feed-pulido.css -> src/42-feed-pulido.js (B = alcance de la portada)
var fs=require('fs');
var css=fs.readFileSync(__dirname+'/feed-pulido.css','utf8').replace(/\/\*[\s\S]*?\*\//g,'').replace(/\bB /g,'html body.template-home ').replace(/\s+/g,' ').replace(/\s*([{};,>])\s*/g,'$1').replace(/;}/g,'}').trim();
var js='/* Naturalmente Feed: sistema visual unificado (generado desde estilos/feed-pulido.css; no editar a mano) */\n'+
'!function(){var d=document;if(!d.body.classList.contains("template-home")||d.getElementById("dn-fp-css"))return;\n'+
'var s=d.createElement("style");s.id="dn-fp-css";s.textContent='+JSON.stringify(css)+';d.head.appendChild(s);\n'+
'/* títulos de Tiendanube cargados en mayúsculas ("COMBOS DESTACADOS") pasan a mayúscula inicial */\n'+
'function sc(){[].forEach.call(d.querySelectorAll(".section-featured-home h2.section-title"),function(h){var t=h.textContent.trim();if(t.length>3&&t===t.toUpperCase())h.textContent=t.charAt(0)+t.slice(1).toLowerCase()})}sc();setTimeout(sc,1500);\n'+
'}();\n';
fs.writeFileSync(__dirname+'/../src/42-feed-pulido.js',js);
