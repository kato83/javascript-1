# JavaScript 条件分岐処理と比較演算子

## 条件分岐とは

**条件分岐**とは、プログラムの実行中に特定の条件に基づいて異なる処理を行うための仕組みです。「もし〇〇ならば××する、そうでなければ△△する」というような判断をプログラムで表現できます。

日常生活でも私たちは常に条件分岐を行っています：
- 「雨が降っていたら傘を持っていく、そうでなければ持っていかない」
- 「お金が1000円以上あれば映画を見に行く、そうでなければ家で過ごす」

プログラミングでも同様に、条件に応じて処理を変えることで、柔軟なプログラムを作ることができます。

## 比較演算子

条件分岐を行うためには、まず「条件」を表現する必要があります。条件は主に**比較演算子**を使って表現します。

### 基本的な比較演算子

| 演算子 | 意味 | 例 | 結果 |
|-------|------|-----|------|
| `==` | 等しい（値のみ比較） | `5 == "5"` | `true` |
| `===` | 厳密に等しい（値と型を比較） | `5 === "5"` | `false` |
| `!=` | 等しくない（値のみ比較） | `5 != "6"` | `true` |
| `!==` | 厳密に等しくない（値と型を比較） | `5 !== "5"` | `true` |
| `>` | より大きい | `10 > 5` | `true` |
| `<` | より小さい | `10 < 5` | `false` |
| `>=` | 以上（より大きいか等しい） | `10 >= 10` | `true` |
| `<=` | 以下（より小さいか等しい） | `5 <= 10` | `true` |

> [!IMPORTANT]
> JavaScriptでは、`==`（等価演算子）と`===`（厳密等価演算子）の違いに注意が必要です。
> - `==` は値のみを比較し、必要に応じて型変換を行います
> - `===` は値と型の両方を比較し、型変換は行いません
> 
> 一般的には、予期しない型変換による問題を避けるため、`===`（厳密等価演算子）の使用が推奨されています。

### 比較演算子の使用例

```js
// 数値の比較
console.log(10 > 5);        // true
console.log(10 < 5);        // false
console.log(10 >= 10);      // true
console.log(5 <= 10);       // true

// 等価比較
console.log(10 == 10);      // true
console.log(10 == "10");    // true（型変換が行われる）
console.log(10 === "10");   // false（型が異なる）
console.log(10 != 5);       // true
console.log(10 != "10");    // false（型変換が行われる）
console.log(10 !== "10");   // true（型が異なる）

// 文字列の比較（辞書順）
console.log("apple" < "banana");  // true（アルファベット順）
console.log("apple" > "Apple");   // true（小文字は大文字より大きい）
```

## if文による条件分岐

JavaScriptでは、`if`文を使って条件分岐を実装します。

### 基本的なif文

```js
if (条件) {
  // 条件が true の場合に実行される処理
}
```

例：

```js
const age = 20;

if (age >= 20) {
  console.log("成人です");
}
```

### if-else文

条件が`false`の場合に別の処理を行いたい場合は、`else`を使います：

```js
if (条件) {
  // 条件が true の場合に実行される処理
} else {
  // 条件が false の場合に実行される処理
}
```

例：

```js
const age = 18;

if (age >= 20) {
  console.log("成人です");
} else {
  console.log("未成年です");
}
```

### if-else if-else文

複数の条件を順番に確認したい場合は、`else if`を使います：

```js
if (条件1) {
  // 条件1が true の場合に実行される処理
} else if (条件2) {
  // 条件1が false で、条件2が true の場合に実行される処理
} else if (条件3) {
  // 条件1と条件2が false で、条件3が true の場合に実行される処理
} else {
  // すべての条件が false の場合に実行される処理
}
```

例：

```js
const score = 85;

if (score >= 90) {
  console.log("評価: A");
} else if (score >= 80) {
  console.log("評価: B");
} else if (score >= 70) {
  console.log("評価: C");
} else if (score >= 60) {
  console.log("評価: D");
} else {
  console.log("評価: F");
}
```

