import { assertEquals } from "@std/assert";
import { calculator } from "./calculator.js";

Deno.test("calculator - 初期状態", () => {
  calculator.clear();
  calculator.memoryClear();
  assertEquals(calculator.getResult(), 0);
  assertEquals(calculator.result, 0);
  assertEquals(calculator.memory, 0);
});

Deno.test("calculator - 基本的な計算", () => {
  calculator.clear();
  assertEquals(calculator.add(5), 5);
  assertEquals(calculator.multiply(3), 15);
  assertEquals(calculator.subtract(5), 10);
  assertEquals(calculator.divide(2), 5);
  assertEquals(calculator.getResult(), 5);
});

Deno.test("calculator - ゼロ除算の処理", () => {
  calculator.clear();
  calculator.add(10);

  const result = calculator.divide(0);
  // ゼロ除算の場合、値が変更されないことを確認
  assertEquals(result, 10);
});

Deno.test("calculator - 負の数の計算", () => {
  calculator.clear();
  assertEquals(calculator.add(-5), -5);
  assertEquals(calculator.subtract(-3), -2);
  assertEquals(calculator.multiply(-2), 4);
});

Deno.test("calculator - クリア機能", () => {
  calculator.add(100);
  calculator.multiply(5);

  assertEquals(calculator.clear(), 0);
  assertEquals(calculator.getResult(), 0);
});

Deno.test("calculator - メモリストア機能", () => {
  calculator.clear();
  calculator.memoryClear();

  calculator.add(25);
  calculator.memoryStore();
  assertEquals(calculator.memoryRecall(), 25);

  calculator.clear();
  assertEquals(calculator.getResult(), 0);
  assertEquals(calculator.memoryRecall(), 25); // メモリは保持される
});

Deno.test("calculator - メモリクリア機能", () => {
  calculator.clear();
  calculator.add(50);
  calculator.memoryStore();
  assertEquals(calculator.memoryRecall(), 50);

  calculator.memoryClear();
  assertEquals(calculator.memoryRecall(), 0);
});

Deno.test("calculator - メモリ加算機能", () => {
  calculator.clear();
  calculator.memoryClear();

  // メモリに10を保存
  calculator.add(10);
  calculator.memoryStore();

  // 現在の結果（15）をメモリに加算
  calculator.clear();
  calculator.add(15);
  calculator.memoryAdd();

  assertEquals(calculator.memoryRecall(), 25); // 10 + 15 = 25
});

Deno.test("calculator - メモリ減算機能", () => {
  calculator.clear();
  calculator.memoryClear();

  // メモリに20を保存
  calculator.add(20);
  calculator.memoryStore();

  // メモリから5を減算
  calculator.clear();
  calculator.add(5);
  calculator.memorySubtract();

  assertEquals(calculator.memoryRecall(), 15); // 20 - 5 = 15
});

Deno.test("calculator - 小数点の計算", () => {
  calculator.clear();
  calculator.add(1.5);
  calculator.multiply(2);
  assertEquals(calculator.getResult(), 3);
});

Deno.test("calculator - メソッドの戻り値", () => {
  calculator.clear();
  const addResult = calculator.add(10);
  const subtractResult = calculator.subtract(3);
  const multiplyResult = calculator.multiply(2);
  const divideResult = calculator.divide(2);

  assertEquals(addResult, 10);
  assertEquals(subtractResult, 7);
  assertEquals(multiplyResult, 14);
  assertEquals(divideResult, 7);
});

Deno.test("calculator - 複合操作テスト", () => {
  calculator.clear();
  calculator.memoryClear();

  // 複雑な計算とメモリ操作の組み合わせ
  calculator.add(100);
  calculator.memoryStore(); // M = 100

  calculator.clear();
  calculator.add(50);
  calculator.memoryAdd(); // M = 150

  calculator.clear();
  calculator.add(25);
  calculator.memorySubtract(); // M = 125

  assertEquals(calculator.memoryRecall(), 125);

  // メモリの値を現在の結果にセット
  const memoryValue = calculator.memoryRecall();
  calculator.clear();
  calculator.add(memoryValue);
  calculator.divide(5);

  assertEquals(calculator.getResult(), 25); // 125 ÷ 5 = 25
});
