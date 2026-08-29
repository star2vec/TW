window.onload = function() {
   
   let searchalbum = [];

   fetch('albums.json')
      .then(response => response.json()) 
      .then(albume => {
          
         let galerie = document.getElementById("gallery");
          
          
         for (let i=0; i<albume.length; i++) {
            album = albume[i];

            let divalbum = document.createElement("div");
            divalbum.className = "album-item";   
              
            let poza = document.createElement("img");
            poza.src = "images/" + album.image; 
            poza.style.width = "100%"; 
            poza.dataset.id = i;
              
            let titlu = document.createElement("p");
            titlu.textContent = album.name; 
              
              
            divalbum.appendChild(poza);
            divalbum.appendChild(titlu);
              
            galerie.appendChild(divalbum);


            let search = {
               elementHTML: divalbum, 
                    nume: album.name.toLowerCase(),
                    artist: album.artist.toLowerCase(),
                    an: ""
            };

            jsonfile = "albums/" + i + ".json";
            fetch(jsonfile)
               .then(response => response.json())
               .then(detalii => {
                     search.an = detalii.year.toString();
               }); 
            
            searchalbum[i] = search;
         }

         galerie.addEventListener("click", function(event) {
            if (event.target.tagName === "IMG") {
               let idx = event.target.dataset.id;

               let jsonfile = "albums/" + idx + ".json";
              
               fetch(jsonfile)
                  .then(response => response.json())
                  .then(detalii => {
                     let info = document.getElementById("info");
                     info.innerHTML = ""; 

                     let titlu = document.createElement("h2");
                     titlu.textContent = detalii.name;
                     info.appendChild(titlu);

                     let artist = document.createElement("h3");
                     artist.textContent = "Artist: " + detalii.artist;
                     info.appendChild(artist);

                     let imagine = document.createElement("img");
                     imagine.src = "images/" + detalii.image;
                     imagine.style.maxWidth = "300px"; 
                     info.appendChild(imagine);

                     let an = document.createElement("p");
                     an.textContent = "An apariție: " + detalii.year;
                     info.appendChild(an);

                     let detaliiTehnice = document.createElement("p");
                     detaliiTehnice.textContent = "Casă de discuri: " + detalii.label + " | Format: " + detalii.format;
                     info.appendChild(detaliiTehnice);


                     let genuriTitlu = document.createElement("p");
                     genuriTitlu.textContent = "Genuri muzicale:";
                     info.appendChild(genuriTitlu);

                     let listaGenuri = document.createElement("ul");
                     
                  
                     for (let i = 0; i < detalii.genres.length; i++) {
                        let li = document.createElement("li");
                        li.textContent = detalii.genres[i];
                        listaGenuri.appendChild(li);
                     }
                     
                     info.appendChild(listaGenuri);
                     
                  })
                  .catch(error => console.error("Eroare la aducerea detaliilor:", error));
                           }
                        });   


         let field = document.getElementById("cautare");

         field.addEventListener("input", function(event) {
        
            let cecauti = event.target.value.toLowerCase();
        
            for (let i=0; i<searchalbum.length; i++) {
               let search = searchalbum[i];
               if (search.nume.includes(cecauti) || 
                  search.artist.includes(cecauti) || 
                  search.an.includes(cecauti)) {
                
                  search.elementHTML.style.display = "block";
               } else {
                  search.elementHTML.style.display = "none";
               }
            }
         });
          
      })
      .catch(error => console.error("Eroare:", error)); 
}