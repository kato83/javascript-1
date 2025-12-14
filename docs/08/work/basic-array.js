// 果物の配列（初期値：["りんご", "バナナ", "オレンジ"]）
export const fruits = ["りんご", "バナナ", "オレンジ"];

// 数値の配列（初期値：[10, 20, 30, 40, 50]）
export const numbers = [10, 20, 30, 40, 50];

/**
 * 果物を配列の末尾に追加する
 * @param {string} fruit - 追加する果物名
 */
export function addFruit(fruit) {
  fruits.push(fruit);
}

/**
 * 果物を配列の末尾から削除し、削除された要素を返す
 * @returns {string|undefined} 削除された果物名
 */
export function removeFruit() {
  return fruits.pop();
}

/**
 * 果物の数を返す
 * @returns {number} 果物の数
 */
export function getFruitCount() {
  return fruits.length;
}

/**
 * 指定されたインデックスの果物を返す
 * @param {number} index - インデックス
 * @returns {string|undefined} 指定されたインデックスの果物名
 */
export function getFruitAt(index) {
  return fruits[index];
}

/**
 * 数値配列の各要素を2倍にする
 */
export function doubleNumbers() {
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i] * 2;
  }
}
