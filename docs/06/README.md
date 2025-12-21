# JavaScript ファイルの分割とユニットテスト

## ファイルの分割とは

**ファイルの分割**（モジュール化）とは、大きなプログラムを機能ごとに複数のファイルに分けて管理する手法です。これにより、コードの再利用性、保守性、可読性が大幅に向上します。

日常生活でも私たちは物事を整理して管理しています：
- 「本棚では、ジャンルごとに本を分けて整理する」
- 「料理では、材料の準備、調理、盛り付けを分けて考える」
- 「仕事では、プロジェクトをタスクごとに分割して進める」

プログラミングでも同様に、機能ごとにファイルを分割することで、より効率的で管理しやすいコードを書くことができます。

## なぜファイルを分割するのか

### ファイル分割を行わない場合の問題点

すべての機能を1つのファイルに書いた場合の問題を見てみましょう：

```js
// すべてを1つのファイルに書いた場合（all-in-one.js）

// 数学関数
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("0で割ることはできません");
  }
  return a / b;
}

// 文字列処理関数
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function reverseString(str) {
  return str.split('').reverse().join('');
}

function countWords(str) {
  return str.trim().split(/\s+/).length;
}

// 配列処理関数
function findMax(arr) {
  return Math.max(...arr);
}

function findMin(arr) {
  return Math.min(...arr);
}

function average(arr) {
  return arr.reduce((sum, num) => sum + num, 0) / arr.length;
}

// メイン処理
console.log("計算結果:", add(10, 5));
console.log("文字列処理:", capitalize("hello world"));
console.log("配列処理:", findMax([1, 5, 3, 9, 2]));

// ... さらに多くの関数が続く
```

この方法では以下の問題があります：

1. **ファイルが巨大になる**: 機能が増えるほどファイルが長くなり、目的の関数を見つけるのが困難
2. **再利用が困難**: 他のプロジェクトで数学関数だけを使いたい場合、不要な関数も含まれてしまう
3. **保守性の低下**: 修正時に関係のない部分まで影響を与える可能性がある
4. **協力開発の困難**: 複数人で開発する際、同じファイルを同時に編集するとコンフリクトが発生しやすい
5. **テストの困難**: 個別の機能をテストするのが難しい

### ファイル分割を行った場合の改善

同じ機能を複数のファイルに分割すると、以下のように改善されます：

```js
// math.js - 数学関数のみ
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  if (b === 0) {
    throw new Error("0で割ることはできません");
  }
  return a / b;
}
```

```js
// string-utils.js - 文字列処理関数のみ
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function reverseString(str) {
  return str.split('').reverse().join('');
}

export function countWords(str) {
  return str.trim().split(/\s+/).length;
}
```

```js
// array-utils.js - 配列処理関数のみ
export function findMax(arr) {
  return Math.max(...arr);
}

export function findMin(arr) {
  return Math.min(...arr);
}

export function average(arr) {
  return arr.reduce((sum, num) => sum + num, 0) / arr.length;
}
```

```js
// main.js - メイン処理
import { add } from './math.js';
import { capitalize } from './string-utils.js';
import { findMax } from './array-utils.js';

console.log("計算結果:", add(10, 5));
console.log("文字列処理:", capitalize("hello world"));
console.log("配列処理:", findMax([1, 5, 3, 9, 2]));
```

### ファイル分割のメリット

1. **コードの整理**: 関連する機能がまとまり、コードが読みやすくなる
2. **再利用性の向上**: 必要な機能だけを他のプロジェクトで使用できる
3. **保守性の向上**: 修正時の影響範囲が限定される
4. **協力開発の促進**: 機能ごとに担当者を分けて開発できる
5. **テストしやすさ**: 個別の機能を独立してテストできる
6. **デバッグの効率化**: 問題のある機能を特定しやすい

## ES Modules（ESM）の基本

JavaScriptでファイルを分割するために、**ES Modules**（ECMAScript Modules）という仕組みを使用します。これは、JavaScriptの標準的なモジュールシステムです。

