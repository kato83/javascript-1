# JavaScript オブジェクトの基本とオブジェクトの構造

## オブジェクトとは

**オブジェクト**とは、関連するデータ（プロパティ）と機能（メソッド）をひとまとめにしたデータ構造です。現実世界の「もの」をプログラムで表現するための仕組みと考えることができます。

日常生活でも私たちは物事を属性と行動で整理しています：
- 「人」には名前、年齢、住所などの**属性**があり、話す、歩くなどの**行動**ができる
- 「車」には色、メーカー、年式などの**属性**があり、走る、止まるなどの**行動**ができる
- 「本」には題名、著者、ページ数などの**属性**があり、読む、貸し出すなどの**行動**ができる

プログラミングでも同様に、オブジェクトを使うことで現実世界の概念をコードで表現し、より直感的で理解しやすいプログラムを作ることができます。

## なぜオブジェクトが必要なのか

### オブジェクトを使わない場合の問題点

まず、オブジェクトを使わずに学生の情報を管理する例を見てみましょう：

```js
// オブジェクトを使わない場合：関連するデータがバラバラに管理される
let student1Name = "山田太郎";
let student1Age = 20;
let student1Grade = "2年生";
let student1Subject = "情報処理";

let student2Name = "佐藤花子";
let student2Age = 19;
let student2Grade = "1年生";
let student2Subject = "デザイン";

let student3Name = "田中次郎";
let student3Age = 21;
let student3Grade = "3年生";
let student3Subject = "プログラミング";

// 学生の情報を表示する関数
function displayStudent1() {
  console.log(`名前: ${student1Name}`);
  console.log(`年齢: ${student1Age}`);
  console.log(`学年: ${student1Grade}`);
  console.log(`専攻: ${student1Subject}`);
}

function displayStudent2() {
  console.log(`名前: ${student2Name}`);
  console.log(`年齢: ${student2Age}`);
  console.log(`学年: ${student2Grade}`);
  console.log(`専攻: ${student2Subject}`);
}

function displayStudent3() {
  console.log(`名前: ${student3Name}`);
  console.log(`年齢: ${student3Age}`);
  console.log(`学年: ${student3Grade}`);
  console.log(`専攻: ${student3Subject}`);
}

// 関数の呼び出し
displayStudent1();
displayStudent2();
displayStudent3();
```

この方法では以下の問題があります：

1. **データの関連性が不明確**: 同じ学生の情報なのに、変数がバラバラに定義されている
2. **コードの重複**: 似たような処理を何度も書く必要がある
3. **管理が困難**: 学生が増えるたびに大量の変数と関数を追加する必要がある
4. **ミスが起きやすい**: 変数名の間違いや、関連するデータの更新漏れが発生しやすい
5. **拡張性の低下**: 新しい属性（例：電話番号）を追加する場合、すべての学生分の変数を追加する必要がある

### オブジェクトを使った場合の改善

同じ機能をオブジェクトを使って実装すると、以下のように改善されます：

```js
// オブジェクトを使った場合：関連するデータと機能がまとまる
const student1 = {
  name: "山田太郎",
  age: 20,
  grade: "2年生",
  subject: "情報処理",
  
  // メソッド（オブジェクト内の関数）
  display: function() {
    console.log(`名前: ${this.name}`);
    console.log(`年齢: ${this.age}`);
    console.log(`学年: ${this.grade}`);
    console.log(`専攻: ${this.subject}`);
  }
};

const student2 = {
  name: "佐藤花子",
  age: 19,
  grade: "1年生",
  subject: "デザイン",
  
  display: function() {
    console.log(`名前: ${this.name}`);
    console.log(`年齢: ${this.age}`);
    console.log(`学年: ${this.grade}`);
    console.log(`専攻: ${this.subject}`);
  }
};

const student3 = {
  name: "田中次郎",
  age: 21,
  grade: "3年生",
  subject: "プログラミング",
  
  display: function() {
    console.log(`名前: ${this.name}`);
    console.log(`年齢: ${this.age}`);
    console.log(`学年: ${this.grade}`);
    console.log(`専攻: ${this.subject}`);
  }
};

// メソッドの呼び出し
student1.display();
student2.display();
student3.display();
```

### オブジェクトを使用することによるメリット

