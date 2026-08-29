window.onload = function() {

    let nrsparte = 0;
    let miscare = null;

    if (sessionStorage.getItem("numar")) {
        nrsparte = parseInt(sessionStorage.getItem("numar"));
    }

    let counter = document.getElementById("counter");
    counter.className = "counter";
    counter.innerText = nrsparte;

    function crestenr() {
        nrsparte++; 
        sessionStorage.setItem("numar", nrsparte); 
        counter.innerText = nrsparte; 
    }

    document.addEventListener("keydown", function(e) {
        valid = ["s", "p", "f"];

        if (valid.includes(e.key)==false) {
            return;
        }
        
        switch(e.key) {
            case "s":
                let bubble = document.createElement("img");
                bubble.className = "bubble";
                bubble.src = "bubble-1.png";
                let maxX = window.innerWidth - bubble.width;
                let maxY = window.innerHeight - bubble.height;

                bubble.style.left = Math.floor(Math.random() * maxX) + "px";
                bubble.style.top = Math.floor(Math.random() * maxY) + "px";

                document.body.appendChild(bubble);
                break;

            case "p":
                if (!miscare) {
                    miscare = setInterval(() => {
                        bubbles = document.querySelectorAll(".bubble");
                        bubbles.forEach(bubble => {
                            const dx = (Math.random() - 0.5) * 100; 
                            const dy = (Math.random() - 0.5) * 100;
                            const X = parseFloat(bubble.style.left);
                            const Y = parseFloat(bubble.style.top);
                            bubble.style.left = (X + dx) + "px";
                            bubble.style.top = (Y + dy) + "px";
                        });
                    }, 100);
                }
                break;
            
            case "f":
                if (miscare) {
                    clearInterval(miscare);
                    miscare = null;
                }
                break;
            
        }
   });

   document.addEventListener("click", function(e) {
        if (e.target.className=="bubble") {
            let bubble = e.target;

            let i = 0;
            bubble.pop = setInterval(() => {
                if (i==0) {
                    bubble.src = "bubble-2.png";
                } else if (i==1) {
                    bubble.src = "bubble-3.png";
                } else if (i==2) {
                    bubble.src = "bubble-4.png";
                } else if (i==3) {
                    crestenr();
                    clearInterval(bubble.pop);
                    bubble.remove();
                }
                i++;
            }, 100);
        }
   });
}


