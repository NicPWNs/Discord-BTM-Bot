const { globalHandler } = require("../handler.js");

exports.data = {
  name: "bless",
  type: 1,
  description: "Blesses the mess!",
};

const action = async (body) => {
  let response = {
    content: "The mess has been blessed! ✨",
  };
  return response;
};

exports.handler = (event) => {
  globalHandler(event, action);
};
