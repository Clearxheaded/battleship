import { Ship } from "../src/models/Ship.js";
import { Gameboard } from "../src/models/Gameboard.js";

// Ship Placement Tests
test('Place ship horizontally on the board', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  const result = gameboard.placeShip(ship, 0, 0, 'horizontal');
  
  expect(result).not.toBe(false);
  expect(gameboard.gameGrid[0][0]).toBe(ship);
  expect(gameboard.gameGrid[1][0]).toBe(ship);
  expect(gameboard.gameGrid[2][0]).toBe(ship);
  expect(gameboard.placedShips.length).toBe(1);
});

test('Place ship vertically on the board', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(4);
  const result = gameboard.placeShip(ship, 5, 2, 'vertical');
  
  expect(result).not.toBe(false);
  expect(gameboard.gameGrid[5][2]).toBe(ship);
  expect(gameboard.gameGrid[5][3]).toBe(ship);
  expect(gameboard.gameGrid[5][4]).toBe(ship);
  expect(gameboard.gameGrid[5][5]).toBe(ship);
  expect(gameboard.placedShips.length).toBe(1);
});

test('Cannot place ship outside of board horizontally', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(4);
  const result = gameboard.placeShip(ship, 8, 0, 'horizontal');
  
  expect(result).toBe(false);
  expect(gameboard.placedShips.length).toBe(0);
});

test('Cannot place ship outside of board vertically', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(4);
  const result = gameboard.placeShip(ship, 0, 8, 'vertical');
  
  expect(result).toBe(false);
  expect(gameboard.placedShips.length).toBe(0);
});

test('Cannot place ship on top of another ship', () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(3);
  const ship2 = new Ship(2);
  
  gameboard.placeShip(ship1, 2, 2, 'horizontal');
  const result = gameboard.placeShip(ship2, 3, 2, 'vertical');
  
  expect(result).toBe(false);
  expect(gameboard.placedShips.length).toBe(1);
});

// Attack Tests
test('Attack hits a ship', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, 0, 0, 'horizontal');
  
  const result = gameboard.receiveAttack(0, 0);
  
  expect(result).toBe('Ship was hit');
  expect(gameboard.gameGrid[0][0]).toBe('hit');
  expect(ship.timesHit).toBe(1);
});

test('Attack misses a ship', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, 0, 0, 'horizontal');
  
  const result = gameboard.receiveAttack(5, 5);
  
  expect(result).toBe('Missed!');
  expect(gameboard.gameGrid[5][5]).toBe('miss');
  expect(gameboard.missedAttacks.length).toBe(1);
  expect(gameboard.missedAttacks[0].coordinates.x).toBe(5);
  expect(gameboard.missedAttacks[0].coordinates.y).toBe(5);
});

test('Cannot attack same position twice', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, 0, 0, 'horizontal');
  
  gameboard.receiveAttack(0, 0);
  const result = gameboard.receiveAttack(0, 0);
  
  expect(result).toBe('This cell has been shot before');
});

test('Attack is invalid for out-of-bounds coordinates', () => {
  const gameboard = new Gameboard();
  
  const result1 = gameboard.receiveAttack(-1, 5);
  const result2 = gameboard.receiveAttack(10, 5);
  
  expect(result1).toBe('Invalid coordinates');
  expect(result2).toBe('Invalid coordinates');
});

// Game State Tests
test('All ships are not sunk initially', () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(2);
  const ship2 = new Ship(3);
  
  gameboard.placeShip(ship1, 0, 0, 'horizontal');
  gameboard.placeShip(ship2, 5, 5, 'vertical');
  
  expect(gameboard.allShipsSunk()).toBe(false);
});

test('All ships are sunk when they receive enough hits', () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(2);
  const ship2 = new Ship(1);
  
  gameboard.placeShip(ship1, 0, 0, 'horizontal');
  gameboard.placeShip(ship2, 5, 5, 'vertical');
  
  // Sink first ship
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(1, 0);
  
  // Not all ships are sunk yet
  expect(gameboard.allShipsSunk()).toBe(false);
  
  // Sink second ship
  gameboard.receiveAttack(5, 5);
  
  // Now all ships should be sunk
  expect(gameboard.allShipsSunk()).toBe(true);
});