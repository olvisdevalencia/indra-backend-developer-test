function getEnv(variable: string, defaultValue?: string): string {
  const value = process.env[variable];
  if (!value && !defaultValue) {
    throw new Error(`Missing environment variable: ${variable}`);
  }
  return value || defaultValue!;
}

export const environment = {
  dynamoDbTable: getEnv("DYNAMODB_TABLE"),
  snsTopicPE: getEnv("SNS_TOPIC_PE"),
  snsTopicCL: getEnv("SNS_TOPIC_CL"),
  rdsHost: getEnv("RDS_HOST"),
  rdsUser: getEnv("RDS_USER"),
  rdsPassword: getEnv("RDS_PASSWORD"),
  rdsDatabase: getEnv("RDS_DATABASE"),
};
