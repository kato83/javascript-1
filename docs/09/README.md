# JavaScript 文字列、数値、日付等の基本操作

## テンプレートリテラル

バッククォート（`）を使用することで、変数を文字列内に埋め込むことができます：

```js
const name = "山田太郎";
const age = 25;
const city = "東京";

// 従来の方法（文字列連結）
const introduction1 = "私の名前は" + name + "です。年齢は" + age + "歳で、" + city + "に住んでいます。";

// テンプレートリテラルを使用
const introduction2 = `私の名前は${name}です。年齢は${age}歳で、${city}に住んでいます。`;

console.log(introduction2); // "私の名前は山田太郎です。年齢は25歳で、東京に住んでいます。"

// 計算式も埋め込める
const price = 1000;
const tax = 0.1;
const message = `税込価格は${price * (1 + tax)}円です。`;
console.log(message); // "税込価格は1100円です。"

// 複数行の文字列
const htmlTemplate = `
<div class="user-card">
  <h2>${name}</h2>
  <p>年齢: ${age}歳</p>
  <p>住所: ${city}</p>
</div>
`;
```

## 文字列の基本操作

### 文字列の長さ

```js
const text = "JavaScript";
console.log(text.length); // 10

const japanese = "こんにちは";
console.log(japanese.length); // 5

// 空文字列の長さ
const empty = "";
console.log(empty.length); // 0
```

### 文字列の検索

#### indexOf() - 文字列の位置を検索

```js
const text = "JavaScript is awesome";

console.log(text.indexOf("Script")); // 4
console.log(text.indexOf("is")); // 11
console.log(text.indexOf("Python")); // -1（見つからない場合）

// 検索開始位置を指定
console.log(text.indexOf("a", 5)); // 16（インデックス5以降で"a"を検索）
```

#### includes() - 文字列が含まれているかチェック

```js
const email = "user@example.com";

console.log(email.includes("@")); // true
console.log(email.includes(".com")); // true
console.log(email.includes("gmail")); // false

// 条件分岐での使用例
if (email.includes("@") && email.includes(".")) {
  console.log("有効なメールアドレスの可能性があります");
}
```

#### startsWith() / endsWith() - 文字列の開始・終了をチェック

```js
const fileName = "document.pdf";

console.log(fileName.startsWith("doc")); // true
console.log(fileName.endsWith(".pdf")); // true
console.log(fileName.endsWith(".txt")); // false

// ファイル拡張子のチェック
const allowedExtensions = [".jpg", ".png", ".gif"];
const isImageFile = allowedExtensions.some(ext => fileName.endsWith(ext));
console.log(isImageFile); // false
```

### 文字列の抽出

#### charAt() - 指定位置の文字を取得

```js
const text = "JavaScript";

console.log(text.charAt(0)); // "J"
console.log(text.charAt(4)); // "S"
console.log(text.charAt(text.length - 1)); // "t"（最後の文字）

// 存在しないインデックス
console.log(text.charAt(20)); // ""（空文字列）
```

#### substring() - 文字列の一部を抽出

```js
const text = "JavaScript Programming";

console.log(text.substring(0, 4)); // "Java"
console.log(text.substring(4, 10)); // "Script"
console.log(text.substring(11)); // "Programming"（終了位置を省略）

// 実用例：ファイル名から拡張子を取得
const fileName = "document.pdf";
const dotIndex = fileName.lastIndexOf(".");
const extension = fileName.substring(dotIndex + 1);
console.log(extension); // "pdf"
```

#### slice() - 文字列の一部を抽出（負のインデックス対応）

```js
const text = "JavaScript Programming";

console.log(text.slice(0, 4)); // "Java"
console.log(text.slice(4, 10)); // "Script"
console.log(text.slice(-11)); // "Programming"（後ろから11文字）
console.log(text.slice(-11, -1)); // "Programmin"（後ろから11文字目から1文字手前まで）
```

### 文字列の変換

#### toUpperCase() / toLowerCase() - 大文字・小文字変換

```js
const text = "JavaScript";

console.log(text.toUpperCase()); // "JAVASCRIPT"
console.log(text.toLowerCase()); // "javascript"

