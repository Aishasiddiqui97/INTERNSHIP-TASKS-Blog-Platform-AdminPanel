import { Blog, BlogDocument } from '@/models/Blog'
import { Category, CategoryDocument } from '@/models/Category'
import { User, UserDocument } from '@/models/User'
import { dbConnect } from './db'

export async function getBlogs(): Promise<BlogDocument[]> {
  try {
    await dbConnect()
    
    // Get all blogs (published and draft) with category and author info
    const blogs = await Blog.find()
      .populate('authorId', 'name')
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 })
      .limit(9)
      
    return JSON.parse(JSON.stringify(blogs))
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

export async function getBlogById(id: string): Promise<BlogDocument | null> {
  try {
    await dbConnect()
    
    const blog = await Blog.findById(id)
      .populate('authorId', 'name')
      .populate('categoryId', 'name')
      
    return JSON.parse(JSON.stringify(blog))
  } catch (error) {
    console.error('Error fetching blog by id:', error)
    return null
  }
}

export async function getCategories(): Promise<CategoryDocument[]> {
  try {
    await dbConnect()
    
    const categories = await Category.find().sort({ name: 1 })
    
    return JSON.parse(JSON.stringify(categories))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getUsers(): Promise<UserDocument[]> {
  try {
    await dbConnect()
    
    const users = await User.find({ role: 'admin' }).select('-password')
    
    return JSON.parse(JSON.stringify(users))
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}