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
        "User on Steam, a Steam ID, Steam Community URI, or Steam Vanity Username.",
      type: 3,
      required: true,
    },
    {
      name: "stat",
      description: "The stats you want to retrieve.",
      type: 3,
      required: true,
      choices: [
        {
          name: "All",
          value: "all",
        },
        {
          name: "K/D",
          value: "kd",
        },
        {
          name: "Score",
          value: "score",
        },
        {
          name: "Kills",
          value: "kills",
        },
        {
          name: "Deaths",
          value: "deaths",
        },
        {
          name: "Time Played",
          value: "timePlayed",
        },
        {
          name: "Damage",
          value: "damage",
        },
        {
          name: "Headshots",
          value: "headshots",
        },
        {
          name: "Shots Fired",
          value: "shotsFired",
        },
        {
          name: "Shots Hit",
          value: "shotsHit",
        },
        {
          name: "Shots Accuracy",
          value: "shotsAccuracy",
        },
        {
          name: "Snipers Killed",
          value: "snipersKilled",
        },
        {
          name: "Bombs Planted",
          value: "bombsPlanted",
        },
        {
          name: "Bombs Defused",
          value: "bombsDefused",
        },
        {
          name: "Money Earned",
          value: "moneyEarned",
        },
        {
          name: "Hostages Rescued",
          value: "hostagesRescued",
        },
        {
          name: "MVPs",
          value: "mvp",
        },
        {
          name: "Wins",
          value: "wins",
        },
        {
          name: "Ties",
          value: "ties",
        },
        {
          name: "Matches Played",
          value: "matchesPlayed",
        },
        {
          name: "Losses",
          value: "losses",
        },
        {
          name: "Rounds Played",
          value: "roundsPlayed",
        },
        {
          name: "Rounds Won",
          value: "roundsWon",
        },
        {
          name: "Win/Loss Percentage",
          value: "wlPercentage",
        },
        {
          name: "Headshot Percentage",
          value: "headshotPct",
        },
      ],
    },
  ],
};

const action = async (body) => {
  let config = {
    headers: {
      "TRN-Api-Key": process.env.TRN_API_KEY,
    },
  };

  var stats = await axios
    .get(
      "https://public-api.tracker.gg/v2/csgo/standard/profile/steam/" +
        encodeURIComponent(body.data.options[0].value),
      config
    )
    .then(function (request) {
      return request;
    })
    .catch(function (error) {
      console.log(error);
    });

  if (body.data.options[1].value === "all") {
    stat =
      "__**" +
      stats.data.data.platformInfo.platformUserHandle +
      " Stats:**__\n";

    var types = [
      "timePlayed",
      "score",
      "kills",
      "deaths",
      "kd",
      "damage",
      "headshots",
      "shotsFired",
      "shotsHit",
      "shotsAccuracy",
      "snipersKilled",
      "bombsPlanted",
      "bombsDefused",
      "moneyEarned",
      "hostagesRescued",
      "mvp",
      "wins",
      "ties",
      "matchesPlayed",
      "losses",
      "roundsPlayed",
      "roundsWon",
      "wlPercentage",
      "headshotPct",
    ];

    for (let i = 0; i < types.length; i++) {
      stat +=
        "**" +
        stats.data.data.segments[0].stats[types[i]].displayName +
        ":**   " +
        stats.data.data.segments[0].stats[types[i]].displayValue +
        "\n";
    }
  } else {
    stat =
      "**" +
      stats.data.data.platformInfo.platformUserHandle +
      " " +
      stats.data.data.segments[0].stats[body.data.options[1].value]
        .displayName +
      ":**   " +
      stats.data.data.segments[0].stats[body.data.options[1].value]
        .displayValue;
  }

  var response = {
    content: stat,
  };

  return response;
};

exports.handler = (event) => {
  globalHandler(event, action);
};
