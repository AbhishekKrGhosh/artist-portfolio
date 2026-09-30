import { useEffect, useState } from 'react';
import { getCollections } from '../api';
import { FadeIn, StaggerContainer, StaggerItem } from './Animations';
import LazyImage from './LazyImage';

function Collections({ settings }) {
  const [collections, setCollections] = useState([]);
  const subtitle = settings?.collectionsSubtitle || 'Different stories, different colours, same curiosity.';

  useEffect(() => {
    getCollections()
      .then((res) => setCollections(res.data))
      .catch(() => setCollections([]));
  }, []);

  return (
    <section className="container" style={{ padding: '40px 24px 80px' }}>
      <FadeIn>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 className="section-label">Collections</h2>
          <a href="#" className="view-all">View All →</a>
        </div>
        <p className="section-subtitle">{subtitle}</p>
      </FadeIn>

      <StaggerContainer delay={0.2}>
        <div className="collections-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '20px',
        }}>
          {collections.map((col) => (
            <StaggerItem key={col._id}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
                <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                  <LazyImage src={col.image} alt={col.name} style={{ position: 'absolute', inset: 0 }} />
                  {!col.image && <div className="placeholder-img">{col.name}</div>}
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '20px',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                  color: 'white',
                }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '2px' }}>{col.name}</h3>
                  <p style={{ fontSize: '0.8rem', opacity: 0.85 }}>{col.artworkCount} artworks</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </section>
  );
}

export default Collections;
