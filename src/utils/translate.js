import { en } from "../locales/en.js";
import { tr } from "../locales/tr.js";

const translations = { en, tr };

export function getCurrentLanguage() {
  const storedLang = localStorage.getItem("language");
  if (storedLang && (storedLang === "en" || storedLang === "tr")) {
    return storedLang;
  }
  const htmlLang = document.documentElement.lang || "en";
  return translations[htmlLang] ? htmlLang : "en";
}

export function t(key, params = {}) {
  const currentLang = getCurrentLanguage();
  let text = translations[currentLang][key] || key;

  Object.keys(params).forEach((param) => {
    text = text?.replace(`{${param}}`, params[param]);
  });

  return text;
}

export function setLanguage(lang) {
  if (translations[lang]) {
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    window.location.reload();
  }
}

export function initLanguage() {
  const currentLang = getCurrentLanguage();
  document.documentElement.lang = currentLang;
}

initLanguage();
