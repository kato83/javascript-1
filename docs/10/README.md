# JavaScript パッケージとライブラリの利用

## パッケージとライブラリとは

**パッケージ**と**ライブラリ**は、他の開発者が作成した便利な機能をまとめたコードの集合体です。これらを利用することで、一から全てのコードを書く必要がなくなり、開発効率を大幅に向上させることができます。

### 日常生活での例え

パッケージやライブラリは、日常生活でいう「既製品」や「道具」のようなものです：

- **料理での例**: 
  - 一から出汁を取る代わりに、市販の出汁パックを使用する
  - 小麦粉から麺を作る代わりに、市販の麺を購入する
- **工作での例**:
  - 木材を一から切り出す代わりに、ホームセンターで加工済みの木材を購入する
  - ネジや釘などの部品を既製品として利用する

プログラミングでも同様に、よく使われる機能（日付の計算、データの変換、ファイルの操作など）を他の開発者が作成したパッケージを利用することで、効率的に開発を進めることができます。

### パッケージとライブラリの違い

- **ライブラリ**: 特定の機能を提供するコードの集合（例：数学計算、日付操作）
- **パッケージ**: ライブラリを配布・管理するための仕組み（ライブラリを含む配布単位）

実際の開発では、この2つの用語はほぼ同じ意味で使われることが多いです。

## なぜパッケージ・ライブラリが重要なのか

### 開発効率の向上

```js
// ライブラリを使わない場合：日付の差を計算する複雑なコード
function calculateDaysBetween(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // 1日のミリ秒数
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);
  
  // タイムゾーンやうるう年の考慮が必要
  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  return diffDays;
}

// さらに複雑な日付操作（月末日の計算、営業日の計算など）を
// 一から実装するのは非常に困難...
```

```js
// ライブラリを使った場合：シンプルで信頼性の高いコード
import dayjs from "npm:dayjs@1.11.10";

const date1 = dayjs("2024-01-01");
const date2 = dayjs("2024-01-15");

// 日付の差を計算
const daysDiff = date2.diff(date1, "day");
console.log(`日数の差: ${daysDiff}日`); // 日数の差: 14日

// 日付の加算
const futureDate = date1.add(5, "day");
console.log(`5日後: ${futureDate.format("YYYY-MM-DD")}`);

// 日付のフォーマット
const formattedDate = dayjs().format("YYYY年MM月DD日");
console.log(formattedDate); // 2024年01月18日
```

### 品質と信頼性

- **テスト済み**: 多くの開発者によってテストされ、バグが修正されている
- **最適化**: パフォーマンスが最適化されている
- **標準化**: 業界標準の方法で実装されている
- **メンテナンス**: 継続的にアップデートされ、セキュリティ問題も修正される

### 開発コストの削減

```js
// 例：CSVファイルの解析を一から実装する場合
// - カンマ区切りの処理
// - 引用符内のカンマの処理
// - 改行文字の処理
// - エスケープ文字の処理
// - エラーハンドリング
// など、数百行のコードが必要

// ライブラリを使用した場合
import { parse } from "npm:csv-parse@5.5.2/sync";

const csvText = `名前,年齢,職業
山田太郎,25,エンジニア
佐藤花子,30,デザイナー`;

const data = parse(csvText, {
  columns: true, // ヘッダー行をキーとして使用
  skip_empty_lines: true
});

console.log(data);
// [
//   { 名前: "山田太郎", 年齢: "25", 職業: "エンジニア" },
//   { 名前: "佐藤花子", 年齢: "30", 職業: "デザイナー" }
// ]
```

## Denoでのパッケージ管理

**Deno**では、パッケージの管理が従来のNode.jsとは異なる方法で行われます。Denoの特徴的なパッケージ管理システムについて学習しましょう。

### Denoのaddコマンド

Denoでは、パッケージを deno コマンドを用いて追加してコード上でインポートできるようにします。

```
> deno add [プロトコル（パッケージレジストリ）]:[パッケージ名]
> deno add jsr:@std/http
> deno add npm:dayjs
```

コード上で `import [使用する機能] from "[パッケージ名]";` で呼び出せます。

```js
// @std/http パッケージでエクスポートされてる `serveDir` をインポート
import { serveDir } from "@std/http";
// dayjs パッケージでエクスポートされている default（≒パッケージ全体）をインポート
import dayjs from "dayjs";

// 使用例
const formattedDate = dayjs().format("YYYY年MM月DD日");
console.log(formattedDate); // 2024年01月18日
```

