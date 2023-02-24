import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { MissionService } from 'src/packages/services/mission.service';
import { Mission } from 'src/packages/types/dtos/mission';

@Controller({ path: '/flight' })
export class MissionV1Controller {
  constructor(
    @Inject('MissionService')
    private missionService: MissionService,
  ) {}

  @Post('/create')
  public async createDrone(
    @User('userId') userId: number,
    @Body() mission: Mission,
  ) {
    return await this.missionService.createMission(mission, userId)
  }
}
