window.onload = function() {
   
   draw();
             
   function draw() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.moveTo(50, 50); 
      ctx.lineTo(750, 50); 
      ctx.lineTo(750, 500); 
      ctx.lineTo(50, 500); 
      ctx.lineTo(50, 50); 
      
      ctx.fillStyle = "red";
      ctx.fill(); 

      ctx.lineWidth = 15; 
      ctx.strokeStyle = "white";
      ctx.stroke();

      ctx.save();
      ctx.clip();

      for (let i=0; i<6; i++) {
         ctx.beginPath();
         let Y = 280 + (i * 45); 
         let X = 50;

         ctx.moveTo(X, Y);
         while (X < 750) {
            ctx.lineTo(X + 50, Y + 45); 
            ctx.lineTo(X + 100, Y);     
            X = X + 100;                     
         }

         if (i%2==0) {
            ctx.strokeStyle = "black";
         } else {
            ctx.strokeStyle = "white";
         }
         ctx.lineWidth = 35; 
         ctx.stroke();
      }

      ctx.restore();

      let trandafir = new Image();
      trandafir.src = "rose.webp"; 
      trandafir.onload = function() {
         let inaltime = 100;
         let latime = inaltime * (trandafir.width / trandafir.height);
         ctx.drawImage(trandafir, 333, 150, latime, inaltime); 
      };

      const divMesaj = document.getElementById("mesaj");
      const divDetalii = document.getElementById("detalii"); 

      divMesaj.addEventListener("mouseenter", function() {
         if (divDetalii.innerText !== "") { 
            divDetalii.style.display = "block";
         }
      });

      divMesaj.addEventListener("mouseleave", function() {
         divDetalii.style.display = "none";
      });


      canvas.addEventListener("click", function(event) {
         const rect = canvas.getBoundingClientRect();
         const clickX = event.clientX - rect.left;
         const clickY = event.clientY - rect.top;

         if (clickX >= 333 && clickX <= 433 && clickY >= 150 && clickY <= 250) {
            fetch('quotes.json')
               .then(response => response.json())
               .then(data => {
                  const lungime = data.length;
                  let idx = Math.floor(Math.random() * lungime);
                  
                  let character = data[idx].character;
                  let quote = data[idx].quote;

                  divMesaj.innerHTML = "<b>" + character + ":</b>" + quote;
                  divDetalii.innerHTML = data[idx].season + " " + data[idx].episode;
               })
               .catch(error => console.error("A apărut o eroare la JSON:", error));
         }
      });

   }
             
}
