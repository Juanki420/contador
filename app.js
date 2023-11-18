var firebaseConfig = {
    apiKey: "AIzaSyC5FR4fLXV1zjAzZ4WFIwBG97Aes3FtPWo",
    authDomain: "contador-c6528.firebaseapp.com",
    databaseURL: "https://contador-c6528.firebaseio.com",
    projectId: "contador-c6528",
    storageBucket: "contador-c6528.appspot.com",
    messagingSenderId: "575749501934",
    appId: "1:575749501934:web:4b48ebab36b25e925914ff"
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



<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC5FR4fLXV1zjAzZ4WFIwBG97Aes3FtPWo",
    authDomain: "contador-c6528.firebaseapp.com",
    projectId: "contador-c6528",
    storageBucket: "contador-c6528.appspot.com",
    messagingSenderId: "575749501934",
    appId: "1:575749501934:web:4b48ebab36b25e925914ff"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>
