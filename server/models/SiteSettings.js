const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  artistName: { type: String, default: 'Mira Sen' },
  tagline: { type: String, default: 'I paint the spaces between memory and imagination.' },
  aboutText: { type: String, default: '' },
  aboutImage: { type: String, default: '' },
  heroImage: { type: String, default: '' },
  quote: { type: String, default: '' },
  quoteAuthor: { type: String, default: '' },
  quoteImage: { type: String, default: '' },
  contactEmail: { type: String, default: '' },
  contactMessage: { type: String, default: '' },
  footerText: { type: String, default: '' },
  socialLinks: {
    instagram: { type: String, default: '' },
    pinterest: { type: String, default: '' },
    youtube: { type: String, default: '' },
    email: { type: String, default: '' },
  },
  exhibitionHeader: { type: String, default: 'A few places where my work has found a home.' },
  collectionsSubtitle: { type: String, default: 'Different stories, different colours, same curiosity.' },
  studioNotesSubtitle: { type: String, default: 'Thoughts, sketches and moments from my journey.' },
  exhibitionImage: { type: String, default: '' },
  themeColors: {
    primaryBg: { type: String, default: '#f5f0eb' },
    darkBg: { type: String, default: '#1a2e2a' },
    textColor: { type: String, default: '#2c2c2c' },
    textLightColor: { type: String, default: '#6b6b6b' },
    accentColor: { type: String, default: '#2c2c2c' },
    borderColor: { type: String, default: '#e0d8d0' },
    white: { type: String, default: '#ffffff' },
  },
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
