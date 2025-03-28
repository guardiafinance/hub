import React from 'react';
import ConstructionBanner from '@site/src/components/ConstructionBanner';
import HreflangTags from '@site/src/components/HreflangTags';

export default function Root({ children }) {
  return (
    <>
      <HreflangTags />
      <ConstructionBanner />
      {children}
    </>
  );
} 