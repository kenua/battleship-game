const Ship = function (length, coordinates) {
   let _coordinates = coordinates || null;
   let _length = length || 2;
   let _hitsCounter = 0;

   const getCoors = function () {
      return JSON.parse(JSON.stringify(_coordinates));
   };

   const getLength = function () {
      return _length;
   };

   const getHits = function () {
      return _hitsCounter;
   };

   const hit = function () {
      _hitsCounter++;
      return _hitsCounter;
   };

   const isSunk = function () {
      return _hitsCounter === length;
   };

   return {
      getCoors,
      getLength,
      getHits,
      hit,
      isSunk,
   };
};

export default Ship;
