import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Test App')
  .setDescription('This is a Test App')
  .setVersion('0.1')
  .addTag('test')
  .build();

export function addSwagger(app: INestApplication<any>): void {
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}
