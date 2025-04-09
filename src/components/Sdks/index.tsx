import React from 'react';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translations } from '../../translations';

const Sdks = () => {
  const { i18n } = useDocusaurusContext();

  const { sdks } = translations[i18n.currentLocale];
  return (
    <div className={styles.container}>
      <h2 className={styles.sdkTitle}>{sdks.title}</h2>
      <div className={styles.sdkGrid}>
        <a href="https://www.python.org" target="_blank" rel="noopener noreferrer" className={styles.sdkCard}>
          <i className="fab fa-python"></i>
          <span>{sdks.languages.python}</span>
          <div className={styles.tags}>
            <span className={styles.sdkStatus}>WIP</span>
            <span className={styles.sdkVersion}>v0.1.0-alpha</span>
          </div>
        </a>
        <a href="https://golang.org" target="_blank" rel="noopener noreferrer" className={styles.sdkCard}>
          <i className="fab fa-golang"></i>
          <span>Go</span>
          <div className={styles.tags}>
            <span className={styles.sdkStatus}>WIP</span>
            <span className={styles.sdkVersion}>v0.1.0-alpha</span>
          </div>
        </a>
        <a href="https://www.rust-lang.org" target="_blank" rel="noopener noreferrer" className={styles.sdkCard}>
          <i className="fab fa-rust"></i>
          <span className={styles.sdkLanguage}>Rust</span>
          <div className={styles.tags}>
            <span className={styles.sdkStatus}>WIP</span>
            <span className={styles.sdkVersion}>v0.1.0-alpha</span>
          </div>
        </a>
        <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className={styles.sdkCard}>
          <i className="fab fa-node-js"></i>
          <span className={styles.sdkLanguage}>Node.js</span>
          <div className={styles.tags}>
            <span className={styles.sdkStatus}>WIP</span>
            <span className={styles.sdkVersion}>v0.1.0-alpha</span>
          </div>
        </a>
        <a href="https://dotnet.microsoft.com" target="_blank" rel="noopener noreferrer" className={styles.sdkCard}>
            <svg viewBox="0 0 128 128" width="50" height="50">
                <path fill="#e07400" d="M117.5 33.5l.3-.2c-.6-1.1-1.5-2.1-2.4-2.6L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.3.9 3.4l-.2.1c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c.1-.8 0-1.7-.4-2.6zm-53.5 70c-21.8 0-39.5-17.7-39.5-39.5S42.2 24.5 64 24.5c14.7 0 27.5 8.1 34.3 20l-13 7.5C81.1 44.5 73.1 39.5 64 39.5c-13.5 0-24.5 11-24.5 24.5s11 24.5 24.5 24.5c9.1 0 17.1-5 21.3-12.4l13 7.5c-6.8 11.9-19.6 20-34.3 20zm51-39.5h-3.2l-.9 4h4.1v5h-5l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6H94v-5h3.5l.9-4H94v-5h5.3l1.2-6h4.9l-1.2 6h3.8l1.2-6h4.8l-1.2 6h2.4v5z"></path>
            </svg>
          <span>C#</span>
          <div className={styles.tags}>
            <span className={styles.sdkStatus}>WIP</span>
            <span className={styles.sdkVersion}>v0.1.0-alpha</span>
          </div>
        </a>
        <a href="https://www.ruby-lang.org" target="_blank" rel="noopener noreferrer" className={styles.sdkCard}>
          <i className="fas fa-gem"></i>
          <span>Ruby</span>
          <div className={styles.tags}>
            <span className={styles.sdkStatus}>WIP</span>
            <span className={styles.sdkVersion}>v0.1.0-alpha</span>
          </div>
        </a>
        <a href="https://www.java.com" target="_blank" rel="noopener noreferrer" className={styles.sdkCard}>
          <i className="fab fa-java"></i>
          <span>Java</span>
          <div className={styles.tags}>
            <span className={styles.sdkStatus}>WIP</span>
            <span className={styles.sdkVersion}>v0.1.0-alpha</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Sdks;