import { AppointmentRepository } from "../../domain/ports/AppointmentRepository";
import { Appointment } from "../../domain/entities/Appointment";

export class GetAppointmentsUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(insuredId: string): Promise<Appointment[]> {
    return await this.appointmentRepository.findByInsuredId(insuredId);
  }
}
