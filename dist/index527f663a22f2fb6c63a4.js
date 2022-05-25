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
playerBoard.addEventListener("mouseover", function (e) {
  return showShipPreview(e.target);
});
playerBoard.addEventListener("mouseout", removeShipPreview);
playerBoard.addEventListener("click", placeNewShip);
playerBoard.addEventListener("contextmenu", removeShip);
window.addEventListener("keydown", changeOrientation);

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
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  line-height: 1;\n  background-color: black;\n  color: #1cb517;\n  margin: 16px;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\np {\n  line-height: 1.5;\n}\n\n.instructions {\n  padding: 1rem;\n  border: 1px solid #1cb517;\n  margin-top: 3rem;\n}\n.instructions h1 {\n  font-size: 1.4rem;\n}\n.instructions h2 {\n  font-size: 1.2rem;\n}\n.instructions h1, .instructions h2 {\n  margin: 1rem 0;\n}\n.instructions h1:first-child, .instructions h2:first-child {\n  margin-top: 0;\n}\n.instructions li {\n  margin-bottom: 1rem;\n}\n.instructions li:last-child {\n  margin: 0;\n}\n\n.board-section {\n  margin-bottom: 3rem;\n}\n.board-section > h1 {\n  text-align: center;\n  text-transform: uppercase;\n  font-size: 1.5rem;\n}\n\n.board {\n  font-size: 18px;\n  display: grid;\n  grid-template-columns: 30px auto;\n  justify-content: center;\n}\n\n.board__letters-container {\n  display: grid;\n  gap: 5px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n  grid-column: 2;\n  grid-row: 1;\n  margin-bottom: 10px;\n  margin-left: 10px;\n}\n.board__letters-container .board__cell {\n  border-top: none;\n  border-right: none;\n  border-left: none;\n}\n.board__letters-container .board__cell:nth-child(1)::before {\n  content: \"1\";\n}\n.board__letters-container .board__cell:nth-child(2)::before {\n  content: \"2\";\n}\n.board__letters-container .board__cell:nth-child(3)::before {\n  content: \"3\";\n}\n.board__letters-container .board__cell:nth-child(4)::before {\n  content: \"4\";\n}\n.board__letters-container .board__cell:nth-child(5)::before {\n  content: \"5\";\n}\n.board__letters-container .board__cell:nth-child(6)::before {\n  content: \"6\";\n}\n.board__letters-container .board__cell:nth-child(7)::before {\n  content: \"7\";\n}\n.board__letters-container .board__cell:nth-child(8)::before {\n  content: \"8\";\n}\n.board__letters-container .board__cell:nth-child(9)::before {\n  content: \"9\";\n}\n.board__letters-container .board__cell:nth-child(10)::before {\n  content: \"10\";\n}\n\n.board__digits-container {\n  display: grid;\n  gap: 5px;\n  grid-template-columns: 30px;\n  grid-auto-rows: 30px;\n  grid-column: 1;\n  grid-row: 2;\n}\n.board__digits-container .board__cell {\n  border-top: none;\n  border-bottom: none;\n  border-left: none;\n}\n.board__digits-container .board__cell:nth-child(1)::before {\n  content: \"a\";\n}\n.board__digits-container .board__cell:nth-child(2)::before {\n  content: \"b\";\n}\n.board__digits-container .board__cell:nth-child(3)::before {\n  content: \"c\";\n}\n.board__digits-container .board__cell:nth-child(4)::before {\n  content: \"d\";\n}\n.board__digits-container .board__cell:nth-child(5)::before {\n  content: \"e\";\n}\n.board__digits-container .board__cell:nth-child(6)::before {\n  content: \"f\";\n}\n.board__digits-container .board__cell:nth-child(7)::before {\n  content: \"g\";\n}\n.board__digits-container .board__cell:nth-child(8)::before {\n  content: \"h\";\n}\n.board__digits-container .board__cell:nth-child(9)::before {\n  content: \"i\";\n}\n.board__digits-container .board__cell:nth-child(10)::before {\n  content: \"j\";\n}\n\n.board__cell {\n  border: 1px solid #1cb517;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.board__board {\n  grid-row: 2;\n  margin-left: 10px;\n  display: grid;\n  gap: 5px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n}\n.board__board .board__cell:hover {\n  background-color: #1cb517;\n  color: black;\n}\n\n#error-message {\n  font-size: 1rem;\n  grid-column: 1/-1;\n  margin-top: 1rem;\n  margin-left: 0.5rem;\n}\n\n.player-buttons ul {\n  margin: 2rem 0;\n}\n.player-buttons ul li {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\n.ships-table {\n  margin-bottom: 2rem;\n}\n.ships-table table {\n  border: 1px solid #1cb517;\n}\n.ships-table td, .ships-table th {\n  padding: 0.5rem;\n  border: 1px solid #1cb517;\n}\n\n#start-button {\n  visibility: hidden;\n}\n\n.button {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  background-color: black;\n  color: #1cb517;\n  padding: 0.5rem 0.8rem;\n  border: 1px solid #1cb517;\n  cursor: pointer;\n}\n.button:hover {\n  background-color: #1cb517;\n  color: black;\n}\n.button--highlighted {\n  background-color: #1cb517;\n  color: black;\n}\n.button:disabled {\n  opacity: 0.4;\n}\n\n@media only screen and (min-width: 800px) {\n  .player-board {\n    max-width: 1200px;\n    margin: 0 auto;\n    display: grid;\n    column-gap: 1rem;\n    grid-template-columns: repeat(3, 1fr);\n  }\n  .player-board h1 {\n    grid-column: 1/-1;\n    grid-row: 1;\n  }\n  .player-board .board {\n    grid-column: 2/3;\n    grid-row: 2;\n  }\n  .player-board .player-buttons {\n    grid-column: 3/4;\n    grid-row: 2;\n  }\n\n  .player-buttons ul {\n    margin: 0;\n    margin-bottom: 2rem;\n  }\n  .player-buttons ul li {\n    display: block;\n  }\n  .player-buttons .button {\n    display: block;\n    width: 100%;\n  }\n}\n@media only screen and (min-width: 1100px) {\n  .instructions {\n    margin: 0;\n    max-width: 280px;\n    position: fixed;\n    bottom: 16px;\n    left: 16px;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/_reset.scss","webpack://./src/scss/styles.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_instructions.scss","webpack://./src/scss/_board.scss","webpack://./src/scss/_buttons.scss","webpack://./src/scss/_media-queries.scss"],"names":[],"mappings":"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","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n@use './variables' as *;\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, center,\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed, \r\nfigure, figcaption, footer, header, hgroup, \r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tfont-size: 100%;\r\n\tfont: inherit;\r\n\tvertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure, \r\nfooter, header, hgroup, menu, nav, section {\r\n\tdisplay: block;\r\n}\r\nbody {\r\n\tfont-family: monospace;\r\n   text-shadow: 0 0 10px $green;\r\n\tline-height: 1;\r\n   background-color: black;\r\n   color: $green;\r\n\tmargin: 16px;\r\n}\r\nol, ul {\r\n\tlist-style: none;\r\n}\r\nblockquote, q {\r\n\tquotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n\tcontent: '';\r\n\tcontent: none;\r\n}\r\ntable {\r\n\tborder-collapse: collapse;\r\n\tborder-spacing: 0;\r\n}\r\np {\r\n\tline-height: 1.5;\r\n}","/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  line-height: 1;\n  background-color: black;\n  color: #1cb517;\n  margin: 16px;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\np {\n  line-height: 1.5;\n}\n\n.instructions {\n  padding: 1rem;\n  border: 1px solid #1cb517;\n  margin-top: 3rem;\n}\n.instructions h1 {\n  font-size: 1.4rem;\n}\n.instructions h2 {\n  font-size: 1.2rem;\n}\n.instructions h1, .instructions h2 {\n  margin: 1rem 0;\n}\n.instructions h1:first-child, .instructions h2:first-child {\n  margin-top: 0;\n}\n.instructions li {\n  margin-bottom: 1rem;\n}\n.instructions li:last-child {\n  margin: 0;\n}\n\n.board-section {\n  margin-bottom: 3rem;\n}\n.board-section > h1 {\n  text-align: center;\n  text-transform: uppercase;\n  font-size: 1.5rem;\n}\n\n.board {\n  font-size: 18px;\n  display: grid;\n  grid-template-columns: 30px auto;\n  justify-content: center;\n}\n\n.board__letters-container {\n  display: grid;\n  gap: 5px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n  grid-column: 2;\n  grid-row: 1;\n  margin-bottom: 10px;\n  margin-left: 10px;\n}\n.board__letters-container .board__cell {\n  border-top: none;\n  border-right: none;\n  border-left: none;\n}\n.board__letters-container .board__cell:nth-child(1)::before {\n  content: \"1\";\n}\n.board__letters-container .board__cell:nth-child(2)::before {\n  content: \"2\";\n}\n.board__letters-container .board__cell:nth-child(3)::before {\n  content: \"3\";\n}\n.board__letters-container .board__cell:nth-child(4)::before {\n  content: \"4\";\n}\n.board__letters-container .board__cell:nth-child(5)::before {\n  content: \"5\";\n}\n.board__letters-container .board__cell:nth-child(6)::before {\n  content: \"6\";\n}\n.board__letters-container .board__cell:nth-child(7)::before {\n  content: \"7\";\n}\n.board__letters-container .board__cell:nth-child(8)::before {\n  content: \"8\";\n}\n.board__letters-container .board__cell:nth-child(9)::before {\n  content: \"9\";\n}\n.board__letters-container .board__cell:nth-child(10)::before {\n  content: \"10\";\n}\n\n.board__digits-container {\n  display: grid;\n  gap: 5px;\n  grid-template-columns: 30px;\n  grid-auto-rows: 30px;\n  grid-column: 1;\n  grid-row: 2;\n}\n.board__digits-container .board__cell {\n  border-top: none;\n  border-bottom: none;\n  border-left: none;\n}\n.board__digits-container .board__cell:nth-child(1)::before {\n  content: \"a\";\n}\n.board__digits-container .board__cell:nth-child(2)::before {\n  content: \"b\";\n}\n.board__digits-container .board__cell:nth-child(3)::before {\n  content: \"c\";\n}\n.board__digits-container .board__cell:nth-child(4)::before {\n  content: \"d\";\n}\n.board__digits-container .board__cell:nth-child(5)::before {\n  content: \"e\";\n}\n.board__digits-container .board__cell:nth-child(6)::before {\n  content: \"f\";\n}\n.board__digits-container .board__cell:nth-child(7)::before {\n  content: \"g\";\n}\n.board__digits-container .board__cell:nth-child(8)::before {\n  content: \"h\";\n}\n.board__digits-container .board__cell:nth-child(9)::before {\n  content: \"i\";\n}\n.board__digits-container .board__cell:nth-child(10)::before {\n  content: \"j\";\n}\n\n.board__cell {\n  border: 1px solid #1cb517;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.board__board {\n  grid-row: 2;\n  margin-left: 10px;\n  display: grid;\n  gap: 5px;\n  grid-template-columns: repeat(10, 30px);\n  grid-auto-rows: 30px;\n}\n.board__board .board__cell:hover {\n  background-color: #1cb517;\n  color: black;\n}\n\n#error-message {\n  font-size: 1rem;\n  grid-column: 1/-1;\n  margin-top: 1rem;\n  margin-left: 0.5rem;\n}\n\n.player-buttons ul {\n  margin: 2rem 0;\n}\n.player-buttons ul li {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\n.ships-table {\n  margin-bottom: 2rem;\n}\n.ships-table table {\n  border: 1px solid #1cb517;\n}\n.ships-table td, .ships-table th {\n  padding: 0.5rem;\n  border: 1px solid #1cb517;\n}\n\n#start-button {\n  visibility: hidden;\n}\n\n.button {\n  font-family: monospace;\n  text-shadow: 0 0 10px #1cb517;\n  background-color: black;\n  color: #1cb517;\n  padding: 0.5rem 0.8rem;\n  border: 1px solid #1cb517;\n  cursor: pointer;\n}\n.button:hover {\n  background-color: #1cb517;\n  color: black;\n}\n.button--highlighted {\n  background-color: #1cb517;\n  color: black;\n}\n.button:disabled {\n  opacity: 0.4;\n}\n\n@media only screen and (min-width: 800px) {\n  .player-board {\n    max-width: 1200px;\n    margin: 0 auto;\n    display: grid;\n    column-gap: 1rem;\n    grid-template-columns: repeat(3, 1fr);\n  }\n  .player-board h1 {\n    grid-column: 1/-1;\n    grid-row: 1;\n  }\n  .player-board .board {\n    grid-column: 2/3;\n    grid-row: 2;\n  }\n  .player-board .player-buttons {\n    grid-column: 3/4;\n    grid-row: 2;\n  }\n\n  .player-buttons ul {\n    margin: 0;\n    margin-bottom: 2rem;\n  }\n  .player-buttons ul li {\n    display: block;\n  }\n  .player-buttons .button {\n    display: block;\n    width: 100%;\n  }\n}\n@media only screen and (min-width: 1100px) {\n  .instructions {\n    margin: 0;\n    max-width: 280px;\n    position: fixed;\n    bottom: 16px;\n    left: 16px;\n  }\n}","$green: #1cb517;","@use './variables' as *;\r\n\r\n.instructions {\r\n   padding: 1rem;\r\n   border: 1px solid $green;\r\n   margin-top: 3rem;\r\n   h1 {\r\n      font-size: 1.4rem;\r\n   }\r\n   h2 {\r\n      font-size: 1.2rem;\r\n   }\r\n   h1, h2 {\r\n      margin: 1rem 0;\r\n   }\r\n   h1:first-child, h2:first-child {\r\n      margin-top: 0;\r\n   }\r\n   li {\r\n      margin-bottom: 1rem;\r\n      &:last-child {\r\n         margin: 0;\r\n      }\r\n   }\r\n}","@use 'sass:list';\r\n@use './variables' as *;\r\n\r\n$cellWidth: 30px;\r\n\r\n.board-section {\r\n   margin-bottom: 3rem;\r\n   & > h1 {\r\n      text-align: center;\r\n      text-transform: uppercase;\r\n      font-size: 1.5rem;\r\n   }\r\n}\r\n.board {\r\n   font-size: 18px;\r\n   display: grid;\r\n   grid-template-columns: $cellWidth auto;\r\n   justify-content: center;\r\n}\r\n.board__letters-container {\r\n   display: grid;\r\n   gap: 5px;\r\n   grid-template-columns: repeat(10, $cellWidth);\r\n   grid-auto-rows: $cellWidth;\r\n   grid-column: 2;\r\n   grid-row: 1;\r\n   margin-bottom: 10px;\r\n   margin-left: 10px;\r\n   .board__cell {\r\n      border-top: none;\r\n      border-right: none;\r\n      border-left: none;\r\n\r\n      @for $i from 1 through 10 {\r\n         &:nth-child(#{$i})::before {\r\n            content: '#{$i}'; \r\n         }\r\n      }\r\n   }\r\n}\r\n.board__digits-container {\r\n   display: grid;\r\n   gap: 5px;\r\n   grid-template-columns: $cellWidth;\r\n   grid-auto-rows: $cellWidth;\r\n   grid-column: 1;\r\n   grid-row: 2;\r\n   .board__cell {\r\n      border-top: none;\r\n      border-bottom: none;\r\n      border-left: none;\r\n\r\n      $letters: 'a','b','c','d','e','f','g','h','i','j';\r\n\r\n      @for $i from 1 through 10 {\r\n         &:nth-child(#{$i})::before {\r\n            content: '#{list.nth($letters, $i)}'; \r\n         }\r\n      }\r\n   }\r\n}\r\n.board__cell {\r\n   border: 1px solid $green;\r\n   display: flex;\r\n   justify-content: center;\r\n   align-items: center;\r\n}\r\n.board__board {\r\n   grid-row: 2;\r\n   margin-left: 10px;\r\n   display: grid;\r\n   gap: 5px;\r\n   grid-template-columns: repeat(10, $cellWidth);\r\n   grid-auto-rows: $cellWidth;\r\n   .board__cell {\r\n      &:hover {\r\n         background-color: $green;\r\n         color: black;\r\n      }\r\n   }\r\n}\r\n#error-message {\r\n   font-size: 1rem;\r\n   grid-column: 1 / -1;\r\n   margin-top: 1rem;\r\n   margin-left: .5rem;\r\n}\r\n.player-buttons {\r\n   ul {\r\n      margin: 2rem 0;\r\n   }\r\n   ul li {\r\n      display: inline-block;\r\n      margin-bottom: .5rem;\r\n   }\r\n}\r\n.ships-table {\r\n   margin-bottom: 2rem;\r\n\r\n   table {\r\n      border: 1px solid $green;\r\n   }\r\n   td, th {\r\n      padding: .5rem;\r\n      border: 1px solid $green;\r\n   }\r\n}\r\n#start-button {\r\n   visibility: hidden;\r\n}\r\n","@use './variables' as *;\r\n\r\n.button {\r\n   font-family: monospace;\r\n   text-shadow: 0 0 10px $green;\r\n   background-color: black;\r\n   color: $green;\r\n   padding: .5rem .8rem;\r\n   border: 1px solid $green;\r\n   cursor: pointer;\r\n   &:hover {\r\n      background-color: $green;\r\n      color: black;\r\n   }\r\n   &--highlighted {\r\n      background-color: $green;\r\n      color: black;\r\n   }\r\n   &:disabled {\r\n      opacity: .4;\r\n   }\r\n}","@media only screen and (min-width: 800px) {\r\n   .player-board {\r\n      max-width: 1200px;\r\n      margin: 0 auto;\r\n      display: grid;\r\n      column-gap: 1rem;\r\n      grid-template-columns: repeat(3, 1fr);\r\n      h1 {\r\n         grid-column: 1 / -1;\r\n         grid-row: 1;\r\n      }\r\n      .board {\r\n         grid-column: 2 / 3;\r\n         grid-row: 2;\r\n      }\r\n      .player-buttons {\r\n         grid-column: 3 / 4;\r\n         grid-row: 2;\r\n      }\r\n   }\r\n   .player-buttons {\r\n      ul {\r\n         margin: 0;\r\n         margin-bottom: 2rem;\r\n      }\r\n      ul li {\r\n         display: block;\r\n      }\r\n      .button {\r\n         display: block;\r\n         width: 100%;\r\n      }\r\n   }\r\n}\r\n@media only screen and (min-width: 1100px) {\r\n   .instructions {\r\n      margin: 0;\r\n      max-width: 280px;\r\n      position: fixed;\r\n      bottom: 16px;\r\n      left: 16px;\r\n   }\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TSxVQUFVLFVBQVUsV0FBVyxZQUFZLFdBQVcsVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE9BQU8sTUFBTSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxVQUFVLFVBQVUsV0FBVyxZQUFZLE1BQU0sTUFBTSxZQUFZLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLE1BQU0sTUFBTSxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxPQUFPLE1BQU0sS0FBSyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLE1BQU0sTUFBTSxXQUFXLFVBQVUsT0FBTyxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFB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QXlEO0FBQ3pELElBQUk7O0FBRUo7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2Nzcy9zdHlsZXMuc2NzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3NzL3N0eWxlcy5zY3NzPzMyMWYiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xyXG5cclxuY29uc3QgR2FtZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgIGxldCBfd2lubmVyTWVzc2FnZTtcclxuICAgbGV0IF9jYW5HYW1lU3RhcnQgPSBmYWxzZTtcclxuICAgbGV0IF9jb21wdXRlckJvYXJkID0gR2FtZWJvYXJkKCk7XHJcbiAgIGxldCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xyXG5cclxuICAgY29uc3QgZ2V0Q29tcHV0ZXJCb2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF9jb21wdXRlckJvYXJkLmdldEJvYXJkKCk7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgcGxhY2VFbmVteUFybXkgPSBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBwbGFjZSBzaGlwc1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgICAgICBsZXQgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gdHlwZS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBkaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSA9PT0gMCA/IFwidmVyXCIgOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgX2NvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtyb3csIGNvbHVtbl0sIGxlbmd0aCwgZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgcGxhY2VFbmVteUFybXkodHlwZSk7XHJcbiAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgaWYgKCFlLm1lc3NhZ2UuaW5jbHVkZXMoXCJFeGNlZWRlZCBudW1iZXIgb2Ygc2hpcHNcIikpIHtcclxuICAgICAgICAgICAgICAgcGxhY2VFbmVteUFybXkodHlwZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiBcImZpbmlzaGVkXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gZmlsbCBjb21wdXRlckJvYXJkIHdpdGggc2hpcHNcclxuICAgICAgaWYgKCFfY29tcHV0ZXJCb2FyZC5pc0FybXlDb21wbGV0ZSgpKSB7XHJcbiAgICAgICAgIGxldCBjb21wdXRlclNoaXBzSW5mbyA9IF9jb21wdXRlckJvYXJkLmdldFNoaXBzKCk7XHJcblxyXG4gICAgICAgICBmb3IgKGxldCB0eXBlIGluIGNvbXB1dGVyU2hpcHNJbmZvKSB7XHJcbiAgICAgICAgICAgIHBsYWNlRW5lbXlBcm15KGNvbXB1dGVyU2hpcHNJbmZvW3R5cGVdKTtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGxheWVyQm9hcmQuaXNBcm15Q29tcGxldGUoKSkge1xyXG4gICAgICAgICBfY2FuR2FtZVN0YXJ0ID0gdHJ1ZTtcclxuICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICB9O1xyXG5cclxuICAgY29uc3QgdGFrZVR1cm4gPSBmdW5jdGlvbiAocm93LCBjZWxsKSB7XHJcbiAgICAgIGlmICghX2NhbkdhbWVTdGFydCkgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICBpZiAoIV93aW5uZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgIGxldCBhdHRhY2tQbGF5ZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgICAgICAgIGxldCBjZWxsID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG5cclxuICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY2VsbCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICBlLm1lc3NhZ2UuaW5jbHVkZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgIFwiWW91IGFscmVhZHkgYXR0YWNrZWQgdGhlIGZvbGxvd2luZyBjb29yZGluYXRlc1wiXHJcbiAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgIGF0dGFja1BsYXllcigpO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgIC8vIGF0dGFjayBjb21wdXRlclxyXG4gICAgICAgICBfY29tcHV0ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY2VsbCk7XHJcblxyXG4gICAgICAgICBpZiAoX2NvbXB1dGVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcclxuICAgICAgICAgICAgX3dpbm5lck1lc3NhZ2UgPSBcIlBsYXllciB3b24gdGhlIG1hdGNoXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBfd2lubmVyTWVzc2FnZTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLy8gYXR0YWNrIHBsYXllclxyXG4gICAgICAgICBhdHRhY2tQbGF5ZXIoKTtcclxuXHJcbiAgICAgICAgIGlmICh0aGlzLnBsYXllckJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIF93aW5uZXJNZXNzYWdlID0gXCJDb21wdXRlciB3b24gdGhlIG1hdGNoXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBfd2lubmVyTWVzc2FnZTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBfd2lubmVyTWVzc2FnZTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGdldFdpbm5lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF93aW5uZXJNZXNzYWdlO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgcmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIF9jYW5HYW1lU3RhcnQgPSBmYWxzZTtcclxuICAgICAgX2NvbXB1dGVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcclxuICAgICAgdGhpcy5wbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xyXG4gICB9O1xyXG5cclxuICAgcmV0dXJuIHtcclxuICAgICAgcGxheWVyQm9hcmQsXHJcbiAgICAgIGdldENvbXB1dGVyQm9hcmQsXHJcbiAgICAgIGluaXQsXHJcbiAgICAgIHRha2VUdXJuLFxyXG4gICAgICBnZXRXaW5uZXIsXHJcbiAgICAgIHJlc2V0LFxyXG4gICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcclxuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xyXG5cclxuY29uc3QgR2FtZWJvYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gICBsZXQgX2JvYXJkID0gW107XHJcbiAgIGxldCBfc2hpcHMgPSB7XHJcbiAgICAgIHR5cGUxOiB7IHNoaXBzOiBbXSwgbGVuZ3RoOiA1LCBtYXg6IDEgfSxcclxuICAgICAgdHlwZTI6IHsgc2hpcHM6IFtdLCBsZW5ndGg6IDQsIG1heDogMiB9LFxyXG4gICAgICB0eXBlMzogeyBzaGlwczogW10sIGxlbmd0aDogMywgbWF4OiA3IH0sXHJcbiAgICAgIHR5cGU0OiB7IHNoaXBzOiBbXSwgbGVuZ3RoOiAyLCBtYXg6IDUgfSxcclxuICAgfTtcclxuXHJcbiAgIC8vIGNyZWF0ZSAxMCByb3dzIGFuZCAxMCBjZWxscyBmb3IgX2JvYXJkXHJcbiAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xyXG4gICAgICBfYm9hcmQucHVzaChbXSk7XHJcblxyXG4gICAgICBmb3IgKGxldCBjZWxsID0gMDsgY2VsbCA8IDEwOyBjZWxsKyspIHtcclxuICAgICAgICAgX2JvYXJkW3Jvd10ucHVzaChcIn5cIik7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgY29uc3QgZ2V0Qm9hcmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9ib2FyZCkpO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgZ2V0U2hpcHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBzaGlwc0Nsb25lID0ge307XHJcblxyXG4gICAgICBmb3IgKGxldCBrZXkgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIHNoaXBzQ2xvbmVba2V5XSA9IHt9O1xyXG4gICAgICAgICBzaGlwc0Nsb25lW2tleV0uc2hpcHMgPSBbXTtcclxuICAgICAgICAgc2hpcHNDbG9uZVtrZXldLmxlbmd0aCA9IF9zaGlwc1trZXldLmxlbmd0aDtcclxuICAgICAgICAgc2hpcHNDbG9uZVtrZXldLm1heCA9IF9zaGlwc1trZXldLm1heDtcclxuXHJcbiAgICAgICAgIF9zaGlwc1trZXldLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICAgICAgbGV0IGNsb25lID0gU2hpcChzaGlwLmdldExlbmd0aCgpLCBzaGlwLmdldENvb3JzKCkpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldEhpdHMoKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgIGNsb25lLmhpdCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzaGlwc0Nsb25lW2tleV0uc2hpcHMucHVzaChjbG9uZSk7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gc2hpcHNDbG9uZTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGdldEJvYXJkQW5kU2hpcHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBib2FyZENvcHkgPSB0aGlzLmdldEJvYXJkKCk7XHJcblxyXG4gICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFNoaXAgPSBfc2hpcHNbdHlwZV0uc2hpcHNbaV07XHJcbiAgICAgICAgICAgIGxldCBzaGlwQ29vcnMgPSBjdXJyZW50U2hpcC5nZXRDb29ycygpO1xyXG5cclxuICAgICAgICAgICAgc2hpcENvb3JzLmZvckVhY2goKGNvb3JzKSA9PiB7XHJcbiAgICAgICAgICAgICAgIGxldCBbcm93LCBjb2x1bW5dID0gY29vcnM7XHJcblxyXG4gICAgICAgICAgICAgICBpZiAoYm9hcmRDb3B5W3Jvd11bY29sdW1uXSA9PT0gXCJ+XCIpIHtcclxuICAgICAgICAgICAgICAgICAgYm9hcmRDb3B5W3Jvd11bY29sdW1uXSA9IFwic1wiO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBib2FyZENvcHk7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZXMgPSBbMCwgMF0sIGxlbmd0aCA9IDIsIGRpcmVjdGlvbikge1xyXG4gICAgICBpZiAoaXNOYU4oTnVtYmVyKGNvb3JkaW5hdGVzWzBdKSkgfHwgaXNOYU4oTnVtYmVyKGNvb3JkaW5hdGVzWzFdKSkpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29vcmRpbmF0ZXMgc2hvdWxkIGJlIG51bWJlcnNcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc05hTihOdW1iZXIobGVuZ3RoKSkgfHwgbGVuZ3RoID4gNSB8fCBsZW5ndGggPCAyKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxlbmd0aCBzaG91bGQgYmUgYSBudW1iZXIgYmV0d2VlbiAyIGFuZCA1XCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgc2hpcENvb3JkaW5hdGVzID0gW1suLi5jb29yZGluYXRlc11dO1xyXG5cclxuICAgICAgLy8gZ2VuZXJhdGUgY29vcmRpbmF0ZXMgdGhhdCBleHBhbmQgYmFzZWQgb24gbGVuZ3RoIGFuZCBkaXJlY3Rpb25cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgLy8gZXhwYW5kIGNvb3JkaW5hdGVzIHZlcnRpY2FsbHlcclxuICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ2ZXJcIikge1xyXG4gICAgICAgICAgICBsZXQgY29vcnNDb3B5ID0gWy4uLnNoaXBDb29yZGluYXRlc1tpXV07XHJcbiAgICAgICAgICAgIGNvb3JzQ29weVswXSsrO1xyXG4gICAgICAgICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChjb29yc0NvcHkpO1xyXG5cclxuICAgICAgICAgICAgLy8gZXhwYW5kIGNvb3JkaW5hdGVzIGhvcml6b250YWxseVxyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgY29vcnNDb3B5ID0gWy4uLnNoaXBDb29yZGluYXRlc1tpXV07XHJcbiAgICAgICAgICAgIGNvb3JzQ29weVsxXSsrO1xyXG4gICAgICAgICAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaChjb29yc0NvcHkpO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoZWNrIGlmIHNoaXBDb29yZGluYXRlcyBhcmUgdmFsaWRcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgbGV0IGN1cnJlbnRDb29yID0gc2hpcENvb3JkaW5hdGVzW2ldO1xyXG5cclxuICAgICAgICAgaWYgKGN1cnJlbnRDb29yWzBdID4gOSB8fCBjdXJyZW50Q29vclswXSA8IDApXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgZXhwYW5kcyB0byB3cm9uZyBjb29yZGluYXRlc1wiKTtcclxuICAgICAgICAgaWYgKGN1cnJlbnRDb29yWzFdID4gOSB8fCBjdXJyZW50Q29vclsxXSA8IDApXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgZXhwYW5kcyB0byB3cm9uZyBjb29yZGluYXRlc1wiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IG5ld1NoaXAgPSBTaGlwKGxlbmd0aCwgc2hpcENvb3JkaW5hdGVzKTtcclxuXHJcbiAgICAgIC8vIGNoZWNrIGlmIG5ld1NoaXAgY2FuIGJlIGFkZGVkIHRvIF9zaGlwc1xyXG4gICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICBpZiAoX3NoaXBzW3R5cGVdLmxlbmd0aCA9PT0gbmV3U2hpcC5nZXRMZW5ndGgoKSkge1xyXG4gICAgICAgICAgICBpZiAoX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aCA8IF9zaGlwc1t0eXBlXS5tYXgpIHtcclxuICAgICAgICAgICAgICAgLy8gY2hlY2sgZXZlcnkgc2hpcCdzIGNvb3JkaW5hdGVzIHRvIHNlZSBpZiBuZXdTaGlwIGRvZXMgbm90IGhhdmVcclxuICAgICAgICAgICAgICAgLy8gdGhlIHNhbWUgY29vcmRpbmF0ZXMgb2YgYW5vdGhlciBzaGlwXHJcbiAgICAgICAgICAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgICAgICAgICAgIF9zaGlwc1t0eXBlXS5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHNoaXAuZ2V0Q29vcnMoKS5mb3JFYWNoKChzaGlwQ29vcnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2hpcC5nZXRDb29ycygpLmZvckVhY2goKG5ld1NoaXBDb29ycykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBDb29yc1swXSA9PT0gbmV3U2hpcENvb3JzWzBdICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBDb29yc1sxXSA9PT0gbmV3U2hpcENvb3JzWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBuZXcgc2hpcCBjYW5ub3QgYmUgcGxhY2Ugb3ZlciBhbm90aGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICBfc2hpcHNbdHlwZV0uc2hpcHMucHVzaChuZXdTaGlwKTtcclxuICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIGxldCBlcnJvck1zZyA9IGBFeGNlZWRlZCBudW1iZXIgb2Ygc2hpcHM6IG1heGltdW4gbnVtYmVyIGZvciAke2xlbmd0aH0gbGVuZ3RoIHNoaXBzIGlzICR7X3NoaXBzW3R5cGVdLm1heH1gO1xyXG4gICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICB9O1xyXG5cclxuICAgY29uc3QgcmVtb3ZlU2hpcCA9IGZ1bmN0aW9uIChyb3cgPSAwLCBjZWxsID0gMCkge1xyXG4gICAgICBsZXQgZmlsdGVyZWRTaGlwcztcclxuICAgICAgbGV0IGNvb3JzO1xyXG5cclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgLy8gc2VhcmNoIGFuZCBmaWx0ZXIgb3V0IHNoaXAgdGhhdCBoYXMgXCJyb3dcIiBhbmQgXCJjZWxsXCIgYXMgY29vcmRpbmF0ZXNcclxuICAgICAgICAgc2hpcHNMb29wOiBmb3IgKGxldCBpID0gMDsgaSA8IF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFNoaXAgPSBfc2hpcHNbdHlwZV0uc2hpcHNbaV07XHJcbiAgICAgICAgICAgIGxldCBzaGlwQ29vcnMgPSBjdXJyZW50U2hpcC5nZXRDb29ycygpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaGlwQ29vcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgaWYgKHNoaXBDb29yc1tqXVswXSA9PT0gcm93ICYmIHNoaXBDb29yc1tqXVsxXSA9PT0gY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICBmaWx0ZXJlZFNoaXBzID0gX3NoaXBzW3R5cGVdLnNoaXBzLmZpbHRlcihcclxuICAgICAgICAgICAgICAgICAgICAgKHNoaXApID0+IHNoaXAgIT09IGN1cnJlbnRTaGlwXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIGNvb3JzID0gc2hpcENvb3JzO1xyXG4gICAgICAgICAgICAgICAgICBicmVhayBzaGlwc0xvb3A7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgICAgIC8vIHVwZGF0ZSBfc2hpcHNbdHlwZV0uc2hpcHMgYXJyYXlcclxuICAgICAgICAgaWYgKGZpbHRlcmVkU2hpcHMpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdE1zZyA9IFwiUmVtb3ZlZCBzaGlwIHdpdGggdGhlIGZvbGxvd2luZyBjb29yZGluYXRlczogXCI7XHJcblxyXG4gICAgICAgICAgICByZXN1bHRNc2cgKz0gY29vcnNcclxuICAgICAgICAgICAgICAgLnJlZHVjZShcclxuICAgICAgICAgICAgICAgICAgKGFjYywgY3VycmVudCkgPT4gYWNjICsgYFske2N1cnJlbnRbMF19LCAke2N1cnJlbnRbMV19XSwgYCxcclxuICAgICAgICAgICAgICAgICAgXCJcIlxyXG4gICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgIC5zbGljZSgwLCAtMik7XHJcblxyXG4gICAgICAgICAgICBfc2hpcHNbdHlwZV0uc2hpcHMgPSBmaWx0ZXJlZFNoaXBzO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0TXNnO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBgVGhlcmUgaXMgbm8gc2hpcCBpbiBbJHtyb3d9LCR7Y2VsbH1dIGNvb3JkaW5hdGVzYDtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGlzQXJteUNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICBpZiAoX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aCA8IF9zaGlwc1t0eXBlXS5tYXgpIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCByZWNlaXZlQXR0YWNrID0gZnVuY3Rpb24gKHJvdyA9IDAsIGNlbGwgPSAwKSB7XHJcbiAgICAgIGxldCBzeW1ib2wgPSBcIm1cIjtcclxuXHJcbiAgICAgIGlmIChyb3cgPiA5IHx8IHJvdyA8IDAgfHwgY2VsbCA+IDkgfHwgY2VsbCA8IDApIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICBgUHJvdmlkZWQgY29vcmRpbmF0ZXMgYXJlIG5vdCB2YWxpZDogWyR7cm93fSwke2NlbGx9XWBcclxuICAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9ib2FyZFtyb3ddW2NlbGxdICE9PSBcIn5cIikge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgIGBZb3UgYWxyZWFkeSBhdHRhY2tlZCB0aGUgZm9sbG93aW5nIGNvb3JkaW5hdGVzOiBbJHtyb3d9LCR7Y2VsbH1dYFxyXG4gICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjaGVjayBpZiBhbnkgc2hpcCBoYXMgXCJyb3dcIiBhbmQgXCJjZWxsXCIgYXMgY29vcmRpbmF0ZXMgYW5kIGhpdCBpdFxyXG4gICAgICB0eXBlTG9vcDogZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfc2hpcHNbdHlwZV0uc2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTaGlwID0gX3NoaXBzW3R5cGVdLnNoaXBzW2ldO1xyXG4gICAgICAgICAgICBsZXQgc2hpcENvb3JzID0gY3VycmVudFNoaXAuZ2V0Q29vcnMoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2hpcENvb3JzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgIGlmIChzaGlwQ29vcnNbal1bMF0gPT09IHJvdyAmJiBzaGlwQ29vcnNbal1bMV0gPT09IGNlbGwpIHtcclxuICAgICAgICAgICAgICAgICAgY3VycmVudFNoaXAuaGl0KCk7XHJcbiAgICAgICAgICAgICAgICAgIHN5bWJvbCA9IFwiaFwiO1xyXG4gICAgICAgICAgICAgICAgICBicmVhayB0eXBlTG9vcDtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgX2JvYXJkW3Jvd11bY2VsbF0gPSBzeW1ib2w7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgYWxsU2hpcHNTdW5rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIV9zaGlwc1t0eXBlXS5zaGlwc1tpXS5pc1N1bmsoKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICB9O1xyXG5cclxuICAgcmV0dXJuIHtcclxuICAgICAgZ2V0Qm9hcmQsXHJcbiAgICAgIGdldFNoaXBzLFxyXG4gICAgICBnZXRCb2FyZEFuZFNoaXBzLFxyXG4gICAgICBwbGFjZVNoaXAsXHJcbiAgICAgIHJlbW92ZVNoaXAsXHJcbiAgICAgIGlzQXJteUNvbXBsZXRlLFxyXG4gICAgICByZWNlaXZlQXR0YWNrLFxyXG4gICAgICBhbGxTaGlwc1N1bmssXHJcbiAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XHJcbiIsImltcG9ydCBHYW1lIGZyb20gXCIuL2dhbWUuanNcIjtcclxuaW1wb3J0IFwiLi9zY3NzL3N0eWxlcy5zY3NzXCI7XHJcblxyXG5jb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyQm9hcmRcIik7XHJcbmNvbnN0IGNwdUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcHVCb2FyZFwiKTtcclxuY29uc3QgYnV0dG9uc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9ucy1jb250YWluZXJcIik7XHJcbmNvbnN0IHNoaXBUYWJsZUNvdW50ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBsYWNlZC1jb3VudGVyXCIpO1xyXG5jb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yLW1lc3NhZ2VcIik7XHJcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1idXR0b25cIik7XHJcblxyXG5jb25zdCBwbGF5ZXJCb2FyZENlbGxzID0gW107XHJcbmNvbnN0IGNwdUJvYXJkQ2VsbHMgPSBbXTtcclxuXHJcbmxldCBsZW5ndGggPSBudWxsO1xyXG5sZXQgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XHJcbmxldCBzaGlwc0luZm8gPSBudWxsO1xyXG5sZXQgcHJldmlvdXNDbGlja2VkQnRuID0gbnVsbDtcclxubGV0IGN1cnJlbnRDZWxsID0gbnVsbDtcclxubGV0IGNlbGxzVG9IaWdobGlnaHQgPSBbXTtcclxuXHJcbi8vIGdlbmVyYXRlIHBsYXllciBhbmQgY3B1IGNlbGxzXHJcbmZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xyXG4gICBwbGF5ZXJCb2FyZENlbGxzLnB1c2goW10pO1xyXG4gICBjcHVCb2FyZENlbGxzLnB1c2goW10pO1xyXG5cclxuICAgZm9yIChsZXQgY2VsbCA9IDA7IGNlbGwgPCAxMDsgY2VsbCsrKSB7XHJcbiAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgICAgZGl2LmNsYXNzTmFtZSA9IFwiYm9hcmRfX2NlbGxcIjtcclxuICAgICAgZGl2LmRhdGFzZXQucm93ID0gcm93O1xyXG4gICAgICBkaXYuZGF0YXNldC5jZWxsID0gY2VsbDtcclxuICAgICAgZGl2LmRhdGFzZXQuZmlsbGVkID0gXCJmYWxzZVwiO1xyXG4gICAgICBwbGF5ZXJCb2FyZC5hcHBlbmQoZGl2KTtcclxuICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddLnB1c2goZGl2KTtcclxuXHJcbiAgICAgIGxldCBjbG9uZSA9IGRpdi5jbG9uZU5vZGUoKTtcclxuICAgICAgY3B1Qm9hcmQuYXBwZW5kKGNsb25lKTtcclxuICAgICAgY3B1Qm9hcmRDZWxsc1tyb3ddLnB1c2goY2xvbmUpO1xyXG4gICB9XHJcbn1cclxuXHJcbmJ1dHRvbnNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrZWRCdXR0b25zKTtcclxucGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZSkgPT4gc2hvd1NoaXBQcmV2aWV3KGUudGFyZ2V0KSk7XHJcbnBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCByZW1vdmVTaGlwUHJldmlldyk7XHJcbnBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGFjZU5ld1NoaXApO1xyXG5wbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgcmVtb3ZlU2hpcCk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBjaGFuZ2VPcmllbnRhdGlvbik7XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVDbGlja2VkQnV0dG9ucyhlKSB7XHJcbiAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcbiAgIC8vIGhhbmRsZSBidXR0b25zIHRoYXQgY2hhbmdlIFwibGVuZ3RoXCIgdmFyaWFibGVcclxuICAgaWYgKHRhcmdldC5kYXRhc2V0Lmxlbmd0aCkge1xyXG4gICAgICBsZW5ndGggPSArdGFyZ2V0LmRhdGFzZXQubGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKHByZXZpb3VzQ2xpY2tlZEJ0bikge1xyXG4gICAgICAgICBwcmV2aW91c0NsaWNrZWRCdG4uY2xhc3NMaXN0LnJlbW92ZShcImJ1dHRvbi0taGlnaGxpZ2h0ZWRcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLS1oaWdobGlnaHRlZFwiKTtcclxuICAgICAgcHJldmlvdXNDbGlja2VkQnRuID0gdGFyZ2V0O1xyXG5cclxuICAgICAgLy8gaGFuZGxlIGJ1dHRvbiB0aGF0IGNoYW5nZXMgXCJkaXJlY3Rpb25cIiB2YXJpYWJsZVxyXG4gICB9IGVsc2UgaWYgKHRhcmdldC5pZCA9PT0gXCJyb3RhdGlvbi1idXR0dG9uXCIpIHtcclxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgICAgZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBkaXJlY3Rpb24gPSBcImhvcml6b250YWxcIjtcclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dTaGlwUHJldmlldyhub2RlKSB7XHJcbiAgIGlmIChsZW5ndGggJiYgbm9kZS5kYXRhc2V0LnJvdyAmJiBub2RlLmRhdGFzZXQuY2VsbCkge1xyXG4gICAgICBsZXQgeyByb3csIGNlbGwgfSA9IG5vZGUuZGF0YXNldDtcclxuXHJcbiAgICAgIGN1cnJlbnRDZWxsID0gbm9kZTtcclxuICAgICAgcm93ID0gK3JvdztcclxuICAgICAgY2VsbCA9ICtjZWxsO1xyXG5cclxuICAgICAgLy8gcG9wdWxhdGUgXCJjZWxsc1RvSGlnaGxpZ2h0XCIgYXJyYXlcclxuICAgICAgbGVuZ3RoTG9vcDogZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICBpZiAoIXBsYXllckJvYXJkQ2VsbHNbcm93XSB8fCAhcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdKSB7XHJcbiAgICAgICAgICAgIGJyZWFrIGxlbmd0aExvb3A7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGNlbGxzVG9IaWdobGlnaHQucHVzaChwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0pO1xyXG4gICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICAgICAgICBjZWxsKys7XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJvdysrO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHBhaW50IHByZXZpZXcgcmVkIGlmIHNoaXAgbGVuZ3RoIGRvZXMgbm90IGZpdFxyXG4gICAgICBpZiAoY2VsbHNUb0hpZ2hsaWdodC5sZW5ndGggPCBsZW5ndGgpIHtcclxuICAgICAgICAgY2VsbHNUb0hpZ2hsaWdodC5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjYjUxNzE3XCI7XHJcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuYm9yZGVyQ29sb3IgPSBcIiNiNTE3MTdcIjtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAvLyBwYWludCBwcmV2aWV3IGVpdGhlciBncmVlbiBvciByZWQgYmFzZWQgb24gZmlsbGVkIGF0dHJpYnV0ZSB2YWx1ZVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBjZWxsc1RvSGlnaGxpZ2h0LmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNlbGwuZGF0YXNldC5maWxsZWQgPT09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzFjYjUxN1wiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2I1MTcxN1wiO1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJvcmRlckNvbG9yID0gXCIjYjUxNzE3XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTaGlwUHJldmlldygpIHtcclxuICAgY2VsbHNUb0hpZ2hsaWdodC5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcclxuICAgICAgY2VsbC5zdHlsZS5jb2xvciA9IFwiXCI7XHJcbiAgICAgIGNlbGwuc3R5bGUuYm9yZGVyQ29sb3IgPSBcIlwiO1xyXG4gICB9KTtcclxuICAgY2VsbHNUb0hpZ2hsaWdodCA9IFtdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwbGFjZU5ld1NoaXAoZSkge1xyXG4gICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICBpZiAobGVuZ3RoICYmIHRhcmdldC5kYXRhc2V0LnJvdyAmJiB0YXJnZXQuZGF0YXNldC5jZWxsKSB7XHJcbiAgICAgIHNoaXBzSW5mbyA9IEdhbWUucGxheWVyQm9hcmQuZ2V0U2hpcHMoKTtcclxuICAgICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJcIjsgLy8gY2xlYXIgcHJldmlvdXMgZXJyb3IgbWVzc2FnZVxyXG5cclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBzaGlwc0luZm8pIHtcclxuICAgICAgICAgLy8gaWRlbnRpZnkgd2hhdCB0eXBlIG9mIHNoaXAgdGhlIHVzZXIgaXMgZ29pbmcgdG8gcGxhY2VcclxuICAgICAgICAgaWYgKHNoaXBzSW5mb1t0eXBlXS5sZW5ndGggPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoc2hpcHNJbmZvW3R5cGVdLnNoaXBzLmxlbmd0aCA8IHNoaXBzSW5mb1t0eXBlXS5tYXgpIHtcclxuICAgICAgICAgICAgICAgLy8gcGxhY2UgbmV3IHNoaXBcclxuICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgR2FtZS5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoXHJcbiAgICAgICAgICAgICAgICAgICAgIFsrdGFyZ2V0LmRhdGFzZXQucm93LCArdGFyZ2V0LmRhdGFzZXQuY2VsbF0sXHJcbiAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uLnNsaWNlKDAsIDMpXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIHNoaXBzSW5mbyA9IEdhbWUucGxheWVyQm9hcmQuZ2V0U2hpcHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChzaGlwc0luZm9bdHlwZV0uc2hpcHMubGVuZ3RoID09PSBzaGlwc0luZm9bdHlwZV0ubWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzQ2xpY2tlZEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzQ2xpY2tlZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiYnV0dG9uLS1oaWdobGlnaHRlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgdXBkYXRlUGxheWVyQm9hcmQoKTtcclxuICAgICAgICAgICAgICAgICAgcmVtb3ZlU2hpcFByZXZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgdXBkYXRlU2hpcHNUYWJsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKEdhbWUucGxheWVyQm9hcmQuaXNBcm15Q29tcGxldGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICBzdGFydEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICBzdGFydEJ0bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vIHByaW50IGVycm9yIG1lc3NhZ2VzXHJcbiAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICBlLm1lc3NhZ2UgPT09IFwiU2hpcCBleHBhbmRzIHRvIHdyb25nIGNvb3JkaW5hdGVzXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgZS5tZXNzYWdlID09PSBcIkEgbmV3IHNoaXAgY2Fubm90IGJlIHBsYWNlIG92ZXIgYW5vdGhlclwiXHJcbiAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIkVycm9yOiBcIiArIGUubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJFcnJvcjogQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgdHJ5aW5nIHRvIHBsYWNlIGEgbmV3IHNoaXBcIjtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUGxheWVyQm9hcmQoKSB7XHJcbiAgIGxldCBib2FyZCA9IEdhbWUucGxheWVyQm9hcmQuZ2V0Qm9hcmRBbmRTaGlwcygpO1xyXG5cclxuICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgYm9hcmQubGVuZ3RoOyByb3crKykge1xyXG4gICAgICBmb3IgKGxldCBjZWxsID0gMDsgY2VsbCA8IGJvYXJkW3Jvd10ubGVuZ3RoOyBjZWxsKyspIHtcclxuICAgICAgICAgaWYgKGJvYXJkW3Jvd11bY2VsbF0uc2VhcmNoKC9bc2htXS8pID49IDApIHtcclxuICAgICAgICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdLnRleHRDb250ZW50ID0gYm9hcmRbcm93XVtjZWxsXTtcclxuICAgICAgICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdLmRhdGFzZXQuZmlsbGVkID0gXCJ0cnVlXCI7XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXllckJvYXJkQ2VsbHNbcm93XVtjZWxsXS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHBsYXllckJvYXJkQ2VsbHNbcm93XVtjZWxsXS5kYXRhc2V0LmZpbGxlZCA9IFwiZmFsc2VcIjtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlU2hpcHNUYWJsZSgpIHtcclxuICAgbGV0IGluZGV4ID0gMDtcclxuXHJcbiAgIGZvciAobGV0IHR5cGUgaW4gc2hpcHNJbmZvKSB7XHJcbiAgICAgIHNoaXBUYWJsZUNvdW50ZXJzW2luZGV4XS50ZXh0Q29udGVudCA9IHNoaXBzSW5mb1t0eXBlXS5zaGlwcy5sZW5ndGg7XHJcbiAgICAgIGluZGV4Kys7XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU2hpcChlKSB7XHJcbiAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcbiAgIGlmIChcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQucm93ICYmXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LmNlbGwgJiZcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQuZmlsbGVkICYmXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LmZpbGxlZCA9PT0gXCJ0cnVlXCJcclxuICAgKSB7XHJcbiAgICAgIGxldCBtc2cgPSBHYW1lLnBsYXllckJvYXJkLnJlbW92ZVNoaXAoXHJcbiAgICAgICAgICt0YXJnZXQuZGF0YXNldC5yb3csXHJcbiAgICAgICAgICt0YXJnZXQuZGF0YXNldC5jZWxsXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAobXNnLmluY2x1ZGVzKFwiUmVtb3ZlZCBzaGlwIHdpdGggdGhlIGZvbGxvd2luZyBjb29yZGluYXRlczpcIikpIHtcclxuICAgICAgICAgbGV0IHNoaXBCdXR0b25zID0gYnV0dG9uc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvblwiKTtcclxuICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgIHNoaXBzSW5mbyA9IEdhbWUucGxheWVyQm9hcmQuZ2V0U2hpcHMoKTtcclxuXHJcbiAgICAgICAgIC8vIGVuYWJsZSBiYWNrIGRpc2FibGVkIGJ1dHRvbnNcclxuICAgICAgICAgZm9yIChsZXQgdHlwZSBpbiBzaGlwc0luZm8pIHtcclxuICAgICAgICAgICAgaWYgKHNoaXBzSW5mb1t0eXBlXS5zaGlwcy5sZW5ndGggPCBzaGlwc0luZm9bdHlwZV0ubWF4KSB7XHJcbiAgICAgICAgICAgICAgIHNoaXBCdXR0b25zW2luZGV4XS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBpZiAoIUdhbWUucGxheWVyQm9hcmQuaXNBcm15Q29tcGxldGUoKSkge1xyXG4gICAgICAgICAgICBzdGFydEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHN0YXJ0QnRuLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICB1cGRhdGVQbGF5ZXJCb2FyZCgpO1xyXG4gICAgICAgICB1cGRhdGVTaGlwc1RhYmxlKCk7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VPcmllbnRhdGlvbihlKSB7XHJcbiAgIGlmIChlLmtleSA9PT0gXCJxXCIgfHwgZS5rZXkgPT09IFwiUVwiKSB7XHJcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgICAgIGRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlbW92ZVNoaXBQcmV2aWV3KCk7XHJcbiAgICAgIHNob3dTaGlwUHJldmlldyhjdXJyZW50Q2VsbCk7XHJcbiAgIH1cclxufVxyXG4vLyB0aGlzIGZpbGUgd291bGQgYnJpbmcgdGhlIGNzcyBmaWxlIGFuZCBkb20gZnVuY3Rpb25hbGl0eVxyXG4iLCJjb25zdCBTaGlwID0gZnVuY3Rpb24gKGxlbmd0aCwgY29vcmRpbmF0ZXMpIHtcclxuICAgbGV0IF9jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzIHx8IG51bGw7XHJcbiAgIGxldCBfbGVuZ3RoID0gbGVuZ3RoIHx8IDI7XHJcbiAgIGxldCBfaGl0c0NvdW50ZXIgPSAwO1xyXG5cclxuICAgY29uc3QgZ2V0Q29vcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KF9jb29yZGluYXRlcykpO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgZ2V0TGVuZ3RoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX2xlbmd0aDtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGdldEhpdHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBfaGl0c0NvdW50ZXI7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBoaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIF9oaXRzQ291bnRlcisrO1xyXG4gICAgICByZXR1cm4gX2hpdHNDb3VudGVyO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgaXNTdW5rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX2hpdHNDb3VudGVyID09PSBsZW5ndGg7XHJcbiAgIH07XHJcblxyXG4gICByZXR1cm4ge1xyXG4gICAgICBnZXRDb29ycyxcclxuICAgICAgZ2V0TGVuZ3RoLFxyXG4gICAgICBnZXRIaXRzLFxyXG4gICAgICBoaXQsXHJcbiAgICAgIGlzU3VuayxcclxuICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCxcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICMxY2I1MTc7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6ICMxY2I1MTc7XFxuICBtYXJnaW46IDE2cHg7XFxufVxcblxcbm9sLCB1bCB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG5ibG9ja3F1b3RlLCBxIHtcXG4gIHF1b3Rlczogbm9uZTtcXG59XFxuXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBjb250ZW50OiBub25lO1xcbn1cXG5cXG50YWJsZSB7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XFxufVxcblxcbnAge1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG59XFxuXFxuLmluc3RydWN0aW9ucyB7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIG1hcmdpbi10b3A6IDNyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgaDEge1xcbiAgZm9udC1zaXplOiAxLjRyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgaDIge1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgaDEsIC5pbnN0cnVjdGlvbnMgaDIge1xcbiAgbWFyZ2luOiAxcmVtIDA7XFxufVxcbi5pbnN0cnVjdGlvbnMgaDE6Zmlyc3QtY2hpbGQsIC5pbnN0cnVjdGlvbnMgaDI6Zmlyc3QtY2hpbGQge1xcbiAgbWFyZ2luLXRvcDogMDtcXG59XFxuLmluc3RydWN0aW9ucyBsaSB7XFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGxpOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4uYm9hcmQtc2VjdGlvbiB7XFxuICBtYXJnaW4tYm90dG9tOiAzcmVtO1xcbn1cXG4uYm9hcmQtc2VjdGlvbiA+IGgxIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHggYXV0bztcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDVweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xcbiAgZ3JpZC1jb2x1bW46IDI7XFxuICBncmlkLXJvdzogMTtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICBtYXJnaW4tbGVmdDogMTBweDtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGwge1xcbiAgYm9yZGVyLXRvcDogbm9uZTtcXG4gIGJvcmRlci1yaWdodDogbm9uZTtcXG4gIGJvcmRlci1sZWZ0OiBub25lO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgyKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIyXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDMpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjNcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNFxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg1KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI1XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDYpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjZcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiN1xcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg4KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI4XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDkpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjlcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMTApOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjEwXFxcIjtcXG59XFxuXFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDVweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweDtcXG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xcbiAgZ3JpZC1jb2x1bW46IDE7XFxuICBncmlkLXJvdzogMjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbCB7XFxuICBib3JkZXItdG9wOiBub25lO1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gIGJvcmRlci1sZWZ0OiBub25lO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJhXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiYlxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDMpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImNcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg0KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJkXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDYpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImZcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg3KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJnXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiaFxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDkpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImlcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxMCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwialxcXCI7XFxufVxcblxcbi5ib2FyZF9fY2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkX19ib2FyZCB7XFxuICBncmlkLXJvdzogMjtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogNXB4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxufVxcbi5ib2FyZF9fYm9hcmQgLmJvYXJkX19jZWxsOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcblxcbiNlcnJvci1tZXNzYWdlIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGdyaWQtY29sdW1uOiAxLy0xO1xcbiAgbWFyZ2luLXRvcDogMXJlbTtcXG4gIG1hcmdpbi1sZWZ0OiAwLjVyZW07XFxufVxcblxcbi5wbGF5ZXItYnV0dG9ucyB1bCB7XFxuICBtYXJnaW46IDJyZW0gMDtcXG59XFxuLnBsYXllci1idXR0b25zIHVsIGxpIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcXG59XFxuXFxuLnNoaXBzLXRhYmxlIHtcXG4gIG1hcmdpbi1ib3R0b206IDJyZW07XFxufVxcbi5zaGlwcy10YWJsZSB0YWJsZSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbn1cXG4uc2hpcHMtdGFibGUgdGQsIC5zaGlwcy10YWJsZSB0aCB7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbn1cXG5cXG4jc3RhcnQtYnV0dG9uIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuXFxuLmJ1dHRvbiB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICMxY2I1MTc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiAjMWNiNTE3O1xcbiAgcGFkZGluZzogMC41cmVtIDAuOHJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLmJ1dHRvbi0taGlnaGxpZ2h0ZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuLmJ1dHRvbjpkaXNhYmxlZCB7XFxuICBvcGFjaXR5OiAwLjQ7XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogODAwcHgpIHtcXG4gIC5wbGF5ZXItYm9hcmQge1xcbiAgICBtYXgtd2lkdGg6IDEyMDBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGNvbHVtbi1nYXA6IDFyZW07XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICB9XFxuICAucGxheWVyLWJvYXJkIGgxIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEvLTE7XFxuICAgIGdyaWQtcm93OiAxO1xcbiAgfVxcbiAgLnBsYXllci1ib2FyZCAuYm9hcmQge1xcbiAgICBncmlkLWNvbHVtbjogMi8zO1xcbiAgICBncmlkLXJvdzogMjtcXG4gIH1cXG4gIC5wbGF5ZXItYm9hcmQgLnBsYXllci1idXR0b25zIHtcXG4gICAgZ3JpZC1jb2x1bW46IDMvNDtcXG4gICAgZ3JpZC1yb3c6IDI7XFxuICB9XFxuXFxuICAucGxheWVyLWJ1dHRvbnMgdWwge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG1hcmdpbi1ib3R0b206IDJyZW07XFxuICB9XFxuICAucGxheWVyLWJ1dHRvbnMgdWwgbGkge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gIH1cXG4gIC5wbGF5ZXItYnV0dG9ucyAuYnV0dG9uIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDExMDBweCkge1xcbiAgLmluc3RydWN0aW9ucyB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgbWF4LXdpZHRoOiAyODBweDtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBib3R0b206IDE2cHg7XFxuICAgIGxlZnQ6IDE2cHg7XFxuICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19yZXNldC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9zdHlsZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX3ZhcmlhYmxlcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9faW5zdHJ1Y3Rpb25zLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19ib2FyZC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fYnV0dG9ucy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fbWVkaWEtcXVlcmllcy5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FBQTtBQU1BOzs7Ozs7Ozs7Ozs7O0VBYUMsU0FBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSx3QkFBQTtBQ0REOztBREdBLGdEQUFBO0FBQ0E7O0VBRUMsY0FBQTtBQ0FEOztBREVBO0VBQ0Msc0JBQUE7RUFDRSw2QkFBQTtFQUNGLGNBQUE7RUFDRSx1QkFBQTtFQUNBLGNFcENLO0VGcUNQLFlBQUE7QUNDRDs7QURDQTtFQUNDLGdCQUFBO0FDRUQ7O0FEQUE7RUFDQyxZQUFBO0FDR0Q7O0FEREE7O0VBRUMsV0FBQTtFQUNBLGFBQUE7QUNJRDs7QURGQTtF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QUNHLFNBQUE7SUFDQSxtQkFBQTtFTHlRUDtFS3ZRSTtJQUNHLGNBQUE7RUx5UVA7RUt2UUk7SUFDRyxjQUFBO0lBQ0EsV0FBQTtFTHlRUDtBQUNGO0FLdFFBO0VBQ0c7SUFDRyxTQUFBO0lBQ0EsZ0JBQUE7SUFDQSxlQUFBO0lBQ0EsWUFBQTtJQUNBLFVBQUE7RUx3UUo7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxyXFxuQHVzZSAnLi92YXJpYWJsZXMnIGFzICo7XFxyXFxuXFxyXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcclxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXHJcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxyXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcclxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxyXFxuYiwgdSwgaSwgY2VudGVyLFxcclxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxyXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxyXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcclxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxyXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxyXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXHJcXG5cXHRtYXJnaW46IDA7XFxyXFxuXFx0cGFkZGluZzogMDtcXHJcXG5cXHRib3JkZXI6IDA7XFxyXFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcclxcblxcdGZvbnQ6IGluaGVyaXQ7XFxyXFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcclxcbn1cXHJcXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxyXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXHJcXG5cXHRkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuXFx0Zm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXHJcXG4gICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggJGdyZWVuO1xcclxcblxcdGxpbmUtaGVpZ2h0OiAxO1xcclxcbiAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcclxcbiAgIGNvbG9yOiAkZ3JlZW47XFxyXFxuXFx0bWFyZ2luOiAxNnB4O1xcclxcbn1cXHJcXG5vbCwgdWwge1xcclxcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGUsIHEge1xcclxcblxcdHF1b3Rlczogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxyXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcclxcblxcdGNvbnRlbnQ6ICcnO1xcclxcblxcdGNvbnRlbnQ6IG5vbmU7XFxyXFxufVxcclxcbnRhYmxlIHtcXHJcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcclxcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcclxcbn1cXHJcXG5wIHtcXHJcXG5cXHRsaW5lLWhlaWdodDogMS41O1xcclxcbn1cIixcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCxcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IDA7XFxuICBmb250LXNpemU6IDEwMCU7XFxuICBmb250OiBpbmhlcml0O1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSxcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gIHRleHQtc2hhZG93OiAwIDAgMTBweCAjMWNiNTE3O1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiAjMWNiNTE3O1xcbiAgbWFyZ2luOiAxNnB4O1xcbn1cXG5cXG5vbCwgdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuYmxvY2txdW90ZSwgcSB7XFxuICBxdW90ZXM6IG5vbmU7XFxufVxcblxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgY29udGVudDogbm9uZTtcXG59XFxuXFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG5wIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxufVxcblxcbi5pbnN0cnVjdGlvbnMge1xcbiAgcGFkZGluZzogMXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBtYXJnaW4tdG9wOiAzcmVtO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgxIHtcXG4gIGZvbnQtc2l6ZTogMS40cmVtO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgyIHtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgxLCAuaW5zdHJ1Y3Rpb25zIGgyIHtcXG4gIG1hcmdpbjogMXJlbSAwO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgxOmZpcnN0LWNoaWxkLCAuaW5zdHJ1Y3Rpb25zIGgyOmZpcnN0LWNoaWxkIHtcXG4gIG1hcmdpbi10b3A6IDA7XFxufVxcbi5pbnN0cnVjdGlvbnMgbGkge1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuLmluc3RydWN0aW9ucyBsaTpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLmJvYXJkLXNlY3Rpb24ge1xcbiAgbWFyZ2luLWJvdHRvbTogM3JlbTtcXG59XFxuLmJvYXJkLXNlY3Rpb24gPiBoMSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxufVxcblxcbi5ib2FyZCB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4IGF1dG87XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiA1cHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG4gIGdyaWQtY29sdW1uOiAyO1xcbiAgZ3JpZC1yb3c6IDE7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlci10b3A6IG5vbmU7XFxuICBib3JkZXItcmlnaHQ6IG5vbmU7XFxuICBib3JkZXItbGVmdDogbm9uZTtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjFcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMlxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgzKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIzXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDQpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjRcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg2KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI2XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDcpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjdcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiOFxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg5KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI5XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEwKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIxMFxcXCI7XFxufVxcblxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiA1cHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHg7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG4gIGdyaWQtY29sdW1uOiAxO1xcbiAgZ3JpZC1yb3c6IDI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGwge1xcbiAgYm9yZGVyLXRvcDogbm9uZTtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICBib3JkZXItbGVmdDogbm9uZTtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiYVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImJcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgzKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJjXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZFxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDUpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImVcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg2KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJmXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZ1xcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDgpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImhcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg5KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJpXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMTApOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImpcXFwiO1xcbn1cXG5cXG4uYm9hcmRfX2NlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZF9fYm9hcmQge1xcbiAgZ3JpZC1yb3c6IDI7XFxuICBtYXJnaW4tbGVmdDogMTBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDVweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xcbn1cXG4uYm9hcmRfX2JvYXJkIC5ib2FyZF9fY2VsbDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWNiNTE3O1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4jZXJyb3ItbWVzc2FnZSB7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBncmlkLWNvbHVtbjogMS8tMTtcXG4gIG1hcmdpbi10b3A6IDFyZW07XFxuICBtYXJnaW4tbGVmdDogMC41cmVtO1xcbn1cXG5cXG4ucGxheWVyLWJ1dHRvbnMgdWwge1xcbiAgbWFyZ2luOiAycmVtIDA7XFxufVxcbi5wbGF5ZXItYnV0dG9ucyB1bCBsaSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XFxufVxcblxcbi5zaGlwcy10YWJsZSB7XFxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xcbn1cXG4uc2hpcHMtdGFibGUgdGFibGUge1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG59XFxuLnNoaXBzLXRhYmxlIHRkLCAuc2hpcHMtdGFibGUgdGgge1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG59XFxuXFxuI3N0YXJ0LWJ1dHRvbiB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbi5idXR0b24ge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gIHRleHQtc2hhZG93OiAwIDAgMTBweCAjMWNiNTE3O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogIzFjYjUxNztcXG4gIHBhZGRpbmc6IDAuNXJlbSAwLjhyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbi5idXR0b24tLWhpZ2hsaWdodGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbi5idXR0b246ZGlzYWJsZWQge1xcbiAgb3BhY2l0eTogMC40O1xcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDgwMHB4KSB7XFxuICAucGxheWVyLWJvYXJkIHtcXG4gICAgbWF4LXdpZHRoOiAxMjAwcHg7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBjb2x1bW4tZ2FwOiAxcmVtO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgfVxcbiAgLnBsYXllci1ib2FyZCBoMSB7XFxuICAgIGdyaWQtY29sdW1uOiAxLy0xO1xcbiAgICBncmlkLXJvdzogMTtcXG4gIH1cXG4gIC5wbGF5ZXItYm9hcmQgLmJvYXJkIHtcXG4gICAgZ3JpZC1jb2x1bW46IDIvMztcXG4gICAgZ3JpZC1yb3c6IDI7XFxuICB9XFxuICAucGxheWVyLWJvYXJkIC5wbGF5ZXItYnV0dG9ucyB7XFxuICAgIGdyaWQtY29sdW1uOiAzLzQ7XFxuICAgIGdyaWQtcm93OiAyO1xcbiAgfVxcblxcbiAgLnBsYXllci1idXR0b25zIHVsIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xcbiAgfVxcbiAgLnBsYXllci1idXR0b25zIHVsIGxpIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICB9XFxuICAucGxheWVyLWJ1dHRvbnMgLmJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5pbnN0cnVjdGlvbnMge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG1heC13aWR0aDogMjgwcHg7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYm90dG9tOiAxNnB4O1xcbiAgICBsZWZ0OiAxNnB4O1xcbiAgfVxcbn1cIixcIiRncmVlbjogIzFjYjUxNztcIixcIkB1c2UgJy4vdmFyaWFibGVzJyBhcyAqO1xcclxcblxcclxcbi5pbnN0cnVjdGlvbnMge1xcclxcbiAgIHBhZGRpbmc6IDFyZW07XFxyXFxuICAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xcclxcbiAgIG1hcmdpbi10b3A6IDNyZW07XFxyXFxuICAgaDEge1xcclxcbiAgICAgIGZvbnQtc2l6ZTogMS40cmVtO1xcclxcbiAgIH1cXHJcXG4gICBoMiB7XFxyXFxuICAgICAgZm9udC1zaXplOiAxLjJyZW07XFxyXFxuICAgfVxcclxcbiAgIGgxLCBoMiB7XFxyXFxuICAgICAgbWFyZ2luOiAxcmVtIDA7XFxyXFxuICAgfVxcclxcbiAgIGgxOmZpcnN0LWNoaWxkLCBoMjpmaXJzdC1jaGlsZCB7XFxyXFxuICAgICAgbWFyZ2luLXRvcDogMDtcXHJcXG4gICB9XFxyXFxuICAgbGkge1xcclxcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICAgICAgJjpsYXN0LWNoaWxkIHtcXHJcXG4gICAgICAgICBtYXJnaW46IDA7XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XCIsXCJAdXNlICdzYXNzOmxpc3QnO1xcclxcbkB1c2UgJy4vdmFyaWFibGVzJyBhcyAqO1xcclxcblxcclxcbiRjZWxsV2lkdGg6IDMwcHg7XFxyXFxuXFxyXFxuLmJvYXJkLXNlY3Rpb24ge1xcclxcbiAgIG1hcmdpbi1ib3R0b206IDNyZW07XFxyXFxuICAgJiA+IGgxIHtcXHJcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXHJcXG4gICAgICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gICB9XFxyXFxufVxcclxcbi5ib2FyZCB7XFxyXFxuICAgZm9udC1zaXplOiAxOHB4O1xcclxcbiAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAkY2VsbFdpZHRoIGF1dG87XFxyXFxuICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIge1xcclxcbiAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgZ2FwOiA1cHg7XFxyXFxuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsICRjZWxsV2lkdGgpO1xcclxcbiAgIGdyaWQtYXV0by1yb3dzOiAkY2VsbFdpZHRoO1xcclxcbiAgIGdyaWQtY29sdW1uOiAyO1xcclxcbiAgIGdyaWQtcm93OiAxO1xcclxcbiAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxyXFxuICAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxyXFxuICAgLmJvYXJkX19jZWxsIHtcXHJcXG4gICAgICBib3JkZXItdG9wOiBub25lO1xcclxcbiAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcXHJcXG4gICAgICBib3JkZXItbGVmdDogbm9uZTtcXHJcXG5cXHJcXG4gICAgICBAZm9yICRpIGZyb20gMSB0aHJvdWdoIDEwIHtcXHJcXG4gICAgICAgICAmOm50aC1jaGlsZCgjeyRpfSk6OmJlZm9yZSB7XFxyXFxuICAgICAgICAgICAgY29udGVudDogJyN7JGl9JzsgXFxyXFxuICAgICAgICAgfVxcclxcbiAgICAgIH1cXHJcXG4gICB9XFxyXFxufVxcclxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciB7XFxyXFxuICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICBnYXA6IDVweDtcXHJcXG4gICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6ICRjZWxsV2lkdGg7XFxyXFxuICAgZ3JpZC1hdXRvLXJvd3M6ICRjZWxsV2lkdGg7XFxyXFxuICAgZ3JpZC1jb2x1bW46IDE7XFxyXFxuICAgZ3JpZC1yb3c6IDI7XFxyXFxuICAgLmJvYXJkX19jZWxsIHtcXHJcXG4gICAgICBib3JkZXItdG9wOiBub25lO1xcclxcbiAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XFxyXFxuICAgICAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxyXFxuXFxyXFxuICAgICAgJGxldHRlcnM6ICdhJywnYicsJ2MnLCdkJywnZScsJ2YnLCdnJywnaCcsJ2knLCdqJztcXHJcXG5cXHJcXG4gICAgICBAZm9yICRpIGZyb20gMSB0aHJvdWdoIDEwIHtcXHJcXG4gICAgICAgICAmOm50aC1jaGlsZCgjeyRpfSk6OmJlZm9yZSB7XFxyXFxuICAgICAgICAgICAgY29udGVudDogJyN7bGlzdC5udGgoJGxldHRlcnMsICRpKX0nOyBcXHJcXG4gICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XFxyXFxuLmJvYXJkX19jZWxsIHtcXHJcXG4gICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XFxyXFxuICAgZGlzcGxheTogZmxleDtcXHJcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG4uYm9hcmRfX2JvYXJkIHtcXHJcXG4gICBncmlkLXJvdzogMjtcXHJcXG4gICBtYXJnaW4tbGVmdDogMTBweDtcXHJcXG4gICBkaXNwbGF5OiBncmlkO1xcclxcbiAgIGdhcDogNXB4O1xcclxcbiAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAkY2VsbFdpZHRoKTtcXHJcXG4gICBncmlkLWF1dG8tcm93czogJGNlbGxXaWR0aDtcXHJcXG4gICAuYm9hcmRfX2NlbGwge1xcclxcbiAgICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRncmVlbjtcXHJcXG4gICAgICAgICBjb2xvcjogYmxhY2s7XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XFxyXFxuI2Vycm9yLW1lc3NhZ2Uge1xcclxcbiAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gICBncmlkLWNvbHVtbjogMSAvIC0xO1xcclxcbiAgIG1hcmdpbi10b3A6IDFyZW07XFxyXFxuICAgbWFyZ2luLWxlZnQ6IC41cmVtO1xcclxcbn1cXHJcXG4ucGxheWVyLWJ1dHRvbnMge1xcclxcbiAgIHVsIHtcXHJcXG4gICAgICBtYXJnaW46IDJyZW0gMDtcXHJcXG4gICB9XFxyXFxuICAgdWwgbGkge1xcclxcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgICBtYXJnaW4tYm90dG9tOiAuNXJlbTtcXHJcXG4gICB9XFxyXFxufVxcclxcbi5zaGlwcy10YWJsZSB7XFxyXFxuICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXHJcXG5cXHJcXG4gICB0YWJsZSB7XFxyXFxuICAgICAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xcclxcbiAgIH1cXHJcXG4gICB0ZCwgdGgge1xcclxcbiAgICAgIHBhZGRpbmc6IC41cmVtO1xcclxcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICRncmVlbjtcXHJcXG4gICB9XFxyXFxufVxcclxcbiNzdGFydC1idXR0b24ge1xcclxcbiAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXHJcXG59XFxyXFxuXCIsXCJAdXNlICcuL3ZhcmlhYmxlcycgYXMgKjtcXHJcXG5cXHJcXG4uYnV0dG9uIHtcXHJcXG4gICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcclxcbiAgIHRleHQtc2hhZG93OiAwIDAgMTBweCAkZ3JlZW47XFxyXFxuICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxyXFxuICAgY29sb3I6ICRncmVlbjtcXHJcXG4gICBwYWRkaW5nOiAuNXJlbSAuOHJlbTtcXHJcXG4gICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XFxyXFxuICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRncmVlbjtcXHJcXG4gICAgICBjb2xvcjogYmxhY2s7XFxyXFxuICAgfVxcclxcbiAgICYtLWhpZ2hsaWdodGVkIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JlZW47XFxyXFxuICAgICAgY29sb3I6IGJsYWNrO1xcclxcbiAgIH1cXHJcXG4gICAmOmRpc2FibGVkIHtcXHJcXG4gICAgICBvcGFjaXR5OiAuNDtcXHJcXG4gICB9XFxyXFxufVwiLFwiQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA4MDBweCkge1xcclxcbiAgIC5wbGF5ZXItYm9hcmQge1xcclxcbiAgICAgIG1heC13aWR0aDogMTIwMHB4O1xcclxcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xcclxcbiAgICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgICAgY29sdW1uLWdhcDogMXJlbTtcXHJcXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcclxcbiAgICAgIGgxIHtcXHJcXG4gICAgICAgICBncmlkLWNvbHVtbjogMSAvIC0xO1xcclxcbiAgICAgICAgIGdyaWQtcm93OiAxO1xcclxcbiAgICAgIH1cXHJcXG4gICAgICAuYm9hcmQge1xcclxcbiAgICAgICAgIGdyaWQtY29sdW1uOiAyIC8gMztcXHJcXG4gICAgICAgICBncmlkLXJvdzogMjtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgLnBsYXllci1idXR0b25zIHtcXHJcXG4gICAgICAgICBncmlkLWNvbHVtbjogMyAvIDQ7XFxyXFxuICAgICAgICAgZ3JpZC1yb3c6IDI7XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG4gICAucGxheWVyLWJ1dHRvbnMge1xcclxcbiAgICAgIHVsIHtcXHJcXG4gICAgICAgICBtYXJnaW46IDA7XFxyXFxuICAgICAgICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgdWwgbGkge1xcclxcbiAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICAgIH1cXHJcXG4gICAgICAuYnV0dG9uIHtcXHJcXG4gICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICB9XFxyXFxuICAgfVxcclxcbn1cXHJcXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDExMDBweCkge1xcclxcbiAgIC5pbnN0cnVjdGlvbnMge1xcclxcbiAgICAgIG1hcmdpbjogMDtcXHJcXG4gICAgICBtYXgtd2lkdGg6IDI4MHB4O1xcclxcbiAgICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgICBib3R0b206IDE2cHg7XFxyXFxuICAgICAgbGVmdDogMTZweDtcXHJcXG4gICB9XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbIkdhbWVib2FyZCIsIkdhbWUiLCJfd2lubmVyTWVzc2FnZSIsIl9jYW5HYW1lU3RhcnQiLCJfY29tcHV0ZXJCb2FyZCIsInBsYXllckJvYXJkIiwiZ2V0Q29tcHV0ZXJCb2FyZCIsImdldEJvYXJkIiwiaW5pdCIsInBsYWNlRW5lbXlBcm15IiwidHlwZSIsInJvdyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNvbHVtbiIsImxlbmd0aCIsImRpcmVjdGlvbiIsInBsYWNlU2hpcCIsImUiLCJtZXNzYWdlIiwiaW5jbHVkZXMiLCJpc0FybXlDb21wbGV0ZSIsImNvbXB1dGVyU2hpcHNJbmZvIiwiZ2V0U2hpcHMiLCJ0YWtlVHVybiIsImNlbGwiLCJhdHRhY2tQbGF5ZXIiLCJyZWNlaXZlQXR0YWNrIiwiYWxsU2hpcHNTdW5rIiwiZ2V0V2lubmVyIiwicmVzZXQiLCJTaGlwIiwiX2JvYXJkIiwiX3NoaXBzIiwidHlwZTEiLCJzaGlwcyIsIm1heCIsInR5cGUyIiwidHlwZTMiLCJ0eXBlNCIsInB1c2giLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJzaGlwc0Nsb25lIiwia2V5IiwiZm9yRWFjaCIsInNoaXAiLCJjbG9uZSIsImdldExlbmd0aCIsImdldENvb3JzIiwiaSIsImdldEhpdHMiLCJoaXQiLCJnZXRCb2FyZEFuZFNoaXBzIiwiYm9hcmRDb3B5IiwiY3VycmVudFNoaXAiLCJzaGlwQ29vcnMiLCJjb29ycyIsImNvb3JkaW5hdGVzIiwiaXNOYU4iLCJOdW1iZXIiLCJFcnJvciIsInNoaXBDb29yZGluYXRlcyIsImNvb3JzQ29weSIsImN1cnJlbnRDb29yIiwibmV3U2hpcCIsIm5ld1NoaXBDb29ycyIsImVycm9yTXNnIiwicmVtb3ZlU2hpcCIsImZpbHRlcmVkU2hpcHMiLCJqIiwiZmlsdGVyIiwic2hpcHNMb29wIiwicmVzdWx0TXNnIiwicmVkdWNlIiwiYWNjIiwiY3VycmVudCIsInNsaWNlIiwic3ltYm9sIiwidHlwZUxvb3AiLCJpc1N1bmsiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3B1Qm9hcmQiLCJidXR0b25zQ29udGFpbmVyIiwic2hpcFRhYmxlQ291bnRlcnMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiZXJyb3JNZXNzYWdlIiwic3RhcnRCdG4iLCJwbGF5ZXJCb2FyZENlbGxzIiwiY3B1Qm9hcmRDZWxscyIsInNoaXBzSW5mbyIsInByZXZpb3VzQ2xpY2tlZEJ0biIsImN1cnJlbnRDZWxsIiwiY2VsbHNUb0hpZ2hsaWdodCIsImRpdiIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJkYXRhc2V0IiwiZmlsbGVkIiwiYXBwZW5kIiwiY2xvbmVOb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUNsaWNrZWRCdXR0b25zIiwic2hvd1NoaXBQcmV2aWV3IiwidGFyZ2V0IiwicmVtb3ZlU2hpcFByZXZpZXciLCJwbGFjZU5ld1NoaXAiLCJ3aW5kb3ciLCJjaGFuZ2VPcmllbnRhdGlvbiIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsImlkIiwibm9kZSIsImxlbmd0aExvb3AiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwiYm9yZGVyQ29sb3IiLCJ0ZXh0Q29udGVudCIsImRpc2FibGVkIiwidXBkYXRlUGxheWVyQm9hcmQiLCJ1cGRhdGVTaGlwc1RhYmxlIiwidmlzaWJpbGl0eSIsImJvYXJkIiwic2VhcmNoIiwiaW5kZXgiLCJtc2ciLCJzaGlwQnV0dG9ucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwcmV2ZW50RGVmYXVsdCIsIl9jb29yZGluYXRlcyIsIl9sZW5ndGgiLCJfaGl0c0NvdW50ZXIiXSwic291cmNlUm9vdCI6IiJ9