### export（エクスポート）

`export`は、ファイル内の関数や変数を他のファイルから使用できるようにするためのキーワードです。

```js
// utils.js
export function greet(name) {
  return `こんにちは、${name}さん！`;
}

export function farewell(name) {
  return `さようなら、${name}さん！`;
}

export const PI = 3.14159;
export const MAX_SIZE = 100;
```

複数の関数や変数をまとめてエクスポートすることもできます：

```js
// utils.js
function greet(name) {
  return `こんにちは、${name}さん！`;
}

function farewell(name) {
  return `さようなら、${name}さん！`;
}

const PI = 3.14159;
const MAX_SIZE = 100;

// まとめてエクスポート
export { greet, farewell, PI, MAX_SIZE };
```

### import（インポート）

`import`は、他のファイルからエクスポートされた関数や変数を読み込むためのキーワードです。

```js
// main.js
import { greet, farewell, PI } from './utils.js';

console.log(greet("太郎"));     // "こんにちは、太郎さん！"
console.log(farewell("花子"));  // "さようなら、花子さん！"
console.log(PI);                // 3.14159
```

別名でインポートすることもできます：

```js
// main.js
import { greet as sayHello, PI as円周率 } from './utils.js';

console.log(sayHello("太郎"));  // "こんにちは、太郎さん！"
console.log(円周率);            // 3.14159
```

すべてをまとめてインポートすることもできます：

```js
// main.js
import * as Utils from './utils.js';

console.log(Utils.greet("太郎"));     // "こんにちは、太郎さん！"
console.log(Utils.farewell("花子"));  // "さようなら、花子さん！"
console.log(Utils.PI);                // 3.14159
```

## ユニットテストとは

**ユニットテスト**とは、プログラムの最小単位（通常は関数やメソッド）が正しく動作するかを確認するテストのことです。「ユニット」は「単位」という意味で、個別の機能を独立してテストします。

### なぜユニットテストが重要なのか

1. **バグの早期発見**: 問題を開発の早い段階で発見できる
2. **リファクタリングの安全性**: コードを改善する際に、既存の機能が壊れていないことを確認できる
3. **仕様の明確化**: テストコードが関数の期待される動作を明確に示す
4. **回帰テストの自動化**: 新しい機能を追加した際に、既存の機能が壊れていないことを自動で確認できる
5. **開発効率の向上**: 手動でのテストが不要になり、開発速度が向上する

### テストの基本構造（AAA パターン）

ユニットテストは一般的に以下の3つの段階で構成されます：

1. **Arrange（準備）**: テストに必要なデータや状態を準備する
2. **Act（実行）**: テスト対象の関数やメソッドを実行する
3. **Assert（検証）**: 実行結果が期待通りかを確認する

```js
// テストの基本構造の例
function testAdd() {
  // Arrange: テストデータを準備
  const a = 5;
  const b = 3;
  const expected = 8;
  
  // Act: テスト対象の関数を実行
  const actual = add(a, b);
  
  // Assert: 結果を検証
  if (actual === expected) {
    console.log("✅ add関数のテストが成功しました");
  } else {
    console.log(`❌ add関数のテストが失敗しました。期待値: ${expected}, 実際の値: ${actual}`);
  }
}
```

## Denoでのユニットテスト

### 基本的なテストの書き方

Denoでは、`Deno.test()`関数を使用してテストを定義します：

```js
// sample.test.js
import { assertEquals } from "@std/assert";

// テスト対象の関数
function add(a, b) {
  return a + b;
}

// テストケース
Deno.test("add関数のテスト", () => {
  // Arrange
  const a = 5;
  const b = 3;
  const expected = 8;
  
  // Act
  const actual = add(a, b);
  
  // Assert
  assertEquals(actual, expected);
});

Deno.test("add関数の負の数のテスト", () => {
  const actual = add(-2, -3);
  const expected = -5;
  assertEquals(actual, expected);
});
```

### 主要なアサーション関数

Denoの標準ライブラリには、様々なアサーション関数が用意されています：

