export class Gameboard {
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