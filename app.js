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

// Usar 'child_added' para cargar nombres existentes al inicio y en tiempo real
nameRef.on('child_added', function(data) {
    var li = document.createElement('li');
    li.innerText = data.val();
    nameList.appendChild(li);
});

var hasSubmittedName = false; // Variable para rastrear si se ha enviado un nombre

document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();

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

    // Enviar el nombre a Firebase
    firebase.database().ref('names').push(name);
    nameInput.value = '';
});
