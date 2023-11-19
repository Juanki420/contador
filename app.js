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

nameRef.on('child_added', handleNameChange);
nameRef.on('child_changed', handleNameChange);

function handleNameChange(data) {
    var li = document.createElement('li');
    li.innerText = data.val();
    nameList.appendChild(li);
}

function isAllowedUser() {
    var user = firebase.auth().currentUser;
    return user && user.providerData[0]?.providerId === 'google.com' && user.uid === 'EcjgireoyRNjZ7Fo3W3eMZT05jp1';
}

function hasSubmittedName() {
    return localStorage.getItem('submittedName') === 'true';
}

function setSubmittedName() {
    localStorage.setItem('submittedName', 'true');
}

function displayUserInfo(user) {
    var userInfoElement = document.getElementById('userInfo');
    if (userInfoElement) {
        userInfoElement.innerHTML = user ? `Usuario actual: ${user.displayName} (${user.email})` : '';
    }
}

function handleFormSubmission(e) {
    e.preventDefault();

    if (hasSubmittedName()) {
        alert('Solo puedes enviar un nombre.');
        return;
    }

    if (!canSubmitNames) {
        alert('Los envíos de nombres están deshabilitados en este momento.');
        return;
    }

    var nameInput = document.getElementById('nameInput');
    var name = nameInput.value.trim();

    if (name.length === 0 || name.length > 30) {
        alert('Por favor, ingresa un nombre válido (máximo 30 caracteres).');
        return;
    }

    canSubmitNames = false;

    firebase.database().ref('names').push(name);
    nameInput.value = '';

    setSubmittedName();
}

function resetNameSubmissions() {
    if (isAllowedUser()) {
        canSubmitNames = true;
        alert('Ahora puedes enviar nombres nuevamente.');
        localStorage.removeItem('submittedName');
    } else {
        alert('No tienes permisos para restablecer los envíos de nombres.');
    }
}

document.getElementById('submitButton').addEventListener('click', handleFormSubmission);
document.getElementById('resetButton').addEventListener('click', resetNameSubmissions);

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

    // Mostrar u ocultar botones según el estado de inicio de sesión
    var loginButton = document.getElementById('loginButton');
    var googleLoginButton = document.getElementById('googleLoginButton');
    var emailLoginButton = document.getElementById('emailLoginButton');

    if (user) {
        loginButton.style.display = 'none';
        googleLoginButton.style.display = 'none';
        emailLoginButton.style.display = 'none';
        logoutButton.style.display = 'block';
    } else {
        loginButton.style.display = 'block';
        googleLoginButton.style.display = 'block';
        emailLoginButton.style.display = 'block';
        logoutButton.style.display = 'none';
    }
});
