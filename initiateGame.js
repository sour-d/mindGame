const { writeData } = require('./library.js');

const data = {
  'correctPath': [2, 6, 7, 11, 15],
  'currentPosition': null,
  'rows': 4,
  'columns': 4,
  'prevPosition': null,
  'lastMove': 'pass'
};

writeData('./data.json', JSON.stringify(data));
