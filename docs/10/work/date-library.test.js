import { assertEquals, assertExists } from "jsr:@std/assert";
import {
  calculateAge,
  formatJapaneseDate,
  getBusinessDaysUntil,
  getNextMonthEnd,
  getQuarterInfo,
  getWeekRange,
  isHoliday,
} from "./date-library.js";

Deno.test("formatJapaneseDate - 日付を日本語形式でフォーマット", () => {
  assertEquals(formatJapaneseDate("2024-01-18"), "2024年01月18日");
  assertEquals(formatJapaneseDate("2024-12-31"), "2024年12月31日");
  assertEquals(formatJapaneseDate(new Date("2024-06-15")), "2024年06月15日");
});

Deno.test("getBusinessDaysUntil - 営業日数を計算", () => {
  // 2024年1月18日（木）から2024年1月22日（月）まで
  // 18日(木), 19日(金), 22日(月) = 3営業日
  const result = getBusinessDaysUntil("2024-01-22");
  assertEquals(typeof result, "number");
  assertEquals(result >= 0, true);
});

Deno.test("getNextMonthEnd - 来月末の日付を取得", () => {
  const result = getNextMonthEnd();
  assertExists(result);
  assertEquals(typeof result, "string");
  // YYYY-MM-DD形式かチェック
  assertEquals(/^\d{4}-\d{2}-\d{2}$/.test(result), true);
});

Deno.test("isHoliday - 土日判定", () => {
  // 2024年1月20日は土曜日
  assertEquals(isHoliday("2024-01-20"), true);
  // 2024年1月21日は日曜日
  assertEquals(isHoliday("2024-01-21"), true);
  // 2024年1月22日は月曜日
  assertEquals(isHoliday("2024-01-22"), false);
  // 2024年1月18日は木曜日
  assertEquals(isHoliday("2024-01-18"), false);
});

Deno.test("getQuarterInfo - 四半期情報を取得", () => {
  const result = getQuarterInfo("2024-01-18");
  assertEquals(result.quarter, 1);
  assertEquals(result.year, 2024);
  assertEquals(result.startDate, "2024-01-01");
  assertEquals(result.endDate, "2024-03-31");

  const result2 = getQuarterInfo("2024-07-15");
  assertEquals(result2.quarter, 3);
  assertEquals(result2.year, 2024);
  assertEquals(result2.startDate, "2024-07-01");
  assertEquals(result2.endDate, "2024-09-30");
});

Deno.test("calculateAge - 年齢を計算", () => {
  // 1990年1月1日生まれの場合（2024年基準）
  const age = calculateAge("1990-01-01");
  assertEquals(typeof age, "number");
  assertEquals(age >= 30, true); // 2024年なので30歳以上

  // 2000年6月15日生まれの場合
  const age2 = calculateAge("2000-06-15");
  assertEquals(typeof age2, "number");
  assertEquals(age2 >= 20, true); // 2024年なので20歳以上
});

Deno.test("getWeekRange - 週の範囲を取得", () => {
  const result = getWeekRange("2024-01-18"); // 木曜日
  assertExists(result.start);
  assertExists(result.end);
  assertEquals(typeof result.start, "string");
  assertEquals(typeof result.end, "string");
  // YYYY-MM-DD形式かチェック
  assertEquals(/^\d{4}-\d{2}-\d{2}$/.test(result.start), true);
  assertEquals(/^\d{4}-\d{2}-\d{2}$/.test(result.end), true);

  // 週の開始日は指定日以前、終了日は指定日以降であることを確認
  assertEquals(result.start <= "2024-01-18", true);
  assertEquals(result.end >= "2024-01-18", true);
});
