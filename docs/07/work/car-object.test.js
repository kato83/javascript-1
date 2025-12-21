import { assertEquals } from "@std/assert";
import { car } from "./car-object.js";

Deno.test("car オブジェクトの基本プロパティ", () => {
  assertEquals(typeof car.brand, "string");
  assertEquals(typeof car.model, "string");
  assertEquals(typeof car.year, "number");
  assertEquals(typeof car.color, "string");
  assertEquals(typeof car.mileage, "number");
  assertEquals(typeof car.isRunning, "boolean");
});

Deno.test("car オブジェクトのプロパティ値", () => {
  // 基本的なプロパティが適切な値を持っているかテスト
  assertEquals(car.brand.length > 0, true);
  assertEquals(car.model.length > 0, true);
  assertEquals(car.year > 1900, true);
  assertEquals(car.color.length > 0, true);
  assertEquals(car.mileage >= 0, true);
});

Deno.test("car オブジェクトのプロパティ変更", () => {
  // 元の値を保存
  const originalMileage = car.mileage;
  const originalIsRunning = car.isRunning;

  // プロパティを変更
  car.mileage = 50000;
  car.isRunning = true;

  // 変更が反映されているかテスト
  assertEquals(car.mileage, 50000);
  assertEquals(car.isRunning, true);

  // 元の値に戻す
  car.mileage = originalMileage;
  car.isRunning = originalIsRunning;
});

Deno.test("car オブジェクトへの新しいプロパティ追加", () => {
  // 新しいプロパティを追加
  car.fuelType = "ガソリン";
  car.price = 2500000;

  // 追加されたプロパティをテスト
  assertEquals(car.fuelType, "ガソリン");
  assertEquals(car.price, 2500000);
  assertEquals(typeof car.fuelType, "string");
  assertEquals(typeof car.price, "number");

  // テスト後にプロパティを削除
  delete car.fuelType;
  delete car.price;
});

Deno.test("car オブジェクトのプロパティアクセス", () => {
  // ドット記法でのアクセス
  assertEquals(typeof car.brand, "string");

  // ブラケット記法でのアクセス
  assertEquals(typeof car["brand"], "string");
  assertEquals(car.brand, car["brand"]);
});
