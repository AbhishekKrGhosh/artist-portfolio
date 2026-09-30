const SiteSettings = require('../models/SiteSettings');

const getSettings = async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  res.json(settings);
};

const updateSettings = async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create(req.body);
  } else {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'object' && req.body[key] !== null) {
        settings[key] = { ...settings[key], ...req.body[key] };
      } else {
        settings[key] = req.body[key];
      }
    });
    await settings.save();
  }
  res.json(settings);
};

module.exports = { getSettings, updateSettings };
