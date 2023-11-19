// app.js

// Configuración de Firebase
var firebaseConfig = {
    apiKey: "AIzaSyC5FR4fLXV1zjAzZ4WFIwBG97Aes3FtPWo",
    authDomain: "contador-c6528.firebaseapp.com",
    databaseURL: "https://contador-c6528-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "contador-c6528",
    storageBucket: "contador-c6528.appspot.com",
    messagingSenderId: "575749501934",
    appId: "1:575749501934:web:4b48ebab36b25e925914ff"
};

// Inicialización de Firebase
firebase.initializeApp(firebaseConfig);

// Referencias a elementos HTML
var nameList = document.getElementById('nameList');
var nameRef = firebase.database().ref('names');
var canSubmitNames = true;

// Verificar si el usuario actual es el propietario permitido
function isAllowedUser() {
    var user = firebase.auth().currentUser;
    // Aquí deberías reemplazar 'TU_ID_DE_GOOGLE' con tu propio ID de Google
    return user && user.providerData[0]?.providerId === 'google.com' && user.uid === 'EcjgireoyRNjZ7Fo3W3eMZT05jp1';
}

function displayUserInfo(user) {
    var userInfoDiv = document.getElementById('userInfo');
    if (user) {
        userInfoDiv.innerHTML = 'Usuario actual: ' + user.displayName;
    } else {
        userInfoDiv.innerHTML = 'No hay usuario autenticado.';
    }
}

// Función para manejar el envío de nombres
function handleFormSubmission() {
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

    // Deshabilitar envíos de nombres después de enviar uno
    canSubmitNames = false;

    // Enviar el nombre a Firebase
    firebase.database().ref('names').push(name);
    nameInput.value = '';
}

// Función para restablecer los envíos de nombres
function resetNameSubmissions() {
    if (isAllowedUser()) {
        // Restablecer los envíos permitiendo a todos
        firebase.database().ref('.info/connected').once('value').then(function(connectedSnap) {
            if (connectedSnap.val() === true) {
                // Actualizar el valor en la base de datos
                firebase.database().ref('allowSubmissions').set(true);
                alert('Ahora todos pueden enviar nombres nuevamente.');
            } else {
                alert('Error: No se pudo restablecer los envíos. Verifica tu conexión a Internet.');
            }
        });
    } else {
        alert('No tienes permisos para restablecer los envíos de nombres.');
    }
}

// Evento de clic para cerrar sesión
var logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', function() {
        firebase.auth().signOut().then(function() {
            // Cierre de sesión exitoso
            alert('Has cerrado sesión correctamente.');
        }).catch(function(error) {
            // Manejar errores de cierre de sesión
            alert('Error al cerrar sesión: ' + error.message);
        });
    });
}

// Verificar si el botón existe antes de agregar el evento
var loginButton = document.getElementById('loginButton');
var resetButton = document.getElementById('resetButton');

if (loginButton) {
    loginButton.addEventListener('click', function() {
        // ...
    });
}

if (resetButton) {
    resetButton.addEventListener('click', resetNameSubmissions);
}

// Evento de clic para manejar el envío de nombres
document.getElementById('submitButton').addEventListener('click', handleFormSubmission);

// Actualizar la información del usuario al iniciar o cerrar sesión
firebase.auth().onAuthStateChanged(function(user) {
    displayUserInfo(user);

    // Mostrar o ocultar botones según el estado de inicio de sesión
    if (user) {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
    } else {
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
    }
});
