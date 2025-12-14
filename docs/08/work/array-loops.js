/**
 * 数値配列の合計を計算する
 * @param {number[]} numbers - 数値の配列
 * @returns {number} 配列の合計
 */
export function calculateSum(numbers) {
  let sum = 0;
  for (const number of numbers) {
    sum += number;
  }
  return sum;
}

/**
 * 数値配列の平均を計算する
 * @param {number[]} numbers - 数値の配列
 * @returns {number} 配列の平均（空の配列の場合は0）
 */
export function calculateAverage(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  return calculateSum(numbers) / numbers.length;
}

/**
 * 数値配列の最大値を見つける
 * @param {number[]} numbers - 数値の配列
 * @returns {number|undefined} 配列の最大値（空の配列の場合はundefined）
 */
export function findMaximum(numbers) {
  if (numbers.length === 0) {
    return undefined;
  }

  let max = numbers[0];
  for (const number of numbers) {
    if (number > max) {
      max = number;
    }
  }
  return max;
}

/**
 * 数値配列の最小値を見つける
 * @param {number[]} numbers - 数値の配列
 * @returns {number|undefined} 配列の最小値（空の配列の場合はundefined）
 */
export function findMinimum(numbers) {
  if (numbers.length === 0) {
    return undefined;
  }

  let min = numbers[0];
  for (const number of numbers) {
    if (number < min) {
      min = number;
    }
  }
  return min;
}

/**
 * 数値配列の偶数の個数を数える
 * @param {number[]} numbers - 数値の配列
 * @returns {number} 偶数の個数
 */
export function countEvenNumbers(numbers) {
  let count = 0;
  for (const number of numbers) {
    if (number % 2 === 0) {
      count++;
    }
  }
  return count;
}

/**
 * 数値配列を"インデックス: 値"の形式で表示する
 * @param {number[]} numbers - 数値の配列
 */
export function displayNumbersWithIndex(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    console.log(`${i}: ${numbers[i]}`);
  }
}
