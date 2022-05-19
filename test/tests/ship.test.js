"use strict";

var _ship = _interopRequireDefault(require("../ship.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Testing "Ship" class:', () => {
  test("Instance and its methods", () => {
    let ship1 = (0, _ship.default)(2, [0, 0]);
    expect(ship1).toBeDefined();
    expect(ship1.getCoors()).toEqual([0, 0]);
    expect(ship1.getLength()).toBe(2);
    expect(ship1.getHits()).toBe(0);
  });
  test("Getting hits and check if ship sinks", () => {
    let ship2 = (0, _ship.default)(4, [0, 0]);
    expect(ship2.getHits()).toBe(0);
    expect(ship2.isSunk()).toBe(false);
    expect(ship2.hit()).toBe(1);
    expect(ship2.hit()).toBe(2);
    expect(ship2.getHits()).toBe(2);
    expect(ship2.isSunk()).toBe(false);
    ship2.hit();
    ship2.hit();
    expect(ship2.getHits()).toBe(4);
    expect(ship2.isSunk()).toBe(true);
  });
  test("Prevent object reference from getCoord method", () => {
    let ship3 = (0, _ship.default)(3, [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);
    let coors = ship3.getCoors();
    coors[0][0] = "hi";
    expect(coors[0][0]).toBe("hi");
    expect(ship3.getCoors()[0][0]).toBe(0);
  });
});