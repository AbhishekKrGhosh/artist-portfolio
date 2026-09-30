import { useEffect, useState } from 'react';
import api from '../api';

function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get('/contact').then((res) => setSubmissions(res.data)).catch(() => {});
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await api.put(`/contact/${id}/read`);
      setSubmissions(submissions.map((s) => s._id === id ? { ...s, read: true } : s));
      if (selected?._id === id) setSelected({ ...selected, read: true });
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this submission?')) return;
    try {
      await api.delete(`/contact/${id}`);
      setSubmissions(submissions.filter((s) => s._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch {}
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const unreadCount = submissions.filter((s) => !s.read).length;

  return (
    <div>
      <div className="admin-header">
        <h1>Messages {unreadCount > 0 && <span style={{ fontSize: '0.9rem', color: 'var(--color-accent)', fontWeight: 500 }}>({unreadCount} unread)</span>}</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '24px' }}>
        <div className="card" style={{ padding: 0 }}>
          {submissions.length === 0 ? (
            <p style={{ padding: '40px', textAlign: 'center', color: 'rgba(0,0,0,0.4)' }}>No messages yet.</p>
          ) : (
            <div>
              {submissions.map((sub) => (
                <div
                  key={sub._id}
                  onClick={() => {
                    setSelected(sub);
                    if (!sub.read) handleMarkRead(sub._id);
                  }}
                  style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    background: selected?._id === sub._id ? 'rgba(0,0,0,0.03)' : 'transparent',
                    borderLeft: sub.read ? 'none' : '3px solid var(--color-accent)',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: sub.read ? 400 : 600, fontSize: '0.95rem' }}>{sub.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(0,0,0,0.4)' }}>{formatDate(sub.createdAt)}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '2px' }}>{sub.subject}</p>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.35)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {sub.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {selected && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>{selected.subject}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>From: {selected.name} ({selected.email})</p>
                <p style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.35)', marginTop: '4px' }}>{formatDate(selected.createdAt)}</p>
              </div>
              <button
                onClick={() => handleDelete(selected._id)}
                style={{
                  background: 'none', border: '1px solid #dc2626', color: '#dc2626',
                  padding: '6px 12px', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-text)', whiteSpace: 'pre-wrap' }}>
              {selected.message}
            </p>
            <a
              href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
              className="btn btn-primary"
              style={{ marginTop: '20px', display: 'inline-block', textDecoration: 'none' }}
            >
              Reply via Email
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubmissionsPage;
