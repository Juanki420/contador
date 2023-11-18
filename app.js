// app.js

var firebaseConfig = {
    // Tu configuración de Firebase aquí
};

firebase.initializeApp(firebaseConfig);

var nameList = document.getElementById('nameList');
var nameRef = firebase.database().ref('names');

// Usar 'child_added' para cargar nombres existentes al inicio y en tiempo real
nameRef.on('child_added', function(data) {
    var li = document.createElement('li');
    li.innerText = data.val();
    nameList.appendChild(li);
});

// Verificar si se ha enviado un nombre almacenado en el localStorage
var hasSubmittedName = localStorage.getItem('hasSubmittedName') === 'true';

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

document.getElementById('submitButton').addEventListener('click', handleFormSubmission);
