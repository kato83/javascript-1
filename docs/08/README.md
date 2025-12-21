# JavaScript 配列の基本と配列操作

## 配列とは

**配列**とは、複数のデータを順序立てて格納できるデータ構造です。同じ種類のデータや関連するデータをひとまとめにして管理するための仕組みと考えることができます。

日常生活でも私たちは物事をリスト形式で整理しています：
- **買い物リスト**
- **クラスの出席簿**
- **テストの点数**
- **今週の予定**

プログラミングでも同様に、配列を使うことで関連するデータをまとめて管理し、効率的に処理することができます。

## なぜ配列が必要なのか

### 配列を使わない場合の問題点

まず、配列を使わずに学生の点数を管理する例を見てみましょう：

```js
// 配列を使わない場合：関連するデータがバラバラに管理される
let student1Score = 85;
let student2Score = 92;
let student3Score = 78;
let student4Score = 88;
let student5Score = 95;

// 平均点を計算する
let total = student1Score + student2Score + student3Score + student4Score + student5Score;
let average = total / 5;
console.log(`平均点: ${average}`);

// 最高点を見つける
let maxScore = student1Score;
if (student2Score > maxScore) maxScore = student2Score;
if (student3Score > maxScore) maxScore = student3Score;
if (student4Score > maxScore) maxScore = student4Score;
if (student5Score > maxScore) maxScore = student5Score;
console.log(`最高点: ${maxScore}`);

// すべての点数を表示する
console.log("全学生の点数:");
console.log(`学生1: ${student1Score}点`);
console.log(`学生2: ${student2Score}点`);
console.log(`学生3: ${student3Score}点`);
console.log(`学生4: ${student4Score}点`);
console.log(`学生5: ${student5Score}点`);
```

この方法では以下の問題があります：

1. **データの管理が困難**: 学生が増えるたびに新しい変数を作る必要がある
2. **コードの重複**: 似たような処理を何度も書く必要がある
3. **拡張性の低下**: 学生数が変わると、すべてのコードを書き直す必要がある
4. **処理の複雑化**: データの数が増えると、計算処理が非常に複雑になる
5. **ミスが起きやすい**: 変数名の間違いや、処理の漏れが発生しやすい

### 配列を使った場合の改善

同じ機能を配列を使って実装すると、以下のように改善されます：

```js
// 配列を使った場合：関連するデータがまとまる
const scores = [85, 92, 78, 88, 95];

// 平均点を計算する
let total = 0;
for (const score of scores) {
  total += score;
}
let average = total / scores.length;
console.log(`平均点: ${average}`);

// 最高点を見つける
let maxScore = scores[0];
for (const score of scores) {
  if (score > maxScore) {
    maxScore = score;
  }
}
console.log(`最高点: ${maxScore}`);

// すべての点数を表示する
console.log("全学生の点数:");
for (let i = 0; i < scores.length; i++) {
  console.log(`学生${i + 1}: ${scores[i]}点`);
}
```

### 配列を使用することによるメリット

1. **データの整理**: 関連するデータが1つの配列にまとまり、理解しやすい
2. **コードの簡潔性**: 繰り返し処理を使って効率的にデータを処理できる
3. **拡張性**: データの数が変わっても、コードを変更する必要がない
4. **保守性の向上**: データ構造の変更が必要な場合、配列の内容を変更するだけで済む
5. **処理の統一**: 同じ処理を全てのデータに対して一貫して適用できる
6. **メモリ効率**: 関連するデータを効率的にメモリに格納できる

### 実際の開発での重要性

実際のWebアプリケーション開発では、以下のような場面で配列が不可欠です：  
※実際には `users` や `products` 等の情報はデータベース等のストレージから取得した値となることがほとんどです。

