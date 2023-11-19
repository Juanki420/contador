var _0x1a93=["\x61\x70\x69\x4B\x65\x79","\x64\x61\x74\x61\x62\x61\x73\x65\x55\x52\x4C","\x63\x6F\x6E\x66\x69\x67","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x63\x6F\x6E\x74\x61\x64\x6F\x72\x2D\x63\x36\x35\x32\x38\x2E\x66\x69\x72\x65\x62\x61\x73\x65\x64\x61\x74\x61\x62\x61\x73\x65\x2E\x61\x70\x70","\x70\x72\x6F\x6A\x65\x63\x74\x49\x64","\x63\x36\x35\x32\x38","\x65\x75\x72\x6F\x70\x65","\x61\x6E\x6F\x6E\x79\x6D\x6F\x75\x73","\x76\x61\x6C","\x6E\x61\x6D\x65\x4C\x69\x73\x74","\x72\x65\x66","\x6E\x61\x6D\x65","\x68\x61\x6E\x64\x6C\x65\x4E\x61\x6D\x65","\x63\x68\x69\x6C\x64","\x76\x61\x6C\x75\x65","\x72\x65\x66\x4F\x6E","\x6E\x61\x6D\x65\x49\x6E\x70\x75\x74","\x72\x65\x66\x4E\x6F\x64\x65\x73","\x73\x75\x62\x6D\x69\x74","\x63\x68\x69\x6C\x64\x5F\x61\x64\x64\x65\x64","\x76\x61\x6C\x75\x65\x4F\x66","\x67\x6F\x6F\x67\x6C\x65\x2E\x63\x6F\x6D\x2F\x75\x2F\x30\x2F\x70\x72\x6F\x6A\x65\x63\x74\x2F\x63\x6F\x75\x6E\x74\x61\x64\x6F\x72\x2D\x63\x36\x35\x32\x38\x2F\x64\x61\x74\x61\x62\x61\x73\x65\x2F\x63\x6F\x75\x6E\x74\x61\x64\x6F\x72\x2D\x63\x36\x35\x32\x38\x2D\x64\x65\x66\x61\x75\x6C\x74\x2D\x72\x74\x64\x62\x2F\x64\x61\x74\x61\x2F\x7E\x32\x46","\x6E\x61\x6D\x65\x49\x6E\x70\x75\x74","\x6E\x61\x6D\x65\x49\x6E\x70\x75\x74","\x76\x61\x6C\x75\x65","\x73\x75\x62\x6D\x69\x74","\x63\x68\x69\x6C\x64\x5F\x61\x64\x64\x65\x64","\x73\x75\x62\x6D\x69\x74\x4E\x61\x6D\x65","\x73\x75\x62\x6D\x69\x74\x74\x65\x64\x4E\x61\x6D\x65","\x73\x75\x62\x6D\x69\x74\x74\x65\x64\x4E\x61\x6D\x65","\x64\x69\x73\x70\x6C\x61\x79\x55\x73\x65\x72\x49\x6E\x66\x6F","\x4D\x68\x61\x73\x20\x69\x6E\x69\x63\x69\x61\x64\x6F\x20\x63\x6F\x72\x72\x65\x63\x74\x61\x6D\x65\x6E\x74\x65\x3A\x20","\x63\x68\x69\x6C\x64","\x69\x6E\x6E\x65\x72\x54\x65\x78\x74","\x62\x6F\x64\x79","\x42\x69\x65\x6E\x76\x65\x6E\x69\x64\x6F\x20\x61\x20\x6D\x69\x20\x70\xC3\xA1\x67\x69\x6E\x61\x20\x77\x65\x62\x21","\x4E"]; 

firebase.initializeApp({
    apiKey: _0x1a93[0],
    authDomain: _0x1a93[1],
    databaseURL: _0x1a93[2],
    projectId: _0x1a93[3],
    storageBucket: _0x1a93[4],
    messagingSenderId: _0x1a93[5],
    appId: _0x1a93[6]
});

var nameList = document.getElementById(_0x1a93[7]);
var nameRef = firebase.database().ref(_0x1a93[8]);
var canSubmitNames = true;

nameRef.on(_0x1a93[9], handleNameChange);
nameRef.on(_0x1a93[10], handleNameChange);

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
    return localStorage.getItem(_0x1a93[11]) === 'true';
}

function setSubmittedName() {
    localStorage.setItem(_0x1a93[11], 'true');
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
        localStorage.removeItem(_0x1a93[11]);
    } else {
        alert('No tienes permisos para restablecer los envíos de nombres.');
    }
}

var loginButton = document.getElementById(_0x1a93[12]);
if (loginButton) {
    loginButton.addEventListener(_0x1a93[13], function() {
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

document.getElementById('submitButton').addEventListener(_0x1a93[13], handleFormSubmission);
document.getElementById('resetButton').addEventListener(_0x1a93[13], resetNameSubmissions);

var logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener(_0x1a93[13], function() {
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
