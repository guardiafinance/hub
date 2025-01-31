import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

interface DocSection {
  title: string;
  icon: string;
  links: {
    label: string;
    to: string;
    icon: string;
  }[];
}

const sections: DocSection[] = [
  {
    title: 'Padrões e Convenções',
    icon: 'fa-solid fa-code',
    links: [
      { label: 'Convenção de Código', to: '/docs/conventions/code', icon: 'fa-solid fa-book' },
      { label: 'Padrões de Projeto', to: '/docs/conventions/project', icon: 'fa-solid fa-puzzle-piece' },
      { label: 'Padrão de Arquitetura', to: '/docs/conventions/architecture', icon: 'fa-solid fa-sitemap' },
      { label: 'Versionamento Semântico', to: '/docs/conventions/versioning', icon: 'fa-solid fa-code-branch' },
      { label: 'Cloud Events', to: '/docs/conventions/events', icon: 'fa-solid fa-cloud' },
      { label: 'Style Guide', to: '/docs/conventions/style', icon: 'fa-solid fa-palette' },
      { label: 'Status Codes', to: '/docs/conventions/status', icon: 'fa-solid fa-list-ol' },
    ],
  },
  {
    title: 'Documentação',
    icon: 'fa-solid fa-book',
    links: [
      { label: 'API Dog', to: '/docs/api', icon: 'fa-solid fa-dog' },
      { label: 'Postman', to: '/docs/postman', icon: 'fa-solid fa-paper-plane' },
      { label: 'Release Notes', to: '/docs/releases', icon: 'fa-solid fa-clipboard-list' },
    ],
  },
  {
    title: 'Comunidade',
    icon: 'fa-solid fa-users',
    links: [
      { label: 'Como Contribuir', to: '/docs/contribute', icon: 'fa-solid fa-handshake' },
      { label: 'Código de Conduta', to: '/docs/code-of-conduct', icon: 'fa-solid fa-shield' },
      { label: 'Nosso compromisso', to: '/docs/commitment', icon: 'fa-solid fa-heart' },
    ],
  },
];

export default function DocLinks() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {sections.map((section) => (
          <div key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <i className={section.icon}></i>
              {section.title}
            </h2>
            <div className={styles.linkList}>
              {section.links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={styles.link}
                >
                  <i className={link.icon}></i>
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