// 実用例：大文字小文字を区別しない比較
const userInput = "HELLO";
const expectedValue = "hello";

if (userInput.toLowerCase() === expectedValue.toLowerCase()) {
  console.log("入力値が一致しました");
}
```

#### trim() - 前後の空白を削除

```js
const userInput = "  山田太郎  ";

console.log(userInput.trim()); // "山田太郎"
console.log(userInput.length); // 8
console.log(userInput.trim().length); // 4

// フォーム入力の処理でよく使用
const processUserInput = (input) => {
  const cleaned = input.trim();
  if (cleaned === "") {
    return "入力値が空です";
  }
  return `処理対象: ${cleaned}`;
};

console.log(processUserInput("  田中  ")); // "処理対象: 田中"
```

#### replace() - 文字列の置換

```js
const text = "JavaScript is great";

// 最初に見つかった文字列のみ置換
console.log(text.replace("JavaScript", "TypeScript")); // "TypeScript is great"

// 正規表現を使用してすべて置換
const multipleText = "apple apple apple";
console.log(multipleText.replace(/apple/g, "orange")); // "orange orange orange"

// 実用例：電話番号のフォーマット
const phoneNumber = "090-1234-5678";
const formattedPhone = phoneNumber.replace(/-/g, "");
console.log(formattedPhone); // "09012345678"
```

### 文字列の分割

#### split() - 文字列を配列に分割

```js
const csvData = "山田,太郎,25,東京";
const dataArray = csvData.split(",");
console.log(dataArray); // ["山田", "太郎", "25", "東京"]

// スペース区切りの文字列を分割
const sentence = "JavaScript is awesome";
const words = sentence.split(" ");
console.log(words); // ["JavaScript", "is", "awesome"]

// 文字列を1文字ずつ分割
const text = "Hello";
const characters = text.split("");
console.log(characters); // ["H", "e", "l", "l", "o"]

// 実用例：メールアドレスからユーザー名とドメインを取得
const email = "user@example.com";
const [username, domain] = email.split("@");
console.log(username); // "user"
console.log(domain); // "example.com"
```

## 数値操作の基本

**数値**は、計算処理、データ分析、統計処理など、プログラミングにおいて重要な役割を果たします。

### 数値リテラル

```js
// 整数
const integer = 42;

// 浮動小数点数
const decimal = 3.14159;

// 負の数
const negative = -100;

// 指数表記
const scientific = 1.5e6; // 1500000
const smallNumber = 2.5e-3; // 0.0025

// 16進数
const hexNumber = 0xFF; // 255

// 8進数
const octalNumber = 0o77; // 63

// 2進数
const binaryNumber = 0b1010; // 10
```

### 数値の基本操作

#### 算術演算子

```js
const a = 10;
const b = 3;

console.log(a + b); // 13（加算）
console.log(a - b); // 7（減算）
console.log(a * b); // 30（乗算）
console.log(a / b); // 3.3333333333333335（除算）
console.log(a % b); // 1（剰余）
console.log(a ** b); // 1000（べき乗）

// 実用例：消費税計算
const price = 1000;
const taxRate = 0.1;
const totalPrice = price * (1 + taxRate);
console.log(totalPrice); // 1100
```

#### インクリメント・デクリメント

```js
let counter = 5;

// 前置インクリメント
console.log(++counter); // 6（先に増加してから値を返す）

// 後置インクリメント
console.log(counter++); // 6（値を返してから増加）
console.log(counter); // 7

// 前置デクリメント
console.log(--counter); // 6（先に減少してから値を返す）

// 後置デクリメント
console.log(counter--); // 6（値を返してから減少）
console.log(counter); // 5
```

### 数値の変換

#### 文字列から数値への変換

```js
// parseInt() - 整数に変換
console.log(parseInt("42")); // 42
console.log(parseInt("42.7")); // 42（小数部分は切り捨て）
console.log(parseInt("42px")); // 42（数値部分のみ抽出）
console.log(parseInt("abc")); // NaN（変換不可）

// parseFloat() - 浮動小数点数に変換
console.log(parseFloat("3.14")); // 3.14
console.log(parseFloat("3.14159")); // 3.14159
console.log(parseFloat("3.14abc")); // 3.14（数値部分のみ抽出）

