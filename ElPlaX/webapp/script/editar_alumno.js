document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = 'http://localhost:3000/estudiantes';
    const idEstudiante = localStorage.getItem('idEstudiante');
    const xd = "xd";

    if (!idEstudiante) {
        alert('No se ha seleccionado un estudiante para editar.');
        window.location.href = './info_alumnos.html';
        return;
    }

    // Obtener los datos del estudiante
    fetch(`${apiUrl}/${idEstudiante}_${xd}`)
        .then(response => response.json())
        .then(estudiante => {
            document.getElementById('dni').value = estudiante.dni;
            document.getElementById('dni').disabled = true; // No se puede editar el DNI
            document.getElementById('nombre').value = estudiante.nombre;
            document.getElementById('apellido').value = estudiante.apellido;
            document.getElementById('curso').value = estudiante.id_clase;
            document.getElementById('fecha').value = estudiante.fecha_nacimiento.split('T')[0];
            document.getElementById('direccion').value = estudiante.direccion;
            document.getElementById('email').value = estudiante.email;
            document.getElementById('telefono').value = estudiante.telefono;
            document.getElementById('vehiculo').checked = estudiante.tiene_vehiculo;
        })
        .catch(err => console.error('Error al cargar datos del estudiante:', err));

    // Guardar los cambios
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (confirm('¿Seguro que deseas guardar los cambios?')) {
            const estudianteEditado = {
                nombre: document.getElementById('nombre').value,
                apellido: document.getElementById('apellido').value,
                id_clase: document.getElementById('curso').value,
                fecha_nacimiento: document.getElementById('fecha').value,
                direccion: document.getElementById('direccion').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                tiene_vehiculo: document.getElementById('vehiculo').checked //Recuerda que aquí puede ir una coma
            };

            fetch(`${apiUrl}/${idEstudiante}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(estudianteEditado),
            })
                .then(() => {
                    alert('Estudiante actualizado con éxito.');
                    window.location.href = './alumnos.html';
                })
                .catch(err => console.error('Error al actualizar estudiante:', err));
        }
    });
});
