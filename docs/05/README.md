# JavaScript 関数定義、引数と戻り値、メソッド

## 関数とは

**関数**とは、特定の処理をまとめて名前を付けたもので、必要な時に何度でも呼び出して使うことができる仕組みです。関数を使うことで、同じ処理を何度も書く必要がなくなり、コードがより読みやすく、保守しやすくなります。

## なぜ関数が必要なのか

JavaScriptでは、基本的にプログラムは**上から下へ順番に実行**されます。この特性を踏まえて、関数を使う場合と使わない場合の違いを見てみましょう。

### 関数を使わない場合の問題点

まず、関数を使わずに同じ処理を繰り返し書いた例を見てみましょう：

```js
// 関数を使わない場合：同じ処理を何度も書く必要がある
console.log("=== 商品A の税込価格計算 ===");
let priceA = 1000;
let taxRate = 0.1;
let taxAmountA = priceA * taxRate;
let totalPriceA = priceA + taxAmountA;
console.log(`商品A: ${priceA}円 + 税${taxAmountA}円 = ${totalPriceA}円`);

console.log("=== 商品B の税込価格計算 ===");
let priceB = 2500;
let taxAmountB = priceB * taxRate;
let totalPriceB = priceB + taxAmountB;
console.log(`商品B: ${priceB}円 + 税${taxAmountB}円 = ${totalPriceB}円`);

console.log("=== 商品C の税込価格計算 ===");
let priceC = 800;
let taxAmountC = priceC * taxRate;
let totalPriceC = priceC + taxAmountC;
console.log(`商品C: ${priceC}円 + 税${taxAmountC}円 = ${totalPriceC}円`);

const grandTotal = totalPriceA + totalPriceB + totalPriceC;
console.log(`合計: ${grandTotal}円`);
```

この方法では以下の問題があります：

1. **同じコードの重複**: 税込価格を計算する処理が3回も書かれている
2. **修正が大変**: 税率や計算する商品の数、結果として表示する文字フォーマットが変更になった場合、すべての箇所を修正する必要がある
3. **コードが長くなる**: 処理が増えるほどコードが読みにくくなる
4. **ミスが起きやすい**: 同じ処理を何度も書くため、タイプミスや計算ミス、修正漏れが発生しやすい

### 関数を使った場合の改善

同じ処理を関数として定義すると、以下のように改善されます：

```js
// 関数を使った場合：処理をまとめて再利用可能にする
function calculateTaxIncludedPrice(price) {
  const taxRate = 0.1;
  const taxAmount = price * taxRate;
  const totalPrice = price + taxAmount;
  
  console.log(`価格: ${price}円 + 税${taxAmount}円 = ${totalPrice}円`);
  return totalPrice;
}

// 関数を呼び出すだけで同じ処理を実行できる
console.log("=== 商品A の税込価格計算 ===");
const totalA = calculateTaxIncludedPrice(1000);

console.log("=== 商品B の税込価格計算 ===");
const totalB = calculateTaxIncludedPrice(2500);

console.log("=== 商品C の税込価格計算 ===");
const totalC = calculateTaxIncludedPrice(800);

const grandTotal = totalA + totalB + totalC;
console.log(`合計: ${grandTotal}円`);
```

### 関数を使用することによって受けられる恩恵のメリット・デメリット

1. **コードの重複を削減**: 同じ処理を一度だけ書けば良い
2. **保守性の向上**: 修正が必要な場合、関数の定義部分だけを変更すれば全体に反映される
3. **可読性の向上**: 処理に名前を付けることで、何をしているかが分かりやすくなる
4. **再利用性**: 一度定義した関数は、プログラムの任意の場所で何度でも使える
5. **テストしやすさ**: 個別の機能をテストしやすくなる
6. **モジュール化**: 複雑な処理を小さな単位に分割できる
7. **分業しやすさ**: 機能ごとに分割することで、複数人での開発がしやすくなる

### 実際の開発での重要性

実際のWebアプリケーション開発では、以下のような場面で関数が不可欠です：

