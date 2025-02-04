import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'Guardia Developer Hub',
  tagline: 'Guardia Developer Hub',
  favicon: 'img/favicon.ico',
  url: 'https://hub.guardia.finance',
  baseUrl: '/hub/',
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
