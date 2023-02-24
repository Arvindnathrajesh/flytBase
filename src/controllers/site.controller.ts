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
import { SiteService } from 'src/packages/services/site.service';
import { Site } from 'src/packages/types/dtos/site';

@UseGuards(AuthGuard)
@Controller({ path: '/site' })
export class SiteController {
  constructor(
    @Inject('SiteService')
    private siteService: SiteService,
  ) {}

  @Post('/create')
  public async createSite(@Body() site: Site, @User('userId') userId: number) {
    return await this.siteService.createSite(site, userId);
  }

  @Put('/update')
  public async updateSite(
    @User('userId') userId: number,
    @Query('site-id') siteId: string,
    @Body() site: Site,
  ) {
    return await this.siteService.updateSite(site, siteId, userId);
  }

  @Put('/delete')
  public async deleteSite(
    @User('userId') userId: number,
    @Query('site-id') siteId: string,
  ) {
    return await this.siteService.deleteSite(siteId, userId);
  }
}
