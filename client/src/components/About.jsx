import { FadeInLeft, FadeInRight } from './Animations';
import LazyImage from './LazyImage';

function About({ settings }) {
  const aboutText = settings?.aboutText || "I'm Mira, a visual artist based in India, working primarily with acrylics and gouache. My work is inspired by travel, everyday moments, and the people around me. I try to capture the feeling of a place — not just how it looks, but how it feels.";
  const aboutImage = settings?.aboutImage;

  return (
    <section id="about" className="container" style={{ padding: '40px 24px 80px' }}>
      <div className="about-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center',
      }}>
        <FadeInLeft>
          <div style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', aspectRatio: '3/4' }}>
            <LazyImage src={aboutImage} alt="Artist" style={{ position: 'absolute', inset: 0 }} />
            {!aboutImage && <div className="placeholder-img" style={{ height: '100%' }}>Artist Photo</div>}
          </div>
        </FadeInLeft>

        <FadeInRight delay={0.15}>
          <div>
            <h2 className="section-label" style={{ marginBottom: '24px' }}>About the Artist</h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--color-text-light)', marginBottom: '32px' }}>
              {aboutText}
            </p>
            <a href="#" className="btn-primary" style={{ fontSize: '0.85rem' }}>
              Read My Story <span>→</span>
            </a>
          </div>
        </FadeInRight>
      </div>
    </section>
  );
}

export default About;
