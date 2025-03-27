import { EXTERNAL_LINKS } from '@site/src/components/ExternalLink/external-links';

export function ExternalLink({ type, children }) {
  return (
    <a href={EXTERNAL_LINKS[type]} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
} 

export default ExternalLink; 