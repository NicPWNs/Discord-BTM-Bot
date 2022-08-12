require("dotenv").config();
const { globalHandler } = require("../handler.js");
const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
  maxRetries: 1,
});
var ddb = new AWS.DynamoDB({
  apiVersion: "2012-08-10",
});

exports.data = {
  name: "streak",
  type: 1,
  description: "Keep your daily streak going!",
};

const action = async (body) => {
  var params = {
    TableName: "discord-streak",
    Key: {
      id: {
        S: body.member.user.id,
      },
    },
    ProjectionExpression: "streak, updated, lastMid, nextMid, skipMid",
  };

  var data = await ddb.getItem(params).promise();

  if (typeof data.Item !== "undefined") {
    var storedLastMid = new Date(data.Item.lastMid.S);
    var storedNextMid = new Date(data.Item.nextMid.S);
    var storedSkipMid = new Date(data.Item.skipMid.S);
  }

  var prefix = "";
  var streak = 0;
  var offset = -240; //Timezone offset for EDT in minutes.

  var currTime = new Date();
  currTime = new Date(currTime.getTime() + offset * 60 * 1000);

  var lastMidnight = new Date();
  lastMidnight = new Date(lastMidnight.getTime() + offset * 60 * 1000);
  lastMidnight.setHours(0, 0, 0, 0);

  var nextMidnight = new Date();
  nextMidnight = new Date(nextMidnight.getTime() + offset * 60 * 1000);
  nextMidnight.setHours(24, 0, 0, 0);

  var skipMidnight = new Date();
  skipMidnight = new Date(skipMidnight.getTime() + offset * 60 * 1000);
  skipMidnight.setHours(48, 0, 0, 0);

  if (typeof data.Item === "undefined") {
    prefix = "You just started a new streak! ";

    var params = {
      TableName: "discord-streak",
      Item: {
        id: {
          S: body.member.user.id,
        },
        streak: {
          S: String(Number(streak) + 1),
        },
        updated: {
          S: String(currTime),
        },
        lastMid: {
          S: String(lastMidnight),
        },
        nextMid: {
          S: String(nextMidnight),
        },
        skipMid: {
          S: String(skipMidnight),
        },
      },
    };

    streak = streak + 1;

    await ddb.putItem(params).promise();
  } else if (currTime.getTime() > storedSkipMid.getTime()) {
    prefix = "You missed your streak! ";

    var params = {
      TableName: "discord-streak",
      Item: {
        id: {
          S: body.member.user.id,
        },
        streak: {
          S: String(Number(streak) + 1),
        },
        updated: {
          S: String(currTime),
        },
        lastMid: {
          S: String(lastMidnight),
        },
        nextMid: {
          S: String(nextMidnight),
        },
        skipMid: {
          S: String(skipMidnight),
        },
      },
    };

    streak = streak + 1;

    await ddb.putItem(params).promise();
  } else if (
    currTime.getTime() > storedLastMid.getTime() &&
    currTime.getTime() < storedNextMid.getTime()
  ) {
    prefix = "";

    var params = {
      TableName: "discord-streak",
      Item: {
        id: {
          S: body.member.user.id,
        },
        streak: {
          S: String(Number(data.Item.streak.S)),
        },
        updated: {
          S: String(currTime),
        },
        lastMid: {
          S: String(data.Item.lastMid.S),
        },
        nextMid: {
          S: String(data.Item.nextMid.S),
        },
        skipMid: {
          S: String(data.Item.skipMid.S),
        },
      },
    };

    streak = data.Item.streak.S;

    await ddb.putItem(params).promise();
  } else if (
    currTime.getTime() > storedLastMid.getTime() &&
    currTime.getTime() > storedNextMid.getTime()
  ) {
    prefix = "You hit your streak! ";

    var params = {
      TableName: "discord-streak",
      Item: {
        id: {
          S: body.member.user.id,
        },
        streak: {
          S: String(Number(data.Item.streak.S) + 1),
        },
        updated: {
          S: String(currTime),
        },
        lastMid: {
          S: String(lastMidnight),
        },
        nextMid: {
          S: String(nextMidnight),
        },
        skipMid: {
          S: String(skipMidnight),
        },
      },
    };

    streak = Number(data.Item.streak.S) + 1;

    await ddb.putItem(params).promise();
  }

  switch (true) {
    case streak < 2:
      emote = "💩";
      break;
    case streak < 3:
      emote = "✌️";
      break;
    case streak < 4:
      emote = "👌";
      break;
    case streak < 5:
      emote = "🍀";
      break;
    case streak < 10:
      emote = "🔥";
      break;
    case streak < 25:
      emote = "🧨";
      break;
    case streak < 50:
      emote = "🏆";
      break;
    case streak < 75:
      emote = "💀";
      break;
    case streak < 100:
      emote = "💎";
      break;
    case streak < 1000:
      emote = "💯 You weren't supposed to actually take it this far...";
      break;
    default:
      emote = "🔥";
  }

  var response = {
    content: prefix + "Your streak is: " + streak + "   " + emote,
  };

  return response;
};

exports.handler = (event) => {
  globalHandler(event, action);
};
