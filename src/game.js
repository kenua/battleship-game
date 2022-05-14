import Gameboard from "./gameboard.js";

const Game = (function () {
   let _winnerMessage;
   let _canGameStart = false;
   let _computerBoard = Gameboard();
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
            let horientation =
               Math.floor(Math.random() * 2) === 0 ? "ver" : null;

            _computerBoard.placeShip([row, column], length, horientation);
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
         return true;
      } else {
         return false;
      }
   };

   const takeTurn = function (row, cell) {
      if (!_canGameStart) return this;

      if (!_winnerMessage) {
         let attackPlayer = () => {
            try {
               let row = Math.floor(Math.random() * 10);
               let cell = Math.floor(Math.random() * 10);

               this.playerBoard.receiveAttack(row, cell);
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
