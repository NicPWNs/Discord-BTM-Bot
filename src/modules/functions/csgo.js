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
      "TRN-Api-Key": process.env.TRN_API_KEY
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

  switch (body.data.options[1].value) {
    case "timePlayed":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.timePlayed.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.timePlayed.displayValue;
      break;
    case "score":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.score.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.score.displayValue;
      break;
    case "kills":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.kills.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.kills.displayValue;
      break;
    case "deaths":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.deaths.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.deaths.displayValue;
      break;
    case "kd":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.kd.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.kd.displayValue;
      break;
    case "damage":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.damage.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.damage.displayValue;
      break;
    case "headshots":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.headshots.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.headshots.displayValue;
      break;
    case "shotsFired":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.shotsFired.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.shotsFired.displayValue;
      break;
    case "shotsHit":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.shotsHit.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.shotsHit.displayValue;
      break;
    case "shotsAccuracy":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.shotsAccuracy.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.shotsAccuracy.displayValue;
      break;
    case "snipersKilled":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.snipersKilled.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.snipersKilled.displayValue;
      break;
    case "bombsPlanted":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.bombsPlanted.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.bombsPlanted.displayValue;
      break;
    case "bombsDefused":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.bombsDefused.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.bombsDefused.displayValue;
      break;
    case "moneyEarned":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.moneyEarned.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.moneyEarned.displayValue;
      break;
    case "hostagesRescued":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.hostagesRescued.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.hostagesRescued.displayValue;
      break;
    case "mvp":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.mvp.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.mvp.displayValue;
      break;
    case "wins":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.wins.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.wins.displayValue;
      break;
    case "ties":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.ties.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.ties.displayValue;
      break;
    case "matchesPlayed":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.matchesPlayed.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.matchesPlayed.displayValue;
      break;
    case "losses":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.losses.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.losses.displayValue;
      break;
    case "roundsPlayed":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.roundsPlayed.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.roundsPlayed.displayValue;
      break;
    case "roundsWon":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.roundsWon.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.roundsWon.displayValue;
      break;
    case "wlPercentage":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.wlPercentage.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.wlPercentage.displayValue;
      break;
    case "headshotPct":
      stat =
        "**" +
        stats.data.data.platformInfo.platformUserHandle +
        " " +
        stats.data.data.segments[0].stats.headshotPct.displayName +
        ":**   " +
        stats.data.data.segments[0].stats.headshotPct.displayValue;
      break;
    default:
      stat = "Default Error";
  }

  var response = {
    content: stat,
  };

  return response;
};

exports.handler = (event) => {
  globalHandler(event, action);
};
