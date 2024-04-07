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
        window.location.href = 'TerminarReporte.html';  // Redirige a "TerminarReporte"
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
    // Aquí podrías realizar cualquier validación de los campos del formulario antes de enviarlo

    // Después de enviar el formulario, redirigir al usuario a otra página
    window.location.href = "Status.html";
})