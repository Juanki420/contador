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
    // Verificar si ya se ha enviado un nombre
    if (hasSubmittedName) {
        alert('Solo puedes enviar un nombre.');
        return;
    }

    var nameInput = document.getElementById('nameInput');
    var name = nameInput.value.trim();

    // Validar la longitud del nombre
    if (name.length === 0 || name.length > 30) {
        alert('Por favor, ingresa un nombre válido (máximo 30 caracteres).');
        return;
    }

    // Marcar que se ha enviado un nombre
    hasSubmittedName = true;
    localStorage.setItem('hasSubmittedName', 'true');

    // Enviar el nombre a Firebase
    firebase.database().ref('names').push(name);
    nameInput.value = '';
}

function resetNameSubmissions() {
    if (firebase.auth().currentUser) {
        // Solo permitir el restablecimiento si hay un usuario autenticado
        canSubmitNames = true;
        alert('Ahora puedes enviar nombres nuevamente.');
    } else {
        alert('Debes iniciar sesión para restablecer los envíos de nombres.');
    }
}

document.getElementById('submitButton').addEventListener('click', handleFormSubmission);
document.getElementById('resetButton').addEventListener('click', resetNameSubmissions);

document.getElementById('loginButton').addEventListener('click', function() {
    // Abrir el cuadro de diálogo de inicio de sesión cuando se hace clic en el botón de inicio de sesión
    firebase.auth().signInWithEmailAndPassword('tu@email.com', 'tuContraseña')
        .then(function(userCredential) {
            // El usuario ha iniciado sesión correctamente
            alert('¡Has iniciado sesión correctamente!');
        })
        .catch(function(error) {
            // Manejar errores de inicio de sesión
            alert('Error al iniciar sesión: ' + error.message);
        });
});
