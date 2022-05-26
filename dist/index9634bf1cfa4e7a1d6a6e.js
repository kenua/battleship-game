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
      max: 7
    },
    type4: {
      ships: [],
      length: 2,
      max: 5
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
window.addEventListener("keydown", changeOrientation);
startBtn.addEventListener("click", initializeGame);

function handleClickedButtons(e) {
  var target = e.target; // handle buttons that change "length" variable

  if (target.dataset.length) {
    length = +target.dataset.length;

    if (previousClickedBtn) {
      previousClickedBtn.classList.remove("button--highlighted");
    }

    target.classList.add("button--highlighted");
    previousClickedBtn = target; // handle button that changes "direction" variable
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
            shipsInfo = _game_js__WEBPACK_IMPORTED_MODULE_0__["default"].playerBoard.getShips();

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
} // this file would bring the css file and dom functionality

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S0FBSyxHQUFHLE9BQU8sZ1VBQWdVLEtBQUssaUJBQWlCLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLE1BQU0sV0FBVyxNQUFNLFVBQVUsTUFBTSxLQUFLLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLFVBQVUsTUFBTSxLQUFLLFdBQVcsV0FBVyxNQUFNLEtBQUssV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsV0FBVyxZQUFZLFdBQVcsVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE9BQU8sTUFBTSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxVQUFVLFVBQVUsV0FBVyxZ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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2R2E7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDdENhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDVmE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJOztBQUVqRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1hhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTs7QUFFQTtBQUNBLGlGQUFpRjtBQUNqRjs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3Njc3Mvc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2Nzcy9zdHlsZXMuc2Nzcz8zMjFmIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIjtcclxuXHJcbmNvbnN0IEdhbWUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICBsZXQgX3dpbm5lck1lc3NhZ2U7XHJcbiAgIGxldCBfY2FuR2FtZVN0YXJ0ID0gZmFsc2U7XHJcbiAgIGxldCBfY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xyXG4gICBsZXQgcGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcclxuXHJcbiAgIGNvbnN0IGdldENvbXB1dGVyQm9hcmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBfY29tcHV0ZXJCb2FyZC5nZXRCb2FyZCgpO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IHBsYWNlRW5lbXlBcm15ID0gZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gcGxhY2Ugc2hpcHNcclxuICAgICAgICAgICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICAgICAgbGV0IGxlbmd0aCA9IHR5cGUubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgZGlyZWN0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMikgPT09IDAgPyBcInZlclwiIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgIF9jb21wdXRlckJvYXJkLnBsYWNlU2hpcChbcm93LCBjb2x1bW5dLCBsZW5ndGgsIGRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIHBsYWNlRW5lbXlBcm15KHR5cGUpO1xyXG4gICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGlmICghZS5tZXNzYWdlLmluY2x1ZGVzKFwiRXhjZWVkZWQgbnVtYmVyIG9mIHNoaXBzXCIpKSB7XHJcbiAgICAgICAgICAgICAgIHBsYWNlRW5lbXlBcm15KHR5cGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICByZXR1cm4gXCJmaW5pc2hlZFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIGZpbGwgY29tcHV0ZXJCb2FyZCB3aXRoIHNoaXBzXHJcbiAgICAgIGlmICghX2NvbXB1dGVyQm9hcmQuaXNBcm15Q29tcGxldGUoKSkge1xyXG4gICAgICAgICBsZXQgY29tcHV0ZXJTaGlwc0luZm8gPSBfY29tcHV0ZXJCb2FyZC5nZXRTaGlwcygpO1xyXG5cclxuICAgICAgICAgZm9yIChsZXQgdHlwZSBpbiBjb21wdXRlclNoaXBzSW5mbykge1xyXG4gICAgICAgICAgICBwbGFjZUVuZW15QXJteShjb21wdXRlclNoaXBzSW5mb1t0eXBlXSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBsYXllckJvYXJkLmlzQXJteUNvbXBsZXRlKCkpIHtcclxuICAgICAgICAgX2NhbkdhbWVTdGFydCA9IHRydWU7XHJcbiAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHRha2VUdXJuID0gZnVuY3Rpb24gKHJvdywgY2VsbCkge1xyXG4gICAgICBpZiAoIV9jYW5HYW1lU3RhcnQpIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgaWYgKCFfd2lubmVyTWVzc2FnZSkge1xyXG4gICAgICAgICBsZXQgYXR0YWNrUGxheWVyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgICAgICAgICBsZXQgY2VsbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuXHJcbiAgICAgICAgICAgICAgIHRoaXMucGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNlbGwpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgZS5tZXNzYWdlLmluY2x1ZGVzKFxyXG4gICAgICAgICAgICAgICAgICAgICBcIllvdSBhbHJlYWR5IGF0dGFja2VkIHRoZSBmb2xsb3dpbmcgY29vcmRpbmF0ZXNcIlxyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICBhdHRhY2tQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAvLyBhdHRhY2sgY29tcHV0ZXJcclxuICAgICAgICAgX2NvbXB1dGVyQm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNlbGwpO1xyXG5cclxuICAgICAgICAgaWYgKF9jb21wdXRlckJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIF93aW5uZXJNZXNzYWdlID0gXCJQbGF5ZXIgd29uIHRoZSBtYXRjaFwiO1xyXG4gICAgICAgICAgICByZXR1cm4gX3dpbm5lck1lc3NhZ2U7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8vIGF0dGFjayBwbGF5ZXJcclxuICAgICAgICAgYXR0YWNrUGxheWVyKCk7XHJcblxyXG4gICAgICAgICBpZiAodGhpcy5wbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xyXG4gICAgICAgICAgICBfd2lubmVyTWVzc2FnZSA9IFwiQ29tcHV0ZXIgd29uIHRoZSBtYXRjaFwiO1xyXG4gICAgICAgICAgICByZXR1cm4gX3dpbm5lck1lc3NhZ2U7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gX3dpbm5lck1lc3NhZ2U7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBnZXRXaW5uZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBfd2lubmVyTWVzc2FnZTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHJlc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBfd2lubmVyTWVzc2FnZSA9IHVuZGVmaW5lZDtcclxuICAgICAgX2NhbkdhbWVTdGFydCA9IGZhbHNlO1xyXG4gICAgICBfY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xyXG4gICAgICB0aGlzLnBsYXllckJvYXJkID0gR2FtZWJvYXJkKCk7XHJcbiAgIH07XHJcblxyXG4gICByZXR1cm4ge1xyXG4gICAgICBwbGF5ZXJCb2FyZCxcclxuICAgICAgZ2V0Q29tcHV0ZXJCb2FyZCxcclxuICAgICAgaW5pdCxcclxuICAgICAgdGFrZVR1cm4sXHJcbiAgICAgIGdldFdpbm5lcixcclxuICAgICAgcmVzZXQsXHJcbiAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xyXG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XHJcblxyXG5jb25zdCBHYW1lYm9hcmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgIGxldCBfYm9hcmQgPSBbXTtcclxuICAgbGV0IF9zaGlwcyA9IHtcclxuICAgICAgdHlwZTE6IHsgc2hpcHM6IFtdLCBsZW5ndGg6IDUsIG1heDogMSB9LFxyXG4gICAgICB0eXBlMjogeyBzaGlwczogW10sIGxlbmd0aDogNCwgbWF4OiAyIH0sXHJcbiAgICAgIHR5cGUzOiB7IHNoaXBzOiBbXSwgbGVuZ3RoOiAzLCBtYXg6IDcgfSxcclxuICAgICAgdHlwZTQ6IHsgc2hpcHM6IFtdLCBsZW5ndGg6IDIsIG1heDogNSB9LFxyXG4gICB9O1xyXG5cclxuICAgLy8gY3JlYXRlIDEwIHJvd3MgYW5kIDEwIGNlbGxzIGZvciBfYm9hcmRcclxuICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XHJcbiAgICAgIF9ib2FyZC5wdXNoKFtdKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGNlbGwgPSAwOyBjZWxsIDwgMTA7IGNlbGwrKykge1xyXG4gICAgICAgICBfYm9hcmRbcm93XS5wdXNoKFwiflwiKTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICBjb25zdCBnZXRCb2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX2JvYXJkKSk7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBnZXRTaGlwcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IHNoaXBzQ2xvbmUgPSB7fTtcclxuXHJcbiAgICAgIGZvciAobGV0IGtleSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgc2hpcHNDbG9uZVtrZXldID0ge307XHJcbiAgICAgICAgIHNoaXBzQ2xvbmVba2V5XS5zaGlwcyA9IFtdO1xyXG4gICAgICAgICBzaGlwc0Nsb25lW2tleV0ubGVuZ3RoID0gX3NoaXBzW2tleV0ubGVuZ3RoO1xyXG4gICAgICAgICBzaGlwc0Nsb25lW2tleV0ubWF4ID0gX3NoaXBzW2tleV0ubWF4O1xyXG5cclxuICAgICAgICAgX3NoaXBzW2tleV0uc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2xvbmUgPSBTaGlwKHNoaXAuZ2V0TGVuZ3RoKCksIHNoaXAuZ2V0Q29vcnMoKSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuZ2V0SGl0cygpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgY2xvbmUuaGl0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNoaXBzQ2xvbmVba2V5XS5zaGlwcy5wdXNoKGNsb25lKTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBzaGlwc0Nsb25lO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgZ2V0Qm9hcmRBbmRTaGlwcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGJvYXJkQ29weSA9IHRoaXMuZ2V0Qm9hcmQoKTtcclxuXHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2hpcCA9IF9zaGlwc1t0eXBlXS5zaGlwc1tpXTtcclxuICAgICAgICAgICAgbGV0IHNoaXBDb29ycyA9IGN1cnJlbnRTaGlwLmdldENvb3JzKCk7XHJcblxyXG4gICAgICAgICAgICBzaGlwQ29vcnMuZm9yRWFjaCgoY29vcnMpID0+IHtcclxuICAgICAgICAgICAgICAgbGV0IFtyb3csIGNvbHVtbl0gPSBjb29ycztcclxuXHJcbiAgICAgICAgICAgICAgIGlmIChib2FyZENvcHlbcm93XVtjb2x1bW5dID09PSBcIn5cIikge1xyXG4gICAgICAgICAgICAgICAgICBib2FyZENvcHlbcm93XVtjb2x1bW5dID0gXCJzXCI7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGJvYXJkQ29weTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHBsYWNlU2hpcCA9IGZ1bmN0aW9uIChjb29yZGluYXRlcyA9IFswLCAwXSwgbGVuZ3RoID0gMiwgZGlyZWN0aW9uKSB7XHJcbiAgICAgIGlmIChpc05hTihOdW1iZXIoY29vcmRpbmF0ZXNbMF0pKSB8fCBpc05hTihOdW1iZXIoY29vcmRpbmF0ZXNbMV0pKSkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb29yZGluYXRlcyBzaG91bGQgYmUgbnVtYmVyc1wiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzTmFOKE51bWJlcihsZW5ndGgpKSB8fCBsZW5ndGggPiA1IHx8IGxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGVuZ3RoIHNob3VsZCBiZSBhIG51bWJlciBiZXR3ZWVuIDIgYW5kIDVcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBzaGlwQ29vcmRpbmF0ZXMgPSBbWy4uLmNvb3JkaW5hdGVzXV07XHJcblxyXG4gICAgICAvLyBnZW5lcmF0ZSBjb29yZGluYXRlcyB0aGF0IGV4cGFuZCBiYXNlZCBvbiBsZW5ndGggYW5kIGRpcmVjdGlvblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAvLyBleHBhbmQgY29vcmRpbmF0ZXMgdmVydGljYWxseVxyXG4gICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInZlclwiKSB7XHJcbiAgICAgICAgICAgIGxldCBjb29yc0NvcHkgPSBbLi4uc2hpcENvb3JkaW5hdGVzW2ldXTtcclxuICAgICAgICAgICAgY29vcnNDb3B5WzBdKys7XHJcbiAgICAgICAgICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKGNvb3JzQ29weSk7XHJcblxyXG4gICAgICAgICAgICAvLyBleHBhbmQgY29vcmRpbmF0ZXMgaG9yaXpvbnRhbGx5XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBjb29yc0NvcHkgPSBbLi4uc2hpcENvb3JkaW5hdGVzW2ldXTtcclxuICAgICAgICAgICAgY29vcnNDb3B5WzFdKys7XHJcbiAgICAgICAgICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKGNvb3JzQ29weSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY2hlY2sgaWYgc2hpcENvb3JkaW5hdGVzIGFyZSB2YWxpZFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICBsZXQgY3VycmVudENvb3IgPSBzaGlwQ29vcmRpbmF0ZXNbaV07XHJcblxyXG4gICAgICAgICBpZiAoY3VycmVudENvb3JbMF0gPiA5IHx8IGN1cnJlbnRDb29yWzBdIDwgMClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBleHBhbmRzIHRvIHdyb25nIGNvb3JkaW5hdGVzXCIpO1xyXG4gICAgICAgICBpZiAoY3VycmVudENvb3JbMV0gPiA5IHx8IGN1cnJlbnRDb29yWzFdIDwgMClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBleHBhbmRzIHRvIHdyb25nIGNvb3JkaW5hdGVzXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgbmV3U2hpcCA9IFNoaXAobGVuZ3RoLCBzaGlwQ29vcmRpbmF0ZXMpO1xyXG5cclxuICAgICAgLy8gY2hlY2sgaWYgbmV3U2hpcCBjYW4gYmUgYWRkZWQgdG8gX3NoaXBzXHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGlmIChfc2hpcHNbdHlwZV0ubGVuZ3RoID09PSBuZXdTaGlwLmdldExlbmd0aCgpKSB7XHJcbiAgICAgICAgICAgIGlmIChfc2hpcHNbdHlwZV0uc2hpcHMubGVuZ3RoIDwgX3NoaXBzW3R5cGVdLm1heCkge1xyXG4gICAgICAgICAgICAgICAvLyBjaGVjayBldmVyeSBzaGlwJ3MgY29vcmRpbmF0ZXMgdG8gc2VlIGlmIG5ld1NoaXAgZG9lcyBub3QgaGF2ZVxyXG4gICAgICAgICAgICAgICAvLyB0aGUgc2FtZSBjb29yZGluYXRlcyBvZiBhbm90aGVyIHNoaXBcclxuICAgICAgICAgICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgICAgICAgICAgX3NoaXBzW3R5cGVdLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgc2hpcC5nZXRDb29ycygpLmZvckVhY2goKHNoaXBDb29ycykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTaGlwLmdldENvb3JzKCkuZm9yRWFjaCgobmV3U2hpcENvb3JzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpcENvb3JzWzBdID09PSBuZXdTaGlwQ29vcnNbMF0gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpcENvb3JzWzFdID09PSBuZXdTaGlwQ29vcnNbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIG5ldyBzaGlwIGNhbm5vdCBiZSBwbGFjZSBvdmVyIGFub3RoZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgIF9zaGlwc1t0eXBlXS5zaGlwcy5wdXNoKG5ld1NoaXApO1xyXG4gICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgbGV0IGVycm9yTXNnID0gYEV4Y2VlZGVkIG51bWJlciBvZiBzaGlwczogbWF4aW11biBudW1iZXIgZm9yICR7bGVuZ3RofSBsZW5ndGggc2hpcHMgaXMgJHtfc2hpcHNbdHlwZV0ubWF4fWA7XHJcbiAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCByZW1vdmVTaGlwID0gZnVuY3Rpb24gKHJvdyA9IDAsIGNlbGwgPSAwKSB7XHJcbiAgICAgIGxldCBmaWx0ZXJlZFNoaXBzO1xyXG4gICAgICBsZXQgY29vcnM7XHJcblxyXG4gICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICAvLyBzZWFyY2ggYW5kIGZpbHRlciBvdXQgc2hpcCB0aGF0IGhhcyBcInJvd1wiIGFuZCBcImNlbGxcIiBhcyBjb29yZGluYXRlc1xyXG4gICAgICAgICBzaGlwc0xvb3A6IGZvciAobGV0IGkgPSAwOyBpIDwgX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2hpcCA9IF9zaGlwc1t0eXBlXS5zaGlwc1tpXTtcclxuICAgICAgICAgICAgbGV0IHNoaXBDb29ycyA9IGN1cnJlbnRTaGlwLmdldENvb3JzKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNoaXBDb29ycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICBpZiAoc2hpcENvb3JzW2pdWzBdID09PSByb3cgJiYgc2hpcENvb3JzW2pdWzFdID09PSBjZWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgIGZpbHRlcmVkU2hpcHMgPSBfc2hpcHNbdHlwZV0uc2hpcHMuZmlsdGVyKFxyXG4gICAgICAgICAgICAgICAgICAgICAoc2hpcCkgPT4gc2hpcCAhPT0gY3VycmVudFNoaXBcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgY29vcnMgPSBzaGlwQ29vcnM7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrIHNoaXBzTG9vcDtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgLy8gdXBkYXRlIF9zaGlwc1t0eXBlXS5zaGlwcyBhcnJheVxyXG4gICAgICAgICBpZiAoZmlsdGVyZWRTaGlwcykge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0TXNnID0gXCJSZW1vdmVkIHNoaXAgd2l0aCB0aGUgZm9sbG93aW5nIGNvb3JkaW5hdGVzOiBcIjtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdE1zZyArPSBjb29yc1xyXG4gICAgICAgICAgICAgICAucmVkdWNlKFxyXG4gICAgICAgICAgICAgICAgICAoYWNjLCBjdXJyZW50KSA9PiBhY2MgKyBgWyR7Y3VycmVudFswXX0sICR7Y3VycmVudFsxXX1dLCBgLFxyXG4gICAgICAgICAgICAgICAgICBcIlwiXHJcbiAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgLnNsaWNlKDAsIC0yKTtcclxuXHJcbiAgICAgICAgICAgIF9zaGlwc1t0eXBlXS5zaGlwcyA9IGZpbHRlcmVkU2hpcHM7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRNc2c7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGBUaGVyZSBpcyBubyBzaGlwIGluIFske3Jvd30sJHtjZWxsfV0gY29vcmRpbmF0ZXNgO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgaXNBcm15Q29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGlmIChfc2hpcHNbdHlwZV0uc2hpcHMubGVuZ3RoIDwgX3NoaXBzW3R5cGVdLm1heCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbiAocm93ID0gMCwgY2VsbCA9IDApIHtcclxuICAgICAgbGV0IHN5bWJvbCA9IFwibVwiO1xyXG5cclxuICAgICAgaWYgKHJvdyA+IDkgfHwgcm93IDwgMCB8fCBjZWxsID4gOSB8fCBjZWxsIDwgMCkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgIGBQcm92aWRlZCBjb29yZGluYXRlcyBhcmUgbm90IHZhbGlkOiBbJHtyb3d9LCR7Y2VsbH1dYFxyXG4gICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2JvYXJkW3Jvd11bY2VsbF0gIT09IFwiflwiKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgYFlvdSBhbHJlYWR5IGF0dGFja2VkIHRoZSBmb2xsb3dpbmcgY29vcmRpbmF0ZXM6IFske3Jvd30sJHtjZWxsfV1gXHJcbiAgICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoZWNrIGlmIGFueSBzaGlwIGhhcyBcInJvd1wiIGFuZCBcImNlbGxcIiBhcyBjb29yZGluYXRlcyBhbmQgaGl0IGl0XHJcbiAgICAgIHR5cGVMb29wOiBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFNoaXAgPSBfc2hpcHNbdHlwZV0uc2hpcHNbaV07XHJcbiAgICAgICAgICAgIGxldCBzaGlwQ29vcnMgPSBjdXJyZW50U2hpcC5nZXRDb29ycygpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaGlwQ29vcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgaWYgKHNoaXBDb29yc1tqXVswXSA9PT0gcm93ICYmIHNoaXBDb29yc1tqXVsxXSA9PT0gY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICBjdXJyZW50U2hpcC5oaXQoKTtcclxuICAgICAgICAgICAgICAgICAgc3ltYm9sID0gXCJoXCI7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrIHR5cGVMb29wO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBfYm9hcmRbcm93XVtjZWxsXSA9IHN5bWJvbDtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBhbGxTaGlwc1N1bmsgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghX3NoaXBzW3R5cGVdLnNoaXBzW2ldLmlzU3VuaygpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgIH07XHJcblxyXG4gICByZXR1cm4ge1xyXG4gICAgICBnZXRCb2FyZCxcclxuICAgICAgZ2V0U2hpcHMsXHJcbiAgICAgIGdldEJvYXJkQW5kU2hpcHMsXHJcbiAgICAgIHBsYWNlU2hpcCxcclxuICAgICAgcmVtb3ZlU2hpcCxcclxuICAgICAgaXNBcm15Q29tcGxldGUsXHJcbiAgICAgIHJlY2VpdmVBdHRhY2ssXHJcbiAgICAgIGFsbFNoaXBzU3VuayxcclxuICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcclxuIiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vZ2FtZS5qc1wiO1xyXG5pbXBvcnQgXCIuL3Njc3Mvc3R5bGVzLnNjc3NcIjtcclxuXHJcbmNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXJCb2FyZFwiKTtcclxuY29uc3QgY3B1Qm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNwdUJvYXJkXCIpO1xyXG5jb25zdCBidXR0b25zQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0b25zLWNvbnRhaW5lclwiKTtcclxuY29uc3Qgc2hpcFRhYmxlQ291bnRlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGxhY2VkLWNvdW50ZXJcIik7XHJcbmNvbnN0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3ItbWVzc2FnZVwiKTtcclxuY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LWJ1dHRvblwiKTtcclxuXHJcbmNvbnN0IHBsYXllckJvYXJkQ2VsbHMgPSBbXTtcclxuY29uc3QgY3B1Qm9hcmRDZWxscyA9IFtdO1xyXG5cclxubGV0IGxlbmd0aCA9IG51bGw7XHJcbmxldCBkaXJlY3Rpb24gPSBcImhvcml6b250YWxcIjtcclxubGV0IHNoaXBzSW5mbyA9IG51bGw7XHJcbmxldCBwcmV2aW91c0NsaWNrZWRCdG4gPSBudWxsO1xyXG5sZXQgY3VycmVudENlbGwgPSBudWxsO1xyXG5sZXQgY2VsbHNUb0hpZ2hsaWdodCA9IFtdO1xyXG5cclxuLy8gZ2VuZXJhdGUgcGxheWVyIGFuZCBjcHUgY2VsbHNcclxuZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XHJcbiAgIHBsYXllckJvYXJkQ2VsbHMucHVzaChbXSk7XHJcbiAgIGNwdUJvYXJkQ2VsbHMucHVzaChbXSk7XHJcblxyXG4gICBmb3IgKGxldCBjZWxsID0gMDsgY2VsbCA8IDEwOyBjZWxsKyspIHtcclxuICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgICBkaXYuY2xhc3NOYW1lID0gXCJib2FyZF9fY2VsbFwiO1xyXG4gICAgICBkaXYuZGF0YXNldC5yb3cgPSByb3c7XHJcbiAgICAgIGRpdi5kYXRhc2V0LmNlbGwgPSBjZWxsO1xyXG4gICAgICBkaXYuZGF0YXNldC5maWxsZWQgPSBcImZhbHNlXCI7XHJcbiAgICAgIHBsYXllckJvYXJkLmFwcGVuZChkaXYpO1xyXG4gICAgICBwbGF5ZXJCb2FyZENlbGxzW3Jvd10ucHVzaChkaXYpO1xyXG5cclxuICAgICAgbGV0IGNsb25lID0gZGl2LmNsb25lTm9kZSgpO1xyXG4gICAgICBjcHVCb2FyZC5hcHBlbmQoY2xvbmUpO1xyXG4gICAgICBjcHVCb2FyZENlbGxzW3Jvd10ucHVzaChjbG9uZSk7XHJcbiAgIH1cclxufVxyXG5cclxuYnV0dG9uc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tlZEJ1dHRvbnMpO1xyXG5wbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIHNob3dQcmV2aWV3SGFuZGxlcik7XHJcbnBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCByZW1vdmVTaGlwUHJldmlldyk7XHJcbnBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGFjZU5ld1NoaXApO1xyXG5wbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgcmVtb3ZlU2hpcCk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBjaGFuZ2VPcmllbnRhdGlvbik7XHJcbnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBpbml0aWFsaXplR2FtZSk7XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVDbGlja2VkQnV0dG9ucyhlKSB7XHJcbiAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcbiAgIC8vIGhhbmRsZSBidXR0b25zIHRoYXQgY2hhbmdlIFwibGVuZ3RoXCIgdmFyaWFibGVcclxuICAgaWYgKHRhcmdldC5kYXRhc2V0Lmxlbmd0aCkge1xyXG4gICAgICBsZW5ndGggPSArdGFyZ2V0LmRhdGFzZXQubGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKHByZXZpb3VzQ2xpY2tlZEJ0bikge1xyXG4gICAgICAgICBwcmV2aW91c0NsaWNrZWRCdG4uY2xhc3NMaXN0LnJlbW92ZShcImJ1dHRvbi0taGlnaGxpZ2h0ZWRcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLS1oaWdobGlnaHRlZFwiKTtcclxuICAgICAgcHJldmlvdXNDbGlja2VkQnRuID0gdGFyZ2V0O1xyXG5cclxuICAgICAgLy8gaGFuZGxlIGJ1dHRvbiB0aGF0IGNoYW5nZXMgXCJkaXJlY3Rpb25cIiB2YXJpYWJsZVxyXG4gICB9IGVsc2UgaWYgKHRhcmdldC5pZCA9PT0gXCJyb3RhdGlvbi1idXR0dG9uXCIpIHtcclxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgICAgZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBkaXJlY3Rpb24gPSBcImhvcml6b250YWxcIjtcclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dQcmV2aWV3SGFuZGxlcihlKSB7XHJcbiAgIHNob3dTaGlwUHJldmlldyhlLnRhcmdldCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dTaGlwUHJldmlldyhub2RlKSB7XHJcbiAgIGlmIChsZW5ndGggJiYgbm9kZS5kYXRhc2V0LnJvdyAmJiBub2RlLmRhdGFzZXQuY2VsbCkge1xyXG4gICAgICBsZXQgeyByb3csIGNlbGwgfSA9IG5vZGUuZGF0YXNldDtcclxuXHJcbiAgICAgIGN1cnJlbnRDZWxsID0gbm9kZTtcclxuICAgICAgcm93ID0gK3JvdztcclxuICAgICAgY2VsbCA9ICtjZWxsO1xyXG5cclxuICAgICAgLy8gcG9wdWxhdGUgXCJjZWxsc1RvSGlnaGxpZ2h0XCIgYXJyYXlcclxuICAgICAgbGVuZ3RoTG9vcDogZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICBpZiAoIXBsYXllckJvYXJkQ2VsbHNbcm93XSB8fCAhcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdKSB7XHJcbiAgICAgICAgICAgIGJyZWFrIGxlbmd0aExvb3A7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGNlbGxzVG9IaWdobGlnaHQucHVzaChwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0pO1xyXG4gICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICAgICAgICBjZWxsKys7XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJvdysrO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHBhaW50IHByZXZpZXcgcmVkIGlmIHNoaXAgbGVuZ3RoIGRvZXMgbm90IGZpdFxyXG4gICAgICBpZiAoY2VsbHNUb0hpZ2hsaWdodC5sZW5ndGggPCBsZW5ndGgpIHtcclxuICAgICAgICAgY2VsbHNUb0hpZ2hsaWdodC5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjYjUxNzE3XCI7XHJcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuYm9yZGVyQ29sb3IgPSBcIiNiNTE3MTdcIjtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAvLyBwYWludCBwcmV2aWV3IGVpdGhlciBncmVlbiBvciByZWQgYmFzZWQgb24gZmlsbGVkIGF0dHJpYnV0ZSB2YWx1ZVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBjZWxsc1RvSGlnaGxpZ2h0LmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNlbGwuZGF0YXNldC5maWxsZWQgPT09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzFjYjUxN1wiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2I1MTcxN1wiO1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJvcmRlckNvbG9yID0gXCIjYjUxNzE3XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTaGlwUHJldmlldygpIHtcclxuICAgY2VsbHNUb0hpZ2hsaWdodC5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcclxuICAgICAgY2VsbC5zdHlsZS5jb2xvciA9IFwiXCI7XHJcbiAgICAgIGNlbGwuc3R5bGUuYm9yZGVyQ29sb3IgPSBcIlwiO1xyXG4gICB9KTtcclxuICAgY2VsbHNUb0hpZ2hsaWdodCA9IFtdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwbGFjZU5ld1NoaXAoZSkge1xyXG4gICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICBpZiAobGVuZ3RoICYmIHRhcmdldC5kYXRhc2V0LnJvdyAmJiB0YXJnZXQuZGF0YXNldC5jZWxsKSB7XHJcbiAgICAgIHNoaXBzSW5mbyA9IEdhbWUucGxheWVyQm9hcmQuZ2V0U2hpcHMoKTtcclxuICAgICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJcIjsgLy8gY2xlYXIgcHJldmlvdXMgZXJyb3IgbWVzc2FnZVxyXG5cclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBzaGlwc0luZm8pIHtcclxuICAgICAgICAgLy8gaWRlbnRpZnkgd2hhdCB0eXBlIG9mIHNoaXAgdGhlIHVzZXIgaXMgZ29pbmcgdG8gcGxhY2VcclxuICAgICAgICAgaWYgKHNoaXBzSW5mb1t0eXBlXS5sZW5ndGggPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoc2hpcHNJbmZvW3R5cGVdLnNoaXBzLmxlbmd0aCA8IHNoaXBzSW5mb1t0eXBlXS5tYXgpIHtcclxuICAgICAgICAgICAgICAgLy8gcGxhY2UgbmV3IHNoaXBcclxuICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgR2FtZS5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoXHJcbiAgICAgICAgICAgICAgICAgICAgIFsrdGFyZ2V0LmRhdGFzZXQucm93LCArdGFyZ2V0LmRhdGFzZXQuY2VsbF0sXHJcbiAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uLnNsaWNlKDAsIDMpXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIHNoaXBzSW5mbyA9IEdhbWUucGxheWVyQm9hcmQuZ2V0U2hpcHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChzaGlwc0luZm9bdHlwZV0uc2hpcHMubGVuZ3RoID09PSBzaGlwc0luZm9bdHlwZV0ubWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzQ2xpY2tlZEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzQ2xpY2tlZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiYnV0dG9uLS1oaWdobGlnaHRlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgdXBkYXRlUGxheWVyQm9hcmQoKTtcclxuICAgICAgICAgICAgICAgICAgcmVtb3ZlU2hpcFByZXZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgdXBkYXRlU2hpcHNUYWJsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKEdhbWUucGxheWVyQm9hcmQuaXNBcm15Q29tcGxldGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICBzdGFydEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICBzdGFydEJ0bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vIHByaW50IGVycm9yIG1lc3NhZ2VzXHJcbiAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICBlLm1lc3NhZ2UgPT09IFwiU2hpcCBleHBhbmRzIHRvIHdyb25nIGNvb3JkaW5hdGVzXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgZS5tZXNzYWdlID09PSBcIkEgbmV3IHNoaXAgY2Fubm90IGJlIHBsYWNlIG92ZXIgYW5vdGhlclwiXHJcbiAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIkVycm9yOiBcIiArIGUubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJFcnJvcjogQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgdHJ5aW5nIHRvIHBsYWNlIGEgbmV3IHNoaXBcIjtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUGxheWVyQm9hcmQoKSB7XHJcbiAgIGxldCBib2FyZCA9IEdhbWUucGxheWVyQm9hcmQuZ2V0Qm9hcmRBbmRTaGlwcygpO1xyXG5cclxuICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgYm9hcmQubGVuZ3RoOyByb3crKykge1xyXG4gICAgICBmb3IgKGxldCBjZWxsID0gMDsgY2VsbCA8IGJvYXJkW3Jvd10ubGVuZ3RoOyBjZWxsKyspIHtcclxuICAgICAgICAgaWYgKGJvYXJkW3Jvd11bY2VsbF0uc2VhcmNoKC9bc2htXS8pID49IDApIHtcclxuICAgICAgICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdLnRleHRDb250ZW50ID0gYm9hcmRbcm93XVtjZWxsXTtcclxuICAgICAgICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdLmRhdGFzZXQuZmlsbGVkID0gXCJ0cnVlXCI7XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXllckJvYXJkQ2VsbHNbcm93XVtjZWxsXS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHBsYXllckJvYXJkQ2VsbHNbcm93XVtjZWxsXS5kYXRhc2V0LmZpbGxlZCA9IFwiZmFsc2VcIjtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlU2hpcHNUYWJsZSgpIHtcclxuICAgbGV0IGluZGV4ID0gMDtcclxuXHJcbiAgIGZvciAobGV0IHR5cGUgaW4gc2hpcHNJbmZvKSB7XHJcbiAgICAgIHNoaXBUYWJsZUNvdW50ZXJzW2luZGV4XS50ZXh0Q29udGVudCA9IHNoaXBzSW5mb1t0eXBlXS5zaGlwcy5sZW5ndGg7XHJcbiAgICAgIGluZGV4Kys7XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU2hpcChlKSB7XHJcbiAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcbiAgIGlmIChcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQucm93ICYmXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LmNlbGwgJiZcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQuZmlsbGVkICYmXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LmZpbGxlZCA9PT0gXCJ0cnVlXCJcclxuICAgKSB7XHJcbiAgICAgIGxldCBtc2cgPSBHYW1lLnBsYXllckJvYXJkLnJlbW92ZVNoaXAoXHJcbiAgICAgICAgICt0YXJnZXQuZGF0YXNldC5yb3csXHJcbiAgICAgICAgICt0YXJnZXQuZGF0YXNldC5jZWxsXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAobXNnLmluY2x1ZGVzKFwiUmVtb3ZlZCBzaGlwIHdpdGggdGhlIGZvbGxvd2luZyBjb29yZGluYXRlczpcIikpIHtcclxuICAgICAgICAgbGV0IHNoaXBCdXR0b25zID0gYnV0dG9uc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvblwiKTtcclxuICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgIHNoaXBzSW5mbyA9IEdhbWUucGxheWVyQm9hcmQuZ2V0U2hpcHMoKTtcclxuXHJcbiAgICAgICAgIC8vIGVuYWJsZSBiYWNrIGRpc2FibGVkIGJ1dHRvbnNcclxuICAgICAgICAgZm9yIChsZXQgdHlwZSBpbiBzaGlwc0luZm8pIHtcclxuICAgICAgICAgICAgaWYgKHNoaXBzSW5mb1t0eXBlXS5zaGlwcy5sZW5ndGggPCBzaGlwc0luZm9bdHlwZV0ubWF4KSB7XHJcbiAgICAgICAgICAgICAgIHNoaXBCdXR0b25zW2luZGV4XS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBpZiAoIUdhbWUucGxheWVyQm9hcmQuaXNBcm15Q29tcGxldGUoKSkge1xyXG4gICAgICAgICAgICBzdGFydEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHN0YXJ0QnRuLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICB1cGRhdGVQbGF5ZXJCb2FyZCgpO1xyXG4gICAgICAgICB1cGRhdGVTaGlwc1RhYmxlKCk7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VPcmllbnRhdGlvbihlKSB7XHJcbiAgIGlmIChlLmtleSA9PT0gXCJxXCIgfHwgZS5rZXkgPT09IFwiUVwiKSB7XHJcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgICAgIGRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlbW92ZVNoaXBQcmV2aWV3KCk7XHJcbiAgICAgIHNob3dTaGlwUHJldmlldyhjdXJyZW50Q2VsbCk7XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZUdhbWUoKSB7XHJcbiAgIGlmIChHYW1lLmluaXQoKSkge1xyXG4gICAgICBwbGF5ZXJCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIHNob3dQcmV2aWV3SGFuZGxlcik7XHJcbiAgICAgIHBsYXllckJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCByZW1vdmVTaGlwUHJldmlldyk7XHJcbiAgICAgIHBsYXllckJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGFjZU5ld1NoaXApO1xyXG4gICAgICBwbGF5ZXJCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgcmVtb3ZlU2hpcCk7XHJcbiAgICAgIHN0YXJ0QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgYnV0dG9uc0NvbnRhaW5lci5wYXJlbnRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHJcbiAgICAgIGNwdUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhdHRhY2tDcHVCb2FyZCk7XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXR0YWNrQ3B1Qm9hcmQoZSkge1xyXG4gICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICBpZiAoXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LmZpbGxlZCA9PT0gXCJmYWxzZVwiICYmXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LnJvdyAmJlxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5jZWxsXHJcbiAgICkge1xyXG4gICAgICBsZXQgeyByb3csIGNlbGwgfSA9IHRhcmdldC5kYXRhc2V0O1xyXG4gICAgICBsZXQgdHVyblJlc3VsdCA9IEdhbWUudGFrZVR1cm4oK3JvdywgK2NlbGwpO1xyXG5cclxuICAgICAgdXBkYXRlUGxheWVyQm9hcmQoKTtcclxuICAgICAgdXBkYXRlQ3B1Qm9hcmQoKTtcclxuXHJcbiAgICAgIC8vIGRlY2xhcmUgYSB3aW5uZXIgYW5kIHByaW50IGEgcmVzZXQgYnV0dG9uXHJcbiAgICAgIGlmIChcclxuICAgICAgICAgdHVyblJlc3VsdC5zZWFyY2ggJiZcclxuICAgICAgICAgdHVyblJlc3VsdC5zZWFyY2goL1BsYXllcnxDb21wdXRlciB3b24gdGhlIG1hdGNoL2dpKSA+PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgbGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcblxyXG4gICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJyZXNldC1jb250YWluZXJcIjtcclxuICAgICAgICAgcC50ZXh0Q29udGVudCA9IHR1cm5SZXN1bHQ7XHJcbiAgICAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSBcImJ1dHRvblwiO1xyXG4gICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIlJlc2V0IEdhbWVcIjtcclxuICAgICAgICAgZGl2LmFwcGVuZChwLCBidXR0b24pO1xyXG4gICAgICAgICBkb2N1bWVudC5ib2R5LmZpcnN0RWxlbWVudENoaWxkLmFmdGVyKGRpdik7XHJcblxyXG4gICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlc2V0R2FtZSk7XHJcbiAgICAgICAgIGNwdUJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhdHRhY2tDcHVCb2FyZCk7XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVDcHVCb2FyZCgpIHtcclxuICAgbGV0IGJvYXJkID0gR2FtZS5nZXRDb21wdXRlckJvYXJkKCk7XHJcblxyXG4gICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBib2FyZC5sZW5ndGg7IHJvdysrKSB7XHJcbiAgICAgIGZvciAobGV0IGNlbGwgPSAwOyBjZWxsIDwgYm9hcmRbcm93XS5sZW5ndGg7IGNlbGwrKykge1xyXG4gICAgICAgICBpZiAoYm9hcmRbcm93XVtjZWxsXS5zZWFyY2goL1tobV0vKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIGNwdUJvYXJkQ2VsbHNbcm93XVtjZWxsXS50ZXh0Q29udGVudCA9IGJvYXJkW3Jvd11bY2VsbF07XHJcbiAgICAgICAgICAgIGNwdUJvYXJkQ2VsbHNbcm93XVtjZWxsXS5kYXRhc2V0LmZpbGxlZCA9IFwidHJ1ZVwiO1xyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjcHVCb2FyZENlbGxzW3Jvd11bY2VsbF0udGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICBjcHVCb2FyZENlbGxzW3Jvd11bY2VsbF0uZGF0YXNldC5maWxsZWQgPSBcImZhbHNlXCI7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc2V0R2FtZSgpIHtcclxuICAgR2FtZS5yZXNldCgpO1xyXG5cclxuICAgZG9jdW1lbnQuYm9keS5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmcucmVtb3ZlKCk7XHJcbiAgIHVwZGF0ZUNwdUJvYXJkKCk7XHJcbiAgIGNwdUJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhdHRhY2tDcHVCb2FyZCk7XHJcbiAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgc2hvd1ByZXZpZXdIYW5kbGVyKTtcclxuICAgcGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIHJlbW92ZVNoaXBQcmV2aWV3KTtcclxuICAgcGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBsYWNlTmV3U2hpcCk7XHJcbiAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCByZW1vdmVTaGlwKTtcclxuICAgdXBkYXRlUGxheWVyQm9hcmQoKTtcclxuICAgYnV0dG9uc0NvbnRhaW5lci5wYXJlbnRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgIFsuLi5idXR0b25zQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uXCIpXS5mb3JFYWNoKFxyXG4gICAgICAoYnV0dG9uKSA9PiAoYnV0dG9uLmRpc2FibGVkID0gZmFsc2UpXHJcbiAgICk7XHJcbiAgIFsuLi5zaGlwVGFibGVDb3VudGVyc10uZm9yRWFjaCgoY291bnRlcikgPT4gKGNvdW50ZXIudGV4dENvbnRlbnQgPSBcIjBcIikpO1xyXG4gICBzdGFydEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgIHN0YXJ0QnRuLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG59XHJcbi8vIHRoaXMgZmlsZSB3b3VsZCBicmluZyB0aGUgY3NzIGZpbGUgYW5kIGRvbSBmdW5jdGlvbmFsaXR5XHJcbiIsImNvbnN0IFNoaXAgPSBmdW5jdGlvbiAobGVuZ3RoLCBjb29yZGluYXRlcykge1xyXG4gICBsZXQgX2Nvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXMgfHwgbnVsbDtcclxuICAgbGV0IF9sZW5ndGggPSBsZW5ndGggfHwgMjtcclxuICAgbGV0IF9oaXRzQ291bnRlciA9IDA7XHJcblxyXG4gICBjb25zdCBnZXRDb29ycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX2Nvb3JkaW5hdGVzKSk7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBnZXRMZW5ndGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBfbGVuZ3RoO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgZ2V0SGl0cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF9oaXRzQ291bnRlcjtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGhpdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgX2hpdHNDb3VudGVyKys7XHJcbiAgICAgIHJldHVybiBfaGl0c0NvdW50ZXI7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBpc1N1bmsgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBfaGl0c0NvdW50ZXIgPT09IGxlbmd0aDtcclxuICAgfTtcclxuXHJcbiAgIHJldHVybiB7XHJcbiAgICAgIGdldENvb3JzLFxyXG4gICAgICBnZXRMZW5ndGgsXHJcbiAgICAgIGdldEhpdHMsXHJcbiAgICAgIGhpdCxcclxuICAgICAgaXNTdW5rLFxyXG4gICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggIzFjYjUxNztcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogIzFjYjUxNztcXG4gIG1hcmdpbjogMTZweDtcXG59XFxuXFxub2wsIHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbmJsb2NrcXVvdGUsIHEge1xcbiAgcXVvdGVzOiBub25lO1xcbn1cXG5cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGNvbnRlbnQ6IG5vbmU7XFxufVxcblxcbnRhYmxlIHtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDtcXG59XFxuXFxucCB7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbn1cXG5cXG4uaW5zdHJ1Y3Rpb25zIHtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgbWFyZ2luLXRvcDogM3JlbTtcXG59XFxuLmluc3RydWN0aW9ucyBoMSB7XFxuICBmb250LXNpemU6IDEuNHJlbTtcXG59XFxuLmluc3RydWN0aW9ucyBoMiB7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG59XFxuLmluc3RydWN0aW9ucyBoMSwgLmluc3RydWN0aW9ucyBoMiB7XFxuICBtYXJnaW46IDFyZW0gMDtcXG59XFxuLmluc3RydWN0aW9ucyBoMTpmaXJzdC1jaGlsZCwgLmluc3RydWN0aW9ucyBoMjpmaXJzdC1jaGlsZCB7XFxuICBtYXJnaW4tdG9wOiAwO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGxpIHtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgbGk6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi5ib2FyZC1zZWN0aW9uIHtcXG4gIG1hcmdpbi1ib3R0b206IDNyZW07XFxufVxcbi5ib2FyZC1zZWN0aW9uID4gaDEge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweCBhdXRvO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogNXB4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxuICBncmlkLWNvbHVtbjogMjtcXG4gIGdyaWQtcm93OiAxO1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbCB7XFxuICBib3JkZXItdG9wOiBub25lO1xcbiAgYm9yZGVyLXJpZ2h0OiBub25lO1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIxXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjJcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiM1xcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg0KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI0XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDUpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjVcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNlxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg3KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI3XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDgpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjhcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiOVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxMCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMTBcXFwiO1xcbn1cXG5cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogNXB4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4O1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxuICBncmlkLWNvbHVtbjogMTtcXG4gIGdyaWQtcm93OiAyO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlci10b3A6IG5vbmU7XFxuICBib3JkZXItYm90dG9tOiBub25lO1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImFcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgyKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJiXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiY1xcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDQpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImRcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg1KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJlXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZlxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDcpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImdcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg4KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJoXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiaVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEwKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJqXFxcIjtcXG59XFxuXFxuLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmRfX2JvYXJkIHtcXG4gIGdyaWQtcm93OiAyO1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiA1cHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG59XFxuLmJvYXJkX19ib2FyZCAuYm9hcmRfX2NlbGw6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuXFxuI2Vycm9yLW1lc3NhZ2Uge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgZ3JpZC1jb2x1bW46IDEvLTE7XFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcXG59XFxuXFxuLnBsYXllci1idXR0b25zIHVsIHtcXG4gIG1hcmdpbjogMnJlbSAwO1xcbn1cXG4ucGxheWVyLWJ1dHRvbnMgdWwgbGkge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG5cXG4uc2hpcHMtdGFibGUge1xcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXG59XFxuLnNoaXBzLXRhYmxlIHRhYmxlIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxufVxcbi5zaGlwcy10YWJsZSB0ZCwgLnNoaXBzLXRhYmxlIHRoIHtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxufVxcblxcbiNzdGFydC1idXR0b24ge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4ucmVzZXQtY29udGFpbmVyIHtcXG4gIGZvbnQtc2l6ZTogMSwgNXJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbjogM3JlbSAwO1xcbn1cXG4ucmVzZXQtY29udGFpbmVyIHAge1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuLmJ1dHRvbiB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICMxY2I1MTc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiAjMWNiNTE3O1xcbiAgcGFkZGluZzogMC41cmVtIDAuOHJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLmJ1dHRvbi0taGlnaGxpZ2h0ZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLmJ1dHRvbjpkaXNhYmxlZCB7XFxuICBvcGFjaXR5OiAwLjQ7XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogODAwcHgpIHtcXG4gIC5wbGF5ZXItYm9hcmQge1xcbiAgICBtYXgtd2lkdGg6IDEyMDBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGNvbHVtbi1nYXA6IDFyZW07XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICB9XFxuICAucGxheWVyLWJvYXJkIGgxIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEvLTE7XFxuICAgIGdyaWQtcm93OiAxO1xcbiAgfVxcbiAgLnBsYXllci1ib2FyZCAuYm9hcmQge1xcbiAgICBncmlkLWNvbHVtbjogMi8zO1xcbiAgICBncmlkLXJvdzogMjtcXG4gIH1cXG4gIC5wbGF5ZXItYm9hcmQgLnBsYXllci1idXR0b25zIHtcXG4gICAgZ3JpZC1jb2x1bW46IDMvNDtcXG4gICAgZ3JpZC1yb3c6IDI7XFxuICB9XFxuXFxuICAucGxheWVyLWJ1dHRvbnMgdWwge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG1hcmdpbi1ib3R0b206IDJyZW07XFxuICB9XFxuICAucGxheWVyLWJ1dHRvbnMgdWwgbGkge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gIH1cXG4gIC5wbGF5ZXItYnV0dG9ucyAuYnV0dG9uIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDExMDBweCkge1xcbiAgLmluc3RydWN0aW9ucyB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgbWF4LXdpZHRoOiAyODBweDtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBib3R0b206IDE2cHg7XFxuICAgIGxlZnQ6IDE2cHg7XFxuICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19yZXNldC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9zdHlsZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX3ZhcmlhYmxlcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9faW5zdHJ1Y3Rpb25zLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19ib2FyZC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fYnV0dG9ucy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fbWVkaWEtcXVlcmllcy5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FBQTtBQU1BOzs7Ozs7Ozs7Ozs7O0VBYUMsU0FBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSx3QkFBQTtBQ0REOztBREdBLGdEQUFBO0FBQ0E7O0VBRUMsY0FBQTtBQ0FEOztBREVBO0VBQ0Msc0JBQUE7RUFDRSw2QkFBQTtFQUNGLGNBQUE7RUFDRSx1QkFBQTtFQUNBLGNFcENLO0VGcUNQLFlBQUE7QUNDRDs7QURDQTtFQUNDLGdCQUFBO0FDRUQ7O0FEQUE7RUFDQyxZQUFBO0FDR0Q7O0FEREE7O0VBRUMsV0FBQTtFQUNBLGFBQUE7QUNJRDs7QURGQTtFQUNDLHlCQUFBO0VBQ0EsaUJBQUE7QUNLRDs7QURIQTtFQUNDLGdCQUFBO0FDTUQ7O0FFM0RBO0VBQ0csYUFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7QUY4REg7QUU3REc7RUFDRyxpQkFBQTtBRitETjtBRTdERztFQUNHLGlCQUFBO0FGK0ROO0FFN0RHO0VBQ0csY0FBQTtBRitETjtBRTdERztFQUNHLGFBQUE7QUYrRE47QUU3REc7RUFDRyxtQkFBQTtBRitETjtBRTlETTtFQUNHLFNBQUE7QUZnRVQ7O0FHaEZBO0VBQ0csbUJBQUE7QUhtRkg7QUdsRkc7RUFDRyxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7QUhvRk47O0FHakZBO0VBQ0csZUFBQTtFQUNBLGFBQUE7RUFDQSxnQ0FBQTtFQUNBLHVCQUFBO0FIb0ZIOztBR2xGQTtFQUNHLGFBQUE7RUFDQSxRQUFBO0VBQ0EsdUNBQUE7RUFDQSxvQkFwQlM7RUFxQlQsY0FBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0FIcUZIO0FHcEZHO0VBQ0csZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FIc0ZOO0FHbkZTO0VBQ0csWUFBQTtBSHFGWjtBR3RGUztFQUNHLFlBQUE7QUh3Rlo7QUd6RlM7RUFDRyxZQUFBO0FIMkZaO0FHNUZTO0VBQ0csWUFBQTtBSDhGWjtBRy9GUztFQUNHLFlBQUE7QUhpR1o7QUdsR1M7RUFDRyxZQUFBO0FIb0daO0FHckdTO0VBQ0csWUFBQTtBSHVHWjtBR3hHUztFQUNHLFlBQUE7QUgwR1o7QUczR1M7RUFDRyxZQUFBO0FINkdaO0FHOUdTO0VBQ0csYUFBQTtBSGdIWjs7QUczR0E7RUFDRyxhQUFBO0VBQ0EsUUFBQTtFQUNBLDJCQXhDUztFQXlDVCxvQkF6Q1M7RUEwQ1QsY0FBQTtFQUNBLFdBQUE7QUg4R0g7QUc3R0c7RUFDRyxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUgrR047QUcxR1M7RUFDRyxZQUFBO0FINEdaO0FHN0dTO0VBQ0csWUFBQTtBSCtHWjtBR2hIUztFQUNHLFlBQUE7QUhrSFo7QUduSFM7RUFDRyxZQUFBO0FIcUhaO0FHdEhTO0VBQ0csWUFBQTtBSHdIWjtBR3pIUztFQUNHLFlBQUE7QUgySFo7QUc1SFM7RUFDRyxZQUFBO0FIOEhaO0FHL0hTO0VBQ0csWUFBQTtBSGlJWjtBR2xJUztFQUNHLFlBQUE7QUhvSVo7QUdySVM7RUFDRyxZQUFBO0FIdUlaOztBR2xJQTtFQUNHLHlCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUhxSUg7O0FHbklBO0VBQ0csV0FBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLFFBQUE7RUFDQSx1Q0FBQTtFQUNBLG9CQXRFUztBSDRNWjtBR3BJTTtFQUNHLHlCRjVFRDtFRTZFQyxZQUFBO0FIc0lUOztBR2xJQTtFQUNHLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUhxSUg7O0FHbElHO0VBQ0csY0FBQTtBSHFJTjtBR25JRztFQUNHLHFCQUFBO0VBQ0EscUJBQUE7QUhxSU47O0FHbElBO0VBQ0csbUJBQUE7QUhxSUg7QUduSUc7RUFDRyx5QkFBQTtBSHFJTjtBR25JRztFQUNHLGVBQUE7RUFDQSx5QkFBQTtBSHFJTjs7QUdsSUE7RUFDRyxrQkFBQTtBSHFJSDs7QUduSUE7RUFDRyxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBSHNJSDtBR3JJRztFQUNHLG1CQUFBO0FIdUlOOztBSXhQQTtFQUNHLHNCQUFBO0VBQ0EsNkJBQUE7RUFDQSx1QkFBQTtFQUNBLGNITks7RUdPTCxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtBSjJQSDtBSTFQRztFQUNHLHlCSFhFO0VHWUYsWUFBQTtBSjRQTjtBSTFQRztFQUNHLHlCSGZFO0VHZ0JGLFlBQUE7QUo0UE47QUkxUEc7RUFDRyxZQUFBO0FKNFBOOztBSy9RQTtFQUNHO0lBQ0csaUJBQUE7SUFDQSxjQUFBO0lBQ0EsYUFBQTtJQUNBLGdCQUFBO0lBQ0EscUNBQUE7RUxrUko7RUtqUkk7SUFDRyxpQkFBQTtJQUNBLFdBQUE7RUxtUlA7RUtqUkk7SUFDRyxnQkFBQTtJQUNBLFdBQUE7RUxtUlA7RUtqUkk7SUFDRyxnQkFBQTtJQUNBLFdBQUE7RUxtUlA7O0VLL1FJO0lBQ0csU0FBQTtJQUNBLG1CQUFBO0VMa1JQO0VLaFJJO0lBQ0csY0FBQTtFTGtSUDtFS2hSSTtJQUNHLGNBQUE7SUFDQSxXQUFBO0VMa1JQO0FBQ0Y7QUsvUUE7RUFDRztJQUNHLFNBQUE7SUFDQSxnQkFBQTtJQUNBLGVBQUE7SUFDQSxZQUFBO0lBQ0EsVUFBQTtFTGlSSjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcclxcbiAgIHYyLjAgfCAyMDExMDEyNlxcclxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxyXFxuKi9cXHJcXG5AdXNlICcuL3ZhcmlhYmxlcycgYXMgKjtcXHJcXG5cXHJcXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxyXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcclxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXHJcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxyXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXHJcXG5iLCB1LCBpLCBjZW50ZXIsXFxyXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXHJcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXHJcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXHJcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXHJcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXHJcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcclxcblxcdG1hcmdpbjogMDtcXHJcXG5cXHRwYWRkaW5nOiAwO1xcclxcblxcdGJvcmRlcjogMDtcXHJcXG5cXHRmb250LXNpemU6IDEwMCU7XFxyXFxuXFx0Zm9udDogaW5oZXJpdDtcXHJcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXHJcXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXHJcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcclxcblxcdGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5ib2R5IHtcXHJcXG5cXHRmb250LWZhbWlseTogbW9ub3NwYWNlO1xcclxcbiAgIHRleHQtc2hhZG93OiAwIDAgMTBweCAkZ3JlZW47XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxyXFxuICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxyXFxuICAgY29sb3I6ICRncmVlbjtcXHJcXG5cXHRtYXJnaW46IDE2cHg7XFxyXFxufVxcclxcbm9sLCB1bCB7XFxyXFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZSwgcSB7XFxyXFxuXFx0cXVvdGVzOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXHJcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxyXFxuXFx0Y29udGVudDogJyc7XFxyXFxuXFx0Y29udGVudDogbm9uZTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVxcclxcbnAge1xcclxcblxcdGxpbmUtaGVpZ2h0OiAxLjU7XFxyXFxufVwiLFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCxcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICMxY2I1MTc7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6ICMxY2I1MTc7XFxuICBtYXJnaW46IDE2cHg7XFxufVxcblxcbm9sLCB1bCB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG5ibG9ja3F1b3RlLCBxIHtcXG4gIHF1b3Rlczogbm9uZTtcXG59XFxuXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBjb250ZW50OiBub25lO1xcbn1cXG5cXG50YWJsZSB7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XFxufVxcblxcbnAge1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG59XFxuXFxuLmluc3RydWN0aW9ucyB7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIG1hcmdpbi10b3A6IDNyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgaDEge1xcbiAgZm9udC1zaXplOiAxLjRyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgaDIge1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgaDEsIC5pbnN0cnVjdGlvbnMgaDIge1xcbiAgbWFyZ2luOiAxcmVtIDA7XFxufVxcbi5pbnN0cnVjdGlvbnMgaDE6Zmlyc3QtY2hpbGQsIC5pbnN0cnVjdGlvbnMgaDI6Zmlyc3QtY2hpbGQge1xcbiAgbWFyZ2luLXRvcDogMDtcXG59XFxuLmluc3RydWN0aW9ucyBsaSB7XFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGxpOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4uYm9hcmQtc2VjdGlvbiB7XFxuICBtYXJnaW4tYm90dG9tOiAzcmVtO1xcbn1cXG4uYm9hcmQtc2VjdGlvbiA+IGgxIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHggYXV0bztcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDVweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xcbiAgZ3JpZC1jb2x1bW46IDI7XFxuICBncmlkLXJvdzogMTtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICBtYXJnaW4tbGVmdDogMTBweDtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGwge1xcbiAgYm9yZGVyLXRvcDogbm9uZTtcXG4gIGJvcmRlci1yaWdodDogbm9uZTtcXG4gIGJvcmRlci1sZWZ0OiBub25lO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgyKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIyXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDMpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjNcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNFxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg1KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI1XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDYpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjZcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiN1xcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg4KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI4XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDkpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjlcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMTApOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjEwXFxcIjtcXG59XFxuXFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDVweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweDtcXG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xcbiAgZ3JpZC1jb2x1bW46IDE7XFxuICBncmlkLXJvdzogMjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbCB7XFxuICBib3JkZXItdG9wOiBub25lO1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gIGJvcmRlci1sZWZ0OiBub25lO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJhXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiYlxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDMpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImNcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg0KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJkXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDYpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImZcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg3KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJnXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiaFxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDkpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImlcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxMCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwialxcXCI7XFxufVxcblxcbi5ib2FyZF9fY2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkX19ib2FyZCB7XFxuICBncmlkLXJvdzogMjtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogNXB4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxufVxcbi5ib2FyZF9fYm9hcmQgLmJvYXJkX19jZWxsOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcblxcbiNlcnJvci1tZXNzYWdlIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGdyaWQtY29sdW1uOiAxLy0xO1xcbiAgbWFyZ2luLXRvcDogMXJlbTtcXG4gIG1hcmdpbi1sZWZ0OiAwLjVyZW07XFxufVxcblxcbi5wbGF5ZXItYnV0dG9ucyB1bCB7XFxuICBtYXJnaW46IDJyZW0gMDtcXG59XFxuLnBsYXllci1idXR0b25zIHVsIGxpIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcXG59XFxuXFxuLnNoaXBzLXRhYmxlIHtcXG4gIG1hcmdpbi1ib3R0b206IDJyZW07XFxufVxcbi5zaGlwcy10YWJsZSB0YWJsZSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbn1cXG4uc2hpcHMtdGFibGUgdGQsIC5zaGlwcy10YWJsZSB0aCB7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbn1cXG5cXG4jc3RhcnQtYnV0dG9uIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuXFxuLnJlc2V0LWNvbnRhaW5lciB7XFxuICBmb250LXNpemU6IDEsIDVyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW46IDNyZW0gMDtcXG59XFxuLnJlc2V0LWNvbnRhaW5lciBwIHtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbi5idXR0b24ge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gIHRleHQtc2hhZG93OiAwIDAgMTBweCAjMWNiNTE3O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogIzFjYjUxNztcXG4gIHBhZGRpbmc6IDAuNXJlbSAwLjhyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbi5idXR0b24tLWhpZ2hsaWdodGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbi5idXR0b246ZGlzYWJsZWQge1xcbiAgb3BhY2l0eTogMC40O1xcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDgwMHB4KSB7XFxuICAucGxheWVyLWJvYXJkIHtcXG4gICAgbWF4LXdpZHRoOiAxMjAwcHg7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBjb2x1bW4tZ2FwOiAxcmVtO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgfVxcbiAgLnBsYXllci1ib2FyZCBoMSB7XFxuICAgIGdyaWQtY29sdW1uOiAxLy0xO1xcbiAgICBncmlkLXJvdzogMTtcXG4gIH1cXG4gIC5wbGF5ZXItYm9hcmQgLmJvYXJkIHtcXG4gICAgZ3JpZC1jb2x1bW46IDIvMztcXG4gICAgZ3JpZC1yb3c6IDI7XFxuICB9XFxuICAucGxheWVyLWJvYXJkIC5wbGF5ZXItYnV0dG9ucyB7XFxuICAgIGdyaWQtY29sdW1uOiAzLzQ7XFxuICAgIGdyaWQtcm93OiAyO1xcbiAgfVxcblxcbiAgLnBsYXllci1idXR0b25zIHVsIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xcbiAgfVxcbiAgLnBsYXllci1idXR0b25zIHVsIGxpIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICB9XFxuICAucGxheWVyLWJ1dHRvbnMgLmJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5pbnN0cnVjdGlvbnMge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG1heC13aWR0aDogMjgwcHg7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYm90dG9tOiAxNnB4O1xcbiAgICBsZWZ0OiAxNnB4O1xcbiAgfVxcbn1cIixcIiRncmVlbjogIzFjYjUxNztcIixcIkB1c2UgJy4vdmFyaWFibGVzJyBhcyAqO1xcclxcblxcclxcbi5pbnN0cnVjdGlvbnMge1xcclxcbiAgIHBhZGRpbmc6IDFyZW07XFxyXFxuICAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xcclxcbiAgIG1hcmdpbi10b3A6IDNyZW07XFxyXFxuICAgaDEge1xcclxcbiAgICAgIGZvbnQtc2l6ZTogMS40cmVtO1xcclxcbiAgIH1cXHJcXG4gICBoMiB7XFxyXFxuICAgICAgZm9udC1zaXplOiAxLjJyZW07XFxyXFxuICAgfVxcclxcbiAgIGgxLCBoMiB7XFxyXFxuICAgICAgbWFyZ2luOiAxcmVtIDA7XFxyXFxuICAgfVxcclxcbiAgIGgxOmZpcnN0LWNoaWxkLCBoMjpmaXJzdC1jaGlsZCB7XFxyXFxuICAgICAgbWFyZ2luLXRvcDogMDtcXHJcXG4gICB9XFxyXFxuICAgbGkge1xcclxcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICAgICAgJjpsYXN0LWNoaWxkIHtcXHJcXG4gICAgICAgICBtYXJnaW46IDA7XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XCIsXCJAdXNlICdzYXNzOmxpc3QnO1xcclxcbkB1c2UgJy4vdmFyaWFibGVzJyBhcyAqO1xcclxcblxcclxcbiRjZWxsV2lkdGg6IDMwcHg7XFxyXFxuXFxyXFxuLmJvYXJkLXNlY3Rpb24ge1xcclxcbiAgIG1hcmdpbi1ib3R0b206IDNyZW07XFxyXFxuICAgJiA+IGgxIHtcXHJcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXHJcXG4gICAgICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gICB9XFxyXFxufVxcclxcbi5ib2FyZCB7XFxyXFxuICAgZm9udC1zaXplOiAxOHB4O1xcclxcbiAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAkY2VsbFdpZHRoIGF1dG87XFxyXFxuICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIge1xcclxcbiAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgZ2FwOiA1cHg7XFxyXFxuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsICRjZWxsV2lkdGgpO1xcclxcbiAgIGdyaWQtYXV0by1yb3dzOiAkY2VsbFdpZHRoO1xcclxcbiAgIGdyaWQtY29sdW1uOiAyO1xcclxcbiAgIGdyaWQtcm93OiAxO1xcclxcbiAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxyXFxuICAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxyXFxuICAgLmJvYXJkX19jZWxsIHtcXHJcXG4gICAgICBib3JkZXItdG9wOiBub25lO1xcclxcbiAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcXHJcXG4gICAgICBib3JkZXItbGVmdDogbm9uZTtcXHJcXG5cXHJcXG4gICAgICBAZm9yICRpIGZyb20gMSB0aHJvdWdoIDEwIHtcXHJcXG4gICAgICAgICAmOm50aC1jaGlsZCgjeyRpfSk6OmJlZm9yZSB7XFxyXFxuICAgICAgICAgICAgY29udGVudDogJyN7JGl9JzsgXFxyXFxuICAgICAgICAgfVxcclxcbiAgICAgIH1cXHJcXG4gICB9XFxyXFxufVxcclxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciB7XFxyXFxuICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICBnYXA6IDVweDtcXHJcXG4gICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6ICRjZWxsV2lkdGg7XFxyXFxuICAgZ3JpZC1hdXRvLXJvd3M6ICRjZWxsV2lkdGg7XFxyXFxuICAgZ3JpZC1jb2x1bW46IDE7XFxyXFxuICAgZ3JpZC1yb3c6IDI7XFxyXFxuICAgLmJvYXJkX19jZWxsIHtcXHJcXG4gICAgICBib3JkZXItdG9wOiBub25lO1xcclxcbiAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XFxyXFxuICAgICAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxyXFxuXFxyXFxuICAgICAgJGxldHRlcnM6ICdhJywnYicsJ2MnLCdkJywnZScsJ2YnLCdnJywnaCcsJ2knLCdqJztcXHJcXG5cXHJcXG4gICAgICBAZm9yICRpIGZyb20gMSB0aHJvdWdoIDEwIHtcXHJcXG4gICAgICAgICAmOm50aC1jaGlsZCgjeyRpfSk6OmJlZm9yZSB7XFxyXFxuICAgICAgICAgICAgY29udGVudDogJyN7bGlzdC5udGgoJGxldHRlcnMsICRpKX0nOyBcXHJcXG4gICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XFxyXFxuLmJvYXJkX19jZWxsIHtcXHJcXG4gICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XFxyXFxuICAgZGlzcGxheTogZmxleDtcXHJcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG4uYm9hcmRfX2JvYXJkIHtcXHJcXG4gICBncmlkLXJvdzogMjtcXHJcXG4gICBtYXJnaW4tbGVmdDogMTBweDtcXHJcXG4gICBkaXNwbGF5OiBncmlkO1xcclxcbiAgIGdhcDogNXB4O1xcclxcbiAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAkY2VsbFdpZHRoKTtcXHJcXG4gICBncmlkLWF1dG8tcm93czogJGNlbGxXaWR0aDtcXHJcXG4gICAuYm9hcmRfX2NlbGwge1xcclxcbiAgICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRncmVlbjtcXHJcXG4gICAgICAgICBjb2xvcjogYmxhY2s7XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XFxyXFxuI2Vycm9yLW1lc3NhZ2Uge1xcclxcbiAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gICBncmlkLWNvbHVtbjogMSAvIC0xO1xcclxcbiAgIG1hcmdpbi10b3A6IDFyZW07XFxyXFxuICAgbWFyZ2luLWxlZnQ6IC41cmVtO1xcclxcbn1cXHJcXG4ucGxheWVyLWJ1dHRvbnMge1xcclxcbiAgIHVsIHtcXHJcXG4gICAgICBtYXJnaW46IDJyZW0gMDtcXHJcXG4gICB9XFxyXFxuICAgdWwgbGkge1xcclxcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgICBtYXJnaW4tYm90dG9tOiAuNXJlbTtcXHJcXG4gICB9XFxyXFxufVxcclxcbi5zaGlwcy10YWJsZSB7XFxyXFxuICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXHJcXG5cXHJcXG4gICB0YWJsZSB7XFxyXFxuICAgICAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xcclxcbiAgIH1cXHJcXG4gICB0ZCwgdGgge1xcclxcbiAgICAgIHBhZGRpbmc6IC41cmVtO1xcclxcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICRncmVlbjtcXHJcXG4gICB9XFxyXFxufVxcclxcbiNzdGFydC1idXR0b24ge1xcclxcbiAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXHJcXG59XFxyXFxuLnJlc2V0LWNvbnRhaW5lciB7XFxyXFxuICAgZm9udC1zaXplOiAxLDVyZW07XFxyXFxuICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgIG1hcmdpbjogM3JlbSAwO1xcclxcbiAgIHAge1xcclxcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICAgfVxcclxcbn1cIixcIkB1c2UgJy4vdmFyaWFibGVzJyBhcyAqO1xcclxcblxcclxcbi5idXR0b24ge1xcclxcbiAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxyXFxuICAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICRncmVlbjtcXHJcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXHJcXG4gICBjb2xvcjogJGdyZWVuO1xcclxcbiAgIHBhZGRpbmc6IC41cmVtIC44cmVtO1xcclxcbiAgIGJvcmRlcjogMXB4IHNvbGlkICRncmVlbjtcXHJcXG4gICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgJjpob3ZlciB7XFxyXFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGdyZWVuO1xcclxcbiAgICAgIGNvbG9yOiBibGFjaztcXHJcXG4gICB9XFxyXFxuICAgJi0taGlnaGxpZ2h0ZWQge1xcclxcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRncmVlbjtcXHJcXG4gICAgICBjb2xvcjogYmxhY2s7XFxyXFxuICAgfVxcclxcbiAgICY6ZGlzYWJsZWQge1xcclxcbiAgICAgIG9wYWNpdHk6IC40O1xcclxcbiAgIH1cXHJcXG59XCIsXCJAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDgwMHB4KSB7XFxyXFxuICAgLnBsYXllci1ib2FyZCB7XFxyXFxuICAgICAgbWF4LXdpZHRoOiAxMjAwcHg7XFxyXFxuICAgICAgbWFyZ2luOiAwIGF1dG87XFxyXFxuICAgICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgICBjb2x1bW4tZ2FwOiAxcmVtO1xcclxcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxyXFxuICAgICAgaDEge1xcclxcbiAgICAgICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxyXFxuICAgICAgICAgZ3JpZC1yb3c6IDE7XFxyXFxuICAgICAgfVxcclxcbiAgICAgIC5ib2FyZCB7XFxyXFxuICAgICAgICAgZ3JpZC1jb2x1bW46IDIgLyAzO1xcclxcbiAgICAgICAgIGdyaWQtcm93OiAyO1xcclxcbiAgICAgIH1cXHJcXG4gICAgICAucGxheWVyLWJ1dHRvbnMge1xcclxcbiAgICAgICAgIGdyaWQtY29sdW1uOiAzIC8gNDtcXHJcXG4gICAgICAgICBncmlkLXJvdzogMjtcXHJcXG4gICAgICB9XFxyXFxuICAgfVxcclxcbiAgIC5wbGF5ZXItYnV0dG9ucyB7XFxyXFxuICAgICAgdWwge1xcclxcbiAgICAgICAgIG1hcmdpbjogMDtcXHJcXG4gICAgICAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xcclxcbiAgICAgIH1cXHJcXG4gICAgICB1bCBsaSB7XFxyXFxuICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgICAgfVxcclxcbiAgICAgIC5idXR0b24ge1xcclxcbiAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgIH1cXHJcXG4gICB9XFxyXFxufVxcclxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTEwMHB4KSB7XFxyXFxuICAgLmluc3RydWN0aW9ucyB7XFxyXFxuICAgICAgbWFyZ2luOiAwO1xcclxcbiAgICAgIG1heC13aWR0aDogMjgwcHg7XFxyXFxuICAgICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICAgIGJvdHRvbTogMTZweDtcXHJcXG4gICAgICBsZWZ0OiAxNnB4O1xcclxcbiAgIH1cXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiR2FtZWJvYXJkIiwiR2FtZSIsIl93aW5uZXJNZXNzYWdlIiwiX2NhbkdhbWVTdGFydCIsIl9jb21wdXRlckJvYXJkIiwicGxheWVyQm9hcmQiLCJnZXRDb21wdXRlckJvYXJkIiwiZ2V0Qm9hcmQiLCJpbml0IiwicGxhY2VFbmVteUFybXkiLCJ0eXBlIiwicm93IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY29sdW1uIiwibGVuZ3RoIiwiZGlyZWN0aW9uIiwicGxhY2VTaGlwIiwiZSIsIm1lc3NhZ2UiLCJpbmNsdWRlcyIsImlzQXJteUNvbXBsZXRlIiwiY29tcHV0ZXJTaGlwc0luZm8iLCJnZXRTaGlwcyIsInRha2VUdXJuIiwiY2VsbCIsImF0dGFja1BsYXllciIsInJlY2VpdmVBdHRhY2siLCJhbGxTaGlwc1N1bmsiLCJnZXRXaW5uZXIiLCJyZXNldCIsInVuZGVmaW5lZCIsIlNoaXAiLCJfYm9hcmQiLCJfc2hpcHMiLCJ0eXBlMSIsInNoaXBzIiwibWF4IiwidHlwZTIiLCJ0eXBlMyIsInR5cGU0IiwicHVzaCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInNoaXBzQ2xvbmUiLCJrZXkiLCJmb3JFYWNoIiwic2hpcCIsImNsb25lIiwiZ2V0TGVuZ3RoIiwiZ2V0Q29vcnMiLCJpIiwiZ2V0SGl0cyIsImhpdCIsImdldEJvYXJkQW5kU2hpcHMiLCJib2FyZENvcHkiLCJjdXJyZW50U2hpcCIsInNoaXBDb29ycyIsImNvb3JzIiwiY29vcmRpbmF0ZXMiLCJpc05hTiIsIk51bWJlciIsIkVycm9yIiwic2hpcENvb3JkaW5hdGVzIiwiY29vcnNDb3B5IiwiY3VycmVudENvb3IiLCJuZXdTaGlwIiwibmV3U2hpcENvb3JzIiwiZXJyb3JNc2ciLCJyZW1vdmVTaGlwIiwiZmlsdGVyZWRTaGlwcyIsImoiLCJmaWx0ZXIiLCJzaGlwc0xvb3AiLCJyZXN1bHRNc2ciLCJyZWR1Y2UiLCJhY2MiLCJjdXJyZW50Iiwic2xpY2UiLCJzeW1ib2wiLCJ0eXBlTG9vcCIsImlzU3VuayIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjcHVCb2FyZCIsImJ1dHRvbnNDb250YWluZXIiLCJzaGlwVGFibGVDb3VudGVycyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJlcnJvck1lc3NhZ2UiLCJzdGFydEJ0biIsInBsYXllckJvYXJkQ2VsbHMiLCJjcHVCb2FyZENlbGxzIiwic2hpcHNJbmZvIiwicHJldmlvdXNDbGlja2VkQnRuIiwiY3VycmVudENlbGwiLCJjZWxsc1RvSGlnaGxpZ2h0IiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImRhdGFzZXQiLCJmaWxsZWQiLCJhcHBlbmQiLCJjbG9uZU5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlQ2xpY2tlZEJ1dHRvbnMiLCJzaG93UHJldmlld0hhbmRsZXIiLCJyZW1vdmVTaGlwUHJldmlldyIsInBsYWNlTmV3U2hpcCIsIndpbmRvdyIsImNoYW5nZU9yaWVudGF0aW9uIiwiaW5pdGlhbGl6ZUdhbWUiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJpZCIsInNob3dTaGlwUHJldmlldyIsIm5vZGUiLCJsZW5ndGhMb29wIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsImJvcmRlckNvbG9yIiwidGV4dENvbnRlbnQiLCJkaXNhYmxlZCIsInVwZGF0ZVBsYXllckJvYXJkIiwidXBkYXRlU2hpcHNUYWJsZSIsInZpc2liaWxpdHkiLCJib2FyZCIsInNlYXJjaCIsImluZGV4IiwibXNnIiwic2hpcEJ1dHRvbnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicHJldmVudERlZmF1bHQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicGFyZW50RWxlbWVudCIsImRpc3BsYXkiLCJhdHRhY2tDcHVCb2FyZCIsInR1cm5SZXN1bHQiLCJ1cGRhdGVDcHVCb2FyZCIsInAiLCJidXR0b24iLCJib2R5IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJhZnRlciIsInJlc2V0R2FtZSIsIm5leHRFbGVtZW50U2libGluZyIsImNvdW50ZXIiLCJfY29vcmRpbmF0ZXMiLCJfbGVuZ3RoIiwiX2hpdHNDb3VudGVyIl0sInNvdXJjZVJvb3QiOiIifQ==