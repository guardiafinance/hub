import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type SDK = {
  name: string;
  icon?: string;
  link: string;
  customIcon?: React.ReactNode;
};

const sdks: SDK[] = [
  {
    name: 'Python',
    icon: 'fab fa-python',
    link: 'https://github.com/guardia-sdk-python'
  },
  {
    name: 'Go',
    icon: 'fab fa-golang',
    link: 'https://github.com/guardia-sdk-go'
  },
  {
    name: 'Rust',
    icon: 'fab fa-rust',
    link: 'https://github.com/guardia-sdk-rust'
  },
  {
    name: 'Node.js',
    icon: 'fab fa-node-js',
    link: 'https://github.com/guardia-sdk-node'
  },
  {
    name: 'C#',
    link: 'https://github.com/guardia-sdk-csharp',
    customIcon: (
      <svg viewBox="0 0 128 128" width="38" height="38">
        <path 
          fill="currentColor" 
          d="M117.5 33.5l.3-.2c-.6-1.1-1.5-2.1-2.4-2.6L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.3.9 3.4l-.2.1c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c.1-.8 0-1.7-.4-2.6zm-53.5 70c-21.8 0-39.5-17.7-39.5-39.5S42.2 24.5 64 24.5c14.7 0 27.5 8.1 34.3 20l-13 7.5C81.1 44.5 73.1 39.5 64 39.5c-13.5 0-24.5 11-24.5 24.5s11 24.5 24.5 24.5c9.1 0 17.1-5 21.3-12.4l13 7.5c-6.8 11.9-19.6 20-34.3 20zm51-39.5h-3.2l-.9 4h4.1v5h-5l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6H94v-5h3.5l.9-4H94v-5h5.3l1.2-6h4.9l-1.2 6h3.8l1.2-6h4.8l-1.2 6h2.4v5z"
        />
      </svg>
    )
  },
  {
    name: 'Ruby',
    icon: 'fas fa-gem',
    link: 'https://github.com/guardia-sdk-ruby'
  },
  {
    name: 'Java',
    icon: 'fab fa-java',
    link: 'https://github.com/guardia-sdk-java'
  }
];

export default function SdkGrid(): JSX.Element {
  return (
    <section className={styles.sdkGrid}>
      <div className={styles.container}>
        <h2 className={styles.sdkTitle}>SDKs</h2>
        <div className={styles.sdkCards}>
          {sdks.map((sdk) => (
            <Link
              key={sdk.name}
              to={sdk.link}
              className={styles.sdkCard}
            >
              <div className={styles.sdkBadges}>
                <div className={styles.sdkStatus}>WIP</div>
                <div className={styles.sdkVersion}>v0.1.0-alpha</div>
              </div>
              <div className={styles.sdkIcon}>
                {sdk.customIcon ? (
                  sdk.customIcon
                ) : (
                  <i className={sdk.icon}></i>
                )}
              </div>
              <h3>{sdk.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 