import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DroneCollection, DroneSchema } from './models/schemas/drone.schema';
import {
  MissionCollection,
  MissionSchema,
} from './models/schemas/mission.schema';
import { SiteCollection, SiteSchema } from './models/schemas/site.schema';
import { UserDataCollection, UserSchema } from './models/schemas/user.schema';
import { DroneService } from './services/drone.service';
import { MissionService } from './services/mission.service';
import { SessionService } from './services/session.service';
import { SiteService } from './services/site.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'MissionModel',
        schema: MissionSchema,
        collection: MissionCollection,
      },
      { name: 'SiteModel', schema: SiteSchema, collection: SiteCollection },
      {
        name: 'UserDataModel',
        schema: UserSchema,
        collection: UserDataCollection,
      },
      {
        name: 'DroneModel',
        schema: DroneSchema,
        collection: DroneCollection,
      },
    ]),
  ],
  providers: [
    {
      provide: 'MissionService',
      useClass: MissionService,
    },
    {
      provide: 'UserService',
      useClass: UserService,
    },
    {
      provide: 'SessionService',
      useClass: SessionService,
    },
    {
      provide: 'SiteService',
      useClass: SiteService,
    },
    {
      provide: 'DroneService',
      useClass: DroneService,
    },
  ],
  exports: [
    'SiteService',
    'MissionService',
    'UserService',
    'SessionService',
    'DroneService',
  ],
})
export class FlightModule {}
