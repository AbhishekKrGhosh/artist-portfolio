import { useEffect, useState } from 'react';
import { getExhibitions, createExhibition, updateExhibition, deleteExhibition } from '../api';

function ExhibitionsPage() {
  const [exhibitions, setExhibitions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ year: '', title: '', venue: '', location: '', image: '', order: 0 });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = () => getExhibitions().then((res) => setExhibitions(res.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ year: '', title: '', venue: '', location: '', image: '', order: 0 });
    setShowModal(true);
  };

  const openEdit = (ex) => {
    setEditing(ex);
    setForm({ year: ex.year, title: ex.title, venue: ex.venue, location: ex.location, image: ex.image, order: ex.order });
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
        await updateExhibition(editing._id, form);
        showToast('Exhibition updated');
      } else {
        await createExhibition(form);
        showToast('Exhibition created');
      }
      setShowModal(false);
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this exhibition?')) return;
    try {
      await deleteExhibition(id);
      showToast('Exhibition deleted');
      load();
    } catch { showToast('Error', 'error'); }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Exhibitions</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Add Exhibition</button>
      </div>

      <div className="card" style={{ overflow: 'auto' }}>
        <table className="table">
          <thead>
            <tr><th>Year</th><th>Title</th><th>Venue</th><th>Location</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {exhibitions.map((ex) => (
              <tr key={ex._id}>
                <td>{ex.year}</td>
                <td>{ex.title}</td>
                <td>{ex.venue}</td>
                <td>{ex.location}</td>
                <td>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }} onClick={() => openEdit(ex)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(ex._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? 'Edit Exhibition' : 'Add Exhibition'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Year</label>
                  <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Venue</label>
                  <input value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label>Image (optional)</label>
                <div className="image-upload">
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="ex-image" />
                  <label htmlFor="ex-image" style={{ cursor: 'pointer' }}>
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

export default ExhibitionsPage;
