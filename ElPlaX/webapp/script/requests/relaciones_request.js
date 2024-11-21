document.addEventListener("DOMContentLoaded", () => {

    fetch('http://localhost:3000/asignaciones')
        .then(response => response.json())
        .then(data => {
            console.log('data:', data); // Verifica los datos en la consola del navegador
            const asignacionesList = document.getElementById('asignaciones');
            data.forEach(asignacion => {
                const listItem = document.createElement('li');
                listItem.textContent = `ID alumno: ${asignacion.id_estudiante}, ID empresa: ${asignacion.id_empresa}`;
                asignacionesList.appendChild(listItem);
            });
        })
        .catch(err => console.log('Error data', err));

})