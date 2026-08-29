function drawTable(nrows, ncols) {
   let container = document.getElementById("container");
   let table = document.createElement("table");
   for (let lin=0; lin<nrows; lin++) {
      let lin = document.createElement("tr");
      lin.className = "row";
      for (let col=0; col<ncols; col++) {
         let cell = document.createElement("td");
         cell.className = "r" + lin + " c" + col;
         row.appendChild(cell);
      }
      table.appendChild(row);
   }
   container.appendChild(table);
}

function colorCol(column, color) {
   for (let lin=0; lin<document.getElementsByClassName("row").length; lin++) {
      let cell = document.getElementsByClassName("r" + lin + " c" + column)[0];
      cell.style.backgroundColor = color;
   }
}

function colorRow(row, color) {
      for (let col=0; col<document.getElementsByClassName("row").length; col++) {
      let cell = document.getElementsByClassName("r" + row + " c" + col)[0];
      cell.style.backgroundColor = color;
   }
}

function rainbow(target) {
   let colors = ["rgb(255, 0, 0)", "rgb(255, 154, 0)", "rgb(240, 240, 0)", "rgb(79, 220, 74)", "rgb(63, 218, 216)", "rgb(47, 201, 226)", "rgb(28, 127, 238)", "rgb(95, 21, 242)", "rgb(186, 12, 248)", "rgb(251, 7, 217)"];

   table = document.getElementsByTagName("table")[0];
   nrows = table.rows.length;
   ncols = table.rows[0].cells.length;

   if (target == "vertical") {
      const eachcolour = Math.ceil(ncols / colors.length);
      for (let col=0; col<ncols; col++) {
         for (let lin=0; lin<nrows; lin++) {
            let cell = document.getElementsByClassName("r" + lin + " c" + col)[0];
            cell.style.backgroundColor = colors[Math.floor(col / eachcolour)];
         }
      }
   } else if (target == "horizontal") {
      const eachcolour = Math.ceil(nrows / colors.length);
      for (let lin=0; lin<nrows; lin++) {
         for (let col=0; col<ncols; col++) {
            let cell = document.getElementsByClassName("r" + lin + " c" + col)[0];
            cell.style.backgroundColor = colors[Math.floor(lin / eachcolour)];
         }
      }
   }
}

function getNthChild(element, n) {
   return element.children[n];
};

function drawPixel(row, col, color) {	
   let lin = getNthChild(document.getElementsByTagName("table")[0], row);
   let cell = getNthChild(lin, col);
   cell.style.backgroundColor = color;
}

function drawLine(r1, c1, r2, c2, color) {
   if (r1 == r2) {
      for (let col=c1; col<=c2; col++) {
         drawPixel(r1, col, color);
      }
   } else if (c1 == c2) {
      for (let row=r1; row<=r2; row++) {
         drawPixel(row, c1, color);
      }
   }
}

function drawRect(r1, c1, r2, c2, color) {
   for (let col=c1; col<=c2; col++) {
      drawLine(r1, col, r2, col, color);
   }
}

function drawPixelExt(row, col, color) {
   table = document.getElementsByTagName("table")[0];
   nrows = table.rows.length;
   ncols = table.rows[0].cells.length;

   if (row>=nrows) {
      for (let l=nrows; l<=row; l++) {
         let newRow = document.createElement("tr");
         newRow.className = "row";
         for (let c=0; c<ncols; c++) {
            let newCell = document.createElement("td");
            newCell.className = "r" + l + " c" + c;
            newRow.appendChild(newCell);
         }
         table.appendChild(newRow);
      }
      nrows = row+1;
   }
   if (col>=ncols) {
      for (let l=0; l<nrows; l++) {
         let lin = table.rows[l];
         for (let c=ncols; c<=col; c++) {
            let newCell = document.createElement("td");
            newCell.className = "r" + l + " c" + c;
            lin.appendChild(newCell);
         }
      }
   }
   drawPixel(row, col, color);
}

function colorMixer(colorA, colorB, amount){
   let cA = colorA * (1 - amount);
   let cB = colorB * (amount);
   return parseInt(cA + cB);
}

function drawPixelAmount(row, col, color, amount) {
   let rowElem = getNthChild(document.getElementsByTagName("table")[0], row);
   let cell = getNthChild(rowElem, col);
   let oldColor = getComputedStyle(cell).backgroundColor;

   let oldRGB = oldColor.match(/\d+/g); 
   let newRGB = color.match(/\d+/g);

   let mixR = colorMixer(parseInt(oldRGB[0]), parseInt(newRGB[0]), amount);
   let mixG = colorMixer(parseInt(oldRGB[1]), parseInt(newRGB[1]), amount);
   let mixB = colorMixer(parseInt(oldRGB[2]), parseInt(newRGB[2]), amount);

   let blendedColor = "rgb(" + mixR + ", " + mixG + ", " + mixB + ")";
   drawPixelExt(row, col, blendedColor);
}

function delRow(row) {
   let table = document.querySelector("table");
   let lin = getNthChild(table, row);
   table.removeChild(lin);

   for (let l=row; l<table.rows.length; l++) {
      for (let c=0; c<table.rows[l].cells.length; c++) {
         let cell = getNthChild(table.rows[l], c);
         cell.className = "r" + l + " c" + c;
      }
   }
}

function delCol(col) {
   let table = document.querySelector("table");
   
   for (let l=0; l<table.rows.length; l++) {
      let lin = table.rows[l];
      let cell = getNthChild(lin, col);
      lin.removeChild(cell);
      for (let c=col; c<lin.cells.length; c++) {
         let cell = getNthChild(lin, c);
         cell.className = "r" + l + " c" + c;
      }
   }
}

function shiftRow(row, pos) {
   let table = document.querySelector("table");
   let lin = getNthChild(table, row);
   let ncols = lin.cells.length;

   pos = pos % ncols;

   let oldies = [];
   for (let c=0; c<ncols; c++) {
      let cell = getNthChild(lin, c);
      oldies[c] = cell.style.backgroundColor;
   }

   for (let c=0; c<ncols; c++) {
      let oldidx = (c - pos + ncols) % ncols;
      let cell = getNthChild(lin, c);
      cell.style.backgroundColor = oldies[oldidx];
   }
}

function jumble() {
   let table = document.querySelector("table");
   let nrows = table.rows.length;
   let ncols = table.rows[0].cells.length;
   
   for (let l=0; l<nrows; l++) {
      let lin = getNthChild(table, l);
      let nr = Math.floor(Math.random() * ncols);
      shiftRow(l, nr);
   }
}

function transpose() {
/*
   13. Transformați tabla de desenat în transpusa ei.
*/
}

function flip(element) {
/*
   14. Inversați ordinea copiilor obiectului DOM 'element' primit ca argument.
*/
}

function mirror() {
/*
   15. Oglindiți pe orizontală tabla de desenat: luați jumătatea stângă a tablei, 
   aplicați-i o transformare flip și copiați-o în partea dreaptă a tablei.
*/
}

function smear(row, col, amount) {
/*
   16. Întindeți culoarea unei celule de pe linia 'row' și coloana 'col' în celulele
   învecinate la dreapta, conform ponderii date de 'amount' (valoare între 0 și 1).
   Cu colorarea fiecărei celule la dreapta, valoarea ponderii se înjumătățește. 
   Hint: folosiți funcția 'drawPixelAmount'.
*/
}


window.onload = function(){
    const rows = 30;
    const cols = 30;	
    
    drawTable(rows, cols);
    colorRow(2, "rgb(255, 0, 0)");
    colorCol(7, "rgb(0, 255, 0)");
    rainbow("horizontal");
}
