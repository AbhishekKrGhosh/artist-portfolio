const express = require('express');
const router = express.Router();
const { getArtworks, getArtworkById, createArtwork, updateArtwork, deleteArtwork } = require('../controllers/artworkController');
const { protect } = require('../middleware/auth');
const { compressImagesInBody } = require('../middleware/compressImages');

router.get('/', getArtworks);
router.get('/:id', getArtworkById);
router.post('/', protect, compressImagesInBody(['image', 'thumbnails']), createArtwork);
router.put('/:id', protect, compressImagesInBody(['image', 'thumbnails']), updateArtwork);
router.delete('/:id', protect, deleteArtwork);

module.exports = router;
