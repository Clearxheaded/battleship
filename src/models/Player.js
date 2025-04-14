import { Gameboard } from './Gameboard.js';

export class Player {
  constructor(isComputer = false) {
    this.gameboard = new Gameboard();
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