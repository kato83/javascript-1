import * as z from "zod";

/**
 * ユーザー登録データの検証
 * @param {Object} userData - ユーザーデータ
 * @returns {Object} 検証結果
 */
export function validateUserRegistration(userData) {
  const UserRegistrationSchema = z.object({
    username: z.string()
      .min(3, "ユーザー名は3文字以上である必要があります")
      .max(20, "ユーザー名は20文字以下である必要があります")
      .refine((val) => {
        // 英数字とアンダースコアのみをチェック
        for (let i = 0; i < val.length; i++) {
          const char = val[i];
          const isLetter = (char >= "a" && char <= "z") ||
            (char >= "A" && char <= "Z");
          const isNumber = char >= "0" && char <= "9";
          const isUnderscore = char === "_";

          if (!isLetter && !isNumber && !isUnderscore) {
            return false;
          }
        }
        return true;
      }, "ユーザー名は英数字とアンダースコアのみ使用可能です"),
    email: z.string()
      .email("有効なメールアドレスを入力してください"),
    password: z.string()
      .min(8, "パスワードは8文字以上である必要があります")
      .refine((val) => {
        let hasLower = false;
        let hasUpper = false;
        let hasNumber = false;

        // 各文字をチェック
        for (let i = 0; i < val.length; i++) {
          const char = val[i];
          if (char >= "a" && char <= "z") {
            hasLower = true;
          } else if (char >= "A" && char <= "Z") {
            hasUpper = true;
          } else if (char >= "0" && char <= "9") {
            hasNumber = true;
          }
        }

        return hasLower && hasUpper && hasNumber;
      }, "パスワードは大文字、小文字、数字を含む必要があります"),
    age: z.number()
      .min(13, "13歳以上である必要があります")
      .max(120, "年齢は120歳以下である必要があります"),
    phone: z.string()
      .refine((val) => {
        // 電話番号の形式チェック: XXX-XXXX-XXXX
        if (val.length !== 13) {
          return false;
        }

        // ハイフンの位置をチェック
        if (val[3] !== "-" || val[8] !== "-") {
          return false;
        }

        // 数字部分をチェック
        const parts = val.split("-");
        if (parts.length !== 3) {
          return false;
        }

        // 各部分が数字のみかチェック
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          for (let j = 0; j < part.length; j++) {
            if (part[j] < "0" || part[j] > "9") {
              return false;
            }
          }
        }

        // 各部分の長さをチェック
        return parts[0].length === 3 && parts[1].length === 4 &&
          parts[2].length === 4;
      }, "電話番号の形式が正しくありません（例: 090-1234-5678）"),
    terms: z.boolean()
      .refine((val) => val === true, "利用規約に同意する必要があります"),
  });

  try {
    const validatedData = UserRegistrationSchema.parse(userData);
    return { success: true, data: validatedData };
  } catch (error) {
    return { success: false, errors: error.issues };
  }
}

/**
 * 商品データの検証
 * @param {Object} productData - 商品データ
 * @returns {Object} 検証結果
 */
export function validateProductData(productData) {
  const ProductSchema = z.object({
    name: z.string()
      .min(1, "商品名は必須です")
      .max(100, "商品名は100文字以下である必要があります"),
    description: z.string()
      .max(500, "商品説明は500文字以下である必要があります")
      .optional(),
    price: z.number()
      .positive("価格は正の数である必要があります")
      .max(10000000, "価格は1000万円以下である必要があります"),
    category: z.enum([
      "electronics",
      "clothing",
      "books",
      "food",
      "sports",
      "home",
    ], {
      errorMap: () => ({ message: "有効なカテゴリを選択してください" }),
    }),
    stock: z.number()
      .int("在庫数は整数である必要があります")
      .min(0, "在庫数は0以上である必要があります"),
    sku: z.string()
      .refine((val) => {
        // SKUの形式チェック: 2-3文字の大文字 + ハイフン + 4-6桁の数字
        if (val.length < 7 || val.length > 10) {
          return false;
        }

        // ハイフンの位置を探す
        let hyphenIndex = -1;
        for (let i = 0; i < val.length; i++) {
          if (val[i] === "-") {
            hyphenIndex = i;
            break;
          }
        }

        // ハイフンが見つからない、または位置が不正
        if (hyphenIndex < 2 || hyphenIndex > 3) {
          return false;
        }

        // ハイフン前の部分（大文字のみ）をチェック
        for (let i = 0; i < hyphenIndex; i++) {
          const char = val[i];
          if (char < "A" || char > "Z") {
            return false;
          }
        }

        // ハイフン後の部分（数字のみ）をチェック
        const numberPart = val.substring(hyphenIndex + 1);
        if (numberPart.length < 4 || numberPart.length > 6) {
          return false;
        }

        for (let i = 0; i < numberPart.length; i++) {
          const char = numberPart[i];
          if (char < "0" || char > "9") {
            return false;
          }
        }

        return true;
      }, "SKUの形式が正しくありません（例: ABC-123456）"),
    tags: z.array(z.string())
      .max(10, "タグは10個以下である必要があります")
      .optional(),
    isActive: z.boolean()
      .default(true),
  });

  try {
    const validatedData = ProductSchema.parse(productData);
    return { success: true, data: validatedData };
  } catch (error) {
    return { success: false, errors: error.issues };
  }
}

