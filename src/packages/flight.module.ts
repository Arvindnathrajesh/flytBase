import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionCollection, MissionSchema } from './models/schemas/mission.schema';
import { siteCollection, SiteSchema } from './models/schemas/site.schema';
import { UserDataCollection, UserSchema } from './models/schemas/user.schema';
import { MissionService } from './services/mission.service';
import { SessionService } from './services/session.service';
import { SiteService } from './services/site.service';
import { UserService } from './services/user.service';

@Module({
  imports: [MongooseModule.forFeature([
  { name: 'MissionModel', schema: MissionSchema , collection: MissionCollection},
  { name: 'SiteModel', schema: SiteSchema , collection: siteCollection},
  { name: 'UserDataModel', schema: UserSchema , collection: UserDataCollection}
  ])],
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
  
  ],
  exports:[
    'SiteService',
    'MissionService',
    'UserService',
    'SessionService'
  ],

})
export class FlightModule {}