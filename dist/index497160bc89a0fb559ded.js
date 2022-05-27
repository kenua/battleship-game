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
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  line-height: 1;\n  background-color: black;\n  color: #1cb517;\n  margin: 16px;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\np {\n  line-height: 1.5;\n}\n\n.instructions {\n  padding: 1rem;\n  border: 1px solid #1cb517;\n  margin-top: 3rem;\n}\n.instructions h1 {\n  font-size: 1.4rem;\n}\n.instructions h2 {\n  font-size: 1.2rem;\n}\n.instructions h1, .instructions h2 {\n  margin: 1rem 0;\n}\n.instructions h1:first-child, .instructions h2:first-child {\n  margin-top: 0;\n}\n.instructions li {\n  margin-bottom: 1rem;\n}\n.instructions li:last-child {\n  margin: 0;\n}\n\n.board-section {\n  margin-bottom: 3rem;\n}\n.board-section > h1 {\n  text-align: center;\n  text-transform: uppercase;\n  font-size: 1.5rem;\n}\n\n.board {\n  font-size: 18px;\n  display: grid;\n  grid-template-columns: 30px auto;\n  justify-content: center;\n}\n\n.board__letters-container {\n  display: grid;\n  gap: 5px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n  grid-column: 2;\n  grid-row: 1;\n  margin-bottom: 10px;\n  margin-left: 10px;\n}\n.board__letters-container .board__cell {\n  border-top: none;\n  border-right: none;\n  border-left: none;\n}\n.board__letters-container .board__cell:nth-child(1)::before {\n  content: \"1\";\n}\n.board__letters-container .board__cell:nth-child(2)::before {\n  content: \"2\";\n}\n.board__letters-container .board__cell:nth-child(3)::before {\n  content: \"3\";\n}\n.board__letters-container .board__cell:nth-child(4)::before {\n  content: \"4\";\n}\n.board__letters-container .board__cell:nth-child(5)::before {\n  content: \"5\";\n}\n.board__letters-container .board__cell:nth-child(6)::before {\n  content: \"6\";\n}\n.board__letters-container .board__cell:nth-child(7)::before {\n  content: \"7\";\n}\n.board__letters-container .board__cell:nth-child(8)::before {\n  content: \"8\";\n}\n.board__letters-container .board__cell:nth-child(9)::before {\n  content: \"9\";\n}\n.board__letters-container .board__cell:nth-child(10)::before {\n  content: \"10\";\n}\n\n.board__digits-container {\n  display: grid;\n  gap: 5px;\n  grid-template-columns: 30px;\n  grid-auto-rows: 30px;\n  grid-column: 1;\n  grid-row: 2;\n}\n.board__digits-container .board__cell {\n  border-top: none;\n  border-bottom: none;\n  border-left: none;\n}\n.board__digits-container .board__cell:nth-child(1)::before {\n  content: \"a\";\n}\n.board__digits-container .board__cell:nth-child(2)::before {\n  content: \"b\";\n}\n.board__digits-container .board__cell:nth-child(3)::before {\n  content: \"c\";\n}\n.board__digits-container .board__cell:nth-child(4)::before {\n  content: \"d\";\n}\n.board__digits-container .board__cell:nth-child(5)::before {\n  content: \"e\";\n}\n.board__digits-container .board__cell:nth-child(6)::before {\n  content: \"f\";\n}\n.board__digits-container .board__cell:nth-child(7)::before {\n  content: \"g\";\n}\n.board__digits-container .board__cell:nth-child(8)::before {\n  content: \"h\";\n}\n.board__digits-container .board__cell:nth-child(9)::before {\n  content: \"i\";\n}\n.board__digits-container .board__cell:nth-child(10)::before {\n  content: \"j\";\n}\n\n.board__cell {\n  border: 1px solid #1cb517;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.board__board {\n  grid-row: 2;\n  margin-left: 10px;\n  display: grid;\n  gap: 5px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n}\n.board__board .board__cell:hover {\n  background-color: #1cb517;\n  color: black;\n}\n\n#error-message {\n  font-size: 1rem;\n  grid-column: 1/-1;\n  margin-top: 1rem;\n  margin-left: 0.5rem;\n}\n\n.player-buttons ul {\n  margin: 2rem 0;\n}\n.player-buttons ul li {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\n.ships-table {\n  margin-bottom: 2rem;\n}\n.ships-table table {\n  border: 1px solid #1cb517;\n}\n.ships-table td, .ships-table th {\n  padding: 0.5rem;\n  border: 1px solid #1cb517;\n}\n\n#start-button {\n  visibility: hidden;\n}\n\n.reset-container {\n  font-size: 1, 5rem;\n  text-align: center;\n  margin: 3rem 0;\n}\n.reset-container p {\n  margin-bottom: 1rem;\n}\n\n.button {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  background-color: black;\n  color: #1cb517;\n  padding: 0.5rem 0.8rem;\n  border: 1px solid #1cb517;\n  cursor: pointer;\n}\n.button:hover {\n  background-color: #1cb517;\n  color: black;\n}\n.button--highlighted {\n  background-color: #1cb517;\n  color: black;\n}\n.button:disabled {\n  opacity: 0.4;\n}\n\n@media only screen and (min-width: 800px) {\n  .player-board {\n    max-width: 1200px;\n    margin: 0 auto;\n    display: grid;\n    column-gap: 1rem;\n    grid-template-columns: repeat(3, 1fr);\n  }\n  .player-board h1 {\n    grid-column: 1/-1;\n    grid-row: 1;\n  }\n  .player-board .board {\n    grid-column: 2/3;\n    grid-row: 2;\n  }\n  .player-board .player-buttons {\n    grid-column: 3/4;\n    grid-row: 2;\n  }\n\n  .player-buttons ul {\n    margin: 0;\n    margin-bottom: 2rem;\n  }\n  .player-buttons ul li {\n    display: block;\n  }\n  .player-buttons .button {\n    display: block;\n    width: 100%;\n  }\n}\n@media only screen and (min-width: 1100px) {\n  .instructions {\n    margin: 0;\n    max-width: 280px;\n    position: fixed;\n    bottom: 16px;\n    left: 16px;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/_reset.scss","webpack://./src/scss/styles.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_instructions.scss","webpack://./src/scss/_board.scss","webpack://./src/scss/_buttons.scss","webpack://./src/scss/_media-queries.scss"],"names":[],"mappings":"AAAA;;;CAAA;AAMA;;;;;;;;;;;;;EAaC,SAAA;EACA,UAAA;EACA,SAAA;EACA,eAAA;EACA,aAAA;EACA,wBAAA;ACDD;;ADGA,gDAAA;AACA;;EAEC,cAAA;ACAD;;ADEA;EACC,sBAAA;EACE,6BAAA;EACF,cAAA;EACE,uBAAA;EACA,cEpCK;EFqCP,YAAA;ACCD;;ADCA;EACC,gBAAA;ACED;;ADAA;EACC,YAAA;ACGD;;ADDA;;EAEC,WAAA;EACA,aAAA;ACID;;ADFA;EACC,yBAAA;EACA,iBAAA;ACKD;;ADHA;EACC,gBAAA;ACMD;;AE3DA;EACG,aAAA;EACA,yBAAA;EACA,gBAAA;AF8DH;AE7DG;EACG,iBAAA;AF+DN;AE7DG;EACG,iBAAA;AF+DN;AE7DG;EACG,cAAA;AF+DN;AE7DG;EACG,aAAA;AF+DN;AE7DG;EACG,mBAAA;AF+DN;AE9DM;EACG,SAAA;AFgET;;AGhFA;EACG,mBAAA;AHmFH;AGlFG;EACG,kBAAA;EACA,yBAAA;EACA,iBAAA;AHoFN;;AGjFA;EACG,eAAA;EACA,aAAA;EACA,gCAAA;EACA,uBAAA;AHoFH;;AGlFA;EACG,aAAA;EACA,QAAA;EACA,uCAAA;EACA,oBApBS;EAqBT,cAAA;EACA,WAAA;EACA,mBAAA;EACA,iBAAA;AHqFH;AGpFG;EACG,gBAAA;EACA,kBAAA;EACA,iBAAA;AHsFN;AGnFS;EACG,YAAA;AHqFZ;AGtFS;EACG,YAAA;AHwFZ;AGzFS;EACG,YAAA;AH2FZ;AG5FS;EACG,YAAA;AH8FZ;AG/FS;EACG,YAAA;AHiGZ;AGlGS;EACG,YAAA;AHoGZ;AGrGS;EACG,YAAA;AHuGZ;AGxGS;EACG,YAAA;AH0GZ;AG3GS;EACG,YAAA;AH6GZ;AG9GS;EACG,aAAA;AHgHZ;;AG3GA;EACG,aAAA;EACA,QAAA;EACA,2BAxCS;EAyCT,oBAzCS;EA0CT,cAAA;EACA,WAAA;AH8GH;AG7GG;EACG,gBAAA;EACA,mBAAA;EACA,iBAAA;AH+GN;AG1GS;EACG,YAAA;AH4GZ;AG7GS;EACG,YAAA;AH+GZ;AGhHS;EACG,YAAA;AHkHZ;AGnHS;EACG,YAAA;AHqHZ;AGtHS;EACG,YAAA;AHwHZ;AGzHS;EACG,YAAA;AH2HZ;AG5HS;EACG,YAAA;AH8HZ;AG/HS;EACG,YAAA;AHiIZ;AGlIS;EACG,YAAA;AHoIZ;AGrIS;EACG,YAAA;AHuIZ;;AGlIA;EACG,yBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;AHqIH;;AGnIA;EACG,WAAA;EACA,iBAAA;EACA,aAAA;EACA,QAAA;EACA,uCAAA;EACA,oBAtES;AH4MZ;AGpIM;EACG,yBF5ED;EE6EC,YAAA;AHsIT;;AGlIA;EACG,eAAA;EACA,iBAAA;EACA,gBAAA;EACA,mBAAA;AHqIH;;AGlIG;EACG,cAAA;AHqIN;AGnIG;EACG,qBAAA;EACA,qBAAA;AHqIN;;AGlIA;EACG,mBAAA;AHqIH;AGnIG;EACG,yBAAA;AHqIN;AGnIG;EACG,eAAA;EACA,yBAAA;AHqIN;;AGlIA;EACG,kBAAA;AHqIH;;AGnIA;EACG,kBAAA;EACA,kBAAA;EACA,cAAA;AHsIH;AGrIG;EACG,mBAAA;AHuIN;;AIxPA;EACG,sBAAA;EACA,6BAAA;EACA,uBAAA;EACA,cHNK;EGOL,sBAAA;EACA,yBAAA;EACA,eAAA;AJ2PH;AI1PG;EACG,yBHXE;EGYF,YAAA;AJ4PN;AI1PG;EACG,yBHfE;EGgBF,YAAA;AJ4PN;AI1PG;EACG,YAAA;AJ4PN;;AK/QA;EACG;IACG,iBAAA;IACA,cAAA;IACA,aAAA;IACA,gBAAA;IACA,qCAAA;ELkRJ;EKjRI;IACG,iBAAA;IACA,WAAA;ELmRP;EKjRI;IACG,gBAAA;IACA,WAAA;ELmRP;EKjRI;IACG,gBAAA;IACA,WAAA;ELmRP;;EK/QI;IACG,SAAA;IACA,mBAAA;ELkRP;EKhRI;IACG,cAAA;ELkRP;EKhRI;IACG,cAAA;IACA,WAAA;ELkRP;AACF;AK/QA;EACG;IACG,SAAA;IACA,gBAAA;IACA,eAAA;IACA,YAAA;IACA,UAAA;ELiRJ;AACF","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n@use './variables' as *;\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, center,\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed, \r\nfigure, figcaption, footer, header, hgroup, \r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tfont-size: 100%;\r\n\tfont: inherit;\r\n\tvertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure, \r\nfooter, header, hgroup, menu, nav, section {\r\n\tdisplay: block;\r\n}\r\nbody {\r\n\tfont-family: monospace;\r\n   text-shadow: 0 0 10px $green;\r\n\tline-height: 1;\r\n   background-color: black;\r\n   color: $green;\r\n\tmargin: 16px;\r\n}\r\nol, ul {\r\n\tlist-style: none;\r\n}\r\nblockquote, q {\r\n\tquotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n\tcontent: '';\r\n\tcontent: none;\r\n}\r\ntable {\r\n\tborder-collapse: collapse;\r\n\tborder-spacing: 0;\r\n}\r\np {\r\n\tline-height: 1.5;\r\n}","/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  line-height: 1;\n  background-color: black;\n  color: #1cb517;\n  margin: 16px;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\np {\n  line-height: 1.5;\n}\n\n.instructions {\n  padding: 1rem;\n  border: 1px solid #1cb517;\n  margin-top: 3rem;\n}\n.instructions h1 {\n  font-size: 1.4rem;\n}\n.instructions h2 {\n  font-size: 1.2rem;\n}\n.instructions h1, .instructions h2 {\n  margin: 1rem 0;\n}\n.instructions h1:first-child, .instructions h2:first-child {\n  margin-top: 0;\n}\n.instructions li {\n  margin-bottom: 1rem;\n}\n.instructions li:last-child {\n  margin: 0;\n}\n\n.board-section {\n  margin-bottom: 3rem;\n}\n.board-section > h1 {\n  text-align: center;\n  text-transform: uppercase;\n  font-size: 1.5rem;\n}\n\n.board {\n  font-size: 18px;\n  display: grid;\n  grid-template-columns: 30px auto;\n  justify-content: center;\n}\n\n.board__letters-container {\n  display: grid;\n  gap: 5px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n  grid-column: 2;\n  grid-row: 1;\n  margin-bottom: 10px;\n  margin-left: 10px;\n}\n.board__letters-container .board__cell {\n  border-top: none;\n  border-right: none;\n  border-left: none;\n}\n.board__letters-container .board__cell:nth-child(1)::before {\n  content: \"1\";\n}\n.board__letters-container .board__cell:nth-child(2)::before {\n  content: \"2\";\n}\n.board__letters-container .board__cell:nth-child(3)::before {\n  content: \"3\";\n}\n.board__letters-container .board__cell:nth-child(4)::before {\n  content: \"4\";\n}\n.board__letters-container .board__cell:nth-child(5)::before {\n  content: \"5\";\n}\n.board__letters-container .board__cell:nth-child(6)::before {\n  content: \"6\";\n}\n.board__letters-container .board__cell:nth-child(7)::before {\n  content: \"7\";\n}\n.board__letters-container .board__cell:nth-child(8)::before {\n  content: \"8\";\n}\n.board__letters-container .board__cell:nth-child(9)::before {\n  content: \"9\";\n}\n.board__letters-container .board__cell:nth-child(10)::before {\n  content: \"10\";\n}\n\n.board__digits-container {\n  display: grid;\n  gap: 5px;\n  grid-template-columns: 30px;\n  grid-auto-rows: 30px;\n  grid-column: 1;\n  grid-row: 2;\n}\n.board__digits-container .board__cell {\n  border-top: none;\n  border-bottom: none;\n  border-left: none;\n}\n.board__digits-container .board__cell:nth-child(1)::before {\n  content: \"a\";\n}\n.board__digits-container .board__cell:nth-child(2)::before {\n  content: \"b\";\n}\n.board__digits-container .board__cell:nth-child(3)::before {\n  content: \"c\";\n}\n.board__digits-container .board__cell:nth-child(4)::before {\n  content: \"d\";\n}\n.board__digits-container .board__cell:nth-child(5)::before {\n  content: \"e\";\n}\n.board__digits-container .board__cell:nth-child(6)::before {\n  content: \"f\";\n}\n.board__digits-container .board__cell:nth-child(7)::before {\n  content: \"g\";\n}\n.board__digits-container .board__cell:nth-child(8)::before {\n  content: \"h\";\n}\n.board__digits-container .board__cell:nth-child(9)::before {\n  content: \"i\";\n}\n.board__digits-container .board__cell:nth-child(10)::before {\n  content: \"j\";\n}\n\n.board__cell {\n  border: 1px solid #1cb517;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.board__board {\n  grid-row: 2;\n  margin-left: 10px;\n  display: grid;\n  gap: 5px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n}\n.board__board .board__cell:hover {\n  background-color: #1cb517;\n  color: black;\n}\n\n#error-message {\n  font-size: 1rem;\n  grid-column: 1/-1;\n  margin-top: 1rem;\n  margin-left: 0.5rem;\n}\n\n.player-buttons ul {\n  margin: 2rem 0;\n}\n.player-buttons ul li {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\n.ships-table {\n  margin-bottom: 2rem;\n}\n.ships-table table {\n  border: 1px solid #1cb517;\n}\n.ships-table td, .ships-table th {\n  padding: 0.5rem;\n  border: 1px solid #1cb517;\n}\n\n#start-button {\n  visibility: hidden;\n}\n\n.reset-container {\n  font-size: 1, 5rem;\n  text-align: center;\n  margin: 3rem 0;\n}\n.reset-container p {\n  margin-bottom: 1rem;\n}\n\n.button {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  background-color: black;\n  color: #1cb517;\n  padding: 0.5rem 0.8rem;\n  border: 1px solid #1cb517;\n  cursor: pointer;\n}\n.button:hover {\n  background-color: #1cb517;\n  color: black;\n}\n.button--highlighted {\n  background-color: #1cb517;\n  color: black;\n}\n.button:disabled {\n  opacity: 0.4;\n}\n\n@media only screen and (min-width: 800px) {\n  .player-board {\n    max-width: 1200px;\n    margin: 0 auto;\n    display: grid;\n    column-gap: 1rem;\n    grid-template-columns: repeat(3, 1fr);\n  }\n  .player-board h1 {\n    grid-column: 1/-1;\n    grid-row: 1;\n  }\n  .player-board .board {\n    grid-column: 2/3;\n    grid-row: 2;\n  }\n  .player-board .player-buttons {\n    grid-column: 3/4;\n    grid-row: 2;\n  }\n\n  .player-buttons ul {\n    margin: 0;\n    margin-bottom: 2rem;\n  }\n  .player-buttons ul li {\n    display: block;\n  }\n  .player-buttons .button {\n    display: block;\n    width: 100%;\n  }\n}\n@media only screen and (min-width: 1100px) {\n  .instructions {\n    margin: 0;\n    max-width: 280px;\n    position: fixed;\n    bottom: 16px;\n    left: 16px;\n  }\n}","$green: #1cb517;","@use './variables' as *;\r\n\r\n.instructions {\r\n   padding: 1rem;\r\n   border: 1px solid $green;\r\n   margin-top: 3rem;\r\n   h1 {\r\n      font-size: 1.4rem;\r\n   }\r\n   h2 {\r\n      font-size: 1.2rem;\r\n   }\r\n   h1, h2 {\r\n      margin: 1rem 0;\r\n   }\r\n   h1:first-child, h2:first-child {\r\n      margin-top: 0;\r\n   }\r\n   li {\r\n      margin-bottom: 1rem;\r\n      &:last-child {\r\n         margin: 0;\r\n      }\r\n   }\r\n}","@use 'sass:list';\r\n@use './variables' as *;\r\n\r\n$cellWidth: 30px;\r\n\r\n.board-section {\r\n   margin-bottom: 3rem;\r\n   & > h1 {\r\n      text-align: center;\r\n      text-transform: uppercase;\r\n      font-size: 1.5rem;\r\n   }\r\n}\r\n.board {\r\n   font-size: 18px;\r\n   display: grid;\r\n   grid-template-columns: $cellWidth auto;\r\n   justify-content: center;\r\n}\r\n.board__letters-container {\r\n   display: grid;\r\n   gap: 5px;\r\n   grid-template-columns: repeat(10, $cellWidth);\r\n   grid-auto-rows: $cellWidth;\r\n   grid-column: 2;\r\n   grid-row: 1;\r\n   margin-bottom: 10px;\r\n   margin-left: 10px;\r\n   .board__cell {\r\n      border-top: none;\r\n      border-right: none;\r\n      border-left: none;\r\n\r\n      @for $i from 1 through 10 {\r\n         &:nth-child(#{$i})::before {\r\n            content: '#{$i}'; \r\n         }\r\n      }\r\n   }\r\n}\r\n.board__digits-container {\r\n   display: grid;\r\n   gap: 5px;\r\n   grid-template-columns: $cellWidth;\r\n   grid-auto-rows: $cellWidth;\r\n   grid-column: 1;\r\n   grid-row: 2;\r\n   .board__cell {\r\n      border-top: none;\r\n      border-bottom: none;\r\n      border-left: none;\r\n\r\n      $letters: 'a','b','c','d','e','f','g','h','i','j';\r\n\r\n      @for $i from 1 through 10 {\r\n         &:nth-child(#{$i})::before {\r\n            content: '#{list.nth($letters, $i)}'; \r\n         }\r\n      }\r\n   }\r\n}\r\n.board__cell {\r\n   border: 1px solid $green;\r\n   display: flex;\r\n   justify-content: center;\r\n   align-items: center;\r\n}\r\n.board__board {\r\n   grid-row: 2;\r\n   margin-left: 10px;\r\n   display: grid;\r\n   gap: 5px;\r\n   grid-template-columns: repeat(10, $cellWidth);\r\n   grid-auto-rows: $cellWidth;\r\n   .board__cell {\r\n      &:hover {\r\n         background-color: $green;\r\n         color: black;\r\n      }\r\n   }\r\n}\r\n#error-message {\r\n   font-size: 1rem;\r\n   grid-column: 1 / -1;\r\n   margin-top: 1rem;\r\n   margin-left: .5rem;\r\n}\r\n.player-buttons {\r\n   ul {\r\n      margin: 2rem 0;\r\n   }\r\n   ul li {\r\n      display: inline-block;\r\n      margin-bottom: .5rem;\r\n   }\r\n}\r\n.ships-table {\r\n   margin-bottom: 2rem;\r\n\r\n   table {\r\n      border: 1px solid $green;\r\n   }\r\n   td, th {\r\n      padding: .5rem;\r\n      border: 1px solid $green;\r\n   }\r\n}\r\n#start-button {\r\n   visibility: hidden;\r\n}\r\n.reset-container {\r\n   font-size: 1,5rem;\r\n   text-align: center;\r\n   margin: 3rem 0;\r\n   p {\r\n      margin-bottom: 1rem;\r\n   }\r\n}","@use './variables' as *;\r\n\r\n.button {\r\n   font-family: monospace;\r\n   text-shadow: 0 0 10px $green;\r\n   background-color: black;\r\n   color: $green;\r\n   padding: .5rem .8rem;\r\n   border: 1px solid $green;\r\n   cursor: pointer;\r\n   &:hover {\r\n      background-color: $green;\r\n      color: black;\r\n   }\r\n   &--highlighted {\r\n      background-color: $green;\r\n      color: black;\r\n   }\r\n   &:disabled {\r\n      opacity: .4;\r\n   }\r\n}","@media only screen and (min-width: 800px) {\r\n   .player-board {\r\n      max-width: 1200px;\r\n      margin: 0 auto;\r\n      display: grid;\r\n      column-gap: 1rem;\r\n      grid-template-columns: repeat(3, 1fr);\r\n      h1 {\r\n         grid-column: 1 / -1;\r\n         grid-row: 1;\r\n      }\r\n      .board {\r\n         grid-column: 2 / 3;\r\n         grid-row: 2;\r\n      }\r\n      .player-buttons {\r\n         grid-column: 3 / 4;\r\n         grid-row: 2;\r\n      }\r\n   }\r\n   .player-buttons {\r\n      ul {\r\n         margin: 0;\r\n         margin-bottom: 2rem;\r\n      }\r\n      ul li {\r\n         display: block;\r\n      }\r\n      .button {\r\n         display: block;\r\n         width: 100%;\r\n      }\r\n   }\r\n}\r\n@media only screen and (min-width: 1100px) {\r\n   .instructions {\r\n      margin: 0;\r\n      max-width: 280px;\r\n      position: fixed;\r\n      bottom: 16px;\r\n      left: 16px;\r\n   }\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxPQUFPLE1BQU0sVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsVUFBVSxVQUFVLFdBQVcsWUFBWSxNQUFNLE1BQU0sWUFBWSxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxPQUFPLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLE9BQU8sTUFBTSxLQUFLLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLE1BQU0sTUFBTSxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxPQUFPLE1BQU0sVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLFVBQVUsTUFBTSxLQUFLLE1BQU0sS0FBSyxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsTUFBTSxrS0FBa0ssMGhCQUEwaEIsZ0JBQWdCLGlCQUFpQixnQkFBZ0Isc0JBQXNC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REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3NzL3N0eWxlcy5zY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3Njc3Mvc3R5bGVzLnNjc3M/MzIxZiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XHJcblxyXG5jb25zdCBHYW1lID0gKGZ1bmN0aW9uICgpIHtcclxuICAgbGV0IF93aW5uZXJNZXNzYWdlO1xyXG4gICBsZXQgX2NhbkdhbWVTdGFydCA9IGZhbHNlO1xyXG4gICBsZXQgX2NvbXB1dGVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcclxuICAgbGV0IHBsYXllckJvYXJkID0gR2FtZWJvYXJkKCk7XHJcblxyXG4gICBjb25zdCBnZXRDb21wdXRlckJvYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX2NvbXB1dGVyQm9hcmQuZ2V0Qm9hcmQoKTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBwbGFjZUVuZW15QXJteSA9IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIHBsYWNlIHNoaXBzXHJcbiAgICAgICAgICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSB0eXBlLmxlbmd0aDtcclxuICAgICAgICAgICAgbGV0IGRpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpID09PSAwID8gXCJ2ZXJcIiA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICBfY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoW3JvdywgY29sdW1uXSwgbGVuZ3RoLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICBwbGFjZUVuZW15QXJteSh0eXBlKTtcclxuICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBpZiAoIWUubWVzc2FnZS5pbmNsdWRlcyhcIkV4Y2VlZGVkIG51bWJlciBvZiBzaGlwc1wiKSkge1xyXG4gICAgICAgICAgICAgICBwbGFjZUVuZW15QXJteSh0eXBlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgcmV0dXJuIFwiZmluaXNoZWRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBmaWxsIGNvbXB1dGVyQm9hcmQgd2l0aCBzaGlwc1xyXG4gICAgICBpZiAoIV9jb21wdXRlckJvYXJkLmlzQXJteUNvbXBsZXRlKCkpIHtcclxuICAgICAgICAgbGV0IGNvbXB1dGVyU2hpcHNJbmZvID0gX2NvbXB1dGVyQm9hcmQuZ2V0U2hpcHMoKTtcclxuXHJcbiAgICAgICAgIGZvciAobGV0IHR5cGUgaW4gY29tcHV0ZXJTaGlwc0luZm8pIHtcclxuICAgICAgICAgICAgcGxhY2VFbmVteUFybXkoY29tcHV0ZXJTaGlwc0luZm9bdHlwZV0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwbGF5ZXJCb2FyZC5pc0FybXlDb21wbGV0ZSgpKSB7XHJcbiAgICAgICAgIF9jYW5HYW1lU3RhcnQgPSB0cnVlO1xyXG4gICAgICAgICB0aGlzLnBsYXllckJvYXJkLnBsYWNlU2hpcCA9IG51bGw7XHJcbiAgICAgICAgIHRoaXMucGxheWVyQm9hcmQucmVtb3ZlU2hpcCA9IG51bGw7XHJcbiAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHRha2VUdXJuID0gZnVuY3Rpb24gKHJvdywgY2VsbCkge1xyXG4gICAgICBpZiAoIV9jYW5HYW1lU3RhcnQpIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgaWYgKCFfd2lubmVyTWVzc2FnZSkge1xyXG4gICAgICAgICBsZXQgYXR0YWNrUGxheWVyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgICAgICAgICBsZXQgY2VsbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuXHJcbiAgICAgICAgICAgICAgIHRoaXMucGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNlbGwpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgZS5tZXNzYWdlLmluY2x1ZGVzKFxyXG4gICAgICAgICAgICAgICAgICAgICBcIllvdSBhbHJlYWR5IGF0dGFja2VkIHRoZSBmb2xsb3dpbmcgY29vcmRpbmF0ZXNcIlxyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICBhdHRhY2tQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAvLyBhdHRhY2sgY29tcHV0ZXJcclxuICAgICAgICAgX2NvbXB1dGVyQm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNlbGwpO1xyXG5cclxuICAgICAgICAgaWYgKF9jb21wdXRlckJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIF93aW5uZXJNZXNzYWdlID0gXCJQbGF5ZXIgd29uIHRoZSBtYXRjaFwiO1xyXG4gICAgICAgICAgICByZXR1cm4gX3dpbm5lck1lc3NhZ2U7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8vIGF0dGFjayBwbGF5ZXJcclxuICAgICAgICAgYXR0YWNrUGxheWVyKCk7XHJcblxyXG4gICAgICAgICBpZiAodGhpcy5wbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xyXG4gICAgICAgICAgICBfd2lubmVyTWVzc2FnZSA9IFwiQ29tcHV0ZXIgd29uIHRoZSBtYXRjaFwiO1xyXG4gICAgICAgICAgICByZXR1cm4gX3dpbm5lck1lc3NhZ2U7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gX3dpbm5lck1lc3NhZ2U7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBnZXRXaW5uZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBfd2lubmVyTWVzc2FnZTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHJlc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBfd2lubmVyTWVzc2FnZSA9IHVuZGVmaW5lZDtcclxuICAgICAgX2NhbkdhbWVTdGFydCA9IGZhbHNlO1xyXG4gICAgICBfY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xyXG4gICAgICB0aGlzLnBsYXllckJvYXJkID0gR2FtZWJvYXJkKCk7XHJcbiAgIH07XHJcblxyXG4gICByZXR1cm4ge1xyXG4gICAgICBwbGF5ZXJCb2FyZCxcclxuICAgICAgZ2V0Q29tcHV0ZXJCb2FyZCxcclxuICAgICAgaW5pdCxcclxuICAgICAgdGFrZVR1cm4sXHJcbiAgICAgIGdldFdpbm5lcixcclxuICAgICAgcmVzZXQsXHJcbiAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xyXG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XHJcblxyXG5jb25zdCBHYW1lYm9hcmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgIGxldCBfYm9hcmQgPSBbXTtcclxuICAgbGV0IF9zaGlwcyA9IHtcclxuICAgICAgdHlwZTE6IHsgc2hpcHM6IFtdLCBsZW5ndGg6IDUsIG1heDogMSwgc3ltYm9sOiBcIkFcIiB9LFxyXG4gICAgICB0eXBlMjogeyBzaGlwczogW10sIGxlbmd0aDogNCwgbWF4OiAyLCBzeW1ib2w6IFwiQlwiIH0sXHJcbiAgICAgIHR5cGUzOiB7IHNoaXBzOiBbXSwgbGVuZ3RoOiAzLCBtYXg6IDMsIHN5bWJvbDogXCJDXCIgfSxcclxuICAgICAgdHlwZTQ6IHsgc2hpcHM6IFtdLCBsZW5ndGg6IDIsIG1heDogNCwgc3ltYm9sOiBcIkRcIiB9LFxyXG4gICB9O1xyXG5cclxuICAgLy8gY3JlYXRlIDEwIHJvd3MgYW5kIDEwIGNlbGxzIGZvciBfYm9hcmRcclxuICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XHJcbiAgICAgIF9ib2FyZC5wdXNoKFtdKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGNlbGwgPSAwOyBjZWxsIDwgMTA7IGNlbGwrKykge1xyXG4gICAgICAgICBfYm9hcmRbcm93XS5wdXNoKFwiflwiKTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICBjb25zdCBnZXRCb2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX2JvYXJkKSk7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBnZXRTaGlwcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IHNoaXBzQ2xvbmUgPSB7fTtcclxuXHJcbiAgICAgIGZvciAobGV0IGtleSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgc2hpcHNDbG9uZVtrZXldID0ge307XHJcbiAgICAgICAgIHNoaXBzQ2xvbmVba2V5XS5zaGlwcyA9IFtdO1xyXG4gICAgICAgICBzaGlwc0Nsb25lW2tleV0ubGVuZ3RoID0gX3NoaXBzW2tleV0ubGVuZ3RoO1xyXG4gICAgICAgICBzaGlwc0Nsb25lW2tleV0ubWF4ID0gX3NoaXBzW2tleV0ubWF4O1xyXG5cclxuICAgICAgICAgX3NoaXBzW2tleV0uc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2xvbmUgPSBTaGlwKHNoaXAuZ2V0TGVuZ3RoKCksIHNoaXAuZ2V0Q29vcnMoKSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuZ2V0SGl0cygpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgY2xvbmUuaGl0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNoaXBzQ2xvbmVba2V5XS5zaGlwcy5wdXNoKGNsb25lKTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBzaGlwc0Nsb25lO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgZ2V0Qm9hcmRBbmRTaGlwcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGJvYXJkQ29weSA9IHRoaXMuZ2V0Qm9hcmQoKTtcclxuXHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2hpcCA9IF9zaGlwc1t0eXBlXS5zaGlwc1tpXTtcclxuICAgICAgICAgICAgbGV0IHNoaXBDb29ycyA9IGN1cnJlbnRTaGlwLmdldENvb3JzKCk7XHJcblxyXG4gICAgICAgICAgICBzaGlwQ29vcnMuZm9yRWFjaCgoY29vcnMpID0+IHtcclxuICAgICAgICAgICAgICAgbGV0IFtyb3csIGNvbHVtbl0gPSBjb29ycztcclxuXHJcbiAgICAgICAgICAgICAgIGlmIChib2FyZENvcHlbcm93XVtjb2x1bW5dID09PSBcIn5cIikge1xyXG4gICAgICAgICAgICAgICAgICBib2FyZENvcHlbcm93XVtjb2x1bW5dID0gX3NoaXBzW3R5cGVdLnN5bWJvbDtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYm9hcmRDb3B5O1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgcGxhY2VTaGlwID0gZnVuY3Rpb24gKGNvb3JkaW5hdGVzID0gWzAsIDBdLCBsZW5ndGggPSAyLCBkaXJlY3Rpb24pIHtcclxuICAgICAgaWYgKGlzTmFOKE51bWJlcihjb29yZGluYXRlc1swXSkpIHx8IGlzTmFOKE51bWJlcihjb29yZGluYXRlc1sxXSkpKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvb3JkaW5hdGVzIHNob3VsZCBiZSBudW1iZXJzXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNOYU4oTnVtYmVyKGxlbmd0aCkpIHx8IGxlbmd0aCA+IDUgfHwgbGVuZ3RoIDwgMikge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMZW5ndGggc2hvdWxkIGJlIGEgbnVtYmVyIGJldHdlZW4gMiBhbmQgNVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHNoaXBDb29yZGluYXRlcyA9IFtbLi4uY29vcmRpbmF0ZXNdXTtcclxuXHJcbiAgICAgIC8vIGdlbmVyYXRlIGNvb3JkaW5hdGVzIHRoYXQgZXhwYW5kIGJhc2VkIG9uIGxlbmd0aCBhbmQgZGlyZWN0aW9uXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgIC8vIGV4cGFuZCBjb29yZGluYXRlcyB2ZXJ0aWNhbGx5XHJcbiAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwidmVyXCIpIHtcclxuICAgICAgICAgICAgbGV0IGNvb3JzQ29weSA9IFsuLi5zaGlwQ29vcmRpbmF0ZXNbaV1dO1xyXG4gICAgICAgICAgICBjb29yc0NvcHlbMF0rKztcclxuICAgICAgICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goY29vcnNDb3B5KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGV4cGFuZCBjb29yZGluYXRlcyBob3Jpem9udGFsbHlcclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGNvb3JzQ29weSA9IFsuLi5zaGlwQ29vcmRpbmF0ZXNbaV1dO1xyXG4gICAgICAgICAgICBjb29yc0NvcHlbMV0rKztcclxuICAgICAgICAgICAgc2hpcENvb3JkaW5hdGVzLnB1c2goY29vcnNDb3B5KTtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjaGVjayBpZiBzaGlwQ29vcmRpbmF0ZXMgYXJlIHZhbGlkXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgIGxldCBjdXJyZW50Q29vciA9IHNoaXBDb29yZGluYXRlc1tpXTtcclxuXHJcbiAgICAgICAgIGlmIChjdXJyZW50Q29vclswXSA+IDkgfHwgY3VycmVudENvb3JbMF0gPCAwKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGV4cGFuZHMgdG8gd3JvbmcgY29vcmRpbmF0ZXNcIik7XHJcbiAgICAgICAgIGlmIChjdXJyZW50Q29vclsxXSA+IDkgfHwgY3VycmVudENvb3JbMV0gPCAwKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGV4cGFuZHMgdG8gd3JvbmcgY29vcmRpbmF0ZXNcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBuZXdTaGlwID0gU2hpcChsZW5ndGgsIHNoaXBDb29yZGluYXRlcyk7XHJcblxyXG4gICAgICAvLyBjaGVjayBpZiBuZXdTaGlwIGNhbiBiZSBhZGRlZCB0byBfc2hpcHNcclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgaWYgKF9zaGlwc1t0eXBlXS5sZW5ndGggPT09IG5ld1NoaXAuZ2V0TGVuZ3RoKCkpIHtcclxuICAgICAgICAgICAgaWYgKF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGggPCBfc2hpcHNbdHlwZV0ubWF4KSB7XHJcbiAgICAgICAgICAgICAgIC8vIGNoZWNrIGV2ZXJ5IHNoaXAncyBjb29yZGluYXRlcyB0byBzZWUgaWYgbmV3U2hpcCBkb2VzIG5vdCBoYXZlXHJcbiAgICAgICAgICAgICAgIC8vIHRoZSBzYW1lIGNvb3JkaW5hdGVzIG9mIGFub3RoZXIgc2hpcFxyXG4gICAgICAgICAgICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICAgICAgICAgICBfc2hpcHNbdHlwZV0uc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICBzaGlwLmdldENvb3JzKCkuZm9yRWFjaCgoc2hpcENvb3JzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NoaXAuZ2V0Q29vcnMoKS5mb3JFYWNoKChuZXdTaGlwQ29vcnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlwQ29vcnNbMF0gPT09IG5ld1NoaXBDb29yc1swXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlwQ29vcnNbMV0gPT09IG5ld1NoaXBDb29yc1sxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbmV3IHNoaXAgY2Fubm90IGJlIHBsYWNlIG92ZXIgYW5vdGhlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgX3NoaXBzW3R5cGVdLnNoaXBzLnB1c2gobmV3U2hpcCk7XHJcbiAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBsZXQgZXJyb3JNc2cgPSBgRXhjZWVkZWQgbnVtYmVyIG9mIHNoaXBzOiBtYXhpbXVuIG51bWJlciBmb3IgJHtsZW5ndGh9IGxlbmd0aCBzaGlwcyBpcyAke19zaGlwc1t0eXBlXS5tYXh9YDtcclxuICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHJlbW92ZVNoaXAgPSBmdW5jdGlvbiAocm93ID0gMCwgY2VsbCA9IDApIHtcclxuICAgICAgbGV0IGZpbHRlcmVkU2hpcHM7XHJcbiAgICAgIGxldCBjb29ycztcclxuXHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIC8vIHNlYXJjaCBhbmQgZmlsdGVyIG91dCBzaGlwIHRoYXQgaGFzIFwicm93XCIgYW5kIFwiY2VsbFwiIGFzIGNvb3JkaW5hdGVzXHJcbiAgICAgICAgIHNoaXBzTG9vcDogZm9yIChsZXQgaSA9IDA7IGkgPCBfc2hpcHNbdHlwZV0uc2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTaGlwID0gX3NoaXBzW3R5cGVdLnNoaXBzW2ldO1xyXG4gICAgICAgICAgICBsZXQgc2hpcENvb3JzID0gY3VycmVudFNoaXAuZ2V0Q29vcnMoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2hpcENvb3JzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgIGlmIChzaGlwQ29vcnNbal1bMF0gPT09IHJvdyAmJiBzaGlwQ29vcnNbal1bMV0gPT09IGNlbGwpIHtcclxuICAgICAgICAgICAgICAgICAgZmlsdGVyZWRTaGlwcyA9IF9zaGlwc1t0eXBlXS5zaGlwcy5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgIChzaGlwKSA9PiBzaGlwICE9PSBjdXJyZW50U2hpcFxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICBjb29ycyA9IHNoaXBDb29ycztcclxuICAgICAgICAgICAgICAgICAgYnJlYWsgc2hpcHNMb29wO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgICAvLyB1cGRhdGUgX3NoaXBzW3R5cGVdLnNoaXBzIGFycmF5XHJcbiAgICAgICAgIGlmIChmaWx0ZXJlZFNoaXBzKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHRNc2cgPSBcIlJlbW92ZWQgc2hpcCB3aXRoIHRoZSBmb2xsb3dpbmcgY29vcmRpbmF0ZXM6IFwiO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0TXNnICs9IGNvb3JzXHJcbiAgICAgICAgICAgICAgIC5yZWR1Y2UoXHJcbiAgICAgICAgICAgICAgICAgIChhY2MsIGN1cnJlbnQpID0+IGFjYyArIGBbJHtjdXJyZW50WzBdfSwgJHtjdXJyZW50WzFdfV0sIGAsXHJcbiAgICAgICAgICAgICAgICAgIFwiXCJcclxuICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAuc2xpY2UoMCwgLTIpO1xyXG5cclxuICAgICAgICAgICAgX3NoaXBzW3R5cGVdLnNoaXBzID0gZmlsdGVyZWRTaGlwcztcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdE1zZztcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYFRoZXJlIGlzIG5vIHNoaXAgaW4gWyR7cm93fSwke2NlbGx9XSBjb29yZGluYXRlc2A7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBpc0FybXlDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgaWYgKF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGggPCBfc2hpcHNbdHlwZV0ubWF4KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uIChyb3cgPSAwLCBjZWxsID0gMCkge1xyXG4gICAgICBsZXQgc3ltYm9sID0gXCJNXCI7XHJcblxyXG4gICAgICBpZiAocm93ID4gOSB8fCByb3cgPCAwIHx8IGNlbGwgPiA5IHx8IGNlbGwgPCAwKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgYFByb3ZpZGVkIGNvb3JkaW5hdGVzIGFyZSBub3QgdmFsaWQ6IFske3Jvd30sJHtjZWxsfV1gXHJcbiAgICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfYm9hcmRbcm93XVtjZWxsXSAhPT0gXCJ+XCIpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICBgWW91IGFscmVhZHkgYXR0YWNrZWQgdGhlIGZvbGxvd2luZyBjb29yZGluYXRlczogWyR7cm93fSwke2NlbGx9XWBcclxuICAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY2hlY2sgaWYgYW55IHNoaXAgaGFzIFwicm93XCIgYW5kIFwiY2VsbFwiIGFzIGNvb3JkaW5hdGVzIGFuZCBoaXQgaXRcclxuICAgICAgdHlwZUxvb3A6IGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2hpcCA9IF9zaGlwc1t0eXBlXS5zaGlwc1tpXTtcclxuICAgICAgICAgICAgbGV0IHNoaXBDb29ycyA9IGN1cnJlbnRTaGlwLmdldENvb3JzKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNoaXBDb29ycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICBpZiAoc2hpcENvb3JzW2pdWzBdID09PSByb3cgJiYgc2hpcENvb3JzW2pdWzFdID09PSBjZWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRTaGlwLmhpdCgpO1xyXG4gICAgICAgICAgICAgICAgICBzeW1ib2wgPSBcIkhcIjtcclxuICAgICAgICAgICAgICAgICAgYnJlYWsgdHlwZUxvb3A7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIF9ib2FyZFtyb3ddW2NlbGxdID0gc3ltYm9sO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGFsbFNoaXBzU3VuayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfc2hpcHNbdHlwZV0uc2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFfc2hpcHNbdHlwZV0uc2hpcHNbaV0uaXNTdW5rKCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgfTtcclxuXHJcbiAgIHJldHVybiB7XHJcbiAgICAgIGdldEJvYXJkLFxyXG4gICAgICBnZXRTaGlwcyxcclxuICAgICAgZ2V0Qm9hcmRBbmRTaGlwcyxcclxuICAgICAgcGxhY2VTaGlwLFxyXG4gICAgICByZW1vdmVTaGlwLFxyXG4gICAgICBpc0FybXlDb21wbGV0ZSxcclxuICAgICAgcmVjZWl2ZUF0dGFjayxcclxuICAgICAgYWxsU2hpcHNTdW5rLFxyXG4gICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xyXG4iLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9nYW1lLmpzXCI7XHJcbmltcG9ydCBcIi4vc2Nzcy9zdHlsZXMuc2Nzc1wiO1xyXG5cclxuY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllckJvYXJkXCIpO1xyXG5jb25zdCBjcHVCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3B1Qm9hcmRcIik7XHJcbmNvbnN0IGJ1dHRvbnNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRvbnMtY29udGFpbmVyXCIpO1xyXG5jb25zdCBzaGlwVGFibGVDb3VudGVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwbGFjZWQtY291bnRlclwiKTtcclxuY29uc3QgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnJvci1tZXNzYWdlXCIpO1xyXG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtYnV0dG9uXCIpO1xyXG5cclxuY29uc3QgcGxheWVyQm9hcmRDZWxscyA9IFtdO1xyXG5jb25zdCBjcHVCb2FyZENlbGxzID0gW107XHJcblxyXG5sZXQgbGVuZ3RoID0gbnVsbDtcclxubGV0IGRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xyXG5sZXQgc2hpcHNJbmZvID0gbnVsbDtcclxubGV0IHByZXZpb3VzQ2xpY2tlZEJ0biA9IG51bGw7XHJcbmxldCBjdXJyZW50Q2VsbCA9IG51bGw7XHJcbmxldCBjZWxsc1RvSGlnaGxpZ2h0ID0gW107XHJcblxyXG4vLyBnZW5lcmF0ZSBwbGF5ZXIgYW5kIGNwdSBjZWxsc1xyXG5mb3IgKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93KyspIHtcclxuICAgcGxheWVyQm9hcmRDZWxscy5wdXNoKFtdKTtcclxuICAgY3B1Qm9hcmRDZWxscy5wdXNoKFtdKTtcclxuXHJcbiAgIGZvciAobGV0IGNlbGwgPSAwOyBjZWxsIDwgMTA7IGNlbGwrKykge1xyXG4gICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICAgIGRpdi5jbGFzc05hbWUgPSBcImJvYXJkX19jZWxsXCI7XHJcbiAgICAgIGRpdi5kYXRhc2V0LnJvdyA9IHJvdztcclxuICAgICAgZGl2LmRhdGFzZXQuY2VsbCA9IGNlbGw7XHJcbiAgICAgIGRpdi5kYXRhc2V0LmZpbGxlZCA9IFwiZmFsc2VcIjtcclxuICAgICAgcGxheWVyQm9hcmQuYXBwZW5kKGRpdik7XHJcbiAgICAgIHBsYXllckJvYXJkQ2VsbHNbcm93XS5wdXNoKGRpdik7XHJcblxyXG4gICAgICBsZXQgY2xvbmUgPSBkaXYuY2xvbmVOb2RlKCk7XHJcbiAgICAgIGNwdUJvYXJkLmFwcGVuZChjbG9uZSk7XHJcbiAgICAgIGNwdUJvYXJkQ2VsbHNbcm93XS5wdXNoKGNsb25lKTtcclxuICAgfVxyXG59XHJcblxyXG5idXR0b25zQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGlja2VkQnV0dG9ucyk7XHJcbnBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgc2hvd1ByZXZpZXdIYW5kbGVyKTtcclxucGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIHJlbW92ZVNoaXBQcmV2aWV3KTtcclxucGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBsYWNlTmV3U2hpcCk7XHJcbnBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCByZW1vdmVTaGlwKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHJvdGF0ZVNoaXApO1xyXG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaW5pdGlhbGl6ZUdhbWUpO1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlQ2xpY2tlZEJ1dHRvbnMoZSkge1xyXG4gICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICAvLyBoYW5kbGUgYnV0dG9ucyB0aGF0IGNoYW5nZSBcImxlbmd0aFwiIHZhcmlhYmxlXHJcbiAgIGlmICh0YXJnZXQuZGF0YXNldC5sZW5ndGgpIHtcclxuICAgICAgbGVuZ3RoID0gK3RhcmdldC5kYXRhc2V0Lmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChwcmV2aW91c0NsaWNrZWRCdG4pIHtcclxuICAgICAgICAgcHJldmlvdXNDbGlja2VkQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJidXR0b24tLWhpZ2hsaWdodGVkXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImJ1dHRvbi0taGlnaGxpZ2h0ZWRcIik7XHJcbiAgICAgIHByZXZpb3VzQ2xpY2tlZEJ0biA9IHRhcmdldDtcclxuXHJcbiAgICAgIC8vIGhhbmRsZSByb3RhdGlvbi1idXR0b25cclxuICAgfSBlbHNlIGlmICh0YXJnZXQuaWQgPT09IFwicm90YXRpb24tYnV0dHRvblwiKSB7XHJcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgICAgIGRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93UHJldmlld0hhbmRsZXIoZSkge1xyXG4gICBzaG93U2hpcFByZXZpZXcoZS50YXJnZXQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93U2hpcFByZXZpZXcobm9kZSkge1xyXG4gICBpZiAobGVuZ3RoICYmIG5vZGUuZGF0YXNldC5yb3cgJiYgbm9kZS5kYXRhc2V0LmNlbGwpIHtcclxuICAgICAgbGV0IHsgcm93LCBjZWxsIH0gPSBub2RlLmRhdGFzZXQ7XHJcblxyXG4gICAgICBjdXJyZW50Q2VsbCA9IG5vZGU7XHJcbiAgICAgIHJvdyA9ICtyb3c7XHJcbiAgICAgIGNlbGwgPSArY2VsbDtcclxuXHJcbiAgICAgIC8vIHBvcHVsYXRlIFwiY2VsbHNUb0hpZ2hsaWdodFwiIGFycmF5XHJcbiAgICAgIGxlbmd0aExvb3A6IGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgaWYgKCFwbGF5ZXJCb2FyZENlbGxzW3Jvd10gfHwgIXBsYXllckJvYXJkQ2VsbHNbcm93XVtjZWxsXSkge1xyXG4gICAgICAgICAgICBicmVhayBsZW5ndGhMb29wO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBjZWxsc1RvSGlnaGxpZ2h0LnB1c2gocGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdKTtcclxuICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgICAgICAgY2VsbCsrO1xyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByb3crKztcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBwYWludCBwcmV2aWV3IHJlZCBpZiBzaGlwIGxlbmd0aCBkb2VzIG5vdCBmaXRcclxuICAgICAgaWYgKGNlbGxzVG9IaWdobGlnaHQubGVuZ3RoIDwgbGVuZ3RoKSB7XHJcbiAgICAgICAgIGNlbGxzVG9IaWdobGlnaHQuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2I1MTcxN1wiO1xyXG4gICAgICAgICAgICBjZWxsLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgICAgICBjZWxsLnN0eWxlLmJvcmRlckNvbG9yID0gXCIjYjUxNzE3XCI7XHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgLy8gcGFpbnQgcHJldmlldyBlaXRoZXIgZ3JlZW4gb3IgcmVkIGJhc2VkIG9uIGZpbGxlZCBhdHRyaWJ1dGUgdmFsdWVcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgY2VsbHNUb0hpZ2hsaWdodC5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjZWxsLmRhdGFzZXQuZmlsbGVkID09PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMxY2I1MTdcIjtcclxuICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5ib3JkZXJDb2xvciA9IFwiIzFjYjUxN1wiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2I1MTcxN1wiO1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJvcmRlckNvbG9yID0gXCIjYjUxNzE3XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTaGlwUHJldmlldygpIHtcclxuICAgY2VsbHNUb0hpZ2hsaWdodC5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcclxuICAgICAgY2VsbC5zdHlsZS5jb2xvciA9IFwiXCI7XHJcbiAgICAgIGNlbGwuc3R5bGUuYm9yZGVyQ29sb3IgPSBcIlwiO1xyXG4gICB9KTtcclxuICAgY2VsbHNUb0hpZ2hsaWdodCA9IFtdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwbGFjZU5ld1NoaXAoZSkge1xyXG4gICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICBpZiAobGVuZ3RoICYmIHRhcmdldC5kYXRhc2V0LnJvdyAmJiB0YXJnZXQuZGF0YXNldC5jZWxsKSB7XHJcbiAgICAgIHNoaXBzSW5mbyA9IEdhbWUucGxheWVyQm9hcmQuZ2V0U2hpcHMoKTtcclxuICAgICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJcIjsgLy8gY2xlYXIgcHJldmlvdXMgZXJyb3IgbWVzc2FnZVxyXG5cclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBzaGlwc0luZm8pIHtcclxuICAgICAgICAgLy8gaWRlbnRpZnkgd2hhdCB0eXBlIG9mIHNoaXAgdGhlIHVzZXIgaXMgZ29pbmcgdG8gcGxhY2VcclxuICAgICAgICAgaWYgKHNoaXBzSW5mb1t0eXBlXS5sZW5ndGggPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoc2hpcHNJbmZvW3R5cGVdLnNoaXBzLmxlbmd0aCA8IHNoaXBzSW5mb1t0eXBlXS5tYXgpIHtcclxuICAgICAgICAgICAgICAgLy8gcGxhY2UgbmV3IHNoaXBcclxuICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgR2FtZS5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoXHJcbiAgICAgICAgICAgICAgICAgICAgIFsrdGFyZ2V0LmRhdGFzZXQucm93LCArdGFyZ2V0LmRhdGFzZXQuY2VsbF0sXHJcbiAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uLnNsaWNlKDAsIDMpXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIHNoaXBzSW5mbyA9IEdhbWUucGxheWVyQm9hcmQuZ2V0U2hpcHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vIGRpc2FibGUgc2hpcCBidXR0b24gd2hlbiBnZXR0aW5nIHRvIG1heGltdW0gbnVtYmVyIG9mIHNoaXBzIHBsYWNlZFxyXG4gICAgICAgICAgICAgICAgICBpZiAoc2hpcHNJbmZvW3R5cGVdLnNoaXBzLmxlbmd0aCA9PT0gc2hpcHNJbmZvW3R5cGVdLm1heCkge1xyXG4gICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0NsaWNrZWRCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0NsaWNrZWRCdG4uY2xhc3NMaXN0LnJlbW92ZShcImJ1dHRvbi0taGlnaGxpZ2h0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZVBsYXllckJvYXJkKCk7XHJcbiAgICAgICAgICAgICAgICAgIHJlbW92ZVNoaXBQcmV2aWV3KCk7XHJcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZVNoaXBzVGFibGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChHYW1lLnBsYXllckJvYXJkLmlzQXJteUNvbXBsZXRlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgc3RhcnRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgc3RhcnRCdG4uc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyBwcmludCBlcnJvciBtZXNzYWdlc1xyXG4gICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgZS5tZXNzYWdlID09PSBcIlNoaXAgZXhwYW5kcyB0byB3cm9uZyBjb29yZGluYXRlc1wiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgIGUubWVzc2FnZSA9PT0gXCJBIG5ldyBzaGlwIGNhbm5vdCBiZSBwbGFjZSBvdmVyIGFub3RoZXJcIlxyXG4gICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJFcnJvcjogXCIgKyBlLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRXJyb3I6IEFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHRyeWluZyB0byBwbGFjZSBhIG5ldyBzaGlwXCI7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVBsYXllckJvYXJkKCkge1xyXG4gICBsZXQgYm9hcmQgPSBHYW1lLnBsYXllckJvYXJkLmdldEJvYXJkQW5kU2hpcHMoKTtcclxuXHJcbiAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGJvYXJkLmxlbmd0aDsgcm93KyspIHtcclxuICAgICAgZm9yIChsZXQgY2VsbCA9IDA7IGNlbGwgPCBib2FyZFtyb3ddLmxlbmd0aDsgY2VsbCsrKSB7XHJcbiAgICAgICAgIGlmIChib2FyZFtyb3ddW2NlbGxdLnNlYXJjaCgvW0FCQ0RITV0vKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHBsYXllckJvYXJkQ2VsbHNbcm93XVtjZWxsXS50ZXh0Q29udGVudCA9IGJvYXJkW3Jvd11bY2VsbF07XHJcbiAgICAgICAgICAgIHBsYXllckJvYXJkQ2VsbHNbcm93XVtjZWxsXS5kYXRhc2V0LmZpbGxlZCA9IFwidHJ1ZVwiO1xyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0udGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0uZGF0YXNldC5maWxsZWQgPSBcImZhbHNlXCI7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVNoaXBzVGFibGUoKSB7XHJcbiAgIGxldCBpbmRleCA9IDA7XHJcblxyXG4gICBmb3IgKGxldCB0eXBlIGluIHNoaXBzSW5mbykge1xyXG4gICAgICBzaGlwVGFibGVDb3VudGVyc1tpbmRleF0udGV4dENvbnRlbnQgPSBzaGlwc0luZm9bdHlwZV0uc2hpcHMubGVuZ3RoO1xyXG4gICAgICBpbmRleCsrO1xyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVNoaXAoZSkge1xyXG4gICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICBpZiAoXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LnJvdyAmJlxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5jZWxsICYmXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LmZpbGxlZCAmJlxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5maWxsZWQgPT09IFwidHJ1ZVwiXHJcbiAgICkge1xyXG4gICAgICBsZXQgbXNnID0gR2FtZS5wbGF5ZXJCb2FyZC5yZW1vdmVTaGlwKFxyXG4gICAgICAgICArdGFyZ2V0LmRhdGFzZXQucm93LFxyXG4gICAgICAgICArdGFyZ2V0LmRhdGFzZXQuY2VsbFxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKG1zZy5pbmNsdWRlcyhcIlJlbW92ZWQgc2hpcCB3aXRoIHRoZSBmb2xsb3dpbmcgY29vcmRpbmF0ZXM6XCIpKSB7XHJcbiAgICAgICAgIGxldCBzaGlwQnV0dG9ucyA9IGJ1dHRvbnNDb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5idXR0b25cIik7XHJcbiAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcblxyXG4gICAgICAgICBzaGlwc0luZm8gPSBHYW1lLnBsYXllckJvYXJkLmdldFNoaXBzKCk7XHJcblxyXG4gICAgICAgICAvLyBlbmFibGUgYmFjayBkaXNhYmxlZCBidXR0b25zXHJcbiAgICAgICAgIGZvciAobGV0IHR5cGUgaW4gc2hpcHNJbmZvKSB7XHJcbiAgICAgICAgICAgIGlmIChzaGlwc0luZm9bdHlwZV0uc2hpcHMubGVuZ3RoIDwgc2hpcHNJbmZvW3R5cGVdLm1heCkge1xyXG4gICAgICAgICAgICAgICBzaGlwQnV0dG9uc1tpbmRleF0uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgaWYgKCFHYW1lLnBsYXllckJvYXJkLmlzQXJteUNvbXBsZXRlKCkpIHtcclxuICAgICAgICAgICAgc3RhcnRCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdGFydEJ0bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgdXBkYXRlUGxheWVyQm9hcmQoKTtcclxuICAgICAgICAgc2hvd1NoaXBQcmV2aWV3KGN1cnJlbnRDZWxsKTtcclxuICAgICAgICAgdXBkYXRlU2hpcHNUYWJsZSgpO1xyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIGUucHJldmVudERlZmF1bHQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcm90YXRlU2hpcChlKSB7XHJcbiAgIGlmIChlLmtleSA9PT0gXCJxXCIgfHwgZS5rZXkgPT09IFwiUVwiKSB7XHJcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgICAgIGRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlbW92ZVNoaXBQcmV2aWV3KCk7XHJcbiAgICAgIHNob3dTaGlwUHJldmlldyhjdXJyZW50Q2VsbCk7XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZUdhbWUoKSB7XHJcbiAgIGlmIChHYW1lLmluaXQoKSkge1xyXG4gICAgICBwbGF5ZXJCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIHNob3dQcmV2aWV3SGFuZGxlcik7XHJcbiAgICAgIHBsYXllckJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCByZW1vdmVTaGlwUHJldmlldyk7XHJcbiAgICAgIHBsYXllckJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGFjZU5ld1NoaXApO1xyXG4gICAgICBwbGF5ZXJCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgcmVtb3ZlU2hpcCk7XHJcbiAgICAgIHN0YXJ0QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgYnV0dG9uc0NvbnRhaW5lci5wYXJlbnRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHJcbiAgICAgIGNwdUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhdHRhY2tDcHVCb2FyZCk7XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXR0YWNrQ3B1Qm9hcmQoZSkge1xyXG4gICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICBpZiAoXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LmZpbGxlZCA9PT0gXCJmYWxzZVwiICYmXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LnJvdyAmJlxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5jZWxsXHJcbiAgICkge1xyXG4gICAgICBsZXQgeyByb3csIGNlbGwgfSA9IHRhcmdldC5kYXRhc2V0O1xyXG4gICAgICBsZXQgdHVyblJlc3VsdCA9IEdhbWUudGFrZVR1cm4oK3JvdywgK2NlbGwpO1xyXG5cclxuICAgICAgdXBkYXRlUGxheWVyQm9hcmQoKTtcclxuICAgICAgdXBkYXRlQ3B1Qm9hcmQoKTtcclxuXHJcbiAgICAgIC8vIGRlY2xhcmUgYSB3aW5uZXIgYW5kIHByaW50IGEgcmVzZXQgYnV0dG9uXHJcbiAgICAgIGlmIChcclxuICAgICAgICAgdHVyblJlc3VsdC5zZWFyY2ggJiZcclxuICAgICAgICAgdHVyblJlc3VsdC5zZWFyY2goL1BsYXllcnxDb21wdXRlciB3b24gdGhlIG1hdGNoL2dpKSA+PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgbGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcblxyXG4gICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJyZXNldC1jb250YWluZXJcIjtcclxuICAgICAgICAgcC50ZXh0Q29udGVudCA9IHR1cm5SZXN1bHQ7XHJcbiAgICAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSBcImJ1dHRvblwiO1xyXG4gICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIlJlc2V0IEdhbWVcIjtcclxuICAgICAgICAgZGl2LmFwcGVuZChwLCBidXR0b24pO1xyXG4gICAgICAgICBkb2N1bWVudC5ib2R5LmZpcnN0RWxlbWVudENoaWxkLmFmdGVyKGRpdik7XHJcblxyXG4gICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlc2V0R2FtZSk7XHJcbiAgICAgICAgIGNwdUJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhdHRhY2tDcHVCb2FyZCk7XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVDcHVCb2FyZCgpIHtcclxuICAgbGV0IGJvYXJkID0gR2FtZS5nZXRDb21wdXRlckJvYXJkKCk7XHJcblxyXG4gICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBib2FyZC5sZW5ndGg7IHJvdysrKSB7XHJcbiAgICAgIGZvciAobGV0IGNlbGwgPSAwOyBjZWxsIDwgYm9hcmRbcm93XS5sZW5ndGg7IGNlbGwrKykge1xyXG4gICAgICAgICBpZiAoYm9hcmRbcm93XVtjZWxsXS5zZWFyY2goL1tITV0vKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIGNwdUJvYXJkQ2VsbHNbcm93XVtjZWxsXS50ZXh0Q29udGVudCA9IGJvYXJkW3Jvd11bY2VsbF07XHJcbiAgICAgICAgICAgIGNwdUJvYXJkQ2VsbHNbcm93XVtjZWxsXS5kYXRhc2V0LmZpbGxlZCA9IFwidHJ1ZVwiO1xyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjcHVCb2FyZENlbGxzW3Jvd11bY2VsbF0udGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICBjcHVCb2FyZENlbGxzW3Jvd11bY2VsbF0uZGF0YXNldC5maWxsZWQgPSBcImZhbHNlXCI7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc2V0R2FtZSgpIHtcclxuICAgR2FtZS5yZXNldCgpO1xyXG5cclxuICAgZG9jdW1lbnQuYm9keS5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmcucmVtb3ZlKCk7XHJcbiAgIHVwZGF0ZUNwdUJvYXJkKCk7XHJcbiAgIGNwdUJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhdHRhY2tDcHVCb2FyZCk7XHJcbiAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgc2hvd1ByZXZpZXdIYW5kbGVyKTtcclxuICAgcGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIHJlbW92ZVNoaXBQcmV2aWV3KTtcclxuICAgcGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBsYWNlTmV3U2hpcCk7XHJcbiAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCByZW1vdmVTaGlwKTtcclxuICAgdXBkYXRlUGxheWVyQm9hcmQoKTtcclxuICAgYnV0dG9uc0NvbnRhaW5lci5wYXJlbnRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgIFsuLi5idXR0b25zQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uXCIpXS5mb3JFYWNoKFxyXG4gICAgICAoYnV0dG9uKSA9PiAoYnV0dG9uLmRpc2FibGVkID0gZmFsc2UpXHJcbiAgICk7XHJcbiAgIFsuLi5zaGlwVGFibGVDb3VudGVyc10uZm9yRWFjaCgoY291bnRlcikgPT4gKGNvdW50ZXIudGV4dENvbnRlbnQgPSBcIjBcIikpO1xyXG4gICBzdGFydEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgIHN0YXJ0QnRuLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG59XHJcbiIsImNvbnN0IFNoaXAgPSBmdW5jdGlvbiAobGVuZ3RoLCBjb29yZGluYXRlcykge1xyXG4gICBsZXQgX2Nvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXMgfHwgbnVsbDtcclxuICAgbGV0IF9sZW5ndGggPSBsZW5ndGggfHwgMjtcclxuICAgbGV0IF9oaXRzQ291bnRlciA9IDA7XHJcblxyXG4gICBjb25zdCBnZXRDb29ycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX2Nvb3JkaW5hdGVzKSk7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBnZXRMZW5ndGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBfbGVuZ3RoO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgZ2V0SGl0cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF9oaXRzQ291bnRlcjtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGhpdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgX2hpdHNDb3VudGVyKys7XHJcbiAgICAgIHJldHVybiBfaGl0c0NvdW50ZXI7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBpc1N1bmsgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBfaGl0c0NvdW50ZXIgPT09IGxlbmd0aDtcclxuICAgfTtcclxuXHJcbiAgIHJldHVybiB7XHJcbiAgICAgIGdldENvb3JzLFxyXG4gICAgICBnZXRMZW5ndGgsXHJcbiAgICAgIGdldEhpdHMsXHJcbiAgICAgIGhpdCxcclxuICAgICAgaXNTdW5rLFxyXG4gICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggIzFjYjUxNztcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogIzFjYjUxNztcXG4gIG1hcmdpbjogMTZweDtcXG59XFxuXFxub2wsIHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbmJsb2NrcXVvdGUsIHEge1xcbiAgcXVvdGVzOiBub25lO1xcbn1cXG5cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGNvbnRlbnQ6IG5vbmU7XFxufVxcblxcbnRhYmxlIHtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDtcXG59XFxuXFxucCB7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbn1cXG5cXG4uaW5zdHJ1Y3Rpb25zIHtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgbWFyZ2luLXRvcDogM3JlbTtcXG59XFxuLmluc3RydWN0aW9ucyBoMSB7XFxuICBmb250LXNpemU6IDEuNHJlbTtcXG59XFxuLmluc3RydWN0aW9ucyBoMiB7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG59XFxuLmluc3RydWN0aW9ucyBoMSwgLmluc3RydWN0aW9ucyBoMiB7XFxuICBtYXJnaW46IDFyZW0gMDtcXG59XFxuLmluc3RydWN0aW9ucyBoMTpmaXJzdC1jaGlsZCwgLmluc3RydWN0aW9ucyBoMjpmaXJzdC1jaGlsZCB7XFxuICBtYXJnaW4tdG9wOiAwO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGxpIHtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgbGk6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi5ib2FyZC1zZWN0aW9uIHtcXG4gIG1hcmdpbi1ib3R0b206IDNyZW07XFxufVxcbi5ib2FyZC1zZWN0aW9uID4gaDEge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweCBhdXRvO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogNXB4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxuICBncmlkLWNvbHVtbjogMjtcXG4gIGdyaWQtcm93OiAxO1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbCB7XFxuICBib3JkZXItdG9wOiBub25lO1xcbiAgYm9yZGVyLXJpZ2h0OiBub25lO1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIxXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjJcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiM1xcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg0KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI0XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDUpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjVcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNlxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg3KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI3XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDgpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjhcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiOVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxMCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMTBcXFwiO1xcbn1cXG5cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogNXB4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4O1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxuICBncmlkLWNvbHVtbjogMTtcXG4gIGdyaWQtcm93OiAyO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlci10b3A6IG5vbmU7XFxuICBib3JkZXItYm90dG9tOiBub25lO1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImFcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgyKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJiXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiY1xcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDQpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImRcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg1KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJlXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZlxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDcpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImdcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg4KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJoXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiaVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEwKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJqXFxcIjtcXG59XFxuXFxuLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmRfX2JvYXJkIHtcXG4gIGdyaWQtcm93OiAyO1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiA1cHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG59XFxuLmJvYXJkX19ib2FyZCAuYm9hcmRfX2NlbGw6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuXFxuI2Vycm9yLW1lc3NhZ2Uge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgZ3JpZC1jb2x1bW46IDEvLTE7XFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcXG59XFxuXFxuLnBsYXllci1idXR0b25zIHVsIHtcXG4gIG1hcmdpbjogMnJlbSAwO1xcbn1cXG4ucGxheWVyLWJ1dHRvbnMgdWwgbGkge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG5cXG4uc2hpcHMtdGFibGUge1xcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXG59XFxuLnNoaXBzLXRhYmxlIHRhYmxlIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxufVxcbi5zaGlwcy10YWJsZSB0ZCwgLnNoaXBzLXRhYmxlIHRoIHtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxufVxcblxcbiNzdGFydC1idXR0b24ge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4ucmVzZXQtY29udGFpbmVyIHtcXG4gIGZvbnQtc2l6ZTogMSwgNXJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbjogM3JlbSAwO1xcbn1cXG4ucmVzZXQtY29udGFpbmVyIHAge1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuLmJ1dHRvbiB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICMxY2I1MTc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiAjMWNiNTE3O1xcbiAgcGFkZGluZzogMC41cmVtIDAuOHJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLmJ1dHRvbi0taGlnaGxpZ2h0ZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLmJ1dHRvbjpkaXNhYmxlZCB7XFxuICBvcGFjaXR5OiAwLjQ7XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogODAwcHgpIHtcXG4gIC5wbGF5ZXItYm9hcmQge1xcbiAgICBtYXgtd2lkdGg6IDEyMDBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGNvbHVtbi1nYXA6IDFyZW07XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICB9XFxuICAucGxheWVyLWJvYXJkIGgxIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEvLTE7XFxuICAgIGdyaWQtcm93OiAxO1xcbiAgfVxcbiAgLnBsYXllci1ib2FyZCAuYm9hcmQge1xcbiAgICBncmlkLWNvbHVtbjogMi8zO1xcbiAgICBncmlkLXJvdzogMjtcXG4gIH1cXG4gIC5wbGF5ZXItYm9hcmQgLnBsYXllci1idXR0b25zIHtcXG4gICAgZ3JpZC1jb2x1bW46IDMvNDtcXG4gICAgZ3JpZC1yb3c6IDI7XFxuICB9XFxuXFxuICAucGxheWVyLWJ1dHRvbnMgdWwge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG1hcmdpbi1ib3R0b206IDJyZW07XFxuICB9XFxuICAucGxheWVyLWJ1dHRvbnMgdWwgbGkge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gIH1cXG4gIC5wbGF5ZXItYnV0dG9ucyAuYnV0dG9uIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDExMDBweCkge1xcbiAgLmluc3RydWN0aW9ucyB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgbWF4LXdpZHRoOiAyODBweDtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBib3R0b206IDE2cHg7XFxuICAgIGxlZnQ6IDE2cHg7XFxuICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19yZXNldC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9zdHlsZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX3ZhcmlhYmxlcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9faW5zdHJ1Y3Rpb25zLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19ib2FyZC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fYnV0dG9ucy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fbWVkaWEtcXVlcmllcy5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FBQTtBQU1BOzs7Ozs7Ozs7Ozs7O0VBYUMsU0FBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSx3QkFBQTtBQ0REOztBREdBLGdEQUFBO0FBQ0E7O0VBRUMsY0FBQTtBQ0FEOztBREVBO0VBQ0Msc0JBQUE7RUFDRSw2QkFBQTtFQUNGLGNBQUE7RUFDRSx1QkFBQTtFQUNBLGNFcENLO0VGcUNQLFlBQUE7QUNDRDs7QURDQTtF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Q0EsYUFBQTtJQUNBLGdCQUFBO0lBQ0EscUNBQUE7RUxrUko7RUtqUkk7SUFDRyxpQkFBQTtJQUNBLFdBQUE7RUxtUlA7RUtqUkk7SUFDRyxnQkFBQTtJQUNBLFdBQUE7RUxtUlA7RUtqUkk7SUFDRyxnQkFBQTtJQUNBLFdBQUE7RUxtUlA7O0VLL1FJO0lBQ0csU0FBQTtJQUNBLG1CQUFBO0VMa1JQO0VLaFJJO0lBQ0csY0FBQTtFTGtSUDtFS2hSSTtJQUNHLGNBQUE7SUFDQSxXQUFBO0VMa1JQO0FBQ0Y7QUsvUUE7RUFDRztJQUNHLFNBQUE7SUFDQSxnQkFBQTtJQUNBLGVBQUE7SUFDQSxZQUFBO0lBQ0EsVUFBQTtFTGlSSjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcclxcbiAgIHYyLjAgfCAyMDExMDEyNlxcclxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxyXFxuKi9cXHJcXG5AdXNlICcuL3ZhcmlhYmxlcycgYXMgKjtcXHJcXG5cXHJcXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxyXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcclxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXHJcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxyXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXHJcXG5iLCB1LCBpLCBjZW50ZXIsXFxyXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXHJcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXHJcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXHJcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXHJcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXHJcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcclxcblxcdG1hcmdpbjogMDtcXHJcXG5cXHRwYWRkaW5nOiAwO1xcclxcblxcdGJvcmRlcjogMDtcXHJcXG5cXHRmb250LXNpemU6IDEwMCU7XFxyXFxuXFx0Zm9udDogaW5oZXJpdDtcXHJcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXHJcXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXHJcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcclxcblxcdGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5ib2R5IHtcXHJcXG5cXHRmb250LWZhbWlseTogbW9ub3NwYWNlO1xcclxcbiAgIHRleHQtc2hhZG93OiAwIDAgMTBweCAkZ3JlZW47XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxyXFxuICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxyXFxuICAgY29sb3I6ICRncmVlbjtcXHJcXG5cXHRtYXJnaW46IDE2cHg7XFxyXFxufVxcclxcbm9sLCB1bCB7XFxyXFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZSwgcSB7XFxyXFxuXFx0cXVvdGVzOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXHJcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxyXFxuXFx0Y29udGVudDogJyc7XFxyXFxuXFx0Y29udGVudDogbm9uZTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVxcclxcbnAge1xcclxcblxcdGxpbmUtaGVpZ2h0OiAxLjU7XFxyXFxufVwiLFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCxcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICMxY2I1MTc7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6ICMxY2I1MTc7XFxuICBtYXJnaW46IDE2cHg7XFxufVxcblxcbm9sLCB1bCB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG5ibG9ja3F1b3RlLCBxIHtcXG4gIHF1b3Rlczogbm9uZTtcXG59XFxuXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBjb250ZW50OiBub25lO1xcbn1cXG5cXG50YWJsZSB7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XFxufVxcblxcbnAge1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG59XFxuXFxuLmluc3RydWN0aW9ucyB7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIG1hcmdpbi10b3A6IDNyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgaDEge1xcbiAgZm9udC1zaXplOiAxLjRyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgaDIge1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgaDEsIC5pbnN0cnVjdGlvbnMgaDIge1xcbiAgbWFyZ2luOiAxcmVtIDA7XFxufVxcbi5pbnN0cnVjdGlvbnMgaDE6Zmlyc3QtY2hpbGQsIC5pbnN0cnVjdGlvbnMgaDI6Zmlyc3QtY2hpbGQge1xcbiAgbWFyZ2luLXRvcDogMDtcXG59XFxuLmluc3RydWN0aW9ucyBsaSB7XFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGxpOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4uYm9hcmQtc2VjdGlvbiB7XFxuICBtYXJnaW4tYm90dG9tOiAzcmVtO1xcbn1cXG4uYm9hcmQtc2VjdGlvbiA+IGgxIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHggYXV0bztcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDVweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xcbiAgZ3JpZC1jb2x1bW46IDI7XFxuICBncmlkLXJvdzogMTtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICBtYXJnaW4tbGVmdDogMTBweDtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGwge1xcbiAgYm9yZGVyLXRvcDogbm9uZTtcXG4gIGJvcmRlci1yaWdodDogbm9uZTtcXG4gIGJvcmRlci1sZWZ0OiBub25lO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgyKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIyXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDMpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjNcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNFxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg1KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI1XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDYpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjZcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiN1xcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg4KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI4XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDkpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjlcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMTApOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjEwXFxcIjtcXG59XFxuXFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDVweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweDtcXG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xcbiAgZ3JpZC1jb2x1bW46IDE7XFxuICBncmlkLXJvdzogMjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbCB7XFxuICBib3JkZXItdG9wOiBub25lO1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gIGJvcmRlci1sZWZ0OiBub25lO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJhXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiYlxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDMpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImNcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg0KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJkXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDYpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImZcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg3KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJnXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiaFxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDkpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImlcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxMCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwialxcXCI7XFxufVxcblxcbi5ib2FyZF9fY2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkX19ib2FyZCB7XFxuICBncmlkLXJvdzogMjtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogNXB4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxufVxcbi5ib2FyZF9fYm9hcmQgLmJvYXJkX19jZWxsOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcblxcbiNlcnJvci1tZXNzYWdlIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGdyaWQtY29sdW1uOiAxLy0xO1xcbiAgbWFyZ2luLXRvcDogMXJlbTtcXG4gIG1hcmdpbi1sZWZ0OiAwLjVyZW07XFxufVxcblxcbi5wbGF5ZXItYnV0dG9ucyB1bCB7XFxuICBtYXJnaW46IDJyZW0gMDtcXG59XFxuLnBsYXllci1idXR0b25zIHVsIGxpIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcXG59XFxuXFxuLnNoaXBzLXRhYmxlIHtcXG4gIG1hcmdpbi1ib3R0b206IDJyZW07XFxufVxcbi5zaGlwcy10YWJsZSB0YWJsZSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbn1cXG4uc2hpcHMtdGFibGUgdGQsIC5zaGlwcy10YWJsZSB0aCB7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbn1cXG5cXG4jc3RhcnQtYnV0dG9uIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuXFxuLnJlc2V0LWNvbnRhaW5lciB7XFxuICBmb250LXNpemU6IDEsIDVyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW46IDNyZW0gMDtcXG59XFxuLnJlc2V0LWNvbnRhaW5lciBwIHtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbi5idXR0b24ge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gIHRleHQtc2hhZG93OiAwIDAgMTBweCAjMWNiNTE3O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogIzFjYjUxNztcXG4gIHBhZGRpbmc6IDAuNXJlbSAwLjhyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbi5idXR0b24tLWhpZ2hsaWdodGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbi5idXR0b246ZGlzYWJsZWQge1xcbiAgb3BhY2l0eTogMC40O1xcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDgwMHB4KSB7XFxuICAucGxheWVyLWJvYXJkIHtcXG4gICAgbWF4LXdpZHRoOiAxMjAwcHg7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBjb2x1bW4tZ2FwOiAxcmVtO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgfVxcbiAgLnBsYXllci1ib2FyZCBoMSB7XFxuICAgIGdyaWQtY29sdW1uOiAxLy0xO1xcbiAgICBncmlkLXJvdzogMTtcXG4gIH1cXG4gIC5wbGF5ZXItYm9hcmQgLmJvYXJkIHtcXG4gICAgZ3JpZC1jb2x1bW46IDIvMztcXG4gICAgZ3JpZC1yb3c6IDI7XFxuICB9XFxuICAucGxheWVyLWJvYXJkIC5wbGF5ZXItYnV0dG9ucyB7XFxuICAgIGdyaWQtY29sdW1uOiAzLzQ7XFxuICAgIGdyaWQtcm93OiAyO1xcbiAgfVxcblxcbiAgLnBsYXllci1idXR0b25zIHVsIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xcbiAgfVxcbiAgLnBsYXllci1idXR0b25zIHVsIGxpIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICB9XFxuICAucGxheWVyLWJ1dHRvbnMgLmJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5pbnN0cnVjdGlvbnMge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG1heC13aWR0aDogMjgwcHg7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYm90dG9tOiAxNnB4O1xcbiAgICBsZWZ0OiAxNnB4O1xcbiAgfVxcbn1cIixcIiRncmVlbjogIzFjYjUxNztcIixcIkB1c2UgJy4vdmFyaWFibGVzJyBhcyAqO1xcclxcblxcclxcbi5pbnN0cnVjdGlvbnMge1xcclxcbiAgIHBhZGRpbmc6IDFyZW07XFxyXFxuICAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xcclxcbiAgIG1hcmdpbi10b3A6IDNyZW07XFxyXFxuICAgaDEge1xcclxcbiAgICAgIGZvbnQtc2l6ZTogMS40cmVtO1xcclxcbiAgIH1cXHJcXG4gICBoMiB7XFxyXFxuICAgICAgZm9udC1zaXplOiAxLjJyZW07XFxyXFxuICAgfVxcclxcbiAgIGgxLCBoMiB7XFxyXFxuICAgICAgbWFyZ2luOiAxcmVtIDA7XFxyXFxuICAgfVxcclxcbiAgIGgxOmZpcnN0LWNoaWxkLCBoMjpmaXJzdC1jaGlsZCB7XFxyXFxuICAgICAgbWFyZ2luLXRvcDogMDtcXHJcXG4gICB9XFxyXFxuICAgbGkge1xcclxcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICAgICAgJjpsYXN0LWNoaWxkIHtcXHJcXG4gICAgICAgICBtYXJnaW46IDA7XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XCIsXCJAdXNlICdzYXNzOmxpc3QnO1xcclxcbkB1c2UgJy4vdmFyaWFibGVzJyBhcyAqO1xcclxcblxcclxcbiRjZWxsV2lkdGg6IDMwcHg7XFxyXFxuXFxyXFxuLmJvYXJkLXNlY3Rpb24ge1xcclxcbiAgIG1hcmdpbi1ib3R0b206IDNyZW07XFxyXFxuICAgJiA+IGgxIHtcXHJcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXHJcXG4gICAgICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gICB9XFxyXFxufVxcclxcbi5ib2FyZCB7XFxyXFxuICAgZm9udC1zaXplOiAxOHB4O1xcclxcbiAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAkY2VsbFdpZHRoIGF1dG87XFxyXFxuICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIge1xcclxcbiAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgZ2FwOiA1cHg7XFxyXFxuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsICRjZWxsV2lkdGgpO1xcclxcbiAgIGdyaWQtYXV0by1yb3dzOiAkY2VsbFdpZHRoO1xcclxcbiAgIGdyaWQtY29sdW1uOiAyO1xcclxcbiAgIGdyaWQtcm93OiAxO1xcclxcbiAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxyXFxuICAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxyXFxuICAgLmJvYXJkX19jZWxsIHtcXHJcXG4gICAgICBib3JkZXItdG9wOiBub25lO1xcclxcbiAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcXHJcXG4gICAgICBib3JkZXItbGVmdDogbm9uZTtcXHJcXG5cXHJcXG4gICAgICBAZm9yICRpIGZyb20gMSB0aHJvdWdoIDEwIHtcXHJcXG4gICAgICAgICAmOm50aC1jaGlsZCgjeyRpfSk6OmJlZm9yZSB7XFxyXFxuICAgICAgICAgICAgY29udGVudDogJyN7JGl9JzsgXFxyXFxuICAgICAgICAgfVxcclxcbiAgICAgIH1cXHJcXG4gICB9XFxyXFxufVxcclxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciB7XFxyXFxuICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICBnYXA6IDVweDtcXHJcXG4gICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6ICRjZWxsV2lkdGg7XFxyXFxuICAgZ3JpZC1hdXRvLXJvd3M6ICRjZWxsV2lkdGg7XFxyXFxuICAgZ3JpZC1jb2x1bW46IDE7XFxyXFxuICAgZ3JpZC1yb3c6IDI7XFxyXFxuICAgLmJvYXJkX19jZWxsIHtcXHJcXG4gICAgICBib3JkZXItdG9wOiBub25lO1xcclxcbiAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XFxyXFxuICAgICAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxyXFxuXFxyXFxuICAgICAgJGxldHRlcnM6ICdhJywnYicsJ2MnLCdkJywnZScsJ2YnLCdnJywnaCcsJ2knLCdqJztcXHJcXG5cXHJcXG4gICAgICBAZm9yICRpIGZyb20gMSB0aHJvdWdoIDEwIHtcXHJcXG4gICAgICAgICAmOm50aC1jaGlsZCgjeyRpfSk6OmJlZm9yZSB7XFxyXFxuICAgICAgICAgICAgY29udGVudDogJyN7bGlzdC5udGgoJGxldHRlcnMsICRpKX0nOyBcXHJcXG4gICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XFxyXFxuLmJvYXJkX19jZWxsIHtcXHJcXG4gICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XFxyXFxuICAgZGlzcGxheTogZmxleDtcXHJcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG4uYm9hcmRfX2JvYXJkIHtcXHJcXG4gICBncmlkLXJvdzogMjtcXHJcXG4gICBtYXJnaW4tbGVmdDogMTBweDtcXHJcXG4gICBkaXNwbGF5OiBncmlkO1xcclxcbiAgIGdhcDogNXB4O1xcclxcbiAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAkY2VsbFdpZHRoKTtcXHJcXG4gICBncmlkLWF1dG8tcm93czogJGNlbGxXaWR0aDtcXHJcXG4gICAuYm9hcmRfX2NlbGwge1xcclxcbiAgICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRncmVlbjtcXHJcXG4gICAgICAgICBjb2xvcjogYmxhY2s7XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XFxyXFxuI2Vycm9yLW1lc3NhZ2Uge1xcclxcbiAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gICBncmlkLWNvbHVtbjogMSAvIC0xO1xcclxcbiAgIG1hcmdpbi10b3A6IDFyZW07XFxyXFxuICAgbWFyZ2luLWxlZnQ6IC41cmVtO1xcclxcbn1cXHJcXG4ucGxheWVyLWJ1dHRvbnMge1xcclxcbiAgIHVsIHtcXHJcXG4gICAgICBtYXJnaW46IDJyZW0gMDtcXHJcXG4gICB9XFxyXFxuICAgdWwgbGkge1xcclxcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgICBtYXJnaW4tYm90dG9tOiAuNXJlbTtcXHJcXG4gICB9XFxyXFxufVxcclxcbi5zaGlwcy10YWJsZSB7XFxyXFxuICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXHJcXG5cXHJcXG4gICB0YWJsZSB7XFxyXFxuICAgICAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xcclxcbiAgIH1cXHJcXG4gICB0ZCwgdGgge1xcclxcbiAgICAgIHBhZGRpbmc6IC41cmVtO1xcclxcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICRncmVlbjtcXHJcXG4gICB9XFxyXFxufVxcclxcbiNzdGFydC1idXR0b24ge1xcclxcbiAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXHJcXG59XFxyXFxuLnJlc2V0LWNvbnRhaW5lciB7XFxyXFxuICAgZm9udC1zaXplOiAxLDVyZW07XFxyXFxuICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgIG1hcmdpbjogM3JlbSAwO1xcclxcbiAgIHAge1xcclxcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICAgfVxcclxcbn1cIixcIkB1c2UgJy4vdmFyaWFibGVzJyBhcyAqO1xcclxcblxcclxcbi5idXR0b24ge1xcclxcbiAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxyXFxuICAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICRncmVlbjtcXHJcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXHJcXG4gICBjb2xvcjogJGdyZWVuO1xcclxcbiAgIHBhZGRpbmc6IC41cmVtIC44cmVtO1xcclxcbiAgIGJvcmRlcjogMXB4IHNvbGlkICRncmVlbjtcXHJcXG4gICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgJjpob3ZlciB7XFxyXFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGdyZWVuO1xcclxcbiAgICAgIGNvbG9yOiBibGFjaztcXHJcXG4gICB9XFxyXFxuICAgJi0taGlnaGxpZ2h0ZWQge1xcclxcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRncmVlbjtcXHJcXG4gICAgICBjb2xvcjogYmxhY2s7XFxyXFxuICAgfVxcclxcbiAgICY6ZGlzYWJsZWQge1xcclxcbiAgICAgIG9wYWNpdHk6IC40O1xcclxcbiAgIH1cXHJcXG59XCIsXCJAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDgwMHB4KSB7XFxyXFxuICAgLnBsYXllci1ib2FyZCB7XFxyXFxuICAgICAgbWF4LXdpZHRoOiAxMjAwcHg7XFxyXFxuICAgICAgbWFyZ2luOiAwIGF1dG87XFxyXFxuICAgICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgICBjb2x1bW4tZ2FwOiAxcmVtO1xcclxcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxyXFxuICAgICAgaDEge1xcclxcbiAgICAgICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxyXFxuICAgICAgICAgZ3JpZC1yb3c6IDE7XFxyXFxuICAgICAgfVxcclxcbiAgICAgIC5ib2FyZCB7XFxyXFxuICAgICAgICAgZ3JpZC1jb2x1bW46IDIgLyAzO1xcclxcbiAgICAgICAgIGdyaWQtcm93OiAyO1xcclxcbiAgICAgIH1cXHJcXG4gICAgICAucGxheWVyLWJ1dHRvbnMge1xcclxcbiAgICAgICAgIGdyaWQtY29sdW1uOiAzIC8gNDtcXHJcXG4gICAgICAgICBncmlkLXJvdzogMjtcXHJcXG4gICAgICB9XFxyXFxuICAgfVxcclxcbiAgIC5wbGF5ZXItYnV0dG9ucyB7XFxyXFxuICAgICAgdWwge1xcclxcbiAgICAgICAgIG1hcmdpbjogMDtcXHJcXG4gICAgICAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xcclxcbiAgICAgIH1cXHJcXG4gICAgICB1bCBsaSB7XFxyXFxuICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgICAgfVxcclxcbiAgICAgIC5idXR0b24ge1xcclxcbiAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgIH1cXHJcXG4gICB9XFxyXFxufVxcclxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTEwMHB4KSB7XFxyXFxuICAgLmluc3RydWN0aW9ucyB7XFxyXFxuICAgICAgbWFyZ2luOiAwO1xcclxcbiAgICAgIG1heC13aWR0aDogMjgwcHg7XFxyXFxuICAgICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICAgIGJvdHRvbTogMTZweDtcXHJcXG4gICAgICBsZWZ0OiAxNnB4O1xcclxcbiAgIH1cXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiR2FtZWJvYXJkIiwiR2FtZSIsIl93aW5uZXJNZXNzYWdlIiwiX2NhbkdhbWVTdGFydCIsIl9jb21wdXRlckJvYXJkIiwicGxheWVyQm9hcmQiLCJnZXRDb21wdXRlckJvYXJkIiwiZ2V0Qm9hcmQiLCJpbml0IiwicGxhY2VFbmVteUFybXkiLCJ0eXBlIiwicm93IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY29sdW1uIiwibGVuZ3RoIiwiZGlyZWN0aW9uIiwicGxhY2VTaGlwIiwiZSIsIm1lc3NhZ2UiLCJpbmNsdWRlcyIsImlzQXJteUNvbXBsZXRlIiwiY29tcHV0ZXJTaGlwc0luZm8iLCJnZXRTaGlwcyIsInJlbW92ZVNoaXAiLCJ0YWtlVHVybiIsImNlbGwiLCJhdHRhY2tQbGF5ZXIiLCJyZWNlaXZlQXR0YWNrIiwiYWxsU2hpcHNTdW5rIiwiZ2V0V2lubmVyIiwicmVzZXQiLCJ1bmRlZmluZWQiLCJTaGlwIiwiX2JvYXJkIiwiX3NoaXBzIiwidHlwZTEiLCJzaGlwcyIsIm1heCIsInN5bWJvbCIsInR5cGUyIiwidHlwZTMiLCJ0eXBlNCIsInB1c2giLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJzaGlwc0Nsb25lIiwia2V5IiwiZm9yRWFjaCIsInNoaXAiLCJjbG9uZSIsImdldExlbmd0aCIsImdldENvb3JzIiwiaSIsImdldEhpdHMiLCJoaXQiLCJnZXRCb2FyZEFuZFNoaXBzIiwiYm9hcmRDb3B5IiwiY3VycmVudFNoaXAiLCJzaGlwQ29vcnMiLCJjb29ycyIsImNvb3JkaW5hdGVzIiwiaXNOYU4iLCJOdW1iZXIiLCJFcnJvciIsInNoaXBDb29yZGluYXRlcyIsImNvb3JzQ29weSIsImN1cnJlbnRDb29yIiwibmV3U2hpcCIsIm5ld1NoaXBDb29ycyIsImVycm9yTXNnIiwiZmlsdGVyZWRTaGlwcyIsImoiLCJmaWx0ZXIiLCJzaGlwc0xvb3AiLCJyZXN1bHRNc2ciLCJyZWR1Y2UiLCJhY2MiLCJjdXJyZW50Iiwic2xpY2UiLCJ0eXBlTG9vcCIsImlzU3VuayIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjcHVCb2FyZCIsImJ1dHRvbnNDb250YWluZXIiLCJzaGlwVGFibGVDb3VudGVycyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJlcnJvck1lc3NhZ2UiLCJzdGFydEJ0biIsInBsYXllckJvYXJkQ2VsbHMiLCJjcHVCb2FyZENlbGxzIiwic2hpcHNJbmZvIiwicHJldmlvdXNDbGlja2VkQnRuIiwiY3VycmVudENlbGwiLCJjZWxsc1RvSGlnaGxpZ2h0IiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImRhdGFzZXQiLCJmaWxsZWQiLCJhcHBlbmQiLCJjbG9uZU5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlQ2xpY2tlZEJ1dHRvbnMiLCJzaG93UHJldmlld0hhbmRsZXIiLCJyZW1vdmVTaGlwUHJldmlldyIsInBsYWNlTmV3U2hpcCIsIndpbmRvdyIsInJvdGF0ZVNoaXAiLCJpbml0aWFsaXplR2FtZSIsInRhcmdldCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsImlkIiwic2hvd1NoaXBQcmV2aWV3Iiwibm9kZSIsImxlbmd0aExvb3AiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwiYm9yZGVyQ29sb3IiLCJ0ZXh0Q29udGVudCIsImRpc2FibGVkIiwidXBkYXRlUGxheWVyQm9hcmQiLCJ1cGRhdGVTaGlwc1RhYmxlIiwidmlzaWJpbGl0eSIsImJvYXJkIiwic2VhcmNoIiwiaW5kZXgiLCJtc2ciLCJzaGlwQnV0dG9ucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwcmV2ZW50RGVmYXVsdCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJwYXJlbnRFbGVtZW50IiwiZGlzcGxheSIsImF0dGFja0NwdUJvYXJkIiwidHVyblJlc3VsdCIsInVwZGF0ZUNwdUJvYXJkIiwicCIsImJ1dHRvbiIsImJvZHkiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImFmdGVyIiwicmVzZXRHYW1lIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwiY291bnRlciIsIl9jb29yZGluYXRlcyIsIl9sZW5ndGgiLCJfaGl0c0NvdW50ZXIiXSwic291cmNlUm9vdCI6IiJ9