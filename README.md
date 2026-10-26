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

`sello/` — código que vive **dentro** de Tiendanube (crítico para la venta), no se carga desde acá.
- `sello/completo.html`: **copia completa y exacta** del sello (desde la versión 213), con `{{SHA}}` y `{{SRI}}` en lugar del commit y la huella del núcleo. `python3 herramientas/sello.py <commit>` arma el sello exacto de cualquier versión publicada e imprime su huella SHA-256 (la 213 da `965d2a7e…37ca`, igual a la del admin). Si se cambia otra parte del sello, actualizar este archivo.
- Los otros archivos de `sello/` son pedazos viejos de referencia (20/10/2026); la fuente es `completo.html`.
- El sello sale en el HTML de todas las páginas (es público): no tiene mails, claves ni datos de clientes, y así tiene que seguir.

## Seguridad (revisión del 24/10/2026)
- En el repositorio no hay contraseñas, claves ni tokens (revisados los 331 cambios). Los programas de `herramientas/` que usan la API de Tiendanube leen la clave de un archivo aparte que **nunca** se sube (`--token-file`).
- La web carga el código fijado a un commit y con huella SRI: aunque alguien entrara a GitHub, no puede cambiar lo que corre en la tienda (el navegador rechaza un archivo distinto). Lo único que cambia el código de la web es el sello, en el admin de Tiendanube.
- Todo lo que está acá es público. Por eso: los mails autorizados de la planilla van como huella (`hh` en `src/34-planilla.js`), el contador de ventas se guarda redondeado como lo muestra la web (`herramientas/ventas.md`) y nunca se suben datos de clientes, pedidos, costos ni márgenes.
- Pendiente (necesita a Santi): pasar el repositorio a una organización de GitHub de la empresa, con historial limpio (en el historial viejo quedaron el mail personal y los números exactos de ventas al 21/10).

## Notas desde Naturalmente Gestión (desde el 26/10/2026)
Santi escribe o revisa las notas en su app local (carpeta `NaturalmenteGestion`, archivo `media_notas.json`) y las pasa a **"Para publicar"**. La tarea programada "Publicar notas de Media" (todos los días) las sube: nota → `contenido/notas-equipo.json` (cuerpo HTML de la app → texto con `## ` para subtítulos y pasos `1. ` en líneas seguidas) → `notas-equipo.py` → `notas-paginas.py armar` (con `build/productos-nombres.json` armado desde `notas/paginas-equipo.json`, si no los nombres de productos quedan vacíos en todas) → `blog --solo <slug>` → `mapa-blog` → `indice-media.py --publicar` → `notas-categorias.py` → `build.sh` → commit/push → sello. Al final la nota queda "Publicada" con su link en la app. Las notas ya publicadas que se editan en la app ("cambios sin publicar") no se tocan solas: se avisan.

## Notas y Google (desde la versión 215)
- **Índice dentro de Media:** `herramientas/indice-media.py --token-file F --publicar` pone en el HTML de la página de Media (Tiendanube, id 3831425) un link a cada nota por categoría (`<div class="dm-idx" id="dm-indice">`, antes del aviso de WhatsApp). Google y quien no tiene JavaScript lo ven; nuestro código lo saca (`src/03`) y Escritos se ve igual. **Correrlo cada vez que se publiquen notas nuevas en el blog.** La API de páginas solo acepta el formato `page.i18n.es_AR` (con campos sueltos responde 500) y guarda los saltos de línea como `\r\n`.
- **Escritos y Videos:** cada categoría/programa tiene su link (`?escritos&c=Cocina`, `?videos&p=…`) y el botón atrás vuelve al anterior sin recargar (`src/35`, pushState + popstate).
- **Notas en las categorías de la tienda:** `herramientas/notas-categorias.py --token-file F` elige 4 notas por categoría (tema del título + productos que menciona; API solo lectura) → `contenido/notas-categorias.json` → `build.sh` (`window.dnNC`) → `src/63` (bloque "Para leer" después de las primeras filas completas de productos; no va en /productos/ ni en búsquedas). Volver a correrlo cuando haya notas nuevas.

