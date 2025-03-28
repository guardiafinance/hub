import React from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ConstructionBanner from '@site/src/components/ConstructionBanner';
import HreflangTags from '@site/src/components/HreflangTags';

export default function Root({ children }) {
  const location = useLocation();
  const { i18n, siteConfig } = useDocusaurusContext();
  const isDocPage = location.pathname.startsWith('/docs/');

  // Schema.org markup para documentação técnica
  const schemaOrgMarkup = {
    '@context': 'https://schema.org',
    '@type': isDocPage ? 'TechArticle' : 'WebSite',
    headline: isDocPage ? 'Guardia Documentation' : siteConfig.title,
    description: siteConfig.tagline,
    author: {
      '@type': 'Organization',
      name: 'Guardia Finance',
      url: 'https://guardia.finance'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Guardia Finance',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hub.guardia.finance/img/logotipo-purple.png'
      }
    },
    inLanguage: i18n.currentLocale || 'pt-BR',
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hub.guardia.finance${location.pathname}`
    }
  };

  return (
    <>
      <HreflangTags />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrgMarkup)
        }}
      />
      <ConstructionBanner />
      {children}
    </>
  );
} 