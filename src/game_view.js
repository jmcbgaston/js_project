// For development, run webpack --watch
const Board = require('./board.js')

class GameView {
    constructor(element) {
        this.element = element
        this.board = ""

        this.gameStarted = false
        this.fireball1 = ""
        this.fireball2 = ""
        this.fireball3 = ""
        this.fireball4 = ""

        this.fireballCoordinates = [this.fireball1.id, this.fireball2.id, this.fireball3.id, this.fireball4.id]

        this.intervals = ""
        this.clear = ""

        this.setupGame = this.setupGame.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.updateClasses = this.updateClasses.bind(this);
        this.createShieldedCharacter = this.createShieldedCharacter.bind(this);
        this.animateFireball1 = this.animateFireball1.bind(this);
        this.animateFireball2 = this.animateFireball2.bind(this);
        this.animateFireball3 = this.animateFireball3.bind(this);
        this.animateFireball4 = this.animateFireball4.bind(this);

        this.setupGame();

        window.addEventListener('keydown', this.handleMove)   
    }

    setupGame() {

        this.board = new Board();
        this.intervals = ""
        this.clear = ""

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
                if (newPos > 0 && newPos < 15) {
                    this.board.character.positionX = newPos
                    
                    if (!this.isGameOver()) {
                        this.updateClasses()
                    }
                }
            }
            
            if (GameView.KEYS[e.keyCode] === "S") {
                newPos = this.board.character.positionX + 1
                if (newPos > 0 && newPos < 15) {
                    this.board.character.positionX = newPos
                    
                    if (!this.isGameOver()) {
                        this.updateClasses()
                    }
                }
            }
            
            if (GameView.KEYS[e.keyCode] === "E") {
                newPos = this.board.character.positionY + 1
                if (newPos > 0 && newPos < 15) {
                    this.board.character.positionY = newPos

                    if (!this.isGameOver()) {
                        this.updateClasses()
                    }
                }
            } 
            
