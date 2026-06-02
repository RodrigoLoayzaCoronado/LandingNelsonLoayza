
export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2026 Development and Design by NOVAMARK. Todos los derechos reservados.</p>
    </footer>
  );
} 
const styles = {
    footer: {
        backgroundColor: '#000000',
        color: '#00b8b8',
        textAlign: 'center',
        padding: '20px 0',
        marginTop: '40px',
        fontSize: '0.75rem',
    },
    text: {
        margin: 0,
    }
};