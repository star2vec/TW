# TEORIE — conceptele din spatele codului

Companionul lui README (acolo = *cum se scrie*, aici = *cum funcționează și de ce*). Acoperă toate întrebările discutate + completările lor naturale.

---

## 1. Cascada și specificitatea (prioritățile CSS)

Când două reguli setează aceeași proprietate pe același element, câștigătorul se decide în ordinea:

1. **`!important`** bate tot ce e mai jos
2. **Stiluri inline** (`style="..."` sau `el.style` din JS)
3. **Specificitate** — trei numere **(id-uri, clase, tipuri)**:
   - id-uri: `#x` → coloana 1
   - clase `.a`, atribute `[type="text"]`, pseudo-clase `:hover`, `:not()` (conținutul lui contează, el nu) → coloana 2
   - tipuri `div`, pseudo-elemente `::before` → coloana 3
   - se compară ca numerele de versiune: `(1,0,0)` bate `(0,99,99)` — un id bate orice grămadă de clase
4. La egalitate: **regula de mai jos în fișier** câștigă

```css
.container div { border: 8px dotted gold; }   /* (0,1,1) */
.cerc          { border: none; }              /* (0,1,0) — PIERDE, oriunde ar fi! */
.container .cerc { border: none; }            /* (0,2,0) — câștigă */
```
Capcana de examen: regula generală pe divuri + excepția pe cerc. `*` și combinatorii (`>`, `+`, spațiu) au specificitate zero. `@media` NU schimbă specificitatea — doar condiționează aplicarea; în interiorul query-ului tot îți trebuie specificitate ≥ celei de afară.

**Moștenirea** (separată de cascadă): proprietățile de text (`color`, `font-size`, `font-family`, `text-align`) curg de la părinte la copii fără nicio regulă; cele de cutie (`border`, `padding`, `width`, `background`) NU. Valorile moștenite pierd în fața oricărei reguli directe. `inherit` forțează moștenirea unde nu are loc natural. Printre `!important`-uri, specificitatea se compară din nou.

---

## 2. `display` — cum participă elementul la flux

| Valoare | Comportament |
|---|---|
| `block` | rând nou, lățime întreagă din oficiu, respectă width/height/margin (divuri, p, h1) |
| `inline` | curge în text, pe același rând; **width/height IGNORATE** (span, a, b) |
| `inline-block` | pe același rând, dar acceptă dimensiuni — "10 divuri pe un rând cu 10px distanță" |
| `none` | scos complet din layout (vs `visibility: hidden` = invizibil dar spațiul rămâne) |
| `flex` / `grid` | elementul devine container care își aranjează COPIII după regulile respective |

"Unele sub altele, pe toată lățimea" din media query = literalmente comportamentul `block`.

---

## 3. `position` — unde e plasat, față de ce

`top/left/right/bottom` NU fac nimic pe `static` (defaultul). Se activează cu:
- **`relative`** — rămâne în flux (spațiul lui se păstrează), offseturile îl deplasează vizual; rolul principal: **ancoră** pentru copiii absolute
- **`absolute`** — scos din flux; poziționat față de **cel mai apropiat strămoș poziționat** (orice ≠ static), altfel față de pagină. Perechea de memorat: părinte `relative`, copil `absolute`
- **`fixed`** — ancorat de viewport, imun la scroll (contorul din colț)
- **`sticky`** — relative până treci de prag (`top: 0`), apoi se lipește ca fixed

`z-index` decide suprapunerile (doar pe elemente poziționate); altfel, ce e mai târziu în DOM se desenează deasupra.

**Relația display–position**: `absolute`/`fixed` scot elementul din flux → block/inline nu mai contează pentru plasare, iar display-ul lui devine efectiv `block` (un span absolut acceptă dimensiuni). `display: none` bate orice position. Un copil `absolute` **evadează** din flex/grid-ul părintelui. `relative` nu schimbă nimic la display. Din JS: `el.style.left` cere element poziționat — de-aia orice snippet de creare pune întâi `position: absolute`.

---

## 4. Dimensiuni și unități

- `width`/`height` exacte; pe block, width default = umple părintele, height = cât conținutul (body gol ≈ 0 înalt → fundalul pictează o fâșie; fix: `min-height: 100vh`)
- `max-width` = plafon (`img { max-width: 100% }` — imaginea nu dă pe afară), `min-width` = podea
- **Box model**: default `width` = doar conținutul; padding + border se ADAUGĂ (coloană 55px + padding 25px = 105px pictați). `box-sizing: border-box` face width să includă tot — când desenul A iese "umflat", `* { box-sizing: border-box }` e fixul
- Unități: `px` absolut · `em` = font-size-ul elementului curent (se compune la imbricare!) · `rem` = font-size-ul rădăcinii (16px default, nu se compune) · `vw`/`vh` = 1% din fereastră (`50vw` = "jumătate din lățimea ferestrei") · `%` = raportat la PĂRINTE (height: % cere părinte cu height explicit; padding/margin în % folosesc mereu LĂȚIMEA părintelui)
- Media queries în `em` (lab 5: `40em` ≈ 640px) scalează cu fontul de bază al utilizatorului

