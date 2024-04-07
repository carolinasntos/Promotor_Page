var imagenes = ["Revisar.png", "Aceptado.png", "Rechazado.png"];
var indice = 0;

function cambiarImagen(imagen) {
    indice = (indice + 1) % imagenes.length;
    imagen.src = imagenes[indice];
}

function notificar(boton) {
    var r1 = boton.closest('.R1'); // Permite obtener el elemento '.R1' que contiene el botón especifico
    var imagen = r1.querySelector('.circular'); // Optenemos la imagen dentro
    
    // Verificar si la imagen es de tipo 'Revisar'
    if (imagen && imagen.src.includes('Revisar.png')) {
        alert('Notificación: \nEste reporte está en revisión. \nPara poder "Terminar" con este Reporte, es necesario revisar la información y cambiar el Status del mismo.');
    } else {
        window.location.href = 'otra_pagina.html';  // Redirige a "TerminarReporte"
    }
}
