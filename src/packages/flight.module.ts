import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionCollection, MissionSchema } from './models/schemas/mission.schema';
import { UserDataCollection, UserSchema } from './models/schemas/user.schema';
import { MissionService } from './services/mission.service';
import { SessionService } from './services/session.service';
import { UserService } from './services/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'MissionModel', schema: MissionSchema , collection: MissionCollection,},

  { name: 'UserDataModel', schema: UserSchema , collection: UserDataCollection,}])],
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
  
  ],
  exports:[
    'MissionService',
    'UserService',
    'SessionService'
  ],

})
export class FlightModule {}