```js
// ユーザー一覧の管理
const users = [
  { id: 1, name: "山田太郎", email: "yamada@example.com" },
  { id: 2, name: "佐藤花子", email: "sato@example.com" },
  { id: 3, name: "田中次郎", email: "tanaka@example.com" }
];

// 商品一覧の管理
const products = [
  { id: 1, name: "ノートパソコン", price: 80000, category: "電子機器" },
  { id: 2, name: "マウス", price: 2000, category: "周辺機器" },
  { id: 3, name: "キーボード", price: 5000, category: "周辺機器" }
];

// メニュー項目の管理
const menuItems = [
  "ホーム",
  "商品一覧", 
  "お問い合わせ",
  "会社概要"
];

// 使用例：特定の条件でデータを検索
const expensiveProducts = [];
for (const product of products) {
  if (product.price > 3000) {
    expensiveProducts.push(product);
  }
}
console.log("高額商品:", expensiveProducts);
```

このように、配列を使うことで**大量のデータを効率的に管理**し、それらを**統一的に処理**することができます。これにより、大規模なアプリケーションでも効率的で保守しやすいコードを書くことができます。

## 配列の基本概念

- **要素**: 配列に格納されている個々のデータ
- **インデックス（添字）**: 配列内の要素の位置を示す番号（0から始まる）
- **長さ**: 配列に含まれる要素の数

## 配列リテラル

JavaScriptで配列を作成する最も基本的な方法は、**配列リテラル**を使用することです。

### 基本的な配列リテラルの構文

```js
const 配列名 = [要素1, 要素2, 要素3, ...];
```

### 基本的な配列の例

```js
// 空の配列
const emptyArray = [];

// 数値の配列
const numbers = [1, 2, 3, 4, 5];

// 文字列の配列
const fruits = ["りんご", "バナナ", "オレンジ", "ぶどう"];

// 論理値の配列
const flags = [true, false, true, false];

// 混合データ型の配列（通常は推奨されない）
const mixedArray = [1, "hello", true, 3.14];
```

### 様々なデータ型を要素として使用

配列の要素には、JavaScriptのあらゆるデータ型を使用できます：

```js
// 文字列の配列
const colors = ["赤", "青", "緑", "黄色"];

// 数値の配列
const temperatures = [25.5, 30.2, 18.7, 22.1];

// オブジェクトの配列（前回の授業で学習したオブジェクトを要素とする）
const students = [
  { name: "山田太郎", age: 20, grade: "2年生" },
  { name: "佐藤花子", age: 19, grade: "1年生" },
  { name: "田中次郎", age: 21, grade: "3年生" }
];

// 配列の配列（多次元配列）
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
```

## 配列の要素へのアクセス

配列の要素にアクセスするには、**インデックス**（添字）を使用します。JavaScriptの配列のインデックスは**0から始まる**ことに注意してください。

### インデックスを使った要素へのアクセス

```js
const fruits = ["りんご", "バナナ", "オレンジ", "ぶどう"];

// 要素の取得（インデックスは0から始まる）
console.log(fruits[0]); // "りんご"（最初の要素）
console.log(fruits[1]); // "バナナ"（2番目の要素）
console.log(fruits[2]); // "オレンジ"（3番目の要素）
console.log(fruits[3]); // "ぶどう"（4番目の要素）

// 最後の要素へのアクセス
console.log(fruits[fruits.length - 1]); // "ぶどう"（最後の要素）
```

### 要素の変更

```js
const colors = ["赤", "青", "緑"];

// 要素の変更
colors[1] = "黄色";
console.log(colors); // ["赤", "黄色", "緑"]

// 新しい要素の追加（インデックス指定）
colors[3] = "紫";
console.log(colors); // ["赤", "黄色", "緑", "紫"]
```

### 存在しないインデックスへのアクセス

存在しないインデックスにアクセスした場合、`undefined`が返されます：

```js
const numbers = [10, 20, 30];

console.log(numbers[0]);  // 10
console.log(numbers[5]);  // undefined（存在しないインデックス）
console.log(numbers[-1]); // undefined（負のインデックス）
```