1. **データの整理**: 関連するデータが1つのオブジェクトにまとまり、理解しやすい
2. **コードの再利用**: 同じ構造のオブジェクトを簡単に作成できる
3. **保守性の向上**: データ構造の変更が必要な場合、オブジェクトの定義を変更するだけで済む
4. **直感的な操作**: 現実世界の概念に近い形でプログラムを書ける
5. **拡張性**: 新しいプロパティやメソッドを簡単に追加できる
6. **名前空間の整理**: 関連する機能がオブジェクト内にまとまり、名前の衝突を避けられる

### 実際の開発での重要性

実際のWebアプリケーション開発では、以下のような場面でオブジェクトが不可欠です：

```js
// ユーザー情報の管理
const user = {
  id: 12345,
  username: "yamada_taro",
  email: "yamada@example.com",
  profile: {
    firstName: "太郎",
    lastName: "山田",
    age: 25,
    avatar: "https://example.com/avatar.jpg"
  },
  
  getFullName: function() {
    return `${this.profile.lastName} ${this.profile.firstName}`;
  },
  
  updateEmail: function(newEmail) {
    this.email = newEmail;
    console.log(`メールアドレスを${newEmail}に更新しました`);
  }
};

// 商品情報の管理
const product = {
  id: "PRD001",
  name: "ワイヤレスイヤホン",
  price: 8900,
  category: "電子機器",
  inStock: true,
  
  getDisplayPrice: function() {
    return `¥${this.price.toLocaleString()}`;
  },
  
  checkAvailability: function() {
    return this.inStock ? "在庫あり" : "在庫切れ";
  }
};

// 使用例
console.log(user.getFullName());          // "山田 太郎"
console.log(product.getDisplayPrice());   // "¥8,900"
console.log(product.checkAvailability()); // "在庫あり"
```

このように、オブジェクトを使うことで**複雑なデータを構造化**し、それらを操作する**機能を一箇所にまとめる**ことができます。これにより、大規模なアプリケーションでも効率的で保守しやすいコードを書くことができます。

## オブジェクトの基本概念

- **プロパティ**: オブジェクトが持つデータ（属性）
- **メソッド**: オブジェクトが持つ関数（行動・機能）
- **キー**: プロパティやメソッドの名前
- **値**: プロパティに格納されているデータ、またはメソッドの関数

## オブジェクトリテラル

JavaScriptでオブジェクトを作成する最も基本的な方法は、**オブジェクトリテラル**を使用することです。

### 基本的なオブジェクトリテラルの構文

```js
const オブジェクト名 = {
  プロパティ名1: 値1,
  プロパティ名2: 値2,
  メソッド名: function() {
    // 処理内容
  }
};
```

### 基本的なオブジェクトの例

```js
// 空のオブジェクト
const emptyObject = {};

// プロパティを持つオブジェクト
const person = {
  name: "田中太郎",
  age: 25,
  city: "東京"
};

// メソッドを持つオブジェクト
const calculator = {
  result: 0,
  
  add: function(num) {
    this.result += num;
    return this.result;
  },
  
  reset: function() {
    this.result = 0;
    return this.result;
  }
};
```

### 様々なデータ型をプロパティとして使用

オブジェクトのプロパティには、JavaScriptのあらゆるデータ型を使用できます：

```js
const mixedObject = {
  // 文字列
  name: "サンプル",
  
  // 数値
  count: 42,
  
  // 論理値
  isActive: true,
  
  // 配列（詳細は次回の授業で学習）
  tags: ["JavaScript", "プログラミング", "学習"],
  
  // 関数（メソッド）
  greet: function() {
    return `こんにちは、${this.name}です！`;
  },
  
  // ネストされたオブジェクト
  settings: {
    theme: "dark",
    language: "ja",
    notifications: true
  }
};
```

## プロパティへのアクセス

オブジェクトのプロパティにアクセスするには、主に2つの方法があります。

### 1. ドット記法（Dot Notation）

最も一般的で読みやすい方法です：

```js
const student = {
  name: "山田花子",
  age: 19,
  grade: "2年生"
};

// プロパティの取得
console.log(student.name);   // "山田花子"
console.log(student.age);    // 19
console.log(student.grade);  // "2年生"

// プロパティの変更
student.age = 20;
console.log(student.age);    // 20

// 新しいプロパティの追加
student.subject = "情報処理";
console.log(student.subject); // "情報処理"
```

### 2. ブラケット記法（Bracket Notation）

プロパティ名を文字列として指定する方法です：

