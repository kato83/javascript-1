import { assertEquals, assertThrows } from "jsr:@std/assert";
import {
  average,
  daysUntilNewYear,
  findLongestString,
  sumArray,
  toTitleCase,
  unique,
} from "./solution.js";

Deno.test("sumArray の基本動作", () => {
  assertEquals(sumArray([1, 2, 3]), 6);
  assertEquals(sumArray([]), 0);
  assertEquals(sumArray([0, -1, 1]), 0);
});

Deno.test("average の基本動作", () => {
  assertEquals(average([2, 4, 6]), 4);
  assertEquals(average([]), 0);
  assertEquals(average([1]), 1);
});

Deno.test("unique の基本動作", () => {
  assertEquals(unique([1, 2, 1, 3, 2]), [1, 2, 3]);
  assertEquals(unique(["a", "a", "b"]), ["a", "b"]);
  assertEquals(unique([]), []);
});

Deno.test("findLongestString の基本動作", () => {
  assertEquals(findLongestString(["a", "abcd", "xyz"]), "abcd");
  assertEquals(findLongestString([]), "");
  assertEquals(findLongestString(["same", "size"]), "same");
});

Deno.test("toTitleCase の基本動作", () => {
  assertEquals(toTitleCase("hello world"), "Hello World");
  assertEquals(toTitleCase("JAVA script"), "Java Script");
  assertThrows(() => toTitleCase(null));
});

Deno.test("daysUntilNewYear の基本動作", () => {
  // 2024-12-31 -> 1 day to 2025-01-01
  assertEquals(daysUntilNewYear(new Date("2024-12-31")), 1);
  // 2024-01-01 -> 366 days to 2025-01-01 (2024 は閏年)
  assertEquals(daysUntilNewYear(new Date("2024-01-01")), 366);
  // 当日
  const d = new Date("2024-05-20");
  assertEquals(
    daysUntilNewYear(new Date(d.getFullYear(), d.getMonth(), d.getDate())),
    daysUntilNewYear(d),
  );
});
