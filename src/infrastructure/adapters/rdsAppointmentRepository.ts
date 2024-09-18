import { AppointmentRepository } from "../../domain/ports/AppointmentRepository";
import mysql from "mysql2/promise";
import { Appointment } from "../../domain/entities/Appointment";
import { environment } from "../../config/environment";

export class RDSAppointmentRepository implements AppointmentRepository {
  private connection: mysql.Connection | null = null;

  private async connect() {
    if (!this.connection) {
      this.connection = await mysql.createConnection({
        host: environment.rdsHost,
        user: environment.rdsUser,
        password: environment.rdsPassword,
        database: environment.rdsDatabase,
      });
    }
  }

  async save(appointment: Appointment): Promise<void> {
    await this.connect();
    const query = `INSERT INTO appointments (insured_id, schedule_id, country_iso, status) VALUES (?, ?, ?, ?)`;
    await this.connection!.execute(query, [
      appointment.insuredId,
      appointment.scheduleId,
      appointment.countryISO,
      appointment.status,
    ]);
  }

  async findByInsuredId(insuredId: string): Promise<Appointment[]> {
    await this.connect();
    const [rows] = await this.connection!.execute(
      `SELECT * FROM appointments WHERE insured_id = ?`,
      [insuredId]
    );
    return rows as Appointment[];
  }
}
