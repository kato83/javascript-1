// 課題1: 変数宣言と型確認

// 1. 異なるデータ型の変数を5つ以上宣言
let age = 25; // 数値型
const name = "山田太郎"; // 文字列型
let isStudent = true; // 論理型
const fruits = ["りんご", "バナナ", "オレンジ"]; // 配列型
const person = { // オブジェクト型
  firstName: "太郎",
  lastName: "山田",
  age: 25,
};
let nothing = null; // null型
let something; // undefined型

// 2. それぞれの変数の型をtypeof演算子で確認し、コンソールに出力
console.log("age:", typeof age); // "number"
console.log("name:", typeof name); // "string"
console.log("isStudent:", typeof isStudent); // "boolean"
console.log("fruits:", typeof fruits); // "object"
console.log("person:", typeof person); // "object"
console.log("nothing:", typeof nothing); // "object" (JavaScriptのバグ)
console.log("something:", typeof something); // "undefined"

// 配列かどうかを確認する方法
console.log("fruitsは配列か:", Array.isArray(fruits)); // true
console.log("personは配列か:", Array.isArray(person)); // false

// 3. 少なくとも1つの変数に対して、値を再代入
console.log("\n値を再代入する前のage:", age);
age = 30;
console.log("値を再代入した後のage:", age);

// constで宣言した変数は再代入できない
// name = "鈴木一郎"; // エラー: 再代入できない

// ただし、constで宣言したオブジェクトや配列の中身は変更可能
console.log("\n変更前のfruits:", fruits);
fruits.push("ぶどう");
console.log("変更後のfruits:", fruits);

console.log("\n変更前のperson:", person);
person.age = 26;
console.log("変更後のperson:", person);
