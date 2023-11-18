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

function resetNameSubmissions() {
    var user = firebase.auth().currentUser;

    if (user) {
        // Solo permitir el restablecimiento si hay un usuario autenticado
        canSubmitNames = true;
        alert('Ahora puedes enviar nombres nuevamente.');
    } else {
        alert('Debes iniciar sesión para restablecer los envíos de nombres.');
    }
}

// Verificar si el botón existe antes de agregar el evento
var loginButton = document.getElementById('loginButton');
if (loginButton) {
    loginButton.addEventListener('click', function() {
        // Abrir el cuadro de diálogo de inicio de sesión cuando se hace clic en el botón de inicio de sesión
        var provider = new firebase.auth.GoogleAuthProvider(); // Cambiado a GoogleAuthProvider

        // Cambiar signInWithRedirect a signInWithPopup para Firebase 8.x
        firebase.auth().signInWithPopup(provider)
            .then(function(result) {
                // El usuario ha iniciado sesión correctamente
                alert('¡Has iniciado sesión correctamente!');
            })
            .catch(function(error) {
                // Manejar errores de inicio de sesión
                alert('Error al iniciar sesión: ' + error.message);
            });
    });
}

document.getElementById('submitButton').addEventListener('click', handleFormSubmission);
document.getElementById('resetButton').addEventListener('click', resetNameSubmissions);
