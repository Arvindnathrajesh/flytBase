import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { DroneService } from 'src/packages/services/drone.service';
import { MissionService } from 'src/packages/services/mission.service';
import { SiteService } from 'src/packages/services/site.service';
import { Site } from 'src/packages/types/dtos/site';

@Controller({ path: '/internal' })
export class InternalController {
  constructor(
    @Inject('MissionService')
    private missionService: MissionService,
    @Inject('DroneService')
    private droneService: DroneService,
  ) {}

  //request the server to retrieve all drones belonging to a particular site.
  @Get('/drones-in-site')
  public async getDronesInASite(@Query('site-id') siteId: string) {
    return await this.droneService.getDronesInASite(siteId);
  }

  //retrieve all missions belonging to a particular site.
  @Get('/missions-in-site')
  public async getMissionsInASite(@Query('site-id') siteId: string) {
    return await this.missionService.getMissionsInASite(siteId);
  }

  //retrieve all missions belonging to a particular category.
  @Get('/missions-in-a-category')
  public async getMissionsInACategory(
    @Query('category-id') categoryId: string,
  ) {
    return await this.missionService.getMissionsInACategory(categoryId);
  }

  //retrieve all drones belonging to a particular category.
  @Get('/drones-in-a-category')
  public async getDronesInACategory(@Query('category-id') categoryId: string) {
    return await this.missionService.getDronesInACategory(categoryId);
  }
}
