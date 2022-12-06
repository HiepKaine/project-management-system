import { Module } from '@nestjs/common';
import { StaticServerController } from './static-server.controller';
import { StaticServerService } from './static-server.service';

@Module({
  controllers: [StaticServerController],
  providers: [StaticServerService],
})
export class StaticServerModule {}
