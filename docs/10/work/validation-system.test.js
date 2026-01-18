import { assertEquals, assertExists } from "@std/assert";
import * as z from "zod";
import {
  createCustomValidator,
  sanitizeInput,
  validateBulkData,
  validateOrderData,
  validateProductData,
  validateUserRegistration,
} from "./validation-system.js";

Deno.test("validateUserRegistration - 正常なユーザー登録データ", () => {
  const validUserData = {
    username: "testuser123",
    email: "test@example.com",
    password: "Password123",
    age: 25,
    phone: "090-1234-5678",
    terms: true,
  };

  const result = validateUserRegistration(validUserData);
  assertEquals(result.success, true);
  assertExists(result.data);
  assertEquals(result.data.username, "testuser123");
});

Deno.test("validateUserRegistration - 不正なユーザー登録データ", () => {
  const invalidUserData = {
    username: "ab", // 短すぎる
    email: "invalid-email", // 無効なメール
    password: "weak", // 弱いパスワード
    age: 10, // 年齢制限未満
    phone: "090-1234", // 無効な電話番号
    terms: false, // 利用規約未同意
  };

  const result = validateUserRegistration(invalidUserData);
  assertEquals(result.success, false);
  assertExists(result.errors);
  assertEquals(result.errors.length > 0, true);
});

Deno.test("validateProductData - 正常な商品データ", () => {
  const validProductData = {
    name: "ノートパソコン",
    description: "高性能なノートパソコンです",
    price: 89800,
    category: "electronics",
    stock: 10,
    sku: "ABC-123456",
    tags: ["computer", "laptop"],
    isActive: true,
  };

  const result = validateProductData(validProductData);
  assertEquals(result.success, true);
  assertExists(result.data);
  assertEquals(result.data.name, "ノートパソコン");
  assertEquals(result.data.category, "electronics");
});

Deno.test("validateProductData - 不正な商品データ", () => {
  const invalidProductData = {
    name: "", // 空の商品名
    price: -100, // 負の価格
    category: "invalid_category", // 無効なカテゴリ
    stock: -5, // 負の在庫
    sku: "invalid-sku", // 無効なSKU形式
  };

  const result = validateProductData(invalidProductData);
  assertEquals(result.success, false);
  assertExists(result.errors);
  assertEquals(result.errors.length > 0, true);
});

Deno.test("validateOrderData - 正常な注文データ", () => {
  const validOrderData = {
    customerId: "CUST001",
    items: [
      { productId: "PROD001", quantity: 2, price: 1000 },
      { productId: "PROD002", quantity: 1, price: 2000 },
    ],
    shippingAddress: {
      street: "東京都渋谷区1-1-1",
      city: "渋谷区",
      postalCode: "150-0001",
      country: "Japan",
    },
    paymentMethod: "credit_card",
    notes: "お急ぎでお願いします",
  };

  const result = validateOrderData(validOrderData);
  assertEquals(result.success, true);
  assertExists(result.data);
  assertEquals(result.data.customerId, "CUST001");
  assertEquals(result.data.totalAmount, 4000); // 2*1000 + 1*2000
});

Deno.test("validateOrderData - 不正な注文データ", () => {
  const invalidOrderData = {
    customerId: "", // 空の顧客ID
    items: [], // 空の商品リスト
    shippingAddress: {
      street: "",
      city: "",
      postalCode: "invalid", // 無効な郵便番号
    },
    paymentMethod: "invalid_method", // 無効な支払い方法
  };

  const result = validateOrderData(invalidOrderData);
  assertEquals(result.success, false);
  assertExists(result.errors);
  assertEquals(result.errors.length > 0, true);
});

Deno.test("createCustomValidator - カスタムバリデーター作成", () => {
  const customSchema = z.object({
    name: z.string().min(1),
    age: z.number().min(0).max(150),
  });

  const validator = createCustomValidator(customSchema);

  // 正常なデータ
  const validData = { name: "太郎", age: 30 };
  const validResult = validator(validData);
  assertEquals(validResult.success, true);

  // 不正なデータ
  const invalidData = { name: "", age: -5 };
  const invalidResult = validator(invalidData);
  assertEquals(invalidResult.success, false);
});

Deno.test("validateBulkData - 配列データの一括検証", () => {
  const schema = z.object({
    id: z.number(),
    name: z.string().min(1),
  });

  const dataArray = [
    { id: 1, name: "商品A" }, // 正常
    { id: 2, name: "" }, // 不正（空の名前）
    { id: 3, name: "商品C" }, // 正常
    { id: "invalid", name: "商品D" }, // 不正（無効なID）
  ];

  const result = validateBulkData(dataArray, schema);
  assertEquals(result.total, 4);
  assertEquals(result.success, 2);
  assertEquals(result.failed, 2);
  assertEquals(result.isValid, false);
  assertExists(result.results);
  assertExists(result.errors);
});

Deno.test("sanitizeInput - 入力データのサニタイズ", () => {
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
  });

  // 前後に空白があるデータ
  const inputWithSpaces = {
    name: "  太郎  ",
    email: "  taro@example.com  ",
  };

  const result = sanitizeInput(inputWithSpaces, schema);
  assertEquals(result.success, true);
  assertEquals(result.sanitized, true);
  assertEquals(result.data.name, "太郎");
  assertEquals(result.data.email, "taro@example.com");
});

Deno.test("sanitizeInput - サニタイズできない不正データ", () => {
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
  });

  const invalidInput = {
    name: "",
    email: "invalid-email",
  };

  const result = sanitizeInput(invalidInput, schema);
  assertEquals(result.success, false);
  assertEquals(result.sanitized, false);
  assertExists(result.errors);
  assertExists(result.originalData);
});