## 配列の長さ

配列の長さ（要素数）は`length`プロパティで取得できます：

```js
const animals = ["犬", "猫", "鳥", "魚"];

console.log(animals.length); // 4

// 空の配列の長さ
const empty = [];
console.log(empty.length); // 0

// 長さを使った最後の要素へのアクセス
console.log(animals[animals.length - 1]); // "魚"
```

## 配列の基本的なメソッド

JavaScriptの配列には、要素を操作するための便利なメソッドが多数用意されています。

### 要素の追加・削除

#### push() - 配列の末尾に要素を追加

```js
const fruits = ["りんご", "バナナ"];

fruits.push("オレンジ");
console.log(fruits); // ["りんご", "バナナ", "オレンジ"]

// 複数の要素を一度に追加
fruits.push("ぶどう", "いちご");
console.log(fruits); // ["りんご", "バナナ", "オレンジ", "ぶどう", "いちご"]

// pushメソッドは新しい配列の長さを返す
const newLength = fruits.push("メロン");
console.log(newLength); // 6
console.log(fruits); // ["りんご", "バナナ", "オレンジ", "ぶどう", "いちご", "メロン"]
```

#### pop() - 配列の末尾から要素を削除

```js
const numbers = [1, 2, 3, 4, 5];

const lastElement = numbers.pop();
console.log(lastElement); // 5（削除された要素）
console.log(numbers); // [1, 2, 3, 4]

// 空の配列でpopを実行
const empty = [];
console.log(empty.pop()); // undefined
```

#### unshift() - 配列の先頭に要素を追加

```js
const colors = ["青", "緑"];

colors.unshift("赤");
console.log(colors); // ["赤", "青", "緑"]

// 複数の要素を一度に追加
colors.unshift("黒", "白");
console.log(colors); // ["黒", "白", "赤", "青", "緑"]
```

#### shift() - 配列の先頭から要素を削除

```js
const animals = ["犬", "猫", "鳥", "魚"];

const firstElement = animals.shift();
console.log(firstElement); // "犬"（削除された要素）
console.log(animals); // ["猫", "鳥", "魚"]
```

### 要素の検索

#### indexOf() - 要素のインデックスを検索

```js
const fruits = ["りんご", "バナナ", "オレンジ", "バナナ"];

console.log(fruits.indexOf("バナナ")); // 1（最初に見つかったインデックス）
console.log(fruits.indexOf("ぶどう")); // -1（見つからない場合）

// 検索開始位置を指定
console.log(fruits.indexOf("バナナ", 2)); // 3（インデックス2以降で検索）
```

#### includes() - 要素が存在するかチェック

```js
const numbers = [1, 2, 3, 4, 5];

console.log(numbers.includes(3)); // true
console.log(numbers.includes(6)); // false

// 条件分岐での使用例
if (numbers.includes(3)) {
  console.log("3が含まれています");
}
```

### 配列の結合と分割

#### join() - 配列を文字列に変換

```js
const words = ["Hello", "World", "JavaScript"];

console.log(words.join()); // "Hello,World,JavaScript"（デフォルトはカンマ区切り）
console.log(words.join(" ")); // "Hello World JavaScript"（スペース区切り）
console.log(words.join("-")); // "Hello-World-JavaScript"（ハイフン区切り）
console.log(words.join("")); // "HelloWorldJavaScript"（区切り文字なし）
```

#### concat() - 配列を結合

```js
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = [7, 8, 9];

const combined = array1.concat(array2);
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 複数の配列を結合
const allCombined = array1.concat(array2, array3);
console.log(allCombined); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 元の配列は変更されない
console.log(array1); // [1, 2, 3]
```

#### slice() - 配列の一部を抽出