// Number() - 数値に変換
console.log(Number("42")); // 42
console.log(Number("3.14")); // 3.14
console.log(Number("42px")); // NaN（完全一致が必要）
console.log(Number(true)); // 1
console.log(Number(false)); // 0

// + 演算子を使用した変換
console.log(+"42"); // 42
console.log(+"3.14"); // 3.14
```

#### 数値から文字列への変換

```js
const number = 42.567;

// toString() - 文字列に変換
console.log(number.toString()); // "42.567"
console.log(number.toString(2)); // "101010.100100001..." (2進数)
console.log(number.toString(16)); // "2a.91..." (16進数)

// String() - 文字列に変換
console.log(String(number)); // "42.567"

// テンプレートリテラルを使用
console.log(`${number}`); // "42.567"
```

### 数値の丸め処理

```js
const number = 3.7856;

// Math.round() - 四捨五入
console.log(Math.round(number)); // 4

// Math.floor() - 切り捨て
console.log(Math.floor(number)); // 3

// Math.ceil() - 切り上げ
console.log(Math.ceil(number)); // 4

// toFixed() - 小数点以下の桁数を指定
console.log(number.toFixed(2)); // "3.79"（文字列として返される）
console.log(parseFloat(number.toFixed(2))); // 3.79（数値に変換）

// 実用例：価格の表示
const price = 1234.567;
const displayPrice = `¥${price.toFixed(0)}`; // "¥1235"
console.log(displayPrice);
```

### 数値の検証

```js
// isNaN() - NaNかどうかをチェック
console.log(isNaN(42)); // false
console.log(isNaN("42")); // false（文字列は数値に変換される）
console.log(isNaN("abc")); // true

// Number.isNaN() - より厳密なNaNチェック
console.log(Number.isNaN(42)); // false
console.log(Number.isNaN("42")); // false
console.log(Number.isNaN(NaN)); // true

// isFinite() - 有限数かどうかをチェック
console.log(isFinite(42)); // true
console.log(isFinite(Infinity)); // false
console.log(isFinite(-Infinity)); // false

// Number.isInteger() - 整数かどうかをチェック
console.log(Number.isInteger(42)); // true
console.log(Number.isInteger(42.0)); // true
console.log(Number.isInteger(42.1)); // false
```

### Mathオブジェクト

JavaScriptのMathオブジェクトには、数学的な計算を行うための便利なメソッドが用意されています：

```js
// 基本的な数学関数
console.log(Math.abs(-5)); // 5（絶対値） absolute value（絶対値）の略
console.log(Math.pow(2, 3)); // 8（べき乗） power of a number ＝「数のべき（乗）」のpowerの略
console.log(Math.sqrt(16)); // 4（平方根） square root 平方根の略

// 最大値・最小値
console.log(Math.max(1, 5, 3, 9, 2)); // 9
console.log(Math.min(1, 5, 3, 9, 2)); // 1

// 乱数生成
console.log(Math.random()); // 0以上1未満のランダムな数値

// 実用例：1から10までのランダムな整数
const randomInt = Math.floor(Math.random() * 10) + 1;
console.log(randomInt);

// 実用例：配列からランダムに要素を選択
const colors = ["赤", "青", "緑", "黄", "紫"];
const randomColor = colors[Math.floor(Math.random() * colors.length)];
console.log(randomColor);

// 三角関数
console.log(Math.sin(Math.PI / 2)); // 1
console.log(Math.cos(0)); // 1
console.log(Math.tan(Math.PI / 4)); // 1

// 定数
console.log(Math.PI); // 3.141592653589793 円周率π
console.log(Math.E); // 2.718281828459045 ネイピア数e
```

## 日付操作の基本

**日付**は、アプリケーションにおいて重要な要素です。ユーザーの登録日、イベントの開催日、データの更新日など、様々な場面で日付を扱います。

### 日付の基本概念

- **Dateオブジェクト**: JavaScriptで日付と時刻を扱うためのオブジェクト
- **タイムスタンプ**: 1970年1月1日からの経過ミリ秒数
- **タイムゾーン**: 地域による時差の概念

### Dateオブジェクトの作成

```js
// 現在の日時
const now = new Date();
console.log(now); // 現在の日時が表示される

