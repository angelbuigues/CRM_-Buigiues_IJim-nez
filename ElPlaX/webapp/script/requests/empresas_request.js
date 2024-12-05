document.addEventListener("DOMContentLoaded", () => {
    // Realizar la solicitud al servidor para obtener datos de las empresas
    fetch('http://localhost:3000/empresas')
        .then(response => response.json())
        .then(data => {
            // Obtener el tbody donde se añadirán las filas dinámicas
            const tableBody = document.querySelector('#data-table tbody');

            // Iterar sobre los datos recibidos y construir filas dinámicamente
            data.forEach(empresa => {
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

                ////
                const modificarCell = document.createElement('td');

                // Botón "Editar"
                const editarButton = document.createElement('button');
                editarButton.textContent = '📝';
                editarButton.addEventListener('click', () => {
                    localStorage.setItem('idEmpresa', empresa.id_empresa);
                    window.location.href = './edit_info_empresa.html';
                });

                // Botón "Eliminar"
                const eliminarButton = document.createElement('button');
                eliminarButton.textContent = '🗑️';
                eliminarButton.addEventListener('click', () => {
                    if (confirm(`¿Seguro que deseas eliminar a ${empresa.nombre_empresa}?`)) {
                        fetch(`${apiUrl}/${empresa.id_empresa}`, {
                            method: 'DELETE',
                        })
                            .then(() => {
                                alert('Empresa eliminado con éxito.');
                                window.location.reload(); // Recargar la tabla
                            })
                            .catch(err => console.error('Error al eliminar estudiante:', err));
                    }
                });

                editarButton.classList.add('edit-button');
                eliminarButton.classList.add('delete-button');
                modificarCell.appendChild(editarButton);
                modificarCell.appendChild(eliminarButton);
                tableRow.appendChild(modificarCell);

                ////
                // Añadir la fila completa al tbody
                tableBody.appendChild(tableRow);
            });
        })
        .catch(err => console.error('Error al cargar los datos:', err));

    document.getElementById('volver').addEventListener('click', () => {
        window.history.back();
    });
});
