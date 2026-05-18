import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { Category } from '@/models/Category'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const category = await Category.findById(params.id)
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { 
        success: true, 
        data: category,
        message: 'Category retrieved successfully' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get category error:', error)
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
    const { name } = await request.json()
    
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Category name is required' },
        { status: 400 }
      )
    }
    
    await dbConnect()
    
    const category = await Category.findByIdAndUpdate(
      params.id,
      { name: name.trim() },
      { new: true }
    )
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { 
        success: true, 
        data: category,
        message: 'Category updated successfully' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update category error:', error)
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
    
    const category = await Category.findByIdAndDelete(params.id)
    
    if (!category) {
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
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
