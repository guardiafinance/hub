import React from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function HreflangTags() {
  const location = useLocation();
  const { i18n } = useDocusaurusContext();
  const { defaultLocale, locales } = i18n;
  const currentPath = location.pathname;

  // Remove o prefixo do idioma atual do path
  const pathWithoutLocale = currentPath.replace(`/${i18n.currentLocale}`, '');

  return (
    <>
      {/* Tag x-default */}
      <link
        rel="alternate"
        href={`https://hub.guardia.finance${pathWithoutLocale}`}
        hrefLang="x-default"
      />
      
      {/* Tags para cada idioma */}
      {locales.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          href={`https://hub.guardia.finance${locale === defaultLocale ? '' : `/${locale}`}${pathWithoutLocale}`}
          hrefLang={locale}
        />
      ))}
    </>
  );
} 