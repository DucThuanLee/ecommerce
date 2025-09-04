import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  @EventPattern('order.created') // pattern phải trùng bên publish
  async handleOrderCreated(@Payload() data: any, @Ctx() ctx: RmqContext) {
    this.logger.log(`Received order.created: ${JSON.stringify(data)}`);

    // TODO: gọi NotificationService để gửi email/sms/push...
    await this.notificationService.send(data);
    // nếu NO_ACK=false → chủ động ack
    const channel = ctx.getChannelRef();
    const msg = ctx.getMessage();
    channel.ack(msg);
  }

   constructor(private readonly notificationService: NotificationService) {}
}
