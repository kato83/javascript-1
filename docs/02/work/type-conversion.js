// 課題3: 型変換の実験

// 1. 文字列と数値の間で暗黙的型変換が起こる例を3つ以上書く
console.log("1. 暗黙的型変換の例");

// 例1: 文字列と数値の加算（文字列連結として扱われる）
const num1 = 5;
const str1 = "10";
const result1 = num1 + str1;
console.log(`${num1} + "${str1}" = "${result1}"`); // "5" + "10" = "510"

// 例2: 文字列と数値の減算（数値として扱われる）
const num2 = 20;
const str2 = "5";
const result2 = num2 - str2;
console.log(`${num2} - "${str2}" = ${result2}`); // 20 - 5 = 15

// 例3: 文字列と数値の乗算（数値として扱われる）
const num3 = 3;
const str3 = "4";
const result3 = num3 * str3;
console.log(`${num3} * "${str3}" = ${result3}`); // 3 * 4 = 12

// 例4: 文字列と数値の除算（数値として扱われる）
const num4 = 10;
const str4 = "2";
const result4 = num4 / str4;
console.log(`${num4} / "${str4}" = ${result4}`); // 10 / 2 = 5

// 例5: 数値に変換できない文字列との演算
const num5 = 5;
const str5 = "abc";
const result5 = num5 * str5;
console.log(`${num5} * "${str5}" = ${result5}`); // 5 * "abc" = NaN

// 2. 明示的な型変換の例を3つ以上書く
console.log("\n2. 明示的型変換の例");

// 例1: 文字列から数値への変換（Number関数）
const strNum1 = "42";
const convertedNum1 = Number(strNum1);
console.log(
  `Number("${strNum1}") = ${convertedNum1} (${typeof convertedNum1})`,
);

// 例2: 文字列から整数への変換（parseInt関数）
const strNum2 = "42.5px";
const convertedNum2 = parseInt(strNum2);
console.log(
  `parseInt("${strNum2}") = ${convertedNum2} (${typeof convertedNum2})`,
);

// 例3: 文字列から浮動小数点数への変換（parseFloat関数）
const strNum3 = "42.5px";
const convertedNum3 = parseFloat(strNum3);
console.log(
  `parseFloat("${strNum3}") = ${convertedNum3} (${typeof convertedNum3})`,
);

// 例4: 数値から文字列への変換（String関数）
const numStr1 = 42;
const convertedStr1 = String(numStr1);
console.log(
  `String(${numStr1}) = "${convertedStr1}" (${typeof convertedStr1})`,
);

// 例5: 数値から文字列への変換（toString関数）
const numStr2 = 42;
const convertedStr2 = numStr2.toString();
console.log(
  `${numStr2}.toString() = "${convertedStr2}" (${typeof convertedStr2})`,
);

// 例6: 値を論理型に変換（Boolean関数）
console.log(`Boolean(1) = ${Boolean(1)}`);
console.log(`Boolean(0) = ${Boolean(0)}`);
console.log(`Boolean("") = ${Boolean("")}`);
console.log(`Boolean("hello") = ${Boolean("hello")}`);
console.log(`Boolean(null) = ${Boolean(null)}`);
console.log(`Boolean(undefined) = ${Boolean(undefined)}`);

// 3. ==と===の違いを示す例
console.log("\n3. ==と===の違い");

// 値のみを比較する==（型変換が行われる）
console.log(`5 == "5": ${5 == "5"}`); // true（型変換が行われる）
console.log(`0 == "": ${0 == ""}`); // true（型変換が行われる）
console.log(`0 == false: ${0 == false}`); // true（型変換が行われる）
console.log(`null == undefined: ${null == undefined}`); // true（特殊なケース）

// 値と型の両方を比較する===（型変換は行われない）
console.log(`5 === "5": ${5 === "5"}`); // false（型が異なる）
console.log(`0 === "": ${0 === ""}`); // false（型が異なる）
console.log(`0 === false: ${0 === false}`); // false（型が異なる）
console.log(`null === undefined: ${null === undefined}`); // false（型が異なる）

// 同じ型同士の比較
console.log(`5 === 5: ${5 === 5}`); // true（値も型も同じ）
console.log(`"hello" === "hello": ${"hello" === "hello"}`); // true（値も型も同じ）

// 特殊なケース
console.log(`NaN == NaN: ${NaN == NaN}`); // false（NaNは自分自身とも等しくない）
console.log(`NaN === NaN: ${NaN === NaN}`); // false（NaNは自分自身とも等しくない）

// オブジェクトの比較（参照の比較）
const obj1 = { name: "太郎" };
const obj2 = { name: "太郎" };
const obj3 = obj1;

console.log(`obj1 == obj2: ${obj1 == obj2}`); // false（異なるオブジェクト参照）
console.log(`obj1 === obj2: ${obj1 === obj2}`); // false（異なるオブジェクト参照）
console.log(`obj1 == obj3: ${obj1 == obj3}`); // true（同じオブジェクト参照）
console.log(`obj1 === obj3: ${obj1 === obj3}`); // true（同じオブジェクト参照）

// まとめ
console.log("\nまとめ:");
console.log("== は値のみを比較し、必要に応じて型変換を行います");
console.log("=== は値と型の両方を比較し、型変換は行いません");
console.log(
  "一般的には、予期しない型変換を避けるために === を使用することが推奨されています",
);
