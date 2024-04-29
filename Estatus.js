if (window.location.pathname === '/Colaborador_Page/Status.html') {
    fetch('http://localhost:2000/reportes/infoA')
    .then(response => {
        if (!response.ok) {
            throw new Error('Problema al obtener la respuesta del servidor: ' + response.statusText);
        }
        if (!response.headers.get('content-type')?.includes('application/json')) {
            throw new TypeError('La respuesta no es JSON válido: ' + response.statusText);
        }
        return response.json();
    })
    .then(reportes => {
        // Limpiar el contenedor de reportes existente o crear uno si no existe
        let reportesContenedor = document.querySelector('.reportesContenedor');
        if (!reportesContenedor) {
            reportesContenedor = document.createElement('div');
            reportesContenedor.className = 'reportesContenedor';
            document.body.appendChild(reportesContenedor); // O el elemento donde quieras que estén los reportes
        } else {
            reportesContenedor.innerHTML = ''; // Limpia el contenedor existente
        }

        // Crear los elementos de los reportes y añadirlos al contenedor
        reportes.forEach(reporte => {
            const reporteDiv = document.createElement('div');
            reporteDiv.className = 'R1';

            const table = document.createElement('table');
            const tr = document.createElement('tr');

            // ID del reporte
            const idTd = document.createElement('td');
            idTd.className = 'Reporte';
            idTd.innerHTML = `<p class="pp"><strong>${reporte.r_id}</strong></p>`;
            tr.appendChild(idTd);

            // Fecha del reporte
            const fechaTd = document.createElement('td');
            fechaTd.className = 'Reporte';
            fechaTd.innerHTML = `<p class="sp"><strong>${reporte.r_fecha}</strong></p>`;
            tr.appendChild(fechaTd);

            // Estado del reporte
            const estadoTd = document.createElement('td');
            estadoTd.className = 'Reporte';
            const imagen = document.createElement('img');
            imagen.className = 'circular';
            imagen.height = 35;
            imagen.src = reporte.r_statusA === 0 ? 'Revisar.png' :
                        reporte.r_statusA === 1 ? 'Aceptado.png' :
                        'Rechazado.png';
            estadoTd.appendChild(imagen);
            tr.appendChild(estadoTd);

            // Botón para revisar el reporte
            const botonTd = document.createElement('td');
            botonTd.className = 'Reporte';
            const boton = document.createElement('button');
            boton.className = 'ConocerInfo';
            boton.innerHTML = `<p>Revisar Incidente</p>`;

            // Modificar la funcionalidad del botón según el estado del reporte
            if (reporte.r_statusA === 1 || reporte.r_statusA === 2) {  // Suponiendo que 1 y 2 representen "Aceptado" y "Terminado"
                boton.disabled = true;  // Deshabilitar el botón
                boton.style.opacity = 0.5;  // Cambiar la opacidad para indicar visualmente que está deshabilitado
            } else {
                boton.onclick = function() {
                    window.location.href = `TReporte.html?idReporte=${reporte.r_id}`;
                };
            }

            botonTd.appendChild(boton);
            tr.appendChild(botonTd);


            boton.onclick = function() {
                window.location.href = `TReporte.html?idReporte=${reporte.r_id}`;
            };
            botonTd.appendChild(boton);
            tr.appendChild(botonTd);

            // Añadir fila a la tabla y tabla al div de reporte
            table.appendChild(tr);
            reporteDiv.appendChild(table);

            // Añadir el div de reporte al contenedor principal
            reportesContenedor.appendChild(reporteDiv);
        });
    })

    .catch(error => console.error('Error:', error));
}
///
/*var imagenes = ["Revisar.png", "Aceptado.png", "Rechazado.png"];
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
*/
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
    window.location.href = "Status.html?";
})
