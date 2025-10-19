// 課題1: 基本的な条件分岐

// prompt()を使って気温を入力してもらう
const temperatureInput = prompt("気温を入力してください（数値）", "25");

// 入力された文字列を数値に変換
const temperature = Number(temperatureInput);

// 入力値が有効な数値かチェック
if (isNaN(temperature)) {
  console.log("有効な数値を入力してください");
} else {
  // 気温に応じてメッセージを表示
  console.log(`現在の気温: ${temperature}度`);

  if (temperature >= 30) {
    console.log("暑いです");
  } else if (temperature >= 20) {
    console.log("快適です");
  } else if (temperature >= 10) {
    console.log("少し肌寒いです");
  } else {
    console.log("寒いです");
  }
}

// 使用例:
// - 35を入力 → "暑いです"
// - 22を入力 → "快適です"
// - 15を入力 → "少し肌寒いです"
// - 5を入力 → "寒いです"
// - 文字列を入力 → "有効な数値を入力してください"
