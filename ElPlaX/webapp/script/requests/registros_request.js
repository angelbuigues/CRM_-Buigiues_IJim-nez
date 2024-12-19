document.addEventListener("DOMContentLoaded", () => {
    let profesores = [];
    let empresas = [];

    // Función para cargar los datos de profesores
    const cargarProfesores = () => {
        return fetch('http://localhost:3000/profesores')
            .then(response => response.json())
            .then(data => {
                profesores = data; // Guardar los datos de profesores
            });
    };

    // Función para cargar los datos de empresas
    const cargarEmpresas = () => {
        return fetch('http://localhost:3000/empresas')
            .then(response => response.json())
            .then(data => {
                empresas = data; // Guardar los datos de empresas
            });
    };


    const obtenerNombreProfesor = (id) => {
        const profesor = profesores.find(est => est.id_profesor === id);
        return profesor ? profesor.nombre : 'Desconocido';
    };

    // Función para obtener el nombre de una empresa por su ID
    const obtenerNombreEmpresa = (id) => {
        const empresa = empresas.find(emp => emp.id_empresa === id);
        return empresa ? empresa.nombre_empresa : 'Desconocido';
    };




    // Realizar la solicitud al servidor para obtener datos de los registros
    Promise.all([cargarProfesores(), cargarEmpresas()])
        .then(() => {
            // Ahora cargar las asignaciones
            return fetch('http://localhost:3000/registros');
        })
    
        .then(response => response.json())
        .then(data => {
            // Obtener el tbody donde se añadirán las filas dinámicas
            const tableBody = document.querySelector('#data-table tbody');

            // Iterar sobre los datos recibidos y construir filas dinámicamente
            data.forEach(registro => {
                // Crear la fila de la tabla
                const tableRow = document.createElement('tr');
                // Crear y añadir las celdas a la fila

                
                const id_profesorCell = document.createElement('td');
                id_profesorCell.textContent = obtenerNombreProfesor(registro.id_profesor);
                tableRow.appendChild(id_profesorCell);

                const id_empresaCell = document.createElement('td');
                id_empresaCell.textContent = obtenerNombreEmpresa(registro.id_empresa);
                tableRow.appendChild(id_empresaCell);

                const fecha_asignacionCell = document.createElement('td');
                const fechaOriginal = registro.fecha_asignacion;
                const fecha = new Date(fechaOriginal);
                const fechaFormateada = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
                fecha_asignacionCell.textContent = fechaFormateada;
                tableRow.appendChild(fecha_asignacionCell);

                const observacionCell = document.createElement('td');
                observacionCell.textContent = registro.observacion;
                tableRow.appendChild(observacionCell);

                const reunion_registradaCell = document.createElement('td');
                reunion_registradaCell.textContent = registro.reunion_registrada ? '✅' : '❌';
                tableRow.appendChild(reunion_registradaCell);

                const correo_registradoCell = document.createElement('td');
                correo_registradoCell.textContent = registro.correo_registrado ? '✅' : '❌';
                tableRow.appendChild(correo_registradoCell);

                const llamada_registradaCell = document.createElement('td');
                llamada_registradaCell.textContent = registro.llamada_registrada ? '✅' : '❌';
                tableRow.appendChild(llamada_registradaCell);

                // Añadir la fila completa al tbody
                tableBody.appendChild(tableRow);
            });
        })
        .catch(err => console.error('Error al cargar los datos:', err));

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


