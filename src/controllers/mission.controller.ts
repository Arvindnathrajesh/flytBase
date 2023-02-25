import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { MissionService } from 'src/packages/services/mission.service';
import { Mission } from 'src/packages/types/dtos/mission';

@UseGuards(AuthGuard)
@Controller({ path: '/mission' })
export class MissionV1Controller {
  constructor(
    @Inject('MissionService')
    private missionService: MissionService,
  ) {}

  @Post('/create')
  public async createMission(
    @User('userId') userId: number,
    @Body() mission: Mission,
  ) {
    return await this.missionService.createMission(mission, userId);
  }

  @Put('/update')
  public async updateMission(
    @User('userId') userId: number,
    @Body() mission: Mission,
  ) {
    return await this.missionService.updateMission(mission, userId);
  }

  @Put('/delete')
  public async deleteMission(
    @User('userId') userId: number,
    @Query('mission-id') missionId: string,
  ) {
    return await this.missionService.deleteMission(missionId, userId);
  }

  // Adding category to mission
  @Put('/category/add')
  public async updateMissionCategory(
    @User('userId') userId: number,
    @Query('mission-id') missionId: string,
    @Query('category-id') categoryId: string,
  ) {
    return await this.missionService.updateMissionCategory(
      missionId,
      categoryId,
      userId,
    );
  }
}
