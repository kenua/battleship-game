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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Game = function () {
  var _winnerMessage;

  var _canGameStart = false;

  var _computerBoard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

  var _cpuPreviousAttack = null;
  var _cpuNextAttack = null;
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
      var attackRandomCell = function attackRandomCell() {
        try {
          var _row = Math.floor(Math.random() * 10);

          var _cell = Math.floor(Math.random() * 10);

          var attackResult = _this.playerBoard.receiveAttack(_row, _cell);

          _cpuPreviousAttack = attackResult && attackResult.symbol === "X" ? attackResult : null;
        } catch (e) {
          if (e.message.includes("You already attacked the following coordinates")) {
            attackPlayer();
          }
        }
      };

      var attackPlayer = function attackPlayer() {
        var updateNextAttackCoordinates = function updateNextAttackCoordinates() {
          var pb = _this.playerBoard.getBoard();

          switch (_cpuNextAttack.direction) {
            case "above":
              if (pb[_cpuNextAttack.row - 1]) {
                _cpuNextAttack.row = _cpuNextAttack.row - 1;
              } else {
                _cpuNextAttack = null;
              }

              break;

            case "next":
              if (pb[_cpuNextAttack.row][_cpuNextAttack.column + 1]) {
                _cpuNextAttack.column = _cpuNextAttack.column + 1;
              } else {
                _cpuNextAttack = null;
              }

              break;

            case "below":
              if (pb[_cpuNextAttack.row + 1]) {
                _cpuNextAttack.row = _cpuNextAttack.row + 1;
              } else {
                _cpuNextAttack = null;
              }

              break;

            case "before":
              if (pb[_cpuNextAttack.row][_cpuNextAttack.column - 1]) {
                _cpuNextAttack.column = _cpuNextAttack.column - 1;
              } else {
                _cpuNextAttack = null;
              }

              break;
          }
        };

        if (_cpuPreviousAttack && _cpuNextAttack) {
          try {
            var attackResult = _this.playerBoard.receiveAttack(_cpuNextAttack.row, _cpuNextAttack.column); // update _cpuNextAttack


            if (attackResult && attackResult.symbol === "X") {
              _cpuNextAttack = _objectSpread({}, _cpuNextAttack);
              updateNextAttackCoordinates();
            } else {
              _cpuNextAttack = null;
            }
          } catch (e) {
            if (e.message.includes("Provided coordinates are not valid") || e.message.includes("You already attacked the following coordinates")) {
              console.log(e.message);
              _cpuNextAttack = null;
              attackPlayer();
            }
          } // check and attack a cell that is around an X

        } else if (_cpuPreviousAttack) {
          var pb = playerBoard.getBoard();
          var _cpuPreviousAttack2 = _cpuPreviousAttack,
              _row2 = _cpuPreviousAttack2.row,
              column = _cpuPreviousAttack2.column,
              symbol = _cpuPreviousAttack2.symbol;
          var nearCells = [];
          var cellsCounter = 0; // populate nearCells

          pb[_row2 - 1] && pb[_row2 - 1][column] ? nearCells.push({
            cell: pb[_row2 - 1][column],
            direction: "above",
            row: _row2 - 1,
            column: column
          }) : null;
          pb[_row2] && pb[_row2][column + 1] ? nearCells.push({
            cell: pb[_row2][column + 1],
            direction: "next",
            row: _row2,
            column: column + 1
          }) : null;
          pb[_row2 + 1] && pb[_row2 + 1][column] ? nearCells.push({
            cell: pb[_row2 + 1][column],
            direction: "below",
            row: _row2 + 1,
            column: column
          }) : null;
          pb[_row2] && pb[_row2][column - 1] ? nearCells.push({
            cell: pb[_row2][column - 1],
            direction: "before",
            row: _row2,
            column: column - 1
          }) : null;

          for (var i = 0; i < nearCells.length; i++) {
            if (nearCells[i].cell === "~") {
              var _attackResult = _this.playerBoard.receiveAttack(nearCells[i].row, nearCells[i].column); // update _cpuNextAttack


              if (_attackResult && _attackResult.symbol === "X") {
                _cpuNextAttack = _objectSpread({}, nearCells[i]);
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
          } // attack a random cell

        } else if (_cpuPreviousAttack === null) {
          attackRandomCell();
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
      if (currentCoor[0] > 9 || currentCoor[0] < 0) throw new Error("New ship coordinates are invalid");
      if (currentCoor[1] > 9 || currentCoor[1] < 0) throw new Error("New ship coordinates are invalid");
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
                    throw new Error("Can't place new ship over another");
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
    return {
      row: row,
      column: cell,
      symbol: symbol
    };
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
            if (e.message === "New ship coordinates are invalid" || e.message === "Can't place new ship over another") {
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
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  line-height: 1;\n  background-color: black;\n  color: #1cb517;\n  margin: 16px;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\np {\n  line-height: 1.5;\n}\n\n.instructions {\n  font-size: 1rem;\n  max-width: 500px;\n  padding: 1rem;\n  border: 1px solid #1cb517;\n  margin-top: 3rem;\n  margin-left: auto;\n  margin-right: auto;\n}\n.instructions h1 {\n  font-size: 1.5rem;\n  margin-bottom: 1rem;\n}\n\n.board-container h1 {\n  text-align: center;\n  text-transform: uppercase;\n  font-size: 1.5rem;\n  margin-bottom: 1rem;\n}\n\n.board {\n  font-size: 18px;\n  display: grid;\n  grid-template-columns: 30px auto;\n  justify-content: center;\n}\n\n.board__letters-container {\n  display: grid;\n  gap: 3px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n  grid-column: 2;\n  grid-row: 1;\n}\n.board__letters-container .board__cell {\n  border: none;\n}\n.board__letters-container .board__cell:nth-child(1)::before {\n  content: \"1\";\n}\n.board__letters-container .board__cell:nth-child(2)::before {\n  content: \"2\";\n}\n.board__letters-container .board__cell:nth-child(3)::before {\n  content: \"3\";\n}\n.board__letters-container .board__cell:nth-child(4)::before {\n  content: \"4\";\n}\n.board__letters-container .board__cell:nth-child(5)::before {\n  content: \"5\";\n}\n.board__letters-container .board__cell:nth-child(6)::before {\n  content: \"6\";\n}\n.board__letters-container .board__cell:nth-child(7)::before {\n  content: \"7\";\n}\n.board__letters-container .board__cell:nth-child(8)::before {\n  content: \"8\";\n}\n.board__letters-container .board__cell:nth-child(9)::before {\n  content: \"9\";\n}\n.board__letters-container .board__cell:nth-child(10)::before {\n  content: \"10\";\n}\n\n.board__digits-container {\n  display: grid;\n  gap: 3px;\n  grid-template-columns: 30px;\n  grid-auto-rows: 30px;\n  grid-column: 1;\n  grid-row: 2;\n}\n.board__digits-container .board__cell {\n  border: none;\n}\n.board__digits-container .board__cell:nth-child(1)::before {\n  content: \"a\";\n}\n.board__digits-container .board__cell:nth-child(2)::before {\n  content: \"b\";\n}\n.board__digits-container .board__cell:nth-child(3)::before {\n  content: \"c\";\n}\n.board__digits-container .board__cell:nth-child(4)::before {\n  content: \"d\";\n}\n.board__digits-container .board__cell:nth-child(5)::before {\n  content: \"e\";\n}\n.board__digits-container .board__cell:nth-child(6)::before {\n  content: \"f\";\n}\n.board__digits-container .board__cell:nth-child(7)::before {\n  content: \"g\";\n}\n.board__digits-container .board__cell:nth-child(8)::before {\n  content: \"h\";\n}\n.board__digits-container .board__cell:nth-child(9)::before {\n  content: \"i\";\n}\n.board__digits-container .board__cell:nth-child(10)::before {\n  content: \"j\";\n}\n\n.board__cell {\n  background-color: black;\n  color: #1cb517;\n  border: 1px solid #1cb517;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.board__board {\n  grid-row: 2;\n  display: grid;\n  gap: 3px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n}\n.board__board .board__cell:hover {\n  background-color: #1cb517;\n  color: black;\n}\n\n#error-message {\n  font-size: 1rem;\n  text-align: center;\n  max-width: 500px;\n  grid-column: 1/-1;\n  margin-top: 1rem;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 0 1rem;\n}\n\n#cpu-board-container {\n  display: none;\n  margin-top: 2rem;\n}\n\n.player-buttons ul {\n  text-align: center;\n  margin: 2rem 0;\n}\n.player-buttons ul li {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\n.ships-table {\n  font-size: 1rem;\n  border: 1px solid #1cb517;\n  margin-bottom: 2rem;\n  margin-left: auto;\n  margin-right: auto;\n}\n.ships-table td, .ships-table th {\n  padding: 0.5rem;\n  border: 1px solid #1cb517;\n}\n\n#start-button {\n  visibility: hidden;\n}\n\n.reset-container {\n  font-size: 1, 5rem;\n  text-align: center;\n  margin: 3rem 0;\n}\n.reset-container p {\n  margin-bottom: 1rem;\n}\n\n.button {\n  font-family: monospace;\n  font-size: 1rem;\n  text-shadow: 0 0 10px #1cb517;\n  background-color: black;\n  color: #1cb517;\n  padding: 0.5rem 0.8rem;\n  border: 1px solid #1cb517;\n  cursor: pointer;\n}\n.button:hover {\n  background-color: #1cb517;\n  color: black;\n}\n.button--highlighted {\n  background-color: #1cb517;\n  color: black;\n}\n.button:disabled {\n  opacity: 0.4;\n}\n\n@media only screen and (min-width: 1000px) {\n  .grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n  }\n\n  .ships-table {\n    width: 100%;\n  }\n\n  #cpu-board-container {\n    margin-top: 0;\n  }\n\n  .player-buttons ul {\n    margin: 0;\n    margin-bottom: 2rem;\n  }\n  .player-buttons ul li {\n    display: block;\n  }\n  .player-buttons .button {\n    display: block;\n    width: 100%;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/_reset.scss","webpack://./src/scss/styles.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_instructions.scss","webpack://./src/scss/_board.scss","webpack://./src/scss/_buttons.scss","webpack://./src/scss/_media-queries.scss"],"names":[],"mappings":"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","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n@use './variables' as *;\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, center,\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed, \r\nfigure, figcaption, footer, header, hgroup, \r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tfont-size: 100%;\r\n\tfont: inherit;\r\n\tvertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure, \r\nfooter, header, hgroup, menu, nav, section {\r\n\tdisplay: block;\r\n}\r\nbody {\r\n\tfont-family: monospace;\r\n   text-shadow: 0 0 10px $green;\r\n\tline-height: 1;\r\n   background-color: black;\r\n   color: $green;\r\n\tmargin: 16px;\r\n}\r\nol, ul {\r\n\tlist-style: none;\r\n}\r\nblockquote, q {\r\n\tquotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n\tcontent: '';\r\n\tcontent: none;\r\n}\r\ntable {\r\n\tborder-collapse: collapse;\r\n\tborder-spacing: 0;\r\n}\r\np {\r\n\tline-height: 1.5;\r\n}","/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  line-height: 1;\n  background-color: black;\n  color: #1cb517;\n  margin: 16px;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\np {\n  line-height: 1.5;\n}\n\n.instructions {\n  font-size: 1rem;\n  max-width: 500px;\n  padding: 1rem;\n  border: 1px solid #1cb517;\n  margin-top: 3rem;\n  margin-left: auto;\n  margin-right: auto;\n}\n.instructions h1 {\n  font-size: 1.5rem;\n  margin-bottom: 1rem;\n}\n\n.board-container h1 {\n  text-align: center;\n  text-transform: uppercase;\n  font-size: 1.5rem;\n  margin-bottom: 1rem;\n}\n\n.board {\n  font-size: 18px;\n  display: grid;\n  grid-template-columns: 30px auto;\n  justify-content: center;\n}\n\n.board__letters-container {\n  display: grid;\n  gap: 3px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n  grid-column: 2;\n  grid-row: 1;\n}\n.board__letters-container .board__cell {\n  border: none;\n}\n.board__letters-container .board__cell:nth-child(1)::before {\n  content: \"1\";\n}\n.board__letters-container .board__cell:nth-child(2)::before {\n  content: \"2\";\n}\n.board__letters-container .board__cell:nth-child(3)::before {\n  content: \"3\";\n}\n.board__letters-container .board__cell:nth-child(4)::before {\n  content: \"4\";\n}\n.board__letters-container .board__cell:nth-child(5)::before {\n  content: \"5\";\n}\n.board__letters-container .board__cell:nth-child(6)::before {\n  content: \"6\";\n}\n.board__letters-container .board__cell:nth-child(7)::before {\n  content: \"7\";\n}\n.board__letters-container .board__cell:nth-child(8)::before {\n  content: \"8\";\n}\n.board__letters-container .board__cell:nth-child(9)::before {\n  content: \"9\";\n}\n.board__letters-container .board__cell:nth-child(10)::before {\n  content: \"10\";\n}\n\n.board__digits-container {\n  display: grid;\n  gap: 3px;\n  grid-template-columns: 30px;\n  grid-auto-rows: 30px;\n  grid-column: 1;\n  grid-row: 2;\n}\n.board__digits-container .board__cell {\n  border: none;\n}\n.board__digits-container .board__cell:nth-child(1)::before {\n  content: \"a\";\n}\n.board__digits-container .board__cell:nth-child(2)::before {\n  content: \"b\";\n}\n.board__digits-container .board__cell:nth-child(3)::before {\n  content: \"c\";\n}\n.board__digits-container .board__cell:nth-child(4)::before {\n  content: \"d\";\n}\n.board__digits-container .board__cell:nth-child(5)::before {\n  content: \"e\";\n}\n.board__digits-container .board__cell:nth-child(6)::before {\n  content: \"f\";\n}\n.board__digits-container .board__cell:nth-child(7)::before {\n  content: \"g\";\n}\n.board__digits-container .board__cell:nth-child(8)::before {\n  content: \"h\";\n}\n.board__digits-container .board__cell:nth-child(9)::before {\n  content: \"i\";\n}\n.board__digits-container .board__cell:nth-child(10)::before {\n  content: \"j\";\n}\n\n.board__cell {\n  background-color: black;\n  color: #1cb517;\n  border: 1px solid #1cb517;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.board__board {\n  grid-row: 2;\n  display: grid;\n  gap: 3px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n}\n.board__board .board__cell:hover {\n  background-color: #1cb517;\n  color: black;\n}\n\n#error-message {\n  font-size: 1rem;\n  text-align: center;\n  max-width: 500px;\n  grid-column: 1/-1;\n  margin-top: 1rem;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 0 1rem;\n}\n\n#cpu-board-container {\n  display: none;\n  margin-top: 2rem;\n}\n\n.player-buttons ul {\n  text-align: center;\n  margin: 2rem 0;\n}\n.player-buttons ul li {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\n.ships-table {\n  font-size: 1rem;\n  border: 1px solid #1cb517;\n  margin-bottom: 2rem;\n  margin-left: auto;\n  margin-right: auto;\n}\n.ships-table td, .ships-table th {\n  padding: 0.5rem;\n  border: 1px solid #1cb517;\n}\n\n#start-button {\n  visibility: hidden;\n}\n\n.reset-container {\n  font-size: 1, 5rem;\n  text-align: center;\n  margin: 3rem 0;\n}\n.reset-container p {\n  margin-bottom: 1rem;\n}\n\n.button {\n  font-family: monospace;\n  font-size: 1rem;\n  text-shadow: 0 0 10px #1cb517;\n  background-color: black;\n  color: #1cb517;\n  padding: 0.5rem 0.8rem;\n  border: 1px solid #1cb517;\n  cursor: pointer;\n}\n.button:hover {\n  background-color: #1cb517;\n  color: black;\n}\n.button--highlighted {\n  background-color: #1cb517;\n  color: black;\n}\n.button:disabled {\n  opacity: 0.4;\n}\n\n@media only screen and (min-width: 1000px) {\n  .grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n  }\n\n  .ships-table {\n    width: 100%;\n  }\n\n  #cpu-board-container {\n    margin-top: 0;\n  }\n\n  .player-buttons ul {\n    margin: 0;\n    margin-bottom: 2rem;\n  }\n  .player-buttons ul li {\n    display: block;\n  }\n  .player-buttons .button {\n    display: block;\n    width: 100%;\n  }\n}","$green: #1cb517;","@use './variables' as *;\r\n\r\n.instructions {\r\n   font-size: 1rem;\r\n   max-width: 500px;\r\n   padding: 1rem;\r\n   border: 1px solid $green;\r\n   margin-top: 3rem;\r\n   margin-left: auto;\r\n   margin-right: auto;\r\n   h1 {\r\n      font-size: 1.5rem;\r\n      margin-bottom: 1rem;\r\n   }\r\n}","@use 'sass:list';\r\n@use './variables' as *;\r\n\r\n$cellWidth: 30px;\r\n\r\n.board-container {\r\n   h1 {\r\n      text-align: center;\r\n      text-transform: uppercase;\r\n      font-size: 1.5rem;\r\n      margin-bottom: 1rem;\r\n   }\r\n}\r\n.board {\r\n   font-size: 18px;\r\n   display: grid;\r\n   grid-template-columns: $cellWidth auto;\r\n   justify-content: center;\r\n}\r\n.board__letters-container {\r\n   display: grid;\r\n   gap: 3px;\r\n   grid-template-columns: repeat(10, $cellWidth);\r\n   grid-auto-rows: $cellWidth;\r\n   grid-column: 2;\r\n   grid-row: 1;\r\n   .board__cell {\r\n      border: none;\r\n\r\n      @for $i from 1 through 10 {\r\n         &:nth-child(#{$i})::before {\r\n            content: '#{$i}'; \r\n         }\r\n      }\r\n   }\r\n}\r\n.board__digits-container {\r\n   display: grid;\r\n   gap: 3px;\r\n   grid-template-columns: $cellWidth;\r\n   grid-auto-rows: $cellWidth;\r\n   grid-column: 1;\r\n   grid-row: 2;\r\n   .board__cell {\r\n      border: none;\r\n\r\n      $letters: 'a','b','c','d','e','f','g','h','i','j';\r\n\r\n      @for $i from 1 through 10 {\r\n         &:nth-child(#{$i})::before {\r\n            content: '#{list.nth($letters, $i)}'; \r\n         }\r\n      }\r\n   }\r\n}\r\n.board__cell {\r\n   background-color: black;\r\n   color: $green;\r\n   border: 1px solid $green;\r\n   display: flex;\r\n   justify-content: center;\r\n   align-items: center;\r\n}\r\n.board__board {\r\n   grid-row: 2;\r\n   display: grid;\r\n   gap: 3px;\r\n   grid-template-columns: repeat(10, $cellWidth);\r\n   grid-auto-rows: $cellWidth;\r\n   .board__cell {\r\n      &:hover {\r\n         background-color: $green;\r\n         color: black;\r\n      }\r\n   }\r\n}\r\n#error-message {\r\n   font-size: 1rem;\r\n   text-align: center;\r\n   max-width: 500px;\r\n   grid-column: 1 / -1;\r\n   margin-top: 1rem;\r\n   margin-left: auto;\r\n   margin-right: auto;\r\n   padding: 0 1rem;\r\n}\r\n#cpu-board-container {\r\n   display: none;\r\n   margin-top: 2rem;\r\n}\r\n.player-buttons {\r\n   ul {\r\n      text-align: center;\r\n      margin: 2rem 0;\r\n   }\r\n   ul li {\r\n      display: inline-block;\r\n      margin-bottom: .5rem;\r\n   }\r\n}\r\n.ships-table {\r\n   font-size: 1rem;\r\n   border: 1px solid $green;\r\n   margin-bottom: 2rem;\r\n   margin-left: auto;\r\n   margin-right: auto;\r\n\r\n   td, th {\r\n      padding: .5rem;\r\n      border: 1px solid $green;\r\n   }\r\n}\r\n#start-button {\r\n   visibility: hidden;\r\n}\r\n.reset-container {\r\n   font-size: 1,5rem;\r\n   text-align: center;\r\n   margin: 3rem 0;\r\n   p {\r\n      margin-bottom: 1rem;\r\n   }\r\n}","@use './variables' as *;\r\n\r\n.button {\r\n   font-family: monospace;\r\n   font-size: 1rem;\r\n   text-shadow: 0 0 10px $green;\r\n   background-color: black;\r\n   color: $green;\r\n   padding: .5rem .8rem;\r\n   border: 1px solid $green;\r\n   cursor: pointer;\r\n   &:hover {\r\n      background-color: $green;\r\n      color: black;\r\n   }\r\n   &--highlighted {\r\n      background-color: $green;\r\n      color: black;\r\n   }\r\n   &:disabled {\r\n      opacity: .4;\r\n   }\r\n}","@media only screen and (min-width: 1000px) {\r\n   .grid {\r\n      display: grid;\r\n      grid-template-columns: 1fr 1fr;\r\n   }\r\n   .ships-table {\r\n      width: 100%;\r\n   }\r\n   #cpu-board-container {\r\n      margin-top: 0;\r\n   }\r\n   .player-buttons {\r\n      ul {\r\n         margin: 0;\r\n         margin-bottom: 2rem;\r\n      }\r\n      ul li {\r\n         display: block;\r\n      }\r\n      .button {\r\n         display: block;\r\n         width: 100%;\r\n      }\r\n   }\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsV0FBVyxZQUFZLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxPQUFPLE1BQU0sVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsV0FBVyxZQUFZLFVBQVUsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsVUFBVSxXQUFXLFlBQVksTUFBTSxNQUFNLFlBQVksV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLE9BQU8sTUFBTSxVQUFVLFdBQVcsT0FBTyxNQUFNLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxPQUFPLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLE1BQU0sTUFBTSxZQUFZLFdBQVcsTUFBTSxNQUFNLFVBQVUsT0FBTyxNQUFNLEtBQUssVUFBVSxXQUFXLE9BQU8sTUFBTSxVQUFVLE9BQU8sTUFBTSxVQUFVLE9BQU8sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsVUFBVSxNQUFNLGtLQUFrSywwaEJBQTBoQixnQkFBZ0IsaUJBQWlCLGdCQUFnQixzQkFBc0Isb0JBQW9CLCtCQUErQixLQUFLLHNKQUFzSixxQkFBcUIsS0FBSyxVQUFVLDZCQUE2QixvQ0FBb0MscUJBQXFCLCtCQUErQixxQkFBcUIsbUJBQW1CLEtBQUssWUFBWSx1QkFBdUIsS0FBSyxtQkFBbUIsbUJBQW1CLEtBQUssK0RBQStELGtCQUFrQixvQkFBb0IsS0FBSyxXQUFXLGdDQUFnQyx3QkFBd0IsS0FBSyxPQUFPLHVCQUF1QixLQUFLLG9tQkFBb21CLGNBQWMsZUFBZSxjQUFjLG9CQUFvQixrQkFBa0IsNkJBQTZCLEdBQUcsaUpBQWlKLG1CQUFtQixHQUFHLFVBQVUsMkJBQTJCLGtDQUFrQyxtQkFBbUIsNEJBQTRCLG1CQUFtQixpQkFBaUIsR0FBRyxZQUFZLHFCQUFxQixHQUFHLG1CQUFtQixpQkFBaUIsR0FBRyw2REFBNkQsa0JBQWtCLGtCQUFrQixHQUFHLFdBQVcsOEJBQThCLHNCQUFzQixHQUFHLE9BQU8scUJBQXFCLEdBQUcsbUJBQW1CLG9CQUFvQixxQkFBcUIsa0JBQWtCLDhCQUE4QixxQkFBcUIsc0JBQXNCLHVCQUF1QixHQUFHLG9CQUFvQixzQkFBc0Isd0JBQXdCLEdBQUcseUJBQXlCLHVCQUF1Qiw4QkFBOEIsc0JBQXNCLHdCQUF3QixHQUFHLFlBQVksb0JBQW9CLGtCQUFrQixxQ0FBcUMsNEJBQTRCLEdBQUcsK0JBQStCLGtCQUFrQixhQUFhLDRDQUE0Qyx5QkFBeUIsbUJBQW1CLGdCQUFnQixHQUFHLDBDQUEwQyxpQkFBaUIsR0FBRywrREFBK0QsbUJBQW1CLEdBQUcsK0RBQStELG1CQUFtQixHQUFHLCtEQUErRCxtQkFBbUIsR0FBRywrREFBK0QsbUJBQW1CLEdBQUcsK0RBQStELG1CQUFtQixHQUFHLCtEQUErRCxtQkFBbUIsR0FBRywrREFBK0QsbUJBQW1CLEdBQUcsK0RBQStELG1CQUFtQixHQUFHLCtEQUErRCxtQkFBbUIsR0FBRyxnRUFBZ0Usb0JBQW9CLEdBQUcsOEJBQThCLGtCQUFrQixhQUFhLGdDQUFnQyx5QkFBeUIsbUJBQW1CLGdCQUFnQixHQUFHLHlDQUF5QyxpQkFBaUIsR0FBRyw4REFBOEQsbUJBQW1CLEdBQUcsOERBQThELG1CQUFtQixHQUFHLDhEQUE4RCxtQkFBbUIsR0FBRyw4REFBOEQsbUJBQW1CLEdBQUcsOERBQThELG1CQUFtQixHQUFHLDhEQUE4RCxtQkFBbUIsR0FBRyw4REFBOEQsbUJBQW1CLEdBQUcsOERBQThELG1CQUFtQixHQUFHLDhEQUE4RCxtQkFBbUIsR0FBRywrREFBK0QsbUJBQW1CLEdBQUcsa0JBQWtCLDRCQUE0QixtQkFBbUIsOEJBQThCLGtCQUFrQiw0QkFBNEIsd0JBQXdCLEdBQUcsbUJBQW1CLGdCQUFnQixrQkFBa0IsYUFBYSw0Q0FBNEMseUJBQXlCLEdBQUcsb0NBQW9DLDhCQUE4QixpQkFBaUIsR0FBRyxvQkFBb0Isb0JBQW9CLHVCQUF1QixxQkFBcUIsc0JBQXNCLHFCQUFxQixzQkFBc0IsdUJBQXVCLG9CQUFvQixHQUFHLDBCQUEwQixrQkFBa0IscUJBQXFCLEdBQUcsd0JBQXdCLHVCQUF1QixtQkFBbUIsR0FBRyx5QkFBeUIsMEJBQTBCLDBCQUEwQixHQUFHLGtCQUFrQixvQkFBb0IsOEJBQThCLHdCQUF3QixzQkFBc0IsdUJBQXVCLEdBQUcsb0NBQW9DLG9CQUFvQiw4QkFBOEIsR0FBRyxtQkFBbUIsdUJBQXVCLEdBQUcsc0JBQXNCLHVCQUF1Qix1QkFBdUIsbUJBQW1CLEdBQUcsc0JBQXNCLHdCQUF3QixHQUFHLGFBQWEsMkJBQTJCLG9CQUFvQixrQ0FBa0MsNEJBQTRCLG1CQUFtQiwyQkFBMkIsOEJBQThCLG9CQUFvQixHQUFHLGlCQUFpQiw4QkFBOEIsaUJBQWlCLEdBQUcsd0JBQXdCLDhCQUE4QixpQkFBaUIsR0FBRyxvQkFBb0IsaUJBQWlCLEdBQUcsZ0RBQWdELFdBQVcsb0JBQW9CLHFDQUFxQyxLQUFLLG9CQUFvQixrQkFBa0IsS0FBSyw0QkFBNEIsb0JBQW9CLEtBQUssMEJBQTBCLGdCQUFnQiwwQkFBMEIsS0FBSywyQkFBMkIscUJBQXFCLEtBQUssNkJBQTZCLHFCQUFxQixrQkFBa0IsS0FBSyxHQUFHLG1CQUFtQiwyQkFBMkIsdUJBQXVCLHVCQUF1Qix3QkFBd0IscUJBQXFCLGdDQUFnQyx3QkFBd0IseUJBQXlCLDBCQUEwQixXQUFXLDRCQUE0Qiw4QkFBOEIsUUFBUSxLQUFLLG9CQUFvQiw0QkFBNEIseUJBQXlCLDBCQUEwQixXQUFXLDZCQUE2QixvQ0FBb0MsNEJBQTRCLDhCQUE4QixRQUFRLEtBQUssWUFBWSx1QkFBdUIscUJBQXFCLDhDQUE4QywrQkFBK0IsS0FBSywrQkFBK0IscUJBQXFCLGdCQUFnQixxREFBcUQsa0NBQWtDLHNCQUFzQixtQkFBbUIscUJBQXFCLHVCQUF1Qix5Q0FBeUMsMkJBQTJCLEdBQUcsV0FBVyw0QkFBNEIsR0FBRyxHQUFHLGNBQWMsV0FBVyxRQUFRLEtBQUssOEJBQThCLHFCQUFxQixnQkFBZ0IseUNBQXlDLGtDQUFrQyxzQkFBc0IsbUJBQW1CLHFCQUFxQix1QkFBdUIsZ0VBQWdFLHlDQUF5QywyQkFBMkIsR0FBRyxXQUFXLDRCQUE0Qix1QkFBdUIsR0FBRyxjQUFjLFdBQVcsUUFBUSxLQUFLLGtCQUFrQiwrQkFBK0IscUJBQXFCLGdDQUFnQyxxQkFBcUIsK0JBQStCLDJCQUEyQixLQUFLLG1CQUFtQixtQkFBbUIscUJBQXFCLGdCQUFnQixxREFBcUQsa0NBQWtDLHFCQUFxQixtQkFBbUIsc0NBQXNDLDBCQUEwQixXQUFXLFFBQVEsS0FBSyxvQkFBb0IsdUJBQXVCLDBCQUEwQix3QkFBd0IsMkJBQTJCLHdCQUF3Qix5QkFBeUIsMEJBQTBCLHVCQUF1QixLQUFLLDBCQUEwQixxQkFBcUIsd0JBQXdCLEtBQUsscUJBQXFCLFdBQVcsNkJBQTZCLHlCQUF5QixRQUFRLGNBQWMsZ0NBQWdDLCtCQUErQixRQUFRLEtBQUssa0JBQWtCLHVCQUF1QixnQ0FBZ0MsMkJBQTJCLHlCQUF5QiwwQkFBMEIsbUJBQW1CLHlCQUF5QixtQ0FBbUMsUUFBUSxLQUFLLG1CQUFtQiwwQkFBMEIsS0FBSyxzQkFBc0IseUJBQXlCLDBCQUEwQixzQkFBc0IsVUFBVSw4QkFBOEIsUUFBUSxLQUFLLDJCQUEyQixpQkFBaUIsOEJBQThCLHVCQUF1QixvQ0FBb0MsK0JBQStCLHFCQUFxQiw0QkFBNEIsZ0NBQWdDLHVCQUF1QixnQkFBZ0IsbUNBQW1DLHVCQUF1QixRQUFRLHVCQUF1QixtQ0FBbUMsdUJBQXVCLFFBQVEsbUJBQW1CLHNCQUFzQixRQUFRLEtBQUssK0NBQStDLGNBQWMsd0JBQXdCLHlDQUF5QyxRQUFRLHFCQUFxQixzQkFBc0IsUUFBUSw2QkFBNkIsd0JBQXdCLFFBQVEsd0JBQXdCLGNBQWMsdUJBQXVCLGlDQUFpQyxXQUFXLGlCQUFpQiw0QkFBNEIsV0FBVyxtQkFBbUIsNEJBQTRCLHlCQUF5QixXQUFXLFFBQVEsS0FBSyxtQkFBbUI7QUFDbCttQjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ1AxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFEQUFxRDtBQUNyRDs7QUFFQTtBQUNBLGdEQUFnRDtBQUNoRDs7QUFFQTtBQUNBLHFGQUFxRjtBQUNyRjs7QUFFQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLEtBQUs7QUFDTCxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIscUJBQXFCO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ3JHYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBLE1BQWtHO0FBQ2xHLE1BQXdGO0FBQ3hGLE1BQStGO0FBQy9GLE1BQWtIO0FBQ2xILE1BQTJHO0FBQzNHLE1BQTJHO0FBQzNHLE1BQW1KO0FBQ25KO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsNkhBQU87Ozs7QUFJNkY7QUFDckgsT0FBTyxpRUFBZSw2SEFBTyxJQUFJLG9JQUFjLEdBQUcsb0lBQWMsWUFBWSxFQUFDOzs7Ozs7Ozs7OztBQzFCaEU7O0FBRWI7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxQkFBcUIsNkJBQTZCO0FBQ2xEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3ZHYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzREFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUN0Q2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNWYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7O0FBRWpGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDWGE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEO0FBQ2xEOztBQUVBO0FBQ0EsMENBQTBDO0FBQzFDOztBQUVBOztBQUVBO0FBQ0EsaUZBQWlGO0FBQ2pGOztBQUVBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0EseURBQXlEO0FBQ3pELElBQUk7O0FBRUo7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2Nzcy9zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3NzL3N0eWxlcy5zY3NzPzMyMWYiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xyXG5cclxuY29uc3QgR2FtZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgIGxldCBfd2lubmVyTWVzc2FnZTtcclxuICAgbGV0IF9jYW5HYW1lU3RhcnQgPSBmYWxzZTtcclxuICAgbGV0IF9jb21wdXRlckJvYXJkID0gR2FtZWJvYXJkKCk7XHJcbiAgIGxldCBfY3B1UHJldmlvdXNBdHRhY2sgPSBudWxsO1xyXG4gICBsZXQgX2NwdU5leHRBdHRhY2sgPSBudWxsO1xyXG4gICBsZXQgcGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcclxuXHJcbiAgIGNvbnN0IGdldENvbXB1dGVyQm9hcmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBfY29tcHV0ZXJCb2FyZC5nZXRCb2FyZCgpO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IHBsYWNlRW5lbXlBcm15ID0gZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gcGxhY2Ugc2hpcHNcclxuICAgICAgICAgICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICAgICAgbGV0IGxlbmd0aCA9IHR5cGUubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgZGlyZWN0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMikgPT09IDAgPyBcInZlclwiIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgIF9jb21wdXRlckJvYXJkLnBsYWNlU2hpcChbcm93LCBjb2x1bW5dLCBsZW5ndGgsIGRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIHBsYWNlRW5lbXlBcm15KHR5cGUpO1xyXG4gICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGlmICghZS5tZXNzYWdlLmluY2x1ZGVzKFwiRXhjZWVkZWQgbnVtYmVyIG9mIHNoaXBzXCIpKSB7XHJcbiAgICAgICAgICAgICAgIHBsYWNlRW5lbXlBcm15KHR5cGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICByZXR1cm4gXCJmaW5pc2hlZFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIGZpbGwgY29tcHV0ZXJCb2FyZCB3aXRoIHNoaXBzXHJcbiAgICAgIGlmICghX2NvbXB1dGVyQm9hcmQuaXNBcm15Q29tcGxldGUoKSkge1xyXG4gICAgICAgICBsZXQgY29tcHV0ZXJTaGlwc0luZm8gPSBfY29tcHV0ZXJCb2FyZC5nZXRTaGlwcygpO1xyXG5cclxuICAgICAgICAgZm9yIChsZXQgdHlwZSBpbiBjb21wdXRlclNoaXBzSW5mbykge1xyXG4gICAgICAgICAgICBwbGFjZUVuZW15QXJteShjb21wdXRlclNoaXBzSW5mb1t0eXBlXSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBsYXllckJvYXJkLmlzQXJteUNvbXBsZXRlKCkpIHtcclxuICAgICAgICAgX2NhbkdhbWVTdGFydCA9IHRydWU7XHJcbiAgICAgICAgIHRoaXMucGxheWVyQm9hcmQucGxhY2VTaGlwID0gbnVsbDtcclxuICAgICAgICAgdGhpcy5wbGF5ZXJCb2FyZC5yZW1vdmVTaGlwID0gbnVsbDtcclxuICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICB9O1xyXG5cclxuICAgY29uc3QgdGFrZVR1cm4gPSBmdW5jdGlvbiAocm93LCBjZWxsKSB7XHJcbiAgICAgIGlmICghX2NhbkdhbWVTdGFydCkgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICBpZiAoIV93aW5uZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgIGxldCBhdHRhY2tSYW5kb21DZWxsID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgICAgICAgICBsZXQgY2VsbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICAgICAgICAgbGV0IGF0dGFja1Jlc3VsdCA9IHRoaXMucGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNlbGwpO1xyXG5cclxuICAgICAgICAgICAgICAgX2NwdVByZXZpb3VzQXR0YWNrID1cclxuICAgICAgICAgICAgICAgICAgYXR0YWNrUmVzdWx0ICYmIGF0dGFja1Jlc3VsdC5zeW1ib2wgPT09IFwiWFwiXHJcbiAgICAgICAgICAgICAgICAgICAgID8gYXR0YWNrUmVzdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgIDogbnVsbDtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgIGUubWVzc2FnZS5pbmNsdWRlcyhcclxuICAgICAgICAgICAgICAgICAgICAgXCJZb3UgYWxyZWFkeSBhdHRhY2tlZCB0aGUgZm9sbG93aW5nIGNvb3JkaW5hdGVzXCJcclxuICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgYXR0YWNrUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9O1xyXG5cclxuICAgICAgICAgbGV0IGF0dGFja1BsYXllciA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHVwZGF0ZU5leHRBdHRhY2tDb29yZGluYXRlcyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgbGV0IHBiID0gdGhpcy5wbGF5ZXJCb2FyZC5nZXRCb2FyZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgc3dpdGNoIChfY3B1TmV4dEF0dGFjay5kaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgY2FzZSBcImFib3ZlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgIGlmIChwYltfY3B1TmV4dEF0dGFjay5yb3cgLSAxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY3B1TmV4dEF0dGFjay5yb3cgPSBfY3B1TmV4dEF0dGFjay5yb3cgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY3B1TmV4dEF0dGFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICBjYXNlIFwibmV4dFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICBpZiAocGJbX2NwdU5leHRBdHRhY2sucm93XVtfY3B1TmV4dEF0dGFjay5jb2x1bW4gKyAxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY3B1TmV4dEF0dGFjay5jb2x1bW4gPSBfY3B1TmV4dEF0dGFjay5jb2x1bW4gKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY3B1TmV4dEF0dGFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICBjYXNlIFwiYmVsb3dcIjpcclxuICAgICAgICAgICAgICAgICAgICAgaWYgKHBiW19jcHVOZXh0QXR0YWNrLnJvdyArIDFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jcHVOZXh0QXR0YWNrLnJvdyA9IF9jcHVOZXh0QXR0YWNrLnJvdyArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jcHVOZXh0QXR0YWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJiZWZvcmVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgaWYgKHBiW19jcHVOZXh0QXR0YWNrLnJvd11bX2NwdU5leHRBdHRhY2suY29sdW1uIC0gMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NwdU5leHRBdHRhY2suY29sdW1uID0gX2NwdU5leHRBdHRhY2suY29sdW1uIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NwdU5leHRBdHRhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoX2NwdVByZXZpb3VzQXR0YWNrICYmIF9jcHVOZXh0QXR0YWNrKSB7XHJcbiAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgIGxldCBhdHRhY2tSZXN1bHQgPSB0aGlzLnBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2soXHJcbiAgICAgICAgICAgICAgICAgICAgIF9jcHVOZXh0QXR0YWNrLnJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgX2NwdU5leHRBdHRhY2suY29sdW1uXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgX2NwdU5leHRBdHRhY2tcclxuICAgICAgICAgICAgICAgICAgaWYgKGF0dGFja1Jlc3VsdCAmJiBhdHRhY2tSZXN1bHQuc3ltYm9sID09PSBcIlhcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICBfY3B1TmV4dEF0dGFjayA9IHsgLi4uX2NwdU5leHRBdHRhY2sgfTtcclxuICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTmV4dEF0dGFja0Nvb3JkaW5hdGVzKCk7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIF9jcHVOZXh0QXR0YWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgZS5tZXNzYWdlLmluY2x1ZGVzKFwiUHJvdmlkZWQgY29vcmRpbmF0ZXMgYXJlIG5vdCB2YWxpZFwiKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICBlLm1lc3NhZ2UuaW5jbHVkZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiWW91IGFscmVhZHkgYXR0YWNrZWQgdGhlIGZvbGxvd2luZyBjb29yZGluYXRlc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIF9jcHVOZXh0QXR0YWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgYXR0YWNrUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAvLyBjaGVjayBhbmQgYXR0YWNrIGEgY2VsbCB0aGF0IGlzIGFyb3VuZCBhbiBYXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoX2NwdVByZXZpb3VzQXR0YWNrKSB7XHJcbiAgICAgICAgICAgICAgIGxldCBwYiA9IHBsYXllckJvYXJkLmdldEJvYXJkKCk7XHJcbiAgICAgICAgICAgICAgIGxldCB7IHJvdywgY29sdW1uLCBzeW1ib2wgfSA9IF9jcHVQcmV2aW91c0F0dGFjaztcclxuICAgICAgICAgICAgICAgbGV0IG5lYXJDZWxscyA9IFtdO1xyXG4gICAgICAgICAgICAgICBsZXQgY2VsbHNDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgIC8vIHBvcHVsYXRlIG5lYXJDZWxsc1xyXG4gICAgICAgICAgICAgICBwYltyb3cgLSAxXSAmJiBwYltyb3cgLSAxXVtjb2x1bW5dXHJcbiAgICAgICAgICAgICAgICAgID8gbmVhckNlbGxzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGNlbGw6IHBiW3JvdyAtIDFdW2NvbHVtbl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBcImFib3ZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgcm93OiByb3cgLSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogY29sdW1uLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIDogbnVsbDtcclxuICAgICAgICAgICAgICAgcGJbcm93XSAmJiBwYltyb3ddW2NvbHVtbiArIDFdXHJcbiAgICAgICAgICAgICAgICAgID8gbmVhckNlbGxzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGNlbGw6IHBiW3Jvd11bY29sdW1uICsgMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBcIm5leHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IGNvbHVtbiArIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgICAgICAgICAgICBwYltyb3cgKyAxXSAmJiBwYltyb3cgKyAxXVtjb2x1bW5dXHJcbiAgICAgICAgICAgICAgICAgID8gbmVhckNlbGxzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGNlbGw6IHBiW3JvdyArIDFdW2NvbHVtbl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBcImJlbG93XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgcm93OiByb3cgKyAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogY29sdW1uLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIDogbnVsbDtcclxuICAgICAgICAgICAgICAgcGJbcm93XSAmJiBwYltyb3ddW2NvbHVtbiAtIDFdXHJcbiAgICAgICAgICAgICAgICAgID8gbmVhckNlbGxzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGNlbGw6IHBiW3Jvd11bY29sdW1uIC0gMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBcImJlZm9yZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHJvdzogcm93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogY29sdW1uIC0gMSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5lYXJDZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICBpZiAobmVhckNlbGxzW2ldLmNlbGwgPT09IFwiflwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRhY2tSZXN1bHQgPSB0aGlzLnBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2soXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJDZWxsc1tpXS5yb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJDZWxsc1tpXS5jb2x1bW5cclxuICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBfY3B1TmV4dEF0dGFja1xyXG4gICAgICAgICAgICAgICAgICAgICBpZiAoYXR0YWNrUmVzdWx0ICYmIGF0dGFja1Jlc3VsdC5zeW1ib2wgPT09IFwiWFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jcHVOZXh0QXR0YWNrID0geyAuLi5uZWFyQ2VsbHNbaV0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTmV4dEF0dGFja0Nvb3JkaW5hdGVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jcHVOZXh0QXR0YWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGNlbGxzQ291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgIGlmIChjZWxsc0NvdW50ZXIgPT09IG5lYXJDZWxscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgX2NwdVByZXZpb3VzQXR0YWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgYXR0YWNrUmFuZG9tQ2VsbCgpO1xyXG4gICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAvLyBhdHRhY2sgYSByYW5kb20gY2VsbFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF9jcHVQcmV2aW91c0F0dGFjayA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICBhdHRhY2tSYW5kb21DZWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgIC8vIGF0dGFjayBjb21wdXRlclxyXG4gICAgICAgICBfY29tcHV0ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY2VsbCk7XHJcblxyXG4gICAgICAgICBpZiAoX2NvbXB1dGVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcclxuICAgICAgICAgICAgX3dpbm5lck1lc3NhZ2UgPSBcIlBsYXllciB3b24gdGhlIG1hdGNoXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBfd2lubmVyTWVzc2FnZTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLy8gYXR0YWNrIHBsYXllclxyXG4gICAgICAgICBhdHRhY2tQbGF5ZXIoKTtcclxuXHJcbiAgICAgICAgIGlmICh0aGlzLnBsYXllckJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIF93aW5uZXJNZXNzYWdlID0gXCJDb21wdXRlciB3b24gdGhlIG1hdGNoXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBfd2lubmVyTWVzc2FnZTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBfd2lubmVyTWVzc2FnZTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGdldFdpbm5lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF93aW5uZXJNZXNzYWdlO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgcmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIF93aW5uZXJNZXNzYWdlID0gdW5kZWZpbmVkO1xyXG4gICAgICBfY2FuR2FtZVN0YXJ0ID0gZmFsc2U7XHJcbiAgICAgIF9jb21wdXRlckJvYXJkID0gR2FtZWJvYXJkKCk7XHJcbiAgICAgIHRoaXMucGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcclxuICAgfTtcclxuXHJcbiAgIHJldHVybiB7XHJcbiAgICAgIHBsYXllckJvYXJkLFxyXG4gICAgICBnZXRDb21wdXRlckJvYXJkLFxyXG4gICAgICBpbml0LFxyXG4gICAgICB0YWtlVHVybixcclxuICAgICAgZ2V0V2lubmVyLFxyXG4gICAgICByZXNldCxcclxuICAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWU7XHJcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcclxuXHJcbmNvbnN0IEdhbWVib2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgbGV0IF9ib2FyZCA9IFtdO1xyXG4gICBsZXQgX3NoaXBzID0ge1xyXG4gICAgICB0eXBlMTogeyBzaGlwczogW10sIGxlbmd0aDogNSwgbWF4OiAxLCBzeW1ib2w6IFwiQVwiIH0sXHJcbiAgICAgIHR5cGUyOiB7IHNoaXBzOiBbXSwgbGVuZ3RoOiA0LCBtYXg6IDIsIHN5bWJvbDogXCJCXCIgfSxcclxuICAgICAgdHlwZTM6IHsgc2hpcHM6IFtdLCBsZW5ndGg6IDMsIG1heDogMywgc3ltYm9sOiBcIkNcIiB9LFxyXG4gICAgICB0eXBlNDogeyBzaGlwczogW10sIGxlbmd0aDogMiwgbWF4OiA0LCBzeW1ib2w6IFwiRFwiIH0sXHJcbiAgIH07XHJcblxyXG4gICAvLyBjcmVhdGUgMTAgcm93cyBhbmQgMTAgY2VsbHMgZm9yIF9ib2FyZFxyXG4gICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93KyspIHtcclxuICAgICAgX2JvYXJkLnB1c2goW10pO1xyXG5cclxuICAgICAgZm9yIChsZXQgY2VsbCA9IDA7IGNlbGwgPCAxMDsgY2VsbCsrKSB7XHJcbiAgICAgICAgIF9ib2FyZFtyb3ddLnB1c2goXCJ+XCIpO1xyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIGNvbnN0IGdldEJvYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShfYm9hcmQpKTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGdldFNoaXBzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgc2hpcHNDbG9uZSA9IHt9O1xyXG5cclxuICAgICAgZm9yIChsZXQga2V5IGluIF9zaGlwcykge1xyXG4gICAgICAgICBzaGlwc0Nsb25lW2tleV0gPSB7fTtcclxuICAgICAgICAgc2hpcHNDbG9uZVtrZXldLnNoaXBzID0gW107XHJcbiAgICAgICAgIHNoaXBzQ2xvbmVba2V5XS5sZW5ndGggPSBfc2hpcHNba2V5XS5sZW5ndGg7XHJcbiAgICAgICAgIHNoaXBzQ2xvbmVba2V5XS5tYXggPSBfc2hpcHNba2V5XS5tYXg7XHJcblxyXG4gICAgICAgICBfc2hpcHNba2V5XS5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjbG9uZSA9IFNoaXAoc2hpcC5nZXRMZW5ndGgoKSwgc2hpcC5nZXRDb29ycygpKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5nZXRIaXRzKCk7IGkrKykge1xyXG4gICAgICAgICAgICAgICBjbG9uZS5oaXQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2hpcHNDbG9uZVtrZXldLnNoaXBzLnB1c2goY2xvbmUpO1xyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHNoaXBzQ2xvbmU7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBnZXRCb2FyZEFuZFNoaXBzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgYm9hcmRDb3B5ID0gdGhpcy5nZXRCb2FyZCgpO1xyXG5cclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfc2hpcHNbdHlwZV0uc2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTaGlwID0gX3NoaXBzW3R5cGVdLnNoaXBzW2ldO1xyXG4gICAgICAgICAgICBsZXQgc2hpcENvb3JzID0gY3VycmVudFNoaXAuZ2V0Q29vcnMoKTtcclxuXHJcbiAgICAgICAgICAgIHNoaXBDb29ycy5mb3JFYWNoKChjb29ycykgPT4ge1xyXG4gICAgICAgICAgICAgICBsZXQgW3JvdywgY29sdW1uXSA9IGNvb3JzO1xyXG5cclxuICAgICAgICAgICAgICAgaWYgKGJvYXJkQ29weVtyb3ddW2NvbHVtbl0gPT09IFwiflwiKSB7XHJcbiAgICAgICAgICAgICAgICAgIGJvYXJkQ29weVtyb3ddW2NvbHVtbl0gPSBfc2hpcHNbdHlwZV0uc3ltYm9sO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBib2FyZENvcHk7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZXMgPSBbMCwgMF0sIGxlbmd0aCA9IDIsIGRpcmVjdGlvbikge1xyXG4gICAgICBpZiAoaXNOYU4oTnVtYmVyKGNvb3JkaW5hdGVzWzBdKSkgfHwgaXNOYU4oTnVtYmVyKGNvb3JkaW5hdGVzWzFdKSkpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29vcmRpbmF0ZXMgc2hvdWxkIGJlIG51bWJlcnNcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc05hTihOdW1iZXIobGVuZ3RoKSkgfHwgbGVuZ3RoID4gNSB8fCBsZW5ndGggPCAyKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxlbmd0aCBzaG91bGQgYmUgYSBudW1iZXIgYmV0d2VlbiAyIGFuZCA1XCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgc2hpcENvb3JkaW5hdGVzID0gW1suLi5jb29yZGluYXRlc11dO1xyXG5cclxuICAgICAgLy8gZ2VuZXJhdGUgY29vcmRpbmF0ZXMgdGhhdCBleHBhbmQgYmFzZWQgb24gbGVuZ3RoIGFuZCBkaXJlY3Rpb25cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgLy8gZXhwYW5kIGNvb3JkaW5hdGVzIHZlcnRpY2FsbHlcclxuICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ2ZXJcIikge1xyXG4gICAgICAgICAgICBsZXQgY29vcnNDb3B5ID0gWy4uLnNoaXBDb29yZGluYXRlc1tpXV07XHJcbiAgICAgICAgICAgIGNvb3JzQ29weVswXSsrO1xyXG4gICAgICAgICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChjb29yc0NvcHkpO1xyXG5cclxuICAgICAgICAgICAgLy8gZXhwYW5kIGNvb3JkaW5hdGVzIGhvcml6b250YWxseVxyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgY29vcnNDb3B5ID0gWy4uLnNoaXBDb29yZGluYXRlc1tpXV07XHJcbiAgICAgICAgICAgIGNvb3JzQ29weVsxXSsrO1xyXG4gICAgICAgICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChjb29yc0NvcHkpO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoZWNrIGlmIHNoaXBDb29yZGluYXRlcyBhcmUgdmFsaWRcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgbGV0IGN1cnJlbnRDb29yID0gc2hpcENvb3JkaW5hdGVzW2ldO1xyXG5cclxuICAgICAgICAgaWYgKGN1cnJlbnRDb29yWzBdID4gOSB8fCBjdXJyZW50Q29vclswXSA8IDApXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5ldyBzaGlwIGNvb3JkaW5hdGVzIGFyZSBpbnZhbGlkXCIpO1xyXG4gICAgICAgICBpZiAoY3VycmVudENvb3JbMV0gPiA5IHx8IGN1cnJlbnRDb29yWzFdIDwgMClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTmV3IHNoaXAgY29vcmRpbmF0ZXMgYXJlIGludmFsaWRcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBuZXdTaGlwID0gU2hpcChsZW5ndGgsIHNoaXBDb29yZGluYXRlcyk7XHJcblxyXG4gICAgICAvLyBjaGVjayBpZiBuZXdTaGlwIGNhbiBiZSBhZGRlZCB0byBfc2hpcHNcclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgaWYgKF9zaGlwc1t0eXBlXS5sZW5ndGggPT09IG5ld1NoaXAuZ2V0TGVuZ3RoKCkpIHtcclxuICAgICAgICAgICAgaWYgKF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGggPCBfc2hpcHNbdHlwZV0ubWF4KSB7XHJcbiAgICAgICAgICAgICAgIC8vIGNoZWNrIGV2ZXJ5IHNoaXAncyBjb29yZGluYXRlcyB0byBzZWUgaWYgbmV3U2hpcCBkb2VzIG5vdCBoYXZlXHJcbiAgICAgICAgICAgICAgIC8vIHRoZSBzYW1lIGNvb3JkaW5hdGVzIG9mIGFub3RoZXIgc2hpcFxyXG4gICAgICAgICAgICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICAgICAgICAgICBfc2hpcHNbdHlwZV0uc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICBzaGlwLmdldENvb3JzKCkuZm9yRWFjaCgoc2hpcENvb3JzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NoaXAuZ2V0Q29vcnMoKS5mb3JFYWNoKChuZXdTaGlwQ29vcnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlwQ29vcnNbMF0gPT09IG5ld1NoaXBDb29yc1swXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlwQ29vcnNbMV0gPT09IG5ld1NoaXBDb29yc1sxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNhbid0IHBsYWNlIG5ldyBzaGlwIG92ZXIgYW5vdGhlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgX3NoaXBzW3R5cGVdLnNoaXBzLnB1c2gobmV3U2hpcCk7XHJcbiAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBsZXQgZXJyb3JNc2cgPSBgRXhjZWVkZWQgbnVtYmVyIG9mIHNoaXBzOiBtYXhpbXVuIG51bWJlciBmb3IgJHtsZW5ndGh9IGxlbmd0aCBzaGlwcyBpcyAke19zaGlwc1t0eXBlXS5tYXh9YDtcclxuICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHJlbW92ZVNoaXAgPSBmdW5jdGlvbiAocm93ID0gMCwgY2VsbCA9IDApIHtcclxuICAgICAgbGV0IGZpbHRlcmVkU2hpcHM7XHJcbiAgICAgIGxldCBjb29ycztcclxuXHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIC8vIHNlYXJjaCBhbmQgZmlsdGVyIG91dCBzaGlwIHRoYXQgaGFzIFwicm93XCIgYW5kIFwiY2VsbFwiIGFzIGNvb3JkaW5hdGVzXHJcbiAgICAgICAgIHNoaXBzTG9vcDogZm9yIChsZXQgaSA9IDA7IGkgPCBfc2hpcHNbdHlwZV0uc2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTaGlwID0gX3NoaXBzW3R5cGVdLnNoaXBzW2ldO1xyXG4gICAgICAgICAgICBsZXQgc2hpcENvb3JzID0gY3VycmVudFNoaXAuZ2V0Q29vcnMoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2hpcENvb3JzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgIGlmIChzaGlwQ29vcnNbal1bMF0gPT09IHJvdyAmJiBzaGlwQ29vcnNbal1bMV0gPT09IGNlbGwpIHtcclxuICAgICAgICAgICAgICAgICAgZmlsdGVyZWRTaGlwcyA9IF9zaGlwc1t0eXBlXS5zaGlwcy5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgIChzaGlwKSA9PiBzaGlwICE9PSBjdXJyZW50U2hpcFxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICBjb29ycyA9IHNoaXBDb29ycztcclxuICAgICAgICAgICAgICAgICAgYnJlYWsgc2hpcHNMb29wO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgICAvLyB1cGRhdGUgX3NoaXBzW3R5cGVdLnNoaXBzIGFycmF5XHJcbiAgICAgICAgIGlmIChmaWx0ZXJlZFNoaXBzKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHRNc2cgPSBcIlJlbW92ZWQgc2hpcCB3aXRoIHRoZSBmb2xsb3dpbmcgY29vcmRpbmF0ZXM6IFwiO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0TXNnICs9IGNvb3JzXHJcbiAgICAgICAgICAgICAgIC5yZWR1Y2UoXHJcbiAgICAgICAgICAgICAgICAgIChhY2MsIGN1cnJlbnQpID0+IGFjYyArIGBbJHtjdXJyZW50WzBdfSwgJHtjdXJyZW50WzFdfV0sIGAsXHJcbiAgICAgICAgICAgICAgICAgIFwiXCJcclxuICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAuc2xpY2UoMCwgLTIpO1xyXG5cclxuICAgICAgICAgICAgX3NoaXBzW3R5cGVdLnNoaXBzID0gZmlsdGVyZWRTaGlwcztcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdE1zZztcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYFRoZXJlIGlzIG5vIHNoaXAgaW4gWyR7cm93fSwke2NlbGx9XSBjb29yZGluYXRlc2A7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBpc0FybXlDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgaWYgKF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGggPCBfc2hpcHNbdHlwZV0ubWF4KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uIChyb3cgPSAwLCBjZWxsID0gMCkge1xyXG4gICAgICBsZXQgc3ltYm9sID0gXCIvXCI7XHJcblxyXG4gICAgICBpZiAocm93ID4gOSB8fCByb3cgPCAwIHx8IGNlbGwgPiA5IHx8IGNlbGwgPCAwKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgYFByb3ZpZGVkIGNvb3JkaW5hdGVzIGFyZSBub3QgdmFsaWQ6IFske3Jvd30sJHtjZWxsfV1gXHJcbiAgICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfYm9hcmRbcm93XVtjZWxsXSAhPT0gXCJ+XCIpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICBgWW91IGFscmVhZHkgYXR0YWNrZWQgdGhlIGZvbGxvd2luZyBjb29yZGluYXRlczogWyR7cm93fSwke2NlbGx9XWBcclxuICAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY2hlY2sgaWYgYW55IHNoaXAgaGFzIFwicm93XCIgYW5kIFwiY2VsbFwiIGFzIGNvb3JkaW5hdGVzIGFuZCBoaXQgaXRcclxuICAgICAgdHlwZUxvb3A6IGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2hpcCA9IF9zaGlwc1t0eXBlXS5zaGlwc1tpXTtcclxuICAgICAgICAgICAgbGV0IHNoaXBDb29ycyA9IGN1cnJlbnRTaGlwLmdldENvb3JzKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNoaXBDb29ycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICBpZiAoc2hpcENvb3JzW2pdWzBdID09PSByb3cgJiYgc2hpcENvb3JzW2pdWzFdID09PSBjZWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRTaGlwLmhpdCgpO1xyXG4gICAgICAgICAgICAgICAgICBzeW1ib2wgPSBcIlhcIjtcclxuICAgICAgICAgICAgICAgICAgYnJlYWsgdHlwZUxvb3A7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIF9ib2FyZFtyb3ddW2NlbGxdID0gc3ltYm9sO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgICByb3csXHJcbiAgICAgICAgIGNvbHVtbjogY2VsbCxcclxuICAgICAgICAgc3ltYm9sLFxyXG4gICAgICB9O1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgYWxsU2hpcHNTdW5rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIV9zaGlwc1t0eXBlXS5zaGlwc1tpXS5pc1N1bmsoKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICB9O1xyXG5cclxuICAgcmV0dXJuIHtcclxuICAgICAgZ2V0Qm9hcmQsXHJcbiAgICAgIGdldFNoaXBzLFxyXG4gICAgICBnZXRCb2FyZEFuZFNoaXBzLFxyXG4gICAgICBwbGFjZVNoaXAsXHJcbiAgICAgIHJlbW92ZVNoaXAsXHJcbiAgICAgIGlzQXJteUNvbXBsZXRlLFxyXG4gICAgICByZWNlaXZlQXR0YWNrLFxyXG4gICAgICBhbGxTaGlwc1N1bmssXHJcbiAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XHJcbiIsImltcG9ydCBHYW1lIGZyb20gXCIuL2dhbWUuanNcIjtcclxuaW1wb3J0IFwiLi9zY3NzL3N0eWxlcy5zY3NzXCI7XHJcblxyXG5jb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyQm9hcmRcIik7XHJcbmNvbnN0IGNwdUJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcHUtYm9hcmQtY29udGFpbmVyXCIpO1xyXG5jb25zdCBjcHVCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3B1Qm9hcmRcIik7XHJcbmNvbnN0IGJ1dHRvbnNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRvbnMtY29udGFpbmVyXCIpO1xyXG5jb25zdCBzaGlwVGFibGVDb3VudGVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwbGFjZWQtY291bnRlclwiKTtcclxuY29uc3QgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnJvci1tZXNzYWdlXCIpO1xyXG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtYnV0dG9uXCIpO1xyXG5cclxuY29uc3QgcGxheWVyQm9hcmRDZWxscyA9IFtdO1xyXG5jb25zdCBjcHVCb2FyZENlbGxzID0gW107XHJcblxyXG5sZXQgbGVuZ3RoID0gbnVsbDtcclxubGV0IGRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xyXG5sZXQgc2hpcHNJbmZvID0gbnVsbDtcclxubGV0IHByZXZpb3VzQ2xpY2tlZEJ0biA9IG51bGw7XHJcbmxldCBjdXJyZW50Q2VsbCA9IG51bGw7XHJcbmxldCBjZWxsc1RvSGlnaGxpZ2h0ID0gW107XHJcblxyXG4vLyBnZW5lcmF0ZSBwbGF5ZXIgYW5kIGNwdSBjZWxsc1xyXG5mb3IgKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93KyspIHtcclxuICAgcGxheWVyQm9hcmRDZWxscy5wdXNoKFtdKTtcclxuICAgY3B1Qm9hcmRDZWxscy5wdXNoKFtdKTtcclxuXHJcbiAgIGZvciAobGV0IGNlbGwgPSAwOyBjZWxsIDwgMTA7IGNlbGwrKykge1xyXG4gICAgICBsZXQgY2VsbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcblxyXG4gICAgICBjZWxsQnRuLnR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgICBjZWxsQnRuLmNsYXNzTmFtZSA9IFwiYm9hcmRfX2NlbGxcIjtcclxuICAgICAgY2VsbEJ0bi5kYXRhc2V0LnJvdyA9IHJvdztcclxuICAgICAgY2VsbEJ0bi5kYXRhc2V0LmNlbGwgPSBjZWxsO1xyXG4gICAgICBjZWxsQnRuLmRhdGFzZXQuZmlsbGVkID0gXCJmYWxzZVwiO1xyXG4gICAgICBwbGF5ZXJCb2FyZC5hcHBlbmQoY2VsbEJ0bik7XHJcbiAgICAgIHBsYXllckJvYXJkQ2VsbHNbcm93XS5wdXNoKGNlbGxCdG4pO1xyXG5cclxuICAgICAgbGV0IGNsb25lID0gY2VsbEJ0bi5jbG9uZU5vZGUoKTtcclxuICAgICAgY3B1Qm9hcmQuYXBwZW5kKGNsb25lKTtcclxuICAgICAgY3B1Qm9hcmRDZWxsc1tyb3ddLnB1c2goY2xvbmUpO1xyXG4gICB9XHJcbn1cclxuXHJcbmJ1dHRvbnNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrZWRCdXR0b25zKTtcclxucGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBzaG93UHJldmlld0hhbmRsZXIpO1xyXG5wbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgcmVtb3ZlU2hpcFByZXZpZXcpO1xyXG5wbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxhY2VOZXdTaGlwKTtcclxucGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIHJlbW92ZVNoaXApO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgcm90YXRlU2hpcCk7XHJcbnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBpbml0aWFsaXplR2FtZSk7XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVDbGlja2VkQnV0dG9ucyhlKSB7XHJcbiAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcbiAgIC8vIGhhbmRsZSBidXR0b25zIHRoYXQgY2hhbmdlIFwibGVuZ3RoXCIgdmFyaWFibGVcclxuICAgaWYgKHRhcmdldC5kYXRhc2V0Lmxlbmd0aCkge1xyXG4gICAgICBsZW5ndGggPSArdGFyZ2V0LmRhdGFzZXQubGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKHByZXZpb3VzQ2xpY2tlZEJ0bikge1xyXG4gICAgICAgICBwcmV2aW91c0NsaWNrZWRCdG4uY2xhc3NMaXN0LnJlbW92ZShcImJ1dHRvbi0taGlnaGxpZ2h0ZWRcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLS1oaWdobGlnaHRlZFwiKTtcclxuICAgICAgcHJldmlvdXNDbGlja2VkQnRuID0gdGFyZ2V0O1xyXG5cclxuICAgICAgLy8gaGFuZGxlIHJvdGF0aW9uLWJ1dHRvblxyXG4gICB9IGVsc2UgaWYgKHRhcmdldC5pZCA9PT0gXCJyb3RhdGlvbi1idXR0dG9uXCIpIHtcclxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgICAgZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBkaXJlY3Rpb24gPSBcImhvcml6b250YWxcIjtcclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dQcmV2aWV3SGFuZGxlcihlKSB7XHJcbiAgIHNob3dTaGlwUHJldmlldyhlLnRhcmdldCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dTaGlwUHJldmlldyhub2RlKSB7XHJcbiAgIGlmIChsZW5ndGggJiYgbm9kZS5kYXRhc2V0LnJvdyAmJiBub2RlLmRhdGFzZXQuY2VsbCkge1xyXG4gICAgICBsZXQgeyByb3csIGNlbGwgfSA9IG5vZGUuZGF0YXNldDtcclxuXHJcbiAgICAgIGN1cnJlbnRDZWxsID0gbm9kZTtcclxuICAgICAgcm93ID0gK3JvdztcclxuICAgICAgY2VsbCA9ICtjZWxsO1xyXG5cclxuICAgICAgLy8gcG9wdWxhdGUgXCJjZWxsc1RvSGlnaGxpZ2h0XCIgYXJyYXlcclxuICAgICAgbGVuZ3RoTG9vcDogZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICBpZiAoIXBsYXllckJvYXJkQ2VsbHNbcm93XSB8fCAhcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdKSB7XHJcbiAgICAgICAgICAgIGJyZWFrIGxlbmd0aExvb3A7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGNlbGxzVG9IaWdobGlnaHQucHVzaChwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0pO1xyXG4gICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICAgICAgICBjZWxsKys7XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJvdysrO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHBhaW50IHByZXZpZXcgcmVkIGlmIHNoaXAgbGVuZ3RoIGRvZXMgbm90IGZpdFxyXG4gICAgICBpZiAoY2VsbHNUb0hpZ2hsaWdodC5sZW5ndGggPCBsZW5ndGgpIHtcclxuICAgICAgICAgY2VsbHNUb0hpZ2hsaWdodC5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjYjUxNzE3XCI7XHJcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuYm9yZGVyQ29sb3IgPSBcIiNiNTE3MTdcIjtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAvLyBwYWludCBwcmV2aWV3IGVpdGhlciBncmVlbiBvciByZWQgYmFzZWQgb24gZmlsbGVkIGF0dHJpYnV0ZSB2YWx1ZVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBjZWxsc1RvSGlnaGxpZ2h0LmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNlbGwuZGF0YXNldC5maWxsZWQgPT09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzFjYjUxN1wiO1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJvcmRlckNvbG9yID0gXCIjMWNiNTE3XCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjYjUxNzE3XCI7XHJcbiAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYm9yZGVyQ29sb3IgPSBcIiNiNTE3MTdcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVNoaXBQcmV2aWV3KCkge1xyXG4gICBjZWxsc1RvSGlnaGxpZ2h0LmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xyXG4gICAgICBjZWxsLnN0eWxlLmNvbG9yID0gXCJcIjtcclxuICAgICAgY2VsbC5zdHlsZS5ib3JkZXJDb2xvciA9IFwiXCI7XHJcbiAgIH0pO1xyXG4gICBjZWxsc1RvSGlnaGxpZ2h0ID0gW107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYWNlTmV3U2hpcChlKSB7XHJcbiAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcbiAgIGlmIChsZW5ndGggJiYgdGFyZ2V0LmRhdGFzZXQucm93ICYmIHRhcmdldC5kYXRhc2V0LmNlbGwpIHtcclxuICAgICAgc2hpcHNJbmZvID0gR2FtZS5wbGF5ZXJCb2FyZC5nZXRTaGlwcygpO1xyXG4gICAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlwiOyAvLyBjbGVhciBwcmV2aW91cyBlcnJvciBtZXNzYWdlXHJcblxyXG4gICAgICBmb3IgKGxldCB0eXBlIGluIHNoaXBzSW5mbykge1xyXG4gICAgICAgICAvLyBpZGVudGlmeSB3aGF0IHR5cGUgb2Ygc2hpcCB0aGUgdXNlciBpcyBnb2luZyB0byBwbGFjZVxyXG4gICAgICAgICBpZiAoc2hpcHNJbmZvW3R5cGVdLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmIChzaGlwc0luZm9bdHlwZV0uc2hpcHMubGVuZ3RoIDwgc2hpcHNJbmZvW3R5cGVdLm1heCkge1xyXG4gICAgICAgICAgICAgICAvLyBwbGFjZSBuZXcgc2hpcFxyXG4gICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICBHYW1lLnBsYXllckJvYXJkLnBsYWNlU2hpcChcclxuICAgICAgICAgICAgICAgICAgICAgWyt0YXJnZXQuZGF0YXNldC5yb3csICt0YXJnZXQuZGF0YXNldC5jZWxsXSxcclxuICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24uc2xpY2UoMCwgMylcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgc2hpcHNJbmZvID0gR2FtZS5wbGF5ZXJCb2FyZC5nZXRTaGlwcygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgLy8gZGlzYWJsZSBzaGlwIGJ1dHRvbiB3aGVuIGdldHRpbmcgdG8gbWF4aW11bSBudW1iZXIgb2Ygc2hpcHMgcGxhY2VkXHJcbiAgICAgICAgICAgICAgICAgIGlmIChzaGlwc0luZm9bdHlwZV0uc2hpcHMubGVuZ3RoID09PSBzaGlwc0luZm9bdHlwZV0ubWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzQ2xpY2tlZEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzQ2xpY2tlZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiYnV0dG9uLS1oaWdobGlnaHRlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgdXBkYXRlUGxheWVyQm9hcmQoKTtcclxuICAgICAgICAgICAgICAgICAgcmVtb3ZlU2hpcFByZXZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgdXBkYXRlU2hpcHNUYWJsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKEdhbWUucGxheWVyQm9hcmQuaXNBcm15Q29tcGxldGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICBzdGFydEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICBzdGFydEJ0bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vIHByaW50IGVycm9yIG1lc3NhZ2VzXHJcbiAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICBlLm1lc3NhZ2UgPT09IFwiTmV3IHNoaXAgY29vcmRpbmF0ZXMgYXJlIGludmFsaWRcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICBlLm1lc3NhZ2UgPT09IFwiQ2FuJ3QgcGxhY2UgbmV3IHNoaXAgb3ZlciBhbm90aGVyXCJcclxuICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IFwiRXJyb3I6IFwiICsgZS5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVycm9yOiBBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSB0cnlpbmcgdG8gcGxhY2UgYSBuZXcgc2hpcFwiO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVQbGF5ZXJCb2FyZCgpIHtcclxuICAgbGV0IGJvYXJkID0gR2FtZS5wbGF5ZXJCb2FyZC5nZXRCb2FyZEFuZFNoaXBzKCk7XHJcblxyXG4gICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBib2FyZC5sZW5ndGg7IHJvdysrKSB7XHJcbiAgICAgIGZvciAobGV0IGNlbGwgPSAwOyBjZWxsIDwgYm9hcmRbcm93XS5sZW5ndGg7IGNlbGwrKykge1xyXG4gICAgICAgICBpZiAoYm9hcmRbcm93XVtjZWxsXS5zZWFyY2goL1tBQkNEWC9dLykgPj0gMCkge1xyXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0udGV4dENvbnRlbnQgPSBib2FyZFtyb3ddW2NlbGxdO1xyXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0uZGF0YXNldC5maWxsZWQgPSBcInRydWVcIjtcclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdLmRhdGFzZXQuZmlsbGVkID0gXCJmYWxzZVwiO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTaGlwc1RhYmxlKCkge1xyXG4gICBsZXQgaW5kZXggPSAwO1xyXG5cclxuICAgZm9yIChsZXQgdHlwZSBpbiBzaGlwc0luZm8pIHtcclxuICAgICAgc2hpcFRhYmxlQ291bnRlcnNbaW5kZXhdLnRleHRDb250ZW50ID0gc2hpcHNJbmZvW3R5cGVdLnNoaXBzLmxlbmd0aDtcclxuICAgICAgaW5kZXgrKztcclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTaGlwKGUpIHtcclxuICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgaWYgKFxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5yb3cgJiZcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQuY2VsbCAmJlxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5maWxsZWQgJiZcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQuZmlsbGVkID09PSBcInRydWVcIlxyXG4gICApIHtcclxuICAgICAgbGV0IG1zZyA9IEdhbWUucGxheWVyQm9hcmQucmVtb3ZlU2hpcChcclxuICAgICAgICAgK3RhcmdldC5kYXRhc2V0LnJvdyxcclxuICAgICAgICAgK3RhcmdldC5kYXRhc2V0LmNlbGxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChtc2cuaW5jbHVkZXMoXCJSZW1vdmVkIHNoaXAgd2l0aCB0aGUgZm9sbG93aW5nIGNvb3JkaW5hdGVzOlwiKSkge1xyXG4gICAgICAgICBsZXQgc2hpcEJ1dHRvbnMgPSBidXR0b25zQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uXCIpO1xyXG4gICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG5cclxuICAgICAgICAgc2hpcHNJbmZvID0gR2FtZS5wbGF5ZXJCb2FyZC5nZXRTaGlwcygpO1xyXG5cclxuICAgICAgICAgLy8gZW5hYmxlIGJhY2sgZGlzYWJsZWQgYnV0dG9uc1xyXG4gICAgICAgICBmb3IgKGxldCB0eXBlIGluIHNoaXBzSW5mbykge1xyXG4gICAgICAgICAgICBpZiAoc2hpcHNJbmZvW3R5cGVdLnNoaXBzLmxlbmd0aCA8IHNoaXBzSW5mb1t0eXBlXS5tYXgpIHtcclxuICAgICAgICAgICAgICAgc2hpcEJ1dHRvbnNbaW5kZXhdLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmICghR2FtZS5wbGF5ZXJCb2FyZC5pc0FybXlDb21wbGV0ZSgpKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3RhcnRCdG4uc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHVwZGF0ZVBsYXllckJvYXJkKCk7XHJcbiAgICAgICAgIHNob3dTaGlwUHJldmlldyhjdXJyZW50Q2VsbCk7XHJcbiAgICAgICAgIHVwZGF0ZVNoaXBzVGFibGUoKTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvdGF0ZVNoaXAoZSkge1xyXG4gICBpZiAoZS5rZXkgPT09IFwicVwiIHx8IGUua2V5ID09PSBcIlFcIikge1xyXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICAgICBkaXJlY3Rpb24gPSBcInZlcnRpY2FsXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZW1vdmVTaGlwUHJldmlldygpO1xyXG4gICAgICBzaG93U2hpcFByZXZpZXcoY3VycmVudENlbGwpO1xyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVHYW1lKCkge1xyXG4gICBpZiAoR2FtZS5pbml0KCkpIHtcclxuICAgICAgcGxheWVyQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBzaG93UHJldmlld0hhbmRsZXIpO1xyXG4gICAgICBwbGF5ZXJCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgcmVtb3ZlU2hpcFByZXZpZXcpO1xyXG4gICAgICBwbGF5ZXJCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxhY2VOZXdTaGlwKTtcclxuICAgICAgcGxheWVyQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIHJlbW92ZVNoaXApO1xyXG4gICAgICBzdGFydEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgIGJ1dHRvbnNDb250YWluZXIucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgIGNwdUJvYXJkQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcblxyXG4gICAgICBjcHVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXR0YWNrQ3B1Qm9hcmQpO1xyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGF0dGFja0NwdUJvYXJkKGUpIHtcclxuICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgaWYgKFxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5maWxsZWQgPT09IFwiZmFsc2VcIiAmJlxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5yb3cgJiZcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQuY2VsbFxyXG4gICApIHtcclxuICAgICAgbGV0IHsgcm93LCBjZWxsIH0gPSB0YXJnZXQuZGF0YXNldDtcclxuICAgICAgbGV0IHR1cm5SZXN1bHQgPSBHYW1lLnRha2VUdXJuKCtyb3csICtjZWxsKTtcclxuXHJcbiAgICAgIHVwZGF0ZVBsYXllckJvYXJkKCk7XHJcbiAgICAgIHVwZGF0ZUNwdUJvYXJkKCk7XHJcblxyXG4gICAgICAvLyBkZWNsYXJlIGEgd2lubmVyIGFuZCBwcmludCBhIHJlc2V0IGJ1dHRvblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgIHR1cm5SZXN1bHQuc2VhcmNoICYmXHJcbiAgICAgICAgIHR1cm5SZXN1bHQuc2VhcmNoKC9QbGF5ZXJ8Q29tcHV0ZXIgd29uIHRoZSBtYXRjaC9naSkgPj0gMFxyXG4gICAgICApIHtcclxuICAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgIGxldCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG5cclxuICAgICAgICAgZGl2LmNsYXNzTmFtZSA9IFwicmVzZXQtY29udGFpbmVyXCI7XHJcbiAgICAgICAgIHAudGV4dENvbnRlbnQgPSB0dXJuUmVzdWx0O1xyXG4gICAgICAgICBidXR0b24uY2xhc3NOYW1lID0gXCJidXR0b25cIjtcclxuICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJSZXNldCBHYW1lXCI7XHJcbiAgICAgICAgIGRpdi5hcHBlbmQocCwgYnV0dG9uKTtcclxuICAgICAgICAgZG9jdW1lbnQuYm9keS5maXJzdEVsZW1lbnRDaGlsZC5hZnRlcihkaXYpO1xyXG5cclxuICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXNldEdhbWUpO1xyXG4gICAgICAgICBjcHVCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXR0YWNrQ3B1Qm9hcmQpO1xyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlQ3B1Qm9hcmQoKSB7XHJcbiAgIGxldCBib2FyZCA9IEdhbWUuZ2V0Q29tcHV0ZXJCb2FyZCgpO1xyXG5cclxuICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgYm9hcmQubGVuZ3RoOyByb3crKykge1xyXG4gICAgICBmb3IgKGxldCBjZWxsID0gMDsgY2VsbCA8IGJvYXJkW3Jvd10ubGVuZ3RoOyBjZWxsKyspIHtcclxuICAgICAgICAgaWYgKGJvYXJkW3Jvd11bY2VsbF0uc2VhcmNoKC9bWC9dLykgPj0gMCkge1xyXG4gICAgICAgICAgICBjcHVCb2FyZENlbGxzW3Jvd11bY2VsbF0udGV4dENvbnRlbnQgPSBib2FyZFtyb3ddW2NlbGxdO1xyXG4gICAgICAgICAgICBjcHVCb2FyZENlbGxzW3Jvd11bY2VsbF0uZGF0YXNldC5maWxsZWQgPSBcInRydWVcIjtcclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3B1Qm9hcmRDZWxsc1tyb3ddW2NlbGxdLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgY3B1Qm9hcmRDZWxsc1tyb3ddW2NlbGxdLmRhdGFzZXQuZmlsbGVkID0gXCJmYWxzZVwiO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZXNldEdhbWUoKSB7XHJcbiAgIEdhbWUucmVzZXQoKTtcclxuXHJcbiAgIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQubmV4dEVsZW1lbnRTaWJsaW5nLnJlbW92ZSgpO1xyXG4gICB1cGRhdGVDcHVCb2FyZCgpO1xyXG4gICBjcHVCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXR0YWNrQ3B1Qm9hcmQpO1xyXG4gICBwbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIHNob3dQcmV2aWV3SGFuZGxlcik7XHJcbiAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCByZW1vdmVTaGlwUHJldmlldyk7XHJcbiAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGFjZU5ld1NoaXApO1xyXG4gICBwbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgcmVtb3ZlU2hpcCk7XHJcbiAgIHVwZGF0ZVBsYXllckJvYXJkKCk7XHJcbiAgIGJ1dHRvbnNDb250YWluZXIucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICBbLi4uYnV0dG9uc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvblwiKV0uZm9yRWFjaChcclxuICAgICAgKGJ1dHRvbikgPT4gKGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlKVxyXG4gICApO1xyXG4gICBbLi4uc2hpcFRhYmxlQ291bnRlcnNdLmZvckVhY2goKGNvdW50ZXIpID0+IChjb3VudGVyLnRleHRDb250ZW50ID0gXCIwXCIpKTtcclxuICAgY3B1Qm9hcmRDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiXCI7XHJcbiAgIHN0YXJ0QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgc3RhcnRCdG4uc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbn1cclxuIiwiY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChsZW5ndGgsIGNvb3JkaW5hdGVzKSB7XHJcbiAgIGxldCBfY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcyB8fCBudWxsO1xyXG4gICBsZXQgX2xlbmd0aCA9IGxlbmd0aCB8fCAyO1xyXG4gICBsZXQgX2hpdHNDb3VudGVyID0gMDtcclxuXHJcbiAgIGNvbnN0IGdldENvb3JzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShfY29vcmRpbmF0ZXMpKTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGdldExlbmd0aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF9sZW5ndGg7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBnZXRIaXRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX2hpdHNDb3VudGVyO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBfaGl0c0NvdW50ZXIrKztcclxuICAgICAgcmV0dXJuIF9oaXRzQ291bnRlcjtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF9oaXRzQ291bnRlciA9PT0gbGVuZ3RoO1xyXG4gICB9O1xyXG5cclxuICAgcmV0dXJuIHtcclxuICAgICAgZ2V0Q29vcnMsXHJcbiAgICAgIGdldExlbmd0aCxcclxuICAgICAgZ2V0SGl0cyxcclxuICAgICAgaGl0LFxyXG4gICAgICBpc1N1bmssXHJcbiAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCxcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IDA7XFxuICBmb250LXNpemU6IDEwMCU7XFxuICBmb250OiBpbmhlcml0O1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSxcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gIHRleHQtc2hhZG93OiAwIDAgMTBweCAjMWNiNTE3O1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiAjMWNiNTE3O1xcbiAgbWFyZ2luOiAxNnB4O1xcbn1cXG5cXG5vbCwgdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuYmxvY2txdW90ZSwgcSB7XFxuICBxdW90ZXM6IG5vbmU7XFxufVxcblxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgY29udGVudDogbm9uZTtcXG59XFxuXFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG5wIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxufVxcblxcbi5pbnN0cnVjdGlvbnMge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgbWF4LXdpZHRoOiA1MDBweDtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgbWFyZ2luLXRvcDogM3JlbTtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgxIHtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuLmJvYXJkLWNvbnRhaW5lciBoMSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweCBhdXRvO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogM3B4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxuICBncmlkLWNvbHVtbjogMjtcXG4gIGdyaWQtcm93OiAxO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbCB7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIxXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjJcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiM1xcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg0KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI0XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDUpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjVcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNlxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg3KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI3XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDgpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjhcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiOVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxMCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMTBcXFwiO1xcbn1cXG5cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogM3B4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4O1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxuICBncmlkLWNvbHVtbjogMTtcXG4gIGdyaWQtcm93OiAyO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlcjogbm9uZTtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiYVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImJcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgzKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJjXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZFxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDUpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImVcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg2KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJmXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZ1xcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDgpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImhcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg5KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJpXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMTApOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImpcXFwiO1xcbn1cXG5cXG4uYm9hcmRfX2NlbGwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogIzFjYjUxNztcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmRfX2JvYXJkIHtcXG4gIGdyaWQtcm93OiAyO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogM3B4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxufVxcbi5ib2FyZF9fYm9hcmQgLmJvYXJkX19jZWxsOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcblxcbiNlcnJvci1tZXNzYWdlIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1heC13aWR0aDogNTAwcHg7XFxuICBncmlkLWNvbHVtbjogMS8tMTtcXG4gIG1hcmdpbi10b3A6IDFyZW07XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG4gIHBhZGRpbmc6IDAgMXJlbTtcXG59XFxuXFxuI2NwdS1ib2FyZC1jb250YWluZXIge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIG1hcmdpbi10b3A6IDJyZW07XFxufVxcblxcbi5wbGF5ZXItYnV0dG9ucyB1bCB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW46IDJyZW0gMDtcXG59XFxuLnBsYXllci1idXR0b25zIHVsIGxpIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcXG59XFxuXFxuLnNoaXBzLXRhYmxlIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxufVxcbi5zaGlwcy10YWJsZSB0ZCwgLnNoaXBzLXRhYmxlIHRoIHtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxufVxcblxcbiNzdGFydC1idXR0b24ge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4ucmVzZXQtY29udGFpbmVyIHtcXG4gIGZvbnQtc2l6ZTogMSwgNXJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbjogM3JlbSAwO1xcbn1cXG4ucmVzZXQtY29udGFpbmVyIHAge1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuLmJ1dHRvbiB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICMxY2I1MTc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiAjMWNiNTE3O1xcbiAgcGFkZGluZzogMC41cmVtIDAuOHJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLmJ1dHRvbi0taGlnaGxpZ2h0ZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLmJ1dHRvbjpkaXNhYmxlZCB7XFxuICBvcGFjaXR5OiAwLjQ7XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KSB7XFxuICAuZ3JpZCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIH1cXG5cXG4gIC5zaGlwcy10YWJsZSB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcblxcbiAgI2NwdS1ib2FyZC1jb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiAwO1xcbiAgfVxcblxcbiAgLnBsYXllci1idXR0b25zIHVsIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xcbiAgfVxcbiAgLnBsYXllci1idXR0b25zIHVsIGxpIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICB9XFxuICAucGxheWVyLWJ1dHRvbnMgLmJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3Njc3MvX3Jlc2V0LnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3N0eWxlcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fdmFyaWFibGVzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19pbnN0cnVjdGlvbnMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX2JvYXJkLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19idXR0b25zLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19tZWRpYS1xdWVyaWVzLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztDQUFBO0FBTUE7Ozs7Ozs7Ozs7Ozs7RUFhQyxTQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0VBQ0EsYUFB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SDtBSXBQRztFQUNHLHlCSFpFO0VHYUYsWUFBQTtBSnNQTjtBSXBQRztFQUNHLHlCSGhCRTtFR2lCRixZQUFBO0FKc1BOO0FJcFBHO0VBQ0csWUFBQTtBSnNQTjs7QUsxUUE7RUFDRztJQUNHLGFBQUE7SUFDQSw4QkFBQTtFTDZRSjs7RUszUUM7SUFDRyxXQUFBO0VMOFFKOztFSzVRQztJQUNHLGFBQUE7RUwrUUo7O0VLNVFJO0lBQ0csU0FBQTtJQUNBLG1CQUFBO0VMK1FQO0VLN1FJO0lBQ0csY0FBQTtFTCtRUDtFSzdRSTtJQUNHLGNBQUE7SUFDQSxXQUFBO0VMK1FQO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxyXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxyXFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXHJcXG4qL1xcclxcbkB1c2UgJy4vdmFyaWFibGVzJyBhcyAqO1xcclxcblxcclxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXHJcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxyXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcclxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXHJcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcclxcbmIsIHUsIGksIGNlbnRlcixcXHJcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcclxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcclxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcclxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXHJcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcclxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcclxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxyXFxuXFx0bWFyZ2luOiAwO1xcclxcblxcdHBhZGRpbmc6IDA7XFxyXFxuXFx0Ym9yZGVyOiAwO1xcclxcblxcdGZvbnQtc2l6ZTogMTAwJTtcXHJcXG5cXHRmb250OiBpbmhlcml0O1xcclxcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcclxcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcclxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxyXFxuXFx0ZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcbmJvZHkge1xcclxcblxcdGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxyXFxuICAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICRncmVlbjtcXHJcXG5cXHRsaW5lLWhlaWdodDogMTtcXHJcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXHJcXG4gICBjb2xvcjogJGdyZWVuO1xcclxcblxcdG1hcmdpbjogMTZweDtcXHJcXG59XFxyXFxub2wsIHVsIHtcXHJcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlLCBxIHtcXHJcXG5cXHRxdW90ZXM6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcclxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXHJcXG5cXHRjb250ZW50OiAnJztcXHJcXG5cXHRjb250ZW50OiBub25lO1xcclxcbn1cXHJcXG50YWJsZSB7XFxyXFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXHJcXG59XFxyXFxucCB7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDEuNTtcXHJcXG59XCIsXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggIzFjYjUxNztcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogIzFjYjUxNztcXG4gIG1hcmdpbjogMTZweDtcXG59XFxuXFxub2wsIHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbmJsb2NrcXVvdGUsIHEge1xcbiAgcXVvdGVzOiBub25lO1xcbn1cXG5cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGNvbnRlbnQ6IG5vbmU7XFxufVxcblxcbnRhYmxlIHtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDtcXG59XFxuXFxucCB7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbn1cXG5cXG4uaW5zdHJ1Y3Rpb25zIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIG1heC13aWR0aDogNTAwcHg7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIG1hcmdpbi10b3A6IDNyZW07XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG59XFxuLmluc3RydWN0aW9ucyBoMSB7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbi5ib2FyZC1jb250YWluZXIgaDEge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHggYXV0bztcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDNweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xcbiAgZ3JpZC1jb2x1bW46IDI7XFxuICBncmlkLXJvdzogMTtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGwge1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgyKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIyXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDMpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjNcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNFxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg1KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI1XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDYpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjZcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiN1xcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg4KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI4XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDkpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjlcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMTApOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjEwXFxcIjtcXG59XFxuXFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDNweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweDtcXG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xcbiAgZ3JpZC1jb2x1bW46IDE7XFxuICBncmlkLXJvdzogMjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbCB7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImFcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgyKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJiXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiY1xcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDQpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImRcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg1KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJlXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZlxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDcpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImdcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg4KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJoXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiaVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEwKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJqXFxcIjtcXG59XFxuXFxuLmJvYXJkX19jZWxsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6ICMxY2I1MTc7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkX19ib2FyZCB7XFxuICBncmlkLXJvdzogMjtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDNweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xcbn1cXG4uYm9hcmRfX2JvYXJkIC5ib2FyZF9fY2VsbDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWNiNTE3O1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4jZXJyb3ItbWVzc2FnZSB7XFxuICBmb250LXNpemU6IDFyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXgtd2lkdGg6IDUwMHB4O1xcbiAgZ3JpZC1jb2x1bW46IDEvLTE7XFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICBwYWRkaW5nOiAwIDFyZW07XFxufVxcblxcbiNjcHUtYm9hcmQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBtYXJnaW4tdG9wOiAycmVtO1xcbn1cXG5cXG4ucGxheWVyLWJ1dHRvbnMgdWwge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luOiAycmVtIDA7XFxufVxcbi5wbGF5ZXItYnV0dG9ucyB1bCBsaSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XFxufVxcblxcbi5zaGlwcy10YWJsZSB7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbn1cXG4uc2hpcHMtdGFibGUgdGQsIC5zaGlwcy10YWJsZSB0aCB7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbn1cXG5cXG4jc3RhcnQtYnV0dG9uIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuXFxuLnJlc2V0LWNvbnRhaW5lciB7XFxuICBmb250LXNpemU6IDEsIDVyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW46IDNyZW0gMDtcXG59XFxuLnJlc2V0LWNvbnRhaW5lciBwIHtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbi5idXR0b24ge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIHRleHQtc2hhZG93OiAwIDAgMTBweCAjMWNiNTE3O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogIzFjYjUxNztcXG4gIHBhZGRpbmc6IDAuNXJlbSAwLjhyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbi5idXR0b24tLWhpZ2hsaWdodGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbi5idXR0b246ZGlzYWJsZWQge1xcbiAgb3BhY2l0eTogMC40O1xcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCkge1xcbiAgLmdyaWQge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICB9XFxuXFxuICAuc2hpcHMtdGFibGUge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG5cXG4gICNjcHUtYm9hcmQtY29udGFpbmVyIHtcXG4gICAgbWFyZ2luLXRvcDogMDtcXG4gIH1cXG5cXG4gIC5wbGF5ZXItYnV0dG9ucyB1bCB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXG4gIH1cXG4gIC5wbGF5ZXItYnV0dG9ucyB1bCBsaSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgfVxcbiAgLnBsYXllci1idXR0b25zIC5idXR0b24ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICB9XFxufVwiLFwiJGdyZWVuOiAjMWNiNTE3O1wiLFwiQHVzZSAnLi92YXJpYWJsZXMnIGFzICo7XFxyXFxuXFxyXFxuLmluc3RydWN0aW9ucyB7XFxyXFxuICAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgIG1heC13aWR0aDogNTAwcHg7XFxyXFxuICAgcGFkZGluZzogMXJlbTtcXHJcXG4gICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XFxyXFxuICAgbWFyZ2luLXRvcDogM3JlbTtcXHJcXG4gICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxyXFxuICAgaDEge1xcclxcbiAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICAgfVxcclxcbn1cIixcIkB1c2UgJ3Nhc3M6bGlzdCc7XFxyXFxuQHVzZSAnLi92YXJpYWJsZXMnIGFzICo7XFxyXFxuXFxyXFxuJGNlbGxXaWR0aDogMzBweDtcXHJcXG5cXHJcXG4uYm9hcmQtY29udGFpbmVyIHtcXHJcXG4gICBoMSB7XFxyXFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxyXFxuICAgICAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXHJcXG4gICB9XFxyXFxufVxcclxcbi5ib2FyZCB7XFxyXFxuICAgZm9udC1zaXplOiAxOHB4O1xcclxcbiAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAkY2VsbFdpZHRoIGF1dG87XFxyXFxuICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIge1xcclxcbiAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgZ2FwOiAzcHg7XFxyXFxuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsICRjZWxsV2lkdGgpO1xcclxcbiAgIGdyaWQtYXV0by1yb3dzOiAkY2VsbFdpZHRoO1xcclxcbiAgIGdyaWQtY29sdW1uOiAyO1xcclxcbiAgIGdyaWQtcm93OiAxO1xcclxcbiAgIC5ib2FyZF9fY2VsbCB7XFxyXFxuICAgICAgYm9yZGVyOiBub25lO1xcclxcblxcclxcbiAgICAgIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggMTAge1xcclxcbiAgICAgICAgICY6bnRoLWNoaWxkKCN7JGl9KTo6YmVmb3JlIHtcXHJcXG4gICAgICAgICAgICBjb250ZW50OiAnI3skaX0nOyBcXHJcXG4gICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XFxyXFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIHtcXHJcXG4gICBkaXNwbGF5OiBncmlkO1xcclxcbiAgIGdhcDogM3B4O1xcclxcbiAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogJGNlbGxXaWR0aDtcXHJcXG4gICBncmlkLWF1dG8tcm93czogJGNlbGxXaWR0aDtcXHJcXG4gICBncmlkLWNvbHVtbjogMTtcXHJcXG4gICBncmlkLXJvdzogMjtcXHJcXG4gICAuYm9hcmRfX2NlbGwge1xcclxcbiAgICAgIGJvcmRlcjogbm9uZTtcXHJcXG5cXHJcXG4gICAgICAkbGV0dGVyczogJ2EnLCdiJywnYycsJ2QnLCdlJywnZicsJ2cnLCdoJywnaScsJ2onO1xcclxcblxcclxcbiAgICAgIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggMTAge1xcclxcbiAgICAgICAgICY6bnRoLWNoaWxkKCN7JGl9KTo6YmVmb3JlIHtcXHJcXG4gICAgICAgICAgICBjb250ZW50OiAnI3tsaXN0Lm50aCgkbGV0dGVycywgJGkpfSc7IFxcclxcbiAgICAgICAgIH1cXHJcXG4gICAgICB9XFxyXFxuICAgfVxcclxcbn1cXHJcXG4uYm9hcmRfX2NlbGwge1xcclxcbiAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcclxcbiAgIGNvbG9yOiAkZ3JlZW47XFxyXFxuICAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xcclxcbiAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuLmJvYXJkX19ib2FyZCB7XFxyXFxuICAgZ3JpZC1yb3c6IDI7XFxyXFxuICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICBnYXA6IDNweDtcXHJcXG4gICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgJGNlbGxXaWR0aCk7XFxyXFxuICAgZ3JpZC1hdXRvLXJvd3M6ICRjZWxsV2lkdGg7XFxyXFxuICAgLmJvYXJkX19jZWxsIHtcXHJcXG4gICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JlZW47XFxyXFxuICAgICAgICAgY29sb3I6IGJsYWNrO1xcclxcbiAgICAgIH1cXHJcXG4gICB9XFxyXFxufVxcclxcbiNlcnJvci1tZXNzYWdlIHtcXHJcXG4gICBmb250LXNpemU6IDFyZW07XFxyXFxuICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgIG1heC13aWR0aDogNTAwcHg7XFxyXFxuICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXHJcXG4gICBtYXJnaW4tdG9wOiAxcmVtO1xcclxcbiAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG4gICBwYWRkaW5nOiAwIDFyZW07XFxyXFxufVxcclxcbiNjcHUtYm9hcmQtY29udGFpbmVyIHtcXHJcXG4gICBkaXNwbGF5OiBub25lO1xcclxcbiAgIG1hcmdpbi10b3A6IDJyZW07XFxyXFxufVxcclxcbi5wbGF5ZXItYnV0dG9ucyB7XFxyXFxuICAgdWwge1xcclxcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgICBtYXJnaW46IDJyZW0gMDtcXHJcXG4gICB9XFxyXFxuICAgdWwgbGkge1xcclxcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgICBtYXJnaW4tYm90dG9tOiAuNXJlbTtcXHJcXG4gICB9XFxyXFxufVxcclxcbi5zaGlwcy10YWJsZSB7XFxyXFxuICAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgIGJvcmRlcjogMXB4IHNvbGlkICRncmVlbjtcXHJcXG4gICBtYXJnaW4tYm90dG9tOiAycmVtO1xcclxcbiAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG5cXHJcXG4gICB0ZCwgdGgge1xcclxcbiAgICAgIHBhZGRpbmc6IC41cmVtO1xcclxcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICRncmVlbjtcXHJcXG4gICB9XFxyXFxufVxcclxcbiNzdGFydC1idXR0b24ge1xcclxcbiAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXHJcXG59XFxyXFxuLnJlc2V0LWNvbnRhaW5lciB7XFxyXFxuICAgZm9udC1zaXplOiAxLDVyZW07XFxyXFxuICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgIG1hcmdpbjogM3JlbSAwO1xcclxcbiAgIHAge1xcclxcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICAgfVxcclxcbn1cIixcIkB1c2UgJy4vdmFyaWFibGVzJyBhcyAqO1xcclxcblxcclxcbi5idXR0b24ge1xcclxcbiAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxyXFxuICAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgIHRleHQtc2hhZG93OiAwIDAgMTBweCAkZ3JlZW47XFxyXFxuICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxyXFxuICAgY29sb3I6ICRncmVlbjtcXHJcXG4gICBwYWRkaW5nOiAuNXJlbSAuOHJlbTtcXHJcXG4gICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XFxyXFxuICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRncmVlbjtcXHJcXG4gICAgICBjb2xvcjogYmxhY2s7XFxyXFxuICAgfVxcclxcbiAgICYtLWhpZ2hsaWdodGVkIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JlZW47XFxyXFxuICAgICAgY29sb3I6IGJsYWNrO1xcclxcbiAgIH1cXHJcXG4gICAmOmRpc2FibGVkIHtcXHJcXG4gICAgICBvcGFjaXR5OiAuNDtcXHJcXG4gICB9XFxyXFxufVwiLFwiQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpIHtcXHJcXG4gICAuZ3JpZCB7XFxyXFxuICAgICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxyXFxuICAgfVxcclxcbiAgIC5zaGlwcy10YWJsZSB7XFxyXFxuICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgfVxcclxcbiAgICNjcHUtYm9hcmQtY29udGFpbmVyIHtcXHJcXG4gICAgICBtYXJnaW4tdG9wOiAwO1xcclxcbiAgIH1cXHJcXG4gICAucGxheWVyLWJ1dHRvbnMge1xcclxcbiAgICAgIHVsIHtcXHJcXG4gICAgICAgICBtYXJnaW46IDA7XFxyXFxuICAgICAgICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgdWwgbGkge1xcclxcbiAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICAgIH1cXHJcXG4gICAgICAuYnV0dG9uIHtcXHJcXG4gICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICB9XFxyXFxuICAgfVxcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJHYW1lIiwiX3dpbm5lck1lc3NhZ2UiLCJfY2FuR2FtZVN0YXJ0IiwiX2NvbXB1dGVyQm9hcmQiLCJfY3B1UHJldmlvdXNBdHRhY2siLCJfY3B1TmV4dEF0dGFjayIsInBsYXllckJvYXJkIiwiZ2V0Q29tcHV0ZXJCb2FyZCIsImdldEJvYXJkIiwiaW5pdCIsInBsYWNlRW5lbXlBcm15IiwidHlwZSIsInJvdyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNvbHVtbiIsImxlbmd0aCIsImRpcmVjdGlvbiIsInBsYWNlU2hpcCIsImUiLCJtZXNzYWdlIiwiaW5jbHVkZXMiLCJpc0FybXlDb21wbGV0ZSIsImNvbXB1dGVyU2hpcHNJbmZvIiwiZ2V0U2hpcHMiLCJyZW1vdmVTaGlwIiwidGFrZVR1cm4iLCJjZWxsIiwiYXR0YWNrUmFuZG9tQ2VsbCIsImF0dGFja1Jlc3VsdCIsInJlY2VpdmVBdHRhY2siLCJzeW1ib2wiLCJhdHRhY2tQbGF5ZXIiLCJ1cGRhdGVOZXh0QXR0YWNrQ29vcmRpbmF0ZXMiLCJwYiIsImNvbnNvbGUiLCJsb2ciLCJuZWFyQ2VsbHMiLCJjZWxsc0NvdW50ZXIiLCJwdXNoIiwiaSIsImFsbFNoaXBzU3VuayIsImdldFdpbm5lciIsInJlc2V0IiwidW5kZWZpbmVkIiwiU2hpcCIsIl9ib2FyZCIsIl9zaGlwcyIsInR5cGUxIiwic2hpcHMiLCJtYXgiLCJ0eXBlMiIsInR5cGUzIiwidHlwZTQiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJzaGlwc0Nsb25lIiwia2V5IiwiZm9yRWFjaCIsInNoaXAiLCJjbG9uZSIsImdldExlbmd0aCIsImdldENvb3JzIiwiZ2V0SGl0cyIsImhpdCIsImdldEJvYXJkQW5kU2hpcHMiLCJib2FyZENvcHkiLCJjdXJyZW50U2hpcCIsInNoaXBDb29ycyIsImNvb3JzIiwiY29vcmRpbmF0ZXMiLCJpc05hTiIsIk51bWJlciIsIkVycm9yIiwic2hpcENvb3JkaW5hdGVzIiwiY29vcnNDb3B5IiwiY3VycmVudENvb3IiLCJuZXdTaGlwIiwibmV3U2hpcENvb3JzIiwiZXJyb3JNc2ciLCJmaWx0ZXJlZFNoaXBzIiwiaiIsImZpbHRlciIsInNoaXBzTG9vcCIsInJlc3VsdE1zZyIsInJlZHVjZSIsImFjYyIsImN1cnJlbnQiLCJzbGljZSIsInR5cGVMb29wIiwiaXNTdW5rIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNwdUJvYXJkQ29udGFpbmVyIiwiY3B1Qm9hcmQiLCJidXR0b25zQ29udGFpbmVyIiwic2hpcFRhYmxlQ291bnRlcnMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiZXJyb3JNZXNzYWdlIiwic3RhcnRCdG4iLCJwbGF5ZXJCb2FyZENlbGxzIiwiY3B1Qm9hcmRDZWxscyIsInNoaXBzSW5mbyIsInByZXZpb3VzQ2xpY2tlZEJ0biIsImN1cnJlbnRDZWxsIiwiY2VsbHNUb0hpZ2hsaWdodCIsImNlbGxCdG4iLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiZGF0YXNldCIsImZpbGxlZCIsImFwcGVuZCIsImNsb25lTm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbGlja2VkQnV0dG9ucyIsInNob3dQcmV2aWV3SGFuZGxlciIsInJlbW92ZVNoaXBQcmV2aWV3IiwicGxhY2VOZXdTaGlwIiwid2luZG93Iiwicm90YXRlU2hpcCIsImluaXRpYWxpemVHYW1lIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiaWQiLCJzaG93U2hpcFByZXZpZXciLCJub2RlIiwibGVuZ3RoTG9vcCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJib3JkZXJDb2xvciIsInRleHRDb250ZW50IiwiZGlzYWJsZWQiLCJ1cGRhdGVQbGF5ZXJCb2FyZCIsInVwZGF0ZVNoaXBzVGFibGUiLCJ2aXNpYmlsaXR5IiwiYm9hcmQiLCJzZWFyY2giLCJpbmRleCIsIm1zZyIsInNoaXBCdXR0b25zIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZlbnREZWZhdWx0IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInBhcmVudEVsZW1lbnQiLCJkaXNwbGF5IiwiYXR0YWNrQ3B1Qm9hcmQiLCJ0dXJuUmVzdWx0IiwidXBkYXRlQ3B1Qm9hcmQiLCJkaXYiLCJwIiwiYnV0dG9uIiwiYm9keSIsImZpcnN0RWxlbWVudENoaWxkIiwiYWZ0ZXIiLCJyZXNldEdhbWUiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJjb3VudGVyIiwiX2Nvb3JkaW5hdGVzIiwiX2xlbmd0aCIsIl9oaXRzQ291bnRlciJdLCJzb3VyY2VSb290IjoiIn0=