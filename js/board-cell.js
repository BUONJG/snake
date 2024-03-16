export class BoardCell extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '';
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