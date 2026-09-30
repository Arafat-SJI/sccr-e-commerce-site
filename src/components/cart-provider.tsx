// Full file content here
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  reference: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (reference: string) => void;
  updateQuantity: (reference: string, quantity: number) => void;
  removeFromCart: (reference: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (reference: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.reference === reference);
      if (existingItem) {
        return prevCart.map((item) =>
          item.reference === reference
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { reference, name: '', price: 0, quantity: 1 }];
    });
  };

  const updateQuantity = (reference: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.reference === reference ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (reference: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.reference !== reference));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
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
