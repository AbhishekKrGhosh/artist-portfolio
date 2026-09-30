import { useEffect, useState } from 'react';
import { getArtworks, createArtwork, updateArtwork, deleteArtwork } from '../api';

const categories = ['Landscapes', 'People', 'Everyday Life', 'Still Life', 'Abstract'];

function ArtworksPage() {
  const [artworks, setArtworks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    title: '', medium: '', dimensions: '', year: '', category: 'Landscapes',
    description: '', image: '', featured: false, order: 0,
  });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadArtworks = () => {
    getArtworks().then((res) => setArtworks(res.data)).catch(() => {});
  };

  useEffect(() => { loadArtworks(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', medium: '', dimensions: '', year: '', category: 'Landscapes', description: '', image: '', featured: false, order: 0 });
    setShowModal(true);
  };

  const openEdit = (artwork) => {
    setEditing(artwork);
    setForm({
      title: artwork.title, medium: artwork.medium, dimensions: artwork.dimensions,
      year: artwork.year, category: artwork.category, description: artwork.description,
      image: artwork.image, featured: artwork.featured, order: artwork.order,
    });
    setShowModal(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateArtwork(editing._id, form);
        showToast('Artwork updated');
      } else {
        await createArtwork(form);
        showToast('Artwork created');
      }
      setShowModal(false);
      loadArtworks();
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this artwork?')) return;
    try {
      await deleteArtwork(id);
      showToast('Artwork deleted');
      loadArtworks();
    } catch (err) {
      showToast('Error deleting', 'error');
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Artworks</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Add Artwork</button>
      </div>

      <div className="card" style={{ overflow: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Medium</th>
              <th>Year</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((a) => (
              <tr key={a._id}>
                <td>
                  {a.image ? (
                    <img src={a.image} alt={a.title} className="image-preview" />
                  ) : (
                    <div style={{ width: 80, height: 80, background: '#e5e7eb', borderRadius: 8 }} />
                  )}
                </td>
                <td>{a.title}</td>
                <td>{a.category}</td>
                <td>{a.medium}</td>
                <td>{a.year}</td>
                <td>{a.featured ? 'Yes' : 'No'}</td>
                <td>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }} onClick={() => openEdit(a)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(a._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? 'Edit Artwork' : 'Add Artwork'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Medium</label>
                  <input value={form.medium} onChange={(e) => setForm({ ...form, medium: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Dimensions</label>
                  <input value={form.dimensions} onChange={(e) => setForm({ ...form, dimensions: e.target.value })} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Year</label>
                  <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Image</label>
                <div className="image-upload">
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="artwork-image" />
                  <label htmlFor="artwork-image" style={{ cursor: 'pointer' }}>
                    {form.image ? (
                      <img src={form.image} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }} />
                    ) : (
                      <p>Click to upload image (stored as base64)</p>
                    )}
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    style={{ marginRight: 8 }}
                  />
                  Featured artwork
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}

export default ArtworksPage;
