"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type CartItem = {
  reference: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string | null;
  dial?: string;
  hands?: string;
  bezel?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (reference: string, quantity: number) => void;
  removeFromCart: (reference: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart) as CartItem[];
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      } catch {
        localStorage.removeItem("cart");
      }
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, ready]);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((entry) => entry.reference === item.reference);

      if (existingItem) {
        return prevCart.map((entry) =>
          entry.reference === item.reference ? { ...entry, quantity: entry.quantity + 1 } : entry,
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((reference: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.reference === reference ? { ...item, quantity } : item)),
    );
  }, []);

  const removeFromCart = useCallback((reference: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.reference !== reference));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
