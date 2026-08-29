window.onload = function() {
   
   draw();
             
   function draw() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.moveTo(50, 50); 
      ctx.lineTo(600, 50); 
      ctx.lineTo(600, 450); 
      ctx.lineTo(50, 450); 
      ctx.lineTo(50, 50); 
      
      ctx.fillStyle = "gray";
      ctx.fill(); 

      ctx.lineWidth = 15; 
      ctx.strokeStyle = "white";
      ctx.stroke();


      let culori = ["white", "yellow", "green", "cyan", "pink", "red", "blue"];

      let Y = 100;
      let X = 100;
      for (let i=0; i<7; i++) {
         ctx.beginPath();
         ctx.moveTo(X, Y); 
         ctx.lineTo(X+50, Y); 
         ctx.lineTo(X+50, Y+300); 
         ctx.lineTo(X, Y+300); 

         let culoare = culori[i];
         ctx.fillStyle = culoare;
         ctx.fill(); 

         X += 50;
      }

      ctx.beginPath();
      ctx.moveTo(100, 100); 
      ctx.lineTo(450, 100); 
      ctx.lineTo(450, 400); 
      ctx.lineTo(100, 400); 

      ctx.lineWidth = 10; 
      ctx.strokeStyle = "white";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(525, 150, 30, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(525, 250, 25, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(525, 350, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();

      const divMesaj = document.getElementById("mesaj");
      const poster = document.getElementById("poster");
      const divDetalii = document.getElementById("detalii"); 

      poster.addEventListener("mouseenter", function() {
         if (divDetalii.innerText !== "") { 
            divDetalii.style.display = "block";
         }
      });

      poster.addEventListener("mouseleave", function() {
         divDetalii.style.display = "none";
      });


      canvas.addEventListener("click", function(event) {
         if (event.target.id == "canvas") {

            fetch('zap.json')
               .then(response => response.json())
               .then(data => {
                  const lungime = data.length;
                  let idx = Math.floor(Math.random() * lungime);
                  
                  let title = data[idx].title;
                  let actors = data[idx].starring;
                  let date = data[idx].date;
                  let time = data[idx].time;
                  let rating = data[idx].rate;

                  poster.src = data[idx].poster;
                  divMesaj.innerHTML = "<p><b>" + date + ":</b></p><p>" + time + " - " + title + "</p>";
                  divDetalii.innerHTML = "Cu: " + actors + ". " + "Rating " + rating;
               })
               .catch(error => console.error("A apărut o eroare la JSON:", error));
         }
      });

   }
             
}
