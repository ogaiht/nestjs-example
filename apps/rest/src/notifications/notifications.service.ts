import { Injectable } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';

@Injectable()
export class NotificationsService {
  @Client()
  private readonly client: ClientKafka;

  send(message: { value: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.send('', message).subscribe({
        complete() {
          resolve();
        },
        error(err) {
          reject(err);
        }
      });
    });
  }
}
