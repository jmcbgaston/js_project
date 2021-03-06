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

        this.intervals = ""
        this.clear = ""

        this.setupGame = this.setupGame.bind(this);

        this.handleScore = this.handleScore.bind(this);
        this.waves = 0

        this.handleMove = this.handleMove.bind(this);
        this.playerHit1 = this.playerHit1.bind(this);
        this.playerHit2 = this.playerHit2.bind(this);
        this.playerHit3 = this.playerHit3.bind(this);
        this.playerHit4 = this.playerHit4.bind(this);
        this.isGameOver = this.isGameOver.bind(this);
        this.updateClasses = this.updateClasses.bind(this);
        this.createShieldedCharacter = this.createShieldedCharacter.bind(this);

        this.generateFireballs = this.generateFireballs.bind(this);
        // this.animateFireball = this.animateFireball.bind(this);
        this.animateFireball1 = this.animateFireball1.bind(this);
        this.animateFireball2 = this.animateFireball2.bind(this);
        this.animateFireball3 = this.animateFireball3.bind(this);
        this.animateFireball4 = this.animateFireball4.bind(this);

        this.generateNewCharacter = this.generateNewCharacter.bind(this);
        this.generateNewShield = this.generateNewShield.bind(this);

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
        this.intervals = ""
        this.clear = ""

        let html = "";
        for (let i = 0; i < this.board.grid.length; i++) {
            html += "<ul>";
            for (let j = 0; j < this.board.grid.length; j++) {
                let id = [i, j]
                let idX = i
                let idY = j

                if (idX === 3 && idY === 4) {
                    html += `<li id=${id} class="character"><canvas id='canvas-character'></canvas></li>`
                } else if (idX === 3 && idY === 3) {
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
    
    createCanvasShield() {
        const canvasShield = document.getElementById('canvas-shield')
        canvasShield.width = 100;
        canvasShield.height = 100;
        
        const ctx = canvasShield.getContext('2d')
        const shieldSprite = new Image()
        shieldSprite.onload = (() => {
            ctx.drawImage(shieldSprite, 20, 20, 60, 60)
        })
        shieldSprite.src = "./images/shield.png"
    }
    
    
    createCanvasCharacter() {
        const canvasCharacter = document.getElementById('canvas-character')
        canvasCharacter.width = 100;
        canvasCharacter.height = 100;
        
        const ctx = canvasCharacter.getContext('2d')

        const characterSprite = new Image()
        characterSprite.onload = (() => {
            ctx.drawImage(characterSprite, 16, 16, 70, 70)
        })
        characterSprite.src = "./images/character.png"
    }

    createShieldedCharacter() {
        let shieldedCharacterCoordinates = [this.board.character.positionX, this.board.character.positionY];
        let shieldedCharAtTag = document.getElementById(shieldedCharacterCoordinates);
        
        shieldedCharAtTag.classList.add('shielded-character');
        shieldedCharAtTag.firstElementChild.id = 'canvas-shielded-character'
        
        this.createCanvasShieldedCharacter()
        this.generateFireballs()
    }
    
    createCanvasShieldedCharacter() {
        const canvasShieldedCharacter = document.getElementById('canvas-shielded-character')
        canvasShieldedCharacter.width = 100;
        canvasShieldedCharacter.height = 100;

        const ctx = canvasShieldedCharacter.getContext('2d')

        const shieldedCharacterSprite = new Image()
        shieldedCharacterSprite.onload = (() => {
            ctx.drawImage(shieldedCharacterSprite, 8, 8, 90, 90)
        })
        shieldedCharacterSprite.src = "./images/shielded_character.png"
    }

    handleMove(e) {
        e.preventDefault;

        let newPos

        if (GameView.KEYS[e.keyCode] === "N") {
            newPos = this.board.character.positionX - 1
            if (newPos > 0 && newPos < 7) {
                this.board.character.positionX = newPos
                
                if (!this.isGameOver()) {
                    this.updateClasses()
                }
            }
        }
        
        if (GameView.KEYS[e.keyCode] === "S") {
            newPos = this.board.character.positionX + 1
            if (newPos > 0 && newPos < 7) {
                this.board.character.positionX = newPos
                
                if (!this.isGameOver()) {
                    this.updateClasses()
                }
            }
        }
        
        if (GameView.KEYS[e.keyCode] === "E") {
            newPos = this.board.character.positionY + 1
            if (newPos > 0 && newPos < 7) {
                this.board.character.positionY = newPos

                if (!this.isGameOver()) {
                    this.updateClasses()
                }
            }
        } 
        
        if (GameView.KEYS[e.keyCode] === "W") {
            newPos = this.board.character.positionY - 1
            if (newPos > 0 && newPos < 7) {
                this.board.character.positionY = newPos

                if (!this.isGameOver()) {
                    this.updateClasses()
                }
            }
        }
    }

    updateClasses() {
        this.removeClasses();
        
        let characterCoordinates = [this.board.character.positionX, this.board.character.positionY];
        let shieldCoordinates = [this.board.shield.positionX, this.board.shield.positionY];
        
        let charAtTag = document.getElementById(characterCoordinates);
        let shieldAtTag = document.getElementById(shieldCoordinates);
        
        if (JSON.stringify(characterCoordinates) === JSON.stringify(shieldCoordinates)) {

            // console.log('shielded = true')
            this.board.character.shielded = true;
        }

        if (this.board.character.shielded === false) {

            // console.log('shielded = false')

            this.updateCharacter(charAtTag)
            this.updateShield(shieldAtTag)
        } else {
            this.createShieldedCharacter()
        }
    }
    
    updateCharacter(charAtTag) {

        // console.log("updateChar")
        charAtTag.classList.add('character');
        charAtTag.firstElementChild.id = 'canvas-character'
        this.createCanvasCharacter()
    }
    
    updateShield(shieldAtTag) {

        // console.log("updateShield")
        shieldAtTag.classList.add('shield');
        shieldAtTag.firstElementChild.id = 'canvas-shield'
        this.createCanvasShield()
    }
    
    removeClasses() {

        // removes all li classes
        document.querySelectorAll('li').forEach(liEle => {
            if (liEle.classList.contains('character') || 
                liEle.classList.contains('shield') || 
                liEle.classList.contains('shielded-character')) {

                liEle.classList.remove('character')
                liEle.classList.remove('shield')
                liEle.classList.remove('shielded-character')
            }
        })

        // removes all canvas id's that arent' fireballs
        document.querySelectorAll('canvas').forEach(caEle => {
            if (caEle.id !== this.fireball1.id && 
                caEle.id !== this.fireball2.id &&
                caEle.id !== this.fireball3.id &&
                caEle.id !== this.fireball4.id) {

                caEle.id = ""
                caEle.getContext('2d').clearRect(0, 0, 100, 100)
            }
        })
    }

    generateFireballs() {

        document.getElementById('sound-button').value === "muted" ? this.pause() : this.play()

        if (!this.gameStarted) {

            this.gameStarted = true
            this.setupFireballs()

            this.intervals = window.setInterval(() => {

                if (this.fireball1.id.split(',')[0] === "7" ||
                    this.fireball2.id.split(',')[1] === "7" || 
                    this.fireball3.id.split(',')[0] === "0" || 
                    this.fireball4.id.split(',')[1] === "0") {

                    document.querySelectorAll('canvas').forEach(caEle => {

                        if (caEle.id === this.fireball1.id) {
                            caEle.getContext('2d').clearRect(0, 0, 100, 100)
                        }

                        if (caEle.id === this.fireball2.id) {
                            caEle.getContext('2d').clearRect(0, 0, 100, 100)
                        }

                        if (caEle.id === this.fireball3.id) {
                            caEle.getContext('2d').clearRect(0, 0, 100, 100)
                        }

                        if (caEle.id === this.fireball4.id) {
                            caEle.getContext('2d').clearRect(0, 0, 100, 100)
                        }

                    });

                    this.gameStarted = false
                    this.waves = this.waves + 1
                    this.generateFireballs();
                } else {
                    this.handleScore()

                    // if (this.fireball1 && this.fireball2 && this.fireball3 && this.fireball4) {
                        this.animateFireball1()
                        this.animateFireball2()
                        this.animateFireball3()
                        this.animateFireball4()
                        // console.log(this.fireball1)
                        // console.log(this.fireball2)
                        // console.log(this.fireball3)
                        // console.log(this.fireball4)
                        // until (
                        //     this.animateFireball(this.fireball1)
                        // )
                        // if (this.animateFireball(this.fireball1)) {
                        //     if (this.animateFireball(this.fireball2)) {
                        //         this.animateFireball(this.fireball3)
                        //         if (this.animateFireball(this.fireball3)) {
                        //             this.animateFireball(this.fireball4)
                        //         }
                        //     }
                        // }
                    // }
                }
            }, 1000)

            this.clear = window.setInterval(() => {
                window.clearInterval(this.intervals)
            }, (1000*8));
        }
    }

    reroll(n) {
        let roll = Math.floor(Math.random(0) * 7) + 1;
        return roll === n ? this.reroll(n) : roll
    }

    setupFireballs() {
        let roll1 = Math.floor(Math.random() * 7) + 1;
        let roll2 = Math.floor(Math.random() * 7) + 1;
        let roll3 = Math.floor(Math.random() * 7) + 1;
        let roll4 = Math.floor(Math.random() * 7) + 1;
        let rerollArr = [roll1, roll2, roll3, roll4]
        
        for (let i = 0; i < rerollArr.length; i++) {
            for (let j = 0; j < rerollArr.length; j++) {
                if (i !== j && rerollArr[i] === rerollArr[j]) {
                    rerollArr[i] = this.reroll(rerollArr[i])
                }
            }
        }

        // top
        let randomPos1 = [0, (rerollArr[0])];
        let ele1 = document.getElementById(randomPos1)
        // ele1.id = randomPos1
        // let fireball1 = ele1.firstElementChild
        // fireball1.id = randomPos1

        this.fireball1 = ele1
        this.createCanvasFireball(this.fireball1)
        
        //left
        let randomPos2 = [(rerollArr[1]), 0];
        let ele2 = document.getElementById(randomPos2)
        // ele2.id = randomPos2
        // let fireball2 = ele2.firstElementChild
        // fireball2.id = randomPos2

        this.fireball2 = ele2
        this.createCanvasFireball(this.fireball2)
        
        // bottom
        let randomPos3 = [7, (rerollArr[2])];
        let ele3 = document.getElementById(randomPos3)
        // ele3.id = randomPos3
        // let fireball3 = ele3.firstElementChild
        // fireball3.id = randomPos3

        this.fireball3 = ele3
        this.createCanvasFireball(this.fireball3)
        
        // right
        let randomPos4 = [(rerollArr[3]), 7];
        let ele4 = document.getElementById(randomPos4)
        // let fireball4 = ele4.firstElementChild
        // fireball4.id = randomPos4

        this.fireball4 = ele4
        this.createCanvasFireball(this.fireball4)
    }

    createCanvasFireball(fireballParent) {

        let fireball = fireballParent.firstElementChild

        fireball.width = 100;
        fireball.height = 100;

        const ctx = fireball.getContext('2d')
        const fireballSprite = new Image()
        fireballSprite.onload = (() => {
            ctx.drawImage(fireballSprite, 8, 8, 80, 80)
        })

        if (this.fireball1.firstElementChild === fireball) {
            fireballSprite.src = "./images/top.png"
        } else if (this.fireball2.firstElementChild === fireball) {
            fireballSprite.src = "./images/left.png"
        } else if (this.fireball3.firstElementChild === fireball) {
            fireballSprite.src = "./images/bottom.png"
        } else if (this.fireball4.firstElementChild === fireball) {
            fireballSprite.src = "./images/right.png"
        } else {

        }
    }

    // animateFireball1() {

    //     let cX = this.board.character.positionX
    //     let cY = this.board.character.positionY
        
    //     let oldF1 = this.fireball1.id.split(',')
    //     let formattedPos1 = [parseInt(oldF1[0]) + 1, parseInt(oldF1[1])]
    //     let ele1 = document.getElementById(formattedPos1)

    //     console.log(ele1)

    //     // let child1 = ele1.firstElementChild
    //     // child1.id = formattedPos1

    //     // clear previous location
    //     this.fireball1.firstElementChild.getContext('2d').clearRect(0, 0, 100, 100)

    //     // reassign fireball to new li location
    //     this.fireball1 = ele1

    //         // if (this.playerHit(cX, cY, this.fireball1)) {
    //         //     this.fireball1.firstElementChild.getContext('2d').clearRect(0, 0, 100, 100)
    //         // }
    //     this.playerHit(cX, cY, this.fireball1)

    //     if (!this.isGameOver(cX, cY)) {
    //         this.createCanvasFireball(child1)
    //     }
    // }

    animateFireball1() {
        let cX = this.board.character.positionX
        let cY = this.board.character.positionY
        
        let oldF = this.fireball1.id.split(',')
        let formattedPos = [parseInt(oldF[0]) + 1, parseInt(oldF[1])]
        let ele = document.getElementById(formattedPos)

        this.fireball1.firstElementChild.getContext('2d').clearRect(0, 0, 100, 100)

        this.fireball1 = ele

        this.playerHit1(cX, cY, this.fireball1)

        if (!this.isGameOver(cX, cY)) {
            this.createCanvasFireball(this.fireball1)
        }
    }
    animateFireball2() {
        let cX = this.board.character.positionX
        let cY = this.board.character.positionY
        
        let oldF = this.fireball2.id.split(',')
        let formattedPos = [parseInt(oldF[0]) + 1, parseInt(oldF[1])]
        let ele = document.getElementById(formattedPos)

        this.fireball2.firstElementChild.getContext('2d').clearRect(0, 0, 100, 100)

        this.fireball2 = ele

        this.playerHit2(cX, cY, this.fireball2)

        if (!this.isGameOver(cX, cY)) {
            this.createCanvasFireball(this.fireball2)
        }
    }
    animateFireball3() {
        let cX = this.board.character.positionX
        let cY = this.board.character.positionY
        
        let oldF = this.fireball3.id.split(',')
        let formattedPos = [parseInt(oldF[0]) + 1, parseInt(oldF[1])]
        let ele = document.getElementById(formattedPos)

        this.fireball3.firstElementChild.getContext('2d').clearRect(0, 0, 100, 100)

        this.fireball3 = ele

        this.playerHit3(cX, cY, this.fireball3)

        if (!this.isGameOver(cX, cY)) {
            this.createCanvasFireball(this.fireball3)
        }
    }
    animateFireball4() {
        let cX = this.board.character.positionX
        let cY = this.board.character.positionY
        
        let oldF = this.fireball4.id.split(',')
        let formattedPos = [parseInt(oldF[0]) + 1, parseInt(oldF[1])]
        let ele = document.getElementById(formattedPos)

        this.fireball4.firstElementChild.getContext('2d').clearRect(0, 0, 100, 100)

        this.fireball4 = ele

        this.playerHit4(cX, cY, this.fireball4)

        if (!this.isGameOver(cX, cY)) {
            this.createCanvasFireball(this.fireball4)
        }
    }
    

    // animateFireball2() {

    //     let cX = this.board.character.positionX
    //     let cY = this.board.character.positionY
        
    //     let oldF2 = this.fireball2.id.split(',')
    //     console.log(oldF2)

    //     let formattedPos2 = [parseInt(oldF2[0]), parseInt(oldF2[1]) + 1]
    //     let ele2 = document.getElementById(formattedPos2)
    //     let child2 = ele2.firstElementChild
    //     child2.id = formattedPos2

    //     this.fireball2.getContext('2d').clearRect(0, 0, 100, 100)
    //     this.fireball2 = child2
        
    //     if (this.playerHit(cX, cY, this.fireball2)) {
    //         this.fireball2.getContext('2d').clearRect(0, 0, 100, 100)
    //     }

    //     if (!this.isGameOver(cX, cY)) {
    //         this.createCanvasFireball(child2)
    //     }
    // }

    // animateFireball3() {

    //     let cX = this.board.character.positionX
    //     let cY = this.board.character.positionY
        
    //     let oldF3 = this.fireball3.id.split(',')
    //     let formattedPos3 = [parseInt(oldF3[0]) - 1, parseInt(oldF3[1])]
    //     let ele3 = document.getElementById(formattedPos3)
    //     let child3 = ele3.firstElementChild
    //     child3.id = formattedPos3        

    //     this.fireball3.getContext('2d').clearRect(0, 0, 100, 100)
    //     this.fireball3 = child3
        
    //     if (this.playerHit(cX, cY, this.fireball3)) {
    //         this.fireball3.getContext('2d').clearRect(0, 0, 100, 100)
    //     }

    //     if (!this.isGameOver(cX, cY)) {
    //         this.createCanvasFireball(child3)
    //     }
    // }

    // animateFireball4() {

    //     let cX = this.board.character.positionX
    //     let cY = this.board.character.positionY
        
    //     let oldF4 = this.fireball4.id.split(',')
    //     let formattedPos4 = [parseInt(oldF4[0]), parseInt(oldF4[1]) - 1]
    //     let ele4 = document.getElementById(formattedPos4)
    //     let child4 = ele4.firstElementChild
    //     child4.id = formattedPos4         

    //     this.fireball4.getContext('2d').clearRect(0, 0, 100, 100)
    //     this.fireball4 = child4
        
    //     if (this.playerHit(cX, cY, this.fireball4)) {
    //         this.fireball4.getContext('2d').clearRect(0, 0, 100, 100)
    //     }

    //     if (!this.isGameOver(cX, cY)) {
    //         this.createCanvasFireball(child4)
    //     }
    // }

    playerHit1(cX, cY, fireball) {

        console.log(fireball)

        let id = fireball.id
        let charId = `${cX},${cY}`
        let sHealth = this.board.shield.health
        let shielded = this.board.character.shielded

        if (id === charId && sHealth !== 0 && shielded) {
            this.board.character.shielded = false
            this.board.shield.health = 0
            this.generateNewCharacter()
            this.generateNewShield()
            return true
        } 
    }
    playerHit2(cX, cY, fireball) {

        console.log(fireball)

        let id = fireball.id
        let charId = `${cX},${cY}`
        let sHealth = this.board.shield.health
        let shielded = this.board.character.shielded

        if (id === charId && sHealth !== 0 && shielded) {
            this.board.character.shielded = false
            this.board.shield.health = 0
            this.generateNewCharacter()
            this.generateNewShield()
            return true
        } 
    }
    playerHit3(cX, cY, fireball) {

        console.log(fireball)

        let id = fireball.id
        let charId = `${cX},${cY}`
        let sHealth = this.board.shield.health
        let shielded = this.board.character.shielded

        if (id === charId && sHealth !== 0 && shielded) {
            this.board.character.shielded = false
            this.board.shield.health = 0
            this.generateNewCharacter()
            this.generateNewShield()
            return true
        } 
    }
    playerHit4(cX, cY, fireball) {

        console.log(fireball)

        let id = fireball.id
        let charId = `${cX},${cY}`
        let sHealth = this.board.shield.health
        let shielded = this.board.character.shielded

        if (id === charId && sHealth !== 0 && shielded) {
            this.board.character.shielded = false
            this.board.shield.health = 0
            this.generateNewCharacter()
            this.generateNewShield()
            return true
        } 
    }
    
    generateNewCharacter() {
        let shieldedCharacterCoordinates = [this.board.character.positionX, this.board.character.positionY];
        let shieldedCharAtTag = document.getElementById(shieldedCharacterCoordinates);
        
        shieldedCharAtTag.classList.remove('shielded-character');
        shieldedCharAtTag.classList.add('character');
        shieldedCharAtTag.firstElementChild.id = 'canvas-character'
        shieldedCharAtTag.firstElementChild.getContext('2d').clearRect(0, 0 , 100, 100)
        this.createCanvasCharacter()
    }

    generateNewShield() {
        let newX = Math.floor(Math.random() * 6) + 1
        this.board.shield.positionX = newX
        let newY = Math.floor(Math.random() * 6) + 1
        this.board.shield.positionY = newY
        let newShieldPos = [newX, newY]

        let charPosX = this.board.character.positionX
        let charPosY = this.board.character.positionY
        let charPos = [charPosX, charPosY]

        while (JSON.stringify(newShieldPos) === JSON.stringify(charPos)) {
            newShieldPos[0] = this.reroll(newShieldPos[0])
            newShieldPos[1] = this.reroll(newShieldPos[1])
        }

        let newShieldTag = document.getElementById(newShieldPos)
        newShieldTag.classList.add('shield')
        newShieldTag.firstElementChild.id = ('canvas-shield')
        this.createCanvasShield()
    }
    
    isGameOver(cX, cY) {

        if (this.fireball1.id === `${cX},${cY}` && this.board.shield.health === 0 ||
            this.fireball2.id === `${cX},${cY}` && this.board.shield.health === 0 ||
            this.fireball3.id === `${cX},${cY}` && this.board.shield.health === 0 ||
            this.fireball4.id === `${cX},${cY}` && this.board.shield.health === 0) {

            this.resetGame()
            alert('Game Over!!')

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
        this.removeClasses()
        this.removeFireballs()
        this.setupGame()
    }

    removeFireballs() {
        document.querySelectorAll('canvas').forEach(caEle => {
            if (caEle.id === this.fireball1.id || 
                caEle.id === this.fireball2.id || 
                caEle.id === this.fireball3.id || 
                caEle.id === this.fireball4.id) {

                caEle.id = ""
                // caEle.getContext('2d').clearRect(0, 0, 50, 50)
                caEle.getContext('2d').clearRect(0, 0, 100, 100)
            }
        })

        this.fireball1 = ""
        this.fireball2 = ""
        this.fireball3 = ""
        this.fireball4 = ""
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
}

GameView.KEYS = {
    37: "W", 
    38: "N",
    39: "E",
    40: "S"
}

module.exports = GameView;