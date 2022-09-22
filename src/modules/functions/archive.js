require("dotenv").config();
const axios = require("axios").default;
const { globalHandler } = require("../handler.js");

exports.data = {
  name: "archive",
  type: 1,
  description: "Send an archive message.",
};

const action = async (body) => {
  var response = {
    content:
      "This Discord guild has been archived in favor of The **MEGACORD** and consolidation of *Nitro Boosts*. All permissions are revoked. Message history in #blessthismess will remain.",
  };

  return response;
};

exports.handler = (event) => {
  globalHandler(event, action);
};
