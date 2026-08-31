window.onload = function() {

    let vec = ["miau", "mimimiau", "helloo", "^_^", "wowowiwa", "uhhidkcesapun", "miaumiaumiau", "dmn ce unemployed sunt"];

    let lista = document.createElement("ul");
    let forma = [];



    for (let i=0; i<10; i++) {
        let elem = document.createElement("li");

        let idx = Math.floor(Math.random() * vec.length);
        let text = vec[idx]
        elem.innerHTML = text;
        forma[i] = text;
        elem.className = "elem";
        lista.appendChild(elem);

        elem.addEventListener("click", function(e) {
            e.stopPropagation();
            elem.innerHTML = elem.innerHTML.split('').reverse().join('');
        });
    }

    document.body.appendChild(lista);

    document.addEventListener("click", function(e) {
        let elemente = document.querySelectorAll(".elem");
        for (let i=0; i<10; i++) {
            let elem = elemente[i];
            elem.innerHTML = forma[i];
        }
    });
}


