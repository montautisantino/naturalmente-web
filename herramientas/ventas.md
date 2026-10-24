# Contador de ventas (contenido/ventas.json)

Cantidad de pedidos pagados (no cancelados) que incluyen cada producto, desde que existe.
Se calcula desde el administrador de Tiendanube (búsqueda de ventas filtrada por las variantes de cada producto,
estado "abiertas" + pago "pagado"). Solo se guardan los productos con 10 o más ventas.
La web muestra el número redondeado hacia abajo con "+" (función `shown` de src/48-ficha-compra.js: desde 1.000 de a 100,
desde 100 de a 10, desde 20 de a 5; ej. 1.355 -> "+1.300 vendidos").
**El archivo se guarda YA redondeado con esa misma función** (desde el 24/10/2026): es público (repositorio y jsDelivr),
así que no tiene que tener los números exactos de ventas de cada producto. La web se ve igual.
Para actualizarlo: pedirle a Claude "actualizá el contador de ventas".
