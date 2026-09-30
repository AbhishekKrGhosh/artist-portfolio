import { useEffect, useState } from 'react';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../api';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', image: '', date: '', order: 0 });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = () => getBlogPosts().then((res) => setPosts(res.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', excerpt: '', content: '', image: '', date: new Date().toISOString().split('T')[0], order: 0 });
    setShowModal(true);
  };

  const openEdit = (post) => {
    setEditing(post);
    setForm({
      title: post.title, excerpt: post.excerpt, content: post.content,
      image: post.image, date: post.date ? post.date.split('T')[0] : '', order: post.order,
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
        await updateBlogPost(editing._id, form);
        showToast('Post updated');
      } else {
        await createBlogPost(form);
        showToast('Post created');
      }
      setShowModal(false);
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await deleteBlogPost(id);
      showToast('Post deleted');
      load();
    } catch { showToast('Error', 'error'); }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Studio Notes</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Add Post</button>
      </div>

      <div className="card" style={{ overflow: 'auto' }}>
        <table className="table">
          <thead>
            <tr><th>Image</th><th>Title</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p._id}>
                <td>
                  {p.image ? <img src={p.image} alt={p.title} className="image-preview" /> : <div style={{ width: 80, height: 80, background: '#e5e7eb', borderRadius: 8 }} />}
                </td>
                <td>{p.title}</td>
                <td>{p.date ? new Date(p.date).toLocaleDateString() : ''}</td>
                <td>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }} onClick={() => openEdit(p)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? 'Edit Post' : 'Add Post'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Excerpt</label>
                <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} style={{ minHeight: 150 }} />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Image</label>
                <div className="image-upload">
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="blog-image" />
                  <label htmlFor="blog-image" style={{ cursor: 'pointer' }}>
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

export default BlogPage;
