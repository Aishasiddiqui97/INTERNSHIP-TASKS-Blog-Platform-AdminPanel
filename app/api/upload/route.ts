import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 })
    }

    // Return placeholder - configure Cloudinary env vars for real uploads
    return NextResponse.json({
      success: true,
      data: { url: '/placeholder.jpg', publicId: 'placeholder' }
    })
  } catch {
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 })
  }
}
