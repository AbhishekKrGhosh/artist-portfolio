import { useEffect, useState } from 'react';
import { getArtworks, getCollections, getExhibitions, getBlogPosts } from '../api';

function Dashboard() {
  const [stats, setStats] = useState({ artworks: 0, collections: 0, exhibitions: 0, posts: 0 });

  useEffect(() => {
    Promise.all([getArtworks(), getCollections(), getExhibitions(), getBlogPosts()])
      .then(([artworks, collections, exhibitions, posts]) => {
        setStats({
          artworks: artworks.data.length,
          collections: collections.data.length,
          exhibitions: exhibitions.data.length,
          posts: posts.data.length,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.artworks}</h3>
          <p>Artworks</p>
        </div>
        <div className="stat-card">
          <h3>{stats.collections}</h3>
          <p>Collections</p>
        </div>
        <div className="stat-card">
          <h3>{stats.exhibitions}</h3>
          <p>Exhibitions</p>
        </div>
        <div className="stat-card">
          <h3>{stats.posts}</h3>
          <p>Studio Notes</p>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '16px' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="/artworks" className="btn btn-primary">Manage Artworks</a>
          <a href="/collections" className="btn btn-secondary">Manage Collections</a>
          <a href="/settings" className="btn btn-secondary">Site Settings</a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
