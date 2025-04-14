import { Player } from '../src/models/Player.js';
import { Gameboard } from '../src/models/Gameboard.js';
import { Ship } from '../src/models/Ship.js';

// Player creation tests
test('Player should have a gameboard', () => {
  const player = new Player();
  expect(player.gameboard).toBeInstanceOf(Gameboard);
});

test('Player should be human by default', () => {
  const player = new Player();
  expect(player.isComputer).toBe(false);
});

test('Can create computer player', () => {
  const computer = new Player(true);
  expect(computer.isComputer).toBe(true);
});

// Player attack tests
test('Player can attack enemy gameboard', () => {
  const player = new Player();
  const enemyGameboard = new Gameboard();
  const ship = new Ship(3);
  
  enemyGameboard.placeShip(ship, 0, 0, 'horizontal');
  const result = player.attack(0, 0, enemyGameboard);
  
  expect(result).toBe('Ship was hit');
  expect(ship.timesHit).toBe(1);
});

test('Player attack is recorded on enemy board', () => {
  const player = new Player();
  const enemyGameboard = new Gameboard();
  
  player.attack(5, 5, enemyGameboard);
  
  expect(enemyGameboard.gameGrid[5][5]).toBe('miss');
  expect(enemyGameboard.missedAttacks.length).toBe(1);
});

// Computer player tests
test('Computer player does nothing when human tries computerPlay', () => {
  const player = new Player(false);
  const enemyGameboard = new Gameboard();
  
  const result = player.computerPlay(enemyGameboard);
  
  expect(result).toBe(null);
});

test('Computer player makes valid moves', () => {
  const computer = new Player(true);
  const enemyGameboard = new Gameboard();
  
  // Mock random to return predictable values
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.5; 
  global.Math = mockMath;
  
  const result = computer.computerPlay(enemyGameboard);
  
  expect(result).toBe('Missed!');
  expect(enemyGameboard.gameGrid[5][5]).toBe('miss');
});

test('Computer player avoids already attacked cells', () => {
  const computer = new Player(true);
  const enemyGameboard = new Gameboard();
  
  // Pre-mark some cells as already attacked
  enemyGameboard.gameGrid[5][5] = 'miss';
  
  // Make Math.random always return 0.5 first (which would be x=5,y=5)
  // then 0.6 next time (which would be x=6,y=6)
  let callCount = 0;
  const mockMath = Object.create(global.Math);
  mockMath.random = () => {
    callCount++;
    return callCount <= 2 ? 0.5 : 0.6;
  };
  global.Math = mockMath;
  
  const result = computer.computerPlay(enemyGameboard);
  
  // Should skip (5,5) and attack (6,6) instead
  expect(enemyGameboard.gameGrid[6][6]).toBe('miss');
  expect(result).toBe('Missed!');
});

test('Computer player can hit ships', () => {
  const computer = new Player(true);
  const enemyGameboard = new Gameboard();
  const ship = new Ship(3);
  
  enemyGameboard.placeShip(ship, 5, 5, 'horizontal');
  
  // Make Math.random return 0.5 (which would be x=5,y=5)
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.5;
  global.Math = mockMath;
  
  const result = computer.computerPlay(enemyGameboard);
  
  expect(result).toBe('Ship was hit');
  expect(ship.timesHit).toBe(1);
});