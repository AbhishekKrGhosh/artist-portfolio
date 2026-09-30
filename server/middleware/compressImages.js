const { compressImage } = require('../utils/imageCompressor');

const compressImagesInBody = (fields = ['image']) => {
  return async (req, res, next) => {
    try {
      for (const field of fields) {
        if (req.body[field] && typeof req.body[field] === 'string' && req.body[field].startsWith('data:image')) {
          req.body[field] = await compressImage(req.body[field]);
        }
      }
      if (req.body.socialLinks) {
        // socialLinks doesn't contain images, skip
      }
      next();
    } catch (err) {
      console.error('Image compression middleware error:', err.message);
      next();
    }
  };
};

module.exports = { compressImagesInBody };
