const Exhibition = require('../models/Exhibition');

const getExhibitions = async (req, res) => {
  const exhibitions = await Exhibition.find().sort({ year: -1, order: 1 });
  res.json(exhibitions);
};

const createExhibition = async (req, res) => {
  const { year, title, venue, location, image, order } = req.body;
  const exhibition = new Exhibition({ year, title, venue, location, image, order });
  const created = await exhibition.save();
  res.status(201).json(created);
};

const updateExhibition = async (req, res) => {
  const { year, title, venue, location, image, order } = req.body;
  const exhibition = await Exhibition.findById(req.params.id);
  if (exhibition) {
    exhibition.year = year || exhibition.year;
    exhibition.title = title || exhibition.title;
    exhibition.venue = venue || exhibition.venue;
    exhibition.location = location || exhibition.location;
    exhibition.image = image || exhibition.image;
    exhibition.order = order !== undefined ? order : exhibition.order;
    const updated = await exhibition.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Exhibition not found' });
  }
};

const deleteExhibition = async (req, res) => {
  const exhibition = await Exhibition.findById(req.params.id);
  if (exhibition) {
    await exhibition.deleteOne();
    res.json({ message: 'Exhibition removed' });
  } else {
    res.status(404).json({ message: 'Exhibition not found' });
  }
};

module.exports = { getExhibitions, createExhibition, updateExhibition, deleteExhibition };
