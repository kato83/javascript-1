/**
 * 自作のparseInt関数
 * 文字列を整数に変換する関数
 *
 * @param {string} str - 変換対象の文字列
 * @returns {number} - 変換された整数、または NaN
 */
export function myParseInt(str) {
  // 引数が文字列でない場合は、文字列に変換
  if (typeof str !== "string") {
    str = String(str);
  }

  // 先頭の空白を削除
  str = str.trim();

  // 空文字列の場合はNaNを返す
  if (str === "") {
    return NaN;
  }

  let result = 0;
  let sign = 1;
  let startIndex = 0;

  // 符号の処理
  if (str[0] === "+") {
    sign = 1;
    startIndex = 1;
  } else if (str[0] === "-") {
    sign = -1;
    startIndex = 1;
  }

  // 符号のみの場合はNaNを返す
  if (startIndex === str.length) {
    return NaN;
  }

  // 数字が見つかったかどうかのフラグ
  let foundDigit = false;

  // 文字列を1文字ずつ処理
  for (let i = startIndex; i < str.length; i++) {
    const char = str[i];

    // 数字かどうかをチェック
    if (char >= "0" && char <= "9") {
      foundDigit = true;
      const digit = char.charCodeAt(0) - "0".charCodeAt(0);
      result = result * 10 + digit;
    } else {
      // 数字以外の文字が現れたら処理を終了
      break;
    }
  }

  // 数字が見つからなかった場合はNaNを返す
  if (!foundDigit) {
    return NaN;
  }

  return result * sign;
}
