/**
 * 学生管理システムオブジェクト
 */
export const studentManager = {
  // 学生オブジェクトの配列
  students: [],

  // 次のIDを管理するプロパティ
  nextId: 1,

  /**
   * 新しい学生を追加
   * @param {string} name - 学生名
   * @param {number} age - 年齢
   * @param {string} grade - 学年
   */
  addStudent: function (name, age, grade) {
    const student = {
      id: this.nextId++,
      name: name,
      age: age,
      grade: grade,
      scores: [],
    };
    this.students.push(student);
  },

  /**
   * IDで学生を検索
   * @param {number} id - 学生ID
   * @returns {Object|null} 学生オブジェクト（見つからない場合はnull）
   */
  findStudentById: function (id) {
    for (const student of this.students) {
      if (student.id === id) {
        return student;
      }
    }
    return null;
  },

  /**
   * 学生に点数を追加
   * @param {number} studentId - 学生ID
   * @param {number} score - 点数
   * @returns {boolean} 成功した場合はtrue、失敗した場合はfalse
   */
  addScore: function (studentId, score) {
    const student = this.findStudentById(studentId);
    if (student) {
      student.scores.push(score);
      return true;
    }
    return false;
  },

  /**
   * 学生の平均点を計算
   * @param {number} studentId - 学生ID
   * @returns {number} 平均点（学生が見つからない場合や点数がない場合は0）
   */
  calculateStudentAverage: function (studentId) {
    const student = this.findStudentById(studentId);
    if (!student || student.scores.length === 0) {
      return 0;
    }

    let total = 0;
    for (const score of student.scores) {
      total += score;
    }
    return total / student.scores.length;
  },

  /**
   * 指定された学年の学生一覧を取得
   * @param {string} grade - 学年
   * @returns {Array} 指定された学年の学生配列
   */
  getStudentsByGrade: function (grade) {
    const result = [];
    for (const student of this.students) {
      if (student.grade === grade) {
        result.push(student);
      }
    }
    return result;
  },

  /**
   * 平均点が最も高い学生を取得
   * @returns {Object|null} 最優秀学生（点数がある学生がいない場合はnull）
   */
  getTopStudent: function () {
    let topStudent = null;
    let highestAverage = 0;

    for (const student of this.students) {
      const average = this.calculateStudentAverage(student.id);
      if (average > 0 && average > highestAverage) {
        highestAverage = average;
        topStudent = student;
      }
    }

    return topStudent;
  },

  /**
   * 学生数を取得
   * @returns {number} 学生数
   */
  getStudentCount: function () {
    return this.students.length;
  },
};
