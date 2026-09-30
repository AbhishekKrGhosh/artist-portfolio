const mongoose = require('mongoose');

const exhibitionSchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  venue: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Exhibition', exhibitionSchema);
