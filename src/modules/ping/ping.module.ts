import { Module } from '@nestjs/common';
import { PingController } from './ping.controller';
import { PingService } from './ping.service';
// import { RaftService } from '../chain/consensus/raft/raft.service';

@Module({
  controllers: [PingController],
  providers: [],
})
export class PingModule {}