```js
const student = {
  name: "山田花子",
  age: 19,
  grade: "2年生"
};

// プロパティの取得
console.log(student["name"]);   // "山田花子"
console.log(student["age"]);    // 19
console.log(student["grade"]);  // "2年生"

// プロパティの変更
student["age"] = 20;
console.log(student["age"]);    // 20

// 新しいプロパティの追加
student["subject"] = "情報処理";
console.log(student["subject"]); // "情報処理"
```

### ドット記法とブラケット記法の使い分け

#### ドット記法を使う場合

- プロパティ名が事前に分かっている場合
- プロパティ名が有効なJavaScript識別子の場合（英数字、$、_のみ、数字から始まらない）

```js
const user = {
  firstName: "太郎",
  lastName: "山田",
  age: 30
};

console.log(user.firstName); // "太郎" - 推奨
console.log(user.lastName);  // "山田" - 推奨
```

#### ブラケット記法を使う場合

- プロパティ名が動的に決まる場合
- プロパティ名にスペースや特殊文字が含まれる場合
- プロパティ名が数字から始まる場合

```js
const data = {
  "first name": "太郎",        // スペースを含む
  "user-id": 12345,           // ハイフンを含む
  "2023年度": "データ"        // 数字から始まる
};

// ブラケット記法でのみアクセス可能
console.log(data["first name"]); // "太郎"
console.log(data["user-id"]);    // 12345
console.log(data["2023年度"]);   // "データ"

// 動的なプロパティアクセス
const propertyName = "first name";
console.log(data[propertyName]); // "太郎"

// ドット記法では以下はエラーになる
// console.log(data.first name);  // エラー
// console.log(data.user-id);     // エラー
// console.log(data.2023年度);    // エラー
```

### 存在しないプロパティへのアクセス

存在しないプロパティにアクセスした場合、`undefined`が返されます：

```js
const person = {
  name: "田中太郎",
  age: 25
};

console.log(person.name);     // "田中太郎"
console.log(person.height);   // undefined（存在しないプロパティ）
console.log(person["weight"]); // undefined（存在しないプロパティ）
```

## プロパティの操作

### プロパティの追加

オブジェクト作成後に新しいプロパティを追加できます：

```js
const car = {
  brand: "Toyota",
  model: "Prius"
};

// 新しいプロパティの追加
car.year = 2023;
car.color = "白";
car["fuel-type"] = "ハイブリッド";

console.log(car);
// 出力:
// {
//   brand: "Toyota",
//   model: "Prius",
//   year: 2023,
//   color: "白",
//   "fuel-type": "ハイブリッド"
// }
```

### プロパティの変更

既存のプロパティの値を変更できます：

```js
const product = {
  name: "ノートパソコン",
  price: 80000,
  inStock: true
};

// プロパティの変更
product.price = 75000;        // 値下げ
product.inStock = false;      // 在庫切れに変更
product["name"] = "ゲーミングノートパソコン"; // 名前変更

console.log(product);
// 出力:
// {
//   name: "ゲーミングノートパソコン",
//   price: 75000,
//   inStock: false
// }
```

### プロパティの削除

`delete`演算子を使用してプロパティを削除できます：

```js
const user = {
  username: "yamada123",
  email: "yamada@example.com",
  password: "secret123",
  age: 25
};

// パスワードプロパティを削除（セキュリティ上の理由）
delete user.password;

console.log(user);
// 出力:
// {
//   username: "yamada123",
//   email: "yamada@example.com",
//   age: 25
// }

console.log(user.password); // undefined
```

### プロパティの存在確認

プロパティが存在するかどうかを確認する方法：

```js
const book = {
  title: "JavaScript入門",
  author: "山田太郎",
  pages: 300
};

// in演算子を使用
console.log("title" in book);     // true
console.log("publisher" in book); // false

// hasOwnPropertyメソッドを使用
console.log(book.hasOwnProperty("author")); // true
console.log(book.hasOwnProperty("isbn"));   // false

// undefinedとの比較
console.log(book.title !== undefined);     // true
console.log(book.publisher !== undefined); // false
```

## メソッドの定義と呼び出し

**メソッド**とは、オブジェクト内で定義された関数のことです。オブジェクトの「行動」や「機能」を表現します。

### 基本的なメソッドの定義

