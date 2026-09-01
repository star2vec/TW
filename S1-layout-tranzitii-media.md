# Subiectul A — layout, tranziții, media query (1.5 puncte)

Bazat pe: model1 (grid), model2 (bird, 7 iun 2024), model3 (sher, 27 ian 2025), 2025 (coif, 28 ian 2025).

## Structura subiectului (identică în toate 4 modelele)

| | model1 (grid) | model2 (bird) | model3 (sher) | 2025 (coif) |
|---|---|---|---|---|
| Container | `div#wrapper` | `div.container` | `div.container` | `div.container` |
| Nr. divuri interioare | 6 | 8 | 8 | 7 |
| Lățime coloană | 150px | 75px | 80px | 55px |
| Gap linii/coloane | 10px | 4px | 4px | 5px |
| Padding divuri | 20px | 22px | 26px | 25px |
| Text centrat orizontal | – | da | da | da |
| Fundal (2 culori) | – | `FloralWhite` / `Coral` | `#fbec5d` / `DarkOrange` | `Gold` / `DarkGoldenrod` |
| Culoare text | – | negru | negru | negru |
| Border | alb, dashed, 2px (doar A,B,C,D) | negru, dotted, 4px | `Indigo`, dotted, 3px | `DarkGoldenrod`, dotted, 8px |
| Div(uri) cerc | – | 1, fără border, fundal `LightGray` | 1, fără border, fundal `Ivory` | 2 (ochii), fără border, fundal `AntiqueWhite` |
| Interacțiune | – | `:hover` | `:active` (mouse ținut apăsat) | `:active` |
| Efect interacțiune | – | fundal + text `Crimson`, scale 1/3, tranziție 0.3s | fundal + text `Crimson`, scale 1/3, tranziție 0.4s | fundal + text `Red`, scale 1/3, tranziție 0.45s |
| Media query | 200px–600px | 350px–600px | 330px–620px | 333px–622px |
| Efect media | layout default, unele sub altele, lățime întreagă (doar A,B,C,D) | idem + cerc micșorat la jumătate pe orizontală | idem + cerc jumătate orizontal | idem + cercuri jumătate orizontal |
| Extra | – | comentariu HTML cu specia păsării | BONUS: comentariu HTML cu specia | – |

## Sub-cerințe de bifat (lista completă a ceea ce a apărut)

### 1. Fișiere
- [ ] `nume.html` + `nume.css` separate (nume dat în enunț; `coif`, `bird`, `sher`, `grid`)
- [ ] Container cu **clasă** sau **id** exact ca în enunț (`.container` vs `#wrapper` — atenție la care e cerut)
- [ ] Numărul exact de divuri interioare (6/7/8) — se numără! Atenție dacă folosești divuri imbricate (wrapper pentru ochi etc.): tot trebuie să iasă numărul cerut.
- [ ] Textul din divuri (litere A/B/C/D, simboluri `@`, `o`, `O`, etc.) după imagine

### 2. Layout (reproducere după imagine)
- [ ] Grid cu coloane de lățime fixă (px dată)
- [ ] Gap identic pe linii și coloane (o singură valoare)
- [ ] Divuri care se întind pe mai multe coloane / mai multe linii (cap, corp, picioare, cioc; bandă de sus a coifului etc.)
- [ ] Padding fix pe fiecare div
- [ ] Text centrat pe orizontală (și vizual pe verticală în imagini)
- [ ] Două culori de fundal: una "default" pentru majoritatea divurilor, alta pentru divurile "speciale" (picioare + cioc / simbolul O)
- [ ] Culoare text (negru)
- [ ] Border: culoare + stil (`dotted` sau `dashed`) + grosime; în model1 borderul este doar pe **unele** divuri (A,B,C,D), nu pe toate
- [ ] Fundalul paginii (în imagini apare o culoare de fundal a body-ului — nu e cerută explicit, dar apare în poză; reprodu-o)

### 3. Divul/divurile "cerc"
- [ ] Formă de cerc (border-radius)
- [ ] **Fără** border (suprascrie regula generală)
- [ ] Fundal propriu (culoare dată)
- [ ] Poate fi 1 cerc (bird, sher) sau 2 cercuri (coif — ochii, așezați unul lângă altul în interiorul unei zone)
- [ ] Textul din cerc rămâne (o literă), și își schimbă culoarea la interacțiune

### 4. Interacțiune (pseudo-clase + tranziție)
- [ ] `:hover` (model2) **sau** `:active` = "la ținerea apăsată a mouse-ului" (model3, 2025) — citește exact formularea
- [ ] La interacțiune: fundal **și** text în aceeași culoare (`Crimson` / `Red`) → textul "dispare"
- [ ] Micșorare la **o treime** din mărimea inițială (scale 1/3, ~0.33)
- [ ] "Treptat" = tranziție, cu durata exactă din enunț (0.3s / 0.4s / 0.45s)
- [ ] Tranziția trebuie să acopere atât transformarea cât și culorile (enunțul zice "se va micșora treptat"; culoarea poate fi și instantanee, dar `all` acoperă ambele)

