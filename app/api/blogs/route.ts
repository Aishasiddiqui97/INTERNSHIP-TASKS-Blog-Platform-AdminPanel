import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { dbConnect } from '@/lib/db'
import { Blog } from '@/models/Blog'
import { Category } from '@/models/Category'
import { User } from '@/models/User'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    
    // Build query
    let query: any = { status: 'published' }
    
    if (category) {
      const categoryDoc = await Category.findOne({ name: category })
      if (categoryDoc) {
        query.categoryId = categoryDoc._id
      }
    }
    
    // Get blogs with pagination
    const blogs = await Blog.find(query)
      .populate('authorId', 'name')
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
    
    // Get total count for pagination
    const total = await Blog.countDocuments(query)
    
    return NextResponse.json(
      { 
        success: true, 
        data: { 
          blogs, 
          pagination: { 
            currentPage: page, 
            totalPages: Math.ceil(total / limit), 
            total 
          } 
        },
        message: 'Blogs retrieved successfully' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get blogs error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, content, image, authorId, categoryId, status } = await request.json()
    
    console.log('Received blog data:', { title, description, content, image, authorId, categoryId, status })
    
    if (!title || !description || !content) {
      return NextResponse.json(
        { success: false, message: 'Title, description, and content are required' },
        { status: 400 }
      )
    }
    
    await dbConnect()
    
    // Create a default author if not exists
    let validAuthorId = authorId
    if (!authorId || !mongoose.Types.ObjectId.isValid(authorId)) {
      // Try to find or create a default admin user
      let defaultUser = await User.findOne({ email: 'admin@example.com' })
      if (!defaultUser) {
        defaultUser = await User.create({
          name: 'Admin',
          email: 'admin@example.com',
          password: 'hashed_password_placeholder'
        })
      }
      validAuthorId = defaultUser._id
    }
    
    // Validate or create category
    let validCategoryId = categoryId
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      // Try to find category by name or create default
      let category = await Category.findOne({ name: categoryId })
      if (!category) {
        category = await Category.create({ name: categoryId || 'Uncategorized' })
      }
      validCategoryId = category._id
    }
    
    const blog = new Blog({
      title,
      description,
      content,
      image: image || '',
      authorId: validAuthorId,
      categoryId: validCategoryId,
      status: status || 'draft',
    })
    
    console.log('Creating blog:', blog)
    
    const savedBlog = await blog.save()
    
    console.log('Blog saved successfully:', savedBlog)
    
    return NextResponse.json(
      { 
        success: true, 
        data: savedBlog,
        message: 'Blog created successfully' 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create blog error:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack)
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}
