import { assertEquals, assertExists } from "jsr:@std/assert";
import {
  aggregateCsvData,
  filterCsvData,
  generateSalesReport,
  mergeCustomerData,
  parseEmployeeCsv,
  validateCsvFormat,
} from "./csv-processor.js";

// テスト用CSVデータ
const employeeCsvData = `id,name,age,department,salary,joinDate
1,田中太郎,30,Engineering,500000,2020-01-15
2,佐藤花子,25,Sales,400000,2021-03-10
3,山田次郎,35,Engineering,600000,2019-05-20
4,鈴木美咲,28,Marketing,450000,2022-02-01`;

const customerCsvData = `customerId,name,email,registrationDate
C001,田中太郎,tanaka@example.com,2023-01-15
C002,佐藤花子,sato@example.com,2023-02-20
C003,山田次郎,yamada@example.com,2023-03-10`;

const orderCsvData = `orderId,customerId,amount,date
O001,C001,15000,2024-01-15
O002,C002,25000,2024-01-16
O003,C001,8000,2024-01-17
O004,C003,35000,2024-01-18
O005,C002,12000,2024-01-19`;

const salesData = [
  { date: "2024-01-15", amount: 15000 },
  { date: "2024-01-16", amount: 25000 },
  { date: "2024-01-17", amount: 8000 },
  { date: "2024-02-01", amount: 35000 },
  { date: "2024-02-15", amount: 12000 },
];

Deno.test("parseEmployeeCsv - 従業員CSVデータの解析", () => {
  const result = parseEmployeeCsv(employeeCsvData);

  assertEquals(result.success, true);
  assertExists(result.data);
  assertEquals(result.data.length, 4);

  // 最初の従業員データを確認
  const firstEmployee = result.data[0];
  assertEquals(firstEmployee.id, 1);
  assertEquals(firstEmployee.name, "田中太郎");
  assertEquals(firstEmployee.age, 30);
  assertEquals(firstEmployee.department, "Engineering");
  assertEquals(firstEmployee.salary, 500000);

  // 統計情報を確認
  assertExists(result.statistics);
  assertEquals(result.statistics.totalEmployees, 4);
  assertEquals(result.statistics.averageAge, 29.5);
  assertEquals(result.statistics.averageSalary, 487500);
  assertEquals(result.statistics.departments.length, 3);
  assertEquals(result.statistics.departmentCounts.Engineering, 2);
});

Deno.test("parseEmployeeCsv - 不正なCSVデータ", () => {
  const invalidCsv = "invalid,csv,data";
  const result = parseEmployeeCsv(invalidCsv);

  assertEquals(result.success, false);
  assertExists(result.error);
});

Deno.test("generateSalesReport - 売上レポート生成", () => {
  const csvReport = generateSalesReport(salesData);

  assertExists(csvReport);
  assertEquals(typeof csvReport, "string");

  // CSVヘッダーが含まれていることを確認
  assertEquals(csvReport.includes("month"), true);
  assertEquals(csvReport.includes("totalSales"), true);
  assertEquals(csvReport.includes("orderCount"), true);
  assertEquals(csvReport.includes("averageOrderValue"), true);

  // 2024-01と2024-02のデータが含まれていることを確認
  assertEquals(csvReport.includes("2024-01"), true);
  assertEquals(csvReport.includes("2024-02"), true);
});

Deno.test("mergeCustomerData - 顧客データと注文データの結合", () => {
  const result = mergeCustomerData(customerCsvData, orderCsvData);

  assertEquals(result.success, true);
  assertExists(result.data);
  assertEquals(result.data.length, 3);

  // 顧客C001の情報を確認
  const customer001 = result.data.find((c) => c.customerId === "C001");
  assertExists(customer001);
  assertEquals(customer001.name, "田中太郎");
  assertEquals(customer001.orderCount, 2);
  assertEquals(customer001.totalSpent, 23000);
  assertEquals(customer001.averageOrderValue, 11500);

  // サマリー情報を確認
  assertExists(result.summary);
  assertEquals(result.summary.totalCustomers, 3);
  assertEquals(result.summary.activeCustomers, 3);
  assertEquals(result.summary.totalOrders, 5);
  assertEquals(result.summary.totalRevenue, 95000);
});

Deno.test("mergeCustomerData - 不正なCSVデータ", () => {
  const result = mergeCustomerData("invalid", "invalid");

  assertEquals(result.success, false);
  assertExists(result.error);
});

