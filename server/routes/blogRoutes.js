const express = require('express');
const router = express.Router();
const { getBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost } = require('../controllers/blogController');
const { protect } = require('../middleware/auth');
const { compressImagesInBody } = require('../middleware/compressImages');

router.get('/', getBlogPosts);
router.get('/:id', getBlogPostById);
router.post('/', protect, compressImagesInBody(['image']), createBlogPost);
router.put('/:id', protect, compressImagesInBody(['image']), updateBlogPost);
router.delete('/:id', protect, deleteBlogPost);

module.exports = router;
