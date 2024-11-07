console.log("hola")
document.addEventListener('DOMContentLoaded', function() {
    
    //Creaciones de oyente para llamar a funciones
    let userButton = document.getElementById('siguiente')
    userButton.addEventListener('click', nextUser)

    let passwordButton = document.getElementById('iniciar-sesion')
    passwordButton.addEventListener('click', nextPassword)

    document.getElementById("home-button").addEventListener("click", function() {
        window.location.href = "./html/home.html";
    });
      
})

//Función para "cambiar de pantalla" al presionar un boton, escondemos el container de usuario y enseñamos para que introduzca contraseña
function nextUser() {
    document.getElementById('user-container').classList.add('hidden')
    document.getElementById('password-container').classList.remove('hidden')
}

//Función para "cambiar de pantalla" al presionar un boton, escondemos el container de introducción de contraseña y mostramos un mensaje de bienvenida
function nextPassword() {
    const realUser = 'Vicente'
    const realPassword = '1234'
    let userName = document.getElementById('user').value
    let userPwd = document.getElementById('password').value

    if (realUser === userName && realPassword === userPwd) {
        document.getElementById('password-container').classList.add('hidden')
        document.getElementById('welcome').classList.remove('hidden')
        document.getElementById('texto-bienvenida').innerText += '¡Bienvenido, '+ userName + '!'
        userName = document.getElementById('user').value = ''
        userPwd = document.getElementById('password').value = ''
    } else {
        alert('Prueba con usuario Vicente y contraseña 1234')
        userName = document.getElementById('user').value = ''
        userPwd = document.getElementById('password').value = ''
        document.getElementById('password-container').classList.add('hidden')
        document.getElementById('user-container').classList.remove('hidden')
    }
}