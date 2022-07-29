const axios = require('axios').default;
const { globalHandler } = require('../handler.js')

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
    }
  ]
 }

 const action = async (body) => {

  response = axios
  .get('https://api.frankerfacez.com/v1/emotes?q=' + body.data.options[0].value + '&sensitive=true&sort=count-desc&animated=on&high_dpi=off&page=1&per_page=1')
  .then(response => {

    if (response.data._total == 0) {

      let answer = {
        "content": "No emotes found 💀!"
      }

      return answer
    }

    let answer = {
      "content": 'http:' + response.data.emoticons[0].urls['2']
    }

    return answer
  })

  return response
 }

 exports.handler = (event) => {
   globalHandler(event, action)
 }
