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

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className={styles.container}>
      <div className="container">
        <img 
          src="/img/logotipo-white.png" 
          alt="Guardia Logo" 
          className={styles.heroLogo}
        />
        <Heading as="h1" className="hero__title">
          Bem-vindo ao início. Bem-vindo à Guardia. Aproveite a jornada!
        </Heading>
        <p className="hero__subtitle">
          Mude seu core. Maximize seu futuro.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Open Roadmap
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <>
      <ConstructionBanner/>
      <Layout
        title={`${siteConfig.title}`}
        description="Description will go into a meta tag in <head />">      
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
