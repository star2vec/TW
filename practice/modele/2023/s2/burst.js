window.onload = function() {

    createtable();

    let nrsparte = 0;
    let miscare = null;

    if (localStorage.getItem("numar")) {
        nrsparte = parseInt(localStorage.getItem("numar"));
    }

    let counter = document.createElement("div");
    document.body.appendChild(counter);
    counter.className = "counter";
    counter.innerText = nrsparte;


    function crestenr() {
        nrsparte++; 
        localStorage.setItem("numar", nrsparte); 
        counter.innerText = nrsparte; 
    }

    function createtable() {
        let container = document.createElement("div");
        document.body.appendChild(container);

        let nrows = 6;
        let ncols = 10;

        let table = document.createElement("table");
        table.id = "table";
        for (let l=0; l<nrows; l++) {
            let lin = document.createElement("tr");
            lin.className = "row";
            for (let c=0; c<ncols; c++) {
                let cell = document.createElement("td");
                lin.appendChild(cell);

                let bubble = document.createElement("img");
                bubble.className = "bubble";
                bubble.id = "r" + l + "c" + c;
                bubble.src = "bubble0.jpg";

                cell.appendChild(bubble);

            }
            table.appendChild(lin);
        }
        container.appendChild(table);
    }

    document.addEventListener("click", function(e) {
        if (e.target.className=="bubble") {
            let bubble = e.target;

            bubble.src = 'bubble1.jpg';
            crestenr();

            let audios = ['bubble1.mp3', 'bubble2.mp3', 'bubble3.mp3'];
            let idx = Math.floor(Math.random() * audios.length);
            let audio = audios[idx];

            new Audio(audio).play(); 
            
        }
    });

    function bubblepop() {
        let bubbles = document.querySelectorAll(".bubble");
        let topop = Array.from(bubbles).filter(b => b.src.includes('bubble0.jpg'));

        if (topop.length === 0) {
            return;
        }

        let idx = Math.floor(Math.random() * topop.length);
        let bubble = topop[idx];

        bubble.src = 'bubble1.jpg';
        crestenr();
        let audios = ['bubble1.mp3', 'bubble2.mp3', 'bubble3.mp3'];
        idx = Math.floor(Math.random() * audios.length);
        let audio = audios[idx];
        new Audio(audio).play(); 
    }

    /*
    function reset() {
        let nrows = 6;
        let ncols = 10;

        let table = document.getElementById("table");
        for (let l=0; l<nrows-1; l++) {
            for (let c=0; c<ncols; c++) {
                let b1 = document.getElementById("r" + l + "c" + c);
                let ll = l+1;
                let b2 = document.getElementById("r" + ll + "c" + c);      
                if (b2.src.includes('bubble0.jpg')) {
                    b1.src = 'bubble0.jpg';
                } else {
                    b1.src = 'bubble1.jpg';
                }
            }
        }

        l = nrows-1;
        for (c=0; c<ncols; c++) {
            let b = document.getElementById("r" + l + "c" + c);
            b.src = 'bubble0.jpg';
        }
    }*/

    function reset() {
        let table = document.getElementById("table");
        table.deleteRow(0);

        let nrows = 6;
        let ncols = 10;
        let lin = document.createElement("tr");
        lin.className = "row";

        for (let l=0; l<nrows-1; l++) {
            for (let c=0; c<ncols; c++) {
                ll = l+1;
                let bubble = document.getElementById("r" + ll + "c" + c);
                bubble.id = "r" + l + "c" + c;
            }
        }

        l = nrows-1;
        for (c=0; c<ncols; c++) {
            let cell = document.createElement("td");
            bubble = document.createElement("img");
            bubble.className = "bubble";
            bubble.id = "r" + l + "c" + c; 
            bubble.src = "bubble0.jpg";
            cell.appendChild(bubble);
            lin.appendChild(cell);
        }
        table.appendChild(lin);
    }
    
    document.addEventListener("keydown", function(e) {
        valid = ["b", "r"];

        if (valid.includes(e.key)==false) {
            return;
        }
        
        switch(e.key) {
            case "b":
                bubblepop();
                break;
            case "r":
                let i = 0;
                let resettable = setInterval(() => {
                    if (i<6) {
                        reset();
                    } else {
                        clearInterval(resettable);
                    }
                    i++;
                }, 500);
                break;
            
        }
   });
}


