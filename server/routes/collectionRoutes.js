const express = require('express');
const router = express.Router();
const { getCollections, createCollection, updateCollection, deleteCollection } = require('../controllers/collectionController');
const { protect } = require('../middleware/auth');
const { compressImagesInBody } = require('../middleware/compressImages');

router.get('/', getCollections);
router.post('/', protect, compressImagesInBody(['image']), createCollection);
router.put('/:id', protect, compressImagesInBody(['image']), updateCollection);
router.delete('/:id', protect, deleteCollection);

module.exports = router;
