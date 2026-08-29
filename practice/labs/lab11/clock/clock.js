window.onload = function() {

  draw();

  function draw() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursFormatted = String(hours).padStart(2, '0');

    const timeString = hoursFormatted + ":" + minutes + ":" + seconds + " " + ampm;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "60px digital-clock-font";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(timeString, canvas.width / 2, canvas.height / 2);

    requestAnimationFrame(draw);
  }
}