## Inicio de Media (desde la versión 217)
Pedido de Santi (24/10): todo con tapa (foto o video), los temas integrados al diseño de Media y más lugar para los videos. `src/35` arma, sin pestañas:
- **Portada:** tapa con el video destacado (grande, con la marca, botones "Ver video" / "Todos los videos" y los números de Media) · "Seguí donde quedaste" y "Tus notas guardadas" · "Más videos" (tarjetas grandes; en la compu grilla de 3) · la nota más nueva · "Programas" (cada uno con la foto de su último video, cantidad y de qué se trata) · "Para hoy" (una nota práctica distinta cada día, con su foto y Compartir por WhatsApp) · "Notas para leer": los temas son **círculos con foto** (como los destacados de Instagram) que filtran la lista ahí mismo, sin cambiar de página · aviso de WhatsApp.
- **Videos** (`?videos`) y **Escritos** (`?escritos`) también abren con tapa: el último video del programa elegido / la foto de la última nota del tema elegido, con el nombre como título. Programas y temas en círculos con foto; el título de la pestaña cambia con lo elegido; botón atrás sin recargar.
- El video de la tapa es el que tiene `dest:1` en `src/31` (hoy: Diego en ¡Qué Mañana!, Canal 9). Para cambiarlo, mover `dest:1` a otro episodio; si ninguno lo tiene, va el más nuevo. `th:'hq'` = YouTube no tiene la foto grande de ese video (se usa la común). Si la foto grande no existe, YouTube manda una gris de 120 px sin error: `src/35` la detecta y la cambia.
- Las filas que se deslizan de costado piden todas sus fotos cuando aparecen en pantalla (si no, las tapadas a la derecha se ven vacías un momento al deslizar).
- `src/64` (parte Media): botón **Guardar** en cada nota y registro de hasta dónde se leyó (parte del texto que pasó la mitad de la pantalla). Todo queda en el `localStorage` de cada persona (`dnNG` guardadas, `dnNL` leídas): nada viaja a ningún lado.
- **No** va un bloque de productos en Media: Santi no quiere vender de forma directa ahí (24/10). Los productos siguen dentro de cada nota ("Productos mencionados").

## Velocidad en el celular (24/10/2026)
Varios bloques se arman trayendo otra página entera de la tienda (90-130 KB cada una). Medido en la ficha de un combo, en la primera página de la visita: Media, /combos/ y los más vendidos (+ 2 veces /account/ si el cliente tiene sesión) se pedían junto con las fotos de la página, antes del evento load. Regla desde ahora (`src/62-pedidos-de-fondo.js`, primer módulo del núcleo):
- Si el bloque **no se ve al entrar** (carrito lateral, saludo, episodio al azar, "Los que compran este producto también llevan"), el pedido va dentro de `__dnIdle(f)`: corre cuando la página terminó de cargar y el navegador está libre (tope 8 s).
- Para traer el HTML de una página usar `__dnGet(url)`: si dos bloques piden la misma página en la misma visita, se pide una sola vez (ej.: Media en el inicio; la categoría de la ficha y el carrito vacío).
- Lo que se ve arriba de todo (ranking "#1 más vendido", tamaños, precio por 100 g) se sigue pidiendo enseguida.
- Libros: los precios salen de la categoría Libros (`/educativo/`, una página) y no de la ficha de cada libro (antes, 6 páginas: ~800 KB).
- Media (versión 218): `src/31` arma una lista oculta con las ~240 notas de la planilla (la portada la usa como datos). Las fotos iban en `src` y el navegador las pedía todas apenas se creaban: **~200 fotos de 1200 px, unos 20 MB en cada primera visita** a Media, Videos y Escritos. Ahora van en `data-src` (nadie las ve) y la portada pide 8 fotos al entrar (~1 MB). Las tarjetas piden la foto al tamaño en que se ven (lista 300 px, grilla 800 px). Regla: **nunca** crear `<img src>` en algo que no se va a ver. Pendiente (necesita OK, toca el HTML de la página en Tiendanube): las 5 notas viejas que vienen en el HTML de Media (~0,5 MB) podrían llevar `loading="lazy"`.
- Mejora posible a futuro: la parte del inicio pesa 331 KB (94 KB comprimida); 146 KB son el índice de las notas (`src/45-notas-equipo.js`), que se podría traer aparte solo cuando hace falta.
- Otras mejoras posibles: (1) "Productos mencionados" de cada nota trae la ficha entera de cada producto (5 x ~140 KB) al llegar a esa parte; (2) el sello (dentro de Tiendanube), cuando el carrito tiene algo, trae la ficha de 4 combos recomendados (~580 KB) en la primera página de la visita, antes de que cargue la página. Ese es código de la compra: tocarlo solo con OK de Santi.