### ネストされたif文

if文の中に別のif文を入れることもできます：

```js
const age = 25;
const hasLicense = true;

if (age >= 18) {
  console.log("成人です");
  
  if (hasLicense) {
    console.log("運転免許を持っています");
  } else {
    console.log("運転免許を持っていません");
  }
} else {
  console.log("未成年です");
}
```

## 論理演算子

複数の条件を組み合わせるために、論理演算子を使用します。

### 基本的な論理演算子

| 演算子 | 意味 | 例 | 結果 |
|-------|------|-----|------|
| `&&` | AND（かつ）- 両方の条件が`true`の場合に`true` | `true && true` | `true` |
| `\|\|` | OR（または）- どちらかの条件が`true`の場合に`true` | `true \|\| false` | `true` |
| `!` | NOT（否定）- 条件の真偽を反転 | `!true` | `false` |

### 論理演算子の使用例

```js
const age = 25;
const hasLicense = true;

// AND演算子（&&）- 両方の条件がtrueの場合にtrue
if (age >= 18 && hasLicense) {
  console.log("車を運転できます");
}

// OR演算子（||）- どちらかの条件がtrueの場合にtrue
const isStudent = false;
const isSenior = false;

if (isStudent || isSenior) {
  console.log("割引が適用されます");
} else {
  console.log("通常料金です");
}

// NOT演算子（!）- 条件の真偽を反転
const isLoggedIn = false;

if (!isLoggedIn) {
  console.log("ログインしてください");
}
```

### 短絡評価（Short-circuit Evaluation）

論理演算子は左から右へ評価され、結果が確定した時点で評価を終了します。

- `&&`（AND）: 左側の式が`false`の場合、右側は評価されません
- `||`（OR）: 左側の式が`true`の場合、右側は評価されません

```js
// AND演算子の短絡評価
console.log(false && console.log("これは表示されません"));  // false

// OR演算子の短絡評価
console.log(true || console.log("これは表示されません"));   // true
```

この性質を利用して、条件付きで処理を実行することができます：

```js
// ユーザーが存在する場合のみ、名前を表示
const user = { name: "山田太郎" };
user && console.log(user.name);  // "山田太郎"

// デフォルト値の設定
const input = "";
const name = input || "名無し";
console.log(name);  // "名無し"
```

## switch文

複数の条件分岐がある場合、`if-else if`の代わりに`switch`文を使うと、コードが読みやすくなることがあります。

> [!NOTE]
> 基本的な `if` `else` `else if` を使いこなせるようになったら覚えよう。

### 基本的なswitch文

```js
switch (式) {
  case 値1:
    // 式 === 値1 の場合に実行される処理
    break;
  case 値2:
    // 式 === 値2 の場合に実行される処理
    break;
  case 値3:
    // 式 === 値3 の場合に実行される処理
    break;
  default:
    // どの case にも一致しない場合に実行される処理
}
```

> [!IMPORTANT]
> `switch`文では、`case`の後に`break`を書かないと、次の`case`の処理も実行されてしまいます（フォールスルー）。
> 意図的にフォールスルーを使う場合を除き、各`case`の最後には`break`を書くことを忘れないようにしましょう。

### switch文の使用例

```js
const day = new Date().getDay();  // 0（日曜）から6（土曜）の数値

switch (day) {
  case 0:
    console.log("日曜日");
    break;
  case 1:
    console.log("月曜日");
    break;
  case 2:
    console.log("火曜日");
    break;
  case 3:
    console.log("水曜日");
    break;
  case 4:
    console.log("木曜日");
    break;
  case 5:
    console.log("金曜日");
    break;
  case 6:
    console.log("土曜日");
    break;
  default:
    console.log("不明な曜日");
}
```

### 複数のcaseをまとめる

同じ処理を行う複数の`case`をまとめることもできます：

```js
const day = new Date().getDay();

switch (day) {
  case 0:
  case 6:
    console.log("週末です");
    break;
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    console.log("平日です");
    break;
  default:
    console.log("不明な曜日");
}
```

