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

    // Toggle orientation
    const orientationInputs = document.querySelectorAll('input[name="orientation"]');
    orientationInputs.forEach(input => {
        input.addEventListener('change', orientationToggling);
    });

    // Setup board hover events for ship placement preview
    setupBoard.addEventListener('mouseover', showPlacementPreview);
    setupBoard.addEventListener('mouseout', clearPlacementPreview);
    setupBoard.addEventListener('click', placeShip);
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

// Initialize the game when DOM is loaded
document.addEventListener("DOMContentLoaded", initGame);





