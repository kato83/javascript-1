# Deno SQLite3 と SQL 操作

## SQLite3 とは

**SQLite3** は、アプリに組み込んで使える軽量なデータベースです。外部サーバーを立てずに、1つのファイルにデータを保存できます。学習用途や小規模アプリ、ローカルでのデータ保存に最適です。

### MySQL とのざっくり比較

| 項目 | SQLite3 | MySQL |
| --- | --- | --- |
| 方式 | **ファイルベース**（組み込み型） | **サーバー型**（クライアント/サーバー） |
| セットアップ | ほぼ不要（ファイルを作るだけ） | サーバーのインストール・設定が必要 |
| 同時アクセス | 低〜中規模向き | 高い同時接続に強い |
| 使いどころ | 端末アプリ、学習、試作 | 大規模Webサービス、複数人運用 |

SQLite3 は「軽さ・手軽さ」が強み、MySQL は「同時接続と運用の安定性」が強みです。

## Deno で SQLite3 を使う

Deno v2.2 から **`node:sqlite`** が標準で使えるようになりました。追加のパッケージは不要です。

### 最小構成のサンプル

`docs/12/work/example/basic-sqlite.js` でファイル作成してください。

```js
import { DatabaseSync } from "node:sqlite";

// 1. DBを開く（無ければ作られる）
const db = new DatabaseSync("example.db");

// 2. テーブル作成
db.exec(`
  CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER
  );
`);

// 3. INSERT
db.prepare(`INSERT INTO people (name, age) VALUES (?, ?);`).run("Bob", 40);

// 4. SELECT
const rows = db.prepare("SELECT id, name, age FROM people").all();
console.log(rows);

// 5. 終了
db.close();
```

**実行方法：**
```bash
deno run --allow-read --allow-write docs/12/work/example/basic-sqlite.js
```

## SQL 操作の基本

### 1. CREATE（テーブル作成）

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  done INTEGER DEFAULT 0
);
```

### 2. INSERT（データ追加）

```sql
INSERT INTO tasks (title, done) VALUES ('SQL学習', 0);
```

### 3. SELECT（取得）

```sql
SELECT id, title, done FROM tasks WHERE done = 0;
```

### 4. UPDATE（更新）

```sql
UPDATE tasks SET done = 1 WHERE id = 1;
```

### 5. DELETE（削除）

```sql
DELETE FROM tasks WHERE id = 1;
```

## Deno での SQL 実装例（CRUD）

```js
import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("todo.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0
  );
`);

// Create
db.prepare("INSERT INTO todos (title, done) VALUES (?, ?)").run("買い物", 0);

// Read
const todos = db.prepare("SELECT id, title, done FROM todos").all();
console.log(todos);

// Update
db.prepare("UPDATE todos SET done = 1 WHERE id = ?").run(1);

// Delete
db.prepare("DELETE FROM todos WHERE id = ?").run(1);

db.close();
```

## 実習課題

### 課題1: SQLite 基本操作

`docs/12/work/basic-sqlite.js` を作成し、以下の操作を行うプログラムを作ってください：

1. `books` テーブル作成（id, title, author, price）
2. データを3件追加
3. すべての本を取得して表示
4. 1件の価格を更新
5. 1件を削除

**実行方法：**
```bash
deno run --allow-read --allow-write docs/12/work/basic-sqlite.js
```

### 課題2: 郵便番号検索プログラム

配布された `zip-code.js` を `docs/12/work/zip-code.js` に配置した後、コードの追記を行って住所検索プログラムを作成してください：  

1. `// TODO: ` から始まる箇所コメントを読み、実装をしてください
2. 時間が余ったら住所から郵便番号の候補を出す機能をつかしてください

必要に応じて以下のリンクを参考にしてください。

- [郵便番号データ（1レコード1行、UTF-8形式）の説明 - 日本郵便](https://www.post.japanpost.jp/zipcode/dl/utf-readme.html)
- [住所の郵便番号（1レコード1行、UTF-8形式）（CSV形式） - 日本郵便](https://www.post.japanpost.jp/zipcode/dl/utf-zip.html)

**実行方法：**
```bash
deno run --allow-read --allow-write docs/12/work/zip-code.js
```

> [!IMPORTANT]
> **まず初めに `郵便番号データのダウンロード: 1` を実行してください。**

## まとめ

- SQLite3 は **軽量・シンプル** なローカルDB
- MySQL は **サーバー型で同時接続に強い**
- Deno v2.2 から `node:sqlite` が標準で利用可能
- SQL の CRUD と集計は、Deno でもそのまま書ける

> [!IMPORTANT]
> SQLite3 は非常に便利ですが、高い同時書き込みが必要な用途では限界があります。
> 目的に応じて SQLite3 と MySQL を使い分ける視点が重要です。
