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


## Diseño de computadora (desde el 24/10/2026)

- `estilos/escritorio.css` + `estilos/escritorio.js` → `src/61-escritorio.js` (lo genera `estilos/compilar.js`) → parte `dist/dn-escritorio.min.js`.
- Regla de oro: **todo** el CSS va dentro de `@media (min-width:1024px)`. `herramientas/control-escritorio.js` (lo corre `build.sh`) frena el armado si algo queda afuera, si hay comas/"or"/"not" en la condición o si el módulo 61 aparece en otra parte.
- El núcleo descarga `dn-escritorio.min.js` **solo** si la pantalla mide 1024 px o más (cargador al final de `build/dn.js`). En el celular no se descarga nada. Las partes de cada página no cambian (comprobar que su SRI sea igual al publicado).
- Etapa 1 (publicada 24/10, commit c5ec806): Naturalmente Media y notas del blog (`html.dnmd`). Grilla: 1192 px centrados, alineada con el encabezado.
- 24/10 (fa48533), todas las páginas: sin la fila de navegación original de Tiendanube (botón "Categorías" con las categorías crudas) y buscador estirado hasta los íconos. El menú propio (☰) tiene todo.
- Etapa 2 (24/10, aef5953): grilla de 1116 px en todo el sitio (encabezado y `.container` de la plantilla), encabezado fijo sin la barra rápida del celular, tienda y "Lo que viste hace poco" centrados, filtro de precio de las categorías como barra compacta, fichas con foto y compra lado a lado desde 1024 px.

### Foto del celular (antes / después de publicar)
`herramientas/foto-celular.js`: en el navegador en modo celular (375×812, recargar), `dnFoto('antes1')` y `dnFoto('antes2')` en cada página clave (inicio, tienda, /combos/, ficha de combo, ficha común, Media, nota, episodio, escritos) para medir el ruido; publicar; `dnFoto('despues')`. Un cambio real es una clave distinta de las DOS fotos de antes. Esperar ~6 s a que la página termine de cargar (con menos aparecen diferencias falsas). En el celular `dk` tiene que dar siempre `false`.

## Publicar una versión (sello)
1. `./build.sh`, commit y push a `main`. Calentar jsDelivr pidiendo los archivos del commit nuevo desde los 3 servidores y comprobar la huella del núcleo.
2. Admin → Tienda online → Diseño → **Editar diseño actual** (`/admin/themes/settings/installations/3905649`) → `textarea#text-custom_seal_code`.
3. Reemplazar en todo el valor el SHA viejo por el nuevo (aparece 2 veces) y la huella del núcleo vieja por la nueva (2 veces). Copia de respaldo en el `localStorage` del admin: `dnSealExtN` (valor completo) y `dnSealBaseN` (la primera parte, con el cargador).
4. **Publicar cambios**. Si se queda en "Cargando tu tienda" sin guardar, recargar la página del admin y repetir. Verificar en el HTML de la tienda que figure el SHA nuevo.
5. Volver atrás: poner en el textarea `dnSealExt` de la versión anterior y publicar (2 minutos).

Versión publicada: 212 = `aef5953` (núcleo `sha384-0/SNeFQNrBngDIK/+bQDukCmBuTLbRwIwEasKuMetAppeWtZSYhrPQ4aCOC/MkaN`). 211 = `fa48533`, 210 = `c5ec806`, 209 = `40ed931`.

Importante: en `dist/` solo van los `.min.js`. Si existiera el `.js` sin comprimir con el mismo nombre, jsDelivr puede servir su propia versión comprimida y la huella SRI no coincide (el navegador la rechaza). Los intermedios quedan en `build/` (ignorado).
