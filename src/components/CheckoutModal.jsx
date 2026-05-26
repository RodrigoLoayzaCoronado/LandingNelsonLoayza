// components/CheckoutModal.jsx
import { useState } from 'react';
import { useCart } from '../store/useCart';

const WHATSAPP_NUMBER = '59168645946'; // ← cambia al número real

const formatOrderMessage = (cart, getCartTotal, name, phone) => {
  let msg = `🏁 *NUEVO PEDIDO — NL Merch*\n\n`;
  msg += `😎 *Cliente:* ${name}\n`;
  msg += `📱 *Teléfono:* ${phone}\n`;
  msg += `---------------\n`;
  msg += `🛒 *Productos:*\n`;
  cart.forEach((item, i) => {
    msg += `${i + 1}. *${item.name}*\n`;
    if (item.size) msg += `   Talla: ${item.size}\n`;
    msg += `   Cantidad: ${item.quantity}\n`;
    msg += `   Precio: Bs.${item.price}\n`;
  });
  msg += `---------------\n`;
  msg += `💰 *Total: Bs.${getCartTotal()}*\n`;
  msg += `📅 ${new Date().toLocaleString('es-BO', { timeZone: 'America/La_Paz' })}`;
  return msg;
};


export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, getCartTotal, clearCart } = useCart();

  const [name, setName]           = useState('');
  const [phone, setPhone]         = useState('');
  const [errors, setErrors]       = useState({});
  const [success, setSuccess]     = useState(false);

  if (!isCheckoutOpen) return null;

  // ── Validación ──────────────────────────────
  function validate() {
    const e = {};
    if (!name.trim() || name.trim().length < 2) e.name  = 'Ingresa tu nombre completo';
    if (!phone.trim())                           e.phone = 'Ingresa tu número de WhatsApp';
    if (cart.length === 0)                       e.cart  = 'No hay productos en el carrito';
    return e;
  }
  function buildWhatsAppURL(number, message) {
  // Convierte el string a bytes UTF-8 correctamente
  const encoded = Array.from(message)
    .map(char => {
      const code = char.codePointAt(0);
      // Emojis y caracteres especiales — dejar pasar sin encodear
      if (code > 127) return char;
      // Solo encodear caracteres que rompen URLs
      return encodeURIComponent(char);
    })
    .join('');
  
  return `https://wa.me/${number}?text=${encoded}`;
}

  // ── Submit ───────────────────────────────────
  // FIX 1: solo en onSubmit del <form>, sin onClick en el botón
  // FIX 2: window.open se llama sincrónicamente dentro del handler
  //        para que el browser lo reconozca como gesto del usuario
  function handleSubmit(e) {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    // Abrir WhatsApp sincrónicamente (mismo tick que el gesto)
    const msg = formatOrderMessage(cart, getCartTotal, name.trim(), phone.trim());
    const url = buildWhatsAppURL(WHATSAPP_NUMBER, msg);
    window.open(url, '_blank') || (window.location.href = url);
    

    // Limpiar estado
    clearCart();
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setName('');
      setPhone('');
      setIsCheckoutOpen(false);
    }, 3000);
  }

  function handleClose() {
    setIsCheckoutOpen(false);
    setErrors({});
  }

  const total     = getCartTotal();
  const itemCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400&family=Barlow+Condensed:wght@600;700;800;900&display=swap');

        @keyframes nl-overlay-in { from{opacity:0} to{opacity:1} }
        @keyframes nl-modal-in   { from{opacity:0;transform:translate(-50%,-46%) scale(.97)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
        @keyframes nl-success-in { from{opacity:0;transform:scale(.8)} to{opacity:1;transform:scale(1)} }
        @keyframes nl-shake       { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }

        .nl-co-overlay {
          position:fixed;inset:0;background:rgba(0,0,0,.75);
          backdrop-filter:blur(6px);z-index:2000;
          animation:nl-overlay-in .25s ease both;
        }
        .nl-co-modal {
          position:fixed;top:50%;left:50%;
          transform:translate(-50%,-50%);
          width:92%;max-width:440px;
          background:#0f0f10;
          border:1px solid rgba(0,184,184,.22);
          z-index:2001;
          animation:nl-modal-in .32s cubic-bezier(.16,1,.3,1) both;
          font-family:'Barlow Condensed',sans-serif;
          max-height:92svh;overflow-y:auto;
        }
        .nl-co-header {
          padding:20px 20px 16px;
          border-bottom:1px solid rgba(234,234,234,.08);
          display:flex;justify-content:space-between;align-items:center;
        }
        .nl-co-title {
          font-size:1.4rem;font-weight:900;
          color:#eaeaea;text-transform:uppercase;letter-spacing:.04em;margin:0;
        }
        .nl-co-close {
          background:none;border:none;cursor:pointer;
          color:#7a7f85;font-size:1.2rem;line-height:1;
          padding:4px 8px;transition:color .18s;
        }
        .nl-co-close:hover{color:#eaeaea;}

        .nl-co-summary {
          margin:16px 20px;
          border:1px solid rgba(0,184,184,.14);
        }
        .nl-co-item {
          display:flex;justify-content:space-between;align-items:center;
          padding:9px 12px;
          border-bottom:1px solid rgba(234,234,234,.06);
          font-size:.88rem;color:#eaeaea;
        }
        .nl-co-item:last-child{border-bottom:none;}
        .nl-co-item-meta {
          font-family:'Barlow',sans-serif;font-size:.72rem;color:#7a7f85;
        }
        .nl-co-total {
          display:flex;justify-content:space-between;
          padding:10px 12px;
          background:rgba(0,184,184,.07);
          font-weight:700;font-size:.95rem;
          color:#00b8b8;letter-spacing:.06em;text-transform:uppercase;
        }

        .nl-co-form { padding:0 20px 24px; }
        .nl-co-divider {
          height:1px;
          background:linear-gradient(to right,transparent,rgba(0,184,184,.18),transparent);
          margin:16px 0;
        }
        .nl-co-field { display:flex;flex-direction:column;gap:6px;margin-bottom:14px; }
        .nl-co-label {
          font-size:.58rem;letter-spacing:.28em;
          text-transform:uppercase;color:#7a7f85;
        }
        .nl-co-input {
          background:rgba(234,234,234,.04);
          border:1px solid rgba(234,234,234,.14);
          color:#eaeaea;padding:12px 14px;
          font-family:'Barlow',sans-serif;font-size:.92rem;
          outline:none;transition:border-color .2s;
          width:100%;box-sizing:border-box;
          -webkit-appearance:none;border-radius:0;
        }
        .nl-co-input:focus  { border-color:#00b8b8; }
        .nl-co-input.err    { border-color:#c2185b;animation:nl-shake .3s ease; }
        .nl-co-field-err {
          font-family:'Barlow',sans-serif;font-size:.7rem;
          color:#c2185b;letter-spacing:.04em;
        }

        .nl-co-btn {
          width:100%;padding:15px 0;margin-top:6px;
          background:#c2185b;color:#eaeaea;border:none;cursor:pointer;
          font-family:'Barlow Condensed',sans-serif;font-weight:800;
          font-size:1rem;letter-spacing:.22em;text-transform:uppercase;
          transition:background .22s,transform .12s;
          position:relative;overflow:hidden;
        }
        .nl-co-btn:hover{background:#a31650;}
        .nl-co-btn:active{transform:scale(.98);}
        .nl-co-btn:disabled{opacity:.45;cursor:not-allowed;}
        .nl-co-btn::before{
          content:'';position:absolute;inset:0;
          background:linear-gradient(105deg,transparent 38%,rgba(255,255,255,.15) 50%,transparent 62%);
          transform:translateX(-120%);transition:transform .4s ease;
        }
        .nl-co-btn:hover::before{transform:translateX(120%);}

        .nl-co-success {
          padding:44px 24px 36px;text-align:center;
          animation:nl-success-in .45s cubic-bezier(.16,1,.3,1) both;
        }
        .nl-co-success-icon { font-size:3rem;margin-bottom:14px; }
        .nl-co-success-title {
          font-size:1.7rem;font-weight:900;color:#00b8b8;
          text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;
        }
        .nl-co-success-body {
          font-family:'Barlow',sans-serif;font-weight:300;
          font-size:.85rem;color:#7a7f85;line-height:1.6;
        }
        .nl-co-cart-err {
          font-family:'Barlow',sans-serif;font-size:.75rem;
          color:#c2185b;text-align:center;margin-bottom:10px;letter-spacing:.04em;
        }
      `}</style>

      {/* Overlay */}
      <div className="nl-co-overlay" onClick={handleClose} />

      {/* Modal */}
      <div className="nl-co-modal" role="dialog" aria-modal="true" aria-label="Finalizar pedido">

        {/* Header */}
        <div className="nl-co-header">
          <h2 className="nl-co-title">Tu pedido</h2>
          <button className="nl-co-close" onClick={handleClose} aria-label="Cerrar">✕</button>
        </div>

        {success ? (
          /* ── Éxito ── */
          <div className="nl-co-success">
            <div className="nl-co-success-icon">🏁</div>
            <p className="nl-co-success-title">¡Pedido enviado!</p>
            <p className="nl-co-success-body">
              Se abrió WhatsApp con tu pedido listo.<br />
              Te contactaremos para confirmar.
            </p>
          </div>
        ) : (
          <>
            {/* Resumen carrito */}
            <div className="nl-co-summary">
              {cart.map((item, i) => (
                <div key={`${item.id}_${item.size}_${i}`} className="nl-co-item">
                  <div>
                    <div>{item.name}</div>
                    <div className="nl-co-item-meta">
                      {item.size && `Talla ${item.size} · `}Cant. {item.quantity}
                    </div>
                  </div>
                  <span style={{ color: '#00b8b8', fontWeight: 700 }}>
                    Bs.{item.price * item.quantity}
                  </span>
                </div>
              ))}
              <div className="nl-co-total">
                <span>{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</span>
                <span>Bs.{total}</span>
              </div>
            </div>

            {/* Formulario — FIX: onSubmit en el form, sin onClick en el botón */}
            <form className="nl-co-form" onSubmit={handleSubmit} noValidate>
              <div className="nl-co-divider" />

              <div className="nl-co-field">
                <label className="nl-co-label" htmlFor="co-name">Nombre completo</label>
                <input
                  id="co-name"
                  className={`nl-co-input${errors.name ? ' err' : ''}`}
                  type="text"
                  placeholder="Oscar Crespo"
                  value={name}
                  onChange={e => { setName(e.target.value); setErrors(p => ({...p, name: ''})); }}
                  autoComplete="name"
                />
                {errors.name && <span className="nl-co-field-err">{errors.name}</span>}
              </div>

              <div className="nl-co-field">
                <label className="nl-co-label" htmlFor="co-phone">WhatsApp</label>
                <input
                  id="co-phone"
                  className={`nl-co-input${errors.phone ? ' err' : ''}`}
                  type="tel"
                  placeholder="+591 7xxxxxxx"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setErrors(p => ({...p, phone: ''})); }}
                  autoComplete="tel"
                  inputMode="tel"
                />
                {errors.phone && <span className="nl-co-field-err">{errors.phone}</span>}
              </div>

              {errors.cart && <p className="nl-co-cart-err">⚠️ {errors.cart}</p>}

              {/* FIX: solo type="submit", sin onClick */}
              <button type="submit" className="nl-co-btn">
                Confirmar por WhatsApp →
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}