document.addEventListener("DOMContentLoaded", () => {
    const id_estudiante = localStorage.getItem('idEstudiante');
    const id_empresa = localStorage.getItem('idEmpresa');
    // URL de la API
    const apiUrl = 'http://localhost:3000/estudiantes';

    // Fetch para obtener los datos de la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#alumnos-tbody');
            tableBody.innerHTML = ''; // Asegurarse de que la tabla esté vacía antes de llenar datos

            // Iterar sobre los datos y crear filas dinámicamente
            data.forEach(estudiante => {
                if (id_estudiante == estudiante.id_estudiante) {
                    const tableRow = document.createElement('tr');

                    // Crear celdas para cada columna
                    const dniCell = document.createElement('td');
                    dniCell.textContent = estudiante.dni;

                    const nombreCell = document.createElement('td');
                    nombreCell.textContent = estudiante.nombre;

                    const apellidoCell = document.createElement('td');
                    apellidoCell.textContent = estudiante.apellido;

                    const cursoCell = document.createElement('td');
                    cursoCell.textContent = estudiante.id_clase;

                    const birthDateCell = document.createElement('td');
                    const fechaOriginal = estudiante.fecha_nacimiento; // Supongamos que este es el dato
                    const fecha = new Date(fechaOriginal);
                    const fechaFormateada = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
                    birthDateCell.textContent = fechaFormateada;

                    const direccionCell = document.createElement('td');
                    direccionCell.textContent = estudiante.direccion;

                    const emailCell = document.createElement('td');
                    emailCell.textContent = estudiante.email;

                    const telefonoCell = document.createElement('td');
                    telefonoCell.textContent = estudiante.telefono;

                    const vehiculoCell = document.createElement('td');
                    vehiculoCell.textContent = estudiante.tiene_vehiculo ? '✅' : '❌';

                    // Añadir las celdas a la fila
                    tableRow.appendChild(dniCell);
                    tableRow.appendChild(nombreCell);
                    tableRow.appendChild(apellidoCell);
                    tableRow.appendChild(cursoCell);
                    tableRow.appendChild(birthDateCell);
                    tableRow.appendChild(direccionCell);
                    tableRow.appendChild(emailCell);
                    tableRow.appendChild(telefonoCell);
                    tableRow.appendChild(vehiculoCell);

                    // Añadir la fila al cuerpo de la tabla
                    tableBody.appendChild(tableRow);
                }

            });
        })
        .catch(err => console.log('Error al obtener datos:', err));


    fetch('http://localhost:3000/empresas')
        .then(response => response.json())
        .then(data => {
            // Obtener el tbody donde se añadirán las filas dinámicas
            const tableBody = document.querySelector('#empresas-tbody');

            // Iterar sobre los datos recibidos y construir filas dinámicamente
            data.forEach(empresa => {
                if (id_empresa == empresa.id_empresa) {
                    // Crear la fila de la tabla
                    const tableRow = document.createElement('tr');

                    // Crear y añadir las celdas a la fila
                    const cifCell = document.createElement('td');
                    cifCell.textContent = empresa.CIF;
                    tableRow.appendChild(cifCell);

                    const nombreCell = document.createElement('td');
                    nombreCell.textContent = empresa.nombre_empresa;
                    tableRow.appendChild(nombreCell);

                    const telefonoCell = document.createElement('td');
                    telefonoCell.textContent = empresa.telefono;
                    tableRow.appendChild(telefonoCell);

                    const emailCell = document.createElement('td');
                    emailCell.textContent = empresa.email;
                    tableRow.appendChild(emailCell);

                    const ubicacionCell = document.createElement('td');
                    ubicacionCell.textContent = empresa.direccion;
                    tableRow.appendChild(ubicacionCell);

                    const capacidadCell = document.createElement('td');
                    capacidadCell.textContent = empresa.capacidad;
                    tableRow.appendChild(capacidadCell);

                    // Añadir la fila completa al tbody
                    tableBody.appendChild(tableRow);
                }

            });
        })
        .catch(err => console.error('Error al cargar los datos:', err));
    
    document.getElementById('volver').addEventListener('click', () => {
        window.history.back();
    });
});
