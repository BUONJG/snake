import { pellets } from "./pellets.js";

export class Snake extends EventTarget {
    #moveInterval;
    #length = 3;
    #body = [];
    #direction = 'right';
    constructor(startAt, direction = 'right') {
        super();

        this.#direction = direction;

        this.#body.push(startAt);
    }

    init() {
        this.#emit('grow', this.#body[0]);

        while (this.#body.length < this.#length) {
            this.#grow();
        }
    }

    eat(pelletName) {
        const pellet = pellets.get(pelletName);

        this.#incrementLength(pellet.lengthIncrement);
    }

    start() {
        this.#moveInterval = setInterval(() => this.#move(), 100);
    }

    kill() {
        clearInterval(this.#moveInterval)
    }

    #move() {
        this.#shrinkIfNeeded();
        this.#grow();
        this.#shrinkIfNeeded();
    }

    #incrementLength(increment) {
        this.#length += increment;
        this.#length = Math.max(3, this.#length);
    }

    #shrinkIfNeeded() {
        if (this.#body.length > this.#length) {
            this.#shrink();
        }
    }

    #grow() {
        const headCoordinates = this.#body.at(-1);

        const newHeadPosition = [headCoordinates[0] + this.#deltaX(), headCoordinates[1] + this.#deltaY()];

        this.#body.push(newHeadPosition);

        this.#emit('grow', newHeadPosition);
    }

    #shrink() {
        const queueCoordinates = this.#body.shift();

        this.#emit('shrink', queueCoordinates);
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

    #emit(type, detail = {}) {
        this.dispatchEvent(new CustomEvent(type, { detail }));
    }

    changeDirection(direction) {
        if (!this.#moveInterval) {
            this.start();
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