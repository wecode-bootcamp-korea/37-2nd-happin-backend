const aws = require('aws-sdk');

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const param = {
  Bucket: 'wecodeproject',
  ACL: 'public-read-write',
  ContentDisposition: 'inline',
};

module.exports = {
  s3,
  param,
};