// 特定の日時を指定
const specificDate = new Date(2024, 0, 1); // 2024年1月1日（月は0から始まる）
console.log(specificDate);

// 文字列から日付を作成
const dateFromString = new Date("2024-01-01");
console.log(dateFromString);

// タイムスタンプから日付を作成
const dateFromTimestamp = new Date(1704067200000);
console.log(dateFromTimestamp);

// 詳細な日時を指定
const detailedDate = new Date(2024, 0, 1, 12, 30, 45); // 2024年1月1日 12:30:45
console.log(detailedDate);
```

### 日付の取得

```js
const date = new Date(2024, 0, 15, 14, 30, 45); // 2024年1月15日 14:30:45

// 年、月、日の取得
console.log(date.getFullYear()); // 2024
console.log(date.getMonth()); // 0（1月は0）
console.log(date.getDate()); // 15

// 時、分、秒の取得
console.log(date.getHours()); // 14
console.log(date.getMinutes()); // 30
console.log(date.getSeconds()); // 45

// 曜日の取得（0=日曜日、1=月曜日、...、6=土曜日）
console.log(date.getDay()); // 1（月曜日）

// タイムスタンプの取得
console.log(date.getTime()); // 1705298445000

// 実用例：曜日名を表示
const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
const dayName = dayNames[date.getDay()];
console.log(`${dayName}曜日`); // "月曜日"
```

### 日付の設定

```js
const date = new Date();

// 年、月、日の設定
date.setFullYear(2025);
date.setMonth(11); // 12月（11）
date.setDate(25);

// 時、分、秒の設定
date.setHours(18);
date.setMinutes(0);
date.setSeconds(0);

console.log(date); // 2025年12月25日 18:00:00
```

### 日付の計算

```js
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

console.log("今日:", today.toDateString());
console.log("明日:", tomorrow.toDateString());

// 1週間後
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
console.log("1週間後:", nextWeek.toDateString());

// 1ヶ月後
const nextMonth = new Date(today);
nextMonth.setMonth(today.getMonth() + 1);
console.log("1ヶ月後:", nextMonth.toDateString());

// 日付の差を計算
const startDate = new Date(2024, 0, 1);
const endDate = new Date(2024, 11, 31);
const diffTime = endDate.getTime() - startDate.getTime();
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
console.log(`期間: ${diffDays}日`); // 期間: 365日
```

### 日付の文字列変換

```js
const date = new Date(2024, 0, 15, 14, 30, 45);

// 基本的な文字列変換
console.log(date.toString()); // "Mon Jan 15 2024 14:30:45 GMT+0900 (JST)"
console.log(date.toDateString()); // "Mon Jan 15 2024"
console.log(date.toTimeString()); // "14:30:45 GMT+0900 (JST)"

// ISO形式
console.log(date.toISOString()); // "2024-01-15T05:30:45.000Z"

// ローカル形式
console.log(date.toLocaleDateString()); // "2024/1/15"
console.log(date.toLocaleTimeString()); // "14:30:45"
console.log(date.toLocaleString()); // "2024/1/15 14:30:45"

// 日本語形式
console.log(date.toLocaleDateString("ja-JP")); // "2024/1/15"
console.log(date.toLocaleDateString("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long"
})); // "2024年1月15日月曜日"
```

### 実用的な日付処理

```js
// 年齢計算
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  
  // 誕生日がまだ来ていない場合は1歳引く
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

console.log(calculateAge("1990-05-15")); // 現在の日付に基づいて年齢を計算

// 営業日の計算（土日を除く）
function addBusinessDays(date, days) {
  const result = new Date(date);
  let addedDays = 0;
  
  while (addedDays < days) {
    result.setDate(result.getDate() + 1);
    // 土曜日(6)と日曜日(0)を除く
    if (result.getDay() !== 0 && result.getDay() !== 6) {
      addedDays++;
    }
  }
  
  return result;
}

const today = new Date();
const businessDate = addBusinessDays(today, 5);
console.log("5営業日後:", businessDate.toDateString());

// 月末日の取得
function getLastDayOfMonth(year, month) {
  // 次の月の0日目 = 今月の最終日
  return new Date(year, month + 1, 0).getDate();
}

