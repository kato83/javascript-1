import { assertEquals } from "jsr:@std/assert";
import { sum } from "./sample.ts";

Deno.test("sum() adds given numbers", () => {
  const actual = sum(1, 2);
  const expected = 3;
  assertEquals(actual, expected);
});

Deno.test("sum() returns 0 when no arguments given", () => {
  const actual = sum();
  const expected = 0;
  assertEquals(actual, expected);
});

Deno.test("sum()", async (t) => {
  await t.step("adds given numbers", () => {
    const actual = sum(1, 2);
    const expected = 3;
    assertEquals(actual, expected);
  });

  await t.step("returns 0 when no arguments given", () => {
    const actual = sum();
    const expected = 0;
    assertEquals(actual, expected);
  });
});
