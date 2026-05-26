// components/CartDrawer.jsx
import { useState } from 'react';
import { useCart } from '../store/useCart';

const CartDrawer = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    isDrawerOpen,
    setIsDrawerOpen,
    setIsCheckoutOpen
  } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const currentIndex = cart.length === 0 ? 0 : Math.min(activeIndex, cart.length - 1);

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={() => setIsDrawerOpen(false)}
        style={styles.overlay}
      />
      
      {/* Drawer */}
      <div style={styles.drawer}>
        <div style={styles.header}>
          <h3 style={styles.title}>
            🛒 Carrito ({getCartCount()})
          </h3>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            style={styles.closeButton}
          >
            ✕
          </button>
        </div>

        <div style={styles.content}>
          {cart.length === 0 ? (
            <div style={styles.emptyCart}>
              🛍️
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div style={styles.sliderWrapper}>
                <button
                  onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={currentIndex === 0}
                  style={styles.sliderArrow}
                >
                  ‹
                </button>

                <div style={styles.sliderViewport}>
                  {cart.map((item, index) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      style={{
                        ...styles.slide,
                        transform: `translateX(${(index - currentIndex) * 100}%)`
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={styles.slideImage}
                      />
                      <div style={styles.slideInfo}>
                        <h4 style={styles.itemName}>{item.name}</h4>
                        <p style={styles.itemSize}>Talla: {item.size}</p>
                        <p style={styles.itemPrice}>${item.price} Bs.</p>
                        <p style={styles.slideQuantity}>Cantidad: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveIndex((prev) => Math.min(prev + 1, cart.length - 1))}
                  disabled={currentIndex === cart.length - 1}
                  style={styles.sliderArrow}
                >
                  ›
                </button>
              </div>

              <div style={styles.sliderDots}>
                {cart.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      ...styles.dot,
                      ...(index === currentIndex ? styles.activeDot : {})
                    }}
                  />
                ))}
              </div>

              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} style={styles.cartItem}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={styles.itemImage}
                  />
                  
                  <div style={styles.itemInfo}>
                    <h4 style={styles.itemName}>{item.name}</h4>
                    <p style={styles.itemSize}>Talla: {item.size}</p>
                    <p style={styles.itemPrice}>${item.price} Bs.</p>
                    
                    <div style={styles.quantityControls}>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        style={styles.quantityButton}
                      >
                        -
                      </button>
                      <span style={styles.quantity}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        style={styles.quantityButton}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    style={styles.removeButton}
                  >
                    🗑️
                  </button>
                </div>
              ))}

              <div style={styles.footer}>
                <div style={styles.total}>
                  <span>Total:</span>
                  <strong>${getCartTotal()} Bs.</strong>
                </div>
                
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  style={styles.checkoutButton}
                >
                  Enviar mi pedido
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease'
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: '400px',
    background: 'linear-gradient(135deg, #0f0f10, #053d4e)',
    boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideIn 0.3s ease'
  },
  header: {
    padding: '20px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    margin: 0,
    fontSize: '20px',
    color: '#eaeaea'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#eaeaea'
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px'
  },
  emptyCart: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#999',
    fontSize: '48px'
  },
  cartItem: {
    display: 'flex',
    gap: '12px',
    padding: '12px',
    marginBottom: '12px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid #00b8b8',
    borderRadius: '8px',
    position: 'relative'
  },
  itemImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    margin: '0 0 4px 0',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#eaeaea'
  },
  itemSize: {
    margin: '0',
    fontSize: '12px',
    color: '#eaeaea'
  },
  itemPrice: {
    margin: '4px 0',
    fontSize: '14px',
    color: '#00b8b8',
    fontWeight: 'bold'
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px'
  },
  quantityButton: {
    width: '28px',
    height: '28px',
    border: '1px solid #00b8b8',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  quantity: {
    minWidth: '24px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#eaeaea'
  },
  removeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '4px'
  },
  sliderWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '18px',
  },
  sliderArrow: {
    width: '36px',
    height: '36px',
    border: '1px solid #ddd',
    borderRadius: '50%',
    background: 'white',
    cursor: 'pointer',
    fontSize: '20px',
    color: '#333'
  },
  sliderViewport: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
    height: '180px'
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'transform 0.3s ease',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    padding: '12px',
    borderRadius: '12px'
  },
  slideImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  slideInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  slideQuantity: {
    margin: 0,
    fontSize: '14px',
    color: '#eaeaea'
  },
  sliderDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '6px',
    marginBottom: '16px'
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: '1px solid #ccc',
    background: 'transparent',
    cursor: 'pointer'
  },
  activeDot: {
    background: 'linear-gradient(135deg, #00b8b8, #006161)',
    borderColor: 'linear-gradient(135deg, #00b8b8, #006161)'
  },
  footer: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #eee'
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    marginBottom: '16px',
    color: '#eaeaea'
  },
  checkoutButton: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #00b8b8, #006161)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  }
};

// Agregar keyframes
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
document.head.appendChild(styleSheet);

export default CartDrawer;