// app.js

var firebaseConfig = {
    // Tu configuración de Firebase aquí
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
