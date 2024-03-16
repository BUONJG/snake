import { pellets, pelletNames } from "./pellets.js";

export class BoardCell extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = `
            :host([content='snake']) {
                background-color: #3386FF !important;
            }

            :host([content='wall']) {
                background-color: #855e42 !important;
            }

            ${pelletNames.map(pellet => `:host([content='${pellet}']) {
                background-image: url(./assets/pellets/${pellets.get(pellet).category}/${pellet}.png);
                background-size: 80%;
                background-repeat: no-repeat;
                background-position: center center;
            }`).join('\n')}
        `;
        shadow.appendChild(style);
    }

    setContent(content) {
        this.setAttribute('content', content);
    }

    clearContent() {
        this.removeAttribute('content');
    }

    getContent() {
        return this.getAttribute('content');
    }

    isFree() {
        return this.getContent() === null;
    }

    isPellet() {
        return pellets.has(this.getContent());
    }

    isObstacle() {
        return !this.isFree() && !this.isPellet();
    }
}

customElements.define('board-cell', BoardCell);