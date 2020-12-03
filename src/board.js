// const Tile = require('./tile.js')
const Character = require('./character.js')
const Shield = require('./shield.js')

class Board {
    constructor() {
        // this.grid = new Array(16)
        this.grid = new Array(8)
        this.character = new Character();
        this.shield = new Shield
    }
}

module.exports = Board