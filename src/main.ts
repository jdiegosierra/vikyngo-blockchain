// Config
import 'module-alias/register';
require('dotenv').config();
import config from './config/default'; // TODO: Custom path process.env["NODE_CONFIG_DIR"] = __dirname + "/configDir/";
// Dependencies
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { grpcOptions, tcpOptions } from './config/transportOptions'
// Use Nest Logger
// import { logger } from '@utils/logger';

(async () => {
    // logger.info('API server made by J. Diego Sierra');
    // logger.info('Current environment: ' + process.env.NODE_ENV || "development");
/*   This example contains a hybrid application (HTTP + gRPC)
   You can switch to a microservice with NestFactory.createMicroservice() as follows:*/
   const app = await NestFactory.create(AppModule);
   await app.connectMicroservice(grpcOptions);

  app.connectMicroservice(tcpOptions);
  await app.startAllMicroservicesAsync();
  await app.listen(config.server['PORT']);

  // const app = await NestFactory.create(AppModule);
  // app.connectMicroservice(grpcClientOptions);
  //
  // await app.startAllMicroservicesAsync();
  // await app.listen(3001);
  // console.log(`Application is running on: ${await app.getUrl()}`);
  }
)();
