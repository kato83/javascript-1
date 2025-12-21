import { assertEquals } from "@std/assert";
import {
  addStudentAt,
  findStudent,
  getStudentList,
  hasStudent,
  removeStudentAt,
  students,
} from "./array-search.js";

Deno.test.beforeEach(() => {
  // 初期状態をリセット
  const length = students.length;
  for (let i = 0; i < length; i++) students.pop();
  students.push("山田太郎", "佐藤花子", "田中次郎");
});

Deno.test("students配列の初期値テスト", () => {
  assertEquals(students, ["山田太郎", "佐藤花子", "田中次郎"]);
});

Deno.test("findStudent関数のテスト", () => {
  assertEquals(findStudent("山田太郎"), 0);
  assertEquals(findStudent("佐藤花子"), 1);
  assertEquals(findStudent("田中次郎"), 2);
  assertEquals(findStudent("存在しない学生"), -1);
});

Deno.test("hasStudent関数のテスト", () => {
  assertEquals(hasStudent("山田太郎"), true);
  assertEquals(hasStudent("佐藤花子"), true);
  assertEquals(hasStudent("田中次郎"), true);
  assertEquals(hasStudent("存在しない学生"), false);
});

Deno.test("addStudentAt関数のテスト", () => {
  addStudentAt(1, "高橋美咲");
  assertEquals(students, ["山田太郎", "高橋美咲", "佐藤花子", "田中次郎"]);

  addStudentAt(0, "鈴木一郎");
  assertEquals(students, [
    "鈴木一郎",
    "山田太郎",
    "高橋美咲",
    "佐藤花子",
    "田中次郎",
  ]);

  addStudentAt(5, "渡辺次郎");
  assertEquals(students, [
    "鈴木一郎",
    "山田太郎",
    "高橋美咲",
    "佐藤花子",
    "田中次郎",
    "渡辺次郎",
  ]);
});

Deno.test("removeStudentAt関数のテスト", () => {
  const removed1 = removeStudentAt(1);
  assertEquals(removed1, "佐藤花子");
  assertEquals(students, ["山田太郎", "田中次郎"]);

  const removed2 = removeStudentAt(0);
  assertEquals(removed2, "山田太郎");
  assertEquals(students, ["田中次郎"]);

  const removed3 = removeStudentAt(10); // 存在しないインデックス
  assertEquals(removed3, undefined);
  assertEquals(students, ["田中次郎"]);
});

Deno.test("getStudentList関数のテスト", () => {
  assertEquals(getStudentList(), "山田太郎, 佐藤花子, 田中次郎");

  students.push("高橋美咲");
  assertEquals(getStudentList(), "山田太郎, 佐藤花子, 田中次郎, 高橋美咲");

  // 空の配列の場合
  students.length = 0;
  assertEquals(getStudentList(), "");
});
