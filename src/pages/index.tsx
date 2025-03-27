import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ConstructionBanner from '@site/src/components/ConstructionBanner';
import ProductCards from '@site/src/components/ProductCards';
import DocLinks from '@site/src/components/DocLinks';
import Sdks from '@site/src/components/Sdks';
import DiscordCommunity from '@site/src/components/DiscordCommunity';
import ptBR from '../translations/pt-BR.json';
import en from '../translations/en.json';
import es from '../translations/es.json';
import { useColorMode } from '@docusaurus/theme-common';

import styles from './index.module.css';

function HomepageHeader() {
  const { i18n } = useDocusaurusContext();
  const { isDarkTheme } = useColorMode();
  const translations = {
    'pt-BR': ptBR,
    'en': en,
    'es': es
  };
  const { title, subtitle, getStarted } = translations[i18n.currentLocale].hero || translations['en'].hero;
  return (
    <div className={styles.container}>
      <div className="container">
        <img 
          src={isDarkTheme ? '/img/logotipo-white.png' : '/img/logotipo-purple.png'}
          className={styles.heroLogo} 
          alt="Guardia Logo"
        />
        <Heading as="h1" className="hero__title">
          {title}
        </Heading>
        <p className="hero__subtitle">
          {subtitle}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            {getStarted}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig, i18n } = useDocusaurusContext();
  return (
    <>
      <ConstructionBanner/>
      <Layout
        title={`${siteConfig.tagline}`}>      
        <div className={styles.background}>
          <HomepageHeader />             
          <ProductCards />
          <DocLinks />
          <Sdks />
          <DiscordCommunity />
        </div >        
      </Layout>
    </>    
  );
}
