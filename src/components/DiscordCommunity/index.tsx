import React from 'react';
import styles from './styles.module.css';

const DiscordCommunity = () => {
  return (
    <section className={styles.discordInvite}>
      <hr className={styles.divider} />
      <div className={styles.discordContainer}>
        <i className="fab fa-discord"></i>
        <h2>Junte-se à nossa comunidade</h2>
        <p>Participe das discussões, tire dúvidas e contribua com o desenvolvimento da Guardia.</p>
        <a href="#" className={styles.discordButton} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-discord"></i>
          <span>Entrar no Discord</span>
        </a>
      </div>
    </section>
  );
};

export default DiscordCommunity; 