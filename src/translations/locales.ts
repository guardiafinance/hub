import { I18nLocaleConfig } from "@docusaurus/types";

export function getLocaleConfigs(): Record<string, I18nLocaleConfig> {
  return {
    'pt-BR': {
      label: 'Português',
      direction: 'ltr',
      htmlLang: 'pt-BR',
      calendar: 'gregory',
      path: 'pt-BR',
    },
    'en': {
      label: 'English',
      direction: 'ltr',
      htmlLang: 'en',
      calendar: 'gregory',
      path: 'en',
    },
    'es': {
      label: 'Español',
      direction: 'ltr',
      htmlLang: 'es',
      calendar: 'gregory',
      path: 'es',
    },
  };
}
