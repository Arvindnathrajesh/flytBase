import { Controller, Get, Inject } from '@nestjs/common';
import { MissionService } from 'src/packages/services/mission.service';

@Controller({ path: '/flight' })
export class MissionV1Controller {
  constructor(
    @Inject('MissionService')
    private missionService: MissionService,
  ) {}

  @Get('/mission')
  public async getMissions() {
    return await this.missionService.getMissions();
  }
}
