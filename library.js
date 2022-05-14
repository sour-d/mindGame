/* eslint-disable no-magic-numbers */
const fs = require('fs');

const columns = (data) => data.columns;
const rows = (data) => data.rows;
const correctPath = (data) => data.correctPath;
const currentPosition = (data) => data.currentPosition;
// const prevPosition = (data) => data.prevPosition;
const totalGrids = (data) => columns(data) * rows(data);

const updatePos = function (data, pos) {
  data.prevPosition = data.currentPosition;
  data.currentPosition = pos;
  return data;
};

const readData = function (filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
};

const writeData = function (filePath, data) {
  fs.writeFileSync(filePath, data, 'utf8');
};

const generateFormatGrids = function (data) {
  const grids = Array(totalGrids(data)).fill('⬛️');
  if (!currentPosition(data)) {
    return grids;
  }
  const destStatus = data.lastMove === 'fail' ? '🟥' : '🟩';
  grids.splice(currentPosition(data) - 1, 1, destStatus);
  return grids;
};

const displayGameStatus = function (data) {
  const formattedGrids = generateFormatGrids(data);
  for (let row = rows(data) - 1; row >= 0; row--) {
    const rowStart = row * rows(data);
    const rowEnd = rowStart + rows(data);
    console.log(...formattedGrids.slice(rowStart, rowEnd));
  }
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

const isValidMove = function (data, destination) {
  if (currentPosition(data) === null && destination <= columns(data)) {
    return true;
  }
  return allMoves(currentPosition(data), columns(data)).includes(destination);
};

const isBombPresent = function (data, destination) {
  return !correctPath(data).includes(destination);
};

const isFinished = function (data) {
  return totalGrids(data) - columns(data) < currentPosition(data);
};

const move = function (data, destination) {
  let message = '\nGood Choice! 👍';

  //wrong move
  if (!isValidMove(data, destination) || isBombPresent(data, destination)) {
    data.lastMove = 'fail';
    message = '\nBoom!! 🔥💣';
  }

  const updatedData = updatePos(data, destination);
  if (isFinished(updatedData)) {
    data.lastMove = null;
  }

  //displaying game status
  displayGameStatus(updatedData, destination);
  console.log(message);
  return updatedData;
};

exports.initateMove = move;
exports.readData = readData;
exports.writeData = writeData;
exports.displayGameStatus = displayGameStatus;
