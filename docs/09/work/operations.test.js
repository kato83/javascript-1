import { assertEquals, assertThrows } from "@std/assert";
import {
  calculateDiscount,
  createSlug,
  formatFileSize,
  formatPhoneNumber,
  generatePassword,
  parseCSV,
  validateEmail,
} from "./operations.js";

Deno.test("validateEmail - メールアドレスの妥当性を検証する", () => {
  assertEquals(validateEmail("user@example.com"), true);
  assertEquals(validateEmail("test.email@domain.co.jp"), true);
  assertEquals(validateEmail("user+tag@example.org"), true);
  assertEquals(validateEmail("invalid-email"), false);
  assertEquals(validateEmail("user@"), false);
  assertEquals(validateEmail("@domain.com"), false);
  assertEquals(validateEmail(""), false);
  assertEquals(validateEmail("user@domain"), false);
});

Deno.test("formatPhoneNumber - 電話番号を統一フォーマットに変換する", () => {
  assertEquals(formatPhoneNumber("090-1234-5678"), "090-1234-5678");
  assertEquals(formatPhoneNumber("09012345678"), "090-1234-5678");
  assertEquals(formatPhoneNumber("090 1234 5678"), "090-1234-5678");
  assertEquals(formatPhoneNumber("0901234567"), "090-123-4567");
  assertEquals(formatPhoneNumber("03-1234-5678"), "03-1234-5678");
  assertEquals(formatPhoneNumber("0312345678"), "03-1234-5678");
});

Deno.test("calculateDiscount - 割引価格を計算する", () => {
  assertEquals(calculateDiscount(1000, 10), 900);
  assertEquals(calculateDiscount(500, 20), 400);
  assertEquals(calculateDiscount(1000, 0), 1000);
  assertEquals(calculateDiscount(0, 10), 0);
  assertEquals(calculateDiscount(1500, 15), 1275);
  assertEquals(calculateDiscount(2000, 50), 1000);
});

Deno.test("generatePassword - ランダムなパスワードを生成する", () => {
  const password1 = generatePassword(8, false);
  assertEquals(password1.length, 8);
  assertEquals(/^[a-zA-Z0-9]+$/.test(password1), true);

  const password2 = generatePassword(12, true);
  assertEquals(password2.length, 12);
  assertEquals(
    /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(password2),
    true,
  );

  const password3 = generatePassword(6, false);
  assertEquals(password3.length, 6);

  // 複数回生成して異なることを確認
  const passwords = [];
  for (let i = 0; i < 10; i++) {
    passwords.push(generatePassword(10, false));
  }
  const uniquePasswords = [...new Set(passwords)];
  assertEquals(uniquePasswords.length > 1, true);
});

Deno.test("parseCSV - CSV文字列を配列に変換する", () => {
  const csv1 = "name,age,city\nAlice,25,Tokyo\nBob,30,Osaka";
  const result1 = parseCSV(csv1);
  assertEquals(result1.length, 3);
  assertEquals(result1[0], ["name", "age", "city"]);
  assertEquals(result1[1], ["Alice", "25", "Tokyo"]);
  assertEquals(result1[2], ["Bob", "30", "Osaka"]);

  const csv2 = "a,b,c";
  const result2 = parseCSV(csv2);
  assertEquals(result2.length, 1);
  assertEquals(result2[0], ["a", "b", "c"]);

  const csv3 = "";
  const result3 = parseCSV(csv3);
  assertEquals(result3.length, 0);

  const csv4 = "single";
  const result4 = parseCSV(csv4);
  assertEquals(result4.length, 1);
  assertEquals(result4[0], ["single"]);
});

Deno.test("formatFileSize - バイト数を読みやすい形式に変換する", () => {
  assertEquals(formatFileSize(0), "0 B");
  assertEquals(formatFileSize(512), "512 B");
  assertEquals(formatFileSize(1024), "1.0 KB");
  assertEquals(formatFileSize(1536), "1.5 KB");
  assertEquals(formatFileSize(1048576), "1.0 MB");
  assertEquals(formatFileSize(1572864), "1.5 MB");
  assertEquals(formatFileSize(1073741824), "1.0 GB");
  assertEquals(formatFileSize(1610612736), "1.5 GB");
  assertEquals(formatFileSize(1099511627776), "1.0 TB");
});

Deno.test("createSlug - タイトルからURL用のスラッグを生成する", () => {
  assertEquals(createSlug("Hello World"), "hello-world");
  assertEquals(
    createSlug("JavaScript Programming Guide"),
    "javascript-programming-guide",
  );
  assertEquals(createSlug("  Multiple   Spaces  "), "multiple-spaces");
  assertEquals(createSlug("Special!@#$%Characters"), "specialcharacters");
  assertEquals(createSlug("日本語のタイトル"), "");
  assertEquals(createSlug("Mixed 日本語 and English"), "mixed-and-english");
  assertEquals(createSlug("123 Numbers 456"), "123-numbers-456");
  assertEquals(createSlug(""), "");
});
