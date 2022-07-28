/**
 * A Lambda function that replies to interaction with static string
 */

 const { globalHandler } = require('../handler.js')

 exports.data = {
   name: 'bless',
   type: 1,
   description: 'Blesses the mess!'
 }
 
 const action = async (body) => {
   // May do something here with body
   // Body contains Discord command details
   let response = {
     "content": "The mess has been blessed! ✨"
   }
   return response
 }
 
 exports.handler = (event) => {
   globalHandler(event, action)
 }
 