### 主要なパッケージレジストリ

#### 1. Deno Standard Library (std)

Denoの**標準ライブラリ**で、基本的な機能が提供されています：

以下のソースコードは事前に以下コマンドによってパッケージを追加し、利用することが出来ます。

```
> deno add jsr:@std/fs
> deno add jsr:@std/http
> deno add jsr:@std/csv
> deno add jsr:@std/datetime
```

```js
// ファイル操作
import { move, copy } from "@std/fs";

// HTTP関連
import { serveDir } from "@std/http";

// CSV操作
import { parse } from "@std/csv";

// 日付操作
import { dayOfYear, isLeap, difference, HOUR, MINUTE, SECOND } from "@std/datetime";
```

#### 2. npm: specifier（npmパッケージの利用）

Node.jsのnpmパッケージも利用できます：

以下のソースコードは事前に以下コマンドによってパッケージを追加し、利用することが出来ます。

```
> deno add npm:lodash
> deno add npm:axios
```

```js
// npmパッケージを利用
import lodash from "lodash";
import axios from "axios";

// 使用例
const numbers = [1, 2, 3, 4, 5];
const doubled = lodash.map(numbers, n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

## ライブラリドキュメント参照

このセクションでは、本章で使用する各ライブラリの公式ドキュメントやリソースへのリンクを提供します。実装前にこれらのドキュメントを確認することで、ライブラリの機能や使用方法をより深く理解できます。

### 1. Day.js（日付操作ライブラリ）
- **npm**: [npmjs.com/package/dayjs](https://www.npmjs.com/package/dayjs)
- **GitHub**: [github.com/iamkun/dayjs](https://github.com/iamkun/dayjs)
- **公式ドキュメント**: [day.js.org](https://day.js.org/)

### 2. Lodash（ユーティリティライブラリ）
- **npm**: [npmjs.com/package/lodash](https://www.npmjs.com/package/lodash)
- **GitHub**: [github.com/lodash/lodash](https://github.com/lodash/lodash)
- **公式ドキュメント**: [lodash.com](https://lodash.com/)

### 3. Zod（バリデーションライブラリ）
- **npm**: [npmjs.com/package/zod](https://www.npmjs.com/package/zod)
- **GitHub**: [github.com/colinhacks/zod](https://github.com/colinhacks/zod)
- **公式ドキュメント**: [zod.dev](https://zod.dev/)

### 4. Deno Standard Library - UUID
- **JSR**: [jsr.io/@std/uuid](https://jsr.io/@std/uuid)
- **GitHub**: [github.com/denoland/std/tree/main/uuid](https://github.com/denoland/std/tree/main/uuid)

### 5. Deno Standard Library - CSV
- **JSR**: [jsr.io/@std/csv](https://jsr.io/@std/csv)
- **GitHub**: [github.com/denoland/std/tree/main/csv](https://github.com/denoland/std/tree/main/csv)

### 6. Deno Standard Library - File System
- **JSR**: [jsr.io/@std/fs](https://jsr.io/@std/fs)
- **GitHub**: [github.com/denoland/std/tree/main/fs](https://github.com/denoland/std/tree/main/fs)

### 7. Deno Standard Library - HTTP
- **JSR**: [jsr.io/@std/http](https://jsr.io/@std/http)
- **GitHub**: [github.com/denoland/std/tree/main/http](https://github.com/denoland/std/tree/main/http)

### ドキュメント活用のポイント

1. **API リファレンス**: 各関数やメソッドの詳細な使用方法
2. **サンプルコード**: 実際の使用例とベストプラクティス
3. **型定義**: TypeScriptでの型情報（特にZodやDeno標準ライブラリ）
4. **変更履歴**: バージョン間の変更点や非推奨機能
5. **コミュニティ**: GitHubのIssuesやDiscussionsでの質問・回答

> [!TIP]
> 実装を始める前に、使用予定のライブラリのドキュメントを一通り眺めることで、効率的な実装が可能になります。特にサンプルコードセクションは実装の参考になります。

## よく使用されるライブラリの紹介

### 1. 日付操作ライブラリ（dayjs）

日付の操作を簡単に行うためのライブラリです：

`deno add npm:dayjs` によるパッケージ追加が必要になります。

```js
import dayjs from "dayjs";

const date1 = dayjs("2024-01-01");
const date2 = dayjs("2024-01-15");

// 日付の差を計算
const daysDiff = date2.diff(date1, "day");
console.log(`日数の差: ${daysDiff}日`); // 日数の差: 14日

