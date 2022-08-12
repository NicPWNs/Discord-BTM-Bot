const nacl = require("tweetnacl");
const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const strBody = event.body;

  if (!event.headers["test"]) {
    const PUBLIC_KEY = process.env.PUBLIC_KEY;
    const signature = event.headers["x-signature-ed25519"];
    const timestamp = event.headers["x-signature-timestamp"];

    const isVerified = nacl.sign.detached.verify(
      Buffer.from(timestamp + strBody),
      Buffer.from(signature, "hex"),
      Buffer.from(PUBLIC_KEY, "hex")
    );

    if (!isVerified) {
      return {
        statusCode: 401,
        body: JSON.stringify("invalid request signature"),
      };
    }
  }

  const body = JSON.parse(strBody);
  if (body.type == 1) {
    return {
      statusCode: 200,
      body: JSON.stringify({ type: 1 }),
    };
  }

  if (body.data.name) {
    var eventText = JSON.stringify(body, null, 2);
    var params = {
      Message: eventText,
      Subject: "Test SNS From Lambda",
      TopicArn: process.env.TOPIC_ARN,
      MessageAttributes: {
        command: { DataType: "String", StringValue: body.data.name },
      },
    };

    await new AWS.SNS({ apiVersion: "2010-03-31" }).publish(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        type: 4,
        data: { content: "*⏳ Loading...*" },
      }),
    };
  }

  return {
    statusCode: 404,
  };
};
