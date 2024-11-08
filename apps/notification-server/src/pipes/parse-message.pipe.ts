import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { MessageDto } from '../messages/message.dto';

@Injectable()
export class ParseMessagePipe implements PipeTransform<any, MessageDto> {
  transform(orignalMessage: any, metadata: ArgumentMetadata): MessageDto {
    const { value } = orignalMessage;
    const messageDto = new MessageDto({ value });
    return messageDto;
  }
}
