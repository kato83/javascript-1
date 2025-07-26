# JavaScript 1

## ディレクトリ構成

- `.vscode/`
  - `extensions.json` : VSCode で使用する拡張機能を列挙したファイル
  - `launch.json` : 
  - `profile.ps1` : PC上で `deno` コマンドを実行するためのセットアップファイル
- `.gitignore` : Git で管理しない資材をパス文字列で記述したファイル
- `01/` ... `13/` : 授業資料と演習課題
- `01-answer/` ... `13-answer/` : 演習課題模範回答
- `tools/` : ツール郡
  - `.gitkeep` : `tools/` ディレクトリを Git 資材にするためのファイル
  - `deno.exe` : JavaScript ランタイム Deno 本体（以下のセットアップ参照）
- `deno.json` : JavaScript ランタイム Deno の設定ファイル
- `deno.lock` : JavaScript ランタイム Deno のロックファイル
- `javascript1.code-workspace` : VSCode を開くためのファイル
- `README.md` : 当ドキュメントファイル

## JavaScript ランタイム Deno の利用方法例

```
> deno test
> deno run sample.ts
```

## Deno について

**[Deno](https://github.com/denoland/deno)** TODO

## セットアップ

[Release v2.4.2 · denoland/deno](https://github.com/denoland/deno/releases/tag/v2.4.2) より [deno-x86_64-pc-windows-msvc.zip
](https://github.com/denoland/deno/releases/download/v2.4.2/deno-x86_64-pc-windows-msvc.zip) をダウンロードし、ZIPファイルの中にある `deno.zip` を `tools/` 直下（つまり `./tools/deno.exe` となるよう）に配置してください。
