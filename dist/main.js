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

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board.js */ \"./src/board.js\")\n\nclass GameView {\n    constructor(element) {\n        this.element = element\n        this.board = new Board();\n        this.handleMove = this.handleMove.bind(this);\n\n        this.setupGame();\n        window.addEventListener('keydown', this.handleMove)\n        \n        window.character = this.board.character\n        window.shield = this.board.shield\n        window.board = this.board\n    }\n\n    setupGame() {\n        let html = \"\";\n        for (let i = 0; i < this.board.grid.length; i++) {\n            html += \"<ul>\";\n            for (let j = 0; j < this.board.grid.length; j++) {\n                let id = [i, j]\n                let idX = i\n                let idY = j\n\n                if (idX === 7 && idY === 8) {\n                    html += `<li id=${id} class=\"character\"><canvas id='canvas-character'></canvas></li>`\n                } else if (idX === 7 && idY === 7) {\n                    html += `<li id=${id} class=\"shield\"><canvas id='canvas-shield'></canvas></li>`\n                } else {\n                    html += `<li id=${id}><canvas></canvas></li>`\n                }\n            }\n            html += \"</ul>\";\n        }\n        this.element.innerHTML = html;\n        this.createCanvasCharacter();\n        this.createCanvasShield();\n    }\n\n    createCanvasCharacter() {\n        const canvasCharacter = document.getElementById('canvas-character')\n        canvasCharacter.width = 30;\n        canvasCharacter.height = 30;\n\n        const ctx = canvasCharacter.getContext('2d')\n        ctx.fillStyle = \"white\";\n        ctx.fillRect(0, 0, 25, 25);\n    }\n\n    createCanvasShield() {\n        const canvasShield = document.getElementById('canvas-shield')\n        canvasShield.width = 30;\n        canvasShield.height = 30;\n\n        const ctx = canvasShield.getContext('2d')\n        ctx.fillStyle = \"black\";\n        ctx.fillRect(0, 0, 25, 25);\n    }\n    \n    handleMove(e) {\n        e.preventDefault;\n\n        if (GameView.KEYS[e.keyCode] === this.board.character.directionFaced) {\n            let newPos\n\n            if (GameView.KEYS[e.keyCode] === \"N\") {\n                newPos = this.board.character.positionX - 1\n                if (newPos >= 0 && newPos <= 15) {\n                    this.board.character.positionX = newPos\n                    this.updateClasses()\n                }\n            } else if (GameView.KEYS[e.keyCode] === \"S\") {\n                newPos = this.board.character.positionX + 1\n                if (newPos >= 0 && newPos <= 15) {\n                    this.board.character.positionX = newPos\n                    this.updateClasses()\n                }\n            } else if (GameView.KEYS[e.keyCode] === \"E\") {\n                newPos = this.board.character.positionY + 1\n                if (newPos >= 0 && newPos <= 15) {\n                    this.board.character.positionY = newPos\n                    this.updateClasses()\n                }\n            } else if (GameView.KEYS[e.keyCode] === \"W\") {\n                newPos = this.board.character.positionY - 1\n                if (newPos >= 0 && newPos <= 15) {\n                    this.board.character.positionY = newPos\n                    this.updateClasses()\n                }\n            } else {\n            \n            }\n            \n        } else {\n            let newDirFaced = GameView.KEYS[e.keyCode]\n            this.board.character.directionFaced = newDirFaced\n        }\n    }\n\n    updateClasses() {\n        this.removeClasses();\n\n        let characterCoordinates = [this.board.character.positionX, this.board.character.positionY];\n        let charAtTag = document.getElementById(characterCoordinates);\n        charAtTag.classList.add('character');\n\n        let shieldCoordinates = [this.board.shield.positionX, this.board.shield.positionY];\n        let shieldAtTag = document.getElementById(shieldCoordinates);\n        shieldAtTag.classList.add('shield');\n\n        charAtTag.firstElementChild.id = 'canvas-character'\n        this.createCanvasCharacter()\n\n        shieldAtTag.firstElementChild.id = 'canvas-shield'\n        this.createCanvasShield()\n    }\n\n    removeClasses() {\n        document.querySelectorAll('li').forEach(liEle => {\n            liEle.classList.remove('character')\n            liEle.classList.remove('shield')\n        })\n        document.querySelectorAll('canvas').forEach(caEle => {\n            caEle.id = \"\"\n            caEle.getContext('2d').clearRect(0, 0, 30, 30)\n        })\n    }\n\n    createNewShield() {\n\n    }\n    damageShield() {\n\n    }\n    \n    shoortProjectiles() {\n\n    }\n}\n\nGameView.KEYS = {\n    37: \"W\", \n    38: \"N\",\n    39: \"E\",\n    40: \"S\"\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

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

eval("class Shield {\n    constructor() {\n        this.isPickedUp = false\n        this.health = 3\n        this.isBroken = false\n        this.positionX = 7\n        this.positionY = 7\n        this.position = \"\"\n    }\n}\n\nmodule.exports = Shield\n\n//# sourceURL=webpack:///./src/shield.js?");

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