import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { Category } from '@/models/Category'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const categories = await Category.find().sort({ name: 1 })
    
    return NextResponse.json(
      { 
        success: true, 
        data: categories,
        message: 'Categories retrieved successfully' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get categories error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()
    
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Category name is required' },
        { status: 400 }
      )
    }
    
    await dbConnect()
    
    console.log('Creating category with name:', name.trim())
    
    // Check if Category model is available
    if (!Category) {
      throw new Error('Category model is not available')
    }
    
    const category = new Category({ name: name.trim() })
    
    console.log('Category instance created:', category)
    
    const savedCategory = await category.save()
    
    console.log('Category saved successfully:', savedCategory)
    
    return NextResponse.json(
      { 
        success: true, 
        data: savedCategory,
        message: 'Category created successfully' 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create category error:', error)
    // Log the actual error for debugging
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Category ID is required' },
        { status: 400 }
      )
    }
    
    await dbConnect()
    
    const deletedCategory = await Category.findByIdAndDelete(id)
    
    if (!deletedCategory) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Category deleted successfully' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete category error:', error)
    // Log the actual error for debugging
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}