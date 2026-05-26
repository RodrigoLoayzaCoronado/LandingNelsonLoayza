import ProductCard from './ProductCard';
import poleraImg from '../assets/polera.png';
import lanyardImg from '../assets/lanyard.png';
import gorraImg from '../assets/gorra.png';
import camperaImg from '../assets/campera.png';

const products = [
  {
    id: 'p1',
    name: 'Polera Oficial',
    description: 'Polera de edición limitada con estampado del equipo y tejido fresco para uso diario.',
    price: 125,
    image: poleraImg,
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'p2',
    name: 'Campera Racing',
    description: 'Campera deportiva con capucha, detalles reflectantes y forro interior suave.',
    price: 250,
    image: camperaImg,
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'p3',
    name: 'Lanyard Oficial',
    description: 'Lanyard resistente con mosquetón metálico y diseño exclusivo del equipo.',
    price: 25,
    image: lanyardImg,
    defaultSize: 'Única',
    sizes: []
  },
  {
    id: 'p4',
    name: 'Gorra Racing',
    description: 'Gorra deportiva con bordado en contraste y ajuste trasero.',
    price: 50,
    image: gorraImg,
    defaultSize: 'Única',
    sizes: []
  },

];

export default function ProductList() {
  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Colección oficial</h2>
        <p style={styles.subtitle}>Elige tu estilo con imagen, descripción y tallas opcionales.</p>
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
