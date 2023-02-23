import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { FlightModule } from './packages/flight.module';
import { MissionV1Controller } from './controllers/mission.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ArvindNath:pass%40123@cluster0.9tist.mongodb.net/flytBase?retryWrites=true&w=majority'),
    FlightModule
  ],
  controllers: [AppController,MissionV1Controller],
  providers: [AppService ],
})
export class AppModule {}
