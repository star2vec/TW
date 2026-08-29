window.onload = function() {
    fetch('cinemateca.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(xmlString, "text/xml");
            afis(doc);
        })
        .catch(error => {
            console.error("Eroare la încărcarea XML-ului:", error);
            document.body.innerHTML += "<p>Eroare la încărcarea fișierului XML. Asigură-te că folosești Live Server.</p>";
        });
}

function afis(doc) {
    const container = document.getElementById("lista-container");
    const filme = doc.getElementsByTagName("film");

    const lista = document.createElement("ul");

    for (let i = 0; i < filme.length; i++) {
        const film = filme[i];
        const li = document.createElement("li");
 
        const titluNode = film.getElementsByTagName("titlu")[0];
        const titlu = titluNode ? titluNode.textContent : "Titlu necunoscut";
        const limba = titluNode && titluNode.hasAttribute("lang") ? ` (limba: ${titluNode.getAttribute("lang")})` : "";
        
        li.innerHTML = `<strong>${titlu}${limba}</strong>`;

        const detalii = document.createElement("ul");

        const adaugaDetaliu = (eticheta, numeTag) => {
            const nod = film.getElementsByTagName(numeTag)[0];
            if (nod) {
                const l = document.createElement("li");
                l.textContent = `${eticheta}: ${nod.textContent}`;
                detalii.appendChild(l);
            }
        };

        adaugaDetaliu("Gen", "gen");
        adaugaDetaliu("Regizor", "regizor");
        adaugaDetaliu("An lansare", "an_lansare"); 
        adaugaDetaliu("Scenarist", "scenarist");
        adaugaDetaliu("Producător", "producator");
        adaugaDetaliu("Scor", "scor");

        const actori = film.getElementsByTagName("actor");
        if (actori.length > 0) {
            const liActori = document.createElement("li");
            liActori.textContent = "Actori:";
            
            const ulActori = document.createElement("ul");
            for (let j = 0; j < actori.length; j++) {
                const numeActor = actori[j].textContent;
                const tipRol = actori[j].getAttribute("rol") || "nespecificat";
                
                const liUnActor = document.createElement("li");
                liUnActor.textContent = `${numeActor} (Rol: ${tipRol})`;
                ulActori.appendChild(liUnActor);
            }
            liActori.appendChild(ulActori);
            detalii.appendChild(liActori);
        }

        li.appendChild(detalii);
        lista.appendChild(li);
    }

    container.appendChild(lista);
}