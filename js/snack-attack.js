import { Board } from './board.js';
import { Header } from './header.js';

class SnackAttack extends HTMLElement {
    #header;
    #board;

    connectedCallback() {
        this.#header = new Header();
        this.#board = new Board();

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.#header);
        shadow.appendChild(this.#board);

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
            }
        `;
        shadow.appendChild(style);

        this.#resize();
        window.addEventListener('resize', () => this.#resize());

        this.#board.addEventListener('init', () => this.#header.reset());
        this.#board.addEventListener('score-increment', e => this.#header.incrementScore(e.detail.increment));
    }

    #resize() {
        const size = Math.min(this.parentNode.clientHeight - this.#header.clientHeight, this.parentNode.clientWidth);

        this.style.width = size + 'px';
    }
}

customElements.define('snack-attack', SnackAttack);