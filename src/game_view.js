const Board = require('./board.js')
// const FireBall = require('./fireball')

// For development, run webpack --watch

class GameView {
    constructor(element) {
        this.element = element
        this.board = new Board();
        this.handleMove = this.handleMove.bind(this);
        this.gameStarted = false
        // const processing = true
        // this.gameInProcess = processing
        this.fireball1 = ""
        this.fireball2 = ""
        this.fireball3 = ""
        this.fireball4 = ""

        this.setupGame();
        window.addEventListener('keydown', this.handleMove)
        
        window.character = this.board.character
        window.shield = this.board.shield
        window.board = this.board
        window.st = this.gameStarted
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
        }
    }
    
    // create coordinates = [random x, random y]
    // get li element at coordinates
    // assign fireball(x) to canvas element of found li
    // then call createCanvasFireball for drawing
    // all fireballs from hereon after have a starting position
    generateFireballs() {
        
        if (!this.gameStarted) {
            this.gameStarted = true

            // top
            let randomPos1 = [0, Math.floor(Math.random(0) * Math.floor(14))];
            let ele1 = document.getElementById(randomPos1)
            let fireball1 = ele1.firstElementChild
            fireball1.id = randomPos1
            this.fireball1 = fireball1
            this.createCanvasFireball1(fireball1)

            //left
            let randomPos2 = [Math.floor(Math.random(0) * Math.floor(14)), 0];
            let ele2 = document.getElementById(randomPos2)
            let fireball2 = ele2.firstElementChild
            fireball2.id = randomPos2
            this.fireball2 = fireball2
            this.createCanvasFireball2(fireball2)
            
            // bottom
            let randomPos3 = [15, Math.floor(Math.random(0) * Math.floor(14))];
            let ele3 = document.getElementById(randomPos3)
            let fireball3 = ele3.firstElementChild
            fireball3.id = randomPos3
            this.fireball3 = fireball3
            this.createCanvasFireball3(fireball3)
            
            // right
            let randomPos4 = [Math.floor(Math.random(0) * Math.floor(14)), 15];
            let ele4 = document.getElementById(randomPos4)
            let fireball4 = ele4.firstElementChild
            fireball4.id = randomPos4
            this.fireball4 = fireball4
            this.createCanvasFireball4(fireball4)
        }
    }
    
    // take canvas element at coordinates and draw fireball
    // creates a single fireball
    createCanvasFireball1(fireball) {

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

        window.setInterval(() => {
            this.animateFireball1(fireball)
        }, 1000)
    }
    createCanvasFireball2(fireball) {

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

        window.setInterval(() => {
            this.animateFireball2(fireball)
        }, 1000)
    }
    createCanvasFireball3(fireball) {

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

        window.setInterval(() => {
            this.animateFireball3(fireball)
        }, 1000)
    }
    createCanvasFireball4(fireball) {

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

        window.setInterval(() => {
            this.animateFireball4(fireball)
        }, 1000)
    }

    animateFireball1(fireball) {


        let nf1 = fireball.id.split(',')

        console.log(nf1)

        let nnf1 = [parseInt(nf1[0]) + 1, parseInt(nf1[1])]
        let ele1 = document.getElementById(nnf1)
        let fireball1 = ele1.firstElementChild
        fireball1.id = nnf1
        this.fireball1 = fireball1
        this.createCanvasFireball1(fireball1)
    }
    animateFireball2(fireball) {
        let nf2 = fireball.id.split(',')
        let nnf2 = [parseInt(nf2[0]), parseInt(nf2[1]) + 1]
        let ele2 = document.getElementById(nnf2)
        let fireball2 = ele2.firstElementChild
        fireball2.id = nnf2
        this.fireball2 = fireball2
        this.createCanvasFireball2(fireball2)
    }
    animateFireball3(fireball) {
        let nf3 = fireball.id.split(',')
        let nnf3 = [parseInt(nf3[0]) - 1, parseInt(nf3[1])]
        let ele3 = document.getElementById(nnf3)
        let fireball3 = ele3.firstElementChild
        fireball3.id = nnf3
        this.fireball3 = fireball3
        this.createCanvasFireball3(fireball3)
    }
    animateFireball4(fireball) {
        let nf4 = fireball.id.split(',')
        let nnf4 = [parseInt(nf4[0]), parseInt(nf4[1]) - 1]
        let ele4 = document.getElementById(nnf4)
        let fireball4 = ele4.firstElementChild
        fireball4.id = nnf4
        this.fireball4 = fireball4
        this.createCanvasFireball4(fireball4)
    }

    // animateFireball(fireball) {
    //     // console.log(this.fireball1)
    //     if (this.gameStarted) {
            
    //         // let nf1 = this.fireball1.id.split(',')
    //         // let nnf1 = [parseInt(nf1[0]) + 1, parseInt(nf1[1])]
    //         // let ele1 = document.getElementById(nnf1)
    //         // let fireball1 = ele1.firstElementChild
    //         // fireball1.id = nnf1
    //         // this.fireball1 = fireball1
    //         // this.createCanvasFireball(fireball1)

    //         // let nf2 = this.fireball2.id.split(',')
    //         // let nnf2 = [parseInt(nf2[0]), parseInt(nf2[1]) + 1]
    //         // let ele2 = document.getElementById(nnf2)
    //         // let fireball2 = ele2.firstElementChild
    //         // fireball2.id = nnf2
    //         // this.fireball2 = fireball2
    //         // this.createCanvasFireball(fireball2)

    //         // let nf3 = this.fireball3.id.split(',')
    //         // let nnf3 = [parseInt(nf3[0]) - 1, parseInt(nf3[1])]
    //         // let ele3 = document.getElementById(nnf3)
    //         // let fireball3 = ele3.firstElementChild
    //         // fireball3.id = nnf3
    //         // this.fireball3 = fireball3
    //         // this.createCanvasFireball(fireball3)

    //         // let nf4 = this.fireball4.id.split(',')
    //         // let nnf4 = [parseInt(nf4[0]), parseInt(nf4[1]) - 1]
    //         // let ele4 = document.getElementById(nnf4)
    //         // let fireball4 = ele4.firstElementChild
    //         // fireball4.id = nnf4
    //         // this.fireball4 = fireball4
    //         // this.createCanvasFireball(fireball4)
    //     }
    // }

    play() {
        const audio = document.getElementById('audio')
        audio.play();
    }

    removeClasses() {
        document.querySelectorAll('li').forEach(liEle => {
            if (liEle.classList.contains('character') || liEle.classList.contains('shield') || liEle.classList.contains('shielded-character')) {
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