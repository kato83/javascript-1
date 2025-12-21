import { assertEquals } from "@std/assert";
import { productManager } from "./product-manager.js";

Deno.test("productManager - 初期状態", () => {
  assertEquals(Array.isArray(productManager.products), true);
  assertEquals(typeof productManager.nextId, "number");
  assertEquals(productManager.nextId > 0, true);
});

Deno.test("productManager - 商品の追加", () => {
  const initialProductCount = productManager.products.length;
  const initialNextId = productManager.nextId;

  productManager.addProduct("テストノート", 500, 10, "文房具");

  assertEquals(productManager.products.length, initialProductCount + 1);
  assertEquals(productManager.nextId, initialNextId + 1);

  const addedProduct =
    productManager.products[productManager.products.length - 1];
  assertEquals(addedProduct.name, "テストノート");
  assertEquals(addedProduct.price, 500);
  assertEquals(addedProduct.stock, 10);
  assertEquals(addedProduct.category, "文房具");
  assertEquals(typeof addedProduct.id, "number");
});

Deno.test("productManager - 商品の検索", () => {
  productManager.addProduct("検索テスト商品", 1000, 5, "テスト");
  const addedProduct =
    productManager.products[productManager.products.length - 1];

  const foundProduct = productManager.findProduct(addedProduct.id);
  assertEquals(foundProduct.name, "検索テスト商品");
  assertEquals(foundProduct.id, addedProduct.id);

  const notFoundProduct = productManager.findProduct(99999);
  assertEquals(notFoundProduct, null);
});

Deno.test("productManager - 価格の更新", () => {
  productManager.addProduct("価格テスト商品", 800, 3, "テスト");
  const addedProduct =
    productManager.products[productManager.products.length - 1];

  const result = productManager.updatePrice(addedProduct.id, 1200);
  assertEquals(typeof result, "string");
  assertEquals(addedProduct.price, 1200);

  const invalidResult = productManager.updatePrice(99999, 1000);
  assertEquals(typeof invalidResult, "string");
});

Deno.test("productManager - 在庫の追加", () => {
  productManager.addProduct("在庫テスト商品", 600, 5, "テスト");
  const addedProduct =
    productManager.products[productManager.products.length - 1];
  const originalStock = addedProduct.stock;

  const result = productManager.addStock(addedProduct.id, 10);
  assertEquals(typeof result, "string");
  assertEquals(addedProduct.stock, originalStock + 10);

  const invalidResult = productManager.addStock(99999, 5);
  assertEquals(typeof invalidResult, "string");
});

Deno.test("productManager - 商品の販売", () => {
  productManager.addProduct("販売テスト商品", 1500, 20, "テスト");
  const addedProduct =
    productManager.products[productManager.products.length - 1];
  const originalStock = addedProduct.stock;

  const result = productManager.sellProduct(addedProduct.id, 5);
  assertEquals(typeof result, "string");
  assertEquals(addedProduct.stock, originalStock - 5);

  // 在庫不足のテスト
  const insufficientResult = productManager.sellProduct(addedProduct.id, 100);
  assertEquals(typeof insufficientResult, "string");
  assertEquals(addedProduct.stock, originalStock - 5); // 在庫は変更されない

  const invalidResult = productManager.sellProduct(99999, 1);
  assertEquals(typeof invalidResult, "string");
});

Deno.test("productManager - カテゴリ別商品取得", () => {
  productManager.addProduct("電子機器1", 10000, 2, "電子機器");
  productManager.addProduct("電子機器2", 15000, 3, "電子機器");
  productManager.addProduct("文房具1", 200, 50, "文房具");

  const electronics = productManager.getProductsByCategory("電子機器");
  assertEquals(Array.isArray(electronics), true);
  assertEquals(electronics.length >= 2, true);

  for (const product of electronics) {
    assertEquals(product.category, "電子機器");
  }

  const stationery = productManager.getProductsByCategory("文房具");
  assertEquals(Array.isArray(stationery), true);

  const nonExistent = productManager.getProductsByCategory(
    "存在しないカテゴリ",
  );
  assertEquals(Array.isArray(nonExistent), true);
  assertEquals(nonExistent.length, 0);
});

Deno.test("productManager - 総価値の計算", () => {
  const initialTotalValue = productManager.getTotalValue();
  assertEquals(typeof initialTotalValue, "number");
  assertEquals(initialTotalValue >= 0, true);

  productManager.addProduct("価値テスト1", 1000, 5, "テスト");
  productManager.addProduct("価値テスト2", 2000, 3, "テスト");

  const newTotalValue = productManager.getTotalValue();
  assertEquals(
    newTotalValue >= initialTotalValue + (1000 * 5) + (2000 * 3),
    true,
  );
});

Deno.test("productManager - 複数操作の組み合わせ", () => {
  productManager.addProduct("組み合わせテスト", 500, 10, "テスト");
  const addedProduct =
    productManager.products[productManager.products.length - 1];

  productManager.updatePrice(addedProduct.id, 600);
  productManager.addStock(addedProduct.id, 5);
  productManager.sellProduct(addedProduct.id, 3);

  assertEquals(addedProduct.price, 600);
  assertEquals(addedProduct.stock, 12); // 10 + 5 - 3
});