---

## 5. Imagini de fundal (body sau orice div)

```css
.el { background: url("cale.png") no-repeat center / cover; }
```
- `cover` umple cutia (taie margini) · `contain` încape întreagă (lasă benzi) · `100% 100%` deformează · fără `no-repeat` → mozaic
- `background-position` (center, top left, px, %) · `background-attachment: fixed` (imun la scroll) · culoare de rezervă: `background-color` dedesubt · straturi multiple separate prin virgulă (primul = deasupra)
- Un div NU se dimensionează după fundal — fără width/height, fundal invizibil. `border-radius: 50%` + background = imagine circulară
- Din JS: `el.style.backgroundImage = 'url("...")'` — `url()` rămâne obligatoriu
- **background vs `<img>` vs drawImage**: fundal = decor (nu e în DOM, nu are `src` de verificat); `<img>` = conținut (tot B-ul stă pe compararea `src`-ului); `drawImage` = în interiorul canvasului. Enunț "conține imaginea" → img; "are ca fundal" → background

---

## 6. Flexbox (curriculum Froggy complet)

Modelul mental: containerul are **axa principală** (dată de `flex-direction`) și **axa secundară** (perpendiculara). Toate alinierile lucrează pe una din ele, nu pe "orizontal/vertical".

- `flex-direction: row | row-reverse | column | column-reverse`
- `justify-content` (axa principală): `flex-start | flex-end | center | space-between | space-around | space-evenly`
- `align-items` (axa secundară): `flex-start | flex-end | center | stretch` (default — de-aia divurile dintr-un rând flex sunt egal de înalte) `| baseline`
- Capcana reverse: start/end urmează DIRECȚIA, nu ecranul — la `row-reverse`, `flex-start` = dreapta
- `order: n` per element (default 0, merge negativ) — reordonare vizuală fără a atinge HTML-ul (examenul nou o folosește în media query!)
- `align-self` — suprascrie align-items pentru un singur element
- `flex-wrap: nowrap | wrap | wrap-reverse`; shorthand `flex-flow: column wrap`
- `align-content` — distribuie RÂNDURILE (doar când wrap a produs mai multe); align-items = elementele în rândul lor
- `gap: 5px` — ca la grid; sizing per element: `flex: grow shrink basis` (`flex: 1` pe toate = împărțire egală)
- Centrare text în div: `display: flex; justify-content: center; align-items: center;`

Grid cu coloane auto: `repeat(auto-fill, minmax(150px, 1fr))` — câte coloane de min 150px încap, spațiul rămas împărțit egal; responsive fără media query. `auto-fit` colapsează coloanele goale (elementele se întind), `auto-fill` le păstrează fantomă.

---

## 7. Animații CSS — complet

Două jumătăți: **@keyframes** (ce se întâmplă) + **animation-*** (cum rulează).

```css
@keyframes clipire {
  0%       { transform: translateY(0); }     /* from */
  20%, 80% { transform: translateY(75px); }  /* aceeași stare la 2 momente = pauză */
  100%     { transform: translateY(0); }     /* to */
}
```
Între keyframes diferite browserul interpolează; între identice nu mișcă nimic ("ține închis între 20% și 80%"). "Clipește de 2 ori repede" = două perechi jos-sus înghesuite în procente (ex: 90/92.5/95/97.5/100). `display` nu se poate anima.

Proprietățile:
- `animation-name` (poate fi listă — mai multe animații simultan)
- `animation-duration` — o parcurgere 0→100%
- `animation-delay` — negativ = sare în mijlocul animației (desincronizare)
- `animation-iteration-count` — număr (merge 2.5) sau `infinite`
- `animation-timing-function` — `linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier() | steps(n)`; se aplică ÎNTRE keyframes consecutive, suprascriptibilă per keyframe
- `animation-direction` — `normal | reverse | alternate` (dus-întors — înjumătățește keyframes-urile simetrice) `| alternate-reverse`
- `animation-fill-mode` — `none` (default: sare înapoi la stilul normal, inclusiv în delay) `| forwards` (rămâne la ultimul keyframe) `| backwards | both`
- `animation-play-state: running | paused` (`:hover { animation-play-state: paused }` îngheață pe loc)

