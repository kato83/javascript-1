// 課題2: スコープの理解

// 1. グローバルスコープに変数を宣言
const globalName = "グローバル変数";
let globalCount = 0;

// 2. 関数内でローカル変数を宣言し、グローバル変数とローカル変数の両方を出力する関数
function showVariables() {
  // 関数スコープの変数（ローカル変数）
  const localName = "ローカル変数";
  let localCount = 10;

  console.log("関数内からのアクセス:");
  console.log("globalName:", globalName); // グローバル変数にアクセス可能
  console.log("globalCount:", globalCount); // グローバル変数にアクセス可能
  console.log("localName:", localName); // ローカル変数にアクセス可能
  console.log("localCount:", localCount); // ローカル変数にアクセス可能

  // グローバル変数の値を変更
  globalCount++;
}

// 関数を実行
showVariables();

// グローバルスコープからの出力
console.log("\nグローバルスコープからのアクセス:");
console.log("globalName:", globalName); // グローバル変数にアクセス可能
console.log("globalCount:", globalCount); // 関数内で変更された値が反映される
// console.log("localName:", localName); // エラー: localNameは定義されていない
// console.log("localCount:", localCount); // エラー: localCountは定義されていない

// 3. ブロックスコープ内で変数を宣言し、ブロック内と外でのアクセスを試みる
console.log("\nブロックスコープの例:");

{
  // ブロックスコープの変数
  const blockName = "ブロック変数";
  let blockCount = 20;

  console.log("ブロック内からのアクセス:");
  console.log("blockName:", blockName); // ブロック内からアクセス可能
  console.log("blockCount:", blockCount); // ブロック内からアクセス可能
  console.log("globalName:", globalName); // グローバル変数にアクセス可能
}

// ブロック外からのアクセス
// console.log("blockName:", blockName); // エラー: blockNameは定義されていない
// console.log("blockCount:", blockCount); // エラー: blockCountは定義されていない

// 4. varとletの違いを示すコード例
console.log("\nvarとletの違い:");

// varのスコープ（関数スコープ）
{
  var varVariable = "var変数";
  let letVariable = "let変数";
}

console.log("varVariable:", varVariable); // ブロック外でもアクセス可能
// console.log("letVariable:", letVariable); // エラー: letVariableは定義されていない

// 変数の巻き上げ（hoisting）の違い
console.log("\n変数の巻き上げの違い:");

// varの巻き上げ
console.log("hoistedVar:", hoistedVar); // undefined（エラーにならない）
var hoistedVar = "varは巻き上げられる";
console.log("hoistedVar:", hoistedVar); // "varは巻き上げられる"

// letの巻き上げ（一時的なデッドゾーン）
// console.log("hoistedLet:", hoistedLet); // エラー: hoistedLetにアクセスする前に初期化する必要がある
let hoistedLet = "letも巻き上げられるが、初期化前にアクセスするとエラー";
console.log("hoistedLet:", hoistedLet); // "letも巻き上げられるが、初期化前にアクセスするとエラー"

// 関数内でのvarとletの違い
function scopeTest() {
  if (true) {
    var functionVar = "関数スコープのvar";
    let blockLet = "ブロックスコープのlet";
  }

  console.log("functionVar:", functionVar); // 関数内ならどこからでもアクセス可能
  // console.log("blockLet:", blockLet); // エラー: blockLetは定義されていない
}

scopeTest();
