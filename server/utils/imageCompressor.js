const sharp = require('sharp');

const MAX_WIDTH = 1600;
const MAX_HEIGHT = 1200;
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 80;
const MAX_BASE64_LENGTH = 2 * 1024 * 1024;

async function compressImage(base64String) {
  if (!base64String || !base64String.startsWith('data:image')) {
    return base64String;
  }

  try {
    const matches = base64String.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) return base64String;

    const format = matches[1].toLowerCase();
    const buffer = Buffer.from(matches[2], 'base64');

    const metadata = await sharp(buffer).metadata();
    let pipeline = sharp(buffer);

    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      pipeline = pipeline.resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    let outputFormat;
    if (format === 'png') {
      outputFormat = 'png';
      pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
    } else if (format === 'webp') {
      outputFormat = 'webp';
      pipeline = pipeline.webp({ quality: WEBP_QUALITY });
    } else {
      outputFormat = 'jpeg';
      pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
    }

    const compressedBuffer = await pipeline.toBuffer();

    if (compressedBuffer.length > MAX_BASE64_LENGTH) {
      const reducedQuality = Math.max(40, JPEG_QUALITY - 20);
      const reducedBuffer = await sharp(buffer)
        .resize(MAX_WIDTH, MAX_HEIGHT, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: reducedQuality })
        .toBuffer();
      const reducedBase64 = reducedBuffer.toString('base64');
      return `data:image/jpeg;base64,${reducedBase64}`;
    }

    const compressedBase64 = compressedBuffer.toString('base64');
    return `data:image/${outputFormat};base64,${compressedBase64}`;
  } catch (err) {
    console.error('Image compression error:', err.message);
    return base64String;
  }
}

module.exports = { compressImage };
