window.onload = function() {

  /* ============ STORAGE + CONTOR (aproape mereu cerut) ============ */
  let nr = 0;
  if (localStorage.getItem("numar"))              // TODO: local vs session — citește enunțul!
    nr = parseInt(localStorage.getItem("numar"));

  let counter = document.createElement("div");
  counter.style.position = "fixed";
  counter.style.top = "10px"; counter.style.right = "10px";   // TODO: colțul din enunț
  // counter.style.color = "white";               // TODO: dacă se cere
  counter.innerText = nr;
  document.body.appendChild(counter);

  function crestenr() {
    nr++;
    localStorage.setItem("numar", nr);
    counter.innerText = nr;
  }

  /* ============ TASTATURĂ ============ */
  document.addEventListener("keydown", function(e) {
    switch (e.key) {                              // TODO: tastele + rolurile din enunț
      case "r": creeaza(); break;
      case "p": startMiscare(); break;
      case "s": stopMiscare(); break;
      case "a": new Audio("resources/sunet.mp3").play(); break;
    }
  });

  /* ============ CREARE LA POZIȚIE ALEATOARE ============ */
  function creeaza() {
    let img = document.createElement("img");
    img.src = "resources/images/poza-01.png";     // TODO: calea
    img.className = "item";
    img.style.position = "absolute";
    img.style.left = Math.floor(Math.random() * (window.innerWidth  - 100)) + "px";
    img.style.top  = Math.floor(Math.random() * (window.innerHeight - 100)) + "px";
    document.body.appendChild(img);
    crestenr();                                   // TODO: DOAR dacă se numără crearea
  }

  /* ============ CLICK PE ELEMENTE (delegare) ============ */
  document.addEventListener("click", function(e) {
    if (e.target.className == "item") {
      let el = e.target;
      // TODO: comportamentul din enunț — tipic, ciclu de imagini apoi ștergere:
      if      (el.src.includes("poza-01")) el.src = "resources/images/poza-02.png";
      else if (el.src.includes("poza-02")) el.src = "resources/images/poza-03.png";
      else el.remove();                           // crestenr() aici dacă se numără "spargerea"
    }
  });

  /* ============ MIȘCARE START/STOP ============ */
  let miscare = null;
  function startMiscare() {
    if (miscare) return;                          // nu porni de două ori
    miscare = setInterval(function() {
      document.querySelectorAll(".item").forEach(function(el) {
        el.style.left = (parseFloat(el.style.left) + (Math.random() - 0.5) * 100) + "px";
        el.style.top  = (parseFloat(el.style.top)  + (Math.random() - 0.5) * 100) + "px";
      });
    }, 100);
  }
  function stopMiscare() { clearInterval(miscare); miscare = null; }

};
