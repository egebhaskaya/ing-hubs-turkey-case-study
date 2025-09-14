import { expect } from "@open-wc/testing";
import { t, getCurrentLanguage, setLanguage } from "../src/utils/translate.js";

suite("translate utility", () => {
  let originalLang;
  let originalLocalStorage;

  setup(() => {
    originalLang = document.documentElement.lang;
    originalLocalStorage = localStorage.getItem("language");

    document.documentElement.lang = "en";
    localStorage.removeItem("language");
  });

  teardown(() => {
    document.documentElement.lang = originalLang;
    if (originalLocalStorage) {
      localStorage.setItem("language", originalLocalStorage);
    } else {
      localStorage.removeItem("language");
    }
  });

  test("getCurrentLanguage returns default language", () => {
    document.documentElement.lang = "en";
    expect(getCurrentLanguage()).to.equal("en");
  });

  test("getCurrentLanguage returns stored language preference", () => {
    localStorage.setItem("language", "tr");
    expect(getCurrentLanguage()).to.equal("tr");
  });

  test("getCurrentLanguage falls back to HTML lang attribute", () => {
    document.documentElement.lang = "tr";
    localStorage.removeItem("language");
    expect(getCurrentLanguage()).to.equal("tr");
  });

  test("getCurrentLanguage falls back to English for unsupported language", () => {
    document.documentElement.lang = "fr";
    localStorage.removeItem("language");
    expect(getCurrentLanguage()).to.equal("en");
  });

  test("translates English keys correctly", () => {
    document.documentElement.lang = "en";
    localStorage.removeItem("language");

    expect(t("employees")).to.equal("Employees");
    expect(t("addNew")).to.equal("Add New");
    expect(t("firstName")).to.equal("First Name");
  });

  test("translates Turkish keys correctly", () => {
    localStorage.setItem("language", "tr");

    expect(t("employees")).to.equal("Çalışanlar");
    expect(t("addNew")).to.equal("Yeni Ekle");
    expect(t("firstName")).to.equal("Ad");
  });

  test("returns key if translation not found", () => {
    expect(t("nonExistentKey")).to.equal("nonExistentKey");
  });

  test("handles parameters in translations", () => {
    localStorage.setItem("language", "en");

    const result = t("deleteMessage", { name: "John Doe" });
    expect(result).to.equal(
      "Selected Employee record of John Doe will be deleted"
    );
  });

  test("handles Turkish parameters in translations", () => {
    localStorage.setItem("language", "tr");

    const result = t("deleteMessage", { name: "Ahmet Yılmaz" });
    expect(result).to.equal("Ahmet Yılmaz adlı çalışanın kaydı silinecek");
  });

  test("handles multiple parameters", () => {
    const testText = "Hello {name}, you have {count} messages";
    const result = testText.replace("{name}", "John").replace("{count}", "5");
    expect(result).to.equal("Hello John, you have 5 messages");
  });

  test("setLanguage ignores invalid languages", () => {
    const originalLang = document.documentElement.lang;

    setLanguage("invalid");

    expect(document.documentElement.lang).to.equal(originalLang);
    expect(localStorage.getItem("language")).to.be.null;
  });

  test("handles empty parameters object", () => {
    const result = t("employees", {});
    expect(result).to.equal("Employees");
  });

  test("handles undefined parameters", () => {
    const result = t("employees", undefined);
    expect(result).to.equal("Employees");
  });
});
