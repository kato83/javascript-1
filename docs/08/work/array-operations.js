/**
 * 2つの配列を結合して新しい配列を返す
 * @param {Array} array1 - 最初の配列
 * @param {Array} array2 - 2番目の配列
 * @returns {Array} 結合された新しい配列
 */
export function combineArrays(array1, array2) {
  return array1.concat(array2);
}

/**
 * 配列の前半部分を返す
 * @param {Array} array - 対象の配列
 * @returns {Array} 配列の前半部分
 */
export function getFirstHalf(array) {
  const halfIndex = Math.floor(array.length / 2);
  return array.slice(0, halfIndex);
}

/**
 * 配列の後半部分を返す
 * @param {Array} array - 対象の配列
 * @returns {Array} 配列の後半部分
 */
export function getSecondHalf(array) {
  const halfIndex = Math.floor(array.length / 2);
  return array.slice(halfIndex);
}

/**
 * 配列の最初と最後を除いた中間部分を返す
 * @param {Array} array - 対象の配列
 * @returns {Array} 配列の中間部分
 */
export function getMiddleElements(array) {
  if (array.length <= 2) {
    return [];
  }
  return array.slice(1, -1);
}

/**
 * 配列を逆順にした新しい配列を返す（元の配列は変更しない）
 * @param {Array} array - 対象の配列
 * @returns {Array} 逆順にした新しい配列
 */
export function reverseArray(array) {
  return array.slice().reverse();
}