```js
const calculator = {
  // プロパティ
  result: 0,
  
  // メソッド
  add: function(number) {
    this.result += number;
    return this.result;
  },
  
  subtract: function(number) {
    this.result -= number;
    return this.result;
  },
  
  multiply: function(number) {
    this.result *= number;
    return this.result;
  },
  
  divide: function(number) {
    if (number !== 0) {
      this.result /= number;
    } else {
      console.log("0で割ることはできません");
    }
    return this.result;
  },
  
  clear: function() {
    this.result = 0;
    return this.result;
  },
  
  getResult: function() {
    return this.result;
  }
};
```

### メソッドの呼び出し

メソッドは、プロパティと同様にドット記法またはブラケット記法で呼び出します：

```js
// メソッドの呼び出し
calculator.add(10);        // result = 10
calculator.multiply(3);    // result = 30
calculator.subtract(5);    // result = 25
calculator.divide(5);      // result = 5

console.log(calculator.getResult()); // 5

calculator.clear();        // result = 0
console.log(calculator.getResult()); // 0
```

### thisキーワード

メソッド内で`this`キーワードを使用すると、そのメソッドが属するオブジェクト自身を参照できます：

```js
const person = {
  firstName: "太郎",
  lastName: "山田",
  age: 30,
  
  // thisを使用してオブジェクト自身のプロパティにアクセス
  getFullName: function() {
    return `${this.lastName} ${this.firstName}`;
  },
  
  introduce: function() {
    return `私の名前は${this.getFullName()}で、${this.age}歳です。`;
  },
  
  haveBirthday: function() {
    this.age += 1;
    return `誕生日おめでとう！${this.age}歳になりました。`;
  }
};

console.log(person.getFullName()); // "山田 太郎"
console.log(person.introduce());   // "私の名前は山田 太郎で、30歳です。"
console.log(person.haveBirthday()); // "誕生日おめでとう！31歳になりました。"
console.log(person.age);           // 31
```

### ES6のメソッド短縮記法

ES6（ECMAScript 2015）以降では、メソッドをより簡潔に定義できます：

```js
// 従来の書き方
const oldStyle = {
  greet: function(name) {
    return `こんにちは、${name}さん！`;
  }
};

// ES6の短縮記法
const newStyle = {
  greet(name) {
    return `こんにちは、${name}さん！`;
  }
};

// どちらも同じように動作
console.log(oldStyle.greet("太郎")); // "こんにちは、太郎さん！"
console.log(newStyle.greet("花子")); // "こんにちは、花子さん！"
```

## ネストされたオブジェクト

オブジェクトの中に別のオブジェクトを含めることができます。これを**ネストされたオブジェクト**と呼びます。

### 基本的なネストされたオブジェクト

```js
const company = {
  name: "テック株式会社",
  founded: 2020,
  
  // ネストされたオブジェクト
  address: {
    country: "日本",
    prefecture: "東京都",
    city: "渋谷区",
    street: "道玄坂1-2-3",
    zipCode: "150-0043"
  },
  
  // さらにネストされたオブジェクト
  ceo: {
    name: {
      first: "太郎",
      last: "田中"
    },
    age: 45,
    email: "tanaka@tech-corp.com"
  }
};
```

### ネストされたプロパティへのアクセス

ドット記法を連続して使用することで、深い階層のプロパティにアクセスできます：

```js
// 基本的なアクセス
console.log(company.name);           // "テック株式会社"
console.log(company.founded);        // 2020

// ネストされたプロパティへのアクセス
console.log(company.address.country);     // "日本"
console.log(company.address.city);        // "渋谷区"
console.log(company.address.zipCode);     // "150-0043"

// さらに深いネストへのアクセス
console.log(company.ceo.name.first);      // "太郎"
console.log(company.ceo.name.last);       // "田中"
console.log(company.ceo.email);           // "tanaka@tech-corp.com"

// ブラケット記法との組み合わせ
console.log(company["address"]["country"]); // "日本"
console.log(company.ceo["name"]["first"]);  // "太郎"
```

### ネストされたプロパティの変更と追加

```js
// ネストされたプロパティの変更
company.address.city = "新宿区";
company.ceo.age = 46;

// 新しいネストされたプロパティの追加
company.address.building = "テックビル5F";
company.ceo.phone = "03-1234-5678";

// 新しいネストされたオブジェクトの追加
company.departments = {
  engineering: {
    manager: "佐藤次郎",
    employees: 15
  },
  sales: {
    manager: "鈴木花子",
    employees: 8
  }
};

console.log(company.departments.engineering.manager); // "佐藤次郎"
console.log(company.departments.sales.employees);     // 8
```

