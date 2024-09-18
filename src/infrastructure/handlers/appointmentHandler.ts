import { APIGatewayProxyHandler } from "aws-lambda";
import { CreateAppointmentUseCase } from "../../application/useCases/createAppointment";
import { GetAppointmentsUseCase } from "../../application/useCases/getAppointments";
import { DynamoAppointmentRepository } from "../adapters/dynamoAppointmentRepository";
import { SNSNotifier } from "../adapters/snsNotifier";

const appointmentRepository = new DynamoAppointmentRepository();
const snsNotifier = new SNSNotifier();

const createAppointmentUseCase = new CreateAppointmentUseCase(
  appointmentRepository,
  snsNotifier
);
const getAppointmentsUseCase = new GetAppointmentsUseCase(
  appointmentRepository
);

export const handler: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod === "POST" && event.body) {
    const { insuredId, scheduleId, countryISO } = JSON.parse(event.body);
    await createAppointmentUseCase.execute(insuredId, scheduleId, countryISO);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Processing schedule" }),
    };
  }

  if (event.httpMethod === "GET" && event.pathParameters?.insuredId) {
    const insuredId = event.pathParameters.insuredId;
    const appointments = await getAppointmentsUseCase.execute(insuredId);

    return {
      statusCode: 200,
      body: JSON.stringify(appointments),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: "Invalid request" }),
  };
};
