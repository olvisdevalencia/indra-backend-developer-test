import { AppointmentRepository } from "../../domain/ports/AppointmentRepository";
import { NotificationService } from "../../domain/ports/NotificationService";
import { Appointment } from "../../domain/entities/Appointment";

export class CreateAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private notificationService: NotificationService
  ) {}

  async execute(insuredId: string, scheduleId: number, countryISO: string) {
    const appointment = new Appointment(insuredId, scheduleId, countryISO);

    await this.appointmentRepository.save(appointment);

    await this.notificationService.notify(insuredId, scheduleId, countryISO);
  }
}