// 日付の加算
const futureDate = date1.add(5, "day");
console.log(`5日後: ${futureDate.format("YYYY-MM-DD")}`);

// 日付のフォーマット
const formattedDate = dayjs().format("YYYY年MM月DD日");
console.log(formattedDate); // 2026年01月19日
```

### 2. ユーティリティライブラリ（Lodash）

配列やオブジェクトの操作を簡単にするライブラリです：

`deno add npm:lodash` によるパッケージ追加が必要になります。

```js
import _ from "lodash";

// 配列操作
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 配列をグループ化
const grouped = _.groupBy(numbers, n => n % 2 === 0 ? "even" : "odd");
console.log(grouped); // { odd: [1, 3, 5, 7, 9], even: [2, 4, 6, 8, 10] }

// 配列をチャンク（指定サイズに分割）
const chunked = _.chunk(numbers, 3);
console.log(chunked); // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]

// 配列から重複を削除
const duplicates = [1, 2, 2, 3, 3, 3, 4];
const unique = _.uniq(duplicates);
console.log(unique); // [1, 2, 3, 4]

// オブジェクト操作
const users = [
  { name: "Alice", age: 25, department: "Engineering" },
  { name: "Bob", age: 30, department: "Sales" },
  { name: "Charlie", age: 35, department: "Engineering" }
];

// 特定のプロパティでソート
const sortedByAge = _.sortBy(users, "age");
console.log(sortedByAge);

// 特定のプロパティでグループ化
const byDepartment = _.groupBy(users, "department");
console.log(byDepartment);

// 特定のプロパティの値のみを抽出
const names = _.map(users, "name");
console.log(names); // ["Alice", "Bob", "Charlie"]

// 条件に一致する要素を検索
const engineer = _.find(users, { department: "Engineering" });
console.log(engineer); // { name: "Alice", age: 25, department: "Engineering" }
```

### 3. バリデーションライブラリ（Zod）

データの検証を行うためのライブラリです：

`deno add npm:zod` によるパッケージ追加が必要になります。

```js
import * as z from "zod";

// ユーザー情報のスキーマ定義
const UserSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  age: z.number().min(0, "年齢は0以上である必要があります").max(
    150,
    "年齢は150以下である必要があります",
  ),
  email: z.string().email("有効なメールアドレスを入力してください"),
  phone: z.string().refine(
    (value) => {
      // 電話番号の形式をチェック（XXX-XXXX-XXXX）
      const parts = value.split('-');
      if (parts.length !== 3) return false;
      if (parts[0].length !== 2 && parts[0].length !== 3 && parts[0].length !== 4) return false;
      if (parts[1].length !== 2 && parts[1].length !== 3 && parts[1].length !== 4) return false;
      if (parts[2].length !== 2 && parts[2].length !== 3 && parts[2].length !== 4) return false;
      // 各部分が数字のみかチェック
      return parts.every(part => {
        for (let i = 0; i < part.length; i++) {
          const char = part[i];
          if (char !== '0' &&
              char !== '1' &&
              char !== '2' &&
              char !== '3' &&
              char !== '4' &&
              char !== '5' &&
              char !== '6' &&
              char !== '7' &&
              char !== '8' &&
              char !== '9'
          ) {
            return false;
          }
        }
        return true;
      });
    },
    "電話番号の形式が正しくありません（XXX-XXXX-XXXX）",
  ),
});

// データの検証
function validateUser(userData) {
  try {
    const validatedUser = UserSchema.parse(userData);
    return { success: true, data: validatedUser };
  } catch (error) {
    return { success: false, errors: error.errors };
  }
}

// 正常なデータ
const validUser = {
  name: "山田太郎",
  age: 25,
  email: "yamada@example.com",
  phone: "090-1234-5678",
};

const result1 = validateUser(validUser);
console.log(result1); // { success: true, data: { ... } }

// 不正なデータ
const invalidUser = {
  name: "",
  age: -5,
  email: "invalid-email",
  phone: "090-1234",
};

const result2 = validateUser(invalidUser);
console.log(result2); // { success: false, errors: [...] }

// 商品情報のスキーマ
const ProductSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  price: z.number().positive(),
  category: z.enum(["electronics", "clothing", "books", "food"]),
  inStock: z.boolean(),
  tags: z.array(z.string()).optional(),
});

