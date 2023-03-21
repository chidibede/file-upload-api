require('dotenv').config();
const express = require('express');
const cors = require('cors');
const uploadRouter = require('./routes/files');
const usersRouter = require('./routes/users');
const textToSpeechRouter = require('./routes/textToSpeech');

const app = express();
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept, API-KEY, api-key, AWS_ACCESS_KEY_ID, AWS_ACCESS_SECRET_KEY, AWS_REGION, AWS_S3_BUCKET']
  })
);
app.use(express.json());


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.use((req, res, next) => {
  const apiKey = req.get('X-API-KEY');
  const awsKey = req.get('AWS_ACCESS_KEY_ID');
  const awsSecret = req.get('AWS_ACCESS_SECRET_KEY');
  const awsRegion = req.get('AWS_REGION');
  const awsBucket = req.get('AWS_S3_BUCKET');

  if (!apiKey || apiKey !== process.env.API_KEY) {
    if (awsKey && awsSecret && awsRegion && awsBucket) {
      next();
    } else {
      res.status(401).json({
        error: 'unauthorised',
        message:
          'Either provide api key in the headers example (X-API-KEY: <your-api-key>) or provide your aws credentials in the request headers to upload to your s3 bucket. Required aws credentials are written below',
        required_aws_credentials: [
          'AWS_ACCESS_KEY_ID',
          'AWS_ACCESS_SECRET_KEY',
          'AWS_REGION',
          'AWS_S3_BUCKET',
        ],
      });
    }
  } else {
    next();
  }
});

app.use('/', usersRouter);
app.use('/', uploadRouter);
app.use('/', textToSpeechRouter);

module.exports = app;
