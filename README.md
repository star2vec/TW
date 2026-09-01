# README — TW examen de mărire: tot ce poate apărea

Ghid de skim rapid. Ordine: setup → Subiectul A → B → C → tehnici din laburi neapărute încă → puțin probabile. Detaliile despre enunțuri (ce a apărut exact, în ce model) rămân în S1/S2/S3/SE; aici sunt **tiparele + codul**.

---

## 0. Setup & reflexe de examen

```bash
# server http local pentru fetch (subiectul C):
python3 -m http.server 5000
# apoi deschide http://localhost:5000/lodge.html  (NU file://)
```

```html
<!-- boilerplate HTML pentru orice subiect -->
<!DOCTYPE html>
<html lang="ro">
  <head>
    <meta charset="utf-8">
    <title>nume</title>
    <link rel="stylesheet" href="nume.css" type="text/css">
    <script type="text/javascript" src="nume.js"></script>
  </head>
  <body>
  </body>
</html>
```

```js
// tot codul JS în:
window.onload = function() {
  // ...
}
```

Reflexe: consola deschisă la fiecare reload · refresh ca să testezi storage-ul · resize (DevTools responsive) ca să testezi media query · numele fișierelor EXACT ca în enunț · numără divurile cerute · arhiva `nrgrupa_nume_prenume.zip` cu TOATE fișierele (inclusiv cele furnizate).

---

# SUBIECTUL A — layout, tranziții, media query (1.5p)

## A1. Grid (a apărut în toate modelele)

```css
.container {
  display: grid;
  grid-template-columns: repeat(5, 55px);  /* lățimea coloanei = din enunț */
  grid-template-rows: repeat(4, 80px);     /* rândurile: după imagine */
  gap: 5px;                                /* spațiul dintre linii ȘI coloane */
}
.container div {
  padding: 25px;
  border: 8px dotted DarkGoldenrod;        /* dotted=punctat, dashed=întrerupt */
  background: Gold;
  color: black;
  display: flex;                            /* centrare text în div */
  justify-content: center;                  /* orizontal */
  align-items: center;                      /* vertical */
}
```

## A2. Întinderea unui div pe mai multe celule

```css
#sus  { grid-column: 1 / 6; grid-row: 1 / 2; }   /* toate cele 5 coloane */
#corp { grid-column: 2 / 5; grid-row: 2 / 4; }   /* col 2-4, rândurile 2-3 */
```

## A3. Divul-cerc (suprascrie regula generală)

```css
.cerc {
  border: none;
  border-radius: 50%;
  background: AntiqueWhite;
}
```

## A4. :hover / :active + tranziție

```css
.cerc { transition: all 0.45s; }        /* durata EXACT din enunț */
.cerc:active {                          /* :active = "la ținerea apăsată" */
  background: Red;
  color: Red;                           /* text aceeași culoare → "dispare" */
  transform: scale(0.33);               /* "o treime din mărimea inițială" */
}
/* :hover = "la trecerea mouse-ului deasupra" — aceeași structură */
```

## A5. Media query (interval cu ambele limite)

```css
@media (min-width: 333px) and (max-width: 622px) {
  .container { display: block; }        /* "formatul default, unele sub altele" */
  .container div { width: auto; }       /* "întreaga lățime a containerului" */
  .cerc { transform: scaleX(0.5); }     /* "micșorat la jumătate pe orizontală" */
}
```

## A6. Fundal de pagină

```css
body { background-color: violet; }
/* imagine pe toată fereastra (a apărut la B, 2025): */
body {
  background: url("resources/images/rabbits.png") no-repeat center;
  background-size: cover;
}
```

## A7. Variante apărute în modelele vechi

```css
/* dimensiuni relative la fereastră */
#parinte { height: 150px; width: 50vw; }            /* jumătate din lățime */
.container { height: 50vh; width: 250px; }           /* jumătate din înălțime */

/* border pe COPIII unui element (selector descendent) */
#parinte div { border: 2px dotted black; }

/* border dublu */
.container div { border: 8px double black; }

/* media query cu lățime ȘI înălțime */
@media (max-width: 600px) and (max-height: 500px) { ... }

/* hover pe container cu efect pe container + pe ultimul copil */
#parinte, #parinte :last-child { transition: all 3s; }
#parinte:hover { height: 300px; }
#parinte:hover :last-child { border-color: blue; }

/* creșterea treptată a font-size la hover */
.container div { transition: font-size 3s; }
.container div:hover { font-size: 30px; }
```

## A8. Flexbox — swap-ul nr. 1 (capitol întreg de curs + lab 4/5, zero examene)

