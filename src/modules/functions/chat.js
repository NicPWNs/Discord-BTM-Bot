require("dotenv").config();
const axios = require("axios").default;
const { globalHandler } = require("../handler.js");

exports.data = {
  name: "chat",
  type: 1,
  description: "Chat with the BlessThisMess bot.",
  options: [
    {
      name: "prompt",
      description: "Prompt for BlessThisMess to respond to.",
      type: 3,
      required: true,
    },
  ],
};

const action = async (body) => {
  var chat = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      model: "text-davinci-003",
      prompt: body.data.options[0].value,
      max_tokens: 4000,
      temperature: 1,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.OPENAI_SESSION_TOKEN,
      },
    }
  );

  botResponse = chat.data.choices[0].text;
  discordUser = "<@" + body.member.user.id + ">";
  botResponse = botResponse.replace("[Your Name Here]", discordUser);
  botResponse = botResponse.replace("[Your Name]", discordUser);
  botResponse = botResponse.replace("[Your name]", discordUser);

  var response = {
    content: chat.data.choices[0].text,
  };

  return response;
};

exports.handler = (event) => {
  globalHandler(event, action);
};
