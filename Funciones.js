var imagenes = ["Revisar.png", "Aceptado.png", "Rechazado.png"];
var indice = 0;

function cambiarImagen(imagen) {
    indice = (indice + 1) % imagenes.length;
    imagen.src = imagenes[indice];
}

function confirmarEnvio() {
    // Verificar si el título de la página es "Información del Reporte"
    if (document.title === "Información del Reporte") {
        var form = document.getElementById('Forms');
        var imagen = document.querySelector('img');

        var mensaje = "";
        switch (imagenes[indice]) {
            case "Revisar.png":
                mensaje = "No has cambiado el Status\n¿Seguro que quieres enviarlo?";
                break;
            case "Aceptado.png":
                mensaje = "Confirmación de 'Aceptado'";
                break;
            case "Rechazado.png":
                mensaje = "Confirmación de 'Rechazado'";
                break;
            default:
                mensaje = "¿Está seguro que desea enviar?";
        }

        if (confirm(mensaje)) {
            form.action = "Aprobar.html";
            form.submit();
        } else {
            return false;
        }
    }
}

// Agregar el evento 'submit' al formulario para llamar a la función de confirmación
document.getElementById('Forms').addEventListener('submit', confirmarEnvio);




function notificar(boton) {
    var r1 = boton.closest('.R1'); // Permite obtener el elemento '.R1' que contiene el botón especifico
    var imagen = r1.querySelector('.circular'); // Optenemos la imagen dentro
    
    // Verificar si la imagen es de tipo 'Revisar'
    if (imagen && imagen.src.includes('Revisar.png')) {
        alert('Notificación: \nEste reporte está en revisión. \nPara poder "Terminar" con este Reporte, es necesario revisar la información y cambiar el Status del mismo.');
    } else {
        window.location.href = 'TReporte.html';  // Redirige a "TerminarReporte"
    }
}

const inputFile = document.getElementById("input-file");
const imgView = document.getElementById("img-view");

inputFile.addEventListener("change", uploadImage);

function uploadImage(){
    let imgLink = URL.createObjectURL(inputFile.files[0]);
    imgView.style.backgroundImage = `url(${imgLink})`;
    imgView.textContent = "";
}

document.getElementById("Forms").addEventListener("submit", function(event){
    event.preventDefault();
    window.location.href = "Status.html";
})
