const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getSubmissions, createSubmission, markAsRead, deleteSubmission } = require('../controllers/contactController');

router.post('/', createSubmission);
router.get('/', protect, getSubmissions);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteSubmission);

module.exports = router;
