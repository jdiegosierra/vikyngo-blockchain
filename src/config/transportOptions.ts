import { Transport, ClientOptions } from "@nestjs/microservices";
import {join} from "path";

export const grpcOptions: ClientOptions   = {
    transport: Transport.GRPC,
    options: {
        package: 'raft',
        protoPath: './src/transport_layers/rpc/raft.proto',
        url: 'localhost: 8000',
    }
};

export const tcpOptions = {
    transport: Transport.TCP,
    options: {
        url: 'localhost: 3001',
    }
};