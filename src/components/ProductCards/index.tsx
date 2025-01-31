import React, { ReactNode } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

interface ProductCardProps {
  title: string | ReactNode;
  description: string;
  status: string;
  version: string;
  links: {
    github?: string;
    api?: string;
    docker?: string;
    docs?: string;
  };
}

function ProductCard({ title, description, status, version, links }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>        
        <span className={clsx(styles.status, {
          [styles.statusDevelopment]: status === "Em desenvolvimento"
        })}>
          {status}
        </span>
        <span className={styles.version}>{version}</span>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.links}>
        {links.github && (
          <a href={links.github} className={styles.link}>
            <i className="fa-brands fa-github"></i>
            GitHub
          </a>
        )}
        {links.api && (
          <a href={links.api} className={styles.link}>
            <i className="fa-solid fa-code"></i>
            API
          </a>
        )}
        {links.docker && (
          <a href={links.docker} className={styles.link}>
            <i className="fa-brands fa-docker"></i>
            Docker Hub
          </a>
        )}
        {links.docs && (
          <a href={links.docs} className={styles.link}>
            <i className="fa-solid fa-book"></i>
            Documentação
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProductCards() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <ProductCard
          title={<><i className="fas fa-book"></i> LKE (Ledger Kernel Engine)</>}
          description="Motor de contabilidade multi-tenant para gestão financeira avançada. Organize livros contábeis em múltiplos ledgers, segmente-os em books e chapters, faça transações com Triple-entry Bookkeeping, Multi-signing e Cross-ledger em múltiplas moedas, garantindo transparência e conformidade com registros imutáveis."
          status="Em desenvolvimento"
          version="v0.1.0-alpha"
          links={{
            github: "#",
            api: "#",
            docker: "#",
            docs: "#",
          }}
        />
        <ProductCard
          title={<><i className="fas fa-wallet"></i> BASE (Banking System Engine)</>}
          description="Core de plataforma de Banking com integração a LKE ou ledgers externas via contratos low code. Gerencie contas com múltiplos titulares, saldos em moedas fiat e não-fiat, exibidos de forma agregada ou individual. Transacione por diversos rails, gerencie contrapartes e conecte-se a múltiplos provedores bancários com multi-roteamento."
          status="Em planejamento"
          version="v0.0.0"
          links={{
            github: "#",
            api: "#",
            docker: "#",
            docs: "#",
          }}
        />
      </div>
    </div>
  );
} 