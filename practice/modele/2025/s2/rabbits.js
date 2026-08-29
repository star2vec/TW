window.onload = function() {

    let nrrab = 0;
    let miscare = null;

    if (sessionStorage.getItem("numar")) {
        nrrab = parseInt(sessionStorage.getItem("numar"));
    }

    let counter = document.getElementById("counter");
    counter.innerText = nrrab;

    function crestenr() {
        nrrab++; 
        sessionStorage.setItem("numar", nrrab); 
        counter.innerText = nrrab; 
    }

    document.addEventListener("keydown", function(e) {

        valid = ["r", "p", "s", "a"];

        if (valid.includes(e.key)==false) {
            return;
        }
        
        switch(e.key) {
            case "a":
                new Audio('rabbits-ambience.mp3').play(); 
                break;
            case "r":
                let rabbit = document.createElement("img");
                rabbit.className = "rabbit";
                rabbit.src = "rabbit-01.png";
                let maxX = window.innerWidth - rabbit.width;
                let maxY = window.innerHeight - rabbit.height;

                rabbit.style.left = Math.floor(Math.random() * maxX) + "px";
                rabbit.style.top = Math.floor(Math.random() * maxY) + "px";

                document.body.appendChild(rabbit);
                crestenr();

                break;
            
            case "p":
                if (!miscare) {
                    miscare = setInterval(() => {
                        rabbits = document.querySelectorAll(".rabbit");
                        rabbits.forEach(rabbit => {
                            const dx = (Math.random() - 0.5) * 100; 
                            const dy = (Math.random() - 0.5) * 100;
                            const X = parseFloat(rabbit.style.left);
                            const Y = parseFloat(rabbit.style.top);
                            rabbit.style.left = (X + dx) + "px";
                            rabbit.style.top = (Y + dy) + "px";
                        });
                    }, 100);
                }
                break;
            
            case "s":
                if (miscare) {
                    clearInterval(miscare);
                    miscare = null;
                }
                break;
        }
   });

   document.addEventListener("click", function(e) {
        if (e.target.className=="rabbit") {
            let rabbit = e.target;

            if (rabbit.src.includes('rabbit-01.png')) {
                rabbit.src = "rabbit-02.png";
            } else if (rabbit.src.includes('rabbit-02.png')) {
                rabbit.src = "rabbit-03.png";
            } else if (rabbit.src.includes('rabbit-03.png')) {
                rabbit.remove(); 
            }
        }
   });
}