```js
// ユーザー入力の検証
function validateEmail(email) {
  // メールアドレスの形式をチェック
  return email.includes("@") && email.includes(".");
}

// データの変換
function formatDate(date) {
  // 日付を見やすい形式に変換
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

// 計算処理
function calculateDiscount(price, discountRate) {
  // 割引価格を計算
  return price * (1 - discountRate);
}

// これらの関数を組み合わせて使用
const userEmail = "user@example.com";
const orderDate = new Date();
const originalPrice = 5000;
const discount = 0.2;

if (validateEmail(userEmail)) {
  const formattedDate = formatDate(orderDate);
  const finalPrice = calculateDiscount(originalPrice, discount);
  
  console.log(`注文日: ${formattedDate}`);
  console.log(`割引後価格: ${finalPrice}円`);
}
```

このように、関数を使うことで**複雑な処理を小さな部品に分割**し、それらを組み合わせて大きなプログラムを構築することができます。これは、JavaScriptが上から下へ順次実行される特性を活かしながら、効率的で保守しやすいコードを書くための重要な技術です。

## 関数の基本概念

- **関数名**: 関数を識別するための名前
- **引数（パラメータ）**: 関数に渡すデータ
- **処理内容**: 関数が実行する処理
- **戻り値（返り値）**: 関数が処理結果として返すデータ

## 関数の定義方法

JavaScriptでは、主に3つの方法で関数を定義できます。

### 1. 関数宣言（Function Declaration）

最も基本的な関数の定義方法です。  
※関数名も変数と同様の使える文字列の制限があります。

```js
function 関数名(引数1, 引数2, ...) {
  // 処理内容

  return 戻り値; // 省略可能
}
```

#### 基本的な関数宣言の例

```js
// 引数なし、戻り値なしの関数
function greet() {
  console.log("こんにちは！");
}

// 引数あり、戻り値ありの関数
function add(a, b) {
  return a + b;
}

// 関数の呼び出し
greet();              // "こんにちは！"
const result = add(5, 3);
console.log(result);  // 8
```

### 2. 関数式（Function Expression）

関数を変数に代入する方法です。

```js
const 関数名 = function(引数1, 引数2, ...) {
  // 処理内容
  return 戻り値; // 省略可能
};
```

#### 関数式の例

```js
// 関数式で関数を定義
const multiply = function(a, b) {
  return a * b;
};

// 関数の呼び出し
const result = multiply(4, 5);
console.log(result);  // 20
```

### 3. アロー関数（Arrow Function）

ES6（ECMAScript 2015）から導入された、より簡潔な関数の書き方です。

```js
const 関数名 = (引数1, 引数2, ...) => {
  // 処理内容
  return 戻り値; // 省略可能
};
```

#### アロー関数の例

アロー関数は上記の記述に加えて省略記法があります。

```js
// 基本的なアロー関数
const subtract = (a, b) => {
  return a - b;
};

// 処理が1行の場合、{}とreturnを省略可能
const divide = (a, b) => a / b;

// 引数が1つの場合、()を省略可能
const square = x => x * x;

// 引数がない場合、()は必須
const getCurrentTime = () => new Date();

// 関数の呼び出し
console.log(subtract(10, 3));  // 7
console.log(divide(15, 3));    // 5
console.log(square(4));        // 16
console.log(getCurrentTime()); // 現在の日時
```

> [!NOTE]
> アロー関数は関数宣言や関数式と比べて、いくつかの違いがあります。基本的な使い方では大きな違いはありませんが、より高度な機能を使う際に重要になります。詳細は今後の授業で扱います。

## 引数（パラメータ）

**引数**とは、関数に渡すデータのことです。関数は引数を受け取って処理を行い、結果を返すことができます。  
引数は0つ以上定義することが可能。

### 基本的な引数の使用

```js
// 2つの引数を受け取る関数
function introduce(name, age) {
  console.log(`私の名前は${name}で、${age}歳です。`);
}

// 関数の呼び出し
introduce("山田太郎", 25);  // "私の名前は山田太郎で、25歳です。"
introduce("佐藤花子", 30);  // "私の名前は佐藤花子で、30歳です。"
```

