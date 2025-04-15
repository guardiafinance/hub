import React, { useEffect, useRef, useState } from 'react';
import panzoom from 'panzoom';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translations } from '../../translations';

interface MermaidDiagramProps {
  children: React.ReactNode;
}

export default function MermaidDiagram({ children }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const panzoomInstance = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { i18n } = useDocusaurusContext();

  const { mermaid } = translations[i18n.currentLocale];

  useEffect(() => {
    if (!containerRef.current || !diagramRef.current) return;

    // Inicializa o panzoom
    panzoomInstance.current = panzoom(diagramRef.current, {
      maxZoom: 2,
      minZoom: 0.5,
      initialZoom: 1,
      bounds: true,
      boundsPadding: 0.1,
    });

    // Adiciona suporte para zoom com scroll do mouse
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        panzoomInstance.current.zoomTo(0, 0, panzoomInstance.current.getTransform().scale + delta);
      }
    };

    diagramRef.current.addEventListener('wheel', handleWheel);

    return () => {
      if (diagramRef.current) {
        diagramRef.current.removeEventListener('wheel', handleWheel);
      }
      if (panzoomInstance.current) {
        panzoomInstance.current.dispose();
      }
    };
  }, []);

  const handleZoomIn = () => {
    if (panzoomInstance.current) {
      const transform = panzoomInstance.current.getTransform();
      panzoomInstance.current.zoomTo(0, 0, transform.scale + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (panzoomInstance.current) {
      const transform = panzoomInstance.current.getTransform();
      panzoomInstance.current.zoomTo(0, 0, transform.scale - 0.1);
    }
  };

  const handleReset = () => {
    if (panzoomInstance.current) {
      panzoomInstance.current.moveTo(0, 0);
      panzoomInstance.current.zoomAbs(0, 0, 1);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const moveDiagram = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (!panzoomInstance.current) return;

    const transform = panzoomInstance.current.getTransform();
    const step = 50; // pixels to move per click

    switch (direction) {
      case 'up':
        panzoomInstance.current.moveBy(0, step);
        break;
      case 'down':
        panzoomInstance.current.moveBy(0, -step);
        break;
      case 'left':
        panzoomInstance.current.moveBy(step, 0);
        break;
      case 'right':
        panzoomInstance.current.moveBy(-step, 0);
        break;
    }
  };

  const copyMermaidContent = () => {
    if (typeof children === 'string') {
      navigator.clipboard.writeText(children)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch(err => {
          console.error('Error copying content:', err);
        });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${isFullscreen ? styles.fullscreen : ''}`}
    >
      <button
        onClick={copyMermaidContent}
        className={`${styles.copyButton} ${isCopied ? styles.copied : ''}`}
        title={mermaid.copyButton.title}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        </svg>
        {isCopied ? mermaid.copyButton.copied : mermaid.copyButton.copy}
      </button>
      <div ref={diagramRef} className={styles.diagram}>
        {children}
      </div>
      <div className={styles.directionControls}>
        <button onClick={() => moveDiagram('up')} title={mermaid.move.up}>↑</button>
        <button onClick={() => moveDiagram('left')} title={mermaid.move.left}>←</button>
        <button onClick={handleReset} title={mermaid.move.center}>○</button>
        <button onClick={() => moveDiagram('right')} title={mermaid.move.right}>→</button>
        <button onClick={() => moveDiagram('down')} title={mermaid.move.down}>↓</button>
      </div>
      <div className={styles.controls}>
        <button onClick={handleZoomIn} title={mermaid.zoom.in}>+</button>
        <button onClick={handleZoomOut} title={mermaid.zoom.out}>-</button>
        <button onClick={handleReset} title={mermaid.zoom.reset}>↺</button>
        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? mermaid.fullscreen.exit : mermaid.fullscreen.enter}
          className={styles.fullscreen}
        >
          {isFullscreen ? '×' : '⤢'}
        </button>
      </div>
    </div>
  );
}
