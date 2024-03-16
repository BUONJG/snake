
import { BoardCell } from './board-cell.js';
import { Snake } from './snake.js';
import { pelletNames } from './pellets.js';

export class Board extends HTMLElement {
    #snake;
    #size = 25;

    connectedCallback() {
        // detect keydown
        document.addEventListener('keydown', (event) => {
            if (event.key.startsWith('Arrow')) {
                this.#snake?.changeDirection(event.key.replace('Arrow', '').toLowerCase());
            }
        });

        // Detect swipe
        var manager = new Hammer.Manager(this);
        manager.add(new Hammer.Swipe());
        manager.on('swipedown swipeup swipeleft swiperight', event => this.#snake?.changeDirection(event.type.replace('swipe', '')));

        const shadow = this.attachShadow({ mode: 'open' });
        for (let x = 0; x < this.#size; x++) {
            for (let y = 0; y < this.#size; y++) {
                const cell = new BoardCell();
                cell.setAttribute('id', this.#getCellId([x, y]));
                shadow.appendChild(cell);
            }
        }

        const style = document.createElement('style');
        style.textContent = `
            :host {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                opacity: 0.9;
                border-radius: 2%;
                overflow: hidden;
            }
            board-cell {
                width: calc(100% / ${this.#size});
                height: calc(100% / ${this.#size});

                background-color: #e0f0e3;
            }

            board-cell:nth-child(odd) {
                background-color: #c8e1cc;
            }
        `;
        shadow.appendChild(style);

        this.#init();
    }

    #init() {
        for (let x = 0; x < this.#size; x++) {
            for (let y = 0; y < this.#size; y++) {
                this.#getCell([x, y]).clearContent();
            }
        }

        for (let x = 0; x < this.#size; x++) {
            this.#getCell([0, x]).setContent('wall');
            this.#getCell([x, 0]).setContent('wall');
            this.#getCell([this.#size - 1, x]).setContent('wall');
            this.#getCell([x, this.#size - 1]).setContent('wall');
        }

        this.#snake = new Snake([Math.round(this.#size / 2) - 1, 3]);
        this.#snake.addEventListener('grow', event => this.#onSnakeGrow(event.detail));
        this.#snake.addEventListener('shrink', event => this.#getCell(event.detail).clearContent());

        this.#snake.init();

        this.#addNewPellet();

        this.parentNode.querySelector('snack-attack-header').reset();
    }

    #onSnakeGrow(coordinates) {
        const cell = this.#getCell(coordinates);

        if (cell.isObstacle()) {
            this.#snake.kill();
            alert('Game over!!');
            this.#init();
            return;
        }

        if (cell.isPellet()) {
            this.#snake.eat(cell.getContent());
            this.#addNewPellet();

            this.parentNode.querySelector('snack-attack-header').incrementScore(1);
        }

        this.#getCell(coordinates).setContent('snake');
    }

    #getCell(coordinates) {
        return this.shadowRoot.getElementById(this.#getCellId(coordinates));
    }

    #getCellId(coordinates) {
        return `${coordinates[0]}_${coordinates[1]}`;
    }

    #addNewPellet() {
        let coordinates;
        do {
            coordinates = [Math.floor(Math.random() * this.#size), Math.floor(Math.random() * this.#size)];
        } while (!this.#getCell(coordinates).isFree());

        const pelletIndex = Math.floor(Math.random() * pelletNames.length);

        this.#getCell(coordinates).setContent(pelletNames[pelletIndex]);
    }
}

customElements.define('snack-attack-board', Board);