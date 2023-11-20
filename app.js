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
var userMessagesRef = firebase.database().ref('userMessages');
var verificationRef = firebase.database().ref('verification');

var canSubmitNames = true;

nameRef.on('child_added', handleNameChange);
nameRef.on('child_changed', handleNameChange);

function isAllowedUser(email) {
    return verificationRef.once('value').then(function(snapshot) {
        var verificationEnabled = snapshot.val().verificationEnabled;

        if (!verificationEnabled) {
            return true;
        } else {
            var allowedEmails = snapshot.val().allowedEmails || {};
            var encodedEmail = btoa(email.toLowerCase()); // Convertir a minúsculas antes de codificar
            return allowedEmails[encodedEmail] === true;
        }
    });
}

function toggleVerificationButtonVisibility() {
    verificationRef.once('value').then(function(snapshot) {
        var verificationEnabled = snapshot.val().verificationEnabled;

        var toggleVerificationButton = document.getElementById('toggleVerificationButton');
        
        toggleVerificationButton.style.display = verificationEnabled ? 'inline-block' : 'none';
    });
}

verificationRef.on('value', toggleVerificationButtonVisibility);

document.getElementById('toggleVerificationButton').addEventListener('click', function() {
    verificationRef.transaction(function(currentData) {
        // Invierte el valor de verificationEnabled
        return { verificationEnabled: !currentData.verificationEnabled, allowedEmails: currentData.allowedEmails };
    });
});

function handleNameChange(data) {
    var message = data.val();
    console.log('Nombre:', message.name);
    console.log('ID de Usuario:', message.userId);
    console.log('Nombre de Usuario:', message.userName);
    console.log('Correo Electrónico del Usuario:', message.userEmail);

    var li = document.createElement('li');
    li.innerText = message.name;
    nameList.appendChild(li);
}

function hasUserSubmittedMessage(userId) {
    return userMessagesRef.child(userId).once('value').then(function(snapshot) {
        return snapshot.exists();
    });
}

function markUserAsSubmitted(userId) {
    userMessagesRef.child(userId).push(true);
}

function handleFormSubmission(e) {
    e.preventDefault();

    var user = firebase.auth().currentUser;

    if (!user) {
        alert('Debes iniciar sesión antes de enviar un nombre.');
        return;
    }

    hasUserSubmittedMessage(user.uid).then(function(hasSubmitted) {
        if (hasSubmitted) {
            alert('Ya has enviado un mensaje. No puedes enviar otro.');
        } else {
            if (!canSubmitNames) {
                alert('Recargue la página y envíe de nuevo.');
                return;
            }

            var nameInput = document.getElementById('nameInput');
            var name = nameInput.value.trim();

            if (name.length === 0 || name.length > 30) {
                alert('Por favor, ingresa un nombre válido (máximo 30 caracteres).');
                return;
            }

            canSubmitNames = false;

            isNameAlreadySubmitted(name).then(function(alreadySubmitted) {
                if (alreadySubmitted) {
                    alert('Este nombre ya ha sido enviado. Elige otro.');
                    canSubmitNames = true;
                } else {
                    var messageObject = {
                        name: name,
                        userId: user.uid,
                        userName: user.displayName,
                        userEmail: user.email,
                    };

                    isAllowedUser(user.email).then(function(allowed) {
                        if (allowed) {
                            var newMessageRef = nameRef.push(messageObject);
                            userMessagesRef.child(user.uid).set({
                                userEmail: user.email,
                            });

                            markUserAsSubmitted(user.uid);

                            nameInput.value = '';
                            alert('Tu nombre ha sido enviado. Si no lo ves, por favor, recarga la página.');
                        } else {
                            alert('Este correo no está permitido.');
                        }

                        canSubmitNames = true;
                    });
                }
            });
        }
    });
}

function isNameAlreadySubmitted(name) {
    return nameRef.orderByChild('name').equalTo(name).once('value').then(function(snapshot) {
        return snapshot.exists();
    });
}

