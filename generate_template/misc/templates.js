exports.templateResource = (
  module,
  command,
  name,
  token,
  trn_api_key,
  nasa_api_key
) => {
  return {
    Type: "AWS::Serverless::Function",
    Properties: {
      Handler: `src/modules/${module}/${command.replace(".js", "")}.handler`,
      Runtime: "nodejs14.x",
      Architectures: ["x86_64"],
      MemorySize: 128,
      Timeout: 100,
      Policies: ["AWSLambdaBasicExecutionRole"],
      Events: {
        SNSEvent: {
          Type: "SNS",
          Properties: {
            Topic: {
              Ref: "MainSNSTopic",
            },
            FilterPolicy: {
              command: [name],
            },
          },
        },
      },
      Environment: {
        Variables: {
          BOT_TOKEN: token,
          TRN_API_KEY: trn_api_key,
          NASA_API_KEY: nasa_api_key,
        },
      },
    },
  };
};

exports.handleNameChange = (resource, name) => {
  resource.Properties.Events.SNSEvent.Properties.FilterPolicy.command = [name];
  return resource;
};