### 5. Media query
- [ ] Interval de lățime cu **ambele limite** (min și max) — valorile exacte din enunț
- [ ] Layoutul de grid se renunță: divurile se afișează în "formatul default, unele sub altele, ocupând întreaga lățime a containerului" → display block în loc de grid, fără lățimi fixe pe coloane
- [ ] În model1: doar divurile A,B,C,D "unele sub altele" (restul divurilor nu sunt menționate)
- [ ] Cercul (cercurile) micșorat(e) **la jumătate pe orizontală** (nu pe ambele axe) — apare în 3 din 4 modele
- [ ] Verifică vizual redimensionând fereastra (DevTools responsive mode) în interiorul intervalului **și** în afara lui

### 6. Extra / bonus
- [ ] Comentariu HTML cu specia păsării identificate (model2 cerință obligatorie, model3 bonus) — cost zero, nu uita de el
- [ ] Imaginile din enunț sunt referința: comparația vizuală (proporții, unde e cercul, ce divuri sunt colorate diferit) e ceea ce se notează

## Lucruri care s-au schimbat de la un model la altul (unde pot apărea variații)
- Selectorul containerului (id vs clasă)
- Numărul de divuri și forma desenată (pasăre, coif) — layoutul de grid trebuie **citit din imagine**, nu memorat
- `:hover` vs `:active`
- Culorile (nume CSS: `Coral`, `FloralWhite`, `LightGray`, `Ivory`, `DarkOrange`, `Indigo`, `Gold`, `DarkGoldenrod`, `AntiqueWhite`, `Crimson`; sau hex `#fbec5d`)
- `dotted` vs `dashed`
- Durata tranziției
- Limitele media query
- 1 vs 2 cercuri
- Borderul pe toate divurile vs doar pe unele

---

## Completare: 2023 (stil nou, fără enunț în repo)

- `2023/s1` respectă același tipar (grid cu coloane/linii fixe, gap, padding, border dotted, două culori, text alb, figură tip robot cu divuri întinse pe mai multe celule). Fără enunț păstrat → nu știm dacă avea interacțiune/media query; tiparul A e confirmat însă din 2023 încoace.

## Variații din modelele vechi (2021, model2023 — structură diferită, vezi S0)

Aceleași skill-uri, alte "butoane" rotite — de acoperit în plus față de lista de mai sus:
- [ ] Dimensiuni relative: lățimea/înălțimea containerului = **jumătate din fereastră/ecran** (nu doar px ficși)
- [ ] Container cu dimensiuni proprii cerute explicit (înălțime + lățime + border al containerului însuși)
- [ ] Border pe **copiii** unui element, prin selector descendent (nu direct pe o clasă)
- [ ] Stiluri de border: pe lângă `dotted`/`dashed`, și `double`
- [ ] Media query cu **două condiții**: lățime sub X **și** înălțime sub Y; sau doar limită superioară
- [ ] Efecte de hover **în interiorul media query-ului** (comportament activ doar pe ferestre mici)
- [ ] Hover pe **container** cu efect atât pe container (dublarea înălțimii) cât și pe un copil anume (**ultimul element** → `:last-child`, border albastru)
- [ ] Tranziții pe alte proprietăți decât transform/culoare: **înălțime**, **font-size** (creștere treptată la 30px), border-color; durate lungi (3s)
- [ ] Layout dat ca **wireframe** (dreptunghiuri etichetate DIV1..DIVn), nu ca imagine de obiect — de citit suprapunerile/întinderile din schemă
- [ ] Număr mic de divuri (4–5) cu poziționări neregulate

---

## Examen nou (folder `examen`, s1 — BMO, 2026; reconstituit din soluție, fără enunț)

Confirmă tiparul A dar rotește multe butoane deodată:
- [ ] **Body cu imagine de fundal** pe toată fereastra (`cover` + `center` + `no-repeat` + `min-height: 100vh`) și **containerul centrat în fereastră** (body ca flex cu justify/align center)
- [ ] Grid 4 coloane × 100px, gap 3px, 7 divuri; textul = cifre (1,2,3,5,6), alb, bold, centrat
- [ ] **`outline` în loc de border**: `outline: black dashed 3px` + **`outline-offset: -5px`** (conturul desenat spre interior; outline nu ocupă spațiu în layout, deci nu strică dimensiunile gridului)
- [ ] **Divuri cu imagine de fundal**: capul are `bmo.jpg` ca background (cover/center), trunchiul de jos `buttons.jpg` — prima apariție a background-image pe divurile din A
- [ ] **`:active` care schimbă imaginea de fundal** (bmo.jpg → bmo-press.png) cu tranziție — swap de imagine, nu de culoare
- [ ] **`:hover` cu întindere mare pe o axă**: brațul drept `transform: translateX(250px) scaleX(6)` (alternativ `transform-origin: left` + doar scaleX) — scale pe O SINGURĂ axă, cu factor mare, plus translate ca să se întindă din umăr
- [ ] Offseturi fine cu `margin` pe divuri individuale (brațe/picioare deplasate față de celula lor)
- [ ] **`<audio src="..." autoplay loop hidden>`** direct în HTML — muzică de fundal în buclă (atenție la politica de autoplay: browserul poate cere interacțiune)
- [ ] **Media query cu REORDONARE**: 262–667px → containerul devine `flex` + `flex-direction: column`, divurile primesc lățime fixă și **`order` explicit per div** (capul 1, divul 2 al doilea, etc.) — divurile se așază unele sub altele ÎN ALTĂ ORDINE decât în HTML; `margin: 0 !important` ca să bată marginile individuale
- [ ] Concluzie: flexbox + order au apărut efectiv (prezise în SE); media query nu mai înseamnă doar "display block"
