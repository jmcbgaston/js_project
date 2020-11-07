const Board = require('./board.js')

class GameView {
    constructor(element) {
        this.element = element
        this.board = new Board();
        this.handleMove = this.handleMove.bind(this);

        this.setupGame();
        window.addEventListener('keydown', this.handleMove)

        window.character = this.board.character
        window.shield = this.board.shield
        window.board = this.board
    }
    
    setupGame() {
        let html = "";
        for (let i = 0; i < this.board.grid.length; i++) {
            html += "<ul>";
            for (let j = 0; j < this.board.grid.length; j++) {
                html += "<li class='shield'></li>";
            }
            html += "</ul>";
        }

        this.element.innerHTML = html;
        this.placeElements()
    }
    
    placeElements() {
        this.board.grid[8][9] = this.board.character
        this.board.grid[6][9] = this.board.shield
    }
    
    handleMove(e) {
        e.preventDefault;

        if (GameView.KEYS[e.keyCode] === this.board.character.directionFaced) {
            let newPos

            if (GameView.KEYS[e.keyCode] === "W" || GameView.KEYS[e.keyCode] === "E") {
                newPos = this.board.character.positionX - 1
                if (newPos >= 0 && newPos <= 15) {
                    this.board.character.positionX = newPos
                }
            } else {
                newPos = this.board.character.positionY - 1
                if (newPos >= 0 && newPos <= 15) {
                    this.board.character.positionY = newPos
                }
            }

        } else {
            let newDirFaced = GameView.KEYS[e.keyCode]
            this.board.character.directionFaced = newDirFaced
        }

        this.updateClasses()
    }

    updateClasses() {
        debugger;

        this.removeClasses();
    }

    removeClasses() {
        debugger;

        document.querySelectorAll('li').forEach(liEle => {
            liEle.classList.remove('shield')
            liEle.classList.remove('character')
        })
    }

    createNewShield() {

    }
    damageShield() {

    }
    
    shoortProjectiles() {

    }
}

GameView.KEYS = {
    37: "W", 
    38: "N",
    39: "E",
    40: "S"
}

module.exports = GameView;