            if (GameView.KEYS[e.keyCode] === "W") {
                newPos = this.board.character.positionY - 1
                if (newPos > 0 && newPos < 15) {
                    this.board.character.positionY = newPos

                    if (!this.isGameOver()) {
                        this.updateClasses()
                    }
                }
            }
            
        } else {
            let newDirFaced = GameView.KEYS[e.keyCode]
            this.board.character.directionFaced = newDirFaced
        }
    }

    isGameOver() {
        let cX = this.board.character.positionX
        let cY = this.board.character.positionY

        if (this.fireball1.id === `${cX},${cY}` ||
            this.fireball2.id === `${cX},${cY}` ||
            this.fireball3.id === `${cX},${cY}` ||
            this.fireball4.id === `${cX},${cY}`) {
            alert('Game Over!!')
            this.resetGame()
        } else {
            return false
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
            this.startingPositions(charAtTag, shieldAtTag)
        } else {
            this.createShieldedCharacter()
        }
    }

    createCanvasShieldedCharacter() {
        const canvasShieldedCharacter = document.getElementById('canvas-shielded-character')
        canvasShieldedCharacter.width = 30;
        canvasShieldedCharacter.height = 30;

        const ctx = canvasShieldedCharacter.getContext('2d')
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, 25, 25);
    }

    startingPositions(charAtTag, shieldAtTag) {
        charAtTag.classList.add('character');
        shieldAtTag.classList.add('shield');

        charAtTag.firstElementChild.id = 'canvas-character'
        shieldAtTag.firstElementChild.id = 'canvas-shield'

        this.createCanvasCharacter()
        this.createCanvasShield()
    }

    createShieldedCharacter() {
        let shieldedCharacterCoordinates = [this.board.character.positionX, this.board.character.positionY];
        let shieldedCharAtTag = document.getElementById(shieldedCharacterCoordinates);

        shieldedCharAtTag.classList.add('shielded-character');
        shieldedCharAtTag.firstElementChild.id = 'canvas-shielded-character'
        
        this.createCanvasShieldedCharacter()
        this.generateFireballs()
    }
    
    reroll(n) {
        let roll = Math.floor(Math.random(0) * 14) + 1;
        return roll === n ? this.reroll(n) : roll
    }

    generateFireballs() {
        
        if (!this.gameStarted) {
            this.gameStarted = true

            let roll1 = Math.floor(Math.random() * 14) + 1;
            let roll2 = Math.floor(Math.random() * 14) + 1;
            let roll3 = Math.floor(Math.random() * 14) + 1;
            let roll4 = Math.floor(Math.random() * 14) + 1;
            let rerollArr = [roll1, roll2, roll3, roll4]
            
            for (let i = 0; i < rerollArr.length; i++) {
                for (let j = 0; j < rerollArr.length; j++) {
                    if (i !== j && rerollArr[i] === rerollArr[j]) {
                        rerollArr[i] = this.reroll(rerollArr[i])
                    }
                }
            }

            roll1 = rerollArr[0]
            roll2 = rerollArr[1]
            roll3 = rerollArr[2]
            roll4 = rerollArr[3]

            // top
            let randomPos1 = [0, (roll1)];
            let ele1 = document.getElementById(randomPos1)
            let fireball1 = ele1.firstElementChild
            fireball1.id = randomPos1

            this.fireball1 = fireball1
            this.createCanvasFireball(fireball1)
            
            //left
            let randomPos2 = [(roll2), 0];
            let ele2 = document.getElementById(randomPos2)
            let fireball2 = ele2.firstElementChild
            fireball2.id = randomPos2

            this.fireball2 = fireball2
            this.createCanvasFireball(fireball2)
            
            // bottom
            let randomPos3 = [15, (roll3)];
            let ele3 = document.getElementById(randomPos3)
            let fireball3 = ele3.firstElementChild
            fireball3.id = randomPos3

            this.fireball3 = fireball3
            this.createCanvasFireball(fireball3)
            
            // right
            let randomPos4 = [(roll4), 15];
            let ele4 = document.getElementById(randomPos4)
            let fireball4 = ele4.firstElementChild
            fireball4.id = randomPos4

            this.fireball4 = fireball4
            this.createCanvasFireball(fireball4)
            
            this.intervals = window.setInterval(() => {

                if (this.fireball1.id.split(',')[0] === "15" ||
                    this.fireball2.id.split(',')[1] === "15" || 
                    this.fireball3.id.split(',')[0] === "0" || 
                    this.fireball4.id.split(',')[1] === "0") {

                    document.querySelectorAll('canvas').forEach(caEle => {
                        if (caEle.id === this.fireball1.id || 
                            caEle.id === this.fireball2.id ||
                            caEle.id === this.fireball3.id ||
                            caEle.id === this.fireball4.id) {
                            caEle.id = ""
                            caEle.getContext('2d').clearRect(0, 0, 50, 50)
                        }
                    });

                    this.gameStarted = false
                    this.generateFireballs();
                } else {

                    this.animateFireball1()
                    this.animateFireball2()
                    this.animateFireball3()
                    this.animateFireball4()

                }
            }, 400)

            this.clear = window.setInterval(() => {
                window.clearInterval(this.intervals)
                // console.log("clear")
            }, 6400);
        }

    }

    createCanvasFireball(fireball) {

        fireball.width = 50;
        fireball.height = 50;

        const ctx = fireball.getContext('2d')

        ctx.beginPath();
        ctx.arc(25, 25, 16, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#E5610C";
        ctx.fill();
            ctx.beginPath();
            ctx.arc(25, 25, 13, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = "#E9A305";
            ctx.fill();
                ctx.beginPath();
                ctx.arc(25, 25, 9, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = "#F3E201";
                ctx.fill();
    }

    animateFireball1() {

        let oldF1 = this.fireball1
        // console.log(oldF1.id.split(','))

        let splitPos1 = oldF1.id.split(',')
        this.fireball1.getContext('2d').clearRect(0, 0, 50, 50)
        let formattedPos1 = [parseInt(splitPos1[0]) + 1, parseInt(splitPos1[1])]

        let ele1 = document.getElementById(formattedPos1)
        let child1 = ele1.firstElementChild
        child1.id = formattedPos1
        this.fireball1 = child1
        
        if (!this.isGameOver()) {
            this.createCanvasFireball(child1)
        }
    }

    animateFireball2() {

        let oldF2 = this.fireball2
        // console.log(oldF2.id.split(','))

        let splitPos2 = oldF2.id.split(',')
        this.fireball2.getContext('2d').clearRect(0, 0, 50, 50)
        let formattedPos2 = [parseInt(splitPos2[0]), parseInt(splitPos2[1]) + 1]

        let ele2 = document.getElementById(formattedPos2)
        let child2 = ele2.firstElementChild
        child2.id = formattedPos2
        this.fireball2 = child2

        
        if (!this.isGameOver()) {
            this.createCanvasFireball(child2)
        }
    }

    animateFireball3() {

        let oldF3 = this.fireball3
        // console.log(oldF3.id.split(','))

        let splitPos3 = oldF3.id.split(',')
        this.fireball3.getContext('2d').clearRect(0, 0, 50, 50)
        let formattedPos3 = [parseInt(splitPos3[0]) - 1, parseInt(splitPos3[1])]

        let ele3 = document.getElementById(formattedPos3)
        let child3 = ele3.firstElementChild
        child3.id = formattedPos3            
        this.fireball3 = child3

        let cX = this.board.character.positionX
        let cY = this.board.character.positionY

        if (!this.isGameOver()) {
            this.createCanvasFireball(child3)
        }
    }

    animateFireball4() {

        let oldF4 = this.fireball4
        // console.log(oldF4.id.split(','))

        let splitPos4 = oldF4.id.split(',')
        this.fireball4.getContext('2d').clearRect(0, 0, 50, 50)
        let formattedPos4 = [parseInt(splitPos4[0]), parseInt(splitPos4[1]) - 1]

        let ele4 = document.getElementById(formattedPos4)
        let child4 = ele4.firstElementChild
        child4.id = formattedPos4            
        this.fireball4 = child4

        if (!this.isGameOver()) {
            this.createCanvasFireball(child4)
        }
    }

    resetGame() {
        // console.log(this.intervals)

        window.clearInterval(this.intervals)
        window.clearInterval(this.clear)
        this.gameStarted = false
        this.removeFireballs()
        this.setupGame()
    }

    play() {
        const audio = document.getElementById('audio')
        audio.play();
    }

    removeClasses() {
        document.querySelectorAll('li').forEach(liEle => {
            if (liEle.classList.contains('character') || 
                liEle.classList.contains('shield') || 
                liEle.classList.contains('shielded-character')) {

                liEle.classList.remove('character')
                liEle.classList.remove('shield')
                liEle.classList.remove('shield-character')
            }
        })
        document.querySelectorAll('canvas').forEach(caEle => {
            if (caEle.id !== this.fireball1.id && 
                caEle.id !== this.fireball2.id &&
                caEle.id !== this.fireball3.id &&
                caEle.id !== this.fireball4.id) {

                caEle.id = ""
                caEle.getContext('2d').clearRect(0, 0, 30, 30)
            }
        })
    }

    removeFireballs() {
        document.querySelectorAll('canvas').forEach(caEle => {
            if (caEle.id === this.fireball1.id || 
                caEle.id === this.fireball2.id || 
                caEle.id === this.fireball3.id || 
                caEle.id === this.fireball4.id) {

                caEle.id = ""
                caEle.getContext('2d').clearRect(0, 0, 30, 30)
            }
        })

        this.fireball1 = ""
        this.fireball2 = ""
        this.fireball3 = ""
        this.fireball4 = ""
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