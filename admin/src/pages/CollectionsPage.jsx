import { useEffect, useState } from 'react';
import { getCollections, createCollection, updateCollection, deleteCollection } from '../api';

function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', image: '', artworkCount: 0, order: 0 });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = () => getCollections().then((res) => setCollections(res.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', description: '', image: '', artworkCount: 0, order: 0 });
    setShowModal(true);
  };

  const openEdit = (col) => {
    setEditing(col);
    setForm({ name: col.name, description: col.description, image: col.image, artworkCount: col.artworkCount, order: col.order });
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
        await updateCollection(editing._id, form);
        showToast('Collection updated');
      } else {
        await createCollection(form);
        showToast('Collection created');
      }
      setShowModal(false);
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this collection?')) return;
    try {
      await deleteCollection(id);
      showToast('Collection deleted');
      load();
    } catch { showToast('Error', 'error'); }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Collections</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Add Collection</button>
      </div>

      <div className="card" style={{ overflow: 'auto' }}>
        <table className="table">
          <thead>
            <tr><th>Image</th><th>Name</th><th>Artworks</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {collections.map((c) => (
              <tr key={c._id}>
                <td>
                  {c.image ? <img src={c.image} alt={c.name} className="image-preview" /> : <div style={{ width: 80, height: 80, background: '#e5e7eb', borderRadius: 8 }} />}
                </td>
                <td>{c.name}</td>
                <td>{c.artworkCount}</td>
                <td>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }} onClick={() => openEdit(c)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? 'Edit Collection' : 'Add Collection'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Artwork Count</label>
                <input type="number" value={form.artworkCount} onChange={(e) => setForm({ ...form, artworkCount: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="form-group">
                <label>Image</label>
                <div className="image-upload">
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="col-image" />
                  <label htmlFor="col-image" style={{ cursor: 'pointer' }}>
                    {form.image ? <img src={form.image} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }} /> : <p>Click to upload image</p>}
                  </label>
                </div>
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

export default CollectionsPage;
