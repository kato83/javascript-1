// 学生名の配列（初期値：["山田太郎", "佐藤花子", "田中次郎"]）
export const students = ["山田太郎", "佐藤花子", "田中次郎"];

/**
 * 学生名を検索し、見つかった場合はインデックスを、見つからない場合は-1を返す
 * @param {string} name - 検索する学生名
 * @returns {number} 学生のインデックス（見つからない場合は-1）
 */
export function findStudent(name) {
  return students.indexOf(name);
}

/**
 * 学生が存在するかどうかを論理値で返す
 * @param {string} name - 検索する学生名
 * @returns {boolean} 学生が存在するかどうか
 */
export function hasStudent(name) {
  return students.includes(name);
}

/**
 * 指定されたインデックスに学生を挿入する
 * @param {number} index - 挿入するインデックス
 * @param {string} name - 挿入する学生名
 */
export function addStudentAt(index, name) {
  students.splice(index, 0, name);
}

/**
 * 指定されたインデックスの学生を削除し、削除された学生名を返す
 * @param {number} index - 削除するインデックス
 * @returns {string|undefined} 削除された学生名
 */
export function removeStudentAt(index) {
  const removed = students.splice(index, 1);
  return removed[0];
}

/**
 * 学生一覧を文字列で返す（例："山田太郎, 佐藤花子, 田中次郎"）
 * @returns {string} 学生一覧の文字列
 */
export function getStudentList() {
  return students.join(", ");
}
