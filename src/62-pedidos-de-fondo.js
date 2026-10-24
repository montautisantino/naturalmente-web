/* Pedidos de fondo (24/10/2026). Algunos bloques se arman trayendo otra página entera de la tienda (Media, combos,
   Mi cuenta, más vendidos): son 90-130 KB cada una. Si se piden mientras la página todavía carga, compiten con las fotos
   y con el código de la compra (sobre todo en el celular). Por eso, para lo que no se ve al entrar:
   - __dnIdle(f): corre f cuando la página terminó de cargar (evento load) y el navegador está libre. Tope: 8 s.
   - __dnGet(url): trae el HTML de una página UNA sola vez por visita; si dos bloques piden la misma, comparten el pedido. */
!function(W){if(W.__dnIdle)return;
W.__dnIdle=function(f){var k=0,g=function(){if(k++)return;var r=W.requestIdleCallback;if(r)r(function(){f()},{timeout:3000});else setTimeout(f,300)};if(document.readyState==='complete')g();else{W.addEventListener('load',g);setTimeout(g,8000)}};
var G={};W.__dnGet=function(u){return G[u]||(G[u]=fetch(u).then(function(r){return r.text()}).catch(function(e){delete G[u];throw e}))};
}(window);
