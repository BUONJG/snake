import { Board } from './board.js';
import { Header } from './header.js';

class SnackAttack extends HTMLElement {
    connectedCallback() {
        this.#resize();
        window.addEventListener('resize', () => this.#resize());

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(new Header());
        shadow.appendChild(new Board());

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
    }

    #resize() {
        const size = Math.min(this.parentNode.clientHeight, this.parentNode.clientWidth);

        this.style.width = size + 'px';
        this.style.height = size + 'px';
    }
}

customElements.define('snack-attack', SnackAttack);