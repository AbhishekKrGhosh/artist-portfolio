import { motion } from 'framer-motion';
import LazyImage from './LazyImage';

function Hero({ settings }) {
  const name = settings?.artistName || 'Mira Sen';
  const tagline = settings?.tagline || 'I paint the spaces between memory and imagination.';
  const heroImage = settings?.heroImage;
  const hasImage = !!heroImage;

  return (
    <section id="work" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '80px',
    }}>
      {hasImage ? (
        <>
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(30,25,20,0.75) 0%, rgba(30,25,20,0.5) 50%, rgba(30,25,20,0.3) 100%)',
          }} />
        </>
      ) : (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #c9b8a8 0%, #a89888 40%, #8a7a6a 100%)',
          opacity: 0.3,
        }} />
      )}

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '600px', width: '100%' }}>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 500,
            lineHeight: 1,
            marginBottom: '24px',
            letterSpacing: '-0.02em',
            color: hasImage ? '#ffffff' : 'var(--color-text)',
            textShadow: hasImage ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
          }}
        >
          {name.toUpperCase().split(' ').map((word, i) => (
            <span key={i} style={{ display: 'block' }}>{word}</span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontSize: '1.15rem',
            lineHeight: 1.7,
            color: hasImage ? 'rgba(255,255,255,0.95)' : 'var(--color-text)',
            maxWidth: '440px',
            marginBottom: '20px',
            fontWeight: 400,
          }}
        >
          {tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontSize: '0.95rem',
            color: hasImage ? 'rgba(255,255,255,0.75)' : 'var(--color-text-light)',
            maxWidth: '400px',
            marginBottom: '40px',
            lineHeight: 1.7,
          }}
        >
          Through colour, light and quiet moments, I explore the beauty in ordinary places, people and emotions.
        </motion.p>

        <motion.a
          href="#selected-works"
          className="btn-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: hasImage ? '#ffffff' : 'var(--color-accent)',
            color: hasImage ? 'var(--color-text)' : 'var(--color-white)',
          }}
        >
          Explore Works <span style={{ fontSize: '1.1rem' }}>→</span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          style={{ marginTop: '60px', fontSize: '0.8rem', color: hasImage ? 'rgba(255,255,255,0.5)' : 'var(--color-text-light)' }}
        >
          Scroll <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>↓</motion.span>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
