'use client'

import { useState, useEffect } from 'react'
import DashboardClient from './DashboardClient'
import AdminLayout from '@/components/layouts/AdminLayout'

interface Blog {
  id: string
  _id?: string
  title: string
  category: string
  content: string
  status: string
  createdAt: string
}

interface Category {
  _id: string
  name: string
}

export default function DashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load blogs from localStorage
    const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]')
    setBlogs(storedBlogs)

    // Load categories from localStorage or use defaults
    const storedCategories = JSON.parse(localStorage.getItem('categories') || '[]')
    if (storedCategories.length === 0) {
      const defaultCategories = [
        { _id: 'tech', name: 'Technology' },
        { _id: 'defense', name: 'Defense' },
        { _id: 'lifestyle', name: 'Lifestyle' },
        { _id: 'business', name: 'Business' },
        { _id: 'health', name: 'Health' },
        { _id: 'travel', name: 'Travel' },
        { _id: 'food', name: 'Food' },
      ]
      setCategories(defaultCategories)
      localStorage.setItem('categories', JSON.stringify(defaultCategories))
    } else {
      setCategories(storedCategories)
    }

    setLoading(false)
  }, [])

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <DashboardClient blogs={blogs} categories={categories} />
    </AdminLayout>
  )
}