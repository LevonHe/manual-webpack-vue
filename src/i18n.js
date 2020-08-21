import Vue from 'vue';
import VueI18n from 'vue-i18n';
import CookieService from '@/util/CookieService';

Vue.use(VueI18n);

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /\.locale\.js/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\.locale\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      const localeElementUI = require(`element-ui/lib/locale/lang/${locales(key)._element}`);
      messages[locale] = {
        ...locales(key),
        ...(localeElementUI ? localeElementUI.default : {}),
      };
    }
  });
  return messages;
}

const messages = loadLocaleMessages();

Vue.prototype.$languages = Object.keys(messages).map((language) => ({
  label: messages[language]._name,
  value: language,
}));

let langValue = CookieService.getCookie('Business-Lang');
if (!langValue || !['zh-CN', 'en'].includes(langValue)) {
  langValue = 'zh-CN';
}

const i18n = new VueI18n({
  locale: langValue,
  fallbackLocale: 'en',
  messages,
});

export default i18n;
