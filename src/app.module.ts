import { Module } from '@nestjs/common';
import { RpcModule } from './transport_layers/rpc/rpc.module';
import { RestModule } from "./transport_layers/rest/rest.module";

@Module({
  imports: [RestModule, RpcModule]
})
export class AppModule {}