```js
const numbers = [0, 1, 2, 3, 4, 5];

console.log(numbers.slice(2)); // [2, 3, 4, 5]（インデックス2以降）
console.log(numbers.slice(1, 4)); // [1, 2, 3]（インデックス1から3まで）
console.log(numbers.slice(-2)); // [4, 5]（後ろから2つ）
console.log(numbers.slice(2, -1)); // [2, 3, 4]（インデックス2から後ろから1つ手前まで）

// 元の配列は変更されない
console.log(numbers); // [0, 1, 2, 3, 4, 5]
```

## 配列の反復処理

配列の全ての要素に対して同じ処理を行う場合、**反復処理**（ループ）を使用します。

### for文を使った反復処理

```js
const fruits = ["りんご", "バナナ", "オレンジ"];

// 基本的なfor文
for (let i = 0; i < fruits.length; i++) {
  console.log(`${i + 1}番目: ${fruits[i]}`);
}
// 出力:
// 1番目: りんご
// 2番目: バナナ
// 3番目: オレンジ

// インデックスを使った処理の例
const numbers = [10, 20, 30, 40, 50];
for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2; // 各要素を2倍にする
}
console.log(numbers); // [20, 40, 60, 80, 100]
```

### for...of文を使った反復処理

```js
const colors = ["赤", "青", "緑", "黄色"];

// for...of文（要素の値を直接取得）
for (const color of colors) {
  console.log(`色: ${color}`);
}
// 出力:
// 色: 赤
// 色: 青
// 色: 緑
// 色: 黄色

// 計算処理の例
const scores = [85, 92, 78, 88, 95];
let total = 0;
for (const score of scores) {
  total += score;
}
const average = total / scores.length;
console.log(`平均点: ${average}`); // 平均点: 87.6
```

### for文とfor...of文の使い分け

```js
const students = ["山田", "佐藤", "田中"];

// インデックスが必要な場合はfor文
console.log("=== for文（インデックスが必要） ===");
for (let i = 0; i < students.length; i++) {
  console.log(`${i + 1}番: ${students[i]}さん`);
}

// 要素の値だけが必要な場合はfor...of文
console.log("=== for...of文（値のみ必要） ===");
for (const student of students) {
  console.log(`${student}さん、こんにちは！`);
}
```

## 多次元配列

配列の要素として別の配列を格納することで、**多次元配列**を作成できます。

### 2次元配列の基本

```js
// 2次元配列（配列の配列）
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// 要素へのアクセス
console.log(matrix[0]); // [1, 2, 3]（1行目全体）
console.log(matrix[0][0]); // 1（1行目1列目）
console.log(matrix[1][2]); // 6（2行目3列目）
console.log(matrix[2][1]); // 8（3行目2列目）
```

### 実用的な2次元配列の例

```js
// 成績表の管理
const grades = [
  ["山田太郎", 85, 92, 78],
  ["佐藤花子", 90, 88, 95],
  ["田中次郎", 82, 85, 89]
];

// 成績表の表示
console.log("=== 成績表 ===");
console.log("名前\t\t数学\t英語\t理科");
for (const student of grades) {
  const [name, math, english, science] = student;
  console.log(`${name}\t${math}\t${english}\t${science}`);
}

// 特定の学生の平均点を計算
function calculateAverage(studentIndex) {
  const student = grades[studentIndex];
  const scores = student.slice(1); // 名前以外の要素（点数）を取得
  let total = 0;
  for (const score of scores) {
    total += score;
  }
  return total / scores.length;
}

console.log(`${grades[0][0]}の平均点: ${calculateAverage(0)}`); // 山田太郎の平均点: 85
```

## 配列とオブジェクトの組み合わせ

前回の授業で学習したオブジェクトと配列を組み合わせることで、より複雑で実用的なデータ構造を作成できます。

### オブジェクトの配列

