document.addEventListener("DOMContentLoaded", () => {
    // Arrays para almacenar los nombres de estudiantes y empresas
    let estudiantes = [];
    let empresas = [];

    // Función para cargar los datos de estudiantes
    const cargarEstudiantes = () => {
        return fetch('http://localhost:3000/estudiantes')
            .then(response => response.json())
            .then(data => {
                estudiantes = data; // Guardar los datos de estudiantes
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

    // Función para obtener el nombre de un estudiante por su ID
    const obtenerNombreEstudiante = (id) => {
        const estudiante = estudiantes.find(est => est.id_estudiante === id);
        return estudiante ? estudiante.nombre + ' ' + estudiante.apellido : 'Desconocido';
    };

    // Función para obtener el nombre de una empresa por su ID
    const obtenerNombreEmpresa = (id) => {
        const empresa = empresas.find(emp => emp.id_empresa === id);
        return empresa ? empresa.nombre_empresa : 'Desconocido';
    };

    // Cargar las asignaciones después de cargar los estudiantes y las empresas
    Promise.all([cargarEstudiantes(), cargarEmpresas()])
        .then(() => {
            // Ahora cargar las asignaciones
            return fetch('http://localhost:3000/asignaciones');
        })
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#data-table tbody');

            data.forEach(asignacion => {
                // Crear una fila
                const tableRow = document.createElement('tr');

                // Agregar un evento de clic a la fila
                tableRow.addEventListener('click', () => {
                    // Guardar los IDs del estudiante y la empresa en el localStorage
                    localStorage.setItem('idEstudiante', asignacion.id_estudiante);
                    localStorage.setItem('idEmpresa', asignacion.id_empresa);
                    console.log(`Guardado en localStorage: Estudiante ID=${asignacion.id_estudiante}, Empresa ID=${asignacion.id_empresa}`);

                    // Redirigir a la nueva ventana
                    window.location.href = './info_relaciones_totales.html';
                });

                // Obtener el nombre del estudiante y añadir la celda
                const alumnoCell = document.createElement('td');
                alumnoCell.textContent = obtenerNombreEstudiante(asignacion.id_estudiante);
                tableRow.appendChild(alumnoCell);

                // Obtener el nombre de la empresa y añadir la celda
                const empresaCell = document.createElement('td');
                empresaCell.textContent = obtenerNombreEmpresa(asignacion.id_empresa);
                tableRow.appendChild(empresaCell);

                // Formatear y añadir la fecha de asignación
                const fechaAsignacionCell = document.createElement('td');
                const fechaOriginal = asignacion.fecha_asignacion;
                const fecha = new Date(fechaOriginal);
                const fechaFormateada = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
                fechaAsignacionCell.textContent = fechaFormateada;
                tableRow.appendChild(fechaAsignacionCell);

                // Añadir la fila al tbody
                tableBody.appendChild(tableRow);
            });
        })
        .catch(err => console.error('Error al cargar los datos:', err));

    document.getElementById('volver').addEventListener('click', () => {
        window.history.back();
    });
});
