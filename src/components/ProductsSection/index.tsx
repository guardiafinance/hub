import React from 'react';
import styles from './styles.module.css';

export default function ProductsSection(): JSX.Element {
  return (
    <section className={styles.products}>
      <div className={styles.productContainer}>
        {/* LKE Product Card */}
        <div className={styles.productCard}>
          <div className={styles.badgeContainer}>
            <div className={`${styles.devBadge} ${styles.blue}`}>Em Desenvolvimento</div>
            <div className={styles.versionBadge}>v0.1.0-alpha</div>
          </div>
          <h2><i className="fas fa-book"></i> LKE (Ledger Kernel Engine)</h2>
          <p>Motor de contabilidade multi-tenant para gestão financeira avançada. Organize livros contábeis em múltiplos ledgers, segmente-os em books e chapters, faça transações com Triple-entry Bookkeeping, Multi-signing e Cross-ledger em múltiplas moedas, garantindo transparência e conformidade com registros imutáveis.</p>
          <div className={styles.subCards}>
            <a href="https://github.com/guardiafinance/guardia-lke" className={styles.subCard} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
              <span>GitHub</span>
            </a>
            <a href="https://guardia.apidog.io" className={styles.subCard} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-code"></i>
              <span>API</span>
            </a>
            <a href="#" className={styles.subCard} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-docker"></i>
              <span>Docker Hub</span>
            </a>
            <a href="#" className={styles.subCard} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-book"></i>
              <span>Documentação</span>
            </a>
          </div>
        </div>

        {/* BASE Product Card */}
        <div className={styles.productCard}>
          <div className={styles.badgeContainer}>
            <div className={`${styles.devBadge} ${styles.gray}`}>Em Planejamento</div>
            <div className={styles.versionBadge}>v0.0.0</div>
          </div>
          <h2><i className="fas fa-wallet"></i> BASE (Banking System Engine)</h2>
          <p>Core de plataforma de Banking com integração a LKE ou ledgers externas via contratos low code. Gerencie contas com múltiplos titulares, saldos em moedas fiat e não-fiat, exibidos de forma agregada ou individual. Transacione por diversos rails, gerencie contrapartes e conecte-se a múltiplos provedores bancários com multi-roteamento.</p>
          <div className={styles.subCards}>
            <a href="#" className={styles.subCard} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
              <span>GitHub</span>
            </a>
            <a href="#" className={styles.subCard} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-code"></i>
              <span>API</span>
            </a>
            <a href="#" className={styles.subCard} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-docker"></i>
              <span>Docker Hub</span>
            </a>
            <a href="#" className={styles.subCard} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-book"></i>
              <span>Documentação</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 