### 安全なネストされたプロパティへのアクセス

存在しないプロパティにアクセスしようとするとエラーが発生する可能性があります：

```js
const user = {
  name: "山田太郎",
  profile: {
    age: 25
  }
};

// 安全なアクセス
console.log(user.name);              // "山田太郎"
console.log(user.profile.age);       // 25

// 危険なアクセス（エラーの可能性）
// console.log(user.address.city);   // エラー: Cannot read property 'city' of undefined

// 安全な確認方法
if (user.address && user.address.city) {
  console.log(user.address.city);
} else {
  console.log("住所情報がありません");
}

// より簡潔な確認方法
console.log(user.address?.city || "住所情報なし"); // "住所情報なし"
```

> [!NOTE]
> `?.`（オプショナルチェーニング）は比較的新しい機能で、存在しないプロパティに安全にアクセスできます。詳細は今後の授業で扱います。

## オブジェクトと関数の組み合わせ

オブジェクトと関数を組み合わせることで、より柔軟で再利用可能なコードを書くことができます。

### 関数でオブジェクトを作成する

同じ構造のオブジェクトを複数作成する場合、関数を使用すると便利です：

```js
// 学生オブジェクトを作成する関数
function createStudent(name, age, grade, subject) {
  return {
    name: name,
    age: age,
    grade: grade,
    subject: subject,
    
    introduce: function() {
      return `私は${this.name}です。${this.age}歳の${this.grade}で、${this.subject}を専攻しています。`;
    },
    
    study: function(hours) {
      return `${this.name}は${hours}時間${this.subject}を勉強しました。`;
    }
  };
}

// 複数の学生オブジェクトを作成
const student1 = createStudent("山田太郎", 20, "2年生", "情報処理");
const student2 = createStudent("佐藤花子", 19, "1年生", "デザイン");
const student3 = createStudent("田中次郎", 21, "3年生", "プログラミング");

// 作成したオブジェクトの使用
console.log(student1.introduce());
// "私は山田太郎です。20歳の2年生で、情報処理を専攻しています。"

console.log(student2.study(3));
// "佐藤花子は3時間デザインを勉強しました。"

console.log(student3.introduce());
// "私は田中次郎です。21歳の3年生で、プログラミングを専攻しています。"
```

### ES6のプロパティ短縮記法

ES6では、変数名とプロパティ名が同じ場合、短縮して書くことができます：

```js
// 従来の書き方
function createProduct(name, price, category) {
  return {
    name: name,
    price: price,
    category: category,
    
    getInfo: function() {
      return `${this.name} - ${this.category} - ¥${this.price}`;
    }
  };
}

// ES6の短縮記法
function createProductES6(name, price, category) {
  return {
    name,        // name: name と同じ
    price,       // price: price と同じ
    category,    // category: category と同じ
    
    getInfo() {  // getInfo: function() と同じ
      return `${this.name} - ${this.category} - ¥${this.price}`;
    }
  };
}

// どちらも同じように動作
const product1 = createProduct("ノートパソコン", 80000, "電子機器");
const product2 = createProductES6("マウス", 2500, "周辺機器");

console.log(product1.getInfo()); // "ノートパソコン - 電子機器 - ¥80000"
console.log(product2.getInfo()); // "マウス - 周辺機器 - ¥2500"
```

### オブジェクトを引数として受け取る関数

オブジェクトを関数の引数として渡すことで、複雑なデータを効率的に処理できます：

```js
// 学生情報を処理する関数
function processStudent(student) {
  console.log(`=== ${student.name}さんの情報 ===`);
  console.log(`年齢: ${student.age}歳`);
  console.log(`学年: ${student.grade}`);
  console.log(`専攻: ${student.subject}`);
  
  // 成人かどうかの判定
  if (student.age >= 20) {
    console.log("成人です");
  } else {
    console.log("未成年です");
  }
}

// 複数の学生オブジェクトを処理
const students = [
  { name: "山田太郎", age: 20, grade: "2年生", subject: "情報処理" },
  { name: "佐藤花子", age: 19, grade: "1年生", subject: "デザイン" },
  { name: "田中次郎", age: 21, grade: "3年生", subject: "プログラミング" }
];

// 各学生の情報を処理
for (const student of students) {
  processStudent(student);
  console.log(""); // 空行
}
```