### 引数の数が一致しない場合

JavaScriptでは、引数の数が定義と一致しなくてもエラーになりません。

```js
function showInfo(name, age, city) {
  console.log(`名前: ${name}`);
  console.log(`年齢: ${age}`);
  console.log(`都市: ${city}`);
}

// 引数が足りない場合（undefinedになる）
showInfo("田中", 28);
// 出力:
// 名前: 田中
// 年齢: 28
// 都市: undefined

// 引数が多い場合（余分な引数は無視される）
showInfo("鈴木", 35, "東京", "会社員");
// 出力:
// 名前: 鈴木
// 年齢: 35
// 都市: 東京
```

### デフォルト引数

引数にデフォルト値を設定することで、引数が渡されなかった場合の初期値を指定できます。

```js
// デフォルト引数を使用
function greetWithDefault(name = "ゲスト", greeting = "こんにちは") {
  console.log(`${greeting}、${name}さん！`);
}

// 様々な呼び出し方
greetWithDefault();                    // "こんにちは、ゲストさん！"
greetWithDefault("山田");              // "こんにちは、山田さん！"
greetWithDefault("佐藤", "おはよう");  // "おはよう、佐藤さん！"
```

### 可変長引数（Rest Parameters）

`...`を使用することで、任意の数の引数を配列として受け取ることができます。

> [!NOTE]
> 配列の詳細はシラバス08で学習しますが、ここでは関数との組み合わせの基本を紹介します。

```js
// 可変長引数を使用
function sum(...numbers) {
  let total = 0;
  for (const num of numbers) {
    total += num;
  }
  return total;
}

// 様々な数の引数で呼び出し
console.log(sum(1, 2, 3));           // 6
console.log(sum(1, 2, 3, 4, 5));     // 15
console.log(sum(10, 20));            // 30
console.log(sum());                  // 0

// 関数の通常の引数の後ろに可変長引数置くことで組み合わせて利用できる
// 文字列結合関数 joinTarget 達を separator 引数で繋げて1つの文字列にする
const example = (separator, ...joinTarget) => {
  let text = '';
  for (let i = 0; i < joinTarget.length; i++) {
    text += joinTarget[i];
    if (i + 1 < joinTarget.length) {
      text += ',';
    }
  }
  return text;
};

example(',', 'A', 'B', 'C', 'D', 'E', 'F', 'G');
```

## 戻り値（返り値）

**戻り値**とは、関数が処理の結果として呼び出し元に返すデータのことです。`return`文を使用して戻り値を指定します。  
省略することも可能。

### 基本的な戻り値の使用

```js
// 戻り値がある関数
function calculateArea(width, height) {
  const area = width * height;
  return area;  // 計算結果を返す
}

// 戻り値を変数に代入
const roomArea = calculateArea(5, 4);
console.log(`部屋の面積: ${roomArea}平方メートル`);  // "部屋の面積: 20平方メートル"

// 戻り値を直接使用
console.log(`庭の面積: ${calculateArea(3, 6)}平方メートル`);  // "庭の面積: 18平方メートル"
```

### return文の動作

`return`文が実行されると、関数の処理はその時点で終了し、指定した値が返されます。

```js
function checkAge(age) {
  if (age < 0) {
    return "年齢は0以上である必要があります";  // ここで関数終了
  }
  
  if (age < 20) {
    return "未成年です";  // ここで関数終了
  }
  
  return "成人です";  // ここで関数終了
}

console.log(checkAge(-5));  // "年齢は0以上である必要があります"
console.log(checkAge(15));  // "未成年です"
console.log(checkAge(25));  // "成人です"
```

### 戻り値がない場合

`return`文を書かない、または`return;`だけを書いた場合、関数は`undefined`を返します。