Shorthand: `animation: nume 5s ease-in-out 1s infinite alternate both;` — **primul timp = durata, al doilea = delay-ul**, restul ordinii liber.

**Transition vs animation**: tranziția cere declanșator (hover/active/clasă din JS) și merge A→B; animația pornește singură, are etape, poate rula infinit. "La hover se micșorează treptat" = transition; "pulsează continuu" = animation. Animația pe `:hover` se resetează la ieșirea mouse-ului. Din JS: pornire = `classList.add`; evenimente `animationstart/iteration/end`. Preferă în keyframes `transform` + `opacity` (nu left/top/width) — mai fluid. Examenul nou: tranziție setată DIN JS cu durată calculată (`el.style.transition = "transform " + t + "s"`) — proprietățile CSS sunt stringuri compozabile.

---

## 8. `::before` / `::after` + tiparul "pleoapei"

Pseudo-elementele creează elemente virtuale în interiorul elementului, fără HTML. Obligatoriu `content` (fie și `""` = "vreau doar dreptunghiul"). Apar în DevTools ca noduri sub element.

Tiparul robotului (lab 5), refolosibil pentru orice "capac care apare peste ceva":
1. `content: ""` + dimensiuni + background = piesă gratuită
2. `position: absolute` + offset negativ (`top: -50px`) = parcată în afara elementului (părintele = relative)
3. `overflow: hidden` pe un strămoș = decupată → invizibilă în repaus (echivalentul CSS al lui `ctx.clip()`)
4. `@keyframes` cu `translateY(±înălțimea piesei)` = intră/iese

Varianta pisicii: strat intern cu `height: 0` animat spre `100%` — fără overflow, mai puțin cod. Ambele valabile.

---

## 9. Variabile CSS, calc, forme, filtre

- **Variabile**: `--nume: valoare` declarată pe un element, vizibilă în toți descendenții (pe `:root` = elementul html = globală). Citire: `var(--nume, fallback)`. Se pot redeclara local / în @media / la :hover → retematizare dintr-o linie. JS: `getPropertyValue("--s")` / `setProperty("--s", "300px")`. Scopul: un singur loc de modificat (pisica: totul în % din `--size`)
- **`calc()`**: aritmetică cu unități amestecate — `calc(100% - 20px)`, `calc(var(--s) * 1.13)`; spații OBLIGATORII la `+`/`-`
- **`border-radius` dublu**: `70% 30% 0 0 / 100% 100% 0 0` — per colț raza orizontală / verticală (înainte / după slash, ordinea: st-sus, dr-sus, dr-jos, st-jos) → colțuri eliptice, forme organice. De ȘTIUT CITI, nu proiectat
- **`clip-path: polygon(x1 y1, x2 y2, ...)`** — decupează vizual la poligon (procente, origine st-sus); zona tăiată e transparentă și neclickabilă. 6 vârfuri pe mijloacele laturilor = hexagon. Și `circle()`, `inset()`. Doar în lab
- **`shape-outside`** (doar pe float) — înlocuiește dreptunghiul de curgere cu altă formă; hack-ul fagurelui: fâșie invizibilă flotată cu formă = gradient repetitiv de benzi → rândurile alternante de hexagoane împinse cu o jumătate. De recunoscut, nu de reprodus
- **`filter`**: `blur() grayscale() brightness() drop-shadow()` și `hue-rotate(deg)` — rotește nuanțele pe cercul cromatic; 0→360deg animat = curcubeu în buclă perfectă. Doar în lab
- **Triunghi CSS din borduri** (săgeata roții din examenul nou): `width/height: 0` + borduri laterale `transparent` + `border-top: 30px solid red` → borderele se întâlnesc pe diagonale, rămâne un triunghi

---

## 10. `el.style` vs `getComputedStyle` (+ dimensiunile elementelor)

- `el.style` — read/write, dar vede DOAR inline-ul (atributul style + ce ai setat din JS). Proprietate din fișier CSS → `""` → `parseInt("")` = NaN (bugul clasic)
- `getComputedStyle(el)` — read-only, valoarea FINALĂ după toată cascada, în unități absolute; ca string cu unitate (`"-40px"`) → `parseInt`/`parseFloat`. Dă și valoarea din mijlocul unei tranziții
- Regula: **scrii cu style, citești cu getComputedStyle** — cu excepția valorilor pe care le-ai pus tu inline (iepurii: left setat la creare → citit din style e ok). Tiparul camerei: citește computed → calculează → scrie inline
- Dimensiuni direct ca numere: `clientWidth/Height` = conținut + padding (interiorul util — limitele de clamping) · `offsetWidth/Height` = + border (cutia întreagă — `offsetHeight + 10`) · `scrollWidth/Height` = conținutul total, inclusiv cel derulat · `getBoundingClientRect()` = față de viewport, cu zecimale, INCLUDE transformările (hit-test canvas) · fereastra: `window.innerWidth/Height`

