import { Schema } from 'mongoose';
import { STATE } from 'src/packages/types/dtos/site';
export const SiteSchema = new Schema(
  {
    siteId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Number,
    },
    siteName: {
      type: String,
    },
    position: {
      _id: false,
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
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

export const SiteCollection = 'site';
