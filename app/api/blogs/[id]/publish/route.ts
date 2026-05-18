import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { Blog } from '@/models/Blog'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const blog = await Blog.findById(params.id)
    
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }
    
    // Toggle status
    blog.status = blog.status === 'published' ? 'draft' : 'published'
    
    const updatedBlog = await blog.save()
    
    return NextResponse.json(
      { 
        success: true, 
        data: updatedBlog,
        message: `Blog ${updatedBlog.status} successfully` 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Publish blog error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
