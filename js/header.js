
export class Header extends HTMLElement {
    #score = 0;
    #level = 1;

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <img src="./assets/pellets/fruits/apple.png">
            <div id="score">0</div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: flex;
                flex-direction: row;
                align-items: center;
                color: #000;

                height: 90px;
                margin: 15px 0;
                border-radius: 15px;
                background-color: rgba(100, 100, 100, 0.4);

                font-size: 24px;
            }

            img {
                padding: 0 15px;
                height:32px;
                width:32px;
            }

            .score {
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 5px;
            }
        `;
        shadow.appendChild(style);
    }

    incrementScore(increment) {
        this.#score += increment;
        this.#getScoreElement().innerHTML = this.#score;
    }

    reset() {
        this.#score = 0;
        this.#getScoreElement().innerHTML = this.#score;
    }

    #getScoreElement() {
        return this.shadowRoot.getElementById('score');
    }
}

customElements.define('snack-attack-header', Header);