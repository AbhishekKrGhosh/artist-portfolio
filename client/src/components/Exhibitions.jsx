import { useEffect, useState } from 'react';
import { getExhibitions } from '../api';
import { FadeInLeft, FadeInRight } from './Animations';
import LazyImage from './LazyImage';

function Exhibitions({ settings }) {
  const [exhibitions, setExhibitions] = useState([]);
  const header = settings?.exhibitionHeader || 'A few places where my work has found a home.';
  const exhibitionImage = settings?.exhibitionImage;

  useEffect(() => {
    getExhibitions()
      .then((res) => setExhibitions(res.data))
      .catch(() => setExhibitions([]));
  }, []);

  return (
    <section id="exhibitions" style={{
      background: 'var(--color-bg-dark)',
      color: 'var(--color-white)',
      padding: '80px 0',
    }}>
      <div className="container exhibitions-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
        <FadeInLeft>
          <div>
            <h2 className="section-label" style={{ color: 'var(--color-white)', marginBottom: '8px' }}>Exhibitions</h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '40px' }}>{header}</p>

            <div style={{ position: 'relative', paddingLeft: '24px' }}>
              <div style={{
                position: 'absolute',
                left: '6px',
                top: '8px',
                bottom: '8px',
                width: '1px',
                background: 'rgba(255,255,255,0.2)',
              }} />

              {exhibitions.map((ex) => (
                <div key={ex._id} style={{ marginBottom: '32px', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '-20px',
                    top: '6px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'var(--color-white)',
                  }} />
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>
                    {ex.year}
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '2px' }}>{ex.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>{ex.venue}, {ex.location}</p>
                </div>
              ))}
            </div>

            <a href="#" className="btn-outline" style={{ color: 'var(--color-white)', borderColor: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', marginTop: '16px' }}>
              View Full List <span>→</span>
            </a>
          </div>
        </FadeInLeft>

        <FadeInRight delay={0.15}>
          <div style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', aspectRatio: '4/3' }}>
            {exhibitionImage ? (
              <LazyImage src={exhibitionImage} alt="Exhibition" style={{ position: 'absolute', inset: 0 }} />
            ) : (
              <div className="placeholder-img" style={{ height: '100%', background: 'linear-gradient(135deg, #2a4a42, #1a3a32)', color: 'rgba(255,255,255,0.3)' }}>
                Exhibition Photo
              </div>
            )}
          </div>
        </FadeInRight>
      </div>
    </section>
  );
}

export default Exhibitions;
