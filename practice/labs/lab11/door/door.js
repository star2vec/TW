window.onload = function() {
   draw();

   let usaright = 150;
   let usatop = 20;
   let usabottom = 270;
   let animatie = false;
             
   function draw() {
      const canvas = document.getElementById("canvdoor");
      const ctx = canvas.getContext("2d");

      

      ctx.fillStyle = "red";
      ctx.fillRect(40, 40, 150, 200); 
      ctx.clearRect(45, 45, 140, 195); 

      ctx.beginPath();
      ctx.moveTo(50, 50); 
      ctx.lineTo(150, 25); 
      ctx.lineTo(150, 270); 
      ctx.lineTo(50, 240); 
      
      ctx.fillStyle = "red";
      ctx.fill(); 

      ctx.lineWidth = 4; 
      ctx.strokeStyle = "black";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(135, 155, 4, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
   }     

   const canvas = document.getElementById("canvdoor");
     
   canvas.addEventListener("click", function(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      /// asta ca vrem sa facem doar pe trapez
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(50, 50); 
      ctx.lineTo(150, 20); 
      ctx.lineTo(150, 270); 
      ctx.lineTo(50, 240); 

      if (ctx.isPointInPath(x, y)) {
            colorBlack(); 
      }
   });
             
   function colorBlack() {
      if (!animatie) {
         animatie = true;
         animateDoor(); 
   }
}

function animateDoor() {
   const canvas = document.getElementById("canvdoor");
   const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "red";
      ctx.fillRect(40, 40, 150, 200); 
      ctx.clearRect(45, 45, 140, 195); 

      ctx.beginPath();
      ctx.moveTo(50, 50); 
      ctx.lineTo(usaright, usatop); 
      ctx.lineTo(usaright, usabottom); 
      ctx.lineTo(50, 240); 
    
      ctx.fillStyle = "blue"; 
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = "black"; 
      ctx.stroke();

    
      ctx.beginPath();
      ctx.arc(usaright - 15, 155, 4, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();

      if (usaright < 185) {
         // Dacă nu s-a închis, modificăm coordonatele cu un pas mic
         usaright += 1;
         usatop += 0.75; 
         usabottom -= 0.75; 
         
         requestAnimationFrame(animateDoor); 
      } else {
         animatie = false;
      }
   }
}   
        
       
      
