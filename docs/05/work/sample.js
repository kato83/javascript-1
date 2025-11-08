// ファイルやディレクトリを読み取るDeno組み込みのモジュール（Node.JS互換）をインポート
import * as fs from "node:fs";
// パス文字列を分解したり組み立てるDeno組み込みのモジュール（Node.JS互換）をインポート
import * as path from "node:path";

// ファイルの読み取り
fs.readFile(
  // 第一引数 どのファイルを読み取るか
  path.join("docs", "05", "work", "sample.txt"),
  // 第二引数 どのように読み取るか（UTF-8のテキストファイルとして読み取る）
  "utf-8",
  // 第三引数 読み取れた又はエラーがあった際の処理を記述する
  function (err, data) {
    if (err) {
      console.error("エラーが発生しました エラー内容:", err);
    } else {
      console.log("▼▼▼ファイル読み取り成功しました▼▼▼");
      console.log(data);
    }
  },
);

// 以下のコメントを外すと第三引数のコールバック関数の function を消すと構文エラーになるのが見て取れる
// fs.readFile(
//   // 第一引数 どのファイルを読み取るか
//   path.join("docs", "05", "work", "sample.txt"),
//   // 第二引数 どのように読み取るか（UTF-8のテキストファイルとして読み取る）
//   "utf-8",
//   // 第三引数 読み取れた又はエラーがあった際の処理を記述する
//   if (err) {
//     console.error("エラーが発生しました エラー内容:", err);
//   } else {
//     console.log("▼▼▼ファイル読み取り成功しました▼▼▼");
//     console.log(data);
//   }
// );
