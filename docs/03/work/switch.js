// 課題3: switch文の活用

// prompt()を使って月を入力してもらう
const monthInput = prompt("月を入力してください（1〜12）", "7");

// 入力された文字列を数値に変換
const month = Number(monthInput);

// 入力値が有効な数値かチェック
if (isNaN(month)) {
  console.log("有効な数値を入力してください");
} else {
  // 月の日数を表示
  console.log(`${month}月の日数は: `);

  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      console.log("31日");
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      console.log("30日");
      break;
    case 2:
      console.log("28日または29日（うるう年による）");
      break;
    default:
      console.log("無効な月です。1〜12の数値を入力してください。");
  }

  // うるう年の計算を含めた詳細な日数表示
  const currentYear = new Date().getFullYear();
  if (month >= 1 && month <= 12) {
    const days = getDaysInMonth(month, currentYear);
    console.log(`${currentYear}年の${month}月の正確な日数: ${days}日`);
  }
}

// 参考: より詳細なうるう年の計算を含めた場合
function getDaysInMonth(month, year = new Date().getFullYear()) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      // うるう年の計算: 4で割り切れる年はうるう年、ただし100で割り切れる年はうるう年でない、ただし400で割り切れる年はうるう年
      return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
        ? 29
        : 28;
    default:
      return null;
  }
}

// 使用例:
// - 1, 3, 5, 7, 8, 10, 12を入力 → "31日"
// - 4, 6, 9, 11を入力 → "30日"
// - 2を入力 → "28日または29日（うるう年による）"
// - 13以上または0以下を入力 → "無効な月です。1〜12の数値を入力してください。"
// - 文字列を入力 → "有効な数値を入力してください"
