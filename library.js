/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
const fs = require('fs');

const readData = function (filePath) {
  try {
    let data = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(data);

    data.totalGrids = data.totalRows * data.totalColumns;
    data.updatePosition = function (position) {
      this.prevPosition = this.currentPosition;
      this.currentPosition = position;
      return this;
    };
    return data;
  } catch (error) {
    return error;
  }
};

const writeData = function (filePath, data) {
  fs.writeFileSync(filePath, data, 'utf8');
};

const formattedGrids = function (data) {
  const lastMoveStatus = data.lastMove ? '🧍' : '🔥';
  let counter = 0;
  return Array(data.totalRows).fill(0).map(function () {
    return Array(data.totalColumns).fill(0).map(function () {
      counter = counter + 1;
      if (counter === data.currentPosition) {
        return lastMoveStatus;
      }
      return ''.concat(counter).padStart(2, 0);
    }).join(' ');
  }).reverse();
};

const displayGameStatus = function (data, message) {
  const grids = formattedGrids(data);
  console.log(grids.join('\n'), message ? '\n\n' + message : '');
};

const allMoves = function (currentPosition, totalColumns) {
  const possibleMoves = [
    currentPosition - totalColumns, currentPosition + totalColumns,
    currentPosition + 1, currentPosition - 1
  ];
  
  if (currentPosition % totalColumns === 1) {
    possibleMoves.splice(3, 1);
  }
  if (currentPosition % totalColumns === 0) {
    possibleMoves.splice(2, 1);
  }
  return possibleMoves;
};

const isValidMove = function ({currentPosition, totalColumns}, destination) {
  if (currentPosition === null && destination <= totalColumns) {
    return true;
  }
  return allMoves(currentPosition, totalColumns).includes(destination);
};

const isBombPresent = function ({validPaths}, destination) {
  return !validPaths.includes(destination);
};

const isFinished = function ({totalGrids, totalColumns, currentPosition}) {
  return totalGrids - totalColumns < currentPosition;
};

const move = function (data, destination) {
  let message = 'Great Choice! 👍';

  //wrong move
  if (!isValidMove(data, destination) || isBombPresent(data, destination)) {
    data.isFinished = true;
    data.lastMove = false;
    message = 'Boom!! 🔥💣';
  }

  const updatedData = data.updatePosition(destination);
  if (isFinished(updatedData)) {
    data.isFinished = true;
    message = 'You won!';
  }

  //displaying game status
  displayGameStatus(updatedData, message);
  return updatedData;
};

exports.initateMove = move;
exports.readData = readData;
exports.writeData = writeData;
exports.displayGameStatus = displayGameStatus;
