import React from 'react';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ptBR from '../../translations/pt-BR.json';
import en from '../../translations/en.json';
import es from '../../translations/es.json';
import { EXTERNAL_LINKS } from '../../config/external-links';

const CommunityChannel = () => {
  const { i18n } = useDocusaurusContext();
  const translations = {
    'pt-BR': ptBR,
    'en': en,
    'es': es
  };
  const { communityChannel } = translations[i18n.currentLocale];
  return (
    <section className={styles.communityChannelInvite}>
      <hr className={styles.divider} />
      <div className={styles.communityChannelContainer}>
        <i className="fab fa-whatsapp"></i>
        <h2>{communityChannel.title}</h2>
        <p>{communityChannel.description}</p>
        <a 
          href={EXTERNAL_LINKS.WhatsApp_COMMUNITY} 
          className={styles.communityChannelButton} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp"></i>
          <span>{communityChannel.button}</span>
        </a>
      </div>
    </section>
  );
};

export default CommunityChannel; 