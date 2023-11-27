const Video = require('../models/Video');
const { uploadFile } = require('../services/cloudinaryService');

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const uploadVideo = async (req, res) => {
  try {
    const { title } = req.body;
    const fileUrl = await uploadFile(req.file);

    const video = new Video({ title, url: fileUrl });
    await video.save();

    res.status(201).json({ message: 'Video uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAllVideos, uploadVideo };
