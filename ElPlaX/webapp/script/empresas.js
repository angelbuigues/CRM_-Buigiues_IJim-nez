function enviarEmpresas(event) {
    event.preventDefault(); // Evita el comportamiento de envío por defecto del formulario

    const cif = document.getElementById("cif").value;
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
    const direccion = document.getElementById("direccion").value;
    const capacidad = document.getElementById("capacidad").value;

    fetch('http://localhost:3000/insertarEmpresas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cif,
            nombre,
            telefono,
            email,
            direccion,
            capacidad
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Empresa añadida con éxito');
        } else {
            alert('Error al añadir la empresa');
        }
    })
    .catch(err => {
        console.error('Error al enviar los datos:', err);
    });
}

// Asigna la función al botón de envío después de que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("enviarButton").addEventListener("click", enviarEmpresas);
});
