import { assertEquals } from "@std/assert";
import { studentManager } from "./student-manager.js";

Deno.test.beforeEach(() => {
  // 初期状態をリセット
  studentManager.students = [];
  studentManager.nextId = 1;
});

Deno.test("studentManager初期状態のテスト", () => {
  assertEquals(studentManager.students, []);
  assertEquals(studentManager.getStudentCount(), 0);
});

Deno.test("addStudent関数のテスト", () => {
  studentManager.addStudent("山田太郎", 20, "2年生");
  assertEquals(studentManager.students.length, 1);
  assertEquals(studentManager.students[0].name, "山田太郎");
  assertEquals(studentManager.students[0].age, 20);
  assertEquals(studentManager.students[0].grade, "2年生");
  assertEquals(studentManager.students[0].scores, []);

  studentManager.addStudent("佐藤花子", 19, "1年生");
  assertEquals(studentManager.students.length, 2);
  assertEquals(studentManager.students[1].name, "佐藤花子");

  // IDが自動生成されることを確認
  assertEquals(studentManager.students[0].id, 1);
  assertEquals(studentManager.students[1].id, 2);
});

Deno.test("findStudentById関数のテスト", () => {
  studentManager.addStudent("山田太郎", 20, "2年生");
  studentManager.addStudent("佐藤花子", 19, "1年生");

  const student1 = studentManager.findStudentById(1);
  assertEquals(student1.name, "山田太郎");
  assertEquals(student1.age, 20);

  const student2 = studentManager.findStudentById(2);
  assertEquals(student2.name, "佐藤花子");
  assertEquals(student2.age, 19);

  const notFound = studentManager.findStudentById(999);
  assertEquals(notFound, null);
});

Deno.test("addScore関数のテスト", () => {
  studentManager.addStudent("山田太郎", 20, "2年生");

  studentManager.addScore(1, 85);
  assertEquals(studentManager.students[0].scores, [85]);

  studentManager.addScore(1, 92);
  assertEquals(studentManager.students[0].scores, [85, 92]);

  studentManager.addScore(1, 78);
  assertEquals(studentManager.students[0].scores, [85, 92, 78]);

  // 存在しない学生IDの場合
  const result = studentManager.addScore(999, 90);
  assertEquals(result, false);
});

Deno.test("calculateStudentAverage関数のテスト", () => {
  studentManager.addStudent("山田太郎", 20, "2年生");

  // 点数がない場合
  assertEquals(studentManager.calculateStudentAverage(1), 0);

  studentManager.addScore(1, 85);
  studentManager.addScore(1, 92);
  studentManager.addScore(1, 78);

  const average = studentManager.calculateStudentAverage(1);
  assertEquals(average, 85);

  // 存在しない学生IDの場合
  assertEquals(studentManager.calculateStudentAverage(999), 0);
});

Deno.test("getStudentsByGrade関数のテスト", () => {
  studentManager.addStudent("山田太郎", 20, "2年生");
  studentManager.addStudent("佐藤花子", 19, "1年生");
  studentManager.addStudent("田中次郎", 21, "3年生");
  studentManager.addStudent("高橋美咲", 20, "2年生");

  const secondYear = studentManager.getStudentsByGrade("2年生");
  assertEquals(secondYear.length, 2);
  assertEquals(secondYear[0].name, "山田太郎");
  assertEquals(secondYear[1].name, "高橋美咲");

  const firstYear = studentManager.getStudentsByGrade("1年生");
  assertEquals(firstYear.length, 1);
  assertEquals(firstYear[0].name, "佐藤花子");

  const fourthYear = studentManager.getStudentsByGrade("4年生");
  assertEquals(fourthYear.length, 0);
});

Deno.test("getTopStudent関数のテスト", () => {
  studentManager.addStudent("山田太郎", 20, "2年生");
  studentManager.addStudent("佐藤花子", 19, "1年生");
  studentManager.addStudent("田中次郎", 21, "3年生");

  // 点数を追加
  studentManager.addScore(1, 80); // 山田太郎: 平均80
  studentManager.addScore(1, 80);

  studentManager.addScore(2, 90); // 佐藤花子: 平均90
  studentManager.addScore(2, 90);

  studentManager.addScore(3, 70); // 田中次郎: 平均70
  studentManager.addScore(3, 70);

  const topStudent = studentManager.getTopStudent();
  assertEquals(topStudent.name, "佐藤花子");
  assertEquals(topStudent.id, 2);
});

Deno.test("getStudentCount関数のテスト", () => {
  assertEquals(studentManager.getStudentCount(), 0);

  studentManager.addStudent("山田太郎", 20, "2年生");
  assertEquals(studentManager.getStudentCount(), 1);

  studentManager.addStudent("佐藤花子", 19, "1年生");
  assertEquals(studentManager.getStudentCount(), 2);

  studentManager.addStudent("田中次郎", 21, "3年生");
  assertEquals(studentManager.getStudentCount(), 3);
});
