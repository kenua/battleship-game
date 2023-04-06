import Game from "./game.js";
import "./scss/styles.scss";

// # NEW CODE
// remove later "new" from every variable or function name
const newPlayerBoard = document.getElementById("player-board");
const newPlayerShipsGrid = document.getElementById("player-ships-grid");
const opponentBoardContainer = document.getElementById('opponent-board-container');
const newOpponentBoard = document.getElementById("opponent-board");
const newOpponentShipsGrid = document.getElementById("opponent-ships-grid");
const newShipButtonsContainer = document.getElementById('ship-buttons');
const shipButtons = document.getElementsByClassName('new-button');
const shipsCounters = document.getElementsByClassName('counter');
const newStartBtn = document.getElementById('new-start-button');
const playAgainContainer = document.getElementById('play-again-container');
const winnerMessage = document.getElementById('winner-message');
const playAgainBtn = document.getElementById('play-again-button');

const playerBoardCells = [];
const cpuBoardCells = [];

let length = null;
let direction = "horizontal";
let shipsInfo = null;
let previousClickedBtn = null;
let currentCell = null;
let cellsToHighlight = [];

// # GENERATE PLAYER'S AND OPPONENT'S BOARD
// add letters
let letters = ['a','b','c','d','e','f','g','h','i','j'];
for (let i = 0; i < 10; i++) {
   let letterCell = document.createElement('div');
   letterCell.className = 'new-board__cell new-board__cell--letter';
   letterCell.textContent = letters[i];
   newPlayerBoard.append(letterCell);

   let letterCellClone = letterCell.cloneNode();
   letterCellClone.textContent = letters[i];
   newOpponentBoard.append(letterCellClone);
}

// add numbers
for (let i = 0; i < 10; i++) {
   let numberCell = document.createElement('div');
   numberCell.className = 'new-board__cell new-board__cell--number';
   numberCell.textContent = i + 1;
   newPlayerBoard.append(numberCell);

   let numberCellClone = numberCell.cloneNode();
   numberCellClone.textContent = i + 1;
   newOpponentBoard.append(numberCellClone);
}

// add cells for ships
for (let row = 0; row < 10; row++) {
   playerBoardCells.push([]);
   cpuBoardCells.push([]);

   for (let cell = 0; cell < 10; cell++) {
      let cellBtn = document.createElement("button");

      cellBtn.type = "button";
      cellBtn.className = "new-board__cell new-board__cell--ship";
      cellBtn.dataset.row = row;
      cellBtn.dataset.cell = cell;
      cellBtn.dataset.filled = "false";
      newPlayerShipsGrid.append(cellBtn);
      playerBoardCells[row].push(cellBtn);

      let clone = cellBtn.cloneNode();
      newOpponentShipsGrid.append(clone);
      cpuBoardCells[row].push(clone);
   }
}

newShipButtonsContainer.addEventListener('click', handleClickedButtons);
newPlayerShipsGrid.addEventListener("mouseover", showPreviewHandler);
newPlayerShipsGrid.addEventListener("mouseout", removeShipPreview);
newPlayerShipsGrid.addEventListener("click", placeNewShip);
newPlayerShipsGrid.addEventListener("contextmenu", removeShip);
window.addEventListener("keydown", rotateShip);
newStartBtn.addEventListener("click", initializeGame);
playAgainBtn.addEventListener('click', resetGame);

function handleClickedButtons(e) {
   let buttonNode = e.target.closest('button.new-button');

   if (!buttonNode) return;

   // handle buttons that change "length" variable
   if (buttonNode.dataset.squares) {
      length = +buttonNode.dataset.squares;

      if (previousClickedBtn) {
         previousClickedBtn.classList.remove("new-button__button--active");
      }

      buttonNode.classList.add("new-button__button--active");
      previousClickedBtn = buttonNode;

      // handle rotation-button
   } else if (buttonNode.id === "rotation-buttton") {
      if (direction === "horizontal") {
         direction = "vertical";
      } else {
         direction = "horizontal";
      }
   }
}

function showPreviewHandler(e) {
   showShipPreview(e.target);
}

function showShipPreview(node) {
   if (length && node.dataset.row && node.dataset.cell) {
      let { row, cell } = node.dataset;

      currentCell = node;
      row = +row;
      cell = +cell;

      // populate "cellsToHighlight" array
      lengthLoop: for (let i = 0; i < length; i++) {
         if (!playerBoardCells[row] || !playerBoardCells[row][cell]) {
            break lengthLoop;
         }

         cellsToHighlight.push(playerBoardCells[row][cell]);
         if (direction === "horizontal") {
            cell++;
         } else {
            row++;
         }
      }

      // paint preview red if ship length does not fit
      if (cellsToHighlight.length < length) {
         cellsToHighlight.forEach((cell) => {
            cell.style.backgroundColor = "#b51717";
            cell.style.color = "black";
            cell.style.borderColor = "#b51717";
         });

         // paint preview either green or red based on filled attribute value
      } else {
         cellsToHighlight.forEach((cell) => {
            if (cell.dataset.filled === "false") {
               cell.style.backgroundColor = "#1cb517";
               cell.style.borderColor = "#1cb517";
            } else {
               cell.style.backgroundColor = "#b51717";
               cell.style.color = "black";
               cell.style.borderColor = "#b51717";
            }
         });
      }
   }
}

function removeShipPreview() {
   cellsToHighlight.forEach((cell) => {
      cell.style.backgroundColor = "";
      cell.style.color = "";
      cell.style.borderColor = "";
   });
   cellsToHighlight = [];
}

