import { Schema } from 'mongoose';

export const MissionSchema = new Schema({
  mentorId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
  },
  cohortIds: {
    type: [String],
  },
  hoursTaught: {
    type: Number,
  },
  engagementScore: {
    type: Number,
  },
  contentCreated: {
    type: Number,
  },
  learnersImpacted: {
    type: Number,
  },
  completedLiveClasses: {
    type: Number,
  },
  imagePublicUrl: {
    type: String,
  },
});

export const MissionCollection = 'missions';
