const AWS = require('aws-sdk');

const handleAWSTextToSpeech = ({ awsKey, awsSecret, awsRegion, req, res }) => {
  AWS.config.update({
    accessKeyId: awsKey,
    secretAccessKey: awsSecret,
    region: awsRegion,
  });
  console.log(req);
  const {
    Text,
    VoiceId,
    SampleRate,
    LanguageCode,
    TextType,
    OutputFormat,
    Engine,
  } = req.body;
  const params = {
    OutputFormat,
    Text,
    VoiceId,
    SampleRate,
    LanguageCode,
    TextType,
    Engine,
  };
  const polly = new AWS.Polly({ apiVersion: '2016-06-10' });
  polly.synthesizeSpeech(params, (err, result) => {
    if (err) {
      res.status(500).json({
        message: 'Error converting text to speech',
        error: err.message,
      });
    } else {
      res
        .status(200)
        .json({
          message: 'text converted to speech successfully',
          data: result,
        });
    }
  });
};

module.exports = { handleAWSTextToSpeech };
