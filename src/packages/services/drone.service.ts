import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { DroneDocument } from '../models/documents/drone.document';

@Injectable()
export class DroneService {
  constructor(
    @InjectModel('DroneModel')
    private droneModel: mongoose.Model<DroneDocument>,
  ) {}

  async getDrones() {
    return await this.droneModel.find({});
  }
}
