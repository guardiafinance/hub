import React from 'react';
import Image from '@theme/IdealImage';
import styles from './styles.module.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
}: OptimizedImageProps) {
  return (
    <Image
      img={src}
      alt={alt}
      width={width}
      height={height}
      className={`${styles.optimizedImage} ${className || ''}`}
    />
  );
} 