const GameView = require('./game_view')

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startGame);
    const playButton = document.getElementById('play-button');
    playButton.addEventListener('click', play);
    const pauseButton = document.getElementById('pause-button');
    pauseButton.addEventListener('click', pause);
})

function startGame() {
    const rootElement = document.querySelector('.shield-hero-game');
    new GameView(rootElement)
    // let newGame = new GameView(rootElement)
    // return newGame
}

// const canvasEl = document.getElementsByClassName("canvas-character");
// debugger
// canvasEl.width = 500;
// canvasEl.height = 500;

// const ctx = canvasEl.getContext("2d");
// debugger
// ctx.fillStyle = "purple";
// ctx.fillRect(0, 0, 20, 20);

function play() {
    const audio = document.getElementById('audio')
    audio.play();
}

function pause() {
    const audio = document.getElementById('audio')
    audio.pause();
}


