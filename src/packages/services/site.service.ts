import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { setObjProps } from '../common-utils/common-utils';
import { SiteDocument } from '../models/documents/site.document';
import { Site, STATE } from '../types/dtos/site';

@Injectable()
export class SiteService {
  constructor(
    @InjectModel('SiteModel')
    private siteModel: mongoose.Model<SiteDocument>,
  ) {}

  async getSite(siteId) {
    return await this.siteModel.findOne({ siteId, state: STATE.ACTIVE });
  }

  async siteAssignToUser(siteId, userId) {
    return await this.siteModel.findOneAndUpdate(
      { siteId, state: STATE.ACTIVE },
      { $set: { userId } },
      { new: true },
    );
  }

  async updateSite(updatedSite: Site, siteId: string, userId: number) {
    const site: SiteDocument = await this.getSite(siteId);
    if (!site) {
      throw new BadRequestException('SITE_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'SITE_DOES_NOT_EXIST',
      });
    }
    if (site.userId !== userId) {
      throw new BadRequestException('SITE_DOES_NOT_BELONG_TO_USER', {
        cause: new Error(),
        description: 'SITE_DOES_NOT_BELONG_TO_USER',
      });
    }

    const props: (keyof Site)[] = ['position', 'siteName'];
    setObjProps(props, site, updatedSite);
    await site.save();
    return site.toObject();
  }

  async deleteSite(siteId, userId) {
    return await this.siteModel.findOneAndUpdate(
      { siteId, userId },
      { $set: { state: STATE.INACTIVE } },
      { new: true },
    );
  }

  async createSite(site: Site) {
    return await this.siteModel.create(site);
  }
}
