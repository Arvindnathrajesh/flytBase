import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { setObjProps } from '../common-utils/common-utils';
import { MissionDocument } from '../models/documents/mission.document';
import { Mission } from '../types/dtos/mission';
import { STATE } from '../types/dtos/site';
import { CategoryService } from './category.service';
import { DroneService } from './drone.service';
import { SiteService } from './site.service';

@Injectable()
export class MissionService {
  constructor(
    @InjectModel('MissionModel')
    private missionModel: mongoose.Model<MissionDocument>,
    @Inject('SiteService')
    private siteService: SiteService,
    @Inject('CategoryService')
    private categoryService: CategoryService,
    @Inject('DroneService')
    private droneService: DroneService,
  ) {}

  async getMission(missionId) {
    return await this.missionModel.findOne({ missionId, state: STATE.ACTIVE });
  }

  async getMissionsInASite(siteId) {
    if (siteId) {
      return await this.missionModel.find({ siteId, state: STATE.ACTIVE });
    }
    return null;
  }

  async getMissionsInACategory(categoryId) {
    if (categoryId) {
      return await this.missionModel.find({ categoryId, state: STATE.ACTIVE });
    }
    return null;
  }

  async getDronesInACategory(categoryId) {
    const missions: Mission[] = await this.missionModel.find({
      categoryId,
      state: STATE.ACTIVE,
    });
    const droneIds = missions.map((m) => m.droneId);
    const drones = await this.droneService.getDrones(droneIds);
    return drones;
  }

