import { SNS } from "aws-sdk";
import { NotificationService } from "../../domain/ports/NotificationService";
import { environment } from "../../config/environment";

export class SNSNotifier implements NotificationService {
  private sns: SNS;
  private topicArnPE: string;
  private topicArnCL: string;

  constructor() {
    this.sns = new SNS();
    this.topicArnPE = environment.snsTopicPE;
    this.topicArnCL = environment.snsTopicCL;
  }

  async notify(
    insuredId: string,
    scheduleId: number,
    countryISO: string
  ): Promise<void> {
    const topicArn = countryISO === "PE" ? this.topicArnPE : this.topicArnCL;

    const message = JSON.stringify({
      insuredId,
      scheduleId,
      countryISO,
    });

    await this.sns
      .publish({
        Message: message,
        TopicArn: topicArn,
      })
      .promise();
  }
}
