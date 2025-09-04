import { Injectable, Logger } from '@nestjs/common';
@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  async send(payload: any) {
    this.logger.log(`Send notification: ${JSON.stringify(payload)}`);
  }
}