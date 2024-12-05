document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = 'http://localhost:3000/estudiantes';
    const idEstudiante = localStorage.getItem('idEstudiante');

    if (!idEstudiante) {
        alert('No se ha seleccionado un estudiante para editar.');
        window.location.href = './info_alumnos.html';
        return;
    }
    console.log(idEstudiante);
    console.log(`${apiUrl}/${idEstudiante}`);

    // Obtener los datos del estudiante
    fetch(`${apiUrl}/${idEstudiante}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(estudiante => {
            // Obtener la fecha del estudiante y convertirla en un objeto Date
            const fechaOriginal = new Date(estudiante.fecha_nacimiento);

            // Sumar un día a la fecha
            fechaOriginal.setDate(fechaOriginal.getDate() + 1);

            // Convertir la fecha ajustada a formato ISO para que sea compatible con el input de tipo "date"
            const fechaAjustada = fechaOriginal.toISOString().split('T')[0];

            document.getElementById('dni').value = estudiante.dni;
            document.getElementById('dni').disabled = true; // No se puede editar el DNI
            document.getElementById('nombre').value = estudiante.nombre;
            document.getElementById('apellido').value = estudiante.apellido;
            document.getElementById('curso').value = estudiante.id_clase;
            document.getElementById('fecha').value = fechaAjustada; // Asignar la fecha ajustada
            document.getElementById('direccion').value = estudiante.direccion;
            document.getElementById('email').value = estudiante.email;
            document.getElementById('telefono').value = estudiante.telefono;
            document.getElementById('vehiculo').checked = estudiante.tiene_vehiculo;
        })
        .catch(err => console.error('Error al cargar datos del estudiante:', err));

    // Guardar los cambios
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        const estudianteEditado = {
            nombre: document.getElementById('nombre').value.trim(),
            apellido: document.getElementById('apellido').value.trim(),
            curso: parseInt(document.getElementById('curso').value.trim()), // Asegúrate de que sea un número
            fecha: document.getElementById('fecha').value.trim(),
            direccion: document.getElementById('direccion').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            vehiculo: document.getElementById('vehiculo').checked ? 1 : 0 // Convertir booleano a 1 o 0
        };
        console.log("Estudiante editado:", estudianteEditado);
        e.preventDefault();

        
        if (confirm('¿Seguro que deseas guardar los cambios?')) {
            const estudianteEditado = {
                nombre: document.getElementById('nombre').value.trim(),
                apellido: document.getElementById('apellido').value.trim(),
                curso: parseInt(document.getElementById('curso').value.trim()), // Asegúrate de que sea un número
                fecha: document.getElementById('fecha').value.trim(),
                direccion: document.getElementById('direccion').value.trim(),
                email: document.getElementById('email').value.trim(),
                telefono: document.getElementById('telefono').value.trim(),
                vehiculo: document.getElementById('vehiculo').checked ? 1 : 0 // Convertir booleano a 1 o 0
            };
            console.log("Estudiante editado:", estudianteEditado);
            fetch(`${apiUrl}/${idEstudiante}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(estudianteEditado),
            })
                .then(() => {
                    alert('Estudiante actualizado con éxito.');
                    window.location.href = './info_alumnos.html';
                })
                .catch(err => console.error('Error al actualizar estudiante:', err));
        }
    });
});
