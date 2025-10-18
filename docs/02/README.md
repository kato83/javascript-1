# JavaScript 変数とデータ型

## 変数とは

**変数**とは、プログラム内でデータを一時的に記録しておく領域の名前のようなものです。その名前を使って中身（値）を取り出したり、新しい値をセットしたりすることができます。

### 変数の宣言と代入

JavaScriptでは、変数を使う前に「宣言」する必要があります。変数の宣言には主に3つの方法があります。

```js
// 1. let - 再代入可能な変数を宣言
let score = 100;
score = 200; // 再代入OK

// 2. const - 再代入不可能な定数を宣言
const TAX = 0.10;
// TAX = 0.10; // エラー: 再代入できない
```

### 変数の命名規則

変数名をつける際には、以下のルールがあります：

1. 英字、数字、`$`、`_`のみ使用可能
2. 数字から始めることはできない
3. 予約語（`if`, `for`など）は使用できない
4. 大文字と小文字は区別される

```js
// 良い例
let userName = "山田";
let user_age = 25;
let $price = 1000;
let _count = 5;

// 悪い例
// let 1user = "鈴木";    // 数字から始まっている
// let if = "条件";       // 予約語を使用している
// let user-name = "佐藤"; // ハイフンは使用できない
```

#### 命名規則の慣習

JavaScriptでは一般的に以下の命名規則が使われます：

- **キャメルケース**: 変数名や関数名に使用（例: `userName`, `totalPrice`）
- **パスカルケース**: クラス名に使用（例: `UserAccount`, `ProductList`）
- **スネークケース**: 定数に使用することもある（例: `MAX_SIZE`, `DEFAULT_COLOR`）

## データ型の基本

JavaScriptには、以下の主要なデータ型があります：

### プリミティブ型（基本型）

1. **数値型（Number）**
   - 整数と小数を表現
   ```js
   let age = 25;      // 整数
   let height = 175.5; // 小数
   let infinity = Infinity; // 無限大
   let notANumber = NaN;    // 非数（Not a Number）
   ```

2. **文字列型（String）**
   - テキストデータを表現
   ```js
   let firstName = "太郎";
   let lastName = '山田';
   let message = `こんにちは、${firstName} ${lastName}さん`; // テンプレートリテラル
   ```

3. **論理型（Boolean）**
   - `true`または`false`の2つの値のみ
   ```js
   let isStudent = true;
   let hasLicense = false;
   ```

4. **undefined**
   - 値が割り当てられていない状態
   ```js
   let something;
   console.log(something); // undefined
   ```

5. **null**
   - 意図的に「値がない」ことを表す
   ```js
   let empty = null;
   ```

### 参照型（オブジェクト型）

プロミティブ型以外のオブジェクト（オブジェクトリテラル、配列、関数、クラス、インスタンス等）も変数にセットすることが出来ますが、詳細はカリキュラム05～09にて紹介します。

1. **オブジェクト（Object）**
   - キーと値のペアの集まり
   ```js
   let person = {
     name: "山田太郎",
     age: 25,
     isStudent: true
   };
   ```

2. **配列（Array）**
   - 順序付けられた値の集まり
   ```js
   let fruits = ["りんご", "バナナ", "オレンジ"];
   ```

3. **関数（Function）**
   - 実行可能なコードブロック
   ```js
   function greet() {
     return "こんにちは";
   }
   ```

## データ型の確認

変数のデータ型を確認するには、`typeof`演算子を使用します：

```js
console.log(typeof 42);           // "number"
console.log(typeof "Hello");      // "string"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof null);         // "object" (JavaScriptの歴史的なバグ)
console.log(typeof {});           // "object"
console.log(typeof []);           // "object" (配列もオブジェクトの一種)
console.log(typeof function(){}); // "function"
```

> [!NOTE]
> `typeof null`が`"object"`を返すのはJavaScriptの有名なバグですが、後方互換性のために修正されていません。

## 型変換

JavaScriptでは、異なる型の値を操作する際に自動的に型変換（暗黙的型変換）が行われることがあります：

```js
// 文字列と数値の連結
console.log("5" + 3);     // "53" (数値が文字列に変換される)
console.log(5 + "3");     // "53" (数値が文字列に変換される)

// 数値演算
console.log("5" - 3);     // 2 (文字列が数値に変換される)
console.log(5 * "3");     // 15 (文字列が数値に変換される)

// 比較演算
console.log("5" == 5);    // true (値のみ比較、型変換あり)
console.log("5" === 5);   // false (値と型を比較、型変換なし)
```

明示的に型を変換するには：

```js
// 文字列→数値
let str = "42";
let num1 = Number(str);    // 42
let num2 = parseInt(str);  // 42 (整数)
let num3 = parseFloat("42.5"); // 42.5 (小数)

// 数値→文字列
let num = 42;
let str1 = String(num);    // "42"
let str2 = num.toString(); // "42"

// 他の型→論理値
let bool1 = Boolean(1);    // true
let bool2 = Boolean(0);    // false
let bool3 = Boolean("");   // false
let bool4 = Boolean("hello"); // true
```

