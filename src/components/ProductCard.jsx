import { useState, useEffect, useCallback } from 'react';
import { useCart } from '../store/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [isLiked, setIsLiked] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const savedLikes = localStorage.getItem('product_likes');
      return savedLikes ? JSON.parse(savedLikes).includes(product.id) : false;
    } catch (error) {
      console.warn('Error reading liked products from localStorage:', error);
      return false;
    }
  });
  const [showNotification, setShowNotification] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;
  const sizes = hasSizes ? product.sizes : [];

  // Sincronizar con cambios de localStorage desde otras pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'product_likes') {
        try {
          const newLikes = e.newValue ? JSON.parse(e.newValue) : [];
          setIsLiked(newLikes.includes(product.id));
        } catch (error) {
          console.warn('Error parsing likes from storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [product.id]);

  const handleLike = useCallback(() => {
    const savedLikes = localStorage.getItem('product_likes');
    let likes = savedLikes ? JSON.parse(savedLikes) : [];
    
    if (isLiked) {
      likes = likes.filter(id => id !== product.id);
    } else {
      likes.push(product.id);
    }
    
    localStorage.setItem('product_likes', JSON.stringify(likes));
    setIsLiked(!isLiked);
  }, [isLiked, product.id]);

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }

    const sizeToAdd = hasSizes ? selectedSize : (product.defaultSize || 'Única');
    addToCart(product, sizeToAdd, 1);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  // Detectar si es mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <div 
      className="product-card" 
      style={{
        ...styles.card,
        transform: !isMobile && isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: !isMobile && isHovered 
          ? '0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(229, 57, 53, 0.3)' 
          : '0 10px 20px rgba(0,0,0,0.2)'
      }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Badge "Limited" o "Hot" */}
      {product.isLimited && (
        <div style={styles.limitedBadge}>
          🔥 LIMITED
        </div>
      )}

      {/* Imagen del producto */}
      <div style={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{
            ...styles.image,
            transform: !isMobile && isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        
        {/* Overlay de gradiente al hover (solo desktop) */}
        {!isMobile && (
          <div style={{
            ...styles.imageOverlay,
            opacity: isHovered ? 0.6 : 0
          }} />
        )}
        
        {/* Botón Like */}
        <button 
          onClick={handleLike}
          style={styles.likeButton}
          aria-label="Me gusta"
        >
          {isLiked ? '❤️' : '♡'}
        </button>
        
      </div>
      

      {/* Información del producto */}
      <div style={styles.info}>
        <div style={styles.titleSection}>
          <h3 style={styles.title}>{product.name}</h3>
          <span style={styles.bidPrice}>{product.price} Bs.</span>
          {product.creator && (
            <span style={styles.creator}>by {product.creator}</span>
          )}
        </div>

        {/* Selector de talla */}
        {hasSizes ? (
          <div style={styles.sizeSection}>
            <label style={styles.sizeLabel}>Size</label>
            <div style={styles.sizeButtons}>
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    ...styles.sizeButton,
                    ...(selectedSize === size && styles.sizeButtonSelected)
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={styles.staticSizeContainer}>
            <span style={styles.staticSizeLabel}>Size</span>
            <span style={styles.staticSize}>{product.defaultSize || 'Unique'}</span>
          </div>
        )}

        {/* Botón Lo Quiero */}
        <button 
          onClick={handleAddToCart}
          style={{
            ...styles.buyButton,
            background: !isMobile && isHovered 
              ? 'linear-gradient(135deg, #00b8b8, #c2185b)'
              : 'linear-gradient(135deg, #00b8b8, #006161)'
          }}
        >
          <span style={styles.buttonText}>Lo Quiero ♡</span>
        </button>

        {/* Notificación */}
        {showNotification && (
          <div style={styles.notification}>
            <span style={styles.notificationIcon}>✓</span>
            Agregado a tu carrito!
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#1a0015', 
    backgroundImage: `
      radial-gradient(circle at 20% 30%, #5f004b 0%, transparent 20%),
      radial-gradient(circle at 75% 20%, #00b8b8 0%, transparent 35%),
      radial-gradient(circle at 20% 80%, #610030 0%, transparent 20%),
      radial-gradient(circle at 85% 70%, #0e5d63 0%, transparent 25%)
    `,
    backgroundRepeat: 'no-repeat',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    border: '1px solid rgba(255,255,255,0.1)',
    width: '100%',
    margin: '0 auto',
  },
  limitedBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: 'linear-gradient(135deg, #ff6b6b, #e53935)',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '10px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    zIndex: 2,
    boxShadow: '0 2px 8px rgba(229,57,53,0.3)'
  },
  imageContainer: {
    position: 'relative',
    paddingTop: '100%',
    margin: '16px',
    paddingBottom: '50px',
    overflow: 'hidden',
    opacity: 0.95,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transition: 'transform 0.3s ease'
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(229,57,53,0.4), rgba(0,0,0,0.6))',
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
  },
  likeButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 2,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bidLabel: {
    display: 'block',
    fontSize: '9px',
    color: '#999',
    letterSpacing: '1px',
    marginBottom: '2px',
    textTransform: 'uppercase'
  },
  bidPrice: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ff6b6b',
    fontFamily: 'monospace'
  },
  info: {
    padding: '16px'
    
  },
  titleSection: {
    marginBottom: '14px',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '6px 10px',
    borderRadius: '10px',
    background: 'rgba(0,0,0,0.3)',
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 4px 0',
    color: '#fff',
    letterSpacing: '-0.5px'
  },
  creator: {
    fontSize: '11px',
    color: '#888',
    display: 'block'
  },
  sizeSection: {
    marginBottom: '16px'
  },
  sizeLabel: {
    display: 'block',
    fontSize: '10px',
    color: '#999',
    marginBottom: '6px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  sizeButtons: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap'
  },
  sizeButton: {
    minWidth: '36px',
    height: '36px',
    padding: '0 8px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
    fontFamily: 'monospace'
  },
  sizeButtonSelected: {
    background: 'linear-gradient(135deg, #e53935, #ff6b6b)',
    borderColor: 'transparent',
    boxShadow: '0 0 10px rgba(229,57,53,0.5)'
  },
  staticSizeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    padding: '6px 0'
  },
  staticSizeLabel: {
    fontSize: '10px',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  staticSize: {
    fontSize: '12px',
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'monospace'
  },
  buyButton: {
    width: '100%',
    padding: '12px',
    border: 'solid rgba(255,255,255,0.2)',
    borderRadius: '10px',
    fontSize: '24px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    letterSpacing: '1px',
    fontSize: '14px'
  },
  buttonArrow: {
    fontSize: '16px',
    transition: 'transform 0.3s ease'
  },
  notification: {
    position: 'absolute',
    bottom: '80px',
    left: '16px',
    right: '16px',
    background: 'linear-gradient(135deg, #4caf50, #45a049)',
    color: 'white',
    padding: '8px',
    borderRadius: '8px',
    fontSize: '12px',
    textAlign: 'center',
    animation: 'slideUp 0.3s ease',
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  notificationIcon: {
    fontSize: '14px',
    fontWeight: 'bold'
  }
};

// Agregar keyframes
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default ProductCard;