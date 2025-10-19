// 課題2: 論理演算子の活用

// prompt()を使って年齢を入力してもらう
const ageInput = prompt("年齢を入力してください", "20");

// 入力された文字列を数値に変換
const age = Number(ageInput);

// prompt()を使って学生かどうかを入力してもらう（"yes"または"no"）
const isStudentInput = prompt("学生ですか？（yes または no）", "yes");

// 入力を真偽値に変換
const isStudent = isStudentInput.toLowerCase() === "yes";

// 基本料金
const regularPrice = 1800;

// 入力値が有効な数値かチェック
if (isNaN(age)) {
  console.log("年齢には有効な数値を入力してください");
} else {
  // 料金計算
  let price = regularPrice;

  // 13歳未満: 1000円
  if (age < 13) {
    price = 1000;
  } // 65歳以上: 1200円
  else if (age >= 65) {
    price = 1200;
  } // 学生（13歳以上、65歳未満）: 1500円
  else if (isStudent && age >= 13 && age < 65) {
    price = 1500;
  }

  // 結果表示
  console.log(`年齢: ${age}歳, 学生: ${isStudent ? "はい" : "いいえ"}`);
  console.log(`映画館の入場料: ${price}円`);
}

// 使用例:
// - 年齢: 10, 学生: no → 1000円（子供料金）
// - 年齢: 70, 学生: no → 1200円（シニア料金）
// - 年齢: 20, 学生: yes → 1500円（学生料金）
// - 年齢: 40, 学生: no → 1800円（一般料金）
// - 年齢: 12, 学生: yes → 1000円（子供料金が優先）
