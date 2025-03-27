import React from 'react';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ptBR from '../../translations/pt-BR.json';
import en from '../../translations/en.json';
import es from '../../translations/es.json';

const DiscordCommunity = () => {
  const { i18n } = useDocusaurusContext();
  const translations = {
    'pt-BR': ptBR,
    'en': en,
    'es': es
  };
  const { discord } = translations[i18n.currentLocale];
  return (
    <section className={styles.discordInvite}>
      <hr className={styles.divider} />
      <div className={styles.discordContainer}>
        <i className="fab fa-discord"></i>
        <h2>{discord.title}</h2>
        <p>{discord.description}</p>
        <a href="#" className={styles.discordButton} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-discord"></i>
          <span>{discord.button}</span>
        </a>
      </div>
    </section>
  );
};

export default DiscordCommunity; 