```js
// 戻り値を明示的に指定しない関数
function printMessage(message) {
  console.log(message);
  // return文なし
}

const result = printMessage("テストメッセージ");
console.log(result);  // undefined

// 明示的にundefinedを返す
function doSomething() {
  console.log("何かの処理");
  return;  // undefinedを返す
}
```

### 複数の値を返す

JavaScriptでは、配列やオブジェクトを使用して複数の値を返すことができます。  
※配列やオブジェクトについては今後の授業で取り扱います。

```js
// 配列で複数の値を返す
function getNameAndAge() {
  return ["山田太郎", 25];
}

const [name, age] = getNameAndAge();  // 分割代入
console.log(`名前: ${name}, 年齢: ${age}`);

// オブジェクトで複数の値を返す
function getUserInfo() {
  return {
    name: "佐藤花子",
    age: 30,
    city: "東京"
  };
}

const user = getUserInfo();
console.log(`${user.name}さんは${user.city}在住の${user.age}歳です`);
```

## 関数のスコープ

関数内で宣言された変数は、その関数内でのみアクセス可能です（ローカルスコープ）。

```js
let globalVar = "グローバル変数";

function testScope() {
  let localVar = "ローカル変数";
  
  console.log(globalVar);  // "グローバル変数" - アクセス可能
  console.log(localVar);   // "ローカル変数" - アクセス可能
}

testScope();
console.log(globalVar);    // "グローバル変数" - アクセス可能
// console.log(localVar);  // エラー: localVarは定義されていない
```

### 引数もローカルスコープ

関数の引数も、その関数内でのみアクセス可能なローカル変数として扱われます。

```js
function processData(data) {
  // dataは関数内でのみアクセス可能
  const processedData = data.toUpperCase();
  return processedData;
}

const input = "hello world";
const output = processData(input);
console.log(output);  // "HELLO WORLD"
// console.log(data);  // エラー: dataは定義されていない
```

## 組み込み関数とメソッド

JavaScriptには、様々なデータ型に対して事前に定義された関数やメソッドがあります。これらを活用することで、効率的にプログラムを作成できます。

### グローバル関数

JavaScriptには、どこからでも呼び出せるグローバル関数があります。

```js
// 型変換関数
console.log(Number("123"));         // 123 - 文字列を数値に変換
console.log(String(456));           // "456" - 数値を文字列に変換
console.log(Boolean(1));            // true - 値を論理値に変換
console.log(Boolean(0));            // false

// 数値解析関数
console.log(parseInt("123.45"));    // 123 - 整数部分のみ取得
console.log(parseFloat("123.45"));  // 123.45 - 小数を含む数値に変換
console.log(parseInt("123abc"));    // 123 - 数値部分のみ解析
console.log(parseInt("abc123"));    // NaN - 先頭が数値でない場合

// 数値チェック関数
console.log(isNaN("abc"));          // true - 数値でない場合
console.log(isNaN("123"));          // false - 数値の場合
console.log(isFinite(123));         // true - 有限数の場合
console.log(isFinite(Infinity));    // false - 無限大の場合
```

### 文字列のメソッド

文字列には多くの便利なメソッドが用意されています。

