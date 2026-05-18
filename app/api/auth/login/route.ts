import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db'
import { User } from '@/models/User'
import { generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }
    
    await dbConnect()
    
    // Find user by email
    const user = await User.findOne({ email }).select('+password')
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Verify password
    const isMatch = await user.comparePassword(password)
    
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Generate JWT token
    const token = generateToken(user._id.toString(), user.role)
    
    // Return user data without password
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }
    
    return NextResponse.json(
      { 
        success: true, 
        data: { 
          user: userData, 
          token 
        },
        message: 'Login successful' 
      },
      { 
        status: 200,
        headers: {
          'Set-Cookie': `auth_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
        }
      }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
