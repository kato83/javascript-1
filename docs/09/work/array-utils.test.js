import { assertEquals, assertThrows } from "@std/assert";
import {
  calculateAverage,
  filterByDateRange,
  findByProperty,
  getUniqueValues,
  groupBy,
  removeDuplicates,
  sortByProperty,
} from "./array-utils.js";

Deno.test("removeDuplicates - 配列から重複要素を削除する", () => {
  assertEquals(removeDuplicates([1, 2, 2, 3, 3, 3]), [1, 2, 3]);
  assertEquals(removeDuplicates(["a", "b", "a", "c", "b"]), ["a", "b", "c"]);
  assertEquals(removeDuplicates([]), []);
  assertEquals(removeDuplicates([1]), [1]);
  assertEquals(removeDuplicates([1, 1, 1]), [1]);
});

Deno.test("groupBy - オブジェクトの配列を指定したキーでグループ化する", () => {
  const data = [
    { name: "Alice", department: "Engineering" },
    { name: "Bob", department: "Sales" },
    { name: "Charlie", department: "Engineering" },
    { name: "David", department: "Sales" },
  ];

  const result = groupBy(data, "department");
  assertEquals(result.Engineering.length, 2);
  assertEquals(result.Sales.length, 2);
  assertEquals(result.Engineering[0].name, "Alice");
  assertEquals(result.Engineering[1].name, "Charlie");
  assertEquals(result.Sales[0].name, "Bob");
  assertEquals(result.Sales[1].name, "David");
});

Deno.test("sortByProperty - オブジェクトの配列を指定したプロパティでソートする", () => {
  const data = [
    { name: "Charlie", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 35 },
  ];

  const sortedByAge = sortByProperty(data, "age", true);
  assertEquals(sortedByAge[0].name, "Alice");
  assertEquals(sortedByAge[1].name, "Charlie");
  assertEquals(sortedByAge[2].name, "Bob");

  const sortedByAgeDesc = sortByProperty(data, "age", false);
  assertEquals(sortedByAgeDesc[0].name, "Bob");
  assertEquals(sortedByAgeDesc[1].name, "Charlie");
  assertEquals(sortedByAgeDesc[2].name, "Alice");

  const sortedByName = sortByProperty(data, "name", true);
  assertEquals(sortedByName[0].name, "Alice");
  assertEquals(sortedByName[1].name, "Bob");
  assertEquals(sortedByName[2].name, "Charlie");
});

Deno.test("findByProperty - 指定したプロパティの値で要素を検索する", () => {
  const data = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 35 },
  ];

  const result1 = findByProperty(data, "name", "Bob");
  assertEquals(result1.id, 2);
  assertEquals(result1.age, 30);

  const result2 = findByProperty(data, "age", 35);
  assertEquals(result2.name, "Charlie");

  const result3 = findByProperty(data, "name", "David");
  assertEquals(result3, undefined);
});

Deno.test("calculateAverage - 数値配列の平均値を計算する", () => {
  assertEquals(calculateAverage([1, 2, 3, 4, 5]), 3);
  assertEquals(calculateAverage([10, 20, 30]), 20);
  assertEquals(calculateAverage([5]), 5);
  assertEquals(calculateAverage([2, 4, 6, 8]), 5);
  assertEquals(calculateAverage([]), 0);
});

Deno.test("getUniqueValues - 指定したプロパティのユニークな値を取得する", () => {
  const data = [
    { name: "Alice", department: "Engineering" },
    { name: "Bob", department: "Sales" },
    { name: "Charlie", department: "Engineering" },
    { name: "David", department: "Marketing" },
    { name: "Eve", department: "Sales" },
  ];

  const departments = getUniqueValues(data, "department");
  assertEquals(departments.sort(), ["Engineering", "Marketing", "Sales"]);

  const names = getUniqueValues(data, "name");
  assertEquals(names.sort(), ["Alice", "Bob", "Charlie", "David", "Eve"]);
});

Deno.test("filterByDateRange - 日付範囲で配列をフィルタリングする", () => {
  const data = [
    { id: 1, name: "Event 1", date: new Date(2024, 0, 5) },
    { id: 2, name: "Event 2", date: new Date(2024, 0, 15) },
    { id: 3, name: "Event 3", date: new Date(2024, 0, 25) },
    { id: 4, name: "Event 4", date: new Date(2024, 1, 5) },
  ];

  const startDate = new Date(2024, 0, 10);
  const endDate = new Date(2024, 0, 30);

  const result = filterByDateRange(data, "date", startDate, endDate);
  assertEquals(result.length, 2);
  assertEquals(result[0].name, "Event 2");
  assertEquals(result[1].name, "Event 3");

  // 範囲外のテスト
  const startDate2 = new Date(2024, 1, 1);
  const endDate2 = new Date(2024, 1, 10);
  const result2 = filterByDateRange(data, "date", startDate2, endDate2);
  assertEquals(result2.length, 1);
  assertEquals(result2[0].name, "Event 4");
});