```css
.container {
  display: flex;
  flex-direction: row;        /* sau column */
  flex-wrap: wrap;
  justify-content: center;    /* pe axa principală: flex-start/end/space-between/around */
  align-items: center;        /* pe axa secundară */
  gap: 5px;
}
.item  { flex: 1; }           /* grow shrink basis */
.item2 { order: 2; align-self: flex-end; flex-basis: 100px; }
```

## A9. Animații @keyframes — al 2-lea swap (lab 5 le cere cu toți parametrii)

```css
.cerc {
  /*         nume  durată easing       delay repetiții  */
  animation: puls  4s     ease-in-out  1s    infinite;
  /* alte valori: linear | ease | ease-in | ease-out; alternate pt. dus-întors */
}
@keyframes puls {
  0%        { transform: scale(1); }
  20%, 80%  { transform: scale(0.33); }   /* "ține între 20% și 80%" */
  100%      { transform: scale(1); }
}
```

## A10. Alte pseudo-clase / pseudo-elemente (în curs, neapărute)

```css
.container div:not(.cerc)   { border: 3px dotted Indigo; }  /* toate în afară de */
.container div:first-child  { background: red; }
.container div:last-child   { background: blue; }
.container div:nth-child(3) { background: green; }
a:link { color: teal; }  a:visited { color: purple; }
input:focus { outline: 2px solid orange; }

.titlu::first-letter { font-size: 2em; }
.cerc::before { content: "★"; }         /* ::before/::after cer content */
```

## A11. Transformări dincolo de scale

```css
transform: rotate(45deg);
transform: translate(20px, -10px);
transform: skew(15deg);
transform: rotate(45deg) scale(0.5);    /* combinate, într-o singură declarație */
```

---

## A12. Noutăți din examenul 2026 (BMO)

```css
/* outline în loc de border: nu ocupă spațiu în layout; offset negativ = spre interior */
.container div { outline: 3px dashed black; outline-offset: -5px; }

/* div cu imagine de fundal + :active care SCHIMBĂ imaginea */
#cap {
  background: url("bmo.jpg") no-repeat center / cover;
  min-height: 100px;                 /* divul nu se dimensionează după fundal! */
  cursor: pointer;
  transition: all 0.24s ease-in-out;
}
#cap:active { background-image: url("bmo-press.png"); }

/* întindere mare pe o singură axă (brațul) */
#mdr:hover { transform: translateX(250px) scaleX(6); }
/* sau, fără translate: transform-origin: left; + scaleX(6) */

/* body: fundal imagine + conținut centrat în fereastră */
body {
  background: url("bgr-at.jpg") no-repeat center / cover;
  min-height: 100vh;
  display: flex; justify-content: center; align-items: center;
}

/* media query cu REORDONARE: flex column + order per div */
@media (min-width: 262px) and (max-width: 667px) {
  .container { display: flex; flex-direction: column; }
  .container div { width: 200px; margin: 0 !important; }
  #cap { order: 1; }  #b1 { order: 2; }  #mdr { order: 3; }  /* etc. */
}
```
```html
<!-- muzică de fundal direct din HTML (poate fi blocată până la prima interacțiune) -->
<audio src="bmo-song.mp3" autoplay loop hidden></audio>
```

---

# SUBIECTUL B — events, DOM, storage (2.5p — cel mai valoros!)

## B1. Tastatură

```js
document.addEventListener("keydown", function(e) {
  switch (e.key) {                 // litere mici: "r", "p", "s", "a"; cifre: "0".."9"
    case "r": creeaza(); break;
    case "p": startMiscare(); break;
    case "s": stopMiscare(); break;
    case "a": new Audio("resources/rabbits-ambience.mp3").play(); break;
  }
});
```

## B2. Creare element la poziție aleatoare

```js
function creeaza() {
  let img = document.createElement("img");
  img.src = "resources/images/rabbit-01.png";
  img.className = "rabbit";
  img.style.position = "absolute";
  img.style.left = Math.floor(Math.random() * (window.innerWidth  - 100)) + "px";
  img.style.top  = Math.floor(Math.random() * (window.innerHeight - 100)) + "px";
  document.body.appendChild(img);
  crestenr();                       // vezi B6
}
// div-bulină colorată în loc de img:
let div = document.createElement("div");
div.style.width = div.style.height = size + "px";
div.style.borderRadius = "50%";
div.style.background = culoare;
```

## B3. Click pe elementele create (delegare) + ciclu de imagini

```js
document.addEventListener("click", function(e) {
  if (e.target.className == "rabbit") {
    let el = e.target;
    if      (el.src.includes("rabbit-01")) el.src = "resources/images/rabbit-02.png";
    else if (el.src.includes("rabbit-02")) el.src = "resources/images/rabbit-03.png";
    else                                   el.remove();
  }
});
```

