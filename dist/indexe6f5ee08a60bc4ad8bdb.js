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
        var horientation = Math.floor(Math.random() * 2) === 0 ? "ver" : null;

        _computerBoard.placeShip([row, column], length, horientation);

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
    var orientation = arguments.length > 2 ? arguments[2] : undefined;

    if (isNaN(Number(coordinates[0])) || isNaN(Number(coordinates[1]))) {
      throw new Error("Coordinates should be numbers");
    }

    if (isNaN(Number(length)) || length > 5 || length < 2) {
      throw new Error("Length should be a number between 2 and 5");
    }

    var shipCoordinates = [_toConsumableArray(coordinates)]; // generate coordinates that expand based on length and orientation

    for (var i = 0; i < length - 1; i++) {
      // expand coordinates vertically
      if (orientation === "ver") {
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
var horientation = "horizontal";
var shipsInfo = null;
var previousClickedBtn = null;
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
playerBoard.addEventListener("mouseover", showShipPreview);
playerBoard.addEventListener("mouseout", removeShipPreview);
playerBoard.addEventListener("click", placeNewShip);

function handleClickedButtons(e) {
  var target = e.target; // handle buttons that change "length" variable

  if (target.dataset.length) {
    length = +target.dataset.length;

    if (previousClickedBtn) {
      previousClickedBtn.classList.remove("button--highlighted");
    }

    target.classList.add("button--highlighted");
    previousClickedBtn = target; // handle button that changes "horientation" variable
  } else if (target.id === "horientationButtton") {
    if (horientation === "horizontal") {
      horientation = "vertical";
    } else {
      horientation = "horizontal";
    }
  }
}

function showShipPreview(e) {
  if (length && e.target.dataset.row && e.target.dataset.cell) {
    var currentCell = e.target;
    var _currentCell$dataset = currentCell.dataset,
        _row = _currentCell$dataset.row,
        _cell = _currentCell$dataset.cell;
    _row = +_row;
    _cell = +_cell; // populate "cellsToHighlight" array

    lengthLoop: for (var i = 0; i < length; i++) {
      if (!playerBoardCells[_row] || !playerBoardCells[_row][_cell]) {
        break lengthLoop;
      }

      cellsToHighlight.push(playerBoardCells[_row][_cell]);

      if (horientation === "horizontal") {
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
            _game_js__WEBPACK_IMPORTED_MODULE_0__["default"].playerBoard.placeShip([+target.dataset.row, +target.dataset.cell], length, horientation.slice(0, 3));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhlNmY1ZWUwOGE2MGJjNGFkOGJkYi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBLElBQU1DLElBQUksR0FBSSxZQUFZO0VBQ3ZCLElBQUlDLGNBQUo7O0VBQ0EsSUFBSUMsYUFBYSxHQUFHLEtBQXBCOztFQUNBLElBQUlDLGNBQWMsR0FBR0oseURBQVMsRUFBOUI7O0VBQ0EsSUFBSUssV0FBVyxHQUFHTCx5REFBUyxFQUEzQjs7RUFFQSxJQUFNTSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLEdBQVk7SUFDbEMsT0FBT0YsY0FBYyxDQUFDRyxRQUFmLEVBQVA7RUFDRixDQUZEOztFQUlBLElBQU1DLElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQVk7SUFDdEIsSUFBSUMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFVQyxJQUFWLEVBQWdCO01BQ2xDLElBQUk7UUFDRDtRQUNBLElBQUlDLEdBQUcsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQixFQUEzQixDQUFWO1FBQ0EsSUFBSUMsTUFBTSxHQUFHSCxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWdCLEVBQTNCLENBQWI7UUFDQSxJQUFJRSxNQUFNLEdBQUdOLElBQUksQ0FBQ00sTUFBbEI7UUFDQSxJQUFJQyxZQUFZLEdBQ2JMLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0IsQ0FBM0IsTUFBa0MsQ0FBbEMsR0FBc0MsS0FBdEMsR0FBOEMsSUFEakQ7O1FBR0FWLGNBQWMsQ0FBQ2MsU0FBZixDQUF5QixDQUFDUCxHQUFELEVBQU1JLE1BQU4sQ0FBekIsRUFBd0NDLE1BQXhDLEVBQWdEQyxZQUFoRDs7UUFDQVIsY0FBYyxDQUFDQyxJQUFELENBQWQ7TUFDRixDQVZELENBVUUsT0FBT1MsQ0FBUCxFQUFVO1FBQ1QsSUFBSSxDQUFDQSxDQUFDLENBQUNDLE9BQUYsQ0FBVUMsUUFBVixDQUFtQiwwQkFBbkIsQ0FBTCxFQUFxRDtVQUNsRFosY0FBYyxDQUFDQyxJQUFELENBQWQ7UUFDRixDQUZELE1BRU87VUFDSixPQUFPLFVBQVA7UUFDRjtNQUNIO0lBQ0gsQ0FsQkQsQ0FEc0IsQ0FxQnRCOzs7SUFDQSxJQUFJLENBQUNOLGNBQWMsQ0FBQ2tCLGNBQWYsRUFBTCxFQUFzQztNQUNuQyxJQUFJQyxpQkFBaUIsR0FBR25CLGNBQWMsQ0FBQ29CLFFBQWYsRUFBeEI7O01BRUEsS0FBSyxJQUFJZCxJQUFULElBQWlCYSxpQkFBakIsRUFBb0M7UUFDakNkLGNBQWMsQ0FBQ2MsaUJBQWlCLENBQUNiLElBQUQsQ0FBbEIsQ0FBZDtNQUNGO0lBQ0g7O0lBRUQsSUFBSUwsV0FBVyxDQUFDaUIsY0FBWixFQUFKLEVBQWtDO01BQy9CbkIsYUFBYSxHQUFHLElBQWhCO01BQ0EsT0FBTyxJQUFQO0lBQ0YsQ0FIRCxNQUdPO01BQ0osT0FBTyxLQUFQO0lBQ0Y7RUFDSCxDQXBDRDs7RUFzQ0EsSUFBTXNCLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQVVkLEdBQVYsRUFBZWUsSUFBZixFQUFxQjtJQUFBOztJQUNuQyxJQUFJLENBQUN2QixhQUFMLEVBQW9CLE9BQU8sSUFBUDs7SUFFcEIsSUFBSSxDQUFDRCxjQUFMLEVBQXFCO01BQ2xCLElBQUl5QixZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO1FBQ3RCLElBQUk7VUFDRCxJQUFJaEIsSUFBRyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWdCLEVBQTNCLENBQVY7O1VBQ0EsSUFBSVksS0FBSSxHQUFHZCxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWdCLEVBQTNCLENBQVg7O1VBRUEsS0FBSSxDQUFDVCxXQUFMLENBQWlCdUIsYUFBakIsQ0FBK0JqQixJQUEvQixFQUFvQ2UsS0FBcEM7UUFDRixDQUxELENBS0UsT0FBT1AsQ0FBUCxFQUFVO1VBQ1QsSUFDR0EsQ0FBQyxDQUFDQyxPQUFGLENBQVVDLFFBQVYsQ0FDRyxnREFESCxDQURILEVBSUU7WUFDQ00sWUFBWTtVQUNkO1FBQ0g7TUFDSCxDQWZELENBRGtCLENBa0JsQjs7O01BQ0F2QixjQUFjLENBQUN3QixhQUFmLENBQTZCakIsR0FBN0IsRUFBa0NlLElBQWxDOztNQUVBLElBQUl0QixjQUFjLENBQUN5QixZQUFmLEVBQUosRUFBbUM7UUFDaEMzQixjQUFjLEdBQUcsc0JBQWpCO1FBQ0EsT0FBT0EsY0FBUDtNQUNGLENBeEJpQixDQTBCbEI7OztNQUNBeUIsWUFBWTs7TUFFWixJQUFJLEtBQUt0QixXQUFMLENBQWlCd0IsWUFBakIsRUFBSixFQUFxQztRQUNsQzNCLGNBQWMsR0FBRyx3QkFBakI7UUFDQSxPQUFPQSxjQUFQO01BQ0Y7O01BRUQsT0FBTyxJQUFQO0lBQ0Y7O0lBRUQsT0FBT0EsY0FBUDtFQUNGLENBekNEOztFQTJDQSxJQUFNNEIsU0FBUyxHQUFHLFNBQVpBLFNBQVksR0FBWTtJQUMzQixPQUFPNUIsY0FBUDtFQUNGLENBRkQ7O0VBSUEsSUFBTTZCLEtBQUssR0FBRyxTQUFSQSxLQUFRLEdBQVk7SUFDdkI1QixhQUFhLEdBQUcsS0FBaEI7SUFDQUMsY0FBYyxHQUFHSix5REFBUyxFQUExQjtJQUNBLEtBQUtLLFdBQUwsR0FBbUJMLHlEQUFTLEVBQTVCO0VBQ0YsQ0FKRDs7RUFNQSxPQUFPO0lBQ0pLLFdBQVcsRUFBWEEsV0FESTtJQUVKQyxnQkFBZ0IsRUFBaEJBLGdCQUZJO0lBR0pFLElBQUksRUFBSkEsSUFISTtJQUlKaUIsUUFBUSxFQUFSQSxRQUpJO0lBS0pLLFNBQVMsRUFBVEEsU0FMSTtJQU1KQyxLQUFLLEVBQUxBO0VBTkksQ0FBUDtBQVFGLENBN0dZLEVBQWI7O0FBK0dBLGlFQUFlOUIsSUFBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqSEE7O0FBRUEsSUFBTUQsU0FBUyxHQUFHLFNBQVpBLFNBQVksR0FBWTtFQUMzQixJQUFJaUMsTUFBTSxHQUFHLEVBQWI7RUFDQSxJQUFJQyxNQUFNLEdBQUc7SUFDVkMsS0FBSyxFQUFFO01BQUVDLEtBQUssRUFBRSxFQUFUO01BQWFwQixNQUFNLEVBQUUsQ0FBckI7TUFBd0JxQixHQUFHLEVBQUU7SUFBN0IsQ0FERztJQUVWQyxLQUFLLEVBQUU7TUFBRUYsS0FBSyxFQUFFLEVBQVQ7TUFBYXBCLE1BQU0sRUFBRSxDQUFyQjtNQUF3QnFCLEdBQUcsRUFBRTtJQUE3QixDQUZHO0lBR1ZFLEtBQUssRUFBRTtNQUFFSCxLQUFLLEVBQUUsRUFBVDtNQUFhcEIsTUFBTSxFQUFFLENBQXJCO01BQXdCcUIsR0FBRyxFQUFFO0lBQTdCLENBSEc7SUFJVkcsS0FBSyxFQUFFO01BQUVKLEtBQUssRUFBRSxFQUFUO01BQWFwQixNQUFNLEVBQUUsQ0FBckI7TUFBd0JxQixHQUFHLEVBQUU7SUFBN0I7RUFKRyxDQUFiLENBRjJCLENBUzNCOztFQUNBLEtBQUssSUFBSTFCLEdBQUcsR0FBRyxDQUFmLEVBQWtCQSxHQUFHLEdBQUcsRUFBeEIsRUFBNEJBLEdBQUcsRUFBL0IsRUFBbUM7SUFDaENzQixNQUFNLENBQUNRLElBQVAsQ0FBWSxFQUFaOztJQUVBLEtBQUssSUFBSWYsSUFBSSxHQUFHLENBQWhCLEVBQW1CQSxJQUFJLEdBQUcsRUFBMUIsRUFBOEJBLElBQUksRUFBbEMsRUFBc0M7TUFDbkNPLE1BQU0sQ0FBQ3RCLEdBQUQsQ0FBTixDQUFZOEIsSUFBWixDQUFpQixHQUFqQjtJQUNGO0VBQ0g7O0VBRUQsSUFBTWxDLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQVk7SUFDMUIsT0FBT21DLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLFNBQUwsQ0FBZVgsTUFBZixDQUFYLENBQVA7RUFDRixDQUZEOztFQUlBLElBQU1ULFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQVk7SUFDMUIsSUFBSXFCLFVBQVUsR0FBRyxFQUFqQjs7SUFEMEIsMkJBR2pCQyxHQUhpQjtNQUl2QkQsVUFBVSxDQUFDQyxHQUFELENBQVYsR0FBa0IsRUFBbEI7TUFDQUQsVUFBVSxDQUFDQyxHQUFELENBQVYsQ0FBZ0JWLEtBQWhCLEdBQXdCLEVBQXhCO01BQ0FTLFVBQVUsQ0FBQ0MsR0FBRCxDQUFWLENBQWdCOUIsTUFBaEIsR0FBeUJrQixNQUFNLENBQUNZLEdBQUQsQ0FBTixDQUFZOUIsTUFBckM7TUFDQTZCLFVBQVUsQ0FBQ0MsR0FBRCxDQUFWLENBQWdCVCxHQUFoQixHQUFzQkgsTUFBTSxDQUFDWSxHQUFELENBQU4sQ0FBWVQsR0FBbEM7O01BRUFILE1BQU0sQ0FBQ1ksR0FBRCxDQUFOLENBQVlWLEtBQVosQ0FBa0JXLE9BQWxCLENBQTBCLFVBQUNDLElBQUQsRUFBVTtRQUNqQyxJQUFJQyxLQUFLLEdBQUdqQixvREFBSSxDQUFDZ0IsSUFBSSxDQUFDRSxTQUFMLEVBQUQsRUFBbUJGLElBQUksQ0FBQ0csUUFBTCxFQUFuQixDQUFoQjs7UUFFQSxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdKLElBQUksQ0FBQ0ssT0FBTCxFQUFwQixFQUFvQ0QsQ0FBQyxFQUFyQyxFQUF5QztVQUN0Q0gsS0FBSyxDQUFDSyxHQUFOO1FBQ0Y7O1FBRURULFVBQVUsQ0FBQ0MsR0FBRCxDQUFWLENBQWdCVixLQUFoQixDQUFzQkssSUFBdEIsQ0FBMkJRLEtBQTNCO01BQ0YsQ0FSRDtJQVR1Qjs7SUFHMUIsS0FBSyxJQUFJSCxHQUFULElBQWdCWixNQUFoQixFQUF3QjtNQUFBLE1BQWZZLEdBQWU7SUFldkI7O0lBRUQsT0FBT0QsVUFBUDtFQUNGLENBckJEOztFQXVCQSxJQUFNVSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLEdBQVk7SUFDbEMsSUFBSUMsU0FBUyxHQUFHLEtBQUtqRCxRQUFMLEVBQWhCOztJQUVBLEtBQUssSUFBSUcsSUFBVCxJQUFpQndCLE1BQWpCLEVBQXlCO01BQ3RCLEtBQUssSUFBSWtCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdsQixNQUFNLENBQUN4QixJQUFELENBQU4sQ0FBYTBCLEtBQWIsQ0FBbUJwQixNQUF2QyxFQUErQ29DLENBQUMsRUFBaEQsRUFBb0Q7UUFDakQsSUFBSUssV0FBVyxHQUFHdkIsTUFBTSxDQUFDeEIsSUFBRCxDQUFOLENBQWEwQixLQUFiLENBQW1CZ0IsQ0FBbkIsQ0FBbEI7UUFDQSxJQUFJTSxTQUFTLEdBQUdELFdBQVcsQ0FBQ04sUUFBWixFQUFoQjtRQUVBTyxTQUFTLENBQUNYLE9BQVYsQ0FBa0IsVUFBQ1ksS0FBRCxFQUFXO1VBQzFCLDRCQUFvQkEsS0FBcEI7VUFBQSxJQUFLaEQsR0FBTDtVQUFBLElBQVVJLE1BQVY7O1VBRUEsSUFBSXlDLFNBQVMsQ0FBQzdDLEdBQUQsQ0FBVCxDQUFlSSxNQUFmLE1BQTJCLEdBQS9CLEVBQW9DO1lBQ2pDeUMsU0FBUyxDQUFDN0MsR0FBRCxDQUFULENBQWVJLE1BQWYsSUFBeUIsR0FBekI7VUFDRjtRQUNILENBTkQ7TUFPRjtJQUNIOztJQUVELE9BQU95QyxTQUFQO0VBQ0YsQ0FuQkQ7O0VBcUJBLElBQU10QyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxHQUF5RDtJQUFBLElBQS9DMEMsV0FBK0MsdUVBQWpDLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBaUM7SUFBQSxJQUF6QjVDLE1BQXlCLHVFQUFoQixDQUFnQjtJQUFBLElBQWI2QyxXQUFhOztJQUN4RSxJQUFJQyxLQUFLLENBQUNDLE1BQU0sQ0FBQ0gsV0FBVyxDQUFDLENBQUQsQ0FBWixDQUFQLENBQUwsSUFBaUNFLEtBQUssQ0FBQ0MsTUFBTSxDQUFDSCxXQUFXLENBQUMsQ0FBRCxDQUFaLENBQVAsQ0FBMUMsRUFBb0U7TUFDakUsTUFBTSxJQUFJSSxLQUFKLENBQVUsK0JBQVYsQ0FBTjtJQUNGOztJQUVELElBQUlGLEtBQUssQ0FBQ0MsTUFBTSxDQUFDL0MsTUFBRCxDQUFQLENBQUwsSUFBeUJBLE1BQU0sR0FBRyxDQUFsQyxJQUF1Q0EsTUFBTSxHQUFHLENBQXBELEVBQXVEO01BQ3BELE1BQU0sSUFBSWdELEtBQUosQ0FBVSwyQ0FBVixDQUFOO0lBQ0Y7O0lBRUQsSUFBSUMsZUFBZSxHQUFHLG9CQUFLTCxXQUFMLEVBQXRCLENBVHdFLENBV3hFOztJQUNBLEtBQUssSUFBSVIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3BDLE1BQU0sR0FBRyxDQUE3QixFQUFnQ29DLENBQUMsRUFBakMsRUFBcUM7TUFDbEM7TUFDQSxJQUFJUyxXQUFXLEtBQUssS0FBcEIsRUFBMkI7UUFDeEIsSUFBSUssU0FBUyxzQkFBT0QsZUFBZSxDQUFDYixDQUFELENBQXRCLENBQWI7O1FBQ0FjLFNBQVMsQ0FBQyxDQUFELENBQVQ7UUFDQUQsZUFBZSxDQUFDeEIsSUFBaEIsQ0FBcUJ5QixTQUFyQixFQUh3QixDQUt4QjtNQUNGLENBTkQsTUFNTztRQUNKLElBQUlBLFVBQVMsc0JBQU9ELGVBQWUsQ0FBQ2IsQ0FBRCxDQUF0QixDQUFiOztRQUNBYyxVQUFTLENBQUMsQ0FBRCxDQUFUO1FBQ0FELGVBQWUsQ0FBQ3hCLElBQWhCLENBQXFCeUIsVUFBckI7TUFDRjtJQUNILENBekJ1RSxDQTJCeEU7OztJQUNBLEtBQUssSUFBSWQsR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBR2EsZUFBZSxDQUFDakQsTUFBcEMsRUFBNENvQyxHQUFDLEVBQTdDLEVBQWlEO01BQzlDLElBQUllLFdBQVcsR0FBR0YsZUFBZSxDQUFDYixHQUFELENBQWpDO01BRUEsSUFBSWUsV0FBVyxDQUFDLENBQUQsQ0FBWCxHQUFpQixDQUFqQixJQUFzQkEsV0FBVyxDQUFDLENBQUQsQ0FBWCxHQUFpQixDQUEzQyxFQUNHLE1BQU0sSUFBSUgsS0FBSixDQUFVLG1DQUFWLENBQU47TUFDSCxJQUFJRyxXQUFXLENBQUMsQ0FBRCxDQUFYLEdBQWlCLENBQWpCLElBQXNCQSxXQUFXLENBQUMsQ0FBRCxDQUFYLEdBQWlCLENBQTNDLEVBQ0csTUFBTSxJQUFJSCxLQUFKLENBQVUsbUNBQVYsQ0FBTjtJQUNMOztJQUVELElBQUlJLE9BQU8sR0FBR3BDLG9EQUFJLENBQUNoQixNQUFELEVBQVNpRCxlQUFULENBQWxCLENBckN3RSxDQXVDeEU7O0lBQ0EsS0FBSyxJQUFJdkQsSUFBVCxJQUFpQndCLE1BQWpCLEVBQXlCO01BQ3RCLElBQUlBLE1BQU0sQ0FBQ3hCLElBQUQsQ0FBTixDQUFhTSxNQUFiLEtBQXdCb0QsT0FBTyxDQUFDbEIsU0FBUixFQUE1QixFQUFpRDtRQUM5QyxJQUFJaEIsTUFBTSxDQUFDeEIsSUFBRCxDQUFOLENBQWEwQixLQUFiLENBQW1CcEIsTUFBbkIsR0FBNEJrQixNQUFNLENBQUN4QixJQUFELENBQU4sQ0FBYTJCLEdBQTdDLEVBQWtEO1VBQy9DO1VBQ0E7VUFDQSxLQUFLLElBQUkzQixLQUFULElBQWlCd0IsTUFBakIsRUFBeUI7WUFDdEJBLE1BQU0sQ0FBQ3hCLEtBQUQsQ0FBTixDQUFhMEIsS0FBYixDQUFtQlcsT0FBbkIsQ0FBMkIsVUFBQ0MsSUFBRCxFQUFVO2NBQ2xDQSxJQUFJLENBQUNHLFFBQUwsR0FBZ0JKLE9BQWhCLENBQXdCLFVBQUNXLFNBQUQsRUFBZTtnQkFDcENVLE9BQU8sQ0FBQ2pCLFFBQVIsR0FBbUJKLE9BQW5CLENBQTJCLFVBQUNzQixZQUFELEVBQWtCO2tCQUMxQyxJQUNHWCxTQUFTLENBQUMsQ0FBRCxDQUFULEtBQWlCVyxZQUFZLENBQUMsQ0FBRCxDQUE3QixJQUNBWCxTQUFTLENBQUMsQ0FBRCxDQUFULEtBQWlCVyxZQUFZLENBQUMsQ0FBRCxDQUZoQyxFQUdFO29CQUNDLE1BQU0sSUFBSUwsS0FBSixDQUNILHlDQURHLENBQU47a0JBR0Y7Z0JBQ0gsQ0FURDtjQVVGLENBWEQ7WUFZRixDQWJEO1VBY0Y7O1VBRUQ5QixNQUFNLENBQUN4QixJQUFELENBQU4sQ0FBYTBCLEtBQWIsQ0FBbUJLLElBQW5CLENBQXdCMkIsT0FBeEI7O1VBQ0EsT0FBTyxJQUFQO1FBQ0YsQ0F0QkQsTUFzQk87VUFDSixJQUFJRSxRQUFRLDBEQUFtRHRELE1BQW5ELDhCQUE2RWtCLE1BQU0sQ0FBQ3hCLElBQUQsQ0FBTixDQUFhMkIsR0FBMUYsQ0FBWjtVQUNBLE1BQU0sSUFBSTJCLEtBQUosQ0FBVU0sUUFBVixDQUFOO1FBQ0Y7TUFDSDtJQUNIO0VBQ0gsQ0F0RUQ7O0VBd0VBLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFhLEdBQTZCO0lBQUEsSUFBbkI1RCxHQUFtQix1RUFBYixDQUFhO0lBQUEsSUFBVmUsSUFBVSx1RUFBSCxDQUFHO0lBQzdDLElBQUk4QyxhQUFKO0lBQ0EsSUFBSWIsS0FBSjs7SUFFQSxLQUFLLElBQUlqRCxJQUFULElBQWlCd0IsTUFBakIsRUFBeUI7TUFBQSw2QkFFRmtCLENBRkU7UUFHbkIsSUFBSUssV0FBVyxHQUFHdkIsTUFBTSxDQUFDeEIsSUFBRCxDQUFOLENBQWEwQixLQUFiLENBQW1CZ0IsQ0FBbkIsQ0FBbEI7UUFDQSxJQUFJTSxTQUFTLEdBQUdELFdBQVcsQ0FBQ04sUUFBWixFQUFoQjs7UUFFQSxLQUFLLElBQUlzQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHZixTQUFTLENBQUMxQyxNQUE5QixFQUFzQ3lELENBQUMsRUFBdkMsRUFBMkM7VUFDeEMsSUFBSWYsU0FBUyxDQUFDZSxDQUFELENBQVQsQ0FBYSxDQUFiLE1BQW9COUQsR0FBcEIsSUFBMkIrQyxTQUFTLENBQUNlLENBQUQsQ0FBVCxDQUFhLENBQWIsTUFBb0IvQyxJQUFuRCxFQUF5RDtZQUN0RDhDLGFBQWEsR0FBR3RDLE1BQU0sQ0FBQ3hCLElBQUQsQ0FBTixDQUFhMEIsS0FBYixDQUFtQnNDLE1BQW5CLENBQ2IsVUFBQzFCLElBQUQ7Y0FBQSxPQUFVQSxJQUFJLEtBQUtTLFdBQW5CO1lBQUEsQ0FEYSxDQUFoQjtZQUdBRSxLQUFLLEdBQUdELFNBQVI7WUFDQTtVQUNGO1FBQ0g7TUFka0I7O01BQ3RCO01BQ0FpQixTQUFTLEVBQUUsS0FBSyxJQUFJdkIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2xCLE1BQU0sQ0FBQ3hCLElBQUQsQ0FBTixDQUFhMEIsS0FBYixDQUFtQnBCLE1BQXZDLEVBQStDb0MsQ0FBQyxFQUFoRCxFQUFvRDtRQUFBLGtCQUEzQ0EsQ0FBMkM7O1FBQUEsZ0NBVXRELE1BQU11QixTQUFOO01BR1IsQ0FmcUIsQ0FnQnRCOzs7TUFDQSxJQUFJSCxhQUFKLEVBQW1CO1FBQ2hCLElBQUlJLFNBQVMsR0FBRywrQ0FBaEI7UUFFQUEsU0FBUyxJQUFJakIsS0FBSyxDQUNka0IsTUFEUyxDQUVQLFVBQUNDLEdBQUQsRUFBTUMsT0FBTjtVQUFBLE9BQWtCRCxHQUFHLGNBQU9DLE9BQU8sQ0FBQyxDQUFELENBQWQsZUFBc0JBLE9BQU8sQ0FBQyxDQUFELENBQTdCLFFBQXJCO1FBQUEsQ0FGTyxFQUdQLEVBSE8sRUFLVEMsS0FMUyxDQUtILENBTEcsRUFLQSxDQUFDLENBTEQsQ0FBYjtRQU9BOUMsTUFBTSxDQUFDeEIsSUFBRCxDQUFOLENBQWEwQixLQUFiLEdBQXFCb0MsYUFBckI7UUFDQSxPQUFPSSxTQUFQO01BQ0Y7SUFDSDs7SUFFRCxzQ0FBK0JqRSxHQUEvQixjQUFzQ2UsSUFBdEM7RUFDRixDQXJDRDs7RUF1Q0EsSUFBTUosY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixHQUFZO0lBQ2hDLEtBQUssSUFBSVosSUFBVCxJQUFpQndCLE1BQWpCLEVBQXlCO01BQ3RCLElBQUlBLE1BQU0sQ0FBQ3hCLElBQUQsQ0FBTixDQUFhMEIsS0FBYixDQUFtQnBCLE1BQW5CLEdBQTRCa0IsTUFBTSxDQUFDeEIsSUFBRCxDQUFOLENBQWEyQixHQUE3QyxFQUFrRCxPQUFPLEtBQVA7SUFDcEQ7O0lBRUQsT0FBTyxJQUFQO0VBQ0YsQ0FORDs7RUFRQSxJQUFNVCxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQTZCO0lBQUEsSUFBbkJqQixHQUFtQix1RUFBYixDQUFhO0lBQUEsSUFBVmUsSUFBVSx1RUFBSCxDQUFHO0lBQ2hELElBQUl1RCxNQUFNLEdBQUcsR0FBYjs7SUFFQSxJQUFJdEUsR0FBRyxHQUFHLENBQU4sSUFBV0EsR0FBRyxHQUFHLENBQWpCLElBQXNCZSxJQUFJLEdBQUcsQ0FBN0IsSUFBa0NBLElBQUksR0FBRyxDQUE3QyxFQUFnRDtNQUM3QyxNQUFNLElBQUlzQyxLQUFKLGdEQUNxQ3JELEdBRHJDLGNBQzRDZSxJQUQ1QyxPQUFOO0lBR0Y7O0lBRUQsSUFBSU8sTUFBTSxDQUFDdEIsR0FBRCxDQUFOLENBQVllLElBQVosTUFBc0IsR0FBMUIsRUFBK0I7TUFDNUIsTUFBTSxJQUFJc0MsS0FBSiw0REFDaURyRCxHQURqRCxjQUN3RGUsSUFEeEQsT0FBTjtJQUdGLENBYitDLENBZWhEOzs7SUFDQXdELFFBQVEsRUFBRSxLQUFLLElBQUl4RSxJQUFULElBQWlCd0IsTUFBakIsRUFBeUI7TUFDaEMsS0FBSyxJQUFJa0IsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2xCLE1BQU0sQ0FBQ3hCLElBQUQsQ0FBTixDQUFhMEIsS0FBYixDQUFtQnBCLE1BQXZDLEVBQStDb0MsQ0FBQyxFQUFoRCxFQUFvRDtRQUNqRCxJQUFJSyxXQUFXLEdBQUd2QixNQUFNLENBQUN4QixJQUFELENBQU4sQ0FBYTBCLEtBQWIsQ0FBbUJnQixDQUFuQixDQUFsQjtRQUNBLElBQUlNLFNBQVMsR0FBR0QsV0FBVyxDQUFDTixRQUFaLEVBQWhCOztRQUVBLEtBQUssSUFBSXNCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdmLFNBQVMsQ0FBQzFDLE1BQTlCLEVBQXNDeUQsQ0FBQyxFQUF2QyxFQUEyQztVQUN4QyxJQUFJZixTQUFTLENBQUNlLENBQUQsQ0FBVCxDQUFhLENBQWIsTUFBb0I5RCxHQUFwQixJQUEyQitDLFNBQVMsQ0FBQ2UsQ0FBRCxDQUFULENBQWEsQ0FBYixNQUFvQi9DLElBQW5ELEVBQXlEO1lBQ3REK0IsV0FBVyxDQUFDSCxHQUFaO1lBQ0EyQixNQUFNLEdBQUcsR0FBVDtZQUNBLE1BQU1DLFFBQU47VUFDRjtRQUNIO01BQ0g7SUFDSDs7SUFFRGpELE1BQU0sQ0FBQ3RCLEdBQUQsQ0FBTixDQUFZZSxJQUFaLElBQW9CdUQsTUFBcEI7SUFDQSxPQUFPLElBQVA7RUFDRixDQWpDRDs7RUFtQ0EsSUFBTXBELFlBQVksR0FBRyxTQUFmQSxZQUFlLEdBQVk7SUFDOUIsS0FBSyxJQUFJbkIsSUFBVCxJQUFpQndCLE1BQWpCLEVBQXlCO01BQ3RCLEtBQUssSUFBSWtCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdsQixNQUFNLENBQUN4QixJQUFELENBQU4sQ0FBYTBCLEtBQWIsQ0FBbUJwQixNQUF2QyxFQUErQ29DLENBQUMsRUFBaEQsRUFBb0Q7UUFDakQsSUFBSSxDQUFDbEIsTUFBTSxDQUFDeEIsSUFBRCxDQUFOLENBQWEwQixLQUFiLENBQW1CZ0IsQ0FBbkIsRUFBc0IrQixNQUF0QixFQUFMLEVBQXFDLE9BQU8sS0FBUDtNQUN2QztJQUNIOztJQUVELE9BQU8sSUFBUDtFQUNGLENBUkQ7O0VBVUEsT0FBTztJQUNKNUUsUUFBUSxFQUFSQSxRQURJO0lBRUppQixRQUFRLEVBQVJBLFFBRkk7SUFHSitCLGdCQUFnQixFQUFoQkEsZ0JBSEk7SUFJSnJDLFNBQVMsRUFBVEEsU0FKSTtJQUtKcUQsVUFBVSxFQUFWQSxVQUxJO0lBTUpqRCxjQUFjLEVBQWRBLGNBTkk7SUFPSk0sYUFBYSxFQUFiQSxhQVBJO0lBUUpDLFlBQVksRUFBWkE7RUFSSSxDQUFQO0FBVUYsQ0FoUEQ7O0FBa1BBLGlFQUFlN0IsU0FBZjs7Ozs7Ozs7Ozs7OztBQ3BQQTtBQUNBO0FBRUEsSUFBTUssV0FBVyxHQUFHK0UsUUFBUSxDQUFDQyxjQUFULENBQXdCLGFBQXhCLENBQXBCO0FBQ0EsSUFBTUMsUUFBUSxHQUFHRixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBakI7QUFDQSxJQUFNRSxnQkFBZ0IsR0FBR0gsUUFBUSxDQUFDQyxjQUFULENBQXdCLG1CQUF4QixDQUF6QjtBQUNBLElBQU1HLGlCQUFpQixHQUFHSixRQUFRLENBQUNLLHNCQUFULENBQWdDLGdCQUFoQyxDQUExQjtBQUNBLElBQU1DLFlBQVksR0FBR04sUUFBUSxDQUFDQyxjQUFULENBQXdCLGVBQXhCLENBQXJCO0FBQ0EsSUFBTU0sUUFBUSxHQUFHUCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBakI7QUFFQSxJQUFNTyxnQkFBZ0IsR0FBRyxFQUF6QjtBQUNBLElBQU1DLGFBQWEsR0FBRyxFQUF0QjtBQUVBLElBQUk3RSxNQUFNLEdBQUcsSUFBYjtBQUNBLElBQUlDLFlBQVksR0FBRyxZQUFuQjtBQUNBLElBQUk2RSxTQUFTLEdBQUcsSUFBaEI7QUFDQSxJQUFJQyxrQkFBa0IsR0FBRyxJQUF6QjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLEVBQXZCLEVBRUE7O0FBQ0EsS0FBSyxJQUFJckYsR0FBRyxHQUFHLENBQWYsRUFBa0JBLEdBQUcsR0FBRyxFQUF4QixFQUE0QkEsR0FBRyxFQUEvQixFQUFtQztFQUNoQ2lGLGdCQUFnQixDQUFDbkQsSUFBakIsQ0FBc0IsRUFBdEI7RUFDQW9ELGFBQWEsQ0FBQ3BELElBQWQsQ0FBbUIsRUFBbkI7O0VBRUEsS0FBSyxJQUFJZixJQUFJLEdBQUcsQ0FBaEIsRUFBbUJBLElBQUksR0FBRyxFQUExQixFQUE4QkEsSUFBSSxFQUFsQyxFQUFzQztJQUNuQyxJQUFJdUUsR0FBRyxHQUFHYixRQUFRLENBQUNjLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVjtJQUVBRCxHQUFHLENBQUNFLFNBQUosR0FBZ0IsYUFBaEI7SUFDQUYsR0FBRyxDQUFDRyxPQUFKLENBQVl6RixHQUFaLEdBQWtCQSxHQUFsQjtJQUNBc0YsR0FBRyxDQUFDRyxPQUFKLENBQVkxRSxJQUFaLEdBQW1CQSxJQUFuQjtJQUNBdUUsR0FBRyxDQUFDRyxPQUFKLENBQVlDLE1BQVosR0FBcUIsT0FBckI7SUFDQWhHLFdBQVcsQ0FBQ2lHLE1BQVosQ0FBbUJMLEdBQW5CO0lBQ0FMLGdCQUFnQixDQUFDakYsR0FBRCxDQUFoQixDQUFzQjhCLElBQXRCLENBQTJCd0QsR0FBM0I7SUFFQSxJQUFJaEQsS0FBSyxHQUFHZ0QsR0FBRyxDQUFDTSxTQUFKLEVBQVo7SUFDQWpCLFFBQVEsQ0FBQ2dCLE1BQVQsQ0FBZ0JyRCxLQUFoQjtJQUNBNEMsYUFBYSxDQUFDbEYsR0FBRCxDQUFiLENBQW1COEIsSUFBbkIsQ0FBd0JRLEtBQXhCO0VBQ0Y7QUFDSDs7QUFFRHNDLGdCQUFnQixDQUFDaUIsZ0JBQWpCLENBQWtDLE9BQWxDLEVBQTJDQyxvQkFBM0M7QUFDQXBHLFdBQVcsQ0FBQ21HLGdCQUFaLENBQTZCLFdBQTdCLEVBQTBDRSxlQUExQztBQUNBckcsV0FBVyxDQUFDbUcsZ0JBQVosQ0FBNkIsVUFBN0IsRUFBeUNHLGlCQUF6QztBQUNBdEcsV0FBVyxDQUFDbUcsZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0NJLFlBQXRDOztBQUVBLFNBQVNILG9CQUFULENBQThCdEYsQ0FBOUIsRUFBaUM7RUFDOUIsSUFBSTBGLE1BQU0sR0FBRzFGLENBQUMsQ0FBQzBGLE1BQWYsQ0FEOEIsQ0FHOUI7O0VBQ0EsSUFBSUEsTUFBTSxDQUFDVCxPQUFQLENBQWVwRixNQUFuQixFQUEyQjtJQUN4QkEsTUFBTSxHQUFHLENBQUM2RixNQUFNLENBQUNULE9BQVAsQ0FBZXBGLE1BQXpCOztJQUVBLElBQUkrRSxrQkFBSixFQUF3QjtNQUNyQkEsa0JBQWtCLENBQUNlLFNBQW5CLENBQTZCQyxNQUE3QixDQUFvQyxxQkFBcEM7SUFDRjs7SUFFREYsTUFBTSxDQUFDQyxTQUFQLENBQWlCRSxHQUFqQixDQUFxQixxQkFBckI7SUFDQWpCLGtCQUFrQixHQUFHYyxNQUFyQixDQVJ3QixDQVV4QjtFQUNGLENBWEQsTUFXTyxJQUFJQSxNQUFNLENBQUNJLEVBQVAsS0FBYyxxQkFBbEIsRUFBeUM7SUFDN0MsSUFBSWhHLFlBQVksS0FBSyxZQUFyQixFQUFtQztNQUNoQ0EsWUFBWSxHQUFHLFVBQWY7SUFDRixDQUZELE1BRU87TUFDSkEsWUFBWSxHQUFHLFlBQWY7SUFDRjtFQUNIO0FBQ0g7O0FBRUQsU0FBU3lGLGVBQVQsQ0FBeUJ2RixDQUF6QixFQUE0QjtFQUN6QixJQUFJSCxNQUFNLElBQUlHLENBQUMsQ0FBQzBGLE1BQUYsQ0FBU1QsT0FBVCxDQUFpQnpGLEdBQTNCLElBQWtDUSxDQUFDLENBQUMwRixNQUFGLENBQVNULE9BQVQsQ0FBaUIxRSxJQUF2RCxFQUE2RDtJQUMxRCxJQUFJd0YsV0FBVyxHQUFHL0YsQ0FBQyxDQUFDMEYsTUFBcEI7SUFDQSwyQkFBb0JLLFdBQVcsQ0FBQ2QsT0FBaEM7SUFBQSxJQUFNekYsSUFBTix3QkFBTUEsR0FBTjtJQUFBLElBQVdlLEtBQVgsd0JBQVdBLElBQVg7SUFFQWYsSUFBRyxHQUFHLENBQUNBLElBQVA7SUFDQWUsS0FBSSxHQUFHLENBQUNBLEtBQVIsQ0FMMEQsQ0FPMUQ7O0lBQ0F5RixVQUFVLEVBQUUsS0FBSyxJQUFJL0QsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3BDLE1BQXBCLEVBQTRCb0MsQ0FBQyxFQUE3QixFQUFpQztNQUMxQyxJQUFJLENBQUN3QyxnQkFBZ0IsQ0FBQ2pGLElBQUQsQ0FBakIsSUFBMEIsQ0FBQ2lGLGdCQUFnQixDQUFDakYsSUFBRCxDQUFoQixDQUFzQmUsS0FBdEIsQ0FBL0IsRUFBNEQ7UUFDekQsTUFBTXlGLFVBQU47TUFDRjs7TUFFRG5CLGdCQUFnQixDQUFDdkQsSUFBakIsQ0FBc0JtRCxnQkFBZ0IsQ0FBQ2pGLElBQUQsQ0FBaEIsQ0FBc0JlLEtBQXRCLENBQXRCOztNQUNBLElBQUlULFlBQVksS0FBSyxZQUFyQixFQUFtQztRQUNoQ1MsS0FBSTtNQUNOLENBRkQsTUFFTztRQUNKZixJQUFHO01BQ0w7SUFDSCxDQW5CeUQsQ0FxQjFEOzs7SUFDQSxJQUFJcUYsZ0JBQWdCLENBQUNoRixNQUFqQixHQUEwQkEsTUFBOUIsRUFBc0M7TUFDbkNnRixnQkFBZ0IsQ0FBQ2pELE9BQWpCLENBQXlCLFVBQUNyQixJQUFELEVBQVU7UUFDaENBLElBQUksQ0FBQzBGLEtBQUwsQ0FBV0MsZUFBWCxHQUE2QixTQUE3QjtRQUNBM0YsSUFBSSxDQUFDMEYsS0FBTCxDQUFXRSxLQUFYLEdBQW1CLE9BQW5CO1FBQ0E1RixJQUFJLENBQUMwRixLQUFMLENBQVdHLFdBQVgsR0FBeUIsU0FBekI7TUFDRixDQUpELEVBRG1DLENBT25DO0lBQ0YsQ0FSRCxNQVFPO01BQ0p2QixnQkFBZ0IsQ0FBQ2pELE9BQWpCLENBQXlCLFVBQUNyQixJQUFELEVBQVU7UUFDaEMsSUFBSUEsSUFBSSxDQUFDMEUsT0FBTCxDQUFhQyxNQUFiLEtBQXdCLE9BQTVCLEVBQXFDO1VBQ2xDM0UsSUFBSSxDQUFDMEYsS0FBTCxDQUFXQyxlQUFYLEdBQTZCLFNBQTdCO1FBQ0YsQ0FGRCxNQUVPO1VBQ0ozRixJQUFJLENBQUMwRixLQUFMLENBQVdDLGVBQVgsR0FBNkIsU0FBN0I7VUFDQTNGLElBQUksQ0FBQzBGLEtBQUwsQ0FBV0UsS0FBWCxHQUFtQixPQUFuQjtVQUNBNUYsSUFBSSxDQUFDMEYsS0FBTCxDQUFXRyxXQUFYLEdBQXlCLFNBQXpCO1FBQ0Y7TUFDSCxDQVJEO0lBU0Y7RUFDSDtBQUNIOztBQUVELFNBQVNaLGlCQUFULEdBQTZCO0VBQzFCWCxnQkFBZ0IsQ0FBQ2pELE9BQWpCLENBQXlCLFVBQUNyQixJQUFELEVBQVU7SUFDaENBLElBQUksQ0FBQzBGLEtBQUwsQ0FBV0MsZUFBWCxHQUE2QixFQUE3QjtJQUNBM0YsSUFBSSxDQUFDMEYsS0FBTCxDQUFXRSxLQUFYLEdBQW1CLEVBQW5CO0lBQ0E1RixJQUFJLENBQUMwRixLQUFMLENBQVdHLFdBQVgsR0FBeUIsRUFBekI7RUFDRixDQUpEO0VBS0F2QixnQkFBZ0IsR0FBRyxFQUFuQjtBQUNGOztBQUVELFNBQVNZLFlBQVQsQ0FBc0J6RixDQUF0QixFQUF5QjtFQUN0QixJQUFJMEYsTUFBTSxHQUFHMUYsQ0FBQyxDQUFDMEYsTUFBZjs7RUFFQSxJQUFJN0YsTUFBTSxJQUFJNkYsTUFBTSxDQUFDVCxPQUFQLENBQWV6RixHQUF6QixJQUFnQ2tHLE1BQU0sQ0FBQ1QsT0FBUCxDQUFlMUUsSUFBbkQsRUFBeUQ7SUFDdERvRSxTQUFTLEdBQUc3RixxRUFBQSxFQUFaO0lBQ0F5RixZQUFZLENBQUM4QixXQUFiLEdBQTJCLEVBQTNCLENBRnNELENBRXZCOztJQUUvQixLQUFLLElBQUk5RyxJQUFULElBQWlCb0YsU0FBakIsRUFBNEI7TUFDekI7TUFDQSxJQUFJQSxTQUFTLENBQUNwRixJQUFELENBQVQsQ0FBZ0JNLE1BQWhCLEtBQTJCQSxNQUEvQixFQUF1QztRQUNwQyxJQUFJOEUsU0FBUyxDQUFDcEYsSUFBRCxDQUFULENBQWdCMEIsS0FBaEIsQ0FBc0JwQixNQUF0QixHQUErQjhFLFNBQVMsQ0FBQ3BGLElBQUQsQ0FBVCxDQUFnQjJCLEdBQW5ELEVBQXdEO1VBQ3JEO1VBQ0EsSUFBSTtZQUNEcEMsc0VBQUEsQ0FDRyxDQUFDLENBQUM0RyxNQUFNLENBQUNULE9BQVAsQ0FBZXpGLEdBQWpCLEVBQXNCLENBQUNrRyxNQUFNLENBQUNULE9BQVAsQ0FBZTFFLElBQXRDLENBREgsRUFFR1YsTUFGSCxFQUdHQyxZQUFZLENBQUMrRCxLQUFiLENBQW1CLENBQW5CLEVBQXNCLENBQXRCLENBSEg7WUFLQWMsU0FBUyxHQUFHN0YscUVBQUEsRUFBWjs7WUFFQSxJQUFJNkYsU0FBUyxDQUFDcEYsSUFBRCxDQUFULENBQWdCMEIsS0FBaEIsQ0FBc0JwQixNQUF0QixLQUFpQzhFLFNBQVMsQ0FBQ3BGLElBQUQsQ0FBVCxDQUFnQjJCLEdBQXJELEVBQTBEO2NBQ3ZEckIsTUFBTSxHQUFHLElBQVQ7Y0FDQStFLGtCQUFrQixDQUFDMEIsUUFBbkIsR0FBOEIsSUFBOUI7Y0FDQTFCLGtCQUFrQixDQUFDZSxTQUFuQixDQUE2QkMsTUFBN0IsQ0FBb0MscUJBQXBDO1lBQ0Y7O1lBRURXLGlCQUFpQjtZQUNqQmYsaUJBQWlCO1lBQ2pCZ0IsZ0JBQWdCOztZQUVoQixJQUFJMUgsMkVBQUEsRUFBSixFQUF1QztjQUNwQzBGLFFBQVEsQ0FBQzhCLFFBQVQsR0FBb0IsS0FBcEI7Y0FDQTlCLFFBQVEsQ0FBQ3lCLEtBQVQsQ0FBZVEsVUFBZixHQUE0QixTQUE1QjtZQUNGLENBckJBLENBdUJEOztVQUNGLENBeEJELENBd0JFLE9BQU96RyxDQUFQLEVBQVU7WUFDVCxJQUNHQSxDQUFDLENBQUNDLE9BQUYsS0FBYyxtQ0FBZCxJQUNBRCxDQUFDLENBQUNDLE9BQUYsS0FBYyx5Q0FGakIsRUFHRTtjQUNDc0UsWUFBWSxDQUFDOEIsV0FBYixHQUEyQixZQUFZckcsQ0FBQyxDQUFDQyxPQUF6QztZQUNGLENBTEQsTUFLTztjQUNKc0UsWUFBWSxDQUFDOEIsV0FBYixHQUNHLDJEQURIO1lBRUY7VUFDSDtRQUNIO01BQ0g7SUFDSDtFQUNIO0FBQ0g7O0FBRUQsU0FBU0UsaUJBQVQsR0FBNkI7RUFDMUIsSUFBSUcsS0FBSyxHQUFHNUgsNkVBQUEsRUFBWjs7RUFFQSxLQUFLLElBQUlVLEtBQUcsR0FBRyxDQUFmLEVBQWtCQSxLQUFHLEdBQUdrSCxLQUFLLENBQUM3RyxNQUE5QixFQUFzQ0wsS0FBRyxFQUF6QyxFQUE2QztJQUMxQyxLQUFLLElBQUllLE1BQUksR0FBRyxDQUFoQixFQUFtQkEsTUFBSSxHQUFHbUcsS0FBSyxDQUFDbEgsS0FBRCxDQUFMLENBQVdLLE1BQXJDLEVBQTZDVSxNQUFJLEVBQWpELEVBQXFEO01BQ2xELElBQUltRyxLQUFLLENBQUNsSCxLQUFELENBQUwsQ0FBV2UsTUFBWCxFQUFpQm9HLE1BQWpCLENBQXdCLE9BQXhCLEtBQW9DLENBQXhDLEVBQTJDO1FBQ3hDbEMsZ0JBQWdCLENBQUNqRixLQUFELENBQWhCLENBQXNCZSxNQUF0QixFQUE0QjhGLFdBQTVCLEdBQTBDSyxLQUFLLENBQUNsSCxLQUFELENBQUwsQ0FBV2UsTUFBWCxDQUExQztRQUNBa0UsZ0JBQWdCLENBQUNqRixLQUFELENBQWhCLENBQXNCZSxNQUF0QixFQUE0QjBFLE9BQTVCLENBQW9DQyxNQUFwQyxHQUE2QyxNQUE3QztNQUNGO0lBQ0g7RUFDSDtBQUNIOztBQUVELFNBQVNzQixnQkFBVCxHQUE0QjtFQUN6QixJQUFJSSxLQUFLLEdBQUcsQ0FBWjs7RUFFQSxLQUFLLElBQUlySCxJQUFULElBQWlCb0YsU0FBakIsRUFBNEI7SUFDekJOLGlCQUFpQixDQUFDdUMsS0FBRCxDQUFqQixDQUF5QlAsV0FBekIsR0FBdUMxQixTQUFTLENBQUNwRixJQUFELENBQVQsQ0FBZ0IwQixLQUFoQixDQUFzQnBCLE1BQTdEO0lBQ0ErRyxLQUFLO0VBQ1A7QUFDSCxFQUNEOzs7Ozs7Ozs7Ozs7OztBQ3JNQSxJQUFNL0YsSUFBSSxHQUFHLFNBQVBBLElBQU8sQ0FBVWhCLE1BQVYsRUFBa0I0QyxXQUFsQixFQUErQjtFQUN6QyxJQUFJb0UsWUFBWSxHQUFHcEUsV0FBVyxJQUFJLElBQWxDOztFQUNBLElBQUlxRSxPQUFPLEdBQUdqSCxNQUFNLElBQUksQ0FBeEI7O0VBQ0EsSUFBSWtILFlBQVksR0FBRyxDQUFuQjs7RUFFQSxJQUFNL0UsUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBWTtJQUMxQixPQUFPVCxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxTQUFMLENBQWVvRixZQUFmLENBQVgsQ0FBUDtFQUNGLENBRkQ7O0VBSUEsSUFBTTlFLFNBQVMsR0FBRyxTQUFaQSxTQUFZLEdBQVk7SUFDM0IsT0FBTytFLE9BQVA7RUFDRixDQUZEOztFQUlBLElBQU01RSxPQUFPLEdBQUcsU0FBVkEsT0FBVSxHQUFZO0lBQ3pCLE9BQU82RSxZQUFQO0VBQ0YsQ0FGRDs7RUFJQSxJQUFNNUUsR0FBRyxHQUFHLFNBQU5BLEdBQU0sR0FBWTtJQUNyQjRFLFlBQVk7SUFDWixPQUFPQSxZQUFQO0VBQ0YsQ0FIRDs7RUFLQSxJQUFNL0MsTUFBTSxHQUFHLFNBQVRBLE1BQVMsR0FBWTtJQUN4QixPQUFPK0MsWUFBWSxLQUFLbEgsTUFBeEI7RUFDRixDQUZEOztFQUlBLE9BQU87SUFDSm1DLFFBQVEsRUFBUkEsUUFESTtJQUVKRCxTQUFTLEVBQVRBLFNBRkk7SUFHSkcsT0FBTyxFQUFQQSxPQUhJO0lBSUpDLEdBQUcsRUFBSEEsR0FKSTtJQUtKNkIsTUFBTSxFQUFOQTtFQUxJLENBQVA7QUFPRixDQWpDRDs7QUFtQ0EsaUVBQWVuRCxJQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ0E7QUFDNkc7QUFDakI7QUFDNUYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBLDJvQkFBMm9CLGNBQWMsZUFBZSxjQUFjLG9CQUFvQixrQkFBa0IsNkJBQTZCLEdBQUcsaUpBQWlKLG1CQUFtQixHQUFHLFVBQVUsMkJBQTJCLGtDQUFrQyxtQkFBbUIsNEJBQTRCLG1CQUFtQixpQkFBaUIsR0FBRyxZQUFZLHFCQUFxQixHQUFHLG1CQUFtQixpQkFBaUIsR0FBRyw2REFBNkQsa0JBQWtCLGtCQUFrQixHQUFHLFdBQVcsOEJBQThCLHNCQUFzQixHQUFHLE9BQU8scUJBQXFCLEdBQUcsbUJBQW1CLGtCQUFrQiw4QkFBOEIscUJBQXFCLEdBQUcsb0JBQW9CLHNCQUFzQixHQUFHLG9CQUFvQixzQkFBc0IsR0FBRyxzQ0FBc0MsbUJBQW1CLEdBQUcsOERBQThELGtCQUFrQixHQUFHLG9CQUFvQix3QkFBd0IsR0FBRywrQkFBK0IsY0FBYyxHQUFHLG9CQUFvQix3QkFBd0IsR0FBRyx1QkFBdUIsdUJBQXVCLDhCQUE4QixzQkFBc0IsR0FBRyxZQUFZLG9CQUFvQixrQkFBa0IscUNBQXFDLDRCQUE0QixHQUFHLCtCQUErQixrQkFBa0IsYUFBYSw0Q0FBNEMseUJBQXlCLG1CQUFtQixnQkFBZ0Isd0JBQXdCLHNCQUFzQixHQUFHLDBDQUEwQyxxQkFBcUIsdUJBQXVCLHNCQUFzQixHQUFHLCtEQUErRCxtQkFBbUIsR0FBRywrREFBK0QsbUJBQW1CLEdBQUcsK0RBQStELG1CQUFtQixHQUFHLCtEQUErRCxtQkFBbUIsR0FBRywrREFBK0QsbUJBQW1CLEdBQUcsK0RBQStELG1CQUFtQixHQUFHLCtEQUErRCxtQkFBbUIsR0FBRywrREFBK0QsbUJBQW1CLEdBQUcsK0RBQStELG1CQUFtQixHQUFHLGdFQUFnRSxvQkFBb0IsR0FBRyw4QkFBOEIsa0JBQWtCLGFBQWEsZ0NBQWdDLHlCQUF5QixtQkFBbUIsZ0JBQWdCLEdBQUcseUNBQXlDLHFCQUFxQix3QkFBd0Isc0JBQXNCLEdBQUcsOERBQThELG1CQUFtQixHQUFHLDhEQUE4RCxtQkFBbUIsR0FBRyw4REFBOEQsbUJBQW1CLEdBQUcsOERBQThELG1CQUFtQixHQUFHLDhEQUE4RCxtQkFBbUIsR0FBRyw4REFBOEQsbUJBQW1CLEdBQUcsOERBQThELG1CQUFtQixHQUFHLDhEQUE4RCxtQkFBbUIsR0FBRyw4REFBOEQsbUJBQW1CLEdBQUcsK0RBQStELG1CQUFtQixHQUFHLGtCQUFrQiw4QkFBOEIsa0JBQWtCLDRCQUE0Qix3QkFBd0IsR0FBRyxtQkFBbUIsZ0JBQWdCLHNCQUFzQixrQkFBa0IsYUFBYSw0Q0FBNEMseUJBQXlCLEdBQUcsb0NBQW9DLDhCQUE4QixpQkFBaUIsR0FBRyxvQkFBb0Isb0JBQW9CLHNCQUFzQixxQkFBcUIsd0JBQXdCLEdBQUcsd0JBQXdCLG1CQUFtQixHQUFHLHlCQUF5QiwwQkFBMEIsMEJBQTBCLEdBQUcsa0JBQWtCLHdCQUF3QixHQUFHLHNCQUFzQiw4QkFBOEIsR0FBRyxvQ0FBb0Msb0JBQW9CLDhCQUE4QixHQUFHLG1CQUFtQix1QkFBdUIsR0FBRyxhQUFhLDJCQUEyQixrQ0FBa0MsNEJBQTRCLG1CQUFtQiwyQkFBMkIsOEJBQThCLG9CQUFvQixHQUFHLGlCQUFpQiw4QkFBOEIsaUJBQWlCLEdBQUcsd0JBQXdCLDhCQUE4QixpQkFBaUIsR0FBRyxvQkFBb0IsaUJBQWlCLEdBQUcsK0NBQStDLG1CQUFtQix3QkFBd0IscUJBQXFCLG9CQUFvQix1QkFBdUIsNENBQTRDLEtBQUssc0JBQXNCLHdCQUF3QixrQkFBa0IsS0FBSywwQkFBMEIsdUJBQXVCLGtCQUFrQixLQUFLLG1DQUFtQyx1QkFBdUIsa0JBQWtCLEtBQUssMEJBQTBCLGdCQUFnQiwwQkFBMEIsS0FBSywyQkFBMkIscUJBQXFCLEtBQUssNkJBQTZCLHFCQUFxQixrQkFBa0IsS0FBSyxHQUFHLDhDQUE4QyxtQkFBbUIsZ0JBQWdCLHVCQUF1QixzQkFBc0IsbUJBQW1CLGlCQUFpQixLQUFLLEdBQUcsT0FBTyxnVUFBZ1UsS0FBSyxpQkFBaUIsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxXQUFXLE1BQU0sVUFBVSxNQUFNLEtBQUssV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsTUFBTSxLQUFLLFdBQVcsTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFVBQVUsVUFBVSxNQUFNLEtBQUssV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsVUFBVSxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsVUFBVSxXQUFXLFlBQVksV0FBVyxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsT0FBTyxNQUFNLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLFVBQVUsVUFBVSxXQUFXLFlBQVksTUFBTSxNQUFNLFlBQVksV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsT0FBTyxNQUFNLFdBQVcsT0FBTyxN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c0JBQWlCLEdBQUcsQ0FBSTs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3NzL3N0eWxlcy5zY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3Njc3Mvc3R5bGVzLnNjc3M/MzIxZiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XHJcblxyXG5jb25zdCBHYW1lID0gKGZ1bmN0aW9uICgpIHtcclxuICAgbGV0IF93aW5uZXJNZXNzYWdlO1xyXG4gICBsZXQgX2NhbkdhbWVTdGFydCA9IGZhbHNlO1xyXG4gICBsZXQgX2NvbXB1dGVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcclxuICAgbGV0IHBsYXllckJvYXJkID0gR2FtZWJvYXJkKCk7XHJcblxyXG4gICBjb25zdCBnZXRDb21wdXRlckJvYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX2NvbXB1dGVyQm9hcmQuZ2V0Qm9hcmQoKTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBwbGFjZUVuZW15QXJteSA9IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIHBsYWNlIHNoaXBzXHJcbiAgICAgICAgICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSB0eXBlLmxlbmd0aDtcclxuICAgICAgICAgICAgbGV0IGhvcmllbnRhdGlvbiA9XHJcbiAgICAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpID09PSAwID8gXCJ2ZXJcIiA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICBfY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAoW3JvdywgY29sdW1uXSwgbGVuZ3RoLCBob3JpZW50YXRpb24pO1xyXG4gICAgICAgICAgICBwbGFjZUVuZW15QXJteSh0eXBlKTtcclxuICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBpZiAoIWUubWVzc2FnZS5pbmNsdWRlcyhcIkV4Y2VlZGVkIG51bWJlciBvZiBzaGlwc1wiKSkge1xyXG4gICAgICAgICAgICAgICBwbGFjZUVuZW15QXJteSh0eXBlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgcmV0dXJuIFwiZmluaXNoZWRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBmaWxsIGNvbXB1dGVyQm9hcmQgd2l0aCBzaGlwc1xyXG4gICAgICBpZiAoIV9jb21wdXRlckJvYXJkLmlzQXJteUNvbXBsZXRlKCkpIHtcclxuICAgICAgICAgbGV0IGNvbXB1dGVyU2hpcHNJbmZvID0gX2NvbXB1dGVyQm9hcmQuZ2V0U2hpcHMoKTtcclxuXHJcbiAgICAgICAgIGZvciAobGV0IHR5cGUgaW4gY29tcHV0ZXJTaGlwc0luZm8pIHtcclxuICAgICAgICAgICAgcGxhY2VFbmVteUFybXkoY29tcHV0ZXJTaGlwc0luZm9bdHlwZV0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwbGF5ZXJCb2FyZC5pc0FybXlDb21wbGV0ZSgpKSB7XHJcbiAgICAgICAgIF9jYW5HYW1lU3RhcnQgPSB0cnVlO1xyXG4gICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCB0YWtlVHVybiA9IGZ1bmN0aW9uIChyb3csIGNlbGwpIHtcclxuICAgICAgaWYgKCFfY2FuR2FtZVN0YXJ0KSByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgIGlmICghX3dpbm5lck1lc3NhZ2UpIHtcclxuICAgICAgICAgbGV0IGF0dGFja1BsYXllciA9ICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcblxyXG4gICAgICAgICAgICAgICB0aGlzLnBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjZWxsKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgIGUubWVzc2FnZS5pbmNsdWRlcyhcclxuICAgICAgICAgICAgICAgICAgICAgXCJZb3UgYWxyZWFkeSBhdHRhY2tlZCB0aGUgZm9sbG93aW5nIGNvb3JkaW5hdGVzXCJcclxuICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgYXR0YWNrUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9O1xyXG5cclxuICAgICAgICAgLy8gYXR0YWNrIGNvbXB1dGVyXHJcbiAgICAgICAgIF9jb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjZWxsKTtcclxuXHJcbiAgICAgICAgIGlmIChfY29tcHV0ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xyXG4gICAgICAgICAgICBfd2lubmVyTWVzc2FnZSA9IFwiUGxheWVyIHdvbiB0aGUgbWF0Y2hcIjtcclxuICAgICAgICAgICAgcmV0dXJuIF93aW5uZXJNZXNzYWdlO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAvLyBhdHRhY2sgcGxheWVyXHJcbiAgICAgICAgIGF0dGFja1BsYXllcigpO1xyXG5cclxuICAgICAgICAgaWYgKHRoaXMucGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcclxuICAgICAgICAgICAgX3dpbm5lck1lc3NhZ2UgPSBcIkNvbXB1dGVyIHdvbiB0aGUgbWF0Y2hcIjtcclxuICAgICAgICAgICAgcmV0dXJuIF93aW5uZXJNZXNzYWdlO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIF93aW5uZXJNZXNzYWdlO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgZ2V0V2lubmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX3dpbm5lck1lc3NhZ2U7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCByZXNldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgX2NhbkdhbWVTdGFydCA9IGZhbHNlO1xyXG4gICAgICBfY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xyXG4gICAgICB0aGlzLnBsYXllckJvYXJkID0gR2FtZWJvYXJkKCk7XHJcbiAgIH07XHJcblxyXG4gICByZXR1cm4ge1xyXG4gICAgICBwbGF5ZXJCb2FyZCxcclxuICAgICAgZ2V0Q29tcHV0ZXJCb2FyZCxcclxuICAgICAgaW5pdCxcclxuICAgICAgdGFrZVR1cm4sXHJcbiAgICAgIGdldFdpbm5lcixcclxuICAgICAgcmVzZXQsXHJcbiAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xyXG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XHJcblxyXG5jb25zdCBHYW1lYm9hcmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgIGxldCBfYm9hcmQgPSBbXTtcclxuICAgbGV0IF9zaGlwcyA9IHtcclxuICAgICAgdHlwZTE6IHsgc2hpcHM6IFtdLCBsZW5ndGg6IDUsIG1heDogMSB9LFxyXG4gICAgICB0eXBlMjogeyBzaGlwczogW10sIGxlbmd0aDogNCwgbWF4OiAyIH0sXHJcbiAgICAgIHR5cGUzOiB7IHNoaXBzOiBbXSwgbGVuZ3RoOiAzLCBtYXg6IDcgfSxcclxuICAgICAgdHlwZTQ6IHsgc2hpcHM6IFtdLCBsZW5ndGg6IDIsIG1heDogNSB9LFxyXG4gICB9O1xyXG5cclxuICAgLy8gY3JlYXRlIDEwIHJvd3MgYW5kIDEwIGNlbGxzIGZvciBfYm9hcmRcclxuICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XHJcbiAgICAgIF9ib2FyZC5wdXNoKFtdKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGNlbGwgPSAwOyBjZWxsIDwgMTA7IGNlbGwrKykge1xyXG4gICAgICAgICBfYm9hcmRbcm93XS5wdXNoKFwiflwiKTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICBjb25zdCBnZXRCb2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoX2JvYXJkKSk7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBnZXRTaGlwcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IHNoaXBzQ2xvbmUgPSB7fTtcclxuXHJcbiAgICAgIGZvciAobGV0IGtleSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgc2hpcHNDbG9uZVtrZXldID0ge307XHJcbiAgICAgICAgIHNoaXBzQ2xvbmVba2V5XS5zaGlwcyA9IFtdO1xyXG4gICAgICAgICBzaGlwc0Nsb25lW2tleV0ubGVuZ3RoID0gX3NoaXBzW2tleV0ubGVuZ3RoO1xyXG4gICAgICAgICBzaGlwc0Nsb25lW2tleV0ubWF4ID0gX3NoaXBzW2tleV0ubWF4O1xyXG5cclxuICAgICAgICAgX3NoaXBzW2tleV0uc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2xvbmUgPSBTaGlwKHNoaXAuZ2V0TGVuZ3RoKCksIHNoaXAuZ2V0Q29vcnMoKSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuZ2V0SGl0cygpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgY2xvbmUuaGl0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNoaXBzQ2xvbmVba2V5XS5zaGlwcy5wdXNoKGNsb25lKTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBzaGlwc0Nsb25lO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgZ2V0Qm9hcmRBbmRTaGlwcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGJvYXJkQ29weSA9IHRoaXMuZ2V0Qm9hcmQoKTtcclxuXHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2hpcCA9IF9zaGlwc1t0eXBlXS5zaGlwc1tpXTtcclxuICAgICAgICAgICAgbGV0IHNoaXBDb29ycyA9IGN1cnJlbnRTaGlwLmdldENvb3JzKCk7XHJcblxyXG4gICAgICAgICAgICBzaGlwQ29vcnMuZm9yRWFjaCgoY29vcnMpID0+IHtcclxuICAgICAgICAgICAgICAgbGV0IFtyb3csIGNvbHVtbl0gPSBjb29ycztcclxuXHJcbiAgICAgICAgICAgICAgIGlmIChib2FyZENvcHlbcm93XVtjb2x1bW5dID09PSBcIn5cIikge1xyXG4gICAgICAgICAgICAgICAgICBib2FyZENvcHlbcm93XVtjb2x1bW5dID0gXCJzXCI7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGJvYXJkQ29weTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHBsYWNlU2hpcCA9IGZ1bmN0aW9uIChjb29yZGluYXRlcyA9IFswLCAwXSwgbGVuZ3RoID0gMiwgb3JpZW50YXRpb24pIHtcclxuICAgICAgaWYgKGlzTmFOKE51bWJlcihjb29yZGluYXRlc1swXSkpIHx8IGlzTmFOKE51bWJlcihjb29yZGluYXRlc1sxXSkpKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvb3JkaW5hdGVzIHNob3VsZCBiZSBudW1iZXJzXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNOYU4oTnVtYmVyKGxlbmd0aCkpIHx8IGxlbmd0aCA+IDUgfHwgbGVuZ3RoIDwgMikge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMZW5ndGggc2hvdWxkIGJlIGEgbnVtYmVyIGJldHdlZW4gMiBhbmQgNVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHNoaXBDb29yZGluYXRlcyA9IFtbLi4uY29vcmRpbmF0ZXNdXTtcclxuXHJcbiAgICAgIC8vIGdlbmVyYXRlIGNvb3JkaW5hdGVzIHRoYXQgZXhwYW5kIGJhc2VkIG9uIGxlbmd0aCBhbmQgb3JpZW50YXRpb25cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgLy8gZXhwYW5kIGNvb3JkaW5hdGVzIHZlcnRpY2FsbHlcclxuICAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBcInZlclwiKSB7XHJcbiAgICAgICAgICAgIGxldCBjb29yc0NvcHkgPSBbLi4uc2hpcENvb3JkaW5hdGVzW2ldXTtcclxuICAgICAgICAgICAgY29vcnNDb3B5WzBdKys7XHJcbiAgICAgICAgICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKGNvb3JzQ29weSk7XHJcblxyXG4gICAgICAgICAgICAvLyBleHBhbmQgY29vcmRpbmF0ZXMgaG9yaXpvbnRhbGx5XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBjb29yc0NvcHkgPSBbLi4uc2hpcENvb3JkaW5hdGVzW2ldXTtcclxuICAgICAgICAgICAgY29vcnNDb3B5WzFdKys7XHJcbiAgICAgICAgICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKGNvb3JzQ29weSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY2hlY2sgaWYgc2hpcENvb3JkaW5hdGVzIGFyZSB2YWxpZFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICBsZXQgY3VycmVudENvb3IgPSBzaGlwQ29vcmRpbmF0ZXNbaV07XHJcblxyXG4gICAgICAgICBpZiAoY3VycmVudENvb3JbMF0gPiA5IHx8IGN1cnJlbnRDb29yWzBdIDwgMClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBleHBhbmRzIHRvIHdyb25nIGNvb3JkaW5hdGVzXCIpO1xyXG4gICAgICAgICBpZiAoY3VycmVudENvb3JbMV0gPiA5IHx8IGN1cnJlbnRDb29yWzFdIDwgMClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBleHBhbmRzIHRvIHdyb25nIGNvb3JkaW5hdGVzXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgbmV3U2hpcCA9IFNoaXAobGVuZ3RoLCBzaGlwQ29vcmRpbmF0ZXMpO1xyXG5cclxuICAgICAgLy8gY2hlY2sgaWYgbmV3U2hpcCBjYW4gYmUgYWRkZWQgdG8gX3NoaXBzXHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGlmIChfc2hpcHNbdHlwZV0ubGVuZ3RoID09PSBuZXdTaGlwLmdldExlbmd0aCgpKSB7XHJcbiAgICAgICAgICAgIGlmIChfc2hpcHNbdHlwZV0uc2hpcHMubGVuZ3RoIDwgX3NoaXBzW3R5cGVdLm1heCkge1xyXG4gICAgICAgICAgICAgICAvLyBjaGVjayBldmVyeSBzaGlwJ3MgY29vcmRpbmF0ZXMgdG8gc2VlIGlmIG5ld1NoaXAgZG9lcyBub3QgaGF2ZVxyXG4gICAgICAgICAgICAgICAvLyB0aGUgc2FtZSBjb29yZGluYXRlcyBvZiBhbm90aGVyIHNoaXBcclxuICAgICAgICAgICAgICAgZm9yIChsZXQgdHlwZSBpbiBfc2hpcHMpIHtcclxuICAgICAgICAgICAgICAgICAgX3NoaXBzW3R5cGVdLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgc2hpcC5nZXRDb29ycygpLmZvckVhY2goKHNoaXBDb29ycykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTaGlwLmdldENvb3JzKCkuZm9yRWFjaCgobmV3U2hpcENvb3JzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpcENvb3JzWzBdID09PSBuZXdTaGlwQ29vcnNbMF0gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpcENvb3JzWzFdID09PSBuZXdTaGlwQ29vcnNbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIG5ldyBzaGlwIGNhbm5vdCBiZSBwbGFjZSBvdmVyIGFub3RoZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgIF9zaGlwc1t0eXBlXS5zaGlwcy5wdXNoKG5ld1NoaXApO1xyXG4gICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgbGV0IGVycm9yTXNnID0gYEV4Y2VlZGVkIG51bWJlciBvZiBzaGlwczogbWF4aW11biBudW1iZXIgZm9yICR7bGVuZ3RofSBsZW5ndGggc2hpcHMgaXMgJHtfc2hpcHNbdHlwZV0ubWF4fWA7XHJcbiAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCByZW1vdmVTaGlwID0gZnVuY3Rpb24gKHJvdyA9IDAsIGNlbGwgPSAwKSB7XHJcbiAgICAgIGxldCBmaWx0ZXJlZFNoaXBzO1xyXG4gICAgICBsZXQgY29vcnM7XHJcblxyXG4gICAgICBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICAvLyBzZWFyY2ggYW5kIGZpbHRlciBvdXQgc2hpcCB0aGF0IGhhcyBcInJvd1wiIGFuZCBcImNlbGxcIiBhcyBjb29yZGluYXRlc1xyXG4gICAgICAgICBzaGlwc0xvb3A6IGZvciAobGV0IGkgPSAwOyBpIDwgX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2hpcCA9IF9zaGlwc1t0eXBlXS5zaGlwc1tpXTtcclxuICAgICAgICAgICAgbGV0IHNoaXBDb29ycyA9IGN1cnJlbnRTaGlwLmdldENvb3JzKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNoaXBDb29ycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICBpZiAoc2hpcENvb3JzW2pdWzBdID09PSByb3cgJiYgc2hpcENvb3JzW2pdWzFdID09PSBjZWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgIGZpbHRlcmVkU2hpcHMgPSBfc2hpcHNbdHlwZV0uc2hpcHMuZmlsdGVyKFxyXG4gICAgICAgICAgICAgICAgICAgICAoc2hpcCkgPT4gc2hpcCAhPT0gY3VycmVudFNoaXBcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgY29vcnMgPSBzaGlwQ29vcnM7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrIHNoaXBzTG9vcDtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgLy8gdXBkYXRlIF9zaGlwc1t0eXBlXS5zaGlwcyBhcnJheVxyXG4gICAgICAgICBpZiAoZmlsdGVyZWRTaGlwcykge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0TXNnID0gXCJSZW1vdmVkIHNoaXAgd2l0aCB0aGUgZm9sbG93aW5nIGNvb3JkaW5hdGVzOiBcIjtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdE1zZyArPSBjb29yc1xyXG4gICAgICAgICAgICAgICAucmVkdWNlKFxyXG4gICAgICAgICAgICAgICAgICAoYWNjLCBjdXJyZW50KSA9PiBhY2MgKyBgWyR7Y3VycmVudFswXX0sICR7Y3VycmVudFsxXX1dLCBgLFxyXG4gICAgICAgICAgICAgICAgICBcIlwiXHJcbiAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgLnNsaWNlKDAsIC0yKTtcclxuXHJcbiAgICAgICAgICAgIF9zaGlwc1t0eXBlXS5zaGlwcyA9IGZpbHRlcmVkU2hpcHM7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRNc2c7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGBUaGVyZSBpcyBubyBzaGlwIGluIFske3Jvd30sJHtjZWxsfV0gY29vcmRpbmF0ZXNgO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgaXNBcm15Q29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGlmIChfc2hpcHNbdHlwZV0uc2hpcHMubGVuZ3RoIDwgX3NoaXBzW3R5cGVdLm1heCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbiAocm93ID0gMCwgY2VsbCA9IDApIHtcclxuICAgICAgbGV0IHN5bWJvbCA9IFwibVwiO1xyXG5cclxuICAgICAgaWYgKHJvdyA+IDkgfHwgcm93IDwgMCB8fCBjZWxsID4gOSB8fCBjZWxsIDwgMCkge1xyXG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgIGBQcm92aWRlZCBjb29yZGluYXRlcyBhcmUgbm90IHZhbGlkOiBbJHtyb3d9LCR7Y2VsbH1dYFxyXG4gICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2JvYXJkW3Jvd11bY2VsbF0gIT09IFwiflwiKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgYFlvdSBhbHJlYWR5IGF0dGFja2VkIHRoZSBmb2xsb3dpbmcgY29vcmRpbmF0ZXM6IFske3Jvd30sJHtjZWxsfV1gXHJcbiAgICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoZWNrIGlmIGFueSBzaGlwIGhhcyBcInJvd1wiIGFuZCBcImNlbGxcIiBhcyBjb29yZGluYXRlcyBhbmQgaGl0IGl0XHJcbiAgICAgIHR5cGVMb29wOiBmb3IgKGxldCB0eXBlIGluIF9zaGlwcykge1xyXG4gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9zaGlwc1t0eXBlXS5zaGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFNoaXAgPSBfc2hpcHNbdHlwZV0uc2hpcHNbaV07XHJcbiAgICAgICAgICAgIGxldCBzaGlwQ29vcnMgPSBjdXJyZW50U2hpcC5nZXRDb29ycygpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaGlwQ29vcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgaWYgKHNoaXBDb29yc1tqXVswXSA9PT0gcm93ICYmIHNoaXBDb29yc1tqXVsxXSA9PT0gY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICBjdXJyZW50U2hpcC5oaXQoKTtcclxuICAgICAgICAgICAgICAgICAgc3ltYm9sID0gXCJoXCI7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrIHR5cGVMb29wO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBfYm9hcmRbcm93XVtjZWxsXSA9IHN5bWJvbDtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBhbGxTaGlwc1N1bmsgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZvciAobGV0IHR5cGUgaW4gX3NoaXBzKSB7XHJcbiAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3NoaXBzW3R5cGVdLnNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghX3NoaXBzW3R5cGVdLnNoaXBzW2ldLmlzU3VuaygpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgIH07XHJcblxyXG4gICByZXR1cm4ge1xyXG4gICAgICBnZXRCb2FyZCxcclxuICAgICAgZ2V0U2hpcHMsXHJcbiAgICAgIGdldEJvYXJkQW5kU2hpcHMsXHJcbiAgICAgIHBsYWNlU2hpcCxcclxuICAgICAgcmVtb3ZlU2hpcCxcclxuICAgICAgaXNBcm15Q29tcGxldGUsXHJcbiAgICAgIHJlY2VpdmVBdHRhY2ssXHJcbiAgICAgIGFsbFNoaXBzU3VuayxcclxuICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcclxuIiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vZ2FtZS5qc1wiO1xyXG5pbXBvcnQgXCIuL3Njc3Mvc3R5bGVzLnNjc3NcIjtcclxuXHJcbmNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXJCb2FyZFwiKTtcclxuY29uc3QgY3B1Qm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNwdUJvYXJkXCIpO1xyXG5jb25zdCBidXR0b25zQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0b25zLWNvbnRhaW5lclwiKTtcclxuY29uc3Qgc2hpcFRhYmxlQ291bnRlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGxhY2VkLWNvdW50ZXJcIik7XHJcbmNvbnN0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3ItbWVzc2FnZVwiKTtcclxuY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LWJ1dHRvblwiKTtcclxuXHJcbmNvbnN0IHBsYXllckJvYXJkQ2VsbHMgPSBbXTtcclxuY29uc3QgY3B1Qm9hcmRDZWxscyA9IFtdO1xyXG5cclxubGV0IGxlbmd0aCA9IG51bGw7XHJcbmxldCBob3JpZW50YXRpb24gPSBcImhvcml6b250YWxcIjtcclxubGV0IHNoaXBzSW5mbyA9IG51bGw7XHJcbmxldCBwcmV2aW91c0NsaWNrZWRCdG4gPSBudWxsO1xyXG5sZXQgY2VsbHNUb0hpZ2hsaWdodCA9IFtdO1xyXG5cclxuLy8gZ2VuZXJhdGUgcGxheWVyIGFuZCBjcHUgY2VsbHNcclxuZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XHJcbiAgIHBsYXllckJvYXJkQ2VsbHMucHVzaChbXSk7XHJcbiAgIGNwdUJvYXJkQ2VsbHMucHVzaChbXSk7XHJcblxyXG4gICBmb3IgKGxldCBjZWxsID0gMDsgY2VsbCA8IDEwOyBjZWxsKyspIHtcclxuICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgICBkaXYuY2xhc3NOYW1lID0gXCJib2FyZF9fY2VsbFwiO1xyXG4gICAgICBkaXYuZGF0YXNldC5yb3cgPSByb3c7XHJcbiAgICAgIGRpdi5kYXRhc2V0LmNlbGwgPSBjZWxsO1xyXG4gICAgICBkaXYuZGF0YXNldC5maWxsZWQgPSBcImZhbHNlXCI7XHJcbiAgICAgIHBsYXllckJvYXJkLmFwcGVuZChkaXYpO1xyXG4gICAgICBwbGF5ZXJCb2FyZENlbGxzW3Jvd10ucHVzaChkaXYpO1xyXG5cclxuICAgICAgbGV0IGNsb25lID0gZGl2LmNsb25lTm9kZSgpO1xyXG4gICAgICBjcHVCb2FyZC5hcHBlbmQoY2xvbmUpO1xyXG4gICAgICBjcHVCb2FyZENlbGxzW3Jvd10ucHVzaChjbG9uZSk7XHJcbiAgIH1cclxufVxyXG5cclxuYnV0dG9uc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tlZEJ1dHRvbnMpO1xyXG5wbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIHNob3dTaGlwUHJldmlldyk7XHJcbnBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCByZW1vdmVTaGlwUHJldmlldyk7XHJcbnBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGFjZU5ld1NoaXApO1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlQ2xpY2tlZEJ1dHRvbnMoZSkge1xyXG4gICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICAvLyBoYW5kbGUgYnV0dG9ucyB0aGF0IGNoYW5nZSBcImxlbmd0aFwiIHZhcmlhYmxlXHJcbiAgIGlmICh0YXJnZXQuZGF0YXNldC5sZW5ndGgpIHtcclxuICAgICAgbGVuZ3RoID0gK3RhcmdldC5kYXRhc2V0Lmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChwcmV2aW91c0NsaWNrZWRCdG4pIHtcclxuICAgICAgICAgcHJldmlvdXNDbGlja2VkQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJidXR0b24tLWhpZ2hsaWdodGVkXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImJ1dHRvbi0taGlnaGxpZ2h0ZWRcIik7XHJcbiAgICAgIHByZXZpb3VzQ2xpY2tlZEJ0biA9IHRhcmdldDtcclxuXHJcbiAgICAgIC8vIGhhbmRsZSBidXR0b24gdGhhdCBjaGFuZ2VzIFwiaG9yaWVudGF0aW9uXCIgdmFyaWFibGVcclxuICAgfSBlbHNlIGlmICh0YXJnZXQuaWQgPT09IFwiaG9yaWVudGF0aW9uQnV0dHRvblwiKSB7XHJcbiAgICAgIGlmIChob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgICAgIGhvcmllbnRhdGlvbiA9IFwidmVydGljYWxcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgaG9yaWVudGF0aW9uID0gXCJob3Jpem9udGFsXCI7XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93U2hpcFByZXZpZXcoZSkge1xyXG4gICBpZiAobGVuZ3RoICYmIGUudGFyZ2V0LmRhdGFzZXQucm93ICYmIGUudGFyZ2V0LmRhdGFzZXQuY2VsbCkge1xyXG4gICAgICBsZXQgY3VycmVudENlbGwgPSBlLnRhcmdldDtcclxuICAgICAgbGV0IHsgcm93LCBjZWxsIH0gPSBjdXJyZW50Q2VsbC5kYXRhc2V0O1xyXG5cclxuICAgICAgcm93ID0gK3JvdztcclxuICAgICAgY2VsbCA9ICtjZWxsO1xyXG5cclxuICAgICAgLy8gcG9wdWxhdGUgXCJjZWxsc1RvSGlnaGxpZ2h0XCIgYXJyYXlcclxuICAgICAgbGVuZ3RoTG9vcDogZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICBpZiAoIXBsYXllckJvYXJkQ2VsbHNbcm93XSB8fCAhcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdKSB7XHJcbiAgICAgICAgICAgIGJyZWFrIGxlbmd0aExvb3A7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGNlbGxzVG9IaWdobGlnaHQucHVzaChwbGF5ZXJCb2FyZENlbGxzW3Jvd11bY2VsbF0pO1xyXG4gICAgICAgICBpZiAoaG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICAgICAgICBjZWxsKys7XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJvdysrO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHBhaW50IHByZXZpZXcgcmVkIGlmIHNoaXAgbGVuZ3RoIGRvZXMgbm90IGZpdFxyXG4gICAgICBpZiAoY2VsbHNUb0hpZ2hsaWdodC5sZW5ndGggPCBsZW5ndGgpIHtcclxuICAgICAgICAgY2VsbHNUb0hpZ2hsaWdodC5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjYjUxNzE3XCI7XHJcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuYm9yZGVyQ29sb3IgPSBcIiNiNTE3MTdcIjtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAvLyBwYWludCBwcmV2aWV3IGVpdGhlciBncmVlbiBvciByZWQgYmFzZWQgb24gZmlsbGVkIGF0dHJpYnV0ZSB2YWx1ZVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBjZWxsc1RvSGlnaGxpZ2h0LmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNlbGwuZGF0YXNldC5maWxsZWQgPT09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzFjYjUxN1wiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2I1MTcxN1wiO1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJvcmRlckNvbG9yID0gXCIjYjUxNzE3XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTaGlwUHJldmlldygpIHtcclxuICAgY2VsbHNUb0hpZ2hsaWdodC5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcclxuICAgICAgY2VsbC5zdHlsZS5jb2xvciA9IFwiXCI7XHJcbiAgICAgIGNlbGwuc3R5bGUuYm9yZGVyQ29sb3IgPSBcIlwiO1xyXG4gICB9KTtcclxuICAgY2VsbHNUb0hpZ2hsaWdodCA9IFtdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwbGFjZU5ld1NoaXAoZSkge1xyXG4gICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICBpZiAobGVuZ3RoICYmIHRhcmdldC5kYXRhc2V0LnJvdyAmJiB0YXJnZXQuZGF0YXNldC5jZWxsKSB7XHJcbiAgICAgIHNoaXBzSW5mbyA9IEdhbWUucGxheWVyQm9hcmQuZ2V0U2hpcHMoKTtcclxuICAgICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJcIjsgLy8gY2xlYXIgcHJldmlvdXMgZXJyb3IgbWVzc2FnZVxyXG5cclxuICAgICAgZm9yIChsZXQgdHlwZSBpbiBzaGlwc0luZm8pIHtcclxuICAgICAgICAgLy8gaWRlbnRpZnkgd2hhdCB0eXBlIG9mIHNoaXAgdGhlIHVzZXIgaXMgZ29pbmcgdG8gcGxhY2VcclxuICAgICAgICAgaWYgKHNoaXBzSW5mb1t0eXBlXS5sZW5ndGggPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoc2hpcHNJbmZvW3R5cGVdLnNoaXBzLmxlbmd0aCA8IHNoaXBzSW5mb1t0eXBlXS5tYXgpIHtcclxuICAgICAgICAgICAgICAgLy8gcGxhY2UgbmV3IHNoaXBcclxuICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgR2FtZS5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoXHJcbiAgICAgICAgICAgICAgICAgICAgIFsrdGFyZ2V0LmRhdGFzZXQucm93LCArdGFyZ2V0LmRhdGFzZXQuY2VsbF0sXHJcbiAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgaG9yaWVudGF0aW9uLnNsaWNlKDAsIDMpXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIHNoaXBzSW5mbyA9IEdhbWUucGxheWVyQm9hcmQuZ2V0U2hpcHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChzaGlwc0luZm9bdHlwZV0uc2hpcHMubGVuZ3RoID09PSBzaGlwc0luZm9bdHlwZV0ubWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzQ2xpY2tlZEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzQ2xpY2tlZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiYnV0dG9uLS1oaWdobGlnaHRlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgdXBkYXRlUGxheWVyQm9hcmQoKTtcclxuICAgICAgICAgICAgICAgICAgcmVtb3ZlU2hpcFByZXZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgdXBkYXRlU2hpcHNUYWJsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKEdhbWUucGxheWVyQm9hcmQuaXNBcm15Q29tcGxldGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICBzdGFydEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICBzdGFydEJ0bi5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vIHByaW50IGVycm9yIG1lc3NhZ2VzXHJcbiAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICBlLm1lc3NhZ2UgPT09IFwiU2hpcCBleHBhbmRzIHRvIHdyb25nIGNvb3JkaW5hdGVzXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgZS5tZXNzYWdlID09PSBcIkEgbmV3IHNoaXAgY2Fubm90IGJlIHBsYWNlIG92ZXIgYW5vdGhlclwiXHJcbiAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIkVycm9yOiBcIiArIGUubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJFcnJvcjogQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgdHJ5aW5nIHRvIHBsYWNlIGEgbmV3IHNoaXBcIjtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUGxheWVyQm9hcmQoKSB7XHJcbiAgIGxldCBib2FyZCA9IEdhbWUucGxheWVyQm9hcmQuZ2V0Qm9hcmRBbmRTaGlwcygpO1xyXG5cclxuICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgYm9hcmQubGVuZ3RoOyByb3crKykge1xyXG4gICAgICBmb3IgKGxldCBjZWxsID0gMDsgY2VsbCA8IGJvYXJkW3Jvd10ubGVuZ3RoOyBjZWxsKyspIHtcclxuICAgICAgICAgaWYgKGJvYXJkW3Jvd11bY2VsbF0uc2VhcmNoKC9bc2htXS8pID49IDApIHtcclxuICAgICAgICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdLnRleHRDb250ZW50ID0gYm9hcmRbcm93XVtjZWxsXTtcclxuICAgICAgICAgICAgcGxheWVyQm9hcmRDZWxsc1tyb3ddW2NlbGxdLmRhdGFzZXQuZmlsbGVkID0gXCJ0cnVlXCI7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVNoaXBzVGFibGUoKSB7XHJcbiAgIGxldCBpbmRleCA9IDA7XHJcblxyXG4gICBmb3IgKGxldCB0eXBlIGluIHNoaXBzSW5mbykge1xyXG4gICAgICBzaGlwVGFibGVDb3VudGVyc1tpbmRleF0udGV4dENvbnRlbnQgPSBzaGlwc0luZm9bdHlwZV0uc2hpcHMubGVuZ3RoO1xyXG4gICAgICBpbmRleCsrO1xyXG4gICB9XHJcbn1cclxuLy8gdGhpcyBmaWxlIHdvdWxkIGJyaW5nIHRoZSBjc3MgZmlsZSBhbmQgZG9tIGZ1bmN0aW9uYWxpdHlcclxuIiwiY29uc3QgU2hpcCA9IGZ1bmN0aW9uIChsZW5ndGgsIGNvb3JkaW5hdGVzKSB7XHJcbiAgIGxldCBfY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcyB8fCBudWxsO1xyXG4gICBsZXQgX2xlbmd0aCA9IGxlbmd0aCB8fCAyO1xyXG4gICBsZXQgX2hpdHNDb3VudGVyID0gMDtcclxuXHJcbiAgIGNvbnN0IGdldENvb3JzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShfY29vcmRpbmF0ZXMpKTtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGdldExlbmd0aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF9sZW5ndGg7XHJcbiAgIH07XHJcblxyXG4gICBjb25zdCBnZXRIaXRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gX2hpdHNDb3VudGVyO1xyXG4gICB9O1xyXG5cclxuICAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBfaGl0c0NvdW50ZXIrKztcclxuICAgICAgcmV0dXJuIF9oaXRzQ291bnRlcjtcclxuICAgfTtcclxuXHJcbiAgIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIF9oaXRzQ291bnRlciA9PT0gbGVuZ3RoO1xyXG4gICB9O1xyXG5cclxuICAgcmV0dXJuIHtcclxuICAgICAgZ2V0Q29vcnMsXHJcbiAgICAgIGdldExlbmd0aCxcclxuICAgICAgZ2V0SGl0cyxcclxuICAgICAgaGl0LFxyXG4gICAgICBpc1N1bmssXHJcbiAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCxcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IDA7XFxuICBmb250LXNpemU6IDEwMCU7XFxuICBmb250OiBpbmhlcml0O1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSxcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gIHRleHQtc2hhZG93OiAwIDAgMTBweCAjMWNiNTE3O1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiAjMWNiNTE3O1xcbiAgbWFyZ2luOiAxNnB4O1xcbn1cXG5cXG5vbCwgdWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuYmxvY2txdW90ZSwgcSB7XFxuICBxdW90ZXM6IG5vbmU7XFxufVxcblxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgY29udGVudDogbm9uZTtcXG59XFxuXFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG5wIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxufVxcblxcbi5pbnN0cnVjdGlvbnMge1xcbiAgcGFkZGluZzogMXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBtYXJnaW4tdG9wOiAzcmVtO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgxIHtcXG4gIGZvbnQtc2l6ZTogMS40cmVtO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgyIHtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgxLCAuaW5zdHJ1Y3Rpb25zIGgyIHtcXG4gIG1hcmdpbjogMXJlbSAwO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGgxOmZpcnN0LWNoaWxkLCAuaW5zdHJ1Y3Rpb25zIGgyOmZpcnN0LWNoaWxkIHtcXG4gIG1hcmdpbi10b3A6IDA7XFxufVxcbi5pbnN0cnVjdGlvbnMgbGkge1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuLmluc3RydWN0aW9ucyBsaTpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLmJvYXJkLXNlY3Rpb24ge1xcbiAgbWFyZ2luLWJvdHRvbTogM3JlbTtcXG59XFxuLmJvYXJkLXNlY3Rpb24gPiBoMSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxufVxcblxcbi5ib2FyZCB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4IGF1dG87XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiA1cHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG4gIGdyaWQtY29sdW1uOiAyO1xcbiAgZ3JpZC1yb3c6IDE7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlci10b3A6IG5vbmU7XFxuICBib3JkZXItcmlnaHQ6IG5vbmU7XFxuICBib3JkZXItbGVmdDogbm9uZTtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjFcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMlxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgzKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIzXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDQpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjRcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg2KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI2XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDcpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjdcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiOFxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg5KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI5XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEwKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIxMFxcXCI7XFxufVxcblxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiA1cHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHg7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG4gIGdyaWQtY29sdW1uOiAxO1xcbiAgZ3JpZC1yb3c6IDI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGwge1xcbiAgYm9yZGVyLXRvcDogbm9uZTtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICBib3JkZXItbGVmdDogbm9uZTtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiYVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImJcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgzKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJjXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZFxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDUpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImVcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg2KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJmXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZ1xcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDgpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImhcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg5KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJpXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMTApOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImpcXFwiO1xcbn1cXG5cXG4uYm9hcmRfX2NlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZF9fYm9hcmQge1xcbiAgZ3JpZC1yb3c6IDI7XFxuICBtYXJnaW4tbGVmdDogMTBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDVweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIGdyaWQtYXV0by1yb3dzOiAzMHB4O1xcbn1cXG4uYm9hcmRfX2JvYXJkIC5ib2FyZF9fY2VsbDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWNiNTE3O1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4jZXJyb3ItbWVzc2FnZSB7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBncmlkLWNvbHVtbjogMS8tMTtcXG4gIG1hcmdpbi10b3A6IDFyZW07XFxuICBtYXJnaW4tbGVmdDogMC41cmVtO1xcbn1cXG5cXG4ucGxheWVyLWJ1dHRvbnMgdWwge1xcbiAgbWFyZ2luOiAycmVtIDA7XFxufVxcbi5wbGF5ZXItYnV0dG9ucyB1bCBsaSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XFxufVxcblxcbi5zaGlwcy10YWJsZSB7XFxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xcbn1cXG4uc2hpcHMtdGFibGUgdGFibGUge1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG59XFxuLnNoaXBzLXRhYmxlIHRkLCAuc2hpcHMtdGFibGUgdGgge1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG59XFxuXFxuI3N0YXJ0LWJ1dHRvbiB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbi5idXR0b24ge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gIHRleHQtc2hhZG93OiAwIDAgMTBweCAjMWNiNTE3O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogIzFjYjUxNztcXG4gIHBhZGRpbmc6IDAuNXJlbSAwLjhyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbi5idXR0b24tLWhpZ2hsaWdodGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxY2I1MTc7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbi5idXR0b246ZGlzYWJsZWQge1xcbiAgb3BhY2l0eTogMC40O1xcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDgwMHB4KSB7XFxuICAucGxheWVyLWJvYXJkIHtcXG4gICAgbWF4LXdpZHRoOiAxMjAwcHg7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBjb2x1bW4tZ2FwOiAxcmVtO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgfVxcbiAgLnBsYXllci1ib2FyZCBoMSB7XFxuICAgIGdyaWQtY29sdW1uOiAxLy0xO1xcbiAgICBncmlkLXJvdzogMTtcXG4gIH1cXG4gIC5wbGF5ZXItYm9hcmQgLmJvYXJkIHtcXG4gICAgZ3JpZC1jb2x1bW46IDIvMztcXG4gICAgZ3JpZC1yb3c6IDI7XFxuICB9XFxuICAucGxheWVyLWJvYXJkIC5wbGF5ZXItYnV0dG9ucyB7XFxuICAgIGdyaWQtY29sdW1uOiAzLzQ7XFxuICAgIGdyaWQtcm93OiAyO1xcbiAgfVxcblxcbiAgLnBsYXllci1idXR0b25zIHVsIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xcbiAgfVxcbiAgLnBsYXllci1idXR0b25zIHVsIGxpIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICB9XFxuICAucGxheWVyLWJ1dHRvbnMgLmJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5pbnN0cnVjdGlvbnMge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIG1heC13aWR0aDogMjgwcHg7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYm90dG9tOiAxNnB4O1xcbiAgICBsZWZ0OiAxNnB4O1xcbiAgfVxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fcmVzZXQuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3Mvc3R5bGVzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL192YXJpYWJsZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX2luc3RydWN0aW9ucy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fYm9hcmQuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX2J1dHRvbnMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX21lZGlhLXF1ZXJpZXMuc2Nzc1wiXSxcIm5hbWVzXCI6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R09MLHNCQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0FKa1BIO0FJalBHO0VBQ0cseUJIWEU7RUdZRixZQUFBO0FKbVBOO0FJalBHO0VBQ0cseUJIZkU7RUdnQkYsWUFBQTtBSm1QTjtBSWpQRztFQUNHLFlBQUE7QUptUE47O0FLdFFBO0VBQ0c7SUFDRyxpQkFBQTtJQUNBLGNBQUE7SUFDQSxhQUFBO0lBQ0EsZ0JBQUE7SUFDQSxxQ0FBQTtFTHlRSjtFS3hRSTtJQUNHLGlCQUFBO0lBQ0EsV0FBQTtFTDBRUDtFS3hRSTtJQUNHLGdCQUFBO0lBQ0EsV0FBQTtFTDBRUDtFS3hRSTtJQUNHLGdCQUFBO0lBQ0EsV0FBQTtFTDBRUDs7RUt0UUk7SUFDRyxTQUFBO0lBQ0EsbUJBQUE7RUx5UVA7RUt2UUk7SUFDRyxjQUFBO0VMeVFQO0VLdlFJO0lBQ0csY0FBQTtJQUNBLFdBQUE7RUx5UVA7QUFDRjtBS3RRQTtFQUNHO0lBQ0csU0FBQTtJQUNBLGdCQUFBO0lBQ0EsZUFBQTtJQUNBLFlBQUE7SUFDQSxVQUFBO0VMd1FKO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxyXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxyXFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXHJcXG4qL1xcclxcbkB1c2UgJy4vdmFyaWFibGVzJyBhcyAqO1xcclxcblxcclxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXHJcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxyXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcclxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXHJcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcclxcbmIsIHUsIGksIGNlbnRlcixcXHJcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcclxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcclxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcclxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXHJcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcclxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcclxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxyXFxuXFx0bWFyZ2luOiAwO1xcclxcblxcdHBhZGRpbmc6IDA7XFxyXFxuXFx0Ym9yZGVyOiAwO1xcclxcblxcdGZvbnQtc2l6ZTogMTAwJTtcXHJcXG5cXHRmb250OiBpbmhlcml0O1xcclxcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcclxcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcclxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxyXFxuXFx0ZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcbmJvZHkge1xcclxcblxcdGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxyXFxuICAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4ICRncmVlbjtcXHJcXG5cXHRsaW5lLWhlaWdodDogMTtcXHJcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXHJcXG4gICBjb2xvcjogJGdyZWVuO1xcclxcblxcdG1hcmdpbjogMTZweDtcXHJcXG59XFxyXFxub2wsIHVsIHtcXHJcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlLCBxIHtcXHJcXG5cXHRxdW90ZXM6IG5vbmU7XFxyXFxufVxcclxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcclxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXHJcXG5cXHRjb250ZW50OiAnJztcXHJcXG5cXHRjb250ZW50OiBub25lO1xcclxcbn1cXHJcXG50YWJsZSB7XFxyXFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXHJcXG59XFxyXFxucCB7XFxyXFxuXFx0bGluZS1oZWlnaHQ6IDEuNTtcXHJcXG59XCIsXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggIzFjYjUxNztcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogIzFjYjUxNztcXG4gIG1hcmdpbjogMTZweDtcXG59XFxuXFxub2wsIHVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbmJsb2NrcXVvdGUsIHEge1xcbiAgcXVvdGVzOiBub25lO1xcbn1cXG5cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGNvbnRlbnQ6IG5vbmU7XFxufVxcblxcbnRhYmxlIHtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDtcXG59XFxuXFxucCB7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbn1cXG5cXG4uaW5zdHJ1Y3Rpb25zIHtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMWNiNTE3O1xcbiAgbWFyZ2luLXRvcDogM3JlbTtcXG59XFxuLmluc3RydWN0aW9ucyBoMSB7XFxuICBmb250LXNpemU6IDEuNHJlbTtcXG59XFxuLmluc3RydWN0aW9ucyBoMiB7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG59XFxuLmluc3RydWN0aW9ucyBoMSwgLmluc3RydWN0aW9ucyBoMiB7XFxuICBtYXJnaW46IDFyZW0gMDtcXG59XFxuLmluc3RydWN0aW9ucyBoMTpmaXJzdC1jaGlsZCwgLmluc3RydWN0aW9ucyBoMjpmaXJzdC1jaGlsZCB7XFxuICBtYXJnaW4tdG9wOiAwO1xcbn1cXG4uaW5zdHJ1Y3Rpb25zIGxpIHtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcbi5pbnN0cnVjdGlvbnMgbGk6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi5ib2FyZC1zZWN0aW9uIHtcXG4gIG1hcmdpbi1ib3R0b206IDNyZW07XFxufVxcbi5ib2FyZC1zZWN0aW9uID4gaDEge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweCBhdXRvO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogNXB4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxuICBncmlkLWNvbHVtbjogMjtcXG4gIGdyaWQtcm93OiAxO1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbCB7XFxuICBib3JkZXItdG9wOiBub25lO1xcbiAgYm9yZGVyLXJpZ2h0OiBub25lO1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCIxXFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjJcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiM1xcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg0KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI0XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDUpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjVcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiNlxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg3KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCI3XFxcIjtcXG59XFxuLmJvYXJkX19sZXR0ZXJzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDgpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIjhcXFwiO1xcbn1cXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiOVxcXCI7XFxufVxcbi5ib2FyZF9fbGV0dGVycy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgxMCk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiMTBcXFwiO1xcbn1cXG5cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogNXB4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzMHB4O1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDMwcHg7XFxuICBncmlkLWNvbHVtbjogMTtcXG4gIGdyaWQtcm93OiAyO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlci10b3A6IG5vbmU7XFxuICBib3JkZXItYm90dG9tOiBub25lO1xcbiAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImFcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCgyKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJiXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoMyk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiY1xcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDQpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImRcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg1KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJlXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoNik6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiZlxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDcpOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcImdcXFwiO1xcbn1cXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIgLmJvYXJkX19jZWxsOm50aC1jaGlsZCg4KTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJoXFxcIjtcXG59XFxuLmJvYXJkX19kaWdpdHMtY29udGFpbmVyIC5ib2FyZF9fY2VsbDpudGgtY2hpbGQoOSk6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiaVxcXCI7XFxufVxcbi5ib2FyZF9fZGlnaXRzLWNvbnRhaW5lciAuYm9hcmRfX2NlbGw6bnRoLWNoaWxkKDEwKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJqXFxcIjtcXG59XFxuXFxuLmJvYXJkX19jZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmRfX2JvYXJkIHtcXG4gIGdyaWQtcm93OiAyO1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiA1cHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLWF1dG8tcm93czogMzBweDtcXG59XFxuLmJvYXJkX19ib2FyZCAuYm9hcmRfX2NlbGw6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjYjUxNztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuXFxuI2Vycm9yLW1lc3NhZ2Uge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgZ3JpZC1jb2x1bW46IDEvLTE7XFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcXG59XFxuXFxuLnBsYXllci1idXR0b25zIHVsIHtcXG4gIG1hcmdpbjogMnJlbSAwO1xcbn1cXG4ucGxheWVyLWJ1dHRvbnMgdWwgbGkge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG5cXG4uc2hpcHMtdGFibGUge1xcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXG59XFxuLnNoaXBzLXRhYmxlIHRhYmxlIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxufVxcbi5zaGlwcy10YWJsZSB0ZCwgLnNoaXBzLXRhYmxlIHRoIHtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxY2I1MTc7XFxufVxcblxcbiNzdGFydC1idXR0b24ge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4uYnV0dG9uIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggIzFjYjUxNztcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6ICMxY2I1MTc7XFxuICBwYWRkaW5nOiAwLjVyZW0gMC44cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzFjYjUxNztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWNiNTE3O1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG4uYnV0dG9uLS1oaWdobGlnaHRlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWNiNTE3O1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG4uYnV0dG9uOmRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDAuNDtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA4MDBweCkge1xcbiAgLnBsYXllci1ib2FyZCB7XFxuICAgIG1heC13aWR0aDogMTIwMHB4O1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgY29sdW1uLWdhcDogMXJlbTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gIH1cXG4gIC5wbGF5ZXItYm9hcmQgaDEge1xcbiAgICBncmlkLWNvbHVtbjogMS8tMTtcXG4gICAgZ3JpZC1yb3c6IDE7XFxuICB9XFxuICAucGxheWVyLWJvYXJkIC5ib2FyZCB7XFxuICAgIGdyaWQtY29sdW1uOiAyLzM7XFxuICAgIGdyaWQtcm93OiAyO1xcbiAgfVxcbiAgLnBsYXllci1ib2FyZCAucGxheWVyLWJ1dHRvbnMge1xcbiAgICBncmlkLWNvbHVtbjogMy80O1xcbiAgICBncmlkLXJvdzogMjtcXG4gIH1cXG5cXG4gIC5wbGF5ZXItYnV0dG9ucyB1bCB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXG4gIH1cXG4gIC5wbGF5ZXItYnV0dG9ucyB1bCBsaSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgfVxcbiAgLnBsYXllci1idXR0b25zIC5idXR0b24ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICB9XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTEwMHB4KSB7XFxuICAuaW5zdHJ1Y3Rpb25zIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBtYXgtd2lkdGg6IDI4MHB4O1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJvdHRvbTogMTZweDtcXG4gICAgbGVmdDogMTZweDtcXG4gIH1cXG59XCIsXCIkZ3JlZW46ICMxY2I1MTc7XCIsXCJAdXNlICcuL3ZhcmlhYmxlcycgYXMgKjtcXHJcXG5cXHJcXG4uaW5zdHJ1Y3Rpb25zIHtcXHJcXG4gICBwYWRkaW5nOiAxcmVtO1xcclxcbiAgIGJvcmRlcjogMXB4IHNvbGlkICRncmVlbjtcXHJcXG4gICBtYXJnaW4tdG9wOiAzcmVtO1xcclxcbiAgIGgxIHtcXHJcXG4gICAgICBmb250LXNpemU6IDEuNHJlbTtcXHJcXG4gICB9XFxyXFxuICAgaDIge1xcclxcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcclxcbiAgIH1cXHJcXG4gICBoMSwgaDIge1xcclxcbiAgICAgIG1hcmdpbjogMXJlbSAwO1xcclxcbiAgIH1cXHJcXG4gICBoMTpmaXJzdC1jaGlsZCwgaDI6Zmlyc3QtY2hpbGQge1xcclxcbiAgICAgIG1hcmdpbi10b3A6IDA7XFxyXFxuICAgfVxcclxcbiAgIGxpIHtcXHJcXG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcclxcbiAgICAgICY6bGFzdC1jaGlsZCB7XFxyXFxuICAgICAgICAgbWFyZ2luOiAwO1xcclxcbiAgICAgIH1cXHJcXG4gICB9XFxyXFxufVwiLFwiQHVzZSAnc2FzczpsaXN0JztcXHJcXG5AdXNlICcuL3ZhcmlhYmxlcycgYXMgKjtcXHJcXG5cXHJcXG4kY2VsbFdpZHRoOiAzMHB4O1xcclxcblxcclxcbi5ib2FyZC1zZWN0aW9uIHtcXHJcXG4gICBtYXJnaW4tYm90dG9tOiAzcmVtO1xcclxcbiAgICYgPiBoMSB7XFxyXFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxyXFxuICAgICAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICAgfVxcclxcbn1cXHJcXG4uYm9hcmQge1xcclxcbiAgIGZvbnQtc2l6ZTogMThweDtcXHJcXG4gICBkaXNwbGF5OiBncmlkO1xcclxcbiAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogJGNlbGxXaWR0aCBhdXRvO1xcclxcbiAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG4uYm9hcmRfX2xldHRlcnMtY29udGFpbmVyIHtcXHJcXG4gICBkaXNwbGF5OiBncmlkO1xcclxcbiAgIGdhcDogNXB4O1xcclxcbiAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAkY2VsbFdpZHRoKTtcXHJcXG4gICBncmlkLWF1dG8tcm93czogJGNlbGxXaWR0aDtcXHJcXG4gICBncmlkLWNvbHVtbjogMjtcXHJcXG4gICBncmlkLXJvdzogMTtcXHJcXG4gICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbiAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xcclxcbiAgIC5ib2FyZF9fY2VsbCB7XFxyXFxuICAgICAgYm9yZGVyLXRvcDogbm9uZTtcXHJcXG4gICAgICBib3JkZXItcmlnaHQ6IG5vbmU7XFxyXFxuICAgICAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxyXFxuXFxyXFxuICAgICAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAxMCB7XFxyXFxuICAgICAgICAgJjpudGgtY2hpbGQoI3skaX0pOjpiZWZvcmUge1xcclxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcjeyRpfSc7IFxcclxcbiAgICAgICAgIH1cXHJcXG4gICAgICB9XFxyXFxuICAgfVxcclxcbn1cXHJcXG4uYm9hcmRfX2RpZ2l0cy1jb250YWluZXIge1xcclxcbiAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgZ2FwOiA1cHg7XFxyXFxuICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAkY2VsbFdpZHRoO1xcclxcbiAgIGdyaWQtYXV0by1yb3dzOiAkY2VsbFdpZHRoO1xcclxcbiAgIGdyaWQtY29sdW1uOiAxO1xcclxcbiAgIGdyaWQtcm93OiAyO1xcclxcbiAgIC5ib2FyZF9fY2VsbCB7XFxyXFxuICAgICAgYm9yZGVyLXRvcDogbm9uZTtcXHJcXG4gICAgICBib3JkZXItYm90dG9tOiBub25lO1xcclxcbiAgICAgIGJvcmRlci1sZWZ0OiBub25lO1xcclxcblxcclxcbiAgICAgICRsZXR0ZXJzOiAnYScsJ2InLCdjJywnZCcsJ2UnLCdmJywnZycsJ2gnLCdpJywnaic7XFxyXFxuXFxyXFxuICAgICAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAxMCB7XFxyXFxuICAgICAgICAgJjpudGgtY2hpbGQoI3skaX0pOjpiZWZvcmUge1xcclxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcje2xpc3QubnRoKCRsZXR0ZXJzLCAkaSl9JzsgXFxyXFxuICAgICAgICAgfVxcclxcbiAgICAgIH1cXHJcXG4gICB9XFxyXFxufVxcclxcbi5ib2FyZF9fY2VsbCB7XFxyXFxuICAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xcclxcbiAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuLmJvYXJkX19ib2FyZCB7XFxyXFxuICAgZ3JpZC1yb3c6IDI7XFxyXFxuICAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxyXFxuICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICBnYXA6IDVweDtcXHJcXG4gICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgJGNlbGxXaWR0aCk7XFxyXFxuICAgZ3JpZC1hdXRvLXJvd3M6ICRjZWxsV2lkdGg7XFxyXFxuICAgLmJvYXJkX19jZWxsIHtcXHJcXG4gICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JlZW47XFxyXFxuICAgICAgICAgY29sb3I6IGJsYWNrO1xcclxcbiAgICAgIH1cXHJcXG4gICB9XFxyXFxufVxcclxcbiNlcnJvci1tZXNzYWdlIHtcXHJcXG4gICBmb250LXNpemU6IDFyZW07XFxyXFxuICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXHJcXG4gICBtYXJnaW4tdG9wOiAxcmVtO1xcclxcbiAgIG1hcmdpbi1sZWZ0OiAuNXJlbTtcXHJcXG59XFxyXFxuLnBsYXllci1idXR0b25zIHtcXHJcXG4gICB1bCB7XFxyXFxuICAgICAgbWFyZ2luOiAycmVtIDA7XFxyXFxuICAgfVxcclxcbiAgIHVsIGxpIHtcXHJcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgICAgbWFyZ2luLWJvdHRvbTogLjVyZW07XFxyXFxuICAgfVxcclxcbn1cXHJcXG4uc2hpcHMtdGFibGUge1xcclxcbiAgIG1hcmdpbi1ib3R0b206IDJyZW07XFxyXFxuXFxyXFxuICAgdGFibGUge1xcclxcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICRncmVlbjtcXHJcXG4gICB9XFxyXFxuICAgdGQsIHRoIHtcXHJcXG4gICAgICBwYWRkaW5nOiAuNXJlbTtcXHJcXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XFxyXFxuICAgfVxcclxcbn1cXHJcXG4jc3RhcnQtYnV0dG9uIHtcXHJcXG4gICB2aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxufVxcclxcblwiLFwiQHVzZSAnLi92YXJpYWJsZXMnIGFzICo7XFxyXFxuXFxyXFxuLmJ1dHRvbiB7XFxyXFxuICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXHJcXG4gICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggJGdyZWVuO1xcclxcbiAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcclxcbiAgIGNvbG9yOiAkZ3JlZW47XFxyXFxuICAgcGFkZGluZzogLjVyZW0gLjhyZW07XFxyXFxuICAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xcclxcbiAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAmOmhvdmVyIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JlZW47XFxyXFxuICAgICAgY29sb3I6IGJsYWNrO1xcclxcbiAgIH1cXHJcXG4gICAmLS1oaWdobGlnaHRlZCB7XFxyXFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGdyZWVuO1xcclxcbiAgICAgIGNvbG9yOiBibGFjaztcXHJcXG4gICB9XFxyXFxuICAgJjpkaXNhYmxlZCB7XFxyXFxuICAgICAgb3BhY2l0eTogLjQ7XFxyXFxuICAgfVxcclxcbn1cIixcIkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogODAwcHgpIHtcXHJcXG4gICAucGxheWVyLWJvYXJkIHtcXHJcXG4gICAgICBtYXgtd2lkdGg6IDEyMDBweDtcXHJcXG4gICAgICBtYXJnaW46IDAgYXV0bztcXHJcXG4gICAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICAgIGNvbHVtbi1nYXA6IDFyZW07XFxyXFxuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXHJcXG4gICAgICBoMSB7XFxyXFxuICAgICAgICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXHJcXG4gICAgICAgICBncmlkLXJvdzogMTtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgLmJvYXJkIHtcXHJcXG4gICAgICAgICBncmlkLWNvbHVtbjogMiAvIDM7XFxyXFxuICAgICAgICAgZ3JpZC1yb3c6IDI7XFxyXFxuICAgICAgfVxcclxcbiAgICAgIC5wbGF5ZXItYnV0dG9ucyB7XFxyXFxuICAgICAgICAgZ3JpZC1jb2x1bW46IDMgLyA0O1xcclxcbiAgICAgICAgIGdyaWQtcm93OiAyO1xcclxcbiAgICAgIH1cXHJcXG4gICB9XFxyXFxuICAgLnBsYXllci1idXR0b25zIHtcXHJcXG4gICAgICB1bCB7XFxyXFxuICAgICAgICAgbWFyZ2luOiAwO1xcclxcbiAgICAgICAgIG1hcmdpbi1ib3R0b206IDJyZW07XFxyXFxuICAgICAgfVxcclxcbiAgICAgIHVsIGxpIHtcXHJcXG4gICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgICB9XFxyXFxuICAgICAgLmJ1dHRvbiB7XFxyXFxuICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgfVxcclxcbiAgIH1cXHJcXG59XFxyXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMTAwcHgpIHtcXHJcXG4gICAuaW5zdHJ1Y3Rpb25zIHtcXHJcXG4gICAgICBtYXJnaW46IDA7XFxyXFxuICAgICAgbWF4LXdpZHRoOiAyODBweDtcXHJcXG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgICAgYm90dG9tOiAxNnB4O1xcclxcbiAgICAgIGxlZnQ6IDE2cHg7XFxyXFxuICAgfVxcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJHYW1lIiwiX3dpbm5lck1lc3NhZ2UiLCJfY2FuR2FtZVN0YXJ0IiwiX2NvbXB1dGVyQm9hcmQiLCJwbGF5ZXJCb2FyZCIsImdldENvbXB1dGVyQm9hcmQiLCJnZXRCb2FyZCIsImluaXQiLCJwbGFjZUVuZW15QXJteSIsInR5cGUiLCJyb3ciLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb2x1bW4iLCJsZW5ndGgiLCJob3JpZW50YXRpb24iLCJwbGFjZVNoaXAiLCJlIiwibWVzc2FnZSIsImluY2x1ZGVzIiwiaXNBcm15Q29tcGxldGUiLCJjb21wdXRlclNoaXBzSW5mbyIsImdldFNoaXBzIiwidGFrZVR1cm4iLCJjZWxsIiwiYXR0YWNrUGxheWVyIiwicmVjZWl2ZUF0dGFjayIsImFsbFNoaXBzU3VuayIsImdldFdpbm5lciIsInJlc2V0IiwiU2hpcCIsIl9ib2FyZCIsIl9zaGlwcyIsInR5cGUxIiwic2hpcHMiLCJtYXgiLCJ0eXBlMiIsInR5cGUzIiwidHlwZTQiLCJwdXNoIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5Iiwic2hpcHNDbG9uZSIsImtleSIsImZvckVhY2giLCJzaGlwIiwiY2xvbmUiLCJnZXRMZW5ndGgiLCJnZXRDb29ycyIsImkiLCJnZXRIaXRzIiwiaGl0IiwiZ2V0Qm9hcmRBbmRTaGlwcyIsImJvYXJkQ29weSIsImN1cnJlbnRTaGlwIiwic2hpcENvb3JzIiwiY29vcnMiLCJjb29yZGluYXRlcyIsIm9yaWVudGF0aW9uIiwiaXNOYU4iLCJOdW1iZXIiLCJFcnJvciIsInNoaXBDb29yZGluYXRlcyIsImNvb3JzQ29weSIsImN1cnJlbnRDb29yIiwibmV3U2hpcCIsIm5ld1NoaXBDb29ycyIsImVycm9yTXNnIiwicmVtb3ZlU2hpcCIsImZpbHRlcmVkU2hpcHMiLCJqIiwiZmlsdGVyIiwic2hpcHNMb29wIiwicmVzdWx0TXNnIiwicmVkdWNlIiwiYWNjIiwiY3VycmVudCIsInNsaWNlIiwic3ltYm9sIiwidHlwZUxvb3AiLCJpc1N1bmsiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3B1Qm9hcmQiLCJidXR0b25zQ29udGFpbmVyIiwic2hpcFRhYmxlQ291bnRlcnMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiZXJyb3JNZXNzYWdlIiwic3RhcnRCdG4iLCJwbGF5ZXJCb2FyZENlbGxzIiwiY3B1Qm9hcmRDZWxscyIsInNoaXBzSW5mbyIsInByZXZpb3VzQ2xpY2tlZEJ0biIsImNlbGxzVG9IaWdobGlnaHQiLCJkaXYiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiZGF0YXNldCIsImZpbGxlZCIsImFwcGVuZCIsImNsb25lTm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbGlja2VkQnV0dG9ucyIsInNob3dTaGlwUHJldmlldyIsInJlbW92ZVNoaXBQcmV2aWV3IiwicGxhY2VOZXdTaGlwIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiaWQiLCJjdXJyZW50Q2VsbCIsImxlbmd0aExvb3AiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwiYm9yZGVyQ29sb3IiLCJ0ZXh0Q29udGVudCIsImRpc2FibGVkIiwidXBkYXRlUGxheWVyQm9hcmQiLCJ1cGRhdGVTaGlwc1RhYmxlIiwidmlzaWJpbGl0eSIsImJvYXJkIiwic2VhcmNoIiwiaW5kZXgiLCJfY29vcmRpbmF0ZXMiLCJfbGVuZ3RoIiwiX2hpdHNDb3VudGVyIl0sInNvdXJjZVJvb3QiOiIifQ==