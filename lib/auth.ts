import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { User } from '@/models/User'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function authenticateAdmin(request: NextRequest): Promise<{ user: any; error?: string }> {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { user: null, error: 'Unauthorized: No token provided' }
    }
    
    const token = authHeader.split(' ')[1]
    
    if (!token) {
      return { user: null, error: 'Unauthorized: Invalid token format' }
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string }
    
    if (decoded.role !== 'admin') {
      return { user: null, error: 'Forbidden: Admin access required' }
    }
    
    const user = await User.findById(decoded.userId).select('-password')
    
    if (!user) {
      return { user: null, error: 'Unauthorized: User not found' }
    }
    
    return { user }
  } catch (error) {
    console.error('Authentication error:', error)
    return { user: null, error: 'Unauthorized: Invalid or expired token' }
  }
}

export function generateToken(userId: string, role: string): string {
  return jwt.sign(
    { userId, role }, 
    JWT_SECRET, 
    { expiresIn: '24h' }
  )
}
