import Hero from "./components/Hero";
import BrandConcept from "./components/BrandConcept";
import ProductList from "./components/ProductList";
import { CartProvider } from './store/CartProvider.jsx';
import CartFloatingButton from "./components/CartFloatingButton";
import CartDrawer from "./components/CardDrawer.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx"; // ← AGREGAR

function App() {
  return (
    <CartProvider>
      <main style={{ backgroundColor: '#000', overflowX: 'hidden' }}>
        <Hero />
        <BrandConcept />
        <ProductList />
        <CartFloatingButton />
        <CartDrawer />
        <CheckoutModal />  {/* ← AGREGAR */}
      </main>
    </CartProvider>
  );
}

export default App;