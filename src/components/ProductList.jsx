import ProductCard from './ProductCard';
import poleraImg from '../assets/polera.png';
import poleraImg1 from '../assets/polera1.png';
import lanyardImg from '../assets/lanyard.png';
import gorraImg from '../assets/gorra.png';
import gorraImg1 from '../assets/gorra1.png';
import camperaImg from '../assets/campera.png';
import lanyardImg1 from '../assets/lanyard1.png';

const products = [
  {
    id: 'p1',
    name: 'Polera Oficial',
    description: 'Polera con cuello, edición limitada con estampado.',
    price: 125,
    images: [poleraImg, poleraImg1],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'p2',
    name: 'Campera Racing',
    description: 'Campera deportiva, estilo racing.',
    price: 250,
    images: [camperaImg],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'p3',
    name: 'Lanyard Oficial',
    description: 'Lanyard resistente con mosquetón metálico y diseño exclusivo del equipo.',
    price: 25,
    images: [lanyardImg, lanyardImg1],
    defaultSize: 'Única',
    sizes: []
  },
  {
    id: 'p4',
    name: 'Gorra Racing Color Blanco',
    description: 'Gorra deportiva con bordado en contraste y ajuste trasero.',
    price: 50,
    images: [gorraImg],
    defaultSize: 'Única',
    sizes: []
  },
  {
    id: 'p5',
    name: 'Gorra Racing Color Negro',
    description: 'Gorra deportiva con bordado en contraste y ajuste trasero.',
    price: 50,
    images: [gorraImg1],
    defaultSize: 'Única',
    sizes: []
  }

];

export default function ProductList() {
  return (
    <section id="products" style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>COLECCIÓN OFICIAL</h2>
        <p style={styles.subtitle}>Diseños exclusivos para los amantes del automovilismo.</p>
      </div>
      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    width: '100%',
    maxWidth: 1280,
    margin: '0 auto',
    color: '#f1f1f1',
    padding: '20px 24px',
    boxSizing: 'border-box',
  },
  header: {
    marginBottom: '24px',
    textAlign: 'center'
  },
  title: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 'bold',
    fontSize: '2rem',
    margin: 0,
    color: '#fff'
  },
  subtitle: {
    marginTop: '8px',
    color: '#b0b0b0'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px'
  }
};