## 実用的なオブジェクトの例

### 1. 図書管理システム

```js
const library = {
  name: "市立図書館",
  books: [
    {
      id: 1,
      title: "JavaScript入門",
      author: "山田太郎",
      isbn: "978-4-123456-78-9",
      available: true
    },
    {
      id: 2,
      title: "Webデザインの基礎",
      author: "佐藤花子",
      isbn: "978-4-987654-32-1",
      available: false
    }
  ],
  
  // 本を検索するメソッド
  findBook: function(title) {
    for (const book of this.books) {
      if (book.title === title) {
        return book;
      }
    }
    return null;
  },
  
  // 本を借りるメソッド
  borrowBook: function(title) {
    const book = this.findBook(title);
    if (book && book.available) {
      book.available = false;
      return `「${book.title}」を借りました。`;
    } else if (book && !book.available) {
      return `「${book.title}」は貸出中です。`;
    } else {
      return `「${title}」は見つかりませんでした。`;
    }
  },
  
  // 本を返すメソッド
  returnBook: function(title) {
    const book = this.findBook(title);
    if (book && !book.available) {
      book.available = true;
      return `「${book.title}」を返却しました。`;
    } else if (book && book.available) {
      return `「${book.title}」は既に返却済みです。`;
    } else {
      return `「${title}」は見つかりませんでした。`;
    }
  },
  
  // 利用可能な本の一覧を表示
  showAvailableBooks: function() {
    console.log(`=== ${this.name} 利用可能な本 ===`);
    for (const book of this.books) {
      if (book.available) {
        console.log(`・${book.title} (著者: ${book.author})`);
      }
    }
  }
};

// 図書館システムの使用例
console.log(library.borrowBook("JavaScript入門"));
// "「JavaScript入門」を借りました。"

library.showAvailableBooks();
// === 市立図書館 利用可能な本 ===
// ・Webデザインの基礎 (著者: 佐藤花子)

console.log(library.returnBook("JavaScript入門"));
// "「JavaScript入門」を返却しました。"
```

### 2. 銀行口座システム

```js
const bankAccount = {
  accountNumber: "123-456-789",
  accountHolder: "山田太郎",
  balance: 50000,
  transactions: [],
  
  // 残高を確認するメソッド
  checkBalance: function() {
    return `現在の残高: ¥${this.balance.toLocaleString()}`;
  },
  
  // 入金するメソッド
  deposit: function(amount) {
    if (amount > 0) {
      this.balance += amount;
      this.transactions.push({
        type: "入金",
        amount: amount,
        date: new Date(),
        balance: this.balance
      });
      return `¥${amount.toLocaleString()}を入金しました。${this.checkBalance()}`;
    } else {
      return "入金額は0より大きい値を指定してください。";
    }
  },
  
  // 出金するメソッド
  withdraw: function(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      this.transactions.push({
        type: "出金",
        amount: amount,
        date: new Date(),
        balance: this.balance
      });
      return `¥${amount.toLocaleString()}を出金しました。${this.checkBalance()}`;
    } else if (amount > this.balance) {
      return "残高不足です。";
    } else {
      return "出金額は0より大きい値を指定してください。";
    }
  },
  
  // 取引履歴を表示するメソッド
  showTransactions: function() {
    console.log(`=== ${this.accountHolder}さんの取引履歴 ===`);
    for (const transaction of this.transactions) {
      const date = transaction.date.toLocaleDateString();
      console.log(`${date} - ${transaction.type}: ¥${transaction.amount.toLocaleString()} (残高: ¥${transaction.balance.toLocaleString()})`);
    }
  }
};

// 銀行口座システムの使用例
console.log(bankAccount.checkBalance());
// "現在の残高: ¥50,000"

console.log(bankAccount.deposit(10000));
// "¥10,000を入金しました。現在の残高: ¥60,000"

console.log(bankAccount.withdraw(5000));
// "¥5,000を出金しました。現在の残高: ¥55,000"

bankAccount.showTransactions();
// === 山田太郎さんの取引履歴 ===
// 2024/1/15 - 入金: ¥10,000 (残高: ¥60,000)
// 2024/1/15 - 出金: ¥5,000 (残高: ¥55,000)
```

## オブジェクトの便利な組み込みメソッド

JavaScriptには、オブジェクトを操作するための便利な組み込みメソッドがあります。

### Object.keys() - プロパティ名の一覧を取得

