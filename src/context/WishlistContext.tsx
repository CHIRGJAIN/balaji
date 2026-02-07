import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  WishlistItem,
  getWishlist,
  addToWishlist as addToWishlistStorage,
  removeFromWishlist as removeFromWishlistStorage,
  toggleWishlist as toggleWishlistStorage,
  isInWishlist as checkIsInWishlist
} from '@/lib/storage';

interface WishlistContextType {
  wishlist: WishlistItem[];
  wishlistCount: number;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const addToWishlist = useCallback((productId: string) => {
    const updatedWishlist = addToWishlistStorage(productId);
    setWishlist([...updatedWishlist]);
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    const updatedWishlist = removeFromWishlistStorage(productId);
    setWishlist([...updatedWishlist]);
  }, []);

  const toggleWishlist = useCallback((productId: string): boolean => {
    const { wishlist: updatedWishlist, added } = toggleWishlistStorage(productId);
    setWishlist([...updatedWishlist]);
    return added;
  }, []);

  const isInWishlist = useCallback((productId: string): boolean => {
    return wishlist.some(item => item.productId === productId);
  }, [wishlist]);

  const value = {
    wishlist,
    wishlistCount: wishlist.length,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
