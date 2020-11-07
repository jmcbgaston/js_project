class Character {
    constructor() {
        debugger
        this.directionFaced = "W"
        this.shielded = false
        this.shield = null
        this.positionX = 8
        this.positionY = 7
    }
}

module.exports = Character

// Character object
// - starts game facing west
// - has shielded status
// - .shield will hold Shield object

// let char = new Character
// console.log(char)