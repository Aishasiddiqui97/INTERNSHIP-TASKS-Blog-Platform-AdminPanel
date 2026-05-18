import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

let cached = (global as any).mongoose || { conn: null, promise: null }
;(global as any).mongoose = cached

export async function dbConnect() {
  if (!MONGODB_URI) return null
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}
