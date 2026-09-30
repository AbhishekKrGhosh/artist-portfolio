const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  medium: { type: String, required: true },
  dimensions: { type: String, required: true },
  year: { type: String, required: true },
  category: {
    type: String,
    enum: ['Landscapes', 'People', 'Everyday Life', 'Still Life', 'Abstract'],
    required: true,
  },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  thumbnails: [{ type: String }],
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Artwork', artworkSchema);
