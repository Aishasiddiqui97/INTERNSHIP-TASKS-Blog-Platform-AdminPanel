import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export interface CategoryDocument {
  _id: string;
  name: string;
  createdAt: Date;
}

export const Category = mongoose.models.Category || model('Category', categorySchema);
