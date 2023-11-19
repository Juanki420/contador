var firebaseConfig = {
    apiKey: "AIzaSyC5FR4fLXV1zjAzZ4WFIwBG97Aes3FtPWo",
    authDomain: "contador-c6528.firebaseapp.com",
    databaseURL: "https://contador-c6528-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "contador-c6528",
    storageBucket: "contador-c6528.appspot.com",
    messagingSenderId: "575749501934",
    appId: "1:575749501934:web:4b48ebab36b25e925914ff"
};
var allowedEmails = ["usuario1@example.com", "usuario2@example.com", "usuario3@example.com"];

firebase.initializeApp(firebaseConfig);

var nameList = document.getElementById('nameList');
var nameRef = firebase.database().ref('names');
var userMessagesRef = firebase.database().ref('userMessages');
var canSubmitNames = true;

nameRef.on('child_added', handleNameChange);
nameRef.on('child_changed', handleNameChange);

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

function isAllowedUser() {
    var user = firebase.auth().currentUser;
    return user && user.providerData[0]?.providerId === 'google.com' && user.uid === 'EcjgireoyRNjZ7Fo3W3eMZT05jp1';
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

            // Verifica si el nombre ya ha sido enviado
            isNameAlreadySubmitted(name).then(function(alreadySubmitted) {
                if (alreadySubmitted) {
                    alert('Este nombre ya ha sido enviado. Por favor, elige otro.');
                } else {
                    canSubmitNames = false;

                    var messageObject = {
                        name: name,
                        userId: user.uid,
                        userName: user.displayName,
                        userEmail: user.email,
                    };

                    var newMessageRef = nameRef.push(messageObject);

                    markUserAsSubmitted(user.uid);

                    nameInput.value = '';
                    alert('Su nombre ha sido enviado. Si no lo ve, por favor, recargue la página.');
                }
            });
        }
    });
}

// Función para verificar si el nombre ya ha sido enviado
function isNameAlreadySubmitted(name) {
    return nameRef.orderByChild('name').equalTo(name).once('value').then(function(snapshot) {
        return snapshot.exists();
    });
}

function resetUserMessages() {
    var user = firebase.auth().currentUser;

    if (user && isAllowedUser()) {
        // Eliminar todos los 'userMessages'
        userMessagesRef.remove()
            .then(function() {
                console.log('Todos los mensajes de usuarios han sido eliminados.');
            })
            .catch(function(error) {
                console.error('Error al eliminar los mensajes de usuarios:', error);
            });

        alert('Se ha restablecido la información de los mensajes de usuarios.');
    } else {
        alert('No tienes permisos para restablecer los mensajes de usuarios o no has iniciado sesión.');
    }
}

function resetNames() {
    var user = firebase.auth().currentUser;

    if (user && isAllowedUser()) {
        // Eliminar todos los nombres en 'names'
        nameRef.remove()
            .then(function() {
                console.log('Todos los nombres han sido eliminados.');
            })
            .catch(function(error) {
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

    if (user && isAllowedUser()) {
        // Eliminar todos los nombres en 'names'
        nameRef.remove()
            .then(function() {
                console.log('Todos los nombres han sido eliminados.');
            })
            .catch(function(error) {
                console.error('Error al eliminar los nombres:', error);
            });

        // Eliminar todos los 'userMessages'
        userMessagesRef.remove()
            .then(function() {
                console.log('Todos los mensajes de usuarios han sido eliminados.');
            })
            .catch(function(error) {
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

        // Verifica si el usuario actual es el permitido
        var isAllowed = user && user.providerData[0]?.providerId === 'google.com' && user.uid === 'EcjgireoyRNjZ7Fo3W3eMZT05jp1';

        // Muestra u oculta el botón de la ruleta según el resultado de la verificación
        spinButton.style.display = isAllowed ? 'block' : 'none';
    }
}

function loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            alert('¡Has iniciado sesión con Google correctamente!');
        })
        .catch(function(error) {
            alert('Error al iniciar sesión con Google: ' + error.message);
        });
}
function spinTheWheel() {
    var names = [];  // Array para almacenar todos los nombres

    // Obtener todos los nombres de la base de datos
    nameRef.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var name = childSnapshot.val().name;
                names.push(name);
            });

            // Verificar si hay nombres disponibles
            if (names.length > 0) {
                // Elegir un nombre al azar
                var randomIndex = Math.floor(Math.random() * names.length);
                var winner = names[randomIndex];

                alert('¡El ganador es: ' + winner + '!');
            } else {
                alert('No hay nombres disponibles para elegir.');
            }
        })
        .catch(function(error) {
            console.error('Error al obtener nombres:', error);
        });
}


firebase.auth().onAuthStateChanged(function(user) {
    displayUserInfo(user);

    var allowedUserUid = "EcjgireoyRNjZ7Fo3W3eMZT05jp1";  // Reemplaza con el identificador único de la cuenta permitida

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
            // Mostrar botones solo para la cuenta permitida
            resetUserMessagesButton.style.display = 'block';
            resetNamesButton.style.display = 'block';
            resetButton.style.display = 'block';
        } else {
            // Ocultar botones para otras cuentas
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
