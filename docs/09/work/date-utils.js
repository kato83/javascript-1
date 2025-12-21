/**
 * 日付を指定したフォーマットで表示する
 * @param {Date} date - フォーマット対象の日付
 * @param {string} format - フォーマット文字列
 * @returns {string} フォーマットされた日付文字列
 */
export function formatDate(date, format) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const monthPadded = month.padStart(2, "0");
  const day = String(date.getDate());
  const dayPadded = day.padStart(2, "0");

  return format
    .replace("YYYY", year)
    .replace("MM", monthPadded)
    .replace("M", month)
    .replace("DD", dayPadded)
    .replace("D", day);
}

/**
 * 日付に指定した日数を加算する
 * @param {Date} date - 基準日
 * @param {number} days - 加算する日数
 * @returns {Date} 新しい日付オブジェクト
 */
export function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

/**
 * 2つの日付間の日数を計算する
 * @param {Date} date1 - 日付1
 * @param {Date} date2 - 日付2
 * @returns {number} 日数の差（絶対値）
 */
export function getDaysBetween(date1, date2) {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
}

/**
 * 日付が週末かどうかを判定する
 * @param {Date} date - 判定対象の日付
 * @returns {boolean} 週末の場合true
 */
export function isWeekend(date) {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // 0=日曜日, 6=土曜日
}

/**
 * 生年月日から年齢を計算する
 * @param {Date} birthDate - 生年月日
 * @param {Date} currentDate - 現在の日付（省略時は今日）
 * @returns {number} 年齢
 */
export function getAge(birthDate, currentDate = new Date()) {
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
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
  const nextDay = addDays(date, 1);
  const dayOfWeek = nextDay.getDay();

  // 土曜日（6）の場合は月曜日（+2日）、日曜日（0）の場合は月曜日（+1日）
  if (dayOfWeek === 6) {
    return addDays(nextDay, 2);
  } else if (dayOfWeek === 0) {
    return addDays(nextDay, 1);
  }

  return nextDay;
}

/**
 * 相対的な時間表示を生成する
 * @param {Date} pastDate - 過去の日付
 * @param {Date} currentDate - 現在の日付
 * @returns {string} 相対時間の文字列
 */
export function formatRelativeTime(pastDate, currentDate) {
  const diffMs = currentDate.getTime() - pastDate.getTime();
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
    return formatDate(pastDate, "YYYY/M/D");
  }
}
