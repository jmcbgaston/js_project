const Board = require('./board.js')
const FireBall = require('./fireball')

class GameView {
    constructor(element) {
        this.element = element
        this.board = new Board();
        this.handleMove = this.handleMove.bind(this);
        this.gameStarted = false

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

    createCanvasShieldedCharacter() {
        const canvasShieldedCharacter = document.getElementById('canvas-shielded-character')
        canvasShieldedCharacter.width = 30;
        canvasShieldedCharacter.height = 30;

        const ctx = canvasShieldedCharacter.getContext('2d')
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, 25, 25);
    }

    createCanvasFireball(fireball) {
        // const canvasFireball = document.getElementById('canvas-fireball')
        fireball.width = 20;
        fireball.height = 20;

        const ctx = fireball.getContext('2d')

        ctx.beginPath();
        ctx.arc(0, 0, 20, 1, 1*Math.PI);
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fill();
    }
    
    handleMove(e) {
        e.preventDefault;

        if (GameView.KEYS[e.keyCode] === this.board.character.directionFaced) {
            let newPos

            if (GameView.KEYS[e.keyCode] === "N") {
                newPos = this.board.character.positionX - 1
                if (newPos > 0 && newPos < 15) {
                    this.board.character.positionX = newPos
                    this.updateClasses()
                }
            } else if (GameView.KEYS[e.keyCode] === "S") {
                newPos = this.board.character.positionX + 1
                if (newPos > 0 && newPos < 15) {
                    this.board.character.positionX = newPos
                    this.updateClasses()
                }
            } else if (GameView.KEYS[e.keyCode] === "E") {
                newPos = this.board.character.positionY + 1
                if (newPos > 0 && newPos < 15) {
                    this.board.character.positionY = newPos
                    this.updateClasses()
                }
            } else if (GameView.KEYS[e.keyCode] === "W") {
                newPos = this.board.character.positionY - 1
                if (newPos > 0 && newPos < 15) {
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

    generateFireballs() {
        if (this.gameStarted) {
            let randomPos1 = [0, Math.floor(Math.random() * Math.floor(15))];
            let ele1 = document.getElementById(randomPos1)
            let fireball1 = ele1.firstElementChild
            fireball1.id = randomPos1
            // debugger
            this.createCanvasFireball(fireball1)
            
            let randomPos2 = [Math.floor(Math.random() * Math.floor(15)), 0];
            let ele2 = document.getElementById(randomPos2)
            let fireball2 = ele2.firstElementChild
            fireball2.id = randomPos2
            // debugger
            this.createCanvasFireball(fireball2)
            
            let randomPos3 = [15, Math.floor(Math.random() * Math.floor(15))];
            let ele3 = document.getElementById(randomPos3)
            let fireball3 = ele3.firstElementChild
            fireball3.id = randomPos3
            // debugger
            this.createCanvasFireball(fireball3)
            
            let randomPos4 = [Math.floor(Math.random() * Math.floor(15)), 15];
            let ele4 = document.getElementById(randomPos4)
            let fireball4 = ele4.firstElementChild
            fireball4.id = randomPos4
            // debugger
            this.createCanvasFireball(fireball4)
            this.gameStarted = false
        }
    }
        
    updateClasses() {
        this.removeClasses();
        
        let characterCoordinates = [this.board.character.positionX, this.board.character.positionY];
        let shieldCoordinates = [this.board.shield.positionX, this.board.shield.positionY];
        
        let charAtTag = document.getElementById(characterCoordinates);
        let shieldAtTag = document.getElementById(shieldCoordinates);
        
        if (JSON.stringify(characterCoordinates) === JSON.stringify(shieldCoordinates)) {
            this.board.character.shielded = true;
        }

        if (this.board.character.shielded === false) {
            charAtTag.classList.add('character');
            shieldAtTag.classList.add('shield');
    
            charAtTag.firstElementChild.id = 'canvas-character'
            shieldAtTag.firstElementChild.id = 'canvas-shield'
    
            this.createCanvasCharacter()
            this.createCanvasShield()
        } else {
            let shieldedCharacterCoordinates = [this.board.character.positionX, this.board.character.positionY];
            let shieldedCharAtTag = document.getElementById(shieldedCharacterCoordinates);

            shieldedCharAtTag.classList.add('shielded-character');
            shieldedCharAtTag.firstElementChild.id = 'canvas-shielded-character'
            
            this.createCanvasShieldedCharacter()
            this.generateFireballs()
            this.gameStarted = true

            // not definite placement
            // this.play()
            // -------- //
        }

        if (this.gameStarted) {
            // this.animateFireballs()
        }
    }

    play() {
        const audio = document.getElementById('audio')
        audio.play();
    }

    removeClasses() {
        document.querySelectorAll('li').forEach(liEle => {
            liEle.classList.remove('character')
            liEle.classList.remove('shield')
            liEle.classList.remove('shield-character')
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