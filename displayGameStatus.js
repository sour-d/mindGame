const { displayGameStatus, readData } = require('./library.js');

const dataFilePath = './data.json';
const destination = process.argv[2] ? process.argv[2] : null;
const data = readData(dataFilePath);
displayGameStatus(data, destination);
