import React, {type ReactNode} from 'react';
import type FooterType from '@theme/Footer';
import type {WrapperProps} from '@docusaurus/types';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import { translations } from '../../translations';
import { EXTERNAL_LINKS } from '../../components/ExternalLink/external-links';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): ReactNode {
  const { i18n } = useDocusaurusContext();

  const { copyright, privacyPolicy, securityPolicy } = translations[i18n.currentLocale].footer;
  return (
    <>
      <footer>
        <p>{copyright}</p>
        <div className={styles.socialLinks}>
          <a href={EXTERNAL_LINKS.GITHUB} className="social-link" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github" aria-label="GitHub"></i>
          </a>
          <a href={EXTERNAL_LINKS.LINKEDIN} className="social-link" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin" aria-label="LinkedIn"></i>
          </a>
          <a href={EXTERNAL_LINKS.INSTAGRAM} className="social-link" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram" aria-label="Instagram"></i>
          </a>
          <a href={EXTERNAL_LINKS.FACEBOOK} className="social-link" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook" aria-label="Facebook"></i>
          </a>
          <a href={EXTERNAL_LINKS.YOUTUBE} className="social-link" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube" aria-label="YouTube"></i>
          </a>
        </div>
        <div className={styles.footerLinks}>
          <a href="/">{privacyPolicy}</a> •
          <a href="/">{securityPolicy}</a>
        </div>
      </footer>
    </>
  );
}
