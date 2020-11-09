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
                let id = [i, j]
                let idX = i
                let idY = j

                if (idX === 7 && idY === 8) {
                    html += `<li id=${id} class="character"><canvas id='canvas-character'></canvas></li>`
                } else if (idX === 7 && idY === 7) {
                    html += `<li id=${id} class="shield"><canvas id='canvas-shield'></canvas></li>`
                } else {
                    html += `<li id=${id}><canvas></canvas></li>`
                }
            }
            html += "</ul>";
        }
        this.element.innerHTML = html;
        this.createCanvasCharacter();
        this.createCanvasShield();
    }

    createCanvasCharacter() {
        const canvasCharacter = document.getElementById('canvas-character')
        canvasCharacter.width = 30;
        canvasCharacter.height = 30;

        const ctx = canvasCharacter.getContext('2d')
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 25, 25);
    }

    createCanvasShield() {
        const canvasShield = document.getElementById('canvas-shield')
        canvasShield.width = 30;
        canvasShield.height = 30;

        const ctx = canvasShield.getContext('2d')
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 25, 25);
    }
    
    handleMove(e) {
        e.preventDefault;

        if (GameView.KEYS[e.keyCode] === this.board.character.directionFaced) {
            let newPos

            if (GameView.KEYS[e.keyCode] === "N") {
                newPos = this.board.character.positionX - 1
                if (newPos >= 0 && newPos <= 15) {
                    this.board.character.positionX = newPos
                    this.updateClasses()
                }
            } else if (GameView.KEYS[e.keyCode] === "S") {
                newPos = this.board.character.positionX + 1
                if (newPos >= 0 && newPos <= 15) {
                    this.board.character.positionX = newPos
                    this.updateClasses()
                }
            } else if (GameView.KEYS[e.keyCode] === "E") {
                newPos = this.board.character.positionY + 1
                if (newPos >= 0 && newPos <= 15) {
                    this.board.character.positionY = newPos
                    this.updateClasses()
                }
            } else if (GameView.KEYS[e.keyCode] === "W") {
                newPos = this.board.character.positionY - 1
                if (newPos >= 0 && newPos <= 15) {
                    this.board.character.positionY = newPos
                    this.updateClasses()
                }
            } else {
            
            }
            
        } else {
            let newDirFaced = GameView.KEYS[e.keyCode]
            this.board.character.directionFaced = newDirFaced
        }
    }

    updateClasses() {
        this.removeClasses();

        let characterCoordinates = [this.board.character.positionX, this.board.character.positionY];
        let charAtTag = document.getElementById(characterCoordinates);
        charAtTag.classList.add('character');

        let shieldCoordinates = [this.board.shield.positionX, this.board.shield.positionY];
        let shieldAtTag = document.getElementById(shieldCoordinates);
        shieldAtTag.classList.add('shield');

        charAtTag.firstElementChild.id = 'canvas-character'
        this.createCanvasCharacter()

        shieldAtTag.firstElementChild.id = 'canvas-shield'
        this.createCanvasShield()
    }

    removeClasses() {
        document.querySelectorAll('li').forEach(liEle => {
            liEle.classList.remove('character')
            liEle.classList.remove('shield')
        })
        document.querySelectorAll('canvas').forEach(caEle => {
            caEle.id = ""
            caEle.getContext('2d').clearRect(0, 0, 30, 30)
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