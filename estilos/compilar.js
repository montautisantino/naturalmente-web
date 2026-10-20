// Compila las hojas de estilos legibles a módulos JS:
//   estilos/feed-pulido.css -> src/42-feed-pulido.js (solo portada; B = alcance de la portada)
//   estilos/sistema.css     -> src/43-sistema.js     (todas las páginas)
var fs=require('fs');
function min(css){return css.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\bB /g,'html body.template-home ').replace(/\s+/g,' ').replace(/\s*([{};,>])\s*/g,'$1').replace(/;}/g,'}').trim()}
var feed=min(fs.readFileSync(__dirname+'/feed-pulido.css','utf8'));
fs.writeFileSync(__dirname+'/../src/42-feed-pulido.js','/* Naturalmente Feed: sistema visual unificado (generado desde estilos/feed-pulido.css; no editar a mano) */\n'+
'!function(){var d=document;if(!d.body.classList.contains("template-home")||d.getElementById("dn-fp-css"))return;\n'+
'var s=d.createElement("style");s.id="dn-fp-css";s.textContent='+JSON.stringify(feed)+';d.head.appendChild(s);\n'+
'/* títulos de Tiendanube cargados en mayúsculas ("COMBOS DESTACADOS") pasan a mayúscula inicial */\n'+
'function sc(){[].forEach.call(d.querySelectorAll(".section-featured-home h2.section-title"),function(h){var t=h.textContent.trim();if(t.length>3&&t===t.toUpperCase())h.textContent=t.charAt(0)+t.slice(1).toLowerCase()})}sc();setTimeout(sc,1500);\n'+
'}();\n');
var sis=min(fs.readFileSync(__dirname+'/sistema.css','utf8'));
fs.writeFileSync(__dirname+'/../src/43-sistema.js','/* Sistema visual de todo el sitio (generado desde estilos/sistema.css; no editar a mano) */\n'+
'!function(){var d=document;if(d.getElementById("dn-sis-css"))return;var s=d.createElement("style");s.id="dn-sis-css";s.textContent='+JSON.stringify(sis)+';d.head.appendChild(s)}();\n');
