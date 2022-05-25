import Game from "./game.js";
import "./scss/styles.scss";

const playerBoard = document.getElementById("playerBoard");
const cpuBoard = document.getElementById("cpuBoard");
const buttonsContainer = document.getElementById("buttons-container");
const shipTableCounters = document.getElementsByClassName("placed-counter");
const errorMessage = document.getElementById("error-message");
const startBtn = document.getElementById("start-button");

const playerBoardCells = [];
const cpuBoardCells = [];

let length = null;
let direction = "horizontal";
let shipsInfo = null;
let previousClickedBtn = null;
let currentCell = null;
let cellsToHighlight = [];

// generate player and cpu cells
for (let row = 0; row < 10; row++) {
   playerBoardCells.push([]);
   cpuBoardCells.push([]);

   for (let cell = 0; cell < 10; cell++) {
      let div = document.createElement("div");

      div.className = "board__cell";
      div.dataset.row = row;
      div.dataset.cell = cell;
      div.dataset.filled = "false";
      playerBoard.append(div);
      playerBoardCells[row].push(div);

      let clone = div.cloneNode();
      cpuBoard.append(clone);
      cpuBoardCells[row].push(clone);
   }
}

buttonsContainer.addEventListener("click", handleClickedButtons);
playerBoard.addEventListener("mouseover", (e) => showShipPreview(e.target));
playerBoard.addEventListener("mouseout", removeShipPreview);
playerBoard.addEventListener("click", placeNewShip);
playerBoard.addEventListener("contextmenu", removeShip);
window.addEventListener("keydown", changeOrientation);

function handleClickedButtons(e) {
   let target = e.target;

   // handle buttons that change "length" variable
   if (target.dataset.length) {
      length = +target.dataset.length;

      if (previousClickedBtn) {
         previousClickedBtn.classList.remove("button--highlighted");
      }

      target.classList.add("button--highlighted");
      previousClickedBtn = target;

      // handle button that changes "direction" variable
   } else if (target.id === "rotation-buttton") {
      if (direction === "horizontal") {
         direction = "vertical";
      } else {
         direction = "horizontal";
      }
   }
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
      errorMessage.textContent = ""; // clear previous error message

      for (let type in shipsInfo) {
         // identify what type of ship the user is going to place
         if (shipsInfo[type].length === length) {
            if (shipsInfo[type].ships.length < shipsInfo[type].max) {
               // place new ship
               try {
                  Game.playerBoard.placeShip(
                     [+target.dataset.row, +target.dataset.cell],
                     length,
                     direction.slice(0, 3)
                  );
                  shipsInfo = Game.playerBoard.getShips();

                  if (shipsInfo[type].ships.length === shipsInfo[type].max) {
                     length = null;
                     previousClickedBtn.disabled = true;
                     previousClickedBtn.classList.remove("button--highlighted");
                  }

                  updatePlayerBoard();
                  removeShipPreview();
                  updateShipsTable();

                  if (Game.playerBoard.isArmyComplete()) {
                     startBtn.disabled = false;
                     startBtn.style.visibility = "visible";
                  }

                  // print error messages
               } catch (e) {
                  if (
                     e.message === "Ship expands to wrong coordinates" ||
                     e.message === "A new ship cannot be place over another"
                  ) {
                     errorMessage.textContent = "Error: " + e.message;
                  } else {
                     errorMessage.textContent =
                        "Error: An error occurred while trying to place a new ship";
                  }
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
         if (board[row][cell].search(/[shm]/) >= 0) {
            playerBoardCells[row][cell].textContent = board[row][cell];
            playerBoardCells[row][cell].dataset.filled = "true";
         } else {
            playerBoardCells[row][cell].textContent = "";
            playerBoardCells[row][cell].dataset.filled = "false";
         }
      }
   }
}

function updateShipsTable() {
   let index = 0;

   for (let type in shipsInfo) {
      shipTableCounters[index].textContent = shipsInfo[type].ships.length;
      index++;
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
         let shipButtons = buttonsContainer.querySelectorAll(".button");
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
            startBtn.disabled = true;
            startBtn.style.visibility = "hidden";
         }

         updatePlayerBoard();
         updateShipsTable();
      }
   }

   e.preventDefault();
}

function changeOrientation(e) {
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
// this file would bring the css file and dom functionality
