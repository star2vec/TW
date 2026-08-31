window.onload = function() {

    if (localStorage.getItem("culoare")) {
        document.body.style.background = localStorage.getItem("culoare");
    }

    let culori = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "black", "white", "gray", "brown"];

    let first = "miau";

    document.addEventListener("keydown", function(e) {
        let valid = ["1", "2", "3", "4", "5"];

        if (valid.includes(e.key)==false) {
            return;
        }

        let buttons = document.querySelectorAll("input");

        for (let i=0; i<buttons.length; i++) {
            let button = buttons[i];

            if (button.value === e.key) {
                let idx = Math.floor(Math.random() * culori.length);
                let culoare = culori[idx];
                if (first=="miau") {
                    first = culoare;
                }
                button.style.backgroundColor = culoare;

                let nrsec = 0;
                let sterge = setInterval(() => {
                    if (nrsec==3) {
                        button.remove();
                        if (document.querySelectorAll("input").length === 0) {
                            if (first!="miau") {
                                localStorage.setItem("culoare", first);
                            }                 
                        }
                        clearInterval(sterge);
                    }
                    nrsec++;
                }, 1000);
            }
        }
    }); 
    
    
    
}


