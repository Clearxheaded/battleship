import { Ship } from "../src/models/Ship.js";
import { Gameboard } from "../src/models/Gameboard.js";

test('New ship has 0 hits and is not sunk', () => {
    const ship = new Ship(3);

    expect(ship.isSunk()).toBe(false);
    expect(ship.timesHit).toBe(0);
}) 

test('Calling hit method increases the hit count', () => {
    // Test it on 2 different ships
    const ship = new Ship(3);
    const ship2 = new Ship(5, 2);
    // Initialize the hit calls
    ship.hit();
    ship2.hit();
    
    expect(ship.timesHit).toBe(1);
    expect(ship2.timesHit).toBe(3);
})

test('Ship is being sunk', () => {
    const ship = new Ship(4, 2);

    // Sink the ship with hitting it
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
})

test('Ship is not sunk when hits are less than length', () => {
    const ship = new Ship(4, 1);

    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(false);
})