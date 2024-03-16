export class BoardCell extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<style>
            [content='snake'] {
                background-color: #3386FF !important;
            }

            [content='wall'] {
                background-color: #855e42 !important;
            }

            [content='apple'] {
                background-image: url(./assets/pellets/fruits/apple.png);
                background-size: 80%;
                background-repeat: no-repeat;
                background-position: center center;
            }
        </style>`;
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
}

customElements.define('board-cell', BoardCell);