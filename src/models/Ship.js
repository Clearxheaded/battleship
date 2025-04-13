export class Ship {

    constructor(length, timesHit = 0, sunk = false) {
        this.length = length;
        this.timesHit = timesHit;
        this.sunk = sunk;
    } 

    hit() {
        this.timesHit++;
    }

    isSunk() {
        if(this.length === this.timesHit) {
            this.sunk = true;
            return true;
        }
        else return false;
    }

}