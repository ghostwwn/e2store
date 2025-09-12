
import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItemSchema, PriceSchema } from '@/lib/validation';
import type { CartItem } from '@/lib/validation';
import { sanitizeErrorMessage } from '@/lib/security';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    try {
      // Validate item before adding to cart
      const validatedItem = CartItemSchema.parse(item);
      setItems(prev => {
        const exists = prev.find(i => i.id === item.id);
        if (exists) return prev;
        return [...prev, validatedItem];
      });
    } catch (error) {
      console.error("Invalid cart item:", sanitizeErrorMessage(error as Error));
      // Optionally show a toast notification to user
    }
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((total, item) => {
      try {
        // Handle Arabic currency symbols by removing the currency prefix first
        // For "د.ك12" -> remove "د.ك" -> get "12"
        // For "$12.00" -> remove "$" -> get "12.00"
        let priceString = item.price;
        if (priceString.startsWith('د.ك')) {
          priceString = priceString.substring(3); // Remove "د.ك"
        } else {
          priceString = priceString.replace(/[^\d.]/g, ''); // Remove other currency symbols
        }
        
        // Validate and parse price safely using schema
        const price = PriceSchema.parse(priceString);
        console.log('Item:', item.name, 'Price string:', item.price, 'Cleaned:', priceString, 'Parsed price:', price);
        return total + price;
      } catch (error) {
        // If price validation fails, treat as 0
        console.warn(`Invalid price format for item ${item.id}: ${item.price}`, sanitizeErrorMessage(error as Error));
        return total;
      }
    }, 0);
  };

  const itemCount = items.length;

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      clearCart,
      getTotal,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
