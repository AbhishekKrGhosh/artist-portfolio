const express = require('express');
const router = express.Router();
const { getExhibitions, createExhibition, updateExhibition, deleteExhibition } = require('../controllers/exhibitionController');
const { protect } = require('../middleware/auth');
const { compressImagesInBody } = require('../middleware/compressImages');

router.get('/', getExhibitions);
router.post('/', protect, compressImagesInBody(['image']), createExhibition);
router.put('/:id', protect, compressImagesInBody(['image']), updateExhibition);
router.delete('/:id', protect, deleteExhibition);

module.exports = router;