```js
import {
  assertEquals,      // 等しいかチェック
  assertNotEquals,   // 等しくないかチェック
  assertTrue,        // trueかチェック
  assertFalse,       // falseかチェック
  assertThrows,      // エラーが投げられるかチェック
  assertStringIncludes, // 文字列が含まれるかチェック
} from "@std/assert";

Deno.test("様々なアサーションの例", () => {
  // 等価性のテスト
  assertEquals(2 + 2, 4);
  assertNotEquals(2 + 2, 5);
  
  // 真偽値のテスト
  assertTrue(5 > 3);
  assertFalse(5 < 3);
  
  // 文字列のテスト
  assertStringIncludes("Hello World", "World");
  
  // エラーのテスト
  assertThrows(() => {
    throw new Error("テストエラー");
  });
});
```

### ファイルからインポートしてテストする

実際の開発では、テスト対象の関数を別のファイルからインポートしてテストします：

```js
// math.js
export function add(a, b) {
  return a + b;
}

export function divide(a, b) {
  if (b === 0) {
    throw new Error("0で割ることはできません");
  }
  return a / b;
}
```

```js
// math.test.js
import { assertEquals, assertThrows } from "@std/assert";
import { add, divide } from "./math.js";

Deno.test("add関数のテスト", () => {
  assertEquals(add(2, 3), 5);
  assertEquals(add(-1, 1), 0);
  assertEquals(add(0, 0), 0);
});

Deno.test("divide関数のテスト", () => {
  assertEquals(divide(10, 2), 5);
  assertEquals(divide(7, 2), 3.5);
});

Deno.test("divide関数のゼロ除算エラーテスト", () => {
  assertThrows(() => {
    divide(5, 0);
  }, Error, "0で割ることはできません");
});
```

## Denoでのテスト実行方法

### CLIでのテスト実行

#### 基本的なテスト実行

```bash
# すべてのテストファイルを実行
deno test

# 特定のテストファイルを実行
deno test docs\06\work\math.test.js

# 特定のディレクトリ内のテストを実行
deno test docs\06\work\
```

#### よく使用されるオプション

```bash
# 詳細な出力でテストを実行
deno test -- --verbose

# 特定のパターンにマッチするテストのみ実行
deno test --filter "add"

# カバレッジ情報を収集
deno test --coverage=coverage

# 監視モードでテストを実行（ファイル変更保存時に自動実行）
deno test --watch
```

### VSCodeでのテスト実行

VSCodeでは、テストタブを使用してテストを実行できます。

#### 1. テストタブを開く

VSCodeのサイドバーにある「テスト」アイコン（フラスコのマーク）をクリック

#### 2. テストの実行方法

- **すべてのテストを実行**: テストタブの上部にある「▶️」ボタンをクリック
- **特定のテストファイルを実行**: ファイル名の横にある「▶️」ボタンをクリック
- **個別のテストを実行**: テスト名の横にある「▶️」ボタンをクリック

#### 3. テスト結果の確認

- ✅ 緑色のチェックマーク: テスト成功
- ❌ 赤色のバツマーク: テスト失敗
- テスト結果の詳細は、下部の「出力」パネルで確認できます

