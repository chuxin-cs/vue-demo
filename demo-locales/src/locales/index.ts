import { createI18n } from "vue-i18n";
import en from "./lang/en";
import zh_CN from "./lang/zh_CN";

// 创建一个 i18n 实例，用于处理多语言支持
const i18n = createI18n({
  // Vue 3 必须设置为 false，以使用组合式 API 模式
  legacy: false, 
  // 设置当前使用的语言为英语
  locale: "en",
  // 当指定语言的翻译缺失时，使用英语作为备用语言
  fallbackLocale: "en",
  // 定义不同语言的翻译消息对象
  messages: {
    // 英语翻译消息对象
    en,
    // 简体中文翻译消息对象
    zh_CN,
  },
});

export default i18n;
