const Collection = require('../models/Collection');

const getCollections = async (req, res) => {
  const collections = await Collection.find().sort({ order: 1, createdAt: -1 });
  res.json(collections);
};

const createCollection = async (req, res) => {
  const { name, description, image, artworkCount, order } = req.body;
  const collection = new Collection({ name, description, image, artworkCount, order });
  const created = await collection.save();
  res.status(201).json(created);
};

const updateCollection = async (req, res) => {
  const { name, description, image, artworkCount, order } = req.body;
  const collection = await Collection.findById(req.params.id);
  if (collection) {
    collection.name = name || collection.name;
    collection.description = description || collection.description;
    collection.image = image || collection.image;
    collection.artworkCount = artworkCount !== undefined ? artworkCount : collection.artworkCount;
    collection.order = order !== undefined ? order : collection.order;
    const updated = await collection.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Collection not found' });
  }
};

const deleteCollection = async (req, res) => {
  const collection = await Collection.findById(req.params.id);
  if (collection) {
    await collection.deleteOne();
    res.json({ message: 'Collection removed' });
  } else {
    res.status(404).json({ message: 'Collection not found' });
  }
};

module.exports = { getCollections, createCollection, updateCollection, deleteCollection };
