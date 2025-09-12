import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart, Trash2, Copy, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

interface CartSheetProps {
  region: 'us' | 'middleeast';
}

const CartSheet = ({ region }: CartSheetProps) => {
  const { items, removeFromCart, clearCart, getTotal, itemCount } = useCart();
  const { toast } = useToast();
  const [copiedCashApp, setCopiedCashApp] = useState(false);
  const [copiedBTC, setCopiedBTC] = useState(false);
  const [copiedPayPal, setCopiedPayPal] = useState(false);

  const cashAppHandle = '$ghostwwn';
  const btcAddress = 'bc1q000wlvx5tpa5paeyw9qvrx7e7aascwexu0wkqt';
  const paypalEmail = 'saifhym3610@gmail.com';

  const copyToClipboard = async (text: string, type: 'cashapp' | 'btc' | 'paypal') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'cashapp') {
        setCopiedCashApp(true);
        setTimeout(() => setCopiedCashApp(false), 2000);
      } else if (type === 'btc') {
        setCopiedBTC(true);
        setTimeout(() => setCopiedBTC(false), 2000);
      } else {
        setCopiedPayPal(true);
        setTimeout(() => setCopiedPayPal(false), 2000);
      }
      toast({
        title: "Copied!",
        description: `${type === 'cashapp' ? 'CashApp handle' : type === 'btc' ? 'Bitcoin address' : 'PayPal email'} copied to clipboard`,
        duration: 2000,
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const total = getTotal();
  const currencySymbol = region === 'us' ? '$' : 'د.ك';

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0 pb-4">
          <SheetTitle>Shopping Cart ({itemCount} items)</SheetTitle>
          <SheetDescription>
            Review your selected services and proceed with payment using {region === 'us' ? 'CashApp or Bitcoin' : 'PayPal'}.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Cart Items - Fixed height with scroll */}
              <div className="h-28 mb-3">
                <ScrollArea className="h-full">
                  <div className="space-y-4 pr-4">
                    {items.map((item) => (
                      <Card key={item.id} className="bg-card border border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{item.icon}</div>
                              <div>
                                <h4 className="font-semibold text-foreground text-base">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                <p className="text-lg font-bold text-primary mt-1">{item.price}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Payment section - Scrollable */}
              <div className="flex-shrink-0 border-t pt-3 bg-background pb-4">
                {/* Total - Always visible */}
                <div className="flex justify-between items-center text-lg font-semibold mb-3">
                  <span>Total:</span>
                  <span className="text-primary">{currencySymbol}{total.toFixed(2)}</span>
                </div>

                {/* Payment Methods - Scrollable */}
                <div className="h-40 overflow-hidden mb-3">
                  <ScrollArea className="h-full">
                    <div className="space-y-3 pr-4">
                      <h3 className="font-semibold text-foreground">Payment Methods</h3>
                    
                      {/* Payment Methods by Region */}
                      {region === 'us' ? (
                        <>
                          {/* CashApp - Only for US */}
                          <Card className="bg-gradient-card">
                            <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-foreground mb-1">💰 CashApp</h4>
                                <p className="text-sm text-muted-foreground font-mono">{cashAppHandle}</p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(cashAppHandle, 'cashapp')}
                                className={copiedCashApp ? "bg-green-500/20 border-green-500" : ""}
                              >
                                {copiedCashApp ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </CardContent>
                          </Card>

                          {/* Bitcoin for US */}
                          <Card className="bg-gradient-card">
                            <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 mr-2">
                                <h4 className="font-medium text-foreground mb-1">₿ Bitcoin</h4>
                                <p className="text-xs text-muted-foreground font-mono break-all">{btcAddress}</p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(btcAddress, 'btc')}
                                className={copiedBTC ? "bg-green-500/20 border-green-500" : ""}
                              >
                                {copiedBTC ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </CardContent>
                          </Card>
                        </>
                      ) : (
                        /* PayPal - Only for Middle East */
                        <Card className="bg-gradient-card">
                          <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 mr-2">
                              <h4 className="font-medium text-foreground mb-1">💳 PayPal</h4>
                              <p className="text-sm text-muted-foreground font-mono break-all">{paypalEmail}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(paypalEmail, 'paypal')}
                              className={copiedPayPal ? "bg-green-500/20 border-green-500" : ""}
                            >
                              {copiedPayPal ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </CardContent>
                        </Card>
                      )}
                    </div>
                  </ScrollArea>
                </div>

                {/* Instructions - Always visible */}
                <div className="bg-muted/50 p-3 rounded-lg mb-3">
                  <p className="text-sm text-muted-foreground">
                    📧 After payment, contact us on Instagram <strong>@{region === 'us' ? 'e2srv.us' : 'e2srv'}</strong> with your order details and payment confirmation for service activation.
                  </p>
                </div>

                {/* Clear Cart */}
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full"
                  size="sm"
                >
                  Clear Cart
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;