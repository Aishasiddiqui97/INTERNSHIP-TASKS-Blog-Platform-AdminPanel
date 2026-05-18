import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ success: true, message: `Blog ${params.id} status toggled` })
}
