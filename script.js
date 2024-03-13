function resizeContainer() {
    const size = Math.min(document.body.clientHeight, document.body.clientWidth);

    document.getElementsByClassName('container')[0].style.width = size + 'px';
    document.getElementsByClassName('container')[0].style.height = size + 'px';
}

let snake = [];
let snakeDirection = 'right';
const boardSize = 25;
let gameOver = false;
let snakeGrowCount = 0;

function initGame() {
    document.querySelector(':root').style.setProperty('--board-size', boardSize);

    document.addEventListener("keydown", (event) => {
        if (event.key.startsWith('Arrow')) {
            updateSnakeDirection(event.key.replace('Arrow', '').toLowerCase());
        }
    });

    const container = document.getElementsByClassName('container')[0];

    var mc = new Hammer(container);
    mc.on("swipe", function(event) {
        updateSnakeDirection(event.type.replace('swipe', ''));
    });

    resizeContainer();

    let content = '';
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            content+= `<div id="${getCaseId([x, y])}"></div>`;
        }
    }

    container.innerHTML = content;

    for (let x = 0; x < boardSize; x++) {
        setCellContent([0, x], 'wall');
        setCellContent([x, 0], 'wall');
        setCellContent([boardSize-1, x], 'wall');
        setCellContent([x, boardSize-1], 'wall');
    }

    const startPosition = Math.round(boardSize / 2) - 1;

    snake.push([startPosition, 3]);
    snake.push([startPosition, 4]);
    snake.push([startPosition, 5]);

    for (const coordinates of snake) {
        setCellContent(coordinates, 'snake');
    }

    setInterval(() => moveSnake(), 100);
    addNewApple();
}

function moveSnake() {
    if (gameOver) {
        return;
    }

    const headCoordinates = snake.at(-1);

    const newHeadPosition = [headCoordinates[0] + deltaX(), headCoordinates[1] + deltaY()];

    const cellContent = getCellContent(newHeadPosition);
    if (['wall', 'snake'].includes(cellContent)) {
        gameOver = true;
        alert('Game over!!');
        return;
    }

    snake.push(newHeadPosition);
    setCellContent(newHeadPosition, 'snake');

    if (snakeGrowCount === 0) {
        const queueCoordinates = snake.shift();
        clearCellContent(queueCoordinates);
    } else {
        snakeGrowCount--;
    }

    if (cellContent === 'apple') {
        snakeGrowCount+=3;
        addNewApple();
    }
}

function updateSnakeDirection(direction) {
    if (['right', 'left'].includes(snakeDirection)) {
        if (direction === 'up') {
            snakeDirection = 'up';
        }
        if (direction === 'down') {
            snakeDirection = 'down';
        }
    } else {
        if (direction === 'left') {
            snakeDirection = 'left';
        }
        if (direction === 'right') {
            snakeDirection = 'right';
        }
    }
}

function deltaX() {
    if (snakeDirection === 'up') {
        return -1;
    }
    if (snakeDirection === 'down') {
        return 1;
    }
    return 0;
}

function deltaY() {
    if (snakeDirection === 'left') {
        return -1;
    }
    if (snakeDirection === 'right') {
        return 1;
    }
    return 0;
}

function setCellContent(coordinates, content) {
    getCell(coordinates).setAttribute('content', content);
}

function clearCellContent(coordinates) {
    getCell(coordinates).removeAttribute('content');
}

function getCellContent(coordinates) {
    return getCell(coordinates).getAttribute('content');
}

function getCell(coordinates) {
    const id = getCaseId(coordinates);
    return document.getElementById(id);
}

function getCaseId(coordinates) {
    return Array.isArray(coordinates) ? `${coordinates[0]}_${coordinates[1]}` : coordinates;
}

function addNewApple() {
    let coordinates;
    do {
        coordinates = [Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)];
        console.log(coordinates, getCellContent(coordinates));
    } while (getCellContent(coordinates) !== null);

    setCellContent(coordinates, 'apple');
}