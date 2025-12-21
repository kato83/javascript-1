import { assert, assertEquals } from "@std/assert";
import { myParseInt } from "./my-parseint.js";

// 基本的な数値変換のテスト
Deno.test("myParseInt - 基本的な数値変換", () => {
  assertEquals(myParseInt("123"), 123);
  assertEquals(myParseInt("456abc"), 456);
  assertEquals(myParseInt("0"), 0);
  assertEquals(myParseInt("789xyz123"), 789);
});

// エッジケースのテスト
Deno.test("myParseInt - エッジケース", () => {
  // 空文字列
  assert(Number.isNaN(myParseInt("")));

  // 数字が含まれていない文字列
  assert(Number.isNaN(myParseInt("abc")));
  assert(Number.isNaN(myParseInt("xyz")));

  // 空白のみ
  assert(Number.isNaN(myParseInt("   ")));
  assert(Number.isNaN(myParseInt("\t\n")));
});

// 符号のテスト
Deno.test("myParseInt - 符号の処理", () => {
  assertEquals(myParseInt("+123"), 123);
  assertEquals(myParseInt("-456"), -456);
  assertEquals(myParseInt("+0"), 0);
  assertEquals(myParseInt("-0"), 0);

  // 符号のみの場合
  assert(Number.isNaN(myParseInt("+")));
  assert(Number.isNaN(myParseInt("-")));
});

// 空白の処理のテスト
Deno.test("myParseInt - 空白の処理", () => {
  assertEquals(myParseInt("  123"), 123);
  assertEquals(myParseInt("  +456"), 456);
  assertEquals(myParseInt("  -789"), -789);
  assertEquals(myParseInt("\t\n123\r"), 123);
});

// 複雑なケースのテスト
Deno.test("myParseInt - 複雑なケース", () => {
  assertEquals(myParseInt("42.5"), 42);
  assertEquals(myParseInt("100px"), 100);
  assertEquals(myParseInt("  -42abc"), -42);
  assertEquals(myParseInt("3.14159"), 3);
});

// 組み込みparseIntとの比較テスト
Deno.test("myParseInt - 組み込みparseIntとの比較", () => {
  const testCases = [
    "123",
    "456abc",
    "0",
    "+123",
    "-456",
    "  123",
    "42.5",
    "100px",
    "",
    "abc",
    "   ",
    "+",
    "-",
    "  +456",
    "  -789",
  ];

  for (const testCase of testCases) {
    const myResult = myParseInt(testCase);
    const builtinResult = parseInt(testCase);

    // NaNの場合は特別な比較が必要
    if (Number.isNaN(myResult) && Number.isNaN(builtinResult)) {
      // 両方ともNaNの場合は成功
      assert(true);
    } else {
      // それ以外の場合は値を比較
      assertEquals(myResult, builtinResult, `入力: "${testCase}"`);
    }
  }
});

// 境界値のテスト
Deno.test("myParseInt - 境界値", () => {
  assertEquals(myParseInt("0"), 0);
  assertEquals(myParseInt("1"), 1);
  assertEquals(myParseInt("9"), 9);
  assertEquals(myParseInt("10"), 10);
  assertEquals(myParseInt("99"), 99);
  assertEquals(myParseInt("100"), 100);
});

// 大きな数値のテスト
Deno.test("myParseInt - 大きな数値", () => {
  assertEquals(myParseInt("123456789"), 123456789);
  assertEquals(myParseInt("-987654321"), -987654321);
  assertEquals(myParseInt("2147483647"), 2147483647); // 32bit整数の最大値
});

// 型変換のテスト
Deno.test("myParseInt - 型変換", () => {
  // 数値を文字列に変換してからテスト
  assertEquals(myParseInt(123), 123);
  assertEquals(myParseInt(-456), -456);
  assertEquals(myParseInt(0), 0);
});
