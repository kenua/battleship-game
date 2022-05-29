import Ship from "./ship.js";

const Gameboard = function () {
   let _board = [];
   let _ships = {
      type1: { ships: [], length: 5, max: 1, symbol: "A" },
      type2: { ships: [], length: 4, max: 2, symbol: "B" },
      type3: { ships: [], length: 3, max: 3, symbol: "C" },
      type4: { ships: [], length: 2, max: 4, symbol: "D" },
   };

   // create 10 rows and 10 cells for _board
   for (let row = 0; row < 10; row++) {
      _board.push([]);

      for (let cell = 0; cell < 10; cell++) {
         _board[row].push("~");
      }
   }

   const getBoard = function () {
      return JSON.parse(JSON.stringify(_board));
   };

   const getShips = function () {
      let shipsClone = {};

      for (let key in _ships) {
         shipsClone[key] = {};
         shipsClone[key].ships = [];
         shipsClone[key].length = _ships[key].length;
         shipsClone[key].max = _ships[key].max;

         _ships[key].ships.forEach((ship) => {
            let clone = Ship(ship.getLength(), ship.getCoors());

            for (let i = 0; i < ship.getHits(); i++) {
               clone.hit();
            }

            shipsClone[key].ships.push(clone);
         });
      }

      return shipsClone;
   };

   const getBoardAndShips = function () {
      let boardCopy = this.getBoard();

      for (let type in _ships) {
         for (let i = 0; i < _ships[type].ships.length; i++) {
            let currentShip = _ships[type].ships[i];
            let shipCoors = currentShip.getCoors();

            shipCoors.forEach((coors) => {
               let [row, column] = coors;

               if (boardCopy[row][column] === "~") {
                  boardCopy[row][column] = _ships[type].symbol;
               }
            });
         }
      }

      return boardCopy;
   };

   const placeShip = function (coordinates = [0, 0], length = 2, direction) {
      if (isNaN(Number(coordinates[0])) || isNaN(Number(coordinates[1]))) {
         throw new Error("Coordinates should be numbers");
      }

      if (isNaN(Number(length)) || length > 5 || length < 2) {
         throw new Error("Length should be a number between 2 and 5");
      }

      let shipCoordinates = [[...coordinates]];

      // generate coordinates that expand based on length and direction
      for (let i = 0; i < length - 1; i++) {
         // expand coordinates vertically
         if (direction === "ver") {
            let coorsCopy = [...shipCoordinates[i]];
            coorsCopy[0]++;
            shipCoordinates.push(coorsCopy);

            // expand coordinates horizontally
         } else {
            let coorsCopy = [...shipCoordinates[i]];
            coorsCopy[1]++;
            shipCoordinates.push(coorsCopy);
         }
      }

      // check if shipCoordinates are valid
      for (let i = 0; i < shipCoordinates.length; i++) {
         let currentCoor = shipCoordinates[i];

         if (currentCoor[0] > 9 || currentCoor[0] < 0)
            throw new Error("Ship expands to wrong coordinates");
         if (currentCoor[1] > 9 || currentCoor[1] < 0)
            throw new Error("Ship expands to wrong coordinates");
      }

      let newShip = Ship(length, shipCoordinates);

      // check if newShip can be added to _ships
      for (let type in _ships) {
         if (_ships[type].length === newShip.getLength()) {
            if (_ships[type].ships.length < _ships[type].max) {
               // check every ship's coordinates to see if newShip does not have
               // the same coordinates of another ship
               for (let type in _ships) {
                  _ships[type].ships.forEach((ship) => {
                     ship.getCoors().forEach((shipCoors) => {
                        newShip.getCoors().forEach((newShipCoors) => {
                           if (
                              shipCoors[0] === newShipCoors[0] &&
                              shipCoors[1] === newShipCoors[1]
                           ) {
                              throw new Error(
                                 "A new ship cannot be place over another"
                              );
                           }
                        });
                     });
                  });
               }

               _ships[type].ships.push(newShip);
               return this;
            } else {
               let errorMsg = `Exceeded number of ships: maximun number for ${length} length ships is ${_ships[type].max}`;
               throw new Error(errorMsg);
            }
         }
      }
   };

   const removeShip = function (row = 0, cell = 0) {
      let filteredShips;
      let coors;

      for (let type in _ships) {
         // search and filter out ship that has "row" and "cell" as coordinates
         shipsLoop: for (let i = 0; i < _ships[type].ships.length; i++) {
            let currentShip = _ships[type].ships[i];
            let shipCoors = currentShip.getCoors();

            for (let j = 0; j < shipCoors.length; j++) {
               if (shipCoors[j][0] === row && shipCoors[j][1] === cell) {
                  filteredShips = _ships[type].ships.filter(
                     (ship) => ship !== currentShip
                  );
                  coors = shipCoors;
                  break shipsLoop;
               }
            }
         }
         // update _ships[type].ships array
         if (filteredShips) {
            let resultMsg = "Removed ship with the following coordinates: ";

            resultMsg += coors
               .reduce(
                  (acc, current) => acc + `[${current[0]}, ${current[1]}], `,
                  ""
               )
               .slice(0, -2);

            _ships[type].ships = filteredShips;
            return resultMsg;
         }
      }

      return `There is no ship in [${row},${cell}] coordinates`;
   };

   const isArmyComplete = function () {
      for (let type in _ships) {
         if (_ships[type].ships.length < _ships[type].max) return false;
      }

      return true;
   };

   const receiveAttack = function (row = 0, cell = 0) {
      let symbol = "/";

      if (row > 9 || row < 0 || cell > 9 || cell < 0) {
         throw new Error(
            `Provided coordinates are not valid: [${row},${cell}]`
         );
      }

      if (_board[row][cell] !== "~") {
         throw new Error(
            `You already attacked the following coordinates: [${row},${cell}]`
         );
      }

      // check if any ship has "row" and "cell" as coordinates and hit it
      typeLoop: for (let type in _ships) {
         for (let i = 0; i < _ships[type].ships.length; i++) {
            let currentShip = _ships[type].ships[i];
            let shipCoors = currentShip.getCoors();

            for (let j = 0; j < shipCoors.length; j++) {
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

   const allShipsSunk = function () {
      for (let type in _ships) {
         for (let i = 0; i < _ships[type].ships.length; i++) {
            if (!_ships[type].ships[i].isSunk()) return false;
         }
      }

      return true;
   };

   return {
      getBoard,
      getShips,
      getBoardAndShips,
      placeShip,
      removeShip,
      isArmyComplete,
      receiveAttack,
      allShipsSunk,
   };
};

export default Gameboard;
