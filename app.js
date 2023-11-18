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

// Usar 'value' para cargar nombres existentes al inicio
nameRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var li = document.createElement('li');
        li.innerText = childSnapshot.val();
        nameList.appendChild(li);
    });
});

document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('nameInput').value;
    if (name.trim() !== '') {
        firebase.database().ref('names').push(name);
        document.getElementById('nameInput').value = '';
    }
});

// Definir la función submitForm
function submitForm() {
    var name = document.getElementById('nameInput').value;
    if (name.trim() !== '') {
        firebase.database().ref('names').push(name);
        document.getElementById('nameInput').value = '';
    }
}
