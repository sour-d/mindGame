const { displayGameStatus, readData } = require('./library.js');

const dataFilePath = './data.json';
const data = readData(dataFilePath);
displayGameStatus(data);
