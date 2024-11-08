import { Reflector } from '@nestjs/core';

export const Authorize = Reflector.createDecorator<string>();
