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

// Definir la función submitForm
function submitForm() {
    var name = document.getElementById('nameInput').value;
    if (name.trim() !== '') {
        firebase.database().ref('names').push(name);
        document.getElementById('nameInput').value = '';
    }
}

var nameList = document.getElementById('nameList');
var nameRef = firebase.database().ref('names');

// Usar 'child_added' para cargar nombres existentes al inicio y en tiempo real
nameRef.on('child_added', function(data) {
    var li = document.createElement('li');
    li.innerText = data.val();
    nameList.appendChild(li);
});

document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    submitForm();  // Llamar directamente a submitForm aquí
});
