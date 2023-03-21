const { handleAWSTextToSpeech } = require('../utils/aws/handleAWSTextToSpeech');
require('dotenv').config();

const {
  AWS_ACCESS_KEY,
  AWS_ACCESS_SECRET_KEY,
  AWS_REGION,
  AWS_S3_BUCKET,
  API_KEY,
} = process.env;

function convertTextToSpeech(req, res) {
  const apiKey = req.get('X-API-KEY');
  const awsKey = req.get('AWS_ACCESS_KEY_ID');
  const awsSecret = req.get('AWS_ACCESS_SECRET_KEY');
  const awsRegion = req.get('AWS_REGION');
  const awsBucket = req.get('AWS_S3_BUCKET');

  if (apiKey && apiKey === API_KEY) {
    handleAWSTextToSpeech({
      awsKey: AWS_ACCESS_KEY,
      awsSecret: AWS_ACCESS_SECRET_KEY,
      awsRegion: AWS_REGION,
      awsBucket: AWS_S3_BUCKET,
      req,
      res,
    });
  } else {
    handleAWSTextToSpeech({
      awsKey,
      awsSecret,
      awsRegion,
      awsBucket,
      req,
      res,
    });
  }
}

module.exports = { convertTextToSpeech };