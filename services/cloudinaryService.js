const cloudinary = require('cloudinary').v2;
const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } = require('../config/constants');

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadFile = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, { resource_type: 'auto' });
    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error('Error uploading file to Cloudinary');
  }
};

module.exports = { uploadFile };
