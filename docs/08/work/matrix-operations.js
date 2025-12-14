/**
 * 指定されたサイズの2次元配列を作成する
 * @param {number} rows - 行数
 * @param {number} cols - 列数
 * @param {*} initialValue - 初期値
 * @returns {Array[]} 作成された2次元配列
 */
export function createMatrix(rows, cols, initialValue) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(initialValue);
    }
    matrix.push(row);
  }
  return matrix;
}

/**
 * 指定された位置の要素を取得する
 * @param {Array[]} matrix - 2次元配列
 * @param {number} row - 行インデックス
 * @param {number} col - 列インデックス
 * @returns {*} 指定された位置の要素（範囲外の場合はundefined）
 */
export function getMatrixElement(matrix, row, col) {
  if (row < 0 || row >= matrix.length) {
    return undefined;
  }
  if (col < 0 || col >= matrix[row].length) {
    return undefined;
  }
  return matrix[row][col];
}

/**
 * 指定された位置に値を設定する
 * @param {Array[]} matrix - 2次元配列
 * @param {number} row - 行インデックス
 * @param {number} col - 列インデックス
 * @param {*} value - 設定する値
 */
export function setMatrixElement(matrix, row, col, value) {
  if (row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length) {
    matrix[row][col] = value;
  }
}

/**
 * 指定された行を取得する
 * @param {Array[]} matrix - 2次元配列
 * @param {number} row - 行インデックス
 * @returns {Array|undefined} 指定された行の配列（範囲外の場合はundefined）
 */
export function getMatrixRow(matrix, row) {
  if (row < 0 || row >= matrix.length) {
    return undefined;
  }
  return matrix[row].slice(); // コピーを返す
}

/**
 * 指定された列を取得する
 * @param {Array[]} matrix - 2次元配列
 * @param {number} col - 列インデックス
 * @returns {Array} 指定された列の配列
 */
export function getMatrixColumn(matrix, col) {
  if (col < 0 || matrix.length === 0) {
    return [];
  }

  const column = [];
  for (let i = 0; i < matrix.length; i++) {
    if (col < matrix[i].length) {
      column.push(matrix[i][col]);
    }
  }
  return column;
}

/**
 * 2次元配列の全要素の合計を計算する
 * @param {Array[]} matrix - 2次元配列
 * @returns {number} 全要素の合計
 */
export function calculateMatrixSum(matrix) {
  let sum = 0;
  for (const row of matrix) {
    for (const element of row) {
      sum += element;
    }
  }
  return sum;
}