function placeNewShip(e) {
   let target = e.target;

   if (length && target.dataset.row && target.dataset.cell) {
      shipsInfo = Game.playerBoard.getShips();
      //errorMessage.textContent = ""; // clear previous error message

      for (let type in shipsInfo) {
         // identify what type of ship the user is going to place
         if (shipsInfo[type].length === length) {
            if (shipsInfo[type].ships.length < shipsInfo[type].max) {
               // place new ship
               Game.playerBoard.placeShip(
                  [+target.dataset.row, +target.dataset.cell],
                  length,
                  direction.slice(0, 3)
               );
               shipsInfo = Game.playerBoard.getShips();

               // disable ship button when getting to maximum number of ships placed
               if (shipsInfo[type].ships.length === shipsInfo[type].max) {
                  length = null;
                  previousClickedBtn.disabled = true;
                  previousClickedBtn.classList.remove("new-button__button--active");
               }

               updatePlayerBoard();
               removeShipPreview();
               updateButtonsCounter();

               if (Game.playerBoard.isArmyComplete()) {
                  newStartBtn.disabled = false;
                  newStartBtn.style.display = "inline-block";
               }
            }
         }
      }
   }
}

function updatePlayerBoard() {
   let board = Game.playerBoard.getBoardAndShips();

   for (let row = 0; row < board.length; row++) {
      for (let cell = 0; cell < board[row].length; cell++) {
         if (board[row][cell].search(/[ABCDX/]/) >= 0) {
            playerBoardCells[row][cell].textContent = board[row][cell];
            playerBoardCells[row][cell].dataset.filled = "true";
         } else {
            playerBoardCells[row][cell].textContent = "";
            playerBoardCells[row][cell].dataset.filled = "false";
         }
      }
   }
}

function updateButtonsCounter() {
   let shipsInfo = Game.playerBoard.getShips();
   let iterator = 0;

   for (let type in shipsInfo) {
      let difference = shipsInfo[type].max - shipsInfo[type].ships.length;

      shipsCounters[iterator].textContent = difference;
      iterator++;
   }
}

function removeShip(e) {
   let target = e.target;

   if (
      target.dataset.row &&
      target.dataset.cell &&
      target.dataset.filled &&
      target.dataset.filled === "true"
   ) {
      let msg = Game.playerBoard.removeShip(
         +target.dataset.row,
         +target.dataset.cell
      );

      if (msg.includes("Removed ship with the following coordinates:")) {
         let index = 0;

         shipsInfo = Game.playerBoard.getShips();

         // enable back disabled buttons
         for (let type in shipsInfo) {
            if (shipsInfo[type].ships.length < shipsInfo[type].max) {
               shipButtons[index].disabled = false;
            }

            index++;
         }

         if (!Game.playerBoard.isArmyComplete()) {
            newStartBtn.disabled = true;
            newStartBtn.style.display = "none";
         }

         updatePlayerBoard();
         showShipPreview(currentCell);
         updateButtonsCounter();
      }
   }

   e.preventDefault();
}

function rotateShip(e) {
   if (e.key === "q" || e.key === "Q") {
      if (direction === "horizontal") {
         direction = "vertical";
      } else {
         direction = "horizontal";
      }

      removeShipPreview();
      showShipPreview(currentCell);
   }
}

function initializeGame() {
   if (Game.init()) {
      newPlayerShipsGrid.removeEventListener("mouseover", showPreviewHandler);
      newPlayerShipsGrid.removeEventListener("mouseout", removeShipPreview);
      newPlayerShipsGrid.removeEventListener("click", placeNewShip);
      newPlayerShipsGrid.removeEventListener("contextmenu", removeShip);
      newStartBtn.disabled = true;
      newStartBtn.style.display = 'none';
      newShipButtonsContainer.parentElement.style.display = "none";
      opponentBoardContainer.style.display = "block";
      newOpponentShipsGrid.addEventListener("click", attackCpuBoard);
   }
}

function attackCpuBoard(e) {
   let target = e.target;

   if (
      target.dataset.filled === "false" &&
      target.dataset.row &&
      target.dataset.cell
   ) {
      let { row, cell } = target.dataset;
      let turnResult = Game.takeTurn(+row, +cell);

      updatePlayerBoard();
      updateCpuBoard();

      // declare a winner and print a reset button
      if (
         turnResult.search &&
         turnResult.search(/Player|Computer won the match/gi) >= 0
      ) {
         playAgainContainer.style.display = 'block';
         playAgainBtn.disabled = false;
         winnerMessage.textContent = turnResult;
      }
   }
}

function updateCpuBoard() {
   let board = Game.getComputerBoard();

   for (let row = 0; row < board.length; row++) {
      for (let cell = 0; cell < board[row].length; cell++) {
         if (board[row][cell].search(/[X/]/) >= 0) {
            cpuBoardCells[row][cell].textContent = board[row][cell];
            cpuBoardCells[row][cell].dataset.filled = "true";
         } else {
            cpuBoardCells[row][cell].textContent = "";
            cpuBoardCells[row][cell].dataset.filled = "false";
         }
      }
   }
}

function resetGame() {
   Game.reset();

   playAgainContainer.style.display = '';
   playAgainBtn.disabled = true;
   updateCpuBoard();
   opponentBoardContainer.style.display = "";
   newPlayerShipsGrid.addEventListener("mouseover", showPreviewHandler);
   newPlayerShipsGrid.addEventListener("mouseout", removeShipPreview);
   newPlayerShipsGrid.addEventListener("click", placeNewShip);
   newPlayerShipsGrid.addEventListener("contextmenu", removeShip);
   updatePlayerBoard();
   newShipButtonsContainer.parentElement.style.display = "";
   [...shipButtons].forEach(
      (button) => (button.disabled = false)
   );
   updateButtonsCounter();
   playAgainContainer.style.display = '';
   playAgainBtn.disabled = true;
}