  async deleteMissionsAndSite(siteId, userId) {
    const site = await this.siteService.getSite(siteId);
    if (!site || site.userId !== userId) {
      throw new BadRequestException('SITE_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'SITE_DOES_NOT_EXIST',
      });
    }
    await this.missionModel.updateMany(
      { siteId },
      { $set: { state: STATE.INACTIVE } },
    );
    return await this.siteService.deleteSite(siteId, userId);
  }

  async updateDroneSiteAndRemoveMissionDrone(siteId, droneId, userId) {
    const drone = await this.droneService.updateDroneSite(
      siteId,
      droneId,
      userId,
    );
    const missions = await this.missionModel.updateMany(
      { droneId, state: STATE.ACTIVE },
      { $set: { droneId: null } },
    );
    return { drone, missions };
  }

  async deleteDroneAndRemoveMissionDrone(droneId, userId) {
    const drone = await this.droneService.deleteDrone(droneId, userId);
    const missions = await this.missionModel.updateMany(
      { droneId, state: STATE.ACTIVE },
      { $set: { droneId: null } },
    );
    return { drone, missions };
  }

  async deleteCategoryAndRemoveMissionCategory(categoryId, userId) {
    const category = await this.categoryService.deleteCategory(
      categoryId,
      userId,
    );
    const missions = await this.missionModel.updateMany(
      { categoryId, state: STATE.ACTIVE },
      { $set: { categoryId: null } },
    );
    return { category, missions };
  }

  async createMission(mission: Mission, userId) {
    const siteId = mission.siteId;
    if (!mission.missionId) {
      throw new BadRequestException('ENTER_MISSION_ID', {
        cause: new Error(),
        description: 'ENTER_MISSION_ID',
      });
    }
    const existingMission: MissionDocument = await this.getMission(
      mission.missionId,
    );
    if (existingMission) {
      throw new BadRequestException('Mission_ALREADY_EXISTS', {
        cause: new Error(),
        description: 'Mission_ALREADY_EXISTS',
      });
    }

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

    const categoryId = mission.categoryId;
    if (categoryId) {
      const category = await this.categoryService.getCategory(categoryId);
      if (!category) {
        throw new BadRequestException('CATEGORY_DOES_NOT_EXIST', {
          cause: new Error(),
          description: 'CATEGORY_DOES_NOT_EXIST',
        });
      }
      if (category.userId && category.userId !== userId) {
        throw new BadRequestException('CATEGORY_DOES_NOT_BELONG_TO_USER', {
          cause: new Error(),
          description: 'CATEGORY_DOES_NOT_BELONG_TO_USER',
        });
      }
    }

    const droneId = mission.droneId;
    if (droneId) {
      const drone = await this.droneService.getDrone(droneId);
      if (!drone || drone.siteId !== siteId) {
        throw new BadRequestException('DRONE_DOES_NOT_EXIST', {
          cause: new Error(),
          description: 'DRONE_DOES_NOT_EXIST',
        });
      }
    }

    const newMission: Mission = {
      missionId: mission.missionId,
      alt: mission.alt || null,
      speed: mission.speed || null,
      name: mission.name || null,
      waypoints: mission.waypoints || null,
      siteId: mission.siteId,
      categoryId: categoryId || null,
      state: STATE.ACTIVE,
      droneId: mission.droneId || null,
    };
    return await this.missionModel.create(newMission);
  }

  async updateMission(updatedMission: Mission, userId: number) {
    const mission: MissionDocument = await this.getMission(
      updatedMission.missionId,
    );
    if (!mission) {
      throw new BadRequestException('MISSION_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'MISSION_DOES_NOT_EXIST',
      });
    }
    const site = await this.siteService.getSite(mission.siteId);
    if (!site || site.userId !== userId) {
      throw new BadRequestException('SITE_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'SITE_DOES_NOT_EXIST',
      });
    }
    const props: (keyof Mission)[] = ['alt', 'name', 'speed', 'waypoints'];
    setObjProps(props, mission, updatedMission);
    await mission.save();
    return mission.toObject();
  }

  async deleteMission(missionId, userId) {
    const mission = await this.getMission(missionId);
    if (!mission) {
      throw new BadRequestException('MISSION_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'MISSION_DOES_NOT_EXIST',
      });
    }
    const site = await this.siteService.getSite(mission.siteId);
    if (!site || site.userId !== userId) {
      throw new BadRequestException('SITE_DOES_NOT_BELONG_TO_USER', {
        cause: new Error(),
        description: 'SITE_DOES_NOT_BELONG_TO_USER',
      });
    }
    return await this.missionModel.findOneAndUpdate(
      { missionId },
      { $set: { state: STATE.INACTIVE } },
      { new: true },
    );
  }

  async updateMissionCategory(missionId, categoryId, userId) {
    const category = await this.categoryService.getCategory(categoryId);
    if (!category || (category.userId !== null && category.userId !== userId)) {
      throw new BadRequestException('CATEGORY_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'CATEGORY_DOES_NOT_EXIST',
      });
    }
    const mission = await this.getMission(missionId);
    if (!mission) {
      throw new BadRequestException('MISSION_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'MISSION_DOES_NOT_EXIST',
      });
    }
    const site = await this.siteService.getSite(mission.siteId);
    if (!site || site.userId !== userId) {
      throw new BadRequestException('SITE_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'SITE_DOES_NOT_EXIST',
      });
    }
    return await this.missionModel.findOneAndUpdate(
      { missionId },
      {
        $set: {
          categoryId: categoryId,
        },
      },
      { new: true },
    );
  }

  async updateMissionDrone(missionId, droneId, userId) {
    const mission = await this.getMission(missionId);
    if (!mission) {
      throw new BadRequestException('MISSION_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'MISSION_DOES_NOT_EXIST',
      });
    }
    const site = await this.siteService.getSite(mission.siteId);
    if (!site || site.userId !== userId) {
      throw new BadRequestException('SITE_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'SITE_DOES_NOT_EXIST',
      });
    }

    const drone = await this.droneService.getDrone(droneId);
    if (!drone || drone.siteId !== mission.siteId || drone.userId !== userId) {
      throw new BadRequestException('DRONE_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'DRONE_DOES_NOT_EXIST',
      });
    }

    return await this.missionModel.findOneAndUpdate(
      { missionId },
      {
        $set: {
          droneId: droneId,
        },
      },
      { new: true },
    );
  }
}
