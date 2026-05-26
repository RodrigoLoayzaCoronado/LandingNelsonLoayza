import { useState, useEffect } from 'react';
import { CartContext } from './CartContext';

const getSavedCart = () => {
  if (typeof window === 'undefined') return [];
  try {
    const savedCart = localStorage.getItem('racing_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.warn('Error parsing saved cart from localStorage:', error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getSavedCart);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    localStorage.setItem('racing_cart', JSON.stringify(cart));
  }, [cart]);

  const getTotalQuantity = (items) => items.reduce((count, item) => count + item.quantity, 0);
  const maxCartQuantity = 20;

  const addToCart = (product, size, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.id === product.id && item.size === size
      );
      const currentTotal = getTotalQuantity(prevCart);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        const totalAfterUpdate = currentTotal + quantity;
        if (newQuantity > 6 || totalAfterUpdate > maxCartQuantity) {
          window.alert(`No puedes tener más de ${maxCartQuantity} unidades en el carrito.`);
          return prevCart;
        }
        return prevCart.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: newQuantity }
            : item
        );
      }

      if (currentTotal + quantity > maxCartQuantity) {
        window.alert(`No puedes tener más de ${maxCartQuantity} unidades en el carrito.`);
        return prevCart;
      }

      return [...prevCart, {
        id: product.id,
        name: product.name,
        price: product.price,
        size,
        quantity,
        image: product.image
      }];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (id, size) => {
    setCart(prevCart => prevCart.filter(
      item => !(item.id === id && item.size === size)
    ));
  };

  const updateQuantity = (id, size, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id, size);
      return;
    }
    if (newQuantity > 6) return;

    setCart(prevCart => {
      const totalWithoutCurrent = getTotalQuantity(prevCart) - (prevCart.find(item => item.id === id && item.size === size)?.quantity || 0);
      if (totalWithoutCurrent + newQuantity > maxCartQuantity) {
        window.alert(`No puedes tener más de ${maxCartQuantity} unidades en el carrito.`);
        return prevCart;
      }

      return prevCart.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  const getCartTotal = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const getCartCount = () => cart.reduce((count, item) => count + item.quantity, 0);
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      getCartCount,
      isDrawerOpen,
      setIsDrawerOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      orderData,
      setOrderData,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};