---

## 11. Evenimente de tastatură și mouse

- Evenimente: **`keydown`** (se repetă cât ții tasta — bun pentru săgeți), `keyup`; `keypress` = deprecated
- Identificare: **`e.key`** — literele ca atare (`"r"`; cu Shift `"R"` → `e.key.toLowerCase()`/`toUpperCase()` pentru case-insensitive, ca în jocul cu melodii), cifre `"0".."9"`, `"ArrowLeft" / "ArrowRight" / "ArrowUp" / "ArrowDown"` (exact așa, case-sensitive), `"Enter"`, `"Escape"`, `" "`, `"+"/"-"`. `e.code` = tasta fizică (`"KeyR"`) — există, dar materia folosește `key`
- Săgețile derulează pagina din oficiu → `e.preventDefault()` în handler dacă pagina are scroll
- Mouse: `click`, `dblclick`, `mousedown/up/move` (drag = down+move+up), `mouseover/out` (bublează) vs `mouseenter/leave` (nu bublează — preferate pe elementele-rezultat), `wheel`
- Bubbling: evenimentul urcă din `e.target` (elementul lovit) prin strămoși până la document — pe asta stă delegarea; `e.currentTarget` = elementul cu listenerul; `e.stopPropagation()` oprește urcarea (tiparul click-outside); `e.target.closest("td")` = varianta robustă când ținta are copii
- `e.target.tagName` = numele tagului ÎN MAJUSCULE (`"TD"`) — filtrare după tip, alternativa filtrării după clasă

---

## 12. Tabele + adresarea celulelor

- API dedicat: `table.rows[i].cells[j]`, `td.cellIndex`, `tr.rowIndex`, `table.insertRow(i)` / `deleteRow(i)`, `tr.insertCell(i)` / `deleteCell(i)`
- Strategia claselor de poziție (`r2 c5`): selecții de grup gratuite (`.c3` = coloana), dar **denormalizate** — după ștergeri trebuie rescrise după poziția reală, altfel mint
- Decodarea din className: `cell.className.split(" ")` → `substring(1)` → `parseInt` — fragilă la clase suplimentare; robust: `find(c => c[0]=="r")` sau direct `cellIndex`/`rowIndex`
- Reordonări: `appendChild`/`insertBefore` pe un nod EXISTENT îl MUTĂ (nu copiază) — shift circular = `tr.insertBefore(tr.lastElementChild, tr.firstElementChild)`; copie = `cloneNode(true)` (scoate id-ul duplicat!)
- CSS necesar: dimensiuni pe `td` + `border-collapse: collapse`
- Truc din examenul nou: text ascuns = culoarea textului identică cu fundalul; "descoperirea" = schimbarea culorii

---

## 13. Dialoguri + obiecte (lab 6)

- `alert(msg)` · `prompt(msg, default)` → string sau `null` la Cancel · `confirm(msg)` → boolean. **Modale și sincrone**: execuția stă pe loc; NU pot exista două simultan — "două jocuri în paralel" = UN prompt cu ambele table în mesaj (`\n`) și ambele mutări în răspuns (`split(" ")`)
- Capcane: rezultatul e mereu string (`parseInt` înainte de aritmetică); verifică `null`
- Obiectele rezolvă "aceeași logică, stări multiple": proprietăți (tabla, jucătorul, flag `activ`) + metode; **`this` = obiectul pe care s-a apelat metoda** → `j1.valid(3)` și `j2.valid(3)` = aceeași funcție, table diferite. Fabrică: funcție care returnează obiectul-literal; echivalent cu `class`/`new` din slide-urile AJAX. Același principiu ca starea per-element de la bursuci (`el.dans`)
- Examenul nou aplică exact asta: joc cu stare (song, tries, ghicit) + reguli + condiții win/lose pe DOM

---

## 14. Audio

- JS (tiparul B, mereu valabil): `new Audio("cale.mp3").play()` — dintr-un handler merge sigur (interacțiunea = permisiunea)
- HTML: `<audio src="..." autoplay loop>` (+ `hidden` sau fără `controls` = invizibil; `controls` = player vizibil; `muted` = singurul autoplay garantat)
- **Politica de autoplay**: browserele blochează autoplay-ul cu sunet până la prima interacțiune cu pagina — tagul poate să nu pornească; știi să spui DE CE. Loop din JS: `a.loop = true` înainte de `play()`
- CSS nu poate reda sunet, deloc

---

