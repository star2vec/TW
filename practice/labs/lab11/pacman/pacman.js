window.onload = function() {
  var starttime = Date.now();

  draw();
           
  function draw() {
    let nowtime = Date.now();

    let timp = nowtime - starttime;  
    let unghi = Math.abs(Math.sin(timp / 200)) * (Math.PI / 6);

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(150, 150, 100, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(180, 110, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(150, 150); 
        
    ctx.arc(150, 150, 100, -unghi, unghi); 
    ctx.fillStyle = "white";
    ctx.fill();


    let pozfood = 320 - ((timp / 10) % 150); 
    // Împărțim la 130 (distanța totală parcursă) ca să obținem un număr între 0 și 1
    let opacitate = (pozfood - 170) / 150;

    ctx.beginPath();
    ctx.arc(pozfood, 150, 10, 0, 2 * Math.PI);
      
    ctx.fillStyle = `rgba(255, 0, 0, ${opacitate})`; 
    ctx.fill();

    requestAnimationFrame(draw);
  } 
}       
