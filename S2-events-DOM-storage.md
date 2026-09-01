# Subiectul B — events, DOM, forms, localStorage / sessionStorage (2.5 puncte)

Bazat pe: model1 (dots — Kusama), model2 (badger), model3 (soap — baloane), 2025 (rabbits — Lynch).
Este subiectul cu cel mai mare punctaj (2.5 din 6).

## Structura subiectului

| | model1 (dots) | model2 (badger) | model3 (soap) | 2025 (rabbits) |
|---|---|---|---|---|
| Fișiere | `dots.html` + `dots.js` | `badger.html` + `badger.js` + `badger.css` (furnizat) | `soap.html` + `soap.js` + `soap.css` (furnizat) | `rabbits.html` + `rabbits.js` |
| Body | gol | gol, încarcă css furnizat | gol, încarcă css furnizat | fundal = imagine pe **toată fereastra** (`rabbits.png`) |
| Control formular | `input range #size`, min 20, max 150 | – | – | – |
| Tastă creare | `r`, `g`, `y`, `b` (4 culori) | `b` | `s` | `r` |
| Ce se creează | div cu bulină colorată (roșu/verde/galben/albastru), dimensiune = valoarea range-ului | imagine `badger-1.png` | imagine `bubble-1.png` | imagine `rabbit-01.png` |
| Poziție | aleatoare | aleatoare | aleatoare | aleatoare |
| Click pe element | se creează **încă o bulină** de aceeași culoare și dimensiune | începe să "danseze": ciclu de imagini 2→3→4→1 la 0.2s, pauză 1s, repetă; **al doilea click** = dispare | se "sparge": imaginile 2→3→4 pe rând, apoi dispare | metamorfoză: la fiecare click 01→02→03, apoi dispare |
| Tastă mișcare | – | – | `p` = toate plutesc aleator (pot ieși din ecran), `f` = se opresc toate | `p` = toți se mișcă aleator, `s` = toți se opresc |
| Tastă sunet | – | `p` = redă `badger.mp3` (element `audio` creat dinamic) | – | `a` = redă `rabbits-ambience.mp3` |
| Storage | `localStorage` | `localStorage` | `sessionStorage` | `sessionStorage` |
| Ce se numără | nr. buline create în total | nr. genuflexiuni făcute în total de bursuci | nr. baloane **sparte** în total | nr. iepuri **creați** în total |
| Unde se afișează | colț stânga sus | colț dreapta sus | colț dreapta sus | colț dreapta sus, **cu alb** |
| Extra | – | la fiecare 5 genuflexiuni apare o ciupercă (`mush.png`) pe ecran | – | – |

## Sub-cerințe de bifat

### 1. Setup
- [ ] HTML cu body gol (sau doar cu ce cere enunțul); JS în fișier separat cu numele dat
- [ ] Când se furnizează un `.css` în `resources/`, trebuie **încărcat** (nu rescris) — verifică ce clase/id-uri definește el, e posibil să fie gândit pentru elementele pe care le creezi tu
- [ ] Fundal imagine pe întreaga suprafață a ferestrei (2025) — poziționare/dimensionare a fundalului
- [ ] Căile către `resources/images/...`, `resources/sounds/...`, `resources/...` — ține cont de structura de directoare a arhivei pe care o predai
- [ ] Codul rulează după ce DOM-ul e gata (script la final / onload / defer)

### 2. Formular / control (model1)
- [ ] Element `range` cu id exact (`size`), min/max exacte (20/150)
- [ ] Valoarea range-ului citită **în momentul creării** bulinei, nu o dată la încărcare
- [ ] Elementul de range trebuie să existe în pagină (enunțul zice body gol, dar cere un element range cu id → se adaugă, fie în HTML fie creat din JS)

### 3. Evenimente de tastatură
- [ ] Ascultare la nivel de document/window
- [ ] Identificarea tastei apăsate (`r`, `g`, `y`, `b`, `s`, `p`, `f`, `a`) — atenție la litere mici vs mari
- [ ] O tastă = o acțiune; același subiect poate avea 3–4 taste cu roluri diferite (creare, start mișcare, stop mișcare, sunet)
- [ ] Atenție: în model2 `p` = sunet, în model3/2025 `p` = mișcare — nu memoriza, citește

