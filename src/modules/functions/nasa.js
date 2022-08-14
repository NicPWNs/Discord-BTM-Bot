require("dotenv").config();
const axios = require("axios").default;
const { globalHandler } = require("../handler.js");

exports.data = {
  name: "nasa",
  type: 1,
  description: "Retrieve the NASA photo of the day.",
  options: [
    {
      name: "details",
      description: "Provide the explanation of the photo.",
      type: 5,
      required: false,
    },
  ],
};

const action = async (body) => {
  var photo = await axios
    .get(
      "https://api.nasa.gov/planetary/apod?api_key=" + process.env.NASA_API_KEY
    )
    .then(function (request) {
      return request;
    })
    .catch(function (error) {
      console.log(error);
    });

  desc = "";

  if (typeof body.data.options !== "undefined") {
    if (body.data.options[0].value === true) {
      desc = photo.data.explanation;
    }
  }

  var response = {
    content: photo.data.url + "\n" + desc,
  };

  return response;
};

exports.handler = (event) => {
  globalHandler(event, action);
};
