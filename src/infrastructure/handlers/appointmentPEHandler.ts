import { SQSHandler, SQSEvent } from "aws-lambda";
import { RDSAppointmentRepository } from "../adapters/rdsAppointmentRepository";
import { Appointment } from "../../domain/entities/Appointment";
import { EventBridge } from "aws-sdk";

const rdsAppointmentRepository = new RDSAppointmentRepository();
const eventBridge = new EventBridge();

export const handler: SQSHandler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const { insuredId, scheduleId } = JSON.parse(record.body) as Appointment;

    const appointment = new Appointment(insuredId, scheduleId, "PE");

    await rdsAppointmentRepository.save(appointment);

    await eventBridge
      .putEvents({
        Entries: [
          {
            Source: "appointment.pe",
            DetailType: "AppointmentConfirmed",
            Detail: JSON.stringify({ insuredId, scheduleId, countryISO: "PE" }),
          },
        ],
      })
      .promise();
  }
};
