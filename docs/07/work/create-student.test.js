import { assertEquals } from "@std/assert";
import { createStudent } from "./create-student.js";

Deno.test("createStudent - 学生オブジェクトの作成", () => {
  const student = createStudent("山田太郎", 20, "2年生");
  assertEquals(student.name, "山田太郎");
  assertEquals(student.age, 20);
  assertEquals(student.grade, "2年生");
  assertEquals(student.subjects.length, 0);
});

Deno.test("createStudent - 基本プロパティの型チェック", () => {
  const student = createStudent("佐藤花子", 19, "1年生");
  assertEquals(typeof student.name, "string");
  assertEquals(typeof student.age, "number");
  assertEquals(typeof student.grade, "string");
  assertEquals(Array.isArray(student.subjects), true);
});

Deno.test("createStudent - introduce メソッド", () => {
  const student = createStudent("田中次郎", 21, "3年生");
  const introduction = student.introduce();
  assertEquals(typeof introduction, "string");
  assertEquals(introduction.includes("田中次郎"), true);
  assertEquals(introduction.includes("21"), true);
  assertEquals(introduction.includes("3年生"), true);
});

Deno.test("createStudent - addSubject メソッド", () => {
  const student = createStudent("鈴木花子", 20, "2年生");
  student.addSubject("JavaScript");
  student.addSubject("HTML/CSS");

  assertEquals(student.subjects.length, 2);
  assertEquals(student.subjects.includes("JavaScript"), true);
  assertEquals(student.subjects.includes("HTML/CSS"), true);
});

Deno.test("createStudent - getSubjects メソッド", () => {
  const student = createStudent("高橋太郎", 22, "4年生");
  student.addSubject("データベース");
  student.addSubject("ネットワーク");

  const subjects = student.getSubjects();
  assertEquals(Array.isArray(subjects), true);
  assertEquals(subjects.length, 2);
  assertEquals(subjects.includes("データベース"), true);
  assertEquals(subjects.includes("ネットワーク"), true);
});

Deno.test("createStudent - haveBirthday メソッド", () => {
  const student = createStudent("伊藤花子", 19, "1年生");
  const originalAge = student.age;
  const message = student.haveBirthday();

  assertEquals(student.age, originalAge + 1);
  assertEquals(typeof message, "string");
  assertEquals(message.includes("20"), true);
});

Deno.test("createStudent - 複数の学生オブジェクト", () => {
  const student1 = createStudent("学生A", 18, "1年生");
  const student2 = createStudent("学生B", 19, "2年生");

  student1.addSubject("数学");
  student2.addSubject("英語");

  // 独立したオブジェクトであることを確認
  assertEquals(student1.subjects.length, 1);
  assertEquals(student2.subjects.length, 1);
  assertEquals(student1.subjects.includes("数学"), true);
  assertEquals(student2.subjects.includes("英語"), true);
  assertEquals(student1.subjects.includes("英語"), false);
  assertEquals(student2.subjects.includes("数学"), false);
});

Deno.test("createStudent - メソッドの連続実行", () => {
  const student = createStudent("連続テスト", 20, "2年生");

  student.addSubject("科目1");
  student.addSubject("科目2");
  student.haveBirthday();

  assertEquals(student.age, 21);
  assertEquals(student.subjects.length, 2);

  const introduction = student.introduce();
  assertEquals(introduction.includes("21"), true);
});
