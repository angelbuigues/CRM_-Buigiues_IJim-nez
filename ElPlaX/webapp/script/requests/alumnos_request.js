document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = 'http://localhost:3000/estudiantes';

    // Cargar todos los datos al principio
    const loadData = (filter = '') => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#data-table tbody');
                tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

                // Filtrar los estudiantes por nombre
                const filteredData = data.filter(estudiante => 
                    estudiante.nombre.toLowerCase().includes(filter.toLowerCase())
                );

                // Mostrar los estudiantes filtrados
                filteredData.forEach(estudiante => {
                    const tableRow = document.createElement('tr');

                    // Crear celdas
                    const dniCell = document.createElement('td');
                    dniCell.textContent = estudiante.dni;

                    const nombreCell = document.createElement('td');
                    nombreCell.textContent = estudiante.nombre;

                    const apellidoCell = document.createElement('td');
                    apellidoCell.textContent = estudiante.apellido;

                    const cursoCell = document.createElement('td');
                    cursoCell.textContent = estudiante.id_clase;

                    const birthDateCell = document.createElement('td');
                    const fechaOriginal = estudiante.fecha_nacimiento;
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

                    // Botones de acción
                    const modificarCell = document.createElement('td');

                    // Botón "Editar"
                    const editarButton = document.createElement('button');
                    editarButton.textContent = '📝';
                    editarButton.addEventListener('click', () => {
                        localStorage.setItem('idEstudiante', estudiante.id_estudiante);
                        window.location.href = './edit_info_alumno.html';
                    });

                    // Botón "Eliminar"
                    const eliminarButton = document.createElement('button');
                    eliminarButton.textContent = '🗑️';
                    eliminarButton.addEventListener('click', () => {
                        if (confirm(`¿Seguro que deseas eliminar a ${estudiante.nombre}?`)) {
                            fetch(`${apiUrl}/${estudiante.id_estudiante}`, {
                                method: 'DELETE',
                            })
                                .then(() => {
                                    alert('Estudiante eliminado con éxito.');
                                    window.location.reload(); // Recargar la tabla
                                })
                                .catch(err => console.error('Error al eliminar estudiante:', err));
                        }
                    });

                    editarButton.classList.add('edit-button');
                    eliminarButton.classList.add('delete-button');

                    modificarCell.appendChild(editarButton);
                    modificarCell.appendChild(eliminarButton);

                    // Añadir celdas a la fila
                    tableRow.appendChild(dniCell);
                    tableRow.appendChild(nombreCell);
                    tableRow.appendChild(apellidoCell);
                    tableRow.appendChild(cursoCell);
                    tableRow.appendChild(birthDateCell);
                    tableRow.appendChild(direccionCell);
                    tableRow.appendChild(emailCell);
                    tableRow.appendChild(telefonoCell);
                    tableRow.appendChild(vehiculoCell);
                    tableRow.appendChild(modificarCell);

                    tableBody.appendChild(tableRow);
                });
            })
            .catch(err => console.error('Error al obtener datos:', err));
    };

    // Cargar todos los datos al principio
    loadData();

    // Filtrar los datos en tiempo real mientras el usuario escribe
    document.getElementById('filter-input').addEventListener('input', () => {
        const filterValue = document.getElementById('filter-input').value;
        loadData(filterValue); // Filtrar los datos con el valor del input
    });

    // Limpiar el input y recargar todos los datos cuando se hace clic en el botón "Filtrar"
    document.getElementById('filter-button').addEventListener('click', () => {
        document.getElementById('filter-input').value = ''; // Limpiar el input
        loadData(); // Recargar todos los estudiantes
    });

    document.getElementById('volver').addEventListener('click', () => {
        window.history.back();
    });

    const infoButton = document.getElementById("info-button");
    const popup = document.getElementById("info-popup");

    // Mostrar la ventana emergente
    infoButton.addEventListener("click", () => {
        popup.classList.toggle("hidden");
    });
});
