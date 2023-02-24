import { Schema } from 'mongoose';
import { STATE } from 'src/packages/types/dtos/site';

export const DroneSchema = new Schema(
  {
    droneId: {
      type: String,
      required: true,
      unique: true,
    },
    siteId: {
      type: String,
    },
    userId: {
      type: Number,
    },
    deletedBy: {
      type: Number,
    },
    deletedOn: {
      type: Date,
    },
    droneType: {
      type: String,
    },
    makeName: {
      type: String,
    },
    name: {
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

export const DroneCollection = 'drone';
