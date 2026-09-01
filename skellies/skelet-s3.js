window.onload = function() {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let curent = null;                              // obiectul ales — necesar la hover!

  /* ============ DESENUL (TODO: după imaginea din enunț) ============ */
  function deseneaza() {
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 700, 450);
    ctx.lineWidth = 15; ctx.strokeStyle = "white";
    ctx.strokeRect(50, 50, 700, 450);

    ctx.beginPath();
    ctx.arc(400, 275, 80, 0, 2 * Math.PI);        // cerc; semicerc: (PI, 2*PI)
    ctx.fillStyle = "gold"; ctx.fill(); ctx.stroke();

    // text:    ctx.font = "40px sans-serif"; ctx.textAlign = "center"; ctx.fillText("8", 400, 275);
    // clip:    ctx.save(); ctx.beginPath(); ctx.rect(...); ctx.clip(); ...desene...; ctx.restore();
    // imagine: let im = new Image(); im.src = "x.png"; im.onload = () => ctx.drawImage(im, x, y, w, h);
  }
  deseneaza();

  /* ============ CLICK PE CANVAS (+ hit-test dacă doar o zonă e activă) ============ */
  canvas.addEventListener("click", function(e) {
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    // TODO: dacă tot desenul e clickabil, șterge condiția:
    if (x >= 320 && x <= 480 && y >= 195 && y <= 355) {
      alege();
    }
  });

  /* ============ FETCH + PROMISIUNI + ALEATOR ============ */
  function alege() {
    fetch("date.json")                            // TODO: numele fișierului
      .then(response => response.json())
      .then(data => {
        curent = data[Math.floor(Math.random() * data.length)];
        afiseaza(curent);
      })
      .catch(err => console.error("Eroare:", err));
  }

  /* ============ AFIȘARE SUB DESEN ============ */
  function afiseaza(x) {
    let mesaj = document.getElementById("mesaj");
    mesaj.innerHTML = "";                         // conținutul vechi se înlocuiește
    // DESCHIDE json-ul și pune cheile REALE:
    mesaj.innerText = x.camp1 + ": " + x.camp2;
    // imagine din json:
    // let img = document.createElement("img"); img.src = x.poster; mesaj.appendChild(img);
  }

  /* ============ HOVER PE REZULTAT → DETALII ============ */
  let mesaj = document.getElementById("mesaj");
  let detalii = document.getElementById("detalii");
  mesaj.addEventListener("mouseenter", function() {
    if (curent) {
      detalii.innerText = curent.camp3 + " " + curent.camp4;   // TODO: cheile reale
      detalii.style.display = "block";
    }
  });
  mesaj.addEventListener("mouseleave", function() { detalii.style.display = "none"; });

};
