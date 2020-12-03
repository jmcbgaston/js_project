class Shield {
    constructor() {
        // this.isPickedUp = false
        this.health = 1
        this.isBroken = false
        // this.positionX = 7
        // this.positionY = 7
        this.positionX = 3
        this.positionY = 3
    }

    damage() {
        this.health - 1

        if (this.health === 0) {
            this.isBroken = true
        }
    }
}

module.exports = Shield