### 4. Crearea dinamică a elementelor
- [ ] Creare div / img din JS, adăugare în body
- [ ] Buline colorate în funcție de tastă (culoare + formă rotundă + dimensiune variabilă din range)
- [ ] Imagine cu sursa corectă
- [ ] Poziție aleatoare în fereastră (poziționare absolută + coordonate random în limitele ferestrei)
- [ ] Elementele create trebuie să fie identificabile ulterior (clasă comună) ca să le poți parcurge/mișca pe toate

### 5. Click pe elementele create
- [ ] Click pe **fiecare** element creat dinamic (handler atașat la creare sau delegare pe document)
- [ ] Variante întâlnite:
  - creare clonă (aceeași culoare **și** dimensiune) — model1
  - schimbarea imaginii pe rând la fiecare click, apoi ștergere — 2025 (3 imagini)
  - secvență automată de imagini cu timp între ele, apoi ștergere — model3 (2→3→4 apoi dispare; nu se precizează intervalul, alege unul rezonabil)
  - animație ciclică cu `setInterval`/`setTimeout` (0.2s între cadre, 1s pauză, repetă la infinit), oprită și elementul șters la al doilea click — model2
- [ ] Trebuie să știi "în ce stare" e elementul (ce imagine are acum / dacă dansează) — starea per element
- [ ] Ștergerea elementului din DOM
- [ ] Dacă elementul avea un interval propriu (dans / mișcare), oprește-l când îl ștergi

### 6. Timere (`setInterval` / `setTimeout`)
- [ ] Mișcare aleatoare a **tuturor** elementelor la interval (hint explicit: `setInterval`) — pot ieși din ecran (nu e nevoie de limitare)
- [ ] Start la o tastă, stop la altă tastă → trebuie păstrat id-ul intervalului ca să-l poți opri
- [ ] Nu porni un al doilea interval dacă e deja pornit (apăsare repetată a tastei)
- [ ] Elementele create **după** pornirea mișcării trebuie să se miște și ele (parcurge lista la fiecare tick, nu o dată)
- [ ] Animație pe cadre cu ritm neuniform (0.2s / 0.2s / 0.2s / 1s) — combinație de timere sau un interval cu contor

### 7. Audio
- [ ] Redare sunet la tastă; hint din enunț: element `audio` creat dinamic din JS
- [ ] Calea corectă către fișierul mp3

### 8. Storage
- [ ] `localStorage` **sau** `sessionStorage` — citește exact; diferența e ce se întâmplă la închiderea tab-ului
- [ ] Ce se numără diferă: create / sparte / genuflexiuni — citește exact evenimentul care incrementează
- [ ] Contorul "în total" = persistă între reîncărcări → la încărcarea paginii citești valoarea existentă (sau 0), apoi incrementezi și salvezi la fiecare eveniment
- [ ] Valoarea din storage e string → conversie la număr
- [ ] Afișare permanentă într-un colț (stânga sus / dreapta sus, poziționat fix), actualizată la fiecare modificare; culoare cerută eventual (alb)
- [ ] Contorul se testează dând refresh: trebuie să continue, nu să pornească de la 0

### 9. Reguli derivate din contor
- [ ] La fiecare 5 (multiplu de 5) → apare un element nou (ciupercă) pe ecran (model2); poziția nu e precizată → aleatoare

## Lucruri care s-au schimbat de la un model la altul
- Ce se creează: div colorat vs imagine
- Sursa dimensiunii: fixă vs din `range`
- Numărul de taste și rolul lor
- Comportamentul la click: clonare / ciclu de imagini la click / ciclu automat / animație în buclă + ștergere la al doilea click
- Mișcare aleatoare (prezentă în model3, 2025; absentă în model1, model2)
- Sunet (model2, 2025)
- `localStorage` vs `sessionStorage`; ce eveniment se numără; colțul de afișare; culoarea textului
- Fundal imagine full-screen (2025)
- CSS furnizat vs scris de tine
- Efect secundar la prag (ciuperca la 5)

---

## Completare: 2023/s2 — burst (stil nou, fără enunț în repo)

