/*import { Module } from '@nestjs/common';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '../../../config/default';

@Module({})
export class RestModule {
  if (process.env.NODE_ENV === 'development') {
  // const morgan = require('morgan');
  // this.app.use(morgan('combined'));
  // this.app.use(morgan('dev', { stream: this.logger }));
}
app.setGlobalPrefix('api');
// filters
// interceptors
// swagger
// errorHandler
// HTTPS
app.use(helmet());
app.use(bodyParser.json({ limit: '500kb' }));
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '500kb', extended: true }));
// app.setMaxListeners(0);

await app.listen(config.server['PORT'] || 3000); // Host?
}*/

import { Module } from '@nestjs/common';
// import { RaftService } from '../../modules/chain/consensus/raft/raft.service';
import { PingController } from "../../modules/ping/ping.controller";
import { ClientsModule } from '@nestjs/microservices';
import { grpcOptions } from '../../config/transportOptions';
// import { PingService } from '../../modules/ping/ping.service';


@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'RAFT_PACKAGE',
                ...grpcOptions,
            },
        ]),
    ],
    controllers: [PingController],
    providers: []
})
export class RestModule {}
