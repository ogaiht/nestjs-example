import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { brokers, groupId } from '../../kafka-config.json';

async function bootstrap() {
  const kafkaMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers
        },
        consumer: {
          groupId
        }
      }
    });
  kafkaMicroservice.listen();
}
bootstrap();