## 三項演算子（条件演算子）

シンプルな条件分岐を1行で書くための演算子です。

> [!NOTE]
> 基本的な `if` `else` `else if` を使いこなせるようになったら覚えよう。

### 基本的な三項演算子

```js
条件 ? 条件がtrueの場合の値 : 条件がfalseの場合の値
```

### 三項演算子の使用例

```js
// if-else文での書き方
let message;
if (age >= 20) {
  message = "成人です";
} else {
  message = "未成年です";
}

// 三項演算子での書き方
const message = age >= 20 ? "成人です" : "未成年です";
```

三項演算子は、変数に値を代入する際に特に便利です：

```js
const score = 85;
const result = score >= 60 ? "合格" : "不合格";
console.log(result);  // "合格"
```

### 三項演算子のネスト

三項演算子を入れ子にすることもできますが、可読性が低下するため注意が必要です：

```js
const score = 85;
const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F";
console.log(grade);  // "B"
```

> [!WARNING]
> 三項演算子のネストは可読性が低下するため、複雑な条件分岐には`if-else if-else`文や`switch`文を使用することをお勧めします。

## truthy値とfalsy値

JavaScriptでは、条件式に任意の値を使用できます。その際、値は自動的に真偽値（`true`または`false`）に変換されます。

### falsy値（偽と評価される値）

以下の値は条件式で`false`と評価されます：

- `false`
- `0`
- `-0`
- `0n`（BigInt）
- `""`（空文字列）
- `null`
- `undefined`
- `NaN`

### truthy値（真と評価される値）

falsy値以外のすべての値は`true`と評価されます。例えば：

- `true`
- 任意の数値（`0`以外）
- 任意の文字列（空文字列以外）
- `{}`（空のオブジェクト）
- `[]`（空の配列）

### truthy値とfalsy値の使用例

```js
// falsy値の例
if (0) {
  console.log("これは表示されません");
}

if ("") {
  console.log("これは表示されません");
}

if (null) {
  console.log("これは表示されません");
}

// truthy値の例
if (1) {
  console.log("これは表示されます");
}

if ("hello") {
  console.log("これは表示されます");
}

if ([]) {
  console.log("これは表示されます");
}

if ({}) {
  console.log("これは表示されます");
}
```

この性質を利用して、変数の存在チェックなどを簡潔に書くことができます：

```js
const name = "";
if (name) {
  console.log("名前: " + name);
} else {
  console.log("名前が設定されていません");
}
```

> [!TIP]
> ## prompt関数によるユーザー入力の取得
> 
> JavaScriptでは、`prompt()`関数を使用してユーザーからの入力を取得することができます。
> 
> ### 基本的な使い方
> 
> ```js
> const 変数名 = prompt(メッセージ, デフォルト値);
> ```
> 
> - `メッセージ`: ユーザーに表示する質問やメッセージ（文字列）
> - `デフォルト値`: （省略可能）入力欄に最初から表示される値
> 
> ### 戻り値（関数の処理が走って何を得られるか）
> 
> - ユーザーが入力した文字列
> - キャンセルボタンが押された場合は `null`
> 
> ### 使用例
> 
> ```js
> // 名前を尋ねる
> const name = prompt("あなたの名前を入力してください");
> console.log(`こんにちは、${name}さん！`);
> 
> // 年齢を尋ねる（数値として扱う場合は変換が必要）
> const ageStr = prompt("あなたの年齢を入力してください", "20");
> const age = Number(ageStr); // 文字列から数値への変換
> console.log(`あなたは${age}歳です。`);
> ```
> 
> ### 注意点
> 
> 1. **戻り値は常に文字列または null**
>    - 数値を扱いたい場合は、`Number()`関数などで変換する必要があります
>    - 例: `const age = Number(prompt("年齢を入力してください"));`
> 
> 2. **キャンセルされた場合の処理**
>    - ブラウザ上でユーザーがキャンセルボタンを押した場合、`null`が返されます
>    - Denoのコマンドライン上ではキャンセルボタンが無いので、入力無しでエンターキーを押下すると空文字が返却されます
>    - 例:
>    ```js
>    const input = prompt("何か入力してください");
>    if (input === null) {
>      console.log("キャンセルされました");
>    } else {
>      console.log(`入力値: ${input}`);
>    }
>    ```
> 
> 3. **ブラウザ環境でのみ動作**（例外あり）
>    - ~~`prompt()`はブラウザ環境でのみ動作します~~ Denoでも動作します
>    - Node.jsなどのサーバーサイド環境では使用できません（Denoでは動作します）
> 
> 4. **入力値の検証**
>    - ユーザー入力は常に検証することをお勧めします
>    - 例:
>    ```js
>    let score;
>    do {
>      const input = prompt("0〜100の点数を入力してください");
>      score = Number(input);
>    } while (isNaN(score) || score < 0 || score > 100);
>    console.log(`入力された点数: ${score}`);
>    ```

