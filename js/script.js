// Prendo dal DOM gli elementi che mi servono
const buttonPlay = document.getElementById('play');
const grid = document.getElementById('grid');
const selectField = document.getElementById('difficulty');
const scoreField = document.getElementById('score');
const win = document.getElementById('winorlose');

// Preparo una variabile per tenere il punteggio dell'utente
let score = 0;

// Preparo una variabile per tenere il numero totale di celle
let numberCell = 0;

// Preparo la lista delle posizioni delle bombe
let randomNumbersBomb = [];

// Creo un flag per capire se il gioco è finito
let gameOver = false;

// Funzione per generare 16 numeri casuali tutti diversi compresi tra 1 e il totale delle celle
function casualNumberBomb(totalCells) {
    randomNumbersBomb = []; // Resetto l'array
    while (randomNumbersBomb.length < 16) {
        let randomNumber = Math.floor(Math.random() * totalCells) + 1;
        if (!randomNumbersBomb.includes(randomNumber)) {
            randomNumbersBomb.push(randomNumber);
        }
    }
    return randomNumbersBomb;
}

// Funzione per creare una singola cella
function generatedCell(number, classCell) {
    const cell = document.createElement('div');
    cell.classList.add(classCell);
    cell.textContent = number;

    cell.addEventListener('click', function () {
        // Blocco il click se il gioco è finito oppure la cella è gia selezionata
        if (gameOver || this.classList.contains('selected')) return; 

        const cellNumber = parseInt(this.textContent);

        if (randomNumbersBomb.includes(cellNumber)) {
            cell.classList.add('bomb');
            win.innerText = `Hai trovato una bomba! Hai perso! Il tuo punteggio finale è ${score}`;
            // cambio il flag dicendo che il gioco è finito
            gameOver = true;
            // Mostro tutte le bombe 
            revealBombs(); 
        } else {
            score++;
            scoreField.innerHTML = score;
            this.classList.add('selected');

            // Verifico qual ora l utente ha vinto
            if (score === (numberCell - randomNumbersBomb.length)) {
                win.innerText = `HAI VINTO! Il tuo punteggio finale è ${score}`;
                // cambio il flag dicendo che il gioco è finito
                gameOver = true;
                // Mostro tutte le bombe  
                revealBombs(); 
            }
        }
    });

    return cell;
}

// Funzione per mostrare tutte le bombe
function revealBombs() {
    // Seleziono tutte le celle della griglia
    const cells = grid.getElementsByTagName('div'); 

    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const cellNumber = parseInt(cell.textContent);
        if (randomNumbersBomb.includes(cellNumber)) {
            cell.classList.add('bomb');
        }
    }

    // Disabilito tutti i click togliendo l'event listener
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        // Rimuovo l'event listener
        cell.removeEventListener('click', cell.onclick); 
    }
}

// Funzione per generare la griglia
function generatedGrid(totalCells, classCell) {
    // pulisco la griglia
    grid.innerHTML = ''; 
    // resetto il punteggio
    score = 0; 
    scoreField.innerHTML = score;
    // Resetto il messaggio di vittoria o sconfitta
    win.innerText = ''; 
    // Imposto il numero totale delle celle
    numberCell = totalCells; 
    // Genero le posizioni delle bombe
    casualNumberBomb(totalCells); 
    console.log(randomNumbersBomb);

    // Reimposto il flag all originale
    gameOver = false;

    for (let i = 1; i <= totalCells; i++) {
        const cell = generatedCell(i, classCell);
        grid.appendChild(cell);
    }
}

// Quando clicco su play genero la griglia con le celle
buttonPlay.addEventListener('click', function () {
    buttonPlay.innerText = 'Try Again'
    const difficulty = selectField.value;
    let numberCells;
    let classCell;

    if (difficulty === 'easy') {
        numberCells = 100;
        classCell = 'cell-easy';
    } else if (difficulty === 'medium') {
        numberCells = 81;
        classCell = 'cell-medium';
    } else if (difficulty === 'hard') {
        numberCells = 49;
        classCell = 'cell-hard';
    }

    generatedGrid(numberCells, classCell);
});