export class Snake extends EventTarget {
    #started = false;
    #length = 3;
    #body = [];
    #direction = 'right';
    constructor(startAt, direction = 'right') {
        super();

        this.#direction = direction;

        this.#body.push(startAt);
    }

    init() {
        this.dispatchEvent(new CustomEvent("grow", { detail: this.#body[0] }));

        while (this.#body.length < this.#length) {
            this.#grow();
        }
    }

    move() {
        this.#grow();

        if (this.#body.length > this.#length) {
            this.#shrink();
        }
    }

    incrementLength(increment) {
        this.#length += increment;
    }

    kill() {
        this.dispatchEvent(new CustomEvent("die"));
    }

    #grow() {
        const headCoordinates = this.#body.at(-1);

        const newHeadPosition = [headCoordinates[0] + this.#deltaX(), headCoordinates[1] + this.#deltaY()];

        this.#body.push(newHeadPosition);

        this.dispatchEvent(new CustomEvent("grow", { detail: newHeadPosition }));
    }

    #shrink() {
        const queueCoordinates = this.#body.shift();

        this.dispatchEvent(new CustomEvent("shrink", { detail: queueCoordinates }));
    }

    #deltaX() {
        if (this.#direction === 'up') {
            return -1;
        }
        if (this.#direction === 'down') {
            return 1;
        }
        return 0;
    }

    #deltaY() {
        if (this.#direction === 'left') {
            return -1;
        }
        if (this.#direction === 'right') {
            return 1;
        }
        return 0;
    }

    changeDirection(direction) {
        if (!this.#started) {
            this.#started = true;
            this.dispatchEvent(new CustomEvent("start"))
        }
        if (['right', 'left'].includes(this.#direction)) {
            if (direction === 'up') {
                this.#direction = 'up';
            }
            if (direction === 'down') {
                this.#direction = 'down';
            }
        } else {
            if (direction === 'left') {
                this.#direction = 'left';
            }
            if (direction === 'right') {
                this.#direction = 'right';
            }
        }
    }

}