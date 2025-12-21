import { assertEquals } from "@std/assert";
import {
  calculateAverage,
  calculateSum,
  countEvenNumbers,
  displayNumbersWithIndex,
  findMaximum,
  findMinimum,
} from "./array-loops.js";

Deno.test("calculateSum関数のテスト", () => {
  assertEquals(calculateSum([1, 2, 3, 4, 5]), 15);
  assertEquals(calculateSum([10, 20, 30]), 60);
  assertEquals(calculateSum([]), 0);
  assertEquals(calculateSum([42]), 42);
  assertEquals(calculateSum([-1, -2, -3]), -6);
  assertEquals(calculateSum([1.5, 2.5, 3.5]), 7.5);
});

Deno.test("calculateAverage関数のテスト", () => {
  assertEquals(calculateAverage([1, 2, 3, 4, 5]), 3);
  assertEquals(calculateAverage([10, 20, 30]), 20);
  assertEquals(calculateAverage([42]), 42);
  assertEquals(calculateAverage([2, 4, 6, 8]), 5);

  // 空の配列の場合は0を返す
  assertEquals(calculateAverage([]), 0);

  // 小数点を含む場合
  assertEquals(calculateAverage([1, 2, 4]), 2.3333333333333335);
});

Deno.test("findMaximum関数のテスト", () => {
  assertEquals(findMaximum([1, 2, 3, 4, 5]), 5);
  assertEquals(findMaximum([10, 5, 20, 15]), 20);
  assertEquals(findMaximum([42]), 42);
  assertEquals(findMaximum([-1, -5, -3]), -1);
  assertEquals(findMaximum([3.14, 2.71, 1.41]), 3.14);

  // 空の配列の場合はundefinedを返す
  assertEquals(findMaximum([]), undefined);
});

Deno.test("findMinimum関数のテスト", () => {
  assertEquals(findMinimum([1, 2, 3, 4, 5]), 1);
  assertEquals(findMinimum([10, 5, 20, 15]), 5);
  assertEquals(findMinimum([42]), 42);
  assertEquals(findMinimum([-1, -5, -3]), -5);
  assertEquals(findMinimum([3.14, 2.71, 1.41]), 1.41);

  // 空の配列の場合はundefinedを返す
  assertEquals(findMinimum([]), undefined);
});

Deno.test("countEvenNumbers関数のテスト", () => {
  assertEquals(countEvenNumbers([1, 2, 3, 4, 5, 6]), 3);
  assertEquals(countEvenNumbers([1, 3, 5, 7]), 0);
  assertEquals(countEvenNumbers([2, 4, 6, 8]), 4);
  assertEquals(countEvenNumbers([]), 0);
  assertEquals(countEvenNumbers([0]), 1);
  assertEquals(countEvenNumbers([-2, -1, 0, 1, 2]), 3);
});

Deno.test("displayNumbersWithIndex関数のテスト", () => {
  // console.logの出力をキャプチャするためのモック
  const originalLog = console.log;
  const logOutput = [];
  console.log = (...args) => {
    logOutput.push(args.join(" "));
  };

  try {
    displayNumbersWithIndex([10, 20, 30]);
    assertEquals(logOutput, [
      "0: 10",
      "1: 20",
      "2: 30",
    ]);

    // ログをクリア
    logOutput.length = 0;

    displayNumbersWithIndex([]);
    assertEquals(logOutput, []);

    // ログをクリア
    logOutput.length = 0;

    displayNumbersWithIndex([42]);
    assertEquals(logOutput, ["0: 42"]);
  } finally {
    // console.logを元に戻す
    console.log = originalLog;
  }
});
