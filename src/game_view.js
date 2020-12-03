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

        this.handleScore = this.handleScore.bind(this);
        this.waves = 0

        this.handleMove = this.handleMove.bind(this);
        this.isGameOver = this.isGameOver.bind(this);
        this.updateClasses = this.updateClasses.bind(this);
        this.createShieldedCharacter = this.createShieldedCharacter.bind(this);

        this.generateFireballs = this.generateFireballs.bind(this);
        this.animateFireball1 = this.animateFireball1.bind(this);
        this.animateFireball2 = this.animateFireball2.bind(this);
        this.animateFireball3 = this.animateFireball3.bind(this);
        this.animateFireball4 = this.animateFireball4.bind(this);

        this.resetGame = this.resetGame.bind(this);
        this.removeClasses = this.removeClasses.bind(this);
        this.removeFireballs = this.removeFireballs.bind(this);

        
        this.play = this.play.bind(this)
        this.stop = this.stop.bind(this)
        this.pause = this.pause.bind(this)
        this.audio = document.getElementById('audio')
        
        
        this.setupGame()
        window.addEventListener('keydown', this.handleMove)  
    }

    setupGame() {

        this.board = new Board();
        // this.intervals = ""
        // this.clear = ""

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
        this.handleScore()
        this.createCanvasShield();
        this.createCanvasCharacter();
    }

    handleScore() {
        let scoreEle = document.getElementById('game-detail-score')
        scoreEle.innerHTML = `Waves Survived: ${this.waves}`
    }
    
    
    createCanvasCharacter() {
        const canvasCharacter = document.getElementById('canvas-character')
        canvasCharacter.width = 50;
        canvasCharacter.height = 50;
        
        const ctx = canvasCharacter.getContext('2d')
        ctx.fillStyle = "white";
        ctx.fillRect(4, 4, 40, 40);
    }

    createCanvasShield() {
        const canvasShield = document.getElementById('canvas-shield')
        canvasShield.width = 50;
        canvasShield.height = 50;
        
        const ctx = canvasShield.getContext('2d')
        const shieldSprite = new Image()
        shieldSprite.onload = (() => {
            ctx.drawImage(shieldSprite, 4, 4, 40, 40)
        })
        shieldSprite.src = "../images/shield.png"
    }
    
    createShieldedCharacter() {
        let shieldedCharacterCoordinates = [this.board.character.positionX, this.board.character.positionY];
        let shieldedCharAtTag = document.getElementById(shieldedCharacterCoordinates);
        
        shieldedCharAtTag.classList.add('shielded-character');
        shieldedCharAtTag.firstElementChild.id = 'canvas-shielded-character'
        
        this.board.character.shield = this.board.shield
        this.createCanvasShieldedCharacter()
        this.generateFireballs()
    }
    
    createCanvasShieldedCharacter() {
        const canvasShieldedCharacter = document.getElementById('canvas-shielded-character')
        canvasShieldedCharacter.width = 50;
        canvasShieldedCharacter.height = 50;

        const ctx = canvasShieldedCharacter.getContext('2d')
        ctx.fillStyle = "blue";
        ctx.fillRect(4, 4, 40, 40);
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
            this.updateCharAndShield(charAtTag, shieldAtTag)
        } else {
            this.createShieldedCharacter()
        }
    }

    updateCharAndShield(charAtTag, shieldAtTag) {
        charAtTag.classList.add('character');
        shieldAtTag.classList.add('shield');

        charAtTag.firstElementChild.id = 'canvas-character'
        shieldAtTag.firstElementChild.id = 'canvas-shield'

        this.createCanvasCharacter()
        this.createCanvasShield()
    }
    
    reroll(n) {
        let roll = Math.floor(Math.random(0) * 14) + 1;
        return roll === n ? this.reroll(n) : roll
    }

    generateFireballs() {

        this.play()

        const soundButton = document.getElementById('sound-button');
        if (soundButton.value === "muted") {
            this.pause()
        }

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

                console.log("intervals")

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
                    this.waves = this.waves + 1
                    this.generateFireballs();
                } else {
                    this.handleScore()

                    if (this.fireball1 && this.fireball2 && this.fireball3 && this.fireball4) {
                        this.animateFireball1()
                        this.animateFireball2()
                        this.animateFireball3()
                        this.animateFireball4()
                    }
                }
            }, 400)

            this.clear = window.setInterval(() => {

                console.log("clear")

                window.clearInterval(this.intervals)
            }, 6400);
        }

    }

    createCanvasFireball(fireball) {

        // const canvasShield = document.getElementById('canvas-shield')
        fireball.width = 50;
        fireball.height = 50;

        const ctx = fireball.getContext('2d')
        const fireballSprite = new Image()
        fireballSprite.onload = (() => {
            ctx.drawImage(fireballSprite, 4, 4, 40, 40)
        })

        if (this.fireball1 === fireball) {
            fireballSprite.src = "../images/top.png"
        } else if (this.fireball2 === fireball) {
            fireballSprite.src = "../images/left.png"
        } else if (this.fireball3 === fireball) {
            fireballSprite.src = "../images/bottom.png"
        } else if (this.fireball4 === fireball) {
            fireballSprite.src = "../images/right.png"
        } else {

        }
    }

    animateFireball1() {
        
        let oldF1 = this.fireball1.id.split(',')
        let formattedPos1 = [parseInt(oldF1[0]) + 1, parseInt(oldF1[1])]
        let ele1 = document.getElementById(formattedPos1)
        let child1 = ele1.firstElementChild
        child1.id = formattedPos1

        this.fireball1.getContext('2d').clearRect(0, 0, 50, 50)
        this.fireball1 = child1
        
        if (!this.isGameOver()) {
            this.createCanvasFireball(child1)
        }
    }

    animateFireball2() {
        
        let oldF2 = this.fireball2.id.split(',')
        let formattedPos2 = [parseInt(oldF2[0]), parseInt(oldF2[1]) + 1]
        let ele2 = document.getElementById(formattedPos2)
        let child2 = ele2.firstElementChild
        child2.id = formattedPos2

        this.fireball2.getContext('2d').clearRect(0, 0, 50, 50)
        this.fireball2 = child2

        if (!this.isGameOver()) {
            this.createCanvasFireball(child2)
        }
    }

    animateFireball3() {
        
        let oldF3 = this.fireball3.id.split(',')
        let formattedPos3 = [parseInt(oldF3[0]) - 1, parseInt(oldF3[1])]
        let ele3 = document.getElementById(formattedPos3)
        let child3 = ele3.firstElementChild
        child3.id = formattedPos3        

        this.fireball3.getContext('2d').clearRect(0, 0, 50, 50)
        this.fireball3 = child3

        if (!this.isGameOver()) {
            this.createCanvasFireball(child3)
        }
    }

    animateFireball4() {
        
        let oldF4 = this.fireball4.id.split(',')
        let formattedPos4 = [parseInt(oldF4[0]), parseInt(oldF4[1]) - 1]
        let ele4 = document.getElementById(formattedPos4)
        let child4 = ele4.firstElementChild
        child4.id = formattedPos4         

        this.fireball4.getContext('2d').clearRect(0, 0, 50, 50)
        this.fireball4 = child4

        if (!this.isGameOver()) {
            this.createCanvasFireball(child4)
        }
    }
    
    isGameOver() {

        let cX = this.board.character.positionX
        let cY = this.board.character.positionY

        if (this.fireball1.id === `${cX},${cY}` ||
            this.fireball2.id === `${cX},${cY}` ||
            this.fireball3.id === `${cX},${cY}` ||
            this.fireball4.id === `${cX},${cY}`) {

            this.resetGame()
            alert('Game Over!!')
            // window.clearInterval(this.intervals)
            // window.clearInterval(this.clear)

        } else {
            return false
        }
    }

    resetGame() {
        this.waves = 0
        this.gameStarted = false

        window.clearInterval(this.intervals)
        window.clearInterval(this.clear)

        this.stop()
        this.removeFireballs()
        this.setupGame()
    }

    play() {
        this.audio.play();
    }

    stop() {
        this.audio.currentTime = 0
        this.audio.pause()
    }

    pause() {
        this.audio.pause();
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
                caEle.getContext('2d').clearRect(0, 0, 50, 50)
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
                caEle.getContext('2d').clearRect(0, 0, 50, 50)
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
}

GameView.KEYS = {
    37: "W", 
    38: "N",
    39: "E",
    40: "S"
}

module.exports = GameView;