// 商品データの検証
const productData = {
  id: 1,
  name: "ノートパソコン",
  price: 89800,
  category: "electronics",
  inStock: true,
  tags: ["computer", "laptop", "work"],
};

const productResult = ProductSchema.safeParse(productData);
if (productResult.success) {
  console.log("商品データは有効です:", productResult.data);
} else {
  console.log("商品データにエラーがあります:", productResult.error.errors);
}
```

### 4. UUID生成ライブラリ

一意識別子（UUID）を生成するためのライブラリです：

`deno add jsr:@std/uuid` の実行でUUIDを扱うパッケージを利用可能になります。

```js
import { v1, v7 } from "@std/uuid";

// ランダムUUID（v7）の生成
const randomId = v7.generate();
console.log("ランダムUUID:", randomId); // 例: 019bd001-3ed8-7de2-bb6c-96d2686c482d

// タイムスタンプベースUUID（v1）の生成
const timestampId = v1.generate();
console.log("タイムスタンプUUID:", timestampId);

// 実用例：ユーザー管理システム
class UserManager {
  constructor() {
    this.users = [];
  }

  createUser(name, email) {
    const user = {
      id: v7.generate(),
      name: name,
      email: email,
      createdAt: new Date().toISOString(),
    };

    this.users.push(user);
    return user;
  }

  findUserById(id) {
    return this.users.find((user) => user.id === id);
  }

  getAllUsers() {
    return this.users;
  }
}

// 使用例
const userManager = new UserManager();

const user1 = userManager.createUser("山田太郎", "yamada@example.com");
const user2 = userManager.createUser("佐藤花子", "sato@example.com");

console.log("作成されたユーザー:", user1);
console.log("全ユーザー:", userManager.getAllUsers());
console.log("ユーザー検索:", userManager.findUserById(user1.id));
```

### 5. CSVファイル操作ライブラリ

CSVファイルの読み書きを行うためのライブラリです：

`deno add jsr:@std/csv` の実行でカンマ区切りのデータフォーマット（CSV）を扱うパッケージを利用可能になります。

```js
import { parse, stringify } from "@std/csv";

// CSVデータの解析
const csvText = `名前,年齢,職業,給与
山田太郎,25,エンジニア,500000
佐藤花子,30,デザイナー,450000
田中次郎,35,マネージャー,600000`;

// CSVを配列に変換
const records = parse(csvText, {
  skipFirstRow: true, // ヘッダー行をスキップ
});

console.log("CSVデータ:", records);
// [
//   ["山田太郎", "25", "エンジニア", "500000"],
//   ["佐藤花子", "30", "デザイナー", "450000"],
//   ["田中次郎", "35", "マネージャー", "600000"]
// ]

// オブジェクト形式で解析
const objectRecords = parse(csvText, {
  skipFirstRow: false,
  columns: ["name", "age", "job", "salary"],
});

console.log("オブジェクト形式:", objectRecords);

// データをCSV形式に変換
const employees = [
  { name: "高橋美咲", age: 28, job: "営業", salary: 480000 },
  { name: "鈴木一郎", age: 32, job: "開発", salary: 520000 },
];

// オブジェクトの配列をCSVに変換
const csvOutput = stringify(employees, {
  columns: ["name", "age", "job", "salary"],
});

