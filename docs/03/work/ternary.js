// 課題4: 三項演算子の活用

// prompt()を使ってテストの点数を入力してもらう
const scoreInput = prompt("テストの点数を入力してください（0〜100）", "85");

// 入力された文字列を数値に変換
const score = Number(scoreInput);

// 入力値が有効な数値かチェック
if (isNaN(score) || score < 0 || score > 100) {
  console.log("0〜100の有効な数値を入力してください");
} else {
  console.log(`点数: ${score}点`);

  // 1. 合格/不合格の判定（60点以上で合格）
  const passOrFail = score >= 60 ? "合格" : "不合格";
  console.log(`判定: ${passOrFail}`);

  // 2. 評価の判定（90点以上: 優、80点以上: 良、70点以上: 可、60点以上: 可、60点未満: 不可）
  const grade = score >= 90
    ? "優"
    : score >= 80
    ? "良"
    : score >= 70
    ? "可"
    : score >= 60
    ? "可"
    : "不可";
  console.log(`評価: ${grade}`);

  // 三項演算子とif-else文の比較
  console.log("\n三項演算子とif-else文の比較:");

  // 三項演算子での書き方
  const resultTernary = score >= 60 ? "合格" : "不合格";
  console.log(`三項演算子: ${resultTernary}`);

  // if-else文での書き方
  let resultIfElse;
  if (score >= 60) {
    resultIfElse = "合格";
  } else {
    resultIfElse = "不合格";
  }
  console.log(`if-else文: ${resultIfElse}`);

  // 複雑な条件の場合、if-else文の方が読みやすいことが多い
  console.log("\n複雑な条件の場合:");

  // 三項演算子でのネスト（読みにくい）
  const gradeNested = score >= 90
    ? "優"
    : score >= 80
    ? "良"
    : score >= 70
    ? "可"
    : score >= 60
    ? "可"
    : "不可";
  console.log(`三項演算子（ネスト）: ${gradeNested}`);

  // if-else文での書き方（読みやすい）
  let gradeIfElse;
  if (score >= 90) {
    gradeIfElse = "優";
  } else if (score >= 80) {
    gradeIfElse = "良";
  } else if (score >= 70) {
    gradeIfElse = "可";
  } else if (score >= 60) {
    gradeIfElse = "可";
  } else {
    gradeIfElse = "不可";
  }
  console.log(`if-else文: ${gradeIfElse}`);
}

// 使用例:
// - 95を入力 → 合格、評価: 優
// - 82を入力 → 合格、評価: 良
// - 75を入力 → 合格、評価: 可
// - 65を入力 → 合格、評価: 可
// - 45を入力 → 不合格、評価: 不可
// - 文字列または範囲外の数値を入力 → "0〜100の有効な数値を入力してください"

// 三項演算子は単純な条件分岐に適している
// 複雑な条件分岐にはif-else文やswitch文を使うことをお勧めします
