import {themes as prismThemes} from 'prism-react-renderer';
import type {Config, ThemeConfig} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Guardia',
  tagline: 'Developer Hub',
  favicon: 'img/favicon.ico',
  url: 'https://hub.guardia.finance',
  baseUrl: '/',
  organizationName: 'guardiafinance',
  projectName: 'hub',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR','en','es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',         
        },  
        blog: false,      
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {    
    metadata: [
      {name: 'keywords', content: 'guardia, finance, api, sdk, developer, hub, documentation, fintech, open source'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    image: 'img/docusaurus-social-card.jpg',
    navbar: {      
      logo: {
        alt: 'Guardia Logo',
        src: 'img/logotipo-purple.png',
        srcDark: 'img/logotipo-white.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },        
        {
          href: 'https://github.com/guardiafinance',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right'
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      disableSwitch: false,
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    // Configurações de Open Graph
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: 'https://hub.guardia.finance',
      siteName: 'Guardia',
      title: 'Developer Hub',
      description: 'Documentação técnica, guias e recursos para a comunidade de desenvolvedores da Guardia',
      images: [
        {
          url: 'img/logotipo-purple.png',
          width: 1200,
          height: 630,
          alt: 'Guardia Developer Hub',
        },
      ],
    },
    // Configurações do Twitter
    twitter: {
      cardType: 'summary_large_image',
      site: '@guardiafinance',
      creator: '@guardiafinance',
    },
  } satisfies Preset.ThemeConfig,

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
      },
    },
  ],

  // Configurações de SEO
  titleDelimiter: '|',
  noIndex: false,
  trailingSlash: true,
  
  plugins: [
  ],
};

export default config;
