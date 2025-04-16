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
        player = new Player(false); // human player
        computer = new Player(true); // computer player
        console.log("Players created:", player, computer);
        
        // Transfer placed ships to player's gameboard
        console.log("Placed ships:", placedShips);
        placedShips.forEach(shipData => {
            console.log("Creating ship:", shipData);
            const ship = new Ship(shipData.length);
            
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
            const ship = new Ship(length);
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





