import { useState } from 'react';
import RegionSelector from '@/components/RegionSelector';
import MainSite from '@/components/MainSite';

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState<'us' | 'middleeast' | null>(null);

  const handleRegionSelect = (region: 'us' | 'middleeast') => {
    setSelectedRegion(region);
  };

  if (!selectedRegion) {
    return <RegionSelector onRegionSelect={handleRegionSelect} />;
  }

  return <MainSite region={selectedRegion} />;
};

export default Index;
