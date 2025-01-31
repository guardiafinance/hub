import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Guardia Developer Hub',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',
  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',
  organizationName: 'facebook',
  projectName: 'hub',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',          
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {    
    image: 'img/docusaurus-social-card.jpg',
    navbar: {      
      logo: {
        alt: 'Guardia Logo',
        src: 'img/logotipo-white.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },        
        {
          href: 'https://github.com/guardiafinance',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `© Guardia, ${new Date().getFullYear()}. Todos os direitos reservados.`,
      links: [
        {
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/guardiafinance',
            },
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/company/guardia-finance',
            },
            {
              label: 'Instagram',
              href: 'https://instagram.com/guardia',
            },
            {
              label: 'Facebook',
              href: 'https://facebook.com/guardia',
            },
            {
              label: 'YouTube',
              href: 'https://youtube.com/guardia',
            },
          ],
        },
        {
          items: [
            {
              label: 'Política de Privacidade',
              to: '/privacy',
            },
            {
              label: 'Política de Segurança',
              to: '/security',
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      disableSwitch: true,
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
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

  plugins: [
  ],
};

export default config;
