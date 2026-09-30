import { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '../api';

function SettingsPage() {
  const [settings, setSettings] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    getSettings().then((res) => setSettings(res.data)).catch(() => {});
  }, []);

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSocialChange = (key, value) => {
    setSettings({ ...settings, socialLinks: { ...settings.socialLinks, [key]: value } });
  };

  const handleColorChange = (key, value) => {
    setSettings({ ...settings, themeColors: { ...(settings.themeColors || {}), [key]: value } });
  };

  const handleImageUpload = (key) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => handleChange(key, reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSettings(settings);
      showToast('Settings saved');
    } catch {
      showToast('Error saving settings', 'error');
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Site Settings</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <h3>General</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Artist Name</label>
              <input value={settings.artistName || ''} onChange={(e) => handleChange('artistName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Contact Email</label>
              <input value={settings.contactEmail || ''} onChange={(e) => handleChange('contactEmail', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Tagline</label>
            <input value={settings.tagline || ''} onChange={(e) => handleChange('tagline', e.target.value)} />
          </div>
          <div className="form-group">
            <label>About Text</label>
            <textarea value={settings.aboutText || ''} onChange={(e) => handleChange('aboutText', e.target.value)} style={{ minHeight: 120 }} />
          </div>
        </div>

        <div className="card">
          <h3>Hero Image</h3>
          <div className="image-upload">
            <input type="file" accept="image/*" onChange={handleImageUpload('heroImage')} style={{ display: 'none' }} id="hero-image" />
            <label htmlFor="hero-image" style={{ cursor: 'pointer' }}>
              {settings.heroImage ? <img src={settings.heroImage} alt="Hero" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8 }} /> : <p>Click to upload hero image</p>}
            </label>
          </div>
        </div>

        <div className="card">
          <h3>Quote Section</h3>
          <div className="form-group">
            <label>Quote</label>
            <textarea value={settings.quote || ''} onChange={(e) => handleChange('quote', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Quote Author</label>
            <input value={settings.quoteAuthor || ''} onChange={(e) => handleChange('quoteAuthor', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Quote Image</label>
            <div className="image-upload">
              <input type="file" accept="image/*" onChange={handleImageUpload('quoteImage')} style={{ display: 'none' }} id="quote-image" />
              <label htmlFor="quote-image" style={{ cursor: 'pointer' }}>
                {settings.quoteImage ? <img src={settings.quoteImage} alt="Quote" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }} /> : <p>Click to upload quote section image</p>}
              </label>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>About the Artist</h3>
          <div className="form-group">
            <label>Artist Photo</label>
            <div className="image-upload">
              <input type="file" accept="image/*" onChange={handleImageUpload('aboutImage')} style={{ display: 'none' }} id="about-image" />
              <label htmlFor="about-image" style={{ cursor: 'pointer' }}>
                {settings.aboutImage ? <img src={settings.aboutImage} alt="About" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8 }} /> : <p>Click to upload artist photo</p>}
              </label>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Exhibitions</h3>
          <div className="form-group">
            <label>Exhibition Photo</label>
            <div className="image-upload">
              <input type="file" accept="image/*" onChange={handleImageUpload('exhibitionImage')} style={{ display: 'none' }} id="exhibition-image" />
              <label htmlFor="exhibition-image" style={{ cursor: 'pointer' }}>
                {settings.exhibitionImage ? <img src={settings.exhibitionImage} alt="Exhibition" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }} /> : <p>Click to upload exhibition photo</p>}
              </label>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Social Links</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Instagram</label>
              <input value={settings.socialLinks?.instagram || ''} onChange={(e) => handleSocialChange('instagram', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Pinterest</label>
              <input value={settings.socialLinks?.pinterest || ''} onChange={(e) => handleSocialChange('pinterest', e.target.value)} />
            </div>
            <div className="form-group">
              <label>YouTube</label>
              <input value={settings.socialLinks?.youtube || ''} onChange={(e) => handleSocialChange('youtube', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input value={settings.socialLinks?.email || ''} onChange={(e) => handleSocialChange('email', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Section Subtitles</h3>
          <div className="form-group">
            <label>Exhibitions Header</label>
            <input value={settings.exhibitionHeader || ''} onChange={(e) => handleChange('exhibitionHeader', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Collections Subtitle</label>
            <input value={settings.collectionsSubtitle || ''} onChange={(e) => handleChange('collectionsSubtitle', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Studio Notes Subtitle</label>
            <input value={settings.studioNotesSubtitle || ''} onChange={(e) => handleChange('studioNotesSubtitle', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Contact Message</label>
            <textarea value={settings.contactMessage || ''} onChange={(e) => handleChange('contactMessage', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Footer Text</label>
            <input value={settings.footerText || ''} onChange={(e) => handleChange('footerText', e.target.value)} />
          </div>
        </div>

        <div className="card">
          <h3>Theme Colors</h3>
          <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: 16 }}>Customize the color palette for the entire website.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
            {[
              { key: 'primaryBg', label: 'Background' },
              { key: 'darkBg', label: 'Dark Background (Footer)' },
              { key: 'textColor', label: 'Text Color' },
              { key: 'textLightColor', label: 'Light Text' },
              { key: 'accentColor', label: 'Accent Color' },
              { key: 'borderColor', label: 'Borders' },
              { key: 'white', label: 'White / Cards' },
            ].map(({ key, label }) => (
              <div className="form-group" key={key}>
                <label>{label}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input
                    type="color"
                    value={(settings.themeColors?.[key]) || (settings.themeColors?.[key] === '' ? '#000000' : '')}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    style={{ width: 44, height: 36, border: '1.5px solid #e0d8d0', borderRadius: 6, padding: 2, cursor: 'pointer', background: '#fff' }}
                  />
                  <input
                    type="text"
                    value={settings.themeColors?.[key] || ''}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    placeholder="#000000"
                    style={{ flex: 1, padding: '8px 10px', fontSize: '0.85rem', fontFamily: 'monospace' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: 16 }}>Save Settings</button>
      </form>

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}

export default SettingsPage;