## 実習課題

### 課題1: 基本的な条件分岐

`docs/03/work/if-else.js`ファイルを作成し、以下の要件を満たすコードを書いてください：

1. 変数`temperature`に気温を表す数値を `prompt()` 関数を使って代入する
   - `prompt('気温（摂氏）の数値を入力してください');`（ヒント: 数値変換が必要）
2. 気温に応じて以下のメッセージを表示する
   - 30度以上: "暑いです"
   - 20度以上30度未満: "快適です"
   - 10度以上20度未満: "少し肌寒いです"
   - 10度未満: "寒いです"

### 課題2: 論理演算子の活用

`docs/03/work/logical-operators.js`ファイルを作成し、以下の要件を満たすコードを書いてください：

1. 変数`age`（年齢）と`isStudent`（学生かどうかのブール値）を `prompt()` 関数を使って定義する
   - `prompt('年齢を入力してください');`（ヒント: 数値変換が必要）
   - `prompt('学生ならyesと入力してください');`（ヒント: 論理値変換が必要）
2. 以下の条件に基づいて、映画館の入場料を計算し表示する
   - 基本料金: 1800円
   - 13歳未満: 1000円
   - 65歳以上: 1200円
   - 学生（13歳以上、65歳未満）: 1500円
   - 複数の割引が適用される場合は、最も安い料金を適用する

### 課題3: switch文の活用

`docs/03/work/switch.js`ファイルを作成し、以下の要件を満たすコードを書いてください：

1. 変数`month`に1〜12の数値（月）を代入する
   - `prompt('月（1～12）を入力してください')`（ヒント: 数値変換が必要）
2. `switch`文を使って、その月の日数を表示する
   - 31日ある月: 1, 3, 5, 7, 8, 10, 12月
   - 30日ある月: 4, 6, 9, 11月
   - 28または29日ある月: 2月（うるう年は考慮しなくてよい）

### 課題4: 三項演算子の活用

`docs/03/work/ternary.js`ファイルを作成し、以下の要件を満たすコードを書いてください：

1. 変数`score`に0〜100の数値（テストの点数）を代入する
   - `prompt('テストの点数（0～100）を入力してください')`（ヒント: 数値変換が必要）
2. 三項演算子を使って、60点以上なら"合格"、そうでなければ"不合格"と表示する
3. さらに三項演算子を使って、90点以上なら"優"、80点以上なら"良"、70点以上なら"可"、60点以上なら"可"、それ未満なら"不可"と表示する

## まとめ

- 条件分岐は、特定の条件に基づいて異なる処理を行うための仕組み
- 比較演算子（`==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`）を使って条件を表現する
- `if-else`文、`switch`文、三項演算子を使って条件分岐を実装できる
- 論理演算子（`&&`, `||`, `!`）を使って複数の条件を組み合わせることができる
- JavaScriptでは、条件式に任意の値を使用でき、自動的に真偽値に変換される

> [!IMPORTANT]
> 条件分岐はプログラミングの基本的な制御構造の一つです。
> 適切な条件分岐を使うことで、状況に応じて異なる処理を行う柔軟なプログラムを作ることができます。
