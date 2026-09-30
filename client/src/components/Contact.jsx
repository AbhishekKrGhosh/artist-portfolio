import { useState } from 'react';
import api from '../api';
import { FadeInLeft, FadeInRight } from './Animations';

function Contact({ settings }) {
  const message = settings?.contactMessage || "Interested in a commission, collaboration, or just want to say hello? I'd love to hear from you.";
  const social = settings?.socialLinks || {};
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.post('/contact', form);
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus(''), 4000);
  };

  return (
    <section id="contact" style={{
      padding: '100px 0 80px',
      background: 'var(--color-bg)',
    }}>
      <div className="container contact-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'start',
      }}>
        <FadeInLeft>
          <div>
            <h2 className="section-label" style={{ marginBottom: '16px' }}>Let's Connect</h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-light)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '400px' }}>
              {message}
            </p>

            <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
              {social.instagram && (
                <a href={social.instagram} style={{
                  width: 44, height: 44, borderRadius: '50%',
                  border: '1.5px solid var(--color-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text)',
                  transition: 'all 0.2s',
                }}>IG</a>
              )}
              {social.pinterest && (
                <a href={social.pinterest} style={{
                  width: 44, height: 44, borderRadius: '50%',
                  border: '1.5px solid var(--color-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text)',
                  transition: 'all 0.2s',
                }}>PI</a>
              )}
              {social.youtube && (
                <a href={social.youtube} style={{
                  width: 44, height: 44, borderRadius: '50%',
                  border: '1.5px solid var(--color-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text)',
                  transition: 'all 0.2s',
                }}>YT</a>
              )}
              {social.email && (
                <a href={`mailto:${social.email}`} style={{
                  width: 44, height: 44, borderRadius: '50%',
                  border: '1.5px solid var(--color-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text)',
                  transition: 'all 0.2s',
                }}>✉</a>
              )}
            </div>
          </div>
        </FadeInLeft>

        <FadeInRight delay={0.15}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: 6 }}>Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="form-input"
                  style={{
                    width: '100%', padding: '14px 16px',
                    border: '1.5px solid var(--color-border)',
                    borderRadius: 10, fontSize: '0.95rem',
                    background: 'var(--color-white)',
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: 6 }}>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="form-input"
                  style={{
                    width: '100%', padding: '14px 16px',
                    border: '1.5px solid var(--color-border)',
                    borderRadius: 10, fontSize: '0.95rem',
                    background: 'var(--color-white)',
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: 6 }}>Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
                className="form-input"
                style={{
                  width: '100%', padding: '14px 16px',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: 10, fontSize: '0.95rem',
                  background: 'var(--color-white)',
                  outline: 'none', transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: 6 }}>Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                className="form-input"
                style={{
                  width: '100%', padding: '14px 16px',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: 10, fontSize: '0.95rem',
                  background: 'var(--color-white)',
                  outline: 'none', resize: 'vertical',
                  fontFamily: 'var(--font-body)',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              disabled={status === 'sending'}
              style={{ alignSelf: 'flex-start', padding: '14px 32px', fontSize: '0.9rem' }}
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent ✓' : 'Send Message →'}
            </button>
            {status === 'error' && (
              <p style={{ color: '#dc2626', fontSize: '0.85rem' }}>Something went wrong. Please try again.</p>
            )}
          </form>
        </FadeInRight>
      </div>
    </section>
  );
}

export default Contact;
