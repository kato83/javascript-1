// 課題3: 日付操作の模範解答

/**
 * 日付を指定したフォーマットで表示する
 * @param {Date} date - 対象の日付
 * @param {string} format - フォーマット文字列
 * @returns {string} フォーマットされた日付文字列
 */
export function formatDate(date, format) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return format
    .replace("YYYY", year)
    .replace("MM", month)
    .replace("DD", day);
}

/**
 * 日付に指定した日数を加算する
 * @param {Date} date - 基準日
 * @param {number} days - 加算する日数
 * @returns {Date} 新しい日付オブジェクト
 */
export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * 2つの日付間の日数を計算する
 * @param {Date} date1 - 日付1
 * @param {Date} date2 - 日付2
 * @returns {number} 日数の差（絶対値）
 */
export function getDaysBetween(date1, date2) {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 日付が週末（土日）かどうかを判定する
 * @param {Date} date - 対象の日付
 * @returns {boolean} 週末の場合true
 */
export function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6; // 0=日曜日, 6=土曜日
}

/**
 * 生年月日から年齢を計算する
 * @param {Date} birthDate - 生年月日
 * @param {Date} [currentDate] - 現在日（省略時は今日）
 * @returns {number} 年齢
 */
export function getAge(birthDate, currentDate = new Date()) {
  const birth = new Date(birthDate);
  const current = new Date(currentDate);

  let age = current.getFullYear() - birth.getFullYear();
  const monthDiff = current.getMonth() - birth.getMonth();

  if (
    monthDiff < 0 || (monthDiff === 0 && current.getDate() < birth.getDate())
  ) {
    age--;
  }

  return age;
}

/**
 * 次の営業日を取得する
 * @param {Date} date - 基準日
 * @returns {Date} 次の営業日
 */
export function getNextBusinessDay(date) {
  const result = new Date(date);

  do {
    result.setDate(result.getDate() + 1);
  } while (result.getDay() === 0 || result.getDay() === 6);

  return result;
}

/**
 * 相対的な時間表示を生成する
 * @param {Date} date - 対象の日付
 * @param {Date} [now] - 現在時刻（省略時は現在時刻）
 * @returns {string} 相対時間の文字列
 */
export function formatRelativeTime(date, now = new Date()) {
  const targetDate = new Date(date);
  const currentDate = new Date(now);
  const diffMs = currentDate.getTime() - targetDate.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return "たった今";
  } else if (diffMinutes < 60) {
    return `${diffMinutes}分前`;
  } else if (diffHours < 24) {
    return `${diffHours}時間前`;
  } else if (diffDays < 7) {
    return `${diffDays}日前`;
  } else {
    return targetDate.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }
}
