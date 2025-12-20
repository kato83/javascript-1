export function sumArray(numbers) {
  if (!Array.isArray(numbers)) throw new TypeError("配列を渡してください");
  if (numbers.length === 0) return 0;
  return numbers.reduce((s, x) => s + Number(x), 0);
}

export function average(numbers) {
  if (!Array.isArray(numbers)) throw new TypeError("配列を渡してください");
  if (numbers.length === 0) return 0;
  return sumArray(numbers) / numbers.length;
}

export function unique(arr) {
  if (!Array.isArray(arr)) throw new TypeError("配列を渡してください");
  const seen = new Set();
  const out = [];
  for (const v of arr) {
    if (!seen.has(v)) {
      seen.add(v);
      out.push(v);
    }
  }
  return out;
}

export function daysUntilNewYear(date) {
  if (!(date instanceof Date)) throw new TypeError("Date を渡してください");
  const year = date.getFullYear();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const nextYear = new Date(year + 1, 0, 1);
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.floor((nextYear - today) / msPerDay));
}

export function findLongestString(arr) {
  if (!Array.isArray(arr)) throw new TypeError("配列を渡してください");
  let best = "";
  for (const s of arr) {
    if (typeof s !== "string") continue;
    if (s.length > best.length) best = s;
  }
  return best;
}

export function toTitleCase(str) {
  if (typeof str !== "string") throw new TypeError("文字列を渡してください");
  return str
    .split(" ")
    .map((
      w,
    ) => (w.length === 0 ? w : w[0].toUpperCase() + w.slice(1).toLowerCase()))
    .join(" ");
}

if (import.meta.main) {
  console.log("sumArray([1,2,3]) =", sumArray([1, 2, 3]));
  console.log("average([1,2,3]) =", average([1, 2, 3]));
  console.log("unique([1,2,2,'a','a']) =", unique([1, 2, 2, "a", "a"]));
  console.log(
    "findLongestString(['a','abcd','xyz']) =",
    findLongestString(["a", "abcd", "xyz"]),
  );
  console.log("toTitleCase('hello world') =", toTitleCase("hello world"));
  console.log(
    "daysUntilNewYear(new Date('2025-12-31')) =",
    daysUntilNewYear(new Date("2025-12-31")),
  );
}