## Diseño de computadora (desde el 24/10/2026)

- `estilos/escritorio.css` + `estilos/escritorio.js` → `src/61-escritorio.js` (lo genera `estilos/compilar.js`) → parte `dist/dn-escritorio.min.js`.
- Regla de oro: **todo** el CSS va dentro de `@media (min-width:1024px)`. `herramientas/control-escritorio.js` (lo corre `build.sh`) frena el armado si algo queda afuera, si hay comas/"or"/"not" en la condición o si el módulo 61 aparece en otra parte.
- El núcleo descarga `dn-escritorio.min.js` **solo** si la pantalla mide 1024 px o más (cargador al final de `build/dn.js`). En el celular no se descarga nada. Las partes de cada página no cambian (comprobar que su SRI sea igual al publicado).
- Etapa 1 (publicada 24/10, commit c5ec806): Naturalmente Media y notas del blog (`html.dnmd`). Grilla: 1192 px centrados, alineada con el encabezado.
- 24/10 (fa48533), todas las páginas: sin la fila de navegación original de Tiendanube (botón "Categorías" con las categorías crudas) y buscador estirado hasta los íconos. El menú propio (☰) tiene todo.
- Etapa 2 (24/10, aef5953): grilla de 1116 px en todo el sitio (encabezado y `.container` de la plantilla), encabezado fijo sin la barra rápida del celular, tienda y "Lo que viste hace poco" centrados, filtro de precio de las categorías como barra compacta, fichas con foto y compra lado a lado desde 1024 px.
- Etapa 3 (24/10, 7d49ea7): el Feed (inicio) en una sola columna de 600 px, igual que en el celular (como el feed de una red social, no un "collage"). Cómo funciona (`estilos/escritorio.js`, solo en el inicio):
  - pone `html.dk-feed` (la columna y los ajustes de CSS dependen de esa clase);
  - dentro de `.js-home-sections-container`, las reglas propias de pantalla mediana `(min-width:768px)` se apagan y las de pantalla chica `(max-width:767px)` se copian justo después de su bloque original, dentro de `(min-width:1024px)` (mismo lugar y misma especificidad: el feed queda calculado igual que en el teléfono). Una regla solo se toca si todo lo que marca está dentro del feed, o si todavía no marca nada pero nombra una sección del feed (`#hb-…`, `#dn-not`, `#dn-sub`, `#dn-lep`, `#dn-ig`, `-home`, etc.: lista `MK`). Encabezado, pie, menú y ventanas (test, favoritos, compartir) no se tocan;
  - los carruseles de productos de Tiendanube (Swiper) vuelven a la configuración del celular (2,25 tarjetas); sus flechas quedan a la altura del título; la newsletter en una sola columna;
  - la fila de videos (`#hb-eps .er`) tiene flechas (con el mouse no se puede deslizar);
  - vuelve a revisar a los 0,4/1,5/4/8/15 s y cuando cambia el feed (las secciones se arman de a poco). Si la ventana baja de 1024 px, todo vuelve a como estaba.
  - Sección nueva en el feed: si su id empieza con `hb-` y sus estilos usan `max-width:767px` / `min-width:768px`, en la compu se ve sola como en el celular. Con otro id, agregarlo a `MK`.

### Foto del celular (antes / después de publicar)
`herramientas/foto-celular.js`: en el navegador en modo celular (375×812, recargar), `dnFoto('antes1')` y `dnFoto('antes2')` en cada página clave (inicio, tienda, /combos/, ficha de combo, ficha común, Media, nota, episodio, escritos) para medir el ruido; publicar; `dnFoto('despues')`. Un cambio real es una clave distinta de las DOS fotos de antes. Esperar ~8 s a que la página termine de cargar (con menos aparecen diferencias falsas; desde la versión 214 algunos bloques se arman recién después del evento load). En el celular `dk` tiene que dar siempre `false`.