```js
const text = "Hello World JavaScript";

// 基本的な情報取得
console.log(text.length);           // 23 - 文字列の長さ
console.log(text.charAt(0));        // "H" - 指定位置の文字を取得
console.log(text.charAt(6));        // "W" - 6番目の文字

// 大文字・小文字変換
console.log(text.toUpperCase());    // "HELLO WORLD JAVASCRIPT" - 大文字に変換
console.log(text.toLowerCase());    // "hello world javascript" - 小文字に変換

// 検索関連
console.log(text.indexOf("World")); // 6 - 文字列の位置を検索（最初の出現位置）
console.log(text.indexOf("world")); // -1 - 見つからない場合は-1
console.log(text.lastIndexOf("a")); // 17 - 最後の出現位置
console.log(text.includes("Java")); // true - 文字列が含まれているかチェック
console.log(text.startsWith("Hello")); // true - 指定文字列で始まるかチェック
console.log(text.endsWith("Script")); // true - 指定文字列で終わるかチェック

// 文字列の切り出し
console.log(text.slice(0, 5));      // "Hello" - 開始位置から終了位置まで
console.log(text.slice(6, 11));     // "World" - 6番目から11番目まで
console.log(text.slice(-10));       // "JavaScript" - 後ろから10文字
console.log(text.substring(0, 5));  // "Hello" - sliceと似ているが負の値は0として扱う

// 文字列の置換と分割
console.log(text.replace("World", "Universe")); // "Hello Universe JavaScript"
console.log(text.split(" "));       // ["Hello", "World", "JavaScript"] - 空白で分割
console.log(text.split(""));        // 1文字ずつ分割して配列に

// 空白の処理
const textWithSpaces = "  Hello World  ";
console.log(textWithSpaces.trim()); // "Hello World" - 前後の空白を削除
console.log(textWithSpaces.trimStart()); // "Hello World  " - 前の空白のみ削除
console.log(textWithSpaces.trimEnd());   // "  Hello World" - 後ろの空白のみ削除

// 文字列の繰り返しと埋め込み
console.log("abc".repeat(3));       // "abcabcabc" - 文字列を指定回数繰り返し
console.log("5".padStart(3, "0"));  // "005" - 指定長になるまで前に文字を追加
console.log("5".padEnd(3, "0"));    // "500" - 指定長になるまで後ろに文字を追加
```

### 数値のメソッドとMathオブジェクト

数値の処理には、数値のメソッドとMathオブジェクトの関数を使用します。

```js
const num = 123.456789;

// 数値のメソッド
console.log(num.toString());        // "123.456789" - 文字列に変換
console.log(num.toFixed(2));        // "123.46" - 小数点以下の桁数を指定
console.log(num.toFixed(0));        // "123" - 整数部分のみ
console.log(num.toPrecision(4));    // "123.5" - 有効桁数を指定
console.log(num.toPrecision(2));    // "1.2e+2" - 指数表記になる場合もある

// 進数変換
const intNum = 255;
console.log(intNum.toString(2));    // "11111111" - 2進数
console.log(intNum.toString(8));    // "377" - 8進数
console.log(intNum.toString(16));   // "ff" - 16進数

// Mathオブジェクトの関数
console.log(Math.round(num));       // 123 - 四捨五入
console.log(Math.floor(num));       // 123 - 切り捨て（床関数）
console.log(Math.ceil(num));        // 124 - 切り上げ（天井関数）
console.log(Math.trunc(num));       // 123 - 小数部分を切り捨て

// 最大値・最小値
console.log(Math.max(1, 5, 3, 9, 2)); // 9 - 最大値
console.log(Math.min(1, 5, 3, 9, 2)); // 1 - 最小値

// 絶対値と符号
console.log(Math.abs(-5));          // 5 - 絶対値
console.log(Math.sign(-5));         // -1 - 符号（-1, 0, 1のいずれか）
console.log(Math.sign(0));          // 0
console.log(Math.sign(5));          // 1

// 累乗と平方根
console.log(Math.pow(2, 3));        // 8 - 2の3乗
console.log(Math.sqrt(16));         // 4 - 平方根
console.log(Math.cbrt(27));         // 3 - 立方根

// 乱数生成
console.log(Math.random());         // 0以上1未満のランダムな数値
console.log(Math.floor(Math.random() * 10)); // 0から9までのランダムな整数
console.log(Math.floor(Math.random() * 6) + 1); // 1から6までのランダムな整数（サイコロ）

// 三角関数（ラジアン単位）
console.log(Math.PI);               // 3.141592653589793 - 円周率
console.log(Math.sin(Math.PI / 2)); // 1 - サイン（90度）
console.log(Math.cos(0));           // 1 - コサイン（0度）
console.log(Math.tan(Math.PI / 4)); // 1 - タンジェント（45度）

// 対数と指数
console.log(Math.log(Math.E));      // 1 - 自然対数
console.log(Math.log10(100));       // 2 - 常用対数
console.log(Math.exp(1));           // 2.718281828459045 - eの1乗
```

