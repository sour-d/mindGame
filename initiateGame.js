const { writeData } = require('./library.js');

const data = {
  'correctPath': [1, 4, 5, 6, 7, 8, 9],
  'currentPosition': null,
  'rows': 3,
  'columns': 3
};

writeData('./data.json', JSON.stringify(data));
