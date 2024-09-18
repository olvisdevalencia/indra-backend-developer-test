export interface NotificationService {
  notify(
    insuredId: string,
    scheduleId: number,
    countryISO: string
  ): Promise<void>;
}
