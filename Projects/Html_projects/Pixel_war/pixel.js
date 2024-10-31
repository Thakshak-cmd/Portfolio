const canvas = document.getElementById("battleCanvas");
const ctx = canvas.getContext("2d");
const speedBtn = document.getElementById("speedBtn");
const restartBtn = document.getElementById("restartBtn");

const width = canvas.width;
const height = canvas.height;
const color1 = "#FF0000"; // Red color
const color2 = "#0000FF"; // Blue color
const pixelSize = 4; // Each "pixel" is now 4x4 in size
let gridWidth = width / pixelSize;
let gridHeight = height / pixelSize;
let grid;
let animationFrameId;
let isRunning = true;

// Speeds: Slow = 500ms, Normal = 100ms, Fast = 30ms
let speed = 100; 
let speedLevels = { slow: 500, normal: 100, fast: 30 };
let currentSpeed = "normal";

function initializeGrid() {
    const grid = Array.from({ length: gridWidth }, () => Array(gridHeight).fill(0));
    for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
            grid[x][y] = x < gridWidth / 2 ? 1 : 2; // Left half is color1, right half is color2
            ctx.fillStyle = grid[x][y] === 1 ? color1 : color2;
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
    }
    return grid;
}

function drawGrid() {
    for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
            ctx.fillStyle = grid[x][y] === 1 ? color1 : color2;
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
    }
}

function expandTerritory() {
    const newGrid = grid.map(arr => [...arr]); 
    let color1Count = 0;
    let color2Count = 0;

    for (let x = 1; x < gridWidth - 1; x++) {
        for (let y = 1; y < gridHeight - 1; y++) {
            if (grid[x][y] === 1 || grid[x][y] === 2) {
                const neighbors = [
                    [x - 1, y],
                    [x + 1, y],
                    [x, y - 1],
                    [x, y + 1]
                ];
                neighbors.forEach(([nx, ny]) => {
                    if (Math.random() < 0.3 && newGrid[nx][ny] !== grid[x][y]) {
                        newGrid[nx][ny] = grid[x][y];
                    }
                });
            }
            if (newGrid[x][y] === 1) color1Count++;
            else if (newGrid[x][y] === 2) color2Count++;
        }
    }
    grid = newGrid;

    if (color1Count === 0 || color2Count === 0) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        alert(color1Count > 0 ? "Red Wins!" : "Blue Wins!");
    }
}

function gameLoop() {
    if (isRunning) {
        expandTerritory();
        drawGrid();
        setTimeout(() => {
            animationFrameId = requestAnimationFrame(gameLoop);
        }, speed);
    }
}

// Restart the game
restartBtn.addEventListener("click", () => {
    isRunning = true;
    grid = initializeGrid();
    gameLoop();
});

// Toggle speed between slow, normal, and fast
speedBtn.addEventListener("click", () => {
    currentSpeed = currentSpeed === "normal" ? "fast" : currentSpeed === "fast" ? "slow" : "normal";
    speed = speedLevels[currentSpeed];
    speedBtn.textContent = `Speed: ${currentSpeed.charAt(0).toUpperCase() + currentSpeed.slice(1)}`;
});

// Initialize and start the game
grid = initializeGrid();
gameLoop();
