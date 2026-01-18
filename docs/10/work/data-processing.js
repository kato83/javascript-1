import _ from "lodash";

/**
 * 従業員データを分析（部署別集計、平均年齢など）
 * @param {Array} employees - 従業員データの配列
 * @returns {Object} 分析結果
 */
export function analyzeEmployees(employees) {
  const byDepartment = _.groupBy(employees, "department");
  const averageAge = _.meanBy(employees, "age");
  const totalSalary = _.sumBy(employees, "salary");
  const departmentStats = _.mapValues(byDepartment, (deptEmployees) => ({
    count: deptEmployees.length,
    averageAge: _.meanBy(deptEmployees, "age"),
    averageSalary: _.meanBy(deptEmployees, "salary"),
    totalSalary: _.sumBy(deptEmployees, "salary"),
  }));

  return {
    totalEmployees: employees.length,
    averageAge: Math.round(averageAge * 100) / 100,
    totalSalary,
    departmentStats,
    departments: Object.keys(byDepartment),
  };
}

/**
 * 注文データを処理（顧客別集計、売上分析など）
 * @param {Array} orders - 注文データの配列
 * @returns {Object} 処理結果
 */
export function processOrders(orders) {
  const byCustomer = _.groupBy(orders, "customerId");
  const totalRevenue = _.sumBy(orders, "amount");
  const averageOrderValue = _.meanBy(orders, "amount");

  const customerStats = _.mapValues(byCustomer, (customerOrders) => ({
    orderCount: customerOrders.length,
    totalSpent: _.sumBy(customerOrders, "amount"),
    averageOrderValue: _.meanBy(customerOrders, "amount"),
    lastOrderDate: _.maxBy(customerOrders, "date")?.date,
  }));

  const topCustomers = _.chain(customerStats)
    .toPairs()
    .sortBy(([, stats]) => -stats.totalSpent)
    .take(5)
    .fromPairs()
    .value();

  return {
    totalOrders: orders.length,
    totalRevenue,
    averageOrderValue: Math.round(averageOrderValue * 100) / 100,
    customerStats,
    topCustomers,
    uniqueCustomers: Object.keys(byCustomer).length,
  };
}

/**
 * 在庫データを最適化（カテゴリ別整理、低在庫アラートなど）
 * @param {Array} products - 商品データの配列
 * @returns {Object} 最適化結果
 */
export function optimizeInventory(products) {
  const byCategory = _.groupBy(products, "category");
  const lowStockThreshold = 10;
  const lowStockItems = _.filter(
    products,
    (product) => product.stock < lowStockThreshold,
  );
  const outOfStockItems = _.filter(products, (product) => product.stock === 0);

  const categoryStats = _.mapValues(byCategory, (categoryProducts) => ({
    itemCount: categoryProducts.length,
    totalValue: _.sumBy(categoryProducts, (p) => p.price * p.stock),
    averagePrice: _.meanBy(categoryProducts, "price"),
    totalStock: _.sumBy(categoryProducts, "stock"),
    lowStockCount: _.filter(categoryProducts, (p) =>
      p.stock < lowStockThreshold).length,
  }));

  const recommendations = {
    reorderSoon: lowStockItems
      .filter((item) => item.stock > 0)
      .map((item) => ({
        id: item.id,
        name: item.name,
        currentStock: item.stock,
        suggestedOrder: Math.max(50, item.stock * 3),
      })),
    urgentReorder: outOfStockItems.map((item) => ({
      id: item.id,
      name: item.name,
      priority: "HIGH",
    })),
  };

  return {
    totalProducts: products.length,
    totalValue: _.sumBy(products, (p) => p.price * p.stock),
    categoryStats,
    lowStockItems: lowStockItems.length,
    outOfStockItems: outOfStockItems.length,
    recommendations,
  };
}

/**
 * 指定したキーでデータをグループ化してレポート生成
 * @param {Array} data - データ配列
 * @param {string} groupBy - グループ化するキー
 * @returns {Object} レポート
 */
export function generateReport(data, groupBy) {
  const grouped = _.groupBy(data, groupBy);
  const summary = _.mapValues(grouped, (group) => ({
    count: group.length,
    items: group,
  }));

  return {
    groupBy,
    totalItems: data.length,
    groups: Object.keys(grouped).length,
    summary,
  };
}

/**
 * 指定した指標でトップパフォーマーを抽出
 * @param {Array} salesData - 売上データ
 * @param {string} metric - 指標（例: "sales", "revenue"）
 * @returns {Array} トップパフォーマーのリスト
 */
export function findTopPerformers(salesData, metric) {
  return _.chain(salesData)
    .sortBy(metric)
    .reverse()
    .take(5)
    .map((item, index) => ({
      rank: index + 1,
      ...item,
      performance: item[metric],
    }))
    .value();
}

/**
 * データセットのクリーニング（重複削除、欠損値処理など）
 * @param {Array} rawData - 生データ
 * @returns {Object} クリーニング結果
 */
export function cleanDataset(rawData) {
  // 重複削除（idベース）
  const uniqueData = _.uniqBy(rawData, "id");

  // 欠損値を持つレコードを特定
  const incompleteRecords = _.filter(uniqueData, (record) => {
    return _.some(
      record,
      (value) => value === null || value === undefined || value === "",
    );
  });

  // 完全なレコードのみを抽出
  const completeRecords = _.filter(uniqueData, (record) => {
    return _.every(
      record,
      (value) => value !== null && value !== undefined && value !== "",
    );
  });

  // 数値フィールドの統計
  const numericFields = ["age", "salary", "price", "amount", "stock"];
  const statistics = {};

  numericFields.forEach((field) => {
    const values = _.compact(_.map(completeRecords, field));
    if (values.length > 0) {
      statistics[field] = {
        min: _.min(values),
        max: _.max(values),
        mean: _.mean(values),
        median: values.sort((a, b) => a - b)[Math.floor(values.length / 2)],
      };
    }
  });

  return {
    original: {
      count: rawData.length,
      duplicates: rawData.length - uniqueData.length,
    },
    cleaned: {
      total: uniqueData.length,
      complete: completeRecords.length,
      incomplete: incompleteRecords.length,
    },
    data: completeRecords,
    incompleteRecords,
    statistics,
  };
}
