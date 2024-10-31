export function sayHello() {
    console.log('🌿 Todo bien desde Helpers 🌿');
}

function showMessage(container) {
    setTimeout(() => {
        container.classList.toggle('hide');
    }, 2000);
}

export function getResult(userUser, userPassword) {
    const realUser = 'qwerty';
    const realPassword = '123456';
    const loginResult = document.querySelector('#login-result');
    const todoList = document.querySelector('#todo-list');
    const loginUser = document.querySelector('#login-user');
    const welcome = document.querySelector('#welcome');

    if(
        userUser === realUser &&
        userPassword === realPassword
    ) {
        console.log('🟢', 'Login correcto');
        welcome.innerText = 'Bienvenid@ ' + userUser;
        loginResult.innerText = '🔰 Login Correcto';
        showMessage(todoList);
    } else {
        console.log('🔴', 'Error en el login');
        loginResult.innerText = '❌ Error en el login!';
        showMessage(loginUser);
    }
}
