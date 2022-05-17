const { writeData } = require('./library.js');

const data = {
  'validPaths': [2, 3, 6, 9],
  'currentPosition': null,
  'prevPosition': null,
  'lastMove': true,
  'isFinished': false,
  'totalRows': 3,
  'totalColumns': 3,
};

writeData('./data.json', JSON.stringify(data));