## B4. Secvență automată de imagini (spargere / dans — model2/3)

```js
// o singură trecere prin imagini, apoi dispare:
function sparge(el) {
  let imgs = ["bubble-2.png", "bubble-3.png", "bubble-4.png"];
  let i = 0;
  let t = setInterval(function() {
    if (i < imgs.length) { el.src = "resources/images/" + imgs[i]; i++; }
    else { clearInterval(t); el.remove(); }
  }, 200);
}
// buclă infinită (dansul bursucului: 0.2s×3 cadre + pauză 1s), oprită la al 2-lea click:
function danseaza(el) {
  let imgs = ["badger-2.png", "badger-3.png", "badger-4.png", "badger-1.png"];
  let i = 0;
  el.dans = setInterval(function() {
    el.src = "resources/images/" + imgs[i % imgs.length];
    i++;
    // truc ritm neuniform: după cadrul 4, sari peste ~5 tickuri sau folosește setTimeout-uri
  }, 200);
}
// la click: if (el.dans) { clearInterval(el.dans); el.remove(); } else danseaza(el);
// starea per element se poate ține direct pe element (el.dans) sau într-un Map
```

## B5. Mișcare aleatoare a tuturor + start/stop

```js
let miscare = null;
function startMiscare() {
  if (miscare) return;                          // nu porni de 2 ori
  miscare = setInterval(function() {
    document.querySelectorAll(".rabbit").forEach(function(el) {
      el.style.left = (parseFloat(el.style.left) + (Math.random() - 0.5) * 100) + "px";
      el.style.top  = (parseFloat(el.style.top)  + (Math.random() - 0.5) * 100) + "px";
    });
  }, 100);
}
function stopMiscare() { clearInterval(miscare); miscare = null; }
// querySelectorAll în interiorul tickului → se mișcă și elementele create ulterior
```

## B6. Contor persistent în localStorage / sessionStorage

```js
let nr = 0;
if (localStorage.getItem("numar")) nr = parseInt(localStorage.getItem("numar"));
// sessionStorage: identic ca API; se pierde la închiderea tabului

let counter = document.createElement("div");
counter.style.position = "fixed";
counter.style.top = "10px"; counter.style.right = "10px";  // colțul din enunț!
counter.style.color = "white";                              // dacă e cerut
counter.innerText = nr;
document.body.appendChild(counter);

function crestenr() {
  nr++;
  localStorage.setItem("numar", nr);
  counter.innerText = nr;
}
// obiecte în storage: setItem("x", JSON.stringify(ob)); JSON.parse(getItem("x"))
```

## B7. Valoare din formular care parametrizează acțiunea (model1: range)

```html
<input type="range" id="size" min="20" max="150" value="50">
```
```js
let size = parseInt(document.getElementById("size").value);  // citită LA CREARE, nu o dată
```

## B8. Prag pe contor (model2: ciupercă la fiecare 5)

```js
if (nr % 5 == 0) adaugaCiuperca();   // în crestenr(), după incrementare
```

## B9. Variante din modelele vechi

```js
// click-outside + stopPropagation: click pe element NU declanșează resetul global
elem.addEventListener("click", function(e) {
  e.stopPropagation();
  elem.innerHTML = elem.innerHTML.split("").reverse().join("");   // inversare string
  /* let elemente = ["A", "B", "C", "D", "E"];

elemente.sort(() => Math.random() - 0.5); asa ca sa fei sortate random/jumbled*/ 
});
document.addEventListener("click", function() { resetToate(); }); // click oriunde altundeva

// memorarea stării inițiale pentru reset
let initiale = [];  // la creare: initiale[i] = text;  la reset: parcurgi și restaurezi

// acțiune doar la PRIMA apăsare
let pornit = false;
document.addEventListener("keydown", function(e) {
  if (e.key != "s" || pornit) return;
  pornit = true;
  // ...
});

// numărare cuvinte
let nrCuv = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

// ștergere câte un element pe secundă dintr-o listă filtrată
let deSters = [...document.querySelectorAll("p")].filter(p => nrCuvinte(p) > limita);
let i = 0;
let t = setInterval(function() {
  if (i < deSters.length) { deSters[i].remove(); i++; }
  else {
    clearInterval(t);
    localStorage.setItem("numar", deSters.length);   // salvare LA FINAL
  }
}, 1000);

// ștergere după delay (2021: buton șters după 3s)
setTimeout(function() { button.remove(); }, 3000);

// storage refolosit ca default la reîncărcare
document.body.style.background = localStorage.getItem("culoare");   // sau:
input.value = localStorage.getItem("numar");

// creștere cumulativă la click (model2023: +10px în jos)
div.style.height = (div.offsetHeight + 10) + "px";
```

