"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["index"],{

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");


var Game = function () {
  var _winnerMessage;

  var _canGameStart = false;

  var _computerBoard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

  var playerBoard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

  var getComputerBoard = function getComputerBoard() {
    return _computerBoard.getBoard();
  };

  var init = function init() {
    var placeEnemyArmy = function placeEnemyArmy(type) {
      try {
        // place ships
        var row = Math.floor(Math.random() * 10);
        var column = Math.floor(Math.random() * 10);
        var length = type.length;
        var direction = Math.floor(Math.random() * 2) === 0 ? "ver" : null;

        _computerBoard.placeShip([row, column], length, direction);

        placeEnemyArmy(type);
      } catch (e) {
        if (!e.message.includes("Exceeded number of ships")) {
          placeEnemyArmy(type);
        } else {
          return "finished";
        }
      }
    }; // fill computerBoard with ships


    if (!_computerBoard.isArmyComplete()) {
      var computerShipsInfo = _computerBoard.getShips();

      for (var type in computerShipsInfo) {
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

  var takeTurn = function takeTurn(row, cell) {
    var _this = this;

    if (!_canGameStart) return this;

    if (!_winnerMessage) {
      var attackPlayer = function attackPlayer() {
        try {
          var _row = Math.floor(Math.random() * 10);

          var _cell = Math.floor(Math.random() * 10);

          _this.playerBoard.receiveAttack(_row, _cell);
        } catch (e) {
          if (e.message.includes("You already attacked the following coordinates")) {
            attackPlayer();
          }
        }
      }; // attack computer


      _computerBoard.receiveAttack(row, cell);

      if (_computerBoard.allShipsSunk()) {
        _winnerMessage = "Player won the match";
        return _winnerMessage;
      } // attack player


      attackPlayer();

      if (this.playerBoard.allShipsSunk()) {
        _winnerMessage = "Computer won the match";
        return _winnerMessage;
      }

      return this;
    }

    return _winnerMessage;
  };

  var getWinner = function getWinner() {
    return _winnerMessage;
  };

  var reset = function reset() {
    _winnerMessage = undefined;
    _canGameStart = false;
    _computerBoard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    this.playerBoard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  };

  return {
    playerBoard: playerBoard,
    getComputerBoard: getComputerBoard,
    init: init,
    takeTurn: takeTurn,
    getWinner: getWinner,
    reset: reset
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var Gameboard = function Gameboard() {
  var _board = [];
  var _ships = {
    type1: {
      ships: [],
      length: 5,
      max: 1,
      symbol: "A"
    },
    type2: {
      ships: [],
      length: 4,
      max: 2,
      symbol: "B"
    },
    type3: {
      ships: [],
      length: 3,
      max: 3,
      symbol: "C"
    },
    type4: {
      ships: [],
      length: 2,
      max: 4,
      symbol: "D"
    }
  }; // create 10 rows and 10 cells for _board

  for (var row = 0; row < 10; row++) {
    _board.push([]);

    for (var cell = 0; cell < 10; cell++) {
      _board[row].push("~");
    }
  }

  var getBoard = function getBoard() {
    return JSON.parse(JSON.stringify(_board));
  };

  var getShips = function getShips() {
    var shipsClone = {};

    var _loop = function _loop(key) {
      shipsClone[key] = {};
      shipsClone[key].ships = [];
      shipsClone[key].length = _ships[key].length;
      shipsClone[key].max = _ships[key].max;

      _ships[key].ships.forEach(function (ship) {
        var clone = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ship.getLength(), ship.getCoors());

        for (var i = 0; i < ship.getHits(); i++) {
          clone.hit();
        }

        shipsClone[key].ships.push(clone);
      });
    };

    for (var key in _ships) {
      _loop(key);
    }

    return shipsClone;
  };

  var getBoardAndShips = function getBoardAndShips() {
    var boardCopy = this.getBoard();

    var _loop2 = function _loop2(type) {
      for (var i = 0; i < _ships[type].ships.length; i++) {
        var currentShip = _ships[type].ships[i];
        var shipCoors = currentShip.getCoors();
        shipCoors.forEach(function (coors) {
          var _coors = _slicedToArray(coors, 2),
              row = _coors[0],
              column = _coors[1];

          if (boardCopy[row][column] === "~") {
            boardCopy[row][column] = _ships[type].symbol;
          }
        });
      }
    };

    for (var type in _ships) {
      _loop2(type);
    }

    return boardCopy;
  };

  var placeShip = function placeShip() {
    var coordinates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0];
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var direction = arguments.length > 2 ? arguments[2] : undefined;

    if (isNaN(Number(coordinates[0])) || isNaN(Number(coordinates[1]))) {
      throw new Error("Coordinates should be numbers");
    }

    if (isNaN(Number(length)) || length > 5 || length < 2) {
      throw new Error("Length should be a number between 2 and 5");
    }

    var shipCoordinates = [_toConsumableArray(coordinates)]; // generate coordinates that expand based on length and direction

    for (var i = 0; i < length - 1; i++) {
      // expand coordinates vertically
      if (direction === "ver") {
        var coorsCopy = _toConsumableArray(shipCoordinates[i]);

        coorsCopy[0]++;
        shipCoordinates.push(coorsCopy); // expand coordinates horizontally
      } else {
        var _coorsCopy = _toConsumableArray(shipCoordinates[i]);

        _coorsCopy[1]++;
        shipCoordinates.push(_coorsCopy);
      }
    } // check if shipCoordinates are valid


    for (var _i2 = 0; _i2 < shipCoordinates.length; _i2++) {
      var currentCoor = shipCoordinates[_i2];
      if (currentCoor[0] > 9 || currentCoor[0] < 0) throw new Error("Ship expands to wrong coordinates");
      if (currentCoor[1] > 9 || currentCoor[1] < 0) throw new Error("Ship expands to wrong coordinates");
    }

    var newShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(length, shipCoordinates); // check if newShip can be added to _ships

    for (var type in _ships) {
      if (_ships[type].length === newShip.getLength()) {
        if (_ships[type].ships.length < _ships[type].max) {
          // check every ship's coordinates to see if newShip does not have
          // the same coordinates of another ship
          for (var _type in _ships) {
            _ships[_type].ships.forEach(function (ship) {
              ship.getCoors().forEach(function (shipCoors) {
                newShip.getCoors().forEach(function (newShipCoors) {
                  if (shipCoors[0] === newShipCoors[0] && shipCoors[1] === newShipCoors[1]) {
                    throw new Error("A new ship cannot be place over another");
                  }
                });
              });
            });
          }

          _ships[type].ships.push(newShip);

          return this;
        } else {
          var errorMsg = "Exceeded number of ships: maximun number for ".concat(length, " length ships is ").concat(_ships[type].max);
          throw new Error(errorMsg);
        }
      }
    }
  };

  var removeShip = function removeShip() {
    var row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var cell = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var filteredShips;
    var coors;

    for (var type in _ships) {
      var _loop3 = function _loop3(i) {
        var currentShip = _ships[type].ships[i];
        var shipCoors = currentShip.getCoors();

        for (var j = 0; j < shipCoors.length; j++) {
          if (shipCoors[j][0] === row && shipCoors[j][1] === cell) {
            filteredShips = _ships[type].ships.filter(function (ship) {
              return ship !== currentShip;
            });
            coors = shipCoors;
            return "break|shipsLoop";
          }
        }
      };

      // search and filter out ship that has "row" and "cell" as coordinates
      shipsLoop: for (var i = 0; i < _ships[type].ships.length; i++) {
        var _ret = _loop3(i);

        if (_ret === "break|shipsLoop") break shipsLoop;
      } // update _ships[type].ships array


      if (filteredShips) {
        var resultMsg = "Removed ship with the following coordinates: ";
        resultMsg += coors.reduce(function (acc, current) {
          return acc + "[".concat(current[0], ", ").concat(current[1], "], ");
        }, "").slice(0, -2);
        _ships[type].ships = filteredShips;
        return resultMsg;
      }
    }

    return "There is no ship in [".concat(row, ",").concat(cell, "] coordinates");
  };

  var isArmyComplete = function isArmyComplete() {
    for (var type in _ships) {
      if (_ships[type].ships.length < _ships[type].max) return false;
    }

    return true;
  };

  var receiveAttack = function receiveAttack() {
    var row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var cell = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var symbol = "/";

    if (row > 9 || row < 0 || cell > 9 || cell < 0) {
      throw new Error("Provided coordinates are not valid: [".concat(row, ",").concat(cell, "]"));
    }

    if (_board[row][cell] !== "~") {
      throw new Error("You already attacked the following coordinates: [".concat(row, ",").concat(cell, "]"));
    } // check if any ship has "row" and "cell" as coordinates and hit it


    typeLoop: for (var type in _ships) {
      for (var i = 0; i < _ships[type].ships.length; i++) {
        var currentShip = _ships[type].ships[i];
        var shipCoors = currentShip.getCoors();

        for (var j = 0; j < shipCoors.length; j++) {
          if (shipCoors[j][0] === row && shipCoors[j][1] === cell) {
            currentShip.hit();
            symbol = "X";
            break typeLoop;
          }
        }
      }
    }

    _board[row][cell] = symbol;
    return this;
  };

  var allShipsSunk = function allShipsSunk() {
    for (var type in _ships) {
      for (var i = 0; i < _ships[type].ships.length; i++) {
        if (!_ships[type].ships[i].isSunk()) return false;
      }
    }

    return true;
  };

  return {
    getBoard: getBoard,
    getShips: getShips,
    getBoardAndShips: getBoardAndShips,
    placeShip: placeShip,
    removeShip: removeShip,
    isArmyComplete: isArmyComplete,
    receiveAttack: receiveAttack,
    allShipsSunk: allShipsSunk
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/game.js");
/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/styles.scss */ "./src/scss/styles.scss");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var playerBoard = document.getElementById("playerBoard");
var cpuBoardContainer = document.getElementById("cpu-board-container");
var cpuBoard = document.getElementById("cpuBoard");
var buttonsContainer = document.getElementById("buttons-container");
var shipTableCounters = document.getElementsByClassName("placed-counter");
var errorMessage = document.getElementById("error-message");
var startBtn = document.getElementById("start-button");
var playerBoardCells = [];
var cpuBoardCells = [];
var length = null;
var direction = "horizontal";
var shipsInfo = null;
var previousClickedBtn = null;
var currentCell = null;
var cellsToHighlight = []; // generate player and cpu cells

for (var row = 0; row < 10; row++) {
  playerBoardCells.push([]);
  cpuBoardCells.push([]);

  for (var cell = 0; cell < 10; cell++) {
    var cellBtn = document.createElement("button");
    cellBtn.type = "button";
    cellBtn.className = "board__cell";
    cellBtn.dataset.row = row;
    cellBtn.dataset.cell = cell;
    cellBtn.dataset.filled = "false";
    playerBoard.append(cellBtn);
    playerBoardCells[row].push(cellBtn);
    var clone = cellBtn.cloneNode();
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
  var target = e.target; // handle buttons that change "length" variable

  if (target.dataset.length) {
    length = +target.dataset.length;

    if (previousClickedBtn) {
      previousClickedBtn.classList.remove("button--highlighted");
    }

    target.classList.add("button--highlighted");
    previousClickedBtn = target; // handle rotation-button
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
    var _node$dataset = node.dataset,
        _row = _node$dataset.row,
        _cell = _node$dataset.cell;
    currentCell = node;
    _row = +_row;
    _cell = +_cell; // populate "cellsToHighlight" array

    lengthLoop: for (var i = 0; i < length; i++) {
      if (!playerBoardCells[_row] || !playerBoardCells[_row][_cell]) {
        break lengthLoop;
      }

      cellsToHighlight.push(playerBoardCells[_row][_cell]);

      if (direction === "horizontal") {
        _cell++;
      } else {
        _row++;
      }
    } // paint preview red if ship length does not fit


    if (cellsToHighlight.length < length) {
      cellsToHighlight.forEach(function (cell) {
        cell.style.backgroundColor = "#b51717";
        cell.style.color = "black";
        cell.style.borderColor = "#b51717";
      }); // paint preview either green or red based on filled attribute value
    } else {
      cellsToHighlight.forEach(function (cell) {
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
  cellsToHighlight.forEach(function (cell) {
    cell.style.backgroundColor = "";
    cell.style.color = "";
    cell.style.borderColor = "";
  });
  cellsToHighlight = [];
}

function placeNewShip(e) {
  var target = e.target;

  if (length && target.dataset.row && target.dataset.cell) {
    shipsInfo = _game_js__WEBPACK_IMPORTED_MODULE_0__["default"].playerBoard.getShips();
    errorMessage.textContent = ""; // clear previous error message

    for (var type in shipsInfo) {
      // identify what type of ship the user is going to place
      if (shipsInfo[type].length === length) {
        if (shipsInfo[type].ships.length < shipsInfo[type].max) {
          // place new ship
          try {
            _game_js__WEBPACK_IMPORTED_MODULE_0__["default"].playerBoard.placeShip([+target.dataset.row, +target.dataset.cell], length, direction.slice(0, 3));
            shipsInfo = _game_js__WEBPACK_IMPORTED_MODULE_0__["default"].playerBoard.getShips(); // disable ship button when getting to maximum number of ships placed

            if (shipsInfo[type].ships.length === shipsInfo[type].max) {
              length = null;
              previousClickedBtn.disabled = true;
              previousClickedBtn.classList.remove("button--highlighted");
            }

            updatePlayerBoard();
            removeShipPreview();
            updateShipsTable();

            if (_game_js__WEBPACK_IMPORTED_MODULE_0__["default"].playerBoard.isArmyComplete()) {
              startBtn.disabled = false;
              startBtn.style.visibility = "visible";
            } // print error messages

          } catch (e) {
            if (e.message === "Ship expands to wrong coordinates" || e.message === "A new ship cannot be place over another") {
              errorMessage.textContent = "Error: " + e.message;
            } else {
              errorMessage.textContent = "Error: An error occurred while trying to place a new ship";
            }
          }
        }
      }
    }
  }
}

function updatePlayerBoard() {
  var board = _game_js__WEBPACK_IMPORTED_MODULE_0__["default"].playerBoard.getBoardAndShips();

  for (var _row2 = 0; _row2 < board.length; _row2++) {
    for (var _cell2 = 0; _cell2 < board[_row2].length; _cell2++) {
      if (board[_row2][_cell2].search(/[ABCDX/]/) >= 0) {
        playerBoardCells[_row2][_cell2].textContent = board[_row2][_cell2];
        playerBoardCells[_row2][_cell2].dataset.filled = "true";
      } else {
        playerBoardCells[_row2][_cell2].textContent = "";
        playerBoardCells[_row2][_cell2].dataset.filled = "false";
      }
    }
  }
}

function updateShipsTable() {
  var index = 0;

  for (var type in shipsInfo) {
    shipTableCounters[index].textContent = shipsInfo[type].ships.length;
    index++;
  }
}

function removeShip(e) {
  var target = e.target;

  if (target.dataset.row && target.dataset.cell && target.dataset.filled && target.dataset.filled === "true") {
    var msg = _game_js__WEBPACK_IMPORTED_MODULE_0__["default"].playerBoard.removeShip(+target.dataset.row, +target.dataset.cell);

    if (msg.includes("Removed ship with the following coordinates:")) {
      var shipButtons = buttonsContainer.querySelectorAll(".button");
      var index = 0;
      shipsInfo = _game_js__WEBPACK_IMPORTED_MODULE_0__["default"].playerBoard.getShips(); // enable back disabled buttons

      for (var type in shipsInfo) {
        if (shipsInfo[type].ships.length < shipsInfo[type].max) {
          shipButtons[index].disabled = false;
        }

        index++;
      }

      if (!_game_js__WEBPACK_IMPORTED_MODULE_0__["default"].playerBoard.isArmyComplete()) {
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
  if (_game_js__WEBPACK_IMPORTED_MODULE_0__["default"].init()) {
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
  var target = e.target;

  if (target.dataset.filled === "false" && target.dataset.row && target.dataset.cell) {
    var _target$dataset = target.dataset,
        _row3 = _target$dataset.row,
        _cell3 = _target$dataset.cell;
    var turnResult = _game_js__WEBPACK_IMPORTED_MODULE_0__["default"].takeTurn(+_row3, +_cell3);
    updatePlayerBoard();
    updateCpuBoard(); // declare a winner and print a reset button

    if (turnResult.search && turnResult.search(/Player|Computer won the match/gi) >= 0) {
      var div = document.createElement("div");
      var p = document.createElement("p");
      var button = document.createElement("button");
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
  var board = _game_js__WEBPACK_IMPORTED_MODULE_0__["default"].getComputerBoard();

  for (var _row4 = 0; _row4 < board.length; _row4++) {
    for (var _cell4 = 0; _cell4 < board[_row4].length; _cell4++) {
      if (board[_row4][_cell4].search(/[X/]/) >= 0) {
        cpuBoardCells[_row4][_cell4].textContent = board[_row4][_cell4];
        cpuBoardCells[_row4][_cell4].dataset.filled = "true";
      } else {
        cpuBoardCells[_row4][_cell4].textContent = "";
        cpuBoardCells[_row4][_cell4].dataset.filled = "false";
      }
    }
  }
}

function resetGame() {
  _game_js__WEBPACK_IMPORTED_MODULE_0__["default"].reset();
  document.body.firstElementChild.nextElementSibling.remove();
  updateCpuBoard();
  cpuBoard.removeEventListener("click", attackCpuBoard);
  playerBoard.addEventListener("mouseover", showPreviewHandler);
  playerBoard.addEventListener("mouseout", removeShipPreview);
  playerBoard.addEventListener("click", placeNewShip);
  playerBoard.addEventListener("contextmenu", removeShip);
  updatePlayerBoard();
  buttonsContainer.parentElement.style.display = "block";

  _toConsumableArray(buttonsContainer.querySelectorAll(".button")).forEach(function (button) {
    return button.disabled = false;
  });

  _toConsumableArray(shipTableCounters).forEach(function (counter) {
    return counter.textContent = "0";
  });

  cpuBoardContainer.style.display = "";
  startBtn.disabled = true;
  startBtn.style.visibility = "hidden";
}

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Ship = function Ship(length, coordinates) {
  var _coordinates = coordinates || null;

  var _length = length || 2;

  var _hitsCounter = 0;

  var getCoors = function getCoors() {
    return JSON.parse(JSON.stringify(_coordinates));
  };

  var getLength = function getLength() {
    return _length;
  };

  var getHits = function getHits() {
    return _hitsCounter;
  };

  var hit = function hit() {
    _hitsCounter++;
    return _hitsCounter;
  };

  var isSunk = function isSunk() {
    return _hitsCounter === length;
  };

  return {
    getCoors: getCoors,
    getLength: getLength,
    getHits: getHits,
    hit: hit,
    isSunk: isSunk
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/styles.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/styles.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  line-height: 1;\n  background-color: black;\n  color: #1cb517;\n  margin: 16px;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\np {\n  line-height: 1.5;\n}\n\n.instructions {\n  font-size: 1rem;\n  max-width: 500px;\n  padding: 1rem;\n  border: 1px solid #1cb517;\n  margin-top: 3rem;\n}\n.instructions h1 {\n  font-size: 1.5rem;\n  margin-bottom: 1rem;\n}\n\n.board-container h1 {\n  text-align: center;\n  text-transform: uppercase;\n  font-size: 1.5rem;\n  margin-bottom: 1rem;\n}\n\n.board {\n  font-size: 18px;\n  display: grid;\n  grid-template-columns: 30px auto;\n  justify-content: center;\n}\n\n.board__letters-container {\n  display: grid;\n  gap: 3px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n  grid-column: 2;\n  grid-row: 1;\n}\n.board__letters-container .board__cell {\n  border: none;\n}\n.board__letters-container .board__cell:nth-child(1)::before {\n  content: \"1\";\n}\n.board__letters-container .board__cell:nth-child(2)::before {\n  content: \"2\";\n}\n.board__letters-container .board__cell:nth-child(3)::before {\n  content: \"3\";\n}\n.board__letters-container .board__cell:nth-child(4)::before {\n  content: \"4\";\n}\n.board__letters-container .board__cell:nth-child(5)::before {\n  content: \"5\";\n}\n.board__letters-container .board__cell:nth-child(6)::before {\n  content: \"6\";\n}\n.board__letters-container .board__cell:nth-child(7)::before {\n  content: \"7\";\n}\n.board__letters-container .board__cell:nth-child(8)::before {\n  content: \"8\";\n}\n.board__letters-container .board__cell:nth-child(9)::before {\n  content: \"9\";\n}\n.board__letters-container .board__cell:nth-child(10)::before {\n  content: \"10\";\n}\n\n.board__digits-container {\n  display: grid;\n  gap: 3px;\n  grid-template-columns: 30px;\n  grid-auto-rows: 30px;\n  grid-column: 1;\n  grid-row: 2;\n}\n.board__digits-container .board__cell {\n  border: none;\n}\n.board__digits-container .board__cell:nth-child(1)::before {\n  content: \"a\";\n}\n.board__digits-container .board__cell:nth-child(2)::before {\n  content: \"b\";\n}\n.board__digits-container .board__cell:nth-child(3)::before {\n  content: \"c\";\n}\n.board__digits-container .board__cell:nth-child(4)::before {\n  content: \"d\";\n}\n.board__digits-container .board__cell:nth-child(5)::before {\n  content: \"e\";\n}\n.board__digits-container .board__cell:nth-child(6)::before {\n  content: \"f\";\n}\n.board__digits-container .board__cell:nth-child(7)::before {\n  content: \"g\";\n}\n.board__digits-container .board__cell:nth-child(8)::before {\n  content: \"h\";\n}\n.board__digits-container .board__cell:nth-child(9)::before {\n  content: \"i\";\n}\n.board__digits-container .board__cell:nth-child(10)::before {\n  content: \"j\";\n}\n\n.board__cell {\n  background-color: black;\n  color: #1cb517;\n  border: 1px solid #1cb517;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.board__board {\n  grid-row: 2;\n  display: grid;\n  gap: 3px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n}\n.board__board .board__cell:hover {\n  background-color: #1cb517;\n  color: black;\n}\n\n#error-message {\n  font-size: 1rem;\n  text-align: center;\n  max-width: 500px;\n  grid-column: 1/-1;\n  margin-top: 1rem;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 0 1rem;\n}\n\n#cpu-board-container {\n  display: none;\n  margin-top: 2rem;\n}\n\n.player-buttons ul {\n  text-align: center;\n  margin: 2rem 0;\n}\n.player-buttons ul li {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\n.ships-table {\n  font-size: 1rem;\n  border: 1px solid #1cb517;\n  margin-bottom: 2rem;\n  margin-left: auto;\n  margin-right: auto;\n}\n.ships-table td, .ships-table th {\n  padding: 0.5rem;\n  border: 1px solid #1cb517;\n}\n\n#start-button {\n  visibility: hidden;\n}\n\n.reset-container {\n  font-size: 1, 5rem;\n  text-align: center;\n  margin: 3rem 0;\n}\n.reset-container p {\n  margin-bottom: 1rem;\n}\n\n.button {\n  font-family: monospace;\n  font-size: 1rem;\n  text-shadow: 0 0 10px #1cb517;\n  background-color: black;\n  color: #1cb517;\n  padding: 0.5rem 0.8rem;\n  border: 1px solid #1cb517;\n  cursor: pointer;\n}\n.button:hover {\n  background-color: #1cb517;\n  color: black;\n}\n.button--highlighted {\n  background-color: #1cb517;\n  color: black;\n}\n.button:disabled {\n  opacity: 0.4;\n}\n\n@media only screen and (min-width: 1000px) {\n  .grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n  }\n\n  .ships-table {\n    width: 100%;\n  }\n\n  #cpu-board-container {\n    margin-top: 0;\n  }\n\n  .player-buttons ul {\n    margin: 0;\n    margin-bottom: 2rem;\n  }\n  .player-buttons ul li {\n    display: block;\n  }\n  .player-buttons .button {\n    display: block;\n    width: 100%;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/_reset.scss","webpack://./src/scss/styles.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_instructions.scss","webpack://./src/scss/_board.scss","webpack://./src/scss/_buttons.scss","webpack://./src/scss/_media-queries.scss"],"names":[],"mappings":"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","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n@use './variables' as *;\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, center,\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed, \r\nfigure, figcaption, footer, header, hgroup, \r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tfont-size: 100%;\r\n\tfont: inherit;\r\n\tvertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure, \r\nfooter, header, hgroup, menu, nav, section {\r\n\tdisplay: block;\r\n}\r\nbody {\r\n\tfont-family: monospace;\r\n   text-shadow: 0 0 10px $green;\r\n\tline-height: 1;\r\n   background-color: black;\r\n   color: $green;\r\n\tmargin: 16px;\r\n}\r\nol, ul {\r\n\tlist-style: none;\r\n}\r\nblockquote, q {\r\n\tquotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n\tcontent: '';\r\n\tcontent: none;\r\n}\r\ntable {\r\n\tborder-collapse: collapse;\r\n\tborder-spacing: 0;\r\n}\r\np {\r\n\tline-height: 1.5;\r\n}","/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  line-height: 1;\n  background-color: black;\n  color: #1cb517;\n  margin: 16px;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\np {\n  line-height: 1.5;\n}\n\n.instructions {\n  font-size: 1rem;\n  max-width: 500px;\n  padding: 1rem;\n  border: 1px solid #1cb517;\n  margin-top: 3rem;\n}\n.instructions h1 {\n  font-size: 1.5rem;\n  margin-bottom: 1rem;\n}\n\n.board-container h1 {\n  text-align: center;\n  text-transform: uppercase;\n  font-size: 1.5rem;\n  margin-bottom: 1rem;\n}\n\n.board {\n  font-size: 18px;\n  display: grid;\n  grid-template-columns: 30px auto;\n  justify-content: center;\n}\n\n.board__letters-container {\n  display: grid;\n  gap: 3px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n  grid-column: 2;\n  grid-row: 1;\n}\n.board__letters-container .board__cell {\n  border: none;\n}\n.board__letters-container .board__cell:nth-child(1)::before {\n  content: \"1\";\n}\n.board__letters-container .board__cell:nth-child(2)::before {\n  content: \"2\";\n}\n.board__letters-container .board__cell:nth-child(3)::before {\n  content: \"3\";\n}\n.board__letters-container .board__cell:nth-child(4)::before {\n  content: \"4\";\n}\n.board__letters-container .board__cell:nth-child(5)::before {\n  content: \"5\";\n}\n.board__letters-container .board__cell:nth-child(6)::before {\n  content: \"6\";\n}\n.board__letters-container .board__cell:nth-child(7)::before {\n  content: \"7\";\n}\n.board__letters-container .board__cell:nth-child(8)::before {\n  content: \"8\";\n}\n.board__letters-container .board__cell:nth-child(9)::before {\n  content: \"9\";\n}\n.board__letters-container .board__cell:nth-child(10)::before {\n  content: \"10\";\n}\n\n.board__digits-container {\n  display: grid;\n  gap: 3px;\n  grid-template-columns: 30px;\n  grid-auto-rows: 30px;\n  grid-column: 1;\n  grid-row: 2;\n}\n.board__digits-container .board__cell {\n  border: none;\n}\n.board__digits-container .board__cell:nth-child(1)::before {\n  content: \"a\";\n}\n.board__digits-container .board__cell:nth-child(2)::before {\n  content: \"b\";\n}\n.board__digits-container .board__cell:nth-child(3)::before {\n  content: \"c\";\n}\n.board__digits-container .board__cell:nth-child(4)::before {\n  content: \"d\";\n}\n.board__digits-container .board__cell:nth-child(5)::before {\n  content: \"e\";\n}\n.board__digits-container .board__cell:nth-child(6)::before {\n  content: \"f\";\n}\n.board__digits-container .board__cell:nth-child(7)::before {\n  content: \"g\";\n}\n.board__digits-container .board__cell:nth-child(8)::before {\n  content: \"h\";\n}\n.board__digits-container .board__cell:nth-child(9)::before {\n  content: \"i\";\n}\n.board__digits-container .board__cell:nth-child(10)::before {\n  content: \"j\";\n}\n\n.board__cell {\n  background-color: black;\n  color: #1cb517;\n  border: 1px solid #1cb517;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.board__board {\n  grid-row: 2;\n  display: grid;\n  gap: 3px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n}\n.board__board .board__cell:hover {\n  background-color: #1cb517;\n  color: black;\n}\n\n#error-message {\n  font-size: 1rem;\n  text-align: center;\n  max-width: 500px;\n  grid-column: 1/-1;\n  margin-top: 1rem;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 0 1rem;\n}\n\n#cpu-board-container {\n  display: none;\n  margin-top: 2rem;\n}\n\n.player-buttons ul {\n  text-align: center;\n  margin: 2rem 0;\n}\n.player-buttons ul li {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\n.ships-table {\n  font-size: 1rem;\n  border: 1px solid #1cb517;\n  margin-bottom: 2rem;\n  margin-left: auto;\n  margin-right: auto;\n}\n.ships-table td, .ships-table th {\n  padding: 0.5rem;\n  border: 1px solid #1cb517;\n}\n\n#start-button {\n  visibility: hidden;\n}\n\n.reset-container {\n  font-size: 1, 5rem;\n  text-align: center;\n  margin: 3rem 0;\n}\n.reset-container p {\n  margin-bottom: 1rem;\n}\n\n.button {\n  font-family: monospace;\n  font-size: 1rem;\n  text-shadow: 0 0 10px #1cb517;\n  background-color: black;\n  color: #1cb517;\n  padding: 0.5rem 0.8rem;\n  border: 1px solid #1cb517;\n  cursor: pointer;\n}\n.button:hover {\n  background-color: #1cb517;\n  color: black;\n}\n.button--highlighted {\n  background-color: #1cb517;\n  color: black;\n}\n.button:disabled {\n  opacity: 0.4;\n}\n\n@media only screen and (min-width: 1000px) {\n  .grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n  }\n\n  .ships-table {\n    width: 100%;\n  }\n\n  #cpu-board-container {\n    margin-top: 0;\n  }\n\n  .player-buttons ul {\n    margin: 0;\n    margin-bottom: 2rem;\n  }\n  .player-buttons ul li {\n    display: block;\n  }\n  .player-buttons .button {\n    display: block;\n    width: 100%;\n  }\n}","$green: #1cb517;","@use './variables' as *;\r\n\r\n.instructions {\r\n   font-size: 1rem;\r\n   max-width: 500px;\r\n   padding: 1rem;\r\n   border: 1px solid $green;\r\n   margin-top: 3rem;\r\n   h1 {\r\n      font-size: 1.5rem;\r\n      margin-bottom: 1rem;\r\n   }\r\n}","@use 'sass:list';\r\n@use './variables' as *;\r\n\r\n$cellWidth: 30px;\r\n\r\n.board-container {\r\n   h1 {\r\n      text-align: center;\r\n      text-transform: uppercase;\r\n      font-size: 1.5rem;\r\n      margin-bottom: 1rem;\r\n   }\r\n}\r\n.board {\r\n   font-size: 18px;\r\n   display: grid;\r\n   grid-template-columns: $cellWidth auto;\r\n   justify-content: center;\r\n}\r\n.board__letters-container {\r\n   display: grid;\r\n   gap: 3px;\r\n   grid-template-columns: repeat(10, $cellWidth);\r\n   grid-auto-rows: $cellWidth;\r\n   grid-column: 2;\r\n   grid-row: 1;\r\n   .board__cell {\r\n      border: none;\r\n\r\n      @for $i from 1 through 10 {\r\n         &:nth-child(#{$i})::before {\r\n            content: '#{$i}'; \r\n         }\r\n      }\r\n   }\r\n}\r\n.board__digits-container {\r\n   display: grid;\r\n   gap: 3px;\r\n   grid-template-columns: $cellWidth;\r\n   grid-auto-rows: $cellWidth;\r\n   grid-column: 1;\r\n   grid-row: 2;\r\n   .board__cell {\r\n      border: none;\r\n\r\n      $letters: 'a','b','c','d','e','f','g','h','i','j';\r\n\r\n      @for $i from 1 through 10 {\r\n         &:nth-child(#{$i})::before {\r\n            content: '#{list.nth($letters, $i)}'; \r\n         }\r\n      }\r\n   }\r\n}\r\n.board__cell {\r\n   background-color: black;\r\n   color: $green;\r\n   border: 1px solid $green;\r\n   display: flex;\r\n   justify-content: center;\r\n   align-items: center;\r\n}\r\n.board__board {\r\n   grid-row: 2;\r\n   display: grid;\r\n   gap: 3px;\r\n   grid-template-columns: repeat(10, $cellWidth);\r\n   grid-auto-rows: $cellWidth;\r\n   .board__cell {\r\n      &:hover {\r\n         background-color: $green;\r\n         color: black;\r\n      }\r\n   }\r\n}\r\n#error-message {\r\n   font-size: 1rem;\r\n   text-align: center;\r\n   max-width: 500px;\r\n   grid-column: 1 / -1;\r\n   margin-top: 1rem;\r\n   margin-left: auto;\r\n   margin-right: auto;\r\n   padding: 0 1rem;\r\n}\r\n#cpu-board-container {\r\n   display: none;\r\n   margin-top: 2rem;\r\n}\r\n.player-buttons {\r\n   ul {\r\n      text-align: center;\r\n      margin: 2rem 0;\r\n   }\r\n   ul li {\r\n      display: inline-block;\r\n      margin-bottom: .5rem;\r\n   }\r\n}\r\n.ships-table {\r\n   font-size: 1rem;\r\n   border: 1px solid $green;\r\n   margin-bottom: 2rem;\r\n   margin-left: auto;\r\n   margin-right: auto;\r\n\r\n   td, th {\r\n      padding: .5rem;\r\n      border: 1px solid $green;\r\n   }\r\n}\r\n#start-button {\r\n   visibility: hidden;\r\n}\r\n.reset-container {\r\n   font-size: 1,5rem;\r\n   text-align: center;\r\n   margin: 3rem 0;\r\n   p {\r\n      margin-bottom: 1rem;\r\n   }\r\n}","@use './variables' as *;\r\n\r\n.button {\r\n   font-family: monospace;\r\n   font-size: 1rem;\r\n   text-shadow: 0 0 10px $green;\r\n   background-color: black;\r\n   color: $green;\r\n   padding: .5rem .8rem;\r\n   border: 1px solid $green;\r\n   cursor: pointer;\r\n   &:hover {\r\n      background-color: $green;\r\n      color: black;\r\n   }\r\n   &--highlighted {\r\n      background-color: $green;\r\n      color: black;\r\n   }\r\n   &:disabled {\r\n      opacity: .4;\r\n   }\r\n}","@media only screen and (min-width: 1000px) {\r\n   .grid {\r\n      display: grid;\r\n      grid-template-columns: 1fr 1fr;\r\n   }\r\n   .ships-table {\r\n      width: 100%;\r\n   }\r\n   #cpu-board-container {\r\n      margin-top: 0;\r\n   }\r\n   .player-buttons {\r\n      ul {\r\n         margin: 0;\r\n         margin-bottom: 2rem;\r\n      }\r\n      ul li {\r\n         display: block;\r\n      }\r\n      .button {\r\n         display: block;\r\n         width: 100%;\r\n      }\r\n   }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/scss/styles.scss":
/*!******************************!*\
  !*** ./src/scss/styles.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./styles.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/styles.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzREFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUN0Q2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNWYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7O0FBRWpGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDWGE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEO0FBQ2xEOztBQUVBO0FBQ0EsMENBQTBDO0FBQzFDOztBQUVBOztBQUVBO0FBQ0EsaUZBQWlGO0FBQ2pGOztBQUVBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0EseURBQXlEO0FBQ3pELElBQUk7O0FBRUo7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2Nzcy9zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3NzL3N0eWxlcy5zY3NzPzMyMWYiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xyXG5cclxuY29uc3QgR2FtZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgIGxldCBfd2lubmVyTWVzc2FnZTtcclxuICAgbGV0IF9jYW5HYW1lU3RhcnQgPSBmYWxzZTtcclxuICAgbGV0IF9jb21wdXRlckJvYXJkID0gR2FtZWJvYXJkKCk7XHJcbiAgIGxldCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xyXG5cclxuICAgY29uc3QgZ2V0Q29tcHV0ZXJCb2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF9jb21wdXRlckJvYXJkLmdldEJvYXJkKCk7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgcGxhY2VFbmVteUFybXkgPSBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBwbGFjZSBzaGlwc1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgICAgICBsZXQgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gdHlwZS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBkaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSA9PT0gMCA/IFwidmVyXCIgOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgX2NvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtyb3csIGNvbHVtbl0sIGxlbmd0aCwgZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgcGxhY2VFbmVteUFybXkodHlwZSk7XHJcbiAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgaWYgKCFlLm1lc3NhZ2UuaW5jbHVkZXMoXCJFeGNlZWRlZCBudW1iZXIgb2Ygc2hpcHNcIikpIHtcclxuICAgICAgICAgICAgICAgcGxhY2VFbmVteUFybXkodHlwZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiBcImZpbmlzaGVkXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gZmlsbCBjb21wdXRlckJvYXJkIHdpdGggc2hpcHNcclxuICAgICAgaWYgKCFfY29tcHV0ZXJCb2FyZC5pc0FybXlDb21wbGV0ZSgpKSB7XHJcbiAgICAgICAgIGxldCBjb21wdXRlclNoaXBzSW5mbyA9IF9jb21wdXRlckJvYXJkLmdldFNoaXBzKCk7XHJcblxyXG4gICAgICAgICBmb3IgKGxldCB0eXBlIGluIGNvbXB1dGVyU2hpcHNJbmZvKSB7XHJcbiAgICAgICAgICAgIHBsYWNlRW5lbXlBcm15KGNvbXB1dGVyU2hpcHNJbmZvW3R5cGVdKTtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGxheWVyQm9hcmQuaXNBcm15Q29tcGxldGUoKSkge1xyXG4gICAgICAgICBfY2FuR2FtZVN0YXJ0ID0gdHJ1ZTtcclxuICAgICAgICAgdGhpcy5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAgPSBudWxsO1xyXG4gICAgICAgICB0aGlzLnBsYXllckJvYXJkLnJlbW92ZVNoaXAgPSBudWxsO1xyXG4gICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCB0YWtlVHVybiA9IGZ1bmN0aW9uIChyb3csIGNlbGwpIHtcclxuICAgICAgaWYgKCFfY2FuR2FtZVN0YXJ0KSByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgIGlmICghX3dpbm5lck1lc3NhZ2UpIHtcclxuICAgICAgICAgbGV0IGF0dGFja1BsYXllciA9ICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcblxyXG4gICAgICAgICAgICAgICB0aGlzLnBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjZWxsKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgIGUubWVzc2FnZS5pbmNsdWRlcyhcclxuICAgICAgICAgICAgICAgICAgICAgXCJZb3UgYWxyZWFkeSBhdHRhY2tlZCB0aGUgZm9sbG93aW5nIGNvb3JkaW5hdGVzXCJcclxuICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgYXR0YWNrUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9O1xyXG5cclxuICAgICAgICAgLy8gYXR0YWNrIGNvbXB1dGVyXHJcbiAgICAgICAgIF9jb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjZWxsKTtcclxuXHJcbiAgICAgICAgIGlmIChfY29tcHV0ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xyXG4gICAgICAgICAgICBfd2lubmVyTWVzc2FnZSA9IFwiUGxheWVyIHdvbiB0aGUgbWF0Y2hcIjtcclxuICAgICAgICAgICAgcmV0dXJuIF93aW5uZXJNZXNzYWdlO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAvLyBhdHRhY2sgcGxheWVyXHJcbiAgICAgICAgIGF0dGFja1BsYXllcigpO1xyXG5cclxuICAgICAgICAgaWYgKHRoaXMucGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcclxuICAgICAgICAgICAgX3dpbm5lck1lc3NhZ2UgPSBcIkNvbXB1dGVyIHdvbiB0aGUgbWF0Y2hcIjtcclxuICAgICAgICAgICAgcmV0dXJuIF93aW5uZXJNZXNzYWdlO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIF93aW5uZXJNZXNzYWdlO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgZ2V0V2lubmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX3dpbm5lck1lc3NhZ2U7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCByZXNldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgX3dpbm5lck1lc3NhZ2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgIF9jYW5HYW1lU3RhcnQgPSBmYWxzZTtcclxuICAgICAgX2NvbXB1dGVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcclxuICAgICAgdGhpcy5wbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xyXG4gICB9O1xyXG5cclxuICAgcmV0dXJuIHtcclxuICAgICAgcGxheWVyQm9hcmQsXHJcbiAgICAgIGdldENvbXB1dGVyQm9hcmQsXHJcbiAgICAgIGluaXQsXHJcbiAgICAgIHRha2VUdXJuLFxyXG4gICAgICBnZXRXaW5uZXIsXHJcbiAgICAgIHJlc2V0LFxyXG4gICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcclxuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xyXG5cclxuY29uc3QgR2FtZWJvYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gICBsZXQgX2JvYXJkID0gW107XHJcbiAgIGxldCBfc2hpcHMgPSB7XHJcbiAgICAgIHR5cGUxOiB7IHNoaXBzOiBbXSwgbGVuZ3RoOiA1LCBtYXg6IDEsIHN5bWJvbDogXCJBXCIgfSxcclxuICAgICAgdHlwZTI6IHsgc2hpcHM6IFtdLCBsZW5ndGg6IDQsIG1heDogMiwgc3ltYm9sOiBcIkJcIiB9LFxyXG4gICAgICB0eXBlMzogeyBzaGlwczogW10sIGxlbmd0aDogMywgbWF4OiAzLCBzeW1ib2w6IFwiQ1wiIH0sXHJcbiAgICAgIHR5cGU0OiB7IHNoaXBzOiBbXSwgbGVuZ3RoOiAyLCBtYXg6IDQsIHN5bWJvbDogXCJEXCIgfSxcclxuICAgfTtcclxuXHJcbiAgIC8vIGNyZWF0ZSAxMCByb3dzIGFuZCAxMCBjZWxscyBmb3IgX2JvYXJkXHJcbiAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xyXG4gICAgICBfYm9hcmQucHVzaChbXSk7XHJcblxyXG4gICAgICBmb3IgKGxldCBjZWxsID0gMDsgY2VsbCA8IDEwOyBjZWxsKyspIHtcclxuICAgICAgICAgX2JvYXJkW3Jvd10ucHVzaChcIn5cIik7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgY29uc3QgZ2V0Qm9hcmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9ib2FyZCkpO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgZ2V0U2hpcHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBzaGlwc0Nsb25lID0ge307XHJcblxyXG4gICAgICBmb3IgKGxldCBrZXkgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIHNoaXBzQ2xvbmVba2V5XSA9IHt9O1xyXG4gICAgICAgICBzaGlwc0Nsb25lW2tleV0uc2hpcHMgPSBbXTtcclxuICAgICAgICAgc2hpcHNDbG9uZVtrZXldLmxlbmd0aCA9IF9zaGlwc1trZXldLmxlbmd0aDtcclxuICAgICAgICAgc2hpcHNDbG9uZVtrZXldLm1heCA9IF9zaGlwc1trZXldLm1heDtcclxuXHJcbiAgICAgICAgIF9zaGlwc1trZXldLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICAgICAgbGV0IGNsb25lID0gU2hpcChzaGlwLmdldExlbmd0aCgpLCBzaGlwLmdldENvb3JzKCkpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldEhpdHMoKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgIGNsb25lLmhpdCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzaGlwc0Nsb25lW2tleV0uc2hpcHMucHVzaChjbG9uZSk7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gc2hpcHNDbG9uZTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGdldEJvYXJkQW5kU2hpcHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBib2FyZENvcHkgPSB0aGlzLmdldEJvYXJkKCk7XHJcblxyXG4gICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFNoaXAgPSBfc2hpcHNbdHlwZV0uc2hpcHNbaV07XHJcbiAgICAgICAgICAgIGxldCBzaGlwQ29vcnMgPSBjdXJyZW50U2hpcC5nZXRDb29ycygpO1xyXG5cclxuICAgICAgICAgICAgc2hpcENvb3JzLmZvckVhY2goKGNvb3JzKSA9PiB7XHJcbiAgICAgICAgICAgICAgIGxldCBbcm93LCBjb2x1bW5dID0gY29vcnM7XHJcblxyXG4gICAgICAgICAgICAgICBpZiAoYm9hcmRDb3B5W3Jvd11bY29sdW1uXSA9PT0gXCJ+XCIpIHtcclxuICAgICAgICAgICAgICAgICAgYm9hcmRDb3B5W3Jvd11bY29sdW1uXSA9IF9zaGlwc1t0eXBlXS5zeW1ib2w7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGJvYXJkQ29weTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHBsYWNlU2hpcCA9IGZ1bmN0aW9uIChjb29yZGluYXRlcyA9IFswLCAwXSwgbGVuZ3RoID0gMiwgZGlyZWN0aW9uKSB7XHJcbiAgICAgIGlmIChpc05hTihOdW1iZXIoY29vcmRpbmF0ZXNbMF0pKSB8fCBpc05hTihOdW1iZXIoY29vcmRpbmF0ZXNbMV0pKSkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb29yZGluYXRlcyBzaG91bGQgYmUgbnVtYmVyc1wiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzTmFOKE51bWJlcihsZW5ndGgpKSB8fCBsZW5ndGggPiA1IHx8IGxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGVuZ3RoIHNob3VsZCBiZSBhIG51bWJlciBiZXR3ZWVuIDIgYW5kIDVcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBzaGlwQ29vcmRpbmF0ZXMgPSBbWy4uLmNvb3JkaW5hdGVzXV07XHJcblxyXG4gICAgICAvLyBnZW5lcmF0ZSBjb29yZGluYXRlcyB0aGF0IGV4cGFuZCBiYXNlZCBvbiBsZW5ndGggYW5kIGRpcmVjdGlvblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAvLyBleHBhbmQgY29vcmRpbmF0ZXMgdmVydGljYWxseVxyXG4gICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInZlclwiKSB7XHJcbiAgICAgICAgICAgIGxldCBjb29yc0NvcHkgPSBbLi4uc2hpcENvb3JkaW5hdGVzW2ldXTtcclxuICAgICAgICAgICAgY29vcnNDb3B5WzBdKys7XHJcbiAgICAgICAgICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKGNvb3JzQ29weSk7XHJcblxyXG4gICAgICAgICAgICAvLyBleHBhbmQgY29vcmRpbmF0ZXMgaG9yaXpvbnRhbGx5XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBjb29yc0NvcHkgPSBbLi4uc2hpcENvb3JkaW5hdGVzW2ldXTtcclxuICAgICAgICAgICAgY29vcnNDb3B5WzFdKys7XHJcbiAgICAgICAgICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKGNvb3JzQ29weSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY2hlY2sgaWYgc2hpcENvb3JkaW5hdGVzIGFyZSB2YWxpZFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICBsZXQgY3VycmVudENvb3IgPSBzaGlwQ29vcmRpbmF0ZXNbaV07XHJcblxyXG4gICAgICAgICBpZiAoY3VycmVudENvb3JbMF0gPiA5IHx8IGN1cnJlbnRDb29yWzBdIDwgMClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBleHBhbmRzIHRvIHdyb25nIGNvb3JkaW5hdGVzXCIpO1xyXG4gICAgICAgICBpZiAoY3VycmVudENvb3JbMV0gPiA5IHx8IGN1cnJlbnRDb29yWzFdIDwgMClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBleHBhbmRzIHRvIHdyb25nIGNvb3JkaW5hdGVzXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgbmV3U2hpcCA9IFNoaXAobGVuZ3RoLCBzaGlwQ29vcmRpbmF0ZXMpO1xyXG5cclxuICAgICAgLy8gY2hlY2sgaWYgbmV3U2hpcCBjYW4gYmUgYWRkZWQgdG8gX3NoaXBzXHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGlmIChfc2hpcHNbdHlwZV0ubGVuZ3RoID09PSBuZXdTaGlwLmdldExlbmd0aCgpKSB7XHJcbiAgICAgICAgICAgIGlmIChfc2hpcHNbdHlwZV0uc2hpcHMubGVuZ3RoIDwgX3NoaXBzW3R5cGVdLm1heCkge1xyXG4gICAgICAgICAgICAgICAvLyBjaGVjayBldmVyeSBzaGlwJ3MgY29vcmRpbmF0ZXMgdG8gc2VlIGlmIG5ld1NoaXAgZG9lcyBub3QgaGF2ZVxyXG4gICAgICAgICAgICAgICAvLyB0aGUgc2FtZSBjb29yZGluYXRlcyBvZiBhbm90aGVyIHNoaXBcclxuICAgICAgICAgICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgICAgICAgICAgX3NoaXBzW3R5cGVdLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgc2hpcC5nZXRDb29ycygpLmZvckVhY2goKHNoaXBDb29ycykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTaGlwLmdldENvb3JzKCkuZm9yRWFjaCgobmV3U2hpcENvb3JzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpcENvb3JzWzBdID09PSBuZXdTaGlwQ29vcnNbMF0gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpcENvb3JzWzFdID09PSBuZXdTaGlwQ29vcnNbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIG5ldyBzaGlwIGNhbm5vdCBiZSBwbGFjZSBvdmVyIGFub3RoZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgIF9zaGlwc1t0eXBlXS5zaGlwcy5wdXNoKG5ld1NoaXApO1xyXG4gICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgbGV0IGVycm9yTXNnID0gYEV4Y2VlZGVkIG51bWJlciBvZiBzaGlwczogbWF4aW11biBudW1iZXIgZm9yICR7bGVuZ3RofSBsZW5ndGggc2hpcHMgaXMgJHtfc2hpcHNbdHlwZV0ubWF4fWA7XHJcbiAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCByZW1vdmVTaGlwID0gZnVuY3Rpb24gKHJvdyA9IDAsIGNlbGwgPSAwKSB7XHJcbiAgICAgIGxldCBmaWx0ZXJlZFNoaXBzO1xyXG4gICAgICBsZXQgY29vcnM7XHJcblxyXG4gICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICAvLyBzZWFyY2ggYW5kIGZpbHRlciBvdXQgc2hpcCB0aGF0IGhhcyBcInJvd1wiIGFuZCBcImNlbGxcIiBhcyBjb29yZGluYXRlc1xyXG4gICAgICAgICBzaGlwc0xvb3A6IGZvciAobGV0IGkgPSAwOyBpIDwgX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2hpcCA9IF9zaGlwc1t0eXBlXS5zaGlwc1tpXTtcclxuICAgICAgICAgICAgbGV0IHNoaXBDb29ycyA9IGN1cnJlbnRTaGlwLmdldENvb3JzKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNoaXBDb29ycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICBpZiAoc2hpcENvb3JzW2pdWzBdID09PSByb3cgJiYgc2hpcENvb3JzW2pdWzFdID09PSBjZWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgIGZpbHRlcmVkU2hpcHMgPSBfc2hpcHNbdHlwZV0uc2hpcHMuZmlsdGVyKFxyXG4gICAgICAgICAgICAgICAgICAgICAoc2hpcCkgPT4gc2hpcCAhPT0gY3VycmVudFNoaXBcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgY29vcnMgPSBzaGlwQ29vcnM7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrIHNoaXBzTG9vcDtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgLy8gdXBkYXRlIF9zaGlwc1t0eXBlXS5zaGlwcyBhcnJheVxyXG4gICAgICAgICBpZiAoZmlsdGVyZWRTaGlwcykge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0TXNnID0gXCJSZW1vdmVkIHNoaXAgd2l0aCB0aGUgZm9sbG93aW5nIGNvb3JkaW5hdGVzOiBcIjtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdE1zZyArPSBjb29yc1xyXG4gICAgICAgICAgICAgICAucmVkdWNlKFxyXG4gICAgICAgICAgICAgICAgICAoYWNjLCBjdXJyZW50KSA9PiBhY2MgKyBgWyR7Y3VycmVudFswXX0sICR7Y3VycmVudFsxXX1dLCBgLFxyXG4gICAgICAgICAgICAgICAgICBcIlwiXHJcbiAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgLnNsaWNlKDAsIC0yKTtcclxuXHJcbiAgICAgICAgICAgIF9zaGlwc1t0eXBlXS5zaGlwcyA9IGZpbHRlcmVkU2hpcHM7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRNc2c7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGBUaGVyZSBpcyBubyBzaGlwIGluIFske3Jvd30sJHtjZWxsfV0gY29vcmRpbmF0ZXNgO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgaXNBcm15Q29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGlmIChfc2hpcHNbdHlwZV0uc2hpcHMubGVuZ3RoIDwgX3NoaXBzW3R5cGVdLm1heCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbiAocm93ID0gMCwgY2VsbCA9IDApIHtcclxuICAgICAgbGV0IHN5bWJvbCA9IFwiL1wiO1xyXG5cclxuICAgICAgaWYgKHJvdyA+IDkgfHwgcm93IDwgMCB8fCBjZWxsID4gOSB8fCBjZWxsIDwgMCkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgIGBQcm92aWRlZCBjb29yZGluYXRlcyBhcmUgbm90IHZhbGlkOiBbJHtyb3d9LCR7Y2VsbH1dYFxyXG4gICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2JvYXJkW3Jvd11bY2VsbF0gIT09IFwiflwiKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgYFlvdSBhbHJlYWR5IGF0dGFja2VkIHRoZSBmb2xsb3dpbmcgY29vcmRpbmF0ZXM6IFske3Jvd30sJHtjZWxsfV1gXHJcbiAgICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoZWNrIGlmIGFueSBzaGlwIGhhcyBcInJvd1wiIGFuZCBcImNlbGxcIiBhcyBjb29yZGluYXRlcyBhbmQgaGl0IGl0XHJcbiAgICAgIHR5cGVMb29wOiBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFNoaXAgPSBfc2hpcHNbdHlwZV0uc2hpcHNbaV07XHJcbiAgICAgICAgICAgIGxldCBzaGlwQ29vcnMgPSBjdXJyZW50U2hpcC5nZXRDb29ycygpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaGlwQ29vcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgaWYgKHNoaXBDb29yc1tqXVswXSA9PT0gcm93ICYmIHNoaXBDb29yc1tqXVsxXSA9PT0gY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICBjdXJyZW50U2hpcC5oaXQoKTtcclxuICAgICAgICAgICAgICAgICAgc3ltYm9sID0gXCJYXCI7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrIHR5cGVMb29wO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBfYm9hcmRbcm93XVtjZWxsXSA9IHN5bWJvbDtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBhbGxTaGlwc1N1bmsgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghX3NoaXBzW3R5cGVdLnNoaXBzW2ldLmlzU3VuaygpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgIH07XHJcblxyXG4gICByZXR1cm4ge1xyXG4gICAgICBnZXRCb2FyZCxcclxuICAgICAgZ2V0U2hpcHMsXHJcbiAgICAgIGdldEJvYXJkQW5kU2hpcHMsXHJcbiAgICAgIHBsYWNlU2hpcCxcclxuICAgICAgcmVtb3ZlU2hpcCxcclxuICAgICAgaXNBcm15Q29tcGxldGUsXHJcbiAgICAgIHJlY2VpdmVBdHRhY2ssXHJcbiAgICAgIGFsbFNoaXBzU3VuayxcclxuICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcclxuIiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vZ2FtZS5qc1wiO1xyXG5pbXBvcnQgXCIuL3Njc3Mvc3R5bGVzLnNjc3NcIjtcclxuXHJcbmNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXJCb2FyZFwiKTtcclxuY29uc3QgY3B1Qm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNwdS1ib2FyZC1jb250YWluZXJcIik7XHJcbmNvbnN0IGNwdUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcHVCb2FyZFwiKTtcclxuY29uc3QgYnV0dG9uc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9ucy1jb250YWluZXJcIik7XHJcbmNvbnN0IHNoaXBUYWJsZUNvdW50ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBsYWNlZC1jb3VudGVyXCIpO1xyXG5jb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yLW1lc3NhZ2VcIik7XHJcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1idXR0b25cIik7XHJcblxyXG5jb25zdCBwbGF5ZXJCb2FyZENlbGxzID0gW107XHJcbmNvbnN0IGNwdUJvYXJkQ2VsbHMgPSBbXTtcclxuXHJcbmxldCBsZW5ndGggPSBudWxsO1xyXG5sZXQgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XHJcbmxldCBzaGlwc0luZm8gPSBudWxsO1xyXG5sZXQgcHJldmlvdXNDbGlja2VkQnRuID0gbnVsbDtcclxubGV0IGN1cnJlbnRDZWxsID0gbnVsbDtcclxubGV0IGNlbGxzVG9IaWdobGlnaHQgPSBbXTtcclxuXHJcbi8vIGdlbmVyYXRlIHBsYXllciBhbmQgY3B1IGNlbGxzXHJcbmZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xyXG4gICBwbGF5ZXJCb2FyZENlbGxzLnB1c2goW10pO1xyXG4gICBjcHVCb2FyZENlbGxzLnB1c2goW10pO1xyXG5cclxuICAgZm9yIChsZXQgY2VsbCA9IDA7IGNlbGwgPCAxMDsgY2VsbCsrKSB7XHJcbiAgICAgIGxldCBjZWxsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHJcbiAgICAgIGNlbGxCdG4udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICAgIGNlbGxCdG4uY2xhc3NOYW1lID0gXCJib2FyZF9fY2VsbFwiO1xyXG4gICAgICBjZWxsQnRuLmRhdGFzZXQucm93ID0gcm93O1xyXG4gICAgICBjZWxsQnRuLmRhdGFzZXQuY2VsbCA9IGNlbGw7XHJcbiAgICAgIGNlbGxCdG4uZGF0YXNldC5maWxsZWQgPSBcImZhbHNlXCI7XHJcbiAgICAgIHBsYXllckJvYXJkLmFwcGVuZChjZWxsQnRuKTtcclxuICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddLnB1c2goY2VsbEJ0bik7XHJcblxyXG4gICAgICBsZXQgY2xvbmUgPSBjZWxsQnRuLmNsb25lTm9kZSgpO1xyXG4gICAgICBjcHVCb2FyZC5hcHBlbmQoY2xvbmUpO1xyXG4gICAgICBjcHVCb2FyZENlbGxzW3Jvd10ucHVzaChjbG9uZSk7XHJcbiAgIH1cclxufVxyXG5cclxuYnV0dG9uc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tlZEJ1dHRvbnMpO1xyXG5wbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIHNob3dQcmV2aWV3SGFuZGxlcik7XHJcbnBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCByZW1vdmVTaGlwUHJldmlldyk7XHJcbnBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGFjZU5ld1NoaXApO1xyXG5wbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgcmVtb3ZlU2hpcCk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCByb3RhdGVTaGlwKTtcclxuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGluaXRpYWxpemVHYW1lKTtcclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUNsaWNrZWRCdXR0b25zKGUpIHtcclxuICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgLy8gaGFuZGxlIGJ1dHRvbnMgdGhhdCBjaGFuZ2UgXCJsZW5ndGhcIiB2YXJpYWJsZVxyXG4gICBpZiAodGFyZ2V0LmRhdGFzZXQubGVuZ3RoKSB7XHJcbiAgICAgIGxlbmd0aCA9ICt0YXJnZXQuZGF0YXNldC5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAocHJldmlvdXNDbGlja2VkQnRuKSB7XHJcbiAgICAgICAgIHByZXZpb3VzQ2xpY2tlZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiYnV0dG9uLS1oaWdobGlnaHRlZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJidXR0b24tLWhpZ2hsaWdodGVkXCIpO1xyXG4gICAgICBwcmV2aW91c0NsaWNrZWRCdG4gPSB0YXJnZXQ7XHJcblxyXG4gICAgICAvLyBoYW5kbGUgcm90YXRpb24tYnV0dG9uXHJcbiAgIH0gZWxzZSBpZiAodGFyZ2V0LmlkID09PSBcInJvdGF0aW9uLWJ1dHR0b25cIikge1xyXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICAgICBkaXJlY3Rpb24gPSBcInZlcnRpY2FsXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1ByZXZpZXdIYW5kbGVyKGUpIHtcclxuICAgc2hvd1NoaXBQcmV2aWV3KGUudGFyZ2V0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1NoaXBQcmV2aWV3KG5vZGUpIHtcclxuICAgaWYgKGxlbmd0aCAmJiBub2RlLmRhdGFzZXQucm93ICYmIG5vZGUuZGF0YXNldC5jZWxsKSB7XHJcbiAgICAgIGxldCB7IHJvdywgY2VsbCB9ID0gbm9kZS5kYXRhc2V0O1xyXG5cclxuICAgICAgY3VycmVudENlbGwgPSBub2RlO1xyXG4gICAgICByb3cgPSArcm93O1xyXG4gICAgICBjZWxsID0gK2NlbGw7XHJcblxyXG4gICAgICAvLyBwb3B1bGF0ZSBcImNlbGxzVG9IaWdobGlnaHRcIiBhcnJheVxyXG4gICAgICBsZW5ndGhMb29wOiBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgIGlmICghcGxheWVyQm9hcmRDZWxsc1tyb3ddIHx8ICFwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0pIHtcclxuICAgICAgICAgICAgYnJlYWsgbGVuZ3RoTG9vcDtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgY2VsbHNUb0hpZ2hsaWdodC5wdXNoKHBsYXllckJvYXJkQ2VsbHNbcm93XVtjZWxsXSk7XHJcbiAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgICAgICAgIGNlbGwrKztcclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcm93Kys7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcGFpbnQgcHJldmlldyByZWQgaWYgc2hpcCBsZW5ndGggZG9lcyBub3QgZml0XHJcbiAgICAgIGlmIChjZWxsc1RvSGlnaGxpZ2h0Lmxlbmd0aCA8IGxlbmd0aCkge1xyXG4gICAgICAgICBjZWxsc1RvSGlnaGxpZ2h0LmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNiNTE3MTdcIjtcclxuICAgICAgICAgICAgY2VsbC5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgY2VsbC5zdHlsZS5ib3JkZXJDb2xvciA9IFwiI2I1MTcxN1wiO1xyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIC8vIHBhaW50IHByZXZpZXcgZWl0aGVyIGdyZWVuIG9yIHJlZCBiYXNlZCBvbiBmaWxsZWQgYXR0cmlidXRlIHZhbHVlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGNlbGxzVG9IaWdobGlnaHQuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2VsbC5kYXRhc2V0LmZpbGxlZCA9PT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjMWNiNTE3XCI7XHJcbiAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYm9yZGVyQ29sb3IgPSBcIiMxY2I1MTdcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNiNTE3MTdcIjtcclxuICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5ib3JkZXJDb2xvciA9IFwiI2I1MTcxN1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU2hpcFByZXZpZXcoKSB7XHJcbiAgIGNlbGxzVG9IaWdobGlnaHQuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XHJcbiAgICAgIGNlbGwuc3R5bGUuY29sb3IgPSBcIlwiO1xyXG4gICAgICBjZWxsLnN0eWxlLmJvcmRlckNvbG9yID0gXCJcIjtcclxuICAgfSk7XHJcbiAgIGNlbGxzVG9IaWdobGlnaHQgPSBbXTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGxhY2VOZXdTaGlwKGUpIHtcclxuICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgaWYgKGxlbmd0aCAmJiB0YXJnZXQuZGF0YXNldC5yb3cgJiYgdGFyZ2V0LmRhdGFzZXQuY2VsbCkge1xyXG4gICAgICBzaGlwc0luZm8gPSBHYW1lLnBsYXllckJvYXJkLmdldFNoaXBzKCk7XHJcbiAgICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IFwiXCI7IC8vIGNsZWFyIHByZXZpb3VzIGVycm9yIG1lc3NhZ2VcclxuXHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gc2hpcHNJbmZvKSB7XHJcbiAgICAgICAgIC8vIGlkZW50aWZ5IHdoYXQgdHlwZSBvZiBzaGlwIHRoZSB1c2VyIGlzIGdvaW5nIHRvIHBsYWNlXHJcbiAgICAgICAgIGlmIChzaGlwc0luZm9bdHlwZV0ubGVuZ3RoID09PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKHNoaXBzSW5mb1t0eXBlXS5zaGlwcy5sZW5ndGggPCBzaGlwc0luZm9bdHlwZV0ubWF4KSB7XHJcbiAgICAgICAgICAgICAgIC8vIHBsYWNlIG5ldyBzaGlwXHJcbiAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgIEdhbWUucGxheWVyQm9hcmQucGxhY2VTaGlwKFxyXG4gICAgICAgICAgICAgICAgICAgICBbK3RhcmdldC5kYXRhc2V0LnJvdywgK3RhcmdldC5kYXRhc2V0LmNlbGxdLFxyXG4gICAgICAgICAgICAgICAgICAgICBsZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbi5zbGljZSgwLCAzKVxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICBzaGlwc0luZm8gPSBHYW1lLnBsYXllckJvYXJkLmdldFNoaXBzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIHNoaXAgYnV0dG9uIHdoZW4gZ2V0dGluZyB0byBtYXhpbXVtIG51bWJlciBvZiBzaGlwcyBwbGFjZWRcclxuICAgICAgICAgICAgICAgICAgaWYgKHNoaXBzSW5mb1t0eXBlXS5zaGlwcy5sZW5ndGggPT09IHNoaXBzSW5mb1t0eXBlXS5tYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNDbGlja2VkQnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNDbGlja2VkQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJidXR0b24tLWhpZ2hsaWdodGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICB1cGRhdGVQbGF5ZXJCb2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICByZW1vdmVTaGlwUHJldmlldygpO1xyXG4gICAgICAgICAgICAgICAgICB1cGRhdGVTaGlwc1RhYmxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBpZiAoR2FtZS5wbGF5ZXJCb2FyZC5pc0FybXlDb21wbGV0ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHN0YXJ0QnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgIHN0YXJ0QnRuLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgLy8gcHJpbnQgZXJyb3IgbWVzc2FnZXNcclxuICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgIGUubWVzc2FnZSA9PT0gXCJTaGlwIGV4cGFuZHMgdG8gd3JvbmcgY29vcmRpbmF0ZXNcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICBlLm1lc3NhZ2UgPT09IFwiQSBuZXcgc2hpcCBjYW5ub3QgYmUgcGxhY2Ugb3ZlciBhbm90aGVyXCJcclxuICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IFwiRXJyb3I6IFwiICsgZS5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVycm9yOiBBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSB0cnlpbmcgdG8gcGxhY2UgYSBuZXcgc2hpcFwiO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVQbGF5ZXJCb2FyZCgpIHtcclxuICAgbGV0IGJvYXJkID0gR2FtZS5wbGF5ZXJCb2FyZC5nZXRCb2FyZEFuZFNoaXBzKCk7XHJcblxyXG4gICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBib2FyZC5sZW5ndGg7IHJvdysrKSB7XHJcbiAgICAgIGZvciAobGV0IGNlbGwgPSAwOyBjZWxsIDwgYm9hcmRbcm93XS5sZW5ndGg7IGNlbGwrKykge1xyXG4gICAgICAgICBpZiAoYm9hcmRbcm93XVtjZWxsXS5zZWFyY2goL1tBQkNEWC9dLykgPj0gMCkge1xyXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0udGV4dENvbnRlbnQgPSBib2FyZFtyb3ddW2NlbGxdO1xyXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0uZGF0YXNldC5maWxsZWQgPSBcInRydWVcIjtcclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdLmRhdGFzZXQuZmlsbGVkID0gXCJmYWxzZVwiO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTaGlwc1RhYmxlKCkge1xyXG4gICBsZXQgaW5kZXggPSAwO1xyXG5cclxuICAgZm9yIChsZXQgdHlwZSBpbiBzaGlwc0luZm8pIHtcclxuICAgICAgc2hpcFRhYmxlQ291bnRlcnNbaW5kZXhdLnRleHRDb250ZW50ID0gc2hpcHNJbmZvW3R5cGVdLnNoaXBzLmxlbmd0aDtcclxuICAgICAgaW5kZXgrKztcclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTaGlwKGUpIHtcclxuICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgaWYgKFxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5yb3cgJiZcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQuY2VsbCAmJlxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5maWxsZWQgJiZcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQuZmlsbGVkID09PSBcInRydWVcIlxyXG4gICApIHtcclxuICAgICAgbGV0IG1zZyA9IEdhbWUucGxheWVyQm9hcmQucmVtb3ZlU2hpcChcclxuICAgICAgICAgK3RhcmdldC5kYXRhc2V0LnJvdyxcclxuICAgICAgICAgK3RhcmdldC5kYXRhc2V0LmNlbGxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChtc2cuaW5jbHVkZXMoXCJSZW1vdmVkIHNoaXAgd2l0aCB0aGUgZm9sbG93aW5nIGNvb3JkaW5hdGVzOlwiKSkge1xyXG4gICAgICAgICBsZXQgc2hpcEJ1dHRvbnMgPSBidXR0b25zQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uXCIpO1xyXG4gICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG5cclxuICAgICAgICAgc2hpcHNJbmZvID0gR2FtZS5wbGF5ZXJCb2FyZC5nZXRTaGlwcygpO1xyXG5cclxuICAgICAgICAgLy8gZW5hYmxlIGJhY2sgZGlzYWJsZWQgYnV0dG9uc1xyXG4gICAgICAgICBmb3IgKGxldCB0eXBlIGluIHNoaXBzSW5mbykge1xyXG4gICAgICAgICAgICBpZiAoc2hpcHNJbmZvW3R5cGVdLnNoaXBzLmxlbmd0aCA8IHNoaXBzSW5mb1t0eXBlXS5tYXgpIHtcclxuICAgICAgICAgICAgICAgc2hpcEJ1dHRvbnNbaW5kZXhdLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmICghR2FtZS5wbGF5ZXJCb2FyZC5pc0FybXlDb21wbGV0ZSgpKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3RhcnRCdG4uc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHVwZGF0ZVBsYXllckJvYXJkKCk7XHJcbiAgICAgICAgIHNob3dTaGlwUHJldmlldyhjdXJyZW50Q2VsbCk7XHJcbiAgICAgICAgIHVwZGF0ZVNoaXBzVGFibGUoKTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvdGF0ZVNoaXAoZSkge1xyXG4gICBpZiAoZS5rZXkgPT09IFwicVwiIHx8IGUua2V5ID09PSBcIlFcIikge1xyXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICAgICBkaXJlY3Rpb24gPSBcInZlcnRpY2FsXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZW1vdmVTaGlwUHJldmlldygpO1xyXG4gICAgICBzaG93U2hpcFByZXZpZXcoY3VycmVudENlbGwpO1xyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVHYW1lKCkge1xyXG4gICBpZiAoR2FtZS5pbml0KCkpIHtcclxuICAgICAgcGxheWVyQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBzaG93UHJldmlld0hhbmRsZXIpO1xyXG4gICAgICBwbGF5ZXJCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgcmVtb3ZlU2hpcFByZXZpZXcpO1xyXG4gICAgICBwbGF5ZXJCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxhY2VOZXdTaGlwKTtcclxuICAgICAgcGxheWVyQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIHJlbW92ZVNoaXApO1xyXG4gICAgICBzdGFydEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgIGJ1dHRvbnNDb250YWluZXIucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgIGNwdUJvYXJkQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcblxyXG4gICAgICBjcHVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXR0YWNrQ3B1Qm9hcmQpO1xyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGF0dGFja0NwdUJvYXJkKGUpIHtcclxuICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgaWYgKFxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5maWxsZWQgPT09IFwiZmFsc2VcIiAmJlxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5yb3cgJiZcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQuY2VsbFxyXG4gICApIHtcclxuICAgICAgbGV0IHsgcm93LCBjZWxsIH0gPSB0YXJnZXQuZGF0YXNldDtcclxuICAgICAgbGV0IHR1cm5SZXN1bHQgPSBHYW1lLnRha2VUdXJuKCtyb3csICtjZWxsKTtcclxuXHJcbiAgICAgIHVwZGF0ZVBsYXllckJvYXJkKCk7XHJcbiAgICAgIHVwZGF0ZUNwdUJvYXJkKCk7XHJcblxyXG4gICAgICAvLyBkZWNsYXJlIGEgd2lubmVyIGFuZCBwcmludCBhIHJlc2V0IGJ1dHRvblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgIHR1cm5SZXN1bHQuc2VhcmNoICYmXHJcbiAgICAgICAgIHR1cm5SZXN1bHQuc2VhcmNoKC9QbGF5ZXJ8Q29tcHV0ZXIgd29uIHRoZSBtYXRjaC9naSkgPj0gMFxyXG4gICAgICApIHtcclxuICAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgIGxldCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG5cclxuICAgICAgICAgZGl2LmNsYXNzTmFtZSA9IFwicmVzZXQtY29udGFpbmVyXCI7XHJcbiAgICAgICAgIHAudGV4dENvbnRlbnQgPSB0dXJuUmVzdWx0O1xyXG4gICAgICAgICBidXR0b24uY2xhc3NOYW1lID0gXCJidXR0b25cIjtcclxuICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJSZXNldCBHYW1lXCI7XHJcbiAgICAgICAgIGRpdi5hcHBlbmQocCwgYnV0dG9uKTtcclxuICAgICAgICAgZG9jdW1lbnQuYm9keS5maXJzdEVsZW1lbnRDaGlsZC5hZnRlcihkaXYpO1xyXG5cclxuICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXNldEdhbWUpO1xyXG4gICAgICAgICBjcHVCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXR0YWNrQ3B1Qm9hcmQpO1xyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlQ3B1Qm9hcmQoKSB7XHJcbiAgIGxldCBib2FyZCA9IEdhbWUuZ2V0Q29tcHV0ZXJCb2FyZCgpO1xyXG5cclxuICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgYm9hcmQubGVuZ3RoOyByb3crKykge1xyXG4gICAgICBmb3IgKGxldCBjZWxsID0gMDsgY2VsbCA8IGJvYXJkW3Jvd10ubGVuZ3RoOyBjZWxsKyspIHtcclxuICAgICAgICAgaWYgKGJvYXJkW3Jvd11bY2VsbF0uc2VhcmNoKC9bWC9dLykgPj0gMCkge1xyXG4gICAgICAgICAgICBjcHVCb2FyZENlbGxzW3Jvd11bY2VsbF0udGV4dENvbnRlbnQgPSBib2FyZFtyb3ddW2NlbGxdO1xyXG4gICAgICAgICAgICBjcHVCb2FyZENlbGxzW3Jvd11bY2VsbF0uZGF0YXNldC5maWxsZWQgPSBcInRydWVcIjtcclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3B1Qm9hcmRDZWxsc1tyb3ddW2NlbGxdLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgY3B1Qm9hcmRDZWxsc1tyb3ddW2NlbGxdLmRhdGFzZXQuZmlsbGVkID0gXCJmYWxzZVwiO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZXNldEdhbWUoKSB7XHJcbiAgIEdhbWUucmVzZXQoKTtcclxuXHJcbiAgIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQubmV4dEVsZW1lbnRTaWJsaW5nLnJlbW92ZSgpO1xyXG4gICB1cGRhdGVDcHVCb2FyZCgpO1xyXG4gICBjcHVCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXR0YWNrQ3B1Qm9hcmQpO1xyXG4gICBwbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIHNob3dQcmV2aWV3SGFuZGxlcik7XHJcbiAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCByZW1vdmVTaGlwUHJldmlldyk7XHJcbiAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGFjZU5ld1NoaXApO1xyXG4gICBwbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgcmVtb3ZlU2hpcCk7XHJcbiAgIHVwZGF0ZVBsYXllckJvYXJkKCk7XHJcbiAgIGJ1dHRvbnNDb250YWluZXIucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICBbLi4uYnV0dG9uc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvblwiKV0uZm9yRWFjaChcclxuICAgICAgKGJ1dHRvbikgPT4gKGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlKVxyXG4gICApO1xyXG4gICBbLi4uc2hpcFRhYmxlQ291bnRlcnNdLmZvckVhY2goKGNvdW50ZXIpID0+IChjb3VudGVyLnRleHRDb250ZW50ID0gXCIwXCIpKTtcclxuICAgY3B1Qm9hcmRDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiXCI7XHJcbiAgIHN0YXJ0QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgc3RhcnRCdG4uc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbn1cclxuIiwiY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChsZW5ndGgsIGNvb3JkaW5hdGVzKSB7XHJcbiAgIGxldCBfY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcyB8fCBudWxsO1xyXG4gICBsZXQgX2xlbmd0aCA9IGxlbmd0aCB8fCAyO1xyXG4gICBsZXQgX2hpdHNDb3VudGVyID0gMDtcclxuXHJcbiAgIGNvbnN0IGdldENvb3JzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShfY29vcmRpbmF0ZXMpKTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGdldExlbmd0aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF9sZW5ndGg7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBnZXRIaXRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX2hpdHNDb3VudGVyO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBfaGl0c0NvdW50ZXIrKztcclxuICAgICAgcmV0dXJuIF9oaXRzQ291bnRlcjtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF9oaXRzQ291bnRlciA9PT0gbGVuZ3RoO1xyXG4gICB9O1xyXG5cclxuICAgcmV0dXJuIHtcclxuICAgICAgZ2V0Q29vcnMsXHJcbiAgICAgIGdldExlbmd0aCxcclxuICAgICAgZ2V0SGl0cyxcclxuICAgICAgaGl0LFxyXG4gICAgICBpc1N1bmssXHJcbiAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCxcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IDA7XFxuICBmb250LXNpemU6IDEwMCU7XFxuICBmb250OiBpbmhlcml0O1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSxcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gIHRleHQtc2hhZG93OiAwIDAgMTBweCAjMWNiNTE3O1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiAjMWNiNTE3O1xcbiAgbWFyZ2luOiAxNnB4O1xcbn1cXG5cXG5vbCwgdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuYmxvY2txdW90ZSwgcSB7XFxuICBxdW90ZXM6IG5vbmU7XFxufVxcblxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgY29udGVudDogbm9uZTtcXG59XFxuXFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG5wIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxufVxcblxcbi5pbnN0cnVjdGlvbnMge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgbWF4LXdpZHRoOiA1MDBweDtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgbWFyZ2luLXRvcDogM3JlbTtcXG59XFxuLmluc3RydWN0aW9ucyBoMSB7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbi5ib2FyZC1jb250YWluZXIgaDEge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHggYXV0bztcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDNweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xcbiAgZ3JpZC1jb2x1bW46IDI7XFxuICBncmlkLXJvdzogMTtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGwge1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgyKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIyXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDMpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjNcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNFxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg1KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI1XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDYpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjZcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiN1xcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg4KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI4XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDkpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjlcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMTApOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjEwXFxcIjtcXG59XFxuXFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDNweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweDtcXG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xcbiAgZ3JpZC1jb2x1bW46IDE7XFxuICBncmlkLXJvdzogMjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbCB7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImFcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgyKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJiXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiY1xcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDQpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImRcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg1KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJlXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZlxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDcpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImdcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg4KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJoXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiaVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEwKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJqXFxcIjtcXG59XFxuXFxuLmJvYXJkX19jZWxsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6ICMxY2I1MTc7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkX19ib2FyZCB7XFxuICBncmlkLXJvdzogMjtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDNweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xcbn1cXG4uYm9hcmRfX2JvYXJkIC5ib2FyZF9fY2VsbDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWNiNTE3O1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4jZXJyb3ItbWVzc2FnZSB7XFxuICBmb250LXNpemU6IDFyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXgtd2lkdGg6IDUwMHB4O1xcbiAgZ3JpZC1jb2x1bW46IDEvLTE7XFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICBwYWRkaW5nOiAwIDFyZW07XFxufVxcblxcbiNjcHUtYm9hcmQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBtYXJnaW4tdG9wOiAycmVtO1xcbn1cXG5cXG4ucGxheWVyLWJ1dHRvbnMgdWwge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luOiAycmVtIDA7XFxufVxcbi5wbGF5ZXItYnV0dG9ucyB1bCBsaSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XFxufVxcblxcbi5zaGlwcy10YWJsZSB7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbn1cXG4uc2hpcHMtdGFibGUgdGQsIC5zaGlwcy10YWJsZSB0aCB7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbn1cXG5cXG4jc3RhcnQtYnV0dG9uIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuXFxuLnJlc2V0LWNvbnRhaW5lciB7XFxuICBmb250LXNpemU6IDEsIDVyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW46IDNyZW0gMDtcXG59XFxuLnJlc2V0LWNvbnRhaW5lciBwIHtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbi5idXR0b24ge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIHRleHQtc2hhZG93OiAwIDAgMTBweCAjMWNiNTE3O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogIzFjYjUxNztcXG4gIHBhZGRpbmc6IDAuNXJlbSAwLjhyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbi5idXR0b24tLWhpZ2hsaWdodGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbi5idXR0b246ZGlzYWJsZWQge1xcbiAgb3BhY2l0eTogMC40O1xcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCkge1xcbiAgLmdyaWQge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICB9XFxuXFxuICAuc2hpcHMtdGFibGUge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG5cXG4gICNjcHUtYm9hcmQtY29udGFpbmVyIHtcXG4gICAgbWFyZ2luLXRvcDogMDtcXG4gIH1cXG5cXG4gIC5wbGF5ZXItYnV0dG9ucyB1bCB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXG4gIH1cXG4gIC5wbGF5ZXItYnV0dG9ucyB1bCBsaSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgfVxcbiAgLnBsYXllci1idXR0b25zIC5idXR0b24ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19yZXNldC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9zdHlsZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX3ZhcmlhYmxlcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9faW5zdHJ1Y3Rpb25zLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19ib2FyZC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fYnV0dG9ucy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fbWVkaWEtcXVlcmllcy5zY3NzXCJdLFwibmFtZXNc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QSxlQUFBO0VBQ0EsNkJBQUE7RUFDQSx1QkFBQTtFQUNBLGNIUEs7RUdRTCxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtBSm1QSDtBSWxQRztFQUNHLHlCSFpFO0VHYUYsWUFBQTtBSm9QTjtBSWxQRztFQUNHLHlCSGhCRTtFR2lCRixZQUFBO0FKb1BOO0FJbFBHO0VBQ0csWUFBQTtBSm9QTjs7QUt4UUE7RUFDRztJQUNHLGFBQUE7SUFDQSw4QkFBQTtFTDJRSjs7RUt6UUM7SUFDRyxXQUFBO0VMNFFKOztFSzFRQztJQUNHLGFBQUE7RUw2UUo7O0VLMVFJO0lBQ0csU0FBQTtJQUNBLG1CQUFBO0VMNlFQO0VLM1FJO0lBQ0csY0FBQTtFTDZRUDtFSzNRSTtJQUNHLGNBQUE7SUFDQSxXQUFBO0VMNlFQO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxyXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxyXFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXHJcXG4qL1xcclxcbkB1c2UgJy4vdmFyaWFibGVzJyBhcyAqO1xcclxcblxcclxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXHJcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxyXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcclxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXHJcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcclxcbmIsIHUsIGksIGNlbnRlcixcXHJcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcclxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcclxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcclxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXHJcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcclxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcclxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxyXFxuXFx0bWFyZ2luOiAwO1xcclxcblxcdHBhZGRpbmc6IDA7XFxyXFxuXFx0Ym9yZGVyOiAwO1xcclxcblxcdGZvbnQtc2l6ZTogMTAwJTtcXHJcXG5cXHRmb250OiBpbmhlcml0O1xcclxcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcclxcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcclxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxyXFxuXFx0ZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcbmJvZHkge1xcclxcblxcdGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxyXFxuICAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICRncmVlbjtcXHJcXG5cXHRsaW5lLWhlaWdodDogMTtcXHJcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXHJcXG4gICBjb2xvcjogJGdyZWVuO1xcclxcblxcdG1hcmdpbjogMTZweDtcXHJcXG59XFxyXFxub2wsIHVsIHtcXHJcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlLCBxIHtcXHJcXG5cXHRxdW90ZXM6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcclxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXHJcXG5cXHRjb250ZW50OiAnJztcXHJcXG5cXHRjb250ZW50OiBub25lO1xcclxcbn1cXHJcXG50YWJsZSB7XFxyXFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXHJcXG59XFxyXFxucCB7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDEuNTtcXHJcXG59XCIsXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggIzFjYjUxNztcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogIzFjYjUxNztcXG4gIG1hcmdpbjogMTZweDtcXG59XFxuXFxub2wsIHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbmJsb2NrcXVvdGUsIHEge1xcbiAgcXVvdGVzOiBub25lO1xcbn1cXG5cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGNvbnRlbnQ6IG5vbmU7XFxufVxcblxcbnRhYmxlIHtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDtcXG59XFxuXFxucCB7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbn1cXG5cXG4uaW5zdHJ1Y3Rpb25zIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIG1heC13aWR0aDogNTAwcHg7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIG1hcmdpbi10b3A6IDNyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgaDEge1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyIGgxIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbi5ib2FyZCB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4IGF1dG87XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAzcHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG4gIGdyaWQtY29sdW1uOiAyO1xcbiAgZ3JpZC1yb3c6IDE7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlcjogbm9uZTtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjFcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMlxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgzKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIzXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDQpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjRcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg2KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI2XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDcpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjdcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiOFxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg5KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI5XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEwKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIxMFxcXCI7XFxufVxcblxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAzcHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHg7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG4gIGdyaWQtY29sdW1uOiAxO1xcbiAgZ3JpZC1yb3c6IDI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGwge1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJhXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiYlxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDMpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImNcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg0KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJkXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDYpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImZcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg3KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJnXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiaFxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDkpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImlcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxMCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwialxcXCI7XFxufVxcblxcbi5ib2FyZF9fY2VsbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiAjMWNiNTE3O1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZF9fYm9hcmQge1xcbiAgZ3JpZC1yb3c6IDI7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAzcHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG59XFxuLmJvYXJkX19ib2FyZCAuYm9hcmRfX2NlbGw6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuXFxuI2Vycm9yLW1lc3NhZ2Uge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWF4LXdpZHRoOiA1MDBweDtcXG4gIGdyaWQtY29sdW1uOiAxLy0xO1xcbiAgbWFyZ2luLXRvcDogMXJlbTtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgcGFkZGluZzogMCAxcmVtO1xcbn1cXG5cXG4jY3B1LWJvYXJkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgbWFyZ2luLXRvcDogMnJlbTtcXG59XFxuXFxuLnBsYXllci1idXR0b25zIHVsIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbjogMnJlbSAwO1xcbn1cXG4ucGxheWVyLWJ1dHRvbnMgdWwgbGkge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG5cXG4uc2hpcHMtdGFibGUge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIG1hcmdpbi1ib3R0b206IDJyZW07XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG59XFxuLnNoaXBzLXRhYmxlIHRkLCAuc2hpcHMtdGFibGUgdGgge1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG59XFxuXFxuI3N0YXJ0LWJ1dHRvbiB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbi5yZXNldC1jb250YWluZXIge1xcbiAgZm9udC1zaXplOiAxLCA1cmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luOiAzcmVtIDA7XFxufVxcbi5yZXNldC1jb250YWluZXIgcCB7XFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG5cXG4uYnV0dG9uIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICBmb250LXNpemU6IDFyZW07XFxuICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggIzFjYjUxNztcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6ICMxY2I1MTc7XFxuICBwYWRkaW5nOiAwLjVyZW0gMC44cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWNiNTE3O1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG4uYnV0dG9uLS1oaWdobGlnaHRlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWNiNTE3O1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG4uYnV0dG9uOmRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDAuNDtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gIC5ncmlkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgfVxcblxcbiAgLnNoaXBzLXRhYmxlIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICB9XFxuXFxuICAjY3B1LWJvYXJkLWNvbnRhaW5lciB7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICB9XFxuXFxuICAucGxheWVyLWJ1dHRvbnMgdWwge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG1hcmdpbi1ib3R0b206IDJyZW07XFxuICB9XFxuICAucGxheWVyLWJ1dHRvbnMgdWwgbGkge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gIH1cXG4gIC5wbGF5ZXItYnV0dG9ucyAuYnV0dG9uIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cIixcIiRncmVlbjogIzFjYjUxNztcIixcIkB1c2UgJy4vdmFyaWFibGVzJyBhcyAqO1xcclxcblxcclxcbi5pbnN0cnVjdGlvbnMge1xcclxcbiAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gICBtYXgtd2lkdGg6IDUwMHB4O1xcclxcbiAgIHBhZGRpbmc6IDFyZW07XFxyXFxuICAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xcclxcbiAgIG1hcmdpbi10b3A6IDNyZW07XFxyXFxuICAgaDEge1xcclxcbiAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICAgfVxcclxcbn1cIixcIkB1c2UgJ3Nhc3M6bGlzdCc7XFxyXFxuQHVzZSAnLi92YXJpYWJsZXMnIGFzICo7XFxyXFxuXFxyXFxuJGNlbGxXaWR0aDogMzBweDtcXHJcXG5cXHJcXG4uYm9hcmQtY29udGFpbmVyIHtcXHJcXG4gICBoMSB7XFxyXFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxyXFxuICAgICAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXHJcXG4gICB9XFxyXFxufVxcclxcbi5ib2FyZCB7XFxyXFxuICAgZm9udC1zaXplOiAxOHB4O1xcclxcbiAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAkY2VsbFdpZHRoIGF1dG87XFxyXFxuICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIge1xcclxcbiAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgZ2FwOiAzcHg7XFxyXFxuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsICRjZWxsV2lkdGgpO1xcclxcbiAgIGdyaWQtYXV0by1yb3dzOiAkY2VsbFdpZHRoO1xcclxcbiAgIGdyaWQtY29sdW1uOiAyO1xcclxcbiAgIGdyaWQtcm93OiAxO1xcclxcbiAgIC5ib2FyZF9fY2VsbCB7XFxyXFxuICAgICAgYm9yZGVyOiBub25lO1xcclxcblxcclxcbiAgICAgIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggMTAge1xcclxcbiAgICAgICAgICY6bnRoLWNoaWxkKCN7JGl9KTo6YmVmb3JlIHtcXHJcXG4gICAgICAgICAgICBjb250ZW50OiAnI3skaX0nOyBcXHJcXG4gICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XFxyXFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIHtcXHJcXG4gICBkaXNwbGF5OiBncmlkO1xcclxcbiAgIGdhcDogM3B4O1xcclxcbiAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogJGNlbGxXaWR0aDtcXHJcXG4gICBncmlkLWF1dG8tcm93czogJGNlbGxXaWR0aDtcXHJcXG4gICBncmlkLWNvbHVtbjogMTtcXHJcXG4gICBncmlkLXJvdzogMjtcXHJcXG4gICAuYm9hcmRfX2NlbGwge1xcclxcbiAgICAgIGJvcmRlcjogbm9uZTtcXHJcXG5cXHJcXG4gICAgICAkbGV0dGVyczogJ2EnLCdiJywnYycsJ2QnLCdlJywnZicsJ2cnLCdoJywnaScsJ2onO1xcclxcblxcclxcbiAgICAgIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggMTAge1xcclxcbiAgICAgICAgICY6bnRoLWNoaWxkKCN7JGl9KTo6YmVmb3JlIHtcXHJcXG4gICAgICAgICAgICBjb250ZW50OiAnI3tsaXN0Lm50aCgkbGV0dGVycywgJGkpfSc7IFxcclxcbiAgICAgICAgIH1cXHJcXG4gICAgICB9XFxyXFxuICAgfVxcclxcbn1cXHJcXG4uYm9hcmRfX2NlbGwge1xcclxcbiAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcclxcbiAgIGNvbG9yOiAkZ3JlZW47XFxyXFxuICAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xcclxcbiAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuLmJvYXJkX19ib2FyZCB7XFxyXFxuICAgZ3JpZC1yb3c6IDI7XFxyXFxuICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICBnYXA6IDNweDtcXHJcXG4gICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgJGNlbGxXaWR0aCk7XFxyXFxuICAgZ3JpZC1hdXRvLXJvd3M6ICRjZWxsV2lkdGg7XFxyXFxuICAgLmJvYXJkX19jZWxsIHtcXHJcXG4gICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JlZW47XFxyXFxuICAgICAgICAgY29sb3I6IGJsYWNrO1xcclxcbiAgICAgIH1cXHJcXG4gICB9XFxyXFxufVxcclxcbiNlcnJvci1tZXNzYWdlIHtcXHJcXG4gICBmb250LXNpemU6IDFyZW07XFxyXFxuICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgIG1heC13aWR0aDogNTAwcHg7XFxyXFxuICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXHJcXG4gICBtYXJnaW4tdG9wOiAxcmVtO1xcclxcbiAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG4gICBwYWRkaW5nOiAwIDFyZW07XFxyXFxufVxcclxcbiNjcHUtYm9hcmQtY29udGFpbmVyIHtcXHJcXG4gICBkaXNwbGF5OiBub25lO1xcclxcbiAgIG1hcmdpbi10b3A6IDJyZW07XFxyXFxufVxcclxcbi5wbGF5ZXItYnV0dG9ucyB7XFxyXFxuICAgdWwge1xcclxcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgICBtYXJnaW46IDJyZW0gMDtcXHJcXG4gICB9XFxyXFxuICAgdWwgbGkge1xcclxcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgICBtYXJnaW4tYm90dG9tOiAuNXJlbTtcXHJcXG4gICB9XFxyXFxufVxcclxcbi5zaGlwcy10YWJsZSB7XFxyXFxuICAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgIGJvcmRlcjogMXB4IHNvbGlkICRncmVlbjtcXHJcXG4gICBtYXJnaW4tYm90dG9tOiAycmVtO1xcclxcbiAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG5cXHJcXG4gICB0ZCwgdGgge1xcclxcbiAgICAgIHBhZGRpbmc6IC41cmVtO1xcclxcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICRncmVlbjtcXHJcXG4gICB9XFxyXFxufVxcclxcbiNzdGFydC1idXR0b24ge1xcclxcbiAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXHJcXG59XFxyXFxuLnJlc2V0LWNvbnRhaW5lciB7XFxyXFxuICAgZm9udC1zaXplOiAxLDVyZW07XFxyXFxuICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgIG1hcmdpbjogM3JlbSAwO1xcclxcbiAgIHAge1xcclxcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICAgfVxcclxcbn1cIixcIkB1c2UgJy4vdmFyaWFibGVzJyBhcyAqO1xcclxcblxcclxcbi5idXR0b24ge1xcclxcbiAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxyXFxuICAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgIHRleHQtc2hhZG93OiAwIDAgMTBweCAkZ3JlZW47XFxyXFxuICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxyXFxuICAgY29sb3I6ICRncmVlbjtcXHJcXG4gICBwYWRkaW5nOiAuNXJlbSAuOHJlbTtcXHJcXG4gICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XFxyXFxuICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRncmVlbjtcXHJcXG4gICAgICBjb2xvcjogYmxhY2s7XFxyXFxuICAgfVxcclxcbiAgICYtLWhpZ2hsaWdodGVkIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JlZW47XFxyXFxuICAgICAgY29sb3I6IGJsYWNrO1xcclxcbiAgIH1cXHJcXG4gICAmOmRpc2FibGVkIHtcXHJcXG4gICAgICBvcGFjaXR5OiAuNDtcXHJcXG4gICB9XFxyXFxufVwiLFwiQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpIHtcXHJcXG4gICAuZ3JpZCB7XFxyXFxuICAgICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxyXFxuICAgfVxcclxcbiAgIC5zaGlwcy10YWJsZSB7XFxyXFxuICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgfVxcclxcbiAgICNjcHUtYm9hcmQtY29udGFpbmVyIHtcXHJcXG4gICAgICBtYXJnaW4tdG9wOiAwO1xcclxcbiAgIH1cXHJcXG4gICAucGxheWVyLWJ1dHRvbnMge1xcclxcbiAgICAgIHVsIHtcXHJcXG4gICAgICAgICBtYXJnaW46IDA7XFxyXFxuICAgICAgICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgdWwgbGkge1xcclxcbiAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICAgIH1cXHJcXG4gICAgICAuYnV0dG9uIHtcXHJcXG4gICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICB9XFxyXFxuICAgfVxcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJHYW1lIiwiX3dpbm5lck1lc3NhZ2UiLCJfY2FuR2FtZVN0YXJ0IiwiX2NvbXB1dGVyQm9hcmQiLCJwbGF5ZXJCb2FyZCIsImdldENvbXB1dGVyQm9hcmQiLCJnZXRCb2FyZCIsImluaXQiLCJwbGFjZUVuZW15QXJteSIsInR5cGUiLCJyb3ciLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb2x1bW4iLCJsZW5ndGgiLCJkaXJlY3Rpb24iLCJwbGFjZVNoaXAiLCJlIiwibWVzc2FnZSIsImluY2x1ZGVzIiwiaXNBcm15Q29tcGxldGUiLCJjb21wdXRlclNoaXBzSW5mbyIsImdldFNoaXBzIiwicmVtb3ZlU2hpcCIsInRha2VUdXJuIiwiY2VsbCIsImF0dGFja1BsYXllciIsInJlY2VpdmVBdHRhY2siLCJhbGxTaGlwc1N1bmsiLCJnZXRXaW5uZXIiLCJyZXNldCIsInVuZGVmaW5lZCIsIlNoaXAiLCJfYm9hcmQiLCJfc2hpcHMiLCJ0eXBlMSIsInNoaXBzIiwibWF4Iiwic3ltYm9sIiwidHlwZTIiLCJ0eXBlMyIsInR5cGU0IiwicHVzaCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInNoaXBzQ2xvbmUiLCJrZXkiLCJmb3JFYWNoIiwic2hpcCIsImNsb25lIiwiZ2V0TGVuZ3RoIiwiZ2V0Q29vcnMiLCJpIiwiZ2V0SGl0cyIsImhpdCIsImdldEJvYXJkQW5kU2hpcHMiLCJib2FyZENvcHkiLCJjdXJyZW50U2hpcCIsInNoaXBDb29ycyIsImNvb3JzIiwiY29vcmRpbmF0ZXMiLCJpc05hTiIsIk51bWJlciIsIkVycm9yIiwic2hpcENvb3JkaW5hdGVzIiwiY29vcnNDb3B5IiwiY3VycmVudENvb3IiLCJuZXdTaGlwIiwibmV3U2hpcENvb3JzIiwiZXJyb3JNc2ciLCJmaWx0ZXJlZFNoaXBzIiwiaiIsImZpbHRlciIsInNoaXBzTG9vcCIsInJlc3VsdE1zZyIsInJlZHVjZSIsImFjYyIsImN1cnJlbnQiLCJzbGljZSIsInR5cGVMb29wIiwiaXNTdW5rIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNwdUJvYXJkQ29udGFpbmVyIiwiY3B1Qm9hcmQiLCJidXR0b25zQ29udGFpbmVyIiwic2hpcFRhYmxlQ291bnRlcnMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiZXJyb3JNZXNzYWdlIiwic3RhcnRCdG4iLCJwbGF5ZXJCb2FyZENlbGxzIiwiY3B1Qm9hcmRDZWxscyIsInNoaXBzSW5mbyIsInByZXZpb3VzQ2xpY2tlZEJ0biIsImN1cnJlbnRDZWxsIiwiY2VsbHNUb0hpZ2hsaWdodCIsImNlbGxCdG4iLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiZGF0YXNldCIsImZpbGxlZCIsImFwcGVuZCIsImNsb25lTm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbGlja2VkQnV0dG9ucyIsInNob3dQcmV2aWV3SGFuZGxlciIsInJlbW92ZVNoaXBQcmV2aWV3IiwicGxhY2VOZXdTaGlwIiwid2luZG93Iiwicm90YXRlU2hpcCIsImluaXRpYWxpemVHYW1lIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiaWQiLCJzaG93U2hpcFByZXZpZXciLCJub2RlIiwibGVuZ3RoTG9vcCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJib3JkZXJDb2xvciIsInRleHRDb250ZW50IiwiZGlzYWJsZWQiLCJ1cGRhdGVQbGF5ZXJCb2FyZCIsInVwZGF0ZVNoaXBzVGFibGUiLCJ2aXNpYmlsaXR5IiwiYm9hcmQiLCJzZWFyY2giLCJpbmRleCIsIm1zZyIsInNoaXBCdXR0b25zIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZlbnREZWZhdWx0IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInBhcmVudEVsZW1lbnQiLCJkaXNwbGF5IiwiYXR0YWNrQ3B1Qm9hcmQiLCJ0dXJuUmVzdWx0IiwidXBkYXRlQ3B1Qm9hcmQiLCJkaXYiLCJwIiwiYnV0dG9uIiwiYm9keSIsImZpcnN0RWxlbWVudENoaWxkIiwiYWZ0ZXIiLCJyZXNldEdhbWUiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJjb3VudGVyIiwiX2Nvb3JkaW5hdGVzIiwiX2xlbmd0aCIsIl9oaXRzQ291bnRlciJdLCJzb3VyY2VSb290IjoiIn0=