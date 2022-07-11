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

  var takeTurn = function takeTurn(row, column) {
    var _this = this;

    if (!_canGameStart) return this;

    if (!_winnerMessage) {
      var attackRandomCell = function attackRandomCell() {
        try {
          var _row = Math.floor(Math.random() * 10);

          var _column = Math.floor(Math.random() * 10);

          var attackResult = _this.playerBoard.receiveAttack(_row, _column);

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
                return;
              }

              _cpuNextAttack = null;
              break;

            case "next":
              if (pb[_cpuNextAttack.row][_cpuNextAttack.column + 1]) {
                _cpuNextAttack.column = _cpuNextAttack.column + 1;
                return;
              }

              _cpuNextAttack = null;
              break;

            case "below":
              if (pb[_cpuNextAttack.row + 1]) {
                _cpuNextAttack.row = _cpuNextAttack.row + 1;
                return;
              }

              _cpuNextAttack = null;
              break;

            case "before":
              if (pb[_cpuNextAttack.row][_cpuNextAttack.column - 1]) {
                _cpuNextAttack.column = _cpuNextAttack.column - 1;
                return;
              }

              _cpuNextAttack = null;
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
              _column2 = _cpuPreviousAttack2.column;
          var nearCells = [];
          var cellsCounter = 0; // populate nearCells

          pb[_row2 - 1] && pb[_row2 - 1][_column2] ? nearCells.push({
            cell: pb[_row2 - 1][_column2],
            direction: "above",
            row: _row2 - 1,
            column: _column2
          }) : null;
          pb[_row2] && pb[_row2][_column2 + 1] ? nearCells.push({
            cell: pb[_row2][_column2 + 1],
            direction: "next",
            row: _row2,
            column: _column2 + 1
          }) : null;
          pb[_row2 + 1] && pb[_row2 + 1][_column2] ? nearCells.push({
            cell: pb[_row2 + 1][_column2],
            direction: "below",
            row: _row2 + 1,
            column: _column2
          }) : null;
          pb[_row2] && pb[_row2][_column2 - 1] ? nearCells.push({
            cell: pb[_row2][_column2 - 1],
            direction: "before",
            row: _row2,
            column: _column2 - 1
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


      _computerBoard.receiveAttack(row, column);

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

    for (var column = 0; column < 10; column++) {
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

    var shipCoordinates = [_toConsumableArray(coordinates)]; // generate coordinates that extend based on length and direction

    for (var i = 0; i < length - 1; i++) {
      // extend coordinates vertically
      if (direction === "ver") {
        var coorsCopy = _toConsumableArray(shipCoordinates[i]);

        coorsCopy[0]++;
        shipCoordinates.push(coorsCopy); // extend coordinates horizontally
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
    var column = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var filteredShips;
    var coors;

    for (var type in _ships) {
      var _loop3 = function _loop3(i) {
        var currentShip = _ships[type].ships[i];
        var shipCoors = currentShip.getCoors();

        for (var j = 0; j < shipCoors.length; j++) {
          if (shipCoors[j][0] === row && shipCoors[j][1] === column) {
            filteredShips = _ships[type].ships.filter(function (ship) {
              return ship !== currentShip;
            });
            coors = shipCoors;
            return "break|shipsLoop";
          }
        }
      };

      // search and filter out ship that has "row" and "column" as coordinates
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

    return "There is no ship in [".concat(row, ",").concat(column, "] coordinates");
  };

  var isArmyComplete = function isArmyComplete() {
    for (var type in _ships) {
      if (_ships[type].ships.length < _ships[type].max) return false;
    }

    return true;
  };

  var receiveAttack = function receiveAttack() {
    var row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var column = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var symbol = "/";

    if (row > 9 || row < 0 || column > 9 || column < 0) {
      throw new Error("Provided coordinates are not valid: [".concat(row, ",").concat(column, "]"));
    }

    if (_board[row][column] !== "~") {
      throw new Error("You already attacked the following coordinates: [".concat(row, ",").concat(column, "]"));
    } // check if any ship has "row" and "column" as coordinates and hit it


    typeLoop: for (var type in _ships) {
      for (var i = 0; i < _ships[type].ships.length; i++) {
        var currentShip = _ships[type].ships[i];
        var shipCoors = currentShip.getCoors();

        for (var j = 0; j < shipCoors.length; j++) {
          if (shipCoors[j][0] === row && shipCoors[j][1] === column) {
            currentShip.hit();
            symbol = "X";
            break typeLoop;
          }
        }
      }
    }

    _board[row][column] = symbol;
    return {
      row: row,
      column: column,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLFdBQVcsWUFBWSxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsT0FBTyxNQUFNLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE9BQU8sTUFBTSxXQUFXLFdBQVcsWUFBWSxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLFVBQVUsV0FBVyxZQUFZLE1BQU0sTUFBTSxZQUFZLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxPQUFPLE1BQU0sVUFBVSxXQUFXLE9BQU8sTUFBTSxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsT0FBTyxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxVQUFVLE1BQU0sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxNQUFNLE1BQU0sWUFBWSxXQUFXLE1BQU0sTUFBTSxVQUFVLE9BQU8sTUFBTSxLQUFLLFVBQVUsV0FBVyxP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Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3Njc3Mvc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2Nzcy9zdHlsZXMuc2Nzcz8zMjFmIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIjtcclxuXHJcbmNvbnN0IEdhbWUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICBsZXQgX3dpbm5lck1lc3NhZ2U7XHJcbiAgIGxldCBfY2FuR2FtZVN0YXJ0ID0gZmFsc2U7XHJcbiAgIGxldCBfY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xyXG4gICBsZXQgX2NwdVByZXZpb3VzQXR0YWNrID0gbnVsbDtcclxuICAgbGV0IF9jcHVOZXh0QXR0YWNrID0gbnVsbDtcclxuICAgbGV0IHBsYXllckJvYXJkID0gR2FtZWJvYXJkKCk7XHJcblxyXG4gICBjb25zdCBnZXRDb21wdXRlckJvYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX2NvbXB1dGVyQm9hcmQuZ2V0Qm9hcmQoKTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBwbGFjZUVuZW15QXJteSA9IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIHBsYWNlIHNoaXBzXHJcbiAgICAgICAgICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSB0eXBlLmxlbmd0aDtcclxuICAgICAgICAgICAgbGV0IGRpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpID09PSAwID8gXCJ2ZXJcIiA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICBfY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoW3JvdywgY29sdW1uXSwgbGVuZ3RoLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICBwbGFjZUVuZW15QXJteSh0eXBlKTtcclxuICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBpZiAoIWUubWVzc2FnZS5pbmNsdWRlcyhcIkV4Y2VlZGVkIG51bWJlciBvZiBzaGlwc1wiKSkge1xyXG4gICAgICAgICAgICAgICBwbGFjZUVuZW15QXJteSh0eXBlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgcmV0dXJuIFwiZmluaXNoZWRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBmaWxsIGNvbXB1dGVyQm9hcmQgd2l0aCBzaGlwc1xyXG4gICAgICBpZiAoIV9jb21wdXRlckJvYXJkLmlzQXJteUNvbXBsZXRlKCkpIHtcclxuICAgICAgICAgbGV0IGNvbXB1dGVyU2hpcHNJbmZvID0gX2NvbXB1dGVyQm9hcmQuZ2V0U2hpcHMoKTtcclxuXHJcbiAgICAgICAgIGZvciAobGV0IHR5cGUgaW4gY29tcHV0ZXJTaGlwc0luZm8pIHtcclxuICAgICAgICAgICAgcGxhY2VFbmVteUFybXkoY29tcHV0ZXJTaGlwc0luZm9bdHlwZV0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwbGF5ZXJCb2FyZC5pc0FybXlDb21wbGV0ZSgpKSB7XHJcbiAgICAgICAgIF9jYW5HYW1lU3RhcnQgPSB0cnVlO1xyXG4gICAgICAgICB0aGlzLnBsYXllckJvYXJkLnBsYWNlU2hpcCA9IG51bGw7XHJcbiAgICAgICAgIHRoaXMucGxheWVyQm9hcmQucmVtb3ZlU2hpcCA9IG51bGw7XHJcbiAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHRha2VUdXJuID0gZnVuY3Rpb24gKHJvdywgY29sdW1uKSB7XHJcbiAgICAgIGlmICghX2NhbkdhbWVTdGFydCkgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICBpZiAoIV93aW5uZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgIGxldCBhdHRhY2tSYW5kb21DZWxsID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgICAgICAgICBsZXQgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgICAgICAgICBsZXQgYXR0YWNrUmVzdWx0ID0gdGhpcy5wbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcclxuXHJcbiAgICAgICAgICAgICAgIF9jcHVQcmV2aW91c0F0dGFjayA9XHJcbiAgICAgICAgICAgICAgICAgIGF0dGFja1Jlc3VsdCAmJiBhdHRhY2tSZXN1bHQuc3ltYm9sID09PSBcIlhcIlxyXG4gICAgICAgICAgICAgICAgICAgICA/IGF0dGFja1Jlc3VsdFxyXG4gICAgICAgICAgICAgICAgICAgICA6IG51bGw7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICBlLm1lc3NhZ2UuaW5jbHVkZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgIFwiWW91IGFscmVhZHkgYXR0YWNrZWQgdGhlIGZvbGxvd2luZyBjb29yZGluYXRlc1wiXHJcbiAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgIGF0dGFja1BsYXllcigpO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgIGxldCBhdHRhY2tQbGF5ZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB1cGRhdGVOZXh0QXR0YWNrQ29vcmRpbmF0ZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgIGxldCBwYiA9IHRoaXMucGxheWVyQm9hcmQuZ2V0Qm9hcmQoKTtcclxuXHJcbiAgICAgICAgICAgICAgIHN3aXRjaCAoX2NwdU5leHRBdHRhY2suZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJhYm92ZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICBpZiAocGJbX2NwdU5leHRBdHRhY2sucm93IC0gMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NwdU5leHRBdHRhY2sucm93ID0gX2NwdU5leHRBdHRhY2sucm93IC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgIF9jcHVOZXh0QXR0YWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICBjYXNlIFwibmV4dFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICBpZiAocGJbX2NwdU5leHRBdHRhY2sucm93XVtfY3B1TmV4dEF0dGFjay5jb2x1bW4gKyAxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY3B1TmV4dEF0dGFjay5jb2x1bW4gPSBfY3B1TmV4dEF0dGFjay5jb2x1bW4gKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgX2NwdU5leHRBdHRhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJiZWxvd1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICBpZiAocGJbX2NwdU5leHRBdHRhY2sucm93ICsgMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NwdU5leHRBdHRhY2sucm93ID0gX2NwdU5leHRBdHRhY2sucm93ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgIF9jcHVOZXh0QXR0YWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICBjYXNlIFwiYmVmb3JlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgIGlmIChwYltfY3B1TmV4dEF0dGFjay5yb3ddW19jcHVOZXh0QXR0YWNrLmNvbHVtbiAtIDFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jcHVOZXh0QXR0YWNrLmNvbHVtbiA9IF9jcHVOZXh0QXR0YWNrLmNvbHVtbiAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICBfY3B1TmV4dEF0dGFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoX2NwdVByZXZpb3VzQXR0YWNrICYmIF9jcHVOZXh0QXR0YWNrKSB7XHJcbiAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgIGxldCBhdHRhY2tSZXN1bHQgPSB0aGlzLnBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2soXHJcbiAgICAgICAgICAgICAgICAgICAgIF9jcHVOZXh0QXR0YWNrLnJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgX2NwdU5leHRBdHRhY2suY29sdW1uXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgX2NwdU5leHRBdHRhY2tcclxuICAgICAgICAgICAgICAgICAgaWYgKGF0dGFja1Jlc3VsdCAmJiBhdHRhY2tSZXN1bHQuc3ltYm9sID09PSBcIlhcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICBfY3B1TmV4dEF0dGFjayA9IHsgLi4uX2NwdU5leHRBdHRhY2sgfTtcclxuICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTmV4dEF0dGFja0Nvb3JkaW5hdGVzKCk7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIF9jcHVOZXh0QXR0YWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgZS5tZXNzYWdlLmluY2x1ZGVzKFwiUHJvdmlkZWQgY29vcmRpbmF0ZXMgYXJlIG5vdCB2YWxpZFwiKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICBlLm1lc3NhZ2UuaW5jbHVkZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiWW91IGFscmVhZHkgYXR0YWNrZWQgdGhlIGZvbGxvd2luZyBjb29yZGluYXRlc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIF9jcHVOZXh0QXR0YWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgYXR0YWNrUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAvLyBjaGVjayBhbmQgYXR0YWNrIGEgY2VsbCB0aGF0IGlzIGFyb3VuZCBhbiBYXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoX2NwdVByZXZpb3VzQXR0YWNrKSB7XHJcbiAgICAgICAgICAgICAgIGxldCBwYiA9IHBsYXllckJvYXJkLmdldEJvYXJkKCk7XHJcbiAgICAgICAgICAgICAgIGxldCB7IHJvdywgY29sdW1uIH0gPSBfY3B1UHJldmlvdXNBdHRhY2s7XHJcbiAgICAgICAgICAgICAgIGxldCBuZWFyQ2VsbHMgPSBbXTtcclxuICAgICAgICAgICAgICAgbGV0IGNlbGxzQ291bnRlciA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAvLyBwb3B1bGF0ZSBuZWFyQ2VsbHNcclxuICAgICAgICAgICAgICAgcGJbcm93IC0gMV0gJiYgcGJbcm93IC0gMV1bY29sdW1uXVxyXG4gICAgICAgICAgICAgICAgICA/IG5lYXJDZWxscy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICBjZWxsOiBwYltyb3cgLSAxXVtjb2x1bW5dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogXCJhYm92ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHJvdzogcm93IC0gMSxcclxuICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IGNvbHVtbixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICA6IG51bGw7XHJcbiAgICAgICAgICAgICAgIHBiW3Jvd10gJiYgcGJbcm93XVtjb2x1bW4gKyAxXVxyXG4gICAgICAgICAgICAgICAgICA/IG5lYXJDZWxscy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICBjZWxsOiBwYltyb3ddW2NvbHVtbiArIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogXCJuZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgcm93OiByb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBjb2x1bW4gKyAxLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIDogbnVsbDtcclxuICAgICAgICAgICAgICAgcGJbcm93ICsgMV0gJiYgcGJbcm93ICsgMV1bY29sdW1uXVxyXG4gICAgICAgICAgICAgICAgICA/IG5lYXJDZWxscy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICBjZWxsOiBwYltyb3cgKyAxXVtjb2x1bW5dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogXCJiZWxvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHJvdzogcm93ICsgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IGNvbHVtbixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICA6IG51bGw7XHJcbiAgICAgICAgICAgICAgIHBiW3Jvd10gJiYgcGJbcm93XVtjb2x1bW4gLSAxXVxyXG4gICAgICAgICAgICAgICAgICA/IG5lYXJDZWxscy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICBjZWxsOiBwYltyb3ddW2NvbHVtbiAtIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogXCJiZWZvcmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IGNvbHVtbiAtIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWFyQ2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKG5lYXJDZWxsc1tpXS5jZWxsID09PSBcIn5cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICBsZXQgYXR0YWNrUmVzdWx0ID0gdGhpcy5wbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWFyQ2VsbHNbaV0ucm93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWFyQ2VsbHNbaV0uY29sdW1uXHJcbiAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgX2NwdU5leHRBdHRhY2tcclxuICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dGFja1Jlc3VsdCAmJiBhdHRhY2tSZXN1bHQuc3ltYm9sID09PSBcIlhcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY3B1TmV4dEF0dGFjayA9IHsgLi4ubmVhckNlbGxzW2ldIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZU5leHRBdHRhY2tDb29yZGluYXRlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY3B1TmV4dEF0dGFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICBjZWxsc0NvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICBpZiAoY2VsbHNDb3VudGVyID09PSBuZWFyQ2VsbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgIF9jcHVQcmV2aW91c0F0dGFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgIGF0dGFja1JhbmRvbUNlbGwoKTtcclxuICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgLy8gYXR0YWNrIGEgcmFuZG9tIGNlbGxcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChfY3B1UHJldmlvdXNBdHRhY2sgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgYXR0YWNrUmFuZG9tQ2VsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAvLyBhdHRhY2sgY29tcHV0ZXJcclxuICAgICAgICAgX2NvbXB1dGVyQm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XHJcblxyXG4gICAgICAgICBpZiAoX2NvbXB1dGVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcclxuICAgICAgICAgICAgX3dpbm5lck1lc3NhZ2UgPSBcIlBsYXllciB3b24gdGhlIG1hdGNoXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBfd2lubmVyTWVzc2FnZTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLy8gYXR0YWNrIHBsYXllclxyXG4gICAgICAgICBhdHRhY2tQbGF5ZXIoKTtcclxuXHJcbiAgICAgICAgIGlmICh0aGlzLnBsYXllckJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIF93aW5uZXJNZXNzYWdlID0gXCJDb21wdXRlciB3b24gdGhlIG1hdGNoXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBfd2lubmVyTWVzc2FnZTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBfd2lubmVyTWVzc2FnZTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGdldFdpbm5lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF93aW5uZXJNZXNzYWdlO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgcmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIF93aW5uZXJNZXNzYWdlID0gdW5kZWZpbmVkO1xyXG4gICAgICBfY2FuR2FtZVN0YXJ0ID0gZmFsc2U7XHJcbiAgICAgIF9jb21wdXRlckJvYXJkID0gR2FtZWJvYXJkKCk7XHJcbiAgICAgIHRoaXMucGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcclxuICAgfTtcclxuXHJcbiAgIHJldHVybiB7XHJcbiAgICAgIHBsYXllckJvYXJkLFxyXG4gICAgICBnZXRDb21wdXRlckJvYXJkLFxyXG4gICAgICBpbml0LFxyXG4gICAgICB0YWtlVHVybixcclxuICAgICAgZ2V0V2lubmVyLFxyXG4gICAgICByZXNldCxcclxuICAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWU7XHJcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcclxuXHJcbmNvbnN0IEdhbWVib2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgbGV0IF9ib2FyZCA9IFtdO1xyXG4gICBsZXQgX3NoaXBzID0ge1xyXG4gICAgICB0eXBlMTogeyBzaGlwczogW10sIGxlbmd0aDogNSwgbWF4OiAxLCBzeW1ib2w6IFwiQVwiIH0sXHJcbiAgICAgIHR5cGUyOiB7IHNoaXBzOiBbXSwgbGVuZ3RoOiA0LCBtYXg6IDIsIHN5bWJvbDogXCJCXCIgfSxcclxuICAgICAgdHlwZTM6IHsgc2hpcHM6IFtdLCBsZW5ndGg6IDMsIG1heDogMywgc3ltYm9sOiBcIkNcIiB9LFxyXG4gICAgICB0eXBlNDogeyBzaGlwczogW10sIGxlbmd0aDogMiwgbWF4OiA0LCBzeW1ib2w6IFwiRFwiIH0sXHJcbiAgIH07XHJcblxyXG4gICAvLyBjcmVhdGUgMTAgcm93cyBhbmQgMTAgY2VsbHMgZm9yIF9ib2FyZFxyXG4gICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93KyspIHtcclxuICAgICAgX2JvYXJkLnB1c2goW10pO1xyXG5cclxuICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XHJcbiAgICAgICAgIF9ib2FyZFtyb3ddLnB1c2goXCJ+XCIpO1xyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIGNvbnN0IGdldEJvYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShfYm9hcmQpKTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGdldFNoaXBzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgc2hpcHNDbG9uZSA9IHt9O1xyXG5cclxuICAgICAgZm9yIChsZXQga2V5IGluIF9zaGlwcykge1xyXG4gICAgICAgICBzaGlwc0Nsb25lW2tleV0gPSB7fTtcclxuICAgICAgICAgc2hpcHNDbG9uZVtrZXldLnNoaXBzID0gW107XHJcbiAgICAgICAgIHNoaXBzQ2xvbmVba2V5XS5sZW5ndGggPSBfc2hpcHNba2V5XS5sZW5ndGg7XHJcbiAgICAgICAgIHNoaXBzQ2xvbmVba2V5XS5tYXggPSBfc2hpcHNba2V5XS5tYXg7XHJcblxyXG4gICAgICAgICBfc2hpcHNba2V5XS5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjbG9uZSA9IFNoaXAoc2hpcC5nZXRMZW5ndGgoKSwgc2hpcC5nZXRDb29ycygpKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5nZXRIaXRzKCk7IGkrKykge1xyXG4gICAgICAgICAgICAgICBjbG9uZS5oaXQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2hpcHNDbG9uZVtrZXldLnNoaXBzLnB1c2goY2xvbmUpO1xyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHNoaXBzQ2xvbmU7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBnZXRCb2FyZEFuZFNoaXBzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgYm9hcmRDb3B5ID0gdGhpcy5nZXRCb2FyZCgpO1xyXG5cclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfc2hpcHNbdHlwZV0uc2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTaGlwID0gX3NoaXBzW3R5cGVdLnNoaXBzW2ldO1xyXG4gICAgICAgICAgICBsZXQgc2hpcENvb3JzID0gY3VycmVudFNoaXAuZ2V0Q29vcnMoKTtcclxuXHJcbiAgICAgICAgICAgIHNoaXBDb29ycy5mb3JFYWNoKChjb29ycykgPT4ge1xyXG4gICAgICAgICAgICAgICBsZXQgW3JvdywgY29sdW1uXSA9IGNvb3JzO1xyXG5cclxuICAgICAgICAgICAgICAgaWYgKGJvYXJkQ29weVtyb3ddW2NvbHVtbl0gPT09IFwiflwiKSB7XHJcbiAgICAgICAgICAgICAgICAgIGJvYXJkQ29weVtyb3ddW2NvbHVtbl0gPSBfc2hpcHNbdHlwZV0uc3ltYm9sO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBib2FyZENvcHk7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZXMgPSBbMCwgMF0sIGxlbmd0aCA9IDIsIGRpcmVjdGlvbikge1xyXG4gICAgICBpZiAoaXNOYU4oTnVtYmVyKGNvb3JkaW5hdGVzWzBdKSkgfHwgaXNOYU4oTnVtYmVyKGNvb3JkaW5hdGVzWzFdKSkpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29vcmRpbmF0ZXMgc2hvdWxkIGJlIG51bWJlcnNcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc05hTihOdW1iZXIobGVuZ3RoKSkgfHwgbGVuZ3RoID4gNSB8fCBsZW5ndGggPCAyKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxlbmd0aCBzaG91bGQgYmUgYSBudW1iZXIgYmV0d2VlbiAyIGFuZCA1XCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgc2hpcENvb3JkaW5hdGVzID0gW1suLi5jb29yZGluYXRlc11dO1xyXG5cclxuICAgICAgLy8gZ2VuZXJhdGUgY29vcmRpbmF0ZXMgdGhhdCBleHRlbmQgYmFzZWQgb24gbGVuZ3RoIGFuZCBkaXJlY3Rpb25cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgLy8gZXh0ZW5kIGNvb3JkaW5hdGVzIHZlcnRpY2FsbHlcclxuICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ2ZXJcIikge1xyXG4gICAgICAgICAgICBsZXQgY29vcnNDb3B5ID0gWy4uLnNoaXBDb29yZGluYXRlc1tpXV07XHJcbiAgICAgICAgICAgIGNvb3JzQ29weVswXSsrO1xyXG4gICAgICAgICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChjb29yc0NvcHkpO1xyXG5cclxuICAgICAgICAgICAgLy8gZXh0ZW5kIGNvb3JkaW5hdGVzIGhvcml6b250YWxseVxyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgY29vcnNDb3B5ID0gWy4uLnNoaXBDb29yZGluYXRlc1tpXV07XHJcbiAgICAgICAgICAgIGNvb3JzQ29weVsxXSsrO1xyXG4gICAgICAgICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChjb29yc0NvcHkpO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoZWNrIGlmIHNoaXBDb29yZGluYXRlcyBhcmUgdmFsaWRcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgbGV0IGN1cnJlbnRDb29yID0gc2hpcENvb3JkaW5hdGVzW2ldO1xyXG5cclxuICAgICAgICAgaWYgKGN1cnJlbnRDb29yWzBdID4gOSB8fCBjdXJyZW50Q29vclswXSA8IDApXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5ldyBzaGlwIGNvb3JkaW5hdGVzIGFyZSBpbnZhbGlkXCIpO1xyXG4gICAgICAgICBpZiAoY3VycmVudENvb3JbMV0gPiA5IHx8IGN1cnJlbnRDb29yWzFdIDwgMClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTmV3IHNoaXAgY29vcmRpbmF0ZXMgYXJlIGludmFsaWRcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBuZXdTaGlwID0gU2hpcChsZW5ndGgsIHNoaXBDb29yZGluYXRlcyk7XHJcblxyXG4gICAgICAvLyBjaGVjayBpZiBuZXdTaGlwIGNhbiBiZSBhZGRlZCB0byBfc2hpcHNcclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgaWYgKF9zaGlwc1t0eXBlXS5sZW5ndGggPT09IG5ld1NoaXAuZ2V0TGVuZ3RoKCkpIHtcclxuICAgICAgICAgICAgaWYgKF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGggPCBfc2hpcHNbdHlwZV0ubWF4KSB7XHJcbiAgICAgICAgICAgICAgIC8vIGNoZWNrIGV2ZXJ5IHNoaXAncyBjb29yZGluYXRlcyB0byBzZWUgaWYgbmV3U2hpcCBkb2VzIG5vdCBoYXZlXHJcbiAgICAgICAgICAgICAgIC8vIHRoZSBzYW1lIGNvb3JkaW5hdGVzIG9mIGFub3RoZXIgc2hpcFxyXG4gICAgICAgICAgICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICAgICAgICAgICBfc2hpcHNbdHlwZV0uc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICBzaGlwLmdldENvb3JzKCkuZm9yRWFjaCgoc2hpcENvb3JzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NoaXAuZ2V0Q29vcnMoKS5mb3JFYWNoKChuZXdTaGlwQ29vcnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlwQ29vcnNbMF0gPT09IG5ld1NoaXBDb29yc1swXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlwQ29vcnNbMV0gPT09IG5ld1NoaXBDb29yc1sxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNhbid0IHBsYWNlIG5ldyBzaGlwIG92ZXIgYW5vdGhlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgX3NoaXBzW3R5cGVdLnNoaXBzLnB1c2gobmV3U2hpcCk7XHJcbiAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBsZXQgZXJyb3JNc2cgPSBgRXhjZWVkZWQgbnVtYmVyIG9mIHNoaXBzOiBtYXhpbXVuIG51bWJlciBmb3IgJHtsZW5ndGh9IGxlbmd0aCBzaGlwcyBpcyAke19zaGlwc1t0eXBlXS5tYXh9YDtcclxuICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHJlbW92ZVNoaXAgPSBmdW5jdGlvbiAocm93ID0gMCwgY29sdW1uID0gMCkge1xyXG4gICAgICBsZXQgZmlsdGVyZWRTaGlwcztcclxuICAgICAgbGV0IGNvb3JzO1xyXG5cclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgLy8gc2VhcmNoIGFuZCBmaWx0ZXIgb3V0IHNoaXAgdGhhdCBoYXMgXCJyb3dcIiBhbmQgXCJjb2x1bW5cIiBhcyBjb29yZGluYXRlc1xyXG4gICAgICAgICBzaGlwc0xvb3A6IGZvciAobGV0IGkgPSAwOyBpIDwgX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2hpcCA9IF9zaGlwc1t0eXBlXS5zaGlwc1tpXTtcclxuICAgICAgICAgICAgbGV0IHNoaXBDb29ycyA9IGN1cnJlbnRTaGlwLmdldENvb3JzKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNoaXBDb29ycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICBpZiAoc2hpcENvb3JzW2pdWzBdID09PSByb3cgJiYgc2hpcENvb3JzW2pdWzFdID09PSBjb2x1bW4pIHtcclxuICAgICAgICAgICAgICAgICAgZmlsdGVyZWRTaGlwcyA9IF9zaGlwc1t0eXBlXS5zaGlwcy5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgIChzaGlwKSA9PiBzaGlwICE9PSBjdXJyZW50U2hpcFxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICBjb29ycyA9IHNoaXBDb29ycztcclxuICAgICAgICAgICAgICAgICAgYnJlYWsgc2hpcHNMb29wO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgICAvLyB1cGRhdGUgX3NoaXBzW3R5cGVdLnNoaXBzIGFycmF5XHJcbiAgICAgICAgIGlmIChmaWx0ZXJlZFNoaXBzKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHRNc2cgPSBcIlJlbW92ZWQgc2hpcCB3aXRoIHRoZSBmb2xsb3dpbmcgY29vcmRpbmF0ZXM6IFwiO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0TXNnICs9IGNvb3JzXHJcbiAgICAgICAgICAgICAgIC5yZWR1Y2UoXHJcbiAgICAgICAgICAgICAgICAgIChhY2MsIGN1cnJlbnQpID0+IGFjYyArIGBbJHtjdXJyZW50WzBdfSwgJHtjdXJyZW50WzFdfV0sIGAsXHJcbiAgICAgICAgICAgICAgICAgIFwiXCJcclxuICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAuc2xpY2UoMCwgLTIpO1xyXG5cclxuICAgICAgICAgICAgX3NoaXBzW3R5cGVdLnNoaXBzID0gZmlsdGVyZWRTaGlwcztcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdE1zZztcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYFRoZXJlIGlzIG5vIHNoaXAgaW4gWyR7cm93fSwke2NvbHVtbn1dIGNvb3JkaW5hdGVzYDtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGlzQXJteUNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICBpZiAoX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aCA8IF9zaGlwc1t0eXBlXS5tYXgpIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCByZWNlaXZlQXR0YWNrID0gZnVuY3Rpb24gKHJvdyA9IDAsIGNvbHVtbiA9IDApIHtcclxuICAgICAgbGV0IHN5bWJvbCA9IFwiL1wiO1xyXG5cclxuICAgICAgaWYgKHJvdyA+IDkgfHwgcm93IDwgMCB8fCBjb2x1bW4gPiA5IHx8IGNvbHVtbiA8IDApIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICBgUHJvdmlkZWQgY29vcmRpbmF0ZXMgYXJlIG5vdCB2YWxpZDogWyR7cm93fSwke2NvbHVtbn1dYFxyXG4gICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2JvYXJkW3Jvd11bY29sdW1uXSAhPT0gXCJ+XCIpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICBgWW91IGFscmVhZHkgYXR0YWNrZWQgdGhlIGZvbGxvd2luZyBjb29yZGluYXRlczogWyR7cm93fSwke2NvbHVtbn1dYFxyXG4gICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjaGVjayBpZiBhbnkgc2hpcCBoYXMgXCJyb3dcIiBhbmQgXCJjb2x1bW5cIiBhcyBjb29yZGluYXRlcyBhbmQgaGl0IGl0XHJcbiAgICAgIHR5cGVMb29wOiBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFNoaXAgPSBfc2hpcHNbdHlwZV0uc2hpcHNbaV07XHJcbiAgICAgICAgICAgIGxldCBzaGlwQ29vcnMgPSBjdXJyZW50U2hpcC5nZXRDb29ycygpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaGlwQ29vcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgaWYgKHNoaXBDb29yc1tqXVswXSA9PT0gcm93ICYmIHNoaXBDb29yc1tqXVsxXSA9PT0gY29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRTaGlwLmhpdCgpO1xyXG4gICAgICAgICAgICAgICAgICBzeW1ib2wgPSBcIlhcIjtcclxuICAgICAgICAgICAgICAgICAgYnJlYWsgdHlwZUxvb3A7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIF9ib2FyZFtyb3ddW2NvbHVtbl0gPSBzeW1ib2w7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgIHJvdyxcclxuICAgICAgICAgY29sdW1uLFxyXG4gICAgICAgICBzeW1ib2wsXHJcbiAgICAgIH07XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBhbGxTaGlwc1N1bmsgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghX3NoaXBzW3R5cGVdLnNoaXBzW2ldLmlzU3VuaygpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgIH07XHJcblxyXG4gICByZXR1cm4ge1xyXG4gICAgICBnZXRCb2FyZCxcclxuICAgICAgZ2V0U2hpcHMsXHJcbiAgICAgIGdldEJvYXJkQW5kU2hpcHMsXHJcbiAgICAgIHBsYWNlU2hpcCxcclxuICAgICAgcmVtb3ZlU2hpcCxcclxuICAgICAgaXNBcm15Q29tcGxldGUsXHJcbiAgICAgIHJlY2VpdmVBdHRhY2ssXHJcbiAgICAgIGFsbFNoaXBzU3VuayxcclxuICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcclxuIiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vZ2FtZS5qc1wiO1xyXG5pbXBvcnQgXCIuL3Njc3Mvc3R5bGVzLnNjc3NcIjtcclxuXHJcbmNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXJCb2FyZFwiKTtcclxuY29uc3QgY3B1Qm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNwdS1ib2FyZC1jb250YWluZXJcIik7XHJcbmNvbnN0IGNwdUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcHVCb2FyZFwiKTtcclxuY29uc3QgYnV0dG9uc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9ucy1jb250YWluZXJcIik7XHJcbmNvbnN0IHNoaXBUYWJsZUNvdW50ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBsYWNlZC1jb3VudGVyXCIpO1xyXG5jb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yLW1lc3NhZ2VcIik7XHJcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1idXR0b25cIik7XHJcblxyXG5jb25zdCBwbGF5ZXJCb2FyZENlbGxzID0gW107XHJcbmNvbnN0IGNwdUJvYXJkQ2VsbHMgPSBbXTtcclxuXHJcbmxldCBsZW5ndGggPSBudWxsO1xyXG5sZXQgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XHJcbmxldCBzaGlwc0luZm8gPSBudWxsO1xyXG5sZXQgcHJldmlvdXNDbGlja2VkQnRuID0gbnVsbDtcclxubGV0IGN1cnJlbnRDZWxsID0gbnVsbDtcclxubGV0IGNlbGxzVG9IaWdobGlnaHQgPSBbXTtcclxuXHJcbi8vIGdlbmVyYXRlIHBsYXllciBhbmQgY3B1IGNlbGxzXHJcbmZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xyXG4gICBwbGF5ZXJCb2FyZENlbGxzLnB1c2goW10pO1xyXG4gICBjcHVCb2FyZENlbGxzLnB1c2goW10pO1xyXG5cclxuICAgZm9yIChsZXQgY2VsbCA9IDA7IGNlbGwgPCAxMDsgY2VsbCsrKSB7XHJcbiAgICAgIGxldCBjZWxsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHJcbiAgICAgIGNlbGxCdG4udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICAgIGNlbGxCdG4uY2xhc3NOYW1lID0gXCJib2FyZF9fY2VsbFwiO1xyXG4gICAgICBjZWxsQnRuLmRhdGFzZXQucm93ID0gcm93O1xyXG4gICAgICBjZWxsQnRuLmRhdGFzZXQuY2VsbCA9IGNlbGw7XHJcbiAgICAgIGNlbGxCdG4uZGF0YXNldC5maWxsZWQgPSBcImZhbHNlXCI7XHJcbiAgICAgIHBsYXllckJvYXJkLmFwcGVuZChjZWxsQnRuKTtcclxuICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddLnB1c2goY2VsbEJ0bik7XHJcblxyXG4gICAgICBsZXQgY2xvbmUgPSBjZWxsQnRuLmNsb25lTm9kZSgpO1xyXG4gICAgICBjcHVCb2FyZC5hcHBlbmQoY2xvbmUpO1xyXG4gICAgICBjcHVCb2FyZENlbGxzW3Jvd10ucHVzaChjbG9uZSk7XHJcbiAgIH1cclxufVxyXG5cclxuYnV0dG9uc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tlZEJ1dHRvbnMpO1xyXG5wbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIHNob3dQcmV2aWV3SGFuZGxlcik7XHJcbnBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCByZW1vdmVTaGlwUHJldmlldyk7XHJcbnBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGFjZU5ld1NoaXApO1xyXG5wbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgcmVtb3ZlU2hpcCk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCByb3RhdGVTaGlwKTtcclxuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGluaXRpYWxpemVHYW1lKTtcclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUNsaWNrZWRCdXR0b25zKGUpIHtcclxuICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgLy8gaGFuZGxlIGJ1dHRvbnMgdGhhdCBjaGFuZ2UgXCJsZW5ndGhcIiB2YXJpYWJsZVxyXG4gICBpZiAodGFyZ2V0LmRhdGFzZXQubGVuZ3RoKSB7XHJcbiAgICAgIGxlbmd0aCA9ICt0YXJnZXQuZGF0YXNldC5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAocHJldmlvdXNDbGlja2VkQnRuKSB7XHJcbiAgICAgICAgIHByZXZpb3VzQ2xpY2tlZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiYnV0dG9uLS1oaWdobGlnaHRlZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJidXR0b24tLWhpZ2hsaWdodGVkXCIpO1xyXG4gICAgICBwcmV2aW91c0NsaWNrZWRCdG4gPSB0YXJnZXQ7XHJcblxyXG4gICAgICAvLyBoYW5kbGUgcm90YXRpb24tYnV0dG9uXHJcbiAgIH0gZWxzZSBpZiAodGFyZ2V0LmlkID09PSBcInJvdGF0aW9uLWJ1dHR0b25cIikge1xyXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICAgICBkaXJlY3Rpb24gPSBcInZlcnRpY2FsXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1ByZXZpZXdIYW5kbGVyKGUpIHtcclxuICAgc2hvd1NoaXBQcmV2aWV3KGUudGFyZ2V0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1NoaXBQcmV2aWV3KG5vZGUpIHtcclxuICAgaWYgKGxlbmd0aCAmJiBub2RlLmRhdGFzZXQucm93ICYmIG5vZGUuZGF0YXNldC5jZWxsKSB7XHJcbiAgICAgIGxldCB7IHJvdywgY2VsbCB9ID0gbm9kZS5kYXRhc2V0O1xyXG5cclxuICAgICAgY3VycmVudENlbGwgPSBub2RlO1xyXG4gICAgICByb3cgPSArcm93O1xyXG4gICAgICBjZWxsID0gK2NlbGw7XHJcblxyXG4gICAgICAvLyBwb3B1bGF0ZSBcImNlbGxzVG9IaWdobGlnaHRcIiBhcnJheVxyXG4gICAgICBsZW5ndGhMb29wOiBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgIGlmICghcGxheWVyQm9hcmRDZWxsc1tyb3ddIHx8ICFwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0pIHtcclxuICAgICAgICAgICAgYnJlYWsgbGVuZ3RoTG9vcDtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgY2VsbHNUb0hpZ2hsaWdodC5wdXNoKHBsYXllckJvYXJkQ2VsbHNbcm93XVtjZWxsXSk7XHJcbiAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgICAgICAgIGNlbGwrKztcclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcm93Kys7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcGFpbnQgcHJldmlldyByZWQgaWYgc2hpcCBsZW5ndGggZG9lcyBub3QgZml0XHJcbiAgICAgIGlmIChjZWxsc1RvSGlnaGxpZ2h0Lmxlbmd0aCA8IGxlbmd0aCkge1xyXG4gICAgICAgICBjZWxsc1RvSGlnaGxpZ2h0LmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNiNTE3MTdcIjtcclxuICAgICAgICAgICAgY2VsbC5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgY2VsbC5zdHlsZS5ib3JkZXJDb2xvciA9IFwiI2I1MTcxN1wiO1xyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIC8vIHBhaW50IHByZXZpZXcgZWl0aGVyIGdyZWVuIG9yIHJlZCBiYXNlZCBvbiBmaWxsZWQgYXR0cmlidXRlIHZhbHVlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGNlbGxzVG9IaWdobGlnaHQuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2VsbC5kYXRhc2V0LmZpbGxlZCA9PT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjMWNiNTE3XCI7XHJcbiAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYm9yZGVyQ29sb3IgPSBcIiMxY2I1MTdcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNiNTE3MTdcIjtcclxuICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5ib3JkZXJDb2xvciA9IFwiI2I1MTcxN1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU2hpcFByZXZpZXcoKSB7XHJcbiAgIGNlbGxzVG9IaWdobGlnaHQuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XHJcbiAgICAgIGNlbGwuc3R5bGUuY29sb3IgPSBcIlwiO1xyXG4gICAgICBjZWxsLnN0eWxlLmJvcmRlckNvbG9yID0gXCJcIjtcclxuICAgfSk7XHJcbiAgIGNlbGxzVG9IaWdobGlnaHQgPSBbXTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGxhY2VOZXdTaGlwKGUpIHtcclxuICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgaWYgKGxlbmd0aCAmJiB0YXJnZXQuZGF0YXNldC5yb3cgJiYgdGFyZ2V0LmRhdGFzZXQuY2VsbCkge1xyXG4gICAgICBzaGlwc0luZm8gPSBHYW1lLnBsYXllckJvYXJkLmdldFNoaXBzKCk7XHJcbiAgICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IFwiXCI7IC8vIGNsZWFyIHByZXZpb3VzIGVycm9yIG1lc3NhZ2VcclxuXHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gc2hpcHNJbmZvKSB7XHJcbiAgICAgICAgIC8vIGlkZW50aWZ5IHdoYXQgdHlwZSBvZiBzaGlwIHRoZSB1c2VyIGlzIGdvaW5nIHRvIHBsYWNlXHJcbiAgICAgICAgIGlmIChzaGlwc0luZm9bdHlwZV0ubGVuZ3RoID09PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKHNoaXBzSW5mb1t0eXBlXS5zaGlwcy5sZW5ndGggPCBzaGlwc0luZm9bdHlwZV0ubWF4KSB7XHJcbiAgICAgICAgICAgICAgIC8vIHBsYWNlIG5ldyBzaGlwXHJcbiAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgIEdhbWUucGxheWVyQm9hcmQucGxhY2VTaGlwKFxyXG4gICAgICAgICAgICAgICAgICAgICBbK3RhcmdldC5kYXRhc2V0LnJvdywgK3RhcmdldC5kYXRhc2V0LmNlbGxdLFxyXG4gICAgICAgICAgICAgICAgICAgICBsZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbi5zbGljZSgwLCAzKVxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICBzaGlwc0luZm8gPSBHYW1lLnBsYXllckJvYXJkLmdldFNoaXBzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIHNoaXAgYnV0dG9uIHdoZW4gZ2V0dGluZyB0byBtYXhpbXVtIG51bWJlciBvZiBzaGlwcyBwbGFjZWRcclxuICAgICAgICAgICAgICAgICAgaWYgKHNoaXBzSW5mb1t0eXBlXS5zaGlwcy5sZW5ndGggPT09IHNoaXBzSW5mb1t0eXBlXS5tYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNDbGlja2VkQnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNDbGlja2VkQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJidXR0b24tLWhpZ2hsaWdodGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICB1cGRhdGVQbGF5ZXJCb2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICByZW1vdmVTaGlwUHJldmlldygpO1xyXG4gICAgICAgICAgICAgICAgICB1cGRhdGVTaGlwc1RhYmxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBpZiAoR2FtZS5wbGF5ZXJCb2FyZC5pc0FybXlDb21wbGV0ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHN0YXJ0QnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgIHN0YXJ0QnRuLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgLy8gcHJpbnQgZXJyb3IgbWVzc2FnZXNcclxuICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgIGUubWVzc2FnZSA9PT0gXCJOZXcgc2hpcCBjb29yZGluYXRlcyBhcmUgaW52YWxpZFwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgIGUubWVzc2FnZSA9PT0gXCJDYW4ndCBwbGFjZSBuZXcgc2hpcCBvdmVyIGFub3RoZXJcIlxyXG4gICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJFcnJvcjogXCIgKyBlLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRXJyb3I6IEFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHRyeWluZyB0byBwbGFjZSBhIG5ldyBzaGlwXCI7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVBsYXllckJvYXJkKCkge1xyXG4gICBsZXQgYm9hcmQgPSBHYW1lLnBsYXllckJvYXJkLmdldEJvYXJkQW5kU2hpcHMoKTtcclxuXHJcbiAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGJvYXJkLmxlbmd0aDsgcm93KyspIHtcclxuICAgICAgZm9yIChsZXQgY2VsbCA9IDA7IGNlbGwgPCBib2FyZFtyb3ddLmxlbmd0aDsgY2VsbCsrKSB7XHJcbiAgICAgICAgIGlmIChib2FyZFtyb3ddW2NlbGxdLnNlYXJjaCgvW0FCQ0RYL10vKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHBsYXllckJvYXJkQ2VsbHNbcm93XVtjZWxsXS50ZXh0Q29udGVudCA9IGJvYXJkW3Jvd11bY2VsbF07XHJcbiAgICAgICAgICAgIHBsYXllckJvYXJkQ2VsbHNbcm93XVtjZWxsXS5kYXRhc2V0LmZpbGxlZCA9IFwidHJ1ZVwiO1xyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0udGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0uZGF0YXNldC5maWxsZWQgPSBcImZhbHNlXCI7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVNoaXBzVGFibGUoKSB7XHJcbiAgIGxldCBpbmRleCA9IDA7XHJcblxyXG4gICBmb3IgKGxldCB0eXBlIGluIHNoaXBzSW5mbykge1xyXG4gICAgICBzaGlwVGFibGVDb3VudGVyc1tpbmRleF0udGV4dENvbnRlbnQgPSBzaGlwc0luZm9bdHlwZV0uc2hpcHMubGVuZ3RoO1xyXG4gICAgICBpbmRleCsrO1xyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVNoaXAoZSkge1xyXG4gICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICBpZiAoXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LnJvdyAmJlxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5jZWxsICYmXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LmZpbGxlZCAmJlxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5maWxsZWQgPT09IFwidHJ1ZVwiXHJcbiAgICkge1xyXG4gICAgICBsZXQgbXNnID0gR2FtZS5wbGF5ZXJCb2FyZC5yZW1vdmVTaGlwKFxyXG4gICAgICAgICArdGFyZ2V0LmRhdGFzZXQucm93LFxyXG4gICAgICAgICArdGFyZ2V0LmRhdGFzZXQuY2VsbFxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKG1zZy5pbmNsdWRlcyhcIlJlbW92ZWQgc2hpcCB3aXRoIHRoZSBmb2xsb3dpbmcgY29vcmRpbmF0ZXM6XCIpKSB7XHJcbiAgICAgICAgIGxldCBzaGlwQnV0dG9ucyA9IGJ1dHRvbnNDb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5idXR0b25cIik7XHJcbiAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcblxyXG4gICAgICAgICBzaGlwc0luZm8gPSBHYW1lLnBsYXllckJvYXJkLmdldFNoaXBzKCk7XHJcblxyXG4gICAgICAgICAvLyBlbmFibGUgYmFjayBkaXNhYmxlZCBidXR0b25zXHJcbiAgICAgICAgIGZvciAobGV0IHR5cGUgaW4gc2hpcHNJbmZvKSB7XHJcbiAgICAgICAgICAgIGlmIChzaGlwc0luZm9bdHlwZV0uc2hpcHMubGVuZ3RoIDwgc2hpcHNJbmZvW3R5cGVdLm1heCkge1xyXG4gICAgICAgICAgICAgICBzaGlwQnV0dG9uc1tpbmRleF0uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgaWYgKCFHYW1lLnBsYXllckJvYXJkLmlzQXJteUNvbXBsZXRlKCkpIHtcclxuICAgICAgICAgICAgc3RhcnRCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdGFydEJ0bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgdXBkYXRlUGxheWVyQm9hcmQoKTtcclxuICAgICAgICAgc2hvd1NoaXBQcmV2aWV3KGN1cnJlbnRDZWxsKTtcclxuICAgICAgICAgdXBkYXRlU2hpcHNUYWJsZSgpO1xyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIGUucHJldmVudERlZmF1bHQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcm90YXRlU2hpcChlKSB7XHJcbiAgIGlmIChlLmtleSA9PT0gXCJxXCIgfHwgZS5rZXkgPT09IFwiUVwiKSB7XHJcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgICAgIGRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlbW92ZVNoaXBQcmV2aWV3KCk7XHJcbiAgICAgIHNob3dTaGlwUHJldmlldyhjdXJyZW50Q2VsbCk7XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZUdhbWUoKSB7XHJcbiAgIGlmIChHYW1lLmluaXQoKSkge1xyXG4gICAgICBwbGF5ZXJCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIHNob3dQcmV2aWV3SGFuZGxlcik7XHJcbiAgICAgIHBsYXllckJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCByZW1vdmVTaGlwUHJldmlldyk7XHJcbiAgICAgIHBsYXllckJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGFjZU5ld1NoaXApO1xyXG4gICAgICBwbGF5ZXJCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgcmVtb3ZlU2hpcCk7XHJcbiAgICAgIHN0YXJ0QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgYnV0dG9uc0NvbnRhaW5lci5wYXJlbnRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgY3B1Qm9hcmRDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuXHJcbiAgICAgIGNwdUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhdHRhY2tDcHVCb2FyZCk7XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXR0YWNrQ3B1Qm9hcmQoZSkge1xyXG4gICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICBpZiAoXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LmZpbGxlZCA9PT0gXCJmYWxzZVwiICYmXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LnJvdyAmJlxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5jZWxsXHJcbiAgICkge1xyXG4gICAgICBsZXQgeyByb3csIGNlbGwgfSA9IHRhcmdldC5kYXRhc2V0O1xyXG4gICAgICBsZXQgdHVyblJlc3VsdCA9IEdhbWUudGFrZVR1cm4oK3JvdywgK2NlbGwpO1xyXG5cclxuICAgICAgdXBkYXRlUGxheWVyQm9hcmQoKTtcclxuICAgICAgdXBkYXRlQ3B1Qm9hcmQoKTtcclxuXHJcbiAgICAgIC8vIGRlY2xhcmUgYSB3aW5uZXIgYW5kIHByaW50IGEgcmVzZXQgYnV0dG9uXHJcbiAgICAgIGlmIChcclxuICAgICAgICAgdHVyblJlc3VsdC5zZWFyY2ggJiZcclxuICAgICAgICAgdHVyblJlc3VsdC5zZWFyY2goL1BsYXllcnxDb21wdXRlciB3b24gdGhlIG1hdGNoL2dpKSA+PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgbGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcblxyXG4gICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJyZXNldC1jb250YWluZXJcIjtcclxuICAgICAgICAgcC50ZXh0Q29udGVudCA9IHR1cm5SZXN1bHQ7XHJcbiAgICAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSBcImJ1dHRvblwiO1xyXG4gICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIlJlc2V0IEdhbWVcIjtcclxuICAgICAgICAgZGl2LmFwcGVuZChwLCBidXR0b24pO1xyXG4gICAgICAgICBkb2N1bWVudC5ib2R5LmZpcnN0RWxlbWVudENoaWxkLmFmdGVyKGRpdik7XHJcblxyXG4gICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlc2V0R2FtZSk7XHJcbiAgICAgICAgIGNwdUJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhdHRhY2tDcHVCb2FyZCk7XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVDcHVCb2FyZCgpIHtcclxuICAgbGV0IGJvYXJkID0gR2FtZS5nZXRDb21wdXRlckJvYXJkKCk7XHJcblxyXG4gICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBib2FyZC5sZW5ndGg7IHJvdysrKSB7XHJcbiAgICAgIGZvciAobGV0IGNlbGwgPSAwOyBjZWxsIDwgYm9hcmRbcm93XS5sZW5ndGg7IGNlbGwrKykge1xyXG4gICAgICAgICBpZiAoYm9hcmRbcm93XVtjZWxsXS5zZWFyY2goL1tYL10vKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIGNwdUJvYXJkQ2VsbHNbcm93XVtjZWxsXS50ZXh0Q29udGVudCA9IGJvYXJkW3Jvd11bY2VsbF07XHJcbiAgICAgICAgICAgIGNwdUJvYXJkQ2VsbHNbcm93XVtjZWxsXS5kYXRhc2V0LmZpbGxlZCA9IFwidHJ1ZVwiO1xyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjcHVCb2FyZENlbGxzW3Jvd11bY2VsbF0udGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICBjcHVCb2FyZENlbGxzW3Jvd11bY2VsbF0uZGF0YXNldC5maWxsZWQgPSBcImZhbHNlXCI7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc2V0R2FtZSgpIHtcclxuICAgR2FtZS5yZXNldCgpO1xyXG5cclxuICAgZG9jdW1lbnQuYm9keS5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmcucmVtb3ZlKCk7XHJcbiAgIHVwZGF0ZUNwdUJvYXJkKCk7XHJcbiAgIGNwdUJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhdHRhY2tDcHVCb2FyZCk7XHJcbiAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgc2hvd1ByZXZpZXdIYW5kbGVyKTtcclxuICAgcGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIHJlbW92ZVNoaXBQcmV2aWV3KTtcclxuICAgcGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBsYWNlTmV3U2hpcCk7XHJcbiAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCByZW1vdmVTaGlwKTtcclxuICAgdXBkYXRlUGxheWVyQm9hcmQoKTtcclxuICAgYnV0dG9uc0NvbnRhaW5lci5wYXJlbnRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgIFsuLi5idXR0b25zQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uXCIpXS5mb3JFYWNoKFxyXG4gICAgICAoYnV0dG9uKSA9PiAoYnV0dG9uLmRpc2FibGVkID0gZmFsc2UpXHJcbiAgICk7XHJcbiAgIFsuLi5zaGlwVGFibGVDb3VudGVyc10uZm9yRWFjaCgoY291bnRlcikgPT4gKGNvdW50ZXIudGV4dENvbnRlbnQgPSBcIjBcIikpO1xyXG4gICBjcHVCb2FyZENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcclxuICAgc3RhcnRCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICBzdGFydEJ0bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxufVxyXG4iLCJjb25zdCBTaGlwID0gZnVuY3Rpb24gKGxlbmd0aCwgY29vcmRpbmF0ZXMpIHtcclxuICAgbGV0IF9jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzIHx8IG51bGw7XHJcbiAgIGxldCBfbGVuZ3RoID0gbGVuZ3RoIHx8IDI7XHJcbiAgIGxldCBfaGl0c0NvdW50ZXIgPSAwO1xyXG5cclxuICAgY29uc3QgZ2V0Q29vcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9jb29yZGluYXRlcykpO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgZ2V0TGVuZ3RoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX2xlbmd0aDtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGdldEhpdHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBfaGl0c0NvdW50ZXI7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBoaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIF9oaXRzQ291bnRlcisrO1xyXG4gICAgICByZXR1cm4gX2hpdHNDb3VudGVyO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgaXNTdW5rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX2hpdHNDb3VudGVyID09PSBsZW5ndGg7XHJcbiAgIH07XHJcblxyXG4gICByZXR1cm4ge1xyXG4gICAgICBnZXRDb29ycyxcclxuICAgICAgZ2V0TGVuZ3RoLFxyXG4gICAgICBnZXRIaXRzLFxyXG4gICAgICBoaXQsXHJcbiAgICAgIGlzU3VuayxcclxuICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCxcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICMxY2I1MTc7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6ICMxY2I1MTc7XFxuICBtYXJnaW46IDE2cHg7XFxufVxcblxcbm9sLCB1bCB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG5ibG9ja3F1b3RlLCBxIHtcXG4gIHF1b3Rlczogbm9uZTtcXG59XFxuXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBjb250ZW50OiBub25lO1xcbn1cXG5cXG50YWJsZSB7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XFxufVxcblxcbnAge1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG59XFxuXFxuLmluc3RydWN0aW9ucyB7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBtYXgtd2lkdGg6IDUwMHB4O1xcbiAgcGFkZGluZzogMXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBtYXJnaW4tdG9wOiAzcmVtO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxufVxcbi5pbnN0cnVjdGlvbnMgaDEge1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyIGgxIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbi5ib2FyZCB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4IGF1dG87XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAzcHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG4gIGdyaWQtY29sdW1uOiAyO1xcbiAgZ3JpZC1yb3c6IDE7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlcjogbm9uZTtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjFcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMlxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgzKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIzXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDQpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjRcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg2KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI2XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDcpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjdcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiOFxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg5KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI5XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEwKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIxMFxcXCI7XFxufVxcblxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAzcHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHg7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG4gIGdyaWQtY29sdW1uOiAxO1xcbiAgZ3JpZC1yb3c6IDI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGwge1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJhXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiYlxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDMpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImNcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg0KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJkXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDYpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImZcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg3KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJnXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiaFxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDkpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImlcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxMCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwialxcXCI7XFxufVxcblxcbi5ib2FyZF9fY2VsbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiAjMWNiNTE3O1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZF9fYm9hcmQge1xcbiAgZ3JpZC1yb3c6IDI7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAzcHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG59XFxuLmJvYXJkX19ib2FyZCAuYm9hcmRfX2NlbGw6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuXFxuI2Vycm9yLW1lc3NhZ2Uge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWF4LXdpZHRoOiA1MDBweDtcXG4gIGdyaWQtY29sdW1uOiAxLy0xO1xcbiAgbWFyZ2luLXRvcDogMXJlbTtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgcGFkZGluZzogMCAxcmVtO1xcbn1cXG5cXG4jY3B1LWJvYXJkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgbWFyZ2luLXRvcDogMnJlbTtcXG59XFxuXFxuLnBsYXllci1idXR0b25zIHVsIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbjogMnJlbSAwO1xcbn1cXG4ucGxheWVyLWJ1dHRvbnMgdWwgbGkge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG5cXG4uc2hpcHMtdGFibGUge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIG1hcmdpbi1ib3R0b206IDJyZW07XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG59XFxuLnNoaXBzLXRhYmxlIHRkLCAuc2hpcHMtdGFibGUgdGgge1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG59XFxuXFxuI3N0YXJ0LWJ1dHRvbiB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbi5yZXNldC1jb250YWluZXIge1xcbiAgZm9udC1zaXplOiAxLCA1cmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luOiAzcmVtIDA7XFxufVxcbi5yZXNldC1jb250YWluZXIgcCB7XFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG5cXG4uYnV0dG9uIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICBmb250LXNpemU6IDFyZW07XFxuICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggIzFjYjUxNztcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6ICMxY2I1MTc7XFxuICBwYWRkaW5nOiAwLjVyZW0gMC44cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWNiNTE3O1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG4uYnV0dG9uLS1oaWdobGlnaHRlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWNiNTE3O1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG4uYnV0dG9uOmRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDAuNDtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gIC5ncmlkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgfVxcblxcbiAgLnNoaXBzLXRhYmxlIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICB9XFxuXFxuICAjY3B1LWJvYXJkLWNvbnRhaW5lciB7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICB9XFxuXFxuICAucGxheWVyLWJ1dHRvbnMgdWwge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG1hcmdpbi1ib3R0b206IDJyZW07XFxuICB9XFxuICAucGxheWVyLWJ1dHRvbnMgdWwgbGkge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gIH1cXG4gIC5wbGF5ZXItYnV0dG9ucyAuYnV0dG9uIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fcmVzZXQuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3Mvc3R5bGVzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL192YXJpYWJsZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX2luc3RydWN0aW9ucy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fYm9hcmQuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX2J1dHRvbnMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX21lZGlhLXF1ZXJpZXMuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0NBQUE7QUFNQTs7Ozs7Ozs7Ozs7OztFQWFDLFNBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0Esd0JBQUE7QUNERDs7QURHQSxnREFBQTtBQUNBOztFQUVDLGNBQUE7QUNBRDs7QURFQTtFQUNDLHNCQUFBO0VBQ0UsNkJBQUE7RUFDRixjQUFBO0VBQ0UsdUJBQUE7RUFDQSxjRXBDSztFRnFDUCxZQUFBO0FDQ0Q7O0FEQ0E7RUFDQyxnQkFBQTtBQ0VEOztBREFBO0VBQ0MsWUFBQTtBQ0dEOztBRERBOztFQUVDLFdBQUE7RUFDQSxhQUFBO0FDSUQ7O0FERkE7RUFDQyx5QkFBQTtFQUNBLGlCQUFBO0FDS0Q7O0FESEE7RUFDQyxnQkFBQTtBQ01EOztBRTNEQTtFQUNHLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBRjhESDtBRTdERztFQUNHLGlCQUFBO0VBQ0EsbUJBQUE7QUYrRE47O0FHckVHO0VBQ0csa0JBQUE7RUFDQSx5QkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUh3RU47O0FHckVBO0VBQ0csZUFBQTtFQUNBLGFBQUE7RUFDQSxnQ0FBQTtFQUNBLHVCQUFBO0FId0VIOztBR3RFQTtFQUNHLGFBQUE7RUFDQSxRQUFBO0VBQ0EsdUNBQUE7RUFDQSxvQkFwQlM7RUFxQlQsY0FBQTtFQUNBLFdBQUE7QUh5RUg7QUd4RUc7RUFDRyxZQUFBO0FIMEVOO0FHdkVTO0VBQ0csWUFBQTtBSHlFWjtBRzFFUztFQUNHLFlBQUE7QUg0RVo7QUc3RVM7RUFDRyxZQUFBO0FIK0VaO0FHaEZTO0VBQ0csWUFBQTtBSGtGWjtBR25GUztFQUNHLFlBQUE7QUhxRlo7QUd0RlM7RUFDRyxZQUFBO0FId0ZaO0FHekZTO0VBQ0csWUFBQTtBSDJGWjtBRzVGUztFQUNHLFlBQUE7QUg4Rlo7QUcvRlM7RUFDRyxZQUFBO0FIaUdaO0FHbEdTO0VBQ0csYUFBQTtBSG9HWjs7QUcvRkE7RUFDRyxhQUFBO0VBQ0EsUUFBQTtFQUNBLDJCQXBDUztFQXFDVCxvQkFyQ1M7RUFzQ1QsY0FBQTtFQUNBLFdBQUE7QUhrR0g7QUdqR0c7RUFDRyxZQUFBO0FIbUdOO0FHOUZTO0VBQ0csWUFBQTtBSGdHWjtBR2pHUztFQUNHLFlBQUE7QUhtR1o7QUdwR1M7RUFDRyxZQUFBO0FIc0daO0FHdkdTO0VBQ0csWUFBQTtBSHlHWjtBRzFHUztFQUNHLFlBQUE7QUg0R1o7QUc3R1M7RUFDRyxZQUFBO0FIK0daO0FHaEhTO0VBQ0csWUFBQTtBSGtIWjtBR25IUztFQUNHLFlBQUE7QUhxSFo7QUd0SFM7RUFDRyxZQUFBO0FId0haO0FHekhTO0VBQ0csWUFBQTtBSDJIWjs7QUd0SEE7RUFDRyx1QkFBQTtFQUNBLGNGekRLO0VFMERMLHlCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUh5SEg7O0FHdkhBO0VBQ0csV0FBQTtFQUNBLGFBQUE7RUFDQSxRQUFBO0VBQ0EsdUNBQUE7RUFDQSxvQkFqRVM7QUgyTFo7QUd4SE07RUFDRyx5QkZ2RUQ7RUV3RUMsWUFBQTtBSDBIVDs7QUd0SEE7RUFDRyxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBSHlISDs7QUd2SEE7RUFDRyxhQUFBO0VBQ0EsZ0JBQUE7QUgwSEg7O0FHdkhHO0VBQ0csa0JBQUE7RUFDQSxjQUFBO0FIMEhOO0FHeEhHO0VBQ0cscUJBQUE7RUFDQSxxQkFBQTtBSDBITjs7QUd2SEE7RUFDRyxlQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUgwSEg7QUd4SEc7RUFDRyxlQUFBO0VBQ0EseUJBQUE7QUgwSE47O0FHdkhBO0VBQ0csa0JBQUE7QUgwSEg7O0FHeEhBO0VBQ0csa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUgySEg7QUcxSEc7RUFDRyxtQkFBQTtBSDRITjs7QUlsUEE7RUFDRyxzQkFBQTtFQUNBLGVBQUE7RUFDQSw2QkFBQTtFQUNBLHVCQUFBO0VBQ0EsY0hQSztFR1FMLHNCQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0FKcVBIO0FJcFBHO0VBQ0cseUJIWkU7RUdhRixZQUFBO0FKc1BOO0FJcFBHO0VBQ0cseUJIaEJFO0VHaUJGLFlBQUE7QUpzUE47QUlwUEc7RUFDRyxZQUFBO0FKc1BOOztBSzFRQTtFQUNHO0lBQ0csYUFBQTtJQUNBLDhCQUFBO0VMNlFKOztFSzNRQztJQUNHLFdBQUE7RUw4UUo7O0VLNVFDO0lBQ0csYUFBQTtFTCtRSjs7RUs1UUk7SUFDRyxTQUFBO0lBQ0EsbUJBQUE7RUwrUVA7RUs3UUk7SUFDRyxjQUFBO0VMK1FQO0VLN1FJO0lBQ0csY0FBQTtJQUNBLFdBQUE7RUwrUVA7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxyXFxuQHVzZSAnLi92YXJpYWJsZXMnIGFzICo7XFxyXFxuXFxyXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcclxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXHJcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxyXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcclxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxyXFxuYiwgdSwgaSwgY2VudGVyLFxcclxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxyXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxyXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcclxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxyXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxyXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXHJcXG5cXHRtYXJnaW46IDA7XFxyXFxuXFx0cGFkZGluZzogMDtcXHJcXG5cXHRib3JkZXI6IDA7XFxyXFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcclxcblxcdGZvbnQ6IGluaGVyaXQ7XFxyXFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcclxcbn1cXHJcXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxyXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXHJcXG5cXHRkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuXFx0Zm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXHJcXG4gICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggJGdyZWVuO1xcclxcblxcdGxpbmUtaGVpZ2h0OiAxO1xcclxcbiAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcclxcbiAgIGNvbG9yOiAkZ3JlZW47XFxyXFxuXFx0bWFyZ2luOiAxNnB4O1xcclxcbn1cXHJcXG5vbCwgdWwge1xcclxcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGUsIHEge1xcclxcblxcdHF1b3Rlczogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxyXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcclxcblxcdGNvbnRlbnQ6ICcnO1xcclxcblxcdGNvbnRlbnQ6IG5vbmU7XFxyXFxufVxcclxcbnRhYmxlIHtcXHJcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcclxcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcclxcbn1cXHJcXG5wIHtcXHJcXG5cXHRsaW5lLWhlaWdodDogMS41O1xcclxcbn1cIixcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCxcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IDA7XFxuICBmb250LXNpemU6IDEwMCU7XFxuICBmb250OiBpbmhlcml0O1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSxcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gIHRleHQtc2hhZG93OiAwIDAgMTBweCAjMWNiNTE3O1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiAjMWNiNTE3O1xcbiAgbWFyZ2luOiAxNnB4O1xcbn1cXG5cXG5vbCwgdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuYmxvY2txdW90ZSwgcSB7XFxuICBxdW90ZXM6IG5vbmU7XFxufVxcblxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgY29udGVudDogbm9uZTtcXG59XFxuXFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG5wIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxufVxcblxcbi5pbnN0cnVjdGlvbnMge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgbWF4LXdpZHRoOiA1MDBweDtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgbWFyZ2luLXRvcDogM3JlbTtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgxIHtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuLmJvYXJkLWNvbnRhaW5lciBoMSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweCBhdXRvO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogM3B4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxuICBncmlkLWNvbHVtbjogMjtcXG4gIGdyaWQtcm93OiAxO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbCB7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIxXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjJcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiM1xcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg0KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI0XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDUpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjVcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNlxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg3KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI3XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDgpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjhcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiOVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxMCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMTBcXFwiO1xcbn1cXG5cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogM3B4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4O1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxuICBncmlkLWNvbHVtbjogMTtcXG4gIGdyaWQtcm93OiAyO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlcjogbm9uZTtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiYVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImJcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgzKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJjXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZFxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDUpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImVcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg2KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJmXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZ1xcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDgpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImhcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg5KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJpXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMTApOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImpcXFwiO1xcbn1cXG5cXG4uYm9hcmRfX2NlbGwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogIzFjYjUxNztcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmRfX2JvYXJkIHtcXG4gIGdyaWQtcm93OiAyO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogM3B4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxufVxcbi5ib2FyZF9fYm9hcmQgLmJvYXJkX19jZWxsOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcblxcbiNlcnJvci1tZXNzYWdlIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1heC13aWR0aDogNTAwcHg7XFxuICBncmlkLWNvbHVtbjogMS8tMTtcXG4gIG1hcmdpbi10b3A6IDFyZW07XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG4gIHBhZGRpbmc6IDAgMXJlbTtcXG59XFxuXFxuI2NwdS1ib2FyZC1jb250YWluZXIge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIG1hcmdpbi10b3A6IDJyZW07XFxufVxcblxcbi5wbGF5ZXItYnV0dG9ucyB1bCB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW46IDJyZW0gMDtcXG59XFxuLnBsYXllci1idXR0b25zIHVsIGxpIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcXG59XFxuXFxuLnNoaXBzLXRhYmxlIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxufVxcbi5zaGlwcy10YWJsZSB0ZCwgLnNoaXBzLXRhYmxlIHRoIHtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxufVxcblxcbiNzdGFydC1idXR0b24ge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4ucmVzZXQtY29udGFpbmVyIHtcXG4gIGZvbnQtc2l6ZTogMSwgNXJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1hcmdpbjogM3JlbSAwO1xcbn1cXG4ucmVzZXQtY29udGFpbmVyIHAge1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuLmJ1dHRvbiB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICMxY2I1MTc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiAjMWNiNTE3O1xcbiAgcGFkZGluZzogMC41cmVtIDAuOHJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLmJ1dHRvbi0taGlnaGxpZ2h0ZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLmJ1dHRvbjpkaXNhYmxlZCB7XFxuICBvcGFjaXR5OiAwLjQ7XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KSB7XFxuICAuZ3JpZCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIH1cXG5cXG4gIC5zaGlwcy10YWJsZSB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcblxcbiAgI2NwdS1ib2FyZC1jb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiAwO1xcbiAgfVxcblxcbiAgLnBsYXllci1idXR0b25zIHVsIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xcbiAgfVxcbiAgLnBsYXllci1idXR0b25zIHVsIGxpIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICB9XFxuICAucGxheWVyLWJ1dHRvbnMgLmJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG59XCIsXCIkZ3JlZW46ICMxY2I1MTc7XCIsXCJAdXNlICcuL3ZhcmlhYmxlcycgYXMgKjtcXHJcXG5cXHJcXG4uaW5zdHJ1Y3Rpb25zIHtcXHJcXG4gICBmb250LXNpemU6IDFyZW07XFxyXFxuICAgbWF4LXdpZHRoOiA1MDBweDtcXHJcXG4gICBwYWRkaW5nOiAxcmVtO1xcclxcbiAgIGJvcmRlcjogMXB4IHNvbGlkICRncmVlbjtcXHJcXG4gICBtYXJnaW4tdG9wOiAzcmVtO1xcclxcbiAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG4gICBoMSB7XFxyXFxuICAgICAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXHJcXG4gICB9XFxyXFxufVwiLFwiQHVzZSAnc2FzczpsaXN0JztcXHJcXG5AdXNlICcuL3ZhcmlhYmxlcycgYXMgKjtcXHJcXG5cXHJcXG4kY2VsbFdpZHRoOiAzMHB4O1xcclxcblxcclxcbi5ib2FyZC1jb250YWluZXIge1xcclxcbiAgIGgxIHtcXHJcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXHJcXG4gICAgICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcclxcbiAgIH1cXHJcXG59XFxyXFxuLmJvYXJkIHtcXHJcXG4gICBmb250LXNpemU6IDE4cHg7XFxyXFxuICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6ICRjZWxsV2lkdGggYXV0bztcXHJcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG59XFxyXFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciB7XFxyXFxuICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICBnYXA6IDNweDtcXHJcXG4gICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgJGNlbGxXaWR0aCk7XFxyXFxuICAgZ3JpZC1hdXRvLXJvd3M6ICRjZWxsV2lkdGg7XFxyXFxuICAgZ3JpZC1jb2x1bW46IDI7XFxyXFxuICAgZ3JpZC1yb3c6IDE7XFxyXFxuICAgLmJvYXJkX19jZWxsIHtcXHJcXG4gICAgICBib3JkZXI6IG5vbmU7XFxyXFxuXFxyXFxuICAgICAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAxMCB7XFxyXFxuICAgICAgICAgJjpudGgtY2hpbGQoI3skaX0pOjpiZWZvcmUge1xcclxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcjeyRpfSc7IFxcclxcbiAgICAgICAgIH1cXHJcXG4gICAgICB9XFxyXFxuICAgfVxcclxcbn1cXHJcXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIge1xcclxcbiAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgZ2FwOiAzcHg7XFxyXFxuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAkY2VsbFdpZHRoO1xcclxcbiAgIGdyaWQtYXV0by1yb3dzOiAkY2VsbFdpZHRoO1xcclxcbiAgIGdyaWQtY29sdW1uOiAxO1xcclxcbiAgIGdyaWQtcm93OiAyO1xcclxcbiAgIC5ib2FyZF9fY2VsbCB7XFxyXFxuICAgICAgYm9yZGVyOiBub25lO1xcclxcblxcclxcbiAgICAgICRsZXR0ZXJzOiAnYScsJ2InLCdjJywnZCcsJ2UnLCdmJywnZycsJ2gnLCdpJywnaic7XFxyXFxuXFxyXFxuICAgICAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAxMCB7XFxyXFxuICAgICAgICAgJjpudGgtY2hpbGQoI3skaX0pOjpiZWZvcmUge1xcclxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcje2xpc3QubnRoKCRsZXR0ZXJzLCAkaSl9JzsgXFxyXFxuICAgICAgICAgfVxcclxcbiAgICAgIH1cXHJcXG4gICB9XFxyXFxufVxcclxcbi5ib2FyZF9fY2VsbCB7XFxyXFxuICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxyXFxuICAgY29sb3I6ICRncmVlbjtcXHJcXG4gICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XFxyXFxuICAgZGlzcGxheTogZmxleDtcXHJcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG4uYm9hcmRfX2JvYXJkIHtcXHJcXG4gICBncmlkLXJvdzogMjtcXHJcXG4gICBkaXNwbGF5OiBncmlkO1xcclxcbiAgIGdhcDogM3B4O1xcclxcbiAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAkY2VsbFdpZHRoKTtcXHJcXG4gICBncmlkLWF1dG8tcm93czogJGNlbGxXaWR0aDtcXHJcXG4gICAuYm9hcmRfX2NlbGwge1xcclxcbiAgICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRncmVlbjtcXHJcXG4gICAgICAgICBjb2xvcjogYmxhY2s7XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XFxyXFxuI2Vycm9yLW1lc3NhZ2Uge1xcclxcbiAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgbWF4LXdpZHRoOiA1MDBweDtcXHJcXG4gICBncmlkLWNvbHVtbjogMSAvIC0xO1xcclxcbiAgIG1hcmdpbi10b3A6IDFyZW07XFxyXFxuICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxyXFxuICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgIHBhZGRpbmc6IDAgMXJlbTtcXHJcXG59XFxyXFxuI2NwdS1ib2FyZC1jb250YWluZXIge1xcclxcbiAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgbWFyZ2luLXRvcDogMnJlbTtcXHJcXG59XFxyXFxuLnBsYXllci1idXR0b25zIHtcXHJcXG4gICB1bCB7XFxyXFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgIG1hcmdpbjogMnJlbSAwO1xcclxcbiAgIH1cXHJcXG4gICB1bCBsaSB7XFxyXFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICAgIG1hcmdpbi1ib3R0b206IC41cmVtO1xcclxcbiAgIH1cXHJcXG59XFxyXFxuLnNoaXBzLXRhYmxlIHtcXHJcXG4gICBmb250LXNpemU6IDFyZW07XFxyXFxuICAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xcclxcbiAgIG1hcmdpbi1ib3R0b206IDJyZW07XFxyXFxuICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxyXFxuICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcblxcclxcbiAgIHRkLCB0aCB7XFxyXFxuICAgICAgcGFkZGluZzogLjVyZW07XFxyXFxuICAgICAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xcclxcbiAgIH1cXHJcXG59XFxyXFxuI3N0YXJ0LWJ1dHRvbiB7XFxyXFxuICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcclxcbn1cXHJcXG4ucmVzZXQtY29udGFpbmVyIHtcXHJcXG4gICBmb250LXNpemU6IDEsNXJlbTtcXHJcXG4gICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgbWFyZ2luOiAzcmVtIDA7XFxyXFxuICAgcCB7XFxyXFxuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXHJcXG4gICB9XFxyXFxufVwiLFwiQHVzZSAnLi92YXJpYWJsZXMnIGFzICo7XFxyXFxuXFxyXFxuLmJ1dHRvbiB7XFxyXFxuICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXHJcXG4gICBmb250LXNpemU6IDFyZW07XFxyXFxuICAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICRncmVlbjtcXHJcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXHJcXG4gICBjb2xvcjogJGdyZWVuO1xcclxcbiAgIHBhZGRpbmc6IC41cmVtIC44cmVtO1xcclxcbiAgIGJvcmRlcjogMXB4IHNvbGlkICRncmVlbjtcXHJcXG4gICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgJjpob3ZlciB7XFxyXFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGdyZWVuO1xcclxcbiAgICAgIGNvbG9yOiBibGFjaztcXHJcXG4gICB9XFxyXFxuICAgJi0taGlnaGxpZ2h0ZWQge1xcclxcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRncmVlbjtcXHJcXG4gICAgICBjb2xvcjogYmxhY2s7XFxyXFxuICAgfVxcclxcbiAgICY6ZGlzYWJsZWQge1xcclxcbiAgICAgIG9wYWNpdHk6IC40O1xcclxcbiAgIH1cXHJcXG59XCIsXCJAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCkge1xcclxcbiAgIC5ncmlkIHtcXHJcXG4gICAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXHJcXG4gICB9XFxyXFxuICAgLnNoaXBzLXRhYmxlIHtcXHJcXG4gICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICB9XFxyXFxuICAgI2NwdS1ib2FyZC1jb250YWluZXIge1xcclxcbiAgICAgIG1hcmdpbi10b3A6IDA7XFxyXFxuICAgfVxcclxcbiAgIC5wbGF5ZXItYnV0dG9ucyB7XFxyXFxuICAgICAgdWwge1xcclxcbiAgICAgICAgIG1hcmdpbjogMDtcXHJcXG4gICAgICAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xcclxcbiAgICAgIH1cXHJcXG4gICAgICB1bCBsaSB7XFxyXFxuICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgICAgfVxcclxcbiAgICAgIC5idXR0b24ge1xcclxcbiAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgIH1cXHJcXG4gICB9XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbIkdhbWVib2FyZCIsIkdhbWUiLCJfd2lubmVyTWVzc2FnZSIsIl9jYW5HYW1lU3RhcnQiLCJfY29tcHV0ZXJCb2FyZCIsIl9jcHVQcmV2aW91c0F0dGFjayIsIl9jcHVOZXh0QXR0YWNrIiwicGxheWVyQm9hcmQiLCJnZXRDb21wdXRlckJvYXJkIiwiZ2V0Qm9hcmQiLCJpbml0IiwicGxhY2VFbmVteUFybXkiLCJ0eXBlIiwicm93IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY29sdW1uIiwibGVuZ3RoIiwiZGlyZWN0aW9uIiwicGxhY2VTaGlwIiwiZSIsIm1lc3NhZ2UiLCJpbmNsdWRlcyIsImlzQXJteUNvbXBsZXRlIiwiY29tcHV0ZXJTaGlwc0luZm8iLCJnZXRTaGlwcyIsInJlbW92ZVNoaXAiLCJ0YWtlVHVybiIsImF0dGFja1JhbmRvbUNlbGwiLCJhdHRhY2tSZXN1bHQiLCJyZWNlaXZlQXR0YWNrIiwic3ltYm9sIiwiYXR0YWNrUGxheWVyIiwidXBkYXRlTmV4dEF0dGFja0Nvb3JkaW5hdGVzIiwicGIiLCJjb25zb2xlIiwibG9nIiwibmVhckNlbGxzIiwiY2VsbHNDb3VudGVyIiwicHVzaCIsImNlbGwiLCJpIiwiYWxsU2hpcHNTdW5rIiwiZ2V0V2lubmVyIiwicmVzZXQiLCJ1bmRlZmluZWQiLCJTaGlwIiwiX2JvYXJkIiwiX3NoaXBzIiwidHlwZTEiLCJzaGlwcyIsIm1heCIsInR5cGUyIiwidHlwZTMiLCJ0eXBlNCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInNoaXBzQ2xvbmUiLCJrZXkiLCJmb3JFYWNoIiwic2hpcCIsImNsb25lIiwiZ2V0TGVuZ3RoIiwiZ2V0Q29vcnMiLCJnZXRIaXRzIiwiaGl0IiwiZ2V0Qm9hcmRBbmRTaGlwcyIsImJvYXJkQ29weSIsImN1cnJlbnRTaGlwIiwic2hpcENvb3JzIiwiY29vcnMiLCJjb29yZGluYXRlcyIsImlzTmFOIiwiTnVtYmVyIiwiRXJyb3IiLCJzaGlwQ29vcmRpbmF0ZXMiLCJjb29yc0NvcHkiLCJjdXJyZW50Q29vciIsIm5ld1NoaXAiLCJuZXdTaGlwQ29vcnMiLCJlcnJvck1zZyIsImZpbHRlcmVkU2hpcHMiLCJqIiwiZmlsdGVyIiwic2hpcHNMb29wIiwicmVzdWx0TXNnIiwicmVkdWNlIiwiYWNjIiwiY3VycmVudCIsInNsaWNlIiwidHlwZUxvb3AiLCJpc1N1bmsiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3B1Qm9hcmRDb250YWluZXIiLCJjcHVCb2FyZCIsImJ1dHRvbnNDb250YWluZXIiLCJzaGlwVGFibGVDb3VudGVycyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJlcnJvck1lc3NhZ2UiLCJzdGFydEJ0biIsInBsYXllckJvYXJkQ2VsbHMiLCJjcHVCb2FyZENlbGxzIiwic2hpcHNJbmZvIiwicHJldmlvdXNDbGlja2VkQnRuIiwiY3VycmVudENlbGwiLCJjZWxsc1RvSGlnaGxpZ2h0IiwiY2VsbEJ0biIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJkYXRhc2V0IiwiZmlsbGVkIiwiYXBwZW5kIiwiY2xvbmVOb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNsaWNrZWRCdXR0b25zIiwic2hvd1ByZXZpZXdIYW5kbGVyIiwicmVtb3ZlU2hpcFByZXZpZXciLCJwbGFjZU5ld1NoaXAiLCJ3aW5kb3ciLCJyb3RhdGVTaGlwIiwiaW5pdGlhbGl6ZUdhbWUiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJpZCIsInNob3dTaGlwUHJldmlldyIsIm5vZGUiLCJsZW5ndGhMb29wIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsImJvcmRlckNvbG9yIiwidGV4dENvbnRlbnQiLCJkaXNhYmxlZCIsInVwZGF0ZVBsYXllckJvYXJkIiwidXBkYXRlU2hpcHNUYWJsZSIsInZpc2liaWxpdHkiLCJib2FyZCIsInNlYXJjaCIsImluZGV4IiwibXNnIiwic2hpcEJ1dHRvbnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicHJldmVudERlZmF1bHQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicGFyZW50RWxlbWVudCIsImRpc3BsYXkiLCJhdHRhY2tDcHVCb2FyZCIsInR1cm5SZXN1bHQiLCJ1cGRhdGVDcHVCb2FyZCIsImRpdiIsInAiLCJidXR0b24iLCJib2R5IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJhZnRlciIsInJlc2V0R2FtZSIsIm5leHRFbGVtZW50U2libGluZyIsImNvdW50ZXIiLCJfY29vcmRpbmF0ZXMiLCJfbGVuZ3RoIiwiX2hpdHNDb3VudGVyIl0sInNvdXJjZVJvb3QiOiIifQ==