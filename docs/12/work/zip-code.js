import process from "node:process";
import { spawn } from "node:child_process";
import { DatabaseSync } from "node:sqlite";
import { CsvParseStream } from "@std/csv/parse-stream";

const ZIP_PATH = "zip-code.zip";
const CSV_PATH = "utf_ken_all.csv";
const DB_PATH = "zipcode.db";

/**
 * データをダウンロードして郵便番号検索プログラムの検索対象用のデータベースを構築する関数
 */
async function initializer() {
  // ZIPファイルのダウンロード処理
  await Promise.all([
    // [郵便局 | 日本郵便株式会社](https://www.post.japanpost.jp/index.html) から郵便番号情報がまとまったZIPファイルへのHTTPアクセス
    fetch("https://www.post.japanpost.jp/zipcode/dl/utf/zip/utf_ken_all.zip")
      .then((response) => {
        return Promise.all([
          // HTTPレスポンスのボディを後続処理に渡す
          response.body,
          // ZIPファイルの保存場所指定と書き込み許可を後続処理に渡す
          Deno.open(ZIP_PATH, {
            create: true,
            write: true,
            truncate: true,
          }),
        ]);
      })
      // ZIPデータをファイルとしてローカルに保存する
      .then(([responseBody, file]) => {
        return responseBody.pipeTo(file.writable);
      }),
  ]);

  // ダウンロードしたZIPファイルを解凍する
  await new Promise((resolve, reject) => {
    const child = spawn("tar", ["-xf", ZIP_PATH, "-C", "."], {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`tar failed with exit code ${code}`));
      }
    });
  });

  // DB処理
  const db = new DatabaseSync(DB_PATH);
  try {
    // テーブル作成
    db.exec(`
      CREATE TABLE IF NOT EXISTS zipcode (
        local_government_code TEXT NOT NULL,
        postal_code_old_5 TEXT NOT NULL,
        postal_code_7 TEXT PRIMARY KEY,
        prefecture_kana TEXT NOT NULL,
        city_kana TEXT NOT NULL,
        town_kana TEXT NOT NULL,
        prefecture TEXT NOT NULL,
        city TEXT NOT NULL,
        town TEXT NOT NULL,
        has_multiple_postal_codes_for_town INTEGER NOT NULL,
        has_koaza_banchi INTEGER NOT NULL,
        has_chome INTEGER NOT NULL,
        has_multiple_towns_for_postal_code INTEGER NOT NULL,
        update_status INTEGER NOT NULL,
        change_reason INTEGER NOT NULL
      );
    `);

    // DBレコード追加処理
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO zipcode (
        local_government_code,
        postal_code_old_5,
        postal_code_7,
        prefecture_kana,
        city_kana,
        town_kana,
        prefecture,
        city,
        town,
        has_multiple_postal_codes_for_town,
        has_koaza_banchi,
        has_chome,
        has_multiple_towns_for_postal_code,
        update_status,
        change_reason
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `);

    // ダウンロードして解凍したCSVファイルをパースする
    const file = await Deno.open(CSV_PATH, { read: true });

    const stream = file.readable
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(new CsvParseStream({ fieldsPerRecord: 15 }));

    db.exec("BEGIN");
    for await (const cols of stream) {
      // 実際のDBレコード書き込み処理
      stmt.run(
        cols[0],
        cols[1],
        cols[2],
        cols[3],
        cols[4],
        cols[5],
        cols[6],
        cols[7],
        cols[8],
        Number.parseInt(cols[9], 10),
        Number.parseInt(cols[10], 10),
        Number.parseInt(cols[11], 10),
        Number.parseInt(cols[12], 10),
        Number.parseInt(cols[13], 10),
        Number.parseInt(cols[14], 10),
      );
    }
    db.exec("COMMIT");
  } finally {
    db.close();
  }
}

/**
 * 郵便番号から住所を検索してコンソールログに出力する関数
 * @param {string} zipcode 郵便番号
 */
function search(zipcode) {
  // TODO: SQLiteのファイルパスを指定してDBアクセスできるようにする
  // TODO: zipcode テーブルの postal_code_7 を where 条件にしたSQL文発行
  // TODO: クエリの結果で0件だった場合は `該当する郵便番号が見つかりませんでした。` とコンソールログ出力
  // TODO: レコードが取得できた場合は都道府県や市区町村等の情報をコンソールログ出力
  // TODO: DBのクローズ処理
}

const input = prompt(`以下選択肢の数値を選んでください。
郵便番号データのダウンロード: 1
郵便番号検索: 2
>`);

if (input === "1") {
  await initializer();
} else if (input === "2") {
  const input = prompt(`住所を調べたい対象の郵便番号を入力してください。
>`);
  search(input);
} else {
  console.log("1か2を入力してください。");
}
