import React from 'react';
import ConstructionBanner from '@site/src/components/ConstructionBanner';

export default function Root({children}) {
  return (
    <>
      <ConstructionBanner />
      {children}
    </>
  );
} 