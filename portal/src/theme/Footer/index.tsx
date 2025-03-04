import React, {type ReactNode} from 'react';
import type FooterType from '@theme/Footer';
import type {WrapperProps} from '@docusaurus/types';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import ptBR from '../../i18n/pt-BR.json';
import en from '../../i18n/en.json';
import es from '../../i18n/es.json';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): ReactNode {
  const { i18n } = useDocusaurusContext();
  const translations = {
    'pt-BR': ptBR,
    'en': en,
    'es': es
  };
  const { copyright, privacyPolicy, securityPolicy } = translations[i18n.currentLocale].footer;
  return (
    <>      
      <footer>
          <p>{copyright}</p>
          <div className={styles.socialLinks}>
              <a href="https://github.com/guardiafinance" className="social-link" target="_blank">GitHub</a> |
              <a href="https://linkedin.com/company/guardiafinance" className="social-link" target="_blank">LinkedIn</a> |
              <a href="https://instagram.com/guardiafinance" className="social-link" target="_blank">Instagram</a> |
              <a href="https://facebook.com/guardiafinance" className="social-link" target="_blank">Facebook</a> |
              <a href="https://youtube.com/@guardiafinance" className="social-link" target="_blank">YouTube</a>
          </div>
          <div className={styles.footerLinks}>
              <a href="/">{privacyPolicy}</a> •
              <a href="/">{securityPolicy}</a>
          </div>
        </footer>
    </>
  );
}
