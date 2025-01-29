import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

export default function HomepageHero(): JSX.Element {
  return (
    <section className={styles.heroSection}>
      <img 
        src="/img/logos/logotipo-white.png" 
        alt="Guardia Logo" 
        className={styles.logo}
      />
      <h1>
        <Translate id="homepage.hero.title">
          Bem-vindo ao início. Bem-vindo à Guardia. Aproveite a jornada!
        </Translate>
      </h1>
      <p className={styles.heroText}>
        <Translate id="homepage.hero.tagline">
          Mude seu core. Maximize seu futuro.
        </Translate>
      </p>
      <Link
        className={styles.ctaButton}
        to="/docs/getting-started">
        <Translate id="homepage.hero.cta">
          Open Roadmap
        </Translate>
      </Link>
    </section>
  );
}