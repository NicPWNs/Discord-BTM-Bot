require("dotenv").config();
const axios = require("axios").default;
const { globalHandler } = require("../handler.js");

exports.data = {
  name: "csgo",
  type: 1,
  description: "Retrieve CS:GO stats.",
  options: [
    {
      name: "username",
      description:
        "User on Steam, a Steam ID, Steam Community URL, Steam Vanity Username, etc.",
      type: 3,
      required: true,
    },
  ],
};

const action = async (body) => {
  let config = {
    headers: {
      "TRN-Api-Key": "b932d892-1b82-42fe-bc55-3d2a294c90c4",
    },
  };

  var stats = await axios
    .get(
      "https://public-api.tracker.gg/v2/csgo/standard/profile/steam/" +
        encodeURIComponent(body.data.options[0].value),
      config
    )
    .then(function (request) {
      console.log(request.data.data.segments[0].stats.kd);
      return stats;
    })
    .catch(function (error) {
      console.log(error);
    });

  var response = {
    content: "Stats!",
  };

  return response;
};

exports.handler = (event) => {
  globalHandler(event, action);
};
