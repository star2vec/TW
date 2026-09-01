# Subiectul C — 2D graphics (canvas / SVG / CSS), events, fetch (2 puncte)

Bazat pe: model1 (magic 8 ball), model2 (zap — televizor), model3 (fibacup — teren de baschet), 2025 (lodge — Twin Peaks black lodge).

## Structura subiectului

| | model1 (magic) | model2 (zap) | model3 (fibacup) | 2025 (lodge) |
|---|---|---|---|---|
| Fișiere | `magic.html` + `magic.json` | `zap.html` + `zap.json` | `fibacup.html` + `fibacup.json` | `lodge.html` + `quotes.json` |
| Ce se desenează | bilă magică 8 (cerc negru, disc alb în centru, cifra 8) | televizor | teren de baschet (linii, cercuri, semicercuri) | camera roșie cu podea zig-zag alb-negru |
| Tehnologie permisă | canvas (+JS) **sau** CSS | canvas, SVG sau CSS | canvas, SVG sau CSS | canvas, SVG sau CSS |
| Fallback | imagine `magic.png` (punctaj parțial) | `tv.png` | `court.png` | `black-lodge.png` |
| Element adăugat peste desen | – | – | – | trandafirul `rose.webp`, din JS, peste desen |
| Click pe | bilă | televizor | teren | **trandafir** (nu tot desenul) |
| Sursa datelor | `magic.json` pe server http local | `zap.json` | `fibacup.json` | `quotes.json` |
| Alegere | răspuns aleator | film aleator | meci aleator | citat aleator |
| Se afișează sub desen | mesajul răspunsului, colorat | data + ora difuzării, titlul, posterul (imagine din câmpul `poster`) | steagurile (imagini din `homeflag`, `guestflag`), sub ele data și ora | personajul (`character`) și replica (`quote`) |
| Efect vizual pe desen | discul alb → verde / roșu / portocaliu după tipul răspunsului | – | – | – |
| Hover | – | pe film → sub poster: distribuția și ratingul | pe un steag → sub info: țara steagului | pe citat → sub el: sezonul și episodul |

## Sub-cerințe de bifat

### 1. Desenul (prima cerință, condiționează restul punctajului)
- [ ] Alege metoda (canvas / SVG / CSS) — toate acceptate; fallback = imaginea furnizată, cu punctaj parțial
- [ ] Reprodu imaginea dată: forme întâlnite până acum:
  - cercuri și discuri concentrice, text în interior (cifra 8) — magic
  - dreptunghiuri, dreptunghiuri rotunjite, ecran, butoane, picioare/antenă — televizor
  - dreptunghi + linii (linia de mijloc), cerc central, semicercuri (zona de 3 puncte), arce, dreptunghiuri interioare (zona de restricție) — teren
  - dreptunghi umplut + contur gros, motiv zig-zag repetat pe două culori pe partea de jos, tăiat la marginea camerei — lodge
- [ ] Proporții și culori apropiate de imagine
- [ ] Desenul e generat la încărcarea paginii

### 2. Element suplimentar peste desen (2025)
- [ ] Imagine (`rose.webp`) adăugată **cu cod JavaScript** peste desen, în poziția din imaginea de referință
- [ ] Trebuie să fie clickabilă separat de restul desenului → ori element DOM propriu poziționat peste canvas, ori desenată în canvas cu test de coordonate la click

### 3. Click pe desen
- [ ] Handler de click pe canvas / pe elementul desenat (sau doar pe o zonă a lui — trandafirul)
- [ ] Dacă e canvas, coordonatele clickului relativ la canvas (când contează unde s-a dat click)
- [ ] Dacă e CSS/SVG, click direct pe element

### 4. Fetch + promisiuni + server local
- [ ] Fișierul JSON trebuie servit prin http (enunț: `python3 -m http.server 5000`) — `file://` nu merge cu fetch; deschide pagina prin `http://localhost:5000/...`
- [ ] Folosire **fetch și promisiuni** (formulare explicită în toate modelele) — `then`-uri; async/await probabil acceptat dar enunțul spune "promisiuni"
- [ ] Parsare JSON
- [ ] Structura JSON-ului diferă: listă de obiecte cu câmpuri numite explicit în enunț (`character`, `quote`, `season`, `episode`; `poster`, distribuție, rating, dată/oră, titlu; `homeflag`, `guestflag`, dată/oră, țări) → **deschide JSON-ul și vezi cheile reale** înainte să scrii codul; în model1 trebuie să vezi cum e marcat tipul răspunsului (afirmativ / negativ / altfel)
- [ ] Alegere aleatoare la **fiecare** click (index random din listă)
- [ ] Fetch poate fi făcut la fiecare click sau o singură dată la încărcare, apoi alegere din lista păstrată — ambele satisfac enunțul