---

## B10. Noutăți din examenul 2026 (jocul cu melodii — B poate fi un JOC întreg)

```js
// fetch ÎN B, declanșat de un buton (ingredientele migrează între subiecte!)
document.getElementById("roll").addEventListener("click", function() {
  fetch("songs.json")
    .then(r => r.json())
    .then(data => {
      reset();                                        // starea curată la fiecare rundă
      let x = data[Math.floor(Math.random() * data.length)];
      song = x.name.toUpperCase();                    // matching case-insensitive
      // scrierea cuvintelor în tabel: cuvântul i pe rândul i, literele de la col. 1
      song.split(" ").forEach(function(cuv, i) {
        for (let j = 0; j < cuv.length; j++) {
          let cell = celula(i, j + 1);
          cell.innerText = cuv[j];
          cell.style.backgroundColor = "white";
          cell.style.color = "white";                 // ASCUNS: text alb pe fundal alb
        }
      });
    });
});

// ghicirea unei litere: descoperire prin schimbarea culorii + numărarea celor rămase
document.addEventListener("keydown", function(e) {
  if (song === "" || ghicit) return;                  // guard: jocul nu a început / s-a terminat
  let tasta = e.key.toUpperCase();
  if (song.includes(tasta)) {
    document.querySelectorAll("td").forEach(function(cell) {
      if (cell.innerText === tasta) cell.style.color = "black";   // descoperit
    });
    let ascunse = [...document.querySelectorAll("td")]
                  .filter(c => c.innerText !== "" && c.style.color === "white").length;
    if (ascunse === 0) castig();
  } else {
    tries--;
    if (tries === 0) { new Audio("wheel.mp3").play(); reset(); }  // încercări epuizate
  }
});

// la câștig: imaginea albumului + redirect după 2s
function castig() {
  ghicit = true;
  let img = document.createElement("img");
  img.src = songimg;
  document.body.appendChild(img);
  setTimeout(() => { window.location.href = songurl; }, 2000);    // navigare din JS
}
// reset(): variabilele la valorile inițiale + celulele golite/recolorate + imaginea veche .remove()
```

---

# SUBIECTUL C — canvas/SVG, events, fetch (2p)

## C1. Boilerplate canvas

```html
<canvas id="canvas" width="800" height="550"></canvas>
<div id="mesaj"></div>
<div id="detalii" style="display:none"></div>
```
```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
```

## C2. Forme de bază

```js
// dreptunghi
ctx.fillStyle = "red";
ctx.fillRect(50, 50, 700, 450);          // x, y, lățime, înălțime
ctx.lineWidth = 15; ctx.strokeStyle = "white";
ctx.strokeRect(50, 50, 700, 450);

// cerc plin + contur
ctx.beginPath();
ctx.arc(150, 150, 100, 0, 2 * Math.PI); // cx, cy, rază, unghi start, unghi final
ctx.fillStyle = "yellow"; ctx.fill();
ctx.stroke();

// semicerc (bila magică / pokeball): jumătatea de sus = PI → 2PI
ctx.beginPath();
ctx.arc(150, 150, 100, Math.PI, 2 * Math.PI);
ctx.fill();

// sector de cerc (gura lui Pac-Man): centru → arc → închide
ctx.beginPath();
ctx.moveTo(150, 150);
ctx.arc(150, 150, 100, 0.2 * Math.PI, -0.2 * Math.PI, true);  // true = antiorar
ctx.closePath();
ctx.fillStyle = "black"; ctx.fill();

// linii / poligoane
ctx.beginPath();
ctx.moveTo(50, 150); ctx.lineTo(250, 150); ctx.lineTo(150, 300);
ctx.closePath(); ctx.stroke();

// elipsă
ctx.beginPath();
ctx.ellipse(cx, cy, razaX, razaY, 0, 0, 2 * Math.PI); ctx.fill();

// text
ctx.font = "40px sans-serif";
ctx.textAlign = "center"; ctx.textBaseline = "middle";
ctx.fillText("8", 150, 100);
```

## C3. Clipping (podeaua zig-zag din lodge)

```js
ctx.save();
ctx.beginPath();
ctx.rect(50, 50, 700, 450);     // sau orice path
ctx.clip();                     // tot ce desenezi acum rămâne în interior
// ... desene care ies din zonă ...
ctx.restore();                  // anulează clipul
```

## C4. Imagine peste desen (trandafirul din 2025)

