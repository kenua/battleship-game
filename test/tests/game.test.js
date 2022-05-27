"use strict";

var _game = _interopRequireDefault(require("../game.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("Get computer board", () => {
  expect(_game.default.getComputerBoard()).toEqual([["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"], ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"]]);
});
test("Place computer and player ships", () => {
  _game.default.playerBoard.placeShip([0, 0], 5);

  _game.default.playerBoard.placeShip([1, 0], 4);

  _game.default.playerBoard.placeShip([2, 0], 4);

  _game.default.playerBoard.placeShip([3, 0], 3);

  _game.default.playerBoard.placeShip([4, 0], 3);

  _game.default.playerBoard.placeShip([5, 0], 3);

  _game.default.playerBoard.placeShip([0, 5], 2);

  _game.default.playerBoard.placeShip([1, 4], 2);

  _game.default.playerBoard.placeShip([2, 4], 2);

  _game.default.playerBoard.placeShip([3, 3], 2);

  expect(_game.default.init()).toBe(true);
});
test("Take turn", () => {
  _game.default.reset();

  _game.default.playerBoard.placeShip([0, 0], 5);

  _game.default.playerBoard.placeShip([1, 0], 4);

  _game.default.playerBoard.placeShip([2, 0], 4);

  _game.default.playerBoard.placeShip([3, 0], 3);

  _game.default.playerBoard.placeShip([4, 0], 3);

  _game.default.playerBoard.placeShip([5, 0], 3);

  _game.default.playerBoard.placeShip([0, 5], 2);

  _game.default.playerBoard.placeShip([1, 4], 2);

  _game.default.playerBoard.placeShip([2, 4], 2);

  _game.default.playerBoard.placeShip([3, 3], 2);

  _game.default.init();

  _game.default.takeTurn(5, 8);

  let playerBoard = _game.default.playerBoard.getBoard();

  let computerBoard = _game.default.getComputerBoard();

  let playerBoardWasAttacked = false;
  let computerBoardWasAttacked = false;

  rowsLoop: for (let row = 0; row < playerBoard.length; row++) {
    cellsLoop: for (let cell = 0; cell < playerBoard[row].length; cell++) {
      if (playerBoard[row][cell] === "m" || playerBoard[row][cell] === "h") {
        playerBoardWasAttacked = true;
        break rowsLoop;
      }
    }
  }

  rowsLoop: for (let row = 0; row < computerBoard.length; row++) {
    cellsLoop: for (let cell = 0; cell < computerBoard[row].length; cell++) {
      if (computerBoard[row][cell] === "m" || computerBoard[row][cell] === "h") {
        computerBoardWasAttacked = true;
        break rowsLoop;
      }
    }
  }

  expect(playerBoardWasAttacked).toBe(true);
  expect(computerBoardWasAttacked).toBe(true);
  expect(() => _game.default.takeTurn(11, 0)).toThrow("Provided coordinates are not valid: [11,0]");
});
test("Can't take turn is player army is not complete", () => {
  _game.default.reset();

  _game.default.playerBoard.placeShip([1, 0], 4);

  _game.default.init();

  expect(_game.default.takeTurn(0, 0)).toEqual(_game.default);
});
test("Play until getting a winner", () => {
  _game.default.reset();

  _game.default.playerBoard.placeShip([0, 0], 5);

  _game.default.playerBoard.placeShip([1, 0], 4);

  _game.default.playerBoard.placeShip([2, 0], 4);

  _game.default.playerBoard.placeShip([3, 0], 3);

  _game.default.playerBoard.placeShip([4, 0], 3);

  _game.default.playerBoard.placeShip([5, 0], 3);

  _game.default.playerBoard.placeShip([0, 5], 2);

  _game.default.playerBoard.placeShip([1, 4], 2);

  _game.default.playerBoard.placeShip([2, 4], 2);

  _game.default.playerBoard.placeShip([3, 3], 2);

  _game.default.init();

  rowLoop: for (let row = 0; row < 10; row++) {
    for (let cell = 0; cell < 10; cell++) {
      let result = _game.default.takeTurn(row, cell);

      if (result.search && result.search(/(Computer|Player) won the match/gi)) {
        break rowLoop;
      }
    }
  }

  expect(_game.default.getWinner()).toMatch(/(Computer|Player) won the match/gi);
  expect(_game.default.takeTurn(0, 0)).toMatch(/(Computer|Player) won the match/gi);
});
test("Block some player actions after calling Game.init", () => {
  _game.default.reset();

  _game.default.playerBoard.placeShip([0, 0], 5);

  _game.default.playerBoard.placeShip([1, 0], 4);

  _game.default.playerBoard.placeShip([2, 0], 4);

  _game.default.playerBoard.placeShip([3, 0], 3);

  _game.default.playerBoard.placeShip([4, 0], 3);

  _game.default.playerBoard.placeShip([5, 0], 3);

  _game.default.playerBoard.placeShip([0, 5], 2);

  _game.default.playerBoard.placeShip([1, 4], 2);

  _game.default.playerBoard.placeShip([2, 4], 2);

  _game.default.playerBoard.placeShip([3, 3], 2);

  _game.default.init();

  expect(_game.default.playerBoard.placeShip).toBe(null);
  expect(_game.default.playerBoard.removeShip).toBe(null);
});