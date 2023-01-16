const { globalHandler } = require("../handler.js");
const math = require("mathjs");

exports.data = {
  name: "math",
  type: 1,
  description: "Evaluate provided math expression.",
  options: [
    {
      name: "expression",
      description: "Expression to evaluate.",
      type: 3,
      required: true,
    },
  ],
};

const action = async (body) => {
  let response = {
    content: String(math.evaluate(String(body.data.options[0].value))),
  };
  return response;
};

exports.handler = (event) => {
  globalHandler(event, action);
};