```js
let img = new Image();
img.src = "rose.webp";
img.onload = function() {                       // desenezi DOAR după load!
  ctx.drawImage(img, 333, 150, 100, 100);       // x, y, lățime, înălțime
};
```

## C5. Click pe canvas + hit-test pe o zonă

```js
canvas.addEventListener("click", function(e) {
  const r = canvas.getBoundingClientRect();
  const x = e.clientX - r.left, y = e.clientY - r.top;
  if (x >= 333 && x <= 433 && y >= 150 && y <= 250) {  // zona trandafirului
    alege();
  }
});
// hit pe cerc: Math.hypot(x - cx, y - cy) <= raza
```

## C6. Fetch + promisiuni + alegere aleatoare (nucleul lui C)

```js
function alege() {
  fetch("quotes.json")
    .then(response => response.json())
    .then(data => {
      let x = data[Math.floor(Math.random() * data.length)];
      afiseaza(x);
    })
    .catch(err => console.error("Eroare:", err));
}
// enunțul cere "fetch și promisiuni" → rămâi pe .then()
// DESCHIDE json-ul înainte să scrii codul — cheile diferă de fiecare dată!
```

## C7. Afișarea rezultatului sub desen (text + imagini din JSON)

```js
let curent = null;                       // păstrează obiectul pentru hover!
function afiseaza(x) {
  curent = x;
  let mesaj = document.getElementById("mesaj");
  mesaj.innerHTML = "<b>" + x.character + ":</b> " + x.quote;
  mesaj.style.color = "green";           // colorare cerută eventual

  // imagini cu path din JSON (poster, steaguri):
  mesaj.innerHTML = "";
  let img = document.createElement("img");
  img.src = x.poster;                    // path relativ sau URL absolut — ambele au apărut
  mesaj.appendChild(img);
  mesaj.append(" " + x.data + " " + x.ora + " " + x.titlu);
}
```

## C8. Hover pe rezultat → detalii suplimentare

```js
let mesaj = document.getElementById("mesaj");
let detalii = document.getElementById("detalii");
mesaj.addEventListener("mouseenter", function() {
  if (curent) {
    detalii.innerText = curent.season + " " + curent.episode;
    detalii.style.display = "block";
  }
});
mesaj.addEventListener("mouseleave", function() { detalii.style.display = "none"; });
// dacă hover-ul e pe FIECARE imagine separat (steaguri): listener pe fiecare img la creare,
// cu textul lui propriu (homeflag → țara gazdă, guestflag → oaspete)
```

## C9. Redesenarea unei părți după rezultat (model1: discul bilei)

```js
function coloreazaDisc(culoare) {
  ctx.beginPath();
  ctx.arc(150, 150, 35, 0, 2 * Math.PI);
  ctx.fillStyle = culoare;               // "green" / "red" / "orange" după tipul răspunsului
  ctx.fill(); ctx.stroke();
}
```

## C10. Gradienți, Bézier, Path2D (în curs, neapărute — plauzibile)

```js
// gradient liniar / radial
let g = ctx.createLinearGradient(0, 0, 0, 400);   // sau createRadialGradient(cx,cy,r0,cx,cy,r1)
g.addColorStop(0, "gold"); g.addColorStop(1, "darkorange");
ctx.fillStyle = g; ctx.fillRect(0, 0, 400, 400);

// curbe
ctx.beginPath();
ctx.moveTo(50, 200);
ctx.quadraticCurveTo(150, 50, 250, 200);              // 1 punct de control
ctx.bezierCurveTo(300, 50, 400, 350, 450, 200);       // 2 puncte de control
ctx.stroke();

// Path2D + hit-test elegant
let forma = new Path2D();
forma.arc(150, 150, 50, 0, 2 * Math.PI);
ctx.fill(forma);
canvas.addEventListener("click", function(e) {
  const r = canvas.getBoundingClientRect();
  if (ctx.isPointInPath(forma, e.clientX - r.left, e.clientY - r.top)) { ... }
});
```

## C11. SVG — alternativa rapidă la desen static

```html
<svg width="500" height="400">
  <rect x="50" y="50" width="300" height="200" rx="10"
        fill="red" stroke="white" stroke-width="8"/>
  <circle cx="200" cy="150" r="60" fill="gold"/>
  <ellipse cx="200" cy="300" rx="80" ry="30" fill="gray"/>
  <line x1="0" y1="200" x2="500" y2="200" stroke="black" stroke-width="4"/>
  <polygon points="100,10 150,100 50,100" fill="green"/>
  <text x="200" y="150" text-anchor="middle" font-size="40">8</text>
</svg>
```
```js
// avantaj: fiecare formă e element DOM → click/hover direct, fără hit-test
let disc = document.getElementById("disc");
disc.addEventListener("click", alege);
disc.setAttribute("fill", "green");        // recolorare
```

