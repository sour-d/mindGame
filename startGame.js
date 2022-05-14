const { initateMove, writeData, readData } = require('./library.js');

const main = function () {
  const dataFilePath = './data.json';
  const destination = process.argv[2] ? +process.argv[2] : null;
  const data = readData(dataFilePath);

  const updatedData = initateMove(data, destination);
  writeData(dataFilePath, JSON.stringify(updatedData));

  const exitStatus = updatedData.lastMove === 'pass' ? 0 : 1;
  process.exit(exitStatus);
};

main();
