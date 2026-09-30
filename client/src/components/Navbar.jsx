import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar({ settings }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const name = settings?.artistName || 'Mira Sen';

  const navItems = [
    { label: 'Work', href: '#selected-works' },
    { label: 'About', href: '#about' },
    { label: 'Exhibitions', href: '#exhibitions' },
    { label: 'Journal', href: '#journal' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(245, 240, 235, 0.92)',
        backdropFilter: 'blur(12px)',
      }}>
        <a href="#" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.05em' }}>
          {name.toUpperCase().split(' ').map((word, i) => (
            <span key={i} style={{ display: 'block', lineHeight: 1.1 }}>{word}</span>
          ))}
        </a>

        <div className="nav-links" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{ fontSize: '0.9rem', color: 'var(--color-text)', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => (e.target.style.opacity = '0.6')}
              onMouseLeave={(e) => (e.target.style.opacity = '1')}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="btn-primary nav-cta" style={{ fontSize: '0.85rem', padding: '10px 22px' }}>
          Get in Touch
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="menu-toggle"
          style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: 'var(--color-text)', padding: '4px', zIndex: 1002, position: 'relative' }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button className="close-btn" onClick={() => setMenuOpen(false)}>✕</button>
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={handleNavClick}>
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={handleNavClick} className="btn-primary" style={{ marginTop: '16px' }}>
              Get in Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