```js
// 学生情報をオブジェクトの配列で管理
const students = [
  {
    id: 1,
    name: "山田太郎",
    age: 20,
    grade: "2年生",
    subjects: ["数学", "英語", "情報処理"]
  },
  {
    id: 2,
    name: "佐藤花子",
    age: 19,
    grade: "1年生",
    subjects: ["国語", "数学", "デザイン"]
  },
  {
    id: 3,
    name: "田中次郎",
    age: 21,
    grade: "3年生",
    subjects: ["プログラミング", "データベース", "ネットワーク"]
  }
];

// 特定の条件で学生を検索
function findStudentsByGrade(targetGrade) {
  const result = [];
  for (const student of students) {
    if (student.grade === targetGrade) {
      result.push(student);
    }
  }
  return result;
}

const secondYearStudents = findStudentsByGrade("2年生");
console.log("2年生の学生:", secondYearStudents);

// 全学生の情報を表示
function displayAllStudents() {
  console.log("=== 全学生の情報 ===");
  for (const student of students) {
    console.log(`ID: ${student.id}`);
    console.log(`名前: ${student.name}`);
    console.log(`年齢: ${student.age}歳`);
    console.log(`学年: ${student.grade}`);
    console.log(`履修科目: ${student.subjects.join(", ")}`);
    console.log("---");
  }
}

displayAllStudents();
```

### 配列をプロパティに持つオブジェクト

```js
// クラス情報を管理するオブジェクト
const classroom = {
  className: "情報処理科2年A組",
  teacher: "鈴木先生",
  students: [
    { name: "山田太郎", studentId: "2A001" },
    { name: "佐藤花子", studentId: "2A002" },
    { name: "田中次郎", studentId: "2A003" }
  ],
  subjects: ["プログラミング", "データベース", "ネットワーク"],
  
  // メソッド: 学生を追加
  addStudent: function(name, studentId) {
    this.students.push({ name: name, studentId: studentId });
  },
  
  // メソッド: 学生数を取得
  getStudentCount: function() {
    return this.students.length;
  },
  
  // メソッド: 学生一覧を表示
  displayStudents: function() {
    console.log(`=== ${this.className} 学生一覧 ===`);
    for (const student of this.students) {
      console.log(`${student.studentId}: ${student.name}`);
    }
  },
  
  // メソッド: 特定の学生を検索
  findStudent: function(studentId) {
    for (const student of this.students) {
      if (student.studentId === studentId) {
        return student;
      }
    }
    return null;
  }
};

// 使用例
classroom.displayStudents();
classroom.addStudent("高橋美咲", "2A004");
console.log(`学生数: ${classroom.getStudentCount()}人`);

const foundStudent = classroom.findStudent("2A002");
if (foundStudent) {
  console.log(`見つかった学生: ${foundStudent.name}`);
}
```

## 配列の便利な組み込みメソッド（基本編）

JavaScriptには、配列を操作するための便利な組み込みメソッドがあります。ここでは基本的なものを紹介します。

### reverse() - 配列の順序を逆にする

```js
const numbers = [1, 2, 3, 4, 5];
numbers.reverse();
console.log(numbers); // [5, 4, 3, 2, 1]

const fruits = ["りんご", "バナナ", "オレンジ"];
fruits.reverse();
console.log(fruits); // ["オレンジ", "バナナ", "りんご"]
```

### sort() - 配列を並び替える

```js
// 文字列の並び替え
const fruits = ["バナナ", "りんご", "オレンジ", "いちご"];
fruits.sort();
console.log(fruits); // ["いちご", "オレンジ", "バナナ", "りんご"]

// 数値の並び替え（注意：文字列として比較される）
const numbers1 = [10, 5, 40, 25, 1000, 1];
numbers1.sort();
console.log(numbers1); // [1, 10, 1000, 25, 40, 5] ← 期待した結果ではない

// 数値を正しく並び替える方法（比較関数を使用）
const numbers2 = [10, 5, 40, 25, 1000, 1];
numbers2.sort(function(a, b) {
  return a - b; // 昇順
});
console.log(numbers2); // [1, 5, 10, 25, 40, 1000]

// 降順で並び替え
const numbers3 = [10, 5, 40, 25, 1000, 1];
numbers3.sort(function(a, b) {
  return b - a; // 降順
});
console.log(numbers3); // [1000, 40, 25, 10, 5, 1]
```