> [!TIP]
> ## テスト駆動開発（TDD）
> 
> **テスト駆動開発**（Test-Driven Development, TDD）は、テストを先に書いてから実装を行う開発手法です。
> 
> ### TDDのサイクル
> 
> 1. **Red**: 失敗するテストを書く
> 2. **Green**: テストが通る最小限のコードを書く
> 3. **Refactor**: コードを改善する
> 
> このサイクルを繰り返すことで、品質の高いコードを効率的に開発できます。
> 
> ### TDDの例
> 
> 例として、文字列を逆順にする関数をTDDで開発してみましょう：
> 
> ```js
> // 1. Red: 失敗するテストを書く
> // reverse-string.test.js
> import { assertEquals } from "@std/assert";
> import { reverseString } from "./reverse-string.js";
> 
> Deno.test("文字列を逆順にする", () => {
>   assertEquals(reverseString("hello"), "olleh");
> });
> ```
> 
> ```js
> // 2. Green: テストが通る最小限のコードを書く
> // reverse-string.js
> export function reverseString(str) {
>   return str.split('').reverse().join('');
> }
> ```
> 
> ```js
> // 3. Refactor: より多くのテストケースを追加し、コードを改善
> // reverse-string.test.js
> import { assertEquals } from "@std/assert";
> import { reverseString } from "./reverse-string.js";
> 
> Deno.test("文字列を逆順にする - 基本", () => {
>   assertEquals(reverseString("hello"), "olleh");
> });
> 
> Deno.test("文字列を逆順にする - 空文字", () => {
>   assertEquals(reverseString(""), "");
> });
> 
> Deno.test("文字列を逆順にする - 1文字", () => {
>   assertEquals(reverseString("a"), "a");
> });
> 
> Deno.test("文字列を逆順にする - 数字", () => {
>   assertEquals(reverseString("12345"), "54321");
> });
> ```

## 実習課題

### 課題1: 自作 parseInt 関数のモジュール化とテスト

05回目の課題「自作 parseInt 関数」をモジュール化し、ユニットテストを作成してみましょう。

#### ステップ1: 関数のモジュール化

`docs/06/work/my-parseint.js`ファイルを作成し、以下の要件を満たす`myParseInt`関数を実装してください：

1. 文字列を引数として受け取り、整数に変換して返す
2. 先頭から数字以外の文字が現れるまでを解析する
3. 数字が含まれていない場合は`NaN`を返す
4. 空文字列の場合は`NaN`を返す
5. 先頭の空白は無視する
6. 符号（+/-）に対応する

#### ステップ2: テストの実行

作成したテストを以下の方法で実行してください：

1. **CLIでの実行**:
   ```bash
   deno test docs/06/work/my-parseint.test.js
   ```

2. **VSCodeのテストタブでの実行**:
   - テストタブを開いて、作成したテストファイルを実行

#### ステップ3: 実装の改善

テスト結果を確認し、失敗したテストがあれば実装を修正してください。すべてのテストが通るまで、実装とテストを繰り返し改善しましょう。

### 課題2: 文字列処理ユーティリティの作成

`docs/06/work/string-utils.js`と`docs/06/work/string-utils.test.js`を作成し、以下の文字列処理関数を実装してテストしてください：

1. **capitalize関数**: 文字列の最初の文字を大文字にし、残りを小文字にする
2. **isPalindrome関数**: 文字列が回文かどうかを判定する
3. **countVowels関数**: 文字列内の母音（a, e, i, o, u）の数を数える

各関数について、適切なテストケースを作成してください。

### 課題3: 数学ユーティリティの作成

`docs/06/work/math-utils.js`と`docs/06/work/math-utils.test.js`を作成し、以下の数学関数を実装してテストしてください：

1. **factorial関数**: 階乗を計算する（例: `factorial(5)` → `120`）
2. **isPrime関数**: 素数かどうかを判定する
3. **gcd関数**: 最大公約数を求める

各関数について、正常ケースとエラーケース（負の数、0など）のテストを作成してください。

## まとめ

- ファイルの分割（モジュール化）により、コードの再利用性、保守性、可読性が向上する
- ES Modulesの`export`と`import`を使用してファイル間で機能を共有できる
- ユニットテストにより、個別の機能が正しく動作することを自動で確認できる
- Denoには組み込みのテストフレームワークがあり、追加のライブラリは不要
- テストはCLIとVSCodeの両方で実行できる
- テスト駆動開発（TDD）により、品質の高いコードを効率的に開発できる

> [!IMPORTANT]
> ファイルの分割とユニットテストは、プロフェッショナルなソフトウェア開発において必須のスキルです。
> 小さなプロジェクトから始めて、これらの技術を身につけることで、より大規模で複雑なアプリケーションの開発に対応できるようになります。
> 次回の授業では、オブジェクトの基本とオブジェクトの構造について学習します。
