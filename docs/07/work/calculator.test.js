import { assertEquals } from "@std/assert";
import { calculator } from "./calculator.js";

Deno.test("calculator - 初期状態", () => {
  calculator.clear();
  assertEquals(calculator.getResult(), 0);
  assertEquals(calculator.result, 0);
});

Deno.test("calculator - 基本的な計算", () => {
  calculator.clear();
  assertEquals(calculator.add(5), 5);
  assertEquals(calculator.multiply(3), 15);
  assertEquals(calculator.subtract(5), 10);
  assertEquals(calculator.divide(2), 5);
  assertEquals(calculator.getResult(), 5);
});

Deno.test("calculator - 連続計算", () => {
  calculator.clear();
  calculator.add(10);
  calculator.add(5);
  calculator.multiply(2);
  assertEquals(calculator.getResult(), 30);
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
