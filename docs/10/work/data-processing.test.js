import { assertEquals, assertExists } from "jsr:@std/assert";
import {
  analyzeEmployees,
  cleanDataset,
  findTopPerformers,
  generateReport,
  optimizeInventory,
  processOrders,
} from "./data-processing.js";

// テスト用データ
const sampleEmployees = [
  {
    id: 1,
    name: "田中太郎",
    age: 30,
    department: "Engineering",
    salary: 500000,
  },
  { id: 2, name: "佐藤花子", age: 25, department: "Sales", salary: 400000 },
  {
    id: 3,
    name: "山田次郎",
    age: 35,
    department: "Engineering",
    salary: 600000,
  },
  { id: 4, name: "鈴木美咲", age: 28, department: "Marketing", salary: 450000 },
  { id: 5, name: "高橋一郎", age: 32, department: "Sales", salary: 480000 },
];

const sampleOrders = [
  { id: 1, customerId: "C001", amount: 15000, date: "2024-01-15" },
  { id: 2, customerId: "C002", amount: 25000, date: "2024-01-16" },
  { id: 3, customerId: "C001", amount: 8000, date: "2024-01-17" },
  { id: 4, customerId: "C003", amount: 35000, date: "2024-01-18" },
  { id: 5, customerId: "C002", amount: 12000, date: "2024-01-19" },
];

const sampleProducts = [
  { id: 1, name: "ノートPC", category: "Electronics", price: 80000, stock: 5 },
  { id: 2, name: "マウス", category: "Electronics", price: 2000, stock: 25 },
  { id: 3, name: "デスク", category: "Furniture", price: 15000, stock: 0 },
  { id: 4, name: "チェア", category: "Furniture", price: 12000, stock: 8 },
  { id: 5, name: "モニター", category: "Electronics", price: 30000, stock: 15 },
];

Deno.test("analyzeEmployees - 従業員データを分析", () => {
  const result = analyzeEmployees(sampleEmployees);

  assertEquals(result.totalEmployees, 5);
  assertEquals(result.averageAge, 30);
  assertEquals(result.totalSalary, 2430000);
  assertExists(result.departmentStats);
  assertEquals(result.departments.length, 3);

  // Engineering部門の確認
  assertEquals(result.departmentStats.Engineering.count, 2);
  assertEquals(result.departmentStats.Engineering.averageAge, 32.5);
  assertEquals(result.departmentStats.Engineering.totalSalary, 1100000);
});

Deno.test("processOrders - 注文データを処理", () => {
  const result = processOrders(sampleOrders);

  assertEquals(result.totalOrders, 5);
  assertEquals(result.totalRevenue, 95000);
  assertEquals(result.averageOrderValue, 19000);
  assertEquals(result.uniqueCustomers, 3);

  assertExists(result.customerStats);
  assertExists(result.topCustomers);

  // 顧客C001の確認
  assertEquals(result.customerStats.C001.orderCount, 2);
  assertEquals(result.customerStats.C001.totalSpent, 23000);
});

Deno.test("optimizeInventory - 在庫データを最適化", () => {
  const result = optimizeInventory(sampleProducts);

  assertEquals(result.totalProducts, 5);
  assertEquals(result.lowStockItems, 3); // stock < 10の商品数
  assertEquals(result.outOfStockItems, 1); // stock = 0の商品数

  assertExists(result.categoryStats);
  assertExists(result.recommendations);

  // Electronics カテゴリの確認
  assertEquals(result.categoryStats.Electronics.itemCount, 3);
  assertEquals(result.categoryStats.Electronics.totalStock, 45);

  // 推奨事項の確認
  assertEquals(result.recommendations.reorderSoon.length, 2);
  assertEquals(result.recommendations.urgentReorder.length, 1);
});

Deno.test("generateReport - レポート生成", () => {
  const result = generateReport(sampleEmployees, "department");

  assertEquals(result.groupBy, "department");
  assertEquals(result.totalItems, 5);
  assertEquals(result.groups, 3);

  assertExists(result.summary);
  assertEquals(result.summary.Engineering.count, 2);
  assertEquals(result.summary.Sales.count, 2);
  assertEquals(result.summary.Marketing.count, 1);
});

Deno.test("findTopPerformers - トップパフォーマーを抽出", () => {
  const salesData = [
    { id: 1, name: "営業A", sales: 1000000 },
    { id: 2, name: "営業B", sales: 800000 },
    { id: 3, name: "営業C", sales: 1200000 },
    { id: 4, name: "営業D", sales: 600000 },
    { id: 5, name: "営業E", sales: 900000 },
    { id: 6, name: "営業F", sales: 1100000 },
  ];

  const result = findTopPerformers(salesData, "sales");

  assertEquals(result.length, 5);
  assertEquals(result[0].rank, 1);
  assertEquals(result[0].name, "営業C");
  assertEquals(result[0].performance, 1200000);
  assertEquals(result[1].name, "営業F");
  assertEquals(result[2].name, "営業A");
});

Deno.test("cleanDataset - データセットのクリーニング", () => {
  const rawData = [
    { id: 1, name: "商品A", price: 1000, category: "Electronics" },
    { id: 2, name: "商品B", price: null, category: "Books" },
    { id: 1, name: "商品A", price: 1000, category: "Electronics" }, // 重複
    { id: 3, name: "", price: 1500, category: "Clothing" }, // 欠損値
    { id: 4, name: "商品D", price: 2000, category: "Electronics" },
    { id: 5, name: "商品E", price: undefined, category: "Books" },
  ];

  const result = cleanDataset(rawData);

  assertEquals(result.original.count, 6);
  assertEquals(result.original.duplicates, 1);
  assertEquals(result.cleaned.total, 5); // 重複削除後
  assertEquals(result.cleaned.complete, 2); // 完全なレコード
  assertEquals(result.cleaned.incomplete, 3); // 不完全なレコード

  assertExists(result.data);
  assertExists(result.incompleteRecords);
  assertExists(result.statistics);

  // 完全なデータのみが含まれていることを確認
  assertEquals(result.data.length, 2);
  assertEquals(result.data[0].id, 1);
  assertEquals(result.data[1].id, 4);
});
