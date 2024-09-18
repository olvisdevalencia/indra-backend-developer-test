export class Appointment {
  constructor(
    public insuredId: string,
    public scheduleId: number,
    public countryISO: string,
    public status: string = "pending"
  ) {}
}
