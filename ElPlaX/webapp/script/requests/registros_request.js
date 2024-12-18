document.addEventListener("DOMContentLoaded", () => {
    // Realizar la solicitud al servidor para obtener datos de los registros
    fetch('http://localhost:3000/registros')
        .then(response => response.json())
        .then(data => {
            // Obtener el tbody donde se añadirán las filas dinámicas
            const tableBody = document.querySelector('#data-table tbody');

            // Iterar sobre los datos recibidos y construir filas dinámicamente
            data.forEach(registro => {
                // Crear la fila de la tabla
                const tableRow = document.createElement('tr');
                //correo_registrado, reunion_registrada,	observacion, fecha_asignacion, id_empresa, id_profesor
                // Crear y añadir las celdas a la fila
                const llamada_registradaCell = document.createElement('td');
                llamada_registradaCell.textContent = registro.llamada_registrada;
                tableRow.appendChild(llamada_registradaCell);

                const correo_registradoCell = document.createElement('td');
                correo_registradoCell.textContent = registro.correo_registrado;
                tableRow.appendChild(correo_registradoCell);
/////////////////
                const telefonoCell = document.createElement('td');
                telefonoCell.textContent = empresa.telefono;
                tableRow.appendChild(telefonoCell);

                const emailCell = document.createElement('td');
                emailCell.textContent = empresa.email;
                tableRow.appendChild(emailCell);

                const ubicacionCell = document.createElement('td');
                ubicacionCell.textContent = empresa.direccion;
                tableRow.appendChild(ubicacionCell);

                const vehiculoCell = document.createElement('td');
                vehiculoCell.textContent = estudiante.tiene_vehiculo ? '✅' : '❌';

                
                // Añadir la fila completa al tbody
                tableBody.appendChild(tableRow);
            });
        })
        .catch(err => console.error('Error al cargar los datos:', err));

    document.getElementById('volver').addEventListener('click', () => {
        window.history.back();
    });
});
