import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  CartItem,
  getCart,
  addToCart as addToCartStorage,
  updateCartItem as updateCartItemStorage,
  removeFromCart as removeFromCartStorage,
  clearCart as clearCartStorage,
  getCartTotal,
  getCartCount
} from '@/lib/storage';

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: string, weight: string, quantity: number) => void;
  removeItem: (productId: string, weight: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    const updatedCart = addToCartStorage(item);
    setCart([...updatedCart]);
  }, []);

  const updateQuantity = useCallback((productId: string, weight: string, quantity: number) => {
    const updatedCart = updateCartItemStorage(productId, weight, quantity);
    setCart([...updatedCart]);
  }, []);

  const removeItem = useCallback((productId: string, weight: string) => {
    const updatedCart = removeFromCartStorage(productId, weight);
    setCart([...updatedCart]);
  }, []);

  const clearCart = useCallback(() => {
    clearCartStorage();
    setCart([]);
  }, []);

  const value = {
    cart,
    cartCount: getCartCount(cart),
    cartTotal: getCartTotal(cart),
    addToCart,
    updateQuantity,
    removeItem,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
