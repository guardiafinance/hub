import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type ResourceLink = {
  icon: string;
  title: string;
  href: string;
};

const patterns: ResourceLink[] = [
  { icon: 'fas fa-file-code', title: 'Convenções de Código', href: './CODE_CONVENTIONS' },
  { icon: 'fas fa-puzzle-piece', title: 'Padrões de Projeto', href: './PROJECT_PATTERNS' },
  { icon: 'fas fa-sitemap', title: 'Padrão de Arquitetura', href: './ARCHITECTURE_PATTERN' },
  { icon: 'fas fa-code-branch', title: 'Versionamento Semântico', href: './SEMANTIC_VERSIONING' },
  { icon: 'fas fa-cloud', title: 'Cloud Events', href: './CLOUD_EVENTS' },
  { icon: 'fas fa-paint-brush', title: 'Guia de Estilo API', href: './API_STYLE_GUIDE' },
  { icon: 'fas fa-list-ol', title: 'Códigos de Status', href: './STATUS_CODE' },
];

const documentation: ResourceLink[] = [
  { icon: 'fas fa-paw', title: 'API Dog', href: 'https://apidog.guardia.finance' },
  { icon: 'fas fa-rocket', title: 'Postman', href: 'https://postman.guardia.finance' },
  { icon: 'fas fa-clipboard-list', title: 'Release Notes', href: './RELEASE_NOTES' },
];

const community: ResourceLink[] = [
  { icon: 'fas fa-hands-helping', title: 'Como Contribuir', href: './CONTRIBUTING' },
  { icon: 'fas fa-handshake', title: 'Código de Conduta', href: './CODE_OF_CONDUCT' },
  { icon: 'fas fa-heart', title: 'Nosso Compromisso', href: './README' },
];

function ResourceCard({ title, icon, links }: { title: string; icon: string; links: ResourceLink[] }) {
  return (
    <div className={styles.resourceCard}>
      <div className={styles.resourceHeader}>
        <i className={icon}></i>
        <h3>{title}</h3>
      </div>
      <div className={styles.resourceLinks}>
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            className={styles.resourceLink}
          >
            <i className={link.icon}></i>
            <span>{link.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ResourcesSection(): JSX.Element {
  return (
    <section className={styles.resources}>
      <div className={styles.resourcesContainer}>
        <ResourceCard
          title="Padrões e Convensões"
          icon="fas fa-code"
          links={patterns}
        />
        <ResourceCard
          title="Documentação"
          icon="fas fa-book"
          links={documentation}
        />
        <ResourceCard
          title="Comunidade"
          icon="fas fa-users"
          links={community}
        />
      </div>
    </section>
  );
} 