console.log("2024年2月の日数:", getLastDayOfMonth(2024, 1)); // 29日（うるう年）
```

## 型変換と型チェック

JavaScriptでは、異なるデータ型間での変換が頻繁に行われます。

### 暗黙的な型変換

```js
// 文字列と数値の演算
console.log("5" + 3); // "53"（文字列連結）
console.log("5" - 3); // 2（数値計算）
console.log("5" * 3); // 15（数値計算）
console.log("5" / 3); // 1.6666666666666667（数値計算）

// 論理値との演算
console.log(true + 1); // 2（true は 1 に変換）
console.log(false + 1); // 1（false は 0 に変換）

// 比較演算での型変換
console.log("5" == 5); // true（型変換後に比較）
console.log("5" === 5); // false（型変換なしで比較）
```

### 明示的な型変換

```js
// 文字列への変換
const number = 42;
console.log(String(number)); // "42"
console.log(number.toString()); // "42"
console.log(`${number}`); // "42"

// 数値への変換
const text = "42";
console.log(Number(text)); // 42
console.log(parseInt(text)); // 42
console.log(parseFloat(text)); // 42
console.log(+text); // 42

// 論理値への変換
console.log(Boolean(1)); // true
console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean("hello")); // true
console.log(!!1); // true（二重否定による変換）
```

### 型チェック

```js
// typeof演算子
console.log(typeof "hello"); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object"（注意：nullはobjectと表示される）
console.log(typeof []); // "object"
console.log(typeof {}); // "object"
console.log(typeof function() {}); // "function"

// より詳細な型チェック
console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false

// 日付オブジェクトのチェック
const date = new Date();
console.log(date instanceof Date); // true
console.log(typeof date); // "object"

// nullのチェック
const value = null;
console.log(value === null); // true
console.log(typeof value === "object" && value === null); // true
```

## 実用的な操作例

### フォームデータの処理

```js
// ユーザー入力の検証と整形
function processUserForm(formData) {
  // 名前の整形
  const name = formData.name.trim();
  if (name === "") {
    return { error: "名前が入力されていません" };
  }
  
  // 年齢の検証
  const age = parseInt(formData.age);
  if (isNaN(age) || age < 0 || age > 150) {
    return { error: "有効な年齢を入力してください" };
  }
  
  // メールアドレスの検証
  const email = formData.email.toLowerCase().trim();
  if (!email.includes("@") || !email.includes(".")) {
    return { error: "有効なメールアドレスを入力してください" };
  }
  
  // 電話番号の整形
  const phone = formData.phone.replace(/[-\s]/g, "");
  if (phone.length !== 11) {
    return { error: "有効な電話番号を入力してください" };
  }
  
  return {
    success: true,
    data: {
      name: name,
      age: age,
      email: email,
      phone: phone,
      registeredAt: new Date().toISOString()
    }
  };
}

// 使用例
const formData = {
  name: "  山田太郎  ",
  age: "25",
  email: "  YAMADA@EXAMPLE.COM  ",
  phone: "090-1234-5678"
};

const result = processUserForm(formData);
console.log(result);
```

### データの表示フォーマット

```js
// 商品情報の表示
function formatProductInfo(product) {
  const name = product.name;
  const price = product.price.toLocaleString();
  const discount = product.discount || 0;
  const finalPrice = Math.round(product.price * (1 - discount));
  
  let description = `商品名: ${name}\n`;
  description += `価格: ¥${price}`;
  
  if (discount > 0) {
    const discountPercent = Math.round(discount * 100);
    description += ` → ¥${finalPrice.toLocaleString()} (${discountPercent}%OFF)`;
  }
  
  return description;
}

// 使用例
const product = {
  name: "ノートパソコン",
  price: 89800,
  discount: 0.15
};

console.log(formatProductInfo(product));
// 出力:
// 商品名: ノートパソコン
// 価格: ¥89,800 → ¥76,330 (15%OFF)
```

### 日付の相対表示

```js
// 相対的な時間表示（「○分前」「○日前」など）
function getRelativeTime(date) {
  const now = new Date();
  const targetDate = new Date(date);
  const diffMs = now.getTime() - targetDate.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSeconds < 60) {
    return "たった今";
  } else if (diffMinutes < 60) {
    return `${diffMinutes}分前`;
  } else if (diffHours < 24) {
    return `${diffHours}時間前`;
  } else if (diffDays < 7) {
    return `${diffDays}日前`;
  } else {
    return targetDate.toLocaleDateString("ja-JP");
  }
}