/**
 * 注文データの検証
 * @param {Object} orderData - 注文データ
 * @returns {Object} 検証結果
 */
export function validateOrderData(orderData) {
  const OrderItemSchema = z.object({
    productId: z.string().min(1, "商品IDは必須です"),
    quantity: z.number()
      .int("数量は整数である必要があります")
      .positive("数量は正の数である必要があります"),
    price: z.number()
      .positive("価格は正の数である必要があります"),
  });

  const OrderSchema = z.object({
    customerId: z.string()
      .min(1, "顧客IDは必須です"),
    items: z.array(OrderItemSchema)
      .min(1, "注文には最低1つの商品が必要です")
      .max(50, "注文は50商品以下である必要があります"),
    shippingAddress: z.object({
      street: z.string().min(1, "住所は必須です"),
      city: z.string().min(1, "市区町村は必須です"),
      postalCode: z.string()
        .refine((val) => {
          // 郵便番号の形式チェック: XXX-XXXX
          if (val.length !== 8) {
            return false;
          }

          // ハイフンの位置をチェック
          if (val[3] !== "-") {
            return false;
          }

          // 数字部分をチェック
          const parts = val.split("-");
          if (parts.length !== 2) {
            return false;
          }

          // 各部分が数字のみかチェック
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            for (let j = 0; j < part.length; j++) {
              if (part[j] < "0" || part[j] > "9") {
                return false;
              }
            }
          }

          // 各部分の長さをチェック
          return parts[0].length === 3 && parts[1].length === 4;
        }, "郵便番号の形式が正しくありません（例: 123-4567）"),
      country: z.string().default("Japan"),
    }),
    paymentMethod: z.enum(
      ["credit_card", "bank_transfer", "cash_on_delivery"],
      {
        errorMap: () => ({ message: "有効な支払い方法を選択してください" }),
      },
    ),
    notes: z.string()
      .max(200, "備考は200文字以下である必要があります")
      .optional(),
  });

  try {
    const validatedData = OrderSchema.parse(orderData);
    // 合計金額を計算
    const totalAmount = validatedData.items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0,
    );

    return {
      success: true,
      data: { ...validatedData, totalAmount },
    };
  } catch (error) {
    return { success: false, errors: error.issues };
  }
}

/**
 * カスタムバリデーター関数の作成
 * @param {z.ZodSchema} schema - Zodスキーマ
 * @returns {Function} バリデーター関数
 */
export function createCustomValidator(schema) {
  return function (data) {
    try {
      const validatedData = schema.parse(data);
      return { success: true, data: validatedData };
    } catch (error) {
      return { success: false, errors: error.issues };
    }
  };
}

/**
 * 配列データの一括検証
 * @param {Array} dataArray - データ配列
 * @param {z.ZodSchema} schema - Zodスキーマ
 * @returns {Object} 検証結果
 */
export function validateBulkData(dataArray, schema) {
  const results = [];
  const errors = [];

  dataArray.forEach((item, index) => {
    try {
      const validatedData = schema.parse(item);
      results.push({ index, success: true, data: validatedData });
    } catch (error) {
      results.push({ index, success: false, errors: error.issues });
      errors.push({ index, errors: error.issues });
    }
  });

  const successCount = results.filter((r) => r.success).length;
  const errorCount = results.filter((r) => !r.success).length;

  return {
    total: dataArray.length,
    success: successCount,
    failed: errorCount,
    results,
    errors,
    isValid: errorCount === 0,
  };
}

/**
 * 入力データのサニタイズ
 * @param {any} input - 入力データ
 * @param {z.ZodSchema} schema - Zodスキーマ
 * @returns {Object} サニタイズ結果
 */
export function sanitizeInput(input, schema) {
  try {
    // まず基本的な型変換を試行
    let sanitized = input;

    // 文字列の場合、前後の空白を削除
    if (typeof input === "object" && input !== null) {
      sanitized = {};
      for (const [key, value] of Object.entries(input)) {
        if (typeof value === "string") {
          sanitized[key] = value.trim();
        } else {
          sanitized[key] = value;
        }
      }
    }

    // スキーマで検証
    const validatedData = schema.parse(sanitized);

    return {
      success: true,
      data: validatedData,
      sanitized: true,
    };
  } catch (error) {
    // 検証に失敗した場合、可能な限り修正を試行
    try {
      const safeParsed = schema.safeParse(input);
      return {
        success: false,
        errors: error.issues,
        originalData: input,
        sanitized: false,
      };
    } catch {
      return {
        success: false,
        errors: error.issues,
        originalData: input,
        sanitized: false,
      };
    }
  }
}
