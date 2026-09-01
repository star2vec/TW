# SE — Extra: laboratoare, modele vechi, topici de curs neexaminate

Completează S1/S2/S3 (structura standard A/B/C). Trei părți:
- **Partea I — Laboratoare** (repo oficial cechirita/tw2526): tehnici cerute la lab care nu au apărut (încă) în examene — indicatorul cel mai bun pentru ce consideră profa important.
- **Partea II — Modele vechi** (structură diferită, 4 probleme): documentate separat, exploatate pentru variații.
- **Partea III — În curs, dar în niciun examen și niciun lab**: restul materiei examinabile.

---

# Partea I — Laboratoare (tw2526)

Lab 1 (www/HTTP) = teorie/exerciții de explorare — irelevant pentru examenul practic. Lab 2–3 (HTML/CSS de bază) = fundație, fără tehnici noi față de S1. Mai jos, ce adaugă lab 4–11, mapat pe subiecte. ★ = deosebit de plauzibil la examen.

## Pentru A (lab 4, 5)

### Lab 4 — layout
- ★ **Același layout cerut și în grid ȘI în flexbox** (layout-style.css vs layout-style-flex.css) — exercițiul e literalmente "fă-l în ambele"; confirmă flexbox drept swap-ul nr. 1 pentru A
- Figură (robot) construită din **forme geometrice suprapuse**: cercuri din border-radius, suprapuneri cu position/negative margins — exact genul de "desen din divuri" care în examene apare la A (coif, pasăre); citirea unui CSS dat și completarea valorilor lipsă (`?`)
- Extra lab: același layout doar cu `position` / `float` / `clear` — variantă fără grid/flex

### Lab 5 — animații, responsive, forme
- ★★ **`@keyframes` + `animation` cu toți parametrii**: durată (4–5s), **delay** (1s), **infinite**, easing (mai lent la început/final = ease-in-out), procente intermediare cu "ține poziția între 20% și 80%" — robotul care clipește, Tigger care clipește de 2 ori și privește în jur; astea sunt formulări gata de enunț de examen
- ★ **`::before` / `::after` folosite constructiv** (pleoapele robotului) + de ce le ascunde un element (context de stacking/suprapunere)
- ★ Animație **declanșată de `:hover`** (hexagoanele colorate la trecerea mouse-ului) + proprietatea `filter` cu `hue-rotate` (notă: filter/hue-rotate NU apar în slide-uri — nivel lab, improbabil la examen, dar hover→animație e tiparul de reținut)
- **`clip-path: polygon(...)`** pentru hexagon (nu e în slide-uri; puțin probabil ca cerință, dar util ca unealtă pentru "divuri cu forme" — alternativă la border-radius)
- Responsive **mobile-first cu `min-width` și breakpoints în `em`** (40em / 80em) — examenele au dat mereu intervale în px cu ambele limite; varianta em/min-width e în lab
- Tiling cu **flex** (acoperirea paginii cu hexagoane)

## Pentru B (lab 6, 7, 8, 9)

### Lab 6 — JS de bază (X și 0)
- `prompt` / `alert` ca interfață — apar în curs (slide "DIALOG"), folosite doar aici
- Logică de joc: tablă ca Array, funcții de validare / win / draw, mutare aleatoare a calculatorului, buclă de joc
- ★ **Obiecte cu proprietăți și metode** (două jocuri în paralel = două obiecte `joc`) — singurul loc unde cursul de obiecte devine practic

