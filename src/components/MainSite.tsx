import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ServiceCard from './ServiceCard';
import CartSheet from './CartSheet';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { Globe, Instagram, MessageCircle, Star, Users, Shield, Zap } from 'lucide-react';

interface MainSiteProps {
  region: 'us' | 'middleeast';
}

const MainSite = ({ region }: MainSiteProps) => {
  const { addToCart, items } = useCart();
  const { toast } = useToast();
  const currency = region === 'us' ? 'USD' : 'KWD';
  const currencySymbol = region === 'us' ? '$' : 'د.ك';

  // Services data based on the uploaded images
  const services = region === 'us' ? [
    {
      name: 'YouTube Premium',
      description: 'Ad-free videos, background play, YouTube Music',
      price: '60',
      originalPrice: '140',
      icon: '📺',
      features: ['Ad-free viewing', 'Background play', 'YouTube Music Premium', 'Download videos'],
      popular: true
    },
    {
      name: 'Spotify Premium',
      description: 'High-quality music streaming',
      price: '50',
      originalPrice: '120',
      icon: '🎵',
      features: ['High-quality audio', 'Offline downloads', 'No ads', 'Unlimited skips']
    },
    {
      name: 'Watch It',
      description: 'Premium entertainment streaming',
      price: '50',
      originalPrice: '99',
      icon: '🎬',
      features: ['HD/4K streaming', 'Multiple devices', 'Offline viewing', 'Exclusive content']
    },
    {
      name: 'Shahid VIP',
      description: 'Arabic premium content',
      price: '60',
      originalPrice: '92',
      icon: '🎭',
      features: ['Arabic shows & movies', 'Live TV', 'Sports content', 'Kids content']
    },
    {
      name: 'Crunchyroll MEGA FAN',
      description: 'Premium anime streaming',
      price: '50',
      originalPrice: '120',
      icon: '🍜',
      features: ['Ad-free anime', 'Simulcast episodes', 'Manga access', 'Offline viewing']
    },
    {
      name: 'Snapchat+',
      description: 'Enhanced Snapchat experience',
      price: '15',
      originalPrice: '30',
      icon: '👻',
      features: ['Custom app icons', 'Rewatch stories', 'Pin friends', 'Exclusive features']
    },
    {
      name: 'Prime Video',
      description: 'Amazon Prime streaming',
      price: '70',
      originalPrice: '140',
      icon: '🎬',
      features: ['HD/4K streaming', 'Original content', 'Multiple devices', 'Exclusive shows']
    },
    {
      name: 'Xbox Game Pass Ultimate (3 Months)',
      description: 'Premium gaming subscription service',
      price: '30',
      originalPrice: '45',
      icon: '🎮',
      features: ['100+ games', 'Online multiplayer', 'PC & Console', 'Cloud gaming']
    },
    {
      name: 'Xbox Game Pass Ultimate (6 Months)',
      description: 'Premium gaming subscription service',
      price: '60',
      originalPrice: '90',
      icon: '🎮',
      features: ['100+ games', 'Online multiplayer', 'PC & Console', 'Cloud gaming'],
      popular: true
    },
    {
      name: 'Xbox Game Pass Ultimate (12 Months)',
      description: 'Premium gaming subscription service',
      price: '120',
      originalPrice: '180',
      icon: '🎮',
      features: ['100+ games', 'Online multiplayer', 'PC & Console', 'Cloud gaming']
    }
  ] : [
    {
      name: 'Crunchyroll',
      description: 'Premium anime streaming',
      price: '7.5',
      originalPrice: '15',
      icon: '🍜',
      features: ['Ad-free anime', 'Simulcast episodes', 'Manga access', 'Offline viewing']
    },
    {
      name: 'YouTube Premium',
      description: 'Ad-free videos, background play',
      price: '12',
      originalPrice: '26',
      icon: '📺',
      features: ['Ad-free viewing', 'Background play', 'YouTube Music Premium', 'Download videos'],
      popular: true
    },
    {
      name: 'Spotify Premium',
      description: 'High-quality music streaming',
      price: '6',
      originalPrice: '15',
      icon: '🎵',
      features: ['High-quality audio', 'Offline downloads', 'No ads', 'Unlimited skips']
    },
    {
      name: 'Prime Video',
      description: 'Amazon Prime streaming',
      price: '5',
      originalPrice: '15',
      icon: '🎬',
      features: ['HD/4K streaming', 'Original content', 'Multiple devices', 'Exclusive shows']
    },
    {
      name: 'Watch It',
      description: 'Premium entertainment streaming',
      price: '13',
      originalPrice: '30',
      icon: '🎭',
      features: ['Arabic shows & movies', 'Live TV', 'Sports content', 'Kids content']
    },
    {
      name: 'Shahid VIP',
      description: 'Arabic premium content',
      price: '12',
      originalPrice: '28',
      icon: '🎪',
      features: ['Arabic shows & movies', 'Live TV', 'Sports content', 'Kids content']
    }
  ];

  const iptvPrice = region === 'us' ? '30' : '9';
  const iptvService = {
    id: 'E2TV IPTV Service',
    name: 'E2TV IPTV Service',
    description: 'Premium 4K IPTV with global channels',
    price: `${currencySymbol}${iptvPrice}`,
    icon: '📺',
    currency
  };
  
  const isIptvInCart = items.some(item => item.id === iptvService.id);
  
  const handleAddIptvToCart = () => {
    if (isIptvInCart) {
      toast({
        title: "Already in cart",
        description: `${iptvService.name} is already in your cart`,
        duration: 2000,
      });
      return;
    }
    
    addToCart(iptvService);
    toast({
      title: "Added to cart",
      description: `${iptvService.name} has been added to your cart`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                E2SRV
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-primary/50 text-primary">
                {region === 'us' ? '🇺🇸 United States' : '🌍 Middle East'}
              </Badge>
              <CartSheet region={region} />
              <Button variant="outline" size="sm">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-gradient-primary text-white px-6 py-2 text-sm">
            🌟 Accepting Global Customers
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Premium Digital <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Subscriptions
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get access to all your favorite streaming services and digital subscriptions at unbeatable prices
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-5 w-5 text-primary" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="h-5 w-5 text-primary" />
              <span>Instant Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5 text-primary" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Official Subscriptions
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose from our premium selection of streaming and digital services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.name}
                description={service.description}
                price={`${currencySymbol}${service.price}`}
                originalPrice={service.originalPrice ? `${currencySymbol}${service.originalPrice}` : undefined}
                icon={service.icon}
                features={service.features}
                popular={service.popular}
                currency={currency}
              />
            ))}
          </div>

          {/* IPTV Special Section */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-card border-accent/50 overflow-hidden">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Badge className="mb-4 bg-accent text-white">Special Offer</Badge>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      E2TV IPTV Service
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Watch all sports, TV shows, and movies from around the world. Premium 4K quality without interruption.
                    </p>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-3xl font-bold text-accent">
                        {currencySymbol}{iptvPrice}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">1 Year Subscription</p>
                        <p className="text-xs text-muted-foreground">Save 70% vs monthly</p>
                      </div>
                    </div>
                    <Button 
                      size="lg" 
                      className={`${isIptvInCart ? 'bg-muted hover:bg-muted/80' : 'bg-accent hover:bg-accent/90'}`}
                      onClick={handleAddIptvToCart}
                      disabled={isIptvInCart}
                    >
                      {isIptvInCart ? 'In Cart' : 'Add to Cart'}
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      {['🏀', '📺', '🎬', '⚽', '🏈', '🎮', '📱', '🌍'].map((icon, i) => (
                        <div key={i} className="text-2xl bg-muted/50 p-3 rounded-lg">
                          {icon}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Access to thousands of channels worldwide
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 border-t border-border/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us on Instagram for instant service activation and support
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90"
              onClick={() => window.open(region === 'us' ? 'https://www.instagram.com/e2srv.us/' : 'https://www.instagram.com/e2srv/', '_blank')}
            >
              <Instagram className="h-5 w-5 mr-2" />
              @{region === 'us' ? 'e2srv.us' : 'e2srv'}
            </Button>
            <Button variant="outline" size="lg">
              <MessageCircle className="h-5 w-5 mr-2" />
              Live Chat
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50 bg-card/30">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">E2SRV</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Premium digital services for global customers • Follow us: @e2srv.us
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainSite;