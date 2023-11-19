
var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
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

// Verificar si el usuario actual es el propietario permitido
function isAllowedUser() {
    var user = firebase.auth().currentUser;
    // Aquí deberías reemplazar 'TU_ID_DE_GOOGLE' con tu propio ID de Google
    return user && user.providerData[0]?.providerId === 'google.com' && user.uid === process.env.REACT_APP_ALLOWED_USER_ID;
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

    // Deshabilitar envíos de nombres después de enviar uno
    canSubmitNames = false;

    // Enviar el nombre a Firebase
    firebase.database().ref('names').push(name);
    nameInput.value = '';

    // Almacenar que el usuario ha enviado un nombre
    setSubmittedName();
}

function resetNameSubmissions() {
    if (isAllowedUser()) {
        canSubmitNames = true;
        alert('Ahora puedes enviar nombres nuevamente.');
        // Eliminar la marca de que el usuario ha enviado un nombre
        localStorage.removeItem('submittedName');
    } else {
        alert('No tienes permisos para restablecer los envíos de nombres.');
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
