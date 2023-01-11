require("dotenv").config();
const imageToBase64 = require("image-to-base64");
const axios = require("axios").default;
const { globalHandler } = require("../handler.js");

exports.data = {
  name: "emote",
  type: 1,
  description: "Retrieves a specified emote with new 7TV API.",
  options: [
    {
      name: "search",
      description: "Search for specified emote.",
      type: 3,
      required: true,
    },
    {
      name: "add",
      description: "Add specified emote to the server.",
      type: 5,
      required: false,
    },
  ],
};

const action = async (body) => {
  var image = await axios
    .post(
      "https://7tv.io/v3/gql",
      {
        operationName: "SearchEmotes",
        variables: {
          query: body.data.options[0].value,
          limit: 1,
          page: 1,
          sort: {
            value: "popularity",
            order: "DESCENDING",
          },
          filter: {
            category: "TOP",
            exact_match: false,
            case_sensitive: false,
            ignore_tags: false,
            zero_width: false,
            animated: false,
            aspect_ratio: "",
          },
        },
        query:
          "query SearchEmotes($query: String!, $page: Int, $sort: Sort, $limit: Int, $filter: EmoteSearchFilter) {\n  emotes(query: $query, page: $page, sort: $sort, limit: $limit, filter: $filter) {\n    count\n    items {\n      id\n      name\n      states\n      trending\n      owner {\n        id\n        username\n        display_name\n        style {\n          color\n          paint_id\n          __typename\n        }\n        __typename\n      }\n      flags\n      host {\n        url\n        files {\n          name\n          format\n          width\n          height\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}",
      },
      {
        headers: {
          authorization: process.env.SEVENTV_SESSION_TOKEN,
          "content-type": "application/json",
        },
      }
    )
    .then(function (request) {
      image = "http:" + request.data.data.emotes.items[0].host.url;
      return image;
    })
    .catch(function (error) {
      console.log("ERROR: Image URL not retrieved.");
      console.log(error);
      return image;
    });

  var emote = await axios
    .get(image + "/1x.gif")
    .then(function (request) {
      emote = image + "/1x.gif";
      return emote;
    })
    .catch(function (error) {
      emote = image + "/1x.png";
      return emote;
    });

  if (
    typeof body.data.options[1] !== "undefined" &&
    body.data.options[1].value === true
  ) {
    var base64 = "data:image/png;base64," + (await imageToBase64(emote));
    var added = await axios
      .post(
        `https://discord.com/api/v10/guilds/${body.guild_id}/emojis`,
        {
          name: `${body.data.options[0].value}`,
          image: `${base64}`,
        },
        {
          headers: {
            Authorization: `Bot ${process.env.BOT_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (request) {
        added = true;
        return added;
      })
      .catch(function (error) {
        console.log("ERROR: Emote could not be added to the guild.");
        console.log(error);
        added = false;
        return added;
      });
  }

  if (added === true) {
    var response = {
      content: "✅   Emote added to the server!\n" + emote,
    };
  } else if (added === false) {
    var response = {
      content: "❌   Emote NOT added to the server!\n" + emote,
    };
  } else {
    var response = {
      content: emote,
    };
  }

  return response;
};

exports.handler = (event) => {
  globalHandler(event, action);
};
