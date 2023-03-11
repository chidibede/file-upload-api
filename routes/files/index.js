const express = require('express');
const multer = require('multer')
const { fileUploadController } = require('../../controllers/fileUploadController');

const router = express.Router();
const upload = multer() 

router.post('/api/files/upload', upload.single('file'), fileUploadController);

module.exports = router;
