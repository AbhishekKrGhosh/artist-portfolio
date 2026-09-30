import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import FeaturedArtwork from './components/FeaturedArtwork';
import QuoteSection from './components/QuoteSection';
import Collections from './components/Collections';
import About from './components/About';
import Exhibitions from './components/Exhibitions';
import StudioNotes from './components/StudioNotes';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { getSettings } from './api';

function App() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSettings()
      .then((res) => setSettings(res.data))
      .catch(() => setSettings({}));
  }, []);

  const c = settings?.themeColors || {};
  const themeStyle = {
    '--color-bg': c.primaryBg || '#f5f0eb',
    '--color-bg-dark': c.darkBg || '#1a2e2a',
    '--color-text': c.textColor || '#2c2c2c',
    '--color-text-light': c.textLightColor || '#6b6b6b',
    '--color-accent': c.accentColor || '#2c2c2c',
    '--color-border': c.borderColor || '#e0d8d0',
    '--color-white': c.white || '#ffffff',
  };

  return (
    <div style={themeStyle}>
      <AnimatePresence>
        {!settings && <Loader />}
      </AnimatePresence>
      {settings && (
        <>
          <Navbar settings={settings} />
          <Hero settings={settings} />
          <SelectedWorks />
          <FeaturedArtwork />
          <QuoteSection settings={settings} />
          <Collections settings={settings} />
          <About settings={settings} />
          <Exhibitions settings={settings} />
          <StudioNotes settings={settings} />
          <Contact settings={settings} />
          <Footer settings={settings} />
        </>
      )}
    </div>
  );
}

export default App;
