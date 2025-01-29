import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function DiscordSection(): JSX.Element {
  return (
    <section className={styles.discordSection}>
      <div className={styles.discordContainer}>
        <div className={styles.discordIcon}>
          <i className="fab fa-discord"></i>
        </div>
        <h2>Junte-se à nossa comunidade</h2>
        <p>
          Conecte-se com outros desenvolvedores, compartilhe experiências
          e fique por dentro das novidades do Guardia.
        </p>
        <Link
          className={styles.discordButton}
          to="https://discord.gg/guardia"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-discord"></i>
          <span>Entrar no Discord</span>
        </Link>
      </div>
    </section>
  );
} 