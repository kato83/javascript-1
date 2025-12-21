import { assertEquals } from "@std/assert";
import { book } from "./book-object.js";

Deno.test("book オブジェクトの基本プロパティ", () => {
  assertEquals(typeof book.title, "string");
  assertEquals(typeof book.author, "string");
  assertEquals(typeof book.pages, "number");
  assertEquals(typeof book.price, "number");
  assertEquals(typeof book.isRead, "boolean");
});

Deno.test("book オブジェクトのプロパティ値", () => {
  // 基本的なプロパティが適切な値を持っているかテスト
  assertEquals(book.title.length > 0, true);
  assertEquals(book.author.length > 0, true);
  assertEquals(book.pages > 0, true);
  assertEquals(book.price >= 0, true);
});

Deno.test("book オブジェクトのプロパティ変更", () => {
  // 元の値を保存
  const originalPrice = book.price;
  const originalIsRead = book.isRead;

  // プロパティを変更
  book.price = 1500;
  book.isRead = true;

  // 変更が反映されているかテスト
  assertEquals(book.price, 1500);
  assertEquals(book.isRead, true);

  // 元の値に戻す
  book.price = originalPrice;
  book.isRead = originalIsRead;
});

Deno.test("book オブジェクトへの新しいプロパティ追加", () => {
  // 新しいプロパティを追加
  book.publisher = "テスト出版社";
  book.genre = "技術書";

  // 追加されたプロパティをテスト
  assertEquals(book.publisher, "テスト出版社");
  assertEquals(book.genre, "技術書");
  assertEquals(typeof book.publisher, "string");
  assertEquals(typeof book.genre, "string");

  // テスト後にプロパティを削除
  delete book.publisher;
  delete book.genre;
});

Deno.test("book オブジェクトのプロパティアクセス", () => {
  // ドット記法でのアクセス
  assertEquals(typeof book.title, "string");

  // ブラケット記法でのアクセス
  assertEquals(typeof book["title"], "string");
  assertEquals(book.title, book["title"]);
});