## 15. `:focus` și restul familiei de interacțiune

`:hover` = mouse deasupra · `:active` = mouse ținut apăsat · **`:focus`** = elementul care primește tastatura (input-ul în care scrii, butonul tab-uit); stilizează inelul default. La pierderea focusului se declanșează `change` (vs `input` = la fiecare modificare). JS: `el.focus()`, evenimentele `focus`/`blur`. `:checked` pentru radio/checkbox bifate.

---

## 16. Debugging — harta completă

- **Elements/Styles**: ce reguli se aplică, cele tăiate = pierdute la specificitate (SINGURUL loc unde vezi erori CSS — CSS-ul eșuează silențios, fără consolă); editare live; forțarea stărilor `:hov` (esențial la :active); Computed + diagrama box-model; badge-ul grid = liniile desenate peste pagină
- **Console**: erori JS + REPL viu — apelezi funcțiile tale de mână, `$0` = elementul selectat în Elements, `console.table(array)`
- **Network**: debuggerul lui C — 404 = cale greșită (îți arată calea încercată), eroare CORS = ai deschis cu file:// în loc de server; clickezi requestul → JSON-ul brut
- **Application/Storage**: localStorage/sessionStorage ca tabel editabil; ștergi cheia = testezi "prima încărcare"
- **Sources**: breakpoint pe linie / `debugger;` în cod; hover pe variabile; Event Listeners pe element
- **Responsive mode** (Ctrl+Shift+M): lățimi exacte — testează LIMITELE query-ului (332/333/622/623)
- **Validatoare online** (linkate chiar de laburi): W3C CSS + HTML validator, jsonlint (virgula finală ucide JSON.parse), regex101 pentru `pattern`
- **Zero-tool**: `* { outline: 1px solid red }` (outline nu mișcă layoutul!), fundaluri țipătoare temporare, comentezi jumătate din cod (căutare binară), reload după fiecare adăugare mică
- Rutare: layout greșit → Elements; interacțiune moartă → Console + breakpoint; fetch gol → Network; storage ciudat → Application

---

## 17. Lecții transversale (din examenul nou)

- Ingredientele **migrează între subiecte**: fetch a apărut în B, storage în C, audio în A → pregătește skill-uri, nu "subiecte"
- `outline` + `outline-offset` = contur care nu ocupă spațiu (negativ = spre interior) — alternativă la border care nu strică gridul
- Canvas static + **animație prin CSS transform pe elementul canvas** = cel mai simplu spin/rotire (tranziția face interpolarea; unghi cumulativ!)
- Guard-flags (`spinning`, `ghicit`, `song === ""`) cu `return` timpuriu = mașina de stări minimală a oricărui joc

---
---

# PARTEA II — restul materiei (dincolo de întrebările discutate)

## 18. JS — limbajul de bază

- **Tipuri**: number (unic, fără int/float separat; `NaN` e number și `NaN !== NaN`), string, boolean, `undefined` (nedeclarat/nesetat), `null` (absență intenționată), object (inclusiv array-urile și funcțiile). `typeof x`; capcana `typeof null === "object"`.
- **Conversii**: `Number("7")` strict (Number("7px") = NaN) vs `parseInt("7px")` = 7 (citește din față); `parseFloat` pentru zecimale; `String(x)`; `+` cu un string face CONCATENARE (`"7" + 1 = "71"`), celelalte operații convertesc la număr (`"7" - 1 = 6`).
- **`==` vs `===`**: dublu-egal face coerciție (`"5" == 5` true, `0 == ""` true) — folosește `===`/`!==` mereu; excepția tolerată: `x == null` prinde și undefined.
- **Falsy** (tot restul e truthy): `false, 0, "", null, undefined, NaN`. `if (el)` = "există și nu e gol".
- **`let` vs `const` vs `var`**: let/const au scope de BLOC `{}`, var de funcție; var se ridică (hoisting) inițializat cu undefined, let/const dau eroare dacă le folosești înainte de linie; `const` = re-atribuirea interzisă, dar obiectul/array-ul rămâne MUTABIL (`const a = []; a.push(1)` e ok). Regula: const default, let unde re-atribui, var deloc.
- Template literals: `` `am ${nr} iepuri` `` — alternativa la concatenare.

## 19. Stringuri (imutabile — orice metodă returnează string NOU)

`s.length` · `s[i]`/`charAt(i)` · `toUpperCase()/toLowerCase()` · `includes(sub)` / `indexOf(sub)` (-1 dacă nu e) / `startsWith/endsWith` · `slice(i, j)` (acceptă negative) vs `substring(i, j)` · `split(sep)` → array (`split("")` → litere; `split(/\s+/)` → cuvinte) · `trim()` · `replace(a, b)` (doar PRIMA apariție; `replaceAll` pentru toate) · `padStart(2, "0")` (ceasul!) · `repeat(n)` · inversare: `s.split("").reverse().join("")`.

