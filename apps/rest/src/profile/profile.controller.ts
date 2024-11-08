import { Controller, Get } from '@nestjs/common';
import { Authorize } from '../guards';
import { ProfileService } from './profile.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { ProfileDto } from './dtos';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOkResponse({
    description: 'Gets current user profile',
    type: ProfileDto
  })
  @Authorize('profile:mine')
  @Get('mine')
  getMyProfile() {
    return this.profileService.getUserProfile('thiago.santos@email.com');
  }
}
