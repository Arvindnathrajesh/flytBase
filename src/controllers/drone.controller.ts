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
import { DroneService } from 'src/packages/services/drone.service';
import { MissionService } from 'src/packages/services/mission.service';
import { Drone } from 'src/packages/types/dtos/drone';

@UseGuards(AuthGuard)
@Controller({ path: '/drone' })
export class DroneController {
  constructor(
    @Inject('DroneService')
    private droneService: DroneService,
  ) {}

  @Post('/create')
  public async createDrone(
    @User('userId') userId: number,
    @Body() drone: Drone,
  ) {
    return await this.droneService.createDrone(drone, userId);
  }

  @Put('/update')
  public async updateDrone(
    @User('userId') userId: number,
    @Body() drone: Drone,
  ) {
    return await this.droneService.updateDrone(drone, drone.droneId, userId);
  }

  @Put('/delete')
  public async deleteDrone(
    @User('userId') userId: number,
    @Query('drone-id') droneId: string,
  ) {
    return await this.droneService.deleteDrone(droneId, userId);
  }

  //The ability for a user to shift drones from one site to another.
  @Put('/site/shift')
  public async updateDroneSite(
    @User('userId') userId: number,
    @Query('drone-id') droneId: string,
    @Query('site-id') siteId: string,
  ) {
    return await this.droneService.updateDroneSite(siteId, droneId, userId);
  }
}
