import { useEffect, useState } from 'react';
import { getArtworks } from '../api';
import { FadeIn, StaggerContainer, StaggerItem } from './Animations';
import LazyImage from './LazyImage';

const categories = ['All', 'Landscapes', 'People', 'Everyday Life', 'Still Life', 'Abstract'];

function SelectedWorks() {
  const [artworks, setArtworks] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    getArtworks(activeCategory === 'All' ? {} : { category: activeCategory })
      .then((res) => setArtworks(res.data))
      .catch(() => setArtworks([]));
  }, [activeCategory]);

  return (
    <section id="selected-works" className="container" style={{ padding: '80px 24px' }}>
      <FadeIn>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 className="section-label">Selected Works</h2>
          <a href="#" className="view-all">View All →</a>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: 'none',
                background: activeCategory === cat ? 'var(--color-accent)' : 'transparent',
                color: activeCategory === cat ? 'var(--color-white)' : 'var(--color-text-light)',
                fontSize: '0.85rem',
                fontWeight: 500,
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </FadeIn>

      <StaggerContainer delay={0.2}>
        <div className="artworks-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {artworks.map((artwork) => (
            <StaggerItem key={artwork._id}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                  <LazyImage src={artwork.image} alt={artwork.title} style={{ position: 'absolute', inset: 0 }} />
                  {!artwork.image && <div className="placeholder-img">{artwork.title}</div>}
                </div>
                <div style={{ padding: '12px 4px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px' }}>{artwork.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                    {artwork.medium} · {artwork.dimensions} · {artwork.year}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </section>
  );
}

export default SelectedWorks;
