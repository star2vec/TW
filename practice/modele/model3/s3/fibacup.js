window.onload = function() {
   
   draw();
             
   function draw() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      const height = 500;
      const width = 800;

      ctx.beginPath();
      ctx.moveTo(50, 50); 
      ctx.lineTo(850, 50); 
      ctx.lineTo(850, 550); 
      ctx.lineTo(50, 550); 
      ctx.lineTo(50, 50); 
      
      ctx.fillStyle = "orange";
      ctx.fill(); 

      ctx.lineWidth = 5; 
      ctx.strokeStyle = "white";
      ctx.stroke();

      ctx.save();
      ctx.clip();

      ctx.beginPath();         
      ctx.moveTo(450, 50);      
      ctx.lineTo(450, 550);

      ctx.lineWidth = 5; 
      ctx.strokeStyle = "white";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(450, 300, 100, 0, 2 * Math.PI);
      ctx.lineWidth = 5; 
      ctx.strokeStyle = "white";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(50, 300, 240, 0, 2 * Math.PI);
      ctx.lineWidth = 5; 
      ctx.strokeStyle = "white";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(850, 300, 240, 0, 2 * Math.PI);
      ctx.lineWidth = 5; 
      ctx.strokeStyle = "white";
      ctx.stroke();


      ctx.beginPath();
      ctx.arc(150, 300, 75, 0, 2 * Math.PI);
      ctx.lineWidth = 5; 
      ctx.strokeStyle = "white";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(750, 300, 75, 0, 2 * Math.PI);
      ctx.lineWidth = 5; 
      ctx.strokeStyle = "white";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 225); 
      ctx.lineTo(150, 225); 
      ctx.lineTo(150, 375); 
      ctx.lineTo(0, 375); 
      ctx.lineWidth = 5; 
      ctx.strokeStyle = "white";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(850, 225); 
      ctx.lineTo(750, 225); 
      ctx.lineTo(750, 375); 
      ctx.lineTo(850, 375); 
      ctx.lineWidth = 5; 
      ctx.strokeStyle = "white";
      ctx.stroke();

      ctx.restore();


      const divMesaj = document.getElementById("mesaj");
      const steag1 = document.getElementById("steag1");
      const steag2 = document.getElementById("steag2");
      const nume1 = document.getElementById("nume1"); 
      const nume2 = document.getElementById("nume2"); 
      const nume = document.getElementById("nume"); 

      steag1.addEventListener("mouseenter", function() {
         if (nume1.innerText !== "") { 
            nume.innerHTML = nume1.innerText;
            nume.style.display = "block";
         }
      });

      steag2.addEventListener("mouseenter", function() {
         if (nume2.innerText !== "") { 
            nume.innerHTML = nume2.innerText;
            nume.style.display = "block";
         }
      });

      steag1.addEventListener("mouseleave", function() {
         nume.style.display = "none";
      });

      steag2.addEventListener("mouseleave", function() {
         nume.style.display = "none";
      });


      canvas.addEventListener("click", function(event) {
         if (event.target.id == "canvas") {

            fetch('fibacup.json')
               .then(response => response.json())
               .then(data => {
                  const lungime = data.length;
                  let idx = Math.floor(Math.random() * lungime);
                  
                  let date = data[idx].date;
                  let time = data[idx].time;
                  let rating = data[idx].rate;

                  divMesaj.innerHTML = date + " at " + time;
                  nume1.innerHTML = data[idx].home;
                  nume2.innerHTML = data[idx].guest;
                  steag1.src = data[idx].homeflag;
                  steag2.src = data[idx].guestflag;
               })
               .catch(error => console.error("A apărut o eroare la JSON:", error));
         }
      });

   }
             
}
