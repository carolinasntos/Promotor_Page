var imagenes = ["Revisar.png", "Aceptado.png", "Rechazado.png"];
var indice = 0;

function cambiarImagen(imagen) {
    indice = (indice + 1) % imagenes.length;
    imagen.src = imagenes[indice];
}