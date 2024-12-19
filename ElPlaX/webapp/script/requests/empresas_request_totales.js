document.addEventListener("DOMContentLoaded", () => {
    const id_empresa = localStorage.getItem('idEmpresa');
    // URL de la API
    const apiUrl = 'http://localhost:3000/asignaciones';

    // Fetch para obtener los datos de la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(asignacion => {
                if (id_empresa == asignacion.id_empresa) {
                    fetch('http://localhost:3000/estudiantes')
                        .then(response => response.json())
                        .then(data => {
                            const tableBody = document.querySelector('#alumnos-tbody');
                            tableBody.innerHTML = ''; // Asegurarse de que la tabla esté vacía antes de llenar datos

                            // Iterar sobre los datos y crear filas dinámicamente
                            data.forEach(estudiante => {
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
                            });
                        })
                        .catch(err => console.error('Error al obtener estudiantes:', err));
                }
            });
        })
        .catch(err => console.log('Error al obtener asignaciones:', err));

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
            const tableBody = document.querySelector('#registros-tbody');

            // Iterar sobre los datos recibidos y construir filas dinámicamente
            data.forEach(registro => {
                if (id_empresa == registro.id_empresa) {
                    // Crear la fila de la tabla
                    const tableRow = document.createElement('tr');

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
                }
            });
        })
        .catch(err => console.error('Error al cargar los datos:', err));

    document.getElementById('volver').addEventListener('click', () => {
        window.history.back();
    });
});
