import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { heroOptions, raftOptions } from '../../config/transportOptions';
import { RaftController, RpcController } from './rpc.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RAFT_PACKAGE',
        ...raftOptions,
      },
    ]),
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        ...heroOptions,
      },
    ]),
  ],
  controllers: [RaftController, RpcController],
})
export class RpcModule {}
