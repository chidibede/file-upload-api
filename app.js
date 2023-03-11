require('dotenv').config();
const express = require('express');
const cors = require('cors');
const uploadRouter = require('./routes/files');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());

app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, API-KEY, AWS_ACCESS_KEY_ID, AWS_ACCESS_SECRET_KEY, AWS_REGION, AWS_S3_BUCKET'
  );
  next();
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.use((req, res, next) => {
  const apiKey = req.get('API-KEY');
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
          'Either provide api key in the headers example (API-KEY: <your-api-key>) or provide your aws credentials in the request headers to upload to your s3 bucket. Required aws credentials are written below',
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

module.exports = app;

