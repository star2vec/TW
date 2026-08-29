window.onload = function() {

    let nrgen = 0;
    let miscare = null;

    if (localStorage.getItem("numar")) {
        nrgen = parseInt(localStorage.getItem("numar"));
    }

    let counter = document.createElement("div");
    document.body.appendChild(counter);
    counter.className = "counter";
    counter.innerText = nrgen;


    function crestenr() {
        nrgen++; 
        localStorage.setItem("numar", nrgen); 
        counter.innerText = nrgen; 

        if (nrgen%5===0) {
            let mush = document.createElement("img");

            mush.className = "mush";
            mush.src = "mush.png";
            let maxX = window.innerWidth - mush.width;
            let maxY = window.innerHeight - mush.height;

            mush.style.left = Math.floor(Math.random() * maxX) + "px";
            mush.style.top = Math.floor(Math.random() * maxY) + "px";

            document.body.appendChild(mush);
        }
    }

    document.addEventListener("keydown", function(e) {
        valid = ["b", "p"];

        if (valid.includes(e.key)==false) {
            return;
        }
        
        switch(e.key) {
            case "p":
                new Audio('badger.mp3').play(); 
                break;
            case "b":
                let badger = document.createElement("img");
                badger.className = "badger1";
                badger.src = "badger-1.png";
                let maxX = window.innerWidth - badger.width;
                let maxY = window.innerHeight - badger.height;

                badger.style.left = Math.floor(Math.random() * maxX) + "px";
                badger.style.top = Math.floor(Math.random() * maxY) + "px";

                document.body.appendChild(badger);

                break;
            
        }
   });

   document.addEventListener("click", function(e) {
        if (e.target.className=="badger1") {
            let badger = e.target;

            badger.className = "badger2";

            let i = 0;
            badger.miscare = setInterval(() => {
                if (i%9==0) {
                    badger.src = "badger-1.png";
                } else if (i%9==1) {
                    badger.src = "badger-2.png";
                } else if (i%9==2) {
                    badger.src = "badger-3.png";
                } else if (i%9==3) {
                    badger.src = "badger-4.png";
                    crestenr();
                }
                i++;
            }, 200);
        } else if (e.target.className=="badger2") {
            let badger = e.target;
            clearInterval(badger.miscare);
            badger.remove(); 
        }
   });
}


