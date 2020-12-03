// const Tile = require('./tile.js')
const Character = require('./character.js')
const Shield = require('./shield.js')

class Board {
    constructor() {
        // let grid = new Array(16)
        // for (let i = 0; i < grid.length; i++) {
        //     grid[i] = []
        //     for (let j = 0; j < grid.length; j++) {
        //         let position = [i, j]
        //         let tile = new Tile(position)
        //         grid[i][j] = tile
        //     }
        // }
        // this.grid = grid
        this.grid = new Array(16)
        this.character = new Character();
        this.shield = new Shield
    }
}

module.exports = Board