---

## C12. Noutăți din examenul 2026 (roata norocului)

```js
// roată cu N sectoare, culorile ciclând printr-o listă
let culori = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];
let n = 21, pas = 2 * Math.PI / n, unghi = 0;
for (let i = 0; i < n; i++) {
  ctx.beginPath();
  ctx.moveTo(300, 300);                       // centrul
  ctx.arc(300, 300, 240, unghi, unghi + pas); // felia
  ctx.lineTo(300, 300);                       // înapoi la centru → sector închis
  ctx.fillStyle = culori[i % culori.length];
  ctx.fill();
  ctx.strokeStyle = "white"; ctx.lineWidth = 3; ctx.stroke();
  unghi += pas;
}

// învârtirea: NU redesenezi — rotești ELEMENTUL canvas cu o tranziție CSS scrisă din JS
let rotatie = 0, spinning = false;
canvas.addEventListener("click", function() {
  if (spinning) return;                       // guard: ignoră clickurile din timpul rotirii
  spinning = true;
  let durata = Math.random() * 4.5 + 0.5;                 // 0.5–5s
  let grade  = (Math.floor(Math.random() * 5) + 3) * 360  // 3–7 rotații complete
             + Math.floor(Math.random() * 360);           // + unghi suplimentar
  rotatie += grade;                           // CUMULATIV, altfel a doua rotire dă înapoi
  canvas.style.transition = "transform " + durata + "s ease-in-out";
  canvas.style.transform  = "rotate(" + rotatie + "deg)";
  setTimeout(() => { spinning = false; /* actualizezi contorul în storage */ }, durata * 1000);
});
```
```css
/* săgeată-indicator: triunghi CSS din borduri */
.indicator {
  width: 0; height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 30px solid red;          /* vârful în jos; inversează pt. alte direcții */
  position: absolute; left: 293px; top: 10px;
}
```
Notă structurală: acest C nu are fetch (a migrat în B) dar are sessionStorage — pregătește skill-urile independent de subiect.

---

# TEHNICI DIN LABURI NEAPĂRUTE ÎNCĂ ÎN EXAMENE (a doua prioritate)

## L1. Formulare cu validare built-in (lab 9 — capitol întreg, abia atins la examene)

```html
<form method="post" action="Earth" target="_self">
  <fieldset>
    <legend>Date personale</legend>
    <label for="nume">Nume</label>
    <input type="text" id="nume" name="nume" minlength="3" maxlength="30" required>
    <input type="text" pattern="[A-Z0-9]{8,20}" required>      <!-- regex -->
    <input type="date" min="1800-01-01" max="2024-05-13" required>
    <input type="range" min="0" max="2000" step="50" id="credit">
    <output id="val">1000</output>                              <!-- eticheta cu valoarea -->
    <input type="file" accept="image/*">
    <input type="color" id="culoare">
    <input type="email" required>  <input type="url" required>  <input type="time">
    <input type="radio" name="sedere" value="temporara" checked> temporară
    <input type="radio" name="sedere" value="permanenta"> permanentă
    <input type="checkbox" name="scop" value="invazie" checked> invazie
    <select name="rasa"> <option>Wookie</option> <option>Vogon</option> </select>
    <textarea style="resize: none" required></textarea>
    <button type="submit">Trimite</button>
  </fieldset>
</form>
```
```js
// evenimente: "input" = la fiecare tastă/mișcare; "change" = la finalizarea modificării
document.getElementById("credit").addEventListener("input", function(e) {
  document.getElementById("val").innerText = e.target.value;
});

// submit cu validare JS + înlocuirea formularului
let form = document.querySelector("form");
form.addEventListener("submit", function(e) {
  e.preventDefault();                        // nu trimite la server
  if (form.checkValidity() && verificariProprii()) {
    form.replaceWith(Object.assign(document.createElement("p"),
                     { innerText: "Datele au fost trimise!" }));
  }
});

// checkbox / radio: proprietatea checked
if (document.getElementById("cb").checked) { ... }
```

## L2. input color + localStorage + background (lab 9 ex. 4)

```js
let c = document.getElementById("culoare");
if (localStorage.getItem("culoare")) {
  c.value = localStorage.getItem("culoare");
  document.body.style.background = c.value;
}
c.addEventListener("change", function() {
  localStorage.setItem("culoare", c.value);
  document.body.style.background = c.value;
});
```

## L3. Arrow keys cu limitare la margini + zoom (lab 8 camera)