// 使用例
const postDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2時間前
console.log(getRelativeTime(postDate)); // "2時間前"
```

## 配列操作の応用

### Setオブジェクト

**Set**は、重複のない値のコレクションを扱うためのオブジェクトです：

```js
// Setの作成
const numbers = new Set([1, 2, 3, 2, 1]);
console.log(numbers); // Set(3) {1, 2, 3}

// 値の追加
numbers.add(4);
console.log(numbers); // Set(4) {1, 2, 3, 4}

// 値の存在確認
console.log(numbers.has(2)); // true
console.log(numbers.has(5)); // false

// 値の削除
numbers.delete(2);
console.log(numbers); // Set(3) {1, 3, 4}

// サイズの取得
console.log(numbers.size); // 3

// 配列への変換（スプレッド構文使用）
const uniqueArray = [...numbers];
console.log(uniqueArray); // [1, 3, 4]

// 実用例：配列から重複を削除
const duplicateArray = [1, 2, 2, 3, 3, 3, 4];
const uniqueValues = [...new Set(duplicateArray)];
console.log(uniqueValues); // [1, 2, 3, 4]
```

### 配列の高度なメソッド

#### reduce() - 配列を単一の値に集約

```js
const numbers = [1, 2, 3, 4, 5];

// 合計を計算
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log(sum); // 15

// 最大値を取得
const max = numbers.reduce((max, current) => current > max ? current : max);
console.log(max); // 5

// オブジェクトの配列をグループ化
const people = [
  { name: "Alice", department: "Engineering" },
  { name: "Bob", department: "Sales" },
  { name: "Charlie", department: "Engineering" }
];

const groupedByDepartment = people.reduce((groups, person) => {
  const dept = person.department;
  if (!groups[dept]) {
    groups[dept] = [];
  }
  groups[dept].push(person);
  return groups;
}, {});

console.log(groupedByDepartment);
// {
//   Engineering: [{name: "Alice", ...}, {name: "Charlie", ...}],
//   Sales: [{name: "Bob", ...}]
// }
```

#### find() - 条件に一致する最初の要素を取得

```js
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 }
];

// IDで検索
const user = users.find(user => user.id === 2);
console.log(user); // { id: 2, name: "Bob", age: 30 }

// 条件に一致しない場合
const notFound = users.find(user => user.age > 40);
console.log(notFound); // undefined
```

#### filter() - 条件に一致する要素をすべて取得

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 偶数のみを取得
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6, 8, 10]

// 日付範囲でフィルタリング
const events = [
  { name: "Event 1", date: new Date(2024, 0, 5) },
  { name: "Event 2", date: new Date(2024, 0, 15) },
  { name: "Event 3", date: new Date(2024, 0, 25) }
];

const startDate = new Date(2024, 0, 10);
const endDate = new Date(2024, 0, 20);

const filteredEvents = events.filter(event => 
  event.date >= startDate && event.date <= endDate
);
console.log(filteredEvents); // [{ name: "Event 2", ... }]
```

#### map() - 各要素を変換して新しい配列を作成

```js
const users = [
  { name: "Alice", department: "Engineering" },
  { name: "Bob", department: "Sales" },
  { name: "Charlie", department: "Engineering" }
];

// 特定のプロパティのみを抽出
const departments = users.map(user => user.department);
console.log(departments); // ["Engineering", "Sales", "Engineering"]

// ユニークな値のみを取得（Setと組み合わせ）
const uniqueDepartments = [...new Set(departments)];
console.log(uniqueDepartments); // ["Engineering", "Sales"]
```

#### sort() - 配列をソート

