// components/CartFloatingButton.jsx
import { useCart } from '../store/useCart';

const CartFloatingButton = () => {
  const { getCartCount, setIsDrawerOpen } = useCart();
  const count = getCartCount();

  if (count === 0) return null;

  return (
    <button
      onClick={() => setIsDrawerOpen(true)}
      style={styles.button}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
      }}
    >
      <span style={styles.icon}>🛒</span>
      {count > 0 && (
        <span style={styles.badge}>{count}</span>
      )}
    </button>
  );
};

const styles = {
  button: {
    position: 'fixed',
    bottom: '20px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: '#e63946',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease',
    zIndex: 999
  },
  icon: {
    fontSize: '24px'
  },
  badge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    background: '#ff9800',
    color: 'white',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  }
};

export default CartFloatingButton;