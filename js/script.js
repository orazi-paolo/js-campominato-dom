// Prendo dal DOM gli elementi che mi servono
const buttonPlay = document.getElementById('play');
const grid = document.getElementById('grid');
const selectField = document.getElementById('difficulty');
// /////////////////////////////////////////////////////////////////////////
// Funzioni

// Funzione per creare una singola cella
function generatedCell(number, classCell) {
    const cell = document.createElement('div');
    cell.classList.add(classCell);
    cell.textContent = number;
    cell.addEventListener('click', function() {
        console.log(this.textContent);
        this.classList.toggle('bg-blue');
        this.classList.toggle('color-white');
    });
    return cell;
}

// Funzione per generare la griglia
function generatedGrid(numberCell, classCell) {
    grid.innerHTML = ''; // Pulisci la griglia
    for (let i = 1; i <= numberCell; i++) {
        const cella = generatedCell(i, classCell);
        grid.appendChild(cella);
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