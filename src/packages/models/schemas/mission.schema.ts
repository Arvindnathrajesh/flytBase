import { Schema } from 'mongoose';
import { STATE } from 'src/packages/types/dtos/site';

export const MissionSchema = new Schema(
  {
    missionId: {
      type: String,
      required: true,
      unique: true,
    },
    alt: {
      type: Number,
    },
    speed: {
      type: Number,
    },
    name: {
      type: String,
    },
    waypoints: [
      {
        _id: false,
        alt: {
          type: Number,
        },
        lat: {
          type: Number,
        },
        lng: {
          type: Number,
        },
      },
    ],

    droneId: {
      type: String,
    },
    siteId: {
      type: String,
    },
    categoryId: {
      type: String,
    },
    state: {
      type: String,
      enum: Object.keys(STATE).map((key) => STATE[key]),
    },
  },
  {
    timestamps: true,
  },
);

export const MissionCollection = 'missions';
