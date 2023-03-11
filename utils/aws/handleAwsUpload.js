const AWS = require('aws-sdk');

const handleAWSUpload = ({
  awsKey,
  awsSecret,
  awsRegion,
  awsBucket,
  req,
  res,
}) => {
  AWS.config.update({
    accessKeyId: awsKey,
    secretAccessKey: awsSecret,
    region: awsRegion,
  });

  const s3 = new AWS.S3();
  const { originalname, buffer } = req.file;

  const params = {
    Bucket: awsBucket,
    Key: originalname,
    Body: buffer,
  };

  s3.upload(params, (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ message: 'Error uploading file', error: err.message });
    }

    res
      .status(201)
      .json({ message: 'File Uploaded Successfully', data: result });
  });
};

module.exports = { handleAWSUpload };
