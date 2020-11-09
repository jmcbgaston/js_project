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
}

function play() {
    const audio = document.getElementById('audio')
    audio.play();
}

function pause() {
    const audio = document.getElementById('audio')
    audio.pause();
}


