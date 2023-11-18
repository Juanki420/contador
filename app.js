var firebaseConfig = {
    apiKey: "tu_apiKey",
    authDomain: "tu_authDomain",
    databaseURL: "tu_databaseURL",
    projectId: "tu_projectId",
    storageBucket: "tu_storageBucket",
    messagingSenderId: "tu_messagingSenderId",
    appId: "tu_appId"
};
firebase.initializeApp(firebaseConfig);

document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('nameInput').value;
    firebase.database().ref('names').push(name);
    document.getElementById('nameInput').value = '';
});

var nameList = document.getElementById('nameList');
var nameRef = firebase.database().ref('names');
nameRef.on('child_added', function(data) {
    var li = document.createElement('li');
    li.innerText = data.val();
    nameList.appendChild(li);
});
