/**
 * 数値を通貨形式で表示する
 * @param {number} amount - 金額
 * @returns {string} 通貨形式の文字列
 */
export function formatCurrency(amount) {
  const intAmount = Math.floor(amount);
  return `¥${intAmount.toLocaleString("ja-JP")}`;
}

/**
 * 税込価格を計算する
 * @param {number} price - 税抜価格
 * @param {number} taxRate - 税率（0.1 = 10%）
 * @returns {number} 税込価格
 */
export function calculateTax(price, taxRate) {
  return price * (1 + taxRate);
}

/**
 * 指定範囲のランダムな整数を生成する
 * @param {number} min - 最小値（含む）
 * @param {number} max - 最大値（含む）
 * @returns {number} ランダムな整数
 */
export function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 指定した小数点以下の桁数で四捨五入する
 * @param {number} num - 対象の数値
 * @param {number} decimals - 小数点以下の桁数
 * @returns {number} 四捨五入された数値
 */
export function roundToDecimal(num, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

/**
 * 数値が偶数かどうかを判定する
 * @param {number} num - 判定対象の数値
 * @returns {boolean} 偶数の場合true
 */
export function isEven(num) {
  return num % 2 === 0;
}

/**
 * 階乗を計算する
 * @param {number} n - 階乗を計算する数値
 * @returns {number} 階乗の結果
 */
export function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

/**
 * 数値が素数かどうかを判定する
 * @param {number} num - 判定対象の数値
 * @returns {boolean} 素数の場合true
 */
export function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }

  return true;
}