Dedus din soluție; adaugă la tiparul B:
- [ ] Colecție creată **la încărcarea paginii** (nu la tastă): **tabel 6×10** de imagini construit dinamic (`table`/`tr`/`td`)
- [ ] Click pe o imagine → schimbare imagine ("spargere") + **sunet ales aleator dintr-o listă** de 3 + contor în localStorage
- [ ] Filtrarea colecției după stare (doar bulele "nesparte") și alegerea aleatoare a uneia — probabil pentru un pop automat pe timer
- [ ] (soluția are și o funcție de reset comentată — posibilă cerință de resetare a tablei)

## Variații din modelele vechi (2021 P2/P3, model2023 P2/P3 — vezi S0)

Aceleași skill-uri B, formulate altfel:
- [ ] Colecție creată la încărcare: `ul` cu 10 `li` / 10 divuri cu o clasă pe care o **scrii tu** (border, dimensiuni, background, **așezare pe același rând cu 10px distanță**)
- [ ] Conținut ales **aleator dintr-un vector de stringuri** definit de tine (minim N elemente)
- [ ] Click pe element → transformare de **string** (inversarea caracterelor) sau de **dimensiune** (creștere înălțime cu 10px în jos, cumulativ)
- [ ] **Click în afara** colecției → toate elementele revin la starea inițială → memorarea stării inițiale + `stopPropagation` pe click-ul interior (cerut explicit)
- [ ] HTML **presupus existent** (5 butoane cu text "i", input `#numar` + 10 paragrafe) — scrii tu fișierul conform presupunerii și lucrezi doar în JS
- [ ] Tastele pot fi **cifre (0–9)** mapate pe conținutul elementelor (butonul al cărui text = tasta); dacă nu există corespondent → nimic
- [ ] Acțiune doar la **prima apăsare** a unei taste (apăsările următoare nu mai declanșează)
- [ ] Ștergere cu întârziere: element șters **după 3s** de la acțiune (setTimeout) / **câte un element pe secundă** dintr-o listă filtrată (setInterval + oprire la final)
- [ ] Filtrare pe **conținut text**: numărarea cuvintelor unui paragraf (split pe spații), comparație strict mai mare
- [ ] localStorage cu alt rol decât contor afișat: memorarea **primei** culori random atribuite; la reîncărcare valoarea devine **background-ul body-ului** / **valoarea implicită a unui input**
- [ ] Condiție de final: "când toate elementele au fost șterse" → verificare după fiecare ștergere

---

## Examen nou (folder `examen`, s2 — "Roata norocului"/spânzurătoarea cu melodii, 2026; reconstituit din soluție)

Subiect de tip JOC — cel mai complex B de până acum, și primul care aduce **fetch în B**:
- [ ] Buton în HTML (`#roll`) + **tabel 4×12 creat dinamic** la încărcare (celule identificabile prin id/clase de poziție — tiparul din lab 7 / 2023)
- [ ] Click pe buton → **fetch dintr-un json local** (nume melodie, imagine, url) → alegere aleatoare — fetch nu mai e monopolul lui C!
- [ ] Scrierea cuvintelor în tabel: cuvântul i pe rândul i, literele de la coloana 1; celulele cu litere devin albe
- [ ] **Litere ascunse prin culoare**: textul alb pe fundal alb → invizibil; ghicirea îl face negru → vizibil (zero DOM în plus, doar culori)
- [ ] `keydown` + **`toUpperCase()`** pe tastă și pe cuvinte — potrivire case-insensitive
- [ ] Numărarea celulelor rămase ascunse (parcurgi td-urile, verifici culoarea/conținutul) → când ajunge la 0, ai câștigat
- [ ] **Încercări limitate**: 7 greșeli; la epuizare → sunet (`new Audio`) + reset complet
- [ ] Funcție `reset()` care readuce tot la starea inițială (tabel golit + variabile resetate) — apelată și la fiecare roll nou
- [ ] La câștig: se afișează **imaginea albumului** (src din json) și **după 2s** (setTimeout) **redirect cu `window.location.href = url`** — obiectul window.location, prezis în SE ca "neapărut"
- [ ] **Mașină de stări cu flaguri**: `song` gol = jocul n-a început (tastele se ignoră), `ghicit` = 1 blochează tastele după câștig, guard la început de handler (`return` timpuriu)
- [ ] Structural: B poate fi un JOC întreg (stare + reguli + win/lose), nu doar spawn-la-tastă — logica din lab 6 (X și 0) aplicată pe DOM
