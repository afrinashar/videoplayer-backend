const express = require('express');
const { getAllVideos, uploadVideo } = require('../controllers/videoController');
const { authenticate } = require('../config/passport');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/', getAllVideos);

router.post('/upload', authenticate, upload.single('video'), uploadVideo);

module.exports = router;
