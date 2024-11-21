document.addEventListener("DOMContentLoaded", () => {

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

})