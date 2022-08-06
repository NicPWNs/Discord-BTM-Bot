require('dotenv').config();
const axios = require('axios').default;
const { globalHandler } = require('../handler.js');

exports.data = {
  name: 'age',
  type: 1,
  description: 'Guess age based on given name.',
  options:
  [{
    "name": "name",
    "description": "Name to guess age of.",
    "type": 3,
    "required": true
  }]
}

const action = async (body) => {

  var age = await axios
  .get('https://api.agify.io/?name=' + encodeURIComponent(body.data.options[0].value))
  .then(function (request) {

    return request.data.age
  })
  .catch(function (error) {

    console.log(error)
  })

  var response = {
    "content": "I guess the age of \"" + body.data.options[0].value + "\" is " + age + " !"
  }

  if (age == null){

    response = {
      "content": "Name not found!"
    }
  }

  return response
}

exports.handler = (event) => {
  globalHandler(event, action)
}