### Lab 7 — DOM (aplicația de desenat pe tabel)
- ★ **Tabel generat dinamic** cu clase de poziție pe celule (`r0`, `c0`) — exact tehnica din examenul 2023 B (burst); colorare de **linii/coloane întregi**
- ★ **Navigare în arbore**: `getNthChild` (al n-lea copil), parcurgerea copiilor unui element — slide-uri + quiz în curs, nicio apariție în examene
- Redimensionarea dinamică a tabelului (adaugă linii/coloane dacă celula cerută nu există); ștergere de linii/coloane cu **actualizarea claselor**
- Desen algoritmic pe tabel: linie, dreptunghi (din linii), curcubeu
- **Permutare circulară a copiilor unei linii** (shiftRow/jumble), transpose/flip/**mirror** = reordonarea copiilor unui nod DOM — manipulare pură de children, greu dar posibil ca cerință scurtă
- Amestec de culori rgb() cu pondere (colorMixer) — nivel lab

### Lab 8 — evenimente (draw + camera)
- ★★ **Click pe celule + `input type="color"`** ca sursă a culorii — selector de culoare care parametrizează acțiunea (ruda lui range din model1 B)
- Butoane care declanșează funcții (curcubeu, clear) — element `button` + onclick
- ★★ **Arrow keys** care mută o imagine în viewport (prin `margin`) **cu limitare la margini** (clamping) — până acum examenele au cerut doar mișcare liberă ("pot ieși din ecran"); varianta cu limite e la lab
- ★ **Zoom cu tastele +/-** prin `scale`
- ★ **`cloneNode`**: "poza" = clonă a divului la momentul capturării (atenție enunț lab: clonă, nu referință; grijă la id duplicat) + **galerie** de capturi adăugate în pagină
- ★ **Timer cu countdown afișat**: captură după 5s de la tasta `t`, cu afișarea secundelor rămase într-un div (setTimeout/setInterval + UI)
- ★ **Burst**: câte o acțiune la fiecare 0.5s, timp de 2s (interval care se autooprește după N execuții) — combinația "interval + durată totală" nu a apărut în examene
- Opționale lab: **drag cu mouse-ul** (mousedown+mousemove+mouseup), **zoom cu scroll** (wheel) — singurele apariții ale mousemove în tot materialul

### Lab 9 — formulare (formularul intergalactic) — capitol întreg, aproape absent din examene
- ★★ Atributele formularului: `method="post"`, `action`, `target` (răspuns în aceeași fereastră)
- ★★ Validare built-in pe câmpuri: `required`, `minlength`/`maxlength`, **`pattern` (regex!)** — lab-ul trimite explicit la tutorial de regex, `min`/`max` pe date și numere, `step` pe range, `accept` pe file
- ★ Tipuri de input: text, **date** (cu min/max), **range cu step + etichetă care afișează valoarea selectată** (= range-ul din model1 + afișare live), **file** (accept imagini), **color**, tel, email, url, **time**, number
- ★ **Select** pentru liste lungi de opțiuni (20 de rase) + discuția "ce element e potrivit"
- **Radio cu valoare preselectată** (`checked`), **checkbox-uri cu selecție multiplă** și preselecție, **textarea neredimensionabil** (`resize: none`)
- ★★ **`input color` + localStorage**: culoarea ținută minte între vizite + background-ul paginii se schimbă la selecție — leagă formularele de storage exact în stilul enunțurilor B
- ★ **Submit cu validare JS suplimentară**: la apăsarea butonului rulează verificările scrise în JS; dacă totul e valid, **formularul e înlocuit** cu un mesaj (+ imagine/animație) — necesită preventDefault
- Stilizarea formularului (aliniere, spațiere)

## Pentru C (lab 10, 11)

### Lab 10 — AJAX (cinemateca + fonoteca)
- ★★ **XML scris de mână + parsare cu `DOMParser`** → obiect JS → afișare ca liste în pagină (cinemateca) — XML-ul apare în curs cu slide-uri multe și aici la lab; examenele au dat mereu JSON; swap-ul "datele sunt în .xml" e cel mai susținut candidat
- Conversie XML → JSON + validatoare (jsonlint)
- ★★ **Fetch în lanț (chained)**: primul fetch ia lista (`albums.json`), click pe o copertă → **al doilea fetch** după fișierul detaliului, **numit după poziția în array** (`albums/3.json`) — examenele au avut mereu UN singur json; varianta cu două niveluri e la lab
- Galerie construită din datele fetch-uite (grid de coperți + nume), click pe imagine → detalii structurate (elemente HTML, nu text brut) în alt div
- ★★ **Câmp de căutare care filtrează lista afișată**: doar albumele care conțin subșirul introdus în titlu / artist / an (exact exemplul tău cu filmele!) — `input` + eveniment `input` + `includes()` + reconstruirea galeriei; combină B (evenimente pe input) cu C (date fetch-uite)

### Lab 11 — canvas & svg
- Ușa: dreptunghiuri + **click pe desen → recolorare** (redesenare) + opțional **animație de închidere** a ușii
- ★ **Ceasul digital**: pornind de la exemplul din curs (c11/#38) — **animație canvas** + obiectul **`Date`** (ora curentă) + font custom; "rotirea" de care îți amintești e din exemplul de curs cu ceasul (canvas are `ctx.translate`/`ctx.rotate`/`ctx.scale` în slide-uri — pentru un ceas analog rotești limbile cu save/restore)
- ★★ **Pac-Man**: disc + ochi, **gura = sector de cerc** (arc cu unghiuri variabile), **animație bazată pe timestamp** (diferența dintre timpul de start și cel curent — nu doar setInterval), hrană cu **rgba** (opacitate variabilă) care își schimbă poziția — cel mai complet exercițiu de animație canvas; dacă la examen apare "desenul se animă", ăsta e modelul

---

# Partea II — Modele vechi (structură diferită: 4 probleme)

Surse: `modele/2021` (foto, Seria 13 Varianta A) și `modele/model2023` (`model_subiect.html`).
Probabil altă serie / alt examinator. **Verificat în PDF-ul de curs: Node/Express NU apare nicăieri** (toate mențiunile "node" sunt noduri DOM; cursul e exclusiv client-side). → **P4 nu se pregătește**; rămâne documentat doar ca să se știe că a existat în celălalt format.

## Maparea pe subiectele A/B/C

| Problema veche | Corespondent | Observații |
|---|---|---|
| P1 layout + media query | Subiectul A | aceleași skill-uri, cerințe formulate ca wireframe (DIV1..DIVn), nu ca desen de obiect |
| P2 colecție dinamică + click + stopPropagation | Subiectul B | fără taste; colecția se creează la încărcare |
| P3 HTML "presupus" + tastatură + timere + localStorage | Subiectul B | pornești de la elemente presupuse existente (ți le scrii singură pentru testare) |
| P4 formular + server Node/Express | — | **exclus**: nu există în structura nouă și nici în curriculum — nu se pregătește |

## 2021 (Seria 13, Varianta A)

- **P1**: div `#parinte`, înălțime 150px, **lățime = jumătate din lățimea ferestrei**; 4 divuri interioare; layout după wireframe (eventual grid); border pe **copiii** divului părinte (selector descendent): negru, punctat, 2px; media query 200–600px: (a) format default, unul sub altul, lățime întreagă; (b) la **hover pe divul părinte**: părintele își **dublează înălțimea**, iar **ultimul element** își schimbă borderul în albastru; modificările se fac **lent, timp de 3 secunde**.
- **P2**: body gol; la încărcare se creează un `ul` cu 10 elemente; textul fiecărui `li` = random dintr-un vector de stringuri (minim 5); click pe un `li` → i se **inversează caracterele**; click în afara listei → toate revin la forma inițială.
- **P3**: se presupun 5 inputuri button cu textul "i" (i=1..5); la o tastă cifră (0–9), butonul cu textul egal cu tasta primește **background random** și **după 3s este șters**; fără corespondent → nimic; când toate au fost șterse, se salvează în localStorage **prima** culoare atribuită; la reîncărcare devine background-ul body-ului.
- **P4** (exclus): formular 2 inputuri text + submit; validare (text doar majuscule; n1<n2<lungimea lui T); răspuns: vocalele dintre indicii n1..n2 sau "Date invalide".

## model2023 (`model_subiect.html`)

- **P1**: div `.container`, **înălțime = jumătate din înălțimea ecranului**, lățime 250px, border albastru punctat; 5 divuri; grid după wireframe; divurile din interiorul `.container` au border negru **dublu** 8px și font-size 15px; media query cu **două condiții** (lățime sub 600px **și** înălțime sub 500px): (a) format default, unul sub altul, lățime întreagă; (b) la hover pe oricare div, **font-size crește treptat (3s) la 30px**.
- **P2**: la încărcare, 10 divuri cu clasa `dreptunghi` (clasa — scrisă de tine — dă border, dimensiuni, background, **așezare pe același rând cu 10px distanță**); click pe un div → **crește în înălțime (în jos) cu 10px**; click în afară → toate revin la inițial; **click-ul pe div nu declanșează handler-ul din afară** (stopPropagation, numit explicit).
- **P3**: se presupun input text `#numar` + 10 paragrafe cu cuvinte separate prin spații; **la prima apăsare** a tastei `s`: se ia numărul și **se șterge din secundă în secundă câte un paragraf** cu număr de cuvinte **strict mai mare**; la final, numărul paragrafelor șterse → localStorage; la reîncărcare devine **valoarea implicită a inputului**.
- **P4** (exclus, mai puțin partea client-side care E în curriculum: formular cu select / radio + submit).

## Tehnici extrase (integrate și în secțiunile "variații" din S1/S2)

- Dimensiuni **relative la fereastră/ecran**; media query cu condiții pe lățime **și înălțime**
- Hover pe **container** cu efecte pe container și pe un copil; `:last-child`
- Tranziții pe înălțime / font-size / border-color; durate lungi (3s); border `double`
- Layout dat ca **wireframe**
- Colecții create **la încărcare**; așezare pe un rând cu distanță fixă
- **Click-outside + stopPropagation** + memorarea stării inițiale pentru reset
- **Stringuri**: inversare, split pe spații, numărare cuvinte
- Acțiune doar la **prima apăsare** a unei taste; ștergere după delay (3s) / câte una pe secundă
- localStorage refolosit ca **default la reîncărcare** (background body / valoare input); memorarea "primei" valori dintr-o serie
- HTML "presupus existent" — ți-l scrii singură pentru testare

---

# Partea III — În curs, dar în niciun examen (și cum se leagă de laburi)

Verificat în PDF. ★ = plauzibil. Ce apare ȘI la lab e marcat [lab N] — prioritate maximă, fiindcă e predat de două ori.

## Pentru A
- ★★ **Flexbox** — capitol întreg [lab 4, lab 5]; toate examenele au cerut grid → swap-ul nr. 1
- ★★ **`@keyframes` + `animation`** (delay, infinite, easing, procente intermediare) [lab 5]
- ★ Pseudo-clase dincolo de :hover/:active: **`:not`**, **`:first-child`** (slide-uri dedicate; `:last-child` doar în modelul vechi), `:link`/`:visited`, `:focus`/`:checked` (cu formulare)
- ★ Pseudo-elemente **`::before`/`::after`** (cu `content`) [lab 5], `::first-letter`/`::first-line`
- ★ `transform: rotate` / `translate` / `skew` (doar `scale` a apărut); transformări 3D (improbabil)
- ★ Unități relative: `vw`/`vh`/`em`/`rem`/`%` [lab 3, lab 5 — breakpoints în em]
- `position` explicit (relative/absolute/fixed/**sticky**) + `z-index`; `float`+`clear` [lab 4 extra]
- Multicoloane; variabile CSS; selectori prin atribute [lab 3]; specificitate/`!important`/`inherit` [lab 3]
- Operatorii `@media`: `not`, virgulă, `orientation`; `min-width` singur [lab 5]
- Imagini responsive: `object-fit`, `srcset`/`picture`, `background-size`
- `@font-face` [lab 11 clock]; `overflow`/`visibility`/`display` ca cerințe explicite

## Pentru B
- ★★ **Formulare** — capitol mare, abia atins [lab 9 în întregime]: controale (checkbox/radio/select/textarea/date/time/color/file/email/number), **validare built-in** (`required`, `pattern`, min/max, step), evenimentele **`input` vs `change`**, `checked`, `label`/`fieldset`, **submit + preventDefault + validare JS**
- ★ **Mouse events** dincolo de click: `mousemove` (drag) [lab 8 opțional], `dblclick`, `mousedown`/`mouseup`, wheel [lab 8 opțional]
- ★ `stopPropagation` + bubbling/capture [lab 8 ex.1 = simulatorul domevents]; `preventDefault`
- ★ **Cookies** (slide "COOKIES?" lângă storage) — swap "salvați în cookie în loc de storage"
- ★ `Date` [lab 11 clock]; `cloneNode` [lab 8]; navigarea în arbore (parent/children/siblings) [lab 7]
- `classList` (add/remove/toggle); `getComputedStyle`; `window.location`/`history`/`screen`/`open`
- Metodele de array `map`/`forEach`/`filter`/`reduce` (slide fiecare); obiecte cu metode [lab 6]

## Pentru C
- ★★ **XMLHttpRequest + XML + DOMParser** — cel mai mare bloc neexploatat (23 mențiuni XHR în PDF) [lab 10 cinemateca]
- ★★ **Animații pe canvas** (+ timestamp, `requestAnimationFrame`, optimizări) [lab 11 pacman, clock]
- ★ Transformări canvas: `ctx.translate`/`rotate`/`scale` + save/restore (în slide-uri; ceas analog = aplicația clasică)
- ★ **Gradienți** (liniari/radiali), **curbe Bézier**, **`Path2D`** (+ `isPointInPath` pt. hit-test), `fillText`/`strokeText`, composite
- ★ **Fetch în lanț** / fișiere numite după index [lab 10 fonoteca]; **trimiterea formularelor via fetch** (POST — slide dedicat)
- ★ Filtrare pe date fetch-uite după un câmp de căutare (substring, `includes`) [lab 10 extra]
- SVG ca cerință impusă: rect/circle/line/**polygon**, fills & strokes, gradienți SVG
- Callbacks ca alternativă cerută explicit; sector de cerc (gura lui Pac-Man) [lab 11]

## Ce NU e de pregătit
- HTTP/istorie/URI/accesibilitate — teorie, nu se pretează la examen practic
- Node/Express — inexistent în curriculum (verificat)
- `await` — 0 apariții în slide-uri; enunțurile cer "promisiuni" → rămâi pe `then`
- filter/hue-rotate, clip-path — doar în lab, nu în slide-uri (citește-le o dată, nu le aprofunda)

## Prioritizare (ce intră primele în snippets)
1. Flexbox (layoutul A refăcut în flex) și `@keyframes` cu toți parametrii
2. Formulare: controale + validare built-in + input/change + submit cu preventDefault
3. XML + DOMParser + XHR; fetch în lanț; filtrare cu câmp de căutare
4. Animație canvas (timestamp) + transformări canvas + gradienți/Bézier/Path2D
5. Arrow keys cu clamping, cloneNode + galerie, countdown, burst-interval, drag
6. Cookies, `:not`/`:nth-child`, `::before`/`::after`, Date

---

# Actualizare după examenul nou (folder `examen`, 2026)

Predicții din acest fișier care s-au adeverit: **flexbox** (media query-ul din s1 folosește flex + `order`), **transform dincolo de scale** (translateX, scaleX cu factor mare, rotate din JS), **`window.location`** (redirect la câștig în s2), **tabel dinamic cu celule adresabile** (s2 = tiparul lab 7), **logică de joc cu obiecte/stare** (lab 6 → s2), **audio în HTML cu autoplay+loop** (s1), **background-image pe divuri** (s1). Noutăți neanticipate: `outline`/`outline-offset` în locul borderului, ascunderea textului prin culoare identică cu fundalul, animarea canvasului prin tranziție CSS pe `transform: rotate`, triunghi CSS din borduri. Lecția structurală: **ingredientele migrează între subiecte** (fetch în B, storage în C, audio în A) — pregătirea pe skill-uri, nu pe "ce subiect le conține", e strategia corectă.
