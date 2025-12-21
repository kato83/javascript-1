import { assertEquals } from "@std/assert";
import {
  combineArrays,
  getFirstHalf,
  getMiddleElements,
  getSecondHalf,
  reverseArray,
} from "./array-operations.js";

Deno.test("combineArrays関数のテスト", () => {
  const array1 = [1, 2, 3];
  const array2 = [4, 5, 6];
  const result = combineArrays(array1, array2);

  assertEquals(result, [1, 2, 3, 4, 5, 6]);

  // 元の配列が変更されていないことを確認
  assertEquals(array1, [1, 2, 3]);
  assertEquals(array2, [4, 5, 6]);

  // 空の配列との結合
  const empty = [];
  const result2 = combineArrays(array1, empty);
  assertEquals(result2, [1, 2, 3]);

  // 文字列配列の結合
  const fruits1 = ["りんご", "バナナ"];
  const fruits2 = ["オレンジ", "ぶどう"];
  const result3 = combineArrays(fruits1, fruits2);
  assertEquals(result3, ["りんご", "バナナ", "オレンジ", "ぶどう"]);
});

Deno.test("getFirstHalf関数のテスト", () => {
  // 偶数個の要素
  const evenArray = [1, 2, 3, 4, 5, 6];
  assertEquals(getFirstHalf(evenArray), [1, 2, 3]);

  // 奇数個の要素
  const oddArray = [1, 2, 3, 4, 5];
  assertEquals(getFirstHalf(oddArray), [1, 2]);

  // 1個の要素
  const singleArray = [1];
  assertEquals(getFirstHalf(singleArray), []);

  // 空の配列
  const emptyArray = [];
  assertEquals(getFirstHalf(emptyArray), []);

  // 元の配列が変更されていないことを確認
  assertEquals(evenArray, [1, 2, 3, 4, 5, 6]);
});

Deno.test("getSecondHalf関数のテスト", () => {
  // 偶数個の要素
  const evenArray = [1, 2, 3, 4, 5, 6];
  assertEquals(getSecondHalf(evenArray), [4, 5, 6]);

  // 奇数個の要素
  const oddArray = [1, 2, 3, 4, 5];
  assertEquals(getSecondHalf(oddArray), [3, 4, 5]);

  // 1個の要素
  const singleArray = [1];
  assertEquals(getSecondHalf(singleArray), [1]);

  // 空の配列
  const emptyArray = [];
  assertEquals(getSecondHalf(emptyArray), []);

  // 元の配列が変更されていないことを確認
  assertEquals(evenArray, [1, 2, 3, 4, 5, 6]);
});

Deno.test("getMiddleElements関数のテスト", () => {
  // 5個の要素
  const array5 = [1, 2, 3, 4, 5];
  assertEquals(getMiddleElements(array5), [2, 3, 4]);

  // 4個の要素
  const array4 = [1, 2, 3, 4];
  assertEquals(getMiddleElements(array4), [2, 3]);

  // 3個の要素
  const array3 = [1, 2, 3];
  assertEquals(getMiddleElements(array3), [2]);

  // 2個の要素
  const array2 = [1, 2];
  assertEquals(getMiddleElements(array2), []);

  // 1個の要素
  const array1 = [1];
  assertEquals(getMiddleElements(array1), []);

  // 空の配列
  const emptyArray = [];
  assertEquals(getMiddleElements(emptyArray), []);

  // 元の配列が変更されていないことを確認
  assertEquals(array5, [1, 2, 3, 4, 5]);
});

Deno.test("reverseArray関数のテスト", () => {
  const originalArray = [1, 2, 3, 4, 5];
  const reversed = reverseArray(originalArray);

  assertEquals(reversed, [5, 4, 3, 2, 1]);

  // 元の配列が変更されていないことを確認
  assertEquals(originalArray, [1, 2, 3, 4, 5]);

  // 文字列配列
  const fruits = ["りんご", "バナナ", "オレンジ"];
  const reversedFruits = reverseArray(fruits);
  assertEquals(reversedFruits, ["オレンジ", "バナナ", "りんご"]);
  assertEquals(fruits, ["りんご", "バナナ", "オレンジ"]);

  // 空の配列
  const emptyArray = [];
  const reversedEmpty = reverseArray(emptyArray);
  assertEquals(reversedEmpty, []);

  // 1個の要素
  const singleArray = [42];
  const reversedSingle = reverseArray(singleArray);
  assertEquals(reversedSingle, [42]);
});
