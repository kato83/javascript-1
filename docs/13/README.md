# Deno + SQLite + フロントエンド TODO アプリ

## 今日のゴール

- Deno.serve で API サーバーを立てる
- SQLite3 で TODO を永続化する
- fetch API で CRUD を実装する
- `jsr:@std/http` で静的ファイルを配信する

## 今回の構成

```
docs/13/work/
├─ server.js
└─ public/
   ├─ index.html
   ├─ styles.css
   └─ app.js
```

- **server.js**: API と静的配信をまとめる
- **public/**: フロントエンド（HTML/CSS/JS）

> [!NOTE]
> ### 今回模範解答をAIに作成してもらった際のプロンプト
> 
> ```
> 今回はDenoでSQLite3とDeno.serveを使ってTODOアプリケーションを作る実践アプリケーション実装をやろうかと思います。
> また、Denoではなくフロントエンド側のJSも書いてもらおうかと思います（今までサーバーサイドのJSしか触ったこと無いです）。
> 
> TODOアプリケーションはfetch APIでTODOのCRUD処理通信をするイメージです。
> 
> フロントエンドのHTML, CSS, JSはjsr:@std/httpを使うイメージです。
> 以下を参考に。
> https://qiita.com/aKuad/items/6ea37f01db7eb8d2ad4e.md
> ```

## API 設計（シンプル版）

| 方法 | パス | 役割 |
| --- | --- | --- |
| GET | /api/todos | TODO 一覧取得 |
| POST | /api/todos | TODO 新規作成 |
| PUT | /api/todos/:id | TODO 更新 |
| DELETE | /api/todos/:id | TODO 削除 |

## サンプル実装（Deno + SQLite）

`docs/13/work/server.js` を作成して以下を実装していきます（今回は写経）。

ポイント：
- `node:sqlite` で DB を読み書き
- `jsr:@std/http/file-server` の `serveDir()` で public を配信
- API の JSON レスポンスは `application/json`

```js
import { serveDir } from "jsr:@std/http/file-server";
import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("docs/13/work/todo.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0
  );
`);

Deno.serve({ port: 8000 }, async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/api/todos") {
    // GET/POST を実装
  }

  // 静的ファイル配信
  return serveDir(request, { fsRoot: "docs/13/work/public" });
});
```

## フロントエンド（fetch API）

`docs/13/work/public/app.js` の基本イメージです。

```js
const response = await fetch("/api/todos");
const todos = await response.json();

await fetch("/api/todos", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ title: "買い物" })
});
```

**ポイント**
- `fetch` 関数でHTTP通信を送って受け取ることが出来る
  - [フェッチ API - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API)
- `content-type` を JSON にする
- 更新は `PUT /api/todos/:id`
- 削除は `DELETE /api/todos/:id`

## 実行方法

**1. サーバー起動**

```bash
deno run --allow-net --allow-read --allow-write docs/13/work/server.js
# もしくは
deno run --allow-all docs/13/work/server.js
```

**2. ブラウザでアクセス**

```
http://localhost:8000
```

## 実習課題

### 課題1: フロントエンド強化

- 完了済み TODO を薄く表示
- フィルター（全て / 未完了 / 完了）を追加
- 編集ボタンでタイトルを更新

### 課題2: サーバー側の拡張

- 期限（due_date）カラムを追加
- ソート（作成日時 / 期限）を実装
- `GET /api/todos?done=1` などの絞り込み

## 授業の総括（最後の回なので）

### 1. プログラミング言語を覚えるメリット

- **考え方を増やせる**（データの扱い方、抽象化の視点）
- **ツールを組み合わせられる**（API / DB / UI を自分で繋げられる）
- **学び直しが早くなる**（1言語覚えると次が速い）

### 2. プログラミング言語を覚えるコツ

- **小さくアプリを作る**
- **エラーと向き合う**（エラー内容を翻訳すれば大抵は解決する）
- **名前は設計**（読めるコードは強い）
- **調べる力は才能**（鍛えられる）

### 3. エディタを使いこなすメリット

- **作業が速くなる**（検索・置換・複数ファイル編集）
- **ミスが減る**（自動補完・Lint・フォーマッタ）
- **思考が止まりにくい**（手が止まらず、実装に集中できる）

### 4. パターンを掴んだ後の成長曲線

- 最初は「知らないことの壁」
- ある時点から「構造が見えてくる」
- パターン化できると、**新しい技術が早く吸収できる**

### 5. 未来を見据えて

- これからは **AI を使っても人が判断する力が必要**
- 「作れる人」は、**要件・品質・体験**まで考えられる
- 小さくても「動くもの」を作る経験が一番の資産
