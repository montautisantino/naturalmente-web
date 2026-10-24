#!/usr/bin/env node
/* ===========================================================================
   Control automático del diseño de computadora (lo corre build.sh).
   Frena el armado (sale con error) si algo del diseño de computadora pudiera
   llegar al celular:
     1. estilos/escritorio.css: TODO tiene que estar dentro de un
        @media (min-width: N px) con N >= 1024, sin comas, "or" ni "not"
        (que harían que la regla también valga en pantallas chicas).
        Nada suelto afuera: ni reglas, ni @import, @font-face, @keyframes, etc.
     2. build.sh: el módulo 61 (escritorio) va solo en su parte propia, nunca en
        el núcleo ni en las partes de cada página.
     3. (con --final) el módulo generado empieza con el chequeo de ancho y el
        núcleo solo pide dn-escritorio.min.js si la pantalla mide 1024 px o más.
   Uso: node herramientas/control-escritorio.js [--final]
   =========================================================================== */
var fs=require('fs'),path=require('path');
var R=path.join(__dirname,'..'),errs=[];
function err(m){errs.push(m)}

/* ---- 1. hoja de estilos ---- */
var css=fs.readFileSync(path.join(R,'estilos/escritorio.css'),'utf8');
/* recorre el CSS respetando comentarios y textos entre comillas */
function topLevel(s){var out=[],i=0,n=s.length,depth=0,start=0,head='';
  function line(k){return s.slice(0,k).split('\n').length}
  while(i<n){var c=s[i];
    if(c==='/'&&s[i+1]==='*'){var e=s.indexOf('*/',i+2);if(e<0){err('comentario sin cerrar (línea '+line(i)+')');return out}i=e+2;continue}
    if(c==='"'||c==="'"){var j=i+1;while(j<n&&s[j]!==c){if(s[j]==='\\')j++;j++}i=j+1;continue}
    if(c==='{'){if(depth===0){head=s.slice(start,i);out.push({head:head.replace(/\/\*[\s\S]*?\*\//g,'').trim(),line:line(i)})}depth++;i++;continue}
    if(c==='}'){depth--;if(depth<0){err('llave "}" de más (línea '+line(i)+')');return out}if(depth===0)start=i+1;i++;continue}
    if(c===';'&&depth===0){var st=s.slice(start,i).replace(/\/\*[\s\S]*?\*\//g,'').trim();if(st)err('declaración suelta afuera de @media: "'+st.slice(0,60)+'" (línea '+line(i)+')');start=i+1;i++;continue}
    i++}
  if(depth!==0)err('llaves sin cerrar al final del archivo');
  var rest=s.slice(start).replace(/\/\*[\s\S]*?\*\//g,'').trim();if(rest)err('texto suelto al final: "'+rest.slice(0,60)+'"');
  return out}
var blocks=topLevel(css);
if(!blocks.length)err('estilos/escritorio.css no tiene ningún bloque @media');
blocks.forEach(function(b){
  var h=b.head,m=/^@media\s+([\s\S]+)$/i.exec(h);
  if(!m){err('regla afuera de @media (línea '+b.line+'): "'+h.slice(0,70)+'"');return}
  var q=m[1].trim().toLowerCase();
  if(/,/.test(q))err('@media con coma (vale para cualquiera de las dos condiciones) en línea '+b.line+': "'+q+'"');
  if(/(^|\s|\))(or|not)(\s|\(|$)/.test(q))err('@media con "or"/"not" en línea '+b.line+': "'+q+'"');
  var mw=/\(\s*min-width\s*:\s*(\d+(?:\.\d+)?)px\s*\)/.exec(q);
  if(!mw)err('@media sin (min-width: ...px) en línea '+b.line+': "'+q+'"');
  else if(parseFloat(mw[1])<1024)err('@media con min-width menor a 1024 px en línea '+b.line+': "'+q+'"');
  if(/\b(min|max)-device-width\b|\bwidth\s*[<>]/.test(q))err('@media con una condición de ancho no admitida en línea '+b.line+': "'+q+'"');
});

/* ---- 2. el módulo 61 va solo en su parte ---- */
var sh=fs.readFileSync(path.join(R,'build.sh'),'utf8');
['CORE','CUENTA','PEDIDO','HOME_P','MEDIA','LISTADO','PRODUCTO'].forEach(function(v){var m=new RegExp('^'+v+'="([^"]*)"','m').exec(sh);if(!m){err('build.sh: no encuentro la lista '+v);return}
  if(m[1].split(/\s+/).indexOf('61')>=0)err('build.sh: el módulo 61 (escritorio) no puede ir en '+v+': tiene que ir solo en ESCRITORIO')});
var me=/^ESCRITORIO="([^"]*)"/m.exec(sh);if(!me||me[1].trim()!=='61')err('build.sh: ESCRITORIO tiene que ser exactamente "61"');

/* ---- 3. control final (después de armar) ---- */
if(process.argv.indexOf('--final')>=0){
  var mod=fs.readFileSync(path.join(R,'src/61-escritorio.js'),'utf8');
  var GATE='!function(){var d=document,W=window;if(W.__dnDk||!W.matchMedia)return;var q=W.matchMedia("(min-width:1024px)");if(!q.matches)return;';
  if(mod.indexOf(GATE)<0||mod.indexOf(GATE)>400)err('src/61-escritorio.js no empieza con el chequeo de ancho (¿se editó a mano? se genera con estilos/compilar.js)');
  var core=fs.readFileSync(path.join(R,'build/dn.js'),'utf8'),k=core.indexOf('dn-escritorio.min.js');
  if(k<0)err('el núcleo no tiene el cargador de la parte de computadora');
  else{var pre=core.slice(Math.max(0,k-700),k);if(pre.indexOf("matchMedia('(min-width:1024px)')")<0||pre.indexOf('q.matches')<0)err('el cargador de dn-escritorio.min.js no está protegido por el chequeo de 1024 px');
    if(core.indexOf('dn-escritorio.min.js',k+1)>=0)err('el núcleo nombra dn-escritorio.min.js más de una vez')}
  ['home','media','listado','producto','cuenta','pedido'].forEach(function(p){var f=path.join(R,'build/dn-'+p+'.js');if(fs.existsSync(f)&&/dn-dk-css|__dnDk/.test(fs.readFileSync(f,'utf8')))err('la parte '+p+' contiene código de computadora')});
  if(/dn-dk-css|__dnDk/.test(core.split('cargador de la parte de computadora')[0]))err('el núcleo contiene código de computadora (fuera del cargador)');
}

if(errs.length){console.error('\n✗ CONTROL DE COMPUTADORA: no se arma, esto podría afectar al celular:\n  - '+errs.join('\n  - ')+'\n');process.exit(1)}
console.log('✓ control de computadora: '+blocks.length+' bloque(s) @media, todo dentro de 1024 px o más'+(process.argv.indexOf('--final')>=0?' · módulo y cargador protegidos':''));
