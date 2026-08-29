
window.onload = function(){
    
    const container = document.getElementById("container");
    const img = vizor.querySelector("img");

    const stilImg = window.getComputedStyle(img);

    let mtop = parseInt(stilImg.marginTop);
    let mleft = parseInt(stilImg.marginLeft);

    let waitcif = false;

    let scale = stilImg.scale !== "none" ? parseFloat(stilImg.scale) : 1;

    const pasMiscare = 10; 
    const pasZoom = 0.1;

    function picture() {
        let galerie = document.getElementById("galerie");
        let clona = vizor.cloneNode(true);
        clona.removeAttribute("id");
        clona.style.transform = "scale(0.5)";
        clona.style.margin = "-75px";
        
        galerie.appendChild(clona);
        
        img.classList.add("flash-effect");
        setTimeout(function() {
            img.classList.remove("flash-effect"); 
        }, 100);
        
        new Audio('fahhh.mp3').play(); 
    }

    document.addEventListener("keydown", function(e) {
        const latimeVizor = vizor.clientWidth;
        const inaltimeVizor = vizor.clientHeight;

        const latimeImg = img.width * scale;    
        const inaltimeImg = img.height * scale;

        const limitaStanga = latimeVizor - latimeImg;
        const limitaSus = inaltimeVizor - inaltimeImg;

        if (waitcif!=false && e.key>="0" && e.key<="9") {
            waitcif = false;
            let timerDisplay = document.getElementById("timerDisplay");
            let seconds = 5; 
            timerDisplay.textContent = seconds;

            let countdown = setInterval(function() {
                seconds--;
                    
                if (seconds > 0) {
                    timerDisplay.textContent = seconds;
                } else {
                    clearInterval(countdown);
                    timerDisplay.textContent = "";
                    picture();
                }
            }, 1000);
            return;
        }

        switch(e.key) {
            case "ArrowUp":
                mtop += pasMiscare;
                e.preventDefault();
                break;
            case "ArrowDown":
                mtop -= pasMiscare;
                e.preventDefault();
                break;
            case "ArrowLeft":
                mleft += pasMiscare;
                e.preventDefault();
                break;
            case "ArrowRight":
                mleft -= pasMiscare;
                e.preventDefault();
                break;
            case "+":
            case "=": 
                scale += pasZoom;
                break;
            case "-":
            case "_":
                if (scale > 1) {
                    scale -= pasZoom;
                }
                break;

            /// cerintele noi
            case "t":
                waitcif = true; 
                document.getElementById("timerDisplay").textContent = "?"; // Indiciu vizual
                break;
            case "s":
                picture();
                break;
            case "b":
                picture();
                seconds = 0;
                let rafala = setInterval(function() {
                    seconds = seconds + 0.5;
                    
                    if (seconds <= 2) {
                        picture();
                    } else {
                        clearInterval(rafala);
                    }
                }, 500);
                break;
        }

        if (mtop > 0) mtop = 0;
        if (mleft > 0) mleft = 0;
        
        if (mtop < limitaSus) mtop = limitaSus;
        if (mleft < limitaStanga) mleft = limitaStanga;

        img.style.marginTop = mtop + "px";
        img.style.marginLeft = mleft + "px";
        img.style.scale = scale;
   });
}


