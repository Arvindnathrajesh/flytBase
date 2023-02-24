import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SiteDocument } from '../models/documents/site.document';

@Injectable()
export class SiteService {
  constructor(
    @InjectModel('SiteModel')
    private siteModel: mongoose.Model<SiteDocument>,
  ) {}

  async getSites() {
    return await this.siteModel.find({});
  }
}
