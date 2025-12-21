// 課題5: 総合演習の模範解答

/**
 * メールアドレスの妥当性を検証する
 * @param {string} email - メールアドレス
 * @returns {boolean} 有効な場合true
 */
export function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * 電話番号を統一フォーマットに変換する
 * @param {string} phone - 電話番号
 * @returns {string} フォーマットされた電話番号
 */
export function formatPhoneNumber(phone) {
  // 数字のみを抽出
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 11) {
    // 携帯電話番号の場合: 090-1234-5678
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  } else if (digits.length === 10) {
    if (digits.startsWith("03") || digits.startsWith("06")) {
      // 東京・大阪の固定電話: 03-1234-5678
      return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
      // その他の固定電話: 090-123-4567
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
  }

  // デフォルトは元の形式を返す
  return phone;
}

/**
 * 割引価格を計算する
 * @param {number} price - 元の価格
 * @param {number} discountPercent - 割引率（パーセント）
 * @returns {number} 割引後の価格
 */
export function calculateDiscount(price, discountPercent) {
  return price * (1 - discountPercent / 100);
}

/**
 * ランダムなパスワードを生成する
 * @param {number} length - パスワードの長さ
 * @param {boolean} includeSymbols - 記号を含むかどうか
 * @returns {string} 生成されたパスワード
 */
export function generatePassword(length, includeSymbols = false) {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;':\"\\,.<>/?";

  let characters = letters + numbers;
  if (includeSymbols) {
    characters += symbols;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}

/**
 * CSV文字列を配列に変換する
 * @param {string} csvString - CSV文字列
 * @returns {Array<Array<string>>} 2次元配列
 */
export function parseCSV(csvString) {
  if (csvString.trim() === "") return [];

  const lines = csvString.split("\n");
  return lines.map((line) => line.split(","));
}

/**
 * バイト数を読みやすい形式（KB、MB等）に変換する
 * @param {number} bytes - バイト数
 * @returns {string} フォーマットされたファイルサイズ
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  if (i === 0) {
    return `${bytes} ${units[i]}`;
  }

  const size = bytes / Math.pow(k, i);
  return `${size.toFixed(1)} ${units[i]}`;
}

/**
 * タイトルからURL用のスラッグを生成する
 * @param {string} title - タイトル
 * @returns {string} スラッグ
 */
export function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // 英数字、スペース、ハイフン以外を削除
    .trim()
    .replace(/\s+/g, "-") // スペースをハイフンに変換
    .replace(/-+/g, "-"); // 連続するハイフンを1つに
}
