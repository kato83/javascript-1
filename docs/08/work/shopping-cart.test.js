import { assertEquals } from "@std/assert";
import { shoppingCart } from "./shopping-cart.js";

Deno.test.beforeEach(() => {
  // 初期状態をリセット
  shoppingCart.items = [];
});

Deno.test("shoppingCart初期状態のテスト", () => {
  assertEquals(shoppingCart.items, []);
  assertEquals(shoppingCart.getTotalItems(), 0);
  assertEquals(shoppingCart.getTotalPrice(), 0);
});

Deno.test("addItem関数のテスト", () => {
  // 新しい商品を追加
  shoppingCart.addItem(1, "ノートパソコン", 80000, 1);
  assertEquals(shoppingCart.items.length, 1);
  assertEquals(shoppingCart.items[0].id, 1);
  assertEquals(shoppingCart.items[0].name, "ノートパソコン");
  assertEquals(shoppingCart.items[0].price, 80000);
  assertEquals(shoppingCart.items[0].quantity, 1);

  // 既存の商品を追加（数量が増加）
  shoppingCart.addItem(1, "ノートパソコン", 80000, 2);
  assertEquals(shoppingCart.items.length, 1);
  assertEquals(shoppingCart.items[0].quantity, 3);

  // 別の商品を追加
  shoppingCart.addItem(2, "マウス", 2000, 1);
  assertEquals(shoppingCart.items.length, 2);
  assertEquals(shoppingCart.items[1].id, 2);
  assertEquals(shoppingCart.items[1].name, "マウス");
});

Deno.test("removeItem関数のテスト", () => {
  shoppingCart.addItem(1, "ノートパソコン", 80000, 1);
  shoppingCart.addItem(2, "マウス", 2000, 2);

  // 商品を削除
  const result1 = shoppingCart.removeItem(1);
  assertEquals(result1, true);
  assertEquals(shoppingCart.items.length, 1);
  assertEquals(shoppingCart.items[0].id, 2);

  // 存在しない商品を削除
  const result2 = shoppingCart.removeItem(999);
  assertEquals(result2, false);
  assertEquals(shoppingCart.items.length, 1);

  // 残りの商品を削除
  const result3 = shoppingCart.removeItem(2);
  assertEquals(result3, true);
  assertEquals(shoppingCart.items.length, 0);
});

Deno.test("updateQuantity関数のテスト", () => {
  shoppingCart.addItem(1, "ノートパソコン", 80000, 1);
  shoppingCart.addItem(2, "マウス", 2000, 2);

  // 数量を更新
  const result1 = shoppingCart.updateQuantity(1, 3);
  assertEquals(result1, true);
  assertEquals(shoppingCart.items[0].quantity, 3);

  // 数量を0にする（商品が削除される）
  const result2 = shoppingCart.updateQuantity(2, 0);
  assertEquals(result2, true);
  assertEquals(shoppingCart.items.length, 1);

  // 存在しない商品の数量を更新
  const result3 = shoppingCart.updateQuantity(999, 5);
  assertEquals(result3, false);
});

Deno.test("getItem関数のテスト", () => {
  shoppingCart.addItem(1, "ノートパソコン", 80000, 1);
  shoppingCart.addItem(2, "マウス", 2000, 2);

  const item1 = shoppingCart.getItem(1);
  assertEquals(item1.id, 1);
  assertEquals(item1.name, "ノートパソコン");
  assertEquals(item1.price, 80000);
  assertEquals(item1.quantity, 1);

  const item2 = shoppingCart.getItem(2);
  assertEquals(item2.id, 2);
  assertEquals(item2.name, "マウス");

  const notFound = shoppingCart.getItem(999);
  assertEquals(notFound, null);
});

Deno.test("getTotalPrice関数のテスト", () => {
  // 空のカートの場合
  assertEquals(shoppingCart.getTotalPrice(), 0);

  // 商品を追加
  shoppingCart.addItem(1, "ノートパソコン", 80000, 2); // 160,000円
  shoppingCart.addItem(2, "マウス", 2000, 3); // 6,000円
  shoppingCart.addItem(3, "キーボード", 5000, 1); // 5,000円

  assertEquals(shoppingCart.getTotalPrice(), 171000);
});

Deno.test("getTotalItems関数のテスト", () => {
  // 空のカートの場合
  assertEquals(shoppingCart.getTotalItems(), 0);

  // 商品を追加
  shoppingCart.addItem(1, "ノートパソコン", 80000, 2);
  shoppingCart.addItem(2, "マウス", 2000, 3);
  shoppingCart.addItem(3, "キーボード", 5000, 1);

  assertEquals(shoppingCart.getTotalItems(), 6); // 2 + 3 + 1 = 6
});

Deno.test("clearCart関数のテスト", () => {
  shoppingCart.addItem(1, "ノートパソコン", 80000, 2);
  shoppingCart.addItem(2, "マウス", 2000, 3);

  assertEquals(shoppingCart.items.length, 2);

  shoppingCart.clearCart();
  assertEquals(shoppingCart.items.length, 0);
  assertEquals(shoppingCart.getTotalPrice(), 0);
  assertEquals(shoppingCart.getTotalItems(), 0);
});

Deno.test("getItemsSortedByPrice関数のテスト", () => {
  shoppingCart.addItem(1, "ノートパソコン", 80000, 1);
  shoppingCart.addItem(2, "マウス", 2000, 1);
  shoppingCart.addItem(3, "キーボード", 5000, 1);
  shoppingCart.addItem(4, "モニター", 25000, 1);

  const sortedItems = shoppingCart.getItemsSortedByPrice();

  assertEquals(sortedItems.length, 4);
  assertEquals(sortedItems[0].name, "マウス"); // 2000円
  assertEquals(sortedItems[1].name, "キーボード"); // 5000円
  assertEquals(sortedItems[2].name, "モニター"); // 25000円
  assertEquals(sortedItems[3].name, "ノートパソコン"); // 80000円

  // 元の配列が変更されていないことを確認
  assertEquals(shoppingCart.items[0].name, "ノートパソコン");
  assertEquals(shoppingCart.items[1].name, "マウス");
});
