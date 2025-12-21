// 課題4: 配列操作（応用）の模範解答

/**
 * 配列から重複要素を削除する
 * @param {Array} array - 対象の配列
 * @returns {Array} 重複が削除された配列
 */
export function removeDuplicates(array) {
  return [...new Set(array)];
}

/**
 * オブジェクトの配列を指定したキーでグループ化する
 * @param {Array} array - オブジェクトの配列
 * @param {string} key - グループ化のキー
 * @returns {Object} グループ化されたオブジェクト
 */
export function groupBy(array, key) {
  return array.reduce((groups, item) => {
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
 * @param {Array} array - オブジェクトの配列
 * @param {string} property - ソートするプロパティ
 * @param {boolean} ascending - 昇順の場合true、降順の場合false
 * @returns {Array} ソートされた新しい配列
 */
export function sortByProperty(array, property, ascending = true) {
  return [...array].sort((a, b) => {
    const valueA = a[property];
    const valueB = b[property];

    if (valueA < valueB) {
      return ascending ? -1 : 1;
    }
    if (valueA > valueB) {
      return ascending ? 1 : -1;
    }
    return 0;
  });
}

/**
 * 指定したプロパティの値で要素を検索する
 * @param {Array} array - オブジェクトの配列
 * @param {string} property - 検索するプロパティ
 * @param {*} value - 検索する値
 * @returns {Object|undefined} 見つかった要素、見つからない場合はundefined
 */
export function findByProperty(array, property, value) {
  return array.find((item) => item[property] === value);
}

/**
 * 数値配列の平均値を計算する
 * @param {number[]} numbers - 数値の配列
 * @returns {number} 平均値（空配列の場合は0）
 */
export function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((total, num) => total + num, 0);
  return sum / numbers.length;
}

/**
 * 指定したプロパティのユニークな値を取得する
 * @param {Array} array - オブジェクトの配列
 * @param {string} property - 対象のプロパティ
 * @returns {Array} ユニークな値の配列
 */
export function getUniqueValues(array, property) {
  const values = array.map((item) => item[property]);
  return [...new Set(values)];
}

/**
 * 日付範囲で配列をフィルタリングする
 * @param {Array} array - オブジェクトの配列
 * @param {string} dateProperty - 日付プロパティ名
 * @param {Date} startDate - 開始日
 * @param {Date} endDate - 終了日
 * @returns {Array} フィルタリングされた配列
 */
export function filterByDateRange(array, dateProperty, startDate, endDate) {
  return array.filter((item) => {
    const itemDate = new Date(item[dateProperty]);
    return itemDate >= startDate && itemDate <= endDate;
  });
}