Deno.test("filterCsvData - CSVデータのフィルタリング", () => {
  const testCsv = `name,age,department
田中太郎,30,Engineering
佐藤花子,25,Sales
山田次郎,35,Engineering`;

  // Engineering部門のみをフィルタ
  const filteredCsv = filterCsvData(
    testCsv,
    (row) => row.department === "Engineering",
  );

  assertExists(filteredCsv);
  assertEquals(typeof filteredCsv, "string");

  // ヘッダーが含まれていることを確認
  assertEquals(filteredCsv.includes("name,age,department"), true);
  // Engineering部門のデータが含まれていることを確認
  assertEquals(filteredCsv.includes("田中太郎"), true);
  assertEquals(filteredCsv.includes("山田次郎"), true);
  // Sales部門のデータが除外されていることを確認
  assertEquals(filteredCsv.includes("佐藤花子"), false);
});

Deno.test("aggregateCsvData - CSVデータの集計", () => {
  const testCsv = `department,salary
Engineering,500000
Sales,400000
Engineering,600000
Marketing,450000`;

  const result = aggregateCsvData(testCsv, "department", "salary");

  assertEquals(result.success, true);
  assertExists(result.data);
  assertEquals(result.data.length, 3);

  // Engineering部門の集計を確認
  const engineeringData = result.data.find((d) =>
    d.department === "Engineering"
  );
  assertExists(engineeringData);
  assertEquals(engineeringData.count, 2);
  assertEquals(engineeringData.sum, 1100000);
  assertEquals(engineeringData.average, 550000);
  assertEquals(engineeringData.min, 500000);
  assertEquals(engineeringData.max, 600000);

  // サマリー情報を確認
  assertExists(result.summary);
  assertEquals(result.summary.totalGroups, 3);
  assertEquals(result.summary.totalRecords, 4);
  assertEquals(result.summary.groupByColumn, "department");
  assertEquals(result.summary.aggregateColumn, "salary");
});

Deno.test("aggregateCsvData - 存在しないカラム", () => {
  const testCsv = `name,age
田中,30`;

  const result = aggregateCsvData(testCsv, "department", "salary");

  assertEquals(result.success, false);
  assertExists(result.error);
  assertEquals(result.error.includes("指定されたカラムが存在しません"), true);
});

Deno.test("validateCsvFormat - 正常なCSVフォーマット", () => {
  const testCsv = `name,age,department
田中太郎,30,Engineering
佐藤花子,25,Sales`;

  const expectedHeaders = ["name", "age", "department"];
  const result = validateCsvFormat(testCsv, expectedHeaders);

  assertEquals(result.isValid, true);
  assertEquals(result.errors.length, 0);
  assertEquals(result.actualHeaders, expectedHeaders);
  assertEquals(result.rowCount, 2);
  assertEquals(result.columnCount, 3);
});

Deno.test("validateCsvFormat - 不正なCSVフォーマット", () => {
  const testCsv = `name,age
田中太郎,30,Engineering
佐藤花子,25`;

  const expectedHeaders = ["name", "age", "department"];
  const result = validateCsvFormat(testCsv, expectedHeaders);

  assertEquals(result.isValid, false);
  assertEquals(result.errors.length > 0, true);

  // ヘッダー数の不一致エラーが含まれていることを確認
  const headerCountError = result.errors.find((error) =>
    error.includes("ヘッダー数が一致しません")
  );
  assertExists(headerCountError);
});

Deno.test("validateCsvFormat - 空のCSVデータ", () => {
  const result = validateCsvFormat("", ["name", "age"]);

  assertEquals(result.isValid, false);
  assertEquals(result.errors.length, 1);
  assertEquals(result.errors[0], "CSVデータが空です");
});

Deno.test("filterCsvData - 年齢による複雑なフィルタリング", () => {
  const testCsv = `name,age,department
田中太郎,30,Engineering
佐藤花子,25,Sales
山田次郎,35,Engineering
鈴木美咲,28,Marketing`;

  // 30歳以上をフィルタ
  const filteredCsv = filterCsvData(testCsv, (row) => parseInt(row.age) >= 30);

  assertExists(filteredCsv);
  assertEquals(filteredCsv.includes("田中太郎"), true);
  assertEquals(filteredCsv.includes("山田次郎"), true);
  assertEquals(filteredCsv.includes("佐藤花子"), false);
  assertEquals(filteredCsv.includes("鈴木美咲"), false);
});
