const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, default: '' },
  content: { type: String, default: '' },
  image: { type: String, default: '' },
  date: { type: Date, default: Date.now },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);
