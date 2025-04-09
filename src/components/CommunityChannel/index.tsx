import React from 'react';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translations } from '../../translations';
import { EXTERNAL_LINKS } from '../ExternalLink/external-links';

const CommunityChannel = () => {
  const { i18n } = useDocusaurusContext();

  const { communityChannel } = translations[i18n.currentLocale];
  return (
    <section className={styles.communityChannelInvite}>
      <hr className={styles.divider} />
      <div className={styles.communityChannelContainer}>
        <i className="fab fa-whatsapp"></i>
        <h2>{communityChannel.title}</h2>
        <p>{communityChannel.description}</p>
        <a
          href={EXTERNAL_LINKS.WHATSAPP_COMMUNITY}
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