function resetUserMessages() {
    var user = firebase.auth().currentUser;

    if (user) {
        userMessagesRef.remove().then(function() {
            console.log('Todos los mensajes de usuarios han sido eliminados.');
        }).catch(function(error) {
            console.error('Error al eliminar los mensajes de usuarios:', error);
        });

        alert('Se ha restablecido la información de los mensajes de usuarios.');
    } else {
        alert('No tienes permisos para restablecer los mensajes de usuarios o no has iniciado sesión.');
    }
}

function resetNames() {
    var user = firebase.auth().currentUser;

    if (user) {
        nameRef.remove().then(function() {
            console.log('Todos los nombres han sido eliminados.');
        }).catch(function(error) {
            console.error('Error al eliminar los nombres:', error);
        });

        canSubmitNames = true;
        alert('Se han restablecido todos los envíos de nombres.');
    } else {
        alert('No tienes permisos para restablecer los envíos de nombres o no has iniciado sesión.');
    }
}

function resetAllData() {
    var user = firebase.auth().currentUser;

    if (user) {
        nameRef.remove().then(function() {
            console.log('Todos los nombres han sido eliminados.');
        }).catch(function(error) {
            console.error('Error al eliminar los nombres:', error);
        });

        userMessagesRef.remove().then(function() {
            console.log('Todos los mensajes de usuarios han sido eliminados.');
        }).catch(function(error) {
            console.error('Error al eliminar los mensajes de usuarios:', error);
        });

        canSubmitNames = true;
        alert('Se han restablecido todos los envíos y mensajes de usuarios.');
    } else {
        alert('No tienes permisos para restablecer los envíos o no has iniciado sesión.');
    }
}

function logout() {
    firebase.auth().signOut().then(function() {
        alert('Has cerrado sesión correctamente.');
    }).catch(function(error) {
        alert('Error al cerrar sesión: ' + error.message);
    });
}

function displayUserInfo(user) {
    var userInfoElement = document.getElementById('userInfo');
    var spinButton = document.getElementById('spinButton');

    if (userInfoElement) {
        userInfoElement.innerHTML = user ? `Usuario actual: ${user.displayName} (${user.email})` : '';

        var isAllowed = user && user.providerData[0]?.providerId === 'google.com' && user.uid === 'EcjgireoyRNjZ7Fo3W3eMZT05jp1';

        spinButton.style.display = isAllowed ? 'block' : 'none';
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    displayUserInfo(user);

    var allowedUserUid = "EcjgireoyRNjZ7Fo3W3eMZT05jp1";

    var loginButton = document.getElementById('loginButton');
    var emailLoginButton = document.getElementById('emailLoginButton');
    var registerButton = document.getElementById('registerButton');
    var logoutButton = document.getElementById('logoutButton');
    var resetUserMessagesButton = document.getElementById('resetUserMessagesButton');
    var resetNamesButton = document.getElementById('resetNamesButton');
    var resetButton = document.getElementById('resetButton');

    if (user) {
        loginButton.style.display = 'none';
        emailLoginButton.style.display = 'none';
        registerButton.style.display = 'none';
        logoutButton.style.display = 'block';

        if (user.uid === allowedUserUid) {
            resetUserMessagesButton.style.display = 'block';
            resetNamesButton.style.display = 'block';
            resetButton.style.display = 'block';
        } else {
            resetUserMessagesButton.style.display = 'none';
            resetNamesButton.style.display = 'none';
            resetButton.style.display = 'none';
        }
    } else {
        loginButton.style.display = 'block';
        emailLoginButton.style.display = 'block';
        registerButton.style.display = 'block';
        logoutButton.style.display = 'none';
        resetUserMessagesButton.style.display = 'none';
        resetNamesButton.style.display = 'none';
        resetButton.style.display = 'none';
    }
});

document.getElementById('nameForm').addEventListener('submit', handleFormSubmission);
document.getElementById('resetUserMessagesButton').addEventListener('click', resetUserMessages);
document.getElementById('resetNamesButton').addEventListener('click', resetNames);
document.getElementById('resetButton').addEventListener('click', resetAllData);
document.getElementById('logoutButton').addEventListener('click', logout);
document.getElementById('loginButton').addEventListener('click', loginWithGoogle);
document.getElementById('spinButton').addEventListener('click', spinTheWheel);
