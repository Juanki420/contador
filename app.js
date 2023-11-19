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
var localStorageInfoRef = firebase.database().ref('localStorageInfo');
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

    var newEntryRef = firebase.database().ref('names').push(name);

    var localStorageKey = 'submittedName';  // Puedes cambiar esto según tu necesidad
    localStorageInfoRef.child(localStorageKey).set({
        nameKey: newEntryRef.key,
        submitted: true
    });

    nameInput.value = '';
    setSubmittedName();
}

function resetNameSubmissions() {
    if (isAllowedUser()) {
        canSubmitNames = true;
        alert('Ahora puedes enviar nombres nuevamente.');

        localStorage.removeItem('submittedName');

        var localStorageKey = 'submittedName';  // Puedes cambiar esto según tu necesidad
        localStorageInfoRef.child(localStorageKey).remove();
    } else {
        alert('No tienes permisos para restablecer los envíos de nombres.');
    }
}

var loginButton = document.getElementById('loginButton');
if (loginButton) {
    loginButton.addEventListener('click', function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function(result) {
                alert('¡Has iniciado sesión correctamente!');
            })
            .catch(function(error) {
                alert('Error al iniciar sesión: ' + error.message);
            });
    });
}

document.getElementById('submitButton').addEventListener('click', handleFormSubmission);
document.getElementById('resetButton').addEventListener('click', resetNameSubmissions);

var logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', function() {
        firebase.auth().signOut().then(function() {
            alert('Has cerrado sesión correctamente.');
        }).catch(function(error) {
            alert('Error al cerrar sesión: ' + error.message);
        });
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    displayUserInfo(user);

    if (user) {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
    } else {
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
    }
});

function displayUserInfo(user) {
    var userInfoElement = document.getElementById('userInfo');
    if (userInfoElement) {
        userInfoElement.innerHTML = user ? `Usuario actual: ${user.displayName} (${user.email})` : '';
    }
}
