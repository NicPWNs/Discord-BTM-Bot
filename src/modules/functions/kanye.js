require('dotenv').config();
const axios = require('axios').default;
const { globalHandler } = require('../handler.js');

exports.data = {
  name: 'kanye',
  type: 1,
  description: 'Retrieve a random Kanye West quote.'
}

const action = async (body) => {

  var quote = await axios
  .get('https://api.kanye.rest/')
  .then(function (request) {

    return request.data.quote
  })
  .catch(function (error) {

    console.log(error)
  })

  var response = {
    "content": "<:kanye:256651070829363202>💬  ❝ " + quote + " ❞"
  }

  return response
}

exports.handler = (event) => {
  globalHandler(event, action)
}
