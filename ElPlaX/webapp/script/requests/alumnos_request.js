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

})