import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CategoryCollection,
  CategorySchema,
} from './models/schemas/category.schema';
import { DroneCollection, DroneSchema } from './models/schemas/drone.schema';
import {
  MissionCollection,
  MissionSchema,
} from './models/schemas/mission.schema';
import { SiteCollection, SiteSchema } from './models/schemas/site.schema';
import { UserDataCollection, UserSchema } from './models/schemas/user.schema';
import { CategoryService } from './services/category.service';
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
      {
        name: 'CategoryModel',
        schema: CategorySchema,
        collection: CategoryCollection,
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
    {
      provide: 'CategoryService',
      useClass: CategoryService,
    },
  ],
  exports: [
    'CategoryService',
    'SiteService',
    'MissionService',
    'UserService',
    'SessionService',
    'DroneService',
  ],
})
export class FlightModule {}
