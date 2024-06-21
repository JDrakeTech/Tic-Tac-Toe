let fields = [
    null,
    null,
    'circle',
    null,
    null,
    null,
    'cross',
    'cross',
    null
];

function init(){
    render();
}

function render() {
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = fields[index] === 'circle' ? generateCircleSVG() : fields[index] === 'cross' ? generateCrossSVG() : '';
            tableHTML += `<td>${symbol}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    document.getElementById('content').innerHTML = tableHTML;
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
                    stroke-width: 5;
                    stroke-dasharray: 0 314;
                    animation: fill 2s forwards;
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
                    stroke-width: 5;
                    stroke-dasharray: 0 140;
                    animation: draw 2s forwards;
                }
            </style>
            <line class="line" x1="15" y1="15" x2="55" y2="55" />
            <line class="line" x1="55" y1="15" x2="15" y2="55" />
        </svg>
    `;
    return svgHTML;
}
