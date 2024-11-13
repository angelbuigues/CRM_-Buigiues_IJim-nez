function enviarEstudiantes(event) {
    event.preventDefault(); // Evita el comportamiento de envío por defecto del formulario

    const dni = document.getElementById("dni").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const curso = document.getElementById("curso").value;
    const fecha = document.getElementById("fecha").value;
    const direccion = document.getElementById("direccion").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const vehiculo = document.getElementById("vehiculo").checked;

    fetch('http://localhost:3000/insertarEstudiantes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dni,
            nombre,
            apellido,
            curso,
            fecha,
            direccion,
            email,
            telefono,
            vehiculo
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Estudiante añadido con éxito');
        } else {
            alert('Error al añadir el estudiante');
        }
    })
    .catch(err => {
        console.error('Error al enviar los datos:', err);
    });
}

// Asigna la función al botón de envío después de que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("enviarEstudianteButton").addEventListener("click", enviarEstudiantes);
});
