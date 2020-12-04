const GameView = require('./game_view')

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startGame);
    
    const soundButton = document.getElementById('sound-button');    
    soundButton.addEventListener('click', toggleSound);

    const start = document.getElementById('start-button')
    if (start) {
        window.setInterval(() => {
            start.innerHTML = ""
        }, 500)
        window.setInterval(() => {
            start.innerHTML = "-- Start --"
        }, 1000)
    }
})

function startGame() {
    const rootElement = document.querySelector('.fireball-hero-game');
    new GameView(rootElement)
}

function toggleSound() {
    const gameUl = document.getElementsByTagName('figure')
    console.log(gameUl[0].childNodes.length)

    const soundButton = document.getElementById('sound-button');
    const audio = document.getElementById('audio')

    if (soundButton.value === "playing") {
        soundButton.value = "muted"
        soundButton.innerHTML = "unmute"
        audio.pause()

    } else if (soundButton.value === "muted") {
        soundButton.value = "playing"
        soundButton.innerHTML = "mute"

        if (gameUl[0].childNodes.length > 3) {
            audio.play();
        }
    } else {

    }
}