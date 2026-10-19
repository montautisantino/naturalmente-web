# naturalmente-web

Código JavaScript de **dieteticasnaturalmente.com.ar** que no es crítico para la venta.
Se carga desde Tiendanube (código del sello) con una sola línea:

```html
<script src="https://cdn.jsdelivr.net/gh/montautisantino/naturalmente-web@vN/dist/dn.min.js" defer></script>
```

- `src/` — cada función por separado.
- `dist/dn.js` — todo junto, cada bloque aislado con `try/catch`.
- `dist/dn.min.js` — versión comprimida que carga la tienda.

Cada cambio se publica como una versión nueva (tag `vN`) y recién se activa al actualizar la línea en Tiendanube.
Lo que toca la compra (botón COMPRAR AHORA, carrito, landings) queda dentro de Tiendanube.

`sello/` — copia de referencia de código que vive **dentro** de Tiendanube (crítico para la venta), no se carga desde acá.
