require('dotenv').config();
const { globalHandler } = require('../handler.js');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1', maxRetries: 1});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Define Discord Command
exports.data = {
    name: 'streak',
    type: 1,
    description: 'Keep your daily streak going!'
}

const action = async (body) => {

    // Get Item
    var params = {
        TableName: 'discord-streak',
        Key: {
          id: {S: body.member.user.id}
        },
        ProjectionExpression: 'streak'
    };

    var data = await ddb.getItem(params).promise();

    // Put Item
    var params = {
        TableName: 'discord-streak',
        Item: {
          id: {S: body.member.user.id},
          streak: {S: String(Number(data.Item.streak.S) + 1)},
          time: {S: String(Date.now())}
        }
      };

    await ddb.putItem(params).promise();

    // Get Item
    var params = {
        TableName: 'discord-streak',
        Key: {
          id: {S: body.member.user.id}
        },
        ProjectionExpression: 'streak'
    };

    var data = await ddb.getItem(params).promise();

    // Respond to Discord
    var response = {
        "content": "Your streak is: " + data.Item.streak.S
    }

    return response
}

exports.handler = (event) => {
    globalHandler(event, action)
}
