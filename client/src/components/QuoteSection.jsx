import { FadeInLeft, FadeInRight } from './Animations';
import LazyImage from './LazyImage';

function QuoteSection({ settings }) {
  const quote = settings?.quote || 'Art, for me, is a way to hold on to moments before they fade.';
  const author = settings?.quoteAuthor || 'Mira Sen';
  const quoteImage = settings?.quoteImage;

  return (
    <section className="container" style={{ padding: '40px 24px 80px' }}>
      <div style={{
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '350px',
        background: '#e8e0d8',
      }} className="quote-grid">
        <FadeInLeft>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 40px',
          }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                fontStyle: 'italic',
                lineHeight: 1.5,
                marginBottom: '20px',
              }}>
                "{quote}"
              </p>
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                color: 'var(--color-text-light)',
                fontSize: '1rem',
              }}>
                {author}
              </p>
            </div>
          </div>
        </FadeInLeft>

        <FadeInRight delay={0.15}>
          <div className="quote-image-side" style={{ position: 'relative', minHeight: '350px' }}>
            {quoteImage ? (
              <LazyImage src={quoteImage} alt="Quote" style={{ position: 'absolute', inset: 0 }} />
            ) : (
              <div className="placeholder-img" style={{ height: '100%' }}>Quote Image</div>
            )}
          </div>
        </FadeInRight>
      </div>
    </section>
  );
}

export default QuoteSection;
