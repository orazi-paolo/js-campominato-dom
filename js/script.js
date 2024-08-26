// Prendo dal DOM gli elementi che mi servono
const buttonPlay = document.getElementById('play');
const grid = document.getElementById('grid');
const selectField = document.getElementById('difficulty');
const scoreField = document.getElementById('score');
// /////////////////////////////////////////////////////////////////////////
// Preparo una variabile per tenere il punteggio dell utente
let score = 0;

// Funzioni

// Funzione per generare 16 numeri casuali tutti diversi compresi tra 1 e il totale delle celle
function casualNumberBomb(totalCells){
    // creo un array per inserire la lista dei numeri
    let randomNumbers = [];
    // fino a che la lunghezza dell array è inferiore a 16...
        while (randomNumbers.length < 16) {
            // genero numero casuale
        let randomNumber = Math.floor(Math.random() * totalCells) + 1;
        // se il numero non è presente nella lista lo inserisco
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        }
    }
    return randomNumbers;
}
console.log(casualNumberBomb(100));
// Funzione per creare una singola cella
function generatedCell(number, classCell) {
    const cell = document.createElement('div');
    cell.classList.add(classCell);
    cell.textContent = number;
    // Quando clicco su una cella...
    cell.addEventListener('click', function() {
        console.log(this.textContent);
        // Se la cella non ha la classe selected allora aggiungi il punto su score 
        if(!cell.classList.contains('selected')){
            score++;
            scoreField.innerHTML = score;
        }
        this.classList.add('selected');
    });
    return cell;
}

// Funzione per generare la griglia
function generatedGrid(numberCell, classCell) {
    grid.innerHTML = ''; // Pulisci la griglia
    for (let i = 1; i <= numberCell; i++) {
        const cell = generatedCell(i, classCell);
        grid.appendChild(cell);
    }
}
// /////////////////////////////////////////////////////////////////////////

// Quando clicco su play genero la griglia con le celle
buttonPlay.addEventListener('click', function() {
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