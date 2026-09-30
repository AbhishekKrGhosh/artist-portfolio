import { useEffect, useState } from 'react';
import { getBlogPosts } from '../api';
import { FadeIn, StaggerContainer, StaggerItem } from './Animations';
import LazyImage from './LazyImage';

function StudioNotes({ settings }) {
  const [posts, setPosts] = useState([]);
  const subtitle = settings?.studioNotesSubtitle || 'Thoughts, sketches and moments from my journey.';

  useEffect(() => {
    getBlogPosts()
      .then((res) => setPosts(res.data))
      .catch(() => setPosts([]));
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <section id="journal" className="container" style={{ padding: '80px 24px' }}>
      <FadeIn>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 className="section-label">Studio Notes</h2>
          <a href="#" className="view-all">View All →</a>
        </div>
        <p className="section-subtitle">{subtitle}</p>
      </FadeIn>

      <StaggerContainer delay={0.2}>
        <div className="studio-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {posts.map((post) => (
            <StaggerItem key={post._id}>
              <div style={{ cursor: 'pointer' }}>
                <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
                  <LazyImage src={post.image} alt={post.title} style={{ position: 'absolute', inset: 0 }} />
                  {!post.image && <div className="placeholder-img">{post.title}</div>}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '6px' }}>{post.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>{formatDate(post.date)}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </section>
  );
}

export default StudioNotes;
