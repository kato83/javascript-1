/**
 * 文字列の最初の文字を大文字にする
 * @param {string} str - 対象の文字列
 * @returns {string} 最初の文字が大文字になった文字列
 */
export function capitalizeFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 文字列を逆順にする
 * @param {string} str - 対象の文字列
 * @returns {string} 逆順になった文字列
 */
export function reverseString(str) {
  return str.split("").reverse().join("");
}

/**
 * 文字列内の単語数を数える
 * @param {string} str - 対象の文字列
 * @returns {number} 単語数
 */
export function countWords(str) {
  const trimmed = str.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

/**
 * 文字列からすべての空白を削除する
 * @param {string} str - 対象の文字列
 * @returns {string} 空白が削除された文字列
 */
export function removeSpaces(str) {
  return str.replace(/\s/g, "");
}

/**
 * 文字列を指定した長さで切り詰める
 * @param {string} str - 対象の文字列
 * @param {number} maxLength - 最大長
 * @returns {string} 切り詰められた文字列
 */
export function truncateString(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

/**
 * 文字列が回文かどうかを判定する
 * @param {string} str - 判定対象の文字列
 * @returns {boolean} 回文の場合true
 */
export function isPalindrome(str) {
  // 英数字のみを抽出し、小文字に変換
  const cleaned = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}

/**
 * 文字列からメールアドレスを抽出する
 * @param {string} str - 対象の文字列
 * @returns {Array<string>} 抽出されたメールアドレスの配列
 */
export function extractEmails(str) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = str.match(emailRegex);
  return matches || [];
}
