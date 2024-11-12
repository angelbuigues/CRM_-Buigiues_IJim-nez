let listItem = []
//let nombre
//let contraseña
fetch('http://localhost:3000/profesores')
    .then(response => response.json())
    .then(data => {
        
        listItem = data;
        console.log(listItem)
    })
    .catch(err => console.log('Error data', err));
document.addEventListener('DOMContentLoaded', function () {

    

    

    //Creaciones de oyente para llamar a funciones
    let userButton = document.getElementById('siguiente')
    userButton.addEventListener('click', nextUser)

    let passwordButton = document.getElementById('iniciar-sesion')
    passwordButton.addEventListener('click', nextPassword)

    document.getElementById("home-button").addEventListener("click", function () {
        window.location.href = "./html/home.html";
    });

})



//Función para "cambiar de pantalla" al presionar un boton, escondemos el container de usuario y enseñamos para que introduzca contraseña
function nextUser() {

    let userName1 = document.getElementById('user').value

    if (userName1 === null || userName1 === "" || userName1 === ' ') {
        alert('Nombre de usuario es necesario')
    } else {
        document.getElementById('user-container').classList.add('hidden')
        document.getElementById('password-container').classList.remove('hidden')
    }

}


//Función para "cambiar de pantalla" al presionar un boton, escondemos el container de introducción de contraseña y mostramos un mensaje de bienvenida
function nextPassword() {

    let userName = document.getElementById('user').value
    let userPwd = document.getElementById('password').value

    let comprovador = false;
    for (let i = 0; i < listItem.length; i++) {
        if (listItem[i].nombre == userName) {
            if (listItem[i].contraseña == userPwd)
                document.getElementById('password-container').classList.add('hidden')
                document.getElementById('welcome').classList.remove('hidden')
                document.getElementById('texto-bienvenida').innerText += '¡Bienvenido, ' + userName + '!'
                userName = document.getElementById('user').value = ''
                userPwd = document.getElementById('password').value = ''
                comprovador = true;
        }
    }

    if (!comprovador) {
        alert("Prueba con usuario: " + listItem[0].nombre + ", y contraseña: " + listItem[0].contraseña)
        userName = document.getElementById('user').value = ''
        userPwd = document.getElementById('password').value = ''
        document.getElementById('password-container').classList.add('hidden')
        document.getElementById('user-container').classList.remove('hidden')
    }
}