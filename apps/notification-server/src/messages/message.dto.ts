export class MessageDto {
  readonly value: string;

  constructor(partial: Partial<MessageDto>) {
    Object.assign(this, partial);
  }
}
