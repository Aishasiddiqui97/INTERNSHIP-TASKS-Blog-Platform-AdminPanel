import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Clear the auth token cookie
    const response = NextResponse.json(
      { success: true, message: 'Logout successful' },
      { status: 200 }
    )
    
    response.cookies.set('auth_token', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