### 日付と時刻の基本操作

JavaScriptには日付と時刻を扱うDateオブジェクトがあります。

> [!NOTE]
> 日付と時刻の詳細な操作はシラバス09で学習しますが、ここでは基本的な使い方を紹介します。

```js
// 現在の日時を取得
const now = new Date();
console.log(now);                   // 現在の日時

// 特定の日時を作成
const specificDate = new Date(2024, 0, 1); // 2024年1月1日（月は0から始まる）
const dateFromString = new Date("2024-01-01");

// 日時の各部分を取得
console.log(now.getFullYear());     // 年
console.log(now.getMonth());        // 月（0-11）
console.log(now.getDate());         // 日
console.log(now.getDay());          // 曜日（0:日曜日 - 6:土曜日）
console.log(now.getHours());        // 時
console.log(now.getMinutes());      // 分
console.log(now.getSeconds());      // 秒

// 文字列への変換
console.log(now.toString());        // 標準的な文字列表現
console.log(now.toDateString());    // 日付部分のみ
console.log(now.toTimeString());    // 時刻部分のみ
console.log(now.toISOString());     // ISO形式の文字列
```

## 関数の高度な概念

### 関数も値である

JavaScriptでは、関数も値として扱うことができます。変数に代入したり、他の関数の引数として渡したりできます。

```js
// 関数を変数に代入
const myFunction = function(x) {
  return x * 2;
};

// 関数を配列に格納
const functions = [
  function(x) { return x + 1; },
  function(x) { return x * 2; },
  function(x) { return x - 1; }
];

// 関数を引数として渡す（高階関数）
function applyFunction(func, value) {
  return func(value);
}

console.log(applyFunction(myFunction, 5));     // 10
console.log(applyFunction(functions[0], 5));   // 6
```

### 即座に実行される関数式（即時関数）

定義と同時に実行される関数です。

```js
// 即時関数
(function() {
  console.log("この関数は定義と同時に実行されます");
})();

// アロー関数での即時関数
(() => {
  console.log("アロー関数でも同様に実行できます");
})();

// 引数を渡すことも可能
((name) => {
  console.log(`こんにちは、${name}さん！`);
})("太郎");
```

### コールバック関数

**コールバック関数**とは、他の関数の引数として渡される関数のことです。コールバック関数は、特定のタイミングで呼び出されることで、処理の流れを制御することができます。

> [!NOTE]
> コールバック関数は非同期処理やイベント処理で重要な概念ですが、ここでは基本的な使い方を紹介します。詳細な非同期処理は今後の授業で扱います。

#### 基本的なコールバック関数

```js
// コールバック関数を受け取る関数
function processArray(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    // 各要素に対してコールバック関数を実行
    result.push(callback(array[i]));
  }
  return result;
}

// コールバック関数として使用する関数
function double(x) {
  return x * 2;
}

function square(x) {
  return x * x;
}

// 使用例
const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, double);
const squared = processArray(numbers, square);

console.log(doubled);  // [2, 4, 6, 8, 10]
console.log(squared);  // [1, 4, 9, 16, 25]
```

#### 無名関数をコールバックとして使用

```js
// 無名関数をコールバックとして直接渡す
const numbers = [1, 2, 3, 4, 5];

const tripled = processArray(numbers, function(x) {
  return x * 3;
});

// アロー関数をコールバックとして使用
const halved = processArray(numbers, x => x / 2);

console.log(tripled);  // [3, 6, 9, 12, 15]
console.log(halved);   // [0.5, 1, 1.5, 2, 2.5]
```

#### 実用的なコールバック関数の例

> [!NOTE]
> 以下の例は実際にDenoで動作するコードです。ファイルアクセスには`--allow-read`フラグが必要です。
> ```
> > deno run --allow-read docs\05\work\sample.js
> ```

