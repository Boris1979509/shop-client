import { createI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";

/** Translate */
const i18n = createI18n({
  locale: "ru", // default locale
  legacy: false,
  fallbackLocale: "en",
  globalInjection: true,
  messages,
});
export default i18n;
