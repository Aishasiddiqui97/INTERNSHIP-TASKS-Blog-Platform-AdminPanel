import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [200, 'Description cannot exceed 200 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  image: {
    type: String,
    default: '',
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required'],
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
})

// Update updatedAt field before saving
blogSchema.pre('save', function(this: BlogDocument, next) {
  this.updatedAt = new Date()
  next()
})

export interface BlogDocument {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  authorId: string | null;
  categoryId: string | null;
  author?: { name: string };
  category?: { name: string };
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

export const Blog = mongoose?.models?.Blog || model('Blog', blogSchema);