```js
const users = [
  { name: "Charlie", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 }
];

// 年齢で昇順ソート
const sortedByAge = [...users].sort((a, b) => a.age - b.age);
console.log(sortedByAge);
// [{ name: "Alice", age: 25 }, { name: "Charlie", age: 30 }, { name: "Bob", age: 35 }]

// 名前で昇順ソート
const sortedByName = [...users].sort((a, b) => a.name.localeCompare(b.name));
console.log(sortedByName);
// [{ name: "Alice", ... }, { name: "Bob", ... }, { name: "Charlie", ... }]

// 降順ソート
const sortedDesc = [...users].sort((a, b) => b.age - a.age);
console.log(sortedDesc);
```

## 正規表現の基本

**正規表現**は、文字列のパターンマッチングを行うための強力なツールです：

### 基本的な正規表現

```js
// 正規表現の作成
const regex1 = /hello/; // リテラル記法
const regex2 = new RegExp("hello"); // コンストラクタ記法

// test() - パターンが一致するかテスト
const text = "Hello, world!";
console.log(/hello/i.test(text)); // true（iフラグで大文字小文字を無視）
console.log(/goodbye/.test(text)); // false

// match() - 一致した部分を取得
const email = "contact@example.com";
const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
console.log(email.match(emailPattern)); // マッチした結果の配列

// replace() - 正規表現を使った置換
const phoneNumber = "090-1234-5678";
const digitsOnly = phoneNumber.replace(/\D/g, ""); // 数字以外を削除
console.log(digitsOnly); // "09012345678"
```

### よく使用される正規表現パターン

```js
// メールアドレスの検証
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(emailRegex.test("user@example.com")); // true

// 数字のみ
const digitRegex = /^\d+$/;
console.log(digitRegex.test("12345")); // true
console.log(digitRegex.test("123a5")); // false

// 英数字とスペース、ハイフンのみ
const slugRegex = /^[a-zA-Z0-9\s-]+$/;
console.log(slugRegex.test("hello-world 123")); // true

// 文字列から数字以外を削除
const cleanNumber = "abc123def456".replace(/\D/g, "");
console.log(cleanNumber); // "123456"

// 連続する空白を単一のハイフンに置換
const title = "  Hello   World  ";
const slug = title.trim().replace(/\s+/g, "-").toLowerCase();
console.log(slug); // "hello-world"
```

## 高度な文字列・数値操作

### 文字列の高度なメソッド

#### padStart() / padEnd() - 文字列の埋め込み

```js
const number = 5;
const paddedNumber = String(number).padStart(2, "0");
console.log(paddedNumber); // "05"

// 日付のフォーマットで使用
const month = 3;
const day = 7;
const formattedDate = `2024-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
console.log(formattedDate); // "2024-03-07"
```

#### localeCompare() - 文字列の比較（ソート用）

```js
const names = ["田中", "佐藤", "鈴木"];
names.sort((a, b) => a.localeCompare(b, "ja"));
console.log(names); // 日本語の順序でソート
```

### 数値の高度な操作

#### toLocaleString() - 地域に応じた数値フォーマット

```js
const number = 1234567.89;

// 日本語形式
console.log(number.toLocaleString("ja-JP")); // "1,234,567.89"

// 通貨形式
console.log(number.toLocaleString("ja-JP", {
  style: "currency",
  currency: "JPY"
})); // "¥1,234,568"（小数点以下は四捨五入）

// パーセント形式
const rate = 0.1234;
console.log(rate.toLocaleString("ja-JP", {
  style: "percent",
  minimumFractionDigits: 2
})); // "12.34%"
```

#### Math.log() - 対数計算

```js
// ファイルサイズの単位計算で使用
function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";
  
  const units = ["B", "KB", "MB", "GB", "TB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  const size = bytes / Math.pow(k, i);
  return `${size.toFixed(1)} ${units[i]}`;
}