```js
// ファイルやディレクトリを読み取るDeno組み込みのモジュール（Node.JS互換）をインポート
import * as fs from "node:fs";
// パス文字列を分解したり組み立てるDeno組み込みのモジュール（Node.JS互換）をインポート
import * as path from "node:path";

// ファイルの読み取り
fs.readFile(
  // 第一引数 どのファイルを読み取るか
  path.join("docs", "05", "work", "sample.txt"),
  // 第二引数 どのように読み取るか（UTF-8のテキストファイルとして読み取る）
  "utf-8",
  // 第三引数 読み取れた又はエラーがあった際の処理を記述する
  function (err, data) {
    if (err) {
      console.error("エラーが発生しました エラー内容:", err);
    } else {
      console.log("▼▼▼ファイル読み取り成功しました▼▼▼");
      console.log(data);
    }
  },
);
```

#### 配列の組み込みメソッドでのコールバック

JavaScriptの配列には、コールバック関数を使用するメソッドが多数あります。

> [!NOTE]
> 配列の詳細はシラバス08で学習しますが、ここではコールバック関数の理解のために基本的な例を紹介します。

```js
const numbers = [1, 2, 3, 4, 5];

// forEach: 各要素に対して処理を実行
numbers.forEach(function(num) {
  console.log(num * 2);
});

// map: 各要素を変換して新しい配列を作成
const doubled = numbers.map(num => num * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// filter: 条件に合う要素のみを抽出
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers);  // [2, 4]

// find: 条件に合う最初の要素を取得
const firstEven = numbers.find(num => num % 2 === 0);
console.log(firstEven);  // 2
```

#### setTimeout でのコールバック

時間を指定して処理を実行する`setTimeout`もコールバック関数を使用します。

```js
// 指定した時間後にコールバック関数を実行
function delayedMessage(message, delay) {
  console.log('処理開始...');
  
  setTimeout(function() {
    console.log(message);
  }, delay);
  
  console.log('処理継続中...');
}

// 使用例
delayedMessage('3秒後に表示されるメッセージ', 3000);

// アロー関数での書き方
setTimeout(() => {
  console.log('1秒後に表示されます');
}, 1000);
```

## 実習課題

### 課題1: 基本的な関数定義

`docs/05/work/basic-functions.js`ファイルを作成し、以下の要件を満たすコードを書いてください：

1. 2つの数値を引数として受け取り、その合計を返す関数`add`を関数宣言で定義する
2. 2つの数値を引数として受け取り、その差を返す関数`subtract`を関数式で定義する
3. 2つの数値を引数として受け取り、その積を返す関数`multiply`をアロー関数で定義する
4. 上記3つの関数を使って、以下の計算を行い結果を表示する：
   - 10 + 5
   - 10 - 5
   - 10 × 5

### 課題2: 引数とデフォルト値

`docs/05/work/function-parameters.js`ファイルを作成し、以下の要件を満たすコードを書いてください：

1. 名前、年齢、職業を引数として受け取り、自己紹介文を返す関数`introduce`を定義する
   - 年齢のデフォルト値は20、職業のデフォルト値は"学生"とする
2. 任意の数の数値を引数として受け取り、その平均値を返す関数`average`を定義する（可変長引数を使用）
3. 上記の関数を様々なパターンで呼び出して動作を確認する

### 課題3: 戻り値の活用

`docs/05/work/return-values.js`ファイルを作成し、以下の要件を満たすコードを書いてください：

1. 点数を引数として受け取り、以下の評価を返す関数`getGrade`を定義する：
   - 90点以上: "A"
   - 80点以上: "B"
   - 70点以上: "C"
   - 60点以上: "D"
   - 60点未満: "F"
2. 幅と高さを引数として受け取り、面積と周囲の長さをオブジェクトで返す関数`getRectangleInfo`を定義する
3. 上記の関数を使って、複数のテストケースで動作を確認する

### 課題4: 組み込み関数とメソッドの活用

`docs/05/work/built-in-functions.js`ファイルを作成し、以下の要件を満たすコードを書いてください：

