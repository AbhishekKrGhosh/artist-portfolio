const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect } = require('../middleware/auth');
const { compressImagesInBody } = require('../middleware/compressImages');

router.get('/', getSettings);
router.put('/', protect, compressImagesInBody(['heroImage', 'aboutImage', 'quoteImage', 'exhibitionImage']), updateSettings);

module.exports = router;
