import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './packages/flight.module';
import { MissionV1Controller } from './controllers/mission.controller';
import { UserController } from './controllers/user.controller';
import { InternalController } from './controllers/internal.controller';
import { SiteController } from './controllers/site.controller';
import { DroneController } from './controllers/drone.controller';
import { CategoryController } from './controllers/category.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ArvindNath:pass%40123@cluster0.9tist.mongodb.net/flytBase?retryWrites=true&w=majority',
    ),
    FlightModule,
  ],
  controllers: [
    AppController,
    MissionV1Controller,
    CategoryController,
    UserController,
    InternalController,
    SiteController,
    DroneController,
  ],
  providers: [AppService],
})
export class AppModule {}
