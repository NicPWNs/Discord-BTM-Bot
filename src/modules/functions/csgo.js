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

  stat =
    "**" +
    stats.data.data.platformInfo.platformUserHandle +
    " " +
    stats.data.data.segments[0].stats[body.data.options[1].value].displayName +
    ":**   " +
    stats.data.data.segments[0].stats[body.data.options[1].value].displayValue;

  if (body.data.options[1].value === "all") {
    stat =
      "__**" +
      stats.data.data.platformInfo.platformUserHandle +
      " Stats:**__\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.timePlayed.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.timePlayed.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.score.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.score.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.kills.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.kills.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.deaths.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.deaths.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.kd.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.kd.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.damage.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.damage.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.headshots.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.headshots.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.shotsFired.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.shotsFired.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.shotsHit.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.shotsHit.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.shotsAccuracy.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.shotsAccuracy.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.snipersKilled.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.snipersKilled.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.bombsPlanted.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.bombsPlanted.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.bombsDefused.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.bombsDefused.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.moneyEarned.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.moneyEarned.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.hostagesRescued.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.hostagesRescued.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.mvp.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.mvp.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.wins.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.wins.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.ties.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.ties.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.matchesPlayed.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.matchesPlayed.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.losses.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.losses.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.roundsPlayed.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.roundsPlayed.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.roundsWon.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.roundsWon.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.wlPercentage.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.wlPercentage.displayValue +
      "\n";
    stat +=
      "**" +
      stats.data.data.segments[0].stats.headshotPct.displayName +
      ":**   " +
      stats.data.data.segments[0].stats.headshotPct.displayValue +
      "\n";
  }

  var response = {
    content: stat,
  };

  return response;
};

exports.handler = (event) => {
  globalHandler(event, action);
};
