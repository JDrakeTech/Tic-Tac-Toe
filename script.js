let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];
let currentPlayer = 'circle';
let gameOver = false;

function init() {
    render();
}

function render() {
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = fields[index] === 'circle' ? generateCircleSVG() : fields[index] === 'cross' ? generateCrossSVG() : '';
            tableHTML += `<td onclick="handleClick(${index}, this)">${symbol}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    document.getElementById('content').innerHTML = tableHTML;
}

function handleClick(index, cell) {
    if (!gameOver && fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null; // Entfernt den onclick-Event-Handler

        if (checkWin(currentPlayer)) {
            gameOver = true;
            highlightWinningCells(currentPlayer);
        } else {
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Wechsel des Spielers
        }
    }
}

function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Reihen
        [0, 4, 8], [2, 4, 6]             // Diagonale Reihen
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => fields[index] === player);
    });
}

function highlightWinningCells(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Reihen
        [0, 4, 8], [2, 4, 6]             // Diagonale Reihen
    ];

    winningCombinations.forEach(combination => {
        if (combination.every(index => fields[index] === player)) {
            combination.forEach(index => {
                document.querySelectorAll('td')[index].classList.add('winning-cell');
            });
        }
    });
}

function restartGame(){
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ];
    gameOver = false;
    render();
}

function generateCircleSVG() {
    const svgHTML = `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <style>
                @keyframes fill {
                    from {
                        stroke-dasharray: 0 314;
                    }
                    to {
                        stroke-dasharray: 314 314;
                    }
                }
                .circle {
                    fill: none;
                    stroke: #00B0EF;
                    stroke-width: 8;
                    stroke-dasharray: 0 314;
                    animation: fill 1.5s forwards;
                }
            </style>
            <circle class="circle" cx="35" cy="35" r="30" />
        </svg>
    `;
    return svgHTML;
}

function generateCrossSVG() {
    const svgHTML = `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <style>
                @keyframes draw {
                    from {
                        stroke-dasharray: 0 140;
                    }
                    to {
                        stroke-dasharray: 140 140;
                    }
                }
                .line {
                    fill: none;
                    stroke: #FFC000;
                    stroke-width: 8;
                    stroke-dasharray: 0 140;
                    animation: draw 1.5s forwards;
                }
            </style>
            <line class="line" x1="15" y1="15" x2="55" y2="55" />
            <line class="line" x1="55" y1="15" x2="15" y2="55" />
        </svg>
    `;
    return svgHTML;
}
