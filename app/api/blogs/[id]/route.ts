import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { Blog } from '@/models/Blog'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const blog = await Blog.findById(params.id)
      .populate('authorId', 'name')
      .populate('categoryId', 'name')
    
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { 
        success: true, 
        data: blog,
        message: 'Blog retrieved successfully' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get blog error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description, content, image, authorId, categoryId, status } = await request.json()
    
    if (!title || !description || !content || !authorId || !categoryId) {
      return NextResponse.json(
        { success: false, message: 'Title, description, content, authorId, and categoryId are required' },
        { status: 400 }
      )
    }
    
    await dbConnect()
    
    const blog = await Blog.findByIdAndUpdate(
      params.id,
      { title, description, content, image, authorId, categoryId, status },
      { new: true }
    )
    
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { 
        success: true, 
        data: blog,
        message: 'Blog updated successfully' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update blog error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const blog = await Blog.findByIdAndDelete(params.id)
    
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Blog deleted successfully' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete blog error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
