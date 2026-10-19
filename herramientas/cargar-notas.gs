/* Carga (o vuelve a cargar) la pestaña "Notas" de la planilla de contenido con las notas largas.
   Columnas: Publicar | Título | Categoría | Bajada | Imagen | Fecha | Slug | Minutos | Texto.
   La web lista las notas sin el texto (columna I) y baja el texto solo cuando alguien abre la nota. */
function cargarNotas(){var ss=SpreadsheetApp.openById('1qrT32OXed3bPESBFqYxXbhhtxI_wInRjb3N2D_5IHAg');
var sh=ss.getSheetByName('Notas')||ss.insertSheet('Notas');sh.clear();
var H=['Publicar','Título','Categoría','Bajada','Imagen','Fecha','Slug','Minutos','Texto'];
sh.getRange(1,1,1,H.length).setValues([H]).setFontWeight('bold').setBackground('#1d4a2a').setFontColor('#ffffff');
sh.getRange(2,1,ROWS.length,H.length).setValues(ROWS);sh.setFrozenRows(1);sh.getRange(2,1,ROWS.length,H.length).setWrap(false);
sh.setColumnWidth(2,380);sh.setColumnWidth(4,320);sh.setColumnWidth(9,420);
Logger.log('ok '+ROWS.length)}
