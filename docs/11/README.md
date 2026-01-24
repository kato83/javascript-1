# Deno HTTP サーバーとフォームデータ処理

## HTTPサーバーとは

**HTTPサーバー**は、インターネット上でWebページやデータを配信するためのプログラムです。私たちが普段使っているWebサイトは、すべてHTTPサーバーによって提供されています。

### HTTPの基本概念

- **リクエスト（Request）**: クライアント（ブラウザ）からサーバーへの要求
- **レスポンス（Response）**: サーバーからクライアントへの応答
- **URL**: インターネット上の住所のようなもの
- **HTTPメソッド**: 操作の種類（GET、POST、PUT、DELETEなど）

## なぜHTTPサーバーが重要なのか

### Webアプリケーションの基盤

- 従来の静的なWebページ
  - HTMLファイルをそのまま表示するだけ
- HTTPサーバーを使った動的なWebアプリケーション
  - ユーザーの入力に応じて内容が変わる
  - データベースと連携してデータを保存・取得
  - リアルタイムでデータを更新

### 実用的な活用例

- **ECサイト**: 商品の検索、カート機能、決済処理
- **SNS**: 投稿の作成・表示、いいね機能、コメント機能
- **業務システム**: 顧客管理、在庫管理、売上分析
- **学習管理システム**: 課題提出、成績管理、出席管理

## DenoでのHTTPサーバー構築

**Deno**では、標準ライブラリを使用して簡単にHTTPサーバーを構築できます。

### 基本的なHTTPサーバー

まず、最もシンプルなHTTPサーバーを作成してみましょう：

VSCodeのターミナルより以下コマンドを叩いてファイルを新規作成を行い、以下のコードを貼り付けて保存してください。

```text
> code docs\11\work\example\http-1.ts
```

```js
const server = Deno.serve({ port: 80 }, (request) => {
  return new Response("Hello, World!", {
    headers: { "content-type": "text/plain; charset=utf-8" }
  });
});

console.log("サーバーが起動しました: http://localhost:8000");
```

**実行方法：**
```text
> deno run --allow-net docs\11\work\example\http-1.ts
```

### URLパスに応じた処理

異なるURLパスに対して異なる処理を行う方法：

```js
const server = Deno.serve({ port: 8000 }, (request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // パスに応じて処理を分岐
  if (pathname === "/") {
    return new Response("ホームページです", {
      headers: { "content-type": "text/plain; charset=utf-8" }
    });
  } else if (pathname === "/about") {
    return new Response("このサイトについて", {
      headers: { "content-type": "text/plain; charset=utf-8" }
    });
  } else if (pathname === "/contact") {
    return new Response("お問い合わせページ", {
      headers: { "content-type": "text/plain; charset=utf-8" }
    });
  } else {
    return new Response("ページが見つかりません", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" }
    });
  }
});

console.log("サーバーが起動しました: http://localhost:8000");
```

### HTMLページの提供

実際のWebページ（HTML）を提供する方法：

```js
const server = Deno.serve({ port: 8000 }, (request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === "/") {
    const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>私のWebサイト</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        nav {
            text-align: center;
            margin: 20px 0;
        }
        nav a {
            margin: 0 15px;
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
        }
        nav a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>私のWebサイトへようこそ</h1>
        <nav>
            <a href="/">ホーム</a>
            <a href="/about">このサイトについて</a>
            <a href="/contact">お問い合わせ</a>
            <a href="/form">フォーム</a>
        </nav>
        <p>これは Deno で作成したHTTPサーバーです。</p>
        <p>上のナビゲーションリンクをクリックして、他のページも見てみてください。</p>
    </div>
</body>
</html>`;

    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  }

  // 他のページの処理...
  return new Response("ページが見つかりません", {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8" }
  });
});