console.log("CSV出力:");
console.log(csvOutput);
// name,age,job,salary
// 高橋美咲,28,営業,480000
// 鈴木一郎,32,開発,520000
```

## パッケージ選択の指針

### 1. 信頼性の確認

#### パッケージの信頼性を確認するポイント

1. GitHub スター数
2. ダウンロード数
3. 最終更新日
4. メンテナーの活動状況
5. ドキュメントの充実度
6. テストカバレッジ

### 2. ライセンスの確認

#### 主要なオープンソースライセンス

- MIT License: 商用利用可能、制限が少ない
- Apache License 2.0: 商用利用可能、特許保護あり
- BSD License: 商用利用可能、シンプル
- GPL: オープンソース化が必要（商用利用時は注意）

## 実習課題

### 課題1: 日付操作ライブラリの活用

`docs/10/work/date-library.js`ファイルを作成し、`docs/10/work/date-library.test.js`のテストがすべてパスするようにしてください：

1. npmレジストリのdayjsライブラリを使用して以下の関数を実装し、エクスポートする：
   - `formatJapaneseDate(date)`: 日付を「2024年01月18日」形式で表示
   - `getBusinessDaysUntil(targetDate)`: 今日から指定日までの営業日数を計算
   - `getNextMonthEnd()`: 来月末の日付を取得
   - `isHoliday(date)`: 指定日が土日かどうかを判定
   - `getQuarterInfo(date)`: 指定日の四半期情報を取得
   - `calculateAge(birthDate)`: 生年月日から現在の年齢を計算
   - `getWeekRange(date)`: 指定日が含まれる週の開始日と終了日を取得

**テスト実行方法：**
```bash
deno test docs/10/work/date-library.test.js
```

### 課題2: データ処理ライブラリの活用

`docs/10/work/data-processing.js`ファイルを作成し、`docs/10/work/data-processing.test.js`のテストがすべてパスするようにしてください：

1. npmレジストリのLodashライブラリを使用して以下の関数を実装し、エクスポートする：
   - `analyzeEmployees(employees)`: 従業員データを分析（部署別集計、平均年齢など）
   - `processOrders(orders)`: 注文データを処理（顧客別集計、売上分析など）
   - `optimizeInventory(products)`: 在庫データを最適化（カテゴリ別整理、低在庫アラートなど）
   - `generateReport(data, groupBy)`: 指定したキーでデータをグループ化してレポート生成
   - `findTopPerformers(salesData, metric)`: 指定した指標でトップパフォーマーを抽出
   - `cleanDataset(rawData)`: データセットのクリーニング（重複削除、欠損値処理など）

**テスト実行方法：**
```bash
deno test docs/10/work/data-processing.test.js
```

### 課題3: バリデーションライブラリの活用

`docs/10/work/validation-system.js`ファイルを作成し、`docs/10/work/validation-system.test.js`のテストがすべてパスするようにしてください：

1. npmレジストリのZodライブラリを使用して以下の機能を実装し、エクスポートする：
   - `validateUserRegistration(userData)`: ユーザー登録データの検証
   - `validateProductData(productData)`: 商品データの検証
   - `validateOrderData(orderData)`: 注文データの検証
   - `createCustomValidator(schema)`: カスタムバリデーター関数の作成
   - `validateBulkData(dataArray, schema)`: 配列データの一括検証
   - `sanitizeInput(input, schema)`: 入力データのサニタイズ

**テスト実行方法：**
```bash
deno test docs/10/work/validation-system.test.js
```

### 課題4: CSV処理システム

`docs/10/work/csv-processor.js`ファイルを作成し、`docs/10/work/csv-processor.test.js`のテストがすべてパスするようにしてください：

1. 標準ライブラリ（jsrのstd）のCSV操作ライブラリを使用して以下の機能を実装し、エクスポートする：
   - `parseEmployeeCsv(csvText)`: 従業員CSVデータの解析
   - `generateSalesReport(salesData)`: 売上データからCSVレポートを生成
   - `mergeCustomerData(customerCsv, orderCsv)`: 顧客データと注文データの結合
   - `filterCsvData(csvText, filterCondition)`: CSVデータのフィルタリング
   - `aggregateCsvData(csvText, groupByColumn, aggregateColumn)`: CSVデータの集計
   - `validateCsvFormat(csvText, expectedHeaders)`: CSVフォーマットの検証

**テスト実行方法：**
```bash
deno test docs/10/work/csv-processor.test.js
```

## まとめ

- パッケージとライブラリは開発効率を大幅に向上させる重要なツール
- Denoでは URL-based imports を使用してパッケージを管理する
- 標準ライブラリ（std）、サードパーティ（jsr, npm）パッケージが利用可能
- Import Map を使用することで長いURLを短縮できる
- 日付操作、データ処理、バリデーション、CSV操作など、様々な用途のライブラリが存在
- ライブラリ選択時は信頼性、ライセンス、パフォーマンスを考慮する
- バージョン管理、エラーハンドリング、依存関係の最小化がベストプラクティス
- 複数のライブラリを組み合わせることで、より複雑で実用的なアプリケーションを構築できる

> [!IMPORTANT]
> パッケージとライブラリの活用は、現代のソフトウェア開発において必須のスキルです。
> 適切なライブラリを選択し、効果的に活用することで、高品質なアプリケーションを効率的に開発できます。
> 次回の授業では、I/O処理、CLI、ファイル、SQLiteについて学習します。

> [!NOTE]
> 本授業で紹介したライブラリは一例です。実際の開発では、プロジェクトの要件に応じて最適なライブラリを選択することが重要です。
> また、ライブラリのバージョンアップデートにも注意を払い、セキュリティパッチや新機能を適切に取り入れることを心がけてください。
