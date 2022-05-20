/* eslint-disable no-magic-numbers */
const updateMove = function (data, destination) {
  data.previousPosition = data.currentPosition;
  data.currentPosition = destination;
  return data;
};

const isBombPresent = function (data, destination) {
  return !data.validPaths.includes(destination);
};

const validMoves = function ({ totalColumn, currentPosition }) {
  if (currentPosition === null) {
    return Array(totalColumn).fill(0).map(function (element, index) {
      return index + 1;
    });
  }
  const moves = [
    currentPosition - totalColumn, currentPosition + totalColumn,
    currentPosition + 1, currentPosition - 1
  ];
  
  if (currentPosition % totalColumn === 1) {
    moves.splice(3, 1);
  }
  if (currentPosition % totalColumn === 0) {
    moves.splice(2, 1);
  }
  return moves;
};

const isDirectionValid = function (data, destination) {
  return validMoves(data, destination).includes(destination);
};

const validateMove = function (data, destination) {
  return (
    !isBombPresent(data, destination)
    &&
    isDirectionValid(data, destination)
  );
};

const playRound = function (data, destination) {
  if (validateMove(data, destination)) {
    return updateMove(data, destination);
  }
  data.lastRoundStatus = false;
  return data;
};

exports.playRound = playRound;
exports.validateMove = validateMove;
exports.validMoves = validMoves;
exports.updateMove = updateMove;
exports.isBombPresent = isBombPresent;
