const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  artworkCount: { type: Number, default: 0 },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Collection', collectionSchema);