## 20. Array-uri

- Mutatoare: `push/pop` (coadă), `shift/unshift` (față), `splice(i, câte, ...noi)` (șterge/inserează oriunde), `reverse()`, `sort()` — ATENȚIE: sortează ALFABETIC by default ([10,2,1] → [1,10,2]); numeric: `sort((a,b) => a - b)`, `fill(v)`.
- Nemutatoare: `slice(i,j)` (copie), `concat`, `join(sep)`, `indexOf/includes`.
- Funcționale (slide dedicat fiecăreia): `forEach(f)` (doar parcurge), `map(f)` (array nou transformat), `filter(f)` (subsetul care trece testul), `find(f)` (PRIMUL care trece / undefined), `reduce((acc, x) => ..., init)` (acumulare — sume, maxime), `some/every` (există / toate).
- Conversii: `Array.from(colectie)` sau `[...colectie]` — obligatoriu pe NodeList/HTMLCollection vechi ca să ai .filter; `Array(9).fill(" ")` — tabla de X și 0.

## 21. Funcții

- Declarație (`function f() {}` — hoistată, apelabilă înainte de definiție) vs expresie (`let f = function() {}`) vs **arrow** (`(a, b) => a + b`; cu corp: `=> { ...; return x; }`).
- Diferența crucială arrow: NU are `this` propriu — îl ia din contextul definirii. În metodele obiectelor folosește function clasic (`this` = obiectul); în callback-uri INTERIOARE metodelor, arrow e exact ce vrei (păstrează this-ul metodei). setInterval cu arrow în interiorul unei metode = tiparul corect.
- Parametri default: `function f(x = 5)`. Funcțiile sunt valori: se pasează drept callback-uri (tot materialul de evenimente/timere/promisiuni e construit pe asta).

## 22. DOM — selectare și manipulare (sistematizat)

