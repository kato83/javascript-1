import { assertEquals, assertThrows } from "@std/assert";
import {
  addDays,
  formatDate,
  formatRelativeTime,
  getAge,
  getDaysBetween,
  getNextBusinessDay,
  isWeekend,
} from "./date-utils.js";

Deno.test("formatDate - 日付を指定したフォーマットで表示する", () => {
  const date = new Date(2024, 0, 15); // 2024年1月15日
  assertEquals(formatDate(date, "YYYY-MM-DD"), "2024-01-15");
  assertEquals(formatDate(date, "YYYY/MM/DD"), "2024/01/15");
  assertEquals(formatDate(date, "MM/DD/YYYY"), "01/15/2024");
  assertEquals(formatDate(date, "DD-MM-YYYY"), "15-01-2024");
});

Deno.test("addDays - 日付に指定した日数を加算する", () => {
  const date = new Date(2024, 0, 15); // 2024年1月15日
  const result1 = addDays(date, 5);
  assertEquals(result1.getDate(), 20);
  assertEquals(result1.getMonth(), 0);
  assertEquals(result1.getFullYear(), 2024);

  const result2 = addDays(date, -5);
  assertEquals(result2.getDate(), 10);
  assertEquals(result2.getMonth(), 0);
  assertEquals(result2.getFullYear(), 2024);

  // 月をまたぐ場合
  const result3 = addDays(new Date(2024, 0, 30), 5);
  assertEquals(result3.getDate(), 4);
  assertEquals(result3.getMonth(), 1); // 2月
});

Deno.test("getDaysBetween - 2つの日付間の日数を計算する", () => {
  const date1 = new Date(2024, 0, 1);
  const date2 = new Date(2024, 0, 11);
  assertEquals(getDaysBetween(date1, date2), 10);
  assertEquals(getDaysBetween(date2, date1), 10);

  const date3 = new Date(2024, 0, 1);
  const date4 = new Date(2024, 11, 31);
  assertEquals(getDaysBetween(date3, date4), 365);
});

Deno.test("isWeekend - 日付が週末かどうかを判定する", () => {
  const saturday = new Date(2024, 0, 6); // 2024年1月6日（土曜日）
  const sunday = new Date(2024, 0, 7); // 2024年1月7日（日曜日）
  const monday = new Date(2024, 0, 8); // 2024年1月8日（月曜日）

  assertEquals(isWeekend(saturday), true);
  assertEquals(isWeekend(sunday), true);
  assertEquals(isWeekend(monday), false);
});

Deno.test("getAge - 生年月日から年齢を計算する", () => {
  // 現在の日付を固定してテスト
  const today = new Date(2024, 5, 15); // 2024年6月15日

  // 誕生日が過ぎている場合
  const birthDate1 = new Date(1990, 2, 10); // 1990年3月10日
  assertEquals(getAge(birthDate1, today), 34);

  // 誕生日がまだの場合
  const birthDate2 = new Date(1990, 7, 20); // 1990年8月20日
  assertEquals(getAge(birthDate2, today), 33);

  // 同じ日の場合
  const birthDate3 = new Date(1990, 5, 15); // 1990年6月15日
  assertEquals(getAge(birthDate3, today), 34);
});

Deno.test("getNextBusinessDay - 次の営業日を取得する", () => {
  // 金曜日の場合、次の営業日は月曜日
  const friday = new Date(2024, 0, 5); // 2024年1月5日（金曜日）
  const nextBusinessDay1 = getNextBusinessDay(friday);
  assertEquals(nextBusinessDay1.getDay(), 1); // 月曜日
  assertEquals(nextBusinessDay1.getDate(), 8);

  // 水曜日の場合、次の営業日は木曜日
  const wednesday = new Date(2024, 0, 3); // 2024年1月3日（水曜日）
  const nextBusinessDay2 = getNextBusinessDay(wednesday);
  assertEquals(nextBusinessDay2.getDay(), 4); // 木曜日
  assertEquals(nextBusinessDay2.getDate(), 4);

  // 土曜日の場合、次の営業日は月曜日
  const saturday = new Date(2024, 0, 6); // 2024年1月6日（土曜日）
  const nextBusinessDay3 = getNextBusinessDay(saturday);
  assertEquals(nextBusinessDay3.getDay(), 1); // 月曜日
  assertEquals(nextBusinessDay3.getDate(), 8);
});

Deno.test("formatRelativeTime - 相対的な時間表示を生成する", () => {
  const now = new Date(2024, 0, 15, 12, 0, 0); // 2024年1月15日 12:00:00

  // 30秒前
  const thirtySecondsAgo = new Date(now.getTime() - 30 * 1000);
  assertEquals(formatRelativeTime(thirtySecondsAgo, now), "たった今");

  // 5分前
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
  assertEquals(formatRelativeTime(fiveMinutesAgo, now), "5分前");

  // 2時間前
  const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
  assertEquals(formatRelativeTime(twoHoursAgo, now), "2時間前");

  // 3日前
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  assertEquals(formatRelativeTime(threeDaysAgo, now), "3日前");

  // 1週間以上前
  const oneWeekAgo = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000);
  assertEquals(formatRelativeTime(oneWeekAgo, now), "2024/1/7");
});
