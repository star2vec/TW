window.onload = function() {
   
   let culori = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];

   let nrrot = 0;
   let counter = document.getElementById("counter");

   if (sessionStorage.getItem("numar")) {
      nrrot = parseInt(sessionStorage.getItem("numar"));
   }
   counter.innerText = nrrot;

   function crestenr() {
      nrrot++; 
      sessionStorage.setItem("numar", nrrot); 
      counter.innerText = nrrot; 
   }


   /* ce e mai jos e cu gemini doar sageata tho*/
   let indicator = document.createElement("div");
   indicator.style.width = "0";
   indicator.style.height = "0";
   indicator.style.borderLeft = "15px solid transparent";
   indicator.style.borderRight = "15px solid transparent";
   indicator.style.borderTop = "30px solid red";
   indicator.style.position = "absolute";
   indicator.style.left = "293px"; 
   indicator.style.top = "10px";
   document.body.insertBefore(indicator, document.body.firstChild);

   let rotatie = 0;
   let spinning = false;
   
   draw();
             
   function draw() {
      const canvas = document.getElementById("canvball");
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.arc(300, 300, 250, 0, 2 * Math.PI);
      ctx.fillStyle = "grey";
      ctx.fill();

      let nrarc = 21;
      let unghi = 2 * Math.PI;
      let plus = 2 * Math.PI / nrarc;
      for (let i=0; i<nrarc; i++) {
         ctx.beginPath();
         ctx.moveTo(300, 300);
         ctx.arc(300, 300, 240, unghi, unghi+plus);
         ctx.lineTo(300, 300); 
         unghi += plus;
         ctx.fillStyle = culori[i % 7];
         ctx.fill();
         ctx.lineWidth = 3; 
         ctx.strokeStyle = "white";
         ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(300, 300, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "grey";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(300, 300, 15, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();


      canvas.addEventListener("click", function(event) {
         if (spinning) {
            return;
         }

         spinning = true;

         let nrsec = Math.random() * 4.5 + 0.5;
         let fullrot = Math.floor(Math.random() * 5) + 3;
         let extra = Math.floor(Math.random() * 360);

         let totalgrade = (fullrot * 360) + extra;
         rotatie += totalgrade;

         canvas.style.transition = "transform " + nrsec + "s ease-in-out";
         canvas.style.transform = "rotate(" + rotatie + "deg)";

         setTimeout(() => {
            spinning = false;
            nrrot += fullrot; 
            sessionStorage.setItem("numar", nrrot);
            counter.innerText = nrrot;
         }, nrsec * 1000);
         
      });
   }
             
}
