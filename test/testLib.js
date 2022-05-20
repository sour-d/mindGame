const assert = require('assert');
const { playRound, validateMove, validMoves, updateMove } = require('../src/lib.js');

describe('playRound', () => {
  it('should change currentPositon if move is valid', () => {
    const data = {
      'validPaths': [2],
      'currentPosition': null,
      'previousPosition': null,
      'lastRoundStatus': true,
      'totalRow': 3,
      'totalColumn': 3,
    };
    const expected = {
      'validPaths': [2],
      'currentPosition': 2,
      'previousPosition': null,
      'lastRoundStatus': true,
      'totalRow': 3,
      'totalColumn': 3,
    };
    assert.deepStrictEqual(playRound(data, 2), expected);
  });

  it('should change currentPositon if move is invalid', () => {
    const data = {
      'validPaths': [2, 5, 8],
      'currentPosition': null,
      'previousPosition': null,
      'lastRoundStatus': true,
      'totalRow': 3,
      'totalColumn': 3,
    };
    const expected = {
      'validPaths': [2, 5, 8],
      'currentPosition': null,
      'previousPosition': null,
      'lastRoundStatus': false,
      'totalRow': 3,
      'totalColumn': 3,
    };
    assert.deepStrictEqual(playRound(data, 3), expected);
  });
});

describe('validateMove', () => {
  const data = {
    'validPaths': [2, 5, 8],
    'currentPosition': 2,
    'previousPosition': null,
    'lastRoundStatus': true,
    'totalRow': 3,
    'totalColumn': 3,
  };

  it('move is valid and doesn\'t have bomb', () => {
    assert.deepStrictEqual(validateMove(data, 5), true);
  });
  it('move is vaild but have bomb', () => {
    assert.deepStrictEqual(validateMove(data, 3), false);
  });
  it('move is invaild but don\'t have bomb', () => {
    assert.deepStrictEqual(validateMove(data, 8), false);
  });
});

describe('validMoves', () => {
  it('should return the first row when currentPosition is null', () => {
    const data = {
      // 'validPaths': [2, 5, 8],
      'currentPosition': null,
      // 'previousPosition': null,
      // 'lastRoundStatus': true,
      'totalRow': 3,
      'totalColumn': 3,
    };
    assert.deepStrictEqual(validMoves(data, 2), [1, 2, 3]);
  });
});

describe('updateMove', () => {
  it('should update the position of given objet', () => {
    const data = {
      'validPaths': [2, 3, 4],
      'currentPosition': 2,
      'previousPosition': null,
      'lastRoundStatus': true,
      'totalRow': 3,
      'totalColumn': 3,
    };
    const expected = {
      'validPaths': [2, 3, 4],
      'currentPosition': 3,
      'previousPosition': 2,
      'lastRoundStatus': true,
      'totalRow': 3,
      'totalColumn': 3,
    };
    assert.deepStrictEqual(updateMove(data, 3), expected);
  });
});
