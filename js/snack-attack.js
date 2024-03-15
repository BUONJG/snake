import { Snake } from './snake.js';

class SnackAttack extends HTMLElement {
    #snake;
    #size = 25;
    #interval;

    connectedCallback() {
        document.querySelector(':root').style.setProperty('--board-size', this.#size);
        this.#resize();
        window.addEventListener('resize', () => this.#resize());

        // detect keydown
        document.addEventListener("keydown", (event) => {
            if (event.key.startsWith('Arrow')) {
                this.#snake?.changeDirection(event.key.replace('Arrow', '').toLowerCase());
            }
        });

        // Detect swipe
        var manager = new Hammer.Manager(this);
        manager.add(new Hammer.Swipe());
        manager.on("swipedown swipeup swipeleft swiperight", event => this.#snake?.changeDirection(event.type.replace('swipe', '')));

        let content = '';
        for (let x = 0; x < this.#size; x++) {
            for (let y = 0; y < this.#size; y++) {
                content += `<div id="${this.#getCellId([x, y])}"></div>`;
            }
        }
        this.innerHTML = content;

        this.#init();
    }

    setCellContent(coordinates, content) {
        this.#getCell(coordinates).setAttribute('content', content);
    }

    clearCellContent(coordinates) {
        this.#getCell(coordinates).removeAttribute('content');
    }

    getCellContent(coordinates) {
        return this.#getCell(coordinates).getAttribute('content');
    }

    #getCell(coordinates) {

        const id = this.#getCellId(coordinates);
        return document.getElementById(id);
    }

    #getCellId(coordinates) {
        return Array.isArray(coordinates) ? `${coordinates[0]}_${coordinates[1]}` : coordinates;
    }

    #resize() {
        const size = Math.min(this.parentNode.clientHeight, this.parentNode.clientWidth);

        this.style.width = size + 'px';
        this.style.height = size + 'px';
    }

    #init() {
        for (let x = 0; x < this.#size; x++) {
            for (let y = 0; y < this.#size; y++) {
                this.clearCellContent([x, y])
            }
        }

        for (let x = 0; x < this.#size; x++) {
            this.setCellContent([0, x], 'wall');
            this.setCellContent([x, 0], 'wall');
            this.setCellContent([this.#size - 1, x], 'wall');
            this.setCellContent([x, this.#size - 1], 'wall');
        }

        this.#snake = new Snake([Math.round(this.#size / 2) - 1, 3]);
        this.#snake.addEventListener('start', () => {
            this.#interval = setInterval(() => this.#snake.move(), 100);
        });
        this.#snake.addEventListener('die', () => clearInterval(this.#interval));
        this.#snake.addEventListener('grow', event => this.#onSnakeGrow(event.detail));
        this.#snake.addEventListener('shrink', event => this.clearCellContent(event.detail));

        this.#snake.init();

        this.#addNewPill();
    }

    #onSnakeGrow(coordinates) {
        const cellContent = this.getCellContent(coordinates);

        if (['wall', 'snake'].includes(cellContent)) {
            this.#snake.kill();
            alert('Game over!!');
            this.#init();
            return;
        }

        if (cellContent === 'apple') {
            this.#snake.incrementLength(3);
            this.#addNewPill();
        }

        this.setCellContent(coordinates, 'snake');
    }

    #addNewPill() {
        let coordinates;
        do {
            coordinates = [Math.floor(Math.random() * this.#size), Math.floor(Math.random() * this.#size)];
        } while (this.getCellContent(coordinates) !== null);

        this.setCellContent(coordinates, 'apple');
    }
}

customElements.define('snack-attack', SnackAttack);