import Gameboard from "./gameboard.js";

const Game = (function () {
   let _winnerMessage;
   let _canGameStart = false;
   let _computerBoard = Gameboard();
   let _cpuPreviousAttack = null;
   let _cpuNextAttack = null;
   let playerBoard = Gameboard();

   const getComputerBoard = function () {
      return _computerBoard.getBoard();
   };

   const init = function () {
      let placeEnemyArmy = function (type) {
         try {
            // place ships
            let row = Math.floor(Math.random() * 10);
            let column = Math.floor(Math.random() * 10);
            let length = type.length;
            let direction = Math.floor(Math.random() * 2) === 0 ? "ver" : null;

            _computerBoard.placeShip([row, column], length, direction);
            placeEnemyArmy(type);
         } catch (e) {
            if (!e.message.includes("Exceeded number of ships")) {
               placeEnemyArmy(type);
            } else {
               return "finished";
            }
         }
      };

      // fill computerBoard with ships
      if (!_computerBoard.isArmyComplete()) {
         let computerShipsInfo = _computerBoard.getShips();

         for (let type in computerShipsInfo) {
            placeEnemyArmy(computerShipsInfo[type]);
         }
      }

      if (playerBoard.isArmyComplete()) {
         _canGameStart = true;
         this.playerBoard.placeShip = null;
         this.playerBoard.removeShip = null;
         return true;
      } else {
         return false;
      }
   };

   const takeTurn = function (row, cell) {
      if (!_canGameStart) return this;

      if (!_winnerMessage) {
         let attackRandomCell = () => {
            try {
               let row = Math.floor(Math.random() * 10);
               let cell = Math.floor(Math.random() * 10);
               let attackResult = this.playerBoard.receiveAttack(row, cell);

               _cpuPreviousAttack =
                  attackResult && attackResult.symbol === "X"
                     ? attackResult
                     : null;
            } catch (e) {
               if (
                  e.message.includes(
                     "You already attacked the following coordinates"
                  )
               ) {
                  attackPlayer();
               }
            }
         };

         let attackPlayer = () => {
            let updateNextAttackCoordinates = () => {
               let pb = this.playerBoard.getBoard();

               switch (_cpuNextAttack.direction) {
                  case "above":
                     if (pb[_cpuNextAttack.row - 1]) {
                        _cpuNextAttack.row = _cpuNextAttack.row - 1;
                        return;
                     }
                     _cpuNextAttack = null;
                     break;

                  case "next":
                     if (pb[_cpuNextAttack.row][_cpuNextAttack.column + 1]) {
                        _cpuNextAttack.column = _cpuNextAttack.column + 1;
                        return;
                     }
                     _cpuNextAttack = null;
                     break;

                  case "below":
                     if (pb[_cpuNextAttack.row + 1]) {
                        _cpuNextAttack.row = _cpuNextAttack.row + 1;
                        return;
                     }
                     _cpuNextAttack = null;
                     break;

                  case "before":
                     if (pb[_cpuNextAttack.row][_cpuNextAttack.column - 1]) {
                        _cpuNextAttack.column = _cpuNextAttack.column - 1;
                        return;
                     }
                     _cpuNextAttack = null;
                     break;
               }
            };

            if (_cpuPreviousAttack && _cpuNextAttack) {
               try {
                  let attackResult = this.playerBoard.receiveAttack(
                     _cpuNextAttack.row,
                     _cpuNextAttack.column
                  );

                  // update _cpuNextAttack
                  if (attackResult && attackResult.symbol === "X") {
                     _cpuNextAttack = { ..._cpuNextAttack };
                     updateNextAttackCoordinates();
                  } else {
                     _cpuNextAttack = null;
                  }
               } catch (e) {
                  if (
                     e.message.includes("Provided coordinates are not valid") ||
                     e.message.includes(
                        "You already attacked the following coordinates"
                     )
                  ) {
                     console.log(e.message);
                     _cpuNextAttack = null;
                     attackPlayer();
                  }
               }
               // check and attack a cell that is around an X
            } else if (_cpuPreviousAttack) {
               let pb = playerBoard.getBoard();
               let { row, column } = _cpuPreviousAttack;
               let nearCells = [];
               let cellsCounter = 0;

               // populate nearCells
               pb[row - 1] && pb[row - 1][column]
                  ? nearCells.push({
                       cell: pb[row - 1][column],
                       direction: "above",
                       row: row - 1,
                       column: column,
                    })
                  : null;
               pb[row] && pb[row][column + 1]
                  ? nearCells.push({
                       cell: pb[row][column + 1],
                       direction: "next",
                       row: row,
                       column: column + 1,
                    })
                  : null;
               pb[row + 1] && pb[row + 1][column]
                  ? nearCells.push({
                       cell: pb[row + 1][column],
                       direction: "below",
                       row: row + 1,
                       column: column,
                    })
                  : null;
               pb[row] && pb[row][column - 1]
                  ? nearCells.push({
                       cell: pb[row][column - 1],
                       direction: "before",
                       row: row,
                       column: column - 1,
                    })
                  : null;

               for (let i = 0; i < nearCells.length; i++) {
                  if (nearCells[i].cell === "~") {
                     let attackResult = this.playerBoard.receiveAttack(
                        nearCells[i].row,
                        nearCells[i].column
                     );

                     // update _cpuNextAttack
                     if (attackResult && attackResult.symbol === "X") {
                        _cpuNextAttack = { ...nearCells[i] };
                        updateNextAttackCoordinates();
                     } else {
                        _cpuNextAttack = null;
                     }

                     break;
                  } else {
                     cellsCounter++;
                  }
               }

               if (cellsCounter === nearCells.length) {
                  _cpuPreviousAttack = null;
                  attackRandomCell();
               }

               // attack a random cell
            } else if (_cpuPreviousAttack === null) {
               attackRandomCell();
            }
         };

         // attack computer
         _computerBoard.receiveAttack(row, cell);

         if (_computerBoard.allShipsSunk()) {
            _winnerMessage = "Player won the match";
            return _winnerMessage;
         }

         // attack player
         attackPlayer();

         if (this.playerBoard.allShipsSunk()) {
            _winnerMessage = "Computer won the match";
            return _winnerMessage;
         }

         return this;
      }

      return _winnerMessage;
   };

   const getWinner = function () {
      return _winnerMessage;
   };

   const reset = function () {
      _winnerMessage = undefined;
      _canGameStart = false;
      _computerBoard = Gameboard();
      this.playerBoard = Gameboard();
   };

   return {
      playerBoard,
      getComputerBoard,
      init,
      takeTurn,
      getWinner,
      reset,
   };
})();

export default Game;
