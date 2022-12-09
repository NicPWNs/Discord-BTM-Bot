require("dotenv").config();
const axios = require("axios").default;
const { globalHandler } = require("../handler.js");

exports.data = {
  name: "chat",
  type: 1,
  description: "Provide a dialogue prompt for OpenAI's ChatGPT to respond to.",
  options: [
    {
      name: "prompt",
      description: "Prompt for ChatGPT to respond to.",
      type: 3,
      required: true,
    },
  ],
};

const action = async (body) => {
  const { ChatGPTAPI } = await import("chatgpt");

  const api = new ChatGPTAPI({
    sessionToken: process.env.GPT_SESSION_TOKEN,
  });

  await api.ensureAuth();

  const promptResponse = await api.sendMessage(
    String(body.data.options[0].value),
    {
      timeoutMs: 2 * 60 * 1000,
    }
  );

  var response = {
    content: String(promptResponse),
  };

  return response;
};

exports.handler = (event) => {
  globalHandler(event, action);
};
