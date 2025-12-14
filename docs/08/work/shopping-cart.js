/**
 * ショッピングカートオブジェクト
 */
export const shoppingCart = {
  // 商品オブジェクトの配列
  items: [],

  /**
   * 商品をカートに追加（既存の商品の場合は数量を増加）
   * @param {number} id - 商品ID
   * @param {string} name - 商品名
   * @param {number} price - 価格
   * @param {number} quantity - 数量
   */
  addItem: function (id, name, price, quantity) {
    const existingItem = this.getItem(id);

    if (existingItem) {
      // 既存の商品の場合は数量を増加
      existingItem.quantity += quantity;
    } else {
      // 新しい商品の場合は追加
      this.items.push({
        id: id,
        name: name,
        price: price,
        quantity: quantity,
      });
    }
  },

  /**
   * 商品をカートから削除
   * @param {number} id - 商品ID
   * @returns {boolean} 削除に成功した場合はtrue、失敗した場合はfalse
   */
  removeItem: function (id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        this.items.splice(i, 1);
        return true;
      }
    }
    return false;
  },

  /**
   * 商品の数量を更新
   * @param {number} id - 商品ID
   * @param {number} quantity - 新しい数量
   * @returns {boolean} 更新に成功した場合はtrue、失敗した場合はfalse
   */
  updateQuantity: function (id, quantity) {
    const item = this.getItem(id);

    if (item) {
      if (quantity <= 0) {
        // 数量が0以下の場合は商品を削除
        return this.removeItem(id);
      } else {
        item.quantity = quantity;
        return true;
      }
    }
    return false;
  },

  /**
   * IDで商品を検索
   * @param {number} id - 商品ID
   * @returns {Object|null} 商品オブジェクト（見つからない場合はnull）
   */
  getItem: function (id) {
    for (const item of this.items) {
      if (item.id === id) {
        return item;
      }
    }
    return null;
  },

  /**
   * カート内の商品の合計金額を計算
   * @returns {number} 合計金額
   */
  getTotalPrice: function () {
    let total = 0;
    for (const item of this.items) {
      total += item.price * item.quantity;
    }
    return total;
  },

  /**
   * カート内の商品の総数を計算
   * @returns {number} 商品の総数
   */
  getTotalItems: function () {
    let total = 0;
    for (const item of this.items) {
      total += item.quantity;
    }
    return total;
  },

  /**
   * カートを空にする
   */
  clearCart: function () {
    this.items.length = 0;
  },

  /**
   * 価格順（昇順）で商品一覧を取得
   * @returns {Array} 価格順にソートされた商品配列
   */
  getItemsSortedByPrice: function () {
    return this.items.slice().sort(function (a, b) {
      return a.price - b.price;
    });
  },
};
