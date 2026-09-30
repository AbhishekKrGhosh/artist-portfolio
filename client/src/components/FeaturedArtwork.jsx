import { useEffect, useState } from 'react';
import { getArtworks } from '../api';
import { FadeInLeft, FadeInRight } from './Animations';
import LazyImage from './LazyImage';

function FeaturedArtwork() {
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    getArtworks({ featured: 'true' })
      .then((res) => {
        if (res.data.length > 0) setArtwork(res.data[0]);
      })
      .catch(() => {});
  }, []);

  if (!artwork) return null;

  return (
    <section className="container" style={{ padding: '40px 24px 80px' }}>
      <div className="featured-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center',
      }}>
        <FadeInLeft>
          <div style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', aspectRatio: '4/3' }}>
            <LazyImage src={artwork.image} alt={artwork.title} style={{ position: 'absolute', inset: 0 }} />
            {!artwork.image && <div className="placeholder-img" style={{ height: '100%' }}>{artwork.title}</div>}
          </div>
        </FadeInLeft>

        <FadeInRight delay={0.15}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '12px' }}>
              {artwork.title}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: '4px' }}>
              {artwork.medium}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '20px' }}>
              {artwork.dimensions} · {artwork.year}
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-text-light)', marginBottom: '28px' }}>
              {artwork.description}
            </p>
            <a href="#contact" className="btn-primary" style={{ fontSize: '0.85rem' }}>
              Enquire About This Work <span>→</span>
            </a>
          </div>
        </FadeInRight>
      </div>
    </section>
  );
}

export default FeaturedArtwork;
