// LocalStorage utilities for cart, wishlist, and user preferences

export interface CartItem {
  productId: string;
  quantity: number;
  weight: string;
  price: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

const CART_KEY = 'balaji_sweets_cart';
const WISHLIST_KEY = 'balaji_sweets_wishlist';
const USER_PREFS_KEY = 'balaji_sweets_prefs';

// Cart functions
export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (item: CartItem): CartItem[] => {
  const cart = getCart();
  const existingIndex = cart.findIndex(
    i => i.productId === item.productId && i.weight === item.weight
  );
  
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }
  
  saveCart(cart);
  return cart;
};

export const updateCartItem = (productId: string, weight: string, quantity: number): CartItem[] => {
  const cart = getCart();
  const index = cart.findIndex(i => i.productId === productId && i.weight === weight);
  
  if (index >= 0) {
    if (quantity <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = quantity;
    }
  }
  
  saveCart(cart);
  return cart;
};

export const removeFromCart = (productId: string, weight: string): CartItem[] => {
  const cart = getCart().filter(i => !(i.productId === productId && i.weight === weight));
  saveCart(cart);
  return cart;
};

export const clearCart = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_KEY);
};

export const getCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartCount = (cart: CartItem[]): number => {
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// Wishlist functions
export const getWishlist = (): WishlistItem[] => {
  if (typeof window === 'undefined') return [];
  const wishlist = localStorage.getItem(WISHLIST_KEY);
  return wishlist ? JSON.parse(wishlist) : [];
};

export const saveWishlist = (wishlist: WishlistItem[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
};

export const addToWishlist = (productId: string): WishlistItem[] => {
  const wishlist = getWishlist();
  if (!wishlist.some(i => i.productId === productId)) {
    wishlist.push({ productId, addedAt: new Date().toISOString() });
    saveWishlist(wishlist);
  }
  return wishlist;
};

export const removeFromWishlist = (productId: string): WishlistItem[] => {
  const wishlist = getWishlist().filter(i => i.productId !== productId);
  saveWishlist(wishlist);
  return wishlist;
};

export const isInWishlist = (productId: string): boolean => {
  return getWishlist().some(i => i.productId === productId);
};

export const toggleWishlist = (productId: string): { wishlist: WishlistItem[]; added: boolean } => {
  if (isInWishlist(productId)) {
    return { wishlist: removeFromWishlist(productId), added: false };
  } else {
    return { wishlist: addToWishlist(productId), added: true };
  }
};

// User preferences
export interface UserPreferences {
  recentlyViewed: string[];
  searchHistory: string[];
}

export const getPreferences = (): UserPreferences => {
  if (typeof window === 'undefined') return { recentlyViewed: [], searchHistory: [] };
  const prefs = localStorage.getItem(USER_PREFS_KEY);
  return prefs ? JSON.parse(prefs) : { recentlyViewed: [], searchHistory: [] };
};

export const savePreferences = (prefs: UserPreferences): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_PREFS_KEY, JSON.stringify(prefs));
};

export const addRecentlyViewed = (productId: string): void => {
  const prefs = getPreferences();
  prefs.recentlyViewed = [productId, ...prefs.recentlyViewed.filter(id => id !== productId)].slice(0, 10);
  savePreferences(prefs);
};

export const addSearchHistory = (query: string): void => {
  const prefs = getPreferences();
  prefs.searchHistory = [query, ...prefs.searchHistory.filter(q => q !== query)].slice(0, 10);
  savePreferences(prefs);
};