```js
let img = document.querySelector("#vizor img");
let x = 0, y = 0, scara = 1;
document.addEventListener("keydown", function(e) {
  const pas = 20;
  if (e.key == "ArrowLeft")  x = Math.min(x + pas, 0);
  if (e.key == "ArrowRight") x = Math.max(x - pas, vizor.clientWidth - img.width);
  if (e.key == "ArrowUp")    y = Math.min(y + pas, 0);
  if (e.key == "ArrowDown")  y = Math.max(y - pas, vizor.clientHeight - img.height);
  if (e.key == "+") scara += 0.1;
  if (e.key == "-") scara -= 0.1;
  img.style.marginLeft = x + "px";  img.style.marginTop = y + "px";
  img.style.scale = scara;
});
```

## L4. cloneNode + galerie (lab 8 "poza")

```js
let poza = document.getElementById("container").cloneNode(true);  // true = cu tot cu copii
poza.removeAttribute("id");                                       // fără id duplicat!
document.getElementById("galerie").appendChild(poza);
```

## L5. Countdown afișat + burst (lab 8)

```js
// captură după 5s, cu secundele rămase afișate
function timerCapture() {
  let ramase = 5;
  afis.innerText = ramase;
  let t = setInterval(function() {
    ramase--;
    afis.innerText = ramase;
    if (ramase == 0) { clearInterval(t); capteaza(); afis.innerText = ""; }
  }, 1000);
}
// burst: o captură la fiecare 0.5s, timp de 2s (4 execuții, apoi stop)
function burst() {
  let n = 0;
  let t = setInterval(function() {
    capteaza(); n++;
    if (n == 4) clearInterval(t);
  }, 500);
}
```

## L6. Drag cu mouse-ul + scroll (lab 8 opțional — singurul mousemove din material)

```js
let apasat = false, sx, sy;
el.addEventListener("mousedown", function(e) { apasat = true; sx = e.clientX; sy = e.clientY; });
document.addEventListener("mousemove", function(e) {
  if (!apasat) return;
  el.style.left = (parseFloat(el.style.left) + e.clientX - sx) + "px";
  el.style.top  = (parseFloat(el.style.top)  + e.clientY - sy) + "px";
  sx = e.clientX; sy = e.clientY;
});
document.addEventListener("mouseup", function() { apasat = false; });
el.addEventListener("wheel", function(e) { e.preventDefault(); /* e.deltaY <0 zoom in */ });
```

## L7. XML + DOMParser / XMLHttpRequest (lab 10 cinemateca — cel mai probabil swap la C)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<cinemateca>
  <film gen="drama">
    <titlu limba="en">Twin Peaks</titlu>
    <regizor>David Lynch</regizor>
    <an>1990</an>
  </film>
</cinemateca>
```
```js
// varianta fetch + DOMParser
fetch("cinemateca.xml")
  .then(r => r.text())
  .then(text => {
    let doc = new DOMParser().parseFromString(text, "application/xml");
    doc.querySelectorAll("film").forEach(function(f) {
      let titlu = f.querySelector("titlu").textContent;
      let gen   = f.getAttribute("gen");
      // construiește liste UL/LI în pagină
    });
  });

// varianta XMLHttpRequest (dacă enunțul o cere explicit)
let xhr = new XMLHttpRequest();
xhr.open("GET", "cinemateca.xml");
xhr.onload = function() {
  let doc = xhr.responseXML;         // direct Document pentru .xml servit corect
  // sau: new DOMParser().parseFromString(xhr.responseText, "application/xml")
};
xhr.send();
```

## L8. Fetch în lanț + fișiere numite după index (lab 10 fonoteca)

```js
fetch("albums.json")
  .then(r => r.json())
  .then(albums => {
    albums.forEach(function(album, i) {
      let img = document.createElement("img");
      img.src = "images/" + album.cover;
      img.addEventListener("click", function() {
        fetch("albums/" + i + ".json")          // al 2-lea fetch, numit după poziție
          .then(r => r.json())
          .then(detalii => afiseazaDetalii(detalii));
      });
      gallery.appendChild(img);
    });
  });
