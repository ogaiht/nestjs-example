import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';
import { topic } from '../../../kafka-config.json';
import { ParseMessagePipe } from '../pipes';
import { MessageDto } from '../messages';
@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern(topic)
  async handleTestTopic(@Payload(new ParseMessagePipe()) message: MessageDto) {
    await this.notificationsService.broadcast(message);
  }
}
