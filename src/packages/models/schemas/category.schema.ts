import { Schema } from 'mongoose';
import { STATE } from 'src/packages/types/dtos/site';

export const CategorySchema = new Schema(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
        type: Number,
      },
    name: {
      type: String,
    },
    color: {
      type: String,
    },
    tagName: {
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

export const CategoryCollection = 'category';