```js
const person = {
  name: "田中太郎",
  age: 30,
  city: "東京",
  job: "エンジニア"
};

const keys = Object.keys(person);
console.log(keys); // ["name", "age", "city", "job"]

// プロパティ名を使った処理
for (const key of keys) {
  console.log(`${key}: ${person[key]}`);
}
// name: 田中太郎
// age: 30
// city: 東京
// job: エンジニア
```

### Object.values() - プロパティ値の一覧を取得

```js
const scores = {
  math: 85,
  english: 92,
  science: 78,
  history: 88
};

const values = Object.values(scores);
console.log(values); // [85, 92, 78, 88]

// 平均点を計算
const average = values.reduce((sum, score) => sum + score, 0) / values.length;
console.log(`平均点: ${average}`); // 平均点: 85.75
```

### Object.entries() - キーと値のペアの一覧を取得

```js
const product = {
  name: "ノートパソコン",
  price: 80000,
  category: "電子機器",
  inStock: true
};

const entries = Object.entries(product);
console.log(entries);
// [
//   ["name", "ノートパソコン"],
//   ["price", 80000],
//   ["category", "電子機器"],
//   ["inStock", true]
// ]

// キーと値を同時に処理
for (const [key, value] of entries) {
  console.log(`${key}: ${value}`);
}
// name: ノートパソコン
// price: 80000
// category: 電子機器
// inStock: true
```

## 実習課題

### 課題1: 基本的なオブジェクトの作成（プロパティのみ）

`docs/07/work/book-object.js`ファイルを作成し、`docs/07/work/book-object.test.js`のテストがすべてパスするようにしてください：

1. 本を表すオブジェクト`book`を作成し、エクスポートする（以下のプロパティを含む）：
   - `title`: 本のタイトル（文字列）
   - `author`: 著者名（文字列）
   - `pages`: ページ数（数値）
   - `price`: 価格（数値）
   - `isRead`: 読了済みかどうか（論理値）
2. 作成したオブジェクトの各プロパティにアクセスして値を表示する
3. プロパティの値を変更する（例：価格の変更、読了状態の変更）
4. 新しいプロパティを追加する（例：`publisher`（出版社）、`genre`（ジャンル））

**テスト実行方法：**
```bash
deno test docs/07/work/book-object.test.js
```

### 課題2: メソッドを持つオブジェクトの作成

`docs/07/work/calculator.js`ファイルを作成し、`docs/07/work/calculator.test.js`のテストがすべてパスするようにしてください：

1. 電卓オブジェクト`calculator`を作成し、エクスポートする（以下のプロパティとメソッドを含む）：
   - プロパティ: `result`（計算結果を保存する数値、初期値は0）
   - メソッド:
     - `add(number)`: 数値を加算し、結果を返す
     - `subtract(number)`: 数値を減算し、結果を返す
     - `multiply(number)`: 数値を乗算し、結果を返す
     - `divide(number)`: 数値で除算し、結果を返す（0で割る場合はエラーメッセージを表示）
     - `clear()`: 結果を0にリセットし、結果を返す
     - `getResult()`: 現在の結果を返す
2. 各メソッドを呼び出して動作を確認する

**テスト実行方法：**
```bash
deno test docs/07/work/calculator.test.js
```

### 課題3: 関数を使ったオブジェクト作成（関数の復習）

`docs/07/work/create-student.js`ファイルを作成し、`docs/07/work/create-student.test.js`のテストがすべてパスするようにしてください：

1. 学生オブジェクトを作成する関数`createStudent(name, age, grade)`を実装し、エクスポートする
2. 関数は以下のプロパティとメソッドを持つオブジェクトを返す：
   - プロパティ: `name`, `age`, `grade`, `subjects`（履修科目の配列、初期値は空配列）
   - メソッド:
     - `introduce()`: 自己紹介文を返す
     - `addSubject(subject)`: 履修科目を追加する
     - `getSubjects()`: 履修科目の一覧を返す
     - `haveBirthday()`: 年齢を1つ増やし、お祝いメッセージを返す
3. 複数の学生オブジェクトを作成し、各メソッドの動作を確認する

**テスト実行方法：**
```bash
deno test docs/07/work/create-student.test.js
```

### 課題4: ネストされたオブジェクトの操作

`docs/07/work/user-profile.js`ファイルを作成し、`docs/07/work/user-profile.test.js`のテストがすべてパスするようにしてください：

