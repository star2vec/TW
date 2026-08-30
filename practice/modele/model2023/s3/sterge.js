window.onload = function() {

    let input = document.getElementById("numar");

    if (localStorage.getItem("numar")) {
        input.value = parseInt(localStorage.getItem("numar"));
    }

    function updatenr(nr) {
        localStorage.setItem("numar", nr); 
    }

    document.addEventListener("keydown", function(e) {
        valid = ["s"];

        if (valid.includes(e.key)==false) {
            return;
        }

        let limit = parseInt(input.value);
        let ps = document.querySelectorAll("p");
        let todelete = [];

        for (let i=0; i<ps.length; i++) {
            let p = ps[i];
            let text = p.innerText.trim();
            let nrcuv = text === "" ? 0 : text.split(/\s+/).length;

            if (nrcuv > limit) {
                todelete.push(p);
            }
        }

        let idx = 0;
        let sterge = setInterval(function() {
            if (idx < todelete.length) {
                let p = todelete[idx]; 
                p.remove(); 
                idx++;
            } else {
                updatenr(idx);
                clearInterval(sterge);
            }
        }, 1000);
   });
}


