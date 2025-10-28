// ui.test.js

// استيراد الأدوات والدوال اللازمة للاختبار
import { describe, test, expect, beforeEach } from "vitest";
import { formatCurrency, setTranslations, setCurrentLanguage } from "./ui.js";

// مجموعة اختبارات خاصة بدالة formatCurrency
describe("formatCurrency function", () => {
  // قبل كل اختبار، تأكد من أن اللغة والترجمات مُعرفة
  beforeEach(() => {
    const mockTranslations = {
      ar: { currency: "ج.م" },
      en: { currency: "EGP" },
    };
    setTranslations(mockTranslations);
  });

  test("should format a positive number correctly in Arabic", () => {
    setCurrentLanguage("ar");
    // نتوقع أن تحويل الرقم 150 ينتج "150.00 ج.م"
    expect(formatCurrency(150)).toBe("150.00 ج.م");
  });

  test("should format a number with decimals correctly in English", () => {
    setCurrentLanguage("en");
    // نتوقع أن تحويل الرقم 75.5 ينتج "75.50 EGP"
    expect(formatCurrency(75.5)).toBe("75.50 EGP");
  });

  test("should format zero correctly", () => {
    setCurrentLanguage("en");
    // نتوقع أن تحويل الرقم 0 ينتج "0.00 EGP"
    expect(formatCurrency(0)).toBe("0.00 EGP");
  });

  test("should handle undefined or null values", () => {
    setCurrentLanguage("en");
    // نتوقع أن القيمة الفارغة تنتج "0.00 EGP"
    expect(formatCurrency(undefined)).toBe("0.00 EGP");
    expect(formatCurrency(null)).toBe("0.00 EGP");
  });
});
