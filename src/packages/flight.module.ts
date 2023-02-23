import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionCollection, MissionSchema } from './models/schemas/mission.schema';
import { MissionService } from './services/mission.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'MissionModel', schema: MissionSchema , collection: MissionCollection,}])],
  providers: [
    {
        provide: 'MissionService',
        useClass: MissionService,
    },
  ],
  exports:[
    'MissionService'
  ],

})
export class FlightModule {}