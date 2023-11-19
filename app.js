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
var usersRef = firebase.database().ref('users');
var canSubmitNames = true; // Mover esta declaración aquí para que sea global

// Manejar tanto nuevos nombres como cambios en los nombres existentes
nameRef.on('child_added', handleNameChange);
nameRef.on('child_changed', handleNameChange);

function handleNameChange(data) {
    var li = document.createElement('li');
    li.innerText = data.val();
    nameList.appendChild(li);
}

// Verificar si el usuario actual es el propietario permitido
function isAllowedUser() {
    var user = firebase.auth().currentUser;
    return user && user.providerData[0]?.providerId === 'google.com' && user.uid === 'EcjgireoyRNjZ7Fo3W3eMZT05jp1';
}

// Almacenar que el usuario ha enviado un nombre
function setSubmittedName() {
    var user = firebase.auth().currentUser;
    if (user) {
        // Almacenar que el usuario ha enviado un nombre directamente en la base de datos
        usersRef.child(user.uid).set({
            submittedName: true
        });
    }
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
    nameRef.push(name);
    nameInput.value = '';

    // Almacenar que el usuario ha enviado un nombre
    setSubmittedName();
}

function resetNameSubmissions() {
    var user = firebase.auth().currentUser;
    if (user && user.providerData[0]?.providerId === 'google.com' && user.uid === 'EcjgireoyRNjZ7Fo3W3eMZT05jp1') {
        // Eliminar la restricción de envío de nombres en todos los dispositivos
        usersRef.remove();
        canSubmitNames = true;
        alert('Ahora puedes enviar nombres nuevamente.');
    } else {
        alert('No tienes permisos para restablecer los envíos de nombres. Asegúrate de haber iniciado sesión con la cuenta correcta.');
    }
}

// Inicialización del botón "Iniciar Sesión"
var loginButton = document.getElementById('loginButton');
if (loginButton) {
    loginButton.addEventListener('click', function() {
        // Abrir el cuadro de diálogo de inicio de sesión cuando se hace clic en el botón de inicio de sesión
        var provider = new firebase.auth.GoogleAuthProvider();

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

// Inicialización del botón "Enviar"
var submitButton = document.getElementById('submitButton');
if (submitButton) {
    submitButton.addEventListener('click', handleFormSubmission);
}

// Inicialización del botón "Restablecer Envíos"
var resetButton = document.getElementById('resetButton');
if (resetButton) {
    resetButton.addEventListener('click', resetNameSubmissions);
}

// ... (otro código)

// Añadir un nuevo evento de clic para cerrar sesión
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