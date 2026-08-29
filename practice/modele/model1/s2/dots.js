
window.onload = function(){

    let nrdots = 0;

    if (localStorage.getItem("numar")) {
        nrdots = parseInt(localStorage.getItem("numar"));
    }

    let counter = document.getElementById("counter");
    counter.innerText = nrdots;

    function crestenr() {
        nrdots++; 
        localStorage.setItem("numar", nrdots); 
        counter.innerText = nrdots; 
    }

    document.addEventListener("keydown", function(e) {

        valid = ["r", "g", "y", "b"];

        if (valid.includes(e.key)==false) {
            return;
        }
        
        let dot = document.createElement("div");
        dot.className = "dot";
        
        switch(e.key) {
            case "r":
                dot.style.backgroundColor = "red";
                break;
            case "g":
                dot.style.backgroundColor = "green";
                break;
            case "y":
                dot.style.backgroundColor = "yellow";
                break;
            case "b":
                dot.style.backgroundColor = "blue";
                break;
        }

        let size = document.getElementById("size");
        let sizeval = size.value + "px";

        dot.style.height = sizeval;
        dot.style.width = sizeval;

        let maxX = window.innerWidth - size.value;
        let maxY = window.innerHeight - size.value;

        dot.style.left = Math.floor(Math.random() * maxX) + "px";
        dot.style.top = Math.floor(Math.random() * maxY) + "px";
        
        document.body.appendChild(dot);
        crestenr();
   });

   document.addEventListener("click", function(e) {
        if (e.target.className=="dot") {
            
            let dot = e.target;

            let clona = dot.cloneNode(true);
            clona.removeAttribute("id");
            
            let sizenr = parseInt(clona.style.height);

            let maxX = window.innerWidth - sizenr;
            let maxY = window.innerHeight - sizenr;

            clona.style.left = Math.floor(Math.random() * maxX) + "px";
            clona.style.top = Math.floor(Math.random() * maxY) + "px";
        
            document.body.appendChild(clona);
            crestenr();
        }
   });

   
}


