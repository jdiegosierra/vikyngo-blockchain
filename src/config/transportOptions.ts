import { Transport, ClientOptions } from "@nestjs/microservices";
import {join} from "path";

export const grpcOptions: ClientOptions   = {
    transport: Transport.GRPC,
    options: {
        package: 'hero',
        protoPath: './src/transport_layers/rpc/hero.proto',
        url: 'localhost: 8000',
    }
};

export const tcpOptions = {
    transport: Transport.TCP,
    options: {
        url: 'localhost: 3001',
    }
};