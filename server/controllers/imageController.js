const { compressImage } = require('../utils/imageCompressor');

const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ message: 'No image data provided' });
    }
    const compressed = await compressImage(image);
    res.json({ image: compressed });
  } catch (error) {
    res.status(500).json({ message: 'Image upload failed' });
  }
};

module.exports = { uploadImage };
