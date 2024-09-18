import { AppointmentRepository } from "../../domain/ports/AppointmentRepository";
import { DynamoDB } from "aws-sdk";
import { Appointment } from "../../domain/entities/Appointment";
import { environment } from "../../config/environment";

export class DynamoAppointmentRepository implements AppointmentRepository {
  private dynamoDb = new DynamoDB.DocumentClient();

  async save(appointment: Appointment): Promise<void> {
    await this.dynamoDb
      .put({
        TableName: environment.dynamoDbTable,
        Item: appointment,
      })
      .promise();
  }

  async findByInsuredId(insuredId: string): Promise<Appointment[]> {
    const result = await this.dynamoDb
      .query({
        TableName: environment.dynamoDbTable,
        KeyConditionExpression: "insuredId = :insuredId",
        ExpressionAttributeValues: {
          ":insuredId": insuredId,
        },
      })
      .promise();

    return result.Items as Appointment[];
  }
}
