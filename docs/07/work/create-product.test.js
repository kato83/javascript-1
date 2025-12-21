import { assertEquals, assertNotEquals } from "@std/assert";
import { createProduct } from "./create-product.js";

Deno.test("createProduct 関数の基本動作", () => {
  const product = createProduct("ノートパソコン", 80000, "電子機器");

  // 基本プロパティの型チェック
  assertEquals(typeof product.id, "number");
  assertEquals(typeof product.name, "string");
  assertEquals(typeof product.price, "number");
  assertEquals(typeof product.category, "string");
  assertEquals(typeof product.inStock, "boolean");
  assertEquals(product.createdAt instanceof Date, true);
});

Deno.test("createProduct 関数の引数が正しく設定される", () => {
  const product = createProduct("スマートフォン", 50000, "電子機器");

  assertEquals(product.name, "スマートフォン");
  assertEquals(product.price, 50000);
  assertEquals(product.category, "電子機器");
  assertEquals(product.inStock, true); // 初期値
});

Deno.test("createProduct 関数で作成されるIDが一意である", () => {
  const product1 = createProduct("商品A", 1000, "カテゴリA");
  const product2 = createProduct("商品B", 2000, "カテゴリB");
  const product3 = createProduct("商品C", 3000, "カテゴリC");

  // IDが一意であることを確認
  assertNotEquals(product1.id, product2.id);
  assertNotEquals(product2.id, product3.id);
  assertNotEquals(product1.id, product3.id);

  // IDが正の数値であることを確認
  assertEquals(product1.id > 0, true);
  assertEquals(product2.id > 0, true);
  assertEquals(product3.id > 0, true);
});

Deno.test("createProduct 関数の作成日時が現在時刻に近い", () => {
  const beforeCreate = new Date();
  const product = createProduct("テスト商品", 1500, "テストカテゴリ");
  const afterCreate = new Date();

  // 作成日時が関数実行前後の時間内にあることを確認
  assertEquals(product.createdAt >= beforeCreate, true);
  assertEquals(product.createdAt <= afterCreate, true);
});

Deno.test("createProduct 関数で複数の商品を作成", () => {
  const products = [
    createProduct("本", 1200, "書籍"),
    createProduct("ペン", 300, "文房具"),
    createProduct("マウス", 2500, "電子機器"),
  ];

  // 各商品が正しく作成されていることを確認
  assertEquals(products.length, 3);
  assertEquals(products[0].name, "本");
  assertEquals(products[1].name, "ペン");
  assertEquals(products[2].name, "マウス");

  // すべてのIDが異なることを確認
  const ids = products.map((p) => p.id);
  const uniqueIds = [...new Set(ids)];
  assertEquals(ids.length, uniqueIds.length);
});
