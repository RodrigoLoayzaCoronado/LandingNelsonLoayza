// store/CartContext.jsx
import { createContext, useState, useEffect, useCallback } from 'react';

export const CartContext = createContext();

const CART_KEY  = 'nl_cart_v1';
const LIKES_KEY = 'nl_likes_v1';

function loadFromStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch (error) {
    console.warn('Error loading from storage:', error);
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Error saving to storage:', error);
  }
}

export function CartProvider({ children }) {

  // ── Carrito ─────────────────────────────────
  const [cart, setCart] = useState(() => loadFromStorage(CART_KEY, []));

  useEffect(() => { saveToStorage(CART_KEY, cart); }, [cart]);

  // Agregar producto (si ya existe id+talla, sube cantidad)
  const addToCart = useCallback((product, size = null) => {
    setCart(prev => {
      const key = size ? `${product.id}_${size}` : `${product.id}`;
      const exists = prev.find(i => i._key === key);
      if (exists) {
        return prev.map(i => i._key === key ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, {
        _key    : key,
        id      : product.id,
        name    : product.name,
        price   : product.price,
        currency: product.currency ?? 'Bs.',
        image   : product.image,
        size    : size,
        quantity: 1,
      }];
    });
  }, []);

  // Eliminar por id + talla
  const removeFromCart = useCallback((id, size) => {
    const key = size ? `${id}_${size}` : `${id}`;
    setCart(prev => prev.filter(i => i._key !== key));
  }, []);

  // Actualizar cantidad (quantity <= 0 elimina el item)
  const updateQuantity = useCallback((id, size, quantity) => {
    const key = size ? `${id}_${size}` : `${id}`;
    if (quantity <= 0) {
      setCart(prev => prev.filter(i => i._key !== key));
    } else {
      setCart(prev => prev.map(i => i._key === key ? { ...i, quantity } : i));
    }
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const getCartTotal = useCallback(() =>
    cart.reduce((acc, i) => acc + i.price * i.quantity, 0),
  [cart]);

  const getCartCount = useCallback(() =>
    cart.reduce((acc, i) => acc + i.quantity, 0),
  [cart]);

  // ── UI: drawer y checkout ────────────────────
  const [isDrawerOpen,   setIsDrawerOpen]   = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Abre checkout y cierra drawer de forma segura
  const openCheckout = useCallback(() => {
    setIsCheckoutOpen(true);
    // Pequeño delay para que el modal monte antes de desmontar el drawer
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
          liked: !current.liked,
          count: current.liked ? current.count - 1 : current.count + 1,
        },
      };
    });
  }, []);

  const getLike = useCallback((productId, initialCount = 0) =>
    likes[productId] ?? { liked: false, count: initialCount },
  [likes]);

  // ── Valor del contexto ───────────────────────
  return (
    <CartContext.Provider value={{
      // Carrito
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      // UI
      isDrawerOpen,
      setIsDrawerOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      openCheckout,       // ← usar este en lugar de los dos setters por separado
      // Likes
      toggleLike,
      getLike,
    }}>
      {children}
    </CartContext.Provider>
  );
}