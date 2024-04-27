fetch('http://localhost:2000/reportes')
.then(response => response.json())
.then(reportes => {
    reportes.forEach((reporte, index) => {
        console.log(document.querySelector('.R1')); // Debería mostrarte el elemento, si es `null`, el elemento no existe en el DOM
    
        const reporteDiv = document.querySelector(`.R1:nth-child(${index + 2})`);
        if (!reporteDiv) {
            console.error(`No se encontró el elemento para el reporte con index: ${index}`);
            return; // Salta esta iteración si el elemento no se encontró
        }
        // Aquí se utilizan los nombres de los atributos de la base de datos
        reporteDiv.querySelector('.pp').textContent = `Reporte ${reporte.r_id}`;
        reporteDiv.querySelector('.sp').textContent = reporte.r_fecha;
        
        // Determina la imagen a mostrar basándose en el 'estado_reporte'
        const imagenSrc = reporte.r_status === 0 ? 'Revisar.png' :
                          reporte.estado_reporte === 'Aceptado' ? 'Aceptado.png' :
                          'Rechazado.png';
        reporteDiv.querySelector('.circular').src = imagenSrc;

        // Configura el enlace para revisar el incidente, usando 'id' del reporte
        reporteDiv.querySelector('.ConocerInfo').onclick = function() {
            window.location.href = `Info2.html?idReporte=${reporte.r_id}`; // Se utiliza 'id' como parámetro
        };
    });
})
.catch(error => console.error('Error:', error));

///
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
