import { motion } from 'framer-motion';

function Footer({ settings }) {
  const footerText = settings?.footerText || 'More art. Kinder days. Always.';
  const name = settings?.artistName || 'Mira Sen';

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        background: 'var(--color-bg-dark)',
        color: 'var(--color-white)',
        padding: '60px 24px 40px',
      }}
    >
      <div className="container footer-grid" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <p style={{
          fontFamily: 'var(--font-heading)',
          fontStyle: 'italic',
          fontSize: '1.2rem',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.8)',
          maxWidth: '400px',
        }}>
          {footerText}
        </p>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>
          © {new Date().getFullYear()} {name}
        </p>
      </div>
    </motion.footer>
  );
}

export default Footer;
