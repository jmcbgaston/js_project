const Board = require('./board.js')

class GameView {
    constructor(element) {
        this.element = element
        this.board = new Board(); // board is prebuilt with grid
        
        this.setupGame(); // tbd functionality

        this.handleMove = this.handleMove.bind(this);
        // handles character movement
        window.addEventListener('keydown', this.handleMove)

        window.character = this.board.character
        window.shield = this.board.shield
        window.board = this.board
    }
    
    setupGame() {
        debugger;

        let html = "";
        for (let i = 0; i < this.board.grid.length; i++) {
            html += "<ul>";
            for (let j = 0; j < this.board.grid.length; j++) {
                html += "<li></li>";
            }
            html += "</ul>";
        }

        this.element.innerHTML = html;
        this.placeElements()

        debugger
    }
    
    placeElements() {
        // replaces tile element with character / shield element
        debugger
        this.board.grid[8][9] = this.board.character
        this.board.grid[6][9] = this.board.shield
    }
    
    handleMove(e) {
        e.preventDefault;
        debugger;

        if (GameView.KEYS[e.keyCode] === this.board.character.directionFaced) {
            debugger

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
            debugger

            let newDirFaced = GameView.KEYS[e.keyCode]
            this.board.character.directionFaced = newDirFaced
        }

        debugger

        // at this point, we would call render to re-render the board and updated state
    }

    isValidMove() {

    }

    render() {
        debugger;

        // update classes of <li> elements to show current location of elements

        // update character position in state
        let cX = this.board.character.positionX
        let cY = this.board.character.positionY
        let characterPos = [cX, cY]
        let newCharacterPos = characterPos + this.handleMove()

        // update shield position in state
        let sX = this.board.shield.positionX
        let sY = this.board.shield.positionY
        let sheildPos = [sX, sY]
        let newSheildPos = sheildPos + this.handleMove()

        // update li element classes
        this.updateClasses(newCharacterPos, "character")
        this.updateClasses(newSheildPos, "shield")
    }

    updateClasses(coordinates, className) {
        debugger;

        // this method calls removeClass and updates html element classes

        this.removeClasses();

        // coords.forEach( coord => {
        //     const flatCoord = (coord.i * this.board.dim) + coord.j;
        //     this.$li.eq(flatCoord).addClass(className);
        // });
    }

    removeClasses() {
        debugger;

        // this method removes all class names
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