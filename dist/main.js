/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Tile = __webpack_require__(/*! ./tile.js */ \"./src/tile.js\")\nconst Character = __webpack_require__(/*! ./character.js */ \"./src/character.js\")\nconst Shield = __webpack_require__(/*! ./shield.js */ \"./src/shield.js\")\n\nclass Board {\n    constructor() {\n        let grid = new Array(16)\n\n        for (let i = 0; i < grid.length; i++) {\n            grid[i] = []\n            for (let j = 0; j < grid.length; j++) {\n                let position = [i, j]\n                let tile = new Tile(position)\n                grid[i][j] = tile\n            }\n        }\n        this.grid = grid\n        this.character = new Character();\n        this.shield = new Shield\n    }\n}\n\nmodule.exports = Board\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/character.js":
/*!**************************!*\
  !*** ./src/character.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Character {\n    constructor() {\n        this.directionFaced = \"W\"\n        this.shielded = false\n        this.shield = null\n        this.positionX = 7\n        this.positionY = 8\n    }\n}\n\nmodule.exports = Character\n\n//# sourceURL=webpack:///./src/character.js?");

/***/ }),

/***/ "./src/fireball.js":
/*!*************************!*\
  !*** ./src/fireball.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class FireBall {\n    constructor() {\n        this.positionX = \"\"\n        this.positionY = \"\"\n    }\n}\n\nmodule.exports = FireBall\n\n//# sourceURL=webpack:///./src/fireball.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board.js */ \"./src/board.js\")\nconst FireBall = __webpack_require__(/*! ./fireball */ \"./src/fireball.js\")\n\nclass GameView {\n    constructor(element) {\n        this.element = element\n        this.board = new Board();\n        this.handleMove = this.handleMove.bind(this);\n        this.gameStarted = false\n        const processing = true\n        this.gameInProcess = processing\n        this.fireball1 = \"\"\n        this.fireball2 = \"\"\n        this.fireball3 = \"\"\n        this.fireball4 = \"\"\n\n        this.setupGame();\n        window.addEventListener('keydown', this.handleMove)\n        \n        window.character = this.board.character\n        window.shield = this.board.shield\n        window.board = this.board\n    }\n\n    setupGame() {\n        let html = \"\";\n        for (let i = 0; i < this.board.grid.length; i++) {\n            html += \"<ul>\";\n            for (let j = 0; j < this.board.grid.length; j++) {\n                let id = [i, j]\n                let idX = i\n                let idY = j\n\n                if (idX === 7 && idY === 8) {\n                    html += `<li id=${id} class=\"character\"><canvas id='canvas-character'></canvas></li>`\n                } else if (idX === 7 && idY === 7) {\n                    html += `<li id=${id} class=\"shield\"><canvas id='canvas-shield'></canvas></li>`\n                } else {\n                    html += `<li id=${id}><canvas></canvas></li>`\n                }\n            }\n            html += \"</ul>\";\n        }\n        this.element.innerHTML = html;\n        this.createCanvasCharacter();\n        this.createCanvasShield();\n    }\n\n    createCanvasCharacter() {\n        const canvasCharacter = document.getElementById('canvas-character')\n        canvasCharacter.width = 30;\n        canvasCharacter.height = 30;\n\n        const ctx = canvasCharacter.getContext('2d')\n        ctx.fillStyle = \"white\";\n        ctx.fillRect(0, 0, 25, 25);\n    }\n\n    createCanvasShield() {\n        const canvasShield = document.getElementById('canvas-shield')\n        canvasShield.width = 30;\n        canvasShield.height = 30;\n\n        const ctx = canvasShield.getContext('2d')\n        ctx.fillStyle = \"black\";\n        ctx.fillRect(0, 0, 25, 25);\n    }\n\n    createCanvasShieldedCharacter() {\n        const canvasShieldedCharacter = document.getElementById('canvas-shielded-character')\n        canvasShieldedCharacter.width = 30;\n        canvasShieldedCharacter.height = 30;\n\n        const ctx = canvasShieldedCharacter.getContext('2d')\n        ctx.fillStyle = \"blue\";\n        ctx.fillRect(0, 0, 25, 25);\n    }\n    \n    handleMove(e) {\n        e.preventDefault;\n\n        if (GameView.KEYS[e.keyCode] === this.board.character.directionFaced) {\n            let newPos\n\n            if (GameView.KEYS[e.keyCode] === \"N\") {\n                newPos = this.board.character.positionX - 1\n                if (newPos > 0 && newPos < 15) {\n                    this.board.character.positionX = newPos\n                    this.updateClasses()\n                }\n            } else if (GameView.KEYS[e.keyCode] === \"S\") {\n                newPos = this.board.character.positionX + 1\n                if (newPos > 0 && newPos < 15) {\n                    this.board.character.positionX = newPos\n                    this.updateClasses()\n                }\n            } else if (GameView.KEYS[e.keyCode] === \"E\") {\n                newPos = this.board.character.positionY + 1\n                if (newPos > 0 && newPos < 15) {\n                    this.board.character.positionY = newPos\n                    this.updateClasses()\n                }\n            } else if (GameView.KEYS[e.keyCode] === \"W\") {\n                newPos = this.board.character.positionY - 1\n                if (newPos > 0 && newPos < 15) {\n                    this.board.character.positionY = newPos\n                    this.updateClasses()\n                }\n            } else {\n            \n            }\n            \n        } else {\n            let newDirFaced = GameView.KEYS[e.keyCode]\n            this.board.character.directionFaced = newDirFaced\n        }\n    }\n\n    updateClasses() {\n        this.removeClasses();\n        \n        let characterCoordinates = [this.board.character.positionX, this.board.character.positionY];\n        let shieldCoordinates = [this.board.shield.positionX, this.board.shield.positionY];\n        \n        let charAtTag = document.getElementById(characterCoordinates);\n        let shieldAtTag = document.getElementById(shieldCoordinates);\n        \n        if (JSON.stringify(characterCoordinates) === JSON.stringify(shieldCoordinates)) {\n            this.board.character.shielded = true;\n        }\n\n        if (this.board.character.shielded === false) {\n            charAtTag.classList.add('character');\n            shieldAtTag.classList.add('shield');\n    \n            charAtTag.firstElementChild.id = 'canvas-character'\n            shieldAtTag.firstElementChild.id = 'canvas-shield'\n    \n            this.createCanvasCharacter()\n            this.createCanvasShield()\n        } else {\n            let shieldedCharacterCoordinates = [this.board.character.positionX, this.board.character.positionY];\n            let shieldedCharAtTag = document.getElementById(shieldedCharacterCoordinates);\n\n            shieldedCharAtTag.classList.add('shielded-character');\n            shieldedCharAtTag.firstElementChild.id = 'canvas-shielded-character'\n            \n            this.createCanvasShieldedCharacter()\n            this.generateFireballs()\n            // this.gameStarted = true\n            // not definite placement\n            // this.play()\n            // -------- //\n        }\n\n        // if (this.gameStarted) {\n        // }\n    }\n    \n    generateFireballs() {\n        if (!this.gameStarted) {\n            // debugger\n            let randomPos1 = [0, Math.floor(Math.random() * Math.floor(15))];\n            let ele1 = document.getElementById(randomPos1)\n            let fireball1 = ele1.firstElementChild\n            fireball1.id = randomPos1\n            this.fireball1 = fireball1\n            // debugger\n            this.createCanvasFireball(fireball1)\n            \n            let randomPos2 = [Math.floor(Math.random() * Math.floor(15)), 0];\n            let ele2 = document.getElementById(randomPos2)\n            let fireball2 = ele2.firstElementChild\n            fireball2.id = randomPos2\n            this.fireball2 = fireball2\n            // debugger\n            this.createCanvasFireball(fireball2)\n            \n            let randomPos3 = [15, Math.floor(Math.random() * Math.floor(15))];\n            let ele3 = document.getElementById(randomPos3)\n            let fireball3 = ele3.firstElementChild\n            fireball3.id = randomPos3\n            this.fireball3 = fireball3\n            // debugger\n            this.createCanvasFireball(fireball3)\n            \n            let randomPos4 = [Math.floor(Math.random() * Math.floor(15)), 15];\n            let ele4 = document.getElementById(randomPos4)\n            let fireball4 = ele4.firstElementChild\n            fireball4.id = randomPos4\n            this.fireball4 = fireball4\n            // debugger\n            this.createCanvasFireball(fireball4)\n            this.gameStarted = true\n        }\n    }\n    \n    createCanvasFireball(fireball) {\n        fireball.width = 20;\n        fireball.height = 20;\n\n        const ctx = fireball.getContext('2d')\n\n        ctx.beginPath();\n        ctx.arc(0, 0, 20, 1, 1*Math.PI);\n        ctx.stroke();\n        ctx.fillStyle = \"red\";\n        ctx.fill();\n    }\n\n    play() {\n        const audio = document.getElementById('audio')\n        audio.play();\n    }\n\n    removeClasses() {\n        document.querySelectorAll('li').forEach(liEle => {\n            if (liEle.classList.contains('character') || liEle.classList.contains('shield') || liEle.classList.contains('shielded-character')) {\n                liEle.classList.remove('character')\n                liEle.classList.remove('shield')\n                liEle.classList.remove('shield-character')\n            }\n        })\n        document.querySelectorAll('canvas').forEach(caEle => {\n            if (caEle.id !== this.fireball1.id && \n                caEle.id !== this.fireball2.id &&\n                caEle.id !== this.fireball3.id &&\n                caEle.id !== this.fireball4.id) {\n                caEle.id = \"\"\n                caEle.getContext('2d').clearRect(0, 0, 30, 30)\n            }\n        })\n        // debugger\n    }\n\n    createNewShield() {\n\n    }\n\n    damageShield() {\n\n    }\n    \n    shoortProjectiles() {\n\n    }\n}\n\nGameView.KEYS = {\n    37: \"W\", \n    38: \"N\",\n    39: \"E\",\n    40: \"S\"\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\")\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const startButton = document.getElementById('start-button');\n    startButton.addEventListener('click', startGame);\n    const playButton = document.getElementById('play-button');\n    playButton.addEventListener('click', play);\n    const pauseButton = document.getElementById('pause-button');\n    pauseButton.addEventListener('click', pause);\n})\n\nfunction startGame() {\n    const rootElement = document.querySelector('.shield-hero-game');\n    new GameView(rootElement)\n}\n\nfunction play() {\n    const audio = document.getElementById('audio')\n    audio.play();\n}\n\nfunction pause() {\n    const audio = document.getElementById('audio')\n    audio.pause();\n}\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/shield.js":
/*!***********************!*\
  !*** ./src/shield.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Shield {\n    constructor() {\n        this.isPickedUp = false\n        this.health = 3\n        this.isBroken = false\n        this.positionX = 7\n        this.positionY = 7\n    }\n}\n\nmodule.exports = Shield\n\n//# sourceURL=webpack:///./src/shield.js?");

/***/ }),

/***/ "./src/tile.js":
/*!*********************!*\
  !*** ./src/tile.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Tile {\n    constructor(position) {\n        this.position = position\n        this.hasPlayer = false\n        this.hasShield = false\n    }\n}\n\nmodule.exports = Tile\n\n//# sourceURL=webpack:///./src/tile.js?");

/***/ })

/******/ });