// store/CartProvider.jsx
// Solo exporta el componente Provider
import { useState, useEffect, useCallback } from 'react';
import { CartContext } from './CartContext.jsx';

const CART_KEY  = 'nl_cart_v1';
const LIKES_KEY = 'nl_likes_v1';

function loadFromStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Error parsing saved cart from localStorage:', error);
    return [];
  }
}

export function CartProvider({ children }) {

  // ── Carrito ──────────────────────────────────
  const [cart, setCart] = useState(() => loadFromStorage(CART_KEY, []));
  useEffect(() => { saveToStorage(CART_KEY, cart); }, [cart]);

  const addToCart = useCallback((product, size = null, quantity = 1) => {
    const image = product.images?.[0] ?? product.image ?? '';
    const images = product.images ?? (product.image ? [product.image] : []);

    setCart(prev => {
      const key = size ? `${product.id}_${size}` : `${product.id}`;
      const exists = prev.find(i => i._key === key);
      if (exists) {
        return prev.map(i =>
          i._key === key
            ? { ...i, quantity: i.quantity + quantity, image, images }
            : i,
        );
      }
      return [...prev, {
        _key    : key,
        id      : product.id,
        name    : product.name,
        price   : product.price,
        currency: product.currency ?? 'Bs.',
        image,
        images,
        size,
        quantity,
      }];
    });
  }, []);

  const removeFromCart = useCallback((id, size) => {
    const key = size ? `${id}_${size}` : `${id}`;
    setCart(prev => prev.filter(i => i._key !== key));
  }, []);

  const updateQuantity = useCallback((id, size, quantity) => {
    const key = size ? `${id}_${size}` : `${id}`;
    if (quantity <= 0) {
      setCart(prev => prev.filter(i => i._key !== key));
    } else {
      setCart(prev => prev.map(i => i._key === key ? { ...i, quantity } : i));
    }
  }, []);

  const clearCart    = useCallback(() => setCart([]), []);
  const getCartTotal = useCallback(() => cart.reduce((acc, i) => acc + i.price * i.quantity, 0), [cart]);
  const getCartCount = useCallback(() => cart.reduce((acc, i) => acc + i.quantity, 0), [cart]);

  // ── UI ───────────────────────────────────────
  const [isDrawerOpen,   setIsDrawerOpen]   = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const openCheckout = useCallback(() => {
    setIsCheckoutOpen(true);
    setTimeout(() => setIsDrawerOpen(false), 50);
  }, []);

  // ── Likes ────────────────────────────────────
  const [likes, setLikes] = useState(() => loadFromStorage(LIKES_KEY, {}));
  useEffect(() => { saveToStorage(LIKES_KEY, likes); }, [likes]);

  const toggleLike = useCallback((productId, initialCount = 0) => {
    setLikes(prev => {
      const current = prev[productId] ?? { liked: false, count: initialCount };
      return {
        ...prev,
        [productId]: {
          liked : !current.liked,
          count : current.liked ? current.count - 1 : current.count + 1,
        },
      };
    });
  }, []);

  const getLike = useCallback((productId, initialCount = 0) =>
    likes[productId] ?? { liked: false, count: initialCount },
  [likes]);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount,
      isDrawerOpen, setIsDrawerOpen,
      isCheckoutOpen, setIsCheckoutOpen, openCheckout,
      toggleLike, getLike,
    }}>
      {children}
    </CartContext.Provider>
  );
}