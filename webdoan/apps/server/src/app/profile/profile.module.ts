import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';
import { UserService } from '../user/user.service';

import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [SharedCommonModule],
  providers: [ProfileService, UserService],
  controllers: [ProfileController],
})
export class ProfileModule { }
