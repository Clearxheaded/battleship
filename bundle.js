/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/models/Gameboard.js":
/*!*********************************!*\
  !*** ./src/models/Gameboard.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gameboard: () => (/* binding */ Gameboard)
/* harmony export */ });
class Gameboard {
    constructor() {
        this.gameGrid = Array.from({length: 10}, () => Array(10).fill(0));
        this.placedShips = [];
        this.missedAttacks = [];
    }

    // Place ships on the grid
    placeShip(ship, x_cord, y_cord, orientation) {
        // Initialize final coordinates of the ship
        let xFinal = x_cord;
        let yFinal = y_cord;

        if (orientation === 'horizontal' && x_cord + ship.length > 10) return false;
        if (orientation === 'vertical' && y_cord + ship.length > 10) return false;

        // Check if any space is already occupied
        for (let i = 0; i < ship.length; i++) {
            if (orientation === 'horizontal' && this.gameGrid[x_cord + i][y_cord] !== 0) return false;
            if (orientation === 'vertical' && this.gameGrid[x_cord][y_cord + i] !== 0) return false;
        }

        if(orientation === 'horizontal') {
            xFinal = x_cord + ship.length;
            this.placedShips.push({
                ship: ship,
                startCoord: { x: x_cord, y: y_cord },
                finalCoord: { x: xFinal, y: y_cord},
                orientation: orientation
            });

            for(let i = x_cord; i < xFinal; i++) {
                // Place the ship by initializing each space with the ship object
                this.gameGrid[i][y_cord] = ship;
            }
        }
        else { // Vertical orientation
            yFinal = y_cord + ship.length;
            this.placedShips.push({
                ship: ship,
                startCoord: { x: x_cord, y: y_cord },
                finalCoord: { x: x_cord, y: yFinal},
                orientation: orientation
            });

            for(let i = y_cord; i < yFinal; i++) {
                // Place the ship by initializing each space with the ship object
                this.gameGrid[x_cord][i] = ship;
            }
        }
    }

    receiveAttack(x_cord, y_cord) {
        // First check if the coordinates are within the grid
        if(x_cord < 0 || x_cord >= 10 || y_cord < 0 || y_cord >= 10) {
            return 'Invalid coordinates';
        }

        // Then check if the cell has been shot before
        if(this.gameGrid[x_cord][y_cord] === 'hit' || this.gameGrid[x_cord][y_cord] === 'miss') {
            return 'This cell has been shot before';
        }

        // If it's not 0, then there is a ship, log the hit
        if(this.gameGrid[x_cord][y_cord] != 0) {
            this.gameGrid[x_cord][y_cord].hit();
            this.gameGrid[x_cord][y_cord] = 'hit';
            return 'Ship was hit';
        }

        else { // Log the missing shot
            this.gameGrid[x_cord][y_cord] = 'miss'; // To track that the cell has been hit
            this.missedAttacks.push({
                coordinates: { x: x_cord, y: y_cord}
            })
            return 'Missed!';
        }
    }

    // Check if all the ships sunk
    allShipsSunk() {
        // If every ship sunk, then all ships sunk
        return this.placedShips.every((shipData) => shipData.ship.isSunk());
    }
}

/***/ }),

/***/ "./src/models/Player.js":
/*!******************************!*\
  !*** ./src/models/Player.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _Gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard.js */ "./src/models/Gameboard.js");


class Player {
  constructor(isComputer = false) {
    this.gameboard = new _Gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard();
    this.isComputer = isComputer;
  }
  
  // Method for attacking the enemy's board
  attack(x, y, enemyGameboard) {
    return enemyGameboard.receiveAttack(x, y);
  }
  
  // For computer players to make automatic moves
  computerPlay(enemyGameboard) {
    // If this is a human player, do nothing
    if (!this.isComputer) return null;
    
    // Generate random coordinates until a legal move is found
    let x = -1;
    let y = -1;
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    
    // If the cell has been attacked, try again
    if(enemyGameboard.gameGrid[x][y] === 'hit' || enemyGameboard.gameGrid[x][y] === 'miss') {
        return this.computerPlay(enemyGameboard);
    }

    // If not, make an attack
    return enemyGameboard.receiveAttack(x, y);
  }
}

/***/ }),

/***/ "./src/models/Ship.js":
/*!****************************!*\
  !*** ./src/models/Ship.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });
class Ship {

    constructor(length, timesHit = 0, sunk = false) {
        this.length = length;
        this.timesHit = timesHit;
        this.sunk = sunk;
    } 

    hit() {
        this.timesHit++;
    }

    isSunk() {
        if(this.length === this.timesHit) {
            this.sunk = true;
            return true;
        }
        else return false;
    }

}

/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js!./styles/style.css":
/*!***********************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js!./styles/style.css ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Base Styles */
:root {
    --primary-bg: #0a1929;
    --secondary-bg: #0f2942;
    --board-bg: #1a3a5a;
    --grid-border: #2a4a6a;
    --text-color: #e0f7fa;
    --accent-color: #00e5ff;
    --ship-color: #64ffda;
    --ship-preview: rgba(100, 255, 218, 0.3);
    --hit-color: #ff5252;
    --miss-color: #78909c;
    --invalid-placement: rgba(255, 82, 82, 0.4);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    background-color: var(--primary-bg);
    color: var(--text-color);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: 20px;
}

h1, h2, h3 {
    font-family: 'Orbitron', sans-serif;
    text-align: center;
}

h1 {
    font-size: 3rem;
    letter-spacing: 4px;
    margin: 20px 0;
    text-shadow: 0 0 10px var(--accent-color);
    color: var(--accent-color);
}

h2 {
    font-size: 1.8rem;
    margin: 15px 0;
}

h3 {
    font-size: 1.2rem;
    margin: 10px 0;
}

.game-container {
    max-width: 1200px;
    width: 100%;
}

/* Button Styles */
.btn {
    background-color: transparent;
    color: var(--accent-color);
    border: 2px solid var(--accent-color);
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 1px;
}

.btn:hover {
    background-color: rgba(100, 255, 218, 0.1);
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.primary-btn {
    background-color: rgba(100, 255, 218, 0.1);
    font-size: 1.2rem;
    padding: 10px 24px;
}

/* Game Screens */
#setup-screen, #game-screen, #game-over {
    display: none;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

#setup-screen.active {
    display: flex;
}

#game-over {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(10, 25, 41, 0.9);
    z-index: 10;
    justify-content: center;
}

.game-over-content {
    background-color: var(--secondary-bg);
    padding: 40px;
    border-radius: 10px;
    text-align: center;
    border: 2px solid var(--accent-color);
    box-shadow: 0 0 30px var(--accent-color);
}

/* Setup Screen */
.controls {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin: 15px 0;
    flex-wrap: wrap;
}

.orientation-control {
    display: flex;
    gap: 20px;
}

.orientation-control label {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.orientation-control span {
    margin-left: 5px;
}

.setup-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
    margin: 20px 0;
}

/* Ship Selection */
.ship-selection {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.ship-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.ship {
    background-color: var(--secondary-bg);
    border: 2px solid var(--grid-border);
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.ship:hover {
    border-color: var(--accent-color);
}

.ship.selected {
    border-color: var(--accent-color);
    background-color: rgba(100, 255, 218, 0.1);
    transform: scale(1.05);
}

.ship.placed {
    opacity: 0.5;
    cursor: not-allowed;
}

.ship-name {
    font-weight: bold;
    margin-bottom: 5px;
}

.ship-units {
    display: flex;
    gap: 2px;
}

.unit {
    width: 20px;
    height: 20px;
    background-color: var(--ship-color);
    border-radius: 2px;
}

/* Game Boards */
.boards-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
    margin: 20px 0;
}

.board-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.board {
    display: grid;
    grid-template-columns: repeat(10, 40px);
    grid-template-rows: repeat(10, 40px);
    gap: 3px; 
    background-color: var(--grid-border);
    padding: 5px; /* Increased padding */
    border: 2px solid var(--grid-border);
    border-radius: 4px; /* Added rounded corners */
}

.cell {
    width: 40px;
    height: 40px;
    background-color: var(--board-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid rgba(100, 255, 218, 0.3); 
    border-radius: 2px; 
}

.x-coordinates {
    display: flex;
    margin-left: 28px; 
    height: 25px;
    margin-bottom: 5px;
}

.y-coordinates {
    display: flex;
    flex-direction: column;
    width: 25px;
    margin-right: 5px;
}

.board-with-coordinates {
    display: flex;
    align-items: center;
}

.coordinates {
    display: flex;
    font-size: 0.9rem;
    color: var(--accent-color);
}

.x-coordinates div {
    width: 43px; 
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(-1.5px);
    padding: 0;
    box-sizing: border-box;
}

.y-coordinates div {
    width: 25px;
    height: 43px; 
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-1.5px);
    padding: 0;
    box-sizing: border-box;
}

.cell:hover {
    background-color: rgba(100, 255, 218, 0.1);
}

/* Cell States */
.cell.ship {
    background-color: var(--ship-color);
}

.cell.preview {
    background-color: var(--ship-preview);
}

.cell.invalid {
    background-color: var(--invalid-placement);
}

.cell.hit {
    background-color: var(--hit-color);
    animation: pulse 0.5s;
}

.cell.hit::after {
    content: '×';
    font-size: 1.5rem;
    font-weight: bold;
}

.cell.miss {
    background-color: var(--miss-color);
}

.cell.miss::after {
    content: '•';
    font-size: 1.5rem;
}

/* Game Status */
.game-status {
    text-align: center;
    margin: 15px 0;
}

#battle-message {
    min-height: 24px;
    margin: 10px 0;
    font-size: 1.1rem;
}

/* Animations */
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

/* Responsive Adjustments */
@media (max-width: 900px) {
    .boards-container, .setup-container {
        flex-direction: column;
        align-items: center;
    }
    
    .ship-selection {
        order: 2;
    }
    
    .board-container {
        order: 1;
    }
}

