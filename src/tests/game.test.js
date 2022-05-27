import Game from "../game.js";

test("Get computer board", () => {
   expect(Game.getComputerBoard()).toEqual([
      ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"],
      ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"],
      ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"],
      ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"],
      ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"],
      ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"],
      ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"],
      ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"],
      ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"],
      ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"],
   ]);
});

test("Place computer and player ships", () => {
   Game.playerBoard.placeShip([0, 0], 5);

   Game.playerBoard.placeShip([1, 0], 4);
   Game.playerBoard.placeShip([2, 0], 4);

   Game.playerBoard.placeShip([3, 0], 3);
   Game.playerBoard.placeShip([4, 0], 3);
   Game.playerBoard.placeShip([5, 0], 3);

   Game.playerBoard.placeShip([0, 5], 2);
   Game.playerBoard.placeShip([1, 4], 2);
   Game.playerBoard.placeShip([2, 4], 2);
   Game.playerBoard.placeShip([3, 3], 2);

   expect(Game.init()).toBe(true);
});

test("Take turn", () => {
   Game.reset();

   Game.playerBoard.placeShip([0, 0], 5);

   Game.playerBoard.placeShip([1, 0], 4);
   Game.playerBoard.placeShip([2, 0], 4);

   Game.playerBoard.placeShip([3, 0], 3);
   Game.playerBoard.placeShip([4, 0], 3);
   Game.playerBoard.placeShip([5, 0], 3);

   Game.playerBoard.placeShip([0, 5], 2);
   Game.playerBoard.placeShip([1, 4], 2);
   Game.playerBoard.placeShip([2, 4], 2);
   Game.playerBoard.placeShip([3, 3], 2);

   Game.init();
   Game.takeTurn(5, 8);

   let playerBoard = Game.playerBoard.getBoard();
   let computerBoard = Game.getComputerBoard();
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
         if (
            computerBoard[row][cell] === "m" ||
            computerBoard[row][cell] === "h"
         ) {
            computerBoardWasAttacked = true;
            break rowsLoop;
         }
      }
   }

   expect(playerBoardWasAttacked).toBe(true);
   expect(computerBoardWasAttacked).toBe(true);

   expect(() => Game.takeTurn(11, 0)).toThrow(
      "Provided coordinates are not valid: [11,0]"
   );
});

test("Can't take turn is player army is not complete", () => {
   Game.reset();
   Game.playerBoard.placeShip([1, 0], 4);
   Game.init();

   expect(Game.takeTurn(0, 0)).toEqual(Game);
});

test("Play until getting a winner", () => {
   Game.reset();

   Game.playerBoard.placeShip([0, 0], 5);

   Game.playerBoard.placeShip([1, 0], 4);
   Game.playerBoard.placeShip([2, 0], 4);

   Game.playerBoard.placeShip([3, 0], 3);
   Game.playerBoard.placeShip([4, 0], 3);
   Game.playerBoard.placeShip([5, 0], 3);

   Game.playerBoard.placeShip([0, 5], 2);
   Game.playerBoard.placeShip([1, 4], 2);
   Game.playerBoard.placeShip([2, 4], 2);
   Game.playerBoard.placeShip([3, 3], 2);

   Game.init();

   rowLoop: for (let row = 0; row < 10; row++) {
      for (let cell = 0; cell < 10; cell++) {
         let result = Game.takeTurn(row, cell);
         if (
            result.search &&
            result.search(/(Computer|Player) won the match/gi)
         ) {
            break rowLoop;
         }
      }
   }

   expect(Game.getWinner()).toMatch(/(Computer|Player) won the match/gi);
   expect(Game.takeTurn(0, 0)).toMatch(/(Computer|Player) won the match/gi);
});

test("Block some player actions after calling Game.init", () => {
   Game.reset();

   Game.playerBoard.placeShip([0, 0], 5);

   Game.playerBoard.placeShip([1, 0], 4);
   Game.playerBoard.placeShip([2, 0], 4);

   Game.playerBoard.placeShip([3, 0], 3);
   Game.playerBoard.placeShip([4, 0], 3);
   Game.playerBoard.placeShip([5, 0], 3);

   Game.playerBoard.placeShip([0, 5], 2);
   Game.playerBoard.placeShip([1, 4], 2);
   Game.playerBoard.placeShip([2, 4], 2);
   Game.playerBoard.placeShip([3, 3], 2);

   Game.init();

   expect(Game.playerBoard.placeShip).toBe(null);
   expect(Game.playerBoard.removeShip).toBe(null);
});
