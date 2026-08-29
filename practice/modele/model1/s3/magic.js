window.onload = function() {
   
   let nrclick = 0;

    if (localStorage.getItem("numar")) {
        nrclick = parseInt(localStorage.getItem("numar"));
    }
   
   draw();

   const culori = ["green", "red", "orange"];
             
   function draw() {
      const canvas = document.getElementById("canvball");
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.arc(150, 150, 100, 0, 2 * Math.PI);
      ctx.fillStyle = "black";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(150, 150, 50, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.font = "30px Arial"; 
      ctx.fillStyle = "black"; 
      ctx.textAlign = "center";
      ctx.textBaseline = "middle"; 
      ctx.fillText(nrclick, 150, 150);

      canvas.addEventListener("click", function(event) {
         const rect = canvas.getBoundingClientRect();
         const x = event.clientX - rect.left;
         const y = event.clientY - rect.top;

         const ctx = canvas.getContext("2d");
         ctx.beginPath();
         ctx.arc(150, 150, 50, 0, 2 * Math.PI);

         if (ctx.isPointInPath(x, y)) {
            coloreaza();
         }
      });
   }
             
   function coloreaza() {
      nrclick++;
      localStorage.setItem("numar", nrclick);

      const canvas = document.getElementById("canvball");
      const ctx = canvas.getContext("2d");
      const divMesaj = document.getElementById("mesaj-raspuns");

      let idx = Math.floor(Math.random() * culori.length);
      let culoare = culori[idx];

      fetch('magic.json')
         .then(response => response.json())
         .then(data => {
            const texte = data[culoare];
            const text = texte[Math.floor(Math.random() * texte.length)];

            divMesaj.textContent = text;
            divMesaj.style.color = culoare;
         })
         .catch(error => console.error("A apărut o eroare la JSON:", error));

      ctx.beginPath();
      ctx.arc(150, 150, 50, 0, 2 * Math.PI);
      ctx.fillStyle = culoare;
      ctx.fill();

      ctx.font = "30px Arial"; 
      ctx.fillStyle = "black"; 
      ctx.textAlign = "center";
      ctx.textBaseline = "middle"; 
      ctx.fillText(nrclick, 150, 150);
   }
}
