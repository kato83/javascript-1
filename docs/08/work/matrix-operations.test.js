import { assertEquals } from "@std/assert";
import {
  calculateMatrixSum,
  createMatrix,
  getMatrixColumn,
  getMatrixElement,
  getMatrixRow,
  setMatrixElement,
} from "./matrix-operations.js";

Deno.test("createMatrix関数のテスト", () => {
  // 3x3の行列を0で初期化
  const matrix1 = createMatrix(3, 3, 0);
  assertEquals(matrix1, [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  // 2x4の行列を1で初期化
  const matrix2 = createMatrix(2, 4, 1);
  assertEquals(matrix2, [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ]);

  // 1x1の行列
  const matrix3 = createMatrix(1, 1, 42);
  assertEquals(matrix3, [[42]]);

  // 0x0の行列
  const matrix4 = createMatrix(0, 0, 5);
  assertEquals(matrix4, []);
});

Deno.test("getMatrixElement関数のテスト", () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  assertEquals(getMatrixElement(matrix, 0, 0), 1);
  assertEquals(getMatrixElement(matrix, 0, 2), 3);
  assertEquals(getMatrixElement(matrix, 1, 1), 5);
  assertEquals(getMatrixElement(matrix, 2, 2), 9);

  // 範囲外のアクセス
  assertEquals(getMatrixElement(matrix, 3, 0), undefined);
  assertEquals(getMatrixElement(matrix, 0, 3), undefined);
  assertEquals(getMatrixElement(matrix, -1, 0), undefined);
});

Deno.test("setMatrixElement関数のテスト", () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  setMatrixElement(matrix, 0, 0, 10);
  assertEquals(matrix[0][0], 10);

  setMatrixElement(matrix, 1, 2, 20);
  assertEquals(matrix[1][2], 20);

  setMatrixElement(matrix, 2, 1, 30);
  assertEquals(matrix[2][1], 30);

  // 最終的な行列の状態を確認
  assertEquals(matrix, [
    [10, 2, 3],
    [4, 5, 20],
    [7, 30, 9],
  ]);
});

Deno.test("getMatrixRow関数のテスト", () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  assertEquals(getMatrixRow(matrix, 0), [1, 2, 3]);
  assertEquals(getMatrixRow(matrix, 1), [4, 5, 6]);
  assertEquals(getMatrixRow(matrix, 2), [7, 8, 9]);

  // 範囲外のアクセス
  assertEquals(getMatrixRow(matrix, 3), undefined);
  assertEquals(getMatrixRow(matrix, -1), undefined);

  // 元の行列が変更されていないことを確認
  assertEquals(matrix, [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
});

Deno.test("getMatrixColumn関数のテスト", () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  assertEquals(getMatrixColumn(matrix, 0), [1, 4, 7]);
  assertEquals(getMatrixColumn(matrix, 1), [2, 5, 8]);
  assertEquals(getMatrixColumn(matrix, 2), [3, 6, 9]);

  // 範囲外のアクセス
  assertEquals(getMatrixColumn(matrix, 3), []);
  assertEquals(getMatrixColumn(matrix, -1), []);

  // 異なるサイズの行列
  const matrix2 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
  ];
  assertEquals(getMatrixColumn(matrix2, 0), [1, 5]);
  assertEquals(getMatrixColumn(matrix2, 3), [4, 8]);
});

Deno.test("calculateMatrixSum関数のテスト", () => {
  const matrix1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  assertEquals(calculateMatrixSum(matrix1), 45);

  const matrix2 = [
    [1, 2],
    [3, 4],
  ];
  assertEquals(calculateMatrixSum(matrix2), 10);

  const matrix3 = [[42]];
  assertEquals(calculateMatrixSum(matrix3), 42);

  const matrix4 = [];
  assertEquals(calculateMatrixSum(matrix4), 0);

  const matrix5 = [
    [-1, -2],
    [-3, -4],
  ];
  assertEquals(calculateMatrixSum(matrix5), -10);

  const matrix6 = [
    [1.5, 2.5],
    [3.5, 4.5],
  ];
  assertEquals(calculateMatrixSum(matrix6), 12);
});