console.log(formatFileSize(1024)); // "1.0 KB"
console.log(formatFileSize(1048576)); // "1.0 MB"
```

## 実習課題

### 課題1: 文字列操作

`docs/09/work/string-utils.js`ファイルを作成し、`docs/09/work/string-utils.test.js`のテストがすべてパスするようにしてください：

1. 以下の関数を実装し、エクスポートする：
   - `capitalizeFirst(str)`: 文字列の最初の文字を大文字にする
   - `reverseString(str)`: 文字列を逆順にする
   - `countWords(str)`: 文字列内の単語数を数える
   - `removeSpaces(str)`: 文字列からすべての空白を削除する
   - `truncateString(str, maxLength)`: 文字列を指定した長さで切り詰める（必要に応じて"..."を追加）
   - `isPalindrome(str)`: 文字列が回文かどうかを判定する
   - `extractEmails(str)`: 文字列からメールアドレスを抽出する

**テスト実行方法：**
```bash
deno test docs/09/work/string-utils.test.js
```

### 課題2: 数値操作

`docs/09/work/number-utils.js`ファイルを作成し、`docs/09/work/number-utils.test.js`のテストがすべてパスするようにしてください：

1. 以下の関数を実装し、エクスポートする：
   - `formatCurrency(amount)`: 数値を通貨形式（¥1,234）で表示する
   - `calculateTax(price, taxRate)`: 税込価格を計算する
   - `generateRandomInt(min, max)`: 指定範囲のランダムな整数を生成する
   - `roundToDecimal(number, decimals)`: 指定した小数点以下の桁数で四捨五入する
   - `isEven(number)`: 数値が偶数かどうかを判定する
   - `factorial(n)`: 階乗を計算する
   - `isPrime(number)`: 数値が素数かどうかを判定する

**テスト実行方法：**
```bash
deno test docs/09/work/number-utils.test.js
```

### 課題3: 日付操作

`docs/09/work/date-utils.js`ファイルを作成し、`docs/09/work/date-utils.test.js`のテストがすべてパスするようにしてください：

1. 以下の関数を実装し、エクスポートする：
   - `formatDate(date, format)`: 日付を指定したフォーマットで表示する
   - `addDays(date, days)`: 日付に指定した日数を加算する
   - `getDaysBetween(date1, date2)`: 2つの日付間の日数を計算する
   - `isWeekend(date)`: 日付が週末（土日）かどうかを判定する
   - `getAge(birthDate)`: 生年月日から年齢を計算する
   - `getNextBusinessDay(date)`: 次の営業日を取得する
   - `formatRelativeTime(date)`: 相対的な時間表示を生成する

**テスト実行方法：**
```bash
deno test docs/09/work/date-utils.test.js
```

### 課題4: 配列操作（応用）

`docs/09/work/array-utils.js`ファイルを作成し、`docs/09/work/array-utils.test.js`のテストがすべてパスするようにしてください：

1. 以下の関数を実装し、エクスポートする：
   - `removeDuplicates(array)`: 配列から重複要素を削除する
   - `groupBy(array, key)`: オブジェクトの配列を指定したキーでグループ化する
   - `sortByProperty(array, property, ascending)`: オブジェクトの配列を指定したプロパティでソートする
   - `findByProperty(array, property, value)`: 指定したプロパティの値で要素を検索する
   - `calculateAverage(numbers)`: 数値配列の平均値を計算する
   - `getUniqueValues(array, property)`: 指定したプロパティのユニークな値を取得する
   - `filterByDateRange(array, dateProperty, startDate, endDate)`: 日付範囲で配列をフィルタリングする

**テスト実行方法：**
```bash
deno test docs/09/work/array-utils.test.js
```

## まとめ

- 文字列操作は、ユーザーインターフェースやデータ処理において重要な役割を果たす
- `indexOf()`, `includes()`, `substring()`, `replace()`, `split()`などのメソッドで効率的に文字列を操作できる
- テンプレートリテラルを使用することで、読みやすく保守しやすいコードを書ける
- 数値操作では、算術演算子、Math オブジェクト、型変換メソッドを適切に使い分ける
- 浮動小数点数の計算では精度に注意し、必要に応じて丸め処理を行う
- 日付操作では、Dateオブジェクトを使用して日付の作成、取得、設定、計算を行う
- 型変換と型チェックを理解することで、予期しないエラーを防げる
- 実用的な関数を作成することで、コードの再利用性と保守性が向上する

> [!IMPORTANT]
> 文字列、数値、日付の操作は、実際のWebアプリケーション開発において頻繁に使用される基本的なスキルです。
> これらの操作を正確に理解し、適切に使い分けることで、ユーザーフレンドリーで信頼性の高いアプリケーションを作成できます。
> 次回の授業では、パッケージやライブラリの利用について学習します。
