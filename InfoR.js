document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idReporte = urlParams.get('idReporte');

    if (idReporte) {
        fetch(`http://localhost:2000/reportes/${idReporte}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Problema al obtener la respuesta del servidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(reporte => {
            console.log(reporte); // Agregado para depuración
            const categoriaTexto = getCategoriaTexto(reporte.r_categoria);
            document.getElementById('categoria').textContent = categoriaTexto;
            document.getElementById('descripcion').textContent = reporte.r_descripcion;
            //document.getElementById('imagen').textContent = reporte.r_evidencia;
            document.getElementById('status').textContent = reporte.r_status;

            // Decodificar y mostrar la imagen
            if (reporte.r_evidencia) {  // Añadida verificación aquí
                const base64Text = reporte.r_evidencia;
                const base64Content = base64Text.split(";base64,").pop();
                const imageData = atob(base64Content);
                const arrayBuffer = new Uint8Array(imageData.length);
                for (let i = 0; i < imageData.length; i++) {
                    arrayBuffer[i] = imageData.charCodeAt(i);
                }
                const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
                const imageUrl = URL.createObjectURL(blob);
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.style.width = '20rem'; // Ajusta el ancho de la imagen
                imgElement.style.height = '20rem'; // Ajusta la altura de la imagen
                document.getElementById('img-view').appendChild(imgElement);
            } else {
                console.error('No image text provided.');
            }
            
            // Cambiar imagen de estatus basada en el estado actual del reporte
            //const imgStatus = document.querySelector('status');
            const imgStatus = document.getElementById('status');

            if (imgStatus) {
                imgStatus.dataset.idReporte = reporte.id;  // Asignar el ID del reporte al dataset
                imgStatus.onclick = function() {
                    cambiarImagen(this, this.dataset.idReporte);
                };

                imgStatus.src = reporte.estado === 0 ? 'Revisar.png' :
                                reporte.estado === 1 ? 'Aceptado.png' :
                                reporte.estado === 2 ? 'Rechazado.png' :
                                'Revisar.png'
            } else {
                console.error('Elemento .status-img no encontrado en el DOM');
            }

        })
        .catch(error => console.error('Error:', error));
    }
});

function getCategoriaTexto(categoria) {
    if (categoria === 1) {
        return 'Producto Fuera de lugar';
    } else if (categoria === 2) {
        return 'Producto Dañado';
    } else if (categoria === 7) {
        return 'Producto mostrado obsoleto';
    } else if (categoria === 3) {
        return 'Producto Sin Ficha Tecnica a la vista';
    } else if (categoria === 4) {
        return 'Producto Sucio';
    } else if (categoria === 5) {
        return 'Producto Faltante';
    } else if (categoria === 6) {
        return 'Precio No Visible';
    } else {
        return 'Tipo de Incidencia Desconocido'; // Por defecto si no coincide con ningún caso
    }
}

//

var imagenes = ["Revisar.png", "Aceptado.png", "Rechazado.png"];
var indice = 0;

function cambiarImagen(imagen, idReporte) {

    const imagenes = ["Revisar.png", "Aceptado.png", "Rechazado.png"];
    let indice = imagenes.indexOf(imagen.src.split('/').pop());
    indice = (indice + 1) % imagenes.length;  // Incrementa el índice circularmente
    imagen.src = imagenes[indice];  // Actualiza el src de la imagen

    // Asignar estado como número
    const estadoNumerico = indice === 1 ? 1 :  // Aceptado
                          indice === 2 ? 2 :  // Rechazado
                          0;                  // Revisar u otro estado no específico

    console.log("Enviando al servidor - ID del Reporte:", idReporte, "Estado:", estadoNumerico);
    enviarEstadoAlServidor(idReporte, estadoNumerico);
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idReporte = urlParams.get('idReporte'); 
    const imgStatus = document.getElementById('status');
    //const imgStatus = document.querySelector('.status-img'); // Asume que esta clase está asignada a la imagen de estado
    console.log("ID del Reporte:", idReporte); 

    /*if (imgStatus && idReporte) {
        imgStatus.addEventListener('click', function() {
            cambiarImagen(this, idReporte);
        });
    } else {
        console.error("imgStatus no encontrado o idReporte es undefined");
    }*/

    // Obtener el estado actual del reporte desde el servidor
    fetch(`http://localhost:2000/reportes/${idReporte}`)
    .then(response => response.json())
    .then(data => {
        // Asumiendo que la respuesta del servidor incluye el estado del reporte en 'r_status'
        const estadoActual = data.r_status;
        const estadoImagen = estadoActual === 1 ? "Aceptado.png" : estadoActual === 2 ? "Rechazado.png" : "Revisar.png";
        imgStatus.src = estadoImagen;
        console.log("Estado actual del reporte:", estadoActual);

        imgStatus.addEventListener('click', function() {
            cambiarImagen(this, idReporte);
        });
    })
    .catch(error => console.error("Error al cargar el estado del reporte:", error));
});

function enviarEstadoAlServidor(idReporte, estadoNumerico) {
    const fechaModificacion = (estadoNumerico === 1 || estadoNumerico === 2) ? new Date().toISOString() : null;
    const bodyData = {
        r_fAceptacion: fechaModificacion,
        r_status: estadoNumerico  // Envía el estado como número  // Asumiendo que solo actualizas la fecha en estados específicos
    };

    //const url = `http://localhost:2000/reportes/${idReporte}`;
    //console.log("URL de solicitud:", url);

    //fetch(url, {
    fetch(`http://localhost:2000/reportes/${idReporte}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData)
    })
    .then(response => {
        if (!response.ok) {
            //throw new Error('Error al actualizar el estado' + response.statusText);
            //throw new Error(`HTTP status ${response.status}`);
            return response.json().then(err => { throw new Error(`HTTP ${response.status}: ${err.message}`); });
        }
        return response.json();
    })
    .then(data => {
        console.log('Estado actualizado con éxito:', data);
    })
    .catch(error => {
        //console.error('Error:', error);
        console.error('Error en la solicitud fetch:', error);
    });
}


//////////
/*function enviarEstadoAlServidor(idReporte, estadoNumerico) {

    const fechaModificacion = (estadoNumerico === 1 || estadoNumerico === 2) ? new Date().toISOString() : null;
    const bodyData = {
        r_status: estadoNumerico,  // Envía el estado como número
        r_fAceptacion: fechaModificacion  // Asumiendo que solo actualizas la fecha en estados específicos
    };

    fetch(`http://localhost:2000/reportes/${idReporte}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar el estado');
        }
        return response.json();
    })
    .then(data => {
        console.log('Estado actualizado con éxito:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}*/

/*function confirmarEnvio() {
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
}*/

// Agregar el evento 'submit' al formulario para llamar a la función de confirmación
document.getElementById('Forms').addEventListener('submit');
