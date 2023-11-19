// app.js

var firebaseConfig = {
    apiKey: "AIzaSyC5FR4fLXV1zjAzZ4WFIwBG97Aes3FtPWo",
    authDomain: "contador-c6528.firebaseapp.com",
    databaseURL: "https://contador-c6528-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "contador-c6528",
    storageBucket: "contador-c6528.appspot.com",
    messagingSenderId: "575749501934",
    appId: "1:575749501934:web:4b48ebab36b25e925914ff"
};

firebase.initializeApp(firebaseConfig);

var nameList = document.getElementById('nameList');
var nameRef = firebase.database().ref('names');
var canSubmitNames = true;

// Manejar tanto nuevos nombres como cambios en los nombres existentes
nameRef.on('child_added', handleNameChange);
nameRef.on('child_changed', handleNameChange);

function handleNameChange(data) {
    var li = document.createElement('li');
    li.innerText = data.val();
    nameList.appendChild(li);
}

// Crear una variable global que almacene el ID de Google del propietario permitido
var allowedUserId = 'EcjgireoyRNjZ7Fo3W3eMZT05jp1';

// Verificar si el usuario actual es el propietario permitido
function isAllowedUser() {
    var user = firebase.auth().currentUser;
    // Aquí deberías reemplazar 'TU_ID_DE_GOOGLE' con tu propio ID de Google
    return user && user.providerData[0]?.providerId === 'google.com' && user.uid === allowedUserId;
}

// Verificar si el usuario ya ha enviado un nombre
function hasSubmittedName() {
    return localStorage.getItem('submittedName') === 'true';
}

// Almacenar que el usuario ha enviado un nombre
function setSubmittedName() {
    localStorage.setItem('submittedName', 'true');
}

// Mostrar información del usuario en la página
function displayUserInfo(user) {
    var userInfoElement = document.getElementById('userInfo');
    if (userInfoElement) {
        userInfoElement.innerHTML = user ? `Usuario actual: ${user.displayName} (${user.email})` : '';
    }
}

function handleFormSubmission(e) {
    // Prevenir el comportamiento predeterminado del formulario (recarga de la página)
    e.preventDefault();

    // Verificar si el usuario ya ha enviado un nombre
    if (hasSubmittedName()) {
        alert('Solo puedes enviar un nombre.');
        return;
    }

    // Verificar si se pueden enviar nombres
    if (!canSubmitNames) {
        alert('Los envíos de nombres están deshabilitados en este momento.');
        return;
    }

    var nameInput = document.getElementById('nameInput');
    var name = nameInput.value.trim();

    // Validar la longitud del nombre
    if (name.length === 0 || name.length > 30) {
        alert('Por favor, ingresa un nombre válido (máximo 30 caracteres).');
        return;
    }

    // Enviar el nombre a la base de datos de Firebase
    nameRef.push(name);

    // Almacenar que el usuario ha enviado un nombre
    setSubmittedName();

    // Limpiar el campo de entrada
    nameInput.value = '';
}

// Crear una función que borre la base de datos de Firebase y el almacenamiento local de los nombres enviados
function resetNames() {
    // Borrar la base de datos de Firebase
    nameRef.remove();

    // Borrar el almacenamiento local
    localStorage.clear();

    // Borrar la lista de nombres de la página
    nameList.innerHTML = '';

    // Deshabilitar el envío de nombres
    canSubmitNames = false;

    // Mostrar un mensaje de confirmación
    alert('Los envíos de nombres se han restablecido.');
}

// Añadir un evento de clic al botón de restablecer que invoque la función de restablecer
document.getElementById('resetButton').addEventListener('click', resetNames);

// Añadir un evento de clic al botón de enviar que invoque la función de enviar
document.getElementById('submitButton').addEventListener('click', handleFormSubmission);

// Añadir un evento de clic al botón de iniciar sesión que invoque la función de iniciar sesión
document.getElementById('loginButton').addEventListener('click', signIn);

// Añadir un evento de clic al botón de cerrar sesión que invoque la función de cerrar sesión
document.getElementById('logoutButton').addEventListener('click', signOut);

// Crear una función que inicie sesión con Google
function signIn() {
    // Crear un proveedor de Google
    var provider = new firebase.auth.GoogleAuthProvider();

    // Iniciar sesión con el proveedor
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // Mostrar el botón de cerrar sesión y ocultar el de iniciar sesión
        document.getElementById('logoutButton').style.display = 'block';
        document.getElementById('loginButton').style.display = 'none';

        // Mostrar la información del usuario
        displayUserInfo(result.user);
    }).catch(function(error) {
        // Mostrar el error
        alert(error.message);
    });
}

// Crear una función que cierre sesión
function signOut() {
    // Cerrar sesión
    firebase.auth().signOut().then(function() {
        // Ocultar el botón de cerrar sesión y mostrar el de iniciar sesión
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('loginButton').style.display = 'block';

        // Ocultar la información del usuario
        displayUserInfo(null);
    }).catch(function(error) {
        // Mostrar el error
        alert(error.message);
    });
}

// Crear una función que maneje la eliminación de nombres
function handleNameRemoval(data) {
    // Actualizar el valor de la variable global
    canSubmitNames = true;

    // Actualizar el almacenamiento local
    localStorage.clear();
}