@media (max-width: 500px) {
    h1 {
        font-size: 2.2rem;
    }
    
    .board {
        grid-template-columns: repeat(10, 25px);
        grid-template-rows: repeat(10, 25px);
    }
    
    .cell {
        width: 25px;
        height: 25px;
    }
    
    .x-coordinates div, .y-coordinates div {
        width: 25px;
        height: 25px;
    }
}`, "",{"version":3,"sources":["webpack://./styles/style.css"],"names":[],"mappings":"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","sourcesContent":["/* Base Styles */\r\n:root {\r\n    --primary-bg: #0a1929;\r\n    --secondary-bg: #0f2942;\r\n    --board-bg: #1a3a5a;\r\n    --grid-border: #2a4a6a;\r\n    --text-color: #e0f7fa;\r\n    --accent-color: #00e5ff;\r\n    --ship-color: #64ffda;\r\n    --ship-preview: rgba(100, 255, 218, 0.3);\r\n    --hit-color: #ff5252;\r\n    --miss-color: #78909c;\r\n    --invalid-placement: rgba(255, 82, 82, 0.4);\r\n}\r\n\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n    font-family: 'Roboto', sans-serif;\r\n    background-color: var(--primary-bg);\r\n    color: var(--text-color);\r\n    min-height: 100vh;\r\n    display: flex;\r\n    justify-content: center;\r\n    padding: 20px;\r\n}\r\n\r\nh1, h2, h3 {\r\n    font-family: 'Orbitron', sans-serif;\r\n    text-align: center;\r\n}\r\n\r\nh1 {\r\n    font-size: 3rem;\r\n    letter-spacing: 4px;\r\n    margin: 20px 0;\r\n    text-shadow: 0 0 10px var(--accent-color);\r\n    color: var(--accent-color);\r\n}\r\n\r\nh2 {\r\n    font-size: 1.8rem;\r\n    margin: 15px 0;\r\n}\r\n\r\nh3 {\r\n    font-size: 1.2rem;\r\n    margin: 10px 0;\r\n}\r\n\r\n.game-container {\r\n    max-width: 1200px;\r\n    width: 100%;\r\n}\r\n\r\n/* Button Styles */\r\n.btn {\r\n    background-color: transparent;\r\n    color: var(--accent-color);\r\n    border: 2px solid var(--accent-color);\r\n    border-radius: 4px;\r\n    padding: 8px 16px;\r\n    font-size: 1rem;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n    font-family: 'Orbitron', sans-serif;\r\n    letter-spacing: 1px;\r\n}\r\n\r\n.btn:hover {\r\n    background-color: rgba(100, 255, 218, 0.1);\r\n}\r\n\r\n.btn:disabled {\r\n    opacity: 0.5;\r\n    cursor: not-allowed;\r\n}\r\n\r\n.primary-btn {\r\n    background-color: rgba(100, 255, 218, 0.1);\r\n    font-size: 1.2rem;\r\n    padding: 10px 24px;\r\n}\r\n\r\n/* Game Screens */\r\n#setup-screen, #game-screen, #game-over {\r\n    display: none;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    width: 100%;\r\n}\r\n\r\n#setup-screen.active {\r\n    display: flex;\r\n}\r\n\r\n#game-over {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: rgba(10, 25, 41, 0.9);\r\n    z-index: 10;\r\n    justify-content: center;\r\n}\r\n\r\n.game-over-content {\r\n    background-color: var(--secondary-bg);\r\n    padding: 40px;\r\n    border-radius: 10px;\r\n    text-align: center;\r\n    border: 2px solid var(--accent-color);\r\n    box-shadow: 0 0 30px var(--accent-color);\r\n}\r\n\r\n/* Setup Screen */\r\n.controls {\r\n    display: flex;\r\n    gap: 20px;\r\n    justify-content: center;\r\n    margin: 15px 0;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.orientation-control {\r\n    display: flex;\r\n    gap: 20px;\r\n}\r\n\r\n.orientation-control label {\r\n    display: flex;\r\n    align-items: center;\r\n    cursor: pointer;\r\n}\r\n\r\n.orientation-control span {\r\n    margin-left: 5px;\r\n}\r\n\r\n.setup-container {\r\n    display: flex;\r\n    justify-content: center;\r\n    flex-wrap: wrap;\r\n    gap: 40px;\r\n    margin: 20px 0;\r\n}\r\n\r\n/* Ship Selection */\r\n.ship-selection {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 10px;\r\n}\r\n\r\n.ship-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 15px;\r\n}\r\n\r\n.ship {\r\n    background-color: var(--secondary-bg);\r\n    border: 2px solid var(--grid-border);\r\n    border-radius: 5px;\r\n    padding: 10px;\r\n    cursor: pointer;\r\n    transition: all 0.3s ease;\r\n}\r\n\r\n.ship:hover {\r\n    border-color: var(--accent-color);\r\n}\r\n\r\n.ship.selected {\r\n    border-color: var(--accent-color);\r\n    background-color: rgba(100, 255, 218, 0.1);\r\n    transform: scale(1.05);\r\n}\r\n\r\n.ship.placed {\r\n    opacity: 0.5;\r\n    cursor: not-allowed;\r\n}\r\n\r\n.ship-name {\r\n    font-weight: bold;\r\n    margin-bottom: 5px;\r\n}\r\n\r\n.ship-units {\r\n    display: flex;\r\n    gap: 2px;\r\n}\r\n\r\n.unit {\r\n    width: 20px;\r\n    height: 20px;\r\n    background-color: var(--ship-color);\r\n    border-radius: 2px;\r\n}\r\n\r\n/* Game Boards */\r\n.boards-container {\r\n    display: flex;\r\n    justify-content: center;\r\n    flex-wrap: wrap;\r\n    gap: 40px;\r\n    margin: 20px 0;\r\n}\r\n\r\n.board-wrapper {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n}\r\n\r\n.board {\r\n    display: grid;\r\n    grid-template-columns: repeat(10, 40px);\r\n    grid-template-rows: repeat(10, 40px);\r\n    gap: 3px; \r\n    background-color: var(--grid-border);\r\n    padding: 5px; /* Increased padding */\r\n    border: 2px solid var(--grid-border);\r\n    border-radius: 4px; /* Added rounded corners */\r\n}\r\n\r\n.cell {\r\n    width: 40px;\r\n    height: 40px;\r\n    background-color: var(--board-bg);\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    cursor: pointer;\r\n    transition: all 0.2s ease;\r\n    border: 1px solid rgba(100, 255, 218, 0.3); \r\n    border-radius: 2px; \r\n}\r\n\r\n.x-coordinates {\r\n    display: flex;\r\n    margin-left: 28px; \r\n    height: 25px;\r\n    margin-bottom: 5px;\r\n}\r\n\r\n.y-coordinates {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 25px;\r\n    margin-right: 5px;\r\n}\r\n\r\n.board-with-coordinates {\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.coordinates {\r\n    display: flex;\r\n    font-size: 0.9rem;\r\n    color: var(--accent-color);\r\n}\r\n\r\n.x-coordinates div {\r\n    width: 43px; \r\n    height: 25px;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    transform: translateX(-1.5px);\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.y-coordinates div {\r\n    width: 25px;\r\n    height: 43px; \r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    transform: translateY(-1.5px);\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.cell:hover {\r\n    background-color: rgba(100, 255, 218, 0.1);\r\n}\r\n\r\n/* Cell States */\r\n.cell.ship {\r\n    background-color: var(--ship-color);\r\n}\r\n\r\n.cell.preview {\r\n    background-color: var(--ship-preview);\r\n}\r\n\r\n.cell.invalid {\r\n    background-color: var(--invalid-placement);\r\n}\r\n\r\n.cell.hit {\r\n    background-color: var(--hit-color);\r\n    animation: pulse 0.5s;\r\n}\r\n\r\n.cell.hit::after {\r\n    content: '×';\r\n    font-size: 1.5rem;\r\n    font-weight: bold;\r\n}\r\n\r\n.cell.miss {\r\n    background-color: var(--miss-color);\r\n}\r\n\r\n.cell.miss::after {\r\n    content: '•';\r\n    font-size: 1.5rem;\r\n}\r\n\r\n/* Game Status */\r\n.game-status {\r\n    text-align: center;\r\n    margin: 15px 0;\r\n}\r\n\r\n#battle-message {\r\n    min-height: 24px;\r\n    margin: 10px 0;\r\n    font-size: 1.1rem;\r\n}\r\n\r\n/* Animations */\r\n@keyframes pulse {\r\n    0% { transform: scale(1); }\r\n    50% { transform: scale(1.1); }\r\n    100% { transform: scale(1); }\r\n}\r\n\r\n/* Responsive Adjustments */\r\n@media (max-width: 900px) {\r\n    .boards-container, .setup-container {\r\n        flex-direction: column;\r\n        align-items: center;\r\n    }\r\n    \r\n    .ship-selection {\r\n        order: 2;\r\n    }\r\n    \r\n    .board-container {\r\n        order: 1;\r\n    }\r\n}\r\n\r\n@media (max-width: 500px) {\r\n    h1 {\r\n        font-size: 2.2rem;\r\n    }\r\n    \r\n    .board {\r\n        grid-template-columns: repeat(10, 25px);\r\n        grid-template-rows: repeat(10, 25px);\r\n    }\r\n    \r\n    .cell {\r\n        width: 25px;\r\n        height: 25px;\r\n    }\r\n    \r\n    .x-coordinates div, .y-coordinates div {\r\n        width: 25px;\r\n        height: 25px;\r\n    }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/runtime/api.js":
/*!************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/runtime/api.js ***!
  \************************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!*******************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \*******************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./styles/style.css":
/*!**************************!*\
  !*** ./styles/style.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../../../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../../../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../../../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../../../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!./style.css */ "../../../node_modules/css-loader/dist/cjs.js!./styles/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!***********************************************************************************!*\
  !*** ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \***********************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../../../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!***************************************************************************!*\
  !*** ../../../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \***************************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "../../../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!*****************************************************************************!*\
  !*** ../../../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \*****************************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!*****************************************************************************************!*\
  !*** ../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "../../../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!**********************************************************************!*\
  !*** ../../../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "../../../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!****************************************************************************!*\
  !*** ../../../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \****************************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/style.css */ "./styles/style.css");
/* harmony import */ var _models_Ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/Ship.js */ "./src/models/Ship.js");
/* harmony import */ var _models_Gameboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/Gameboard.js */ "./src/models/Gameboard.js");
/* harmony import */ var _models_Player_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/Player.js */ "./src/models/Player.js");





// Game state
let player, computer; 
let selectedShip = null; 
let orientation = 'horizontal'; 
let placedShips = [];
let gameInProgress = false; 
let playerTurn = true; 

function createBoardGrid(boardElement) {
    // Clear any existing cells
    boardElement.innerHTML = '';
    // Create 10x10 grid of cells with data attributes for coordinates
    for(let x = 0; x < 10; x++) {
        for(let y = 0; y < 10; y++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;
            boardElement.appendChild(cell);
        }
    }      
}

// Initialize the game
function initGame() {
    // Select the board elements
    const setupBoard = document.querySelector("#setup-board");
    const playerBoard = document.querySelector("#player-board");
    const computerBoard = document.querySelector("#computer-board");

    // Initialize grids for each of the boards
    createBoardGrid(setupBoard);
    createBoardGrid(playerBoard);
    createBoardGrid(computerBoard);

    // When user clicks on a ship
    const ships = document.querySelectorAll(".ship");
    ships.forEach(ship => {
        ship.addEventListener('click', shipSelection);
    });

    // Toggle orientation
    const orientationInputs = document.querySelectorAll('input[name="orientation"]');
    orientationInputs.forEach(input => {
        input.addEventListener('change', orientationToggling);
    });

    // Setup board hover events for ship placement preview
    setupBoard.addEventListener('mouseover', showPlacementPreview);
    setupBoard.addEventListener('mouseout', clearPlacementPreview);
    setupBoard.addEventListener('click', placeShip);

    document.querySelector('#start-game').addEventListener('click', function(e) {
        console.log("Start game button clicked");
        startGame();
    });

    document.querySelector('#reset-placement').addEventListener('click', function(e) {
        console.log("Reset button clicked");
        resetPlacement();
    });

    computerBoard.addEventListener('click', handlePlayerAttack);

    // Add play again button functionality
    document.querySelector('#play-again').addEventListener('click', resetGame);
    
    // Add random placement button functionality
    document.querySelector('#random-placement').addEventListener('click', randomPlacement);
    
    // Add reset button functionality
    document.querySelector('#reset-placement').addEventListener('click', resetPlacement);
    
    document.querySelector('#new-game').addEventListener('click', resetGame);
    
    // Initial setup - hide game screen, show setup screen
    document.querySelector('#game-screen').style.display = 'none';
    document.querySelector('#setup-screen').classList.add('active');
    document.querySelector('#play-again').style.display = 'none';
    
    // Disable start button until ships are placed
    document.querySelector('#start-game').disabled = true;
}

// Selecting ships
function shipSelection(event) {
    // Get the clicked ship element 
    const shipElement = event.currentTarget;

    // Skip if the ship is already placed
    if (shipElement.classList.contains('placed')) {
        return;
    }

    // Remove 'selected' class from all ships 
    document.querySelectorAll('.ship').forEach(ship => {
        ship.classList.remove('selected');
    })

    // Add 'selected' class to clicked ship
    shipElement.classList.add('selected');

    // Extract ship data from data attributes 
    selectedShip = {
        type: shipElement.dataset.ship,
        length: parseInt(shipElement.dataset.length)
    };

    console.log('Selected ship: ', selectedShip);
}

// Handle the orientation toggling 
function orientationToggling(event) {
    // Update the global variable
    orientation = event.target.value;
}

// Highlight where the ship would be placed
function showPlacementPreview(event) {
    // If no ship is selected or not hovering over a cell, do nothing
    if (!selectedShip || !event.target.classList.contains('cell')) {
        return;
    }
    
    // Get coordinates of hovered cell
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);
    
    // Clear any existing previews
    clearPlacementPreview();
    
    // Calculate which cells the ship would occupy
    const shipCells = [];
    
    if (orientation === 'horizontal') {
        // Ship extends horizontally (along y-axis in your grid)
        for (let i = 0; i < selectedShip.length; i++) {
            if (y + i < 10) { // Stay within bounds
                const cell = document.querySelector(`#setup-board .cell[data-x="${x}"][data-y="${y + i}"]`);
                if (cell) {
                    shipCells.push(cell);
                }
            }
        }
    } else { // vertical
        // Ship extends vertically (along x-axis in your grid)
        for (let i = 0; i < selectedShip.length; i++) {
            if (x + i < 10) { // Stay within bounds
                const cell = document.querySelector(`#setup-board .cell[data-x="${x + i}"][data-y="${y}"]`);
                if (cell) {
                    shipCells.push(cell);
                }
            }
        }
    }
    
    const isValid = isValidPlacement(x, y, selectedShip.length, orientation);
    
    shipCells.forEach(cell => {
        cell.classList.add(isValid ? 'preview' : 'invalid');
    });
}

// Clear any ship placement previews
function clearPlacementPreview() {
    document.querySelectorAll('#setup-board .cell.preview, #setup-board .cell.invalid')
        .forEach(cell => {
            cell.classList.remove('preview', 'invalid');
        });
}

// Check if ship placement is valid
function isValidPlacement(x, y, length, orientation) {
    // Check if ship is within board boundaries
    if (orientation === 'horizontal' && y + length > 10) return false;
    if (orientation === 'vertical' && x + length > 10) return false;
    
    // Check if ship overlaps with existing ships
    if (orientation === 'horizontal') {
        for (let i = 0; i < length; i++) {
            const cell = document.querySelector(`#setup-board .cell[data-x="${x}"][data-y="${y + i}"]`);
            if (cell && cell.classList.contains('ship')) {
                return false; // Ship overlaps with already placed ship
            }
        }
    } else { // vertical
        for (let i = 0; i < length; i++) {
            const cell = document.querySelector(`#setup-board .cell[data-x="${x + i}"][data-y="${y}"]`);
            if (cell && cell.classList.contains('ship')) {
                return false; // Ship overlaps with already placed ship
            }
        }
    }
    
    return true;
}

function placeShip(event) {
    // If no ship is selected or not clicking on a cell, do nothing
    if (!selectedShip || !event.target.classList.contains('cell')) {
        return;
    }
    
    // Get coordinates of clicked cell
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);
    
    // Check if placement is valid
    if (isValidPlacement(x, y, selectedShip.length, orientation)) {
        // Place the ship on the board
        const shipCells = [];
        
        if (orientation === 'horizontal') {
            for (let i = 0; i < selectedShip.length; i++) {
                const cell = document.querySelector(`#setup-board .cell[data-x="${x}"][data-y="${y + i}"]`);
                cell.classList.add('ship');
                shipCells.push(cell);
            }
        } else { // vertical
            for (let i = 0; i < selectedShip.length; i++) {
                const cell = document.querySelector(`#setup-board .cell[data-x="${x + i}"][data-y="${y}"]`);
                cell.classList.add('ship');
                shipCells.push(cell);
            }
        }
        
        // Add to placed ships array
        placedShips.push({
            type: selectedShip.type,
            length: selectedShip.length,
            x: x,
            y: y,
            orientation: orientation
        });
        
        // Mark ship as placed in UI
        document.querySelector(`.ship[data-ship="${selectedShip.type}"]`).classList.add('placed');
        
        // Clear selection
        document.querySelectorAll('.ship').forEach(ship => {
            ship.classList.remove('selected');
        });
        selectedShip = null;
        
        // Enable start button if all ships are placed
        if (placedShips.length === 5) {
            document.getElementById('start-game').disabled = false;
        }
    }
}

function randomPlacement() {
    // Clear current placements
    resetPlacement();
    
    // Ship data (type, length)
    const shipTypes = [
        { type: 'carrier', length: 5 },
        { type: 'battleship', length: 4 },
        { type: 'cruiser', length: 3 },
        { type: 'submarine', length: 3 },
        { type: 'destroyer', length: 2 }
    ];
    
    // Place each ship randomly
    shipTypes.forEach(shipData => {
        let placed = false;
        
        while (!placed) {
            // Generate random position and orientation
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            const randomOrientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            
            // Check if valid placement
            if (isValidPlacement(x, y, shipData.length, randomOrientation)) {
                // Place ship on board
                if (randomOrientation === 'horizontal') {
                    for (let i = 0; i < shipData.length; i++) {
                        const cell = document.querySelector(`#setup-board .cell[data-x="${x}"][data-y="${y + i}"]`);
                        cell.classList.add('ship');
                    }
                } else {
                    for (let i = 0; i < shipData.length; i++) {
                        const cell = document.querySelector(`#setup-board .cell[data-x="${x + i}"][data-y="${y}"]`);
                        cell.classList.add('ship');
                    }
                }
                
                // Add to placed ships array
                placedShips.push({
                    type: shipData.type,
                    length: shipData.length,
                    x: x,
                    y: y,
                    orientation: randomOrientation
                });
                
                // Mark ship as placed in UI
                document.querySelector(`.ship[data-ship="${shipData.type}"]`).classList.add('placed');
                
                placed = true;
            }
        }
    });
    
    // Enable start button since all ships are placed
    document.querySelector('#start-game').disabled = false;
}

function resetPlacement() {
    console.log("Reset placement clicked");
    // Clear ships from setup board
    document.querySelectorAll('#setup-board .cell').forEach(cell => {
        cell.classList.remove('ship', 'preview', 'invalid');
    });
    
    // Reset ship selection UI
    document.querySelectorAll('.ship').forEach(ship => {
        ship.classList.remove('selected', 'placed');
    });
    
    // Reset state
    placedShips = [];
    selectedShip = null;
    
    // Disable start button
    document.querySelector('#start-game').disabled = true;
}

function startGame() {
    console.log("Start game clicked");
    try {
        // Create player instances
        player = new _models_Player_js__WEBPACK_IMPORTED_MODULE_3__.Player(false); // human player
        computer = new _models_Player_js__WEBPACK_IMPORTED_MODULE_3__.Player(true); // computer player
        console.log("Players created:", player, computer);
        
        // Transfer placed ships to player's gameboard
        console.log("Placed ships:", placedShips);
        placedShips.forEach(shipData => {
            console.log("Creating ship:", shipData);
            const ship = new _models_Ship_js__WEBPACK_IMPORTED_MODULE_1__.Ship(shipData.length);
            
            // In the UI: horizontal = along Y axis, vertical = along X axis
            // In Gameboard: horizontal = along X axis, vertical = along Y axis
            if (shipData.orientation === 'horizontal') {
                console.log("Placing ship with VERTICAL orientation at", shipData.x, shipData.y);
                const result = player.gameboard.placeShip(ship, shipData.x, shipData.y, 'vertical');
                console.log("Ship placement result:", result);
            } else {
                console.log("Placing ship with HORIZONTAL orientation at", shipData.x, shipData.y);
                const result = player.gameboard.placeShip(ship, shipData.x, shipData.y, 'horizontal');
                console.log("Ship placement result:", result);
            }
        });
        
        // Rest of function remains the same
        console.log("Placing computer ships");
        placeComputerShips();
        
        // Update game state
        gameInProgress = true;
        playerTurn = true;
        
        // Switch screens
        document.querySelector('#setup-screen').classList.remove('active');
        document.querySelector('#game-screen').style.display = 'flex';
        
        // Update the boards
        updateBoards();
        
        // Set status message
        document.querySelector('#status-message').textContent = 'Your Turn';
        document.querySelector('#battle-message').textContent = 'Click on enemy board to attack';
    } catch (error) {
        console.error("Error in startGame:", error);
    }
}

function placeComputerShips() {
    // Ship lengths for computer
    const shipLengths = [5, 4, 3, 3, 2]; // Carrier, Battleship, Cruiser, Submarine, Destroyer
    
    shipLengths.forEach(length => {
        let placed = false;
        let attempts = 0; // Add an attempts counter to prevent infinite loops
        
        while (!placed && attempts < 100) { // Limit attempts to prevent freezing
            attempts++;
            // Generate random position and orientation
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            
            // Create ship and try to place it
            const ship = new _models_Ship_js__WEBPACK_IMPORTED_MODULE_1__.Ship(length);
            const result = computer.gameboard.placeShip(ship, x, y, orientation);
            
            // Set placed to true only if placement was successful
            if (result !== false) {
                placed = true;
                console.log(`Placed computer ship of length ${length}`);
            }
        }
        
        if (!placed) {
            console.error(`Failed to place ship of length ${length} after 100 attempts`);
        }
    });
    
    console.log("Computer ships placed successfully");
}

function updateBoards() {
    // Update player board - showing ships, hits and misses
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            const cell = document.querySelector(`#player-board .cell[data-x="${x}"][data-y="${y}"]`);
            const cellValue = player.gameboard.gameGrid[x][y];
            
            cell.className = 'cell'; // Reset classes
            
            if (cellValue === 'hit') {
                cell.classList.add('hit');
            } else if (cellValue === 'miss') {
                cell.classList.add('miss');
            } else if (cellValue !== 0) {
                // It's a ship
                cell.classList.add('ship');
            }
        }
    }
    
    // Update computer board - only showing hits and misses, not ships
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            const cell = document.querySelector(`#computer-board .cell[data-x="${x}"][data-y="${y}"]`);
            const cellValue = computer.gameboard.gameGrid[x][y];
            
            cell.className = 'cell'; // Reset classes
            
            if (cellValue === 'hit') {
                cell.classList.add('hit');
            } else if (cellValue === 'miss') {
                cell.classList.add('miss');
            }
        }
    }
}

function handlePlayerAttack(event) {
    // If game is not in progress or it's not player's turn, do nothing
    if (!gameInProgress || !playerTurn || !event.target.classList.contains('cell')) {
        return;
    }
    
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);
    
    // Make the attack
    const attackResult = player.attack(x, y, computer.gameboard);
    
    // Handle invalid attacks
    if (attackResult === 'Invalid coordinates' || attackResult === 'This cell has been shot before') {
        document.getElementById('battle-message').textContent = attackResult;
        return;
    }
    
    // Update the UI
    updateBoards();
    document.querySelector('#battle-message').textContent = `Your attack ${attackResult}`;
    
    // Check if game is over
    if (computer.gameboard.allShipsSunk()) {
        endGame(true); // Player wins
        return;
    }
    
    // Switch to computer's turn
    playerTurn = false;
    document.querySelector('#status-message').textContent = "Computer's Turn";
    
    // Computer makes a move after a short delay
    setTimeout(computerTurn, 1000);
}

function computerTurn() {
    if (!gameInProgress) return;
    
    // Computer makes an attack
    const attackResult = computer.computerPlay(player.gameboard);
    
    // Update the board UI
    updateBoards();
    
    // Update message
    document.querySelector('#battle-message').textContent = 
        `Computer's attack ${attackResult}`;
    
    // Check if game is over
    if (player.gameboard.allShipsSunk()) {
        endGame(false); // Computer wins
        return;
    }
    
    // Switch back to player's turn
    playerTurn = true;
    document.querySelector('#status-message').textContent = "Your Turn";
}

function endGame(playerWon) {
    // Update game state
    gameInProgress = false;
    
    // Display who won
    const message = playerWon ? 
        "Congratulations! You sank all enemy ships!" : 
        "Game Over! The computer sank all your ships!";
    
    document.querySelector('#status-message').textContent = message;
    document.querySelector('#battle-message').textContent = "Game Over";
    
    // Show play again button
    document.querySelector('#play-again').style.display = 'block';
}

function resetGame() {
    // Reset game state
    placedShips = [];
    selectedShip = null;
    gameInProgress = false;
    playerTurn = true;
    
    // Clear all ship selections and placements
    document.querySelectorAll('.ship').forEach(ship => {
        ship.classList.remove('selected', 'placed');
    });
    
    // Reset boards
    const setupBoard = document.querySelector("#setup-board");
    const playerBoard = document.querySelector("#player-board");
    const computerBoard = document.querySelector("#computer-board");
    
    createBoardGrid(setupBoard);
    createBoardGrid(playerBoard);
    createBoardGrid(computerBoard);
    
    // Switch back to setup screen
    document.querySelector('#game-screen').style.display = 'none';
    document.querySelector('#setup-screen').classList.add('active');
    
    // Disable start button until ships are placed
    document.querySelector('#start-game').disabled = true;
    
    // Hide play again button
    document.querySelector('#play-again').style.display = 'none';
}

// Initialize the game when DOM is loaded
document.addEventListener("DOMContentLoaded", initGame);






})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBLG9DQUFvQyxXQUFXO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsc0JBQXNCO0FBQ3BELDhCQUE4QixxQkFBcUI7QUFDbkQ7QUFDQSxhQUFhO0FBQ2I7QUFDQSxnQ0FBZ0MsWUFBWTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsc0JBQXNCO0FBQ3BELDhCQUE4QixxQkFBcUI7QUFDbkQ7QUFDQSxhQUFhO0FBQ2I7QUFDQSxnQ0FBZ0MsWUFBWTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Ysb0RBQW9EO0FBQ3BEO0FBQ0EsK0JBQStCO0FBQy9CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDcEYyQztBQUMzQztBQUNPO0FBQ1A7QUFDQSx5QkFBeUIsb0RBQVM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDaENPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ21IO0FBQ2pCO0FBQ2xHLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsVUFBVTtBQUNWLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTywwRkFBMEYsTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksV0FBVyxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sWUFBWSxNQUFNLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxZQUFZLE1BQU0sVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsT0FBTyxZQUFZLE1BQU0sVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxZQUFZLE1BQU0sVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLHVCQUF1QixhQUFhLHlCQUF5QixPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxZQUFZLE1BQU0sWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sWUFBWSxNQUFNLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksT0FBTyxVQUFVLEtBQUssc0JBQXNCLHVCQUF1Qix1QkFBdUIsT0FBTyxZQUFZLE1BQU0sS0FBSyxZ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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGFBQWE7QUFDMUM7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2RlbHMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kZWxzL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZGVscy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zdHlsZXMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zdHlsZXMvc3R5bGUuY3NzPzI2YzciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBHYW1lYm9hcmQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lR3JpZCA9IEFycmF5LmZyb20oe2xlbmd0aDogMTB9LCAoKSA9PiBBcnJheSgxMCkuZmlsbCgwKSk7XHJcbiAgICAgICAgdGhpcy5wbGFjZWRTaGlwcyA9IFtdO1xyXG4gICAgICAgIHRoaXMubWlzc2VkQXR0YWNrcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFBsYWNlIHNoaXBzIG9uIHRoZSBncmlkXHJcbiAgICBwbGFjZVNoaXAoc2hpcCwgeF9jb3JkLCB5X2NvcmQsIG9yaWVudGF0aW9uKSB7XHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBmaW5hbCBjb29yZGluYXRlcyBvZiB0aGUgc2hpcFxyXG4gICAgICAgIGxldCB4RmluYWwgPSB4X2NvcmQ7XHJcbiAgICAgICAgbGV0IHlGaW5hbCA9IHlfY29yZDtcclxuXHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgJiYgeF9jb3JkICsgc2hpcC5sZW5ndGggPiAxMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyAmJiB5X2NvcmQgKyBzaGlwLmxlbmd0aCA+IDEwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIGFueSBzcGFjZSBpcyBhbHJlYWR5IG9jY3VwaWVkXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnICYmIHRoaXMuZ2FtZUdyaWRbeF9jb3JkICsgaV1beV9jb3JkXSAhPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgJiYgdGhpcy5nYW1lR3JpZFt4X2NvcmRdW3lfY29yZCArIGldICE9PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XHJcbiAgICAgICAgICAgIHhGaW5hbCA9IHhfY29yZCArIHNoaXAubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLnBsYWNlZFNoaXBzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgc2hpcDogc2hpcCxcclxuICAgICAgICAgICAgICAgIHN0YXJ0Q29vcmQ6IHsgeDogeF9jb3JkLCB5OiB5X2NvcmQgfSxcclxuICAgICAgICAgICAgICAgIGZpbmFsQ29vcmQ6IHsgeDogeEZpbmFsLCB5OiB5X2NvcmR9LFxyXG4gICAgICAgICAgICAgICAgb3JpZW50YXRpb246IG9yaWVudGF0aW9uXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0geF9jb3JkOyBpIDwgeEZpbmFsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIFBsYWNlIHRoZSBzaGlwIGJ5IGluaXRpYWxpemluZyBlYWNoIHNwYWNlIHdpdGggdGhlIHNoaXAgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVHcmlkW2ldW3lfY29yZF0gPSBzaGlwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgeyAvLyBWZXJ0aWNhbCBvcmllbnRhdGlvblxyXG4gICAgICAgICAgICB5RmluYWwgPSB5X2NvcmQgKyBzaGlwLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5wbGFjZWRTaGlwcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHNoaXA6IHNoaXAsXHJcbiAgICAgICAgICAgICAgICBzdGFydENvb3JkOiB7IHg6IHhfY29yZCwgeTogeV9jb3JkIH0sXHJcbiAgICAgICAgICAgICAgICBmaW5hbENvb3JkOiB7IHg6IHhfY29yZCwgeTogeUZpbmFsfSxcclxuICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IHlfY29yZDsgaSA8IHlGaW5hbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBQbGFjZSB0aGUgc2hpcCBieSBpbml0aWFsaXppbmcgZWFjaCBzcGFjZSB3aXRoIHRoZSBzaGlwIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lR3JpZFt4X2NvcmRdW2ldID0gc2hpcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWNlaXZlQXR0YWNrKHhfY29yZCwgeV9jb3JkKSB7XHJcbiAgICAgICAgLy8gRmlyc3QgY2hlY2sgaWYgdGhlIGNvb3JkaW5hdGVzIGFyZSB3aXRoaW4gdGhlIGdyaWRcclxuICAgICAgICBpZih4X2NvcmQgPCAwIHx8IHhfY29yZCA+PSAxMCB8fCB5X2NvcmQgPCAwIHx8IHlfY29yZCA+PSAxMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ0ludmFsaWQgY29vcmRpbmF0ZXMnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhlbiBjaGVjayBpZiB0aGUgY2VsbCBoYXMgYmVlbiBzaG90IGJlZm9yZVxyXG4gICAgICAgIGlmKHRoaXMuZ2FtZUdyaWRbeF9jb3JkXVt5X2NvcmRdID09PSAnaGl0JyB8fCB0aGlzLmdhbWVHcmlkW3hfY29yZF1beV9jb3JkXSA9PT0gJ21pc3MnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnVGhpcyBjZWxsIGhhcyBiZWVuIHNob3QgYmVmb3JlJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIGl0J3Mgbm90IDAsIHRoZW4gdGhlcmUgaXMgYSBzaGlwLCBsb2cgdGhlIGhpdFxyXG4gICAgICAgIGlmKHRoaXMuZ2FtZUdyaWRbeF9jb3JkXVt5X2NvcmRdICE9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lR3JpZFt4X2NvcmRdW3lfY29yZF0uaGl0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUdyaWRbeF9jb3JkXVt5X2NvcmRdID0gJ2hpdCc7XHJcbiAgICAgICAgICAgIHJldHVybiAnU2hpcCB3YXMgaGl0JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsc2UgeyAvLyBMb2cgdGhlIG1pc3Npbmcgc2hvdFxyXG4gICAgICAgICAgICB0aGlzLmdhbWVHcmlkW3hfY29yZF1beV9jb3JkXSA9ICdtaXNzJzsgLy8gVG8gdHJhY2sgdGhhdCB0aGUgY2VsbCBoYXMgYmVlbiBoaXRcclxuICAgICAgICAgICAgdGhpcy5taXNzZWRBdHRhY2tzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IHsgeDogeF9jb3JkLCB5OiB5X2NvcmR9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiAnTWlzc2VkISc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIGlmIGFsbCB0aGUgc2hpcHMgc3Vua1xyXG4gICAgYWxsU2hpcHNTdW5rKCkge1xyXG4gICAgICAgIC8vIElmIGV2ZXJ5IHNoaXAgc3VuaywgdGhlbiBhbGwgc2hpcHMgc3Vua1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBsYWNlZFNoaXBzLmV2ZXJ5KChzaGlwRGF0YSkgPT4gc2hpcERhdGEuc2hpcC5pc1N1bmsoKSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL0dhbWVib2FyZC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3Rvcihpc0NvbXB1dGVyID0gZmFsc2UpIHtcclxuICAgIHRoaXMuZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gICAgdGhpcy5pc0NvbXB1dGVyID0gaXNDb21wdXRlcjtcclxuICB9XHJcbiAgXHJcbiAgLy8gTWV0aG9kIGZvciBhdHRhY2tpbmcgdGhlIGVuZW15J3MgYm9hcmRcclxuICBhdHRhY2soeCwgeSwgZW5lbXlHYW1lYm9hcmQpIHtcclxuICAgIHJldHVybiBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xyXG4gIH1cclxuICBcclxuICAvLyBGb3IgY29tcHV0ZXIgcGxheWVycyB0byBtYWtlIGF1dG9tYXRpYyBtb3Zlc1xyXG4gIGNvbXB1dGVyUGxheShlbmVteUdhbWVib2FyZCkge1xyXG4gICAgLy8gSWYgdGhpcyBpcyBhIGh1bWFuIHBsYXllciwgZG8gbm90aGluZ1xyXG4gICAgaWYgKCF0aGlzLmlzQ29tcHV0ZXIpIHJldHVybiBudWxsO1xyXG4gICAgXHJcbiAgICAvLyBHZW5lcmF0ZSByYW5kb20gY29vcmRpbmF0ZXMgdW50aWwgYSBsZWdhbCBtb3ZlIGlzIGZvdW5kXHJcbiAgICBsZXQgeCA9IC0xO1xyXG4gICAgbGV0IHkgPSAtMTtcclxuICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgXHJcbiAgICAvLyBJZiB0aGUgY2VsbCBoYXMgYmVlbiBhdHRhY2tlZCwgdHJ5IGFnYWluXHJcbiAgICBpZihlbmVteUdhbWVib2FyZC5nYW1lR3JpZFt4XVt5XSA9PT0gJ2hpdCcgfHwgZW5lbXlHYW1lYm9hcmQuZ2FtZUdyaWRbeF1beV0gPT09ICdtaXNzJykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbXB1dGVyUGxheShlbmVteUdhbWVib2FyZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgbm90LCBtYWtlIGFuIGF0dGFja1xyXG4gICAgcmV0dXJuIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFNoaXAge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxlbmd0aCwgdGltZXNIaXQgPSAwLCBzdW5rID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICB0aGlzLnRpbWVzSGl0ID0gdGltZXNIaXQ7XHJcbiAgICAgICAgdGhpcy5zdW5rID0gc3VuaztcclxuICAgIH0gXHJcblxyXG4gICAgaGl0KCkge1xyXG4gICAgICAgIHRoaXMudGltZXNIaXQrKztcclxuICAgIH1cclxuXHJcbiAgICBpc1N1bmsoKSB7XHJcbiAgICAgICAgaWYodGhpcy5sZW5ndGggPT09IHRoaXMudGltZXNIaXQpIHtcclxuICAgICAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKiBCYXNlIFN0eWxlcyAqL1xyXG46cm9vdCB7XHJcbiAgICAtLXByaW1hcnktYmc6ICMwYTE5Mjk7XHJcbiAgICAtLXNlY29uZGFyeS1iZzogIzBmMjk0MjtcclxuICAgIC0tYm9hcmQtYmc6ICMxYTNhNWE7XHJcbiAgICAtLWdyaWQtYm9yZGVyOiAjMmE0YTZhO1xyXG4gICAgLS10ZXh0LWNvbG9yOiAjZTBmN2ZhO1xyXG4gICAgLS1hY2NlbnQtY29sb3I6ICMwMGU1ZmY7XHJcbiAgICAtLXNoaXAtY29sb3I6ICM2NGZmZGE7XHJcbiAgICAtLXNoaXAtcHJldmlldzogcmdiYSgxMDAsIDI1NSwgMjE4LCAwLjMpO1xyXG4gICAgLS1oaXQtY29sb3I6ICNmZjUyNTI7XHJcbiAgICAtLW1pc3MtY29sb3I6ICM3ODkwOWM7XHJcbiAgICAtLWludmFsaWQtcGxhY2VtZW50OiByZ2JhKDI1NSwgODIsIDgyLCAwLjQpO1xyXG59XHJcblxyXG4qIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG5ib2R5IHtcclxuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnktYmcpO1xyXG4gICAgY29sb3I6IHZhcigtLXRleHQtY29sb3IpO1xyXG4gICAgbWluLWhlaWdodDogMTAwdmg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAyMHB4O1xyXG59XHJcblxyXG5oMSwgaDIsIGgzIHtcclxuICAgIGZvbnQtZmFtaWx5OiAnT3JiaXRyb24nLCBzYW5zLXNlcmlmO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5oMSB7XHJcbiAgICBmb250LXNpemU6IDNyZW07XHJcbiAgICBsZXR0ZXItc3BhY2luZzogNHB4O1xyXG4gICAgbWFyZ2luOiAyMHB4IDA7XHJcbiAgICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggdmFyKC0tYWNjZW50LWNvbG9yKTtcclxuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3IpO1xyXG59XHJcblxyXG5oMiB7XHJcbiAgICBmb250LXNpemU6IDEuOHJlbTtcclxuICAgIG1hcmdpbjogMTVweCAwO1xyXG59XHJcblxyXG5oMyB7XHJcbiAgICBmb250LXNpemU6IDEuMnJlbTtcclxuICAgIG1hcmdpbjogMTBweCAwO1xyXG59XHJcblxyXG4uZ2FtZS1jb250YWluZXIge1xyXG4gICAgbWF4LXdpZHRoOiAxMjAwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLyogQnV0dG9uIFN0eWxlcyAqL1xyXG4uYnRuIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgY29sb3I6IHZhcigtLWFjY2VudC1jb2xvcik7XHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1hY2NlbnQtY29sb3IpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgcGFkZGluZzogOHB4IDE2cHg7XHJcbiAgICBmb250LXNpemU6IDFyZW07XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xyXG4gICAgZm9udC1mYW1pbHk6ICdPcmJpdHJvbicsIHNhbnMtc2VyaWY7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMXB4O1xyXG59XHJcblxyXG4uYnRuOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTAwLCAyNTUsIDIxOCwgMC4xKTtcclxufVxyXG5cclxuLmJ0bjpkaXNhYmxlZCB7XHJcbiAgICBvcGFjaXR5OiAwLjU7XHJcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xyXG59XHJcblxyXG4ucHJpbWFyeS1idG4ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMDAsIDI1NSwgMjE4LCAwLjEpO1xyXG4gICAgZm9udC1zaXplOiAxLjJyZW07XHJcbiAgICBwYWRkaW5nOiAxMHB4IDI0cHg7XHJcbn1cclxuXHJcbi8qIEdhbWUgU2NyZWVucyAqL1xyXG4jc2V0dXAtc2NyZWVuLCAjZ2FtZS1zY3JlZW4sICNnYW1lLW92ZXIge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbiNzZXR1cC1zY3JlZW4uYWN0aXZlIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbn1cclxuXHJcbiNnYW1lLW92ZXIge1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMCwgMjUsIDQxLCAwLjkpO1xyXG4gICAgei1pbmRleDogMTA7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLmdhbWUtb3Zlci1jb250ZW50IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNlY29uZGFyeS1iZyk7XHJcbiAgICBwYWRkaW5nOiA0MHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWFjY2VudC1jb2xvcik7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgMzBweCB2YXIoLS1hY2NlbnQtY29sb3IpO1xyXG59XHJcblxyXG4vKiBTZXR1cCBTY3JlZW4gKi9cclxuLmNvbnRyb2xzIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBnYXA6IDIwcHg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIG1hcmdpbjogMTVweCAwO1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG59XHJcblxyXG4ub3JpZW50YXRpb24tY29udHJvbCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZ2FwOiAyMHB4O1xyXG59XHJcblxyXG4ub3JpZW50YXRpb24tY29udHJvbCBsYWJlbCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLm9yaWVudGF0aW9uLWNvbnRyb2wgc3BhbiB7XHJcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG59XHJcblxyXG4uc2V0dXAtY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgIGdhcDogNDBweDtcclxuICAgIG1hcmdpbjogMjBweCAwO1xyXG59XHJcblxyXG4vKiBTaGlwIFNlbGVjdGlvbiAqL1xyXG4uc2hpcC1zZWxlY3Rpb24ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBnYXA6IDEwcHg7XHJcbn1cclxuXHJcbi5zaGlwLWxpc3Qge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBnYXA6IDE1cHg7XHJcbn1cclxuXHJcbi5zaGlwIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNlY29uZGFyeS1iZyk7XHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1ncmlkLWJvcmRlcik7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcclxufVxyXG5cclxuLnNoaXA6aG92ZXIge1xyXG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3IpO1xyXG59XHJcblxyXG4uc2hpcC5zZWxlY3RlZCB7XHJcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWFjY2VudC1jb2xvcik7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEwMCwgMjU1LCAyMTgsIDAuMSk7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xyXG59XHJcblxyXG4uc2hpcC5wbGFjZWQge1xyXG4gICAgb3BhY2l0eTogMC41O1xyXG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcclxufVxyXG5cclxuLnNoaXAtbmFtZSB7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcclxufVxyXG5cclxuLnNoaXAtdW5pdHMge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGdhcDogMnB4O1xyXG59XHJcblxyXG4udW5pdCB7XHJcbiAgICB3aWR0aDogMjBweDtcclxuICAgIGhlaWdodDogMjBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNoaXAtY29sb3IpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xyXG59XHJcblxyXG4vKiBHYW1lIEJvYXJkcyAqL1xyXG4uYm9hcmRzLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICBnYXA6IDQwcHg7XHJcbiAgICBtYXJnaW46IDIwcHggMDtcclxufVxyXG5cclxuLmJvYXJkLXdyYXBwZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uYm9hcmQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCA0MHB4KTtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCA0MHB4KTtcclxuICAgIGdhcDogM3B4OyBcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyaWQtYm9yZGVyKTtcclxuICAgIHBhZGRpbmc6IDVweDsgLyogSW5jcmVhc2VkIHBhZGRpbmcgKi9cclxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWdyaWQtYm9yZGVyKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDsgLyogQWRkZWQgcm91bmRlZCBjb3JuZXJzICovXHJcbn1cclxuXHJcbi5jZWxsIHtcclxuICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYm9hcmQtYmcpO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDEwMCwgMjU1LCAyMTgsIDAuMyk7IFxyXG4gICAgYm9yZGVyLXJhZGl1czogMnB4OyBcclxufVxyXG5cclxuLngtY29vcmRpbmF0ZXMge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIG1hcmdpbi1sZWZ0OiAyOHB4OyBcclxuICAgIGhlaWdodDogMjVweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcclxufVxyXG5cclxuLnktY29vcmRpbmF0ZXMge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICB3aWR0aDogMjVweDtcclxuICAgIG1hcmdpbi1yaWdodDogNXB4O1xyXG59XHJcblxyXG4uYm9hcmQtd2l0aC1jb29yZGluYXRlcyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLmNvb3JkaW5hdGVzIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3IpO1xyXG59XHJcblxyXG4ueC1jb29yZGluYXRlcyBkaXYge1xyXG4gICAgd2lkdGg6IDQzcHg7IFxyXG4gICAgaGVpZ2h0OiAyNXB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMS41cHgpO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbi55LWNvb3JkaW5hdGVzIGRpdiB7XHJcbiAgICB3aWR0aDogMjVweDtcclxuICAgIGhlaWdodDogNDNweDsgXHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjVweCk7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLmNlbGw6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMDAsIDI1NSwgMjE4LCAwLjEpO1xyXG59XHJcblxyXG4vKiBDZWxsIFN0YXRlcyAqL1xyXG4uY2VsbC5zaGlwIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNoaXAtY29sb3IpO1xyXG59XHJcblxyXG4uY2VsbC5wcmV2aWV3IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNoaXAtcHJldmlldyk7XHJcbn1cclxuXHJcbi5jZWxsLmludmFsaWQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW52YWxpZC1wbGFjZW1lbnQpO1xyXG59XHJcblxyXG4uY2VsbC5oaXQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taGl0LWNvbG9yKTtcclxuICAgIGFuaW1hdGlvbjogcHVsc2UgMC41cztcclxufVxyXG5cclxuLmNlbGwuaGl0OjphZnRlciB7XHJcbiAgICBjb250ZW50OiAnw5cnO1xyXG4gICAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLmNlbGwubWlzcyB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1taXNzLWNvbG9yKTtcclxufVxyXG5cclxuLmNlbGwubWlzczo6YWZ0ZXIge1xyXG4gICAgY29udGVudDogJ+KAoic7XHJcbiAgICBmb250LXNpemU6IDEuNXJlbTtcclxufVxyXG5cclxuLyogR2FtZSBTdGF0dXMgKi9cclxuLmdhbWUtc3RhdHVzIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG1hcmdpbjogMTVweCAwO1xyXG59XHJcblxyXG4jYmF0dGxlLW1lc3NhZ2Uge1xyXG4gICAgbWluLWhlaWdodDogMjRweDtcclxuICAgIG1hcmdpbjogMTBweCAwO1xyXG4gICAgZm9udC1zaXplOiAxLjFyZW07XHJcbn1cclxuXHJcbi8qIEFuaW1hdGlvbnMgKi9cclxuQGtleWZyYW1lcyBwdWxzZSB7XHJcbiAgICAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMSk7IH1cclxuICAgIDUwJSB7IHRyYW5zZm9ybTogc2NhbGUoMS4xKTsgfVxyXG4gICAgMTAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMSk7IH1cclxufVxyXG5cclxuLyogUmVzcG9uc2l2ZSBBZGp1c3RtZW50cyAqL1xyXG5AbWVkaWEgKG1heC13aWR0aDogOTAwcHgpIHtcclxuICAgIC5ib2FyZHMtY29udGFpbmVyLCAuc2V0dXAtY29udGFpbmVyIHtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5zaGlwLXNlbGVjdGlvbiB7XHJcbiAgICAgICAgb3JkZXI6IDI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5ib2FyZC1jb250YWluZXIge1xyXG4gICAgICAgIG9yZGVyOiAxO1xyXG4gICAgfVxyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcclxuICAgIGgxIHtcclxuICAgICAgICBmb250LXNpemU6IDIuMnJlbTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmJvYXJkIHtcclxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMjVweCk7XHJcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDI1cHgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuY2VsbCB7XHJcbiAgICAgICAgd2lkdGg6IDI1cHg7XHJcbiAgICAgICAgaGVpZ2h0OiAyNXB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAueC1jb29yZGluYXRlcyBkaXYsIC55LWNvb3JkaW5hdGVzIGRpdiB7XHJcbiAgICAgICAgd2lkdGg6IDI1cHg7XHJcbiAgICAgICAgaGVpZ2h0OiAyNXB4O1xyXG4gICAgfVxyXG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zdHlsZXMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLGdCQUFnQjtBQUNoQjtJQUNJLHFCQUFxQjtJQUNyQix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixxQkFBcUI7SUFDckIsdUJBQXVCO0lBQ3ZCLHFCQUFxQjtJQUNyQix3Q0FBd0M7SUFDeEMsb0JBQW9CO0lBQ3BCLHFCQUFxQjtJQUNyQiwyQ0FBMkM7QUFDL0M7O0FBRUE7SUFDSSxTQUFTO0lBQ1QsVUFBVTtJQUNWLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGlDQUFpQztJQUNqQyxtQ0FBbUM7SUFDbkMsd0JBQXdCO0lBQ3hCLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxtQ0FBbUM7SUFDbkMsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLG1CQUFt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Q0ksdUNBQXVDO1FBQ3ZDLG9DQUFvQztJQUN4Qzs7SUFFQTtRQUNJLFdBQVc7UUFDWCxZQUFZO0lBQ2hCOztJQUVBO1FBQ0ksV0FBVztRQUNYLFlBQVk7SUFDaEI7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBCYXNlIFN0eWxlcyAqL1xcclxcbjpyb290IHtcXHJcXG4gICAgLS1wcmltYXJ5LWJnOiAjMGExOTI5O1xcclxcbiAgICAtLXNlY29uZGFyeS1iZzogIzBmMjk0MjtcXHJcXG4gICAgLS1ib2FyZC1iZzogIzFhM2E1YTtcXHJcXG4gICAgLS1ncmlkLWJvcmRlcjogIzJhNGE2YTtcXHJcXG4gICAgLS10ZXh0LWNvbG9yOiAjZTBmN2ZhO1xcclxcbiAgICAtLWFjY2VudC1jb2xvcjogIzAwZTVmZjtcXHJcXG4gICAgLS1zaGlwLWNvbG9yOiAjNjRmZmRhO1xcclxcbiAgICAtLXNoaXAtcHJldmlldzogcmdiYSgxMDAsIDI1NSwgMjE4LCAwLjMpO1xcclxcbiAgICAtLWhpdC1jb2xvcjogI2ZmNTI1MjtcXHJcXG4gICAgLS1taXNzLWNvbG9yOiAjNzg5MDljO1xcclxcbiAgICAtLWludmFsaWQtcGxhY2VtZW50OiByZ2JhKDI1NSwgODIsIDgyLCAwLjQpO1xcclxcbn1cXHJcXG5cXHJcXG4qIHtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcmltYXJ5LWJnKTtcXHJcXG4gICAgY29sb3I6IHZhcigtLXRleHQtY29sb3IpO1xcclxcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIHBhZGRpbmc6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbmgxLCBoMiwgaDMge1xcclxcbiAgICBmb250LWZhbWlseTogJ09yYml0cm9uJywgc2Fucy1zZXJpZjtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogM3JlbTtcXHJcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDRweDtcXHJcXG4gICAgbWFyZ2luOiAyMHB4IDA7XFxyXFxuICAgIHRleHQtc2hhZG93OiAwIDAgMTBweCB2YXIoLS1hY2NlbnQtY29sb3IpO1xcclxcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yKTtcXHJcXG59XFxyXFxuXFxyXFxuaDIge1xcclxcbiAgICBmb250LXNpemU6IDEuOHJlbTtcXHJcXG4gICAgbWFyZ2luOiAxNXB4IDA7XFxyXFxufVxcclxcblxcclxcbmgzIHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxyXFxuICAgIG1hcmdpbjogMTBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uZ2FtZS1jb250YWluZXIge1xcclxcbiAgICBtYXgtd2lkdGg6IDEyMDBweDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi8qIEJ1dHRvbiBTdHlsZXMgKi9cXHJcXG4uYnRuIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3IpO1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1hY2NlbnQtY29sb3IpO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxyXFxuICAgIHBhZGRpbmc6IDhweCAxNnB4O1xcclxcbiAgICBmb250LXNpemU6IDFyZW07XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXHJcXG4gICAgZm9udC1mYW1pbHk6ICdPcmJpdHJvbicsIHNhbnMtc2VyaWY7XFxyXFxuICAgIGxldHRlci1zcGFjaW5nOiAxcHg7XFxyXFxufVxcclxcblxcclxcbi5idG46aG92ZXIge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEwMCwgMjU1LCAyMTgsIDAuMSk7XFxyXFxufVxcclxcblxcclxcbi5idG46ZGlzYWJsZWQge1xcclxcbiAgICBvcGFjaXR5OiAwLjU7XFxyXFxuICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxyXFxufVxcclxcblxcclxcbi5wcmltYXJ5LWJ0biB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTAwLCAyNTUsIDIxOCwgMC4xKTtcXHJcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxyXFxuICAgIHBhZGRpbmc6IDEwcHggMjRweDtcXHJcXG59XFxyXFxuXFxyXFxuLyogR2FtZSBTY3JlZW5zICovXFxyXFxuI3NldHVwLXNjcmVlbiwgI2dhbWUtc2NyZWVuLCAjZ2FtZS1vdmVyIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbiNzZXR1cC1zY3JlZW4uYWN0aXZlIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuI2dhbWUtb3ZlciB7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEwLCAyNSwgNDEsIDAuOSk7XFxyXFxuICAgIHotaW5kZXg6IDEwO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUtb3Zlci1jb250ZW50IHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2Vjb25kYXJ5LWJnKTtcXHJcXG4gICAgcGFkZGluZzogNDBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1hY2NlbnQtY29sb3IpO1xcclxcbiAgICBib3gtc2hhZG93OiAwIDAgMzBweCB2YXIoLS1hY2NlbnQtY29sb3IpO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTZXR1cCBTY3JlZW4gKi9cXHJcXG4uY29udHJvbHMge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBnYXA6IDIwcHg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBtYXJnaW46IDE1cHggMDtcXHJcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcclxcbn1cXHJcXG5cXHJcXG4ub3JpZW50YXRpb24tY29udHJvbCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGdhcDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm9yaWVudGF0aW9uLWNvbnRyb2wgbGFiZWwge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5vcmllbnRhdGlvbi1jb250cm9sIHNwYW4ge1xcclxcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2V0dXAtY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gICAgZ2FwOiA0MHB4O1xcclxcbiAgICBtYXJnaW46IDIwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogU2hpcCBTZWxlY3Rpb24gKi9cXHJcXG4uc2hpcC1zZWxlY3Rpb24ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBnYXA6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLWxpc3Qge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBnYXA6IDE1cHg7XFxyXFxufVxcclxcblxcclxcbi5zaGlwIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2Vjb25kYXJ5LWJnKTtcXHJcXG4gICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tZ3JpZC1ib3JkZXIpO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHg7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXA6aG92ZXIge1xcclxcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWFjY2VudC1jb2xvcik7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLnNlbGVjdGVkIHtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3IpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEwMCwgMjU1LCAyMTgsIDAuMSk7XFxyXFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLnBsYWNlZCB7XFxyXFxuICAgIG9wYWNpdHk6IDAuNTtcXHJcXG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXAtbmFtZSB7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLXVuaXRzIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZ2FwOiAycHg7XFxyXFxufVxcclxcblxcclxcbi51bml0IHtcXHJcXG4gICAgd2lkdGg6IDIwcHg7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2hpcC1jb2xvcik7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcXHJcXG59XFxyXFxuXFxyXFxuLyogR2FtZSBCb2FyZHMgKi9cXHJcXG4uYm9hcmRzLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxuICAgIGdhcDogNDBweDtcXHJcXG4gICAgbWFyZ2luOiAyMHB4IDA7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC13cmFwcGVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDQwcHgpO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgNDBweCk7XFxyXFxuICAgIGdhcDogM3B4OyBcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1ib3JkZXIpO1xcclxcbiAgICBwYWRkaW5nOiA1cHg7IC8qIEluY3JlYXNlZCBwYWRkaW5nICovXFxyXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWdyaWQtYm9yZGVyKTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4OyAvKiBBZGRlZCByb3VuZGVkIGNvcm5lcnMgKi9cXHJcXG59XFxyXFxuXFxyXFxuLmNlbGwge1xcclxcbiAgICB3aWR0aDogNDBweDtcXHJcXG4gICAgaGVpZ2h0OiA0MHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ib2FyZC1iZyk7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMTAwLCAyNTUsIDIxOCwgMC4zKTsgXFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDJweDsgXFxyXFxufVxcclxcblxcclxcbi54LWNvb3JkaW5hdGVzIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDI4cHg7IFxcclxcbiAgICBoZWlnaHQ6IDI1cHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLnktY29vcmRpbmF0ZXMge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICB3aWR0aDogMjVweDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC13aXRoLWNvb3JkaW5hdGVzIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNvb3JkaW5hdGVzIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZm9udC1zaXplOiAwLjlyZW07XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtY29sb3IpO1xcclxcbn1cXHJcXG5cXHJcXG4ueC1jb29yZGluYXRlcyBkaXYge1xcclxcbiAgICB3aWR0aDogNDNweDsgXFxyXFxuICAgIGhlaWdodDogMjVweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMS41cHgpO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG4ueS1jb29yZGluYXRlcyBkaXYge1xcclxcbiAgICB3aWR0aDogMjVweDtcXHJcXG4gICAgaGVpZ2h0OiA0M3B4OyBcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMS41cHgpO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG4uY2VsbDpob3ZlciB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTAwLCAyNTUsIDIxOCwgMC4xKTtcXHJcXG59XFxyXFxuXFxyXFxuLyogQ2VsbCBTdGF0ZXMgKi9cXHJcXG4uY2VsbC5zaGlwIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2hpcC1jb2xvcik7XFxyXFxufVxcclxcblxcclxcbi5jZWxsLnByZXZpZXcge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zaGlwLXByZXZpZXcpO1xcclxcbn1cXHJcXG5cXHJcXG4uY2VsbC5pbnZhbGlkIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW52YWxpZC1wbGFjZW1lbnQpO1xcclxcbn1cXHJcXG5cXHJcXG4uY2VsbC5oaXQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1oaXQtY29sb3IpO1xcclxcbiAgICBhbmltYXRpb246IHB1bHNlIDAuNXM7XFxyXFxufVxcclxcblxcclxcbi5jZWxsLmhpdDo6YWZ0ZXIge1xcclxcbiAgICBjb250ZW50OiAnw5cnO1xcclxcbiAgICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbi5jZWxsLm1pc3Mge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1taXNzLWNvbG9yKTtcXHJcXG59XFxyXFxuXFxyXFxuLmNlbGwubWlzczo6YWZ0ZXIge1xcclxcbiAgICBjb250ZW50OiAn4oCiJztcXHJcXG4gICAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxufVxcclxcblxcclxcbi8qIEdhbWUgU3RhdHVzICovXFxyXFxuLmdhbWUtc3RhdHVzIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBtYXJnaW46IDE1cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuI2JhdHRsZS1tZXNzYWdlIHtcXHJcXG4gICAgbWluLWhlaWdodDogMjRweDtcXHJcXG4gICAgbWFyZ2luOiAxMHB4IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBBbmltYXRpb25zICovXFxyXFxuQGtleWZyYW1lcyBwdWxzZSB7XFxyXFxuICAgIDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgfVxcclxcbiAgICA1MCUgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7IH1cXHJcXG4gICAgMTAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMSk7IH1cXHJcXG59XFxyXFxuXFxyXFxuLyogUmVzcG9uc2l2ZSBBZGp1c3RtZW50cyAqL1xcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA5MDBweCkge1xcclxcbiAgICAuYm9hcmRzLWNvbnRhaW5lciwgLnNldHVwLWNvbnRhaW5lciB7XFxyXFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgfVxcclxcbiAgICBcXHJcXG4gICAgLnNoaXAtc2VsZWN0aW9uIHtcXHJcXG4gICAgICAgIG9yZGVyOiAyO1xcclxcbiAgICB9XFxyXFxuICAgIFxcclxcbiAgICAuYm9hcmQtY29udGFpbmVyIHtcXHJcXG4gICAgICAgIG9yZGVyOiAxO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcclxcbiAgICBoMSB7XFxyXFxuICAgICAgICBmb250LXNpemU6IDIuMnJlbTtcXHJcXG4gICAgfVxcclxcbiAgICBcXHJcXG4gICAgLmJvYXJkIHtcXHJcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAyNXB4KTtcXHJcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAyNXB4KTtcXHJcXG4gICAgfVxcclxcbiAgICBcXHJcXG4gICAgLmNlbGwge1xcclxcbiAgICAgICAgd2lkdGg6IDI1cHg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDI1cHg7XFxyXFxuICAgIH1cXHJcXG4gICAgXFxyXFxuICAgIC54LWNvb3JkaW5hdGVzIGRpdiwgLnktY29vcmRpbmF0ZXMgZGl2IHtcXHJcXG4gICAgICAgIHdpZHRoOiAyNXB4O1xcclxcbiAgICAgICAgaGVpZ2h0OiAyNXB4O1xcclxcbiAgICB9XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xub3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuLi9zdHlsZXMvc3R5bGUuY3NzJztcclxuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vbW9kZWxzL1NoaXAuanMnO1xyXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL21vZGVscy9HYW1lYm9hcmQuanMnO1xyXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL21vZGVscy9QbGF5ZXIuanMnO1xyXG5cclxuLy8gR2FtZSBzdGF0ZVxyXG5sZXQgcGxheWVyLCBjb21wdXRlcjsgXHJcbmxldCBzZWxlY3RlZFNoaXAgPSBudWxsOyBcclxubGV0IG9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnOyBcclxubGV0IHBsYWNlZFNoaXBzID0gW107XHJcbmxldCBnYW1lSW5Qcm9ncmVzcyA9IGZhbHNlOyBcclxubGV0IHBsYXllclR1cm4gPSB0cnVlOyBcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkR3JpZChib2FyZEVsZW1lbnQpIHtcclxuICAgIC8vIENsZWFyIGFueSBleGlzdGluZyBjZWxsc1xyXG4gICAgYm9hcmRFbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG4gICAgLy8gQ3JlYXRlIDEweDEwIGdyaWQgb2YgY2VsbHMgd2l0aCBkYXRhIGF0dHJpYnV0ZXMgZm9yIGNvb3JkaW5hdGVzXHJcbiAgICBmb3IobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xyXG4gICAgICAgIGZvcihsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xyXG4gICAgICAgICAgICBjZWxsLmRhdGFzZXQueCA9IHg7XHJcbiAgICAgICAgICAgIGNlbGwuZGF0YXNldC55ID0geTtcclxuICAgICAgICAgICAgYm9hcmRFbGVtZW50LmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICAgIH1cclxuICAgIH0gICAgICBcclxufVxyXG5cclxuLy8gSW5pdGlhbGl6ZSB0aGUgZ2FtZVxyXG5mdW5jdGlvbiBpbml0R2FtZSgpIHtcclxuICAgIC8vIFNlbGVjdCB0aGUgYm9hcmQgZWxlbWVudHNcclxuICAgIGNvbnN0IHNldHVwQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NldHVwLWJvYXJkXCIpO1xyXG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllci1ib2FyZFwiKTtcclxuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbXB1dGVyLWJvYXJkXCIpO1xyXG5cclxuICAgIC8vIEluaXRpYWxpemUgZ3JpZHMgZm9yIGVhY2ggb2YgdGhlIGJvYXJkc1xyXG4gICAgY3JlYXRlQm9hcmRHcmlkKHNldHVwQm9hcmQpO1xyXG4gICAgY3JlYXRlQm9hcmRHcmlkKHBsYXllckJvYXJkKTtcclxuICAgIGNyZWF0ZUJvYXJkR3JpZChjb21wdXRlckJvYXJkKTtcclxuXHJcbiAgICAvLyBXaGVuIHVzZXIgY2xpY2tzIG9uIGEgc2hpcFxyXG4gICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBcIik7XHJcbiAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xyXG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaGlwU2VsZWN0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFRvZ2dsZSBvcmllbnRhdGlvblxyXG4gICAgY29uc3Qgb3JpZW50YXRpb25JbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwib3JpZW50YXRpb25cIl0nKTtcclxuICAgIG9yaWVudGF0aW9uSW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xyXG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9yaWVudGF0aW9uVG9nZ2xpbmcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU2V0dXAgYm9hcmQgaG92ZXIgZXZlbnRzIGZvciBzaGlwIHBsYWNlbWVudCBwcmV2aWV3XHJcbiAgICBzZXR1cEJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHNob3dQbGFjZW1lbnRQcmV2aWV3KTtcclxuICAgIHNldHVwQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBjbGVhclBsYWNlbWVudFByZXZpZXcpO1xyXG4gICAgc2V0dXBCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCk7XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0LWdhbWUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlN0YXJ0IGdhbWUgYnV0dG9uIGNsaWNrZWRcIik7XHJcbiAgICAgICAgc3RhcnRHYW1lKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzZXQtcGxhY2VtZW50JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXNldCBidXR0b24gY2xpY2tlZFwiKTtcclxuICAgICAgICByZXNldFBsYWNlbWVudCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29tcHV0ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVBsYXllckF0dGFjayk7XHJcblxyXG4gICAgLy8gQWRkIHBsYXkgYWdhaW4gYnV0dG9uIGZ1bmN0aW9uYWxpdHlcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5LWFnYWluJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXNldEdhbWUpO1xyXG4gICAgXHJcbiAgICAvLyBBZGQgcmFuZG9tIHBsYWNlbWVudCBidXR0b24gZnVuY3Rpb25hbGl0eVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JhbmRvbS1wbGFjZW1lbnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJhbmRvbVBsYWNlbWVudCk7XHJcbiAgICBcclxuICAgIC8vIEFkZCByZXNldCBidXR0b24gZnVuY3Rpb25hbGl0eVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc2V0LXBsYWNlbWVudCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVzZXRQbGFjZW1lbnQpO1xyXG4gICAgXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LWdhbWUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlc2V0R2FtZSk7XHJcbiAgICBcclxuICAgIC8vIEluaXRpYWwgc2V0dXAgLSBoaWRlIGdhbWUgc2NyZWVuLCBzaG93IHNldHVwIHNjcmVlblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtc2NyZWVuJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZXR1cC1zY3JlZW4nKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5LWFnYWluJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIFxyXG4gICAgLy8gRGlzYWJsZSBzdGFydCBidXR0b24gdW50aWwgc2hpcHMgYXJlIHBsYWNlZFxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0LWdhbWUnKS5kaXNhYmxlZCA9IHRydWU7XHJcbn1cclxuXHJcbi8vIFNlbGVjdGluZyBzaGlwc1xyXG5mdW5jdGlvbiBzaGlwU2VsZWN0aW9uKGV2ZW50KSB7XHJcbiAgICAvLyBHZXQgdGhlIGNsaWNrZWQgc2hpcCBlbGVtZW50IFxyXG4gICAgY29uc3Qgc2hpcEVsZW1lbnQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgIC8vIFNraXAgaWYgdGhlIHNoaXAgaXMgYWxyZWFkeSBwbGFjZWRcclxuICAgIGlmIChzaGlwRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3BsYWNlZCcpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSAnc2VsZWN0ZWQnIGNsYXNzIGZyb20gYWxsIHNoaXBzIFxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAnKS5mb3JFYWNoKHNoaXAgPT4ge1xyXG4gICAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgIH0pXHJcblxyXG4gICAgLy8gQWRkICdzZWxlY3RlZCcgY2xhc3MgdG8gY2xpY2tlZCBzaGlwXHJcbiAgICBzaGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG5cclxuICAgIC8vIEV4dHJhY3Qgc2hpcCBkYXRhIGZyb20gZGF0YSBhdHRyaWJ1dGVzIFxyXG4gICAgc2VsZWN0ZWRTaGlwID0ge1xyXG4gICAgICAgIHR5cGU6IHNoaXBFbGVtZW50LmRhdGFzZXQuc2hpcCxcclxuICAgICAgICBsZW5ndGg6IHBhcnNlSW50KHNoaXBFbGVtZW50LmRhdGFzZXQubGVuZ3RoKVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zb2xlLmxvZygnU2VsZWN0ZWQgc2hpcDogJywgc2VsZWN0ZWRTaGlwKTtcclxufVxyXG5cclxuLy8gSGFuZGxlIHRoZSBvcmllbnRhdGlvbiB0b2dnbGluZyBcclxuZnVuY3Rpb24gb3JpZW50YXRpb25Ub2dnbGluZyhldmVudCkge1xyXG4gICAgLy8gVXBkYXRlIHRoZSBnbG9iYWwgdmFyaWFibGVcclxuICAgIG9yaWVudGF0aW9uID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG59XHJcblxyXG4vLyBIaWdobGlnaHQgd2hlcmUgdGhlIHNoaXAgd291bGQgYmUgcGxhY2VkXHJcbmZ1bmN0aW9uIHNob3dQbGFjZW1lbnRQcmV2aWV3KGV2ZW50KSB7XHJcbiAgICAvLyBJZiBubyBzaGlwIGlzIHNlbGVjdGVkIG9yIG5vdCBob3ZlcmluZyBvdmVyIGEgY2VsbCwgZG8gbm90aGluZ1xyXG4gICAgaWYgKCFzZWxlY3RlZFNoaXAgfHwgIWV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gR2V0IGNvb3JkaW5hdGVzIG9mIGhvdmVyZWQgY2VsbFxyXG4gICAgY29uc3QgeCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LngpO1xyXG4gICAgY29uc3QgeSA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LnkpO1xyXG4gICAgXHJcbiAgICAvLyBDbGVhciBhbnkgZXhpc3RpbmcgcHJldmlld3NcclxuICAgIGNsZWFyUGxhY2VtZW50UHJldmlldygpO1xyXG4gICAgXHJcbiAgICAvLyBDYWxjdWxhdGUgd2hpY2ggY2VsbHMgdGhlIHNoaXAgd291bGQgb2NjdXB5XHJcbiAgICBjb25zdCBzaGlwQ2VsbHMgPSBbXTtcclxuICAgIFxyXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICAvLyBTaGlwIGV4dGVuZHMgaG9yaXpvbnRhbGx5IChhbG9uZyB5LWF4aXMgaW4geW91ciBncmlkKVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRTaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh5ICsgaSA8IDEwKSB7IC8vIFN0YXkgd2l0aGluIGJvdW5kc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNzZXR1cC1ib2FyZCAuY2VsbFtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eSArIGl9XCJdYCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNoaXBDZWxscy5wdXNoKGNlbGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHsgLy8gdmVydGljYWxcclxuICAgICAgICAvLyBTaGlwIGV4dGVuZHMgdmVydGljYWxseSAoYWxvbmcgeC1heGlzIGluIHlvdXIgZ3JpZClcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkU2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoeCArIGkgPCAxMCkgeyAvLyBTdGF5IHdpdGhpbiBib3VuZHNcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjc2V0dXAtYm9hcmQgLmNlbGxbZGF0YS14PVwiJHt4ICsgaX1cIl1bZGF0YS15PVwiJHt5fVwiXWApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaGlwQ2VsbHMucHVzaChjZWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgaXNWYWxpZCA9IGlzVmFsaWRQbGFjZW1lbnQoeCwgeSwgc2VsZWN0ZWRTaGlwLmxlbmd0aCwgb3JpZW50YXRpb24pO1xyXG4gICAgXHJcbiAgICBzaGlwQ2VsbHMuZm9yRWFjaChjZWxsID0+IHtcclxuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoaXNWYWxpZCA/ICdwcmV2aWV3JyA6ICdpbnZhbGlkJyk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gQ2xlYXIgYW55IHNoaXAgcGxhY2VtZW50IHByZXZpZXdzXHJcbmZ1bmN0aW9uIGNsZWFyUGxhY2VtZW50UHJldmlldygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNzZXR1cC1ib2FyZCAuY2VsbC5wcmV2aWV3LCAjc2V0dXAtYm9hcmQgLmNlbGwuaW52YWxpZCcpXHJcbiAgICAgICAgLmZvckVhY2goY2VsbCA9PiB7XHJcbiAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgncHJldmlldycsICdpbnZhbGlkJyk7XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbi8vIENoZWNrIGlmIHNoaXAgcGxhY2VtZW50IGlzIHZhbGlkXHJcbmZ1bmN0aW9uIGlzVmFsaWRQbGFjZW1lbnQoeCwgeSwgbGVuZ3RoLCBvcmllbnRhdGlvbikge1xyXG4gICAgLy8gQ2hlY2sgaWYgc2hpcCBpcyB3aXRoaW4gYm9hcmQgYm91bmRhcmllc1xyXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgJiYgeSArIGxlbmd0aCA+IDEwKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgJiYgeCArIGxlbmd0aCA+IDEwKSByZXR1cm4gZmFsc2U7XHJcbiAgICBcclxuICAgIC8vIENoZWNrIGlmIHNoaXAgb3ZlcmxhcHMgd2l0aCBleGlzdGluZyBzaGlwc1xyXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjc2V0dXAtYm9hcmQgLmNlbGxbZGF0YS14PVwiJHt4fVwiXVtkYXRhLXk9XCIke3kgKyBpfVwiXWApO1xyXG4gICAgICAgICAgICBpZiAoY2VsbCAmJiBjZWxsLmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIFNoaXAgb3ZlcmxhcHMgd2l0aCBhbHJlYWR5IHBsYWNlZCBzaGlwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgeyAvLyB2ZXJ0aWNhbFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNzZXR1cC1ib2FyZCAuY2VsbFtkYXRhLXg9XCIke3ggKyBpfVwiXVtkYXRhLXk9XCIke3l9XCJdYCk7XHJcbiAgICAgICAgICAgIGlmIChjZWxsICYmIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaGlwJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gU2hpcCBvdmVybGFwcyB3aXRoIGFscmVhZHkgcGxhY2VkIHNoaXBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYWNlU2hpcChldmVudCkge1xyXG4gICAgLy8gSWYgbm8gc2hpcCBpcyBzZWxlY3RlZCBvciBub3QgY2xpY2tpbmcgb24gYSBjZWxsLCBkbyBub3RoaW5nXHJcbiAgICBpZiAoIXNlbGVjdGVkU2hpcCB8fCAhZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBHZXQgY29vcmRpbmF0ZXMgb2YgY2xpY2tlZCBjZWxsXHJcbiAgICBjb25zdCB4ID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQueCk7XHJcbiAgICBjb25zdCB5ID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQueSk7XHJcbiAgICBcclxuICAgIC8vIENoZWNrIGlmIHBsYWNlbWVudCBpcyB2YWxpZFxyXG4gICAgaWYgKGlzVmFsaWRQbGFjZW1lbnQoeCwgeSwgc2VsZWN0ZWRTaGlwLmxlbmd0aCwgb3JpZW50YXRpb24pKSB7XHJcbiAgICAgICAgLy8gUGxhY2UgdGhlIHNoaXAgb24gdGhlIGJvYXJkXHJcbiAgICAgICAgY29uc3Qgc2hpcENlbGxzID0gW107XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZFNoaXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjc2V0dXAtYm9hcmQgLmNlbGxbZGF0YS14PVwiJHt4fVwiXVtkYXRhLXk9XCIke3kgKyBpfVwiXWApO1xyXG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgICAgICAgICAgICBzaGlwQ2VsbHMucHVzaChjZWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7IC8vIHZlcnRpY2FsXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRTaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3NldHVwLWJvYXJkIC5jZWxsW2RhdGEteD1cIiR7eCArIGl9XCJdW2RhdGEteT1cIiR7eX1cIl1gKTtcclxuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgICAgICAgICAgICAgc2hpcENlbGxzLnB1c2goY2VsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWRkIHRvIHBsYWNlZCBzaGlwcyBhcnJheVxyXG4gICAgICAgIHBsYWNlZFNoaXBzLnB1c2goe1xyXG4gICAgICAgICAgICB0eXBlOiBzZWxlY3RlZFNoaXAudHlwZSxcclxuICAgICAgICAgICAgbGVuZ3RoOiBzZWxlY3RlZFNoaXAubGVuZ3RoLFxyXG4gICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogb3JpZW50YXRpb25cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBNYXJrIHNoaXAgYXMgcGxhY2VkIGluIFVJXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNoaXBbZGF0YS1zaGlwPVwiJHtzZWxlY3RlZFNoaXAudHlwZX1cIl1gKS5jbGFzc0xpc3QuYWRkKCdwbGFjZWQnKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDbGVhciBzZWxlY3Rpb25cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcCcpLmZvckVhY2goc2hpcCA9PiB7XHJcbiAgICAgICAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZWxlY3RlZFNoaXAgPSBudWxsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEVuYWJsZSBzdGFydCBidXR0b24gaWYgYWxsIHNoaXBzIGFyZSBwbGFjZWRcclxuICAgICAgICBpZiAocGxhY2VkU2hpcHMubGVuZ3RoID09PSA1KSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1nYW1lJykuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJhbmRvbVBsYWNlbWVudCgpIHtcclxuICAgIC8vIENsZWFyIGN1cnJlbnQgcGxhY2VtZW50c1xyXG4gICAgcmVzZXRQbGFjZW1lbnQoKTtcclxuICAgIFxyXG4gICAgLy8gU2hpcCBkYXRhICh0eXBlLCBsZW5ndGgpXHJcbiAgICBjb25zdCBzaGlwVHlwZXMgPSBbXHJcbiAgICAgICAgeyB0eXBlOiAnY2FycmllcicsIGxlbmd0aDogNSB9LFxyXG4gICAgICAgIHsgdHlwZTogJ2JhdHRsZXNoaXAnLCBsZW5ndGg6IDQgfSxcclxuICAgICAgICB7IHR5cGU6ICdjcnVpc2VyJywgbGVuZ3RoOiAzIH0sXHJcbiAgICAgICAgeyB0eXBlOiAnc3VibWFyaW5lJywgbGVuZ3RoOiAzIH0sXHJcbiAgICAgICAgeyB0eXBlOiAnZGVzdHJveWVyJywgbGVuZ3RoOiAyIH1cclxuICAgIF07XHJcbiAgICBcclxuICAgIC8vIFBsYWNlIGVhY2ggc2hpcCByYW5kb21seVxyXG4gICAgc2hpcFR5cGVzLmZvckVhY2goc2hpcERhdGEgPT4ge1xyXG4gICAgICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICB3aGlsZSAoIXBsYWNlZCkge1xyXG4gICAgICAgICAgICAvLyBHZW5lcmF0ZSByYW5kb20gcG9zaXRpb24gYW5kIG9yaWVudGF0aW9uXHJcbiAgICAgICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJhbmRvbU9yaWVudGF0aW9uID0gTWF0aC5yYW5kb20oKSA+IDAuNSA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCc7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB2YWxpZCBwbGFjZW1lbnRcclxuICAgICAgICAgICAgaWYgKGlzVmFsaWRQbGFjZW1lbnQoeCwgeSwgc2hpcERhdGEubGVuZ3RoLCByYW5kb21PcmllbnRhdGlvbikpIHtcclxuICAgICAgICAgICAgICAgIC8vIFBsYWNlIHNoaXAgb24gYm9hcmRcclxuICAgICAgICAgICAgICAgIGlmIChyYW5kb21PcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3NldHVwLWJvYXJkIC5jZWxsW2RhdGEteD1cIiR7eH1cIl1bZGF0YS15PVwiJHt5ICsgaX1cIl1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjc2V0dXAtYm9hcmQgLmNlbGxbZGF0YS14PVwiJHt4ICsgaX1cIl1bZGF0YS15PVwiJHt5fVwiXWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIEFkZCB0byBwbGFjZWQgc2hpcHMgYXJyYXlcclxuICAgICAgICAgICAgICAgIHBsYWNlZFNoaXBzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHNoaXBEYXRhLnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBzaGlwRGF0YS5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uOiByYW5kb21PcmllbnRhdGlvblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIE1hcmsgc2hpcCBhcyBwbGFjZWQgaW4gVUlcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zaGlwW2RhdGEtc2hpcD1cIiR7c2hpcERhdGEudHlwZX1cIl1gKS5jbGFzc0xpc3QuYWRkKCdwbGFjZWQnKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcGxhY2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvLyBFbmFibGUgc3RhcnQgYnV0dG9uIHNpbmNlIGFsbCBzaGlwcyBhcmUgcGxhY2VkXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtZ2FtZScpLmRpc2FibGVkID0gZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc2V0UGxhY2VtZW50KCkge1xyXG4gICAgY29uc29sZS5sb2coXCJSZXNldCBwbGFjZW1lbnQgY2xpY2tlZFwiKTtcclxuICAgIC8vIENsZWFyIHNoaXBzIGZyb20gc2V0dXAgYm9hcmRcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNzZXR1cC1ib2FyZCAuY2VsbCcpLmZvckVhY2goY2VsbCA9PiB7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJywgJ3ByZXZpZXcnLCAnaW52YWxpZCcpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vIFJlc2V0IHNoaXAgc2VsZWN0aW9uIFVJXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcCcpLmZvckVhY2goc2hpcCA9PiB7XHJcbiAgICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcsICdwbGFjZWQnKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvLyBSZXNldCBzdGF0ZVxyXG4gICAgcGxhY2VkU2hpcHMgPSBbXTtcclxuICAgIHNlbGVjdGVkU2hpcCA9IG51bGw7XHJcbiAgICBcclxuICAgIC8vIERpc2FibGUgc3RhcnQgYnV0dG9uXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnQtZ2FtZScpLmRpc2FibGVkID0gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJTdGFydCBnYW1lIGNsaWNrZWRcIik7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIENyZWF0ZSBwbGF5ZXIgaW5zdGFuY2VzXHJcbiAgICAgICAgcGxheWVyID0gbmV3IFBsYXllcihmYWxzZSk7IC8vIGh1bWFuIHBsYXllclxyXG4gICAgICAgIGNvbXB1dGVyID0gbmV3IFBsYXllcih0cnVlKTsgLy8gY29tcHV0ZXIgcGxheWVyXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXJzIGNyZWF0ZWQ6XCIsIHBsYXllciwgY29tcHV0ZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFRyYW5zZmVyIHBsYWNlZCBzaGlwcyB0byBwbGF5ZXIncyBnYW1lYm9hcmRcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBsYWNlZCBzaGlwczpcIiwgcGxhY2VkU2hpcHMpO1xyXG4gICAgICAgIHBsYWNlZFNoaXBzLmZvckVhY2goc2hpcERhdGEgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNyZWF0aW5nIHNoaXA6XCIsIHNoaXBEYXRhKTtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKHNoaXBEYXRhLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBJbiB0aGUgVUk6IGhvcml6b250YWwgPSBhbG9uZyBZIGF4aXMsIHZlcnRpY2FsID0gYWxvbmcgWCBheGlzXHJcbiAgICAgICAgICAgIC8vIEluIEdhbWVib2FyZDogaG9yaXpvbnRhbCA9IGFsb25nIFggYXhpcywgdmVydGljYWwgPSBhbG9uZyBZIGF4aXNcclxuICAgICAgICAgICAgaWYgKHNoaXBEYXRhLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxhY2luZyBzaGlwIHdpdGggVkVSVElDQUwgb3JpZW50YXRpb24gYXRcIiwgc2hpcERhdGEueCwgc2hpcERhdGEueSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwLCBzaGlwRGF0YS54LCBzaGlwRGF0YS55LCAndmVydGljYWwnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2hpcCBwbGFjZW1lbnQgcmVzdWx0OlwiLCByZXN1bHQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQbGFjaW5nIHNoaXAgd2l0aCBIT1JJWk9OVEFMIG9yaWVudGF0aW9uIGF0XCIsIHNoaXBEYXRhLngsIHNoaXBEYXRhLnkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcCwgc2hpcERhdGEueCwgc2hpcERhdGEueSwgJ2hvcml6b250YWwnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2hpcCBwbGFjZW1lbnQgcmVzdWx0OlwiLCByZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gUmVzdCBvZiBmdW5jdGlvbiByZW1haW5zIHRoZSBzYW1lXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQbGFjaW5nIGNvbXB1dGVyIHNoaXBzXCIpO1xyXG4gICAgICAgIHBsYWNlQ29tcHV0ZXJTaGlwcygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFVwZGF0ZSBnYW1lIHN0YXRlXHJcbiAgICAgICAgZ2FtZUluUHJvZ3Jlc3MgPSB0cnVlO1xyXG4gICAgICAgIHBsYXllclR1cm4gPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFN3aXRjaCBzY3JlZW5zXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NldHVwLXNjcmVlbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLXNjcmVlbicpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBib2FyZHNcclxuICAgICAgICB1cGRhdGVCb2FyZHMoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBTZXQgc3RhdHVzIG1lc3NhZ2VcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhdHVzLW1lc3NhZ2UnKS50ZXh0Q29udGVudCA9ICdZb3VyIFR1cm4nO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYXR0bGUtbWVzc2FnZScpLnRleHRDb250ZW50ID0gJ0NsaWNrIG9uIGVuZW15IGJvYXJkIHRvIGF0dGFjayc7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBpbiBzdGFydEdhbWU6XCIsIGVycm9yKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGxhY2VDb21wdXRlclNoaXBzKCkge1xyXG4gICAgLy8gU2hpcCBsZW5ndGhzIGZvciBjb21wdXRlclxyXG4gICAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07IC8vIENhcnJpZXIsIEJhdHRsZXNoaXAsIENydWlzZXIsIFN1Ym1hcmluZSwgRGVzdHJveWVyXHJcbiAgICBcclxuICAgIHNoaXBMZW5ndGhzLmZvckVhY2gobGVuZ3RoID0+IHtcclxuICAgICAgICBsZXQgcGxhY2VkID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGF0dGVtcHRzID0gMDsgLy8gQWRkIGFuIGF0dGVtcHRzIGNvdW50ZXIgdG8gcHJldmVudCBpbmZpbml0ZSBsb29wc1xyXG4gICAgICAgIFxyXG4gICAgICAgIHdoaWxlICghcGxhY2VkICYmIGF0dGVtcHRzIDwgMTAwKSB7IC8vIExpbWl0IGF0dGVtcHRzIHRvIHByZXZlbnQgZnJlZXppbmdcclxuICAgICAgICAgICAgYXR0ZW1wdHMrKztcclxuICAgICAgICAgICAgLy8gR2VuZXJhdGUgcmFuZG9tIHBvc2l0aW9uIGFuZCBvcmllbnRhdGlvblxyXG4gICAgICAgICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgICAgICBjb25zdCBvcmllbnRhdGlvbiA9IE1hdGgucmFuZG9tKCkgPiAwLjUgPyAnaG9yaXpvbnRhbCcgOiAndmVydGljYWwnO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHNoaXAgYW5kIHRyeSB0byBwbGFjZSBpdFxyXG4gICAgICAgICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAobGVuZ3RoKTtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwLCB4LCB5LCBvcmllbnRhdGlvbik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBTZXQgcGxhY2VkIHRvIHRydWUgb25seSBpZiBwbGFjZW1lbnQgd2FzIHN1Y2Nlc3NmdWxcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHBsYWNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUGxhY2VkIGNvbXB1dGVyIHNoaXAgb2YgbGVuZ3RoICR7bGVuZ3RofWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghcGxhY2VkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBwbGFjZSBzaGlwIG9mIGxlbmd0aCAke2xlbmd0aH0gYWZ0ZXIgMTAwIGF0dGVtcHRzYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKFwiQ29tcHV0ZXIgc2hpcHMgcGxhY2VkIHN1Y2Nlc3NmdWxseVwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlQm9hcmRzKCkge1xyXG4gICAgLy8gVXBkYXRlIHBsYXllciBib2FyZCAtIHNob3dpbmcgc2hpcHMsIGhpdHMgYW5kIG1pc3Nlc1xyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcGxheWVyLWJvYXJkIC5jZWxsW2RhdGEteD1cIiR7eH1cIl1bZGF0YS15PVwiJHt5fVwiXWApO1xyXG4gICAgICAgICAgICBjb25zdCBjZWxsVmFsdWUgPSBwbGF5ZXIuZ2FtZWJvYXJkLmdhbWVHcmlkW3hdW3ldO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAnY2VsbCc7IC8vIFJlc2V0IGNsYXNzZXNcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChjZWxsVmFsdWUgPT09ICdoaXQnKSB7XHJcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNlbGxWYWx1ZSA9PT0gJ21pc3MnKSB7XHJcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjZWxsVmFsdWUgIT09IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIEl0J3MgYSBzaGlwXHJcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gVXBkYXRlIGNvbXB1dGVyIGJvYXJkIC0gb25seSBzaG93aW5nIGhpdHMgYW5kIG1pc3Nlcywgbm90IHNoaXBzXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcclxuICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjb21wdXRlci1ib2FyZCAuY2VsbFtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1gKTtcclxuICAgICAgICAgICAgY29uc3QgY2VsbFZhbHVlID0gY29tcHV0ZXIuZ2FtZWJvYXJkLmdhbWVHcmlkW3hdW3ldO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAnY2VsbCc7IC8vIFJlc2V0IGNsYXNzZXNcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChjZWxsVmFsdWUgPT09ICdoaXQnKSB7XHJcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNlbGxWYWx1ZSA9PT0gJ21pc3MnKSB7XHJcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlUGxheWVyQXR0YWNrKGV2ZW50KSB7XHJcbiAgICAvLyBJZiBnYW1lIGlzIG5vdCBpbiBwcm9ncmVzcyBvciBpdCdzIG5vdCBwbGF5ZXIncyB0dXJuLCBkbyBub3RoaW5nXHJcbiAgICBpZiAoIWdhbWVJblByb2dyZXNzIHx8ICFwbGF5ZXJUdXJuIHx8ICFldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHggPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC54KTtcclxuICAgIGNvbnN0IHkgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC55KTtcclxuICAgIFxyXG4gICAgLy8gTWFrZSB0aGUgYXR0YWNrXHJcbiAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSBwbGF5ZXIuYXR0YWNrKHgsIHksIGNvbXB1dGVyLmdhbWVib2FyZCk7XHJcbiAgICBcclxuICAgIC8vIEhhbmRsZSBpbnZhbGlkIGF0dGFja3NcclxuICAgIGlmIChhdHRhY2tSZXN1bHQgPT09ICdJbnZhbGlkIGNvb3JkaW5hdGVzJyB8fCBhdHRhY2tSZXN1bHQgPT09ICdUaGlzIGNlbGwgaGFzIGJlZW4gc2hvdCBiZWZvcmUnKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhdHRsZS1tZXNzYWdlJykudGV4dENvbnRlbnQgPSBhdHRhY2tSZXN1bHQ7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBVcGRhdGUgdGhlIFVJXHJcbiAgICB1cGRhdGVCb2FyZHMoKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYXR0bGUtbWVzc2FnZScpLnRleHRDb250ZW50ID0gYFlvdXIgYXR0YWNrICR7YXR0YWNrUmVzdWx0fWA7XHJcbiAgICBcclxuICAgIC8vIENoZWNrIGlmIGdhbWUgaXMgb3ZlclxyXG4gICAgaWYgKGNvbXB1dGVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xyXG4gICAgICAgIGVuZEdhbWUodHJ1ZSk7IC8vIFBsYXllciB3aW5zXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBTd2l0Y2ggdG8gY29tcHV0ZXIncyB0dXJuXHJcbiAgICBwbGF5ZXJUdXJuID0gZmFsc2U7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhdHVzLW1lc3NhZ2UnKS50ZXh0Q29udGVudCA9IFwiQ29tcHV0ZXIncyBUdXJuXCI7XHJcbiAgICBcclxuICAgIC8vIENvbXB1dGVyIG1ha2VzIGEgbW92ZSBhZnRlciBhIHNob3J0IGRlbGF5XHJcbiAgICBzZXRUaW1lb3V0KGNvbXB1dGVyVHVybiwgMTAwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVyVHVybigpIHtcclxuICAgIGlmICghZ2FtZUluUHJvZ3Jlc3MpIHJldHVybjtcclxuICAgIFxyXG4gICAgLy8gQ29tcHV0ZXIgbWFrZXMgYW4gYXR0YWNrXHJcbiAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSBjb21wdXRlci5jb21wdXRlclBsYXkocGxheWVyLmdhbWVib2FyZCk7XHJcbiAgICBcclxuICAgIC8vIFVwZGF0ZSB0aGUgYm9hcmQgVUlcclxuICAgIHVwZGF0ZUJvYXJkcygpO1xyXG4gICAgXHJcbiAgICAvLyBVcGRhdGUgbWVzc2FnZVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JhdHRsZS1tZXNzYWdlJykudGV4dENvbnRlbnQgPSBcclxuICAgICAgICBgQ29tcHV0ZXIncyBhdHRhY2sgJHthdHRhY2tSZXN1bHR9YDtcclxuICAgIFxyXG4gICAgLy8gQ2hlY2sgaWYgZ2FtZSBpcyBvdmVyXHJcbiAgICBpZiAocGxheWVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xyXG4gICAgICAgIGVuZEdhbWUoZmFsc2UpOyAvLyBDb21wdXRlciB3aW5zXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBTd2l0Y2ggYmFjayB0byBwbGF5ZXIncyB0dXJuXHJcbiAgICBwbGF5ZXJUdXJuID0gdHJ1ZTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGF0dXMtbWVzc2FnZScpLnRleHRDb250ZW50ID0gXCJZb3VyIFR1cm5cIjtcclxufVxyXG5cclxuZnVuY3Rpb24gZW5kR2FtZShwbGF5ZXJXb24pIHtcclxuICAgIC8vIFVwZGF0ZSBnYW1lIHN0YXRlXHJcbiAgICBnYW1lSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICAvLyBEaXNwbGF5IHdobyB3b25cclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBwbGF5ZXJXb24gPyBcclxuICAgICAgICBcIkNvbmdyYXR1bGF0aW9ucyEgWW91IHNhbmsgYWxsIGVuZW15IHNoaXBzIVwiIDogXHJcbiAgICAgICAgXCJHYW1lIE92ZXIhIFRoZSBjb21wdXRlciBzYW5rIGFsbCB5b3VyIHNoaXBzIVwiO1xyXG4gICAgXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhdHVzLW1lc3NhZ2UnKS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmF0dGxlLW1lc3NhZ2UnKS50ZXh0Q29udGVudCA9IFwiR2FtZSBPdmVyXCI7XHJcbiAgICBcclxuICAgIC8vIFNob3cgcGxheSBhZ2FpbiBidXR0b25cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5LWFnYWluJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc2V0R2FtZSgpIHtcclxuICAgIC8vIFJlc2V0IGdhbWUgc3RhdGVcclxuICAgIHBsYWNlZFNoaXBzID0gW107XHJcbiAgICBzZWxlY3RlZFNoaXAgPSBudWxsO1xyXG4gICAgZ2FtZUluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuICAgIHBsYXllclR1cm4gPSB0cnVlO1xyXG4gICAgXHJcbiAgICAvLyBDbGVhciBhbGwgc2hpcCBzZWxlY3Rpb25zIGFuZCBwbGFjZW1lbnRzXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcCcpLmZvckVhY2goc2hpcCA9PiB7XHJcbiAgICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcsICdwbGFjZWQnKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvLyBSZXNldCBib2FyZHNcclxuICAgIGNvbnN0IHNldHVwQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NldHVwLWJvYXJkXCIpO1xyXG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllci1ib2FyZFwiKTtcclxuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbXB1dGVyLWJvYXJkXCIpO1xyXG4gICAgXHJcbiAgICBjcmVhdGVCb2FyZEdyaWQoc2V0dXBCb2FyZCk7XHJcbiAgICBjcmVhdGVCb2FyZEdyaWQocGxheWVyQm9hcmQpO1xyXG4gICAgY3JlYXRlQm9hcmRHcmlkKGNvbXB1dGVyQm9hcmQpO1xyXG4gICAgXHJcbiAgICAvLyBTd2l0Y2ggYmFjayB0byBzZXR1cCBzY3JlZW5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLXNjcmVlbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2V0dXAtc2NyZWVuJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICBcclxuICAgIC8vIERpc2FibGUgc3RhcnQgYnV0dG9uIHVudGlsIHNoaXBzIGFyZSBwbGFjZWRcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1nYW1lJykuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgXHJcbiAgICAvLyBIaWRlIHBsYXkgYWdhaW4gYnV0dG9uXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheS1hZ2FpbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbn1cclxuXHJcbi8vIEluaXRpYWxpemUgdGhlIGdhbWUgd2hlbiBET00gaXMgbG9hZGVkXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXRHYW1lKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=