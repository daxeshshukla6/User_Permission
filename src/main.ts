import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrapGrpc() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
      transport:Transport.GRPC,
      options: {
        package:'roleManagement',
        protoPath: join(__dirname,'../grpc/roles.proto'),
        url:'localhost:50051',
        //loader:{keepCase:true}
      },
    });

  await app.startAllMicroservices();
  
  
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
bootstrapGrpc();
