document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = 'http://localhost:3000/empresas';

    // Cargar todos los datos al principio
    const loadData = (filter = '') => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#data-table tbody');
                tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

                // Filtrar las empresas por nombre
                const filteredData = data.filter(empresa =>
                    empresa.nombre_empresa.toLowerCase().includes(filter.toLowerCase())
                );

                // Mostrar las empresas filtradas
                filteredData.forEach(empresa => {
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

                    const modificarCell = document.createElement('td');

                    // Botón "Editar"
                    const editarButton = document.createElement('button');
                    editarButton.textContent = '📝';
                    editarButton.addEventListener('click', () => {
                        localStorage.setItem('idEmpresa', empresa.id_empresa);
                        window.location.href = './edit_info_empresa.html';
                    });

                    // Botón "Info"
                    const infoButton = document.createElement('button');
                    infoButton.textContent = 'ℹ️';
                    infoButton.addEventListener('click', () => {
                        localStorage.setItem('idEmpresa', empresa.id_empresa);
    
                        // Redirigir a la nueva ventana
                        window.location.href = './info_empresa_totales.html';
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
                                    alert('Empresa eliminada con éxito.');
                                    window.location.reload(); // Recargar la tabla
                                })
                                .catch(err => console.error('Error al eliminar empresa:', err));
                        }
                    });

                    // Botón "Registro"
                    const registroButton = document.createElement('button');
                    registroButton.textContent = '📋';
                    registroButton.addEventListener('click', () => {
                        localStorage.setItem('idEmpresa', empresa.id_empresa);
                        window.location.href = './registro_info_empresa.html';
                    });

                    infoButton.classList.add('edit-button');
                    registroButton.classList.add('registro-button');
                    editarButton.classList.add('edit-button');
                    eliminarButton.classList.add('delete-button');
                    modificarCell.appendChild(infoButton);
                    modificarCell.appendChild(editarButton);
                    modificarCell.appendChild(eliminarButton);
                    modificarCell.appendChild(registroButton);
                    tableRow.appendChild(modificarCell);

                    // Añadir la fila completa al tbody
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
        loadData(); // Recargar todas las empresas
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