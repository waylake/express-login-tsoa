import { envConfig } from "./EnvConfig";

import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: envConfig.AWS_SES_ACCESS_KEY,
  secretAccessKey: envConfig.AWS_SES_SECRET_ACCESS_KEY,
  region: "us-west-2",
});

export const ses = new AWS.SES({ apiVersion: "2023-08-01" });
