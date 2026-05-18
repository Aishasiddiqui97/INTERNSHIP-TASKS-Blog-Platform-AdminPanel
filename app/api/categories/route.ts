import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ success: true, data: [] })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    return NextResponse.json({ success: true, data: body }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}

export async function DELETE() {
  return NextResponse.json({ success: true, message: 'Deleted' })
}
