class Shield {
    constructor() {
        debugger
        this.isPickedUp = false
        this.health = 3
        this.isBroken = false
        this.positionX = 7
        this.positionY = 7
    }
}

module.exports = Shield

// Shield object
// - to be picked up by character
// - can be hit 3 times
// - dissapears from map if .isPickedUp === true

// let sh = new Shield()
// console.log(sh)