import { motion } from 'framer-motion';

function Loader() {
  return (
    <motion.div
      className="site-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        style={{
          height: 3,
          background: 'var(--color-accent)',
          borderRadius: 2,
          marginBottom: 24,
        }}
      />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.1rem',
          fontStyle: 'italic',
          color: 'var(--color-text-light)',
          letterSpacing: '0.05em',
        }}
      >
        Loading...
      </motion.p>
    </motion.div>
  );
}

export default Loader;
