'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { CategoryDocument } from '@/models/Category'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryDocument[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        const result = await response.json()
        if (result.success) {
          setCategories(result.data)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 max-w-6xl mx-auto bg-[#09090B] flex items-center justify-center">
        <div className="text-[#FAFAFA]">Loading categories...</div>
      </div>
    )
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return
    
    try {
      const response = await fetch('/api/categories', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        alert('Category deleted successfully!')
        // Remove the deleted category from state
        setCategories(categories.filter(cat => cat._id !== id))
      } else {
        alert(`Error: ${result.message}`)
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('An error occurred while deleting the category')
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 max-w-6xl mx-auto bg-[#09090B]">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#FAFAFA]">Category Management</h1>
            <p className="text-[#A1A1AA] mt-1">Manage blog categories</p>
          </div>
          <a 
            href="/admin/categories/new" 
            className="px-5 py-2.5 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            + Create New Category
          </a>
        </div>
      </header>

      <Card variant="glass">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#FFFFFF]/10">
            <thead>
              <tr className="text-left text-sm font-semibold text-[#FAFAFA]">
                <th scope="col" className="px-6 py-3">
                  Category Name
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FFFFFF]/5">
              {categories.map((category) => (
                <motion.tr 
                  key={category._id}
                  whileHover={{ backgroundColor: '#18181B/30' }}
                  className="transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#FAFAFA]">{category.name}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <motion.button 
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        className="text-[#6366F1] hover:text-[#818CF8]"
                        onClick={() => window.location.href = `/admin/categories/${category._id}`}
                      >
                        Edit
                      </motion.button>
                      <motion.button 
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        className="text-[#EF4444] hover:text-[#F87171]"
                        onClick={() => handleDelete(category._id)}
                      >
                        Delete
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center text-[#A1A1AA]">
                    No categories found. <a href="/admin/categories/new" className="text-[#6366F1] hover:text-[#818CF8] font-medium">Create your first category</a>.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}