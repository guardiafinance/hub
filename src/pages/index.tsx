import React from 'react';
import Layout from '@theme/Layout';
import HomepageHero from '@site/src/components/HomepageHero';
import ProductsSection from '@site/src/components/ProductsSection';
import ResourcesSection from '@site/src/components/ResourcesSection';
import SdkGrid from '@site/src/components/SdkGrid';
import DiscordSection from '@site/src/components/DiscordSection';

export default function Home(): JSX.Element {
  return (
    <Layout>
      <div className="wip-banner">
        🚧 Em Construção 🚧
      </div>
      <main>
        <HomepageHero />
        <ProductsSection />
        <ResourcesSection />
        <SdkGrid />
        <DiscordSection />
      </main>
    </Layout>
  );
}