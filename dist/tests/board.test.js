"use strict";

var _gameboard = _interopRequireDefault(require("../gameboard.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Testing board", () => {
  test("Board should have 10 rows and 10 columns", () => {
    let gameboard1 = (0, _gameboard.default)();
    expect(gameboard1.getBoard()).toEqual([["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"]]);
  });
});
describe("Placing ships", () => {
  test("Place and check new ships coordinates", () => {
    let gameboard2 = (0, _gameboard.default)();
    gameboard2.placeShip([0, 0], 5);
    gameboard2.placeShip([5, 2], 2, "ver");
    let ship1 = gameboard2.getShips().type1.ships[0];
    let ship2 = gameboard2.getShips().type4.ships[0];
    expect(ship1.getCoors()).toEqual([[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);
    expect(ship2.getCoors()).toEqual([[5, 2], [6, 2]]);
    expect(() => gameboard2.placeShip([9, 9], 2)).toThrow("Ship expands to wrong coordinates");
    gameboard2.placeShip([6, 5], 4);
    gameboard2.placeShip([7, 0], 4, "asdf");
    expect(gameboard2.getShips().type2.ships[0].getCoors()).toEqual([[6, 5], [6, 6], [6, 7], [6, 8]]);
    expect(gameboard2.getShips().type2.ships[1].getCoors()).toEqual([[7, 0], [7, 1], [7, 2], [7, 3]]);
    expect(() => gameboard2.placeShip([8, "hi"], 2)).toThrow("Coordinates should be numbers");
    expect(() => gameboard2.placeShip([0, 7], [])).toThrow("Length should be a number between 2 and 5");
  });
});
describe("Get placed ships", () => {
  let gameboard = (0, _gameboard.default)();
  test("Get proper number of ships", () => {
    gameboard.placeShip([0, 0], 5);
    gameboard.placeShip([1, 0], 4);
    gameboard.placeShip([1, 4], 4);
    gameboard.placeShip([2, 0], 2);
    gameboard.placeShip([2, 2], 2);
    gameboard.placeShip([2, 4], 2);
    expect(gameboard.getShips().type1.ships.length).toBe(1);
    expect(gameboard.getShips().type2.ships.length).toBe(2);
    expect(gameboard.getShips().type4.ships.length).toBe(3);
  });
  test("Returned ships are copies not references", () => {
    let ship1 = gameboard.getShips().type1.ships[0];
    let ship1Copy = gameboard.getShips().type1.ships[0];
    expect(ship1.getHits()).toBe(0);
    expect(ship1Copy.getHits()).toBe(0);
    ship1.hit();
    ship1.hit();
    expect(ship1.getHits()).toBe(2);
    expect(ship1Copy.getHits()).toBe(0);
    gameboard.receiveAttack(0, 2);
    ship1 = gameboard.getShips().type1.ships[0];
    expect(ship1.getHits()).toBe(1);
    expect(ship1Copy.getHits()).toBe(0);
  });
});
describe("Get board with ships", () => {
  test("Print board with ships", () => {
    let gameboard = (0, _gameboard.default)();
    gameboard.placeShip([0, 0], 5);
    gameboard.placeShip([1, 1], 4, "ver");
    gameboard.placeShip([6, 0], 4);
    gameboard.placeShip([7, 0], 3, "ver");
    gameboard.placeShip([7, 2], 3, "ver");
    gameboard.placeShip([7, 4], 3, "ver");
    gameboard.placeShip([0, 6], 3);
    gameboard.placeShip([4, 5], 3, "ver");
    gameboard.placeShip([8, 7], 3);
    gameboard.placeShip([5, 8], 3, "ver");
    gameboard.placeShip([9, 6], 2);
    gameboard.placeShip([1, 9], 2, "ver");
    gameboard.placeShip([4, 9], 2, "ver");
    gameboard.placeShip([3, 6], 2);
    gameboard.placeShip([5, 7], 2, "ver");
    expect(gameboard.getBoardAndShips()).toEqual([["s", "s", "s", "s", "s", "~", "s", "s", "s", "~"], ["~", "s", "~", "~", "~", "~", "~", "~", "~", "s"], ["~", "s", "~", "~", "~", "~", "~", "~", "~", "s"], ["~", "s", "~", "~", "~", "~", "s", "s", "~", "~"], ["~", "s", "~", "~", "~", "s", "~", "~", "~", "s"], ["~", "~", "~", "~", "~", "s", "~", "s", "s", "s"], ["s", "s", "s", "s", "~", "s", "~", "s", "s", "~"], ["s", "~", "s", "~", "s", "~", "~", "~", "s", "~"], ["s", "~", "s", "~", "s", "~", "~", "s", "s", "s"], ["s", "~", "s", "~", "s", "~", "s", "s", "~", "~"]]);
  });
  test("Print board with ships with attacks and missing attacks", () => {
    let gameboard = (0, _gameboard.default)();
    gameboard.placeShip([0, 0], 5);
    gameboard.placeShip([1, 1], 4, "ver");
    gameboard.placeShip([7, 0], 3, "ver");
    gameboard.placeShip([3, 6], 2);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(2, 0);
    gameboard.receiveAttack(3, 0);
    gameboard.receiveAttack(4, 0);
    gameboard.receiveAttack(1, 2);
    gameboard.receiveAttack(7, 0);
    gameboard.receiveAttack(8, 0);
    gameboard.receiveAttack(9, 0);
    gameboard.receiveAttack(3, 5);
    gameboard.receiveAttack(3, 9);
    expect(gameboard.getBoardAndShips()).toEqual([["h", "h", "h", "s", "s", "~", "~", "~", "~", "~"], ["m", "s", "m", "~", "~", "~", "~", "~", "~", "~"], ["m", "s", "~", "~", "~", "~", "~", "~", "~", "~"], ["m", "s", "~", "~", "~", "m", "s", "s", "~", "m"], ["m", "s", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["h", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["h", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["h", "~", "~", "~", "~", "~", "~", "~", "~", "~"]]);
  });
});
describe("Prevent exceed maximum number of ships", () => {
  test("Exceed maximum number of 2 length ships", () => {
    let gameboard3 = (0, _gameboard.default)();
    gameboard3.placeShip([0, 0], 2);
    gameboard3.placeShip([1, 0], 2);
    gameboard3.placeShip([2, 0], 2);
    gameboard3.placeShip([3, 0], 2);
    gameboard3.placeShip([4, 0], 2);
    expect(() => gameboard3.placeShip([5, 0], 2)).toThrow("Exceeded number of ships: maximun number for 2 length ships is 5");
  });
});
describe("Place new ships", () => {
  test("Place all types of ships", () => {
    let gameboard4 = (0, _gameboard.default)();
    gameboard4.placeShip([0, 0], 5);
    gameboard4.placeShip([1, 0], 4);
    gameboard4.placeShip([2, 0], 4);
    gameboard4.placeShip([3, 0], 3);
    gameboard4.placeShip([4, 0], 3);
    gameboard4.placeShip([5, 0], 3);
    gameboard4.placeShip([6, 0], 3);
    gameboard4.placeShip([7, 0], 3);
    gameboard4.placeShip([8, 0], 3);
    gameboard4.placeShip([9, 0], 3);
    gameboard4.placeShip([0, 5], 2);
    gameboard4.placeShip([1, 4], 2);
    gameboard4.placeShip([2, 4], 2);
    gameboard4.placeShip([3, 3], 2);
    gameboard4.placeShip([4, 3], 2);
    expect(() => gameboard4.placeShip([0, 7], 2)).toThrow("Exceeded number of ships: maximun number for 2 length ships is 5");
    expect(() => gameboard4.placeShip([0, 7], 5, "ver")).toThrow("Exceeded number of ships: maximun number for 5 length ships is 1");
  });
});
describe("Place ship over another ship", () => {
  test("Prevent a new ship on the same coordinates", () => {
    let gameboard5 = (0, _gameboard.default)();
    gameboard5.placeShip([0, 0], 5);
    expect(() => gameboard5.placeShip([0, 4], 4)).toThrow("A new ship cannot be place over another");
    gameboard5.placeShip([0, 5], 2);
    gameboard5.placeShip([0, 7], 3);
    expect(() => gameboard5.placeShip([0, 9], 4, "ver")).toThrow("A new ship cannot be place over another");
  });
});
describe("Remove ships", () => {
  test("Place and remove all types of ships", () => {
    let gameboard = (0, _gameboard.default)(); // place ships

    gameboard.placeShip([0, 0], 5); // (*)

    gameboard.placeShip([1, 0], 4); // (*)

    gameboard.placeShip([2, 0], 4);
    gameboard.placeShip([3, 0], 3);
    gameboard.placeShip([4, 0], 3); // (*)

    gameboard.placeShip([5, 0], 3);
    gameboard.placeShip([6, 0], 3);
    gameboard.placeShip([7, 0], 3);
    gameboard.placeShip([8, 0], 3);
    gameboard.placeShip([9, 0], 3);
    gameboard.placeShip([0, 5], 2);
    gameboard.placeShip([1, 4], 2);
    gameboard.placeShip([2, 4], 2);
    gameboard.placeShip([3, 3], 2);
    gameboard.placeShip([4, 3], 2); // (*)
    // remove ships pointing to the coordinates of the first chunk

    expect(gameboard.removeShip(0, 0)).toBe("Removed ship with the following coordinates: [0, 0], [0, 1], [0, 2], [0, 3], [0, 4]");
    expect(gameboard.getShips().type1.ships.length).toBe(0);
    expect(gameboard.removeShip(1, 0)).toBe("Removed ship with the following coordinates: [1, 0], [1, 1], [1, 2], [1, 3]");
    expect(gameboard.getShips().type2.ships.length).toBe(1); // remove ships by not pointing to the coordinates of the first chunk

    expect(gameboard.removeShip(4, 1)).toBe("Removed ship with the following coordinates: [4, 0], [4, 1], [4, 2]");
    expect(gameboard.getShips().type3.ships.length).toBe(6);
    expect(gameboard.removeShip(4, 4)).toBe("Removed ship with the following coordinates: [4, 3], [4, 4]");
    expect(gameboard.getShips().type4.ships.length).toBe(4);
  });
  test("Remove ship that does not exist", () => {
    let gameboard = (0, _gameboard.default)();
    expect(gameboard.removeShip(0, 0)).toBe("There is no ship in [0,0] coordinates");
  });
});
describe("Checking army", () => {
  let gameboard = (0, _gameboard.default)();
  test("Army is not complete", () => {
    expect(gameboard.isArmyComplete()).toBe(false);
  });
  test("Army is complete", () => {
    gameboard.placeShip([0, 0], 5);
    gameboard.placeShip([1, 0], 4);
    gameboard.placeShip([2, 0], 4);
    gameboard.placeShip([3, 0], 3);
    gameboard.placeShip([4, 0], 3);
    gameboard.placeShip([5, 0], 3);
    gameboard.placeShip([6, 0], 3);
    gameboard.placeShip([7, 0], 3);
    gameboard.placeShip([8, 0], 3);
    gameboard.placeShip([9, 0], 3);
    gameboard.placeShip([0, 5], 2);
    gameboard.placeShip([1, 4], 2);
    gameboard.placeShip([2, 4], 2);
    gameboard.placeShip([3, 3], 2);
    gameboard.placeShip([4, 3], 2);
    expect(gameboard.isArmyComplete()).toBe(true);
  });
});
describe("Attack board", () => {
  let gameboard = (0, _gameboard.default)();
  test("Hit a single ship", () => {
    gameboard.placeShip([0, 0], 5);
    gameboard.receiveAttack(0, 4);
    expect(gameboard.getBoard()).toEqual([["~", "~", "~", "~", "h", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"]]);
    expect(gameboard.getShips().type1.ships[0].getHits()).toBe(1);
  });
  test("Miss an attack", () => {
    gameboard.receiveAttack(0, 5);
    expect(gameboard.getBoard()).toEqual([["~", "~", "~", "~", "h", "m", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"]]);
  });
  test("Attack same coordinates", () => {
    expect(() => gameboard.receiveAttack(0, 4)).toThrow("You already attacked the following coordinates: [0,4]");
    expect(() => gameboard.receiveAttack(0, 5)).toThrow("You already attacked the following coordinates: [0,5]");
  });
  test("Sunk a ship", () => {
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    gameboard.receiveAttack(0, 3);
    expect(gameboard.getBoard()).toEqual([["h", "h", "h", "h", "h", "m", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"]]);
    expect(gameboard.getShips().type1.ships[0].getHits()).toBe(5);
    expect(gameboard.getShips().type1.ships[0].isSunk()).toBe(true);
  });
});
describe("Check if all ships were sink", () => {
  test("All ships sunk", () => {
    let gameboard1 = (0, _gameboard.default)();
    gameboard1.placeShip([0, 0], 5);
    gameboard1.placeShip([1, 0], 4);
    gameboard1.placeShip([2, 0], 4);
    expect(gameboard1.allShipsSunk()).toBe(false);
    gameboard1.receiveAttack(0, 0);
    gameboard1.receiveAttack(0, 1);
    gameboard1.receiveAttack(0, 2);
    gameboard1.receiveAttack(0, 3);
    gameboard1.receiveAttack(0, 4);
    expect(gameboard1.allShipsSunk()).toBe(false);
    gameboard1.receiveAttack(1, 0);
    gameboard1.receiveAttack(1, 1);
    gameboard1.receiveAttack(1, 2);
    gameboard1.receiveAttack(1, 3);
    expect(gameboard1.allShipsSunk()).toBe(false);
    gameboard1.receiveAttack(2, 0);
    gameboard1.receiveAttack(2, 1);
    gameboard1.receiveAttack(2, 2);
    gameboard1.receiveAttack(2, 3);
    expect(gameboard1.allShipsSunk()).toBe(true);
  });
});