1. ユーザープロフィールオブジェクト`userProfile`を作成し、エクスポートする：
   - 基本情報: `username`, `email`
   - 個人情報（ネストされたオブジェクト）: `personalInfo`
     - `firstName`, `lastName`, `age`, `birthday`
   - 住所情報（ネストされたオブジェクト）: `address`
     - `country`, `prefecture`, `city`, `zipCode`
   - 設定情報（ネストされたオブジェクト）: `settings`
     - `theme`, `language`, `notifications`
2. 以下のメソッドを実装する：
   - `getFullName()`: フルネームを返す
   - `getFullAddress()`: 完全な住所を返す
   - `updateEmail(newEmail)`: メールアドレスを更新する
   - `toggleNotifications()`: 通知設定をオン/オフ切り替える
3. ネストされたプロパティの取得・変更を行う

**テスト実行方法：**
```bash
deno test docs/07/work/user-profile.test.js
```

### 課題5: 商品管理システム

`docs/07/work/product-manager.js`ファイルを作成し、`docs/07/work/product-manager.test.js`のテストがすべてパスするようにしてください：

1. 商品管理システムオブジェクト`productManager`を作成し、エクスポートする：
   - プロパティ: `products`（商品の配列）、`nextId`（次の商品ID）
   - 各商品は`id`, `name`, `price`, `stock`, `category`を持つオブジェクト
2. 以下のメソッドを実装する：
   - `addProduct(name, price, stock, category)`: 新しい商品を追加
   - `findProduct(id)`: IDで商品を検索
   - `updatePrice(id, newPrice)`: 商品の価格を更新
   - `addStock(id, quantity)`: 在庫を追加
   - `sellProduct(id, quantity)`: 商品を販売（在庫を減らす）
   - `getProductsByCategory(category)`: カテゴリ別の商品一覧を取得
   - `getTotalValue()`: 全商品の総価値を計算
3. 複数の商品を追加し、各機能の動作を確認する

**テスト実行方法：**
```bash
deno test docs/07/work/product-manager.test.js
```

### 課題6: 図書館システム（総合課題）

`docs/07/work/library-system.js`ファイルを作成し、`docs/07/work/library-system.test.js`のテストがすべてパスするようにしてください：

1. 図書館システムオブジェクト`librarySystem`を作成し、エクスポートする：
   - プロパティ: `books`（本の配列）、`members`（会員の配列）、`loans`（貸出記録の配列）
   - 各本は`id`, `title`, `author`, `isbn`, `available`を持つ
   - 各会員は`id`, `name`, `email`, `joinDate`を持つ
   - 各貸出記録は`bookId`, `memberId`, `loanDate`, `returnDate`を持つ
2. 以下のメソッドを実装する：
   - `addBook(title, author, isbn)`: 新しい本を追加
   - `addMember(name, email)`: 新しい会員を追加
   - `lendBook(bookId, memberId)`: 本を貸し出す
   - `returnBook(bookId, memberId)`: 本を返却する
   - `findAvailableBooks()`: 利用可能な本の一覧を取得
   - `getMemberLoans(memberId)`: 会員の貸出履歴を取得
   - `getOverdueBooks()`: 延滞中の本を取得（貸出から30日経過）
3. 実際に本と会員を追加し、貸出・返却の動作を確認する

**テスト実行方法：**
```bash
deno test docs/07/work/library-system.test.js
```

## まとめ

- オブジェクトは関連するデータ（プロパティ）と機能（メソッド）をひとまとめにしたデータ構造
- オブジェクトリテラル`{}`を使用してオブジェクトを作成できる
- プロパティへのアクセスにはドット記法（`object.property`）とブラケット記法（`object["property"]`）がある
- メソッドはオブジェクト内で定義された関数で、`this`キーワードでオブジェクト自身を参照できる
- オブジェクトはネストすることができ、複雑なデータ構造を表現できる
- 関数とオブジェクトを組み合わせることで、再利用可能で保守しやすいコードを書ける
- `Object.keys()`, `Object.values()`, `Object.entries()`などの組み込みメソッドでオブジェクトを効率的に操作できる

> [!IMPORTANT]
> オブジェクトはJavaScriptプログラミングの中核となる概念です。
> 現実世界の概念をプログラムで表現する際に、オブジェクトを適切に設計することで、理解しやすく保守しやすいコードを書くことができます。
> 次回の授業では、配列の基本操作について学習します。
