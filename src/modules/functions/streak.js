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
  options: [
    {
      name: "stats",
      description: "Get streak stats.",
      type: 5,
      required: false,
    },
  ],
};

const action = async (body) => {
  var params = {
    TableName: "discord-streak",
    Key: {
      id: {
        S: "allTimeStreak",
      },
    },
    ProjectionExpression: "stat, username, userId",
  };

  var dataStats = await ddb.getItem(params).promise();

  var params = {
    TableName: "discord-streak",
    Key: {
      id: {
        S: "currentStreak",
      },
    },
    ProjectionExpression: "stat, username, userId",
  };

  var dataCurrent = await ddb.getItem(params).promise();

  var params = {
    TableName: "discord-streak",
    Key: {
      id: {
        S: body.member.user.id,
      },
    },
    ProjectionExpression:
      "username, streak, updated, lastMid, nextMid, skipMid, personalRecord",
  };

  var data = await ddb.getItem(params).promise();

  if (typeof data.Item !== "undefined") {
    var storedLastMid = new Date(data.Item.lastMid.S);
    var storedNextMid = new Date(data.Item.nextMid.S);
    var storedSkipMid = new Date(data.Item.skipMid.S);
  }

  var prefix = "";
  var streak = 0;
  var personalRecord = 0;
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
        username: {
          S: body.member.user.username,
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
        username: {
          S: body.member.user.username,
        },
        personalRecord: {
          S: String(data.Item.personalRecord.S),
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
        username: {
          S: body.member.user.username,
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
        username: {
          S: body.member.user.username,
        },
        personalRecord: {
          S: String(data.Item.personalRecord.S),
        },
      },
    };

    streak = streak + 1;

    await ddb.putItem(params).promise();

    if (String(body.member.user.id) === String(dataCurrent.Item.userId.S)) {
      var paramsStats = {
        TableName: "discord-streak",
        Item: {
          id: {
            S: "currentStreak",
          },
          stat: {
            S: 0,
          },
          username: {
            S: "BlessThisMess",
          },
          userId: {
            S: "1002004051468226560",
          },
        },
      };

      prefix = prefix + "**Current Highest Streak Reset!** ";

      await ddb.putItem(paramsStats).promise();
    }
  } else if (
    currTime.getTime() > storedLastMid.getTime() &&
    currTime.getTime() < storedNextMid.getTime()
  ) {
    prefix = "";

    streak = data.Item.streak.S;

    var params = {
      TableName: "discord-streak",
      Item: {
        id: {
          S: body.member.user.id,
        },
        username: {
          S: body.member.user.username,
        },
        streak: {
          S: String(streak),
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
        username: {
          S: body.member.user.username,
        },
        personalRecord: {
          S: String(data.Item.personalRecord.S),
        },
      },
    };

    await ddb.putItem(params).promise();
  } else if (
    currTime.getTime() > storedLastMid.getTime() &&
    currTime.getTime() > storedNextMid.getTime()
  ) {
    prefix = "You hit your streak! ";

    streak = Number(data.Item.streak.S) + 1;
    personalRecord = String(data.Item.personalRecord.S);

    if (streak > Number(data.Item.personalRecord.S)) {
      personalRecord = streak;
    }

    var params = {
      TableName: "discord-streak",
      Item: {
        id: {
          S: body.member.user.id,
        },
        username: {
          S: body.member.user.username,
        },
        streak: {
          S: String(streak),
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
        personalRecord: {
          S: String(personalRecord),
        },
      },
    };

    if (streak > Number(dataStats.Item.stat.S)) {
      var paramsStats = {
        TableName: "discord-streak",
        Item: {
          id: {
            S: "allTimeStreak",
          },
          stat: {
            S: String(streak),
          },
          username: {
            S: body.member.user.username,
          },
          userId: {
            S: body.member.user.id,
          },
        },
      };

      await ddb.putItem(paramsStats).promise();
    }

    if (streak > Number(dataCurrent.Item.stat.S)) {
      var paramsStats = {
        TableName: "discord-streak",
        Item: {
          id: {
            S: "currentStreak",
          },
          stat: {
            S: String(streak),
          },
          username: {
            S: body.member.user.username,
          },
          userId: {
            S: body.member.user.id,
          },
        },
      };

      await ddb.putItem(paramsStats).promise();
    }

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

  stats = "";

  if (typeof body.data.options !== "undefined") {
    if (body.data.options[0].value === true) {
      stats =
        "\n\n📊  __**Streak Stats**__\n**All-Time Highest Streak:** " +
        dataStats.Item.stat.S +
        " *by* <@" +
        dataStats.Item.userId.S +
        ">" +
        "\n**Current Highest Streak:** " +
        dataCurrent.Item.stat.S +
        " *by* <@" +
        dataCurrent.Item.userId.S +
        ">" +
        "\n**Personal Highest Streak:** " +
        data.Item.personalRecord.S +
        " *by* <@" +
        body.member.user.id +
        ">";
    }
  }

  var response = {
    content: prefix + "Your streak is: " + streak + "   " + emote + stats,
  };

  return response;
};

exports.handler = (event) => {
  globalHandler(event, action);
};
