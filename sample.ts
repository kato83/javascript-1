export function sum(...numbers: number[]): number {
  return numbers.reduce((sum, x) => sum + x, 0);
}

if (import.meta.main) {
  console.info([
    "sample.ts 利用方法",
    "",
    "```javascript",
    'import { sum } from "./sample.ts";',
    "console.log(sum(1, 2)); // 3",
    "````",
  ].join("\n"));
} else {
  console.log("imported sample.ts");
}
