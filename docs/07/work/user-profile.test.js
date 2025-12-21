import { assertEquals } from "@std/assert";
import { userProfile } from "./user-profile.js";

Deno.test("userProfile - 基本プロパティの存在確認", () => {
  assertEquals(typeof userProfile.username, "string");
  assertEquals(typeof userProfile.email, "string");
});

Deno.test("userProfile - ネストされたプロパティのアクセス", () => {
  assertEquals(typeof userProfile.personalInfo.firstName, "string");
  assertEquals(typeof userProfile.personalInfo.lastName, "string");
  assertEquals(typeof userProfile.personalInfo.age, "number");
  assertEquals(typeof userProfile.personalInfo.birthday, "string");

  assertEquals(typeof userProfile.address.country, "string");
  assertEquals(typeof userProfile.address.prefecture, "string");
  assertEquals(typeof userProfile.address.city, "string");
  assertEquals(typeof userProfile.address.zipCode, "string");

  assertEquals(typeof userProfile.settings.theme, "string");
  assertEquals(typeof userProfile.settings.language, "string");
  assertEquals(typeof userProfile.settings.notifications, "boolean");
});

Deno.test("userProfile - getFullName メソッド", () => {
  const fullName = userProfile.getFullName();
  assertEquals(typeof fullName, "string");
  assertEquals(fullName.includes(userProfile.personalInfo.firstName), true);
  assertEquals(fullName.includes(userProfile.personalInfo.lastName), true);
});

Deno.test("userProfile - getFullAddress メソッド", () => {
  const fullAddress = userProfile.getFullAddress();
  assertEquals(typeof fullAddress, "string");
  assertEquals(fullAddress.includes(userProfile.address.country), true);
  assertEquals(fullAddress.includes(userProfile.address.prefecture), true);
  assertEquals(fullAddress.includes(userProfile.address.city), true);
});

Deno.test("userProfile - updateEmail メソッド", () => {
  const originalEmail = userProfile.email;
  const newEmail = "newemail@example.com";

  userProfile.updateEmail(newEmail);
  assertEquals(userProfile.email, newEmail);

  // 元に戻す
  userProfile.updateEmail(originalEmail);
});

Deno.test("userProfile - toggleNotifications メソッド", () => {
  const originalNotifications = userProfile.settings.notifications;

  userProfile.toggleNotifications();
  assertEquals(userProfile.settings.notifications, !originalNotifications);

  userProfile.toggleNotifications();
  assertEquals(userProfile.settings.notifications, originalNotifications);
});

Deno.test("userProfile - ネストされたプロパティの変更", () => {
  const originalAge = userProfile.personalInfo.age;
  const originalCity = userProfile.address.city;

  userProfile.personalInfo.age = 30;
  userProfile.address.city = "大阪市";

  assertEquals(userProfile.personalInfo.age, 30);
  assertEquals(userProfile.address.city, "大阪市");

  // 元に戻す
  userProfile.personalInfo.age = originalAge;
  userProfile.address.city = originalCity;
});

Deno.test("userProfile - 深いネストのアクセス", () => {
  // 3層の深さでアクセスできることを確認
  assertEquals(typeof userProfile.personalInfo.firstName, "string");
  assertEquals(typeof userProfile.address.zipCode, "string");
  assertEquals(typeof userProfile.settings.theme, "string");
});

Deno.test("userProfile - プロパティの存在確認", () => {
  assertEquals("username" in userProfile, true);
  assertEquals("email" in userProfile, true);
  assertEquals("personalInfo" in userProfile, true);
  assertEquals("address" in userProfile, true);
  assertEquals("settings" in userProfile, true);

  assertEquals("firstName" in userProfile.personalInfo, true);
  assertEquals("country" in userProfile.address, true);
  assertEquals("notifications" in userProfile.settings, true);
});
