
export class Header extends HTMLElement {
    #score = 0;
    #level = 1;

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });

        this.scoreImage = document.createElement('img');
        this.scoreImage.classList.add('score-img');
        shadow.appendChild(this.scoreImage);

        this.score = document.createElement('div');
        this.score.classList.add('score');
        this.score.innerHTML = 0;
        shadow.appendChild(this.score);

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

            .score-img {
                padding: 0 15px;
                height:32px;
                width:32px;
                content:url(./assets/pellets/fruits/apple.png);
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
        this.score.innerHTML = this.#score;
    }

    reset() {
        this.#score = 0;
        this.score.innerHTML = this.#score;
    }
}

customElements.define('snack-attack-header', Header);