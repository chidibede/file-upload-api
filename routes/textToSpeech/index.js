const express = require('express');
const { convertTextToSpeech } = require('../../controllers/textToSpeech');

const router = express.Router();

router.post('/api/speech', convertTextToSpeech);

module.exports = router;
