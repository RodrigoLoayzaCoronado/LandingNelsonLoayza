// components/CheckoutModal.jsx
import { useCart } from '../store/useCart';
import { useState } from 'react';

const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    getCartTotal,
    clearCart
  } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isCheckoutOpen) return null;

  // Número de WhatsApp del negocio en formato internacional sin símbolos.
  // Ejemplo para Bolivia: 59168645946
  const WHATSAPP_NUMBER = '59168645946';

  const formatOrderMessage = () => {
    let message = `NUEVO PEDIDO\n\n`;
    message += `Cliente: ${formData.name}\n`;
    message += `Teléfono: ${formData.phone}\n`;
    message += `——————————————\n`;
    message += `PRODUCTOS:\n`;
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Talla: ${item.size} | Cantidad: ${item.quantity}\n`;
      message += `   Precio: $${item.price} MXN\n`;
    });
    
    message += `——————————————\n`;
    message += `Total: $${getCartTotal()} MXN\n`;
    message += `——————————————\n`;
    message += `Estado: Pendiente de confirmación`;
    
    return message;
  };

  const sendToWhatsApp = () => {
    const encodedMessage = encodeURIComponent(formatOrderMessage());
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(url, '_blank');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name.trim()) {
      setError('Por favor ingresa tu nombre');
      return;
    }
    
    if (!formData.phone.trim()) {
      setError('Por favor ingresa tu teléfono');
      return;
    }
    
    if (cart.length === 0) {
      setError('No hay productos en el carrito');
      return;
    }
    
    setIsSubmitting(true);
    sendToWhatsApp();
    setSuccess(true);
    clearCart();
    
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setSuccess(false);
      setFormData({ name: '', phone: '' });
      setIsSubmitting(false);
    }, 3000);
  };

  return (
    <>
      <div 
        onClick={() => setIsCheckoutOpen(false)}
        style={styles.overlay}
      />
      
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={styles.title}>📝 Completar pedido</h3>
          <button 
            onClick={() => setIsCheckoutOpen(false)}
            style={styles.closeButton}
          >
            ✕
          </button>
        </div>
        
        {success ? (
          <div style={styles.successMessage}>
            <div style={styles.successIcon}>✅</div>
            <h4>¡Pedido enviado!</h4>
            <p>Te contactaremos pronto para confirmar tu pedido.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>
                Nombre completo *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={styles.input}
                placeholder="Juan Pérez"
                disabled={isSubmitting}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label htmlFor="phone" style={styles.label}>
                Teléfono (WhatsApp) *
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                style={styles.input}
                placeholder="55 1234 5678"
                disabled={isSubmitting}
              />
            </div>
            
            <div style={styles.orderSummary}>
              <h4 style={styles.summaryTitle}>Resumen del pedido</h4>
              <p style={styles.summaryItems}>
                {cart.reduce((acc, item) => acc + item.quantity, 0)} productos
              </p>
              <p style={styles.summaryTotal}>
                Total: ${getCartTotal()} MXN
              </p>
            </div>
            
            {error && (
              <div style={styles.errorMessage}>
                ⚠️ {error}
              </div>
            )}
            
            <button
              type="submit"
              style={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : '✅ Confirmar pedido'}
            </button>
          </form>
        )}
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
    background: 'rgba(0,0,0,0.7)',
    zIndex: 2000,
    animation: 'fadeIn 0.3s ease'
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '450px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    zIndex: 2001,
    animation: 'modalSlideIn 0.3s ease',
    maxHeight: '90vh',
    overflowY: 'auto'
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
    color: '#333'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666'
  },
  form: {
    padding: '20px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.2s ease'
  },
  orderSummary: {
    background: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  summaryTitle: {
    margin: '0 0 10px 0',
    fontSize: '16px',
    color: '#333'
  },
  summaryItems: {
    margin: '0 0 5px 0',
    fontSize: '14px',
    color: '#666'
  },
  summaryTotal: {
    margin: '0',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#e63946'
  },
  errorMessage: {
    background: '#ffebee',
    color: '#c62828',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px'
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    background: '#e63946',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  },
  successMessage: {
    padding: '40px 20px',
    textAlign: 'center'
  },
  successIcon: {
    fontSize: '64px',
    marginBottom: '20px'
  }
};

export default CheckoutModal;