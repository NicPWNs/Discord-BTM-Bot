require('dotenv').config();
const { globalHandler } = require('../handler.js');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1', maxRetries: 1});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.data = {
    name: 'streak',
    type: 1,
    description: 'Keep your daily streak going!'
}

const action = async (body) => {

    var params = {
        TableName: 'discord-streak',
        Key: {
          id: {S: body.member.user.id}
        },
        ProjectionExpression: 'streak, updated, lastMid, nextMid, skipMid'
    };

    var data = await ddb.getItem(params).promise();

    var currTime = Date.now()
    var already = false
    var missed = false

    var lastMidnight = new Date()
    lastMidnight.setHours(0,0,0,0)
    const est = -300; //Timezone offset for EST in minutes.
    lastMidnight = new Date(lastMidnight.getTime() + est*60*1000)
    lastMidnight = lastMidnight.getTime()

    var nextMidnight = new Date()
    nextMidnight.setHours(24,0,0,0)
    nextMidnight = new Date(nextMidnight.getTime() + est*60*1000)
    nextMidnight = nextMidnight.getTime()

    var skipMidnight = new Date()
    skipMidnight.setHours(48,0,0,0)
    skipMidnight = new Date(skipMidnight.getTime() + est*60*1000)
    skipMidnight = skipMidnight.getTime()

    var streak = 0
    var updated = Date.now()
    var lastMid = lastMidnight
    var nextMid = nextMidnight
    var skipMid = skipMidnight

    if (typeof data.Item !== 'undefined') {
      streak = Number(data.Item.streak.S)
      updated = Number(data.Item.updated.S)
      lastMid = Number(data.Item.lastMid.S)
      nextMid = Number(data.Item.nextMid.S)
      skipMid = Number(data.Item.skipMid.S)
    }

    if (currTime > lastMid && currTime < nextMid) {
      already = true
    } else if (currTime > nextMid && currTime > skipMid) {
      missed = true
    } else if (currTime > lastMid && currTime > nextMid) {
      var params = {
        TableName: 'discord-streak',
        Item: {
          id: {S: body.member.user.id},
          streak: {S: String(Number(streak) + 1)},
          updated: {S: String(Date.now())},
          lastMid: {S: String(lastMidnight)},
          nextMid: {S: String(nextMidnight)},
          skipMid: {S: String(skipMidnight)}
        }
      };

    await ddb.putItem(params).promise();
    }

    var params = {
        TableName: 'discord-streak',
        Key: {
          id: {S: body.member.user.id}
        },
        ProjectionExpression: 'streak'
    };

    var data = await ddb.getItem(params).promise();
    var streak = Number(data.Item.streak.S)
    var emote = ""
    var prefix = ""

    if (missed) {
      prefix = "You missed your streak! "
    }

    if (already) {
      prefix = "You've already done your streak today! "
    }

    switch (true) {
      case (streak < 2):
        emote = "💩";
        break;
      case (streak < 3):
        emote = "✌️";
        break;
      case (streak < 4):
        emote = "👌";
        break;
      case (streak < 5):
        emote = "🍀";
        break;
      case (streak < 10):
        emote = "🔥";
        break;
      case (streak < 25):
        emote = "🧨";
        break;
      case (streak < 50):
        emote = "🏆";
        break;
      case (streak < 75):
        emote = "💀";
        break;
      case (streak < 100):
        emote = "💎";
        break;
      case (streak < 1000):
        emote = "💯 You weren't supposed to actually take it this far...";
        break;
      default:
        emote = "🔥";
    }

    var response = {
        "content": prefix + "Your streak is: " + streak + " " + emote
    }

    return response
}

exports.handler = (event) => {
    globalHandler(event, action)
}
