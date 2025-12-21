import { assertEquals } from "@std/assert";
import {
  addFruit,
  doubleNumbers,
  fruits,
  getFruitAt,
  getFruitCount,
  numbers,
  removeFruit,
} from "./basic-array.js";

Deno.test("fruits配列の初期値テスト", () => {
  assertEquals(fruits, ["りんご", "バナナ", "オレンジ"]);
});

Deno.test("numbers配列の初期値テスト", () => {
  assertEquals(numbers, [10, 20, 30, 40, 50]);
});

Deno.test("addFruit関数のテスト", () => {
  // 初期状態をリセット
  fruits.length = 0;
  fruits.push("りんご", "バナナ", "オレンジ");

  addFruit("ぶどう");
  assertEquals(fruits, ["りんご", "バナナ", "オレンジ", "ぶどう"]);

  addFruit("いちご");
  assertEquals(fruits, ["りんご", "バナナ", "オレンジ", "ぶどう", "いちご"]);
});

Deno.test("removeFruit関数のテスト", () => {
  // 初期状態をリセット
  fruits.length = 0;
  fruits.push("りんご", "バナナ", "オレンジ");

  const removed = removeFruit();
  assertEquals(removed, "オレンジ");
  assertEquals(fruits, ["りんご", "バナナ"]);

  const removed2 = removeFruit();
  assertEquals(removed2, "バナナ");
  assertEquals(fruits, ["りんご"]);
});

Deno.test("getFruitCount関数のテスト", () => {
  // 初期状態をリセット
  fruits.length = 0;
  fruits.push("りんご", "バナナ", "オレンジ");

  assertEquals(getFruitCount(), 3);

  addFruit("ぶどう");
  assertEquals(getFruitCount(), 4);

  removeFruit();
  assertEquals(getFruitCount(), 3);
});

Deno.test("getFruitAt関数のテスト", () => {
  // 初期状態をリセット
  fruits.length = 0;
  fruits.push("りんご", "バナナ", "オレンジ");

  assertEquals(getFruitAt(0), "りんご");
  assertEquals(getFruitAt(1), "バナナ");
  assertEquals(getFruitAt(2), "オレンジ");
  assertEquals(getFruitAt(3), undefined);
});

Deno.test("doubleNumbers関数のテスト", () => {
  // 初期状態をリセット
  numbers.length = 0;
  numbers.push(10, 20, 30, 40, 50);

  doubleNumbers();
  assertEquals(numbers, [20, 40, 60, 80, 100]);

  // もう一度実行
  doubleNumbers();
  assertEquals(numbers, [40, 80, 120, 160, 200]);
});