1. 文字列処理関数を作成する：
   - 文字列を引数として受け取り、その文字列の文字数、大文字版、小文字版を返す関数`analyzeString`
   - 文字列と検索文字を引数として受け取り、検索文字が何回出現するかを返す関数`countCharacter`
2. 数値処理関数を作成する：
   - 数値を引数として受け取り、その数値を四捨五入、切り上げ、切り捨てした結果を返す関数`roundNumbers`
   - 最小値と最大値を引数として受け取り、その範囲のランダムな整数を返す関数`getRandomInt`
3. 上記の関数を使って、様々なテストケースで動作を確認する

### 課題5: コールバック関数の活用

`docs/05/work/callback-functions.js`ファイルを作成し、以下の要件を満たすコードを書いてください：

1. 配列と処理関数（コールバック）を引数として受け取り、配列の各要素に処理を適用する関数`processNumbers`を定義する
2. 以下のコールバック関数を作成する：
   - `addTen`: 数値に10を加える関数
   - `multiplyByTwo`: 数値を2倍にする関数
   - `isEven`: 数値が偶数かどうかを判定する関数
3. `processNumbers`関数を使って、数値配列`[1, 2, 3, 4, 5]`に対して上記の処理を適用し、結果を表示する
4. 無名関数やアロー関数をコールバックとして使用する例も作成する

### 課題6: 実用的な関数

`docs/05/work/practical-functions.js`ファイルを作成し、以下の要件を満たすコードを書いてください：

1. 文字列を引数として受け取り、その文字列が回文（前から読んでも後ろから読んでも同じ）かどうかを判定する関数`isPalindrome`を定義する
2. 数値を引数として受け取り、その数値が素数かどうかを判定する関数`isPrime`を定義する
3. 配列と値を引数として受け取り、その値が配列に含まれているかどうかを判定する関数`contains`を定義する
4. 上記の関数を使って、様々なテストケースで動作を確認する

> [!TIP]
> 回文の例: "あいうえういあ"、"racecar"、"12321"
> 素数の例: 2, 3, 5, 7, 11, 13, 17, 19, 23...（1と自分自身以外で割り切れない1より大きい自然数）

### 自作 parseInt 関数を作成してみよう

`docs/05/work/my-parseint.js`ファイルを作成し [parseInt() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/parseInt) と同等の機能をこれまでの内容を元に実装してみよう（車輪の再発明をしてみよう）。

関数名は `myParseInt()` としてください。

ヒント1：

文字列は文字が繰り返されていると言えるので for を用いて繰り返し処理が出来ます。

```js
const text = '12345';
for (let i = 0; i < text.length; i++) {
  console.log(text[i]); // 1文字ずつ取得できる
}
```

ヒント2：

累乗は `**` で表現できます。

```js
console.log(10**0); // 10^0=1
console.log(10**1); // 10^0=10
console.log(10**2); // 10^0=100
```

ヒント3：

`NaN` はコード上でもそのまま `NaN` と書くことで表現できます。

```js
console.log(NaN); // NaN
```

## まとめ

- 関数は特定の処理をまとめて名前を付けたもので、コードの再利用性と可読性を向上させる
- JavaScriptでは関数宣言、関数式、アロー関数の3つの方法で関数を定義できる
- 引数を使って関数にデータを渡し、戻り値を使って処理結果を受け取ることができる
- デフォルト引数や可変長引数を使うことで、より柔軟な関数を作成できる
- JavaScriptには文字列や数値などの組み込み関数やメソッドが豊富に用意されている
- グローバル関数、文字列メソッド、Mathオブジェクトの関数を適切に使い分けることで効率的なプログラムが作成できる
- 関数は値として扱うことができ、変数に代入したり他の関数の引数として渡したりできる

> [!IMPORTANT]
> 関数はプログラミングにおける重要な概念の一つです。
> 適切に関数を定義し使用することで、保守しやすく再利用可能なコードを書くことができます。
> また、JavaScriptの豊富な組み込み関数やメソッドを活用することで、効率的なプログラム開発が可能になります。
> 次回の授業では、ファイルの分割とユニットテストについて学習します。
