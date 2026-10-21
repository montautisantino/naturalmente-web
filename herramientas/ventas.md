# Contador de ventas (contenido/ventas.json)

Cantidad de pedidos pagados (no cancelados) que incluyen cada producto, desde que existe.
Se calcula desde el administrador de Tiendanube (búsqueda de ventas filtrada por las variantes de cada producto,
estado "abiertas" + pago "pagado"). Solo se guardan los productos con 10 o más ventas.
La web muestra el número redondeado hacia abajo con "+" (ej. 1.355 -> "+1.350 vendidos").
Para actualizarlo: pedirle a Claude "actualizá el contador de ventas".
