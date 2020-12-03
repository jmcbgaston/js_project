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
    const rootElement = document.querySelector('.shield-hero-game');
    new GameView(rootElement)
}

function toggleSound() {
    const soundButton = document.getElementById('sound-button');
    const audio = document.getElementById('audio')

    if (soundButton.value === "playing") {
        soundButton.value = "muted"
        audio.pause()
        console.log('pause')

    } else if (soundButton.value === "muted") {
        soundButton.value = "playing"
        audio.play();
        console.log('playing')
        
    } else {

    }
}

// function play() {
//     const audio = document.getElementById('audio')
//     audio.play();
// }

// function pause() {
//     const audio = document.getElementById('audio')
//     audio.pause();
// }


