//Cuando puedas revisa que funcione este archivo correctamente

document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = 'http://localhost:3000/empresas';
    const idEmpresa = localStorage.getItem('idEmpresa');

    if (!idEmpresa) {
        alert('No se ha seleccionado una empresa para editar.');
        window.location.href = './info_empresas.html';
        return;
    }

    // Obtener los datos de la empresa
    fetch(`${apiUrl}/${idEmpresa}`)
        .then(response => response.json())
        .then(empresa => {
            document.getElementById('cif').value = empresa.cif;
            document.getElementById('cif').disabled = true; // No se puede editar el CIF
            document.getElementById('nombre').value = empresa.nombre_empresa;
            document.getElementById('telefono').value = empresa.telefono;
            document.getElementById('email').value = empresa.email;
            document.getElementById('direccion').value = empresa.direccion;
            document.getElementById('capacidad').value = empresa.capacidad;
        })
        .catch(err => console.error('Error al cargar datos de la empresa:', err));

    // Guardar los cambios
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (confirm('¿Seguro que deseas guardar los cambios?')) {
            const empresaEditada = {
                nombre: document.getElementById('nombre').value,
                cif: document.getElementById('cif').value,
                telefono: document.getElementById('telefono').value,
                email: document.getElementById('email').value,
                direccion: document.getElementById('direccion').value,
                capacidad: document.getElementById('capacidad').value //Recuerda que aquí puede ir una coma
            };

            fetch(`${apiUrl}/${idEmpresa}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(empresaEditada),
            })
                .then(() => {
                    alert('Empresa actualizada con éxito.');
                    window.location.href = './info_empresas.html';
                })
                .catch(err => console.error('Error al actualizar empresa:', err));
        }
    });
});
