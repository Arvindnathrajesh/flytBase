import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { DroneService } from 'src/packages/services/drone.service';
import { MissionService } from 'src/packages/services/mission.service';
import { SiteService } from 'src/packages/services/site.service';
import { Site } from 'src/packages/types/dtos/site';

@Controller({ path: '/internal' })
export class InternalController {
  constructor(
    @Inject('SiteService')
    private siteService: SiteService,
    @Inject('DroneService')
    private droneService: DroneService,
  ) {}

  @Post('/site/create')
  public async getMissions(@Body() site: Site) {
    return await this.siteService.createSite(site);
  }

    //request the server to retrieve all drones belonging to a particular site.
    @Get('/drones-in-site')
    public async getDronesInASite(
        @Query('site-id') siteId: string,
    ) {
        return await this.droneService.getDronesInASite(siteId);
    }
}
