import { forwardRef, Module } from '@nestjs/common';
import { RaftController } from './raft.controller';
import { RaftService } from './raft.service';
import { RpcModule } from '../../../../transport-layers/rpc/rpc.module';

@Module({
  imports: [forwardRef(() => RpcModule)],
  controllers: [RaftController],
  providers: [RaftService]
})
export class RaftModule {}