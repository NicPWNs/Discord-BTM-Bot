require("dotenv").config();
const imageToBase64 = require("image-to-base64");
const md5 = require("blueimp-md5");
const { globalHandler } = require("../handler.js");
const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
  maxRetries: 1,
});
var ddb = new AWS.DynamoDB({
  apiVersion: "2012-08-10",
});
const s3 = new AWS.S3({
  apiVersion: "2012-08-10",
});

exports.data = {
  name: "upload",
  type: 1,
  description: "Upload a photo!",
  options: [
    {
      name: "photo",
      description: "Photo to upload.",
      type: 11,
      required: true,
    },
  ],
};

const action = async (body) => {
  image = body.data.resolved.attachments[body.data.options[0].value].url;
  base64 = await imageToBase64(image);

  var params = {
    Bucket: "discord-btm-bucket",
    Key: md5(base64),
    Body: base64,
  };

  s3.upload(params, function (err, data) {
    if (err) throw err;
  });

  params = {
    Bucket: "discord-btm-bucket",
  };

  var data = await s3.listObjects(params, function (err, data) {
    if (err) throw err;
    console.log(data);
    return data;
  });

  console.log(data.response);

  params = {
    Bucket: "discord-btm-bucket",
    Key: data.response,
  };

  data = s3.getObject(params, function (err, data) {
    if (err) throw err;
    console.log(data);
    return data;
  });

  var response = {
    content: data,
  };

  return response;
};

exports.handler = (event) => {
  globalHandler(event, action);
};
