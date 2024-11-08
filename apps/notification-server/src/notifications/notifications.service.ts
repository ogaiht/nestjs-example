import { Injectable } from '@nestjs/common';
import { MessageDto } from '../messages';

@Injectable()
export class NotificationsService {
  async broadcast(message: MessageDto) {
    console.log(message);
  }
}
