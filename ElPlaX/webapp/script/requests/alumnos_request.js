document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = 'http://localhost:3000/estudiantes';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#data-table tbody');
            tableBody.innerHTML = '';

            data.forEach(estudiante => {
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

    
    document.getElementById('volver').addEventListener('click', () => {
        window.history.back();
    });
});
