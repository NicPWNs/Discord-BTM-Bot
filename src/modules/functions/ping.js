const { globalHandler } = require("../handler.js");

exports.data = {
  name: "ping",
  type: 1,
  description: "replies with pong!",
};

const action = async (body) => {
  let response = {
    content: "pong!",
  };
  return response;
};

exports.handler = (event) => {
  globalHandler(event, action);
};
