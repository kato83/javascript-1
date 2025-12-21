/**
 * 配列から重複要素を削除する
 * @param {Array} arr - 処理対象の配列
 * @returns {Array} 重複が削除された配列
 */
export function removeDuplicates(arr) {
  return [...new Set(arr)];
}

/**
 * オブジェクトの配列を指定したキーでグループ化する
 * @param {Array} arr - オブジェクトの配列
 * @param {string} key - グループ化に使用するキー
 * @returns {Object} グループ化されたオブジェクト
 */
export function groupBy(arr, key) {
  return arr.reduce((groups, item) => {
    const groupKey = item[key];
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {});
}

/**
 * オブジェクトの配列を指定したプロパティでソートする
 * @param {Array} arr - ソート対象の配列
 * @param {string} property - ソートに使用するプロパティ
 * @param {boolean} ascending - 昇順の場合true、降順の場合false
 * @returns {Array} ソートされた配列
 */
export function sortByProperty(arr, property, ascending = true) {
  return [...arr].sort((a, b) => {
    const aVal = a[property];
    const bVal = b[property];

    if (aVal < bVal) return ascending ? -1 : 1;
    if (aVal > bVal) return ascending ? 1 : -1;
    return 0;
  });
}

/**
 * 指定したプロパティの値で要素を検索する
 * @param {Array} arr - 検索対象の配列
 * @param {string} property - 検索に使用するプロパティ
 * @param {*} value - 検索する値
 * @returns {Object|undefined} 見つかった要素、見つからない場合はundefined
 */
export function findByProperty(arr, property, value) {
  return arr.find((item) => item[property] === value);
}

/**
 * 数値配列の平均値を計算する
 * @param {Array<number>} arr - 数値の配列
 * @returns {number} 平均値
 */
export function calculateAverage(arr) {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((total, num) => total + num, 0);
  return sum / arr.length;
}

/**
 * 指定したプロパティのユニークな値を取得する
 * @param {Array} arr - オブジェクトの配列
 * @param {string} property - 値を取得するプロパティ
 * @returns {Array} ユニークな値の配列
 */
export function getUniqueValues(arr, property) {
  const values = arr.map((item) => item[property]);
  return [...new Set(values)];
}

/**
 * 日付範囲で配列をフィルタリングする
 * @param {Array} arr - フィルタリング対象の配列
 * @param {string} dateProperty - 日付プロパティのキー
 * @param {Date} startDate - 開始日
 * @param {Date} endDate - 終了日
 * @returns {Array} フィルタリングされた配列
 */
export function filterByDateRange(arr, dateProperty, startDate, endDate) {
  return arr.filter((item) => {
    const itemDate = item[dateProperty];
    return itemDate >= startDate && itemDate <= endDate;
  });
}
