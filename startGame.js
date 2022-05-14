const {
  initateMove,
  writeData,
  readData,
  displayGameStatus,
  currentPosition, isFinished
} = require('./library.js');

const playARound = function (data, destination) {
  const updatedData = initateMove(data, destination);
  
  displayGameStatus(updatedData, destination);
  if (currentPosition(updatedData) === null) {
    console.log('\nBad Luck! Start Again!!');
    return false;
  }
  if (isFinished(updatedData, destination)) {
    console.log('\nBingo!!');
    return false;
  }
  return true;
};

const main = function () {
  const dataFilePath = './data.json';
  const destination = process.argv[2] ? +process.argv[2] : null;
  const data = readData(dataFilePath);
  if (!playARound(data, destination)) {
    process.exit(1);
  } else {
    writeData(dataFilePath, JSON.stringify(data));
    return;
  }
}

main();
