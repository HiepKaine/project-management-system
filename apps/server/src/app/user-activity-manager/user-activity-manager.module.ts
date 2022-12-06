import { Module } from '@nestjs/common';
import { UserActivityManagerService } from './user-activity-manager.service';
import { UserActivityManagerController } from './user-activity-manager.controller';
import { SharedCommonModule } from '@server/common';

@Module({
  providers: [UserActivityManagerService],
  imports: [SharedCommonModule],
  exports: [UserActivityManagerService],
  controllers: [UserActivityManagerController],
})
export class UserActivityManagerModule { }
