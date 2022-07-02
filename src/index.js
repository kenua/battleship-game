import Game from "./game.js";
import "./scss/styles.scss";

const playerBoard = document.getElementById("playerBoard");
const cpuBoardContainer = document.getElementById("cpu-board-container");
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
      let cellBtn = document.createElement("button");

      cellBtn.type = "button";
      cellBtn.className = "board__cell";
      cellBtn.dataset.row = row;
      cellBtn.dataset.cell = cell;
      cellBtn.dataset.filled = "false";
      playerBoard.append(cellBtn);
      playerBoardCells[row].push(cellBtn);

      let clone = cellBtn.cloneNode();
      cpuBoard.append(clone);
      cpuBoardCells[row].push(clone);
   }
}

buttonsContainer.addEventListener("click", handleClickedButtons);
playerBoard.addEventListener("mouseover", showPreviewHandler);
playerBoard.addEventListener("mouseout", removeShipPreview);
playerBoard.addEventListener("click", placeNewShip);
playerBoard.addEventListener("contextmenu", removeShip);
window.addEventListener("keydown", rotateShip);
startBtn.addEventListener("click", initializeGame);

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

      // handle rotation-button
   } else if (target.id === "rotation-buttton") {
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

                  // disable ship button when getting to maximum number of ships placed
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
                     e.message === "New ship coordinates are invalid" ||
                     e.message === "Can't place new ship over another"
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
         showShipPreview(currentCell);
         updateShipsTable();
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
      playerBoard.removeEventListener("mouseover", showPreviewHandler);
      playerBoard.removeEventListener("mouseout", removeShipPreview);
      playerBoard.removeEventListener("click", placeNewShip);
      playerBoard.removeEventListener("contextmenu", removeShip);
      startBtn.disabled = true;
      buttonsContainer.parentElement.style.display = "none";
      cpuBoardContainer.style.display = "block";

      cpuBoard.addEventListener("click", attackCpuBoard);
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
         let div = document.createElement("div");
         let p = document.createElement("p");
         let button = document.createElement("button");

         div.className = "reset-container";
         p.textContent = turnResult;
         button.className = "button";
         button.textContent = "Reset Game";
         div.append(p, button);
         document.body.firstElementChild.after(div);

         button.addEventListener("click", resetGame);
         cpuBoard.removeEventListener("click", attackCpuBoard);
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

   document.body.firstElementChild.nextElementSibling.remove();
   updateCpuBoard();
   cpuBoard.removeEventListener("click", attackCpuBoard);
   playerBoard.addEventListener("mouseover", showPreviewHandler);
   playerBoard.addEventListener("mouseout", removeShipPreview);
   playerBoard.addEventListener("click", placeNewShip);
   playerBoard.addEventListener("contextmenu", removeShip);
   updatePlayerBoard();
   buttonsContainer.parentElement.style.display = "block";
   [...buttonsContainer.querySelectorAll(".button")].forEach(
      (button) => (button.disabled = false)
   );
   [...shipTableCounters].forEach((counter) => (counter.textContent = "0"));
   cpuBoardContainer.style.display = "";
   startBtn.disabled = true;
   startBtn.style.visibility = "hidden";
}
