import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcOptions } from '../../config/transportOptions';
import { RpcController } from './rpc.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        ...grpcOptions,
      },
    ]),
  ],
  controllers: [RpcController],
})
export class RpcModule {}