console.log("サーバーが起動しました: http://localhost:8000");
```

## リクエストとレスポンスの基本

### HTTPメソッドの理解

HTTPには主に以下のメソッドがあります：

- **GET**: データの取得（Webページの表示など）
- **POST**: データの送信（フォームの送信など）
- **PUT**: データの更新
- **PATCH**: データの更新
- **DELETE**: データの削除

```js
const server = Deno.serve({ port: 8000 }, (request) => {
  const method = request.method;
  const url = new URL(request.url);
  const pathname = url.pathname;

  console.log(`${method} ${pathname}`);

  if (method === "GET" && pathname === "/") {
    return new Response(
      `<form action="/submit" method="POST">
        <input name="username" placeholder="ユーザー名" /><br />
        <textarea name="content" placeholder="問い合わせ内容"></textarea><br />
        <button>送信</button>
      </form>`,
      { headers: { "content-type": "text/html; charset=utf-8" } },
    );
  } else if (method === "POST" && pathname === "/submit") {
    return request
      .formData()
      .then(function (data) {
        let text = "";
        // name 属性に設定した文字列で取得可能
        console.log(data.get("username"));
        // forループでフォームの項目を1つずつ取得可能
        for (const element of data) {
          text += element[0] + ": " + element[1] + "\n";
        }
        return new Response(
          text,
          { headers: { "content-type": "text/plain; charset=utf-8" } },
        );
      });
  }

  return new Response("対応していないリクエストです", {
    status: 400,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
});
```

### クエリパラメータの処理

URLに含まれるパラメータ（`?name=value`）を処理する方法：

```js
const server = Deno.serve({ port: 8000 }, (request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === "/search") {
    // クエリパラメータを取得
    const query = url.searchParams.get("q");
    const category = url.searchParams.get("category");
    for (const param of url.searchParams) {
      console.log(param[0], param[1]);
    }

    if (query) {
      const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>検索結果</title>
</head>
<body>
    <h1>検索結果</h1>
    <p>検索キーワード: <strong>${query}</strong></p>
    ${category ? `<p>カテゴリ: <strong>${category}</strong></p>` : ""}
    <p>実際の検索機能は今後の授業で実装します。</p>
    <a href="/">ホームに戻る</a>
</body>
</html>`;

      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    } else {
      return new Response("検索キーワードが指定されていません", {
        status: 400,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }
  }

  return new Response("ページが見つかりません", {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
});
```

- 使用例: http://localhost:8000/search?q=JavaScript&category=programming
- 使用例☠: http://localhost:8000/search?q=%3Cscript%3Efor%20(;;)alert(%27OK%27);%3C/script%3E&category=programming

## データの保存と管理

### メモリ内でのデータ保存

簡単なデータ保存の例（サーバー再起動で消える）：

```js
// データを保存する配列
const submissions = [];

const server = Deno.serve({ port: 8000 }, async (request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;

  // 送信されたデータの一覧表示
  if (method === "GET" && pathname === "/admin") {
    const adminHtml = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>管理画面</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .no-data { text-align: center; color: #666; }
    </style>
</head>
<body>
    <h1>お問い合わせ管理画面</h1>
    <p>受信したお問い合わせ: ${submissions.length}件</p>
    
    ${submissions.length > 0 ? `
    <table>
        <thead>
            <tr>
                <th>受信日時</th>
                <th>お名前</th>
                <th>メールアドレス</th>
                <th>カテゴリ</th>
                <th>内容</th>
            </tr>
        </thead>
        <tbody>
            ${submissions.map(sub => `
            <tr>
                <td>${sub.timestamp}</td>
                <td>${sub.name}</td>
                <td>${sub.email}</td>
                <td>${getCategoryName(sub.category)}</td>
                <td>${sub.message.substring(0, 50)}${sub.message.length > 50 ? '...' : ''}</td>
            </tr>
            `).join('')}
        </tbody>
    </table>
    ` : '<p class="no-data">まだお問い合わせはありません。</p>'}
    
    <p><a href="/">ホームに戻る</a></p>
</body>
</html>`;

    return new Response(adminHtml, {
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  }

  // フォームデータの送信処理（データ保存機能付き）
  if (method === "POST" && pathname === "/submit") {
    try {
      const formData = await request.formData();
      
      const name = formData.get("name");
      const email = formData.get("email");
      const category = formData.get("category");
      const message = formData.get("message");

      if (!name || !email || !category || !message) {
        return new Response("すべての項目を入力してください", {
          status: 400,
          headers: { "content-type": "text/plain; charset=utf-8" }
        });
      }

      // データを配列に保存
      const submission = {
        id: submissions.length + 1,
        name: name,
        email: email,
        category: category,
        message: message,
        timestamp: new Date().toLocaleString("ja-JP")
      };

      submissions.push(submission);

      console.log(`新しいお問い合わせを受信しました (ID: ${submission.id})`);

      // 成功ページを表示（省略）
      return new Response("送信完了", {
        headers: { "content-type": "text/plain; charset=utf-8" }
      });

    } catch (error) {
      console.error("フォーム処理エラー:", error);
      return new Response("エラーが発生しました", {
        status: 500,
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }
  }

  return new Response("ページが見つかりません", {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8" }
  });
});
```

### JSONファイルでのデータ保存

より永続的なデータ保存の例：

```js
const DATA_FILE = "./submissions.json";

// データファイルの読み込み
async function loadSubmissions() {
  try {
    const data = await Deno.readTextFile(DATA_FILE);
    return JSON.parse(data);
  } catch (error) {
    // ファイルが存在しない場合は空配列を返す
    return [];
  }
}

// データファイルの保存
async function saveSubmissions(submissions) {
  try {
    await Deno.writeTextFile(DATA_FILE, JSON.stringify(submissions, null, 2));
  } catch (error) {
    console.error("データ保存エラー:", error);
  }
}

const server = Deno.serve({ port: 8000 }, async (request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;

  if (method === "POST" && pathname === "/submit") {
    try {
      const formData = await request.formData();
      
      const name = formData.get("name");
      const email = formData.get("email");
      const category = formData.get("category");
      const message = formData.get("message");

      if (!name || !email || !category || !message) {
        return new Response("すべての項目を入力してください", {
          status: 400,
          headers: { "content-type": "text/plain; charset=utf-8" }
        });
      }

      // 既存データを読み込み
      const submissions = await loadSubmissions();

      // 新しいデータを追加
      const submission = {
        id: submissions.length + 1,
        name: name,
        email: email,
        category: category,
        message: message,
        timestamp: new Date().toISOString()
      };

      submissions.push(submission);

      // ファイルに保存
      await saveSubmissions(submissions);

      console.log(`新しいお問い合わせを保存しました (ID: ${submission.id})`);

      return new Response("送信完了", {
        headers: { "content-type": "text/plain; charset=utf-8" }
      });

    } catch (error) {
      console.error("フォーム処理エラー:", error);
      return new Response("エラーが発生しました", {
        status: 500,
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }
  }

  return new Response("ページが見つかりません", {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8" }
  });
});

// 実行時に必要な権限: --allow-net --allow-read --allow-write
```

## 静的ファイルの配信

### CSSファイルの分離

HTMLに埋め込んでいたCSSを外部ファイルとして配信する方法：

```js
const server = Deno.serve({ port: 8000 }, async (request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // CSSファイルの配信
  if (pathname === "/styles.css") {
    const css = `
body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
}

.container {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
    color: #333;
    text-align: center;
}

/* その他のスタイル... */
`;

    return new Response(css, {
      headers: { "content-type": "text/css; charset=utf-8" }
    });
  }

  // HTMLページでCSSファイルを参照
  if (pathname === "/") {
    const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>私のWebサイト</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div class="container">
        <h1>私のWebサイト</h1>
        <p>外部CSSファイルを使用しています。</p>
    </div>
</body>
</html>`;

    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  }

  return new Response("ページが見つかりません", {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8" }
  });
});
```

### 画像ファイルの配信

画像ファイルを配信する方法：

```js
const server = Deno.serve({ port: 8000 }, async (request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // 画像ファイルの配信
  if (pathname.startsWith("/images/")) {
    try {
      const filePath = `.${pathname}`; // ./images/logo.png など
      const file = await Deno.readFile(filePath);
      
      // ファイル拡張子に応じてContent-Typeを設定
      let contentType = "application/octet-stream";
      if (pathname.endsWith(".png")) {
        contentType = "image/png";
      } else if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) {
        contentType = "image/jpeg";
      } else if (pathname.endsWith(".gif")) {
        contentType = "image/gif";
      } else if (pathname.endsWith(".svg")) {
        contentType = "image/svg+xml";
      }

      return new Response(file, {
        headers: { "content-type": contentType }
      });
    } catch (error) {
      return new Response("画像が見つかりません", {
        status: 404,
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }
  }

  return new Response("ページが見つかりません", {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8" }
  });
});

// 実行時に必要な権限: --allow-net --allow-read
```

## セキュリティの基本

### 入力データの検証

ユーザーからの入力データは必ず検証する必要があります：

```js
// 入力データの検証関数
function validateInput(data) {
  const errors = [];

  // 名前の検証
  if (!data.name || data.name.trim().length === 0) {
    errors.push("名前は必須です");
  } else if (data.name.trim().length > 100) {
    errors.push("名前は100文字以内で入力してください");
  }

  // メールアドレスの検証
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("有効なメールアドレスを入力してください");
  }

  // メッセージの検証
  if (!data.message || data.message.trim().length === 0) {
    errors.push("お問い合わせ内容は必須です");
  } else if (data.message.trim().length > 1000) {
    errors.push("お問い合わせ内容は1000文字以内で入力してください");
  }

  return errors;
}

// 使用例
const formData = {
  name: "山田太郎",
  email: "yamada@example.com",
  message: "お問い合わせ内容"
};

const validationErrors = validateInput(formData);
if (validationErrors.length > 0) {
  console.log("入力エラー:", validationErrors);
} else {
  console.log("入力データは有効です");
}
```

### HTMLエスケープ

XSS攻撃を防ぐため、ユーザー入力をHTMLに表示する際はエスケープが必要です：

```js
// HTMLエスケープ関数
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// 使用例
const userInput = '<script>alert("XSS")</script>';
const safeOutput = escapeHtml(userInput);
console.log(safeOutput); // &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;
```

## 実習課題

### 課題1: 基本的なHTTPサーバー

`docs/11/work/basic-server.js`ファイルを作成し、以下の機能を実装してください：

1. ポート3000でHTTPサーバーを起動
2. 以下のルートに対応：
   - `/`: "Hello, Deno Server!"を表示
   - `/time`: 現在の日時を表示
   - `/random`: 1-100のランダムな数値を表示
   - その他: 404エラーを表示

**実行方法：**
```bash
deno run --allow-net docs/11/work/basic-server.js
```

### 課題2: HTMLページの配信

`docs/11/work/html-server.js`ファイルを作成し、以下の機能を実装してください：

1. ポート3001でHTTPサーバーを起動
2. 以下のページを配信：
   - `/`: ホームページ（HTML）
   - `/about`: 自己紹介ページ（HTML）
   - `/contact`: 連絡先ページ（HTML）
   - `/styles.css`: CSSファイル
3. 各ページにナビゲーションメニューを含める

**実行方法：**
```bash
deno run --allow-net docs/11/work/html-server.js
```

### 課題3: フォーム処理システム

`docs/11/work/form-server.js`ファイルを作成し、以下の機能を実装してください：

1. ポート3002でHTTPサーバーを起動
2. 以下の機能を実装：
   - `/form`: アンケートフォームページ
   - `/submit`: フォーム送信処理（POST）
   - `/results`: 送信されたデータの一覧表示
3. フォーム項目：
   - 名前（必須）
   - 年齢（必須）
   - 職業（選択式）
   - 趣味（テキストエリア）
4. データの検証とエラーハンドリング

**実行方法：**
```bash
deno run --allow-net docs/11/work/form-server.js
```

### 課題4: ファイル保存機能付きお問い合わせシステム

`docs/11/work/contact-system.js`ファイルを作成し、以下の機能を実装してください：

1. ポート3003でHTTPサーバーを起動
2. 以下の機能を実装：
   - `/`: ホームページ
   - `/contact`: お問い合わせフォーム
   - `/submit`: フォーム送信処理（JSONファイルに保存）
   - `/admin`: 管理画面（保存されたデータの表示）
3. データをJSONファイル（`contacts.json`）に永続化
4. 管理画面でデータの検索・フィルタリング機能

**実行方法：**
```bash
deno run --allow-net --allow-read --allow-write docs/11/work/contact-system.js
```

## まとめ

- HTTPサーバーはWebアプリケーションの基盤となる重要な技術
- DenoではDeno.serve()を使用して簡単にHTTPサーバーを構築できる
- リクエストとレスポンスの概念を理解することで、動的なWebアプリケーションが作成可能
- フォームデータの処理により、ユーザーからの入力を受け取り、処理できる
- データの保存方法（メモリ、ファイル）を使い分けることで、永続化が可能
- 静的ファイル（CSS、画像）の配信により、リッチなWebページが作成できる
- セキュリティ対策（入力検証、HTMLエスケープ）は必須の知識
- 実用的なWebアプリケーションには、エラーハンドリングとユーザビリティの配慮が重要

> [!IMPORTANT]
> HTTPサーバーとフォームデータ処理は、現代のWebアプリケーション開発の基礎となる技術です。
> これらの概念を理解することで、より複雑なWebアプリケーションの開発が可能になります。
> 次回の授業では、エラー処理の基本について学習します。

> [!NOTE]
> 本授業で作成したサーバーは学習目的のものです。実際の本番環境では、より高度なセキュリティ対策、パフォーマンス最適化、エラーハンドリングが必要になります。
> また、大規模なアプリケーションでは、フレームワーク（Express.js、Fresh、Oakなど）の使用を検討することをお勧めします。
