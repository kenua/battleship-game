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
      max: 1
    },
    type2: {
      ships: [],
      length: 4,
      max: 2
    },
    type3: {
      ships: [],
      length: 3,
      max: 3
    },
    type4: {
      ships: [],
      length: 2,
      max: 4
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

    for (var type in _ships) {
      for (var i = 0; i < _ships[type].ships.length; i++) {
        var currentShip = _ships[type].ships[i];
        var shipCoors = currentShip.getCoors();
        shipCoors.forEach(function (coors) {
          var _coors = _slicedToArray(coors, 2),
              row = _coors[0],
              column = _coors[1];

          if (boardCopy[row][column] === "~") {
            boardCopy[row][column] = "s";
          }
        });
      }
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
      var _loop2 = function _loop2(i) {
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
        var _ret = _loop2(i);

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
    var symbol = "m";

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
            symbol = "h";
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
    var div = document.createElement("div");
    div.className = "board__cell";
    div.dataset.row = row;
    div.dataset.cell = cell;
    div.dataset.filled = "false";
    playerBoard.append(div);
    playerBoardCells[row].push(div);
    var clone = div.cloneNode();
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
      if (board[_row2][_cell2].search(/[shm]/) >= 0) {
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
      var _div = document.createElement("div");

      var p = document.createElement("p");
      var button = document.createElement("button");
      _div.className = "reset-container";
      p.textContent = turnResult;
      button.className = "button";
      button.textContent = "Reset Game";

      _div.append(p, button);

      document.body.firstElementChild.after(_div);
      button.addEventListener("click", resetGame);
      cpuBoard.removeEventListener("click", attackCpuBoard);
    }
  }
}

function updateCpuBoard() {
  var board = _game_js__WEBPACK_IMPORTED_MODULE_0__["default"].getComputerBoard();

  for (var _row4 = 0; _row4 < board.length; _row4++) {
    for (var _cell4 = 0; _cell4 < board[_row4].length; _cell4++) {
      if (board[_row4][_cell4].search(/[hm]/) >= 0) {
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
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  line-height: 1;\n  background-color: black;\n  color: #1cb517;\n  margin: 16px;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\np {\n  line-height: 1.5;\n}\n\n.instructions {\n  padding: 1rem;\n  border: 1px solid #1cb517;\n  margin-top: 3rem;\n}\n.instructions h1 {\n  font-size: 1.4rem;\n}\n.instructions h2 {\n  font-size: 1.2rem;\n}\n.instructions h1, .instructions h2 {\n  margin: 1rem 0;\n}\n.instructions h1:first-child, .instructions h2:first-child {\n  margin-top: 0;\n}\n.instructions li {\n  margin-bottom: 1rem;\n}\n.instructions li:last-child {\n  margin: 0;\n}\n\n.board-section {\n  margin-bottom: 3rem;\n}\n.board-section > h1 {\n  text-align: center;\n  text-transform: uppercase;\n  font-size: 1.5rem;\n}\n\n.board {\n  font-size: 18px;\n  display: grid;\n  grid-template-columns: 30px auto;\n  justify-content: center;\n}\n\n.board__letters-container {\n  display: grid;\n  gap: 5px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n  grid-column: 2;\n  grid-row: 1;\n  margin-bottom: 10px;\n  margin-left: 10px;\n}\n.board__letters-container .board__cell {\n  border-top: none;\n  border-right: none;\n  border-left: none;\n}\n.board__letters-container .board__cell:nth-child(1)::before {\n  content: \"1\";\n}\n.board__letters-container .board__cell:nth-child(2)::before {\n  content: \"2\";\n}\n.board__letters-container .board__cell:nth-child(3)::before {\n  content: \"3\";\n}\n.board__letters-container .board__cell:nth-child(4)::before {\n  content: \"4\";\n}\n.board__letters-container .board__cell:nth-child(5)::before {\n  content: \"5\";\n}\n.board__letters-container .board__cell:nth-child(6)::before {\n  content: \"6\";\n}\n.board__letters-container .board__cell:nth-child(7)::before {\n  content: \"7\";\n}\n.board__letters-container .board__cell:nth-child(8)::before {\n  content: \"8\";\n}\n.board__letters-container .board__cell:nth-child(9)::before {\n  content: \"9\";\n}\n.board__letters-container .board__cell:nth-child(10)::before {\n  content: \"10\";\n}\n\n.board__digits-container {\n  display: grid;\n  gap: 5px;\n  grid-template-columns: 30px;\n  grid-auto-rows: 30px;\n  grid-column: 1;\n  grid-row: 2;\n}\n.board__digits-container .board__cell {\n  border-top: none;\n  border-bottom: none;\n  border-left: none;\n}\n.board__digits-container .board__cell:nth-child(1)::before {\n  content: \"a\";\n}\n.board__digits-container .board__cell:nth-child(2)::before {\n  content: \"b\";\n}\n.board__digits-container .board__cell:nth-child(3)::before {\n  content: \"c\";\n}\n.board__digits-container .board__cell:nth-child(4)::before {\n  content: \"d\";\n}\n.board__digits-container .board__cell:nth-child(5)::before {\n  content: \"e\";\n}\n.board__digits-container .board__cell:nth-child(6)::before {\n  content: \"f\";\n}\n.board__digits-container .board__cell:nth-child(7)::before {\n  content: \"g\";\n}\n.board__digits-container .board__cell:nth-child(8)::before {\n  content: \"h\";\n}\n.board__digits-container .board__cell:nth-child(9)::before {\n  content: \"i\";\n}\n.board__digits-container .board__cell:nth-child(10)::before {\n  content: \"j\";\n}\n\n.board__cell {\n  border: 1px solid #1cb517;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.board__board {\n  grid-row: 2;\n  margin-left: 10px;\n  display: grid;\n  gap: 5px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n}\n.board__board .board__cell:hover {\n  background-color: #1cb517;\n  color: black;\n}\n\n#error-message {\n  font-size: 1rem;\n  grid-column: 1/-1;\n  margin-top: 1rem;\n  margin-left: 0.5rem;\n}\n\n.player-buttons ul {\n  margin: 2rem 0;\n}\n.player-buttons ul li {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\n.ships-table {\n  margin-bottom: 2rem;\n}\n.ships-table table {\n  border: 1px solid #1cb517;\n}\n.ships-table td, .ships-table th {\n  padding: 0.5rem;\n  border: 1px solid #1cb517;\n}\n\n#start-button {\n  visibility: hidden;\n}\n\n.reset-container {\n  font-size: 1, 5rem;\n  text-align: center;\n  margin: 3rem 0;\n}\n.reset-container p {\n  margin-bottom: 1rem;\n}\n\n.button {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  background-color: black;\n  color: #1cb517;\n  padding: 0.5rem 0.8rem;\n  border: 1px solid #1cb517;\n  cursor: pointer;\n}\n.button:hover {\n  background-color: #1cb517;\n  color: black;\n}\n.button--highlighted {\n  background-color: #1cb517;\n  color: black;\n}\n.button:disabled {\n  opacity: 0.4;\n}\n\n@media only screen and (min-width: 800px) {\n  .player-board {\n    max-width: 1200px;\n    margin: 0 auto;\n    display: grid;\n    column-gap: 1rem;\n    grid-template-columns: repeat(3, 1fr);\n  }\n  .player-board h1 {\n    grid-column: 1/-1;\n    grid-row: 1;\n  }\n  .player-board .board {\n    grid-column: 2/3;\n    grid-row: 2;\n  }\n  .player-board .player-buttons {\n    grid-column: 3/4;\n    grid-row: 2;\n  }\n\n  .player-buttons ul {\n    margin: 0;\n    margin-bottom: 2rem;\n  }\n  .player-buttons ul li {\n    display: block;\n  }\n  .player-buttons .button {\n    display: block;\n    width: 100%;\n  }\n}\n@media only screen and (min-width: 1100px) {\n  .instructions {\n    margin: 0;\n    max-width: 280px;\n    position: fixed;\n    bottom: 16px;\n    left: 16px;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/_reset.scss","webpack://./src/scss/styles.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_instructions.scss","webpack://./src/scss/_board.scss","webpack://./src/scss/_buttons.scss","webpack://./src/scss/_media-queries.scss"],"names":[],"mappings":"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","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n@use './variables' as *;\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, center,\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed, \r\nfigure, figcaption, footer, header, hgroup, \r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tfont-size: 100%;\r\n\tfont: inherit;\r\n\tvertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure, \r\nfooter, header, hgroup, menu, nav, section {\r\n\tdisplay: block;\r\n}\r\nbody {\r\n\tfont-family: monospace;\r\n   text-shadow: 0 0 10px $green;\r\n\tline-height: 1;\r\n   background-color: black;\r\n   color: $green;\r\n\tmargin: 16px;\r\n}\r\nol, ul {\r\n\tlist-style: none;\r\n}\r\nblockquote, q {\r\n\tquotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n\tcontent: '';\r\n\tcontent: none;\r\n}\r\ntable {\r\n\tborder-collapse: collapse;\r\n\tborder-spacing: 0;\r\n}\r\np {\r\n\tline-height: 1.5;\r\n}","/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  line-height: 1;\n  background-color: black;\n  color: #1cb517;\n  margin: 16px;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\np {\n  line-height: 1.5;\n}\n\n.instructions {\n  padding: 1rem;\n  border: 1px solid #1cb517;\n  margin-top: 3rem;\n}\n.instructions h1 {\n  font-size: 1.4rem;\n}\n.instructions h2 {\n  font-size: 1.2rem;\n}\n.instructions h1, .instructions h2 {\n  margin: 1rem 0;\n}\n.instructions h1:first-child, .instructions h2:first-child {\n  margin-top: 0;\n}\n.instructions li {\n  margin-bottom: 1rem;\n}\n.instructions li:last-child {\n  margin: 0;\n}\n\n.board-section {\n  margin-bottom: 3rem;\n}\n.board-section > h1 {\n  text-align: center;\n  text-transform: uppercase;\n  font-size: 1.5rem;\n}\n\n.board {\n  font-size: 18px;\n  display: grid;\n  grid-template-columns: 30px auto;\n  justify-content: center;\n}\n\n.board__letters-container {\n  display: grid;\n  gap: 5px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n  grid-column: 2;\n  grid-row: 1;\n  margin-bottom: 10px;\n  margin-left: 10px;\n}\n.board__letters-container .board__cell {\n  border-top: none;\n  border-right: none;\n  border-left: none;\n}\n.board__letters-container .board__cell:nth-child(1)::before {\n  content: \"1\";\n}\n.board__letters-container .board__cell:nth-child(2)::before {\n  content: \"2\";\n}\n.board__letters-container .board__cell:nth-child(3)::before {\n  content: \"3\";\n}\n.board__letters-container .board__cell:nth-child(4)::before {\n  content: \"4\";\n}\n.board__letters-container .board__cell:nth-child(5)::before {\n  content: \"5\";\n}\n.board__letters-container .board__cell:nth-child(6)::before {\n  content: \"6\";\n}\n.board__letters-container .board__cell:nth-child(7)::before {\n  content: \"7\";\n}\n.board__letters-container .board__cell:nth-child(8)::before {\n  content: \"8\";\n}\n.board__letters-container .board__cell:nth-child(9)::before {\n  content: \"9\";\n}\n.board__letters-container .board__cell:nth-child(10)::before {\n  content: \"10\";\n}\n\n.board__digits-container {\n  display: grid;\n  gap: 5px;\n  grid-template-columns: 30px;\n  grid-auto-rows: 30px;\n  grid-column: 1;\n  grid-row: 2;\n}\n.board__digits-container .board__cell {\n  border-top: none;\n  border-bottom: none;\n  border-left: none;\n}\n.board__digits-container .board__cell:nth-child(1)::before {\n  content: \"a\";\n}\n.board__digits-container .board__cell:nth-child(2)::before {\n  content: \"b\";\n}\n.board__digits-container .board__cell:nth-child(3)::before {\n  content: \"c\";\n}\n.board__digits-container .board__cell:nth-child(4)::before {\n  content: \"d\";\n}\n.board__digits-container .board__cell:nth-child(5)::before {\n  content: \"e\";\n}\n.board__digits-container .board__cell:nth-child(6)::before {\n  content: \"f\";\n}\n.board__digits-container .board__cell:nth-child(7)::before {\n  content: \"g\";\n}\n.board__digits-container .board__cell:nth-child(8)::before {\n  content: \"h\";\n}\n.board__digits-container .board__cell:nth-child(9)::before {\n  content: \"i\";\n}\n.board__digits-container .board__cell:nth-child(10)::before {\n  content: \"j\";\n}\n\n.board__cell {\n  border: 1px solid #1cb517;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.board__board {\n  grid-row: 2;\n  margin-left: 10px;\n  display: grid;\n  gap: 5px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n}\n.board__board .board__cell:hover {\n  background-color: #1cb517;\n  color: black;\n}\n\n#error-message {\n  font-size: 1rem;\n  grid-column: 1/-1;\n  margin-top: 1rem;\n  margin-left: 0.5rem;\n}\n\n.player-buttons ul {\n  margin: 2rem 0;\n}\n.player-buttons ul li {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\n.ships-table {\n  margin-bottom: 2rem;\n}\n.ships-table table {\n  border: 1px solid #1cb517;\n}\n.ships-table td, .ships-table th {\n  padding: 0.5rem;\n  border: 1px solid #1cb517;\n}\n\n#start-button {\n  visibility: hidden;\n}\n\n.reset-container {\n  font-size: 1, 5rem;\n  text-align: center;\n  margin: 3rem 0;\n}\n.reset-container p {\n  margin-bottom: 1rem;\n}\n\n.button {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  background-color: black;\n  color: #1cb517;\n  padding: 0.5rem 0.8rem;\n  border: 1px solid #1cb517;\n  cursor: pointer;\n}\n.button:hover {\n  background-color: #1cb517;\n  color: black;\n}\n.button--highlighted {\n  background-color: #1cb517;\n  color: black;\n}\n.button:disabled {\n  opacity: 0.4;\n}\n\n@media only screen and (min-width: 800px) {\n  .player-board {\n    max-width: 1200px;\n    margin: 0 auto;\n    display: grid;\n    column-gap: 1rem;\n    grid-template-columns: repeat(3, 1fr);\n  }\n  .player-board h1 {\n    grid-column: 1/-1;\n    grid-row: 1;\n  }\n  .player-board .board {\n    grid-column: 2/3;\n    grid-row: 2;\n  }\n  .player-board .player-buttons {\n    grid-column: 3/4;\n    grid-row: 2;\n  }\n\n  .player-buttons ul {\n    margin: 0;\n    margin-bottom: 2rem;\n  }\n  .player-buttons ul li {\n    display: block;\n  }\n  .player-buttons .button {\n    display: block;\n    width: 100%;\n  }\n}\n@media only screen and (min-width: 1100px) {\n  .instructions {\n    margin: 0;\n    max-width: 280px;\n    position: fixed;\n    bottom: 16px;\n    left: 16px;\n  }\n}","$green: #1cb517;","@use './variables' as *;\r\n\r\n.instructions {\r\n   padding: 1rem;\r\n   border: 1px solid $green;\r\n   margin-top: 3rem;\r\n   h1 {\r\n      font-size: 1.4rem;\r\n   }\r\n   h2 {\r\n      font-size: 1.2rem;\r\n   }\r\n   h1, h2 {\r\n      margin: 1rem 0;\r\n   }\r\n   h1:first-child, h2:first-child {\r\n      margin-top: 0;\r\n   }\r\n   li {\r\n      margin-bottom: 1rem;\r\n      &:last-child {\r\n         margin: 0;\r\n      }\r\n   }\r\n}","@use 'sass:list';\r\n@use './variables' as *;\r\n\r\n$cellWidth: 30px;\r\n\r\n.board-section {\r\n   margin-bottom: 3rem;\r\n   & > h1 {\r\n      text-align: center;\r\n      text-transform: uppercase;\r\n      font-size: 1.5rem;\r\n   }\r\n}\r\n.board {\r\n   font-size: 18px;\r\n   display: grid;\r\n   grid-template-columns: $cellWidth auto;\r\n   justify-content: center;\r\n}\r\n.board__letters-container {\r\n   display: grid;\r\n   gap: 5px;\r\n   grid-template-columns: repeat(10, $cellWidth);\r\n   grid-auto-rows: $cellWidth;\r\n   grid-column: 2;\r\n   grid-row: 1;\r\n   margin-bottom: 10px;\r\n   margin-left: 10px;\r\n   .board__cell {\r\n      border-top: none;\r\n      border-right: none;\r\n      border-left: none;\r\n\r\n      @for $i from 1 through 10 {\r\n         &:nth-child(#{$i})::before {\r\n            content: '#{$i}'; \r\n         }\r\n      }\r\n   }\r\n}\r\n.board__digits-container {\r\n   display: grid;\r\n   gap: 5px;\r\n   grid-template-columns: $cellWidth;\r\n   grid-auto-rows: $cellWidth;\r\n   grid-column: 1;\r\n   grid-row: 2;\r\n   .board__cell {\r\n      border-top: none;\r\n      border-bottom: none;\r\n      border-left: none;\r\n\r\n      $letters: 'a','b','c','d','e','f','g','h','i','j';\r\n\r\n      @for $i from 1 through 10 {\r\n         &:nth-child(#{$i})::before {\r\n            content: '#{list.nth($letters, $i)}'; \r\n         }\r\n      }\r\n   }\r\n}\r\n.board__cell {\r\n   border: 1px solid $green;\r\n   display: flex;\r\n   justify-content: center;\r\n   align-items: center;\r\n}\r\n.board__board {\r\n   grid-row: 2;\r\n   margin-left: 10px;\r\n   display: grid;\r\n   gap: 5px;\r\n   grid-template-columns: repeat(10, $cellWidth);\r\n   grid-auto-rows: $cellWidth;\r\n   .board__cell {\r\n      &:hover {\r\n         background-color: $green;\r\n         color: black;\r\n      }\r\n   }\r\n}\r\n#error-message {\r\n   font-size: 1rem;\r\n   grid-column: 1 / -1;\r\n   margin-top: 1rem;\r\n   margin-left: .5rem;\r\n}\r\n.player-buttons {\r\n   ul {\r\n      margin: 2rem 0;\r\n   }\r\n   ul li {\r\n      display: inline-block;\r\n      margin-bottom: .5rem;\r\n   }\r\n}\r\n.ships-table {\r\n   margin-bottom: 2rem;\r\n\r\n   table {\r\n      border: 1px solid $green;\r\n   }\r\n   td, th {\r\n      padding: .5rem;\r\n      border: 1px solid $green;\r\n   }\r\n}\r\n#start-button {\r\n   visibility: hidden;\r\n}\r\n.reset-container {\r\n   font-size: 1,5rem;\r\n   text-align: center;\r\n   margin: 3rem 0;\r\n   p {\r\n      margin-bottom: 1rem;\r\n   }\r\n}","@use './variables' as *;\r\n\r\n.button {\r\n   font-family: monospace;\r\n   text-shadow: 0 0 10px $green;\r\n   background-color: black;\r\n   color: $green;\r\n   padding: .5rem .8rem;\r\n   border: 1px solid $green;\r\n   cursor: pointer;\r\n   &:hover {\r\n      background-color: $green;\r\n      color: black;\r\n   }\r\n   &--highlighted {\r\n      background-color: $green;\r\n      color: black;\r\n   }\r\n   &:disabled {\r\n      opacity: .4;\r\n   }\r\n}","@media only screen and (min-width: 800px) {\r\n   .player-board {\r\n      max-width: 1200px;\r\n      margin: 0 auto;\r\n      display: grid;\r\n      column-gap: 1rem;\r\n      grid-template-columns: repeat(3, 1fr);\r\n      h1 {\r\n         grid-column: 1 / -1;\r\n         grid-row: 1;\r\n      }\r\n      .board {\r\n         grid-column: 2 / 3;\r\n         grid-row: 2;\r\n      }\r\n      .player-buttons {\r\n         grid-column: 3 / 4;\r\n         grid-row: 2;\r\n      }\r\n   }\r\n   .player-buttons {\r\n      ul {\r\n         margin: 0;\r\n         margin-bottom: 2rem;\r\n      }\r\n      ul li {\r\n         display: block;\r\n      }\r\n      .button {\r\n         display: block;\r\n         width: 100%;\r\n      }\r\n   }\r\n}\r\n@media only screen and (min-width: 1100px) {\r\n   .instructions {\r\n      margin: 0;\r\n      max-width: 280px;\r\n      position: fixed;\r\n      bottom: 16px;\r\n      left: 16px;\r\n   }\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2Nzcy9zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3NzL3N0eWxlcy5zY3NzPzMyMWYiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xyXG5cclxuY29uc3QgR2FtZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgIGxldCBfd2lubmVyTWVzc2FnZTtcclxuICAgbGV0IF9jYW5HYW1lU3RhcnQgPSBmYWxzZTtcclxuICAgbGV0IF9jb21wdXRlckJvYXJkID0gR2FtZWJvYXJkKCk7XHJcbiAgIGxldCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xyXG5cclxuICAgY29uc3QgZ2V0Q29tcHV0ZXJCb2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF9jb21wdXRlckJvYXJkLmdldEJvYXJkKCk7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgcGxhY2VFbmVteUFybXkgPSBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBwbGFjZSBzaGlwc1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgICAgICBsZXQgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gdHlwZS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBkaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSA9PT0gMCA/IFwidmVyXCIgOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgX2NvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtyb3csIGNvbHVtbl0sIGxlbmd0aCwgZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgcGxhY2VFbmVteUFybXkodHlwZSk7XHJcbiAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgaWYgKCFlLm1lc3NhZ2UuaW5jbHVkZXMoXCJFeGNlZWRlZCBudW1iZXIgb2Ygc2hpcHNcIikpIHtcclxuICAgICAgICAgICAgICAgcGxhY2VFbmVteUFybXkodHlwZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiBcImZpbmlzaGVkXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gZmlsbCBjb21wdXRlckJvYXJkIHdpdGggc2hpcHNcclxuICAgICAgaWYgKCFfY29tcHV0ZXJCb2FyZC5pc0FybXlDb21wbGV0ZSgpKSB7XHJcbiAgICAgICAgIGxldCBjb21wdXRlclNoaXBzSW5mbyA9IF9jb21wdXRlckJvYXJkLmdldFNoaXBzKCk7XHJcblxyXG4gICAgICAgICBmb3IgKGxldCB0eXBlIGluIGNvbXB1dGVyU2hpcHNJbmZvKSB7XHJcbiAgICAgICAgICAgIHBsYWNlRW5lbXlBcm15KGNvbXB1dGVyU2hpcHNJbmZvW3R5cGVdKTtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGxheWVyQm9hcmQuaXNBcm15Q29tcGxldGUoKSkge1xyXG4gICAgICAgICBfY2FuR2FtZVN0YXJ0ID0gdHJ1ZTtcclxuICAgICAgICAgdGhpcy5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAgPSBudWxsO1xyXG4gICAgICAgICB0aGlzLnBsYXllckJvYXJkLnJlbW92ZVNoaXAgPSBudWxsO1xyXG4gICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCB0YWtlVHVybiA9IGZ1bmN0aW9uIChyb3csIGNlbGwpIHtcclxuICAgICAgaWYgKCFfY2FuR2FtZVN0YXJ0KSByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgIGlmICghX3dpbm5lck1lc3NhZ2UpIHtcclxuICAgICAgICAgbGV0IGF0dGFja1BsYXllciA9ICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcblxyXG4gICAgICAgICAgICAgICB0aGlzLnBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjZWxsKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgIGUubWVzc2FnZS5pbmNsdWRlcyhcclxuICAgICAgICAgICAgICAgICAgICAgXCJZb3UgYWxyZWFkeSBhdHRhY2tlZCB0aGUgZm9sbG93aW5nIGNvb3JkaW5hdGVzXCJcclxuICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgYXR0YWNrUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9O1xyXG5cclxuICAgICAgICAgLy8gYXR0YWNrIGNvbXB1dGVyXHJcbiAgICAgICAgIF9jb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjZWxsKTtcclxuXHJcbiAgICAgICAgIGlmIChfY29tcHV0ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xyXG4gICAgICAgICAgICBfd2lubmVyTWVzc2FnZSA9IFwiUGxheWVyIHdvbiB0aGUgbWF0Y2hcIjtcclxuICAgICAgICAgICAgcmV0dXJuIF93aW5uZXJNZXNzYWdlO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAvLyBhdHRhY2sgcGxheWVyXHJcbiAgICAgICAgIGF0dGFja1BsYXllcigpO1xyXG5cclxuICAgICAgICAgaWYgKHRoaXMucGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcclxuICAgICAgICAgICAgX3dpbm5lck1lc3NhZ2UgPSBcIkNvbXB1dGVyIHdvbiB0aGUgbWF0Y2hcIjtcclxuICAgICAgICAgICAgcmV0dXJuIF93aW5uZXJNZXNzYWdlO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIF93aW5uZXJNZXNzYWdlO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgZ2V0V2lubmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX3dpbm5lck1lc3NhZ2U7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCByZXNldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgX3dpbm5lck1lc3NhZ2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgIF9jYW5HYW1lU3RhcnQgPSBmYWxzZTtcclxuICAgICAgX2NvbXB1dGVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcclxuICAgICAgdGhpcy5wbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xyXG4gICB9O1xyXG5cclxuICAgcmV0dXJuIHtcclxuICAgICAgcGxheWVyQm9hcmQsXHJcbiAgICAgIGdldENvbXB1dGVyQm9hcmQsXHJcbiAgICAgIGluaXQsXHJcbiAgICAgIHRha2VUdXJuLFxyXG4gICAgICBnZXRXaW5uZXIsXHJcbiAgICAgIHJlc2V0LFxyXG4gICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcclxuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xyXG5cclxuY29uc3QgR2FtZWJvYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gICBsZXQgX2JvYXJkID0gW107XHJcbiAgIGxldCBfc2hpcHMgPSB7XHJcbiAgICAgIHR5cGUxOiB7IHNoaXBzOiBbXSwgbGVuZ3RoOiA1LCBtYXg6IDEgfSxcclxuICAgICAgdHlwZTI6IHsgc2hpcHM6IFtdLCBsZW5ndGg6IDQsIG1heDogMiB9LFxyXG4gICAgICB0eXBlMzogeyBzaGlwczogW10sIGxlbmd0aDogMywgbWF4OiAzIH0sXHJcbiAgICAgIHR5cGU0OiB7IHNoaXBzOiBbXSwgbGVuZ3RoOiAyLCBtYXg6IDQgfSxcclxuICAgfTtcclxuXHJcbiAgIC8vIGNyZWF0ZSAxMCByb3dzIGFuZCAxMCBjZWxscyBmb3IgX2JvYXJkXHJcbiAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xyXG4gICAgICBfYm9hcmQucHVzaChbXSk7XHJcblxyXG4gICAgICBmb3IgKGxldCBjZWxsID0gMDsgY2VsbCA8IDEwOyBjZWxsKyspIHtcclxuICAgICAgICAgX2JvYXJkW3Jvd10ucHVzaChcIn5cIik7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgY29uc3QgZ2V0Qm9hcmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9ib2FyZCkpO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgZ2V0U2hpcHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBzaGlwc0Nsb25lID0ge307XHJcblxyXG4gICAgICBmb3IgKGxldCBrZXkgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIHNoaXBzQ2xvbmVba2V5XSA9IHt9O1xyXG4gICAgICAgICBzaGlwc0Nsb25lW2tleV0uc2hpcHMgPSBbXTtcclxuICAgICAgICAgc2hpcHNDbG9uZVtrZXldLmxlbmd0aCA9IF9zaGlwc1trZXldLmxlbmd0aDtcclxuICAgICAgICAgc2hpcHNDbG9uZVtrZXldLm1heCA9IF9zaGlwc1trZXldLm1heDtcclxuXHJcbiAgICAgICAgIF9zaGlwc1trZXldLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICAgICAgbGV0IGNsb25lID0gU2hpcChzaGlwLmdldExlbmd0aCgpLCBzaGlwLmdldENvb3JzKCkpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldEhpdHMoKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgIGNsb25lLmhpdCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzaGlwc0Nsb25lW2tleV0uc2hpcHMucHVzaChjbG9uZSk7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gc2hpcHNDbG9uZTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGdldEJvYXJkQW5kU2hpcHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBib2FyZENvcHkgPSB0aGlzLmdldEJvYXJkKCk7XHJcblxyXG4gICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFNoaXAgPSBfc2hpcHNbdHlwZV0uc2hpcHNbaV07XHJcbiAgICAgICAgICAgIGxldCBzaGlwQ29vcnMgPSBjdXJyZW50U2hpcC5nZXRDb29ycygpO1xyXG5cclxuICAgICAgICAgICAgc2hpcENvb3JzLmZvckVhY2goKGNvb3JzKSA9PiB7XHJcbiAgICAgICAgICAgICAgIGxldCBbcm93LCBjb2x1bW5dID0gY29vcnM7XHJcblxyXG4gICAgICAgICAgICAgICBpZiAoYm9hcmRDb3B5W3Jvd11bY29sdW1uXSA9PT0gXCJ+XCIpIHtcclxuICAgICAgICAgICAgICAgICAgYm9hcmRDb3B5W3Jvd11bY29sdW1uXSA9IFwic1wiO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBib2FyZENvcHk7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZXMgPSBbMCwgMF0sIGxlbmd0aCA9IDIsIGRpcmVjdGlvbikge1xyXG4gICAgICBpZiAoaXNOYU4oTnVtYmVyKGNvb3JkaW5hdGVzWzBdKSkgfHwgaXNOYU4oTnVtYmVyKGNvb3JkaW5hdGVzWzFdKSkpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29vcmRpbmF0ZXMgc2hvdWxkIGJlIG51bWJlcnNcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc05hTihOdW1iZXIobGVuZ3RoKSkgfHwgbGVuZ3RoID4gNSB8fCBsZW5ndGggPCAyKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxlbmd0aCBzaG91bGQgYmUgYSBudW1iZXIgYmV0d2VlbiAyIGFuZCA1XCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgc2hpcENvb3JkaW5hdGVzID0gW1suLi5jb29yZGluYXRlc11dO1xyXG5cclxuICAgICAgLy8gZ2VuZXJhdGUgY29vcmRpbmF0ZXMgdGhhdCBleHBhbmQgYmFzZWQgb24gbGVuZ3RoIGFuZCBkaXJlY3Rpb25cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgLy8gZXhwYW5kIGNvb3JkaW5hdGVzIHZlcnRpY2FsbHlcclxuICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ2ZXJcIikge1xyXG4gICAgICAgICAgICBsZXQgY29vcnNDb3B5ID0gWy4uLnNoaXBDb29yZGluYXRlc1tpXV07XHJcbiAgICAgICAgICAgIGNvb3JzQ29weVswXSsrO1xyXG4gICAgICAgICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChjb29yc0NvcHkpO1xyXG5cclxuICAgICAgICAgICAgLy8gZXhwYW5kIGNvb3JkaW5hdGVzIGhvcml6b250YWxseVxyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgY29vcnNDb3B5ID0gWy4uLnNoaXBDb29yZGluYXRlc1tpXV07XHJcbiAgICAgICAgICAgIGNvb3JzQ29weVsxXSsrO1xyXG4gICAgICAgICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChjb29yc0NvcHkpO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoZWNrIGlmIHNoaXBDb29yZGluYXRlcyBhcmUgdmFsaWRcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgbGV0IGN1cnJlbnRDb29yID0gc2hpcENvb3JkaW5hdGVzW2ldO1xyXG5cclxuICAgICAgICAgaWYgKGN1cnJlbnRDb29yWzBdID4gOSB8fCBjdXJyZW50Q29vclswXSA8IDApXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgZXhwYW5kcyB0byB3cm9uZyBjb29yZGluYXRlc1wiKTtcclxuICAgICAgICAgaWYgKGN1cnJlbnRDb29yWzFdID4gOSB8fCBjdXJyZW50Q29vclsxXSA8IDApXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgZXhwYW5kcyB0byB3cm9uZyBjb29yZGluYXRlc1wiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IG5ld1NoaXAgPSBTaGlwKGxlbmd0aCwgc2hpcENvb3JkaW5hdGVzKTtcclxuXHJcbiAgICAgIC8vIGNoZWNrIGlmIG5ld1NoaXAgY2FuIGJlIGFkZGVkIHRvIF9zaGlwc1xyXG4gICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICBpZiAoX3NoaXBzW3R5cGVdLmxlbmd0aCA9PT0gbmV3U2hpcC5nZXRMZW5ndGgoKSkge1xyXG4gICAgICAgICAgICBpZiAoX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aCA8IF9zaGlwc1t0eXBlXS5tYXgpIHtcclxuICAgICAgICAgICAgICAgLy8gY2hlY2sgZXZlcnkgc2hpcCdzIGNvb3JkaW5hdGVzIHRvIHNlZSBpZiBuZXdTaGlwIGRvZXMgbm90IGhhdmVcclxuICAgICAgICAgICAgICAgLy8gdGhlIHNhbWUgY29vcmRpbmF0ZXMgb2YgYW5vdGhlciBzaGlwXHJcbiAgICAgICAgICAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgICAgICAgICAgIF9zaGlwc1t0eXBlXS5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHNoaXAuZ2V0Q29vcnMoKS5mb3JFYWNoKChzaGlwQ29vcnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2hpcC5nZXRDb29ycygpLmZvckVhY2goKG5ld1NoaXBDb29ycykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBDb29yc1swXSA9PT0gbmV3U2hpcENvb3JzWzBdICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBDb29yc1sxXSA9PT0gbmV3U2hpcENvb3JzWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBuZXcgc2hpcCBjYW5ub3QgYmUgcGxhY2Ugb3ZlciBhbm90aGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICBfc2hpcHNbdHlwZV0uc2hpcHMucHVzaChuZXdTaGlwKTtcclxuICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIGxldCBlcnJvck1zZyA9IGBFeGNlZWRlZCBudW1iZXIgb2Ygc2hpcHM6IG1heGltdW4gbnVtYmVyIGZvciAke2xlbmd0aH0gbGVuZ3RoIHNoaXBzIGlzICR7X3NoaXBzW3R5cGVdLm1heH1gO1xyXG4gICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICB9O1xyXG5cclxuICAgY29uc3QgcmVtb3ZlU2hpcCA9IGZ1bmN0aW9uIChyb3cgPSAwLCBjZWxsID0gMCkge1xyXG4gICAgICBsZXQgZmlsdGVyZWRTaGlwcztcclxuICAgICAgbGV0IGNvb3JzO1xyXG5cclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgLy8gc2VhcmNoIGFuZCBmaWx0ZXIgb3V0IHNoaXAgdGhhdCBoYXMgXCJyb3dcIiBhbmQgXCJjZWxsXCIgYXMgY29vcmRpbmF0ZXNcclxuICAgICAgICAgc2hpcHNMb29wOiBmb3IgKGxldCBpID0gMDsgaSA8IF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFNoaXAgPSBfc2hpcHNbdHlwZV0uc2hpcHNbaV07XHJcbiAgICAgICAgICAgIGxldCBzaGlwQ29vcnMgPSBjdXJyZW50U2hpcC5nZXRDb29ycygpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaGlwQ29vcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgaWYgKHNoaXBDb29yc1tqXVswXSA9PT0gcm93ICYmIHNoaXBDb29yc1tqXVsxXSA9PT0gY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICBmaWx0ZXJlZFNoaXBzID0gX3NoaXBzW3R5cGVdLnNoaXBzLmZpbHRlcihcclxuICAgICAgICAgICAgICAgICAgICAgKHNoaXApID0+IHNoaXAgIT09IGN1cnJlbnRTaGlwXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIGNvb3JzID0gc2hpcENvb3JzO1xyXG4gICAgICAgICAgICAgICAgICBicmVhayBzaGlwc0xvb3A7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgICAgIC8vIHVwZGF0ZSBfc2hpcHNbdHlwZV0uc2hpcHMgYXJyYXlcclxuICAgICAgICAgaWYgKGZpbHRlcmVkU2hpcHMpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdE1zZyA9IFwiUmVtb3ZlZCBzaGlwIHdpdGggdGhlIGZvbGxvd2luZyBjb29yZGluYXRlczogXCI7XHJcblxyXG4gICAgICAgICAgICByZXN1bHRNc2cgKz0gY29vcnNcclxuICAgICAgICAgICAgICAgLnJlZHVjZShcclxuICAgICAgICAgICAgICAgICAgKGFjYywgY3VycmVudCkgPT4gYWNjICsgYFske2N1cnJlbnRbMF19LCAke2N1cnJlbnRbMV19XSwgYCxcclxuICAgICAgICAgICAgICAgICAgXCJcIlxyXG4gICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgIC5zbGljZSgwLCAtMik7XHJcblxyXG4gICAgICAgICAgICBfc2hpcHNbdHlwZV0uc2hpcHMgPSBmaWx0ZXJlZFNoaXBzO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0TXNnO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBgVGhlcmUgaXMgbm8gc2hpcCBpbiBbJHtyb3d9LCR7Y2VsbH1dIGNvb3JkaW5hdGVzYDtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGlzQXJteUNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICBpZiAoX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aCA8IF9zaGlwc1t0eXBlXS5tYXgpIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCByZWNlaXZlQXR0YWNrID0gZnVuY3Rpb24gKHJvdyA9IDAsIGNlbGwgPSAwKSB7XHJcbiAgICAgIGxldCBzeW1ib2wgPSBcIm1cIjtcclxuXHJcbiAgICAgIGlmIChyb3cgPiA5IHx8IHJvdyA8IDAgfHwgY2VsbCA+IDkgfHwgY2VsbCA8IDApIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICBgUHJvdmlkZWQgY29vcmRpbmF0ZXMgYXJlIG5vdCB2YWxpZDogWyR7cm93fSwke2NlbGx9XWBcclxuICAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9ib2FyZFtyb3ddW2NlbGxdICE9PSBcIn5cIikge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgIGBZb3UgYWxyZWFkeSBhdHRhY2tlZCB0aGUgZm9sbG93aW5nIGNvb3JkaW5hdGVzOiBbJHtyb3d9LCR7Y2VsbH1dYFxyXG4gICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjaGVjayBpZiBhbnkgc2hpcCBoYXMgXCJyb3dcIiBhbmQgXCJjZWxsXCIgYXMgY29vcmRpbmF0ZXMgYW5kIGhpdCBpdFxyXG4gICAgICB0eXBlTG9vcDogZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfc2hpcHNbdHlwZV0uc2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTaGlwID0gX3NoaXBzW3R5cGVdLnNoaXBzW2ldO1xyXG4gICAgICAgICAgICBsZXQgc2hpcENvb3JzID0gY3VycmVudFNoaXAuZ2V0Q29vcnMoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2hpcENvb3JzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgIGlmIChzaGlwQ29vcnNbal1bMF0gPT09IHJvdyAmJiBzaGlwQ29vcnNbal1bMV0gPT09IGNlbGwpIHtcclxuICAgICAgICAgICAgICAgICAgY3VycmVudFNoaXAuaGl0KCk7XHJcbiAgICAgICAgICAgICAgICAgIHN5bWJvbCA9IFwiaFwiO1xyXG4gICAgICAgICAgICAgICAgICBicmVhayB0eXBlTG9vcDtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgX2JvYXJkW3Jvd11bY2VsbF0gPSBzeW1ib2w7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgYWxsU2hpcHNTdW5rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIV9zaGlwc1t0eXBlXS5zaGlwc1tpXS5pc1N1bmsoKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICB9O1xyXG5cclxuICAgcmV0dXJuIHtcclxuICAgICAgZ2V0Qm9hcmQsXHJcbiAgICAgIGdldFNoaXBzLFxyXG4gICAgICBnZXRCb2FyZEFuZFNoaXBzLFxyXG4gICAgICBwbGFjZVNoaXAsXHJcbiAgICAgIHJlbW92ZVNoaXAsXHJcbiAgICAgIGlzQXJteUNvbXBsZXRlLFxyXG4gICAgICByZWNlaXZlQXR0YWNrLFxyXG4gICAgICBhbGxTaGlwc1N1bmssXHJcbiAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XHJcbiIsImltcG9ydCBHYW1lIGZyb20gXCIuL2dhbWUuanNcIjtcclxuaW1wb3J0IFwiLi9zY3NzL3N0eWxlcy5zY3NzXCI7XHJcblxyXG5jb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyQm9hcmRcIik7XHJcbmNvbnN0IGNwdUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcHVCb2FyZFwiKTtcclxuY29uc3QgYnV0dG9uc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9ucy1jb250YWluZXJcIik7XHJcbmNvbnN0IHNoaXBUYWJsZUNvdW50ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBsYWNlZC1jb3VudGVyXCIpO1xyXG5jb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yLW1lc3NhZ2VcIik7XHJcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1idXR0b25cIik7XHJcblxyXG5jb25zdCBwbGF5ZXJCb2FyZENlbGxzID0gW107XHJcbmNvbnN0IGNwdUJvYXJkQ2VsbHMgPSBbXTtcclxuXHJcbmxldCBsZW5ndGggPSBudWxsO1xyXG5sZXQgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XHJcbmxldCBzaGlwc0luZm8gPSBudWxsO1xyXG5sZXQgcHJldmlvdXNDbGlja2VkQnRuID0gbnVsbDtcclxubGV0IGN1cnJlbnRDZWxsID0gbnVsbDtcclxubGV0IGNlbGxzVG9IaWdobGlnaHQgPSBbXTtcclxuXHJcbi8vIGdlbmVyYXRlIHBsYXllciBhbmQgY3B1IGNlbGxzXHJcbmZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xyXG4gICBwbGF5ZXJCb2FyZENlbGxzLnB1c2goW10pO1xyXG4gICBjcHVCb2FyZENlbGxzLnB1c2goW10pO1xyXG5cclxuICAgZm9yIChsZXQgY2VsbCA9IDA7IGNlbGwgPCAxMDsgY2VsbCsrKSB7XHJcbiAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgICAgZGl2LmNsYXNzTmFtZSA9IFwiYm9hcmRfX2NlbGxcIjtcclxuICAgICAgZGl2LmRhdGFzZXQucm93ID0gcm93O1xyXG4gICAgICBkaXYuZGF0YXNldC5jZWxsID0gY2VsbDtcclxuICAgICAgZGl2LmRhdGFzZXQuZmlsbGVkID0gXCJmYWxzZVwiO1xyXG4gICAgICBwbGF5ZXJCb2FyZC5hcHBlbmQoZGl2KTtcclxuICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddLnB1c2goZGl2KTtcclxuXHJcbiAgICAgIGxldCBjbG9uZSA9IGRpdi5jbG9uZU5vZGUoKTtcclxuICAgICAgY3B1Qm9hcmQuYXBwZW5kKGNsb25lKTtcclxuICAgICAgY3B1Qm9hcmRDZWxsc1tyb3ddLnB1c2goY2xvbmUpO1xyXG4gICB9XHJcbn1cclxuXHJcbmJ1dHRvbnNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrZWRCdXR0b25zKTtcclxucGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBzaG93UHJldmlld0hhbmRsZXIpO1xyXG5wbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgcmVtb3ZlU2hpcFByZXZpZXcpO1xyXG5wbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxhY2VOZXdTaGlwKTtcclxucGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIHJlbW92ZVNoaXApO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgcm90YXRlU2hpcCk7XHJcbnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBpbml0aWFsaXplR2FtZSk7XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVDbGlja2VkQnV0dG9ucyhlKSB7XHJcbiAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcbiAgIC8vIGhhbmRsZSBidXR0b25zIHRoYXQgY2hhbmdlIFwibGVuZ3RoXCIgdmFyaWFibGVcclxuICAgaWYgKHRhcmdldC5kYXRhc2V0Lmxlbmd0aCkge1xyXG4gICAgICBsZW5ndGggPSArdGFyZ2V0LmRhdGFzZXQubGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKHByZXZpb3VzQ2xpY2tlZEJ0bikge1xyXG4gICAgICAgICBwcmV2aW91c0NsaWNrZWRCdG4uY2xhc3NMaXN0LnJlbW92ZShcImJ1dHRvbi0taGlnaGxpZ2h0ZWRcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLS1oaWdobGlnaHRlZFwiKTtcclxuICAgICAgcHJldmlvdXNDbGlja2VkQnRuID0gdGFyZ2V0O1xyXG5cclxuICAgICAgLy8gaGFuZGxlIHJvdGF0aW9uLWJ1dHRvblxyXG4gICB9IGVsc2UgaWYgKHRhcmdldC5pZCA9PT0gXCJyb3RhdGlvbi1idXR0dG9uXCIpIHtcclxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgICAgZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBkaXJlY3Rpb24gPSBcImhvcml6b250YWxcIjtcclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dQcmV2aWV3SGFuZGxlcihlKSB7XHJcbiAgIHNob3dTaGlwUHJldmlldyhlLnRhcmdldCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dTaGlwUHJldmlldyhub2RlKSB7XHJcbiAgIGlmIChsZW5ndGggJiYgbm9kZS5kYXRhc2V0LnJvdyAmJiBub2RlLmRhdGFzZXQuY2VsbCkge1xyXG4gICAgICBsZXQgeyByb3csIGNlbGwgfSA9IG5vZGUuZGF0YXNldDtcclxuXHJcbiAgICAgIGN1cnJlbnRDZWxsID0gbm9kZTtcclxuICAgICAgcm93ID0gK3JvdztcclxuICAgICAgY2VsbCA9ICtjZWxsO1xyXG5cclxuICAgICAgLy8gcG9wdWxhdGUgXCJjZWxsc1RvSGlnaGxpZ2h0XCIgYXJyYXlcclxuICAgICAgbGVuZ3RoTG9vcDogZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICBpZiAoIXBsYXllckJvYXJkQ2VsbHNbcm93XSB8fCAhcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdKSB7XHJcbiAgICAgICAgICAgIGJyZWFrIGxlbmd0aExvb3A7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGNlbGxzVG9IaWdobGlnaHQucHVzaChwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0pO1xyXG4gICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICAgICAgICBjZWxsKys7XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJvdysrO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHBhaW50IHByZXZpZXcgcmVkIGlmIHNoaXAgbGVuZ3RoIGRvZXMgbm90IGZpdFxyXG4gICAgICBpZiAoY2VsbHNUb0hpZ2hsaWdodC5sZW5ndGggPCBsZW5ndGgpIHtcclxuICAgICAgICAgY2VsbHNUb0hpZ2hsaWdodC5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjYjUxNzE3XCI7XHJcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuYm9yZGVyQ29sb3IgPSBcIiNiNTE3MTdcIjtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAvLyBwYWludCBwcmV2aWV3IGVpdGhlciBncmVlbiBvciByZWQgYmFzZWQgb24gZmlsbGVkIGF0dHJpYnV0ZSB2YWx1ZVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBjZWxsc1RvSGlnaGxpZ2h0LmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNlbGwuZGF0YXNldC5maWxsZWQgPT09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzFjYjUxN1wiO1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJvcmRlckNvbG9yID0gXCIjMWNiNTE3XCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjYjUxNzE3XCI7XHJcbiAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYm9yZGVyQ29sb3IgPSBcIiNiNTE3MTdcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVNoaXBQcmV2aWV3KCkge1xyXG4gICBjZWxsc1RvSGlnaGxpZ2h0LmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xyXG4gICAgICBjZWxsLnN0eWxlLmNvbG9yID0gXCJcIjtcclxuICAgICAgY2VsbC5zdHlsZS5ib3JkZXJDb2xvciA9IFwiXCI7XHJcbiAgIH0pO1xyXG4gICBjZWxsc1RvSGlnaGxpZ2h0ID0gW107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYWNlTmV3U2hpcChlKSB7XHJcbiAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcbiAgIGlmIChsZW5ndGggJiYgdGFyZ2V0LmRhdGFzZXQucm93ICYmIHRhcmdldC5kYXRhc2V0LmNlbGwpIHtcclxuICAgICAgc2hpcHNJbmZvID0gR2FtZS5wbGF5ZXJCb2FyZC5nZXRTaGlwcygpO1xyXG4gICAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlwiOyAvLyBjbGVhciBwcmV2aW91cyBlcnJvciBtZXNzYWdlXHJcblxyXG4gICAgICBmb3IgKGxldCB0eXBlIGluIHNoaXBzSW5mbykge1xyXG4gICAgICAgICAvLyBpZGVudGlmeSB3aGF0IHR5cGUgb2Ygc2hpcCB0aGUgdXNlciBpcyBnb2luZyB0byBwbGFjZVxyXG4gICAgICAgICBpZiAoc2hpcHNJbmZvW3R5cGVdLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmIChzaGlwc0luZm9bdHlwZV0uc2hpcHMubGVuZ3RoIDwgc2hpcHNJbmZvW3R5cGVdLm1heCkge1xyXG4gICAgICAgICAgICAgICAvLyBwbGFjZSBuZXcgc2hpcFxyXG4gICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICBHYW1lLnBsYXllckJvYXJkLnBsYWNlU2hpcChcclxuICAgICAgICAgICAgICAgICAgICAgWyt0YXJnZXQuZGF0YXNldC5yb3csICt0YXJnZXQuZGF0YXNldC5jZWxsXSxcclxuICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24uc2xpY2UoMCwgMylcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgc2hpcHNJbmZvID0gR2FtZS5wbGF5ZXJCb2FyZC5nZXRTaGlwcygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgLy8gZGlzYWJsZSBzaGlwIGJ1dHRvbiB3aGVuIGdldHRpbmcgdG8gbWF4aW11bSBudW1iZXIgb2Ygc2hpcHMgcGxhY2VkXHJcbiAgICAgICAgICAgICAgICAgIGlmIChzaGlwc0luZm9bdHlwZV0uc2hpcHMubGVuZ3RoID09PSBzaGlwc0luZm9bdHlwZV0ubWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzQ2xpY2tlZEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzQ2xpY2tlZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiYnV0dG9uLS1oaWdobGlnaHRlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgdXBkYXRlUGxheWVyQm9hcmQoKTtcclxuICAgICAgICAgICAgICAgICAgcmVtb3ZlU2hpcFByZXZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgdXBkYXRlU2hpcHNUYWJsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKEdhbWUucGxheWVyQm9hcmQuaXNBcm15Q29tcGxldGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICBzdGFydEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICBzdGFydEJ0bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vIHByaW50IGVycm9yIG1lc3NhZ2VzXHJcbiAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICBlLm1lc3NhZ2UgPT09IFwiU2hpcCBleHBhbmRzIHRvIHdyb25nIGNvb3JkaW5hdGVzXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgZS5tZXNzYWdlID09PSBcIkEgbmV3IHNoaXAgY2Fubm90IGJlIHBsYWNlIG92ZXIgYW5vdGhlclwiXHJcbiAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIkVycm9yOiBcIiArIGUubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJFcnJvcjogQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgdHJ5aW5nIHRvIHBsYWNlIGEgbmV3IHNoaXBcIjtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUGxheWVyQm9hcmQoKSB7XHJcbiAgIGxldCBib2FyZCA9IEdhbWUucGxheWVyQm9hcmQuZ2V0Qm9hcmRBbmRTaGlwcygpO1xyXG5cclxuICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgYm9hcmQubGVuZ3RoOyByb3crKykge1xyXG4gICAgICBmb3IgKGxldCBjZWxsID0gMDsgY2VsbCA8IGJvYXJkW3Jvd10ubGVuZ3RoOyBjZWxsKyspIHtcclxuICAgICAgICAgaWYgKGJvYXJkW3Jvd11bY2VsbF0uc2VhcmNoKC9bc2htXS8pID49IDApIHtcclxuICAgICAgICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdLnRleHRDb250ZW50ID0gYm9hcmRbcm93XVtjZWxsXTtcclxuICAgICAgICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdLmRhdGFzZXQuZmlsbGVkID0gXCJ0cnVlXCI7XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXllckJvYXJkQ2VsbHNbcm93XVtjZWxsXS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHBsYXllckJvYXJkQ2VsbHNbcm93XVtjZWxsXS5kYXRhc2V0LmZpbGxlZCA9IFwiZmFsc2VcIjtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlU2hpcHNUYWJsZSgpIHtcclxuICAgbGV0IGluZGV4ID0gMDtcclxuXHJcbiAgIGZvciAobGV0IHR5cGUgaW4gc2hpcHNJbmZvKSB7XHJcbiAgICAgIHNoaXBUYWJsZUNvdW50ZXJzW2luZGV4XS50ZXh0Q29udGVudCA9IHNoaXBzSW5mb1t0eXBlXS5zaGlwcy5sZW5ndGg7XHJcbiAgICAgIGluZGV4Kys7XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU2hpcChlKSB7XHJcbiAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcbiAgIGlmIChcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQucm93ICYmXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LmNlbGwgJiZcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQuZmlsbGVkICYmXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LmZpbGxlZCA9PT0gXCJ0cnVlXCJcclxuICAgKSB7XHJcbiAgICAgIGxldCBtc2cgPSBHYW1lLnBsYXllckJvYXJkLnJlbW92ZVNoaXAoXHJcbiAgICAgICAgICt0YXJnZXQuZGF0YXNldC5yb3csXHJcbiAgICAgICAgICt0YXJnZXQuZGF0YXNldC5jZWxsXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAobXNnLmluY2x1ZGVzKFwiUmVtb3ZlZCBzaGlwIHdpdGggdGhlIGZvbGxvd2luZyBjb29yZGluYXRlczpcIikpIHtcclxuICAgICAgICAgbGV0IHNoaXBCdXR0b25zID0gYnV0dG9uc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvblwiKTtcclxuICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgIHNoaXBzSW5mbyA9IEdhbWUucGxheWVyQm9hcmQuZ2V0U2hpcHMoKTtcclxuXHJcbiAgICAgICAgIC8vIGVuYWJsZSBiYWNrIGRpc2FibGVkIGJ1dHRvbnNcclxuICAgICAgICAgZm9yIChsZXQgdHlwZSBpbiBzaGlwc0luZm8pIHtcclxuICAgICAgICAgICAgaWYgKHNoaXBzSW5mb1t0eXBlXS5zaGlwcy5sZW5ndGggPCBzaGlwc0luZm9bdHlwZV0ubWF4KSB7XHJcbiAgICAgICAgICAgICAgIHNoaXBCdXR0b25zW2luZGV4XS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBpZiAoIUdhbWUucGxheWVyQm9hcmQuaXNBcm15Q29tcGxldGUoKSkge1xyXG4gICAgICAgICAgICBzdGFydEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHN0YXJ0QnRuLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICB1cGRhdGVQbGF5ZXJCb2FyZCgpO1xyXG4gICAgICAgICBzaG93U2hpcFByZXZpZXcoY3VycmVudENlbGwpO1xyXG4gICAgICAgICB1cGRhdGVTaGlwc1RhYmxlKCk7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByb3RhdGVTaGlwKGUpIHtcclxuICAgaWYgKGUua2V5ID09PSBcInFcIiB8fCBlLmtleSA9PT0gXCJRXCIpIHtcclxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgICAgZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBkaXJlY3Rpb24gPSBcImhvcml6b250YWxcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmVtb3ZlU2hpcFByZXZpZXcoKTtcclxuICAgICAgc2hvd1NoaXBQcmV2aWV3KGN1cnJlbnRDZWxsKTtcclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplR2FtZSgpIHtcclxuICAgaWYgKEdhbWUuaW5pdCgpKSB7XHJcbiAgICAgIHBsYXllckJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgc2hvd1ByZXZpZXdIYW5kbGVyKTtcclxuICAgICAgcGxheWVyQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIHJlbW92ZVNoaXBQcmV2aWV3KTtcclxuICAgICAgcGxheWVyQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBsYWNlTmV3U2hpcCk7XHJcbiAgICAgIHBsYXllckJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCByZW1vdmVTaGlwKTtcclxuICAgICAgc3RhcnRCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICBidXR0b25zQ29udGFpbmVyLnBhcmVudEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cclxuICAgICAgY3B1Qm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGF0dGFja0NwdUJvYXJkKTtcclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhdHRhY2tDcHVCb2FyZChlKSB7XHJcbiAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcbiAgIGlmIChcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQuZmlsbGVkID09PSBcImZhbHNlXCIgJiZcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQucm93ICYmXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LmNlbGxcclxuICAgKSB7XHJcbiAgICAgIGxldCB7IHJvdywgY2VsbCB9ID0gdGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgIGxldCB0dXJuUmVzdWx0ID0gR2FtZS50YWtlVHVybigrcm93LCArY2VsbCk7XHJcblxyXG4gICAgICB1cGRhdGVQbGF5ZXJCb2FyZCgpO1xyXG4gICAgICB1cGRhdGVDcHVCb2FyZCgpO1xyXG5cclxuICAgICAgLy8gZGVjbGFyZSBhIHdpbm5lciBhbmQgcHJpbnQgYSByZXNldCBidXR0b25cclxuICAgICAgaWYgKFxyXG4gICAgICAgICB0dXJuUmVzdWx0LnNlYXJjaCAmJlxyXG4gICAgICAgICB0dXJuUmVzdWx0LnNlYXJjaCgvUGxheWVyfENvbXB1dGVyIHdvbiB0aGUgbWF0Y2gvZ2kpID49IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICBsZXQgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHJcbiAgICAgICAgIGRpdi5jbGFzc05hbWUgPSBcInJlc2V0LWNvbnRhaW5lclwiO1xyXG4gICAgICAgICBwLnRleHRDb250ZW50ID0gdHVyblJlc3VsdDtcclxuICAgICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9IFwiYnV0dG9uXCI7XHJcbiAgICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUmVzZXQgR2FtZVwiO1xyXG4gICAgICAgICBkaXYuYXBwZW5kKHAsIGJ1dHRvbik7XHJcbiAgICAgICAgIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQuYWZ0ZXIoZGl2KTtcclxuXHJcbiAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVzZXRHYW1lKTtcclxuICAgICAgICAgY3B1Qm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGF0dGFja0NwdUJvYXJkKTtcclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUNwdUJvYXJkKCkge1xyXG4gICBsZXQgYm9hcmQgPSBHYW1lLmdldENvbXB1dGVyQm9hcmQoKTtcclxuXHJcbiAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGJvYXJkLmxlbmd0aDsgcm93KyspIHtcclxuICAgICAgZm9yIChsZXQgY2VsbCA9IDA7IGNlbGwgPCBib2FyZFtyb3ddLmxlbmd0aDsgY2VsbCsrKSB7XHJcbiAgICAgICAgIGlmIChib2FyZFtyb3ddW2NlbGxdLnNlYXJjaCgvW2htXS8pID49IDApIHtcclxuICAgICAgICAgICAgY3B1Qm9hcmRDZWxsc1tyb3ddW2NlbGxdLnRleHRDb250ZW50ID0gYm9hcmRbcm93XVtjZWxsXTtcclxuICAgICAgICAgICAgY3B1Qm9hcmRDZWxsc1tyb3ddW2NlbGxdLmRhdGFzZXQuZmlsbGVkID0gXCJ0cnVlXCI7XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNwdUJvYXJkQ2VsbHNbcm93XVtjZWxsXS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGNwdUJvYXJkQ2VsbHNbcm93XVtjZWxsXS5kYXRhc2V0LmZpbGxlZCA9IFwiZmFsc2VcIjtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVzZXRHYW1lKCkge1xyXG4gICBHYW1lLnJlc2V0KCk7XHJcblxyXG4gICBkb2N1bWVudC5ib2R5LmZpcnN0RWxlbWVudENoaWxkLm5leHRFbGVtZW50U2libGluZy5yZW1vdmUoKTtcclxuICAgdXBkYXRlQ3B1Qm9hcmQoKTtcclxuICAgY3B1Qm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGF0dGFja0NwdUJvYXJkKTtcclxuICAgcGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBzaG93UHJldmlld0hhbmRsZXIpO1xyXG4gICBwbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgcmVtb3ZlU2hpcFByZXZpZXcpO1xyXG4gICBwbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxhY2VOZXdTaGlwKTtcclxuICAgcGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIHJlbW92ZVNoaXApO1xyXG4gICB1cGRhdGVQbGF5ZXJCb2FyZCgpO1xyXG4gICBidXR0b25zQ29udGFpbmVyLnBhcmVudEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgWy4uLmJ1dHRvbnNDb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5idXR0b25cIildLmZvckVhY2goXHJcbiAgICAgIChidXR0b24pID0+IChidXR0b24uZGlzYWJsZWQgPSBmYWxzZSlcclxuICAgKTtcclxuICAgWy4uLnNoaXBUYWJsZUNvdW50ZXJzXS5mb3JFYWNoKChjb3VudGVyKSA9PiAoY291bnRlci50ZXh0Q29udGVudCA9IFwiMFwiKSk7XHJcbiAgIHN0YXJ0QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgc3RhcnRCdG4uc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbn1cclxuIiwiY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChsZW5ndGgsIGNvb3JkaW5hdGVzKSB7XHJcbiAgIGxldCBfY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcyB8fCBudWxsO1xyXG4gICBsZXQgX2xlbmd0aCA9IGxlbmd0aCB8fCAyO1xyXG4gICBsZXQgX2hpdHNDb3VudGVyID0gMDtcclxuXHJcbiAgIGNvbnN0IGdldENvb3JzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShfY29vcmRpbmF0ZXMpKTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGdldExlbmd0aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF9sZW5ndGg7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBnZXRIaXRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX2hpdHNDb3VudGVyO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBfaGl0c0NvdW50ZXIrKztcclxuICAgICAgcmV0dXJuIF9oaXRzQ291bnRlcjtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF9oaXRzQ291bnRlciA9PT0gbGVuZ3RoO1xyXG4gICB9O1xyXG5cclxuICAgcmV0dXJuIHtcclxuICAgICAgZ2V0Q29vcnMsXHJcbiAgICAgIGdldExlbmd0aCxcclxuICAgICAgZ2V0SGl0cyxcclxuICAgICAgaGl0LFxyXG4gICAgICBpc1N1bmssXHJcbiAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCxcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IDA7XFxuICBmb250LXNpemU6IDEwMCU7XFxuICBmb250OiBpbmhlcml0O1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSxcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gIHRleHQtc2hhZG93OiAwIDAgMTBweCAjMWNiNTE3O1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiAjMWNiNTE3O1xcbiAgbWFyZ2luOiAxNnB4O1xcbn1cXG5cXG5vbCwgdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuYmxvY2txdW90ZSwgcSB7XFxuICBxdW90ZXM6IG5vbmU7XFxufVxcblxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgY29udGVudDogbm9uZTtcXG59XFxuXFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG5wIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxufVxcblxcbi5pbnN0cnVjdGlvbnMge1xcbiAgcGFkZGluZzogMXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBtYXJnaW4tdG9wOiAzcmVtO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgxIHtcXG4gIGZvbnQtc2l6ZTogMS40cmVtO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgyIHtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgxLCAuaW5zdHJ1Y3Rpb25zIGgyIHtcXG4gIG1hcmdpbjogMXJlbSAwO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgxOmZpcnN0LWNoaWxkLCAuaW5zdHJ1Y3Rpb25zIGgyOmZpcnN0LWNoaWxkIHtcXG4gIG1hcmdpbi10b3A6IDA7XFxufVxcbi5pbnN0cnVjdGlvbnMgbGkge1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuLmluc3RydWN0aW9ucyBsaTpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLmJvYXJkLXNlY3Rpb24ge1xcbiAgbWFyZ2luLWJvdHRvbTogM3JlbTtcXG59XFxuLmJvYXJkLXNlY3Rpb24gPiBoMSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxufVxcblxcbi5ib2FyZCB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4IGF1dG87XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiA1cHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG4gIGdyaWQtY29sdW1uOiAyO1xcbiAgZ3JpZC1yb3c6IDE7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlci10b3A6IG5vbmU7XFxuICBib3JkZXItcmlnaHQ6IG5vbmU7XFxuICBib3JkZXItbGVmdDogbm9uZTtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjFcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMlxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgzKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIzXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDQpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjRcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg2KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI2XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDcpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjdcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiOFxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg5KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI5XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEwKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIxMFxcXCI7XFxufVxcblxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiA1cHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHg7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG4gIGdyaWQtY29sdW1uOiAxO1xcbiAgZ3JpZC1yb3c6IDI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGwge1xcbiAgYm9yZGVyLXRvcDogbm9uZTtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICBib3JkZXItbGVmdDogbm9uZTtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiYVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImJcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgzKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJjXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZFxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDUpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImVcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg2KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJmXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZ1xcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDgpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImhcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg5KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJpXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMTApOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImpcXFwiO1xcbn1cXG5cXG4uYm9hcmRfX2NlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZF9fYm9hcmQge1xcbiAgZ3JpZC1yb3c6IDI7XFxuICBtYXJnaW4tbGVmdDogMTBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDVweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xcbn1cXG4uYm9hcmRfX2JvYXJkIC5ib2FyZF9fY2VsbDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWNiNTE3O1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4jZXJyb3ItbWVzc2FnZSB7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBncmlkLWNvbHVtbjogMS8tMTtcXG4gIG1hcmdpbi10b3A6IDFyZW07XFxuICBtYXJnaW4tbGVmdDogMC41cmVtO1xcbn1cXG5cXG4ucGxheWVyLWJ1dHRvbnMgdWwge1xcbiAgbWFyZ2luOiAycmVtIDA7XFxufVxcbi5wbGF5ZXItYnV0dG9ucyB1bCBsaSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XFxufVxcblxcbi5zaGlwcy10YWJsZSB7XFxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xcbn1cXG4uc2hpcHMtdGFibGUgdGFibGUge1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG59XFxuLnNoaXBzLXRhYmxlIHRkLCAuc2hpcHMtdGFibGUgdGgge1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG59XFxuXFxuI3N0YXJ0LWJ1dHRvbiB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbi5yZXNldC1jb250YWluZXIge1xcbiAgZm9udC1zaXplOiAxLCA1cmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luOiAzcmVtIDA7XFxufVxcbi5yZXNldC1jb250YWluZXIgcCB7XFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG5cXG4uYnV0dG9uIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggIzFjYjUxNztcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6ICMxY2I1MTc7XFxuICBwYWRkaW5nOiAwLjVyZW0gMC44cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWNiNTE3O1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG4uYnV0dG9uLS1oaWdobGlnaHRlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWNiNTE3O1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG4uYnV0dG9uOmRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDAuNDtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA4MDBweCkge1xcbiAgLnBsYXllci1ib2FyZCB7XFxuICAgIG1heC13aWR0aDogMTIwMHB4O1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgY29sdW1uLWdhcDogMXJlbTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gIH1cXG4gIC5wbGF5ZXItYm9hcmQgaDEge1xcbiAgICBncmlkLWNvbHVtbjogMS8tMTtcXG4gICAgZ3JpZC1yb3c6IDE7XFxuICB9XFxuICAucGxheWVyLWJvYXJkIC5ib2FyZCB7XFxuICAgIGdyaWQtY29sdW1uOiAyLzM7XFxuICAgIGdyaWQtcm93OiAyO1xcbiAgfVxcbiAgLnBsYXllci1ib2FyZCAucGxheWVyLWJ1dHRvbnMge1xcbiAgICBncmlkLWNvbHVtbjogMy80O1xcbiAgICBncmlkLXJvdzogMjtcXG4gIH1cXG5cXG4gIC5wbGF5ZXItYnV0dG9ucyB1bCB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXG4gIH1cXG4gIC5wbGF5ZXItYnV0dG9ucyB1bCBsaSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgfVxcbiAgLnBsYXllci1idXR0b25zIC5idXR0b24ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICB9XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTEwMHB4KSB7XFxuICAuaW5zdHJ1Y3Rpb25zIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBtYXgtd2lkdGg6IDI4MHB4O1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJvdHRvbTogMTZweDtcXG4gICAgbGVmdDogMTZweDtcXG4gIH1cXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3Njc3MvX3Jlc2V0LnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3N0eWxlcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fdmFyaWFibGVzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19pbnN0cnVjdGlvbnMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX2JvYXJkLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19idXR0b25zLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19tZWRpYS1xdWVyaWVzLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztDQUFBO0FBTUE7Ozs7Ozs7Ozs7Ozs7RUFhQyxTQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLHdCQUFBO0FDREQ7O0FER0EsZ0RBQUE7QUFDQTs7RUFFQyxjQUFBO0FDQUQ7O0FERUE7RUFDQyxzQkFBQTtFQUNFLDZCQUFBO0VBQ0YsY0FBQTtFQUNFLHVCQUFBO0VBQ0EsY0VwQ0s7RUZxQ1AsWUFBQTtBQ0NEOztBRENBO0VBQ0MsZ0JBQUE7QUNFRDs7QURBQTtFQUNDLFlBQUE7QUNHRDs7QUREQTs7RUFFQyxXQUFBO0VBQ0EsYUFBQTtBQ0lEOztBREZBO0VBQ0MseUJBQUE7RUFDQSxpQkFBQTtBQ0tEOztBREhBO0VBQ0MsZ0JBQUE7QUNNRDs7QUUzREE7RUFDRyxhQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtBRjhESDtBRTdERztFQUNHLGlCQUFBO0FGK0ROO0FFN0RHO0VBQ0csaUJBQUE7QUYrRE47QUU3REc7RUFDRyxjQUFBO0FGK0ROO0FFN0RHO0VBQ0csYUFBQTtBRitETjtBRTdERztFQUNHLG1CQUFBO0FGK0ROO0FFOURNO0VBQ0csU0FBQTtBRmdFVDs7QUdoRkE7RUFDRyxtQkFBQTtBSG1GSDtBR2xGRztFQUNHLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxpQkFBQTtBSG9GTjs7QUdqRkE7RUFDRyxlQUFBO0VBQ0EsYUFBQTtFQUNBLGdDQUFBO0VBQ0EsdUJBQUE7QUhvRkg7O0FHbEZBO0VBQ0csYUFBQTtFQUNBLFFBQUE7RUFDQSx1Q0FBQTtFQUNBLG9CQXBCUztFQXFCVCxjQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUhxRkg7QUdwRkc7RUFDRyxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUhzRk47QUduRlM7RUFDRyxZQUFBO0FIcUZaO0FHdEZTO0VBQ0csWUFBQTtBSHdGWjtBR3pGUztFQUNHLFlBQUE7QUgyRlo7QUc1RlM7RUFDRyxZQUFBO0FIOEZaO0FHL0ZTO0VBQ0csWUFBQTtBSGlHWjtBR2xHUztFQUNHLFlBQUE7QUhvR1o7QUdyR1M7RUFDRyxZQUFBO0FIdUdaO0FHeEdTO0VBQ0csWUFBQTtBSDBHWjtBRzNHUztFQUNHLFlBQUE7QUg2R1o7QUc5R1M7RUFDRyxhQUFBO0FIZ0haOztBRzNHQTtFQUNHLGFBQUE7RUFDQSxRQUFBO0VBQ0EsMkJBeENTO0VBeUNULG9CQXpDUztFQTBDVCxjQUFBO0VBQ0EsV0FBQTtBSDhHSDtBRzdHRztFQUNHLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBSCtHTjtBRzFHUztFQUNHLFlBQUE7QUg0R1o7QUc3R1M7RUFDRyxZQUFBO0FIK0daO0FHaEhTO0VBQ0csWUFBQTtBSGtIWjtBR25IUztFQUNHLFlBQUE7QUhxSFo7QUd0SFM7RUFDRyxZQUFBO0FId0haO0FHekhTO0VBQ0csWUFBQTtBSDJIWjtBRzVIUztFQUNHLFlBQUE7QUg4SFo7QUcvSFM7RUFDRyxZQUFBO0FIaUlaO0FHbElTO0VBQ0csWUFBQTtBSG9JWjtBR3JJUztFQUNHLFlBQUE7QUh1SVo7O0FHbElBO0VBQ0cseUJBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBSHFJSDs7QUduSUE7RUFDRyxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0VBQ0EsUUFBQTtFQUNBLHVDQUFBO0VBQ0Esb0JBdEVTO0FINE1aO0FHcElNO0VBQ0cseUJGNUVEO0VFNkVDLFlBQUE7QUhzSVQ7O0FHbElBO0VBQ0csZUFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBSHFJSDs7QUdsSUc7RUFDRyxjQUFBO0FIcUlOO0FHbklHO0VBQ0cscUJBQUE7RUFDQSxxQkFBQTtBSHFJTjs7QUdsSUE7RUFDRyxtQkFBQTtBSHFJSDtBR25JRztFQUNHLHlCQUFBO0FIcUlOO0FHbklHO0VBQ0csZUFBQTtFQUNBLHlCQUFBO0FIcUlOOztBR2xJQTtFQUNHLGtCQUFBO0FIcUlIOztBR25JQTtFQUNHLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FIc0lIO0FHcklHO0VBQ0csbUJBQUE7QUh1SU47O0FJeFBBO0VBQ0csc0JBQUE7RUFDQSw2QkFBQTtFQUNBLHVCQUFBO0VBQ0EsY0hOSztFR09MLHNCQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0FKMlBIO0FJMVBHO0VBQ0cseUJIWEU7RUdZRixZQUFBO0FKNFBOO0FJMVBHO0VBQ0cseUJIZkU7RUdnQkYsWUFBQTtBSjRQTjtBSTFQRztFQUNHLFlBQUE7QUo0UE47O0FLL1FBO0VBQ0c7SUFDRyxpQkFBQTtJQUNBLGNBQUE7SUFDQSxhQUFBO0lBQ0EsZ0JBQUE7SUFDQSxxQ0FBQTtFTGtSSjtFS2pSSTtJQUNHLGlCQUFBO0lBQ0EsV0FBQTtFTG1SUDtFS2pSSTtJQUNHLGdCQUFBO0lBQ0EsV0FBQTtFTG1SUDtFS2pSSTtJQUNHLGdCQUFBO0lBQ0EsV0FBQTtFTG1SUDs7RUsvUUk7SUFDRyxTQUFBO0lBQ0EsbUJBQUE7RUxrUlA7RUtoUkk7SUFDRyxjQUFBO0VMa1JQO0VLaFJJO0lBQ0csY0FBQTtJQUNBLFdBQUE7RUxrUlA7QUFDRjtBSy9RQTtFQUNHO0lBQ0csU0FBQTtJQUNBLGdCQUFBO0lBQ0EsZUFBQTtJQUNBLFlBQUE7SUFDQSxVQUFBO0VMaVJKO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxyXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxyXFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXHJcXG4qL1xcclxcbkB1c2UgJy4vdmFyaWFibGVzJyBhcyAqO1xcclxcblxcclxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXHJcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxyXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcclxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXHJcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcclxcbmIsIHUsIGksIGNlbnRlcixcXHJcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcclxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcclxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcclxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXHJcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcclxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcclxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxyXFxuXFx0bWFyZ2luOiAwO1xcclxcblxcdHBhZGRpbmc6IDA7XFxyXFxuXFx0Ym9yZGVyOiAwO1xcclxcblxcdGZvbnQtc2l6ZTogMTAwJTtcXHJcXG5cXHRmb250OiBpbmhlcml0O1xcclxcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcclxcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcclxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxyXFxuXFx0ZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcbmJvZHkge1xcclxcblxcdGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxyXFxuICAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICRncmVlbjtcXHJcXG5cXHRsaW5lLWhlaWdodDogMTtcXHJcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXHJcXG4gICBjb2xvcjogJGdyZWVuO1xcclxcblxcdG1hcmdpbjogMTZweDtcXHJcXG59XFxyXFxub2wsIHVsIHtcXHJcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlLCBxIHtcXHJcXG5cXHRxdW90ZXM6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcclxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXHJcXG5cXHRjb250ZW50OiAnJztcXHJcXG5cXHRjb250ZW50OiBub25lO1xcclxcbn1cXHJcXG50YWJsZSB7XFxyXFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXHJcXG59XFxyXFxucCB7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDEuNTtcXHJcXG59XCIsXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggIzFjYjUxNztcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogIzFjYjUxNztcXG4gIG1hcmdpbjogMTZweDtcXG59XFxuXFxub2wsIHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbmJsb2NrcXVvdGUsIHEge1xcbiAgcXVvdGVzOiBub25lO1xcbn1cXG5cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGNvbnRlbnQ6IG5vbmU7XFxufVxcblxcbnRhYmxlIHtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDtcXG59XFxuXFxucCB7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbn1cXG5cXG4uaW5zdHJ1Y3Rpb25zIHtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgbWFyZ2luLXRvcDogM3JlbTtcXG59XFxuLmluc3RydWN0aW9ucyBoMSB7XFxuICBmb250LXNpemU6IDEuNHJlbTtcXG59XFxuLmluc3RydWN0aW9ucyBoMiB7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG59XFxuLmluc3RydWN0aW9ucyBoMSwgLmluc3RydWN0aW9ucyBoMiB7XFxuICBtYXJnaW46IDFyZW0gMDtcXG59XFxuLmluc3RydWN0aW9ucyBoMTpmaXJzdC1jaGlsZCwgLmluc3RydWN0aW9ucyBoMjpmaXJzdC1jaGlsZCB7XFxuICBtYXJnaW4tdG9wOiAwO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGxpIHtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgbGk6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi5ib2FyZC1zZWN0aW9uIHtcXG4gIG1hcmdpbi1ib3R0b206IDNyZW07XFxufVxcbi5ib2FyZC1zZWN0aW9uID4gaDEge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweCBhdXRvO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogNXB4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxuICBncmlkLWNvbHVtbjogMjtcXG4gIGdyaWQtcm93OiAxO1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbCB7XFxuICBib3JkZXItdG9wOiBub25lO1xcbiAgYm9yZGVyLXJpZ2h0OiBub25lO1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIxXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjJcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiM1xcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg0KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI0XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDUpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjVcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNlxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg3KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI3XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDgpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjhcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiOVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxMCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMTBcXFwiO1xcbn1cXG5cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogNXB4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4O1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxuICBncmlkLWNvbHVtbjogMTtcXG4gIGdyaWQtcm93OiAyO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlci10b3A6IG5vbmU7XFxuICBib3JkZXItYm90dG9tOiBub25lO1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImFcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgyKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJiXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiY1xcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDQpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImRcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg1KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJlXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZlxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDcpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImdcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg4KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJoXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiaVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEwKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJqXFxcIjtcXG59XFxuXFxuLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmRfX2JvYXJkIHtcXG4gIGdyaWQtcm93OiAyO1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiA1cHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG59XFxuLmJvYXJkX19ib2FyZCAuYm9hcmRfX2NlbGw6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuXFxuI2Vycm9yLW1lc3NhZ2Uge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgZ3JpZC1jb2x1bW46IDEvLTE7XFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcXG59XFxuXFxuLnBsYXllci1idXR0b25zIHVsIHtcXG4gIG1hcmdpbjogMnJlbSAwO1xcbn1cXG4ucGxheWVyLWJ1dHRvbnMgdWwgbGkge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG5cXG4uc2hpcHMtdGFibGUge1xcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXG59XFxuLnNoaXBzLXRhYmxlIHRhYmxlIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxufVxcbi5zaGlwcy10YWJsZSB0ZCwgLnNoaXBzLXRhYmxlIHRoIHtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxufVxcblxcbiNzdGFydC1idXR0b24ge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4ucmVzZXQtY29udGFpbmVyIHtcXG4gIGZvbnQtc2l6ZTogMSwgNXJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbjogM3JlbSAwO1xcbn1cXG4ucmVzZXQtY29udGFpbmVyIHAge1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuLmJ1dHRvbiB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICMxY2I1MTc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiAjMWNiNTE3O1xcbiAgcGFkZGluZzogMC41cmVtIDAuOHJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLmJ1dHRvbi0taGlnaGxpZ2h0ZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLmJ1dHRvbjpkaXNhYmxlZCB7XFxuICBvcGFjaXR5OiAwLjQ7XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogODAwcHgpIHtcXG4gIC5wbGF5ZXItYm9hcmQge1xcbiAgICBtYXgtd2lkdGg6IDEyMDBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGNvbHVtbi1nYXA6IDFyZW07XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICB9XFxuICAucGxheWVyLWJvYXJkIGgxIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEvLTE7XFxuICAgIGdyaWQtcm93OiAxO1xcbiAgfVxcbiAgLnBsYXllci1ib2FyZCAuYm9hcmQge1xcbiAgICBncmlkLWNvbHVtbjogMi8zO1xcbiAgICBncmlkLXJvdzogMjtcXG4gIH1cXG4gIC5wbGF5ZXItYm9hcmQgLnBsYXllci1idXR0b25zIHtcXG4gICAgZ3JpZC1jb2x1bW46IDMvNDtcXG4gICAgZ3JpZC1yb3c6IDI7XFxuICB9XFxuXFxuICAucGxheWVyLWJ1dHRvbnMgdWwge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG1hcmdpbi1ib3R0b206IDJyZW07XFxuICB9XFxuICAucGxheWVyLWJ1dHRvbnMgdWwgbGkge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gIH1cXG4gIC5wbGF5ZXItYnV0dG9ucyAuYnV0dG9uIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDExMDBweCkge1xcbiAgLmluc3RydWN0aW9ucyB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgbWF4LXdpZHRoOiAyODBweDtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBib3R0b206IDE2cHg7XFxuICAgIGxlZnQ6IDE2cHg7XFxuICB9XFxufVwiLFwiJGdyZWVuOiAjMWNiNTE3O1wiLFwiQHVzZSAnLi92YXJpYWJsZXMnIGFzICo7XFxyXFxuXFxyXFxuLmluc3RydWN0aW9ucyB7XFxyXFxuICAgcGFkZGluZzogMXJlbTtcXHJcXG4gICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XFxyXFxuICAgbWFyZ2luLXRvcDogM3JlbTtcXHJcXG4gICBoMSB7XFxyXFxuICAgICAgZm9udC1zaXplOiAxLjRyZW07XFxyXFxuICAgfVxcclxcbiAgIGgyIHtcXHJcXG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gICB9XFxyXFxuICAgaDEsIGgyIHtcXHJcXG4gICAgICBtYXJnaW46IDFyZW0gMDtcXHJcXG4gICB9XFxyXFxuICAgaDE6Zmlyc3QtY2hpbGQsIGgyOmZpcnN0LWNoaWxkIHtcXHJcXG4gICAgICBtYXJnaW4tdG9wOiAwO1xcclxcbiAgIH1cXHJcXG4gICBsaSB7XFxyXFxuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXHJcXG4gICAgICAmOmxhc3QtY2hpbGQge1xcclxcbiAgICAgICAgIG1hcmdpbjogMDtcXHJcXG4gICAgICB9XFxyXFxuICAgfVxcclxcbn1cIixcIkB1c2UgJ3Nhc3M6bGlzdCc7XFxyXFxuQHVzZSAnLi92YXJpYWJsZXMnIGFzICo7XFxyXFxuXFxyXFxuJGNlbGxXaWR0aDogMzBweDtcXHJcXG5cXHJcXG4uYm9hcmQtc2VjdGlvbiB7XFxyXFxuICAgbWFyZ2luLWJvdHRvbTogM3JlbTtcXHJcXG4gICAmID4gaDEge1xcclxcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcclxcbiAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgIH1cXHJcXG59XFxyXFxuLmJvYXJkIHtcXHJcXG4gICBmb250LXNpemU6IDE4cHg7XFxyXFxuICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6ICRjZWxsV2lkdGggYXV0bztcXHJcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG59XFxyXFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciB7XFxyXFxuICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICBnYXA6IDVweDtcXHJcXG4gICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgJGNlbGxXaWR0aCk7XFxyXFxuICAgZ3JpZC1hdXRvLXJvd3M6ICRjZWxsV2lkdGg7XFxyXFxuICAgZ3JpZC1jb2x1bW46IDI7XFxyXFxuICAgZ3JpZC1yb3c6IDE7XFxyXFxuICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXHJcXG4gICBtYXJnaW4tbGVmdDogMTBweDtcXHJcXG4gICAuYm9hcmRfX2NlbGwge1xcclxcbiAgICAgIGJvcmRlci10b3A6IG5vbmU7XFxyXFxuICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xcclxcbiAgICAgIGJvcmRlci1sZWZ0OiBub25lO1xcclxcblxcclxcbiAgICAgIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggMTAge1xcclxcbiAgICAgICAgICY6bnRoLWNoaWxkKCN7JGl9KTo6YmVmb3JlIHtcXHJcXG4gICAgICAgICAgICBjb250ZW50OiAnI3skaX0nOyBcXHJcXG4gICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XFxyXFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIHtcXHJcXG4gICBkaXNwbGF5OiBncmlkO1xcclxcbiAgIGdhcDogNXB4O1xcclxcbiAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogJGNlbGxXaWR0aDtcXHJcXG4gICBncmlkLWF1dG8tcm93czogJGNlbGxXaWR0aDtcXHJcXG4gICBncmlkLWNvbHVtbjogMTtcXHJcXG4gICBncmlkLXJvdzogMjtcXHJcXG4gICAuYm9hcmRfX2NlbGwge1xcclxcbiAgICAgIGJvcmRlci10b3A6IG5vbmU7XFxyXFxuICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXHJcXG4gICAgICBib3JkZXItbGVmdDogbm9uZTtcXHJcXG5cXHJcXG4gICAgICAkbGV0dGVyczogJ2EnLCdiJywnYycsJ2QnLCdlJywnZicsJ2cnLCdoJywnaScsJ2onO1xcclxcblxcclxcbiAgICAgIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggMTAge1xcclxcbiAgICAgICAgICY6bnRoLWNoaWxkKCN7JGl9KTo6YmVmb3JlIHtcXHJcXG4gICAgICAgICAgICBjb250ZW50OiAnI3tsaXN0Lm50aCgkbGV0dGVycywgJGkpfSc7IFxcclxcbiAgICAgICAgIH1cXHJcXG4gICAgICB9XFxyXFxuICAgfVxcclxcbn1cXHJcXG4uYm9hcmRfX2NlbGwge1xcclxcbiAgIGJvcmRlcjogMXB4IHNvbGlkICRncmVlbjtcXHJcXG4gICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcbi5ib2FyZF9fYm9hcmQge1xcclxcbiAgIGdyaWQtcm93OiAyO1xcclxcbiAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xcclxcbiAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgZ2FwOiA1cHg7XFxyXFxuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsICRjZWxsV2lkdGgpO1xcclxcbiAgIGdyaWQtYXV0by1yb3dzOiAkY2VsbFdpZHRoO1xcclxcbiAgIC5ib2FyZF9fY2VsbCB7XFxyXFxuICAgICAgJjpob3ZlciB7XFxyXFxuICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGdyZWVuO1xcclxcbiAgICAgICAgIGNvbG9yOiBibGFjaztcXHJcXG4gICAgICB9XFxyXFxuICAgfVxcclxcbn1cXHJcXG4jZXJyb3ItbWVzc2FnZSB7XFxyXFxuICAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxyXFxuICAgbWFyZ2luLXRvcDogMXJlbTtcXHJcXG4gICBtYXJnaW4tbGVmdDogLjVyZW07XFxyXFxufVxcclxcbi5wbGF5ZXItYnV0dG9ucyB7XFxyXFxuICAgdWwge1xcclxcbiAgICAgIG1hcmdpbjogMnJlbSAwO1xcclxcbiAgIH1cXHJcXG4gICB1bCBsaSB7XFxyXFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICAgIG1hcmdpbi1ib3R0b206IC41cmVtO1xcclxcbiAgIH1cXHJcXG59XFxyXFxuLnNoaXBzLXRhYmxlIHtcXHJcXG4gICBtYXJnaW4tYm90dG9tOiAycmVtO1xcclxcblxcclxcbiAgIHRhYmxlIHtcXHJcXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XFxyXFxuICAgfVxcclxcbiAgIHRkLCB0aCB7XFxyXFxuICAgICAgcGFkZGluZzogLjVyZW07XFxyXFxuICAgICAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xcclxcbiAgIH1cXHJcXG59XFxyXFxuI3N0YXJ0LWJ1dHRvbiB7XFxyXFxuICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcclxcbn1cXHJcXG4ucmVzZXQtY29udGFpbmVyIHtcXHJcXG4gICBmb250LXNpemU6IDEsNXJlbTtcXHJcXG4gICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgbWFyZ2luOiAzcmVtIDA7XFxyXFxuICAgcCB7XFxyXFxuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXHJcXG4gICB9XFxyXFxufVwiLFwiQHVzZSAnLi92YXJpYWJsZXMnIGFzICo7XFxyXFxuXFxyXFxuLmJ1dHRvbiB7XFxyXFxuICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXHJcXG4gICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggJGdyZWVuO1xcclxcbiAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcclxcbiAgIGNvbG9yOiAkZ3JlZW47XFxyXFxuICAgcGFkZGluZzogLjVyZW0gLjhyZW07XFxyXFxuICAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xcclxcbiAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAmOmhvdmVyIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JlZW47XFxyXFxuICAgICAgY29sb3I6IGJsYWNrO1xcclxcbiAgIH1cXHJcXG4gICAmLS1oaWdobGlnaHRlZCB7XFxyXFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGdyZWVuO1xcclxcbiAgICAgIGNvbG9yOiBibGFjaztcXHJcXG4gICB9XFxyXFxuICAgJjpkaXNhYmxlZCB7XFxyXFxuICAgICAgb3BhY2l0eTogLjQ7XFxyXFxuICAgfVxcclxcbn1cIixcIkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogODAwcHgpIHtcXHJcXG4gICAucGxheWVyLWJvYXJkIHtcXHJcXG4gICAgICBtYXgtd2lkdGg6IDEyMDBweDtcXHJcXG4gICAgICBtYXJnaW46IDAgYXV0bztcXHJcXG4gICAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICAgIGNvbHVtbi1nYXA6IDFyZW07XFxyXFxuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXHJcXG4gICAgICBoMSB7XFxyXFxuICAgICAgICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXHJcXG4gICAgICAgICBncmlkLXJvdzogMTtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgLmJvYXJkIHtcXHJcXG4gICAgICAgICBncmlkLWNvbHVtbjogMiAvIDM7XFxyXFxuICAgICAgICAgZ3JpZC1yb3c6IDI7XFxyXFxuICAgICAgfVxcclxcbiAgICAgIC5wbGF5ZXItYnV0dG9ucyB7XFxyXFxuICAgICAgICAgZ3JpZC1jb2x1bW46IDMgLyA0O1xcclxcbiAgICAgICAgIGdyaWQtcm93OiAyO1xcclxcbiAgICAgIH1cXHJcXG4gICB9XFxyXFxuICAgLnBsYXllci1idXR0b25zIHtcXHJcXG4gICAgICB1bCB7XFxyXFxuICAgICAgICAgbWFyZ2luOiAwO1xcclxcbiAgICAgICAgIG1hcmdpbi1ib3R0b206IDJyZW07XFxyXFxuICAgICAgfVxcclxcbiAgICAgIHVsIGxpIHtcXHJcXG4gICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgICB9XFxyXFxuICAgICAgLmJ1dHRvbiB7XFxyXFxuICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XFxyXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMTAwcHgpIHtcXHJcXG4gICAuaW5zdHJ1Y3Rpb25zIHtcXHJcXG4gICAgICBtYXJnaW46IDA7XFxyXFxuICAgICAgbWF4LXdpZHRoOiAyODBweDtcXHJcXG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgICAgYm90dG9tOiAxNnB4O1xcclxcbiAgICAgIGxlZnQ6IDE2cHg7XFxyXFxuICAgfVxcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJHYW1lIiwiX3dpbm5lck1lc3NhZ2UiLCJfY2FuR2FtZVN0YXJ0IiwiX2NvbXB1dGVyQm9hcmQiLCJwbGF5ZXJCb2FyZCIsImdldENvbXB1dGVyQm9hcmQiLCJnZXRCb2FyZCIsImluaXQiLCJwbGFjZUVuZW15QXJteSIsInR5cGUiLCJyb3ciLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb2x1bW4iLCJsZW5ndGgiLCJkaXJlY3Rpb24iLCJwbGFjZVNoaXAiLCJlIiwibWVzc2FnZSIsImluY2x1ZGVzIiwiaXNBcm15Q29tcGxldGUiLCJjb21wdXRlclNoaXBzSW5mbyIsImdldFNoaXBzIiwicmVtb3ZlU2hpcCIsInRha2VUdXJuIiwiY2VsbCIsImF0dGFja1BsYXllciIsInJlY2VpdmVBdHRhY2siLCJhbGxTaGlwc1N1bmsiLCJnZXRXaW5uZXIiLCJyZXNldCIsInVuZGVmaW5lZCIsIlNoaXAiLCJfYm9hcmQiLCJfc2hpcHMiLCJ0eXBlMSIsInNoaXBzIiwibWF4IiwidHlwZTIiLCJ0eXBlMyIsInR5cGU0IiwicHVzaCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInNoaXBzQ2xvbmUiLCJrZXkiLCJmb3JFYWNoIiwic2hpcCIsImNsb25lIiwiZ2V0TGVuZ3RoIiwiZ2V0Q29vcnMiLCJpIiwiZ2V0SGl0cyIsImhpdCIsImdldEJvYXJkQW5kU2hpcHMiLCJib2FyZENvcHkiLCJjdXJyZW50U2hpcCIsInNoaXBDb29ycyIsImNvb3JzIiwiY29vcmRpbmF0ZXMiLCJpc05hTiIsIk51bWJlciIsIkVycm9yIiwic2hpcENvb3JkaW5hdGVzIiwiY29vcnNDb3B5IiwiY3VycmVudENvb3IiLCJuZXdTaGlwIiwibmV3U2hpcENvb3JzIiwiZXJyb3JNc2ciLCJmaWx0ZXJlZFNoaXBzIiwiaiIsImZpbHRlciIsInNoaXBzTG9vcCIsInJlc3VsdE1zZyIsInJlZHVjZSIsImFjYyIsImN1cnJlbnQiLCJzbGljZSIsInN5bWJvbCIsInR5cGVMb29wIiwiaXNTdW5rIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNwdUJvYXJkIiwiYnV0dG9uc0NvbnRhaW5lciIsInNoaXBUYWJsZUNvdW50ZXJzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImVycm9yTWVzc2FnZSIsInN0YXJ0QnRuIiwicGxheWVyQm9hcmRDZWxscyIsImNwdUJvYXJkQ2VsbHMiLCJzaGlwc0luZm8iLCJwcmV2aW91c0NsaWNrZWRCdG4iLCJjdXJyZW50Q2VsbCIsImNlbGxzVG9IaWdobGlnaHQiLCJkaXYiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiZGF0YXNldCIsImZpbGxlZCIsImFwcGVuZCIsImNsb25lTm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbGlja2VkQnV0dG9ucyIsInNob3dQcmV2aWV3SGFuZGxlciIsInJlbW92ZVNoaXBQcmV2aWV3IiwicGxhY2VOZXdTaGlwIiwid2luZG93Iiwicm90YXRlU2hpcCIsImluaXRpYWxpemVHYW1lIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiaWQiLCJzaG93U2hpcFByZXZpZXciLCJub2RlIiwibGVuZ3RoTG9vcCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJib3JkZXJDb2xvciIsInRleHRDb250ZW50IiwiZGlzYWJsZWQiLCJ1cGRhdGVQbGF5ZXJCb2FyZCIsInVwZGF0ZVNoaXBzVGFibGUiLCJ2aXNpYmlsaXR5IiwiYm9hcmQiLCJzZWFyY2giLCJpbmRleCIsIm1zZyIsInNoaXBCdXR0b25zIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZlbnREZWZhdWx0IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInBhcmVudEVsZW1lbnQiLCJkaXNwbGF5IiwiYXR0YWNrQ3B1Qm9hcmQiLCJ0dXJuUmVzdWx0IiwidXBkYXRlQ3B1Qm9hcmQiLCJwIiwiYnV0dG9uIiwiYm9keSIsImZpcnN0RWxlbWVudENoaWxkIiwiYWZ0ZXIiLCJyZXNldEdhbWUiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJjb3VudGVyIiwiX2Nvb3JkaW5hdGVzIiwiX2xlbmd0aCIsIl9oaXRzQ291bnRlciJdLCJzb3VyY2VSb290IjoiIn0=