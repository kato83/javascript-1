import { assertEquals } from "@std/assert";
import { movie } from "./movie-object.js";

Deno.test("movie オブジェクトの基本プロパティ", () => {
  assertEquals(typeof movie.title, "string");
  assertEquals(typeof movie.director, "string");
  assertEquals(typeof movie.releaseYear, "number");
  assertEquals(typeof movie.genre, "string");
  assertEquals(typeof movie.duration, "number");
  assertEquals(typeof movie.isWatched, "boolean");
});

Deno.test("movie オブジェクトのプロパティ値", () => {
  // 基本的なプロパティが適切な値を持っているかテスト
  assertEquals(movie.title.length > 0, true);
  assertEquals(movie.director.length > 0, true);
  assertEquals(movie.releaseYear > 1800, true);
  assertEquals(movie.genre.length > 0, true);
  assertEquals(movie.duration > 0, true);
});

Deno.test("movie オブジェクトのプロパティ変更", () => {
  // 元の値を保存
  const originalIsWatched = movie.isWatched;

  // プロパティを変更
  movie.isWatched = true;

  // 変更が反映されているかテスト
  assertEquals(movie.isWatched, true);

  // 元の値に戻す
  movie.isWatched = originalIsWatched;
});

Deno.test("movie オブジェクトへの新しいプロパティ追加", () => {
  // 新しいプロパティを追加
  movie.rating = 4.5;
  movie.language = "日本語";

  // 追加されたプロパティをテスト
  assertEquals(movie.rating, 4.5);
  assertEquals(movie.language, "日本語");
  assertEquals(typeof movie.rating, "number");
  assertEquals(typeof movie.language, "string");

  // テスト後にプロパティを削除
  delete movie.rating;
  delete movie.language;
});

Deno.test("movie オブジェクトのプロパティアクセス", () => {
  // ドット記法でのアクセス
  assertEquals(typeof movie.title, "string");

  // ブラケット記法でのアクセス
  assertEquals(typeof movie["title"], "string");
  assertEquals(movie.title, movie["title"]);
});
