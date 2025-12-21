import { assertEquals, assertThrows } from "@std/assert";
import {
  calculateTax,
  factorial,
  formatCurrency,
  generateRandomInt,
  isEven,
  isPrime,
  roundToDecimal,
} from "./number-utils.js";

Deno.test("formatCurrency - 数値を通貨形式で表示する", () => {
  assertEquals(formatCurrency(1234), "¥1,234");
  assertEquals(formatCurrency(1000000), "¥1,000,000");
  assertEquals(formatCurrency(0), "¥0");
  assertEquals(formatCurrency(123.45), "¥123");
  assertEquals(formatCurrency(-1234), "¥-1,234");
});

Deno.test("calculateTax - 税込価格を計算する", () => {
  assertEquals(calculateTax(1000, 0.1), 1100);
  assertEquals(calculateTax(500, 0.08), 540);
  assertEquals(calculateTax(0, 0.1), 0);
  assertEquals(calculateTax(1000, 0), 1000);
  assertEquals(roundToDecimal(calculateTax(333, 0.1), 2), 366.3);
});

Deno.test("generateRandomInt - 指定範囲のランダムな整数を生成する", () => {
  for (let i = 0; i < 100; i++) {
    const result = generateRandomInt(1, 10);
    assertEquals(result >= 1 && result <= 10, true);
    assertEquals(Number.isInteger(result), true);
  }

  for (let i = 0; i < 100; i++) {
    const result = generateRandomInt(-5, 5);
    assertEquals(result >= -5 && result <= 5, true);
    assertEquals(Number.isInteger(result), true);
  }
});

Deno.test("roundToDecimal - 指定した小数点以下の桁数で四捨五入する", () => {
  assertEquals(roundToDecimal(3.14159, 2), 3.14);
  assertEquals(roundToDecimal(3.14159, 4), 3.1416);
  assertEquals(roundToDecimal(3.14159, 0), 3);
  assertEquals(roundToDecimal(2.5, 0), 3);
  assertEquals(roundToDecimal(2.4, 0), 2);
  assertEquals(roundToDecimal(123.456789, 3), 123.457);
});

Deno.test("isEven - 数値が偶数かどうかを判定する", () => {
  assertEquals(isEven(2), true);
  assertEquals(isEven(3), false);
  assertEquals(isEven(0), true);
  assertEquals(isEven(-2), true);
  assertEquals(isEven(-3), false);
  assertEquals(isEven(100), true);
  assertEquals(isEven(101), false);
});

Deno.test("factorial - 階乗を計算する", () => {
  assertEquals(factorial(0), 1);
  assertEquals(factorial(1), 1);
  assertEquals(factorial(5), 120);
  assertEquals(factorial(3), 6);
  assertEquals(factorial(4), 24);
  assertEquals(factorial(6), 720);
});

Deno.test("isPrime - 数値が素数かどうかを判定する", () => {
  assertEquals(isPrime(2), true);
  assertEquals(isPrime(3), true);
  assertEquals(isPrime(4), false);
  assertEquals(isPrime(5), true);
  assertEquals(isPrime(17), true);
  assertEquals(isPrime(25), false);
  assertEquals(isPrime(1), false);
  assertEquals(isPrime(0), false);
  assertEquals(isPrime(-5), false);
  assertEquals(isPrime(97), true);
});
