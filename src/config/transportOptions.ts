import { Transport, ClientOptions, TcpClientOptions } from '@nestjs/microservices';
import {join} from "path";

export const raftOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'raft',
        protoPath: './src/transport_layers/rpc/raft.proto',
        url: 'localhost: 8000',
    }
};

export const heroOptions: ClientOptions   = {
    transport: Transport.GRPC,
    options: {
        package: 'hero',
        protoPath: './src/transport_layers/rpc/hero.proto',
        url: 'localhost: 8000',
    }
};

export const tcpOptions: TcpClientOptions = {
    transport: Transport.TCP,
    options: {
        host: 'localhost',
        port: 3002
    }
};