## 変数のスコープ

**スコープ**とは、変数がアクセス可能な範囲のことです。JavaScriptには主に3つのスコープがあります：

### 1. グローバルスコープ

関数やブロックの外で宣言された変数は、プログラムのどこからでもアクセス可能です：

```js
let globalVar = "グローバル変数";

function showGlobal() {
  console.log(globalVar); // "グローバル変数"
}

showGlobal();
console.log(globalVar);   // "グローバル変数"
```

### 2. 関数スコープ

関数内で宣言された変数は、その関数内でのみアクセス可能です：

```js
function showLocal() {
  let localVar = "ローカル変数";
  console.log(localVar); // "ローカル変数"
}

showLocal();
// console.log(localVar); // エラー: localVarは定義されていない
```

### 3. ブロックスコープ

`let`と`const`で宣言された変数は、宣言されたブロック（`{}`で囲まれた部分）内でのみアクセス可能です：

```js
{
  let blockVar = "ブロック変数";
  const blockConst = "ブロック定数";
  console.log(blockVar);   // "ブロック変数"
}

// console.log(blockVar);   // エラー: blockVarは定義されていない
// console.log(blockConst); // エラー: blockConstは定義されていない
```

違和感のある構文ですが、実際には `if` や `for` `while` 今後紹介する `try` `catch` `finally` でも同じ事が言えます。

```js
if (true) {
  let blockVar = "ブロック変数";
  const blockConst = "ブロック定数";
  console.log(blockVar);   // "ブロック変数"
}

// console.log(blockVar);   // エラー: blockVarは定義されていない
// console.log(blockConst); // エラー: blockConstは定義されていない
```

### スコープチェーン

内側のスコープから外側のスコープの変数にアクセスすることはできますが、その逆はできません：

```js
let outerVar = "外側の変数";

function outerFunc() {
  let middleVar = "中間の変数";
  
  function innerFunc() {
    let innerVar = "内側の変数";
    
    console.log(innerVar);  // "内側の変数"
    console.log(middleVar); // "中間の変数"
    console.log(outerVar);  // "外側の変数"
  }
  
  innerFunc();
  console.log(middleVar);   // "中間の変数"
  console.log(outerVar);    // "外側の変数"
  // console.log(innerVar); // エラー: innerVarは定義されていない
}

outerFunc();
console.log(outerVar);      // "外側の変数"
// console.log(middleVar);  // エラー: middleVarは定義されていない
// console.log(innerVar);   // エラー: innerVarは定義されていない
```

## 変数の巻き上げ

JavaScriptでは、基本的に処理が上から下に実行されていくので、変数定義前に変数の値を参照するような処理はエラーになります。

```js
// console.log(letVar); // エラー: letVarにアクセスする前に初期化する必要がある
let letVar = "let変数";
```

## 実習課題

### 課題1: 変数宣言と型確認

`docs/02/work/variables.js`ファイルを作成し、以下の要件を満たすコードを書いてください：

1. 異なるデータ型（数値、文字列、論理値、配列、オブジェクト）の変数を5つ以上宣言する
2. それぞれの変数の型を`typeof`演算子で確認し、コンソールに出力する
3. 少なくとも1つの変数に対して、値を再代入してみる（`let`を使用）

### 課題2: スコープの理解

`docs/02/work/scope.js`ファイルを作成し、以下の要件を満たすコードを書いてください：

1. グローバルスコープに変数を宣言する
2. 関数内でローカル変数を宣言し、グローバル変数とローカル変数の両方を出力する
3. ブロックスコープ内で変数を宣言し、ブロック内と外でのアクセスを試みる
4. `const`と`let`の違いを示すコード例を書く

### 課題3: 型変換の実験

`docs/02/work/type-conversion.js`ファイルを作成し、以下の要件を満たすコードを書いてください：

1. 文字列と数値の間で暗黙的型変換が起こる例を3つ以上書く
2. 明示的な型変換（`Number()`, `String()`, `Boolean()`など）の例を3つ以上書く
3. `==`と`===`の違いを示す例を書く

## まとめ

- 変数は`let`、`const`で宣言することができる
- JavaScriptには、プリミティブ型（数値、文字列、論理値など）と参照型（オブジェクト、配列、関数）がある
- 変数のスコープには、グローバルスコープ、関数スコープ、ブロックスコープがある
- JavaScriptでは型変換が自動的に行われることがあるが、明示的に型を変換することも可能
- 変数宣言は巻き上げられるが、`let`と`const`には一時的なデッドゾーンがある

> [!IMPORTANT]
> プログラミングにおいて変数とデータ型の理解は基礎中の基礎です。
> これらの概念をしっかり把握することで、より複雑なプログラムを書く際の土台となります。
