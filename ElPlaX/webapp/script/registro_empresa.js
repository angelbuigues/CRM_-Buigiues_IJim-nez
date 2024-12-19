function enviarRegistro(event) {
    event.preventDefault(); // Evita el comportamiento de envío por defecto del formulario

    const llamada_registrada = document.getElementById("llamada").checked;
    const correo_registrado = document.getElementById("correo").checked;
    const reunion_registrada = document.getElementById("reunion").checked;
    const observacion = document.getElementById("observacion").value;
    const fecha_asignacion = document.getElementById("fecha_asignacion").value;
    const id_empresa = localStorage.getItem('idEmpresa');
    const id_profesor = localStorage.getItem('idProfesor');


    fetch('http://localhost:3000/insertarRegistros', {
        method: 'POST',
        
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            llamada_registrada,
            correo_registrado,
            reunion_registrada,
            observacion,
            fecha_asignacion,
            id_empresa,
            id_profesor
        })
    })
        .then(response => {
            if (response.ok) {
                alert('Registro añadida con éxito');
            } else {
                alert('Error al añadir el registro');
            }
        })
        .catch(err => {
            console.error('Error al enviar los datos:', err);
        });
}

// Asigna la función al botón de envío después de que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("enviarButton").addEventListener("click", enviarRegistro);
});

