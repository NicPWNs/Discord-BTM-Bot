require("dotenv").config();
const axios = require("axios").default;

exports.globalHandler = async (event, action) => {
  const body = JSON.parse(event.Records[0].Sns.Message);
  const response = await action(body);
  axios
    .patch(
      `https://discord.com/api/v10/webhooks/${body.application_id}/${body.token}/messages/@original`,
      response
    )
    .then(function (response) {
      //console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