```

## L9. Câmp de căutare care filtrează lista afișată (lab 10 extra — exemplul tău cu filmele)

```js
let toate = [];                                  // lista fetch-uită, păstrată
cauta.addEventListener("input", function() {
  let q = cauta.value.toLowerCase();
  gallery.innerHTML = "";
  toate.filter(a => a.title.toLowerCase().includes(q) ||
                    a.artist.toLowerCase().includes(q) ||
                    String(a.year).includes(q))
       .forEach(adaugaInGalerie);
});
```

## L10. Animație canvas cu timestamp (lab 11 pacman/clock)

```js
let start = null;
function anim(t) {
  if (!start) start = t;
  let dt = (t - start) / 1000;                   // secunde de la pornire
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let unghi = 0.2 * Math.PI * Math.abs(Math.sin(dt * 4));   // gura se deschide/închide
  deseneazaPacman(unghi);
  requestAnimationFrame(anim);
}
requestAnimationFrame(anim);
// transparență variabilă: ctx.fillStyle = "rgba(255,255,255," + opacitate + ")";
```

## L11. Transformări canvas + ceas (lab 11 + curs c11)

```js
// rotirea unei forme în jurul unui punct (limbile ceasului analog)
ctx.save();
ctx.translate(cx, cy);              // mută originea în centru
ctx.rotate(unghi);                  // radiani!
ctx.fillRect(0, -3, lungime, 6);    // limba, desenată din origine
ctx.restore();

// ora curentă (ceasul digital din lab 11)
let d = new Date();
let text = String(d.getHours()).padStart(2, "0") + ":" +
           String(d.getMinutes()).padStart(2, "0") + ":" +
           String(d.getSeconds()).padStart(2, "0");
// redesenat cu setInterval(1000) sau requestAnimationFrame
```

## L12. Cookies (curs, lângă storage — swap posibil pentru B)

```js
document.cookie = "numar=5; max-age=3600";              // scriere (un cookie per atribuire)
function citesteCookie(nume) {
  let gasit = document.cookie.split("; ").find(c => c.startsWith(nume + "="));
  return gasit ? gasit.split("=")[1] : null;
}
```

## L13. DOM avansat din lab 7 (tabel + navigare în arbore)

```js
// tabel generat dinamic cu clase de poziție (tiparul din examenul 2023 B)
let table = document.createElement("table");
for (let r = 0; r < 6; r++) {
  let tr = document.createElement("tr");
  for (let c = 0; c < 10; c++) {
    let td = document.createElement("td");
    td.classList.add("r" + r, "c" + c);
    tr.appendChild(td);
  }
  table.appendChild(tr);
}
container.appendChild(table);
document.querySelectorAll(".c3").forEach(td => td.style.background = "red");  // o coloană

// navigare în arbore (slide-uri + quiz în curs)
el.parentNode;  el.children;  el.children[n];       // getNthChild
el.firstElementChild;  el.lastElementChild;
el.nextElementSibling; el.previousElementSibling;
// (variantele cu "Node" — firstChild etc. — includ și noduri text!)

// classList
el.classList.add("activ"); el.classList.remove("activ"); el.classList.toggle("activ");
el.classList.contains("rabbit");
```

---

# PUȚIN PROBABILE (citește o dată, nu aprofunda)

- **`position: sticky` / `z-index` / `float`+`clear` ca cerință explicită** — în curs, dar examenele au preferat grid; `position: absolute` îl folosești oricum la B.
- **Multicoloane** (`column-count: 3; column-gap: 20px;`), **variabile CSS** (`:root { --c: gold; }` … `var(--c)`), **selectori prin atribute** (`[type="text"] { ... }`), `!important`, `inherit`.
- **Transformări 3D**, `perspective` — slide-uri puține, nepractic la examen.
- **`@media` cu `not` / `orientation`**; imagini responsive (`object-fit: cover`, `srcset`/`picture`).
- **`@font-face`** (`@font-face { font-family: "digital"; src: url("digital-7.ttf"); }`) — a apărut doar în lab 11.
- **`getComputedStyle(el).width`** — necesar doar dacă citești dimensiuni nesetate inline.
- **`window.history` / `screen` / `window.open`** — slide-uri, zero apariții practice. (`window.location.href` NU mai e aici — a apărut în examenul 2026, vezi B10.)
- **Composite** (`ctx.globalCompositeOperation`) și optimizări canvas — slide-uri, improbabil.
- **Prototipuri / `this` / clase** — în cursul de AJAX; la examen apar cel mult implicit (obiecte simple cu metode, ca în lab 6).
- **`map`/`reduce` ca cerință explicită** — le folosești oricum natural; `filter` deja îți e reflex.
- **POST cu fetch** (`fetch(url, { method: "POST", body: JSON.stringify(x), headers: { "Content-Type": "application/json" } })`) — slide dedicat, dar cere server care răspunde; improbabil cu http.server simplu.
- **`filter: hue-rotate()` / `clip-path: polygon()`** — DOAR în lab, nu în slide-uri.
- **Node/Express** — nu există în curriculum; exclus.
- **`await`** — 0 apariții în slide-uri; enunțurile cer "promisiuni" → `.then()`.
