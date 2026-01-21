const canvas = document.getElementById('glCanvas');
const ctx = canvas.getContext('2d');
if (!ctx) {
    alert('Canvas 2D not supported');
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let grid = new Map();
let nextGrid = new Map();


let running = false;
let updateInterval = 5;
let frameCount = 0;

let scale = 10;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let lastMouseX, lastMouseY;

canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        offsetX += e.clientX - lastMouseX;
        offsetY += e.clientY - lastMouseY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomFactor = 1.1;
    const mouseX = e.clientX - canvas.offsetLeft;
    const mouseY = e.clientY - canvas.offsetTop;
    const worldX = (mouseX - offsetX) / scale;
    const worldY = (mouseY - offsetY) / scale;
    if (e.deltaY < 0) {
        scale *= zoomFactor;
    } else {
        scale /= zoomFactor;
    }
    offsetX = mouseX - worldX * scale;
    offsetY = mouseY - worldY * scale;
});

canvas.addEventListener('click', (e) => {
    if (running) return;
    const mouseX = e.clientX - canvas.offsetLeft;
    const mouseY = e.clientY - canvas.offsetTop;
    const gridX = Math.floor((mouseX - offsetX) / scale);
    const gridY = Math.floor((mouseY - offsetY) / scale);
    const key = `${gridX},${gridY}`;
    //Apenas estão no grid células vivas
    if (grid.has(key)) {
        grid.delete(key);
    } else {
        grid.set(key, 1); // 1 significa célula viva
    }
});

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const gunBtn = document.getElementById('gunBtn');

startBtn.addEventListener('click', () => {
    running = true;
    startBtn.textContent = 'Em Simulação';
});

pauseBtn.addEventListener('click', () => {
    running = false;
    startBtn.textContent = 'Iniciar Simulação';
});

resetBtn.addEventListener('click', () => {
    running = false;
    startBtn.textContent = 'Iniciar Simulação';
    grid = new Map();
});

gunBtn.addEventListener('click', () => {
    running = false;
    startBtn.textContent = 'Iniciar Simulação';
    grid = new Map();

    // Centraliza o desenho na tela
    const cx = Math.floor((-offsetX + canvas.width / 4) / scale);
    const cy = Math.floor((-offsetY + canvas.height / 4) / scale);

    const gunCoords = [
        [1, 5], [1, 6], [2, 5], [2, 6], [11, 5], [11, 6], [11, 7], [12, 4], [12, 8], [13, 3], 
        [13, 9], [14, 3], [14, 9], [15, 6], [16, 4], [16, 8], [17, 5], [17, 6], [17, 7], [18, 6], 
        [21, 3], [21, 4], [21, 5], [22, 3], [22, 4], [22, 5], [23, 2], [23, 6], [25, 1], [25, 2], 
        [25, 6], [25, 7], [35, 3], [35, 4], [36, 3], [36, 4]
    ];

    gunCoords.forEach(([dx, dy]) => {
        grid.set(`${cx + dx},${cy + dy}`, 1);
    });

    render();
});

//Função que conta os vizinhos vivos de uma célula
function countNeighbors(x, y) {
    let count = 0;     //Contador de vizinhos vivos
    //Percorrer matriz 3x3 ao redor da célula (x, y)
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {       
            if (dx === 0 && dy === 0) continue; //Ignorar a célula central
            const key = `${x + dx},${y + dy}`;  //Célula vizinha
            if (grid.has(key)) count++;
        }
    }
    return count;
}


function updateGrid() {
    let candidates = new Set();       //Conjunto de células que podem mudar
    for (let key of grid.keys()) {
        let [x, y] = key.split(',').map(Number);   
        candidates.add(key);   //Adicionar a célula atual viva
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                candidates.add(`${x + dx},${y + dy}`);   //Adicionar vizinhos
            }
        }
    }

    //Criação do próximo estado do grid (vazio)
    nextGrid = new Map();

    //Apenas para as células candidatas 
    for (let key of candidates) {
        let [x, y] = key.split(',').map(Number);
        let neighbors = countNeighbors(x, y);   //Quantidade de vizinhos
        let alive = grid.has(key);  //Se a células está viva atualmente

        //Regras do jogo da vida
        if (alive && (neighbors === 2 || neighbors === 3)) {
            nextGrid.set(key, 1);
        } else if (!alive && neighbors === 3) {
            nextGrid.set(key, 1);
        }

        //Caso contrário total a célula morre ou permanece morta
    }
    grid = nextGrid;
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const startX = Math.floor(-offsetX / scale);
    const endX = Math.ceil((canvas.width - offsetX) / scale);
    const startY = Math.floor(-offsetY / scale);
    const endY = Math.ceil((canvas.height - offsetY) / scale);

    //Desenho da grade infinita visual
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    //Linhas verticais
    for (let x = startX; x <= endX; x++) {
        const screenX = offsetX + x * scale;
        ctx.beginPath();
        ctx.moveTo(screenX, 0);
        ctx.lineTo(screenX, canvas.height);
        ctx.stroke();
    }
    //Linhas horizontais
    for (let y = startY; y <= endY; y++) {
        const screenY = offsetY + y * scale;
        ctx.beginPath();
        ctx.moveTo(0, screenY);
        ctx.lineTo(canvas.width, screenY);
        ctx.stroke();
    }

    //Desenho das células vivas
    ctx.fillStyle = '#000';
    for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
            const key = `${x},${y}`;
            if (grid.has(key)) {
                const screenX = offsetX + x * scale;
                const screenY = offsetY + y * scale;
                ctx.fillRect(screenX, screenY, scale, scale);
            }
        }
    }
}

function loop() {
    frameCount++;
    if (running && frameCount % updateInterval === 0) {
        updateGrid();
    }
    render();
    requestAnimationFrame(loop);
}

loop();