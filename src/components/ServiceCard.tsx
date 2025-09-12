import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

interface ServiceCardProps {
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  icon: string;
  features?: string[];
  popular?: boolean;
  currency: string;
}

const ServiceCard = ({ name, description, price, originalPrice, icon, features, popular, currency }: ServiceCardProps) => {
  const { addToCart, items } = useCart();
  const { toast } = useToast();
  
  const isInCart = items.some(item => item.id === name);
  
  const handleAddToCart = () => {
    if (isInCart) {
      toast({
        title: "Already in cart",
        description: `${name} is already in your cart`,
        duration: 2000,
      });
      return;
    }
    
    addToCart({
      id: name,
      name,
      description,
      price,
      originalPrice,
      icon,
      currency,
      features
    });
    
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
      duration: 2000,
    });
  };
  return (
    <Card className={`bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card relative ${popular ? 'ring-2 ring-accent shadow-glow' : ''}`}>
      {popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white px-4 py-1">
          Most Popular
        </Badge>
      )}
      
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="text-3xl mr-3">{icon}</div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">{price}</span>
            <span className="text-sm text-muted-foreground">{currency}</span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">{originalPrice}</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">Annual Subscription</p>
        </div>

        {features && (
          <div className="mb-6">
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button 
          className={`w-full transition-opacity ${isInCart ? 'bg-muted hover:bg-muted/80' : 'bg-gradient-primary hover:opacity-90'}`}
          size="lg"
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;