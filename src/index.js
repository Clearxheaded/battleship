import '../styles/style.css';
import { Ship } from './models/Ship.js';
import { Gameboard } from './models/Gameboard.js';
import { Player } from './models/Player.js';

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


// Initialize the game when DOM is loaded
document.addEventListener("DOMContentLoaded", initGame);





  