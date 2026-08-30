window.onload = function(){

    for (let i=0; i<10; i++) {
        let div = document.createElement("div");
        div.className = "dreptunghi";
        div.innerHTML = " ";
        document.body.appendChild(div);

        div.addEventListener("click", function(e) {
            e.stopPropagation();
            let newheight =  div.offsetHeight + 10;
            div.style.height = newheight + "px";
        });
    }

    document.addEventListener("click", function(e) {
        let divs = document.querySelectorAll(".dreptunghi");
        for (let i=0; i<divs.length; i++) {
            let div = divs[i];
            div.style.height = "70px";
       }
    });
}


