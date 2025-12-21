import { assertEquals, assertThrows } from "@std/assert";
import {
  capitalizeFirst,
  countWords,
  extractEmails,
  isPalindrome,
  removeSpaces,
  reverseString,
  truncateString,
} from "./string-utils.js";

Deno.test("capitalizeFirst - 文字列の最初の文字を大文字にする", () => {
  assertEquals(capitalizeFirst("hello"), "Hello");
  assertEquals(capitalizeFirst("javascript"), "Javascript");
  assertEquals(capitalizeFirst("a"), "A");
  assertEquals(capitalizeFirst(""), "");
  assertEquals(capitalizeFirst("123abc"), "123abc");
});

Deno.test("reverseString - 文字列を逆順にする", () => {
  assertEquals(reverseString("hello"), "olleh");
  assertEquals(reverseString("JavaScript"), "tpircSavaJ");
  assertEquals(reverseString("12345"), "54321");
  assertEquals(reverseString(""), "");
  assertEquals(reverseString("a"), "a");
});

Deno.test("countWords - 文字列内の単語数を数える", () => {
  assertEquals(countWords("hello world"), 2);
  assertEquals(countWords("JavaScript is awesome"), 3);
  assertEquals(countWords("  hello   world  "), 2);
  assertEquals(countWords(""), 0);
  assertEquals(countWords("   "), 0);
  assertEquals(countWords("single"), 1);
});

Deno.test("removeSpaces - 文字列からすべての空白を削除する", () => {
  assertEquals(removeSpaces("hello world"), "helloworld");
  assertEquals(removeSpaces("  hello   world  "), "helloworld");
  assertEquals(removeSpaces("JavaScript is awesome"), "JavaScriptisawesome");
  assertEquals(removeSpaces(""), "");
  assertEquals(removeSpaces("   "), "");
  assertEquals(removeSpaces("nospace"), "nospace");
});

Deno.test("truncateString - 文字列を指定した長さで切り詰める", () => {
  assertEquals(truncateString("Hello World", 5), "Hello...");
  assertEquals(truncateString("JavaScript", 10), "JavaScript");
  assertEquals(truncateString("JavaScript", 4), "Java...");
  assertEquals(truncateString("", 5), "");
  assertEquals(truncateString("Hi", 5), "Hi");
  assertEquals(truncateString("Hello World", 11), "Hello World");
});

Deno.test("isPalindrome - 文字列が回文かどうかを判定する", () => {
  assertEquals(isPalindrome("racecar"), true);
  assertEquals(isPalindrome("hello"), false);
  assertEquals(isPalindrome("A man a plan a canal Panama"), true);
  assertEquals(isPalindrome("race a car"), false);
  assertEquals(isPalindrome(""), true);
  assertEquals(isPalindrome("a"), true);
  assertEquals(isPalindrome("Aa"), true);
});

Deno.test("extractEmails - 文字列からメールアドレスを抽出する", () => {
  assertEquals(extractEmails("Contact us at info@example.com"), [
    "info@example.com",
  ]);
  assertEquals(extractEmails("Email: user@test.com or admin@site.org"), [
    "user@test.com",
    "admin@site.org",
  ]);
  assertEquals(extractEmails("No email here"), []);
  assertEquals(extractEmails(""), []);
  assertEquals(extractEmails("Invalid email: user@"), []);
  assertEquals(extractEmails("Multiple: a@b.com, c@d.net, e@f.org"), [
    "a@b.com",
    "c@d.net",
    "e@f.org",
  ]);
});
