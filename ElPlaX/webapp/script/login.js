let listItem = [];

// Cargar datos de los profesores desde el servidor
fetch('http://localhost:3000/profesores')
    .then(response => response.json())
    .then(data => {
        console.log('data:', data);
        listItem = data;
        console.log(listItem);
    })
    .catch(err => console.log('Error data', err));

// Variables para guardar el nombre de usuario y la contraseña
let userName;
let userPwd;

document.addEventListener('DOMContentLoaded', function () {
    // Creación de oyentes para los botones
    let userButton = document.getElementById('siguiente');
    userButton.addEventListener('click', nextUser);

    let passwordButton = document.getElementById('iniciar-sesion');
    passwordButton.addEventListener('click', nextPassword);

    document.getElementById("home-button").addEventListener("click", function () {
        window.location.href = "./html/home.html";
    });
});

// Función para validar el nombre de usuario
function nextUser() {
    let userName1 = document.getElementById('user').value;

    if (userName1 === null || userName1.trim() === "") {
        alert('Nombre de usuario es necesario');
    } else {
        // Escondemos el contenedor de usuario y mostramos el de contraseña
        document.getElementById('user-container').classList.add('hidden');
        document.getElementById('password-container').classList.remove('hidden');
    }
}

// Función para validar la contraseña y mostrar el mensaje de bienvenida
function nextPassword() {
    userName = document.getElementById('user').value;
    userPwd = document.getElementById('password').value;

    if (userName === null || userName.trim() === "") {
        alert('No se ha proporcionado un nombre de usuario');
        return;
    }

    if (userPwd === null || userPwd.trim() === "") {
        alert('No se ha proporcionado una contraseña');
        return;
    }

    let comprovador = false;
    for (let i = 0; i < listItem.length; i++) {
        if (listItem[i] === undefined || listItem[i] === null) {
            console.error('Error: elemento ' + i + ' de la lista es nulo o indefinido');
            continue;
        }

        if (listItem[i].nombre === undefined || listItem[i].nombre === null ||
            listItem[i].contrasena === undefined || listItem[i].contrasena === null) {
            console.error('Error: elemento ' + i + ' de la lista tiene un campo nulo o indefinido');
            continue;
        }

        // Comprobar si el nombre de usuario y la contraseña coinciden
        if (listItem[i].nombre === userName && listItem[i].contrasena === userPwd) {
            // Ocultar contenedor de contraseña, mostrar bienvenida y resetear los campos
            document.getElementById('password-container').classList.add('hidden');
            document.getElementById('welcome').classList.remove('hidden');
            document.getElementById('texto-bienvenida').innerText = '¡Bienvenido, ' + userName + '!';
            document.getElementById('user').value = '';
            document.getElementById('password').value = '';
            comprovador = true;
            break;
        }
    }

    if (!comprovador) {
        // Mostrar alerta de error con un ejemplo de credenciales y resetear campos
        alert("Usuario o contraseña incorrectos. Prueba con usuario: " + listItem[0].nombre + ", y contraseña: " + listItem[0].contrasena);
        document.getElementById('user').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-container').classList.add('hidden');
        document.getElementById('user-container').classList.remove('hidden');
    }
}
