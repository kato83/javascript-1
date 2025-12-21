import { assertEquals } from "@std/assert";
import { librarySystem } from "./library-system.js";

Deno.test("librarySystem - 初期状態", () => {
  assertEquals(Array.isArray(librarySystem.books), true);
  assertEquals(Array.isArray(librarySystem.members), true);
  assertEquals(Array.isArray(librarySystem.loans), true);
});

Deno.test("librarySystem - 本の追加", () => {
  const initialBookCount = librarySystem.books.length;

  librarySystem.addBook("JavaScript入門", "山田太郎", "978-1234567890");

  assertEquals(librarySystem.books.length, initialBookCount + 1);

  const addedBook = librarySystem.books[librarySystem.books.length - 1];
  assertEquals(addedBook.title, "JavaScript入門");
  assertEquals(addedBook.author, "山田太郎");
  assertEquals(addedBook.isbn, "978-1234567890");
  assertEquals(addedBook.available, true);
  assertEquals(typeof addedBook.id, "number");
});

Deno.test("librarySystem - 会員の追加", () => {
  const initialMemberCount = librarySystem.members.length;

  librarySystem.addMember("佐藤花子", "sato@example.com");

  assertEquals(librarySystem.members.length, initialMemberCount + 1);

  const addedMember = librarySystem.members[librarySystem.members.length - 1];
  assertEquals(addedMember.name, "佐藤花子");
  assertEquals(addedMember.email, "sato@example.com");
  assertEquals(typeof addedMember.id, "number");
  assertEquals(addedMember.joinDate instanceof Date, true);
});

Deno.test("librarySystem - 本の貸出と返却", () => {
  // テスト用のデータを追加
  librarySystem.addBook("テスト本", "テスト著者", "978-0000000000");
  librarySystem.addMember("テスト会員", "test@example.com");

  const book = librarySystem.books[librarySystem.books.length - 1];
  const member = librarySystem.members[librarySystem.members.length - 1];

  // 貸出テスト
  const lendResult = librarySystem.lendBook(book.id, member.id);
  assertEquals(typeof lendResult, "string");
  assertEquals(book.available, false);

  // 貸出記録の確認
  const loanRecord = librarySystem.loans.find((loan) =>
    loan.bookId === book.id && loan.memberId === member.id && !loan.returnDate
  );
  assertEquals(loanRecord !== undefined, true);
  assertEquals(loanRecord.loanDate instanceof Date, true);

  // 返却テスト
  const returnResult = librarySystem.returnBook(book.id, member.id);
  assertEquals(typeof returnResult, "string");
  assertEquals(book.available, true);

  // 返却記録の確認
  const updatedLoanRecord = librarySystem.loans.find((loan) =>
    loan.bookId === book.id && loan.memberId === member.id
  );
  assertEquals(updatedLoanRecord.returnDate instanceof Date, true);
});

Deno.test("librarySystem - 利用可能な本の取得", () => {
  librarySystem.addBook("利用可能本1", "著者1", "978-1111111111");
  librarySystem.addBook("利用可能本2", "著者2", "978-2222222222");

  const availableBooks = librarySystem.findAvailableBooks();
  assertEquals(Array.isArray(availableBooks), true);

  for (const book of availableBooks) {
    assertEquals(book.available, true);
  }
});

Deno.test("librarySystem - 会員の貸出履歴取得", () => {
  librarySystem.addBook("履歴テスト本", "履歴著者", "978-3333333333");
  librarySystem.addMember("履歴テスト会員", "history@example.com");

  const book = librarySystem.books[librarySystem.books.length - 1];
  const member = librarySystem.members[librarySystem.members.length - 1];

  librarySystem.lendBook(book.id, member.id);

  const memberLoans = librarySystem.getMemberLoans(member.id);
  assertEquals(Array.isArray(memberLoans), true);
  assertEquals(memberLoans.length >= 1, true);

  const loan = memberLoans.find((loan) => loan.bookId === book.id);
  assertEquals(loan !== undefined, true);
});

Deno.test("librarySystem - 延滞本の取得", () => {
  const overdueBooks = librarySystem.getOverdueBooks();
  assertEquals(Array.isArray(overdueBooks), true);

  // 延滞本がある場合の確認（実際の延滞本があるかは実装による）
  for (const overdueInfo of overdueBooks) {
    assertEquals(typeof overdueInfo.book, "object");
    assertEquals(typeof overdueInfo.member, "object");
    assertEquals(typeof overdueInfo.loan, "object");
    assertEquals(overdueInfo.loan.loanDate instanceof Date, true);
  }
});

Deno.test("librarySystem - エラーケースの処理", () => {
  // 存在しない本の貸出
  const invalidBookResult = librarySystem.lendBook(99999, 1);
  assertEquals(typeof invalidBookResult, "string");

  // 存在しない会員への貸出
  const invalidMemberResult = librarySystem.lendBook(1, 99999);
  assertEquals(typeof invalidMemberResult, "string");

  // 既に貸出中の本の貸出
  librarySystem.addBook("重複テスト本", "重複著者", "978-4444444444");
  librarySystem.addMember("重複テスト会員1", "dup1@example.com");
  librarySystem.addMember("重複テスト会員2", "dup2@example.com");

  const book = librarySystem.books[librarySystem.books.length - 1];
  const member1 = librarySystem.members[librarySystem.members.length - 2];
  const member2 = librarySystem.members[librarySystem.members.length - 1];

  librarySystem.lendBook(book.id, member1.id);
  const duplicateResult = librarySystem.lendBook(book.id, member2.id);
  assertEquals(typeof duplicateResult, "string");
});

Deno.test("librarySystem - 複数操作の組み合わせ", () => {
  librarySystem.addBook("組み合わせ本1", "組み合わせ著者1", "978-5555555555");
  librarySystem.addBook("組み合わせ本2", "組み合わせ著者2", "978-6666666666");
  librarySystem.addMember("組み合わせ会員", "combo@example.com");

  const book1 = librarySystem.books[librarySystem.books.length - 2];
  const book2 = librarySystem.books[librarySystem.books.length - 1];
  const member = librarySystem.members[librarySystem.members.length - 1];

  // 複数の本を借りる
  librarySystem.lendBook(book1.id, member.id);
  librarySystem.lendBook(book2.id, member.id);

  // 会員の貸出履歴を確認
  const memberLoans = librarySystem.getMemberLoans(member.id);
  assertEquals(memberLoans.length >= 2, true);

  // 1冊返却
  librarySystem.returnBook(book1.id, member.id);
  assertEquals(book1.available, true);
  assertEquals(book2.available, false);

  // 利用可能な本の確認
  const availableBooks = librarySystem.findAvailableBooks();
  const isBook1Available = availableBooks.some((book) => book.id === book1.id);
  const isBook2Available = availableBooks.some((book) => book.id === book2.id);

  assertEquals(isBook1Available, true);
  assertEquals(isBook2Available, false);
});
