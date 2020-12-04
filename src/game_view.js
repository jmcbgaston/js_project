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

        this.fireballCoordinates = [
            this.fireball1.id, 
            this.fireball2.id, 
            this.fireball3.id, 
            this.fireball4.id
        ]

        this.intervals = ""
        this.clear = ""

        this.setupGame = this.setupGame.bind(this);
        this.setupFireballs = this.setupFireballs.bind(this);

        this.handleScore = this.handleScore.bind(this);
        this.waves = 0

        this.handleMove = this.handleMove.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.isGameOver = this.isGameOver.bind(this);
        this.updateClasses = this.updateClasses.bind(this);
        this.createStarCharacter = this.createStarCharacter.bind(this);

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
                    html += `<li id=${id} class="star"><canvas id='canvas-star'></canvas></li>`
                } else {
                    html += `<li id=${id}><canvas></canvas></li>`
                }
            }
            html += "</ul>";
        }
        this.element.innerHTML = html;
        this.handleScore()
        this.createCanvasStar();
        this.createCanvasCharacter();
    }

    handleScore() {
        let scoreEle = document.getElementById('game-detail-score')
        scoreEle.innerHTML = `Waves Survived: ${this.waves}`
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

    createCanvasStar() {

        const canvasStar = document.getElementById('canvas-star')
        canvasStar.width = 100;
        canvasStar.height = 100;
        
        const ctx = canvasStar.getContext('2d')
        const starSprite = new Image()
        starSprite.onload = (() => {
            ctx.drawImage(starSprite, 20, 20, 60, 60)
        })
        starSprite.src = "./images/star.png"
    }
    
    createStarCharacter() {
        let starCharacterCoordinates = [this.board.character.positionX, this.board.character.positionY];
        let starCharAtTag = document.getElementById(starCharacterCoordinates);
        
        starCharAtTag.classList.add('star-character');
        starCharAtTag.firstElementChild.id = 'canvas-star-character'
        
        this.board.character.star = this.board.star
        this.createCanvasStarCharacter()
        this.generateFireballs()
    }
    
    createCanvasStarCharacter() {
        const canvasStarCharacter = document.getElementById('canvas-star-character')
        canvasStarCharacter.width = 100;
        canvasStarCharacter.height = 100;

        const ctx = canvasStarCharacter.getContext('2d')

        const starCharacterSprite = new Image()
        starCharacterSprite.onload = (() => {
            ctx.drawImage(starCharacterSprite, 8, 8, 90, 90)
        })
        starCharacterSprite.src = "./images/star_character.png"
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
        let starCoordinates = [this.board.star.positionX, this.board.star.positionY];
        
        let charAtTag = document.getElementById(characterCoordinates);
        let starAtTag = document.getElementById(starCoordinates);
        
        if (JSON.stringify(characterCoordinates) === JSON.stringify(starCoordinates)) {
            this.board.character.starred = true;
        }
        
        if (this.board.character.starred === false) {
            this.updateCharAndStar(charAtTag, starAtTag)
        } else {
            this.createStarCharacter()
        }
    }

    updateCharAndStar(charAtTag, starAtTag) {
        charAtTag.classList.add('character');
        starAtTag.classList.add('star');

        charAtTag.firstElementChild.id = 'canvas-character'
        starAtTag.firstElementChild.id = 'canvas-star'

        this.createCanvasCharacter()
        this.createCanvasStar()
    }
    
    reroll(n) {
        let roll = Math.floor(Math.random(0) * 6) + 1;
        return roll === n ? this.reroll(n) : roll
    }

    generateFireballs() {

        document.getElementById('sound-button').value === "muted" ? this.pause() : this.play()

        if (!this.gameStarted) {

            this.gameStarted = true
            this.setupFireballs()

            this.intervals = window.setInterval(() => {
                
                let f1 = this.fireball1.id
                let ff1 = ""
                if (f1 !== undefined) {
                    ff1 = f1.split(',')[0]
                } else {
                    return
                }

                let f2 = this.fireball2.id
                let ff2 = ""
                if (f2 !== undefined) {
                    ff2 = f2.split(',')[1]
                } else {
                    return
                }

                let f3 = this.fireball3.id
                let ff3 = ""
                if (f3 !== undefined) {
                    ff3 = f3.split(',')[0]
                } else {
                    return
                }

                let f4 = this.fireball4.id
                let ff4 = ""
                if (f4 !== undefined) {
                    ff4 = f4.split(',')[1]
                } else {
                    return
                }

                if (ff1 === "7" ||
                    ff2 === "7" || 
                    ff3 === "0" || 
                    ff4 === "0") {

                    document.querySelectorAll('canvas').forEach(caEle => {
                        if (caEle.id === this.fireball1.id || 
                            caEle.id === this.fireball2.id ||
                            caEle.id === this.fireball3.id ||
                            caEle.id === this.fireball4.id) {

                            caEle.id = ""
                            caEle.getContext('2d').clearRect(0, 0, 100, 100)
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
            }, 500)

            this.clear = window.setInterval(() => {
                window.clearInterval(this.intervals)
            }, 4000);
        }
    }

    setupFireballs() {
        
        let roll1 = Math.floor(Math.random() * 6) + 1;
        let roll2 = Math.floor(Math.random() * 6) + 1;
        let roll3 = Math.floor(Math.random() * 6) + 1;
        let roll4 = Math.floor(Math.random() * 6) + 1;
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
        let randomPos3 = [7, (roll3)];
        let ele3 = document.getElementById(randomPos3)
        let fireball3 = ele3.firstElementChild
        fireball3.id = randomPos3

        this.fireball3 = fireball3
        this.createCanvasFireball(fireball3)
        
        // right
        let randomPos4 = [(roll4), 7];
        let ele4 = document.getElementById(randomPos4)
        let fireball4 = ele4.firstElementChild
        fireball4.id = randomPos4

        this.fireball4 = fireball4
        this.createCanvasFireball(fireball4)
    }

    createCanvasFireball(fireball) {

        fireball.width = 100;
        fireball.height = 100;

        const ctx = fireball.getContext('2d')
        const fireballSprite = new Image()
        fireballSprite.onload = (() => {
            ctx.drawImage(fireballSprite, 8, 8, 80, 80)
        })

        if (this.fireball1 === fireball) {
            fireballSprite.src = "./images/top.png"
        } else if (this.fireball2 === fireball) {
            fireballSprite.src = "./images/left.png"
        } else if (this.fireball3 === fireball) {
            fireballSprite.src = "./images/bottom.png"
        } else if (this.fireball4 === fireball) {
            fireballSprite.src = "./images/right.png"
        } else {

        }
    }

    animateFireball1() {
        
        let f1 = this.fireball1.id
        let ff1 = ""
        if (f1 !== undefined) {
            ff1 = f1.split(',')
        } else {
            return
        }

        let formattedPos1 = [parseInt(ff1[0]) + 1, parseInt(ff1[1])]
        let ele1 = document.getElementById(formattedPos1)

        let child1 = ele1.firstElementChild
        child1.id = formattedPos1

        this.fireball1.getContext('2d').clearRect(0, 0, 100, 100)
        this.fireball1 = child1
        
        if (!this.isGameOver()) {
            this.createCanvasFireball(child1)
        }
    }

    animateFireball2() {
        
        let f2 = this.fireball2.id
        let ff2 = ""
        if (f2 !== undefined) {
            ff2 = f2.split(',')
        } else {
            return
        }


        let formattedPos2 = [parseInt(ff2[0]), parseInt(ff2[1]) + 1]
        let ele2 = document.getElementById(formattedPos2)
        let child2 = ele2.firstElementChild
        child2.id = formattedPos2

        this.fireball2.getContext('2d').clearRect(0, 0, 100, 100)
        this.fireball2 = child2

        if (!this.isGameOver()) {
            this.createCanvasFireball(child2)
        }
    }

    animateFireball3() {
        
        let f3 = this.fireball3.id
        let ff3 = ""
        if (f3 !== undefined) {
            ff3 = f3.split(',')
        } else {
            return
        }
        
        let formattedPos3 = [parseInt(ff3[0]) - 1, parseInt(ff3[1])]
        let ele3 = document.getElementById(formattedPos3)
        let child3 = ele3.firstElementChild
        child3.id = formattedPos3        

        this.fireball3.getContext('2d').clearRect(0, 0, 100, 100)
        this.fireball3 = child3

        if (!this.isGameOver()) {
            this.createCanvasFireball(child3)
        }
    }

    animateFireball4() {
        
        let f4 = this.fireball4.id
        let ff4 = ""
        if (f4 !== undefined) {
            ff4 = f4.split(',')
        } else {
            return
        }

        let formattedPos4 = [parseInt(ff4[0]), parseInt(ff4[1]) - 1]
        let ele4 = document.getElementById(formattedPos4)
        let child4 = ele4.firstElementChild
        child4.id = formattedPos4         

        this.fireball4.getContext('2d').clearRect(0, 0, 100, 100)
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
        } else {
            return false
        }
    }

    resetGame() {
        this.waves = 0
        this.gameStarted = false

        // window.clearInterval(this.intervals)
        // window.clearInterval(this.clear)

        this.stop()
        this.handleClear()
        this.removeClasses()
        this.removeFireballs()
        this.setupGame()
    }

    handleClear() {

        window.clearInterval(this.intervals)
        window.clearInterval(this.clear)

        this.intervals = undefined
        this.clear = undefined   
    }

    removeClasses() {

        document.querySelectorAll('li').forEach(liEle => {
            if (liEle.classList.contains('character') || 
                liEle.classList.contains('star') || 
                liEle.classList.contains('star-character')) {

                liEle.classList.remove('character')
                liEle.classList.remove('star')
                liEle.classList.remove('star-character')
            }
        })
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

    removeFireballs() {

        document.querySelectorAll('canvas').forEach(caEle => {
            if (caEle.id === this.fireball1.id || 
                caEle.id === this.fireball2.id || 
                caEle.id === this.fireball3.id || 
                caEle.id === this.fireball4.id) {

                caEle.id = ""
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