- Selectare: `getElementById` (cel mai rapid, fără #) · `querySelector(sel)` (primul match, orice selector CSS) · `querySelectorAll(sel)` → **NodeList STATIC** (fotografie — nu se schimbă dacă DOM-ul se schimbă; are forEach) · `getElementsByClassName/TagName` → **HTMLCollection LIVE** (se actualizează singură — capcană dacă ștergi elemente în timp ce o parcurgi cu for; convert cu [...]).
- Conținut: `textContent` (tot textul, brut) vs `innerText` (cum se vede — respectă display:none) vs `innerHTML` (parsează HTML — puternic dar suprascrie tot și execută markup; pentru text simplu preferă innerText).
- Atribute: `el.getAttribute/setAttribute/removeAttribute` (ce e în HTML) vs proprietățile directe (`el.src`, `el.value`, `el.checked` — starea VIE; input.value se schimbă la tastare, atributul value nu).
- Creare/mutare: `createElement`, `appendChild` (pe nod existent = MUTARE), `insertBefore(nod, ref)`, `replaceWith`, `remove()`, `cloneNode(true)`.

## 23. Timere și modelul asincron

- `setTimeout(f, ms)` / `setInterval(f, ms)` returnează un ID → `clearTimeout/clearInterval(id)` — de-aia păstrezi id-ul în variabilă (stop la tastă).
- JS e single-threaded: timerul NU întrerupe codul curent — callback-ul rulează abia când stiva e liberă; `setTimeout(f, 0)` = "imediat după ce termini ce faci". ms-urile sunt "cel puțin", nu exact.
- Capcana buclelor: `for (var i...) setTimeout(() => alert(i))` afișează toate aceeași valoare finală; cu `let` fiecare iterație are propriul i — alt motiv pentru let.
- `requestAnimationFrame(f)` — "cheamă-mă la următorul cadru (~60/s)", cu timestamp ca argument; pentru animații canvas fluide (pacman); se re-armează singur doar dacă îl apelezi din nou în f.

## 24. Promisiuni — teoria din spatele lui .then

- O promisiune e o valoare-viitoare cu 3 stări: pending → fulfilled (cu valoare) sau rejected (cu eroare); starea finală e definitivă.
- `.then(f)` primește valoarea când e gata și **returnează o promisiune nouă** cu rezultatul lui f → înlănțuire; dacă f returnează tot o promisiune, lanțul o așteaptă (de-aia `fetch().then(r => r.json()).then(data => ...)` are DOUĂ then-uri: și `.json()` e asincron și dă o promisiune).
- `.catch(f)` prinde orice eșec de oriunde din lanțul de deasupra — un singur catch la final ajunge.
- Obiectul `Response` de la fetch: `r.ok` (status 200–299), `r.status`; fetch NU dă reject la 404 (doar la eroare de rețea) — dacă vrei să tratezi 404, verifici `r.ok`. Extractoare: `.json()`, `.text()` — ambele promisiuni.
- `Promise.all([p1, p2])` — așteaptă toate, dă array-ul rezultatelor (două fetch-uri în paralel).
- `async/await` = zahăr sintactic peste exact același mecanism — dar enunțurile cer "promisiuni", rămâi pe then.

## 25. JSON

- Format TEXT de schimb de date; obiectul JS e structură în memorie, JSON-ul e string-ul lui.
- `JSON.stringify(ob)` → string (pentru storage: obiectele NU intră altfel — storage ține doar stringuri); `JSON.parse(s)` → obiect.
- Reguli mai stricte ca JS: chei OBLIGATORIU cu ghilimele duble, fără virgulă finală (o virgulă în plus omoară parse-ul — jsonlint), fără funcții/undefined/comentarii.

## 26. Storage vs cookies (teoria comparativă din curs)

| | localStorage | sessionStorage | cookies |
|---|---|---|---|
| Durată | permanent (per origine) | până se închide TABUL | până la expirare (`max-age`/`expires`; fără = până se închide browserul) |
| Mărime | ~5MB | ~5MB | ~4KB |
| Merge la server | nu | nu | DA, atașate automat la fiecare request (rostul lor istoric: sesiuni) |
| API | get/setItem, removeItem, clear | idem | `document.cookie` — string unic; scrierea ADAUGĂ/actualizează un cookie, nu suprascrie tot |
Toate țin DOAR stringuri → parseInt / JSON la citire. "Per origine" = alt port sau alt domeniu = alt storage (localhost:5000 ≠ localhost:8000!).

## 27. Grid — completarea sistematică (perechea lui §6)

- Container: `grid-template-columns/rows` cu px / `fr` (fracțiune din spațiul RĂMAS; `1fr 2fr` = o treime/două) / `auto` / `minmax(min, max)` / `repeat(n, ...)`; `gap` (sau `row-gap`/`column-gap` separate).
- Plasare: `grid-column: 1 / 3` (de la linia 1 la 3 = 2 celule; liniile se numără de la 1, există și negative: `-1` = ultima) sau `grid-column: span 2` (întinde-te 2, de unde ai fi fost); idem grid-row.
- Alternativa vizuală: `grid-template-areas: "cap cap" "st dr";` + `grid-area: cap;` pe copil — layoutul desenat ca text.
- Aliniere: `justify-items`/`align-items` = conținutul ÎN celulă; `justify-content`/`align-content` = grila întreagă în container (când e mai mică); `justify-self`/`align-self` per element.
- Rânduri implicite: ce nu încape în template curge în rânduri auto-create (`grid-auto-rows` le dă înălțime).

## 28. Tranziții — sistematic (perechea lui §7)

- Proprietăți: `transition-property` (care proprietate; `all`), `-duration`, `-timing-function` (aceleași ca la animații), `-delay`. Shorthand: `transition: transform 0.3s ease-in 0.1s;` mai multe separate prin virgulă: `transition: transform 0.3s, background 1s;`.
- Se declară pe STAREA DE BAZĂ (nu pe :hover) ca să anime în AMBELE sensuri (intrare și ieșire din hover); pe :hover ar anima doar dusul.
- Tranziționabile: valori numerice/culori (width, height, transform, color, opacity, font-size, border-color); NE-tranziționabile: display, background-image în unele browsere (examenul 2026 a mers pe swap cu transition all — schimbarea e instantă dar restul tranziționează).
- Din JS: schimbi clasa sau style-ul și tranziția existentă animă schimbarea; evenimentul `transitionend` anunță finalul.

## 29. Selectorii CSS — tabelul complet

`*` universal · `div` tip · `.a` clasă · `#x` id · atribut: `[href]` există, `[type="text"]` egal, `[href^="https"]` începe cu, `[href$=".pdf"]` se termină cu, `[href*="exam"]` conține · combinatori: `A B` descendent (oricât de adânc), `A > B` copil DIRECT, `A + B` fratele imediat următor, `A ~ B` toți frații următori · grupare: `A, B` (aceeași regulă la amândoi) · înlănțuire fără spațiu: `div.a.b` (același element cu ambele) · pseudo-clase și pseudo-elemente: vezi §1, §15, README A10.

## 30. Canvas — sistemul, nu doar formele

- Coordonate: originea stânga-SUS, y crește ÎN JOS; unghiurile în RADIANI (`grade * Math.PI / 180`), 0 = ora 3, sensul pozitiv = ORAR (invers ca la matematică — de-aia semicercul "de sus" e π→2π).
- `beginPath()` obligatoriu înaintea fiecărei forme separate — altfel noul arc se leagă de vechiul drum și fill-ul colorează tot; `closePath()` închide conturul (sectorul).
- Starea (`fillStyle`, `strokeStyle`, `lineWidth`, `font`, transformările, clipul) e GLOBALĂ pe context — `save()` o pune pe stivă, `restore()` o readuce; obligatoriu în jurul clip-urilor și rotirilor ca să nu "otrăvești" desenele următoare.
- Ordinea contează: canvas = pictură — ce desenezi peste rămâne peste; nu există "elemente" de modificat, doar re-desenare (`clearRect(0, 0, w, h)` + desenat din nou = cadrele animației).
- Culori: orice CSS string, plus `rgba(r,g,b,a)` pentru transparență per formă sau `ctx.globalAlpha` global; linii: `lineJoin`/`lineCap` = colțuri/capete rotunjite.
- Dimensiunea canvasului se dă din ATRIBUTELE width/height (desenul), nu din CSS (care doar scalează vizual, cu tot cu blur).

## 31. SVG vs canvas — când care (comparația din curs)

- Canvas = **immediate mode**: desenezi pixeli, browserul uită formele; interacțiune = hit-test manual pe coordonate; redimensionare = pixelat; excelent la multe obiecte/animații de cadre.
- SVG = **retained mode**: fiecare formă e nod DOM viu; click/hover/CSS/setAttribute direct pe formă; scalare fără pierdere (vectorial); devine greoi la mii de elemente.
- Practic la examen: desen static cu părți clickabile → SVG e mai puțin cod; desen cu redesenări/animație de cadre/clip complex → canvas. Ambele acceptate de enunțuri (unde nu se impune).

## 32. XML — regulile well-formed (minimul de teorie)

Exact UN element rădăcină · toate tagurile închise (`<an>1990</an>`, self-closing `<br/>`) · case-sensitive (`<An>` ≠ `<an>`) · imbricare corectă (fără încrucișări) · atribute MEREU cu ghilimele · caracterele speciale ca entități: `&lt; &gt; &amp; &quot; &apos;` · prolog: `<?xml version="1.0" encoding="UTF-8"?>`. Diferența de HTML: tagurile ți le definești tu, nu au semantică — doar structură. Parsare: `new DOMParser().parseFromString(text, "application/xml")` → document pe care merg aceleași `querySelectorAll`, `getAttribute`, `textContent` ca pe HTML.

## 33. Formulare — teoria trimiterii

- Submit-ul NATIV: browserul strânge perechile `name=value` din câmpuri (name-ul e cheia — fără name, câmpul nu se trimite!) și le trimite la `action` cu metoda `method`: GET = în URL ca query string (`?nume=x&an=2`), POST = în corpul cererii.
- Evenimentul `submit` se pune pe FORM (nu pe buton!) — se declanșează și la Enter în câmp; `e.preventDefault()` oprește trimiterea nativă (obligatoriu când procesezi în JS fără server).
- Validarea built-in rulează ÎNAINTE de submit: câmpurile invalide blochează trimiterea și afișează mesajele browserului; din JS: `form.checkValidity()` (bool) / `reportValidity()` (bool + afișează mesajele); pseudo-clasele `:valid`/`:invalid` stilizează starea.
- `input` vs `change` (recap §15): input = la fiecare modificare (litera tastată, slider-ul tras); change = la finalizare (blur / selecție încheiată).

## 34. Evenimente — modelul complet (completarea §11)

- Trei faze: **capture** (document → element), **target**, **bubbling** (element → document). `addEventListener(tip, f, true)` ascultă pe capture; defaultul (false) = bubbling — tot ce folosești practic.
- Nu toate bublează: `focus`/`blur` și `mouseenter`/`mouseleave` NU (de-aia delegarea pe hover se face cu `mouseover`/`mouseout`, care DA).
- `removeEventListener(tip, f)` cere ACEEAȘI referință de funcție — funcțiile anonime nu se pot scoate; dacă vei avea de dezabonat, numește funcția.
- Poți atașa mai mulți listeneri pe același element+eveniment (se execută în ordinea adăugării); varianta `el.onclick = f` suportă UNUL singur (al doilea îl suprascrie) — încă un motiv pentru addEventListener.
- `e.preventDefault()` (oprește acțiunea nativă: submit, scroll la săgeți, meniul contextual) ≠ `e.stopPropagation()` (oprește urcarea prin strămoși) — independente, uneori le vrei pe ambele.
