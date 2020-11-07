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

eval("const Tile = __webpack_require__(/*! ./tile.js */ \"./src/tile.js\")\nconst Character = __webpack_require__(/*! ./character.js */ \"./src/character.js\")\nconst Shield = __webpack_require__(/*! ./shield.js */ \"./src/shield.js\")\n\nclass Board {\n    constructor() {\n        debugger\n\n        let grid = new Array(16)\n\n        for (let i = 0; i < grid.length; i++) {\n            grid[i] = []\n            for (let j = 0; j < grid.length; j++) {\n                let position = [i, j]\n                let tile = new Tile(position)\n                grid[i][j] = tile\n            }\n        }\n        this.grid = grid\n        this.character = new Character();\n        this.shield = new Shield\n    }\n}\n\nmodule.exports = Board\n\n// let board = new Board()\n// console.log(board.grid[7][15])\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/character.js":
/*!**************************!*\
  !*** ./src/character.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Character {\n    constructor() {\n        debugger\n        this.directionFaced = \"W\"\n        this.shielded = false\n        this.shield = null\n        this.positionX = 8\n        this.positionY = 7\n    }\n}\n\nmodule.exports = Character\n\n// Character object\n// - starts game facing west\n// - has shielded status\n// - .shield will hold Shield object\n\n// let char = new Character\n// console.log(char)\n\n//# sourceURL=webpack:///./src/character.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board.js */ \"./src/board.js\")\n\nclass GameView {\n    constructor(element) {\n        this.element = element\n        this.board = new Board(); // board is prebuilt with grid\n        \n        this.setupGame(); // tbd functionality\n\n        this.handleMove = this.handleMove.bind(this);\n        // handles character movement\n        window.addEventListener('keydown', this.handleMove)\n    }\n    \n    setupGame() {\n        debugger;\n\n        let html = \"\";\n        for (let i = 0; i < this.board.grid.length; i++) {\n            html += \"<ul>\";\n            for (let j = 0; j < this.board.grid.length; j++) {\n                html += \"<li></li>\";\n            }\n            html += \"</ul>\";\n        }\n\n        this.element.innerHTML = html;\n        this.placeElements()\n\n        debugger\n    }\n    \n    placeElements() {\n        // replaces tile element with character / shield element\n        debugger\n        this.board.grid[8][9] = this.board.character\n        this.board.grid[6][9] = this.board.shield\n    }\n    \n    handleMove(e) {\n        e.preventDefault;\n        debugger;\n\n        if (GameView.KEYS[e.keyCode] === this.board.character.directionFaced) {\n            debugger\n            this.board.character.positionX = this.board.character.positionX - 1\n        } else {\n            debugger\n            this.board.character.directionFaced = GameView.KEYS[e.keyCode]\n        }\n\n        debugger\n\n        // at this point, we would call render to re-render the board and updated state\n    }\n\n    render() {\n        debugger;\n\n        // update classes of <li> elements to show current location of elements\n\n        // update character position in state\n        let cX = this.board.character.positionX\n        let cY = this.board.character.positionY\n        let characterPos = [cX, cY]\n        let newCharacterPos = characterPos + this.handleMove()\n\n        // update shield position in state\n        let sX = this.board.shield.positionX\n        let sY = this.board.shield.positionY\n        let sheildPos = [sX, sY]\n        let newSheildPos = sheildPos + this.handleMove()\n\n        // update li element classes\n        this.updateClasses(newCharacterPos, \"character\")\n        this.updateClasses(newSheildPos, \"shield\")\n    }\n\n    updateClasses(coordinates, className) {\n        debugger;\n\n        // this method calls removeClass and updates html element classes\n\n        this.removeClasses();\n\n        // coords.forEach( coord => {\n        //     const flatCoord = (coord.i * this.board.dim) + coord.j;\n        //     this.$li.eq(flatCoord).addClass(className);\n        // });\n    }\n\n    removeClasses() {\n        debugger;\n\n        // this method removes all class names\n        document.querySelectorAll('li').forEach(liEle => {\n            liEle.classList.remove('shield')\n            liEle.classList.remove('character')\n        })\n    }\n\n    createNewShield() {\n\n    }\n    damageShield() {\n\n    }\n    \n    shoortProjectiles() {\n\n    }\n}\n\nGameView.KEYS = {\n    37: \"W\", \n    38: \"N\",\n    39: \"E\",\n    40: \"S\"\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\")\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const startButton = document.getElementById('start-button');\n    startButton.addEventListener('click', startGame);\n    const playButton = document.getElementById('play-button');\n    playButton.addEventListener('click', play);\n    const pauseButton = document.getElementById('pause-button');\n    pauseButton.addEventListener('click', pause);\n})\n\nfunction startGame() {\n    const rootElement = document.querySelector('.shield-hero-game');\n    let newGame = new GameView(rootElement)\n    return newGame\n}\n\nfunction play() {\n    const audio = document.getElementById('audio')\n    audio.play();\n}\n\nfunction pause() {\n    const audio = document.getElementById('audio')\n    audio.pause();\n}\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/shield.js":
/*!***********************!*\
  !*** ./src/shield.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Shield {\n    constructor() {\n        debugger\n        this.isPickedUp = false\n        this.health = 3\n        this.isBroken = false\n        this.positionX = 7\n        this.positionY = 7\n    }\n}\n\nmodule.exports = Shield\n\n// Shield object\n// - to be picked up by character\n// - can be hit 3 times\n// - dissapears from map if .isPickedUp === true\n\n// let sh = new Shield()\n// console.log(sh)\n\n//# sourceURL=webpack:///./src/shield.js?");

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