require('dotenv').config();
const imageToBase64 = require('image-to-base64');
const axios = require('axios').default;
const { globalHandler } = require('../handler.js');

exports.data = {
  name: 'emote',
  type: 1,
  description: 'Retrieves a specified emote.',
  options: [
  {
    "name": "search",
    "description": "Search for specified emote.",
    "type": 3,
    "required": true
  },
  {
    "name": "add",
    "description": "Add specified emote to the server.",
    "type": 5,
    "required": false
  }]
}

const action = async (body) => {

  var image = await axios
  .get('https://api.frankerfacez.com/v1/emotes?q=' + body.data.options[0].value + '&sensitive=true&sort=count-desc&animated=on&high_dpi=off&page=1&per_page=1')
  .then(function (request) {

    image = 'http:' + request.data.emoticons[0].urls['4']
    return image
  })
  .catch(function (error) {

    console.log("ERROR: Image URL not retrieved.")
    console.log(error)
    return image
  })

  if (typeof body.data.options[1] !== 'undefined' && body.data.options[1].value === true) {

    var base64 = 'data:image/png;base64,' + await imageToBase64(image)
    var added = await axios.post(`https://discord.com/api/v10/guilds/${body.guild_id}/emojis`, {
      name: `${body.data.options[0].value}`,
      image: `${base64}`
    },
    {
      headers: {
        "Authorization": `Bot ${process.env.BOT_TOKEN}`,
        "Content-Type": "application/json"
      }
    }
    )
    .then(function (request) {

      added = true
      return added
    })
    .catch(function (error) {

      console.log("ERROR: Emoji could not be added.")
      console.log(error)
      added = false
      return added
    })
  }

  if (added === true) {
    var response = {
      "content": "✅   Emote added to the server!\n" + image
    }
  } else if (added === false) {
    var response = {
      "content": "❌   Emote NOT added to the server!\n" + image
    }
  } else {
    var response = {
      "content": image
    }
  }

  return response
}

exports.handler = (event) => {
  globalHandler(event, action)
}
