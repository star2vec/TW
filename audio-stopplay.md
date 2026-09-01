Pentru a controla redarea unei melodii, folosești metodele native .play() și .pause() din JavaScript, alături de proprietatea .paused pentru a afla starea curentă a fișierului.

Varianta 1: Pentru un tag <audio> existent în HTML

Dacă ai audio-ul direct în pagină, îl selectezi și îi asociezi logica unui buton de comutare (toggle).

HTML
<!-- HTML -->
<audio id="muzica" src="resources/bmo-song.mp3"></audio>
<button id="buton-audio">Play</button>
JavaScript
// JavaScript
let audio = document.getElementById("muzica");
let buton = document.getElementById("buton-audio");

buton.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
        buton.innerText = "Pause"; 
    } else {
        audio.pause();
        buton.innerText = "Play";
    }
});
Varianta 2: Pentru un fișier creat direct din JavaScript

Dacă generezi sunetul exclusiv din cod (așa cum ai făcut la roata norocului), trebuie să te asiguri că salvezi acel new Audio() într-o variabilă declarată mai sus, ca să ai acces la ea din orice funcție, nu doar local.

JavaScript
// Declară variabila global, la începutul scriptului
let sunet = new Audio('resources/wheel.mp3');

document.getElementById("buton-play").addEventListener("click", function() {
    sunet.play();
});

document.getElementById("buton-pause").addEventListener("click", function() {
    sunet.pause();
    
    // Opțional: Dacă vrei ca la următorul play să o ia de la capăt, nu de unde a rămas
    // sunet.currentTime = 0; 
});