## 実習課題

### 課題1-1: 基本的な配列の作成と操作

`docs/08/work/basic-array.js`ファイルを作成し、`docs/08/work/basic-array.test.js`のテストがすべてパスするようにしてください：

1. 果物の配列`fruits`を作成し、エクスポートする（初期値：["りんご", "バナナ", "オレンジ"]）
2. 数値の配列`numbers`を作成し、エクスポートする（初期値：[10, 20, 30, 40, 50]）
3. 以下の関数を実装し、エクスポートする：
   - `addFruit(fruit)`: 果物を配列の末尾に追加する
   - `removeFruit()`: 果物を配列の末尾から削除し、削除された要素を返す
   - `getFruitCount()`: 果物の数を返す
   - `getFruitAt(index)`: 指定されたインデックスの果物を返す
   - `doubleNumbers()`: 数値配列の各要素を2倍にする

**テスト実行方法：**
```bash
deno test docs/08/work/basic-array.test.js
```

### 課題1-2: 配列の検索と操作

`docs/08/work/array-search.js`ファイルを作成し、`docs/08/work/array-search.test.js`のテストがすべてパスするようにしてください：

1. 学生名の配列`students`を作成し、エクスポートする（初期値：["山田太郎", "佐藤花子", "田中次郎"]）
2. 以下の関数を実装し、エクスポートする：
   - `findStudent(name)`: 学生名を検索し、見つかった場合はインデックスを、見つからない場合は-1を返す
   - `hasStudent(name)`: 学生が存在するかどうかを論理値で返す
   - `addStudentAt(index, name)`: 指定されたインデックスに学生を挿入する
   - `removeStudentAt(index)`: 指定されたインデックスの学生を削除し、削除された学生名を返す
   - `getStudentList()`: 学生一覧を文字列で返す（例："山田太郎, 佐藤花子, 田中次郎"）

**テスト実行方法：**
```bash
deno test docs/08/work/array-search.test.js
```

### 課題1-3: 配列の結合と分割

`docs/08/work/array-operations.js`ファイルを作成し、`docs/08/work/array-operations.test.js`のテストがすべてパスするようにしてください：

1. 以下の関数を実装し、エクスポートする：
   - `combineArrays(array1, array2)`: 2つの配列を結合して新しい配列を返す
   - `getFirstHalf(array)`: 配列の前半部分を返す
   - `getSecondHalf(array)`: 配列の後半部分を返す
   - `getMiddleElements(array)`: 配列の最初と最後を除いた中間部分を返す
   - `reverseArray(array)`: 配列を逆順にした新しい配列を返す（元の配列は変更しない）

**テスト実行方法：**
```bash
deno test docs/08/work/array-operations.test.js
```

### 課題2: 配列の反復処理

`docs/08/work/array-loops.js`ファイルを作成し、`docs/08/work/array-loops.test.js`のテストがすべてパスするようにしてください：

1. 以下の関数を実装し、エクスポートする：
   - `calculateSum(numbers)`: 数値配列の合計を計算する
   - `calculateAverage(numbers)`: 数値配列の平均を計算する
   - `findMaximum(numbers)`: 数値配列の最大値を見つける
   - `findMinimum(numbers)`: 数値配列の最小値を見つける
   - `countEvenNumbers(numbers)`: 数値配列の偶数の個数を数える
   - `displayNumbersWithIndex(numbers)`: 数値配列を"インデックス: 値"の形式で表示する（console.logを使用）

**テスト実行方法：**
```bash
deno test docs/08/work/array-loops.test.js
```

### 課題3: 2次元配列の操作