### 5. Afișarea rezultatului sub desen
- [ ] Zonă (div) sub desen, actualizată la fiecare click (conținutul vechi înlocuit)
- [ ] Tipuri de conținut afișat:
  - text simplu (mesaj)
  - mai multe câmpuri text (personaj + replică; dată + oră + titlu)
  - **imagini** cu path-ul luat din JSON (poster; două steaguri) — path relativ la locația JSON-ului / a paginii
  - ordinea cerută: imagini apoi text (fibacup: steaguri, apoi sub ele data și ora)
- [ ] Colorare text în funcție de rezultat (magic: aceeași culoare ca discul)

### 6. Modificarea desenului în funcție de rezultat (model1)
- [ ] Discul din centrul bilei se recolorează: verde = afirmativ, roșu = negativ, portocaliu = altfel
- [ ] Deci desenul trebuie să poată fi **redesenat parțial** (canvas: redesenează discul; CSS: schimbă culoarea elementului)
- [ ] Clasificarea răspunsului: depinde de cum e marcat în JSON (câmp de tip) — verifică

### 7. Hover pe rezultat
- [ ] La `mouseover`/`mouseenter` pe elementul afișat (film / steag / citat) apar informații suplimentare **sub** el (distribuție + rating / țara / sezon + episod)
- [ ] Informațiile suplimentare vin din același obiect JSON ales → păstrează obiectul curent, nu doar textul afișat
- [ ] Hover pe **fiecare** steag separat (model3) → fiecare imagine cu handler propriu și țara corespunzătoare (home vs guest)
- [ ] Ascundere la ieșirea mouse-ului (nu e cerută explicit, dar e comportamentul natural; poate fi și CSS `:hover` + conținut pre-populat)
- [ ] Elementele pe care se face hover sunt create dinamic după click → handler-ele se atașează după creare (sau delegare)

## Lucruri care s-au schimbat de la un model la altul
- Obiectul de desenat (complet diferit de fiecare dată — partea cu cea mai mare varianță)
- Zona clickabilă: tot desenul vs un element suprapus (trandafir)
- Imagine suplimentară adăugată din JS peste desen (2025)
- Câmpurile din JSON și ce se afișează (text / imagini din path / combinații)
- Recolorarea unei părți din desen după rezultat (model1)
- Ce element primește hover și ce se afișează la hover
- Numele fișierelor și portul serverului

---

## Completare: 2023/s3 — poke (stil nou, fără enunț în repo)

Confirmă tiparul C încă din 2023; particularități:
- [ ] Desen pokeball: **semicerc plin** (arc de la π la 2π, fill), cercuri concentrice, linie orizontală, contururi groase
- [ ] Click **oriunde pe canvas** (nu pe o sub-zonă) → fetch json local → element aleator
- [ ] Afișare nume + **imagine cu URL absolut de pe web** din câmpul JSON (nu path local — atenție, ambele variante au apărut)
- [ ] Hover pe elementul afișat → detalii suplimentare din același obiect (ability, level)

## Modelele vechi și subiectul C

În formatul vechi (2021, model2023) **nu există** subiect de desen/canvas/fetch; locul lui e luat de P4 (formular + server Node/Express) — vezi S0. Node/Express **nu apare în curriculum** (verificat în PDF), deci P4 nu se pregătește; C rămâne așa cum e documentat aici.

---

## Examen nou (folder `examen`, s3 — roata norocului care se învârte, 2026; reconstituit din soluție)

Primul C **fără fetch** (fetch a migrat în s2) — desen + animație + storage:
- [ ] **Roată cu 21 de sectoare** pe canvas: pentru fiecare sector `moveTo(centru)` + `arc(unghi, unghi+pas)` + `lineTo(centru)` + fill, cu pasul `2π/21` și culorile ciclând printr-o listă de 7 (`culori[i % 7]`) + contur alb între sectoare; butuc central din două cercuri
- [ ] **Indicator/săgeată deasupra roții**: triunghi CSS din borduri (`width/height: 0` + borduri laterale transparente + border-top colorat), poziționat absolut peste canvas
- [ ] Click pe canvas → **rotirea întregului element canvas prin CSS**: `canvas.style.transition = "transform " + t + "s ease-in-out"` + `canvas.style.transform = "rotate(" + total + "deg)"` — animația e făcută de TRANZIȚIA CSS, nu prin redesenare pe canvas; hibridul canvas-desen + CSS-animație e mult mai simplu decât requestAnimationFrame aici
- [ ] **Rotație cumulativă**: unghiul total se ADUNĂ la cel precedent (`rotatie += ...`), altfel a doua rotire ar porni înapoi de la 0
- [ ] Aleator: durata (0.5–5s), numărul de rotații complete (3–7), unghiul suplimentar (0–359°)
- [ ] **Guard `spinning`**: click-urile din timpul rotirii se ignoră; flagul se eliberează în setTimeout-ul sincronizat cu durata tranziției
- [ ] **sessionStorage în C**: contorul de rotații complete, afișat sub roată (div stilizat: roșu, monospace, centrat) — storage nu mai e monopolul lui B
- [ ] Transition setată DIN JS, cu durată calculată la runtime — proprietățile CSS se pot scrie dinamic ca stringuri compuse
