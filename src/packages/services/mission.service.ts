import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MissionDocument } from '../models/documents/mission.document';

@Injectable()
export class MissionService {
  constructor(
    @InjectModel('MissionModel')
    private missionModel: mongoose.Model<MissionDocument>,
  ) {}

  async getMissions() {
    return await this.missionModel.find({});
  }
}
