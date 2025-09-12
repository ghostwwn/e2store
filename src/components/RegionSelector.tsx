import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, MapPin } from 'lucide-react';

interface RegionSelectorProps {
  onRegionSelect: (region: 'us' | 'middleeast') => void;
}

const RegionSelector = ({ onRegionSelect }: RegionSelectorProps) => {
  const [selectedRegion, setSelectedRegion] = useState<'us' | 'middleeast' | null>(null);

  const handleRegionSelect = (region: 'us' | 'middleeast') => {
    setSelectedRegion(region);
    setTimeout(() => {
      onRegionSelect(region);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Globe className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            E2SRV
          </h1>
          <p className="text-xl text-muted-foreground">
            Premium Digital Services & Subscriptions
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Choose Your Region
          </h2>
          <p className="text-muted-foreground text-lg">
            Select your location to see pricing in your local currency
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Card className={`bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer transform hover:scale-105 ${selectedRegion === 'us' ? 'ring-2 ring-primary shadow-glow' : ''}`}>
            <CardContent className="p-8" onClick={() => handleRegionSelect('us')}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">United States</h3>
                <p className="text-muted-foreground mb-4">Pricing in USD ($)</p>
                <Button variant="outline" size="lg" className="w-full">
                  Select US
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className={`bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer transform hover:scale-105 ${selectedRegion === 'middleeast' ? 'ring-2 ring-primary shadow-glow' : ''}`}>
            <CardContent className="p-8" onClick={() => handleRegionSelect('middleeast')}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">Middle East</h3>
                <p className="text-muted-foreground mb-4">Pricing in KWD (د.ك)</p>
                <Button variant="outline" size="lg" className="w-full">
                  Select Middle East
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Follow us on Instagram: <span 
              className="text-primary cursor-pointer hover:underline" 
              onClick={() => window.open('https://www.instagram.com/e2srv/', '_blank')}
            >
              @e2srv
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegionSelector;