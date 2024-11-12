document.addEventListener("DOMContentLoaded", () => {

    fetch('http://localhost:3000/estudiantes')
        .then(response => response.json())
        .then(data => {
            const estudiantesList = document.getElementById('estudiantes');
            data.forEach(estudiante => {
                const listItem = document.createElement('li');
                listItem.textContent = `Nombre: ${estudiante.nombre}, Email: ${estudiante.email}`;
                estudiantesList.appendChild(listItem);
            });
        })
        .catch(err => console.log('Error data', err));



    fetch('http://localhost:3000/empresas')
        .then(response => response.json())
        .then(data => {
            const empresasList = document.getElementById('empresas');
            data.forEach(empresa => {
                const listItem = document.createElement('li');
                listItem.textContent = `Nombre: ${empresa.nombre_empresa}, Email: ${empresa.email}`;
                empresasList.appendChild(listItem);
            });
        })
        .catch(err => console.log('Error data', err));



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