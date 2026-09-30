const Artwork = require('../models/Artwork');

const getArtworks = async (req, res) => {
  const { category, featured } = req.query;
  const filter = {};
  if (category && category !== 'All') filter.category = category;
  if (featured !== undefined) filter.featured = featured === 'true';

  const artworks = await Artwork.find(filter).sort({ order: 1, createdAt: -1 });
  res.json(artworks);
};

const getArtworkById = async (req, res) => {
  const artwork = await Artwork.findById(req.params.id);
  if (artwork) {
    res.json(artwork);
  } else {
    res.status(404).json({ message: 'Artwork not found' });
  }
};

const createArtwork = async (req, res) => {
  const { title, medium, dimensions, year, category, description, image, thumbnails, featured, order } = req.body;
  const artwork = new Artwork({ title, medium, dimensions, year, category, description, image, thumbnails, featured, order });
  const created = await artwork.save();
  res.status(201).json(created);
};

const updateArtwork = async (req, res) => {
  const { title, medium, dimensions, year, category, description, image, thumbnails, featured, order } = req.body;
  const artwork = await Artwork.findById(req.params.id);
  if (artwork) {
    artwork.title = title || artwork.title;
    artwork.medium = medium || artwork.medium;
    artwork.dimensions = dimensions || artwork.dimensions;
    artwork.year = year || artwork.year;
    artwork.category = category || artwork.category;
    artwork.description = description || artwork.description;
    artwork.image = image || artwork.image;
    artwork.thumbnails = thumbnails || artwork.thumbnails;
    artwork.featured = featured !== undefined ? featured : artwork.featured;
    artwork.order = order !== undefined ? order : artwork.order;
    const updated = await artwork.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Artwork not found' });
  }
};

const deleteArtwork = async (req, res) => {
  const artwork = await Artwork.findById(req.params.id);
  if (artwork) {
    await artwork.deleteOne();
    res.json({ message: 'Artwork removed' });
  } else {
    res.status(404).json({ message: 'Artwork not found' });
  }
};

module.exports = { getArtworks, getArtworkById, createArtwork, updateArtwork, deleteArtwork };
