/* eslint-disable no-magic-numbers */
const fs = require('fs');

const columns = (data) => data.columns;
const rows = (data) => data.rows;
const correctPath = (data) => data.correctPath;
const currentPosition = (data) => data.currentPosition;
const totalGrids = (data) => columns(data) * rows(data);

const generateFormatGrids = function (data, destination) {
  const grids = Array(totalGrids(data)).fill('⬛️');
  if (!destination) {
    return grids;
  }
  const destStatus = destination === currentPosition(data) ? '🟩' : '🟥';
  grids.splice(destination - 1, 1, destStatus);
  return grids;
};

const displayGameStatus = function (data, destination = null) {
  const formattedGrids = generateFormatGrids(data, destination);
  for (let row = rows(data) - 1; row >= 0; row--) {
    const rowStart = row * rows(data);
    const rowEnd = rowStart + rows(data);
    console.log(...formattedGrids.slice(rowStart, rowEnd));
  }
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

const allMoves = function (currentPosition, totalColumns) {
  const possibleMoves = [];

  possibleMoves.push(currentPosition - totalColumns);
  possibleMoves.push(currentPosition + totalColumns);
  if (currentPosition % totalColumns === 1) {
    possibleMoves.push(currentPosition + 1);
  } else if (currentPosition % totalColumns === 0) {
    possibleMoves.push(currentPosition - 1);
  } else {
    possibleMoves.push(currentPosition + 1);
    possibleMoves.push(currentPosition - 1);
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

const isFinished = function (data, destination) {
  return totalGrids(data) - columns(data) < destination;
};

const move = function (data, destination) {
  if (!isValidMove(data, destination)) {
    data.currentPosition = null;
    return data;
  }
  if (isBombPresent(data, destination)) {
    data.currentPosition = null;
    return data;
  }
  data.currentPosition = destination;
  return data;
};

exports.initateMove = move;
exports.readData = readData;
exports.writeData = writeData;
exports.displayGameStatus = displayGameStatus;
exports.currentPosition = currentPosition;
exports.isFinished = isFinished;
