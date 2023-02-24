import { Schema } from 'mongoose';
export const SiteSchema = new Schema({
    siteId: {
    type: String,
    required: true,
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
        type: String,
      },
      longitude: {
        type: String,
      },
  },
});

export const siteCollection = 'site';
