/* Notas de Naturalmente Media publicadas como artículos del blog de Tiendanube (/blog/posts/<slug>-<id>): ahí el
   texto viene en la página, así que lo leen Google y las vistas previas al compartir. Los links viejos
   (/naturalmente-media/?nota=<slug>) siguen andando: al abrirlos o tocarlos llevan al artículo.
   La lista (window.dnNB: slug -> id) la arma build.sh desde contenido/notas-blog.json. */
!function(){var W=window,d=document;if(W.__dnNBr)return;W.__dnNBr=1;var M=W.dnNB||{};
W.dnNotaBlog=function(s){var x=M[s];return x?'/blog/posts/'+s+'-'+x:null};
var q=(location.search.match(/[?&]nota=([^&#]+)/)||[])[1];
if(q&&/^\/naturalmente-media\/?$/.test(location.pathname)){try{q=decodeURIComponent(q)}catch(e){}var u=W.dnNotaBlog(q);if(u){location.replace(u);return}}
d.addEventListener('click',function(e){if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey)return;var a=e.target&&e.target.closest&&e.target.closest('a[href*="nota="]');if(!a)return;
var h=a.getAttribute('href')||'',m=/naturalmente-media\/?\?(?:[^#]*&)?nota=([^&#]+)/.exec(h);if(!m)return;var s=m[1];try{s=decodeURIComponent(s)}catch(x){}var u=W.dnNotaBlog(s);if(!u)return;e.preventDefault();e.stopPropagation();location.href=u},true);
}();
