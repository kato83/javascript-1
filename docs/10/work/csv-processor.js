import { parse, stringify } from "@std/csv";

/**
 * 従業員CSVデータの解析
 * @param {string} csvText - CSV文字列
 * @returns {Object} 解析結果
 */
export function parseEmployeeCsv(csvText) {
  try {
    const records = parse(csvText, {
      skipFirstRow: true,
      columns: ["id", "name", "age", "department", "salary", "joinDate"],
    });

    // 最低限のデータ検証
    if (records.length === 0) {
      throw new Error("CSVデータが空です");
    }

    // データ型変換
    const employees = records.map((record, index) => {
      // 必須フィールドの検証
      if (
        !record.id || !record.name || !record.age || !record.department ||
        !record.salary
      ) {
        throw new Error(`行${index + 2}に必須フィールドが不足しています`);
      }

      const id = parseInt(record.id);
      const age = parseInt(record.age);
      const salary = parseInt(record.salary);

      // 数値変換の検証
      if (isNaN(id) || isNaN(age) || isNaN(salary)) {
        throw new Error(`行${index + 2}の数値フィールドが不正です`);
      }

      return {
        id,
        name: record.name,
        age,
        department: record.department,
        salary,
        joinDate: record.joinDate,
      };
    });

    // 統計情報を計算
    const totalEmployees = employees.length;
    const averageAge = employees.reduce((sum, emp) => sum + emp.age, 0) /
      totalEmployees;
    const averageSalary = employees.reduce((sum, emp) => sum + emp.salary, 0) /
      totalEmployees;

    const departments = [...new Set(employees.map((emp) => emp.department))];
    const departmentCounts = departments.reduce((acc, dept) => {
      acc[dept] = employees.filter((emp) => emp.department === dept).length;
      return acc;
    }, {});

    return {
      success: true,
      data: employees,
      statistics: {
        totalEmployees,
        averageAge: Math.round(averageAge * 100) / 100,
        averageSalary: Math.round(averageSalary),
        departments,
        departmentCounts,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * 売上データからCSVレポートを生成
 * @param {Array} salesData - 売上データの配列
 * @returns {string} CSV形式のレポート
 */
export function generateSalesReport(salesData) {
  // 月別売上集計
  const monthlySales = salesData.reduce((acc, sale) => {
    const month = sale.date.substring(0, 7); // YYYY-MM形式
    if (!acc[month]) {
      acc[month] = {
        month,
        totalSales: 0,
        orderCount: 0,
        averageOrderValue: 0,
      };
    }
    acc[month].totalSales += sale.amount;
    acc[month].orderCount += 1;
    return acc;
  }, {});

  // 平均注文額を計算
  Object.values(monthlySales).forEach((monthData) => {
    monthData.averageOrderValue = Math.round(
      monthData.totalSales / monthData.orderCount,
    );
  });

  const reportData = Object.values(monthlySales);

  return stringify(reportData, {
    columns: ["month", "totalSales", "orderCount", "averageOrderValue"],
  });
}

/**
 * 顧客データと注文データの結合
 * @param {string} customerCsv - 顧客CSVデータ
 * @param {string} orderCsv - 注文CSVデータ
 * @returns {Object} 結合結果
 */
export function mergeCustomerData(customerCsv, orderCsv) {
  try {
    const customers = parse(customerCsv, {
      skipFirstRow: true,
      columns: ["customerId", "name", "email", "registrationDate"],
    });

    const orders = parse(orderCsv, {
      skipFirstRow: true,
      columns: ["orderId", "customerId", "amount", "date"],
    });

    // データ検証
    if (customers.length === 0) {
      throw new Error("顧客CSVデータが空です");
    }

    if (orders.length === 0) {
      throw new Error("注文CSVデータが空です");
    }

    // 顧客データの検証
    customers.forEach((customer, index) => {
      if (!customer.customerId || !customer.name || !customer.email) {
        throw new Error(
          `顧客データの行${index + 2}に必須フィールドが不足しています`,
        );
      }
    });

    // 注文データの検証
    orders.forEach((order, index) => {
      if (!order.orderId || !order.customerId || !order.amount || !order.date) {
        throw new Error(
          `注文データの行${index + 2}に必須フィールドが不足しています`,
        );
      }
      if (isNaN(parseFloat(order.amount))) {
        throw new Error(`注文データの行${index + 2}の金額が不正です`);
      }
    });

    // 顧客ごとの注文情報を集計
    const customerOrderMap = orders.reduce((acc, order) => {
      const customerId = order.customerId;
      if (!acc[customerId]) {
        acc[customerId] = {
          orderCount: 0,
          totalSpent: 0,
          lastOrderDate: null,
          orders: [],
        };
      }

      acc[customerId].orderCount += 1;
      acc[customerId].totalSpent += parseFloat(order.amount);
      acc[customerId].orders.push(order);

      if (
        !acc[customerId].lastOrderDate ||
        order.date > acc[customerId].lastOrderDate
      ) {
        acc[customerId].lastOrderDate = order.date;
      }

      return acc;
    }, {});

    // 顧客データと注文データを結合
    const mergedData = customers.map((customer) => {
      const orderInfo = customerOrderMap[customer.customerId] || {
        orderCount: 0,
        totalSpent: 0,
        lastOrderDate: null,
      };

      return {
        customerId: customer.customerId,
        name: customer.name,
        email: customer.email,
        registrationDate: customer.registrationDate,
        orderCount: orderInfo.orderCount,
        totalSpent: orderInfo.totalSpent,
        averageOrderValue: orderInfo.orderCount > 0
          ? Math.round(orderInfo.totalSpent / orderInfo.orderCount)
          : 0,
        lastOrderDate: orderInfo.lastOrderDate,
      };
    });

    return {
      success: true,
      data: mergedData,
      summary: {
        totalCustomers: customers.length,
        activeCustomers: mergedData.filter((c) => c.orderCount > 0).length,
        totalOrders: orders.length,
        totalRevenue: orders.reduce(
          (sum, order) => sum + parseFloat(order.amount),
          0,
        ),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * CSVデータのフィルタリング
 * @param {string} csvText - CSV文字列
 * @param {Function} filterCondition - フィルタ条件関数
 * @returns {string} フィルタされたCSV
 */
export function filterCsvData(csvText, filterCondition) {
  try {
    const records = parse(csvText, { skipFirstRow: false });
    const headers = records[0];
    const dataRows = records.slice(1);

    // ヘッダーをオブジェクトキーとして使用
    const objectData = dataRows.map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });

    // フィルタ条件を適用
    const filteredData = objectData.filter(filterCondition);

    // オブジェクトを配列に戻す
    const filteredRows = filteredData.map((obj) =>
      headers.map((header) => obj[header])
    );

    // ヘッダーを追加
    const result = [headers, ...filteredRows];

    return stringify(result);
  } catch (error) {
    throw new Error(`CSVフィルタリングエラー: ${error.message}`);
  }
}

/**
 * CSVデータの集計
 * @param {string} csvText - CSV文字列
 * @param {string} groupByColumn - グループ化するカラム名
 * @param {string} aggregateColumn - 集計するカラム名
 * @returns {Object} 集計結果
 */
export function aggregateCsvData(csvText, groupByColumn, aggregateColumn) {
  try {
    const records = parse(csvText, { skipFirstRow: false });
    const headers = records[0];
    const dataRows = records.slice(1);

    // ヘッダーの存在確認
    if (
      !headers.includes(groupByColumn) || !headers.includes(aggregateColumn)
    ) {
      throw new Error("指定されたカラムが存在しません");
    }

    const groupByIndex = headers.indexOf(groupByColumn);
    const aggregateIndex = headers.indexOf(aggregateColumn);

    // グループ化と集計
    const groups = dataRows.reduce((acc, row) => {
      const groupKey = row[groupByIndex];
      const value = parseFloat(row[aggregateIndex]) || 0;

      if (!acc[groupKey]) {
        acc[groupKey] = {
          count: 0,
          sum: 0,
          values: [],
        };
      }

      acc[groupKey].count += 1;
      acc[groupKey].sum += value;
      acc[groupKey].values.push(value);

      return acc;
    }, {});

    // 統計計算
    const aggregatedData = Object.entries(groups).map(([key, data]) => ({
      [groupByColumn]: key,
      count: data.count,
      sum: data.sum,
      average: Math.round((data.sum / data.count) * 100) / 100,
      min: Math.min(...data.values),
      max: Math.max(...data.values),
    }));

    return {
      success: true,
      data: aggregatedData,
      summary: {
        totalGroups: Object.keys(groups).length,
        totalRecords: dataRows.length,
        groupByColumn,
        aggregateColumn,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * CSVフォーマットの検証
 * @param {string} csvText - CSV文字列
 * @param {Array} expectedHeaders - 期待されるヘッダー配列
 * @returns {Object} 検証結果
 */
export function validateCsvFormat(csvText, expectedHeaders) {
  try {
    const records = parse(csvText, { skipFirstRow: false });

    if (records.length === 0) {
      return {
        isValid: false,
        errors: ["CSVデータが空です"],
      };
    }

    const actualHeaders = records[0];
    const errors = [];

    // ヘッダー数の確認
    if (actualHeaders.length !== expectedHeaders.length) {
      errors.push(
        `ヘッダー数が一致しません。期待値: ${expectedHeaders.length}, 実際: ${actualHeaders.length}`,
      );
    }

    // ヘッダー名の確認
    expectedHeaders.forEach((expectedHeader, index) => {
      if (actualHeaders[index] !== expectedHeader) {
        errors.push(
          `ヘッダー[${index}]が一致しません。期待値: "${expectedHeader}", 実際: "${
            actualHeaders[index]
          }"`,
        );
      }
    });

    // データ行の確認
    const dataRows = records.slice(1);
    dataRows.forEach((row, rowIndex) => {
      if (row.length !== expectedHeaders.length) {
        errors.push(
          `行${
            rowIndex + 2
          }のカラム数が一致しません。期待値: ${expectedHeaders.length}, 実際: ${row.length}`,
        );
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      actualHeaders,
      expectedHeaders,
      rowCount: dataRows.length,
      columnCount: actualHeaders.length,
    };
  } catch (error) {
    return {
      isValid: false,
      errors: [`CSV解析エラー: ${error.message}`],
    };
  }
}
