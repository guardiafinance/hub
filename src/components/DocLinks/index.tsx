import React, { ReactNode } from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ptBR from '../../translations/pt-BR.json';
import en from '../../translations/en.json';
import es from '../../translations/es.json';
import { ApiDogIcon, PostmanIcon } from './SvgIcon';

interface DocSection {
  title: string;
  icon: string | ReactNode;
  links: {
    label: string;
    to: string;
    icon: string | ReactNode;
  }[];
}

export default function DocLinks() {
  const { i18n } = useDocusaurusContext();
  const translations = {
    'pt-BR': ptBR,
    'en': en,
    'es': es
  };

  const { resources } = translations[i18n.currentLocale];
  const {patterns, documentation, community } = resources;
  const sections: DocSection[] = [
    {
      title: patterns.title,
      icon: 'fa-solid fa-code',
      links: [
        { label: patterns.codeConventions, to: '/', icon: 'fa-solid fa-book' },
        { label: patterns.projectPatterns, to: '/', icon: 'fa-solid fa-puzzle-piece' },
        { label: patterns.architecturePattern, to: '/', icon: 'fa-solid fa-sitemap' },
        { label: patterns.semanticVersioning, to: '/', icon: 'fa-solid fa-code-branch' },
        { label: 'Cloud Events', to: '/', icon: 'fa-solid fa-cloud' },
        { label: 'Style Guide', to: '/', icon: 'fa-solid fa-palette' },
        { label: 'Status Codes', to: '/', icon: 'fa-solid fa-list-ol' },
      ],
    },
    {
      title: documentation.title,
      icon: 'fa-solid fa-book',
      links: [
        { label: 'API Dog', to: '/', icon: <ApiDogIcon /> },
        { label: 'Postman', to: '/', icon: <PostmanIcon /> },
        { label: documentation.releaseNotes, to: '/', icon: 'fa-solid fa-clipboard-list' },
      ],
    },
    {
      title: community.title,
      icon: 'fa-solid fa-users',
      links: [
        { label: community.howToContribute, to: '/', icon: 'fa-solid fa-handshake' },
        { label: community.codeOfConduct, to: '/', icon: 'fa-solid fa-shield' },
        { label: community.ourCommitment, to: '/', icon: 'fa-solid fa-heart' },
        { label: community.CLA, to: '/', icon: 'fa-solid fa-user-check' },
      ],
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {sections.map((section) => (
          <div key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {typeof section.icon === 'string' ? (
                <i className={section.icon}></i>
              ) : (
                section.icon
              )}
              {section.title}
            </h2>
            <div className={styles.linkList}>
              {section.links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={styles.link}
                >
                  {typeof link.icon === 'string' ? (
                    <i className={link.icon}></i>
                  ) : (
                    link.icon
                  )}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 