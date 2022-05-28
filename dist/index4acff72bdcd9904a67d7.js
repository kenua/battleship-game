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
    var symbol = "M";

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
            symbol = "H";
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
      if (board[_row2][_cell2].search(/[ABCDHM]/) >= 0) {
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
      if (board[_row4][_cell4].search(/[HM]/) >= 0) {
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
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  line-height: 1;\n  background-color: black;\n  color: #1cb517;\n  margin: 16px;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\np {\n  line-height: 1.5;\n}\n\n.instructions {\n  padding: 1rem;\n  border: 1px solid #1cb517;\n  margin-top: 3rem;\n}\n.instructions h1 {\n  font-size: 1.4rem;\n}\n.instructions h2 {\n  font-size: 1.2rem;\n}\n.instructions h1, .instructions h2 {\n  margin: 1rem 0;\n}\n.instructions h1:first-child, .instructions h2:first-child {\n  margin-top: 0;\n}\n.instructions li {\n  margin-bottom: 1rem;\n}\n.instructions li:last-child {\n  margin: 0;\n}\n\n.board-container h1 {\n  text-align: center;\n  text-transform: uppercase;\n  font-size: 1.5rem;\n  margin-bottom: 1rem;\n}\n\n.board {\n  font-size: 18px;\n  display: grid;\n  grid-template-columns: 30px auto;\n  justify-content: center;\n}\n\n.board__letters-container {\n  display: grid;\n  gap: 3px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n  grid-column: 2;\n  grid-row: 1;\n}\n.board__letters-container .board__cell {\n  border: none;\n}\n.board__letters-container .board__cell:nth-child(1)::before {\n  content: \"1\";\n}\n.board__letters-container .board__cell:nth-child(2)::before {\n  content: \"2\";\n}\n.board__letters-container .board__cell:nth-child(3)::before {\n  content: \"3\";\n}\n.board__letters-container .board__cell:nth-child(4)::before {\n  content: \"4\";\n}\n.board__letters-container .board__cell:nth-child(5)::before {\n  content: \"5\";\n}\n.board__letters-container .board__cell:nth-child(6)::before {\n  content: \"6\";\n}\n.board__letters-container .board__cell:nth-child(7)::before {\n  content: \"7\";\n}\n.board__letters-container .board__cell:nth-child(8)::before {\n  content: \"8\";\n}\n.board__letters-container .board__cell:nth-child(9)::before {\n  content: \"9\";\n}\n.board__letters-container .board__cell:nth-child(10)::before {\n  content: \"10\";\n}\n\n.board__digits-container {\n  display: grid;\n  gap: 3px;\n  grid-template-columns: 30px;\n  grid-auto-rows: 30px;\n  grid-column: 1;\n  grid-row: 2;\n}\n.board__digits-container .board__cell {\n  border: none;\n}\n.board__digits-container .board__cell:nth-child(1)::before {\n  content: \"a\";\n}\n.board__digits-container .board__cell:nth-child(2)::before {\n  content: \"b\";\n}\n.board__digits-container .board__cell:nth-child(3)::before {\n  content: \"c\";\n}\n.board__digits-container .board__cell:nth-child(4)::before {\n  content: \"d\";\n}\n.board__digits-container .board__cell:nth-child(5)::before {\n  content: \"e\";\n}\n.board__digits-container .board__cell:nth-child(6)::before {\n  content: \"f\";\n}\n.board__digits-container .board__cell:nth-child(7)::before {\n  content: \"g\";\n}\n.board__digits-container .board__cell:nth-child(8)::before {\n  content: \"h\";\n}\n.board__digits-container .board__cell:nth-child(9)::before {\n  content: \"i\";\n}\n.board__digits-container .board__cell:nth-child(10)::before {\n  content: \"j\";\n}\n\n.board__cell {\n  border: 1px solid #1cb517;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.board__board {\n  grid-row: 2;\n  display: grid;\n  gap: 3px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n}\n.board__board .board__cell:hover {\n  background-color: #1cb517;\n  color: black;\n}\n\n#error-message {\n  font-size: 1rem;\n  text-align: center;\n  max-width: 500px;\n  grid-column: 1/-1;\n  margin-top: 1rem;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 0 1rem;\n}\n\n#cpu-board-container {\n  display: none;\n  margin-top: 2rem;\n}\n\n.player-buttons ul {\n  text-align: center;\n  margin: 2rem 0;\n}\n.player-buttons ul li {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\n.ships-table {\n  font-size: 1rem;\n  border: 1px solid #1cb517;\n  margin-bottom: 2rem;\n  margin-left: auto;\n  margin-right: auto;\n}\n.ships-table td, .ships-table th {\n  padding: 0.5rem;\n  border: 1px solid #1cb517;\n}\n\n#start-button {\n  visibility: hidden;\n}\n\n.reset-container {\n  font-size: 1, 5rem;\n  text-align: center;\n  margin: 3rem 0;\n}\n.reset-container p {\n  margin-bottom: 1rem;\n}\n\n.button {\n  font-family: monospace;\n  font-size: 1rem;\n  text-shadow: 0 0 10px #1cb517;\n  background-color: black;\n  color: #1cb517;\n  padding: 0.5rem 0.8rem;\n  border: 1px solid #1cb517;\n  cursor: pointer;\n}\n.button:hover {\n  background-color: #1cb517;\n  color: black;\n}\n.button--highlighted {\n  background-color: #1cb517;\n  color: black;\n}\n.button:disabled {\n  opacity: 0.4;\n}\n\n@media only screen and (min-width: 1000px) {\n  .grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n  }\n\n  .ships-table {\n    width: 100%;\n  }\n\n  #cpu-board-container {\n    margin-top: 0;\n  }\n\n  .player-buttons ul {\n    margin: 0;\n    margin-bottom: 2rem;\n  }\n  .player-buttons ul li {\n    display: block;\n  }\n  .player-buttons .button {\n    display: block;\n    width: 100%;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/_reset.scss","webpack://./src/scss/styles.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_instructions.scss","webpack://./src/scss/_board.scss","webpack://./src/scss/_buttons.scss","webpack://./src/scss/_media-queries.scss"],"names":[],"mappings":"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","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n@use './variables' as *;\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, center,\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed, \r\nfigure, figcaption, footer, header, hgroup, \r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tfont-size: 100%;\r\n\tfont: inherit;\r\n\tvertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure, \r\nfooter, header, hgroup, menu, nav, section {\r\n\tdisplay: block;\r\n}\r\nbody {\r\n\tfont-family: monospace;\r\n   text-shadow: 0 0 10px $green;\r\n\tline-height: 1;\r\n   background-color: black;\r\n   color: $green;\r\n\tmargin: 16px;\r\n}\r\nol, ul {\r\n\tlist-style: none;\r\n}\r\nblockquote, q {\r\n\tquotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n\tcontent: '';\r\n\tcontent: none;\r\n}\r\ntable {\r\n\tborder-collapse: collapse;\r\n\tborder-spacing: 0;\r\n}\r\np {\r\n\tline-height: 1.5;\r\n}","/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  line-height: 1;\n  background-color: black;\n  color: #1cb517;\n  margin: 16px;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\np {\n  line-height: 1.5;\n}\n\n.instructions {\n  padding: 1rem;\n  border: 1px solid #1cb517;\n  margin-top: 3rem;\n}\n.instructions h1 {\n  font-size: 1.4rem;\n}\n.instructions h2 {\n  font-size: 1.2rem;\n}\n.instructions h1, .instructions h2 {\n  margin: 1rem 0;\n}\n.instructions h1:first-child, .instructions h2:first-child {\n  margin-top: 0;\n}\n.instructions li {\n  margin-bottom: 1rem;\n}\n.instructions li:last-child {\n  margin: 0;\n}\n\n.board-container h1 {\n  text-align: center;\n  text-transform: uppercase;\n  font-size: 1.5rem;\n  margin-bottom: 1rem;\n}\n\n.board {\n  font-size: 18px;\n  display: grid;\n  grid-template-columns: 30px auto;\n  justify-content: center;\n}\n\n.board__letters-container {\n  display: grid;\n  gap: 3px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n  grid-column: 2;\n  grid-row: 1;\n}\n.board__letters-container .board__cell {\n  border: none;\n}\n.board__letters-container .board__cell:nth-child(1)::before {\n  content: \"1\";\n}\n.board__letters-container .board__cell:nth-child(2)::before {\n  content: \"2\";\n}\n.board__letters-container .board__cell:nth-child(3)::before {\n  content: \"3\";\n}\n.board__letters-container .board__cell:nth-child(4)::before {\n  content: \"4\";\n}\n.board__letters-container .board__cell:nth-child(5)::before {\n  content: \"5\";\n}\n.board__letters-container .board__cell:nth-child(6)::before {\n  content: \"6\";\n}\n.board__letters-container .board__cell:nth-child(7)::before {\n  content: \"7\";\n}\n.board__letters-container .board__cell:nth-child(8)::before {\n  content: \"8\";\n}\n.board__letters-container .board__cell:nth-child(9)::before {\n  content: \"9\";\n}\n.board__letters-container .board__cell:nth-child(10)::before {\n  content: \"10\";\n}\n\n.board__digits-container {\n  display: grid;\n  gap: 3px;\n  grid-template-columns: 30px;\n  grid-auto-rows: 30px;\n  grid-column: 1;\n  grid-row: 2;\n}\n.board__digits-container .board__cell {\n  border: none;\n}\n.board__digits-container .board__cell:nth-child(1)::before {\n  content: \"a\";\n}\n.board__digits-container .board__cell:nth-child(2)::before {\n  content: \"b\";\n}\n.board__digits-container .board__cell:nth-child(3)::before {\n  content: \"c\";\n}\n.board__digits-container .board__cell:nth-child(4)::before {\n  content: \"d\";\n}\n.board__digits-container .board__cell:nth-child(5)::before {\n  content: \"e\";\n}\n.board__digits-container .board__cell:nth-child(6)::before {\n  content: \"f\";\n}\n.board__digits-container .board__cell:nth-child(7)::before {\n  content: \"g\";\n}\n.board__digits-container .board__cell:nth-child(8)::before {\n  content: \"h\";\n}\n.board__digits-container .board__cell:nth-child(9)::before {\n  content: \"i\";\n}\n.board__digits-container .board__cell:nth-child(10)::before {\n  content: \"j\";\n}\n\n.board__cell {\n  border: 1px solid #1cb517;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.board__board {\n  grid-row: 2;\n  display: grid;\n  gap: 3px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n}\n.board__board .board__cell:hover {\n  background-color: #1cb517;\n  color: black;\n}\n\n#error-message {\n  font-size: 1rem;\n  text-align: center;\n  max-width: 500px;\n  grid-column: 1/-1;\n  margin-top: 1rem;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 0 1rem;\n}\n\n#cpu-board-container {\n  display: none;\n  margin-top: 2rem;\n}\n\n.player-buttons ul {\n  text-align: center;\n  margin: 2rem 0;\n}\n.player-buttons ul li {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\n.ships-table {\n  font-size: 1rem;\n  border: 1px solid #1cb517;\n  margin-bottom: 2rem;\n  margin-left: auto;\n  margin-right: auto;\n}\n.ships-table td, .ships-table th {\n  padding: 0.5rem;\n  border: 1px solid #1cb517;\n}\n\n#start-button {\n  visibility: hidden;\n}\n\n.reset-container {\n  font-size: 1, 5rem;\n  text-align: center;\n  margin: 3rem 0;\n}\n.reset-container p {\n  margin-bottom: 1rem;\n}\n\n.button {\n  font-family: monospace;\n  font-size: 1rem;\n  text-shadow: 0 0 10px #1cb517;\n  background-color: black;\n  color: #1cb517;\n  padding: 0.5rem 0.8rem;\n  border: 1px solid #1cb517;\n  cursor: pointer;\n}\n.button:hover {\n  background-color: #1cb517;\n  color: black;\n}\n.button--highlighted {\n  background-color: #1cb517;\n  color: black;\n}\n.button:disabled {\n  opacity: 0.4;\n}\n\n@media only screen and (min-width: 1000px) {\n  .grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n  }\n\n  .ships-table {\n    width: 100%;\n  }\n\n  #cpu-board-container {\n    margin-top: 0;\n  }\n\n  .player-buttons ul {\n    margin: 0;\n    margin-bottom: 2rem;\n  }\n  .player-buttons ul li {\n    display: block;\n  }\n  .player-buttons .button {\n    display: block;\n    width: 100%;\n  }\n}","$green: #1cb517;","@use './variables' as *;\r\n\r\n.instructions {\r\n   padding: 1rem;\r\n   border: 1px solid $green;\r\n   margin-top: 3rem;\r\n   h1 {\r\n      font-size: 1.4rem;\r\n   }\r\n   h2 {\r\n      font-size: 1.2rem;\r\n   }\r\n   h1, h2 {\r\n      margin: 1rem 0;\r\n   }\r\n   h1:first-child, h2:first-child {\r\n      margin-top: 0;\r\n   }\r\n   li {\r\n      margin-bottom: 1rem;\r\n      &:last-child {\r\n         margin: 0;\r\n      }\r\n   }\r\n}","@use 'sass:list';\r\n@use './variables' as *;\r\n\r\n$cellWidth: 30px;\r\n\r\n.board-container {\r\n   h1 {\r\n      text-align: center;\r\n      text-transform: uppercase;\r\n      font-size: 1.5rem;\r\n      margin-bottom: 1rem;\r\n   }\r\n}\r\n.board {\r\n   font-size: 18px;\r\n   display: grid;\r\n   grid-template-columns: $cellWidth auto;\r\n   justify-content: center;\r\n}\r\n.board__letters-container {\r\n   display: grid;\r\n   gap: 3px;\r\n   grid-template-columns: repeat(10, $cellWidth);\r\n   grid-auto-rows: $cellWidth;\r\n   grid-column: 2;\r\n   grid-row: 1;\r\n   .board__cell {\r\n      border: none;\r\n\r\n      @for $i from 1 through 10 {\r\n         &:nth-child(#{$i})::before {\r\n            content: '#{$i}'; \r\n         }\r\n      }\r\n   }\r\n}\r\n.board__digits-container {\r\n   display: grid;\r\n   gap: 3px;\r\n   grid-template-columns: $cellWidth;\r\n   grid-auto-rows: $cellWidth;\r\n   grid-column: 1;\r\n   grid-row: 2;\r\n   .board__cell {\r\n      border: none;\r\n\r\n      $letters: 'a','b','c','d','e','f','g','h','i','j';\r\n\r\n      @for $i from 1 through 10 {\r\n         &:nth-child(#{$i})::before {\r\n            content: '#{list.nth($letters, $i)}'; \r\n         }\r\n      }\r\n   }\r\n}\r\n.board__cell {\r\n   border: 1px solid $green;\r\n   display: flex;\r\n   justify-content: center;\r\n   align-items: center;\r\n}\r\n.board__board {\r\n   grid-row: 2;\r\n   display: grid;\r\n   gap: 3px;\r\n   grid-template-columns: repeat(10, $cellWidth);\r\n   grid-auto-rows: $cellWidth;\r\n   .board__cell {\r\n      &:hover {\r\n         background-color: $green;\r\n         color: black;\r\n      }\r\n   }\r\n}\r\n#error-message {\r\n   font-size: 1rem;\r\n   text-align: center;\r\n   max-width: 500px;\r\n   grid-column: 1 / -1;\r\n   margin-top: 1rem;\r\n   margin-left: auto;\r\n   margin-right: auto;\r\n   padding: 0 1rem;\r\n}\r\n#cpu-board-container {\r\n   display: none;\r\n   margin-top: 2rem;\r\n}\r\n.player-buttons {\r\n   ul {\r\n      text-align: center;\r\n      margin: 2rem 0;\r\n   }\r\n   ul li {\r\n      display: inline-block;\r\n      margin-bottom: .5rem;\r\n   }\r\n}\r\n.ships-table {\r\n   font-size: 1rem;\r\n   border: 1px solid $green;\r\n   margin-bottom: 2rem;\r\n   margin-left: auto;\r\n   margin-right: auto;\r\n\r\n   td, th {\r\n      padding: .5rem;\r\n      border: 1px solid $green;\r\n   }\r\n}\r\n#start-button {\r\n   visibility: hidden;\r\n}\r\n.reset-container {\r\n   font-size: 1,5rem;\r\n   text-align: center;\r\n   margin: 3rem 0;\r\n   p {\r\n      margin-bottom: 1rem;\r\n   }\r\n}","@use './variables' as *;\r\n\r\n.button {\r\n   font-family: monospace;\r\n   font-size: 1rem;\r\n   text-shadow: 0 0 10px $green;\r\n   background-color: black;\r\n   color: $green;\r\n   padding: .5rem .8rem;\r\n   border: 1px solid $green;\r\n   cursor: pointer;\r\n   &:hover {\r\n      background-color: $green;\r\n      color: black;\r\n   }\r\n   &--highlighted {\r\n      background-color: $green;\r\n      color: black;\r\n   }\r\n   &:disabled {\r\n      opacity: .4;\r\n   }\r\n}","@media only screen and (min-width: 1000px) {\r\n   .grid {\r\n      display: grid;\r\n      grid-template-columns: 1fr 1fr;\r\n   }\r\n   .ships-table {\r\n      width: 100%;\r\n   }\r\n   #cpu-board-container {\r\n      margin-top: 0;\r\n   }\r\n   .player-buttons {\r\n      ul {\r\n         margin: 0;\r\n         margin-bottom: 2rem;\r\n      }\r\n      ul li {\r\n         display: block;\r\n      }\r\n      .button {\r\n         display: block;\r\n         width: 100%;\r\n      }\r\n   }\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXg0YWNmZjcyYmRjZDk5MDRhNjdkNy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBLElBQU1DLElBQUksR0FBSSxZQUFZO0VBQ3ZCLElBQUlDLGNBQUo7O0VBQ0EsSUFBSUMsYUFBYSxHQUFHLEtBQXBCOztFQUNBLElBQUlDLGNBQWMsR0FBR0oseURBQVMsRUFBOUI7O0VBQ0EsSUFBSUssV0FBVyxHQUFHTCx5REFBUyxFQUEzQjs7RUFFQSxJQUFNTSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLEdBQVk7SUFDbEMsT0FBT0YsY0FBYyxDQUFDRyxRQUFmLEVBQVA7RUFDRixDQUZEOztFQUlBLElBQU1DLElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQVk7SUFDdEIsSUFBSUMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFVQyxJQUFWLEVBQWdCO01BQ2xDLElBQUk7UUFDRDtRQUNBLElBQUlDLEdBQUcsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQixFQUEzQixDQUFWO1FBQ0EsSUFBSUMsTUFBTSxHQUFHSCxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWdCLEVBQTNCLENBQWI7UUFDQSxJQUFJRSxNQUFNLEdBQUdOLElBQUksQ0FBQ00sTUFBbEI7UUFDQSxJQUFJQyxTQUFTLEdBQUdMLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0IsQ0FBM0IsTUFBa0MsQ0FBbEMsR0FBc0MsS0FBdEMsR0FBOEMsSUFBOUQ7O1FBRUFWLGNBQWMsQ0FBQ2MsU0FBZixDQUF5QixDQUFDUCxHQUFELEVBQU1JLE1BQU4sQ0FBekIsRUFBd0NDLE1BQXhDLEVBQWdEQyxTQUFoRDs7UUFDQVIsY0FBYyxDQUFDQyxJQUFELENBQWQ7TUFDRixDQVRELENBU0UsT0FBT1MsQ0FBUCxFQUFVO1FBQ1QsSUFBSSxDQUFDQSxDQUFDLENBQUNDLE9BQUYsQ0FBVUMsUUFBVixDQUFtQiwwQkFBbkIsQ0FBTCxFQUFxRDtVQUNsRFosY0FBYyxDQUFDQyxJQUFELENBQWQ7UUFDRixDQUZELE1BRU87VUFDSixPQUFPLFVBQVA7UUFDRjtNQUNIO0lBQ0gsQ0FqQkQsQ0FEc0IsQ0FvQnRCOzs7SUFDQSxJQUFJLENBQUNOLGNBQWMsQ0FBQ2tCLGNBQWYsRUFBTCxFQUFzQztNQUNuQyxJQUFJQyxpQkFBaUIsR0FBR25CLGNBQWMsQ0FBQ29CLFFBQWYsRUFBeEI7O01BRUEsS0FBSyxJQUFJZCxJQUFULElBQWlCYSxpQkFBakIsRUFBb0M7UUFDakNkLGNBQWMsQ0FBQ2MsaUJBQWlCLENBQUNiLElBQUQsQ0FBbEIsQ0FBZDtNQUNGO0lBQ0g7O0lBRUQsSUFBSUwsV0FBVyxDQUFDaUIsY0FBWixFQUFKLEVBQWtDO01BQy9CbkIsYUFBYSxHQUFHLElBQWhCO01BQ0EsS0FBS0UsV0FBTCxDQUFpQmEsU0FBakIsR0FBNkIsSUFBN0I7TUFDQSxLQUFLYixXQUFMLENBQWlCb0IsVUFBakIsR0FBOEIsSUFBOUI7TUFDQSxPQUFPLElBQVA7SUFDRixDQUxELE1BS087TUFDSixPQUFPLEtBQVA7SUFDRjtFQUNILENBckNEOztFQXVDQSxJQUFNQyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFVZixHQUFWLEVBQWVnQixJQUFmLEVBQXFCO0lBQUE7O0lBQ25DLElBQUksQ0FBQ3hCLGFBQUwsRUFBb0IsT0FBTyxJQUFQOztJQUVwQixJQUFJLENBQUNELGNBQUwsRUFBcUI7TUFDbEIsSUFBSTBCLFlBQVksR0FBRyxTQUFmQSxZQUFlLEdBQU07UUFDdEIsSUFBSTtVQUNELElBQUlqQixJQUFHLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0IsRUFBM0IsQ0FBVjs7VUFDQSxJQUFJYSxLQUFJLEdBQUdmLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0IsRUFBM0IsQ0FBWDs7VUFFQSxLQUFJLENBQUNULFdBQUwsQ0FBaUJ3QixhQUFqQixDQUErQmxCLElBQS9CLEVBQW9DZ0IsS0FBcEM7UUFDRixDQUxELENBS0UsT0FBT1IsQ0FBUCxFQUFVO1VBQ1QsSUFDR0EsQ0FBQyxDQUFDQyxPQUFGLENBQVVDLFFBQVYsQ0FDRyxnREFESCxDQURILEVBSUU7WUFDQ08sWUFBWTtVQUNkO1FBQ0g7TUFDSCxDQWZELENBRGtCLENBa0JsQjs7O01BQ0F4QixjQUFjLENBQUN5QixhQUFmLENBQTZCbEIsR0FBN0IsRUFBa0NnQixJQUFsQzs7TUFFQSxJQUFJdkIsY0FBYyxDQUFDMEIsWUFBZixFQUFKLEVBQW1DO1FBQ2hDNUIsY0FBYyxHQUFHLHNCQUFqQjtRQUNBLE9BQU9BLGNBQVA7TUFDRixDQXhCaUIsQ0EwQmxCOzs7TUFDQTBCLFlBQVk7O01BRVosSUFBSSxLQUFLdkIsV0FBTCxDQUFpQnlCLFlBQWpCLEVBQUosRUFBcUM7UUFDbEM1QixjQUFjLEdBQUcsd0JBQWpCO1FBQ0EsT0FBT0EsY0FBUDtNQUNGOztNQUVELE9BQU8sSUFBUDtJQUNGOztJQUVELE9BQU9BLGNBQVA7RUFDRixDQXpDRDs7RUEyQ0EsSUFBTTZCLFNBQVMsR0FBRyxTQUFaQSxTQUFZLEdBQVk7SUFDM0IsT0FBTzdCLGNBQVA7RUFDRixDQUZEOztFQUlBLElBQU04QixLQUFLLEdBQUcsU0FBUkEsS0FBUSxHQUFZO0lBQ3ZCOUIsY0FBYyxHQUFHK0IsU0FBakI7SUFDQTlCLGFBQWEsR0FBRyxLQUFoQjtJQUNBQyxjQUFjLEdBQUdKLHlEQUFTLEVBQTFCO0lBQ0EsS0FBS0ssV0FBTCxHQUFtQkwseURBQVMsRUFBNUI7RUFDRixDQUxEOztFQU9BLE9BQU87SUFDSkssV0FBVyxFQUFYQSxXQURJO0lBRUpDLGdCQUFnQixFQUFoQkEsZ0JBRkk7SUFHSkUsSUFBSSxFQUFKQSxJQUhJO0lBSUprQixRQUFRLEVBQVJBLFFBSkk7SUFLSkssU0FBUyxFQUFUQSxTQUxJO0lBTUpDLEtBQUssRUFBTEE7RUFOSSxDQUFQO0FBUUYsQ0EvR1ksRUFBYjs7QUFpSEEsaUVBQWUvQixJQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25IQTs7QUFFQSxJQUFNRCxTQUFTLEdBQUcsU0FBWkEsU0FBWSxHQUFZO0VBQzNCLElBQUltQyxNQUFNLEdBQUcsRUFBYjtFQUNBLElBQUlDLE1BQU0sR0FBRztJQUNWQyxLQUFLLEVBQUU7TUFBRUMsS0FBSyxFQUFFLEVBQVQ7TUFBYXRCLE1BQU0sRUFBRSxDQUFyQjtNQUF3QnVCLEdBQUcsRUFBRSxDQUE3QjtNQUFnQ0MsTUFBTSxFQUFFO0lBQXhDLENBREc7SUFFVkMsS0FBSyxFQUFFO01BQUVILEtBQUssRUFBRSxFQUFUO01BQWF0QixNQUFNLEVBQUUsQ0FBckI7TUFBd0J1QixHQUFHLEVBQUUsQ0FBN0I7TUFBZ0NDLE1BQU0sRUFBRTtJQUF4QyxDQUZHO0lBR1ZFLEtBQUssRUFBRTtNQUFFSixLQUFLLEVBQUUsRUFBVDtNQUFhdEIsTUFBTSxFQUFFLENBQXJCO01BQXdCdUIsR0FBRyxFQUFFLENBQTdCO01BQWdDQyxNQUFNLEVBQUU7SUFBeEMsQ0FIRztJQUlWRyxLQUFLLEVBQUU7TUFBRUwsS0FBSyxFQUFFLEVBQVQ7TUFBYXRCLE1BQU0sRUFBRSxDQUFyQjtNQUF3QnVCLEdBQUcsRUFBRSxDQUE3QjtNQUFnQ0MsTUFBTSxFQUFFO0lBQXhDO0VBSkcsQ0FBYixDQUYyQixDQVMzQjs7RUFDQSxLQUFLLElBQUk3QixHQUFHLEdBQUcsQ0FBZixFQUFrQkEsR0FBRyxHQUFHLEVBQXhCLEVBQTRCQSxHQUFHLEVBQS9CLEVBQW1DO0lBQ2hDd0IsTUFBTSxDQUFDUyxJQUFQLENBQVksRUFBWjs7SUFFQSxLQUFLLElBQUlqQixJQUFJLEdBQUcsQ0FBaEIsRUFBbUJBLElBQUksR0FBRyxFQUExQixFQUE4QkEsSUFBSSxFQUFsQyxFQUFzQztNQUNuQ1EsTUFBTSxDQUFDeEIsR0FBRCxDQUFOLENBQVlpQyxJQUFaLENBQWlCLEdBQWpCO0lBQ0Y7RUFDSDs7RUFFRCxJQUFNckMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBWTtJQUMxQixPQUFPc0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsU0FBTCxDQUFlWixNQUFmLENBQVgsQ0FBUDtFQUNGLENBRkQ7O0VBSUEsSUFBTVgsUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBWTtJQUMxQixJQUFJd0IsVUFBVSxHQUFHLEVBQWpCOztJQUQwQiwyQkFHakJDLEdBSGlCO01BSXZCRCxVQUFVLENBQUNDLEdBQUQsQ0FBVixHQUFrQixFQUFsQjtNQUNBRCxVQUFVLENBQUNDLEdBQUQsQ0FBVixDQUFnQlgsS0FBaEIsR0FBd0IsRUFBeEI7TUFDQVUsVUFBVSxDQUFDQyxHQUFELENBQVYsQ0FBZ0JqQyxNQUFoQixHQUF5Qm9CLE1BQU0sQ0FBQ2EsR0FBRCxDQUFOLENBQVlqQyxNQUFyQztNQUNBZ0MsVUFBVSxDQUFDQyxHQUFELENBQVYsQ0FBZ0JWLEdBQWhCLEdBQXNCSCxNQUFNLENBQUNhLEdBQUQsQ0FBTixDQUFZVixHQUFsQzs7TUFFQUgsTUFBTSxDQUFDYSxHQUFELENBQU4sQ0FBWVgsS0FBWixDQUFrQlksT0FBbEIsQ0FBMEIsVUFBQ0MsSUFBRCxFQUFVO1FBQ2pDLElBQUlDLEtBQUssR0FBR2xCLG9EQUFJLENBQUNpQixJQUFJLENBQUNFLFNBQUwsRUFBRCxFQUFtQkYsSUFBSSxDQUFDRyxRQUFMLEVBQW5CLENBQWhCOztRQUVBLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0osSUFBSSxDQUFDSyxPQUFMLEVBQXBCLEVBQW9DRCxDQUFDLEVBQXJDLEVBQXlDO1VBQ3RDSCxLQUFLLENBQUNLLEdBQU47UUFDRjs7UUFFRFQsVUFBVSxDQUFDQyxHQUFELENBQVYsQ0FBZ0JYLEtBQWhCLENBQXNCTSxJQUF0QixDQUEyQlEsS0FBM0I7TUFDRixDQVJEO0lBVHVCOztJQUcxQixLQUFLLElBQUlILEdBQVQsSUFBZ0JiLE1BQWhCLEVBQXdCO01BQUEsTUFBZmEsR0FBZTtJQWV2Qjs7SUFFRCxPQUFPRCxVQUFQO0VBQ0YsQ0FyQkQ7O0VBdUJBLElBQU1VLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsR0FBWTtJQUNsQyxJQUFJQyxTQUFTLEdBQUcsS0FBS3BELFFBQUwsRUFBaEI7O0lBRGtDLDZCQUd6QkcsSUFIeUI7TUFJL0IsS0FBSyxJQUFJNkMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR25CLE1BQU0sQ0FBQzFCLElBQUQsQ0FBTixDQUFhNEIsS0FBYixDQUFtQnRCLE1BQXZDLEVBQStDdUMsQ0FBQyxFQUFoRCxFQUFvRDtRQUNqRCxJQUFJSyxXQUFXLEdBQUd4QixNQUFNLENBQUMxQixJQUFELENBQU4sQ0FBYTRCLEtBQWIsQ0FBbUJpQixDQUFuQixDQUFsQjtRQUNBLElBQUlNLFNBQVMsR0FBR0QsV0FBVyxDQUFDTixRQUFaLEVBQWhCO1FBRUFPLFNBQVMsQ0FBQ1gsT0FBVixDQUFrQixVQUFDWSxLQUFELEVBQVc7VUFDMUIsNEJBQW9CQSxLQUFwQjtVQUFBLElBQUtuRCxHQUFMO1VBQUEsSUFBVUksTUFBVjs7VUFFQSxJQUFJNEMsU0FBUyxDQUFDaEQsR0FBRCxDQUFULENBQWVJLE1BQWYsTUFBMkIsR0FBL0IsRUFBb0M7WUFDakM0QyxTQUFTLENBQUNoRCxHQUFELENBQVQsQ0FBZUksTUFBZixJQUF5QnFCLE1BQU0sQ0FBQzFCLElBQUQsQ0FBTixDQUFhOEIsTUFBdEM7VUFDRjtRQUNILENBTkQ7TUFPRjtJQWY4Qjs7SUFHbEMsS0FBSyxJQUFJOUIsSUFBVCxJQUFpQjBCLE1BQWpCLEVBQXlCO01BQUEsT0FBaEIxQixJQUFnQjtJQWF4Qjs7SUFFRCxPQUFPaUQsU0FBUDtFQUNGLENBbkJEOztFQXFCQSxJQUFNekMsU0FBUyxHQUFHLFNBQVpBLFNBQVksR0FBdUQ7SUFBQSxJQUE3QzZDLFdBQTZDLHVFQUEvQixDQUFDLENBQUQsRUFBSSxDQUFKLENBQStCO0lBQUEsSUFBdkIvQyxNQUF1Qix1RUFBZCxDQUFjO0lBQUEsSUFBWEMsU0FBVzs7SUFDdEUsSUFBSStDLEtBQUssQ0FBQ0MsTUFBTSxDQUFDRixXQUFXLENBQUMsQ0FBRCxDQUFaLENBQVAsQ0FBTCxJQUFpQ0MsS0FBSyxDQUFDQyxNQUFNLENBQUNGLFdBQVcsQ0FBQyxDQUFELENBQVosQ0FBUCxDQUExQyxFQUFvRTtNQUNqRSxNQUFNLElBQUlHLEtBQUosQ0FBVSwrQkFBVixDQUFOO0lBQ0Y7O0lBRUQsSUFBSUYsS0FBSyxDQUFDQyxNQUFNLENBQUNqRCxNQUFELENBQVAsQ0FBTCxJQUF5QkEsTUFBTSxHQUFHLENBQWxDLElBQXVDQSxNQUFNLEdBQUcsQ0FBcEQsRUFBdUQ7TUFDcEQsTUFBTSxJQUFJa0QsS0FBSixDQUFVLDJDQUFWLENBQU47SUFDRjs7SUFFRCxJQUFJQyxlQUFlLEdBQUcsb0JBQUtKLFdBQUwsRUFBdEIsQ0FUc0UsQ0FXdEU7O0lBQ0EsS0FBSyxJQUFJUixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHdkMsTUFBTSxHQUFHLENBQTdCLEVBQWdDdUMsQ0FBQyxFQUFqQyxFQUFxQztNQUNsQztNQUNBLElBQUl0QyxTQUFTLEtBQUssS0FBbEIsRUFBeUI7UUFDdEIsSUFBSW1ELFNBQVMsc0JBQU9ELGVBQWUsQ0FBQ1osQ0FBRCxDQUF0QixDQUFiOztRQUNBYSxTQUFTLENBQUMsQ0FBRCxDQUFUO1FBQ0FELGVBQWUsQ0FBQ3ZCLElBQWhCLENBQXFCd0IsU0FBckIsRUFIc0IsQ0FLdEI7TUFDRixDQU5ELE1BTU87UUFDSixJQUFJQSxVQUFTLHNCQUFPRCxlQUFlLENBQUNaLENBQUQsQ0FBdEIsQ0FBYjs7UUFDQWEsVUFBUyxDQUFDLENBQUQsQ0FBVDtRQUNBRCxlQUFlLENBQUN2QixJQUFoQixDQUFxQndCLFVBQXJCO01BQ0Y7SUFDSCxDQXpCcUUsQ0EyQnRFOzs7SUFDQSxLQUFLLElBQUliLEdBQUMsR0FBRyxDQUFiLEVBQWdCQSxHQUFDLEdBQUdZLGVBQWUsQ0FBQ25ELE1BQXBDLEVBQTRDdUMsR0FBQyxFQUE3QyxFQUFpRDtNQUM5QyxJQUFJYyxXQUFXLEdBQUdGLGVBQWUsQ0FBQ1osR0FBRCxDQUFqQztNQUVBLElBQUljLFdBQVcsQ0FBQyxDQUFELENBQVgsR0FBaUIsQ0FBakIsSUFBc0JBLFdBQVcsQ0FBQyxDQUFELENBQVgsR0FBaUIsQ0FBM0MsRUFDRyxNQUFNLElBQUlILEtBQUosQ0FBVSxtQ0FBVixDQUFOO01BQ0gsSUFBSUcsV0FBVyxDQUFDLENBQUQsQ0FBWCxHQUFpQixDQUFqQixJQUFzQkEsV0FBVyxDQUFDLENBQUQsQ0FBWCxHQUFpQixDQUEzQyxFQUNHLE1BQU0sSUFBSUgsS0FBSixDQUFVLG1DQUFWLENBQU47SUFDTDs7SUFFRCxJQUFJSSxPQUFPLEdBQUdwQyxvREFBSSxDQUFDbEIsTUFBRCxFQUFTbUQsZUFBVCxDQUFsQixDQXJDc0UsQ0F1Q3RFOztJQUNBLEtBQUssSUFBSXpELElBQVQsSUFBaUIwQixNQUFqQixFQUF5QjtNQUN0QixJQUFJQSxNQUFNLENBQUMxQixJQUFELENBQU4sQ0FBYU0sTUFBYixLQUF3QnNELE9BQU8sQ0FBQ2pCLFNBQVIsRUFBNUIsRUFBaUQ7UUFDOUMsSUFBSWpCLE1BQU0sQ0FBQzFCLElBQUQsQ0FBTixDQUFhNEIsS0FBYixDQUFtQnRCLE1BQW5CLEdBQTRCb0IsTUFBTSxDQUFDMUIsSUFBRCxDQUFOLENBQWE2QixHQUE3QyxFQUFrRDtVQUMvQztVQUNBO1VBQ0EsS0FBSyxJQUFJN0IsS0FBVCxJQUFpQjBCLE1BQWpCLEVBQXlCO1lBQ3RCQSxNQUFNLENBQUMxQixLQUFELENBQU4sQ0FBYTRCLEtBQWIsQ0FBbUJZLE9BQW5CLENBQTJCLFVBQUNDLElBQUQsRUFBVTtjQUNsQ0EsSUFBSSxDQUFDRyxRQUFMLEdBQWdCSixPQUFoQixDQUF3QixVQUFDVyxTQUFELEVBQWU7Z0JBQ3BDUyxPQUFPLENBQUNoQixRQUFSLEdBQW1CSixPQUFuQixDQUEyQixVQUFDcUIsWUFBRCxFQUFrQjtrQkFDMUMsSUFDR1YsU0FBUyxDQUFDLENBQUQsQ0FBVCxLQUFpQlUsWUFBWSxDQUFDLENBQUQsQ0FBN0IsSUFDQVYsU0FBUyxDQUFDLENBQUQsQ0FBVCxLQUFpQlUsWUFBWSxDQUFDLENBQUQsQ0FGaEMsRUFHRTtvQkFDQyxNQUFNLElBQUlMLEtBQUosQ0FDSCx5Q0FERyxDQUFOO2tCQUdGO2dCQUNILENBVEQ7Y0FVRixDQVhEO1lBWUYsQ0FiRDtVQWNGOztVQUVEOUIsTUFBTSxDQUFDMUIsSUFBRCxDQUFOLENBQWE0QixLQUFiLENBQW1CTSxJQUFuQixDQUF3QjBCLE9BQXhCOztVQUNBLE9BQU8sSUFBUDtRQUNGLENBdEJELE1Bc0JPO1VBQ0osSUFBSUUsUUFBUSwwREFBbUR4RCxNQUFuRCw4QkFBNkVvQixNQUFNLENBQUMxQixJQUFELENBQU4sQ0FBYTZCLEdBQTFGLENBQVo7VUFDQSxNQUFNLElBQUkyQixLQUFKLENBQVVNLFFBQVYsQ0FBTjtRQUNGO01BQ0g7SUFDSDtFQUNILENBdEVEOztFQXdFQSxJQUFNL0MsVUFBVSxHQUFHLFNBQWJBLFVBQWEsR0FBNkI7SUFBQSxJQUFuQmQsR0FBbUIsdUVBQWIsQ0FBYTtJQUFBLElBQVZnQixJQUFVLHVFQUFILENBQUc7SUFDN0MsSUFBSThDLGFBQUo7SUFDQSxJQUFJWCxLQUFKOztJQUVBLEtBQUssSUFBSXBELElBQVQsSUFBaUIwQixNQUFqQixFQUF5QjtNQUFBLDZCQUVGbUIsQ0FGRTtRQUduQixJQUFJSyxXQUFXLEdBQUd4QixNQUFNLENBQUMxQixJQUFELENBQU4sQ0FBYTRCLEtBQWIsQ0FBbUJpQixDQUFuQixDQUFsQjtRQUNBLElBQUlNLFNBQVMsR0FBR0QsV0FBVyxDQUFDTixRQUFaLEVBQWhCOztRQUVBLEtBQUssSUFBSW9CLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdiLFNBQVMsQ0FBQzdDLE1BQTlCLEVBQXNDMEQsQ0FBQyxFQUF2QyxFQUEyQztVQUN4QyxJQUFJYixTQUFTLENBQUNhLENBQUQsQ0FBVCxDQUFhLENBQWIsTUFBb0IvRCxHQUFwQixJQUEyQmtELFNBQVMsQ0FBQ2EsQ0FBRCxDQUFULENBQWEsQ0FBYixNQUFvQi9DLElBQW5ELEVBQXlEO1lBQ3REOEMsYUFBYSxHQUFHckMsTUFBTSxDQUFDMUIsSUFBRCxDQUFOLENBQWE0QixLQUFiLENBQW1CcUMsTUFBbkIsQ0FDYixVQUFDeEIsSUFBRDtjQUFBLE9BQVVBLElBQUksS0FBS1MsV0FBbkI7WUFBQSxDQURhLENBQWhCO1lBR0FFLEtBQUssR0FBR0QsU0FBUjtZQUNBO1VBQ0Y7UUFDSDtNQWRrQjs7TUFDdEI7TUFDQWUsU0FBUyxFQUFFLEtBQUssSUFBSXJCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUduQixNQUFNLENBQUMxQixJQUFELENBQU4sQ0FBYTRCLEtBQWIsQ0FBbUJ0QixNQUF2QyxFQUErQ3VDLENBQUMsRUFBaEQsRUFBb0Q7UUFBQSxrQkFBM0NBLENBQTJDOztRQUFBLGdDQVV0RCxNQUFNcUIsU0FBTjtNQUdSLENBZnFCLENBZ0J0Qjs7O01BQ0EsSUFBSUgsYUFBSixFQUFtQjtRQUNoQixJQUFJSSxTQUFTLEdBQUcsK0NBQWhCO1FBRUFBLFNBQVMsSUFBSWYsS0FBSyxDQUNkZ0IsTUFEUyxDQUVQLFVBQUNDLEdBQUQsRUFBTUMsT0FBTjtVQUFBLE9BQWtCRCxHQUFHLGNBQU9DLE9BQU8sQ0FBQyxDQUFELENBQWQsZUFBc0JBLE9BQU8sQ0FBQyxDQUFELENBQTdCLFFBQXJCO1FBQUEsQ0FGTyxFQUdQLEVBSE8sRUFLVEMsS0FMUyxDQUtILENBTEcsRUFLQSxDQUFDLENBTEQsQ0FBYjtRQU9BN0MsTUFBTSxDQUFDMUIsSUFBRCxDQUFOLENBQWE0QixLQUFiLEdBQXFCbUMsYUFBckI7UUFDQSxPQUFPSSxTQUFQO01BQ0Y7SUFDSDs7SUFFRCxzQ0FBK0JsRSxHQUEvQixjQUFzQ2dCLElBQXRDO0VBQ0YsQ0FyQ0Q7O0VBdUNBLElBQU1MLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsR0FBWTtJQUNoQyxLQUFLLElBQUlaLElBQVQsSUFBaUIwQixNQUFqQixFQUF5QjtNQUN0QixJQUFJQSxNQUFNLENBQUMxQixJQUFELENBQU4sQ0FBYTRCLEtBQWIsQ0FBbUJ0QixNQUFuQixHQUE0Qm9CLE1BQU0sQ0FBQzFCLElBQUQsQ0FBTixDQUFhNkIsR0FBN0MsRUFBa0QsT0FBTyxLQUFQO0lBQ3BEOztJQUVELE9BQU8sSUFBUDtFQUNGLENBTkQ7O0VBUUEsSUFBTVYsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixHQUE2QjtJQUFBLElBQW5CbEIsR0FBbUIsdUVBQWIsQ0FBYTtJQUFBLElBQVZnQixJQUFVLHVFQUFILENBQUc7SUFDaEQsSUFBSWEsTUFBTSxHQUFHLEdBQWI7O0lBRUEsSUFBSTdCLEdBQUcsR0FBRyxDQUFOLElBQVdBLEdBQUcsR0FBRyxDQUFqQixJQUFzQmdCLElBQUksR0FBRyxDQUE3QixJQUFrQ0EsSUFBSSxHQUFHLENBQTdDLEVBQWdEO01BQzdDLE1BQU0sSUFBSXVDLEtBQUosZ0RBQ3FDdkQsR0FEckMsY0FDNENnQixJQUQ1QyxPQUFOO0lBR0Y7O0lBRUQsSUFBSVEsTUFBTSxDQUFDeEIsR0FBRCxDQUFOLENBQVlnQixJQUFaLE1BQXNCLEdBQTFCLEVBQStCO01BQzVCLE1BQU0sSUFBSXVDLEtBQUosNERBQ2lEdkQsR0FEakQsY0FDd0RnQixJQUR4RCxPQUFOO0lBR0YsQ0FiK0MsQ0FlaEQ7OztJQUNBdUQsUUFBUSxFQUFFLEtBQUssSUFBSXhFLElBQVQsSUFBaUIwQixNQUFqQixFQUF5QjtNQUNoQyxLQUFLLElBQUltQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHbkIsTUFBTSxDQUFDMUIsSUFBRCxDQUFOLENBQWE0QixLQUFiLENBQW1CdEIsTUFBdkMsRUFBK0N1QyxDQUFDLEVBQWhELEVBQW9EO1FBQ2pELElBQUlLLFdBQVcsR0FBR3hCLE1BQU0sQ0FBQzFCLElBQUQsQ0FBTixDQUFhNEIsS0FBYixDQUFtQmlCLENBQW5CLENBQWxCO1FBQ0EsSUFBSU0sU0FBUyxHQUFHRCxXQUFXLENBQUNOLFFBQVosRUFBaEI7O1FBRUEsS0FBSyxJQUFJb0IsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2IsU0FBUyxDQUFDN0MsTUFBOUIsRUFBc0MwRCxDQUFDLEVBQXZDLEVBQTJDO1VBQ3hDLElBQUliLFNBQVMsQ0FBQ2EsQ0FBRCxDQUFULENBQWEsQ0FBYixNQUFvQi9ELEdBQXBCLElBQTJCa0QsU0FBUyxDQUFDYSxDQUFELENBQVQsQ0FBYSxDQUFiLE1BQW9CL0MsSUFBbkQsRUFBeUQ7WUFDdERpQyxXQUFXLENBQUNILEdBQVo7WUFDQWpCLE1BQU0sR0FBRyxHQUFUO1lBQ0EsTUFBTTBDLFFBQU47VUFDRjtRQUNIO01BQ0g7SUFDSDs7SUFFRC9DLE1BQU0sQ0FBQ3hCLEdBQUQsQ0FBTixDQUFZZ0IsSUFBWixJQUFvQmEsTUFBcEI7SUFDQSxPQUFPLElBQVA7RUFDRixDQWpDRDs7RUFtQ0EsSUFBTVYsWUFBWSxHQUFHLFNBQWZBLFlBQWUsR0FBWTtJQUM5QixLQUFLLElBQUlwQixJQUFULElBQWlCMEIsTUFBakIsRUFBeUI7TUFDdEIsS0FBSyxJQUFJbUIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR25CLE1BQU0sQ0FBQzFCLElBQUQsQ0FBTixDQUFhNEIsS0FBYixDQUFtQnRCLE1BQXZDLEVBQStDdUMsQ0FBQyxFQUFoRCxFQUFvRDtRQUNqRCxJQUFJLENBQUNuQixNQUFNLENBQUMxQixJQUFELENBQU4sQ0FBYTRCLEtBQWIsQ0FBbUJpQixDQUFuQixFQUFzQjRCLE1BQXRCLEVBQUwsRUFBcUMsT0FBTyxLQUFQO01BQ3ZDO0lBQ0g7O0lBRUQsT0FBTyxJQUFQO0VBQ0YsQ0FSRDs7RUFVQSxPQUFPO0lBQ0o1RSxRQUFRLEVBQVJBLFFBREk7SUFFSmlCLFFBQVEsRUFBUkEsUUFGSTtJQUdKa0MsZ0JBQWdCLEVBQWhCQSxnQkFISTtJQUlKeEMsU0FBUyxFQUFUQSxTQUpJO0lBS0pPLFVBQVUsRUFBVkEsVUFMSTtJQU1KSCxjQUFjLEVBQWRBLGNBTkk7SUFPSk8sYUFBYSxFQUFiQSxhQVBJO0lBUUpDLFlBQVksRUFBWkE7RUFSSSxDQUFQO0FBVUYsQ0FoUEQ7O0FBa1BBLGlFQUFlOUIsU0FBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BQQTtBQUNBO0FBRUEsSUFBTUssV0FBVyxHQUFHK0UsUUFBUSxDQUFDQyxjQUFULENBQXdCLGFBQXhCLENBQXBCO0FBQ0EsSUFBTUMsaUJBQWlCLEdBQUdGLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixxQkFBeEIsQ0FBMUI7QUFDQSxJQUFNRSxRQUFRLEdBQUdILFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixVQUF4QixDQUFqQjtBQUNBLElBQU1HLGdCQUFnQixHQUFHSixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsbUJBQXhCLENBQXpCO0FBQ0EsSUFBTUksaUJBQWlCLEdBQUdMLFFBQVEsQ0FBQ00sc0JBQVQsQ0FBZ0MsZ0JBQWhDLENBQTFCO0FBQ0EsSUFBTUMsWUFBWSxHQUFHUCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsZUFBeEIsQ0FBckI7QUFDQSxJQUFNTyxRQUFRLEdBQUdSLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixjQUF4QixDQUFqQjtBQUVBLElBQU1RLGdCQUFnQixHQUFHLEVBQXpCO0FBQ0EsSUFBTUMsYUFBYSxHQUFHLEVBQXRCO0FBRUEsSUFBSTlFLE1BQU0sR0FBRyxJQUFiO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLFlBQWhCO0FBQ0EsSUFBSThFLFNBQVMsR0FBRyxJQUFoQjtBQUNBLElBQUlDLGtCQUFrQixHQUFHLElBQXpCO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLElBQWxCO0FBQ0EsSUFBSUMsZ0JBQWdCLEdBQUcsRUFBdkIsRUFFQTs7QUFDQSxLQUFLLElBQUl2RixHQUFHLEdBQUcsQ0FBZixFQUFrQkEsR0FBRyxHQUFHLEVBQXhCLEVBQTRCQSxHQUFHLEVBQS9CLEVBQW1DO0VBQ2hDa0YsZ0JBQWdCLENBQUNqRCxJQUFqQixDQUFzQixFQUF0QjtFQUNBa0QsYUFBYSxDQUFDbEQsSUFBZCxDQUFtQixFQUFuQjs7RUFFQSxLQUFLLElBQUlqQixJQUFJLEdBQUcsQ0FBaEIsRUFBbUJBLElBQUksR0FBRyxFQUExQixFQUE4QkEsSUFBSSxFQUFsQyxFQUFzQztJQUNuQyxJQUFJd0UsR0FBRyxHQUFHZixRQUFRLENBQUNnQixhQUFULENBQXVCLEtBQXZCLENBQVY7SUFFQUQsR0FBRyxDQUFDRSxTQUFKLEdBQWdCLGFBQWhCO0lBQ0FGLEdBQUcsQ0FBQ0csT0FBSixDQUFZM0YsR0FBWixHQUFrQkEsR0FBbEI7SUFDQXdGLEdBQUcsQ0FBQ0csT0FBSixDQUFZM0UsSUFBWixHQUFtQkEsSUFBbkI7SUFDQXdFLEdBQUcsQ0FBQ0csT0FBSixDQUFZQyxNQUFaLEdBQXFCLE9BQXJCO0lBQ0FsRyxXQUFXLENBQUNtRyxNQUFaLENBQW1CTCxHQUFuQjtJQUNBTixnQkFBZ0IsQ0FBQ2xGLEdBQUQsQ0FBaEIsQ0FBc0JpQyxJQUF0QixDQUEyQnVELEdBQTNCO0lBRUEsSUFBSS9DLEtBQUssR0FBRytDLEdBQUcsQ0FBQ00sU0FBSixFQUFaO0lBQ0FsQixRQUFRLENBQUNpQixNQUFULENBQWdCcEQsS0FBaEI7SUFDQTBDLGFBQWEsQ0FBQ25GLEdBQUQsQ0FBYixDQUFtQmlDLElBQW5CLENBQXdCUSxLQUF4QjtFQUNGO0FBQ0g7O0FBRURvQyxnQkFBZ0IsQ0FBQ2tCLGdCQUFqQixDQUFrQyxPQUFsQyxFQUEyQ0Msb0JBQTNDO0FBQ0F0RyxXQUFXLENBQUNxRyxnQkFBWixDQUE2QixXQUE3QixFQUEwQ0Usa0JBQTFDO0FBQ0F2RyxXQUFXLENBQUNxRyxnQkFBWixDQUE2QixVQUE3QixFQUF5Q0csaUJBQXpDO0FBQ0F4RyxXQUFXLENBQUNxRyxnQkFBWixDQUE2QixPQUE3QixFQUFzQ0ksWUFBdEM7QUFDQXpHLFdBQVcsQ0FBQ3FHLGdCQUFaLENBQTZCLGFBQTdCLEVBQTRDakYsVUFBNUM7QUFDQXNGLE1BQU0sQ0FBQ0wsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUNNLFVBQW5DO0FBQ0FwQixRQUFRLENBQUNjLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DTyxjQUFuQzs7QUFFQSxTQUFTTixvQkFBVCxDQUE4QnhGLENBQTlCLEVBQWlDO0VBQzlCLElBQUkrRixNQUFNLEdBQUcvRixDQUFDLENBQUMrRixNQUFmLENBRDhCLENBRzlCOztFQUNBLElBQUlBLE1BQU0sQ0FBQ1osT0FBUCxDQUFldEYsTUFBbkIsRUFBMkI7SUFDeEJBLE1BQU0sR0FBRyxDQUFDa0csTUFBTSxDQUFDWixPQUFQLENBQWV0RixNQUF6Qjs7SUFFQSxJQUFJZ0Ysa0JBQUosRUFBd0I7TUFDckJBLGtCQUFrQixDQUFDbUIsU0FBbkIsQ0FBNkJDLE1BQTdCLENBQW9DLHFCQUFwQztJQUNGOztJQUVERixNQUFNLENBQUNDLFNBQVAsQ0FBaUJFLEdBQWpCLENBQXFCLHFCQUFyQjtJQUNBckIsa0JBQWtCLEdBQUdrQixNQUFyQixDQVJ3QixDQVV4QjtFQUNGLENBWEQsTUFXTyxJQUFJQSxNQUFNLENBQUNJLEVBQVAsS0FBYyxrQkFBbEIsRUFBc0M7SUFDMUMsSUFBSXJHLFNBQVMsS0FBSyxZQUFsQixFQUFnQztNQUM3QkEsU0FBUyxHQUFHLFVBQVo7SUFDRixDQUZELE1BRU87TUFDSkEsU0FBUyxHQUFHLFlBQVo7SUFDRjtFQUNIO0FBQ0g7O0FBRUQsU0FBUzJGLGtCQUFULENBQTRCekYsQ0FBNUIsRUFBK0I7RUFDNUJvRyxlQUFlLENBQUNwRyxDQUFDLENBQUMrRixNQUFILENBQWY7QUFDRjs7QUFFRCxTQUFTSyxlQUFULENBQXlCQyxJQUF6QixFQUErQjtFQUM1QixJQUFJeEcsTUFBTSxJQUFJd0csSUFBSSxDQUFDbEIsT0FBTCxDQUFhM0YsR0FBdkIsSUFBOEI2RyxJQUFJLENBQUNsQixPQUFMLENBQWEzRSxJQUEvQyxFQUFxRDtJQUNsRCxvQkFBb0I2RixJQUFJLENBQUNsQixPQUF6QjtJQUFBLElBQU0zRixJQUFOLGlCQUFNQSxHQUFOO0lBQUEsSUFBV2dCLEtBQVgsaUJBQVdBLElBQVg7SUFFQXNFLFdBQVcsR0FBR3VCLElBQWQ7SUFDQTdHLElBQUcsR0FBRyxDQUFDQSxJQUFQO0lBQ0FnQixLQUFJLEdBQUcsQ0FBQ0EsS0FBUixDQUxrRCxDQU9sRDs7SUFDQThGLFVBQVUsRUFBRSxLQUFLLElBQUlsRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHdkMsTUFBcEIsRUFBNEJ1QyxDQUFDLEVBQTdCLEVBQWlDO01BQzFDLElBQUksQ0FBQ3NDLGdCQUFnQixDQUFDbEYsSUFBRCxDQUFqQixJQUEwQixDQUFDa0YsZ0JBQWdCLENBQUNsRixJQUFELENBQWhCLENBQXNCZ0IsS0FBdEIsQ0FBL0IsRUFBNEQ7UUFDekQsTUFBTThGLFVBQU47TUFDRjs7TUFFRHZCLGdCQUFnQixDQUFDdEQsSUFBakIsQ0FBc0JpRCxnQkFBZ0IsQ0FBQ2xGLElBQUQsQ0FBaEIsQ0FBc0JnQixLQUF0QixDQUF0Qjs7TUFDQSxJQUFJVixTQUFTLEtBQUssWUFBbEIsRUFBZ0M7UUFDN0JVLEtBQUk7TUFDTixDQUZELE1BRU87UUFDSmhCLElBQUc7TUFDTDtJQUNILENBbkJpRCxDQXFCbEQ7OztJQUNBLElBQUl1RixnQkFBZ0IsQ0FBQ2xGLE1BQWpCLEdBQTBCQSxNQUE5QixFQUFzQztNQUNuQ2tGLGdCQUFnQixDQUFDaEQsT0FBakIsQ0FBeUIsVUFBQ3ZCLElBQUQsRUFBVTtRQUNoQ0EsSUFBSSxDQUFDK0YsS0FBTCxDQUFXQyxlQUFYLEdBQTZCLFNBQTdCO1FBQ0FoRyxJQUFJLENBQUMrRixLQUFMLENBQVdFLEtBQVgsR0FBbUIsT0FBbkI7UUFDQWpHLElBQUksQ0FBQytGLEtBQUwsQ0FBV0csV0FBWCxHQUF5QixTQUF6QjtNQUNGLENBSkQsRUFEbUMsQ0FPbkM7SUFDRixDQVJELE1BUU87TUFDSjNCLGdCQUFnQixDQUFDaEQsT0FBakIsQ0FBeUIsVUFBQ3ZCLElBQUQsRUFBVTtRQUNoQyxJQUFJQSxJQUFJLENBQUMyRSxPQUFMLENBQWFDLE1BQWIsS0FBd0IsT0FBNUIsRUFBcUM7VUFDbEM1RSxJQUFJLENBQUMrRixLQUFMLENBQVdDLGVBQVgsR0FBNkIsU0FBN0I7VUFDQWhHLElBQUksQ0FBQytGLEtBQUwsQ0FBV0csV0FBWCxHQUF5QixTQUF6QjtRQUNGLENBSEQsTUFHTztVQUNKbEcsSUFBSSxDQUFDK0YsS0FBTCxDQUFXQyxlQUFYLEdBQTZCLFNBQTdCO1VBQ0FoRyxJQUFJLENBQUMrRixLQUFMLENBQVdFLEtBQVgsR0FBbUIsT0FBbkI7VUFDQWpHLElBQUksQ0FBQytGLEtBQUwsQ0FBV0csV0FBWCxHQUF5QixTQUF6QjtRQUNGO01BQ0gsQ0FURDtJQVVGO0VBQ0g7QUFDSDs7QUFFRCxTQUFTaEIsaUJBQVQsR0FBNkI7RUFDMUJYLGdCQUFnQixDQUFDaEQsT0FBakIsQ0FBeUIsVUFBQ3ZCLElBQUQsRUFBVTtJQUNoQ0EsSUFBSSxDQUFDK0YsS0FBTCxDQUFXQyxlQUFYLEdBQTZCLEVBQTdCO0lBQ0FoRyxJQUFJLENBQUMrRixLQUFMLENBQVdFLEtBQVgsR0FBbUIsRUFBbkI7SUFDQWpHLElBQUksQ0FBQytGLEtBQUwsQ0FBV0csV0FBWCxHQUF5QixFQUF6QjtFQUNGLENBSkQ7RUFLQTNCLGdCQUFnQixHQUFHLEVBQW5CO0FBQ0Y7O0FBRUQsU0FBU1ksWUFBVCxDQUFzQjNGLENBQXRCLEVBQXlCO0VBQ3RCLElBQUkrRixNQUFNLEdBQUcvRixDQUFDLENBQUMrRixNQUFmOztFQUVBLElBQUlsRyxNQUFNLElBQUlrRyxNQUFNLENBQUNaLE9BQVAsQ0FBZTNGLEdBQXpCLElBQWdDdUcsTUFBTSxDQUFDWixPQUFQLENBQWUzRSxJQUFuRCxFQUF5RDtJQUN0RG9FLFNBQVMsR0FBRzlGLHFFQUFBLEVBQVo7SUFDQTBGLFlBQVksQ0FBQ21DLFdBQWIsR0FBMkIsRUFBM0IsQ0FGc0QsQ0FFdkI7O0lBRS9CLEtBQUssSUFBSXBILElBQVQsSUFBaUJxRixTQUFqQixFQUE0QjtNQUN6QjtNQUNBLElBQUlBLFNBQVMsQ0FBQ3JGLElBQUQsQ0FBVCxDQUFnQk0sTUFBaEIsS0FBMkJBLE1BQS9CLEVBQXVDO1FBQ3BDLElBQUkrRSxTQUFTLENBQUNyRixJQUFELENBQVQsQ0FBZ0I0QixLQUFoQixDQUFzQnRCLE1BQXRCLEdBQStCK0UsU0FBUyxDQUFDckYsSUFBRCxDQUFULENBQWdCNkIsR0FBbkQsRUFBd0Q7VUFDckQ7VUFDQSxJQUFJO1lBQ0R0QyxzRUFBQSxDQUNHLENBQUMsQ0FBQ2lILE1BQU0sQ0FBQ1osT0FBUCxDQUFlM0YsR0FBakIsRUFBc0IsQ0FBQ3VHLE1BQU0sQ0FBQ1osT0FBUCxDQUFlM0UsSUFBdEMsQ0FESCxFQUVHWCxNQUZILEVBR0dDLFNBQVMsQ0FBQ2dFLEtBQVYsQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsQ0FISDtZQUtBYyxTQUFTLEdBQUc5RixxRUFBQSxFQUFaLENBTkMsQ0FRRDs7WUFDQSxJQUFJOEYsU0FBUyxDQUFDckYsSUFBRCxDQUFULENBQWdCNEIsS0FBaEIsQ0FBc0J0QixNQUF0QixLQUFpQytFLFNBQVMsQ0FBQ3JGLElBQUQsQ0FBVCxDQUFnQjZCLEdBQXJELEVBQTBEO2NBQ3ZEdkIsTUFBTSxHQUFHLElBQVQ7Y0FDQWdGLGtCQUFrQixDQUFDK0IsUUFBbkIsR0FBOEIsSUFBOUI7Y0FDQS9CLGtCQUFrQixDQUFDbUIsU0FBbkIsQ0FBNkJDLE1BQTdCLENBQW9DLHFCQUFwQztZQUNGOztZQUVEWSxpQkFBaUI7WUFDakJuQixpQkFBaUI7WUFDakJvQixnQkFBZ0I7O1lBRWhCLElBQUloSSwyRUFBQSxFQUFKLEVBQXVDO2NBQ3BDMkYsUUFBUSxDQUFDbUMsUUFBVCxHQUFvQixLQUFwQjtjQUNBbkMsUUFBUSxDQUFDOEIsS0FBVCxDQUFlUSxVQUFmLEdBQTRCLFNBQTVCO1lBQ0YsQ0F0QkEsQ0F3QkQ7O1VBQ0YsQ0F6QkQsQ0F5QkUsT0FBTy9HLENBQVAsRUFBVTtZQUNULElBQ0dBLENBQUMsQ0FBQ0MsT0FBRixLQUFjLG1DQUFkLElBQ0FELENBQUMsQ0FBQ0MsT0FBRixLQUFjLHlDQUZqQixFQUdFO2NBQ0N1RSxZQUFZLENBQUNtQyxXQUFiLEdBQTJCLFlBQVkzRyxDQUFDLENBQUNDLE9BQXpDO1lBQ0YsQ0FMRCxNQUtPO2NBQ0p1RSxZQUFZLENBQUNtQyxXQUFiLEdBQ0csMkRBREg7WUFFRjtVQUNIO1FBQ0g7TUFDSDtJQUNIO0VBQ0g7QUFDSDs7QUFFRCxTQUFTRSxpQkFBVCxHQUE2QjtFQUMxQixJQUFJRyxLQUFLLEdBQUdsSSw2RUFBQSxFQUFaOztFQUVBLEtBQUssSUFBSVUsS0FBRyxHQUFHLENBQWYsRUFBa0JBLEtBQUcsR0FBR3dILEtBQUssQ0FBQ25ILE1BQTlCLEVBQXNDTCxLQUFHLEVBQXpDLEVBQTZDO0lBQzFDLEtBQUssSUFBSWdCLE1BQUksR0FBRyxDQUFoQixFQUFtQkEsTUFBSSxHQUFHd0csS0FBSyxDQUFDeEgsS0FBRCxDQUFMLENBQVdLLE1BQXJDLEVBQTZDVyxNQUFJLEVBQWpELEVBQXFEO01BQ2xELElBQUl3RyxLQUFLLENBQUN4SCxLQUFELENBQUwsQ0FBV2dCLE1BQVgsRUFBaUJ5RyxNQUFqQixDQUF3QixVQUF4QixLQUF1QyxDQUEzQyxFQUE4QztRQUMzQ3ZDLGdCQUFnQixDQUFDbEYsS0FBRCxDQUFoQixDQUFzQmdCLE1BQXRCLEVBQTRCbUcsV0FBNUIsR0FBMENLLEtBQUssQ0FBQ3hILEtBQUQsQ0FBTCxDQUFXZ0IsTUFBWCxDQUExQztRQUNBa0UsZ0JBQWdCLENBQUNsRixLQUFELENBQWhCLENBQXNCZ0IsTUFBdEIsRUFBNEIyRSxPQUE1QixDQUFvQ0MsTUFBcEMsR0FBNkMsTUFBN0M7TUFDRixDQUhELE1BR087UUFDSlYsZ0JBQWdCLENBQUNsRixLQUFELENBQWhCLENBQXNCZ0IsTUFBdEIsRUFBNEJtRyxXQUE1QixHQUEwQyxFQUExQztRQUNBakMsZ0JBQWdCLENBQUNsRixLQUFELENBQWhCLENBQXNCZ0IsTUFBdEIsRUFBNEIyRSxPQUE1QixDQUFvQ0MsTUFBcEMsR0FBNkMsT0FBN0M7TUFDRjtJQUNIO0VBQ0g7QUFDSDs7QUFFRCxTQUFTMEIsZ0JBQVQsR0FBNEI7RUFDekIsSUFBSUksS0FBSyxHQUFHLENBQVo7O0VBRUEsS0FBSyxJQUFJM0gsSUFBVCxJQUFpQnFGLFNBQWpCLEVBQTRCO0lBQ3pCTixpQkFBaUIsQ0FBQzRDLEtBQUQsQ0FBakIsQ0FBeUJQLFdBQXpCLEdBQXVDL0IsU0FBUyxDQUFDckYsSUFBRCxDQUFULENBQWdCNEIsS0FBaEIsQ0FBc0J0QixNQUE3RDtJQUNBcUgsS0FBSztFQUNQO0FBQ0g7O0FBRUQsU0FBUzVHLFVBQVQsQ0FBb0JOLENBQXBCLEVBQXVCO0VBQ3BCLElBQUkrRixNQUFNLEdBQUcvRixDQUFDLENBQUMrRixNQUFmOztFQUVBLElBQ0dBLE1BQU0sQ0FBQ1osT0FBUCxDQUFlM0YsR0FBZixJQUNBdUcsTUFBTSxDQUFDWixPQUFQLENBQWUzRSxJQURmLElBRUF1RixNQUFNLENBQUNaLE9BQVAsQ0FBZUMsTUFGZixJQUdBVyxNQUFNLENBQUNaLE9BQVAsQ0FBZUMsTUFBZixLQUEwQixNQUo3QixFQUtFO0lBQ0MsSUFBSStCLEdBQUcsR0FBR3JJLHVFQUFBLENBQ1AsQ0FBQ2lILE1BQU0sQ0FBQ1osT0FBUCxDQUFlM0YsR0FEVCxFQUVQLENBQUN1RyxNQUFNLENBQUNaLE9BQVAsQ0FBZTNFLElBRlQsQ0FBVjs7SUFLQSxJQUFJMkcsR0FBRyxDQUFDakgsUUFBSixDQUFhLDhDQUFiLENBQUosRUFBa0U7TUFDL0QsSUFBSWtILFdBQVcsR0FBRy9DLGdCQUFnQixDQUFDZ0QsZ0JBQWpCLENBQWtDLFNBQWxDLENBQWxCO01BQ0EsSUFBSUgsS0FBSyxHQUFHLENBQVo7TUFFQXRDLFNBQVMsR0FBRzlGLHFFQUFBLEVBQVosQ0FKK0QsQ0FNL0Q7O01BQ0EsS0FBSyxJQUFJUyxJQUFULElBQWlCcUYsU0FBakIsRUFBNEI7UUFDekIsSUFBSUEsU0FBUyxDQUFDckYsSUFBRCxDQUFULENBQWdCNEIsS0FBaEIsQ0FBc0J0QixNQUF0QixHQUErQitFLFNBQVMsQ0FBQ3JGLElBQUQsQ0FBVCxDQUFnQjZCLEdBQW5ELEVBQXdEO1VBQ3JEZ0csV0FBVyxDQUFDRixLQUFELENBQVgsQ0FBbUJOLFFBQW5CLEdBQThCLEtBQTlCO1FBQ0Y7O1FBRURNLEtBQUs7TUFDUDs7TUFFRCxJQUFJLENBQUNwSSwyRUFBQSxFQUFMLEVBQXdDO1FBQ3JDMkYsUUFBUSxDQUFDbUMsUUFBVCxHQUFvQixJQUFwQjtRQUNBbkMsUUFBUSxDQUFDOEIsS0FBVCxDQUFlUSxVQUFmLEdBQTRCLFFBQTVCO01BQ0Y7O01BRURGLGlCQUFpQjtNQUNqQlQsZUFBZSxDQUFDdEIsV0FBRCxDQUFmO01BQ0FnQyxnQkFBZ0I7SUFDbEI7RUFDSDs7RUFFRDlHLENBQUMsQ0FBQ3NILGNBQUY7QUFDRjs7QUFFRCxTQUFTekIsVUFBVCxDQUFvQjdGLENBQXBCLEVBQXVCO0VBQ3BCLElBQUlBLENBQUMsQ0FBQzhCLEdBQUYsS0FBVSxHQUFWLElBQWlCOUIsQ0FBQyxDQUFDOEIsR0FBRixLQUFVLEdBQS9CLEVBQW9DO0lBQ2pDLElBQUloQyxTQUFTLEtBQUssWUFBbEIsRUFBZ0M7TUFDN0JBLFNBQVMsR0FBRyxVQUFaO0lBQ0YsQ0FGRCxNQUVPO01BQ0pBLFNBQVMsR0FBRyxZQUFaO0lBQ0Y7O0lBRUQ0RixpQkFBaUI7SUFDakJVLGVBQWUsQ0FBQ3RCLFdBQUQsQ0FBZjtFQUNGO0FBQ0g7O0FBRUQsU0FBU2dCLGNBQVQsR0FBMEI7RUFDdkIsSUFBSWhILHFEQUFBLEVBQUosRUFBaUI7SUFDZEksV0FBVyxDQUFDcUksbUJBQVosQ0FBZ0MsV0FBaEMsRUFBNkM5QixrQkFBN0M7SUFDQXZHLFdBQVcsQ0FBQ3FJLG1CQUFaLENBQWdDLFVBQWhDLEVBQTRDN0IsaUJBQTVDO0lBQ0F4RyxXQUFXLENBQUNxSSxtQkFBWixDQUFnQyxPQUFoQyxFQUF5QzVCLFlBQXpDO0lBQ0F6RyxXQUFXLENBQUNxSSxtQkFBWixDQUFnQyxhQUFoQyxFQUErQ2pILFVBQS9DO0lBQ0FtRSxRQUFRLENBQUNtQyxRQUFULEdBQW9CLElBQXBCO0lBQ0F2QyxnQkFBZ0IsQ0FBQ21ELGFBQWpCLENBQStCakIsS0FBL0IsQ0FBcUNrQixPQUFyQyxHQUErQyxNQUEvQztJQUNBdEQsaUJBQWlCLENBQUNvQyxLQUFsQixDQUF3QmtCLE9BQXhCLEdBQWtDLE9BQWxDO0lBRUFyRCxRQUFRLENBQUNtQixnQkFBVCxDQUEwQixPQUExQixFQUFtQ21DLGNBQW5DO0VBQ0Y7QUFDSDs7QUFFRCxTQUFTQSxjQUFULENBQXdCMUgsQ0FBeEIsRUFBMkI7RUFDeEIsSUFBSStGLE1BQU0sR0FBRy9GLENBQUMsQ0FBQytGLE1BQWY7O0VBRUEsSUFDR0EsTUFBTSxDQUFDWixPQUFQLENBQWVDLE1BQWYsS0FBMEIsT0FBMUIsSUFDQVcsTUFBTSxDQUFDWixPQUFQLENBQWUzRixHQURmLElBRUF1RyxNQUFNLENBQUNaLE9BQVAsQ0FBZTNFLElBSGxCLEVBSUU7SUFDQyxzQkFBb0J1RixNQUFNLENBQUNaLE9BQTNCO0lBQUEsSUFBTTNGLEtBQU4sbUJBQU1BLEdBQU47SUFBQSxJQUFXZ0IsTUFBWCxtQkFBV0EsSUFBWDtJQUNBLElBQUltSCxVQUFVLEdBQUc3SSx5REFBQSxDQUFjLENBQUNVLEtBQWYsRUFBb0IsQ0FBQ2dCLE1BQXJCLENBQWpCO0lBRUFxRyxpQkFBaUI7SUFDakJlLGNBQWMsR0FMZixDQU9DOztJQUNBLElBQ0dELFVBQVUsQ0FBQ1YsTUFBWCxJQUNBVSxVQUFVLENBQUNWLE1BQVgsQ0FBa0IsaUNBQWxCLEtBQXdELENBRjNELEVBR0U7TUFDQyxJQUFJakMsSUFBRyxHQUFHZixRQUFRLENBQUNnQixhQUFULENBQXVCLEtBQXZCLENBQVY7O01BQ0EsSUFBSTRDLENBQUMsR0FBRzVELFFBQVEsQ0FBQ2dCLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBUjtNQUNBLElBQUk2QyxNQUFNLEdBQUc3RCxRQUFRLENBQUNnQixhQUFULENBQXVCLFFBQXZCLENBQWI7TUFFQUQsSUFBRyxDQUFDRSxTQUFKLEdBQWdCLGlCQUFoQjtNQUNBMkMsQ0FBQyxDQUFDbEIsV0FBRixHQUFnQmdCLFVBQWhCO01BQ0FHLE1BQU0sQ0FBQzVDLFNBQVAsR0FBbUIsUUFBbkI7TUFDQTRDLE1BQU0sQ0FBQ25CLFdBQVAsR0FBcUIsWUFBckI7O01BQ0EzQixJQUFHLENBQUNLLE1BQUosQ0FBV3dDLENBQVgsRUFBY0MsTUFBZDs7TUFDQTdELFFBQVEsQ0FBQzhELElBQVQsQ0FBY0MsaUJBQWQsQ0FBZ0NDLEtBQWhDLENBQXNDakQsSUFBdEM7TUFFQThDLE1BQU0sQ0FBQ3ZDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDMkMsU0FBakM7TUFDQTlELFFBQVEsQ0FBQ21ELG1CQUFULENBQTZCLE9BQTdCLEVBQXNDRyxjQUF0QztJQUNGO0VBQ0g7QUFDSDs7QUFFRCxTQUFTRSxjQUFULEdBQTBCO0VBQ3ZCLElBQUlaLEtBQUssR0FBR2xJLGlFQUFBLEVBQVo7O0VBRUEsS0FBSyxJQUFJVSxLQUFHLEdBQUcsQ0FBZixFQUFrQkEsS0FBRyxHQUFHd0gsS0FBSyxDQUFDbkgsTUFBOUIsRUFBc0NMLEtBQUcsRUFBekMsRUFBNkM7SUFDMUMsS0FBSyxJQUFJZ0IsTUFBSSxHQUFHLENBQWhCLEVBQW1CQSxNQUFJLEdBQUd3RyxLQUFLLENBQUN4SCxLQUFELENBQUwsQ0FBV0ssTUFBckMsRUFBNkNXLE1BQUksRUFBakQsRUFBcUQ7TUFDbEQsSUFBSXdHLEtBQUssQ0FBQ3hILEtBQUQsQ0FBTCxDQUFXZ0IsTUFBWCxFQUFpQnlHLE1BQWpCLENBQXdCLE1BQXhCLEtBQW1DLENBQXZDLEVBQTBDO1FBQ3ZDdEMsYUFBYSxDQUFDbkYsS0FBRCxDQUFiLENBQW1CZ0IsTUFBbkIsRUFBeUJtRyxXQUF6QixHQUF1Q0ssS0FBSyxDQUFDeEgsS0FBRCxDQUFMLENBQVdnQixNQUFYLENBQXZDO1FBQ0FtRSxhQUFhLENBQUNuRixLQUFELENBQWIsQ0FBbUJnQixNQUFuQixFQUF5QjJFLE9BQXpCLENBQWlDQyxNQUFqQyxHQUEwQyxNQUExQztNQUNGLENBSEQsTUFHTztRQUNKVCxhQUFhLENBQUNuRixLQUFELENBQWIsQ0FBbUJnQixNQUFuQixFQUF5Qm1HLFdBQXpCLEdBQXVDLEVBQXZDO1FBQ0FoQyxhQUFhLENBQUNuRixLQUFELENBQWIsQ0FBbUJnQixNQUFuQixFQUF5QjJFLE9BQXpCLENBQWlDQyxNQUFqQyxHQUEwQyxPQUExQztNQUNGO0lBQ0g7RUFDSDtBQUNIOztBQUVELFNBQVM4QyxTQUFULEdBQXFCO0VBQ2xCcEosc0RBQUE7RUFFQW1GLFFBQVEsQ0FBQzhELElBQVQsQ0FBY0MsaUJBQWQsQ0FBZ0NHLGtCQUFoQyxDQUFtRGxDLE1BQW5EO0VBQ0EyQixjQUFjO0VBQ2R4RCxRQUFRLENBQUNtRCxtQkFBVCxDQUE2QixPQUE3QixFQUFzQ0csY0FBdEM7RUFDQXhJLFdBQVcsQ0FBQ3FHLGdCQUFaLENBQTZCLFdBQTdCLEVBQTBDRSxrQkFBMUM7RUFDQXZHLFdBQVcsQ0FBQ3FHLGdCQUFaLENBQTZCLFVBQTdCLEVBQXlDRyxpQkFBekM7RUFDQXhHLFdBQVcsQ0FBQ3FHLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDSSxZQUF0QztFQUNBekcsV0FBVyxDQUFDcUcsZ0JBQVosQ0FBNkIsYUFBN0IsRUFBNENqRixVQUE1QztFQUNBdUcsaUJBQWlCO0VBQ2pCeEMsZ0JBQWdCLENBQUNtRCxhQUFqQixDQUErQmpCLEtBQS9CLENBQXFDa0IsT0FBckMsR0FBK0MsT0FBL0M7O0VBQ0EsbUJBQUlwRCxnQkFBZ0IsQ0FBQ2dELGdCQUFqQixDQUFrQyxTQUFsQyxDQUFKLEVBQWtEdEYsT0FBbEQsQ0FDRyxVQUFDK0YsTUFBRDtJQUFBLE9BQWFBLE1BQU0sQ0FBQ2xCLFFBQVAsR0FBa0IsS0FBL0I7RUFBQSxDQURIOztFQUdBLG1CQUFJdEMsaUJBQUosRUFBdUJ2QyxPQUF2QixDQUErQixVQUFDcUcsT0FBRDtJQUFBLE9BQWNBLE9BQU8sQ0FBQ3pCLFdBQVIsR0FBc0IsR0FBcEM7RUFBQSxDQUEvQjs7RUFDQXhDLGlCQUFpQixDQUFDb0MsS0FBbEIsQ0FBd0JrQixPQUF4QixHQUFrQyxFQUFsQztFQUNBaEQsUUFBUSxDQUFDbUMsUUFBVCxHQUFvQixJQUFwQjtFQUNBbkMsUUFBUSxDQUFDOEIsS0FBVCxDQUFlUSxVQUFmLEdBQTRCLFFBQTVCO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7O0FDaldELElBQU1oRyxJQUFJLEdBQUcsU0FBUEEsSUFBTyxDQUFVbEIsTUFBVixFQUFrQitDLFdBQWxCLEVBQStCO0VBQ3pDLElBQUl5RixZQUFZLEdBQUd6RixXQUFXLElBQUksSUFBbEM7O0VBQ0EsSUFBSTBGLE9BQU8sR0FBR3pJLE1BQU0sSUFBSSxDQUF4Qjs7RUFDQSxJQUFJMEksWUFBWSxHQUFHLENBQW5COztFQUVBLElBQU1wRyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFZO0lBQzFCLE9BQU9ULElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLFNBQUwsQ0FBZXlHLFlBQWYsQ0FBWCxDQUFQO0VBQ0YsQ0FGRDs7RUFJQSxJQUFNbkcsU0FBUyxHQUFHLFNBQVpBLFNBQVksR0FBWTtJQUMzQixPQUFPb0csT0FBUDtFQUNGLENBRkQ7O0VBSUEsSUFBTWpHLE9BQU8sR0FBRyxTQUFWQSxPQUFVLEdBQVk7SUFDekIsT0FBT2tHLFlBQVA7RUFDRixDQUZEOztFQUlBLElBQU1qRyxHQUFHLEdBQUcsU0FBTkEsR0FBTSxHQUFZO0lBQ3JCaUcsWUFBWTtJQUNaLE9BQU9BLFlBQVA7RUFDRixDQUhEOztFQUtBLElBQU12RSxNQUFNLEdBQUcsU0FBVEEsTUFBUyxHQUFZO0lBQ3hCLE9BQU91RSxZQUFZLEtBQUsxSSxNQUF4QjtFQUNGLENBRkQ7O0VBSUEsT0FBTztJQUNKc0MsUUFBUSxFQUFSQSxRQURJO0lBRUpELFNBQVMsRUFBVEEsU0FGSTtJQUdKRyxPQUFPLEVBQVBBLE9BSEk7SUFJSkMsR0FBRyxFQUFIQSxHQUpJO0lBS0owQixNQUFNLEVBQU5BO0VBTEksQ0FBUDtBQU9GLENBakNEOztBQW1DQSxpRUFBZWpELElBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DQTtBQUM2RztBQUNqQjtBQUM1Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0EsMm9CQUEyb0IsY0FBYyxlQUFlLGNBQWMsb0JBQW9CLGtCQUFrQiw2QkFBNkIsR0FBRyxpSkFBaUosbUJBQW1CLEdBQUcsVUFBVSwyQkFBMkIsa0NBQWtDLG1CQUFtQiw0QkFBNEIsbUJBQW1CLGlCQUFpQixHQUFHLFlBQVkscUJBQXFCLEdBQUcsbUJBQW1CLGlCQUFpQixHQUFHLDZEQUE2RCxrQkFBa0Isa0JBQWtCLEdBQUcsV0FBVyw4QkFBOEIsc0JBQXNCLEdBQUcsT0FBTyxxQkFBcUIsR0FBRyxtQkFBbUIsa0JBQWtCLDhCQUE4QixxQkFBcUIsR0FBRyxvQkFBb0Isc0JBQXNCLEdBQUcsb0JBQW9CLHNCQUFzQixHQUFHLHNDQUFzQyxtQkFBbUIsR0FBRyw4REFBOEQsa0JBQWtCLEdBQUcsb0JBQW9CLHdCQUF3QixHQUFHLCtCQUErQixjQUFjLEdBQUcseUJBQXlCLHVCQUF1Qiw4QkFBOEIsc0JBQXNCLHdCQUF3QixHQUFHLFlBQVksb0JBQW9CLGtCQUFrQixxQ0FBcUMsNEJBQTRCLEdBQUcsK0JBQStCLGtCQUFrQixhQUFhLDRDQUE0Qyx5QkFBeUIsbUJBQW1CLGdCQUFnQixHQUFHLDBDQUEwQyxpQkFBaUIsR0FBRywrREFBK0QsbUJBQW1CLEdBQUcsK0RBQStELG1CQUFtQixHQUFHLCtEQUErRCxtQkFBbUIsR0FBRywrREFBK0QsbUJBQW1CLEdBQUcsK0RBQStELG1CQUFtQixHQUFHLCtEQUErRCxtQkFBbUIsR0FBRywrREFBK0QsbUJBQW1CLEdBQUcsK0RBQStELG1CQUFtQixHQUFHLCtEQUErRCxtQkFBbUIsR0FBRyxnRUFBZ0Usb0JBQW9CLEdBQUcsOEJBQThCLGtCQUFrQixhQUFhLGdDQUFnQyx5QkFBeUIsbUJBQW1CLGdCQUFnQixHQUFHLHlDQUF5QyxpQkFBaUIsR0FBRyw4REFBOEQsbUJBQW1CLEdBQUcsOERBQThELG1CQUFtQixHQUFHLDhEQUE4RCxtQkFBbUIsR0FBRyw4REFBOEQsbUJBQW1CLEdBQUcsOERBQThELG1CQUFtQixHQUFHLDhEQUE4RCxtQkFBbUIsR0FBRyw4REFBOEQsbUJBQW1CLEdBQUcsOERBQThELG1CQUFtQixHQUFHLDhEQUE4RCxtQkFBbUIsR0FBRywrREFBK0QsbUJBQW1CLEdBQUcsa0JBQWtCLDhCQUE4QixrQkFBa0IsNEJBQTRCLHdCQUF3QixHQUFHLG1CQUFtQixnQkFBZ0Isa0JBQWtCLGFBQWEsNENBQTRDLHlCQUF5QixHQUFHLG9DQUFvQyw4QkFBOEIsaUJBQWlCLEdBQUcsb0JBQW9CLG9CQUFvQix1QkFBdUIscUJBQXFCLHNCQUFzQixxQkFBcUIsc0JBQXNCLHVCQUF1QixvQkFBb0IsR0FBRywwQkFBMEIsa0JBQWtCLHFCQUFxQixHQUFHLHdCQUF3Qix1QkFBdUIsbUJBQW1CLEdBQUcseUJBQXlCLDBCQUEwQiwwQkFBMEIsR0FBRyxrQkFBa0Isb0JBQW9CLDhCQUE4Qix3QkFBd0Isc0JBQXNCLHVCQUF1QixHQUFHLG9DQUFvQyxvQkFBb0IsOEJBQThCLEdBQUcsbUJBQW1CLHVCQUF1QixHQUFHLHNCQUFzQix1QkFBdUIsdUJBQXVCLG1CQUFtQixHQUFHLHNCQUFzQix3QkFBd0IsR0FBRyxhQUFhLDJCQUEyQixvQkFBb0Isa0NBQWtDLDRCQUE0QixtQkFBbUIsMkJBQTJCLDhCQUE4QixvQkFBb0IsR0FBRyxpQkFBaUIsOEJBQThCLGlCQUFpQixHQUFHLHdCQUF3Qiw4QkFBOEIsaUJBQWlCLEdBQUcsb0JBQW9CLGlCQUFpQixHQUFHLGdEQUFnRCxXQUFXLG9CQUFvQixxQ0FBcUMsS0FBSyxvQkFBb0Isa0JBQWtCLEtBQUssNEJBQTRCLG9CQUFvQixLQUFLLDBCQUEwQixnQkFBZ0IsMEJBQTBCLEtBQUssMkJBQTJCLHFCQUFxQixLQUFLLDZCQUE2QixxQkFBcUIsa0JBQWtCLEtBQUssR0FBRyxPQUFPLGdVQUFnVSxLQUFLLGlCQUFpQixVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxNQUFNLFdBQVcsTUFBTSxVQUFVLE1BQU0sS0FBSyxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxNQUFNLEtBQUssV0FBVyxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sVUFBVSxVQUFVLE1BQU0sS0FBSyxXQUFXLFdBQVcsTUFBTSxLQUFLLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLE9BQU8sTUFBTSxXQUFXLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsV0FBVyxZQUFZLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxPQUFPLE1BQU0sVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsVUFBVSxVQUFVLFdBQVcsWUFBWSxNQUFNLE1BQU0sWUFBWSxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsT0FBTyxNQUFNLFVBQVUsV0FBVyxPQUFPLE1BQU0sV0FBVyxVQUFVLE1BQU0sTUFBTSxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLE1BQU0sTUFBTSxXQUFXLFVBQVUsTUFBTSxNQUFNLFlBQVksV0FBVyxNQUFNLE1BQU0sVUFBVSxPQUFPLE1BQU0sS0FBSyxVQUFVLFdBQVcsT0FBTyxNQUFNLFVBQVUsT0FBTyxNQUFNLFVBQVUsT0FBTyxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxVQUFVLE1BQU0sa0tBQWtLLDBoQkFBMGhCLGdCQUFnQixpQkFBaUIsZ0JBQWdCLHNCQUFzQixvQkFBb0IsK0JBQStCLEtBQUssc0pBQXNKLHFCQUFxQixLQUFLLFVBQVUsNkJBQTZCLG9DQUFvQyxxQkFBcUIsK0JBQStCLHFCQUFxQixtQkFBbUIsS0FBSyxZQUFZLHVCQUF1QixLQUFLLG1CQUFtQixtQkFBbUIsS0FBSywrREFBK0Qsa0JBQWtCLG9CQUFvQixLQUFLLFdBQVcsZ0NBQWdDLHdCQUF3QixLQUFLLE9BQU8sdUJBQXVCLEtBQUssb21CQUFvbUIsY0FBYyxlQUFlLGNBQWMsb0JBQW9CLGtCQUFrQiw2QkFBNkIsR0FBRyxpSkFBaUosbUJBQW1CLEdBQUcsVUFBVSwyQkFBMkIsa0NBQWtDLG1CQUFtQiw0QkFBNEIsbUJBQW1CLGlCQUFpQixHQUFHLFlBQVkscUJBQXFCLEdBQUcsbUJBQW1CLGlCQUFpQixHQUFHLDZEQUE2RCxrQkFBa0Isa0JBQWtCLEdBQUcsV0FBVyw4QkFBOEIsc0JBQXNCLEdBQUcsT0FBTyxxQkFBcUIsR0FBRyxtQkFBbUIsa0JBQWtCLDhCQUE4QixxQkFBcUIsR0FBRyxvQkFBb0Isc0JBQXNCLEdBQUcsb0JBQW9CLHNCQUFzQixHQUFHLHNDQUFzQyxtQkFBbUIsR0FBRyw4REFBOEQsa0JBQWtCLEdBQUcsb0JBQW9CLHdCQUF3QixHQUFHLCtCQUErQixjQUFjLEdBQUcseUJBQXlCLHVCQUF1Qiw4QkFBOEIsc0JBQXNCLHdCQUF3QixHQUFHLFlBQVksb0JBQW9CLGtCQUFrQixxQ0FBcUMsNEJBQTRCLEdBQUcsK0JBQStCLGtCQUFrQixhQUFhLDRDQUE0Qyx5QkFBeUIsbUJBQW1CLGdCQUFnQixHQUFHLDBDQUEwQyxpQkFBaUIsR0FBRywrREFBK0QsbUJBQW1CLEdBQUcsK0RBQStELG1CQUFtQixHQUFHLCtEQUErRCxtQkFBbUIsR0FBRywrREFBK0QsbUJBQW1CLEdBQUcsK0RBQStELG1CQUFtQixHQUFHLCtEQUErRCxtQkFBbUIsR0FBRywrREFBK0QsbUJBQW1CLEdBQUcsK0RBQStELG1CQUFtQixHQUFHLCtEQUErRCxtQkFBbUIsR0FBRyxnRUFBZ0Usb0JBQW9CLEdBQUcsOEJBQThCLGtCQUFrQixhQUFhLGdDQUFnQyx5QkFBeUIsbUJBQW1CLGdCQUFnQixHQUFHLHlDQUF5QyxpQkFBaUIsR0FBRyw4REFBOEQsbUJBQW1CLEdBQUcsOERBQThELG1CQUFtQixHQUFHLDhEQUE4RCxtQkFBbUIsR0FBRyw4REFBOEQsbUJBQW1CLEdBQUcsOERBQThELG1CQUFtQixHQUFHLDhEQUE4RCxtQkFBbUIsR0FBRyw4REFBOEQsbUJBQW1CLEdBQUcsOERBQThELG1CQUFtQixHQUFHLDhEQUE4RCxtQkFBbUIsR0FBRywrREFBK0QsbUJBQW1CLEdBQUcsa0JBQWtCLDhCQUE4QixrQkFBa0IsNEJBQTRCLHdCQUF3QixHQUFHLG1CQUFtQixnQkFBZ0Isa0JBQWtCLGFBQWEsNENBQTRDLHlCQUF5QixHQUFHLG9DQUFvQyw4QkFBOEIsaUJBQWlCLEdBQUcsb0JBQW9CLG9CQUFvQix1QkFBdUIscUJBQXFCLHNCQUFzQixxQkFBcUIsc0JBQXNCLHVCQUF1QixvQkFBb0IsR0FBRywwQkFBMEIsa0JBQWtCLHFCQUFxQixHQUFHLHdCQUF3Qix1QkFBdUIsbUJBQW1CLEdBQUcseUJBQXlCLDBCQUEwQiwwQkFBMEIsR0FBRyxrQkFBa0Isb0JBQW9CLDhCQUE4Qix3QkFBd0Isc0JBQXNCLHVCQUF1QixHQUFHLG9DQUFvQyxvQkFBb0IsOEJBQThCLEdBQUcsbUJBQW1CLHVCQUF1QixHQUFHLHNCQUFzQix1QkFBdUIsdUJBQXVCLG1CQUFtQixHQUFHLHNCQUFzQix3QkFBd0IsR0FBRyxhQUFhLDJCQUEyQixvQkFBb0Isa0NBQWtDLDRCQUE0QixtQkFBbUIsMkJBQTJCLDhCQUE4QixvQkFBb0IsR0FBRyxpQkFBaUIsOEJBQThCLGlCQUFpQixHQUFHLHdCQUF3Qiw4QkFBOEIsaUJBQWlCLEdBQUcsb0JBQW9CLGlCQUFpQixHQUFHLGdEQUFnRCxXQUFXLG9CQUFvQixxQ0FBcUMsS0FBSyxvQkFBb0Isa0JBQWtCLEtBQUssNEJBQTRCLG9CQUFvQixLQUFLLDBCQUEwQixnQkFBZ0IsMEJBQTBCLEtBQUssMkJBQTJCLHFCQUFxQixLQUFLLDZCQUE2QixxQkFBcUIsa0JBQWtCLEtBQUssR0FBRyxtQkFBbUIsMkJBQTJCLHVCQUF1QixxQkFBcUIsZ0NBQWdDLHdCQUF3QixXQUFXLDRCQUE0QixRQUFRLFdBQVcsNEJBQTRCLFFBQVEsZUFBZSx5QkFBeUIsUUFBUSx1Q0FBdUMsd0JBQXdCLFFBQVEsV0FBVyw4QkFBOEIsd0JBQXdCLHVCQUF1QixXQUFXLFFBQVEsS0FBSyxvQkFBb0IsNEJBQTRCLHlCQUF5QiwwQkFBMEIsV0FBVyw2QkFBNkIsb0NBQW9DLDRCQUE0Qiw4QkFBOEIsUUFBUSxLQUFLLFlBQVksdUJBQXVCLHFCQUFxQiw4Q0FBOEMsK0JBQStCLEtBQUssK0JBQStCLHFCQUFxQixnQkFBZ0IscURBQXFELGtDQUFrQyxzQkFBc0IsbUJBQW1CLHFCQUFxQix1QkFBdUIseUNBQXlDLDJCQUEyQixHQUFHLFdBQVcsNEJBQTRCLEdBQUcsR0FBRyxjQUFjLFdBQVcsUUFBUSxLQUFLLDhCQUE4QixxQkFBcUIsZ0JBQWdCLHlDQUF5QyxrQ0FBa0Msc0JBQXNCLG1CQUFtQixxQkFBcUIsdUJBQXVCLGdFQUFnRSx5Q0FBeUMsMkJBQTJCLEdBQUcsV0FBVyw0QkFBNEIsdUJBQXVCLEdBQUcsY0FBYyxXQUFXLFFBQVEsS0FBSyxrQkFBa0IsZ0NBQWdDLHFCQUFxQiwrQkFBK0IsMkJBQTJCLEtBQUssbUJBQW1CLG1CQUFtQixxQkFBcUIsZ0JBQWdCLHFEQUFxRCxrQ0FBa0MscUJBQXFCLG1CQUFtQixzQ0FBc0MsMEJBQTBCLFdBQVcsUUFBUSxLQUFLLG9CQUFvQix1QkFBdUIsMEJBQTBCLHdCQUF3QiwyQkFBMkIsd0JBQXdCLHlCQUF5QiwwQkFBMEIsdUJBQXVCLEtBQUssMEJBQTBCLHFCQUFxQix3QkFBd0IsS0FBSyxxQkFBcUIsV0FBVyw2QkFBNkIseUJBQXlCLFFBQVEsY0FBYyxnQ0FBZ0MsK0JBQStCLFFBQVEsS0FBSyxrQkFBa0IsdUJBQXVCLGdDQUFnQywyQkFBMkIseUJBQXlCLDBCQUEwQixtQkFBbUIseUJBQXlCLG1DQUFtQyxRQUFRLEtBQUssbUJBQW1CLDBCQUEwQixLQUFLLHNCQUFzQix5QkFBeUIsMEJBQTBCLHNCQUFzQixVQUFVLDhCQUE4QixRQUFRLEtBQUssMkJBQTJCLGlCQUFpQiw4QkFBOEIsdUJBQXVCLG9DQUFvQywrQkFBK0IscUJBQXFCLDRCQUE0QixnQ0FBZ0MsdUJBQXVCLGdCQUFnQixtQ0FBbUMsdUJBQXVCLFFBQVEsdUJBQXVCLG1DQUFtQyx1QkFBdUIsUUFBUSxtQkFBbUIsc0JBQXNCLFFBQVEsS0FBSywrQ0FBK0MsY0FBYyx3QkFBd0IseUNBQXlDLFFBQVEscUJBQXFCLHNCQUFzQixRQUFRLDZCQUE2Qix3QkFBd0IsUUFBUSx3QkFBd0IsY0FBYyx1QkFBdUIsaUNBQWlDLFdBQVcsaUJBQWlCLDRCQUE0QixXQUFXLG1CQUFtQiw0QkFBNEIseUJBQXlCLFdBQVcsUUFBUSxLQUFLLG1CQUFtQjtBQUM5MW5CO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7O0FDUDFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscURBQXFEO0FBQ3JEOztBQUVBO0FBQ0EsZ0RBQWdEO0FBQ2hEOztBQUVBO0FBQ0EscUZBQXFGO0FBQ3JGOztBQUVBOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0EsS0FBSztBQUNMLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixxQkFBcUI7QUFDMUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDckdhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkEsTUFBa0c7QUFDbEcsTUFBd0Y7QUFDeEYsTUFBK0Y7QUFDL0YsTUFBa0g7QUFDbEgsTUFBMkc7QUFDM0csTUFBMkc7QUFDM0csTUFBbUo7QUFDbko7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyw2SEFBTzs7OztBQUk2RjtBQUNySCxPQUFPLGlFQUFlLDZIQUFPLElBQUksb0lBQWMsR0FBRyxvSUFBYyxZQUFZLEVBQUM7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdkdhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3RDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1ZhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3NzL3N0eWxlcy5zY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3Njc3Mvc3R5bGVzLnNjc3M/MzIxZiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XHJcblxyXG5jb25zdCBHYW1lID0gKGZ1bmN0aW9uICgpIHtcclxuICAgbGV0IF93aW5uZXJNZXNzYWdlO1xyXG4gICBsZXQgX2NhbkdhbWVTdGFydCA9IGZhbHNlO1xyXG4gICBsZXQgX2NvbXB1dGVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcclxuICAgbGV0IHBsYXllckJvYXJkID0gR2FtZWJvYXJkKCk7XHJcblxyXG4gICBjb25zdCBnZXRDb21wdXRlckJvYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX2NvbXB1dGVyQm9hcmQuZ2V0Qm9hcmQoKTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBwbGFjZUVuZW15QXJteSA9IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIHBsYWNlIHNoaXBzXHJcbiAgICAgICAgICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSB0eXBlLmxlbmd0aDtcclxuICAgICAgICAgICAgbGV0IGRpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpID09PSAwID8gXCJ2ZXJcIiA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICBfY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoW3JvdywgY29sdW1uXSwgbGVuZ3RoLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICBwbGFjZUVuZW15QXJteSh0eXBlKTtcclxuICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBpZiAoIWUubWVzc2FnZS5pbmNsdWRlcyhcIkV4Y2VlZGVkIG51bWJlciBvZiBzaGlwc1wiKSkge1xyXG4gICAgICAgICAgICAgICBwbGFjZUVuZW15QXJteSh0eXBlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgcmV0dXJuIFwiZmluaXNoZWRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBmaWxsIGNvbXB1dGVyQm9hcmQgd2l0aCBzaGlwc1xyXG4gICAgICBpZiAoIV9jb21wdXRlckJvYXJkLmlzQXJteUNvbXBsZXRlKCkpIHtcclxuICAgICAgICAgbGV0IGNvbXB1dGVyU2hpcHNJbmZvID0gX2NvbXB1dGVyQm9hcmQuZ2V0U2hpcHMoKTtcclxuXHJcbiAgICAgICAgIGZvciAobGV0IHR5cGUgaW4gY29tcHV0ZXJTaGlwc0luZm8pIHtcclxuICAgICAgICAgICAgcGxhY2VFbmVteUFybXkoY29tcHV0ZXJTaGlwc0luZm9bdHlwZV0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwbGF5ZXJCb2FyZC5pc0FybXlDb21wbGV0ZSgpKSB7XHJcbiAgICAgICAgIF9jYW5HYW1lU3RhcnQgPSB0cnVlO1xyXG4gICAgICAgICB0aGlzLnBsYXllckJvYXJkLnBsYWNlU2hpcCA9IG51bGw7XHJcbiAgICAgICAgIHRoaXMucGxheWVyQm9hcmQucmVtb3ZlU2hpcCA9IG51bGw7XHJcbiAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHRha2VUdXJuID0gZnVuY3Rpb24gKHJvdywgY2VsbCkge1xyXG4gICAgICBpZiAoIV9jYW5HYW1lU3RhcnQpIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgaWYgKCFfd2lubmVyTWVzc2FnZSkge1xyXG4gICAgICAgICBsZXQgYXR0YWNrUGxheWVyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgICAgICAgICBsZXQgY2VsbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuXHJcbiAgICAgICAgICAgICAgIHRoaXMucGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNlbGwpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgZS5tZXNzYWdlLmluY2x1ZGVzKFxyXG4gICAgICAgICAgICAgICAgICAgICBcIllvdSBhbHJlYWR5IGF0dGFja2VkIHRoZSBmb2xsb3dpbmcgY29vcmRpbmF0ZXNcIlxyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICBhdHRhY2tQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAvLyBhdHRhY2sgY29tcHV0ZXJcclxuICAgICAgICAgX2NvbXB1dGVyQm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNlbGwpO1xyXG5cclxuICAgICAgICAgaWYgKF9jb21wdXRlckJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIF93aW5uZXJNZXNzYWdlID0gXCJQbGF5ZXIgd29uIHRoZSBtYXRjaFwiO1xyXG4gICAgICAgICAgICByZXR1cm4gX3dpbm5lck1lc3NhZ2U7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8vIGF0dGFjayBwbGF5ZXJcclxuICAgICAgICAgYXR0YWNrUGxheWVyKCk7XHJcblxyXG4gICAgICAgICBpZiAodGhpcy5wbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xyXG4gICAgICAgICAgICBfd2lubmVyTWVzc2FnZSA9IFwiQ29tcHV0ZXIgd29uIHRoZSBtYXRjaFwiO1xyXG4gICAgICAgICAgICByZXR1cm4gX3dpbm5lck1lc3NhZ2U7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gX3dpbm5lck1lc3NhZ2U7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBnZXRXaW5uZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBfd2lubmVyTWVzc2FnZTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHJlc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBfd2lubmVyTWVzc2FnZSA9IHVuZGVmaW5lZDtcclxuICAgICAgX2NhbkdhbWVTdGFydCA9IGZhbHNlO1xyXG4gICAgICBfY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xyXG4gICAgICB0aGlzLnBsYXllckJvYXJkID0gR2FtZWJvYXJkKCk7XHJcbiAgIH07XHJcblxyXG4gICByZXR1cm4ge1xyXG4gICAgICBwbGF5ZXJCb2FyZCxcclxuICAgICAgZ2V0Q29tcHV0ZXJCb2FyZCxcclxuICAgICAgaW5pdCxcclxuICAgICAgdGFrZVR1cm4sXHJcbiAgICAgIGdldFdpbm5lcixcclxuICAgICAgcmVzZXQsXHJcbiAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xyXG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XHJcblxyXG5jb25zdCBHYW1lYm9hcmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgIGxldCBfYm9hcmQgPSBbXTtcclxuICAgbGV0IF9zaGlwcyA9IHtcclxuICAgICAgdHlwZTE6IHsgc2hpcHM6IFtdLCBsZW5ndGg6IDUsIG1heDogMSwgc3ltYm9sOiBcIkFcIiB9LFxyXG4gICAgICB0eXBlMjogeyBzaGlwczogW10sIGxlbmd0aDogNCwgbWF4OiAyLCBzeW1ib2w6IFwiQlwiIH0sXHJcbiAgICAgIHR5cGUzOiB7IHNoaXBzOiBbXSwgbGVuZ3RoOiAzLCBtYXg6IDMsIHN5bWJvbDogXCJDXCIgfSxcclxuICAgICAgdHlwZTQ6IHsgc2hpcHM6IFtdLCBsZW5ndGg6IDIsIG1heDogNCwgc3ltYm9sOiBcIkRcIiB9LFxyXG4gICB9O1xyXG5cclxuICAgLy8gY3JlYXRlIDEwIHJvd3MgYW5kIDEwIGNlbGxzIGZvciBfYm9hcmRcclxuICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XHJcbiAgICAgIF9ib2FyZC5wdXNoKFtdKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGNlbGwgPSAwOyBjZWxsIDwgMTA7IGNlbGwrKykge1xyXG4gICAgICAgICBfYm9hcmRbcm93XS5wdXNoKFwiflwiKTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICBjb25zdCBnZXRCb2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX2JvYXJkKSk7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBnZXRTaGlwcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IHNoaXBzQ2xvbmUgPSB7fTtcclxuXHJcbiAgICAgIGZvciAobGV0IGtleSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgc2hpcHNDbG9uZVtrZXldID0ge307XHJcbiAgICAgICAgIHNoaXBzQ2xvbmVba2V5XS5zaGlwcyA9IFtdO1xyXG4gICAgICAgICBzaGlwc0Nsb25lW2tleV0ubGVuZ3RoID0gX3NoaXBzW2tleV0ubGVuZ3RoO1xyXG4gICAgICAgICBzaGlwc0Nsb25lW2tleV0ubWF4ID0gX3NoaXBzW2tleV0ubWF4O1xyXG5cclxuICAgICAgICAgX3NoaXBzW2tleV0uc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2xvbmUgPSBTaGlwKHNoaXAuZ2V0TGVuZ3RoKCksIHNoaXAuZ2V0Q29vcnMoKSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuZ2V0SGl0cygpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgY2xvbmUuaGl0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNoaXBzQ2xvbmVba2V5XS5zaGlwcy5wdXNoKGNsb25lKTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBzaGlwc0Nsb25lO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgZ2V0Qm9hcmRBbmRTaGlwcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGJvYXJkQ29weSA9IHRoaXMuZ2V0Qm9hcmQoKTtcclxuXHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2hpcCA9IF9zaGlwc1t0eXBlXS5zaGlwc1tpXTtcclxuICAgICAgICAgICAgbGV0IHNoaXBDb29ycyA9IGN1cnJlbnRTaGlwLmdldENvb3JzKCk7XHJcblxyXG4gICAgICAgICAgICBzaGlwQ29vcnMuZm9yRWFjaCgoY29vcnMpID0+IHtcclxuICAgICAgICAgICAgICAgbGV0IFtyb3csIGNvbHVtbl0gPSBjb29ycztcclxuXHJcbiAgICAgICAgICAgICAgIGlmIChib2FyZENvcHlbcm93XVtjb2x1bW5dID09PSBcIn5cIikge1xyXG4gICAgICAgICAgICAgICAgICBib2FyZENvcHlbcm93XVtjb2x1bW5dID0gX3NoaXBzW3R5cGVdLnN5bWJvbDtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYm9hcmRDb3B5O1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgcGxhY2VTaGlwID0gZnVuY3Rpb24gKGNvb3JkaW5hdGVzID0gWzAsIDBdLCBsZW5ndGggPSAyLCBkaXJlY3Rpb24pIHtcclxuICAgICAgaWYgKGlzTmFOKE51bWJlcihjb29yZGluYXRlc1swXSkpIHx8IGlzTmFOKE51bWJlcihjb29yZGluYXRlc1sxXSkpKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvb3JkaW5hdGVzIHNob3VsZCBiZSBudW1iZXJzXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNOYU4oTnVtYmVyKGxlbmd0aCkpIHx8IGxlbmd0aCA+IDUgfHwgbGVuZ3RoIDwgMikge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMZW5ndGggc2hvdWxkIGJlIGEgbnVtYmVyIGJldHdlZW4gMiBhbmQgNVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHNoaXBDb29yZGluYXRlcyA9IFtbLi4uY29vcmRpbmF0ZXNdXTtcclxuXHJcbiAgICAgIC8vIGdlbmVyYXRlIGNvb3JkaW5hdGVzIHRoYXQgZXhwYW5kIGJhc2VkIG9uIGxlbmd0aCBhbmQgZGlyZWN0aW9uXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgIC8vIGV4cGFuZCBjb29yZGluYXRlcyB2ZXJ0aWNhbGx5XHJcbiAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwidmVyXCIpIHtcclxuICAgICAgICAgICAgbGV0IGNvb3JzQ29weSA9IFsuLi5zaGlwQ29vcmRpbmF0ZXNbaV1dO1xyXG4gICAgICAgICAgICBjb29yc0NvcHlbMF0rKztcclxuICAgICAgICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goY29vcnNDb3B5KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGV4cGFuZCBjb29yZGluYXRlcyBob3Jpem9udGFsbHlcclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGNvb3JzQ29weSA9IFsuLi5zaGlwQ29vcmRpbmF0ZXNbaV1dO1xyXG4gICAgICAgICAgICBjb29yc0NvcHlbMV0rKztcclxuICAgICAgICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goY29vcnNDb3B5KTtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjaGVjayBpZiBzaGlwQ29vcmRpbmF0ZXMgYXJlIHZhbGlkXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgIGxldCBjdXJyZW50Q29vciA9IHNoaXBDb29yZGluYXRlc1tpXTtcclxuXHJcbiAgICAgICAgIGlmIChjdXJyZW50Q29vclswXSA+IDkgfHwgY3VycmVudENvb3JbMF0gPCAwKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGV4cGFuZHMgdG8gd3JvbmcgY29vcmRpbmF0ZXNcIik7XHJcbiAgICAgICAgIGlmIChjdXJyZW50Q29vclsxXSA+IDkgfHwgY3VycmVudENvb3JbMV0gPCAwKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGV4cGFuZHMgdG8gd3JvbmcgY29vcmRpbmF0ZXNcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBuZXdTaGlwID0gU2hpcChsZW5ndGgsIHNoaXBDb29yZGluYXRlcyk7XHJcblxyXG4gICAgICAvLyBjaGVjayBpZiBuZXdTaGlwIGNhbiBiZSBhZGRlZCB0byBfc2hpcHNcclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgaWYgKF9zaGlwc1t0eXBlXS5sZW5ndGggPT09IG5ld1NoaXAuZ2V0TGVuZ3RoKCkpIHtcclxuICAgICAgICAgICAgaWYgKF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGggPCBfc2hpcHNbdHlwZV0ubWF4KSB7XHJcbiAgICAgICAgICAgICAgIC8vIGNoZWNrIGV2ZXJ5IHNoaXAncyBjb29yZGluYXRlcyB0byBzZWUgaWYgbmV3U2hpcCBkb2VzIG5vdCBoYXZlXHJcbiAgICAgICAgICAgICAgIC8vIHRoZSBzYW1lIGNvb3JkaW5hdGVzIG9mIGFub3RoZXIgc2hpcFxyXG4gICAgICAgICAgICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICAgICAgICAgICBfc2hpcHNbdHlwZV0uc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICBzaGlwLmdldENvb3JzKCkuZm9yRWFjaCgoc2hpcENvb3JzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NoaXAuZ2V0Q29vcnMoKS5mb3JFYWNoKChuZXdTaGlwQ29vcnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlwQ29vcnNbMF0gPT09IG5ld1NoaXBDb29yc1swXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlwQ29vcnNbMV0gPT09IG5ld1NoaXBDb29yc1sxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbmV3IHNoaXAgY2Fubm90IGJlIHBsYWNlIG92ZXIgYW5vdGhlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgX3NoaXBzW3R5cGVdLnNoaXBzLnB1c2gobmV3U2hpcCk7XHJcbiAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBsZXQgZXJyb3JNc2cgPSBgRXhjZWVkZWQgbnVtYmVyIG9mIHNoaXBzOiBtYXhpbXVuIG51bWJlciBmb3IgJHtsZW5ndGh9IGxlbmd0aCBzaGlwcyBpcyAke19zaGlwc1t0eXBlXS5tYXh9YDtcclxuICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHJlbW92ZVNoaXAgPSBmdW5jdGlvbiAocm93ID0gMCwgY2VsbCA9IDApIHtcclxuICAgICAgbGV0IGZpbHRlcmVkU2hpcHM7XHJcbiAgICAgIGxldCBjb29ycztcclxuXHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIC8vIHNlYXJjaCBhbmQgZmlsdGVyIG91dCBzaGlwIHRoYXQgaGFzIFwicm93XCIgYW5kIFwiY2VsbFwiIGFzIGNvb3JkaW5hdGVzXHJcbiAgICAgICAgIHNoaXBzTG9vcDogZm9yIChsZXQgaSA9IDA7IGkgPCBfc2hpcHNbdHlwZV0uc2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTaGlwID0gX3NoaXBzW3R5cGVdLnNoaXBzW2ldO1xyXG4gICAgICAgICAgICBsZXQgc2hpcENvb3JzID0gY3VycmVudFNoaXAuZ2V0Q29vcnMoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2hpcENvb3JzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgIGlmIChzaGlwQ29vcnNbal1bMF0gPT09IHJvdyAmJiBzaGlwQ29vcnNbal1bMV0gPT09IGNlbGwpIHtcclxuICAgICAgICAgICAgICAgICAgZmlsdGVyZWRTaGlwcyA9IF9zaGlwc1t0eXBlXS5zaGlwcy5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgIChzaGlwKSA9PiBzaGlwICE9PSBjdXJyZW50U2hpcFxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICBjb29ycyA9IHNoaXBDb29ycztcclxuICAgICAgICAgICAgICAgICAgYnJlYWsgc2hpcHNMb29wO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgICAvLyB1cGRhdGUgX3NoaXBzW3R5cGVdLnNoaXBzIGFycmF5XHJcbiAgICAgICAgIGlmIChmaWx0ZXJlZFNoaXBzKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHRNc2cgPSBcIlJlbW92ZWQgc2hpcCB3aXRoIHRoZSBmb2xsb3dpbmcgY29vcmRpbmF0ZXM6IFwiO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0TXNnICs9IGNvb3JzXHJcbiAgICAgICAgICAgICAgIC5yZWR1Y2UoXHJcbiAgICAgICAgICAgICAgICAgIChhY2MsIGN1cnJlbnQpID0+IGFjYyArIGBbJHtjdXJyZW50WzBdfSwgJHtjdXJyZW50WzFdfV0sIGAsXHJcbiAgICAgICAgICAgICAgICAgIFwiXCJcclxuICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAuc2xpY2UoMCwgLTIpO1xyXG5cclxuICAgICAgICAgICAgX3NoaXBzW3R5cGVdLnNoaXBzID0gZmlsdGVyZWRTaGlwcztcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdE1zZztcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYFRoZXJlIGlzIG5vIHNoaXAgaW4gWyR7cm93fSwke2NlbGx9XSBjb29yZGluYXRlc2A7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBpc0FybXlDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgaWYgKF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGggPCBfc2hpcHNbdHlwZV0ubWF4KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uIChyb3cgPSAwLCBjZWxsID0gMCkge1xyXG4gICAgICBsZXQgc3ltYm9sID0gXCJNXCI7XHJcblxyXG4gICAgICBpZiAocm93ID4gOSB8fCByb3cgPCAwIHx8IGNlbGwgPiA5IHx8IGNlbGwgPCAwKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgYFByb3ZpZGVkIGNvb3JkaW5hdGVzIGFyZSBub3QgdmFsaWQ6IFske3Jvd30sJHtjZWxsfV1gXHJcbiAgICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfYm9hcmRbcm93XVtjZWxsXSAhPT0gXCJ+XCIpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICBgWW91IGFscmVhZHkgYXR0YWNrZWQgdGhlIGZvbGxvd2luZyBjb29yZGluYXRlczogWyR7cm93fSwke2NlbGx9XWBcclxuICAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY2hlY2sgaWYgYW55IHNoaXAgaGFzIFwicm93XCIgYW5kIFwiY2VsbFwiIGFzIGNvb3JkaW5hdGVzIGFuZCBoaXQgaXRcclxuICAgICAgdHlwZUxvb3A6IGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2hpcCA9IF9zaGlwc1t0eXBlXS5zaGlwc1tpXTtcclxuICAgICAgICAgICAgbGV0IHNoaXBDb29ycyA9IGN1cnJlbnRTaGlwLmdldENvb3JzKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNoaXBDb29ycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICBpZiAoc2hpcENvb3JzW2pdWzBdID09PSByb3cgJiYgc2hpcENvb3JzW2pdWzFdID09PSBjZWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRTaGlwLmhpdCgpO1xyXG4gICAgICAgICAgICAgICAgICBzeW1ib2wgPSBcIkhcIjtcclxuICAgICAgICAgICAgICAgICAgYnJlYWsgdHlwZUxvb3A7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIF9ib2FyZFtyb3ddW2NlbGxdID0gc3ltYm9sO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGFsbFNoaXBzU3VuayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfc2hpcHNbdHlwZV0uc2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFfc2hpcHNbdHlwZV0uc2hpcHNbaV0uaXNTdW5rKCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgfTtcclxuXHJcbiAgIHJldHVybiB7XHJcbiAgICAgIGdldEJvYXJkLFxyXG4gICAgICBnZXRTaGlwcyxcclxuICAgICAgZ2V0Qm9hcmRBbmRTaGlwcyxcclxuICAgICAgcGxhY2VTaGlwLFxyXG4gICAgICByZW1vdmVTaGlwLFxyXG4gICAgICBpc0FybXlDb21wbGV0ZSxcclxuICAgICAgcmVjZWl2ZUF0dGFjayxcclxuICAgICAgYWxsU2hpcHNTdW5rLFxyXG4gICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xyXG4iLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9nYW1lLmpzXCI7XHJcbmltcG9ydCBcIi4vc2Nzcy9zdHlsZXMuc2Nzc1wiO1xyXG5cclxuY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllckJvYXJkXCIpO1xyXG5jb25zdCBjcHVCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3B1LWJvYXJkLWNvbnRhaW5lclwiKTtcclxuY29uc3QgY3B1Qm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNwdUJvYXJkXCIpO1xyXG5jb25zdCBidXR0b25zQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0b25zLWNvbnRhaW5lclwiKTtcclxuY29uc3Qgc2hpcFRhYmxlQ291bnRlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGxhY2VkLWNvdW50ZXJcIik7XHJcbmNvbnN0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3ItbWVzc2FnZVwiKTtcclxuY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LWJ1dHRvblwiKTtcclxuXHJcbmNvbnN0IHBsYXllckJvYXJkQ2VsbHMgPSBbXTtcclxuY29uc3QgY3B1Qm9hcmRDZWxscyA9IFtdO1xyXG5cclxubGV0IGxlbmd0aCA9IG51bGw7XHJcbmxldCBkaXJlY3Rpb24gPSBcImhvcml6b250YWxcIjtcclxubGV0IHNoaXBzSW5mbyA9IG51bGw7XHJcbmxldCBwcmV2aW91c0NsaWNrZWRCdG4gPSBudWxsO1xyXG5sZXQgY3VycmVudENlbGwgPSBudWxsO1xyXG5sZXQgY2VsbHNUb0hpZ2hsaWdodCA9IFtdO1xyXG5cclxuLy8gZ2VuZXJhdGUgcGxheWVyIGFuZCBjcHUgY2VsbHNcclxuZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XHJcbiAgIHBsYXllckJvYXJkQ2VsbHMucHVzaChbXSk7XHJcbiAgIGNwdUJvYXJkQ2VsbHMucHVzaChbXSk7XHJcblxyXG4gICBmb3IgKGxldCBjZWxsID0gMDsgY2VsbCA8IDEwOyBjZWxsKyspIHtcclxuICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgICBkaXYuY2xhc3NOYW1lID0gXCJib2FyZF9fY2VsbFwiO1xyXG4gICAgICBkaXYuZGF0YXNldC5yb3cgPSByb3c7XHJcbiAgICAgIGRpdi5kYXRhc2V0LmNlbGwgPSBjZWxsO1xyXG4gICAgICBkaXYuZGF0YXNldC5maWxsZWQgPSBcImZhbHNlXCI7XHJcbiAgICAgIHBsYXllckJvYXJkLmFwcGVuZChkaXYpO1xyXG4gICAgICBwbGF5ZXJCb2FyZENlbGxzW3Jvd10ucHVzaChkaXYpO1xyXG5cclxuICAgICAgbGV0IGNsb25lID0gZGl2LmNsb25lTm9kZSgpO1xyXG4gICAgICBjcHVCb2FyZC5hcHBlbmQoY2xvbmUpO1xyXG4gICAgICBjcHVCb2FyZENlbGxzW3Jvd10ucHVzaChjbG9uZSk7XHJcbiAgIH1cclxufVxyXG5cclxuYnV0dG9uc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tlZEJ1dHRvbnMpO1xyXG5wbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIHNob3dQcmV2aWV3SGFuZGxlcik7XHJcbnBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCByZW1vdmVTaGlwUHJldmlldyk7XHJcbnBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGFjZU5ld1NoaXApO1xyXG5wbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgcmVtb3ZlU2hpcCk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCByb3RhdGVTaGlwKTtcclxuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGluaXRpYWxpemVHYW1lKTtcclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUNsaWNrZWRCdXR0b25zKGUpIHtcclxuICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgLy8gaGFuZGxlIGJ1dHRvbnMgdGhhdCBjaGFuZ2UgXCJsZW5ndGhcIiB2YXJpYWJsZVxyXG4gICBpZiAodGFyZ2V0LmRhdGFzZXQubGVuZ3RoKSB7XHJcbiAgICAgIGxlbmd0aCA9ICt0YXJnZXQuZGF0YXNldC5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAocHJldmlvdXNDbGlja2VkQnRuKSB7XHJcbiAgICAgICAgIHByZXZpb3VzQ2xpY2tlZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiYnV0dG9uLS1oaWdobGlnaHRlZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJidXR0b24tLWhpZ2hsaWdodGVkXCIpO1xyXG4gICAgICBwcmV2aW91c0NsaWNrZWRCdG4gPSB0YXJnZXQ7XHJcblxyXG4gICAgICAvLyBoYW5kbGUgcm90YXRpb24tYnV0dG9uXHJcbiAgIH0gZWxzZSBpZiAodGFyZ2V0LmlkID09PSBcInJvdGF0aW9uLWJ1dHR0b25cIikge1xyXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICAgICBkaXJlY3Rpb24gPSBcInZlcnRpY2FsXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1ByZXZpZXdIYW5kbGVyKGUpIHtcclxuICAgc2hvd1NoaXBQcmV2aWV3KGUudGFyZ2V0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1NoaXBQcmV2aWV3KG5vZGUpIHtcclxuICAgaWYgKGxlbmd0aCAmJiBub2RlLmRhdGFzZXQucm93ICYmIG5vZGUuZGF0YXNldC5jZWxsKSB7XHJcbiAgICAgIGxldCB7IHJvdywgY2VsbCB9ID0gbm9kZS5kYXRhc2V0O1xyXG5cclxuICAgICAgY3VycmVudENlbGwgPSBub2RlO1xyXG4gICAgICByb3cgPSArcm93O1xyXG4gICAgICBjZWxsID0gK2NlbGw7XHJcblxyXG4gICAgICAvLyBwb3B1bGF0ZSBcImNlbGxzVG9IaWdobGlnaHRcIiBhcnJheVxyXG4gICAgICBsZW5ndGhMb29wOiBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgIGlmICghcGxheWVyQm9hcmRDZWxsc1tyb3ddIHx8ICFwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0pIHtcclxuICAgICAgICAgICAgYnJlYWsgbGVuZ3RoTG9vcDtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgY2VsbHNUb0hpZ2hsaWdodC5wdXNoKHBsYXllckJvYXJkQ2VsbHNbcm93XVtjZWxsXSk7XHJcbiAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgICAgICAgIGNlbGwrKztcclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcm93Kys7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcGFpbnQgcHJldmlldyByZWQgaWYgc2hpcCBsZW5ndGggZG9lcyBub3QgZml0XHJcbiAgICAgIGlmIChjZWxsc1RvSGlnaGxpZ2h0Lmxlbmd0aCA8IGxlbmd0aCkge1xyXG4gICAgICAgICBjZWxsc1RvSGlnaGxpZ2h0LmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNiNTE3MTdcIjtcclxuICAgICAgICAgICAgY2VsbC5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgY2VsbC5zdHlsZS5ib3JkZXJDb2xvciA9IFwiI2I1MTcxN1wiO1xyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIC8vIHBhaW50IHByZXZpZXcgZWl0aGVyIGdyZWVuIG9yIHJlZCBiYXNlZCBvbiBmaWxsZWQgYXR0cmlidXRlIHZhbHVlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGNlbGxzVG9IaWdobGlnaHQuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2VsbC5kYXRhc2V0LmZpbGxlZCA9PT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjMWNiNTE3XCI7XHJcbiAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYm9yZGVyQ29sb3IgPSBcIiMxY2I1MTdcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNiNTE3MTdcIjtcclxuICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5ib3JkZXJDb2xvciA9IFwiI2I1MTcxN1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU2hpcFByZXZpZXcoKSB7XHJcbiAgIGNlbGxzVG9IaWdobGlnaHQuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XHJcbiAgICAgIGNlbGwuc3R5bGUuY29sb3IgPSBcIlwiO1xyXG4gICAgICBjZWxsLnN0eWxlLmJvcmRlckNvbG9yID0gXCJcIjtcclxuICAgfSk7XHJcbiAgIGNlbGxzVG9IaWdobGlnaHQgPSBbXTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGxhY2VOZXdTaGlwKGUpIHtcclxuICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgaWYgKGxlbmd0aCAmJiB0YXJnZXQuZGF0YXNldC5yb3cgJiYgdGFyZ2V0LmRhdGFzZXQuY2VsbCkge1xyXG4gICAgICBzaGlwc0luZm8gPSBHYW1lLnBsYXllckJvYXJkLmdldFNoaXBzKCk7XHJcbiAgICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IFwiXCI7IC8vIGNsZWFyIHByZXZpb3VzIGVycm9yIG1lc3NhZ2VcclxuXHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gc2hpcHNJbmZvKSB7XHJcbiAgICAgICAgIC8vIGlkZW50aWZ5IHdoYXQgdHlwZSBvZiBzaGlwIHRoZSB1c2VyIGlzIGdvaW5nIHRvIHBsYWNlXHJcbiAgICAgICAgIGlmIChzaGlwc0luZm9bdHlwZV0ubGVuZ3RoID09PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKHNoaXBzSW5mb1t0eXBlXS5zaGlwcy5sZW5ndGggPCBzaGlwc0luZm9bdHlwZV0ubWF4KSB7XHJcbiAgICAgICAgICAgICAgIC8vIHBsYWNlIG5ldyBzaGlwXHJcbiAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgIEdhbWUucGxheWVyQm9hcmQucGxhY2VTaGlwKFxyXG4gICAgICAgICAgICAgICAgICAgICBbK3RhcmdldC5kYXRhc2V0LnJvdywgK3RhcmdldC5kYXRhc2V0LmNlbGxdLFxyXG4gICAgICAgICAgICAgICAgICAgICBsZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbi5zbGljZSgwLCAzKVxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICBzaGlwc0luZm8gPSBHYW1lLnBsYXllckJvYXJkLmdldFNoaXBzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIHNoaXAgYnV0dG9uIHdoZW4gZ2V0dGluZyB0byBtYXhpbXVtIG51bWJlciBvZiBzaGlwcyBwbGFjZWRcclxuICAgICAgICAgICAgICAgICAgaWYgKHNoaXBzSW5mb1t0eXBlXS5zaGlwcy5sZW5ndGggPT09IHNoaXBzSW5mb1t0eXBlXS5tYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNDbGlja2VkQnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNDbGlja2VkQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJidXR0b24tLWhpZ2hsaWdodGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICB1cGRhdGVQbGF5ZXJCb2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICByZW1vdmVTaGlwUHJldmlldygpO1xyXG4gICAgICAgICAgICAgICAgICB1cGRhdGVTaGlwc1RhYmxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBpZiAoR2FtZS5wbGF5ZXJCb2FyZC5pc0FybXlDb21wbGV0ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHN0YXJ0QnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgIHN0YXJ0QnRuLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgLy8gcHJpbnQgZXJyb3IgbWVzc2FnZXNcclxuICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgIGUubWVzc2FnZSA9PT0gXCJTaGlwIGV4cGFuZHMgdG8gd3JvbmcgY29vcmRpbmF0ZXNcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICBlLm1lc3NhZ2UgPT09IFwiQSBuZXcgc2hpcCBjYW5ub3QgYmUgcGxhY2Ugb3ZlciBhbm90aGVyXCJcclxuICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IFwiRXJyb3I6IFwiICsgZS5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVycm9yOiBBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSB0cnlpbmcgdG8gcGxhY2UgYSBuZXcgc2hpcFwiO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVQbGF5ZXJCb2FyZCgpIHtcclxuICAgbGV0IGJvYXJkID0gR2FtZS5wbGF5ZXJCb2FyZC5nZXRCb2FyZEFuZFNoaXBzKCk7XHJcblxyXG4gICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBib2FyZC5sZW5ndGg7IHJvdysrKSB7XHJcbiAgICAgIGZvciAobGV0IGNlbGwgPSAwOyBjZWxsIDwgYm9hcmRbcm93XS5sZW5ndGg7IGNlbGwrKykge1xyXG4gICAgICAgICBpZiAoYm9hcmRbcm93XVtjZWxsXS5zZWFyY2goL1tBQkNESE1dLykgPj0gMCkge1xyXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0udGV4dENvbnRlbnQgPSBib2FyZFtyb3ddW2NlbGxdO1xyXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0uZGF0YXNldC5maWxsZWQgPSBcInRydWVcIjtcclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdLmRhdGFzZXQuZmlsbGVkID0gXCJmYWxzZVwiO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTaGlwc1RhYmxlKCkge1xyXG4gICBsZXQgaW5kZXggPSAwO1xyXG5cclxuICAgZm9yIChsZXQgdHlwZSBpbiBzaGlwc0luZm8pIHtcclxuICAgICAgc2hpcFRhYmxlQ291bnRlcnNbaW5kZXhdLnRleHRDb250ZW50ID0gc2hpcHNJbmZvW3R5cGVdLnNoaXBzLmxlbmd0aDtcclxuICAgICAgaW5kZXgrKztcclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTaGlwKGUpIHtcclxuICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgaWYgKFxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5yb3cgJiZcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQuY2VsbCAmJlxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5maWxsZWQgJiZcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQuZmlsbGVkID09PSBcInRydWVcIlxyXG4gICApIHtcclxuICAgICAgbGV0IG1zZyA9IEdhbWUucGxheWVyQm9hcmQucmVtb3ZlU2hpcChcclxuICAgICAgICAgK3RhcmdldC5kYXRhc2V0LnJvdyxcclxuICAgICAgICAgK3RhcmdldC5kYXRhc2V0LmNlbGxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChtc2cuaW5jbHVkZXMoXCJSZW1vdmVkIHNoaXAgd2l0aCB0aGUgZm9sbG93aW5nIGNvb3JkaW5hdGVzOlwiKSkge1xyXG4gICAgICAgICBsZXQgc2hpcEJ1dHRvbnMgPSBidXR0b25zQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uXCIpO1xyXG4gICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG5cclxuICAgICAgICAgc2hpcHNJbmZvID0gR2FtZS5wbGF5ZXJCb2FyZC5nZXRTaGlwcygpO1xyXG5cclxuICAgICAgICAgLy8gZW5hYmxlIGJhY2sgZGlzYWJsZWQgYnV0dG9uc1xyXG4gICAgICAgICBmb3IgKGxldCB0eXBlIGluIHNoaXBzSW5mbykge1xyXG4gICAgICAgICAgICBpZiAoc2hpcHNJbmZvW3R5cGVdLnNoaXBzLmxlbmd0aCA8IHNoaXBzSW5mb1t0eXBlXS5tYXgpIHtcclxuICAgICAgICAgICAgICAgc2hpcEJ1dHRvbnNbaW5kZXhdLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmICghR2FtZS5wbGF5ZXJCb2FyZC5pc0FybXlDb21wbGV0ZSgpKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3RhcnRCdG4uc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHVwZGF0ZVBsYXllckJvYXJkKCk7XHJcbiAgICAgICAgIHNob3dTaGlwUHJldmlldyhjdXJyZW50Q2VsbCk7XHJcbiAgICAgICAgIHVwZGF0ZVNoaXBzVGFibGUoKTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvdGF0ZVNoaXAoZSkge1xyXG4gICBpZiAoZS5rZXkgPT09IFwicVwiIHx8IGUua2V5ID09PSBcIlFcIikge1xyXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICAgICBkaXJlY3Rpb24gPSBcInZlcnRpY2FsXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZW1vdmVTaGlwUHJldmlldygpO1xyXG4gICAgICBzaG93U2hpcFByZXZpZXcoY3VycmVudENlbGwpO1xyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVHYW1lKCkge1xyXG4gICBpZiAoR2FtZS5pbml0KCkpIHtcclxuICAgICAgcGxheWVyQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBzaG93UHJldmlld0hhbmRsZXIpO1xyXG4gICAgICBwbGF5ZXJCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgcmVtb3ZlU2hpcFByZXZpZXcpO1xyXG4gICAgICBwbGF5ZXJCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxhY2VOZXdTaGlwKTtcclxuICAgICAgcGxheWVyQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIHJlbW92ZVNoaXApO1xyXG4gICAgICBzdGFydEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgIGJ1dHRvbnNDb250YWluZXIucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgIGNwdUJvYXJkQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcblxyXG4gICAgICBjcHVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXR0YWNrQ3B1Qm9hcmQpO1xyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGF0dGFja0NwdUJvYXJkKGUpIHtcclxuICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgaWYgKFxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5maWxsZWQgPT09IFwiZmFsc2VcIiAmJlxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5yb3cgJiZcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQuY2VsbFxyXG4gICApIHtcclxuICAgICAgbGV0IHsgcm93LCBjZWxsIH0gPSB0YXJnZXQuZGF0YXNldDtcclxuICAgICAgbGV0IHR1cm5SZXN1bHQgPSBHYW1lLnRha2VUdXJuKCtyb3csICtjZWxsKTtcclxuXHJcbiAgICAgIHVwZGF0ZVBsYXllckJvYXJkKCk7XHJcbiAgICAgIHVwZGF0ZUNwdUJvYXJkKCk7XHJcblxyXG4gICAgICAvLyBkZWNsYXJlIGEgd2lubmVyIGFuZCBwcmludCBhIHJlc2V0IGJ1dHRvblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgIHR1cm5SZXN1bHQuc2VhcmNoICYmXHJcbiAgICAgICAgIHR1cm5SZXN1bHQuc2VhcmNoKC9QbGF5ZXJ8Q29tcHV0ZXIgd29uIHRoZSBtYXRjaC9naSkgPj0gMFxyXG4gICAgICApIHtcclxuICAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgIGxldCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG5cclxuICAgICAgICAgZGl2LmNsYXNzTmFtZSA9IFwicmVzZXQtY29udGFpbmVyXCI7XHJcbiAgICAgICAgIHAudGV4dENvbnRlbnQgPSB0dXJuUmVzdWx0O1xyXG4gICAgICAgICBidXR0b24uY2xhc3NOYW1lID0gXCJidXR0b25cIjtcclxuICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJSZXNldCBHYW1lXCI7XHJcbiAgICAgICAgIGRpdi5hcHBlbmQocCwgYnV0dG9uKTtcclxuICAgICAgICAgZG9jdW1lbnQuYm9keS5maXJzdEVsZW1lbnRDaGlsZC5hZnRlcihkaXYpO1xyXG5cclxuICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXNldEdhbWUpO1xyXG4gICAgICAgICBjcHVCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXR0YWNrQ3B1Qm9hcmQpO1xyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlQ3B1Qm9hcmQoKSB7XHJcbiAgIGxldCBib2FyZCA9IEdhbWUuZ2V0Q29tcHV0ZXJCb2FyZCgpO1xyXG5cclxuICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgYm9hcmQubGVuZ3RoOyByb3crKykge1xyXG4gICAgICBmb3IgKGxldCBjZWxsID0gMDsgY2VsbCA8IGJvYXJkW3Jvd10ubGVuZ3RoOyBjZWxsKyspIHtcclxuICAgICAgICAgaWYgKGJvYXJkW3Jvd11bY2VsbF0uc2VhcmNoKC9bSE1dLykgPj0gMCkge1xyXG4gICAgICAgICAgICBjcHVCb2FyZENlbGxzW3Jvd11bY2VsbF0udGV4dENvbnRlbnQgPSBib2FyZFtyb3ddW2NlbGxdO1xyXG4gICAgICAgICAgICBjcHVCb2FyZENlbGxzW3Jvd11bY2VsbF0uZGF0YXNldC5maWxsZWQgPSBcInRydWVcIjtcclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3B1Qm9hcmRDZWxsc1tyb3ddW2NlbGxdLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgY3B1Qm9hcmRDZWxsc1tyb3ddW2NlbGxdLmRhdGFzZXQuZmlsbGVkID0gXCJmYWxzZVwiO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZXNldEdhbWUoKSB7XHJcbiAgIEdhbWUucmVzZXQoKTtcclxuXHJcbiAgIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQubmV4dEVsZW1lbnRTaWJsaW5nLnJlbW92ZSgpO1xyXG4gICB1cGRhdGVDcHVCb2FyZCgpO1xyXG4gICBjcHVCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXR0YWNrQ3B1Qm9hcmQpO1xyXG4gICBwbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIHNob3dQcmV2aWV3SGFuZGxlcik7XHJcbiAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCByZW1vdmVTaGlwUHJldmlldyk7XHJcbiAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGFjZU5ld1NoaXApO1xyXG4gICBwbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgcmVtb3ZlU2hpcCk7XHJcbiAgIHVwZGF0ZVBsYXllckJvYXJkKCk7XHJcbiAgIGJ1dHRvbnNDb250YWluZXIucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICBbLi4uYnV0dG9uc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvblwiKV0uZm9yRWFjaChcclxuICAgICAgKGJ1dHRvbikgPT4gKGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlKVxyXG4gICApO1xyXG4gICBbLi4uc2hpcFRhYmxlQ291bnRlcnNdLmZvckVhY2goKGNvdW50ZXIpID0+IChjb3VudGVyLnRleHRDb250ZW50ID0gXCIwXCIpKTtcclxuICAgY3B1Qm9hcmRDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiXCI7XHJcbiAgIHN0YXJ0QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgc3RhcnRCdG4uc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbn1cclxuIiwiY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChsZW5ndGgsIGNvb3JkaW5hdGVzKSB7XHJcbiAgIGxldCBfY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcyB8fCBudWxsO1xyXG4gICBsZXQgX2xlbmd0aCA9IGxlbmd0aCB8fCAyO1xyXG4gICBsZXQgX2hpdHNDb3VudGVyID0gMDtcclxuXHJcbiAgIGNvbnN0IGdldENvb3JzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShfY29vcmRpbmF0ZXMpKTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGdldExlbmd0aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF9sZW5ndGg7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBnZXRIaXRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX2hpdHNDb3VudGVyO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBfaGl0c0NvdW50ZXIrKztcclxuICAgICAgcmV0dXJuIF9oaXRzQ291bnRlcjtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF9oaXRzQ291bnRlciA9PT0gbGVuZ3RoO1xyXG4gICB9O1xyXG5cclxuICAgcmV0dXJuIHtcclxuICAgICAgZ2V0Q29vcnMsXHJcbiAgICAgIGdldExlbmd0aCxcclxuICAgICAgZ2V0SGl0cyxcclxuICAgICAgaGl0LFxyXG4gICAgICBpc1N1bmssXHJcbiAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCxcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IDA7XFxuICBmb250LXNpemU6IDEwMCU7XFxuICBmb250OiBpbmhlcml0O1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSxcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gIHRleHQtc2hhZG93OiAwIDAgMTBweCAjMWNiNTE3O1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiAjMWNiNTE3O1xcbiAgbWFyZ2luOiAxNnB4O1xcbn1cXG5cXG5vbCwgdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuYmxvY2txdW90ZSwgcSB7XFxuICBxdW90ZXM6IG5vbmU7XFxufVxcblxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgY29udGVudDogbm9uZTtcXG59XFxuXFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG5wIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxufVxcblxcbi5pbnN0cnVjdGlvbnMge1xcbiAgcGFkZGluZzogMXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBtYXJnaW4tdG9wOiAzcmVtO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgxIHtcXG4gIGZvbnQtc2l6ZTogMS40cmVtO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgyIHtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgxLCAuaW5zdHJ1Y3Rpb25zIGgyIHtcXG4gIG1hcmdpbjogMXJlbSAwO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgxOmZpcnN0LWNoaWxkLCAuaW5zdHJ1Y3Rpb25zIGgyOmZpcnN0LWNoaWxkIHtcXG4gIG1hcmdpbi10b3A6IDA7XFxufVxcbi5pbnN0cnVjdGlvbnMgbGkge1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuLmluc3RydWN0aW9ucyBsaTpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLmJvYXJkLWNvbnRhaW5lciBoMSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweCBhdXRvO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogM3B4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxuICBncmlkLWNvbHVtbjogMjtcXG4gIGdyaWQtcm93OiAxO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbCB7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIxXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjJcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiM1xcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg0KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI0XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDUpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjVcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNlxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg3KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI3XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDgpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjhcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiOVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxMCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMTBcXFwiO1xcbn1cXG5cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogM3B4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4O1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxuICBncmlkLWNvbHVtbjogMTtcXG4gIGdyaWQtcm93OiAyO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlcjogbm9uZTtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiYVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImJcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgzKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJjXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZFxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDUpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImVcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg2KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJmXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZ1xcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDgpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImhcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg5KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJpXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMTApOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImpcXFwiO1xcbn1cXG5cXG4uYm9hcmRfX2NlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZF9fYm9hcmQge1xcbiAgZ3JpZC1yb3c6IDI7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAzcHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG59XFxuLmJvYXJkX19ib2FyZCAuYm9hcmRfX2NlbGw6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuXFxuI2Vycm9yLW1lc3NhZ2Uge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWF4LXdpZHRoOiA1MDBweDtcXG4gIGdyaWQtY29sdW1uOiAxLy0xO1xcbiAgbWFyZ2luLXRvcDogMXJlbTtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgcGFkZGluZzogMCAxcmVtO1xcbn1cXG5cXG4jY3B1LWJvYXJkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgbWFyZ2luLXRvcDogMnJlbTtcXG59XFxuXFxuLnBsYXllci1idXR0b25zIHVsIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbjogMnJlbSAwO1xcbn1cXG4ucGxheWVyLWJ1dHRvbnMgdWwgbGkge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG5cXG4uc2hpcHMtdGFibGUge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIG1hcmdpbi1ib3R0b206IDJyZW07XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG59XFxuLnNoaXBzLXRhYmxlIHRkLCAuc2hpcHMtdGFibGUgdGgge1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG59XFxuXFxuI3N0YXJ0LWJ1dHRvbiB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbi5yZXNldC1jb250YWluZXIge1xcbiAgZm9udC1zaXplOiAxLCA1cmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luOiAzcmVtIDA7XFxufVxcbi5yZXNldC1jb250YWluZXIgcCB7XFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG5cXG4uYnV0dG9uIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICBmb250LXNpemU6IDFyZW07XFxuICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggIzFjYjUxNztcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6ICMxY2I1MTc7XFxuICBwYWRkaW5nOiAwLjVyZW0gMC44cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWNiNTE3O1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG4uYnV0dG9uLS1oaWdobGlnaHRlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWNiNTE3O1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG4uYnV0dG9uOmRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDAuNDtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gIC5ncmlkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgfVxcblxcbiAgLnNoaXBzLXRhYmxlIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICB9XFxuXFxuICAjY3B1LWJvYXJkLWNvbnRhaW5lciB7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICB9XFxuXFxuICAucGxheWVyLWJ1dHRvbnMgdWwge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG1hcmdpbi1ib3R0b206IDJyZW07XFxuICB9XFxuICAucGxheWVyLWJ1dHRvbnMgdWwgbGkge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gIH1cXG4gIC5wbGF5ZXItYnV0dG9ucyAuYnV0dG9uIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fcmVzZXQuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3Mvc3R5bGVzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL192YXJpYWJsZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX2luc3RydWN0aW9ucy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fYm9hcmQuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX2J1dHRvbnMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX21lZGlhLXF1ZXJpZXMuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0NBQUE7QUFNQTs7Ozs7Ozs7Ozs7OztFQWFDLFNBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0Esd0JBQUE7QUNERDs7QURHQSxnREFBQTtBQUNBOztFQUVDLGNBQUE7QUNBRDs7QURFQTtFQUNDLHNCQUFBO0VBQ0UsNkJBQUE7RUFDRixjQUFBO0VBQ0UsdUJBQUE7RUFDQSxjRXBDSztFRnFDUCxZQUFBO0FDQ0Q7O0FEQ0E7RUFDQyxnQkFBQTtBQ0VEOztBREFBO0VBQ0MsWUFBQTtBQ0dEOztBRERBOztFQUVDLFdBQUE7RUFDQSxhQUFBO0FDSUQ7O0FERkE7RUFDQyx5QkFBQTtFQUNBLGlCQUFBO0FDS0Q7O0FESEE7RUFDQyxnQkFBQTtBQ01EOztBRTNEQTtFQUNHLGFBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0FGOERIO0FFN0RHO0VBQ0csaUJBQUE7QUYrRE47QUU3REc7RUFDRyxpQkFBQTtBRitETjtBRTdERztFQUNHLGNBQUE7QUYrRE47QUU3REc7RUFDRyxhQUFBO0FGK0ROO0FFN0RHO0VBQ0csbUJBQUE7QUYrRE47QUU5RE07RUFDRyxTQUFBO0FGZ0VUOztBRy9FRztFQUNHLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0FIa0ZOOztBRy9FQTtFQUNHLGVBQUE7RUFDQSxhQUFBO0VBQ0EsZ0NBQUE7RUFDQSx1QkFBQTtBSGtGSDs7QUdoRkE7RUFDRyxhQUFBO0VBQ0EsUUFBQTtFQUNBLHVDQUFBO0VBQ0Esb0JBcEJTO0VBcUJULGNBQUE7RUFDQSxXQUFBO0FIbUZIO0FHbEZHO0VBQ0csWUFBQTtBSG9GTjtBR2pGUztFQUNHLFlBQUE7QUhtRlo7QUdwRlM7RUFDRyxZQUFBO0FIc0ZaO0FHdkZTO0VBQ0csWUFBQTtBSHlGWjtBRzFGUztFQUNHLFlBQUE7QUg0Rlo7QUc3RlM7RUFDRyxZQUFBO0FIK0ZaO0FHaEdTO0VBQ0csWUFBQTtBSGtHWjtBR25HUztFQUNHLFlBQUE7QUhxR1o7QUd0R1M7RUFDRyxZQUFBO0FId0daO0FHekdTO0VBQ0csWUFBQTtBSDJHWjtBRzVHUztFQUNHLGFBQUE7QUg4R1o7O0FHekdBO0VBQ0csYUFBQTtFQUNBLFFBQUE7RUFDQSwyQkFwQ1M7RUFxQ1Qsb0JBckNTO0VBc0NULGNBQUE7RUFDQSxXQUFBO0FINEdIO0FHM0dHO0VBQ0csWUFBQTtBSDZHTjtBR3hHUztFQUNHLFlBQUE7QUgwR1o7QUczR1M7RUFDRyxZQUFBO0FINkdaO0FHOUdTO0VBQ0csWUFBQTtBSGdIWjtBR2pIUztFQUNHLFlBQUE7QUhtSFo7QUdwSFM7RUFDRyxZQUFBO0FIc0haO0FHdkhTO0VBQ0csWUFBQTtBSHlIWjtBRzFIUztFQUNHLFlBQUE7QUg0SFo7QUc3SFM7RUFDRyxZQUFBO0FIK0haO0FHaElTO0VBQ0csWUFBQTtBSGtJWjtBR25JUztFQUNHLFlBQUE7QUhxSVo7O0FHaElBO0VBQ0cseUJBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBSG1JSDs7QUdqSUE7RUFDRyxXQUFBO0VBQ0EsYUFBQTtFQUNBLFFBQUE7RUFDQSx1Q0FBQTtFQUNBLG9CQS9EUztBSG1NWjtBR2xJTTtFQUNHLHlCRnJFRDtFRXNFQyxZQUFBO0FIb0lUOztBR2hJQTtFQUNHLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FIbUlIOztBR2pJQTtFQUNHLGFBQUE7RUFDQSxnQkFBQTtBSG9JSDs7QUdqSUc7RUFDRyxrQkFBQTtFQUNBLGNBQUE7QUhvSU47QUdsSUc7RUFDRyxxQkFBQTtFQUNBLHFCQUFBO0FIb0lOOztBR2pJQTtFQUNHLGVBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBSG9JSDtBR2xJRztFQUNHLGVBQUE7RUFDQSx5QkFBQTtBSG9JTjs7QUdqSUE7RUFDRyxrQkFBQTtBSG9JSDs7QUdsSUE7RUFDRyxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBSHFJSDtBR3BJRztFQUNHLG1CQUFBO0FIc0lOOztBSTFQQTtFQUNHLHNCQUFBO0VBQ0EsZUFBQTtFQUNBLDZCQUFBO0VBQ0EsdUJBQUE7RUFDQSxjSFBLO0VHUUwsc0JBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7QUo2UEg7QUk1UEc7RUFDRyx5QkhaRTtFR2FGLFlBQUE7QUo4UE47QUk1UEc7RUFDRyx5QkhoQkU7RUdpQkYsWUFBQTtBSjhQTjtBSTVQRztFQUNHLFlBQUE7QUo4UE47O0FLbFJBO0VBQ0c7SUFDRyxhQUFBO0lBQ0EsOEJBQUE7RUxxUko7O0VLblJDO0lBQ0csV0FBQTtFTHNSSjs7RUtwUkM7SUFDRyxhQUFBO0VMdVJKOztFS3BSSTtJQUNHLFNBQUE7SUFDQSxtQkFBQTtFTHVSUDtFS3JSSTtJQUNHLGNBQUE7RUx1UlA7RUtyUkk7SUFDRyxjQUFBO0lBQ0EsV0FBQTtFTHVSUDtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcclxcbiAgIHYyLjAgfCAyMDExMDEyNlxcclxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxyXFxuKi9cXHJcXG5AdXNlICcuL3ZhcmlhYmxlcycgYXMgKjtcXHJcXG5cXHJcXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxyXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcclxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXHJcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxyXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXHJcXG5iLCB1LCBpLCBjZW50ZXIsXFxyXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXHJcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXHJcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXHJcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXHJcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXHJcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcclxcblxcdG1hcmdpbjogMDtcXHJcXG5cXHRwYWRkaW5nOiAwO1xcclxcblxcdGJvcmRlcjogMDtcXHJcXG5cXHRmb250LXNpemU6IDEwMCU7XFxyXFxuXFx0Zm9udDogaW5oZXJpdDtcXHJcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXHJcXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXHJcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcclxcblxcdGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5ib2R5IHtcXHJcXG5cXHRmb250LWZhbWlseTogbW9ub3NwYWNlO1xcclxcbiAgIHRleHQtc2hhZG93OiAwIDAgMTBweCAkZ3JlZW47XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxyXFxuICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxyXFxuICAgY29sb3I6ICRncmVlbjtcXHJcXG5cXHRtYXJnaW46IDE2cHg7XFxyXFxufVxcclxcbm9sLCB1bCB7XFxyXFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZSwgcSB7XFxyXFxuXFx0cXVvdGVzOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXHJcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxyXFxuXFx0Y29udGVudDogJyc7XFxyXFxuXFx0Y29udGVudDogbm9uZTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVxcclxcbnAge1xcclxcblxcdGxpbmUtaGVpZ2h0OiAxLjU7XFxyXFxufVwiLFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCxcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICMxY2I1MTc7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6ICMxY2I1MTc7XFxuICBtYXJnaW46IDE2cHg7XFxufVxcblxcbm9sLCB1bCB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG5ibG9ja3F1b3RlLCBxIHtcXG4gIHF1b3Rlczogbm9uZTtcXG59XFxuXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBjb250ZW50OiBub25lO1xcbn1cXG5cXG50YWJsZSB7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XFxufVxcblxcbnAge1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG59XFxuXFxuLmluc3RydWN0aW9ucyB7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIG1hcmdpbi10b3A6IDNyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgaDEge1xcbiAgZm9udC1zaXplOiAxLjRyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgaDIge1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgaDEsIC5pbnN0cnVjdGlvbnMgaDIge1xcbiAgbWFyZ2luOiAxcmVtIDA7XFxufVxcbi5pbnN0cnVjdGlvbnMgaDE6Zmlyc3QtY2hpbGQsIC5pbnN0cnVjdGlvbnMgaDI6Zmlyc3QtY2hpbGQge1xcbiAgbWFyZ2luLXRvcDogMDtcXG59XFxuLmluc3RydWN0aW9ucyBsaSB7XFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGxpOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyIGgxIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbi5ib2FyZCB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4IGF1dG87XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAzcHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG4gIGdyaWQtY29sdW1uOiAyO1xcbiAgZ3JpZC1yb3c6IDE7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlcjogbm9uZTtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjFcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMlxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgzKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIzXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDQpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjRcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg2KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI2XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDcpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjdcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiOFxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg5KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI5XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEwKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIxMFxcXCI7XFxufVxcblxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAzcHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHg7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG4gIGdyaWQtY29sdW1uOiAxO1xcbiAgZ3JpZC1yb3c6IDI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGwge1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJhXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiYlxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDMpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImNcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg0KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJkXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDYpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImZcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg3KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJnXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiaFxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDkpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImlcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxMCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwialxcXCI7XFxufVxcblxcbi5ib2FyZF9fY2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkX19ib2FyZCB7XFxuICBncmlkLXJvdzogMjtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDNweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xcbn1cXG4uYm9hcmRfX2JvYXJkIC5ib2FyZF9fY2VsbDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWNiNTE3O1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4jZXJyb3ItbWVzc2FnZSB7XFxuICBmb250LXNpemU6IDFyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXgtd2lkdGg6IDUwMHB4O1xcbiAgZ3JpZC1jb2x1bW46IDEvLTE7XFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICBwYWRkaW5nOiAwIDFyZW07XFxufVxcblxcbiNjcHUtYm9hcmQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBtYXJnaW4tdG9wOiAycmVtO1xcbn1cXG5cXG4ucGxheWVyLWJ1dHRvbnMgdWwge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luOiAycmVtIDA7XFxufVxcbi5wbGF5ZXItYnV0dG9ucyB1bCBsaSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XFxufVxcblxcbi5zaGlwcy10YWJsZSB7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbn1cXG4uc2hpcHMtdGFibGUgdGQsIC5zaGlwcy10YWJsZSB0aCB7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbn1cXG5cXG4jc3RhcnQtYnV0dG9uIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuXFxuLnJlc2V0LWNvbnRhaW5lciB7XFxuICBmb250LXNpemU6IDEsIDVyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW46IDNyZW0gMDtcXG59XFxuLnJlc2V0LWNvbnRhaW5lciBwIHtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbi5idXR0b24ge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIHRleHQtc2hhZG93OiAwIDAgMTBweCAjMWNiNTE3O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogIzFjYjUxNztcXG4gIHBhZGRpbmc6IDAuNXJlbSAwLjhyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbi5idXR0b24tLWhpZ2hsaWdodGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbi5idXR0b246ZGlzYWJsZWQge1xcbiAgb3BhY2l0eTogMC40O1xcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCkge1xcbiAgLmdyaWQge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICB9XFxuXFxuICAuc2hpcHMtdGFibGUge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG5cXG4gICNjcHUtYm9hcmQtY29udGFpbmVyIHtcXG4gICAgbWFyZ2luLXRvcDogMDtcXG4gIH1cXG5cXG4gIC5wbGF5ZXItYnV0dG9ucyB1bCB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXG4gIH1cXG4gIC5wbGF5ZXItYnV0dG9ucyB1bCBsaSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgfVxcbiAgLnBsYXllci1idXR0b25zIC5idXR0b24ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICB9XFxufVwiLFwiJGdyZWVuOiAjMWNiNTE3O1wiLFwiQHVzZSAnLi92YXJpYWJsZXMnIGFzICo7XFxyXFxuXFxyXFxuLmluc3RydWN0aW9ucyB7XFxyXFxuICAgcGFkZGluZzogMXJlbTtcXHJcXG4gICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XFxyXFxuICAgbWFyZ2luLXRvcDogM3JlbTtcXHJcXG4gICBoMSB7XFxyXFxuICAgICAgZm9udC1zaXplOiAxLjRyZW07XFxyXFxuICAgfVxcclxcbiAgIGgyIHtcXHJcXG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gICB9XFxyXFxuICAgaDEsIGgyIHtcXHJcXG4gICAgICBtYXJnaW46IDFyZW0gMDtcXHJcXG4gICB9XFxyXFxuICAgaDE6Zmlyc3QtY2hpbGQsIGgyOmZpcnN0LWNoaWxkIHtcXHJcXG4gICAgICBtYXJnaW4tdG9wOiAwO1xcclxcbiAgIH1cXHJcXG4gICBsaSB7XFxyXFxuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXHJcXG4gICAgICAmOmxhc3QtY2hpbGQge1xcclxcbiAgICAgICAgIG1hcmdpbjogMDtcXHJcXG4gICAgICB9XFxyXFxuICAgfVxcclxcbn1cIixcIkB1c2UgJ3Nhc3M6bGlzdCc7XFxyXFxuQHVzZSAnLi92YXJpYWJsZXMnIGFzICo7XFxyXFxuXFxyXFxuJGNlbGxXaWR0aDogMzBweDtcXHJcXG5cXHJcXG4uYm9hcmQtY29udGFpbmVyIHtcXHJcXG4gICBoMSB7XFxyXFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxyXFxuICAgICAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXHJcXG4gICB9XFxyXFxufVxcclxcbi5ib2FyZCB7XFxyXFxuICAgZm9udC1zaXplOiAxOHB4O1xcclxcbiAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAkY2VsbFdpZHRoIGF1dG87XFxyXFxuICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIge1xcclxcbiAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgZ2FwOiAzcHg7XFxyXFxuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsICRjZWxsV2lkdGgpO1xcclxcbiAgIGdyaWQtYXV0by1yb3dzOiAkY2VsbFdpZHRoO1xcclxcbiAgIGdyaWQtY29sdW1uOiAyO1xcclxcbiAgIGdyaWQtcm93OiAxO1xcclxcbiAgIC5ib2FyZF9fY2VsbCB7XFxyXFxuICAgICAgYm9yZGVyOiBub25lO1xcclxcblxcclxcbiAgICAgIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggMTAge1xcclxcbiAgICAgICAgICY6bnRoLWNoaWxkKCN7JGl9KTo6YmVmb3JlIHtcXHJcXG4gICAgICAgICAgICBjb250ZW50OiAnI3skaX0nOyBcXHJcXG4gICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XFxyXFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIHtcXHJcXG4gICBkaXNwbGF5OiBncmlkO1xcclxcbiAgIGdhcDogM3B4O1xcclxcbiAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogJGNlbGxXaWR0aDtcXHJcXG4gICBncmlkLWF1dG8tcm93czogJGNlbGxXaWR0aDtcXHJcXG4gICBncmlkLWNvbHVtbjogMTtcXHJcXG4gICBncmlkLXJvdzogMjtcXHJcXG4gICAuYm9hcmRfX2NlbGwge1xcclxcbiAgICAgIGJvcmRlcjogbm9uZTtcXHJcXG5cXHJcXG4gICAgICAkbGV0dGVyczogJ2EnLCdiJywnYycsJ2QnLCdlJywnZicsJ2cnLCdoJywnaScsJ2onO1xcclxcblxcclxcbiAgICAgIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggMTAge1xcclxcbiAgICAgICAgICY6bnRoLWNoaWxkKCN7JGl9KTo6YmVmb3JlIHtcXHJcXG4gICAgICAgICAgICBjb250ZW50OiAnI3tsaXN0Lm50aCgkbGV0dGVycywgJGkpfSc7IFxcclxcbiAgICAgICAgIH1cXHJcXG4gICAgICB9XFxyXFxuICAgfVxcclxcbn1cXHJcXG4uYm9hcmRfX2NlbGwge1xcclxcbiAgIGJvcmRlcjogMXB4IHNvbGlkICRncmVlbjtcXHJcXG4gICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcbi5ib2FyZF9fYm9hcmQge1xcclxcbiAgIGdyaWQtcm93OiAyO1xcclxcbiAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgZ2FwOiAzcHg7XFxyXFxuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsICRjZWxsV2lkdGgpO1xcclxcbiAgIGdyaWQtYXV0by1yb3dzOiAkY2VsbFdpZHRoO1xcclxcbiAgIC5ib2FyZF9fY2VsbCB7XFxyXFxuICAgICAgJjpob3ZlciB7XFxyXFxuICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGdyZWVuO1xcclxcbiAgICAgICAgIGNvbG9yOiBibGFjaztcXHJcXG4gICAgICB9XFxyXFxuICAgfVxcclxcbn1cXHJcXG4jZXJyb3ItbWVzc2FnZSB7XFxyXFxuICAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICBtYXgtd2lkdGg6IDUwMHB4O1xcclxcbiAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxyXFxuICAgbWFyZ2luLXRvcDogMXJlbTtcXHJcXG4gICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxyXFxuICAgcGFkZGluZzogMCAxcmVtO1xcclxcbn1cXHJcXG4jY3B1LWJvYXJkLWNvbnRhaW5lciB7XFxyXFxuICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICBtYXJnaW4tdG9wOiAycmVtO1xcclxcbn1cXHJcXG4ucGxheWVyLWJ1dHRvbnMge1xcclxcbiAgIHVsIHtcXHJcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgbWFyZ2luOiAycmVtIDA7XFxyXFxuICAgfVxcclxcbiAgIHVsIGxpIHtcXHJcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgICAgbWFyZ2luLWJvdHRvbTogLjVyZW07XFxyXFxuICAgfVxcclxcbn1cXHJcXG4uc2hpcHMtdGFibGUge1xcclxcbiAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XFxyXFxuICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXHJcXG4gICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxyXFxuXFxyXFxuICAgdGQsIHRoIHtcXHJcXG4gICAgICBwYWRkaW5nOiAuNXJlbTtcXHJcXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XFxyXFxuICAgfVxcclxcbn1cXHJcXG4jc3RhcnQtYnV0dG9uIHtcXHJcXG4gICB2aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxufVxcclxcbi5yZXNldC1jb250YWluZXIge1xcclxcbiAgIGZvbnQtc2l6ZTogMSw1cmVtO1xcclxcbiAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICBtYXJnaW46IDNyZW0gMDtcXHJcXG4gICBwIHtcXHJcXG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcclxcbiAgIH1cXHJcXG59XCIsXCJAdXNlICcuL3ZhcmlhYmxlcycgYXMgKjtcXHJcXG5cXHJcXG4uYnV0dG9uIHtcXHJcXG4gICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcclxcbiAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggJGdyZWVuO1xcclxcbiAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcclxcbiAgIGNvbG9yOiAkZ3JlZW47XFxyXFxuICAgcGFkZGluZzogLjVyZW0gLjhyZW07XFxyXFxuICAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xcclxcbiAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAmOmhvdmVyIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JlZW47XFxyXFxuICAgICAgY29sb3I6IGJsYWNrO1xcclxcbiAgIH1cXHJcXG4gICAmLS1oaWdobGlnaHRlZCB7XFxyXFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGdyZWVuO1xcclxcbiAgICAgIGNvbG9yOiBibGFjaztcXHJcXG4gICB9XFxyXFxuICAgJjpkaXNhYmxlZCB7XFxyXFxuICAgICAgb3BhY2l0eTogLjQ7XFxyXFxuICAgfVxcclxcbn1cIixcIkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KSB7XFxyXFxuICAgLmdyaWQge1xcclxcbiAgICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcclxcbiAgIH1cXHJcXG4gICAuc2hpcHMtdGFibGUge1xcclxcbiAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgIH1cXHJcXG4gICAjY3B1LWJvYXJkLWNvbnRhaW5lciB7XFxyXFxuICAgICAgbWFyZ2luLXRvcDogMDtcXHJcXG4gICB9XFxyXFxuICAgLnBsYXllci1idXR0b25zIHtcXHJcXG4gICAgICB1bCB7XFxyXFxuICAgICAgICAgbWFyZ2luOiAwO1xcclxcbiAgICAgICAgIG1hcmdpbi1ib3R0b206IDJyZW07XFxyXFxuICAgICAgfVxcclxcbiAgICAgIHVsIGxpIHtcXHJcXG4gICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgICB9XFxyXFxuICAgICAgLmJ1dHRvbiB7XFxyXFxuICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiR2FtZWJvYXJkIiwiR2FtZSIsIl93aW5uZXJNZXNzYWdlIiwiX2NhbkdhbWVTdGFydCIsIl9jb21wdXRlckJvYXJkIiwicGxheWVyQm9hcmQiLCJnZXRDb21wdXRlckJvYXJkIiwiZ2V0Qm9hcmQiLCJpbml0IiwicGxhY2VFbmVteUFybXkiLCJ0eXBlIiwicm93IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY29sdW1uIiwibGVuZ3RoIiwiZGlyZWN0aW9uIiwicGxhY2VTaGlwIiwiZSIsIm1lc3NhZ2UiLCJpbmNsdWRlcyIsImlzQXJteUNvbXBsZXRlIiwiY29tcHV0ZXJTaGlwc0luZm8iLCJnZXRTaGlwcyIsInJlbW92ZVNoaXAiLCJ0YWtlVHVybiIsImNlbGwiLCJhdHRhY2tQbGF5ZXIiLCJyZWNlaXZlQXR0YWNrIiwiYWxsU2hpcHNTdW5rIiwiZ2V0V2lubmVyIiwicmVzZXQiLCJ1bmRlZmluZWQiLCJTaGlwIiwiX2JvYXJkIiwiX3NoaXBzIiwidHlwZTEiLCJzaGlwcyIsIm1heCIsInN5bWJvbCIsInR5cGUyIiwidHlwZTMiLCJ0eXBlNCIsInB1c2giLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJzaGlwc0Nsb25lIiwia2V5IiwiZm9yRWFjaCIsInNoaXAiLCJjbG9uZSIsImdldExlbmd0aCIsImdldENvb3JzIiwiaSIsImdldEhpdHMiLCJoaXQiLCJnZXRCb2FyZEFuZFNoaXBzIiwiYm9hcmRDb3B5IiwiY3VycmVudFNoaXAiLCJzaGlwQ29vcnMiLCJjb29ycyIsImNvb3JkaW5hdGVzIiwiaXNOYU4iLCJOdW1iZXIiLCJFcnJvciIsInNoaXBDb29yZGluYXRlcyIsImNvb3JzQ29weSIsImN1cnJlbnRDb29yIiwibmV3U2hpcCIsIm5ld1NoaXBDb29ycyIsImVycm9yTXNnIiwiZmlsdGVyZWRTaGlwcyIsImoiLCJmaWx0ZXIiLCJzaGlwc0xvb3AiLCJyZXN1bHRNc2ciLCJyZWR1Y2UiLCJhY2MiLCJjdXJyZW50Iiwic2xpY2UiLCJ0eXBlTG9vcCIsImlzU3VuayIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjcHVCb2FyZENvbnRhaW5lciIsImNwdUJvYXJkIiwiYnV0dG9uc0NvbnRhaW5lciIsInNoaXBUYWJsZUNvdW50ZXJzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImVycm9yTWVzc2FnZSIsInN0YXJ0QnRuIiwicGxheWVyQm9hcmRDZWxscyIsImNwdUJvYXJkQ2VsbHMiLCJzaGlwc0luZm8iLCJwcmV2aW91c0NsaWNrZWRCdG4iLCJjdXJyZW50Q2VsbCIsImNlbGxzVG9IaWdobGlnaHQiLCJkaXYiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiZGF0YXNldCIsImZpbGxlZCIsImFwcGVuZCIsImNsb25lTm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbGlja2VkQnV0dG9ucyIsInNob3dQcmV2aWV3SGFuZGxlciIsInJlbW92ZVNoaXBQcmV2aWV3IiwicGxhY2VOZXdTaGlwIiwid2luZG93Iiwicm90YXRlU2hpcCIsImluaXRpYWxpemVHYW1lIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiaWQiLCJzaG93U2hpcFByZXZpZXciLCJub2RlIiwibGVuZ3RoTG9vcCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJib3JkZXJDb2xvciIsInRleHRDb250ZW50IiwiZGlzYWJsZWQiLCJ1cGRhdGVQbGF5ZXJCb2FyZCIsInVwZGF0ZVNoaXBzVGFibGUiLCJ2aXNpYmlsaXR5IiwiYm9hcmQiLCJzZWFyY2giLCJpbmRleCIsIm1zZyIsInNoaXBCdXR0b25zIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZlbnREZWZhdWx0IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInBhcmVudEVsZW1lbnQiLCJkaXNwbGF5IiwiYXR0YWNrQ3B1Qm9hcmQiLCJ0dXJuUmVzdWx0IiwidXBkYXRlQ3B1Qm9hcmQiLCJwIiwiYnV0dG9uIiwiYm9keSIsImZpcnN0RWxlbWVudENoaWxkIiwiYWZ0ZXIiLCJyZXNldEdhbWUiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJjb3VudGVyIiwiX2Nvb3JkaW5hdGVzIiwiX2xlbmd0aCIsIl9oaXRzQ291bnRlciJdLCJzb3VyY2VSb290IjoiIn0=