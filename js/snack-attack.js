import { Snake } from './snake.js';
import { BoardCell } from './board-cell.js';
import { pelletNames } from './pellets.js';

class SnackAttack extends HTMLElement {
    #snake;
    #size = 25;

    connectedCallback() {
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
                content += `<board-cell id="${this.#getCellId([x, y])}"></board-cell>`;
            }
        }
        this.innerHTML = `<style>
            board-cell {
                width: calc(100% / ${this.#size});
                height: calc(100% / ${this.#size});

                background-color: #e0f0e3;
            }

            board-cell:nth-child(odd) {
                background-color: #c8e1cc;
            }
        </style>
        ${content}`;

        this.#init();
    }

    #getCell(coordinates) {
        return document.getElementById(this.#getCellId(coordinates));
    }

    #getCellId(coordinates) {
        return `${coordinates[0]}_${coordinates[1]}`;
    }

    #resize() {
        const size = Math.min(this.parentNode.clientHeight, this.parentNode.clientWidth);

        this.style.width = size + 'px';
        this.style.height = size + 'px';
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
        }

        this.#getCell(coordinates).setContent('snake');
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

customElements.define('snack-attack', SnackAttack);