## Publicar una versión (sello)
1. `./build.sh`, commit y push a `main`. Calentar jsDelivr pidiendo los archivos del commit nuevo desde los 3 servidores y comprobar la huella del núcleo.
2. Admin → Tienda online → Diseño → **Editar diseño actual** (`/admin/themes/settings/installations/3905649`) → `textarea#text-custom_seal_code`.
3. Reemplazar en todo el valor el SHA viejo por el nuevo (aparece 2 veces) y la huella del núcleo vieja por la nueva (2 veces). Copia de respaldo en el `localStorage` del admin: `dnSealExtN` (valor completo) y `dnSealBaseN` (la primera parte, con el cargador).
4. **Publicar cambios**. Si se queda en "Cargando tu tienda" sin guardar, recargar la página del admin y repetir. Verificar en el HTML de la tienda que figure el SHA nuevo.
5. Volver atrás: poner en el textarea `dnSealExt` de la versión anterior y publicar (2 minutos). Si el respaldo del navegador no está,
   `python3 herramientas/sello.py <commit de la versión anterior>` arma el sello exacto (comparar su sha256 antes de pegar).

Versión publicada: 219 = `69a1551` (26/10: nota "Mermeladas caseras" cargada desde Naturalmente Gestión; núcleo `sha384-PGPblMUyRuU4/EN5qqq2ZcPiDubKceT5YygU5wA6+1+xuT990QMcn5EEHDqaOuVV`, sello sha256 del admin cambiado solo en commit y huella). 218 = `255d4c3` (24/10: Media ya no descarga las ~240 fotos de la lista oculta de notas; núcleo `sha384-0fKYqshMps+9oITEeo0BbpSkfektne/ZwilWP4u7PG6i7b+fr8MPg19i48zouacP`, sello sha256 `2183bb56…1d1e`). 217 = `eb3e61c` (24/10: Media con tapa en todo, temas y programas en círculos con foto, más lugar para los videos; núcleo `sha384-g23gfqyUx2eWhFhSFcRrODMPXH7/gKTyGVMk2/ZefdjXR8pFQsHptNb1K2LciJ2c`, sello sha256 `7eeb188d…b73e`). 216 = `2d13f04` (24/10: inicio de Media nuevo, Guardar y Seguí leyendo en las notas; núcleo `sha384-CQdAFScqSDJCZDUMmQzrIWSnxdqXaH8viZJffgfRLLJqhJbcrDeiB/qHKy0W7zEX`, sello sha256 `6094aaa1…bbcc`). 215 = `1deb1bb` (24/10: índice de notas en Media para Google, categorías de Escritos con botón atrás, notas en las categorías de la tienda; núcleo `sha384-W/Iym9XWidw1AeqEjQOztAstA5jIHT2MGE7mLxdF1DgHaUB3KeSSfI7I8GUwsZ0+`, sello sha256 `247c52fb…f07a`). 214 = `cb05941` (24/10: seguridad, 51 notas al blog, landings verificadas, velocidad; núcleo `sha384-r/SLQ7vq2fqKgItplWKU1RDJ2N/dlMJgO9/jogapoPnHbsIYoFX0Zy1sVHe1Y0eT`, sello sha256 `58a8d980…c52a`). 213 = `7d49ea7` (núcleo `sha384-R71CbqjjEQFame2OJLE2osRVRoqEaV0SlP2QCp9Ei7GEFBDrMGtqiZnjYzy+a7j7`). 212 = `aef5953`, 211 = `fa48533`, 210 = `c5ec806`, 209 = `40ed931`.

Importante: en `dist/` solo van los `.min.js`. Si existiera el `.js` sin comprimir con el mismo nombre, jsDelivr puede servir su propia versión comprimida y la huella SRI no coincide (el navegador la rechaza). Los intermedios quedan en `build/` (ignorado).
