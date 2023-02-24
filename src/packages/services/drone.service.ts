import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { setObjProps } from '../common-utils/common-utils';
import { DroneDocument } from '../models/documents/drone.document';
import { Drone } from '../types/dtos/drone';
import { STATE } from '../types/dtos/site';
import { SiteService } from './site.service';

@Injectable()
export class DroneService {
  constructor(
    @InjectModel('DroneModel')
    private droneModel: mongoose.Model<DroneDocument>,
    @Inject('SiteService')
    private siteService: SiteService,
  ) {}

  async getDrone(droneId: string) {
    return await this.droneModel.findOne({ droneId, state: STATE.ACTIVE });
  }

  async createDrone(drone: Drone, userId) {
    const siteId = drone.siteId;
    if (!drone.droneId) {
      throw new BadRequestException('ENTER_DRONE_ID', {
        cause: new Error(),
        description: 'ENTER_DRONE_ID',
      });
    }
    const existingDrone = await this.getDrone(drone.droneId);
    if (existingDrone) {
      throw new BadRequestException('DRONE_ID_ALREADY_EXISTS', {
        cause: new Error(),
        description: 'DRONE_ID_ALREADY_EXISTS',
      });
    }
    if (siteId) {
      const site = await this.siteService.getSite(siteId);
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
    }
    const newDrone: Drone = {
      droneId: drone.droneId,
      siteId: siteId || null,
      userId: userId,
      deletedBy: null,
      deletedOn: null,
      droneType: drone.droneType || null,
      makeName: drone.makeName || null,
      name: drone.name || null,
      state: STATE.ACTIVE,
    };
    return await this.droneModel.create(newDrone);
  }

  async updateDrone(updatedDrone: Drone, droneId: string, userId: number) {
    const drone: DroneDocument = await this.droneModel.findOne({
      droneId,
      userId,
      state: STATE.ACTIVE,
    });
    if (!drone) {
      throw new BadRequestException('DRONE_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'DRONE_DOES_NOT_EXIST',
      });
    }
    const props: (keyof Drone)[] = ['droneType', 'makeName', 'name'];
    setObjProps(props, drone, updatedDrone);
    await drone.save();
    return drone.toObject();
  }

  async deleteDrone(droneId, userId) {
    return await this.droneModel.findOneAndUpdate(
      { droneId, userId },
      {
        $set: {
          state: STATE.INACTIVE,
          deletedBy: userId,
          deletedOn: new Date(),
        },
      },
      { new: true },
    );
  }

  async getDronesInASite(siteId) {
    return await this.droneModel.find({ siteId, state: STATE.ACTIVE });
  }

  async updateDroneSite(siteId, droneId, userId) {
    const site = await this.siteService.getSite(siteId);
    if (!site || site.userId !== userId) {
      throw new BadRequestException('SITE_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'SITE_DOES_NOT_EXIST',
      });
    }
    const drone = await this.getDrone(droneId);
    if (!drone || drone.userId !== userId) {
      throw new BadRequestException('DRONE_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'DRONE_DOES_NOT_EXIST',
      });
    }
    return await this.droneModel.findOneAndUpdate(
      { droneId, userId },
      {
        $set: {
          siteId: siteId,
        },
      },
      { new: true },
    );
  }
}