`docs/08/work/matrix-operations.js`ファイルを作成し、`docs/08/work/matrix-operations.test.js`のテストがすべてパスするようにしてください：

1. 以下の関数を実装し、エクスポートする：
   - `createMatrix(rows, cols, initialValue)`: 指定されたサイズの2次元配列を作成する
   - `getMatrixElement(matrix, row, col)`: 指定された位置の要素を取得する
   - `setMatrixElement(matrix, row, col, value)`: 指定された位置に値を設定する
   - `getMatrixRow(matrix, row)`: 指定された行を取得する
   - `getMatrixColumn(matrix, col)`: 指定された列を取得する
   - `calculateMatrixSum(matrix)`: 2次元配列の全要素の合計を計算する

**テスト実行方法：**
```bash
deno test docs/08/work/matrix-operations.test.js
```

### 課題4: オブジェクトの配列操作

`docs/08/work/student-manager.js`ファイルを作成し、`docs/08/work/student-manager.test.js`のテストがすべてパスするようにしてください：

1. 学生管理システムオブジェクト`studentManager`を作成し、エクスポートする：
   - プロパティ: `students`（学生オブジェクトの配列）
   - 各学生オブジェクトは`id`, `name`, `age`, `grade`, `scores`（点数の配列）を持つ
2. 以下のメソッドを実装する：
   - `addStudent(name, age, grade)`: 新しい学生を追加
   - `findStudentById(id)`: IDで学生を検索
   - `addScore(studentId, score)`: 学生に点数を追加
   - `calculateStudentAverage(studentId)`: 学生の平均点を計算
   - `getStudentsByGrade(grade)`: 指定された学年の学生一覧を取得
   - `getTopStudent()`: 平均点が最も高い学生を取得
   - `getStudentCount()`: 学生数を取得

**テスト実行方法：**
```bash
deno test docs/08/work/student-manager.test.js
```

### 課題5: ショッピングカートシステム

`docs/08/work/shopping-cart.js`ファイルを作成し、`docs/08/work/shopping-cart.test.js`のテストがすべてパスするようにしてください：

1. ショッピングカートオブジェクト`shoppingCart`を作成し、エクスポートする：
   - プロパティ: `items`（商品オブジェクトの配列）
   - 各商品オブジェクトは`id`, `name`, `price`, `quantity`を持つ
2. 以下のメソッドを実装する：
   - `addItem(id, name, price, quantity)`: 商品をカートに追加（既存の商品の場合は数量を増加）
   - `removeItem(id)`: 商品をカートから削除
   - `updateQuantity(id, quantity)`: 商品の数量を更新
   - `getItem(id)`: IDで商品を検索
   - `getTotalPrice()`: カート内の商品の合計金額を計算
   - `getTotalItems()`: カート内の商品の総数を計算
   - `clearCart()`: カートを空にする
   - `getItemsSortedByPrice()`: 価格順（昇順）で商品一覧を取得

**テスト実行方法：**
```bash
deno test docs/08/work/shopping-cart.test.js
```

## まとめ

- 配列は複数のデータを順序立てて格納できるデータ構造
- 配列リテラル`[]`を使用して配列を作成できる
- インデックス（0から始まる）を使って配列の要素にアクセスできる
- `push()`, `pop()`, `shift()`, `unshift()`などのメソッドで要素を追加・削除できる
- `for`文や`for...of`文を使って配列の全要素を処理できる
- 多次元配列を使って表形式のデータを管理できる
- 配列とオブジェクトを組み合わせることで、複雑なデータ構造を表現できる
- `indexOf()`, `includes()`, `join()`, `slice()`などの便利なメソッドが用意されている

> [!IMPORTANT]
> 配列はJavaScriptプログラミングにおいて最も重要なデータ構造の一つです。
> 大量のデータを効率的に管理し、処理するために配列の操作方法をしっかりと理解することが重要です。
> 次回の授業では、文字列、数値、日付等の基本操作について学習します。
