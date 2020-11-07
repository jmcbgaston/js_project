const Tile = require('./tile.js')
const Character = require('./character.js')
const Shield = require('./shield.js')

class Board {
    constructor() {
        debugger

        let grid = new Array(16)

        for (let i = 0; i < grid.length; i++) {
            grid[i] = []
            for (let j = 0; j < grid.length; j++) {
                let position = [i, j]
                let tile = new Tile(position)
                grid[i][j] = tile
            }
        }
        this.grid = grid
        this.character = new Character();
        this.shield = new Shield
    }
}

module.exports = Board

// let board = new Board()
// console.log(board.grid[7][15])