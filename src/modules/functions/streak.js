require('dotenv').config();
const { globalHandler } = require('../handler.js');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Define Discord Command
exports.data = {
    name: 'streak',
    type: 1,
    description: 'Keep your daily streak going!'
}

const action = async (body) => {

    // Put Item
    var params = {
        TableName: 'discord-streak',
        Item: {
          id: {S: body.member.user.id},
          streak: {S: String(1)},
          time: {S: String(Date.now())}
        }
      };

      ddb.putItem(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
        }
      });


    // Get Item
    var params = {
        TableName: 'discord-streak',
        Key: {
          id: {S: body.member.user.id}
        },
        ProjectionExpression: 'streak'
    };

    data = ddb.getItem(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
          return data
        }
    });

    console.log(data.httpRequest.body.Key.streak)

    // Respond to Discord
    var response = {
        "content": "Your streak is: " + data.httpRequest.body.Key.streak

    }

    return response
}

exports.handler = (event) => {
    globalHandler(event, action)
}
