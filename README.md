# naturalmente-web

Código JavaScript de **dieteticasnaturalmente.com.ar** que no es crítico para la venta.
Se carga desde Tiendanube (código del sello) con una sola línea:

```html
<script src="https://cdn.jsdelivr.net/gh/montautisantino/naturalmente-web@vN/dist/dn.min.js" defer></script>
```

- `src/` — cada función por separado.
- `dist/dn.min.js` — núcleo (todas las páginas): 404/búsqueda vacía, videos, Media en todas las páginas, buscador, menú, test, footer. Al final carga la parte de la página.
- `dist/dn-home.min.js`, `dn-listado.min.js` (categorías y búsqueda), `dn-producto.min.js`, `dn-media.min.js` — partes por tipo de página. El núcleo las carga con su huella SRI (escrita dentro del núcleo al armarlo).
- Qué módulo va en cada parte: ver `build.sh`.

Cada cambio se publica como un commit y recién se activa al actualizar el código del commit en Tiendanube.
El sello carga el archivo con respaldo: si `cdn.jsdelivr.net` no responde, prueba `fastly.jsdelivr.net` y después `gcore.jsdelivr.net` (redes distintas). El archivo se protege contra doble carga (`window.__dnExt`).
Para armar `dist/`: `./build.sh` (imprime la huella SRI).
El sello verifica la huella (`integrity`, SRI sha384) del archivo: si el contenido no coincide exacto, el navegador no lo ejecuta. **En cada versión nueva hay que actualizar en el sello el commit y la huella** (en el `<link rel=preload>` y en el cargador).
Lo que toca la compra (botón COMPRAR AHORA, carrito, landings) queda dentro de Tiendanube.

`sello/` — copia de referencia de código que vive **dentro** de Tiendanube (crítico para la venta), no se carga desde acá.
