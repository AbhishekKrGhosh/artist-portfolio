import { NavLink, useNavigate } from 'react-router-dom';

function AdminLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/artworks', label: 'Artworks' },
    { path: '/collections', label: 'Collections' },
    { path: '/exhibitions', label: 'Exhibitions' },
    { path: '/blog', label: 'Studio Notes' },
    { path: '/messages', label: 'Messages' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>🎨 Portfolio Admin</h2>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.label}
            </NavLink>
          ))}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                padding: '12px 20px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              Logout
            </button>
          </div>
        </nav>
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
