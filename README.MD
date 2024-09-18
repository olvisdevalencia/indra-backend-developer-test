
---

# Appointment Scheduler INDRA BACKEND DEVELOPER TEST 🚀

This project is an **Appointment Scheduler** built with **Serverless Framework** on **AWS Lambda**, leveraging services like **SNS**, **SQS**, **DynamoDB**, and **RDS**.

## Requirements

- Node.js (v16 or higher)
- pnpm
- AWS CLI configured with valid credentials
- Serverless Framework

## Configuration

1. **Environment Variables**: Create a `.env` file with the following variables:

    ```bash
    DYNAMODB_TABLE=AppointmentsTable
    SNS_TOPIC_PE=arn:aws:sns:us-east-1:YOUR_ACCOUNT_ID:sns_topic_pe
    SNS_TOPIC_CL=arn:aws:sns:us-east-1:YOUR_ACCOUNT_ID:sns_topic_cl
    RDS_HOST=your-rds-host
    RDS_USER=your-db-user
    RDS_PASSWORD=your-db-password
    RDS_DATABASE=your-db-name
    ```

2. **IAM Permissions**: The AWS user must have permissions to manage Lambda, SNS, SQS, DynamoDB, RDS, and IAM roles.

## Installation

Install the dependencies using **pnpm**:

```bash
pnpm install
```

## Deployment

Deploy the service to AWS:

```bash
serverless deploy
```

## Local Development

Run the service locally using **Serverless Offline**:

```bash
serverless offline
```

## Resources

This project uses the following AWS services:
- **AWS Lambda** for business logic.
- **DynamoDB** for storing appointments.
- **SNS and SQS** for processing notifications and queues.
- **RDS** (MySQL) for persistent storage of processed appointments.

## Commands

- **Deploy the service**: `serverless deploy`
- **Run locally**: `serverless offline`
- **Remove AWS resources**: `serverless remove`

---