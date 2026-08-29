let nume = prompt("Hai să jucăm X și 0. Cum te cheamă? ");
let token = prompt("Bună, " + nume + ". Cu ce vrei să joci? X sau 0? X începe primul.");

if (token=="X") {
    opp = "0";
} else {
    opp = "X";
}

let tabla = [];
for (let i=0; i<9; i++) {
    tabla[i] = "?";
}   

function printtt(tabla) {
    let output = "";
    for (let lin=0; lin<3; lin++) {
        for (let col=0; col<3; col++) {
            let i = lin*3+col;
            let show;
            if (tabla[i]=="?") {
                show = i+1;
            } else {
                show = tabla[i];
            }
            output += "| " + show + " ";
        }
        output += "|\n";
    }
    return output;
}

function valid(poz) {
    if (poz<1 || poz>9) {
        return false;
    }
    if (tabla[poz-1]!="?") {
        return false;
    }
    return true;
}

function win(token) {
    let lines = [
        [0,1,2], [3,4,5], [6,7,8], 
        [0,3,6], [1,4,7], [2,5,8], 
        [0,4,8], [2,4,6]           
    ];
    for (let i=0; i<8; i++) {
        let line = lines[i];
        if (tabla[line[0]]==token && tabla[line[1]]==token && tabla[line[2]]==token) {
            return true;
        }
    }
    return false;
}

function draw() {
    for (let i=0; i<9; i++) {
        if (tabla[i]=="?") {
            return false;
        }
    }
    return true;
}

function move() {
    let poz = prompt("Unde vrei să pui următorul semn?\n" + printtt(tabla));
    if (valid(poz)) {
        tabla[poz-1] = token;
    } else {
        alert("Poziție invalidă! Încearcă din nou.");
    }
}

function computerMove() {
    let poz = Math.floor(Math.random()*9);
    while (!valid(poz+1)) {
        poz = Math.floor(Math.random()*9);
    }
    tabla[poz] = opp;
}

while(true) {
    if (token=="X") {
        move();
        if (win(token)) {
            alert("Felicitări, " + nume + "! Ai câștigat!");
            break;
        }
        if (draw()) {
            alert("Remiză!");
            break;
        }
        computerMove();
        if (win(opp)) { 
            alert("Computerul a câștigat! Mai încearcă.");
            break;
        }
        if (draw()) {
            alert("Remiză!");
            break;
        }
    } else {
        computerMove();
        if (win(opp)) {
            alert("Computerul a câștigat! Mai încearcă.");
            break;
        }
        if (draw()) {
            alert("Remiză!");
            break;
        }
        move();
        if (win(token)) {
            alert("Felicitări, " + nume + "! Ai câștigat!");
            break;
        }
        if (draw()) {
            alert("Remiză!");
            break;
        }
    }
}
