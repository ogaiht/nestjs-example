import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../database/repositories';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [RepositoriesModule],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
