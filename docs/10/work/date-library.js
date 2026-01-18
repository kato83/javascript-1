import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday.js";
import quarterOfYear from "dayjs/plugin/quarterOfYear.js";

// プラグインを有効化
dayjs.extend(weekday);
dayjs.extend(quarterOfYear);

/**
 * 日付を「2024年01月18日」形式で表示
 * @param {string|Date} date - 日付
 * @returns {string} フォーマットされた日付文字列
 */
export function formatJapaneseDate(date) {
}

/**
 * 今日から指定日までの営業日数を計算（土日を除く）
 * @param {string|Date} targetDate - 目標日付
 * @returns {number} 営業日数
 */
export function getBusinessDaysUntil(targetDate) {
}

/**
 * 来月末の日付を取得
 * @returns {string} 来月末の日付（YYYY-MM-DD形式）
 */
export function getNextMonthEnd() {
}

/**
 * 指定日が土日かどうかを判定
 * @param {string|Date} date - 日付
 * @returns {boolean} 土日の場合true
 */
export function isHoliday(date) {
}

/**
 * 指定日の四半期情報を取得
 * @param {string|Date} date - 日付
 * @returns {object} 四半期情報
 */
export function getQuarterInfo(date) {
}

/**
 * 生年月日から現在の年齢を計算
 * @param {string|Date} birthDate - 生年月日
 * @returns {number} 年齢
 */
export function calculateAge(birthDate) {
}

/**
 * 指定日が含まれる週の開始日と終了日を取得
 * @param {string|Date} date - 日付
 * @returns {object} 週の開始日と終了日
 */
export function getWeekRange(date) {
}
