window.onload = function() {
   
   draw();
             
   function draw() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.arc(150, 150, 100, Math.PI, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(150, 150, 100, 0, 2 * Math.PI);
      ctx.fillStyle = "black";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(50, 150);
      ctx.lineTo(250, 150);
      ctx.fillStyle = "black";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(150, 150, 35, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(150, 150, 35, 0, 2 * Math.PI);
      ctx.fillStyle = "black";
      ctx.lineWidth = 10;
      ctx.stroke();
           
      const divMesaj = document.getElementById("mesaj");
      const pokemon = document.getElementById("pokemon");
      const divDetalii = document.getElementById("detalii"); 

      pokemon.addEventListener("mouseenter", function() {
         if (divDetalii.innerText !== "") { 
            divDetalii.style.display = "block";
         }
      });

      pokemon.addEventListener("mouseleave", function() {
         divDetalii.style.display = "none";
      });

      canvas.addEventListener("click", function(event) {
         if (event.target.id == "canvas") {

            fetch('poke.json')
               .then(response => response.json())
               .then(data => {
                  const lungime = data.length;
                  let idx = Math.floor(Math.random() * lungime);
                  
                  let nume = data[idx].name;
                  pokemon.src = data[idx].image;

                  let nr = 0;
                  if (sessionStorage.getItem(nume)) {
                     nr = parseInt(sessionStorage.getItem(nume));
                  }
                  nr++;
                  sessionStorage.setItem(nume, nr); 

                  divMesaj.innerHTML = nume + ", I choose you! (" + nr + ")";

                  let level = data[idx].level;
                  let ability = data[idx].ability;
                  divDetalii.innerHTML = "<ul><li>" + level + "</li><li>" + ability + "</li></ul>";
               })
               .catch(error => console.error("A apărut o eroare la JSON:", error));
         }
      });
   }
}

